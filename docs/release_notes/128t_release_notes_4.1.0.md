---
title: 128T 4.1.0 Release Notes
sidebar_label: 4.1.0
---

## New Features and Improvements
- **I95-18018** Upgrade to CentOS 7.5

- **I95-18889** GUI Dashboard with Improved Navigation

- **I95-19231** Loopback for BGP Peering

- **I95-19370** DHCP Server

- **I95-21279** Azure Accelerated Networking Support

- **I95-23620** IPv6 Services

- **I95-23494** Router-Based Services

- **I95-24541** UDP Transform NAT Traversal

- **I95-25350** Core Isolation Mask Readability

- **I95-25543** Non-traffic audit events are now enabled by default.

- **I95-25647** Quectel EC25-A LTE card support

:::note
The 4.1.0 release requires the 128T-installer 2.2.0 or greater. By default, this installer will automatically be used.
:::

## Issues Fixed
- **I95-22879** Alarm count in bubble may not reflect the alarms in UI

- **I95-22926** Configuring dynamic-hostname writes all FQDN-based peers to /etc/hosts.

- **I95-23122** The output of `show platform` may display the incorrect number of cores.

- **I95-23761** Changing the web server's listening port does not affect the forwarding port for host-service.

- **I95-24337, I95-25803** Interface alarms reference internal device-interface IDs which do not exist in customer visible configuration.

- **I95-24404** When changing an interface from redundant to non-redundant, no validation will occur if the global-id remains configured.

- **I95-24453** 128T would not start on systems with less than 7GB of RAM.

- **I95-24469** The user is now presented with a dialog that the 128T-installer will be updated prior to downloading an update of the 128T software.

- **I95-24598** Alarm overlay will scroll outside of chart bounds when moved with the slider.

- **I95-24879** Failed to communicate from core network in data center to branch office due to "Error adding session".

- **I95-25051** Blue update status icon remains blinking on routers.

- **I95-25164** An invalid node name sent over NETCONF for a `service-route` can cause the system to fault.

- **I95-25174** Eroneous journal entries appear on restart of 128T when Zscaler plugin is enabled.

- **I95-25311** GUI FIB table is inconsistent with output of `show fib` on PCLI.

- **I95-25329** PCLI in Conductor GUI creates nested navigation bars

- **I95-25425** DHCP Relay with `/32` and FIB next-hop set to none requires additional service configuration

- **I95-25429** Rare race condition when applying configuration can cause the system to fault.

- **I95-25498** Neighbor solicitation messages received on an interface without a IPv6 address will silently drop the messages without incrementing any counters.

- **I95-25532** The autocomplete on the assets page does not display the asset id correctly.

- **I95-25536** If a more specific static route matching a kernel route is removed, the kernel route remains inactive.

- **I95-25539** A GUI initiated upgrade of a Conductor node failes to restart the Conductor service upon completion of the upgrade.

- **I95-25570** 128T process can fault on system shutdown.

- **I95-25580** Copy-and-pasting a router configuration can cause validation issues. 

- **I95-25655** An unresolvable hostname can cause the `rsyslogd` service to fault.

- **I95-25693** Cloning a `network-interface` causes a configuration warning with the message: `'qp-value' has been deprecated`.

- **I95-25698** Number of Custom charts over 20-25 may result in charts disappearing

- **I95-25729** The use of overlapping IP addresses for services can cause a failure to route packets.

- **I95-25788** Static route option for DHCP enabled egress interface not available

- **I95-25855** The GUI may return `null` for the PCI address of a device interface.

- **I95-25864** In the rare case when two HA nodes of the same Router are simultaneously started with factory default configuration, a race condition can occur where configuration from the Conductor may not be applied to the Router.

- **I95-25891** In very rare cases where networks can have over 18 seconds of delay, the use of the Session Optimization can cause a system fault.

- **I95-25895** Standby system can fault when upgrading the HA pair from 4.0 to 4.1.

- **I95-25917** After an upgrade of a system installed from an ISO, 128T is not enabled upon system reboot.

- **I95-25937** Reverse SSH service fails when the server-side SSH keys change.

- **I95-25949, I95-26091** IGMPv2 joins are dropped by the 128T.

- **I95-25981** Setting user preferences to display configuration as tiles or tables is not honored.

- **I95-25982** Configuring a service next-hop as a network-interface provisioned for DHCPv6 can cause the system to fault.

- **I95-26007** Executing `save tech-support-info` can sometimes cause interface state to be incorrectly reported.

- **I95-26058** System can fault when receiving a malformed packet.

- **I95-26066** Session classified as applications without a common name can cause the standby node to fault when the data is synchronized.

- **I95-26107** Path MTU discovery may not resolve when behind a NAT

## Caveats
- **I95-25947** The upgrade to 4.1 can take upwards of 40 minutes to complete.  The increase in installation time is due to the underlying OS upgrade from CentOS from 7.3 to 7.5.

- **I95-25828** Rollback to the previous version of software is not supported due to the underlying operating system upgrade.

- **I95-25659** When 128T learns the peer IP of a 128T Router through BFD source NAT detection, it uses the learned address for most things, but not for flow moves. Flow move detection relies on the statically configured adjacency within the configuration, not the updated addresses that BFD provides. To prevent for move failures when waypoints are behind a NAT, the administrator should configure  `external-nat-address` on the corresponding adjacency.  The value given to that field should be that same source NATed address.

- **I95-25823** kernel warnings can be seen in journalctl when running the 128T within Azure.  An example of the warning messages can be seen below.
  ```
        Aug 29 02:23:32 sct1_dut1 kernel: Modules linked in: rte_kni(OE) igb_uio(OE) uio vfat fat intel_powerclamp coretemp kvm_intel kvm irqbypass crc32_pclmul ghash_clmulni_intel aes
        Aug 29 02:23:32 sct1_dut1 kernel: CPU: 1 PID: 1620 Comm: fastLane Tainted: G           OE  ------------   3.10.0-862.14.4.el7.x86_64 #1
        Aug 29 02:23:32 sct1_dut1 kernel: Hardware name: ADI Engineering RCC-VE2/RCC-VE2, BIOS ADI_RCCVE2-01.00.00.00 08/25/2017
        Aug 29 02:23:32 sct1_dut1 kernel: Call Trace:
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83713754>] dump_stack+0x19/0x1b
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff830945d8>] __warn+0xd8/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8309471d>] warn_slowpath_null+0x1d/0x20
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff831256b9>] update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83122cd0>] ? cpuset_read_u64+0x100/0x100
        Aug 29 02:23:32 sct1_dut1 nodeMonitor[1624]: Processed configuration update (2)
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125953>] cpuset_write_resmask+0x253/0xa10
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311b020>] ? cgroup_rightmost_descendant+0x80/0x80
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125700>] ? update_cpumasks_hier+0x410/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311d411>] cgroup_file_write+0x1d1/0x2d0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832221c8>] ? __sb_start_write+0x58/0x110
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832d5437>] ? security_file_permission+0x27/0xa0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8321f240>] vfs_write+0xc0/0x1f0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8322006f>] SyS_write+0x7f/0xf0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8372579b>] system_call_fastpath+0x22/0x27
        Aug 29 02:23:32 sct1_dut1 kernel: ---[ end trace e9955ec11f51ffa9 ]---
        Aug 29 02:23:32 sct1_dut1 kernel: ------------[ cut here ]------------
        Aug 29 02:23:32 sct1_dut1 kernel: WARNING: CPU: 1 PID: 1620 at kernel/cpuset.c:994 update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel: Modules linked in: rte_kni(OE) igb_uio(OE) uio vfat fat intel_powerclamp coretemp kvm_intel kvm irqbypass crc32_pclmul ghash_clmulni_intel aes
        Aug 29 02:23:32 sct1_dut1 kernel: CPU: 1 PID: 1620 Comm: fastLane Tainted: G        W  OE  ------------   3.10.0-862.14.4.el7.x86_64 #1
        Aug 29 02:23:32 sct1_dut1 kernel: Hardware name: ADI Engineering RCC-VE2/RCC-VE2, BIOS ADI_RCCVE2-01.00.00.00 08/25/2017
        Aug 29 02:23:32 sct1_dut1 kernel: Call Trace:
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83713754>] dump_stack+0x19/0x1b
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff830945d8>] __warn+0xd8/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8309471d>] warn_slowpath_null+0x1d/0x20
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff831256b9>] update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83122cd0>] ? cpuset_read_u64+0x100/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125953>] cpuset_write_resmask+0x253/0xa10
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311b020>] ? cgroup_rightmost_descendant+0x80/0x80
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125700>] ? update_cpumasks_hier+0x410/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311d411>] cgroup_file_write+0x1d1/0x2d0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832221c8>] ? __sb_start_write+0x58/0x110
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832d5437>] ? security_file_permission+0x27/0xa0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8321f240>] vfs_write+0xc0/0x1f0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8322006f>] SyS_write+0x7f/0xf0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8372579b>] system_call_fastpath+0x22/0x27
        Aug 29 02:23:32 sct1_dut1 kernel: ---[ end trace e9955ec11f51ffaa ]---
  ```