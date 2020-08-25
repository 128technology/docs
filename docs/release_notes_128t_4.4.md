---
title: 128T 4.4 Release Notes
sidebar_label: 4.4
---

## Release 4.4.2

- **I95-18807** Innocuous error produced in journal due to imudp module loaded by rsyslog daemon

  _**Symptoms:**_ The following message can be seen in the journal
  ```
  rsyslogd[1337]: imudp: module loaded, but no listeners defined - no input will be gathered [v8.24.0 try http://www.rsyslog.com/e/2212 ]
  ```
------
- **I95-32594** Validation allows for mismatched adjacency security-policy with peer network-interface security-policy for cases where multiple network interfaces in a router have the same IP address. Only the first one is considered for matching inter-router-security policy between the network interface and peer adjacency.
------
- **I95-33471** Adaptive encryption counters are incorrectly incremented when encryption is disabled and adaptive-encryption is enabled
------
- **I95-33594** Changing the `neighbor-as` of an existing BGP neighbor prevents it from connecting

  Until the system is upgraded to 4.4.2, this issue can be mitigated by restarting the 128T or by removing and recreating the BGP configuration
------
- **I95-33989** Incorrect error message reported within PCLI when trying to execute `validate` after a previous _validate_ was terminated with `CTRL+c`

  _**Symptom:**_ The following can be seen in the PCLI output:
  ```
  ✖ Validating...
  % Error: Candidate configuration is invalid:
  1. A request of type validate is already in progress. The first request was started 13 seconds ago
  ```
  Until the system is upgraded to 4.4.2, this issue will resolve itself after the background tasks have completed
------
- **I95-35111** `No active NTP server` alarm erroneously generated when 128T can successfully reach a provisioned NTP server

  _**Conditions:**_ When multiple NTP servers are configured, at least one is reachable and at least one is not reachable
------
- **I95-35193** Performing a download of software may fail

  _**Conditions**_ 128T connection to the conductor is disconnected or restarted
------
- **I95-35331** A custom chart that contains multiple line charts selects the incorrect graph when clicking on the corresponding legend
------
- **I95-35544** LTE SIM number (ICCID) is absent from the output of `show device-interface` on LTE interfaces
------
- **I95-35873,I95-35679** Asset stuck in a connected state as a result of a corrupted Linux rpmdb. The issue requires the system be updated to the 128T-installer version 2.6.1 (see [IN-267](release_notes_128t_installer_2.6.md#release-261). If the conductor is used to upgrade systems, the latest installer will be updated from the repository being used. If the systems do not have access to the 128T public repositories, the repository being used should be updated with the 128T-installer 2.6.1 version. With the correction of this issue, the PCLI command `send command yum-cache-refresh` has been updated to perform the rpmdb repair if the rpmdb is corrupted.

  Until the system is upgraded to 128T 4.4.2 and 128T-installer 2.6.1, the issue can be mitigated by running the following Linux commands:
  ```
  rm -f /var/lib/rpm/__*
  rpm --rebuilddb
  ```
------
- **I95-35793** Large responses from a DNS server may be rejected by 128T. When this happens, provisioned FQDNs remain unresolved.

  _**Conditions:**_ The following log message can be seen:
  ```
  Jun 16 06:09:25.272 [DNS |DNSR] WARN (dnsManagerTP ) Failed to parse Ipv4Host (1) response for some.domain.com: Message too long
  ```
------
- **I95-35799** When a dynamic route is removed that exactly matches the prefix of a configured service, the route is removed from the RIB but it may remain in the FIB and still be used for establishing new sessions
------
- **I95-35933** `show device-interface` displays incorrect values for speed and duplex for PPPoE interfaces
------
- **I95-35935** Configuring the same value for `router > conductor-address` on different routers will generate invalid configuration
------
- **I95-36012** `show device-interface` displays incorrect values for speed and duplex for LTE interfaces
------
- **I95-36109** Sessions may not reestablish properly on a fail-over between different routers to the same destination router (e.g., Session originates on R1 to R2. Later, the same session fails over to traverse R3 to R2)
------
- **I95-36149** Committing a configuration change to a device-interface capture-filter when actively capturing traffic on that interface can cause the highway process to fault
------
- **I95-36246** IMSI and MSISDN are absent from the output from `show platform` on systems with LTE interfaces
------
- **I95-36182** systemd network service may be marked as failed on reboot if KNIs were configured. This issue is cosmetic in nature and does not produce any side effects to system operation.

  _**Symptom:** The following can be seen during restart within the journal
  ```
  systemd[1]: Starting LSB: Bring up/down networking...
  network[4650]: Bringing up loopback interface:  [  OK  ]
  network[4650]: Bringing up interface dh00000001:  ERROR     : [/etc/sysconfig/network-scripts/ifup-eth] Device dh00000001 does not seem to be present, delaying initialization.
  network[4650]: [FAILED]
  ```
------
- **I95-36283** The 128T router asset state is stuck on its current state

  _**Conditions:**_ The following log message can be seen:
  ```
  TypeError: heap argument must be a list
  ```
  Until the system is upgraded to 4.4.2, this issue can be mitigated by restarting the salt-minion service by executing `systemctl restart salt-minion` in the Linux shell. If not manually restarted, the salt-minion watchdog will also restart the salt-minion after one hour.
------
- **I95-36341** Race condition can occur when receiving a BGP packet destined for the 128T during startup without a fully populated FIB, causing a system fault
------
- **I95-36351** User without admin privileges can not change their password
------
- **I95-36356** Loading a configuration that changes the BGP graceful-restart restart-time may cause a highway process fault if a subsequent graceful-restart timeout occurs
------
- **I95-36394** Auto-generated conductor service names that include a '.' will fail to commit configuration

  _**Conditions:**_ Conductor version is on >= 4.5 and router version is < 4.5
------
- **I95-36404** highway process fails to start on Ubuntu distributions

  _**Symptom:**_ 128T running in a container will fail to initialize when the container is running on Ubuntu distributions. The following can be seen within `highway.log`
  ```
  Execute StdErr was ‘sysctl: cannot stat /proc/sys/net/ipv6/conf/default/optimistic_dad: No such file or directory’
  ```
------
- **I95-36536** Manually deleting a session-capture filter can cause the highway process to fault
------
- **I95-36537** Dynamic session-captures are now created with a default session count of 100 instead of unlimited
------
- **I95-36564** Buffer queue depth allocation algorithm was inefficient causing latency in session setup
------
- **I95-36574** After a HA interface fail over, a session collision can occur between the recovered flow and an existing reverse flow. The recovered flow does not get setup properly and can cause the highway process to fault upon session expiry.

  _**Conditions:**_ Symmetrical services must be configured that match both forward and reverse flows
------
- **I95-36591** Using connected route redistribution causes routes to be re-advertised or flapped, resulting in packet loss
------
- **I95-36604** Debug tables within the GUI do not honor the node selector
------
- **I95-36632** Empty office365 metadata file results in HTTP 400 bad request error
------
- **I95-36638** Polling SNMP OID 1.3.6.1.2.1.1.2 returns `NET-SNMP-TC::linux` instead of `T128-MIB::t128NetworkingPlatform (1.3.6.1.4.1.45956.1)`
------
- **I95-36672** Deleting all session-capture filters on a _device-interface_ with active traffic can cause the highway process to restart
------
- **I95-36727** A non-forwarding, external (i.e. management) interface configured in 128T does not obtain a DHCP IP upon disconnecting and reconnecting the cable
------
- **I95-36770** Salt minion log file was not being properly rotated
------
- **I95-36841** TCP RST can cause the highway process to fault on a SVR path performing UDP transform
------
- **I95-36850** An asset's available and downloaded versions were incorrectly cleared when an upgrade or rollback is initiated
------
- **I95-36851** Currently downloading version in the asset state would persist after a download has completed
------
- **I95-36866** When adding an access policy in a service in the GUI, the tenant drop down list comes up empty on the first try

  Until the system is upgraded to 4.4.2, this issue can be mitigated by canceling out and repeating the operation again. The list will be fully populated on subsequent attempts.
------
- **I95-36891** Exception thrown in PCLI when `CMD`+`right arrow` jumping past the end of an auto complete command

## Release 4.4.1

:::info
Upgrading to the 4.4.1 release requires version 2.6.0 or newer of the 128T installer. If you are upgrading a managed router using the conductor, the installer will be upgraded automatically. If you are upgrading a router or conductor manually, please ensure you meet the minimum installer requirements before starting.
:::

### Issues Fixed

- **I95-24681** Grammatical improvements to HA initialization, providing more clarity around the use of specific IP addresses
------
- **I95-26276** Enabled OSPF authentication in configuration
------
- **I95-30610** RTP is not properly classified for subsequent 128T routers
------
- **I95-33403** REST APIs have been added for retrieving information about the 128T routing protocols
------
- **I95-33762** Unable to provision multiple DHCP servers per network interface on unmanaged, standalone router
------
- **I95-33842** Race condition on 128T startup, causing DHCP server to fail to start

  _**Conditions:**_ DHCP server is not running. The following log message can be seen:
  ```
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Running command ['/usr/sbin/ip', 'netns', 'set', 'dhcp-server-ns-1', '1073742075']
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Command "/usr/sbin/ip netns set dhcp-server-ns-1 1073742075" failed: RTNETLINK answers: No space left on device
  ```
  Until the system is upgraded to 4.4.1, this issue can be mitigated by restarting the 128T.
------
- **I95-34053** When configured to use LDAP, locally created user credentials and access are not honored for those users that already exist in LDAP.

  Until the system is upgraded to 4.4.1, this issue can be mitigated by restarting the 128T.
------
- **I95-34649** `best-effort` path handling for `proportional` load balancing is not honored by service-policy
------
- **I95-34751** LTE certified to run on Verizon wireless networks
------
- **I95-34842** The configuration attribute `authority > router > node > device-interface > vrrp` has been removed from configuration in the GUI as the capability does not exist
------
- **I95-34961** Using a QuickStart file to provision a router fails if the ZScaler plugin is installed on the Conductor.
------
- **I95-35038** Configuration Explorer within GUI can sometimes produce a "Something went wrong" message when searching or scrolling
------
- **I95-35082** When a 128T is deployed behind a NAT firewall and has path MTU (PMTU) discovery enabled, SVR sessions established for outbound-only connections are set up with the configured interface MTU, not the discovered PMTU.
------
- **I95-35172** Adding DHCP server instances requires a software restart
------
- **I95-35205** LTE interfaces do not honor MTU settings set in the network

  Until the system is upgraded to 4.4.1, the learned MTU value can be directly set within Linux
------
- **I95-35303** `persistentDataManager` process can fault on shutdown of 128T
------
- **I95-35313** Startup delay of 128T when many peer paths exist
------
- **I95-35354** There exists an unlikely race condition wherein the successful return code of a download operation (that happens asynchronously) causes an upgrade in progress to terminate prematurely
------
- **I95-35377** Additional metrics added to realize active traffic engineering behavior
------
- **I95-35394** salt-minion may fault during an upgrade or rollback operation. This issue does not impact the upgrade or rollback operations.
------
- **I95-35395** Enabled BGP router reflector `cluster-id` in configuration
------
- **I95-35401** SVR traffic would be dropped as a result of tenant members source type being incorrectly classified.

  _**Conditions:**_ When the interface has an adjacency and tenant members are applied via neighborhoods and/or child tenants. The tenant table will show the source type as `PUBLIC` for that entry when it should show as `HYBRID`, resulting in traffic being dropped.
------
- **I95-35406** Shutdown race condition may cause improper DHCP server clean up, causing DHCP server to fail on next start of 128T

  Until the system is upgraded to 4.4.1, this issue can be mitigated by restarting the 128T.
------
- **I95-35517** [Selective Packet Capture](ts_packet_capture.md#selective-packet-capture)
------
- **I95-35563** Startup race condition can lead to LTE initialization failure

  Until the system is upgraded to 4.4.1, this issue can be mitigated by restarting the 128T.
------
- **I95-35584** User unable to login to UI after loading a new web certificate

  Until the system is upgraded to 4.4.1, this issue can be mitigated by restarting the web server with the command `systemctl restart 128TWeb`
------
- **I95-35602** The command `show network-interface` may result in a `Unhandled TypeError` in the PCLI when a PPPoE interface is down
------
- **I95-35633** The GUI performance has been improved for configuration edit operations
------
- **I95-35636** SNMP query for ifIndex of interface incorrectly returns
  ```
  No Such Object available on this agent at this OID
  ```
------
- **I95-35644** Added support for `bgp route-reflector allow-outbound-policy`
------
- **I95-35655** RSRP and RSRQ values are now displayed in the output of `show device-interface` for LTE interfaces
------
- **I95-35694** A `service-route` of type `host` results in an invalid service path during session establishment
------
- **I95-35701** Configuration validation incorrectly rejects valid config when a `service-route` references a service with both `applies-to` `authority` and `router-group` not matching the router of that service-route
------
- **I95-35781** Rare race condition during `rotate logs` PCLI command may cause applications to fault
------
- **I95-35866** Addressed latest CVEs
------
- **I95-35885** Systems with two LTE interfaces would appear to have three LTE interfaces in Linux

  Until the system is upgraded to 4.4.1, the issue can be mitigated by using the interface `wwp0s21u3i8`. The interface `wwp0s21u3i10` should not be used and will no longer be present after upgrading to 4.4.1.

## Release 4.4.0

### New Features and Improvements

- **I95-17398** [Support for system upgrade from ISO](intro_upgrading.md#upgrading-from-an-iso)

- **I95-20710** LDAP status in GUI

- **I95-25289** Honor storage-duration as retention policy

- **I95-26013** [Support for vendor-specific information in DHCP options](config_dhcp.md#vendor-specific-information-dhcp-options)

- **I95-26954** Reduced steady-state bandwidth usage for nodes at rest, resulting in improved performance and reduced network bandwidth

- **I95-27874** [Enable packet capture from CLI](ts_packet_capture.md)

- **I95-28317** [PCLI ctrl+z shortcut](concepts_pcli.md#ctrlz)

- **I95-28801** 128T Conductor docker container

- **I95-31073** salt-minion upgraded to 2019.2.0, increasing capability and stability

- **I95-31352** 2x performance of configuration processing when plugins are enabled

- **I95-31603** Track TCP and TLS time to establishment

- **I95-31751** Improved behavior when requesting too many events on Event Viewer

- **I95-31932** `reconnect-128t-assets` script, reconnecting all disconnected minions

- **I95-32593** Automated Provisioner batching

- **I95-32760** Selected Events remain highlighted when navigating the event page

- **I95-32783** ["show assets summary" enhancements](cli_reference.md#show-assets-summary)

- **I95-33374** Address Latest Vulnerabilities 4.4

- **I95-33382** Password changes now log users out

- **I95-33695** REST API support for user management

### Issues Fixed

- **I95-16902** Tab-complete in PCLI does not quote strings with spaces in them
  _**Conditions:**_ Key field for configuration object contains a space
------
- **I95-24957** `t128-salt` command produces an error when running. This error is cosmetic as the operation completes successfully.
  ```
  Exception ignored in: <generator object _stream_return at 0x7f45d0b66d58>
Traceback (most recent call last):
  File "/usr/lib/128technology/python/salt/venv/lib/python3.6/site-packages/salt/transport/tcp.py", line 1013, in _stream_return
AttributeError: 'NoneType' object has no attribute 'StreamClosedError'
  ```
------
- **I95-28223** PCLI tab-completion incorrectly includes candidate configuration for `show device-interface <interface-name>`
------
- **I95-30517** `t128-salt` command produces deprecated warning. This warning is cosmetic as the operation completes successfully.
  ```
  [WARNING ] /tmp/tmpigi2k61k/pip3/salt/salt/transport/ipc.py:292: DeprecationWarning: encoding is deprecated, Use raw=False instead.
  self.unpacker = msgpack.Unpacker(encoding=encoding)

  [WARNING ] /tmp/tmpigi2k61k/pip3/salt/salt/payload.py:149: DeprecationWarning: encoding is deprecated, Use raw=False instead.
    ret = msgpack.loads(msg, use_list=True, ext_hook=ext_type_decoder, encoding=encoding)
  ```
------
- **I95-32250** Traffic audit events can consume large amount of memory on a busy system
------
- **I95-32707** Quickstart link does not appear after initial router config is created
------
- **I95-33302** Application ID modules may experience a delay or fail to update FIB

  _**Symptom:**_ The following log message will be seen in the `highway.log` when application identification scripts fail to complete.

  ```
  ERROR (routingAgePoller) Timeout handler not keeping up
  ```

  _**Conditions:**_ Platforms at the minimum specified hardware requirements or lower may experience this behavior depending on the type and quantity of application modules loaded.
------
- **I95-33325** OTP QuickStart fails on the first attempt, but works on subsequent attempt(s)
------
- **I95-33386** Clearing the name of a router in the router config page produces an error
------
- **I95-33465** UI sometimes does not provide an indication that it is committing the configuration when importing from backup
------
- **I95-33842** Race condition on 128T startup, causing DHCP server to fail to start

  _**Conditions:**_ DHCP server is not running. The following log message can be seen:
  ```
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Running command ['/usr/sbin/ip', 'netns', 'set', 'dhcp-server-ns-1', '1073742075']
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Command "/usr/sbin/ip netns set dhcp-server-ns-1 1073742075" failed: RTNETLINK answers: No space left on device
  ```
  Until the system is upgraded to 4.4.0, this issue can be mitigated by restarting the 128T process.
------
- **I95-33983** User role can see a list of config exports by executing `show config exports`
------
- **I95-34053** When configured to use LDAP, locally created user credentials and access are not honored for those users that already exist in LDAP.

  Until the system is upgraded to 4.4.0, this issue can be mitigated by restarting the 128T.
------
- **I95-34334** Audit events are not triggered on download and version query timeouts.  Audit events have been added to provide clarity to the administrator in the event that downloads fail to complete.
------
- **I95-34437** Asset State not correctly reported
------
- **I95-34629** During the initial window of a router connecting to its HA peer, or its connection to the Conductor while a connection outage occurs, configuration commits may fail silently. Candidate configuration will remain uncommitted.

  Until the system is upgraded to 4.4.0, this issue can be mitigated by attempting the commit again.
------
- **I95-34716** Fixed a rare race condition crash on startup of the Automated Provisioner
------
- **I95-34744** highway process can fault when a DHCP server assigns the IP address 0.0.0.0 to the 128T router
------
- **I95-34753** ARP packet validation failure produces misleading log message.
  ```
  WARN  (arpManagerTP    ) Base Exception: Invalid Icmp Header Format: no   NS option available.
  ERROR (arpManagerTP    ) Caught unexpected exception
  ```
  Enhanced logging to indicate receiving interface during invalid ARP classification and add the packet to the `highwayExceptions.pcap`.
------
- **I95-34790** Dual node HA routers with large numbers of peer paths (>500) may see some flows get blackholed after a node failover occurs.
------
- **I95-34882** `show user` is missing from `search commands regex ".*"`
------
- **I95-34968** Self-signed certificates created during initial installation of 128T are invalid
------
- **I95-35035** Significantly improved the performance of populating the FIB from configuration and dynamic routes
------
- **I95-35062** Non-permanent LTE failures are incorrectly displayed as a failure context in `show device-interface`
------
- **I95-35063** PCLI `replace` command uses "all" to skip prompts, rather than "force" as it should
------
- **I95-35081** Long authority names can obscure "UP" navigation button with the configuration UI
------
- **I95-35093** `show asset <asset-id>` incorrectly continues to show `Currently Upgrading` version after completion of an upgrade.
------
- **I95-35099** Removing a 128T user does not remove its Linux credentials, allowing the user to still login to Linux.

  Until the system is upgraded to 4.4.0, this issue can be mitigated by disabling rather than deleting the user.
------
- **I95-35115** Aggregate bandwidth charts may not display data accurately
------
- **I95-35138** A vulnerability in the SaltStack code allows for unauthenticated salt-minions to execute any script on the salt-master.
  :::info
  This fix is required only on the 128T Conductor.
  :::
------
- **I95-35155** `show device-interface` output did not include duplex mode
------
- **I95-35163** Executing `tail` on `/var/log/install128t/installer.log` while associating an asset with the conductor for the first time will result in the node name not changing from its defaults
------
- **I95-35164** Downloading a new software image during an upgrade will incorrectly complete the upgrade if the download was successful before the upgrade has fully completed
------
- **I95-35188** Adding a tenant or changing the order of tenants in the configuration can lead to traffic being dropped upon session recovery

  _**Conditions:**_ Configuration change is made to tenants while one node of a HA pair is offline.  After the configuration change, the node that was offline takes over as the primary for existing sessions.

  Until the system is upgraded to 4.4.0, if the tenant configuration has changed and a HA node has taken over as active, the traffic that is being dropped can be cleared by performing a simultaneous reboot of both nodes.
------
- **I95-35203** `persistentDataManager` process can fault on shutdown of 128T
------
- **I95-35323** BGP over SVR does not work when both sides are using VLAN tags

## Special Considerations

- **I95-36525** TLS 1.0 is no longer supported
------
- Python has been upgraded from version 2 to version 3.  Any custom salt states that have been written that include python code, may need to be upgraded or rewritten in advance of the upgrading to 4.4. (I95-31073)
------
- `show config exports` command is no longer available to a user with *user* privileges.  This command is only intended for those users with *administrator* privileges. (I95-33983)
------
- The Following REST API resources are have been deprecated and will be removed in later releases.
  1. `/router/{router}/node/{node}/networkInterface/byDeviceInterface`
  2. `linkLatency`, `jitter` and `packetLoss` fields have been deprecated in `/router/{router}/node/{node}/adjacency` and `/router/{router}/node/{node}/deviceInterface/{deviceInterface}/networkInterface/{networkInterface}/adjacency` response messages.
  3. `averageBandwidth` and `traffic` fields have been deprecated in `/router/{router}/node/{node}/deviceInterface` response messages.
  4. `averageBandwidth` and `traffic` fields have been deprecated in `/router/{router}/node/{node}/networkInterface` and `/router/{router}/node/{node}/deviceInterface/{deviceInterface}/networkInterface` response messages.
  5. `traffic`, `averageBandwidth`, `sessions`, `sessionArrivalRate`, `cpu`, `disk`, `memory`, and `platform`  fields have been deprecated in `/router/{router}/node` and `/router/{router}/node/{node}` response messages.
  6. `bandwidth`, `sessions`, `sessionArrivalRate` and `bytesTransmitted`  fields have been deprecated in `/service and /service/{service}` response messages.
  7. `averageBandwidth`, `traffic`, `sessions`, and `sessionArrivalRate` fields will be removed from `/serviceClass` response messages.
  8. `bandwidth`, `sessions` and `traffic`  fields have been deprecated in `/tenant` and `/tenant/{tenant}` response messages.
     (I95-25614)

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
