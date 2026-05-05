---
title: Configuring Ethernet Link Speed and Duplex
sidebar_label: Link Speed and Duplex
---

This guide explains when — and when **not** — to configure the [`link-settings`](config_reference_guide.md#device-interface) attribute on an SSR `device-interface`, how to apply it, how to verify the negotiated result, and how to recognize and resolve duplex-mismatch problems.

#### History

| Release | Modification |
| ------- | --------------------------- |
| 1.0.0   | `link-settings` introduced (auto / 10 / 100 Mbps, half/full) |
| 5.5.0   | Resolved an issue that prevented setting `link-settings` to anything other than `auto` (I95-47371) |
| 5.6.0   | DPDK driver updated to honor forced 100/full on Intel I225-V NICs (I95-51450) |
| 6.0.0   | Auto-negotiation, disable, and speed/duplex settings exposed in Mist (I95-47136 / MIST-62741) |

## Background

Every Ethernet link has two negotiated properties:

- **Speed** — 10 Mbps, 100 Mbps, 1 Gbps, 2.5 Gbps, 10 Gbps, 25 Gbps, …
- **Duplex** — *full* (simultaneous send and receive) or *half* (one direction at a time, with carrier-sense / collision detection).

IEEE 802.3 clause 28 defines an **auto-negotiation** protocol that lets two attached devices advertise their capabilities and converge on the highest common speed and duplex. Auto-negotiation is **mandatory for 1 GbE and faster** links and is the default behavior on every modern NIC and switch port.

The SSR exposes only the legacy 10/100 fixed combinations through `link-settings` because those are the only speeds for which forcing values is ever valid. Anything faster must use `auto`.

## When to Leave `link-settings` at the Default (`auto`)

Leave `auto` in place — which is the factory default — for virtually all deployments, including:

- Any link to a modern managed switch (Juniper, Cisco, Arista, etc.).
- Every 1 GbE, 2.5 GbE, 10 GbE, or 25 GbE+ copper or fiber port.
- Every SFP / SFP+ / SFP28 optical link — the optic and PHY negotiate.
- HA fabric and HA sync ports between two SSR nodes.
- LAG / LACP member links (see [Configuring LACP](config_lacp.md)).

For these cases, forcing speed/duplex provides no benefit and is the most common cause of duplex mismatch.

## When to Force Speed and Duplex

Configure a fixed `link-settings` value only when **all** of the following are true:

1. The link runs at 10 Mbps or 100 Mbps.
2. The far-end device does not implement (or has broken) IEEE 802.3 auto-negotiation. Typical examples:
   - Legacy 10/100 hubs.
   - Some copper-to-fiber media converters.
   - Older industrial switches and serial-to-Ethernet gateways.
   - Some carrier hand-off ports that are administratively pinned.
3. You can force the **same** value on the far-end device. Forcing one side while leaving the other on `auto` is the canonical cause of a duplex mismatch — see [Troubleshooting](#troubleshooting-duplex-mismatch) below.

:::warning
Half-duplex (`10Mbps-half`, `100Mbps-half`) is meaningful only on shared media (hubs). Do **not** select a half-duplex value on a point-to-point switch link or on any 1 Gb+ port — the link will either fail to come up or will operate with severely degraded throughput.
:::

## How to Configure

`link-settings` is only valid when the device-interface `type` is `ethernet`.
It has no effect on `pppoe`, `lte`, `t1`, `kni`, `bridged`, or `host` interfaces (refer to the [device-interface schema](config_reference_guide.md#device-interface)).

From the PCLI:

```
configure authority router <router> node <node> device-interface <name>
    link-settings 100Mbps-full
    exit
validate
commit
```

Allowed values:

| Value           | Speed   | Duplex |
| --------------- | ------- | ------ |
| `auto`          | negotiated | negotiated (**default, recommended**) |
| `10Mbps-full`   | 10 Mbps | full   |
| `10Mbps-half`   | 10 Mbps | half   |
| `100Mbps-full`  | 100 Mbps | full  |
| `100Mbps-half`  | 100 Mbps | half  |

For the corresponding CLI reference, see [`configure authority router node device-interface link-settings`](config_command_guide.md#configure-authority-router-node-device-interface-link-settings).

### Mist-managed Routers

In Mist-managed deployments (SSR 6.0 and later) the same controls are available in the WAN edge configuration UI, where auto-negotiation can be enabled, disabled, or replaced with a fixed speed/duplex selection per port.

## Verifying the Result

After commit, confirm both ends agree.

### From the SSR

```
admin@node1.router1# show device-interface name <name>
...
 Speed:               100 Mbps
 Duplex:              full
 Admin Status:        up
 Operational Status:  up
```

If `Duplex:` shows `unknown`, the interface is one of the types for which the SSR does not report a duplex value (PPPoE, LTE, and — prior to the [WAN-Assurance plugin 3.12](release_notes_wan_assurance_plugin_3.12.md) and SSR releases that include WAN-3451 — non-forwarding interfaces). This is expected on those interface types and does not indicate a problem.

### From the Underlying OS

The `ethtool` command requires root access on the Linux shell.

:::note
This command is not available on Mist-managed routers. Contact Juniper TAC for OS-level diagnostics.
:::

```
[root@node1 ~]# ethtool <kernel-interface>
Settings for eth1:
        Speed: 100Mb/s
        Duplex: Full
        Auto-negotiation: off
        Link detected: yes
```

### From the Peer Device

Run the equivalent command on the attached switch (`show interfaces <port>` on Junos / Cisco) and confirm the speed and duplex match exactly.

## Troubleshooting Duplex Mismatch

A duplex mismatch occurs when one side of a link is forced (for example `100Mbps-full`) and the other side is left at `auto`. Auto-negotiation cannot detect the partner's duplex when the partner is not negotiating, so it falls back to **half-duplex** at the matching speed. The link comes up and passes small flows, but performance is catastrophic for any sustained traffic.

### Symptoms

- Throughput dramatically lower than the link speed (often \<1 Mbps on a 100 Mbps link).
- Asymmetric performance: large transfers in one direction work; the other direction stalls.
- Increasing `rx-errors`, `crc-errors`, `align-errors`, or `late-collisions` in `show device-interface` and in `ethtool -S <iface>`.
- TCP retransmits and application timeouts that scale with packet size.
- Link counters look healthy at idle but degrade under load.

### Diagnosis Checklist

1. Run `show device-interface name <name>` on the SSR and the equivalent `show interfaces` on the peer; compare **speed and duplex on both sides**.
2. Inspect error counters over a one-minute interval. Late collisions on a full-duplex port are the smoking gun for a mismatch.
3. Check the cabling and SFP/optic — a marginal cable can also cause negotiation to drop to a lower speed or to half-duplex.
4. Set both ends to `auto` and re-test. This is the recommended first step even when you ultimately intend to hard-code values.
5. If the peer cannot negotiate, force **both** sides to the same fixed value in the same change window.

### Special Considerations for HA Fabric and Sync Ports

The HA sync and fabric ports between two SSR nodes (or between an SSR and an intermediate switch) **must** come up *full duplex*. A half-duplex result on these ports — visible in the output shown in the [HA Sync Plugin troubleshooting topic](config_ha.md) — almost always indicates a bad cable, a failing SFP, or a switch port that has been forced to `100Mbps-half`. Correct the underlying cause; do not work around it by forcing `link-settings` on the SSR side.

## Interaction with Traffic Engineering

When a device-interface participates in load balancing, the SSR uses the configured `traffic-engineering transmit-cap` as the bandwidth reference for its utilization thresholds. If `transmit-cap` is **not** set, the SSR falls back to the **set or negotiated link rate** — see [load-balancing in the configuration reference](config_reference_guide.md).

A consequence: if you force `link-settings` to 100 Mbps on an interface that the NIC could otherwise negotiate to 1 Gbps, every load-balancing decision will be made against the lower 100 Mbps figure. Either set an explicit `transmit-cap` or leave `link-settings` at `auto`.

## Summary

| Scenario | Recommended `link-settings` |
| -------- | ---------------------------- |
| Modern switch port (any speed) | `auto` |
| 1 GbE / 10 GbE / 25 GbE link of any kind | `auto` (mandatory) |
| HA fabric or HA sync port | `auto` |
| 10/100 link to a non-negotiating device, both ends pinnable | matching fixed value (e.g. `100Mbps-full`) |
| Diagnosing intermittent low throughput | start by setting both ends to `auto` |
| Shared-media hub (rare) | matching fixed half-duplex value |
