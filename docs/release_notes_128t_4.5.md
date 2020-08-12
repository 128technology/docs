---
title: 128T 4.5 Release Notes
sidebar_label: 4.5
---

## Release 4.5.0

### New Features and Improvements

- **I95-9955** [Encryption of 128T Configuration](cli_reference.md#set-config-encryption)
------
- **I95-1212, I95-34108** [Configuration Templates](config_templates.md)
------
- **I95-16104** [Management traffic over forwarding interface](config_management_over_forwarding.md)
------
- **I95-22304** [Re-run commands in PCLI history with "!"](concepts_pcli.md#-run-previous-command)
------
- **I95-23898** Improved feedback on PCLI when invalid arguments are provided to a command
------
- **I95-28366** Greatly reduced memory consumption of PCLI, allowing many more concurrent users
------
- **I95-29043** [Asset Connection Resiliency](config_asset_connection_resiliency.md)
------
- **I95-30332** [Extensibility of GUI Navigation pane for 3rd party links](howto_extend_gui_nav.md)
------
- **I95-31405** [SVR Savings Proof Points](about_svr_savings.md)
------
- **I95-32783** [`show assets summary` enhancements](cli_reference.md#show-assets-summary)
------
- **I95-33174** Automatic LTE band management per carrier
------
- **I95-33215** [Audiocodes M800 watchdog](plugin_m800_watchdog.md)
------
- **I95-33351** Optimizations in FIB data structure allow for 20% additional entries
------
- **I95-33358** [Static Hostname Mappings](config_static_hostname_mapping.md)
------
- **I95-33375** Address latest security vulnerabilities
------
- **I95-33427** [Per-Service Rate Limiting](config_rate_limiting.md)
------
- **I95-33776** [`show config events`](cli_reference.md#show-events-config-commit) tracks configuration changes

### Issues Fixed

- **I95-32594** Validation allows for mismatched adjacency security-policy with peer network-interface security-policy for cases where multiple network interfaces in a router have the same IP Address. Only the first one is considered for matching inter-router-security policy between the network interface and peer adjacency.
------
- **I95-33313** Add units to 'show device-interface' output
------
- **I95-34112** Rename "show config events" -> "show events config"
------
- **I95-33594** Changing the `neighbor-as` of an existing bgp neighbor prevents it from connecting

  Until the system is upgraded to 4.5.0, this issue can be mitigated by restarting the 128T or by removing and recreating the bgp configuration
------
- **I95-35193** Performing a download of software may fail
  _**Conditions**_ 128T connection to the conductor is disconnected or restarted
------
- **I95-35391** Selecting a specific line within a custom report graph does not always select the metric clicked
------
- **I95-35793** Large responses from a DNS server may be rejected by 128. When this happens, FQDNs in the configuration remain unresolved.
  _**Conditions:**_ The following log message can be seen:
  ```
  Jun 16 06:09:25.272 [DNS |DNSR] WARN (dnsManagerTP ) Failed to parse Ipv4Host (1) response for edge-global.plcm.vc: Message too long
  ```
------
- **I95-35799** When a dynamic route is removed that exactly matches the prefix of a configured service, the route is removed from the RIB but it may remain in the FIB and still be used for establishing new sessions
------
- **I95-35873,I95-35679** Asset stuck in a connected state as a result of a corrupted linux rpmdb. The issue requires the system be updated to the 128T-installer version 2.6.1 (see [IN-267](release_notes_128t_installer_2.6.md#release-261). If the conductor is used to upgrade systems, the latest installer will be updated from the repository being used. If the systems do not have access to the 128T public repositories, the repository being used should be updated with the 128T-installer 2.6.1 version. With the correction of this issue, the PCLI command `send command yum-cache-refresh` has been updated to perform the rpmdb repair if the rpmdb is corrupted.

  Until the system is upgraded to 128T 4.5.0 and 128T-installer 2.6.1, the issue can be mitigated by running the following linux commands:
  ```
  rm -f /var/lib/rpm/__*
  rpm --rebuilddb
  ```
------
- **I95-35935** Configuring the same value for `router > conductor-address` on different routers will generate invalid configuration
------
- **I95-36012** `show device-interface` displays incorrect values for speed and duplex for LTE interfaces
------
- **I95-36109** Sessions may not reestablish properly on a fail-over between different routers to the same destination router (e.g., Session originates on R1 to R2. Later, the same session fails over to traverse R3 to R2)
------
- **I95-36146** Non-PCLI commands, such as pagination responses, are incorrectly stored in command history
------
- **I95-36283** The 128T router asset state is stuck on its current state
  _**Conditions:**_ The following log message can be seen:
  ```
  TypeError: heap argument must be a list
  ```
  Until the system is upgraded to 4.5.0, this issue can be mitigated by restarting the salt-minion service by executing `systemctl restart salt-minion` on the Linux shell. If not manually restarted, the salt-minion watchdog will also restart the salt-minion after one hour.
------
- **I95-36356** Loading a configuration that changes the BGP graceful-restart restart-time may cause a highway process crash if a subsequent graceful-restart timeout occurs

## Special Considerations

- **I95-33004** RoadRunner Removed
  The RoadRunner process collected anonymous information from the router and sent it to 128 Technology for storage and analysis. This helped inform and allows 128 Technology to support and improve the 128 Networking Platform. The anonymous data collection tool, RoadRunner has been removed from the product.
-----
- **I95-35629** The threshold for broadcast announcement for concurrent PCLI sessions has been increased from 4 to 10 as a result of I95-28366

## Caveats

- **I95-34941** _nodejs_ process can segfault during the upgrade of the 128T

  _**Corrective Action:**_ No action required. The webserver will immediately restart.
------
- **I95-33560** When upgrading a HA conductor to version 4.4.0 or later there is a compatibility issue due to an upgrade of the asset provisioning software. This results in a reported asset error that will persist until the two nodes are upgraded to the same version.

  _**Symptom:**_ This error is seen during the upgrade of an HA conductor pair to version 4.4.0 or later. An upgrade of a single standalone conductor node will not see this error. The following error will be reported by the node running software version earlier than 4.4.0:
  ```
"128T highstate: ["Rendering SLS '128T:reverse_ssh' failed: Jinja variable 'dict object' has no attribute 'iteritems'"]"
  ```
  This error can be viewed by running the following PCLI command from either node: `show assets <asset-id>`. Where asset-id is the asset-id of the node running pre 4.4.0 version that has not yet been upgraded.

  _**Corrective Action:**_ This error is transient and will only persist for the duration of the upgrade. The error it will not self-correct. Continue to upgrade the second conductor node. After upgrade, verify that there are no asset state errors.
------
