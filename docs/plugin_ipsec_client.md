---
title: IPsec Client plugin
sidebar_label: IPsec Client
---

The 128T-ipsec-client plugin provides a way to send and encrypt traffic to IPsec endpoints through the SSR. It is possible to configure the plugin for each router to have multiple destination IPsec endpoints and thus the SSR will failover between them. This is accomplished by performing a [Service Function Chain (SFC)](plugin_intro.md#service-function-chaining) with Libreswan, a third-party IPsec client. By enabling this plugin, you can provide IPsec tunnel connectivity to third party providers from your SSR.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

The IPsec plugin setup has the following key parts to the configuration.
* `ipsec-profile` describing the mechanism with which to connect to the server.
* `ipsec-client` represent the remote endpoints or server with which the ipsec client communicates.
* `service-route`'s to route the traffic through the tunnels

### Profiles
The `router > ipsec-profile`'s are reusable IPsec settings that can be used across multiple nodes in a router and multiple IPsec endpoint `remote`s. The table below represents the most common configuration elements for a valid ipsec profile.

```
router
    ipsec-profile  zscaler
        name                     zscaler
        ike-encryption           aes256
        ike-digest               sha2
        ike-modp                 modp1024
        authentication-protocol  esp
        phase2-encryption        aes_gcm128
        phase2-digest            sha2
        phase2-modp              modp1024
        ike-lifetime             1h
        connection-lifetime      8h
        perfect-forward-secrecy  true
        dpddelay                 20
        dpdtimeout               100
        dpdaction                restart
        local-id                 [local-id@domain.com]
        pre-shared-key           (removed)
    exit
exit
```

The above configuration example represents a typical profile used for a IPSec provider such as Zscaler. Please tune the settings to match the settings recommended by your provider.

| Config            | Type      | Recommended   | Description                            |
| --------          | -----     | -----------   | -------------------                    |
| name              | string    | -             | The name of the profile                |
| ike-encryption    | enum      | aes256        | Algorithm used for IKE encryption      |
| ike-digest        | enum      | sha2          | Hash algorithm used for IKE encryption |
| ike-modp          | enum      | modp1024      | Modp group used for IKE encryption     |
| authentication-protocol   | enum  | esp       | The type of SA to be produced for authentication     |
| phase2-encryption | enum      | aes_gcm128    | Algorithm used for phase 2 encryption  |
| phase2-digest     | enum      | sha2          | Hash algorithm used for phase 2 encryption  |
| phase2-modp       | enum      | modp1024      | Modp group used for phase 2 encryption     |
| ike-lifetime      | time      | 1h            | Lifetime of the keying channel for a connection     |
| connection-lifetime   | time  | 8h            | Lifetime for the security association     |
| perfect-forward-secrecy   | bool  | yes       | Whether Perfect Forward Secrecy of keys is required on the connection     |
| dpddelay          | seconds  | 20             | Delay between DPP keepalives on the connection     |
| dpdtimeout        | seconds  | 100            | After the period has elapsed with no traffic including DPD traffic, the connection will be declared dead |
| dpdaction         | enum     | restart        | Action taken once the enabled peer is detected as dead |
| local-id          | string   | user-defined   | How to identify the router for authentication. Can be an IP address of FQDN. Must be preceded with an `@` symbol to prevent resolution as shown in the example |
| pre-shared-key    | string   | user-defined   | pre-shared key used for authentication |

:::note
This plugin can only connect to IPsec endpoints that support pre-shared key authentication.
:::

#### Custom Options

##### Version History

| Release  | Modification                         |
| -------- | ------------------------------------ |
| 3.3.0    | `profile > custom-option` introduced |

The `custom-option` allows the user to configure additional obscure libreswan options that are not exposed via the profile and remote configuration.

```
config

    authority

        router  myRouter
            name           myRouter

            ipsec-profile  myProfile
                name           myProfile

                custom-option  key
                    name   key
                    value  value
                exit
            exit
        exit
    exit
exit
```

| Config   | Description                          |
| -------- | ------------------------------------ |
| name     | The name of the libreswan option     |
| value    | The value of the option              |

:::warning
The `custom-option` is added to the libreswan config file; any invalid option could prevent the application from starting up.
:::

### Clients
Clients are a collection of remote endpoints which can be used for connection and failover purposes.

The main config properties of a remote endpoint are as follows.

| Config            | Type      | Description                            |
| --------          | -----     | -------------------                    |
| name              | string    | The name of the remote client to be used for sending traffic to the tunnel. |
| host              | ip-or-fqdn | The address or FQDN of the remote endpoint. |
| profile           | reference | The name of the profile to be used for this remote endpoint. |
| remote-id         | string    | The optional remote identifier used during authentication. |
| subnet            | ip-prefix | The remote subnet behind the tunnel. |
| tunnel-monitor    | container | Properties for monitoring the phase-2 connection. See [Tunnel Monitoring](plugin_ipsec_client.md#tunnel-monitoring) for more information. |

Example:
```
router myRouter
    node
        name    myRouter
        ipsec-client client1
            name client1
            enabled true
            tenant ipsec

            remote primary
                name primary
                host <primary-address>
                profile myProfile
                remote-id prisma@paloalto.com
                subnet 0.0.0/0
                tunnel-monitor
                    enabled true
                    destination 8.8.8.8
                        address 8.8.8.8
                        timeout 10
                        max-retries 3
                        interval 60
                    exit
                exit
            exit

            remote secondary
                name primary
                host <primary-address>
                profile myProfile
                remote-id prisma@paloalto.com
                subnet 0.0.0/0
                tunnel-monitor
                    enabled true
                    destination 8.8.8.8
                        address 8.8.8.8
                        timeout 10
                        max-retries 3
                        interval 60
                    exit
                exit
            exit
        exit
    exit
exit
```

:::note
Only one `ipsec-client` can be configured per node, but two `remote`s can be configured per client.
:::

:::warning
The `ipsec-client > name` cannot start with `ipsec` or `mast`. See notes [here](plugin_ipsec_client.md#release-340).
:::

Each `remote` represents a unique tunnel destination and can be used to route traffic in/out of the tunnels. Typically each node has two tunnels to act as primary and backup.

### Tunnel Monitoring

##### Version History

| Release  | Modification                         |
| -------- | ------------------------------------ |
| 3.2.0    | `remote > tunnel-monitor` introduced |

Tunnel monitoring is a way to monitor the health of individual tunnels and have them automatically restart if they become unhealthy. An ICMP ping is used for the traffic. For each `remote`, you can specify a destination, interval, timeout, and the number of max retries for each interval.

```
node
    ipsec-client client1
        remote c1gateway1
            tunnel-monitor
                enabled true
                destination 8.8.8.8
                    address 8.8.8.8
                    timeout 10
                    max-retries 3
                    interval 120
                exit
            exit
        exit

        tunnel-monitor-nat-network 10.128.128.0/28
    exit
exit
```

| Config   | Description                          |
| -------- | ------------------------------------ |
| `enabled` | Allows you to switch tunnel monitoring on and off for a `remote`. |
| `address` | The IP or hostname where traffic is sent. This address must be reachable after traversing the  tunnel. |
| `timeout` | Duration (in seconds) within which to reach the destination. Each attempt will be made in this duration / `max-retries` interval. |
| `max-retries` | Number of consecutive missed ICMP ping responses from the destination within the interval before deciding that the tunnel is unhealthy. |
| `interval` | Duration (in seconds) of how often to perform an ICMP probe test to the probe-address. |
| `tunnel-monitor-nat-network` | The subnet where traffic originates. The corresponding ingress KNI's fourth octet is used. By default, the subnet `10.128.128.0/28` is used. |


### Configuring services for tunnel traffic
The user can define up to four `ipsec-client > remote` endpoints per node. In addition, the user must also define the necessary service and service-routes to route the tunnel traffic over the desired WAN interface.

The following example shows a configuration for capturing the tunnel traffic and allows the `ipsec` tenant as defined in `router > ipsec-client > tenant` config above.

```
config

    authority

        service  ipsec-tunnel
            name           ipsec-tunnel
            scope          private
            address        <remote-address-1>
            address        <remote-address-2>

            transport      udp
                protocol    udp

                port-range  4500
                    start-port  4500
                exit

                port-range  500
                    start-port  500
                exit
            exit

            access-policy  ipsec
                source  ipsec
            exit
        exit
    exit
exit
```

The `<remote-address-1>` and `<remote-address-2>` represent the `node > ipsec-client > remote > host` address. The `ipsec` tenant is allowed as per the tenant defined under `ipsec-client > tenant`. The user can split the tunnels into separate services per the routing requirements.

### Directing traffic through the tunnel
The user can leverage standard SSR service and service-route to direct intended traffic over the ipsec tunnel. In the example below, all guest internet traffic is sent over the ipsec tunnel for break and inspect. This can be accomplished as follows:

```
config

    authority

        router   myRouter
            name           myRouter

            service-route  guest-internet-rte-primary
                name          guest-internet-rte-primary
                service-name  guest-internet

                next-hop      combo-east-1 primary
                    node-name  combo-east-1
                    interface  primary
                exit
            exit

            service-route  guest-internet-rte-secondary
                name          guest-internet-rte-secondary
                service-name  guest-internet

                next-hop      combo-east-1 secondary
                    node-name  combo-east-1
                    interface  secondary
                exit
            exit

        exit

        tenant   guest
            name  guest
        exit

        service  guest-internet
            name           guest-internet
            description    "guest-internet access"
            scope          private
            address        0.0.0.0/0

            access-policy  guest
                source  guest
            exit
        exit
    exit
exit
```

The `service-route > next-hop > interface` must point to the corresponding `ipsec-client > remote > name`-intf to route the traffic through the tunnel. All available SSR routing techniques including using vectors, service-policy, etc., can be leveraged to define how the untrusted traffic is sent over the tunnels, and how to route the traffic. The SSR routes the packets through the appropriate IPSec tunnels and manages the failover as per the policy. On the return path, the encrypted traffic is processed, decrypted, and send back to the client that originated the session.

## Thirdparty Software & Licenses
- Libreswan v3.23-5.el7_5 (GNU GPLv2)


## Troubleshooting

### Data Model
If the data model doesn’t appear in the PCLI or GUI, make sure that you have restarted the SSR service.

### Logging
The `/var/log/128technology/persistentDataManager.log` file at trace level will hold whether the configuration generation was run as well as output and return code.
The `/var/log/128technology/automatedProvisioner.log` file at trace level will hold whether the pillar generation was run as well as output and return code.
Configuration and pillar generation logs can be found on the conductor under `/var/log/128technology/plugins/ipsec-client-config-generation.log` and `/var/log/128technology/plugins/ipsec-client-pillar-generation.log` respectively.

### Salt
Salt status can be found on the conductor by utilizing the PCLI’s `show assets` and `show assets <asset-id>` commands.

### PCLI Enhancements
To check the status of the IPsec tunnels for a given ingress KNI, extra IPsec tunnel related output will be found in the `show device-interface` command as well as the `show plugin state` command.

Example output for a healthy tunnel:
```
admin@combo-west.RTR_WEST_COMBO# show device-interface name rem2
Tue 2020-06-30 16:44:39 UTC

=========================================================
 combo-west:rem2
=========================================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         22:ee:4e:b6:37:a8

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000
 Duplex:              full

 in-octets:                        9992
 in-unicast-pkts:                   161
 in-errors:                           0
 out-octets:                       6986
 out-unicast-pkts:                  161
 out-errors:                         11

 IPSec:
     Tunnel Status:   Up
     Tunnel Details:
         Name:        ipsec-client-tunnel-secondary-rem2
         Remote id:   172.16.5.4
         SA creation time:
           2020-06-30 16:37:50
         In bytes:    0
         Out bytes:   336
     SA Count:        1

Completed in 0.12 seconds
```

Example output for a tunnel that is down:
```
========================================
 combo-west:rem1
========================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         76:78:79:fc:eb:69

 Admin Status:        up
 Operational Status:  down
 Redundancy Status:   non-redundant
 Speed:               0
 Duplex:              unknown

 in-octets:                     1962932
 in-unicast-pkts:                 32710
 in-errors:                           0
 out-octets:                    1373442
 out-unicast-pkts:                32701
 out-errors:                          6

 IPSec:
   Tunnel Status:     Down
```

#### Tunnel Monitor State

If tunnel monitoring is enabled for a remote, corresponding tunnel monitoring state is included in the pcli commands.

```
 IPSec:
     Tunnel Status:   Up
     Tunnel Details:
         Name:        ipsec-client-tunnel-primary-rem1
         Remote id:   172.16.4.3
         SA Details:
             Add time:2022-02-14 15:41:15
             In bytes:60
             Out bytes:60
         Ingress Total (bytes):60
         Egress Total (bytes):60
     SA Count:        1
     Tunnel Monitoring:
           Destination:8.8.8.8
           Status:    up
           Last Attempt:2022-02-14 15:42:34
           Last Restart:2022-02-14 15:41:15
```

### Commands

##### Version History

| Release  | Modification                         |
| -------- | ------------------------------------ |
| 3.3.0    | `restart ipsec remote` command was introduced |

The `restart ipsec remote` command can be used to restart an individual IPSec tunnel via the conductor PCLI and UI.

```
admin@node1.conductor# restart ipsec remote router router-1 node node-1 remote-1
✔ Retrieving 0/1 targets complete....
Target: node1.conductor

002 "ipsec-client-tunnel-primary-remote-1": terminating SAs using this connection
002 "ipsec-client-tunnel-primary-remote-1" #8261: deleting state (STATE_PARENT_I1)
002 "ipsec-client-tunnel-primary-remote-1" #8262: initiating v2 parent SA
133 "ipsec-client-tunnel-primary-remote-1" #8262: STATE_PARENT_I1: initiate

Successfully retrieved info.
admin@node1.conductor#
```

From the conductor UI, the command can be accessed as shown in the screenshot below.

![IPsec Tunnel Restart Command](/img/ipsec_tunnel_restart.png)


### Systemd Services
To check the status of the IPsec client service on the router, you can run `show system services` which will show all SSR related services running on the specified node. The one for this plugin is named `128t-ipsec`.

To verify that the services are running properly on the SSR:
* `systemctl status 128t-ipsec@<client>.service`

### Failover Alarms
If a tunnel goes down, we set the corresponding ingress KNI to be operationally down. An alarm will be created when this happens.

Example output when the tunnel for `rem1` goes down:

```admin@combo-west.RTR_WEST_COMBO# show alarms
Tue 2020-06-30 16:42:50 UTC

============== ===================== ========== ============= =========== ==================================
 ID             Time                  Severity   Source        Category    Message
============== ===================== ========== ============= =========== ==================================
 combo-west:8   2020-06-30 16:32:42   critical   unavailable   interface   Intf rem1 (4) operationally down

There are 0 shelved alarms
Completed in 0.10 seconds
```

## Appendix
### Generated SSR Configuration
A KNI per remote is created with the name of the `remote` and a single egress KNI is created with the name of the `ipsec-client`.

### User-Specific SSR Configuration
To allow the maximum flexibility on getting the traffic into the plugin's network namespace and getting the traffic out, we rely on the user to configure those means (usually through services and service routes).

You will need to have the IPsec endpoint bound traffic sent into the KNIs with the names of the `remote`s. You can use builtin SSR failover techniques due to the KNIs being reported operationally down when the corresponding tunnel is down. You will also need to configure a way for the traffic to be routed towards the IPsec endpoint after being encrypted. All of this encrypted traffic will be assigned to the `tenant` configured under `ipsec-client`.

### Complete Example Configuration

Below is an example of a complete, but minimal configuration entered by the user.

:::warning
This example configuration is good to understand all of the concepts but should not be used on a system as is.
:::

```
config
    authority
        tenant ipsec
        exit

        tenant lan
        exit

        service         cleartext
            name            cleartext
            address         1.1.1.0/24

            access-policy   lan
                source      lan
                permission  allow
            exit
        exit

        service         ipsec
            name           ipsec
            address        172.16.4.3

            access-policy  ipsec
                source      ipsec
                permission  allow
            exit
        exit

        router               router1
            ipsec-profile         primary
                name                 primary
                pre-shared-key       somekey1
            exit

            ipsec-profile         secondary
                name                 secondary
                pre-shared-key       somekey2
            exit

            node node1
                device-interface          lan
                    name               lan

                    network-interface  lanintf
                        name          lanintf
                        tenant        lan

                        address       172.16.1.2
                            ip-address     172.16.1.2
                            prefix-length  24
                            gateway        2.2.2.1
                        exit
                    exit
                exit

                device-interface          wan
                    name               wan

                    network-interface  wanintf
                        name          wanintf

                        address       172.16.3.2
                            ip-address     172.16.3.2
                            prefix-length  24
                            gateway        172.16.3.5
                        exit
                    exit
                exit

                ipsec-client              client1
                    name     client1
                    enabled  true
                    tenant   ipsec

                    remote   rem1
                        name     rem1
                        host     172.16.4.3
                        profile  primary
                    exit

                    remote   rem2
                        name     rem2
                        host     172.16.5.4
                        profile  secondary
                    exit
                exit
            exit

            service-route         rem1
                name          rem1
                service-name  cleartext

                next-hop      router1 rem1-intf
                    node-name   router1
                    interface   rem1-intf
                    gateway-ip  169.254.129.6
                exit
            exit

            service-route         rem2
                name          rem2
                service-name  cleartext

                next-hop      router1 rem2-intf
                    node-name   router1
                    interface   rem2-intf
                    gateway-ip  169.254.129.10
                exit
            exit

            service-route         ipsec
                name          ipsec
                service-name  ipsec

                next-hop      router1 wanintf
                    node-name   router1
                    interface   wanintf
                    gateway-ip  172.16.3.5
                exit
            exit
        exit
    exit
exit
```

Upon commit, the plugin will generate other configuration as shown below:

```
config
    authority
        router router1
            node node1
                device-interface          client1
                    name               client1
                    description        "Auto-generated host interface for use with ipsec-client"
                    type               host
                    network-namespace  client1

                    network-interface  client1-intf
                        name       client1-intf
                        type       external
                        tenant     ipsec

                        address    169.254.129.1
                            ip-address     169.254.129.1
                            prefix-length  30
                            gateway        169.254.129.2
                        exit
                    exit
                exit

                device-interface          rem1
                    name               rem1
                    description        "Auto-generated host interface for use with ipsec-client"
                    type               host
                    network-namespace  client1

                    network-interface  rem1-intf
                        name       rem1-intf
                        type       external
                        tenant     _internal_

                        address    169.254.129.5
                            ip-address     169.254.129.5
                            prefix-length  30
                            gateway        169.254.129.6
                        exit
                    exit
                exit

                device-interface          rem2
                    name               rem2
                    description        "Auto-generated host interface for use with ipsec-client"
                    type               host
                    network-namespace  client1

                    network-interface  rem2-intf
                        name       rem2-intf
                        type       external
                        tenant     _internal_

                        address    169.254.129.9
                            ip-address     169.254.129.9
                            prefix-length  30
                            gateway        169.254.129.10
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

## Release Notes

### Release 3.4.0

**Release Date:** Jul 13, 2022

**Router Version** 128T-ipsec-2.2.4-2

#### New Features and Improvements
- **PLUGIN-1720** Added support for new ciphers for Phase-1 and Phase-2 security

The plugin now support aes-256-gcm, dh-20, sha512 and no-auth encryption schemes.

#### Issues Fixed

- **PLUGIN-880** IPSec client connection is not initiated for certain config combinations

  _**Resolution:**_ The ipsec client names beginning with ipsec and mast are not supported by libreswan. As part of the fix, a new config rule was added to enforce this requirement.

- **PLUGIN-1807** IPSec health monitoring configuration does not report correct status

  _**Resolution:**_ The monitoring scripts were writing data to a non-persistent path resulting in the failure across reboots. The state directory will not be automatically re-generated on system reboots.

- **PLUGIN-1810** Trace logging in configuration results in IPSec failures

  _**Resolution:**_ Trace level logging is now converted appropriately for IPSec configuration to prevent underlying failures.

### Release 3.3.1

**Release Date:** May 25, 2022

**Router Version** 128T-ipsec-2.2.2-1

#### Issues Fixed

- **PLUGIN-1730** Invalid libreswan configuration was being generated when multiple local or remote subnets were configured.

  _**Resolution**_ The issue with the libreswan configuration generation has been resolved.

### Release 3.3.0

**Release Date:** Apr 27, 2022

#### New Features and Improvements
- **PLUGIN-630** Raise the number of supported IPSec client tunnels from 2 to 4

The plugin now supports up to 4 IPSec tunnels per node.

- **PLUGIN-1641** Optimize the initial IPSec environment setup

The majority of the IPSec config and environment management is performed locally on the router thereby minimizing the interaction with salt states.

- **PLUGIN-1533** Create a command to restart an individual tunnel

A new command was added to allow the user to restart an individual tunnel. More details can be found in the [commands section](#commands)

- **PLUGIN-1532** Enable additional configuration options for IPSec tunnels.

The `encapsulation` and `remote-peer-type` options are now available for configuration.

- **PLUGIN-1554** Collect ipsec-client plugin data as part of tech support info

The detailed tech support info bundle will now include the necessary logs and data for troubleshooting ipsec-client plugin related problems.

- **PLUGIN-1598** - Support custom options for obscure libreswan config fields

A new config option has been added to enable libreswan features that are not made available as first class configuration.

- **PLUGIN-1591** Add cpu, memory, and  status tracking for ipsec services.

The system will now track the cpu, memory and usage information for various IPSec client related processes.

#### Issues Fixed

- **PLUGIN-1628** Incorrect network-script path was being used in the auto generated device-interface configuration

  _**Resolution**_ The auto configuration was updated to use the correct script path.

- **PLUGIN-1610** The IPSec environment setup can fail on first time plugin install

  _**Resolution**_ The salt states were improved to have better interdependencies to avoid the first time boot failure.

### Release 3.2.0

#### New Features and Improvements
- **PLUGIN-1509** Ability to configure tunnel monitors

The feature adds support for configuring tunnel monitors using ping. See [the tunnel monitoring section](#tunnel-monitoring) for more details.

#### Issues Fixed
- **PLUGIN-1389** Corrupt encryption database caused tunnels to not come up.

  _**Resolution**_ The service on the router will clean up these database files on startup.

- **PLUGIN-1467** Configuring `aes_gcm256` for `phase2-encryption` resulted in invalid libreswan configuration.

  _**Resolution**_ The libreswan config generation will generate valid configuration for `aes_gcm256`.

### Release 3.1.3

#### Issues Fixed

- **PLUGIN-1480** IPSec tunnels were removed from all previously configured routers after config commit

  _**Resolution:**_ The config generation logic for the plugin will handle config with long lines correctly

### Release 2.2.0, 3.1.0

#### New Features and Improvements
- **PLUGIN-1289** Ability to provision custom MSS on the remote tunnel interfaces

The feature adds support for configuring a custom MSS value on the remote IPSec tunnel interface. The new configuration can be found under `router > node > ipsec-client > remote > enforced-mss`. The configuration follows the same format as the [network-interface > enforced-mss](config_reference_guide.md#network-interface).

### Release 1.0.7, 2.0.7, 2.1.0, 3.0.2

#### Issues Fixed

- **PLUGIN-1092** IPSec left and right subnet configuration does not always work correctly

  _**Resolution:**_ The non-default left and right subnet configuration is correctly translated to corresponding libreswan configuration.

- **PLUGIN-1103** IPSec remote host does not appear as link on the GUI

  _**Resolution:**_ The GUI presentation model was updated to include the missing key field.

### Release 3.0.1

#### Issues Fixed

- **PLUGIN-1092** Added fix for local and remote subnet configuration option to allow a single value or a list of values.

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the IPSec client plugin in SSR versions `5.1.0` and greater.
- **PLUGIN-611** Added support for plugin state. Plugin state information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-ipsec-client`

### Release 1.0.6, 2.0.6

#### Issues Fixed

- **PLUGIN-1057** Ensure all critical IPsec client directories are created during installation of the plugin.
- **PLUGIN-1053** Added an inactive IPsec client plugin state to allow seamless migration from zscaler. The inactive state is achieved by excluding `ipsec-client` from the configuration.
- **PLUGIN-1046** Provide IPsec client auto-upgrade capability while crossing the SSR version `4.3.0` boundary.

### Release 1.0.5, 2.0.5

#### Issues Fixed

- **PLUGIN-994** The `ipsec-client > remote-id` configuration is not being used correctly when generating the libreswan config.

### Release 1.0.4, 2.0.4

#### Issues Fixed

- **PLUGIN-384** Added an MTU configuration option to the ipsec profile.
- **PLUGIN-333** The `plugin-network` ip prefix setting in the configuration was ignored and would instead use the default ip prefix setting.
- **PLUGIN-336** Using the `vector-name` configuration option would generate invalid configuration.
- **PLUGIN-400** Added a local subnet configuration option and enhanced the remote subnet configuration option to allow a list of values.

### Release 1.0.1, 2.0.1

#### Issues Fixed

- **PLUGIN-47** Created generic IPsec client plugin to provide connectivity to remote ipsec endpoints. This version supports a single client with up to two remote endpoints.
