---
title: SSR 6.1 Release Notes
sidebar_label: '6.1'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically.

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.mdx)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page.
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.
------
- **I95-51007 Conductor only - cpuProperties-core value isolating cores:** *In SSR software versions 6.0.0 and greater*, the `cpuProperties-cores` setting in `/etc/128technology/local.init` is erroneously isolating cores on conductor nodes when set. Because the conductor does not forward packets, there should be no traffic cores allocated to or isolated on the conductor for packet forwarding. This setting was previously ignored on the conductor, but while resolving an earlier issue with the installer and initializer that allocated CPU cores for traffic, that is no longer the case. 

It is recommended that prior to upgrading the conductor that the user modify local.init to set this setting to `0`. For example, a setting like this in `/etc/128technology/local.init`:

```
  "cpuProperties" : {
    "cores" : 4
  },
``` 
should be changed to:
```
  "cpuProperties" : {
    "cores" : 0
  },
```

Note that only the relevant section of `local.init` is shown for clarity. All other settings should be left the same.
The change should be made on both nodes of an HA system. If a conductor is already running 6.0.0 or later it will be necessary to `systemctl restart 128T` on each node after making this change. If the modification is made prior to upgrade it is not necessary to restart 128T service as this will be performed during the upgrade. Making this change on versions earlier than 6.0.0 will not affect operation, and will not require a restart. 

This issue will be corrected in an upcoming release.

:::note
The Juniper SSR team does not publicly disclose known or resolved CVEs in our public documentation but instead utilizes our internal bug tracking IDs. Customers can obtain the actual CVE numbers by contacting Juniper Support.
:::

## Release 6.1.4-R2

**Release Date:** July 14, 2023

### New Features

NOTE FOR REVIEWERS: **The links in the New Features section will not work. The documents are all in separate PRs to be merged Thursday or Friday.**

- **I95-466 LAG/LACP Support:** Link Aggregation Groups are formed by connecting multiple ports in parallel between two devices. LACP is the protocol that defines how the group of interfaces operates. Users define the LAG interface and then configure the member device interfaces. For more information, see [Link Aggregation and LACP](config_lacp.md).
------
- **I95-10141 LLDP Support:** The LLDP mode and parameters allow users to configure the device interface to disable LLDP advertisements, set a `receive-only` mode, or enable sending and receiving LLDP packets. For information about configuring LLDP, see [`lldp`](config_reference_guide.md#lldp).
------
- **I95-20864 Support for Multicast:** Multicast is a “one source, many destinations” method of traffic distribution. For more information, see [Multicast](config_multicast.md). Note that an earlier issue (I95-48792) with Encryption on the original version of Multicast not working correctly has been resolved in this release. 
------
- **I95-44473 Application Steering:** Application Steering provides the ability to configure unique steering policies for individual applications based on the application name, category, application signatures, URLs, and domains. Once the traffic has been classified, it can be steered across the available paths. For more information, see [Application Steering](config_application_steering.md).
------
- **I95-48922 Common Criteria Certification - Network Device Protection Profile:** Waiting for Max's input on this.
------
- **I95-49928 BGP over SVR Inter-Hub Steering:** Path based BGP over SVR Routing responds to changes in peer adjacency, operational status, or SLA. It adds the ability to select and advertise BGP routes between BGP over SVR neighbors. It does this by monitoring the peer paths between BGP over SVR peers and dynamically adjusting the BGP neighbor inbound and outbound policy on those peers to reflect the priority and SLA of the peer paths. For more information, see [BGP over SVR Inter-Hub Steering](config_bgp.md#bgp-over-svr-inter-hub-steering).
------
- **I95-50571/I95-50949/I95-51039 Add packet buffer tracking to help analyze buffer exhaustion:** Packet buffer location tracking has been added, and the following PCLI commands have been created for buffer tracking. 
  - `show packet-buffer locations`
  - `save packet-buffer snapshot`
------
- **I95-50810 IDP Custom Rules and Policies:** Users can customize an existing base IDP policy by creating exception-based rules. Using an existing IDP policy, you can modify the profile to allow the specific traffic to flow as expected within the network. See [IDP Custom Rules](concepts_ssr_idp.md#idp-custom-rules) for overview information, and refer to [Modifying IDP Policies](config_idp.md#modifying-idp-policies) for configuration information.
------
- **I95-50973 DSCP Steering with BGP over SVR:** DSCP steering is now supported on BGP over SVR.
------
- **I95-51296 Show `Time in Status` in the `show assets` detail view:** The asset `Time in Status` field has been added to the Detail view. 

### Resolved Issues

- **I95-35069 Disallow changing the role of a node:** Once set, changing the role of a node cannot be changed. The configuration validation process has been updated to not allow this change. 
------
- **I95-46895 Teams traffic classified as Azure:** Improvements made to the application database  `ip-protocol-port lookup` during session classification. 
------
- **I95-47960 Incorrect progress message for `show dns resolutions`:** The progress message for this command now correctly displays `Retrieving dns resolutions...`.
------
- **I95-49587 ICMP session classification improvement:** The application lookup for ICMP sessions now accurately identifies the correct service.
------
- **I95-49598 Automatically choose the number of session-processor threads:** If session-setup-scaling is provisioned to true, the SSR will now automatically determine the number of threads to use for session processing.
------
- **I95-49791 Audit rules to track modification of config files:** Added rules to track the modification of grub configuration files, to aid in troubleshooting. 
------
- **I95-50338 "About this System" link on GUI not working:** The link target is no longer valid, and the link has been removed from the GUI. 
------
- **I95-50632 Add Buffer tracking monitoring to lockup detector:** LockupDetector is now able to identify and take corrective action should a network packet pool buffer exhaustion event occur. 
------
- **I95-51003 `show stats process queue depth` command is redundant:** The redundant `process/queue/depth` statistic has been removed. It is superseded by `process/thread/queue/depth` and the information available using `show stats process thread queue depth` and related commands.
------
- **I95-51053 ESP session stuck in Incomplete state:** Resolved an issue where SVR sessions from network-interfaces with `dscp-steering enabled` can be stuck in an incomplete state.
------
- **I95-51081 `bgp-service-generation service-policy` is being filtered on the conductor:** The `bgp-service-generation service-policy` is now marked as authority wide so it is not filtered. This prevents managed routers from rejecting configurations containing `bgp-service-generation` and getting out of sync with the conductor.
------
- **I95-51167 Unable to override auto-generated peer service-route:** The user can now provision a `service-route` with the same `name` as an automatically-generated one. The user's `service-route` takes precedence and will be used instead of the generated one.
------
- **I95-51177 Ethernet over SVR setting wrong egress MAC address:** Ethernet over SVR now correctly sets the egress MAC address when using `outbound-only` mode.
------
- **I95-51178 Increase default `juteMaxBufferSize`:** The default `juteMaxBufferSize` has been increased to 10MB, which addresses issues where the device is unable to commit very large configurations.
------
- **I95-51201 Autocompletion in `adopt` command generates invalid organization name:** When using tab-completion to enter the site name from the `adopt` command in the PCLI, it will add quotations around the site name if there are whitespaces in the name. The PCLI now properly handles quotes and whitespace in organization names when running the PCLI adopt command.
------
- **I95-51203 Update stats retention periods:** Some of the `process/thread/queue`  statistics are now recorded for a longer time period, and are available in custom charts and tables on the Conductor.
------
- **I95-51284 Routers remain in the connected state:** Updated the dependencies within the salt minion to resolve an issue where an asset is stuck in the connected state, displaying the error; `Error getting asset's public key: 'ssh.set_auth_key', retrying...`.
------
- **I95-51359 Unable to set the OSPF MTU:** Added the ability for users to set the MTU to a non-default value.
------
- **I95-51403 GUI displays download in progress even after the download is complete:** Resolved an issue where a download success event is never created even though the version shows up as downloaded in the software versions. 
------
- **I95-51427 GUI not displaying all the version information:** The GUI About page now displays additional version information previously only displayed in the PCLI `show system version detail`.
------
- **I95-51629 `ingress-source-nat-pool` should not display non-SVR traffic:** Previously, the `ingress-source-nat-pool` configured under `network-interface` applied to both SVR and non-SVR sessions, now it only applies to SVR sessions.
------
- **I95-51650 `log-category PCLI` command not working:** Resolved an issue that disallowed setting `config authority router <name> system log-category PCLI`. We now also allow configuring the following log categories:
  - CFGD
  - SNMP
  - HTTP
------
- **I95-51658 Allow `sync` command in resynchronizing state:** Resolved an issue where the user received an error when executing the `send command sync` command while an asset was in the `resynchronizing` state.
------
- **I95-51714 Adding and deleting a domain-name in the same operation causes an error:** Resolved an issue in the configuration validation that generated an error when duplicate domain-names are removed from and added to the service configuration.
------
- **I95-51734 Remove duplicate transport port-ranges from modules before adding to service:** Resolved an issue where FIB entries are not installed when app-id modules have conflicting or overlapping port-ranges, and are being placed into one service.
------
- **I95-51788 Path index is not displayed correctly for `show sessions by-id`:** `show sessions by-id` has been updated to display MTU and PathIndex.
------
- **I95-51792 Low MTU threshold causing metadata fragmentation:** Fixed the incorrect handling of packets where metadata is fragmented due to unreasonably low MTU, causing the packet buffers to become exhausted.
-----
- **I95-51793 Path MTU discovery dropping very low:** Fixed PMTU discovery from ever resolving to an unreasonably low MTU, which could previously occur during a link flap event.
------
- **I95-51794 IBU Crash/Core dump on Lenovo SR-650:** Resolved an issue where the SR-650 was crashing due to uninitialized flags field. Support has been added for these devices. 
------
- **I95-51915 Report buffer allocaction failures to watchdog:** `alloc-failure` stats are now gathered per KNI device and included in the device stats, allowing the watchdog to detect a failure and respond.
------
- **I95-51964 Make the loopback-address available on the conductor:** The loopback-address configuration  is now accessible on the conductor, and allows for a per node user defined address to be configured for overlay management traffic.
------
- **WAN-1471 Cannot distinguish between an SSR installed with OTP ISO and IBU image:** The `show system version` PCLI command now clarifies image-based or ISO in the summary view as well as the detail view.

## Release 6.1.3-4

**Release Date:** May 22, 2023

### Resolved Issues

- **I95-48931 Service area Highway crash:** Now prevents crashing in SSR's highway process in unusual race conditions when a session's flow is removed before the session is fully established.
------
- **I95-50722 Highway crashes during session migration:** Resolved a crash in the SSR's highway process, due to a race condition between configuration changes and BFD sessions.
------
- **I95-51364 Highway crash on both nodes of an HA system:** Resolved a crash that can occur in the highway process of the SSR when deployed in HA mode, due to spurious redundancy database errors.
------
- **I95-51378 REST API improvements:** Performance improvements have been made in the metrics REST APIs to alleviate issues with intermittent metrics graphs on heavily loaded systems.
------
- **WAN-1958 Mist agent crashes:** Increased internal file system limits which were preventing some services from starting correctly at boot. Limits were raised based on expected system usage. 

## Release 6.1.2-7

**Release Date:** May 12, 2023

### New Features

- **I95-48862 Load balance sessions across BGP RIB Entries with multiple paths:** Resolved an issue when BGP was used to build a routing table, only the first next hop was used. All next hops are now used, and load balancing occurs over all routing protocol routes. 
------
- **I95-50510 New fields for IPFIX:** The SSR IPFIX implementation was not sending the industry standard fields of `flowStartMilliseconds` and `flowEndMilliseconds`. In the new implementation, all IPFIX records include these fields. The start time is set to the start time of the flow, and the end time is always set to the time the last packet was received on the flow. For intermediate records, this indicates that the flow is still ongoing but provides the last activity timestamp. For the end records, this indicates when the last packet was received on the flow prior to the session terminating. For additional information, see [IPFIX](concepts_application_discovery.md#ipfix). 
---
- **I95-50571 Add packet buffer tracking to help analyze buffer exhaustion:** The following features have been added to help diagnose frequent packet buffer pool depletions in customer environments:
  - Track packet buffer locations. 
  - Enforce setting of packet location.
  - Add the ability to walk packet buffer pools, count the locations, and display. 

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** I95-50535, I95-50790.
------
- **I95-47776 Tank hostname parsing errors:** Resolved two issues in the Tank instance where the localhost could not resolve to an IP address, and Tank was not identifying non-default ports. These issues have been resolved. 
------
- **I95-48518 Application Identification not recognizing Apps on HA systems:** Resolved an issue where the GUI was only pulling Application data from one node in an HA configuration. Application ID Summary display now aggregates data from both nodes.
------
- **I95-49594 Highway Crash:** Resolved an issue for systems where any of the following are configured:
  - `application-identification` is enabled, 
  - a service is defined with `domain-name child services`, or 
  - a `service address` is configured as a `domain`
and there are established flows for any of these services, a link flap triggering a flow invalidation (changes to FIB) will induce a crash in the highway process of the SSR. This issue exists in versions 6.1.0 and 6.1.1, and is resolved in 6.1.2.
------
- **I95-49603 Process Manager crash:** When a long running process was being cleaned up by the subprocess, the cleanup would fail causing a crash. Long running processes are now properly terminated, which allows the cleanup subprocess to complete correctly. 
------
- **I95-49754 Waypoint re-use causing duplicate reverse flows:** Resolved a case where when the waypoint pool is nearly depleted, released waypoints were reused prematurely causing errors when installing reverse flows.
------
- **I95-49969 Permission Denied error when attempting to self-generate a webserver certificate:** Resolved an issue that prevented users with the admin role from creating a new self-signed web certificate via the PCLI command `create certificate self-signed webserver`.
------
- **I95-49974 Stuck flow not cleared when reverse metadata is incomplete:** Resolved an issue where reverse metadata is coming through incomplete - without the source tenant. The source tenant has been added to the reverse metadata.
------
- **I95-50363 MOS Metrics not refreshing:** Resolved an issue where the SLA and MOS values were not being updated in the stats (or PeerPathTable) when a BFD session was brought down. The SLA and MOS stats are now set to 0 when the BFD session is brought down.
------
- **I95-50543 systemd unable to start 128T after upgrade:** This issue has been resolved by ensuring that the netfilter kernel is installed.
------
- **I95-50710 Configuration cannot be applied to router when its time is ahead of the conductor:** Implemented time detection for configurations using a future time that is corrected upon commit. This resulted in an `mtime` older than what is in the datastore, and the configurations were rejected.
------
- **I95-50736 SSH key change not propogated to secondary conductor:** Resolved an issue where an SSH key change to `/etc/128technology/ssh/pdc_ssh_key` was not automatically detected and resynced between peer node and conductor nodes. 
------
- **I95-50778 Event History filter not working:** Resolved an issue where searching on the Event History page didn't show matching results when the search string is only found in the **Details** column.
------
- **I95-50823 Support for time-offset DHCP option:** `int-32 encoded-type` has been added to provide support for the time-offset DHCP option.
------
- **I95-50834 NodeMonitor crash on 128T startup when hardware interface is missing:** Resolved a `NodeMonitor` crash when the interface configuration is not present. 
------
- **I95-50967 SSR is not allowing other DHCP relay traffic to pass through:** When the SSR acts as a DHCP Relay, it will no longer drop packets received from other relay agents on the network. Instead the packets will be routed appropriately as per the configured policies.
------
- **I95-50977 Installer fails to download software when the Conductor software proxy is enabled:** Resolved an issue where when the Conductor software proxy is being used, DNF transactions to the conductor repo go through the proxy, despite the repo pointing to a local tunnel to the conductor. These transactions now go through the proper tunnel. 
------
- **I95-50979 Routers remain in connected state:** Resolved an issue where assets will perform a new highstate unnecessarily if a commit occurs while a highstate is already in progress, causing assets to take a long time to get to the running state.
------
- **I95-51006 Nodes stuck in connected state after upgrade:** On an HA conductor, if the user is performing an upgrade on the first conductor node and that user makes a config commit during the upgrade, then the configuration's modified time will become out of sync between the two conductor nodes. When the conductor first node is finished upgrading the result is a loop where the configuration keeps getting committed by each node back and forth until a new commit is made. This issue has been resolved by allowing the peer conductor node to accept the config despite the perceived version disparity. Please note performing a commit mid upgrade is not supported. 
------
- **I95-51007 Conductor is incorrectly honoring core pinning:** The cpuProperties cores setting in /etc/128technology/local.init was erroneously isolating cores on conductor nodes when set, even though this setting is intended for a router. This would cause a reduction in available processing cores for normal conductor operations. This setting will now be ignored on the conductor.
------
- **I95-51021 Package to Image conversion fails on FIPS enabled SSR:** Conversion of `package-based` to `image-based` is now supported for systems with FIPS 140-2 mode enabled.
------
- **I95-51044 Hide `forwarding-core-mode` on conductor:** Disabled the `forwarding-core-mode` setting on conductor nodes, since this setting doesn't apply to conductor.
------

### Caveats

- **I95-51087 SSR fails to download firmware after upgrading the conductor:** An issue has been identified where the first time a conductor is upgraded and **conductor-only** is selected in the software-update settings. The proxy service on the conductor does not work correctly, and downloads attempted by the router will fail. This issue will be resolved in the next release. 

  **_Workaround:_** Make a simple configuration change and commit the change. Any configuration change is sufficient to start the internal proxy service. Once this commit has been made this will no longer be an issue.

## Release 6.1.1-6

**Release Date:** April 28, 2023

### Resolved Issues

- **I95-48965, I95-50070, I95-51086 Race condition with routing updates inducing crash in highway process:** Resolved an issue where a routing change that affects the `forwarding-table` can incur a race condition with sessions completing and being removed, which could lead to a highway crash and restart.
------
- **I95-51052 NAT changes in network may cause sessions to fail:** If `session-scaling` is set to `enabled` with `outbound-only`, and a NAT between the routers causes an address and/or port change for existing TCP or UDP sessions between them, the SSR may not automatically recover idle or one-way traffic sessions. <br/>
The impacted sessions will time out when all packets for the failed sessions stop. New sessions are not impacted, nor are any pre-existing sessions with regular bi-directional traffic.
------
- **I95-51093 Race condition in `session-scaling` can cause crash/restart:** Resolved an issue when `session-scaling` is set to `enabled` together with `outbound-only`, a race condition can cause a crash and restart of the `highway` process in the SSR.

## Release 6.1.0-55

**Release Date:** April 14, 2023

### New Features

- **I95-21086 Traceroute:** Traceroute is implemented as a troubleshooting tool, allowing you to debug connectivity from point to point. For more information, see [Traceroute.](ts_traceroute.md)
------
- **I95-38746 [`show arp [<verbosity>]`](cli_reference.md#show-arp):** Added the `<verbosity>` subcommand to provide additional information, including time to next refresh (ms), retry count (if expired), and time of last resolved ARP.
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to address several CVEs and provide support for the i225 NIC, Wireguard, and Cordoba. 
------
- **I95-40130 Create factory defaults for all router-conductor communication:** SaltStack, Conductor, and IKE default session-types have been added. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is now 5 seconds.
------
- **I95-41728 Session Recovery Detection:** `session recovery detection` provides an effective monitoring method for session recovery. When `inactivity-based detection` is enabled, the originating node monitors activity on the flow, and takes action if no activity is detected for a specified time. For additional information, see [Session Recovery Detection.](config_session_recovery.md)
------
- **I95-42282 Highlight errors in Template:** Highlighting has been added for errors found in a template, making it easier to find.
------
- **I95-42379 BGP over SVR global service policy:** [Security and Service Policy](config_bgp.md#security-policy-and-service-policy) configuration options are provided for specifying the policy to be used for generated BGP-over-SVR services. 
------
- **I95-42483 STEP Diagnostics in GUI:** A Debug table and Replay visualization have been added to aid in STEP diagnostics. 
------
- **I95-44456 Support for DHCP vendor options:** DHCP options are now configurable on the SSR from the Mist dashboard. 
------
- **I95-47136/MIST-62741 Settings for WAN Link Speed and Duplex (Mist-managed):** With this update, the auto-negotiation, disable, and speed/duplex settings are visible in Mist.
------
- **I95-47259 Session Setup Scaling:** The [`session-setup-scaling`](config_reference_guide.md#session-setup-scaling) feature improves the session setup rate by enabling multi-threaded processing. 
------
- **I95-49824 SVR Transport Reuse** In deployments where the number of SVR sessions between SSRs are limited due to carrier settings, the established BFD transport session is reused to carry SVR sessions. For details about using this feature, see [SVR Transport Reuse.](config_bfd_tunnel.md)
------
- **I95-50159 Automatic mesh created for route-reflector topology:** Enables the generation of additional BGP service-routes for creating mesh connectivity between all clients of a route reflector. See [Service-route Mesh For Route Reflector Clients](config_bgp.md#service-route-mesh-for-route-reflector-clients) for additional information. 

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** I95-46020, I95-48448, I95-48455, I95-48458, I95-48859, I95-49456, I95-50358, I95-50359, I95-50506, I95-50508, I95-50523. 
------
- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services.
------
- **I95-37833 Apply password policy more consistently:** The password policy for SSR users has been updated, and now requires passwords to have a special character in addition to previous requirements. 
:::important
Please refer to [Password Policies](config_password_policies.md) for updated password requirements.
:::
------
- **I95-40130 Factory Defaults for Conductor Communication:** Added SaltStack, Conductor, and IKE default session-types. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is 125 seconds.
------
- **I95-40904 Power save mode not working:** Add a method to read current power saver mode setting from existing config before committing the new configuration, and changing the setting.
------
- **I95-41992 Warning for Rate-Limit with Flow-Limit values at 0:** A warning has been added to advise users that this will cause dropped packets.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1.
------
- **I95-43779 DHCP IP Address is not refreshed when cable is physically removed and reinserted:** Updated the state machine to cause DHCP-enabled interfaces to send out a DHCP Request for their current IP address.
------
- **I95-44142 Automated Provisioner race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44443 NTP Server config not honored when back-to-back configuration changes are made:** Resolved an issue where NTP configuration was changed but the backend would not take action on those changes.
------
- **I95-44722 Time series HMAC failures after rebooting node in HA router:** Device interfaces are flushed upon becoming active to avoid handling of packets which have been delayed due to inactivity.
------
- **I95-44757 Quickstart validation error when quickstarting a conductor:** The quickstart validation process no longer requires an IP address when quickstarting a conductor.
------
- **I95-44769 Add Linux system logs to the Tech Support Information data:** This patch allows for customizations of the systemd journal content included in the `tech-support-info` bundle, and includes additional default content.
------
- **I95-44988 SSR Stuck in Upgrade status:** Improved logging to detect when an installer session is started and there is an already an active interactive installer session; for example when an interactive installer session was left open.
------
- **I95-45063 SSR azure instances unstable on large machine types:** Resolved an unpgrade issue causing instability in Azure instances using Mellanox5.
------
- **I95-45113 SNMP override of the IfTable:** `ifAlias` and `IfDescr` have been swapped in our SNMP reporting; `ifDescr` is always the `ifName`. This change was made for consistency with other Juniper products.
------
- **I95-45146 GUI error message for users authenticated by LDAP to Active Directory Server:** This issue has been resolved.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45164 `show-active-peers` missing some information:** Resolved a corner case where an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the SSR misinterprets the non-compliant device's timeouts and the MTU will be unresolvable.
------
- **I95-45220 Managed routers do not connect to newly added HA conductor:** Resolved an issue when transitioning a conductor from standalone to HA, the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45489 `ifcfg` custom options are not real-time configurable:** Resolved an issue where interface `ifcfg` option changes were not being processed.
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45559 Corrupted resolv.conf after ODM imaging:** Resolved an issue on SSR systems running dns-proxy services with external interfaces configured using PEERDNS=yes, where a race condition may occur that results in corrupt nameservers being added to the /etc/resolv.conf file.
------
- **I95-45641 Stuck BGPoSVR Sessions after Failover:** Made changes to provide updates to less specific FIB entries when routes are updated to resolve this issue.
------
- **I95-45643 Users that were created by non-admin users were missing after upgrade:** Resolved a config type conversion issue that caused users to disappear after upgrade.
------
- **I95-45814 No Bandwidth statistics visible in GUI:** Resolved an issue when processing high numbers of services and service routes which prevented a subset of stats from being stored and displayed.
------
- **I95-45882 Invalid DHCP server config causes a crash:** Resolved an issue when the DHCP server was misconfigured with duplicate interfaces and then committed, the validation would not catch this and cause a crash. The SSR code has been hardened to handle the misconfiguration.
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46230 Exceptions with invalid giid causing a highway crash:** Resolved an issue where uncaught exceptions (invalid giid of 0) were causing highway issues.
------
- **I95-46419 Forward Error Correction (FEC) with OutBound Only Fails:** Resolved an issue where FEC actions are not installed properly after the modifcation to resolve the outbound only path.
------
- **I95-47362 Internal process SSH tunnel watchdog:** Implement a watchdog for the SSH tunnels maintained by SCM. If the watchdog detects a dead connection, it will:
A) if the connection is a critical one, restart the 128T service, or
B) if the connection is not critical, terminate the application that owns the dead connection. If this fails, it will then attempt to restart the 128T service.
------
- **I95-47662 Switch to only using VFIO when binding devices for DPDK:** The SSR now uses VFIO to bind devices to DPDK, providing better support for NICs. 
------
- **I95-47750 DHCP client interface info not listed in "show dhcp v4 detail" pcli command output:** The software now expects redundant interfaces with a non-zero vlan to have the vlan at the end of the line, after the list of comma-separated interfaces.
------
- **I95-48274 Mixed IDP policy causes traffic to fail:** When a tenant is configured with an IDP policy enabled, and shares a service with another tenant that does not have IDP enabled, all traffic was being steered through the IDP. This issue has been resolved; the SSR now will automatically split the service into a maximum of 4 idpPolicy services; `alert`, `strict`, `standard`, and `none` to allow the correct handling of traffic. 
------
- **I95-48571 IDP topology improvements in the GUI:** The SSR now includes the auto-generated IDP mode if enabled as a part of `show idp application status`. Additionally, enabling `hub` mode will not result in engine bring-up errors.
------
- **I95-49340 Crash when the unexpected input of tenant-prefixes with no source-addresses is committed:** Validation has been added to restrict the tenant-prefixes's source-addresses to a minimum of one.
------
- **I95-49604 No alarm raised when a node is disconnected from the internal synchronization database:** When nodes are unable to connect to the internal synchronization database, a critical alarm is now raised.
------
- **I95-49675 Incorrect path in console help message for `export config running`:** The help message now correctly identifies the export path: `Exported files are stored in /etc/128technology/config-exports/ and are stored as GZIP compressed files.`
------
- **I95-49913 Some Login/Logout Events not logged in Audit Logs:** A new function has been added to create an event to process USER_LOGOUT audit messages. 
------
- **I95-49925 GRE tunnel health-check not migrating sessions when path is down:** The GRE tunnel manager now removes all sessions before adding new ones rather than modifying the existing sessions. 
------
- **I95-49974 Stuck flow is not clearing when the reverse metadata is incomplete:** Added the source tenant to the reverse metadata to prevent the metadata parsing exception. 
------
- **I95-50047 Conductor config unable to pass local validation on one of the routers:** Resolved an issue where a router missing the `reachability-profile` configuration may pass validation on conductor.
------
- **I95-50247 Duplicate peer path alarms:** Resolved an issue where both BFD and the path MTU feature were generating alarms for the same peer path being down. The criteria for which peerPath state changes can trigger peer path events has been tightened.
------
- **I95-50260 `show idp events` does not honor the `router` or `node` arguments:** Resolved an issue where `show idp events` did not honor the `router` and `node` arguments and always executed against the local node. The command is now executed correctly, using the specified arguments.
------
- **I95-50262 Unconnected routers not rotating logs often enough:** Resolved an issue where a managed router was not able to pull down the configuration from the Conductor - which includes the log rotation config. The default salt log rotation configuration has been improved, preventing the log from growing too large before the connection to the Conductor can be established. 
------
- **I95-50269 Router clone operation fails:** Implemented checks to prevent cloning obsolete elements and internal lists/containers on legacy versions of the SSR software (pre-4.4).
------
- **I95-50286 Rebooting a node of an HA pair from Linux breaks routing:** Resolved an issue where a delay in the shutdown process caused a node to take over a VRRP interface, creating routing issues. 
------
- **I95-50331 System fails to synchronize keys on startup:** The SSR now dynamically updates rsync IP host address from the non forwarding HA sync interfaces, and will fall back to the global.init host IPs if they don't exist.
------
- **I95-50376 Failure to make config changes after rollback:** Resolved an issue where commits would not take effect after rolling back an HA router, because of older/newer version conflicts. 
------
- **I95-50409 Audit Log Collector cleanup:** Templates have been applied to Audit Log Event processing to reduce code duplication.
------
- **I95-50445, I95-49377 i40e and ice devices enter malicious descriptor detection state, preventing forwarding of traffic:** Resolved an issue where fragmented packet chains larger than 8 buffers were discarded causing a malicious descriptor event. 
  - The below `dpdk.log` snippet provides an example of the event:
```
[DPDK| -- ] ERROR (00007f03ec18e700) i40e_dev_alarm_handler(): ICR0: malicious programming detected
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): Malicious Driver Detection event 0x02 on TX queue 6 PF number 0x01 VF number 0x00 device 0000:08:00.1
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): TX driver issue detected on PF
```
  - Added hooks for the NIC driver to trigger an unrecoverable event and invoke the Highway lockup detector mechanism.
------
- **I95-50534 Race condition between NetworkInterfaceManager and FastLane:** Resolved a race condition caused by adding and deleting the same network interface in a very short window of time, potentially causing a system crash.
------
- **I95-50554 No dynamic synchronization of repos to the routers:** Resolved an issue where it was necessary to restart 128T on the Conductor in order for the Conductor to recognize newly added repositories and sync them down to the assets. Authenticated repos are now automatically synchronized when repos are added to the conductor. 
------
- **I95-50699 Upgrade process to 6.0.8 failure:** Mist-managed systems with low available memory could fail to upgrade. An updated dependency and fix for these Mist-managed systems has been published via the cloud and will be absorbed the next time a customer attempts an upgrade.
------
- **I95-50754 Race condition between ICMP ping request and a reverse flow:** Resolved a crash due to a race condition when `service ping icmp-request` is matched against a partially installed flow.
------
- **I95-50787 Rebooting the OS from the conductor throws error code 400:** Resolved an issue in the GUI with the reboot button on the Router page. When trying to reboot a router, the button would fail and display "Error: EOF"; this has been resolved. 
