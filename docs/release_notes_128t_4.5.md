---
title: 128T 4.5 Release Notes
sidebar_label: 4.5
---

## Release 4.5.1

### New Features and Improvements

- **I95-33193** "About This System" within GUI now displays additional information specific to installation type (e.g., ISO vs. RPM).
------
- **I95-35319** "Managed Reports" (Custom Report factory defaults) are now shipped with the product.
------
- **I95-36112** Q-in-Q VLAN stacking

### Issues Fixed

- **I95-18807** Removed a benign error displayed in journal due to imudp module loaded by rsyslog daemon.

  _**Symptoms:**_ The following message can be seen in the journal:
  ```
  rsyslogd[1337]: imudp: module loaded, but no listeners defined - no input will be gathered [v8.24.0 try http://www.rsyslog.com/e/2212 ]
  ```
------
- **I95-32660** Log files were only rotated daily which may result in larger than expected log file size for the following: saltmaster, radvd, influxdb_http, t128tuntap.
------
- **I95-33989** Terminating a "validate" command with CTRL-c returns to the PCLI prompt but does not stop the in-progress validation. This prevents subsequent validation attempts until the in-progress validation completes in the background.

  _**Symptom:**_ The following can be seen in the PCLI output:
  ```
  ✖ Validating...
  % Error: Candidate configuration is invalid:
  1. A request of type validate is already in progress. The first request was started 13 seconds ago.
  ```
  Until the system is upgraded to 4.5.1, this issue will resolve itself after the background tasks have completed.
------
- **I95-33471** Adaptive encryption counters are incorrectly incremented when encryption is disabled and adaptive-encryption is enabled.
------
- **I95-35111** `No active NTP server` alarm erroneously generated when 128T can successfully reach a provisioned NTP server.
------
- **I95-35331** A custom chart that contains multiple line charts selects the incorrect graph when clicking on the corresponding legend.
------
- **I95-35406** Shutdown race condition may cause improper DHCP server clean up, causing DHCP server to fail on next start of 128T.
------
- **I95-35544** LTE SIM number (ICCID) is absent from the output of `show device-interface` on LTE interfaces.
------
- **I95-35933** `show device-interface` displays incorrect values for speed and duplex for PPPoE interfaces.
------
- **I95-36050** Race condition on HA Conductor may incorrectly report pending configuration changes when no changes exist.

  Until the system is upgraded to 4.5.1, this issue can be mitigated by applying a configuration change.
------
- **I95-36212** Fixed an issue where some Automated Provisioner actions would fail silently or return an error.

  _**Symptom:**_ The following message can be seen in the journal:
  ```
  "state.highstate" is running as PID 29159 and was started at 2020, Jul 09 14:26:54.384868 with jid 20200709142654384868
  ```
------
- **I95-36246** IMSI and MSISDN are absent from the output from `show platform` on systems with LTE interfaces.
------
- **I95-36341** Race condition can occur when receiving a BGP packet destined for the 128T during startup without a fully populated FIB, causing a system fault.
------
- **I95-36351** User without admin privileges cannot change their password.
------
- **I95-36358** Currently downloading version in the asset state would persist after a download has completed.

  Until the system is upgraded to 4.5.1, this issue can be mitigated by restarting the salt-minion service by executing `systemctl restart salt-minion` in the Linux shell. If not manually restarted, the salt-minion watchdog will also restart the salt-minion after one hour.
------
- **I95-36404** Highway process fails to start on Ubuntu distribution.

  _**Symptom:**_ 128T running in a container will fail to initialize when the container is running on Ubuntu distributions. The following can be seen within `highway.log`:
  ```
  Execute StdErr was ‘sysctl: cannot stat /proc/sys/net/ipv6/conf/default/optimistic_dad: No such file or directory’
  ```
------
- **I95-36416** Navigating to the DNS Config page under a router in GUI edit configuration results in error.

  Until the system is upgraded to 4.5.1, this issue can be mitigated by configuring dns-config via the PCLI.
------
- **I95-36536** Deleting a session-capture filter within the PCLI can cause the highway process to fault.
------
- **I95-36537** Dynamic session-captures are now created with a default session count of 100 instead of unlimited.
------
- **I95-36564** Buffer queue depth allocation algorithm was inefficient causing latency in session setup.
------
- **I95-36574** After an HA interface fail over, a session collision can occur between the recovered flow and an existing reverse flow. The recovered flow does not get set up properly and can cause the highway process to fault upon session expiry.

  _**Conditions:**_ Symmetrical services must be configured that match both forward and reverse flows.
------
- **I95-36591** Using connected route redistribution causes routes to be re-advertised or flapped, resulting in packet loss.
------
- **I95-36604** Debug tables within the GUI do not honor the node selector.
------
- **I95-36608** `network-interface > management` is not configurable when `device-interface > type` is not explicitly configured.
------
- **I95-36632** Empty Office365 metadata file results in HTTP 400 bad request error.
------
- **I95-36638** Polling SNMP OID 1.3.6.1.2.1.1.2 returns `NET-SNMP-TC::linux` instead of `T128-MIB::t128NetworkingPlatform (1.3.6.1.4.1.45956.1)`
------
- **I95-36645** Bytes converter in the GUI does not handle values larger than Terabyte (TB), leaving value in bytes.
------
- **I95-36646** SVR Savings page automatically refreshes, resetting router selector.
------
- **I95-36672** Deleting all session-capture filters on a _device-interface_ with active traffic can cause the highway process to restart.
------
- **I95-36727** A non-forwarding, external (i.e. management) interface configured in 128T does not obtain a DHCP IP upon disconnecting and reconnecting the cable.
------
- **I95-36770** Salt minion log file was not being properly rotated.
------
- **I95-36779** Clarified Template Import Error Message to properly indicate advanced mode templates cannot be imported in basic mode.
------
- **I95-36780** SNMP Traps are incorrectly sent for routers in maintenance mode when peer path goes down.
------
- **I95-36832** Erroneous restart required alarm raised during configuration change when restart is not needed.
------
- **I95-36841** TCP RST can cause the highway process to fault on a SVR path performing UDP transform.
------
- **I95-36850, I95-36851** An asset's available and downloaded versions are incorrectly cleared when an upgrade or rollback is initiated.
------
- **I95-36866** When adding an access policy in a service in the GUI, the tenant drop down list comes up empty on the first try.

  Until the system is upgraded to 4.5.1, this issue can be mitigated by canceling out and repeating the operation again. The list will be fully populated on subsequent attempts.
------
- **I95-36872** Azure-based Accelerated Networking Interfaces may fail to reinitialize upon restart of 128T.
------
- **I95-36879** Firewalld zone will not be created for management over forwarding interfaces that are configured with a VLAN.
------
- **I95-36891** Exception thrown in PCLI when `CMD`+`right arrow` jumping past the end of an auto complete command.
------
- **I95-36927** Race condition can cause a fault in the highway process during session setup and configuration change removes BGP service route path
------
- **I95-37006** Peer path establishment may fail for waypoint interfaces that use DHCP (e.g., LTE) when upgrading from 4.4.x.
------
- **I95-37021, I95-37026** Configuring overlapping session-types could cause the highway process to ignore the configuration change.
------
- **I95-37042** 128T process `prank` journal logs were incorrectly excluded from output of `save tech-support-info`.
------
- **I95-37106** Initiating a download on an HA router may silently be ignored on one of the nodes if it was in "connected" state.
------
- **I95-37131** Unable to perform SNMP query for table indices on 128T OIDs.
------
- **I95-37168** Race condition can cause system fault when creating candidate configuration.
------
- **I95-37217** Reverse metadata was not being updated properly when the service routes were of type `next-peer`, resulting in an inability to recover sessions upon node failover.
------
- **I95-37220** 128T deployed behind a NAT may fail to recover a session after a node failure.
------
- **I95-37226** Output of `show network-interface` on non-active HA node may result in empty address for interfaces.

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
- **I95-33313** Add units to `show device-interface` output.
------
- **I95-34112** Rename `show config events` -> `show events config`.
------
- **I95-33594** Changing the `neighbor-as` of an existing bgp neighbor prevents it from connecting.

  Until the system is upgraded to 4.5.0, this issue can be mitigated by restarting the 128T or by removing and recreating the bgp configuration.
------
- **I95-35193** Performing a download of software may fail.
  _**Conditions**_ 128T connection to the conductor is disconnected or restarted.
------
- **I95-35391** Selecting a specific line within a custom report graph does not always select the metric clicked.
------
- **I95-35793** Large responses from a DNS server may be rejected by 128. When this happens, FQDNs in the configuration remain unresolved.
  _**Conditions:**_ The following log message can be seen:
  ```
  Jun 16 06:09:25.272 [DNS |DNSR] WARN (dnsManagerTP ) Failed to parse Ipv4Host (1) response for edge-global.plcm.vc: Message too long
  ```
------
- **I95-35799** When a dynamic route is removed that exactly matches the prefix of a configured service, the route is removed from the RIB but it may remain in the FIB and still be used for establishing new sessions.
------
- **I95-35873,I95-35679** Asset stuck in a connected state as a result of a corrupted linux rpmdb. The issue requires the system be updated to the 128T-installer version 2.6.1 (see [IN-267](release_notes_128t_installer_2.6.md#release-261). If the conductor is used to upgrade systems, the latest installer will be updated from the repository being used. If the systems do not have access to the 128T public repositories, the repository being used should be updated with the 128T-installer 2.6.1 version. With the correction of this issue, the PCLI command `send command yum-cache-refresh` has been updated to perform the rpmdb repair if the rpmdb is corrupted.

  Until the system is upgraded to 128T 4.5.0 and 128T-installer 2.6.1, the issue can be mitigated by running the following linux commands:
  ```
  rm -f /var/lib/rpm/__*
  rpm --rebuilddb
  ```
------
- **I95-35935** Configuring the same value for `router > conductor-address` on different routers will generate invalid configuration.
------
- **I95-36012** `show device-interface` displays incorrect values for speed and duplex for LTE interfaces.
------
- **I95-36109** Sessions may not reestablish properly on a fail-over between different routers to the same destination router (e.g., Session originates on R1 to R2. Later, the same session fails over to traverse R3 to R2.)
------
- **I95-36146** Non-PCLI commands, such as pagination responses, are incorrectly stored in command history.
------
- **I95-36283** The 128T router asset state is stuck on its current state.
  _**Conditions:**_ The following log message can be seen:
  ```
  TypeError: heap argument must be a list
  ```
  Until the system is upgraded to 4.5.0, this issue can be mitigated by restarting the salt-minion service by executing `systemctl restart salt-minion` on the Linux shell. If not manually restarted, the salt-minion watchdog will also restart the salt-minion after one hour.
------
- **I95-36356** Loading a configuration that changes the BGP graceful-restart restart-time may cause a highway process crash if a subsequent graceful-restart timeout occurs.

## Special Considerations

- **I95-33004** RoadRunner Removed
  The RoadRunner process collected anonymous information from the router and sent it to 128 Technology for storage and analysis. This helped inform and allows 128 Technology to support and improve the 128 Networking Platform. The anonymous data collection tool RoadRunner has been removed from the product.
-----
- **I95-35629** The threshold for broadcast announcement for concurrent PCLI sessions has been increased from 4 to 10 as a result of I95-28366.
------
- **I95-36525** TLS 1.0 is no longer supported.

## Caveats

- **I95-34941** _nodejs_ process can segfault during the upgrade of the 128T.

  _**Corrective Action:**_ No action required. The webserver will immediately restart.
------
- **I95-33560** When upgrading a HA conductor to version 4.4.0 or later there is a compatibility issue due to an upgrade of the asset provisioning software. This results in a reported asset error that will persist until the two nodes are upgraded to the same version.

  _**Symptom:**_ This error is seen during the upgrade of an HA conductor pair to version 4.4.0 or later. An upgrade of a single standalone conductor node will not see this error. The following error will be reported by the node running software version earlier than 4.4.0:
  ```
"128T highstate: ["Rendering SLS '128T:reverse_ssh' failed: Jinja variable 'dict object' has no attribute 'iteritems'"]"
  ```
  This error can be viewed by running the following PCLI command from either node: `show assets <asset-id>`. Where asset-id is the asset-id of the node running pre 4.4.0 version that has not yet been upgraded.

  _**Corrective Action:**_ This error is transient and will only persist for the duration of the upgrade. The error will not self-correct. Continue to upgrade the second conductor node. After upgrade, verify that there are no asset state errors.
------
