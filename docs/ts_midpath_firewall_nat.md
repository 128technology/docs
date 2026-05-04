---
title: Troubleshooting Midpath Firewall NAT Issues
sidebar_label: Midpath Firewall / NAT
---

This guide describes how to identify and resolve a class of issues caused by a **third-party firewall (or other NAT device) in the middle of an SSR peer path** that is mis-translating SSR traffic. The most common symptom is a peer path that BFD reports as **up** while BGP over SVR (BGPoSVR) sessions and end-user flows experience sporadic loss.

This pattern has been observed in deployments where a stateful firewall (for example, a Palo Alto Networks firewall) sits between SSR hub and spoke nodes and either:

* applies asymmetric or stale source-NAT translations to SSR-originated UDP flows, or
* has mismatched inbound and outbound security/NAT policies for the SSR peering subnet.

## Symptoms

When a midpath firewall is mis-NATing SSR traffic, the deployment typically exhibits **all** of the following symptoms simultaneously:

* `show peers` reports the affected peer path as **up** with little or no loss reported by BFD.
* `show bgp neighbor` (or the equivalent `show sessions` filter for `_bgp_speaker_`) shows the BGPoSVR session **flapping** — repeatedly   transitioning through `Connect` / `Active` / `OpenSent` / `Established`.
* End-user flows that are forwarded over the same peer path (ICMP pings, Microsoft Teams calls, TCP sessions) experience **periodic loss of several seconds in duration**, correlated in time with the BGP flaps.
* Multiple TCP sockets exist toward the same BGP neighbor in `show sessions`, indicating repeated re-establishment attempts.

The BFD vs. BGP discrepancy is the key indicator. BFD packets are very small and very frequent, so a firewall's stale-session aging or mis-applied NAT pool will often still pass the BFD probe traffic while dropping the longer-lived TCP keepalives used by BGP.

## Why this happens

The SSR uses Secure Vector Routing (SVR) to encapsulate sessions — including BGPoSVR control traffic — into UDP between peer routers. Each peer path is identified internally by a `(local-ip, remote-ip)` tuple stored in the SSR's WayPoint table. When a midpath device rewrites the source IP of returning packets to an address the SSR does not recognize as a configured peer, the SSR cannot bind the inbound packet to an existing waypoint and **drops** the packet with a `WayPointException`.

If the firewall ages out only some of its NAT entries, or applies a NAT policy unevenly across an HA pair (for example, NATing AMR1's two peer
addresses to the same egress address), only a subset of flows will fail — which is exactly why BFD survives while BGPoSVR does not.

## Diagnostic Workflow

### 1. Confirm BFD is up while BGPoSVR is flapping

From the conductor:

```
show peers router <router-name>
show bgp neighbor router <router-name>
```

A path that shows `Status: up` in `show peers` while the corresponding BGP neighbor on the same router cycles between non-`Established` states is the first strong signal.

### 2. Compare configured peer addresses against received peer addresses

On the **hub** SSR:

```
show peers router <hub-router> detail
```

Inspect the `Peer Destination` column (or the equivalent field in the detail output). Compare it against the addresses configured on the peering interface using:

```
show device-interface router <hub-router>
```

If the destination address reported for an inbound peer **does not match** the address configured on the remote spoke's WAN interface — or if two distinct remote peer addresses collapse to the same value in the output — a midpath device is rewriting the source IP.

In the original case that motivated this guide, the hub `AMR1` was configured with peer addresses `167.230.217.60` and `167.230.217.61`, but `show peers` reported the destination for both as `167.230.217.61`. This collapse is the signature of an upstream NAT device performing overload/PAT incorrectly. 

### 3. Search `serviceArea.log` for `WayPointException`

The most authoritative confirmation comes from the spoke's `serviceArea.log`. Run from the SSR shell on the spoke:

```
grep -E "WayPointException|WayTable not found" \
  /var/log/128technology/serviceArea.log
```

A representative dropped packet record looks like this:

```
Aug 04 04:24:46.328 [SESS|SA ] ERROR (SessionProc-00 ) Dropped packet with key: Packet key [src ip 167.230.217.3, dest ip 199.219.199.90, src port 0, dest port 0, proto 17, interface 13.0], is flow miss, detour reason: BFD Pinhole Setup (9), is not bfd tunneled, ... src peer: b747bb58-4a79-45e1-b036-bbb6ad5802f5, src peer path: 167.230.217.60 due to WayPointException: Unable to allocate WayPoint for intf=13.0, giid=20, local=199.219.199.90, remote=167.230.217.3 - WayTable not found { receive }
```

The decisive fields are:

| Field            | Meaning                                                          |
| ---------------- | ---------------------------------------------------------------- |
| `src ip`         | The source IP of the packet **as it arrived** at the SSR's WAN.  |
| `src peer path`  | The remote peer-path address the SSR **expects** to receive from. |
| `remote=`        | Same as `src ip` — the unrecognized address.                     |
| `local=`         | The local WAN interface address.                                 |

If `src ip` ≠ `src peer path`, a device between the two SSRs has rewritten the source address.

### 4. Search for `AttributeNotFoundException` (BGPoSVR-specific signature)

The BGPoSVR control flow generates a slightly different drop signature because the inbound packet carries SVR metadata for an unknown source peer:

```
grep -E "Dropped packet.*AttributeNotFoundException" \
  /var/log/128technology/serviceArea.log
```

Example:

```
Aug 04 03:26:00.079 [SESS|SA ] ERROR (SessionProc-00 ) Dropped packet with key: Packet key [src ip 167.230.217.3, dest ip 199.219.199.98, src port 36879, dest port 16416, proto 17, interface 11.0], ... tenant: _bgp_speaker_, ... src peer path: 167.230.217.60 due to AttributeNotFoundException: SessionKey attribute not found.
```

Any drop with `tenant: _bgp_speaker_` and a mismatched `src ip` / `src peer path` is BGPoSVR control traffic being lost to a midpath NAT change.

### 5. Confirm with a session capture

To capture the BGPoSVR control plane on the next failure, start a session-capture targeting BGP (TCP/179) before the flap repeats. From the PCLI on either SSR:

```
session-capture protocol tcp destination-port 179 session-count 4
```

See [Selective Packet Captures](ts_packet_capture.md) for the full syntax and for how to retrieve the resulting `pcap` files.

In the resulting capture, the failure mode looks like:

* both SSRs continue to **send** BGP keepalives out as SVR-encapsulated UDP packets, but
* the SVR packets do not arrive on the opposite side, or arrive with a rewritten source address that the receiving SSR refuses.

Distributed packet loss would be randomly spread across all flows; loss that is concentrated on a single five-tuple flow over many seconds is a classic indicator of a stateful midpath device dropping or mistranslating that flow alone.

### 6. Check for duplicate BGP sessions to a single neighbor

Repeated re-establishment attempts leave behind multiple forward sessions for the same BGP neighbor. From the conductor:

```
show sessions node all router <spoke-router> | grep <bgp-neighbor-ip>
```

Three or four `_bgp_speaker_` forward sessions toward the same neighbor IP, each with a different ephemeral source port and an uptime of only a few minutes, is a strong corroborating signal:

```
e5b8b337-...  fwd  _bgp_..._lo0  _bgp_speaker_  ...  TCP  10.224.8.144  42083  10.224.8.16  179  ...  0 days 0:08:31
dd05e49a-...  fwd  _bgp_..._lo0  _bgp_speaker_  ...  TCP  10.224.8.144  39639  10.224.8.16  179  ...  0 days 0:46:33
d8c6034d-...  fwd  _bgp_..._lo0  _bgp_speaker_  ...  TCP  10.224.8.144  38193  10.224.8.16  179  ...  0 days 0:30:02
```

## Resolution

Once the SSR-side evidence above has been collected, the fix lies on the **midpath firewall**, not on the SSR. Engage the firewall team and:

1. **Clear stale sessions / NAT translations** on the firewall for the affected SSR peering subnets. In many observed cases this immediately restores the BGP peer with the correct source IP because the firewall rebuilds its NAT mappings cleanly from the next outbound packet.
2. **Audit inbound and outbound NAT and security policies** for the SSR peering subnets. The most common defect is a policy whose inbound and outbound rules are tagged inconsistently (for example, the egress policy NATs `167.230.217.60` correctly while the ingress policy maps the return traffic onto a different address).
3. **Apply the corrected policy symmetrically** to all firewalls in the path, including peer firewalls at other sites that may have inherited the same misconfigured template.
4. **Re-run the diagnostic steps** above and confirm:
  * `show peers` `Peer Destination` matches the configured remote interface address.
  * `serviceArea.log` no longer logs `WayPointException` or `AttributeNotFoundException` drops on the WAN interface.
  * BGP neighbors remain in `Established` state for an extended period.

## Proactive Detection

Because the symptoms can persist for hours before a customer reports user-impacting loss, the following lightweight checks are recommended for
deployments that traverse third-party firewalls:

1. **Spoke-side log scan.** Periodically grep `serviceArea.log` for `Dropped packet` co-occurring with `AttributeNotFoundException`. If    any record shows `src ip` ≠ `src peer path`, alert on "incorrect NAT detected".
2. **Hub-side `show peers` audit.** If the **received** peer address in `show peers` differs from the configured public IP of the remote peer's interface, alert on "Source NAT change detected on neighbor".
3. **Continuous serviceArea tail.** A simple `tail -F` on `serviceArea.log` filtered for `Dropped packet with key` and compared on `src ip` vs. `src peer path` will catch the issue on first onset, well before BGP flapping accumulates and end-user sessions are affected.

The corresponding stat counters [`bfd local-source-nat-change`](cli_stats_reference.md#show-stats-bfd-local-source-nat-change) and [`bfd neighbor source-nat-change`](cli_stats_reference.md#show-stats-bfd-neighbor-source-nat-change) can also be polled to detect NAT changes observed by BFD itself.

## Related Topics

* [NAT Troubleshooting](ts_nat_troubleshooting.md) — for SSR-internal NAT rule inspection.
* [Selective Packet Captures](ts_packet_capture.md) — for capturing BGPoSVR control flows on demand.
* [Troubleshooting Applications](ts_applications.md) — for using `show peers` and `service-ping` to verify peer-path health.
* [Metadata Concepts](concepts_metadata.md) — for background on how the SSR detects source NAT changes via BFD.
