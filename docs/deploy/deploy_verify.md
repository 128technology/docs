---
title: "Step 6 — Verify the Deployment"
sidebar_label: "Step 6: Verify the Deployment"
---

This section confirms that the deployment is fully operational. Run each check in sequence to validate every layer of the stack.

## 1. Verify Router-to-Conductor Connectivity

From the **Conductor PCLI**, confirm all routers are synchronized:

```bash
show assets
```

Expected output for a healthy deployment:

```
===================== ============== ===========
 Asset ID              Router         Status
===================== ============== ===========
 SSR130-ABC1234567    branch1        Synchronized
```

If a router shows **Disconnected** or remains in **Synchronizing** for more than 15 minutes, see [Troubleshooting Conductor Connectivity](../ts_connecting_to_routers.md).

## 2. Verify Router Software Version

Confirm each router is running SSR 7.1.4:

```bash
show system version router branch1
```

Expected output:
```
Fri 2026-04-17 10:00:00 UTC
=========== ============================== ============
 Router      Version                        Status
=========== ============================== ============
 branch1     7.1.4-1.el7.x86_64            Running
```

## 3. Verify WAN Interface

From the Conductor PCLI, confirm the WAN interface has received a DHCP address:

```bash
show network-interface router branch1 node node1 name wan1
```

Verify that:
- **Operational State** is `up`
- **Address** shows a DHCP-assigned IP address from the ISP

Alternatively, from the Conductor GUI:
1. Navigate to **Routers** → `branch1`.
2. Select the **Interfaces** tab.
3. Verify `wan1` shows an IP address and is operationally `up`.

## 4. Verify LAN Interface

```bash
show network-interface router branch1 node node1 name lan1
```

Verify that:
- **Operational State** is `up`
- **Address** shows `192.168.1.1/24`

## 5. Verify Management over Forwarding

Management over forwarding is active when the conductor and router maintain an uninterrupted management connection through the WAN interface. Since the conductor shows the router as **Synchronized** and the WAN interface is up, management over forwarding is working correctly.

To confirm from the router's Linux shell:

```bash
ip route
```

Expected output — a default route pointing to `kni254` confirms that management traffic is flowing through the SSR forwarding engine:

```
default dev kni254 scope link metric 10
```

To SSH to the router through the conductor (using management over forwarding):

```bash
ssh admin@branch1.AcmeCorp
```

If the SSH session opens, management over forwarding is confirmed end-to-end.

## 6. Verify Internet Service Forwarding

From a LAN device in the `192.168.1.0/24` subnet, confirm internet connectivity:

```bash
ping 8.8.8.8
```

Or from the router's PCLI, trace a path for a LAN user to the internet:

```bash
admin@node1.branch1# show fib router branch1
```

Look for an entry matching `0.0.0.0/0` (the `internet` service) with a next-hop pointing to `wan1`.

To confirm active session forwarding, from the Conductor PCLI:

```bash
show sessions router branch1
```

Traffic from LAN hosts (`192.168.1.0/24`, tenant `corp`) destined for the internet should appear as active sessions egressing `wan1`.

## 7. Verify Internet Breakout with Source NAT

From a LAN device, confirm that outbound traffic is source-NAT'd to the WAN IP:

```bash
curl -s https://api.ipify.org
```

The returned IP address should match the WAN DHCP address assigned to `wan1` — not the LAN address.

Alternatively, verify source NAT is applied from the PCLI:

```bash
show nat entries router branch1
```

Entries for LAN source addresses (`192.168.1.x`) translated to the WAN IP confirm internet breakout with NAT is working.

## Summary Checklist

| Check | Expected Result |
|-------|----------------|
| Router asset status | `Synchronized` |
| Router software version | `7.1.4` |
| WAN interface (`wan1`) | Operationally `up`, DHCP IP assigned |
| LAN interface (`lan1`) | Operationally `up`, address `192.168.1.1/24` |
| Management over forwarding | Default route via `kni254`; conductor SSH accessible |
| Internet service | FIB entry for `0.0.0.0/0` present, sessions forwarding |
| Source NAT | LAN traffic egresses with WAN IP as source |

## Congratulations

Your conductor-managed SSR network is fully operational. The SSR1200 conductor is managing the SSR130 branch router, which is forwarding internet traffic for LAN users and maintaining its management connection to the conductor over the WAN interface.

## Appendices

- [Appendix A — Full Conductor Configuration](deploy_appendix_conductor.mdx)
- [Appendix B — Full Router Configuration](deploy_appendix_router.mdx)
