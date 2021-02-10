---
title: 128T 4.5 Release Notes
sidebar_label: 4.5
---

## Release 4.5.5

### Resolved Issues

- **I95-38833 Q-in-Q packets are not recognized when packets have non-zero DSCP value:** Resolved an issue where a WAN interface with Q-in-Q enabled was incorrectly reading the VLAN tag from the outer VLAN header.

## Release 4.5.4

### Resolved Issues

- **I95-35919 Resolve SSH-related vulnerabilities:** [Several fixes have been put in place to harden SSH access.](config_access_mgmt.md) With these changes, upgrading a router changes the host key identifier. This results in the SSH message: WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED being displayed after the upgrade, as well as when a user connects to the system using the `ssh` command.
------
- **I95-37192 Template Instance Input Helpers:** Added the ability to define input helper text for a given templated parameter, so that template consumers enter data appropriate to the input form.
------
- **I95-37774 Detached Flow Collision:** Resolved a rare case that allowed a flow collision with a detached flow that may result in an application fault.
------
- **I95-38084 SNMP failure alarm after upgrade:** Resolved an issue where the snmpd service was starting before the configuration had been received causing the failure alarm.  
------
- **I95-38152 Access Policy field in GUI with wrong title:** Corrected the title in the Access Policy for Service field.
------
- **I95-38175 Deleting an invalid interface from the router logs an error:** Resolved an issue where a non-forwarding interface would fail to be removed from Linux when deleted from configuration.
------
- **I95-38194 Conductor cannot see peer path stats in GUI:** The web server now makes an explicit version check to verify the correct data is sent. 
------
- **I95-38196 Session Collision:** Resolved a situation that occurs when a flow is setup at the same time from both directions, the subsequent collision results in only one of the two flows being established.
------
- **I95-38223 Using a question mark on a command that does not exist creates a stack trace:** Added checks against syntax in Command line commands. 
------
- **I95-38230 [Support reverse arp learning for off subnet IPs](config_reference_guide.md#network-interface):** A flag has been added to allow the ARP entry for each of the reverse flows to use the source MAC from the incoming packet as the subnet source IP address.
------
- **I95-38299 Not handling ICMP request with Zero as identifier:** ICMP packets with a value of 0 are now handled correctly. 

## Release 4.5.3

:::warning
SSH Root Login is not permitted. 

Before upgrading, ensure that there is at least one user on each 128T system that has sudo privileges. Failure to do so may result in the loss of remote management connectivity to the 128T Networking Platform. Please see the [Installation Overview](intro_installation.md) for additional information. 
:::

### New Features and Improvements

- **I95-34924 CLI changes for `show sessions`.** The `show sessions` command has an additional subcommand `by-id` that will display a specific session by entering the session-ID. See [show sessions](cli_reference.md#show-sessions) for additional details.
------
- **I95-36122 Set interface provisional status.** The [`set provisional-status` interface state](cli_reference.md#set-provisional-status) has been added to allow an interface to be brought down for administrative purposes. [`show device-interface`](cli_reference.md#show-device-interface) has been updated to display the interface provisional status. 
------
- **I95-37855 Configurable waypoint allocation.** The `max-way-points` value is configurable at the adjacency level for each associated inter-router path. 
The `max-inter-node-way-points` value is configurable at the router level for all inter-node paths. Please refer to [`max-inter-node-way-points`](config_reference_guide.md#max-inter-node-way-points) and [`max-way-points`](config_reference_guide.md#max-way-points) for more details. 
------

### Resolved Issues
- **I95-35567, I95-37833 Weak Password Policy.** New restrictions on password properties have been added to ensure strong passwords.
------
- **I95-35987 Downloading exported config files does not preserve the file name.** The download process correctly preserves the file name. 
------
- **I95-36656 Asset-ID not included in Quickstart file.** Updates have been made to always include the Asset-ID in the quickstart file. 
------
- **I95-36910 Failed to setup IP address on linux interface when VLAN is configured.** IP addresses are now setup correctly. 
------
- **I95-37225 Routers disconnect from their Conductors.** Improved the handling of clock drift between multiple worker cores within the datapath.
------
- **I95-37457 `show rib` and `show bgp` do not support more than one pagination session.** Pagination issues have been resolved for `show rib` and `show bgp`. 
------
- **I95-37514 App-ID result is stuck pending if script is not executable.** App-ID results are no longer held pending. 
------
- **I95-37577 LDAP authentication fails for users that contain a '-' in their name.** Naming issues have been resolved with LDAP authentication. 
------
- **I95-37638 Duplicate Assets showing in CLI.** Resolved an issue where there were duplicate values in the output of `show assets`.
------
- **I95-37642 A user cannot change their password from the 128T GUI.** A user can now change their 128T password from the web application GUI.
------
- **I95-37643 Accounts with the role of "user" have access to plugin REST API resources.** Account privileges have been reviewed and updates have been made to remediate this vulnerability. 
------
- **I95-37644 Analytics backend requests do not adhere to a strict schema.** This vulnerability has been addressed, and fixes put in place to prevent SQL injection attacks.
------
- **I95-37645 Restriction of excessive authentication attempts.** [The user is now locked out after six failed login attempts.](config_access_mgmt.md#limiting-login-attempts) 
------
- **I95-37646 Password Change does not require current password.** The password change process has been strengthened, and now requires the current password.
------
- **I95-37647 Server-Sent-Events pass values in the clear for some internal request URIs.** Vulnerabilities identified with server sent events have been resolved.
------
- **I95-37650 The 128T web UI incorrectly supports being embedded as an iFrame within another page.** The 128T UI does not support embedded iFrames.
------
- **I95-37651 Unrestricted File Upload.** [Restrictions are in place](config_access_mgmt.md#file-upload-limitations) that make it impossible to import or upload files that do not match tar.gz format. 
------
- **I95-37652 SSH Follows Weak Security Practices.** [Several fixes have been put in place to harden SSH access.](config_access_mgmt.md) Please see the warning regarding SSH Root Login at the top of this page.
:::note
As part of the SSH hardening process, inactive SSH sessions will be logged out after 60 minutes. Please see [Access Management](config_access_mgmt.md) for additional information.
:::
------
- **I95-37666 Excessive ARPs from Broadband modem causing a Link Down condition.** The per-pipe restrictions have been lifted and distributions for the application scheduler have been rebalanced. 
------
- **I95-37680 nodeMonitor process may fault on shutdown of 128T.** `nodeMonitor` no longer faults on 128T shutdown.
------
- **I95-37752 A race condition exists when a session is manually deleted through the `delete sessions` PCLI command.** The `delete sessions` command no longer creates a race condition. 
------
- **I95-37777 Adding SNMP configuration may cause webserver to be inaccessible.** This issue has been resolved; adding SNMP configurations no longer impacts the Webserver. 
------
- **I95-37791 128T Search crashes on an unknown config.** This issue has been resolved, the 128T search no longer encounters issues with leftover plugins. 
------
- **I95-37800 Apply MSS Clamping on SYN/SYN+ACK packets.** MSS enforcement has been enabled on SYN-ACK packets.
------
- **I95-37806 Unable to delete sesions when a service no longer exists.** Services that no longer exist can now be deleted. 
------
- **I95-37819 Ensure rsyslog default file permissions are configured.** The default file permissions for log files created by rsyslog are set. 
------
- **I95-37822 Ensure the noexec option is set on the /dev/shm partition.** The shared memory partition /dev/shm is configured with the noexec mount option during initialization.
------
- **I95-37823 Ensure the "sticky bit" is set correctly on all world-writable directories.** The bit is set to protect all world-writable directories.  
------
- **I95-37825 Ensure that AIDE (Advanced Intrusion Detection Evironment) is installed.** The AIDE package is installed and is a 128T dependency. 
------
- **I95-37828 Ensure core dumps are restricted.** Coredump tuning has been updated with the latest security settings, and will not be collected on processes with privilege escalation.
------
- **I95-37830 Ensure permissions on /etc/crontab and related cron files are configured.** The permissions on cron files have been updated with the latest security settings.
------
- **I95-37831 The default umask setting on user-created files must be more restrictive.** The default umask setting has been updated to be more restrictive. 
------
- **I95-37842 Inter-router flow move failure for sessions with same source/dest port (UDP/TCP/ICMP).** Inter-router flow movement now identifies session source when the source and destination port are the same. 
------
- **I95-37843 Require username and password when updating environmental configuration.** The initializer has been updated to require both a username and password when installing 128T and configuring it as the second peer in an HA configuration. 
------
- **I95-37908 The routingEngine.log is not rotated.** Log rotation has been updated to rotate the routingEngine log file.
------
- **I95-38008 Automated Provisioner race condition.** Resolved an issue causing a race condition when multiple events arrived at the same time.  
------
- **I95-38012 Remediate CVE's for kernel-3.10.0-1127 and update kernel.** Kernel updates have been made and are included in the release.
------
- **I95-38015/I95-38078 CVE updates.** Addressed latest CVEs.
------
- **I95-38119 Entry insertion into FIB causes issues with lookup returning a less specific match.** A stronger lookup strategy has been implemented to provide accurate results.

## Release 4.5.2

### Resolved Issues

- **I95-34650** In a multihop SVR scenario, the system may incorrectly attribute incoming packets as coming from a different peer path. This results in packet loss until the load-balancer learns of the loss and migrates the session.

  _**Symptom:**_ Show peers will show the physically disconnected peer as UP while in this state.
------
- **I95-35927** When deleting a VLAN network interface and simultaneously assigning its VLAN ID to the only other remaining network interface on the same device interface, future operational state changes on that interface may be ignored.
------
- **I95-36540** Session expiry logic algorithm was inefficient causing latency in session setup.
------
- **I95-36873** Alarms generated by a router in an authority are incorrectly sent as SNMP traps from all other routers in the authority.
------
- **I95-37197** Configuration validation will now fail if you configure overlapping session-type ranges within the same protocol.
------
- **I95-37269** Session may not recover correctly after path migration for outbound only connections.
------
- **I95-37304** Automatic installation recovery procedure can inadvertenty terminate an in-process upgrade resulting in a 128T system not being able to boot.
------
- **I95-37308** Upgrade to 4.5.1 or Rollback can create multiple defunct salt-minion processes.
------
- **I95-37325** Asset state may incorrectly state `connected` after node failover.
------
- **I95-37338** When connection resiliency is enabled, the salt-minion on managed routers can intermittently disconnect.
------
- **I95-37341** Support for Azure Accelerated Networking MT27710 ConnectX-4 LX Virtual Function device.
------
- **I95-37359** `reachability-detection tcp establishment` metric incorrectly increments `close-before-establishment`.
------
- **I95-37402** The output of `show stats` is missing from tech-support-info.
------
- **I95-37436** When a sub-tenant is removed from the configuration, and the sub-tenant has a parent tenant used in a service access-policy, the sub-tenant may remain in the FIB.
------
- **I95-37442** The summary is missing from PCLI `ping` and `service-ping`.
------
- **I95-37477** An exception is thrown in the PCLI when issuing tab complete for `capture-filter` command.
------
- **I95-37512** Starting the PCLI prior to the 128T starting may produce an error message.

  _**Symptom:**_ % Error: Unhandled ConnectionError: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response',))
------
- **I95-37513** Network interface cards that do not respond to physical stats may result in system lockup.
------
- **I95-37518** An aborted configuration commit operation can result in a system fault when processing traffic.
------
- **I95-37523** Querying the router asset state from the conductor can cause the asset state to remain in its current state perpetually.
------
- **I95-37531** RTT reported by PCLI ping is incorrectly dividing result by 1000.
------
- **I95-37550** A possible race condition causes the next-hop ARP state to be incorrect between HA nodes of a router, potentially causing traffic to fail.
------
- **I95-37576** Waypoints that are configured for `outbound-only` may experience one way traffic in session migration scenarios if the session on the public side expires, but the session on the private side still exists.
------
- **I95-37588** Value for `configure > authority > router > system > software-update > repository > address` uses the first lexigraphically sorted router for all other routers in authority instead of using a unique value per router.
------
- **I95-37597** Data structure for FIB has been redesigned to increase memory utilization by 45%.
------
- **I95-37617** Linux-based `save-tech-support-info` may not capture event history.
------
- **I95-37693** A race condition exists when retransmitting BGP over SVR packets causing a fault in the highway.
------
- **I95-37696** Users that have not previously logged in are unable to login when configured to use LDAP.
------
- **I95-37697** LDAP authentication fails for users that contain a '.' in their name.

## Release 4.5.1

### New Features and Improvements

- **I95-33193** "About This System" within the GUI will display additional information if it is a container ("128T-docker") or if installed with a 128T OTP ISO.
------
- **I95-35319** "Managed Reports" (Custom Report factory defaults) are now shipped with the product.
------
- **I95-36112** Q-in-Q VLAN stacking

### Resolved Issues

- **I95-18807** Removed a benign error displayed in journal due to imudp module loaded by rsyslog daemon.

  _**Symptoms:**_ The following message can be seen in the journal:
  ```
  rsyslogd[1337]: imudp: module loaded, but no listeners defined - no input will be gathered [v8.24.0 try http://www.rsyslog.com/e/2212 ]
  ```
------
- **I95-32660** Log files were only rotated daily which may result in larger than expected log file size for the following: saltmaster, radvd, influxdb_http, t128tuntap.
------
- **I95-33471** Adaptive encryption counters are incorrectly incremented when encryption is disabled and adaptive-encryption is enabled.
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
- **I95-35111** `No active NTP server` alarm erroneously generated when 128T can successfully reach a provisioned NTP server.

  _**Conditions:**_ When multiple NTP servers are configured, at least one is reachable and at least one is not reachable.
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

### Resolved Issues

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
- **I95-33560** When upgrading an HA conductor to version 4.4.0 or later there is a compatibility issue due to an upgrade of the asset provisioning software. This results in a reported asset error that will persist until the two nodes are upgraded to the same version.

  _**Symptom:**_ This error is seen during the upgrade of an HA conductor pair to version 4.4.0 or later. An upgrade of a single standalone conductor node will not see this error. The following error will be reported by the node running software version earlier than 4.4.0:
  ```
"128T highstate: ["Rendering SLS '128T:reverse_ssh' failed: Jinja variable 'dict object' has no attribute 'iteritems'"]"
  ```
  This error can be viewed by running the following PCLI command from either node: `show assets <asset-id>`. Where asset-id is the asset-id of the node running pre 4.4.0 version that has not yet been upgraded.

  _**Corrective Action:**_ This error is transient and will only persist for the duration of the upgrade. The error will not self-correct. Continue to upgrade the second conductor node. After upgrade, verify that there are no asset state errors.
------
- **I95-37687** PCLI configuration change flag `*` may persist in the active PCLI session after a configuration commit operation.

  _**Corrective Action:**_ Exit and re-enter the PCLI after a commit to remove the flag.
------
- **I95-37752** A race condition exists when a session is manually deleted through the `delete sessions` PCLI command; interim IPFIX record generation or HA session synchronization may cause the highway process to fault.
