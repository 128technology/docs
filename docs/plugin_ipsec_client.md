---
title: IPsec Client plugin
sidebar_label: IPsec Client
---

The 128T-ipsec-client plugin provides a way to send and encrypt traffic to IPsec endpoints through the 128T router. It is possible to configure the plugin for each router to have multiple destination IPsec endpoints and thus the 128T will failover between them. This is accomplished by performing a [Service Function Chain (SFC)](plugin_intro.md#service-function-chaining) with Libreswan, a third-party IPsec client. By enabling this plugin, you can provide IPsec tunnel connectivity to third party providers from your 128T router.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

In the below configuration examples, there are two of each plugin configuration element. The first has all configuration elements explicitly configured with the defaults if applicable and the other is the bare minimum using all of the default values. The values enclosed in `<>` are fields that didn’t have default values specified by the plugin. If any of these optional, non-defaulted fields are unspecified, then they will use the Libreswan defaults which can be found [here](https://libreswan.org/man/ipsec.conf.5.html). The values enclosed in `[]` are fields that didn't have default values specified by the plugin and will not be included in the generated 128T configuration.

### Profiles
Profiles are reusable IPsec settings that can be used across multiple nodes in a router and multiple IPsec endpoint `remote`s.

```
router
   ipsec-profile gateway1
       name gateway1
       ike-encryption aes128
       ike-digest sha1
       ike-modp modp1024
       ike-v2 insist
       authentication-protocol esp
       phase2-encryption null
       phase2-digest md5
       phase2-modp modp1024
       ike-lifetime 1h
       connection-lifetime 8h
       ike-retransmit-interval <ike-retransmit-interval>
       compress false
       perfect-forward-secrecy false
       dpddelay <dpddelay>
       dpdtimeout <dpdtimeout>
       dpdaction restart
       local-id <local-id>
       metric <metric>
       mtu <mtu>
       pre-shared-key psk1
   exit
   ipsec-profile gateway2
       name gateway2
       pre-shared-key psk2
   exit
exit
```

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

        router  RTR_EAST_1_COMBO
            name           RTR_EAST_1_COMBO

            ipsec-profile  primary
                name           primary

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
Clients are a collection of remote endpoints which can be used for failover purposes.

```
node
    ipsec-client client1
        name client1
        enabled true
        tenant t1
        remote c1gateway1
            name c1gateway1
            host gateway1.com
            profile gateway1
            vector-name [vector-name]
            tenant [tenant]
            subnet <subnet>
            remote-id <remote-id>

        exit
        remote c1gateway2
            name gateway2
            host gateway2.com
            profile gateway2
        exit
    exit
exit
```

:::note
Only one `ipsec-client` can be configured per node, but two `remote`s can be configured per client.
:::

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

### Generated 128T Configuration
A KNI per remote is created with the name of the `remote` and a single egress KNI is created with the name of the `ipsec-client`.

### User-Specific 128T Configuration
To allow the maximum flexibility on getting the traffic into the plugin's network namespace and getting the traffic out, we rely on the user to configure those means (usually through services and service routes).

You will need to have the IPsec endpoint bound traffic sent into the KNIs with the names of the `remote`s. You can use builtin 128T failover techniques due to the KNIs being reported operationally down when the corresponding tunnel is down. You will also need to configure a way for the traffic to be routed towards the IPsec endpoint after being encrypted. All of this encrypted traffic will be assigned to the `tenant` configured under `ipsec-client`.

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


## Thirdparty Software & Licenses
- Libreswan v3.23-5.el7_5 (GNU GPLv2)


## Troubleshooting

### Data Model
If the data model doesn’t appear in the PCLI or GUI, make sure that you have restarted the 128T service.

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
To check the status of the IPsec client service on the router, you can run `show system services` which will show all 128T related services running on the specified node. The one for this plugin is named `128t-ipsec`.

To verify that the services are running properly on the 128T router:
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

## Release Notes

### Release 3.3.0

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

- **PLUGIN-768** Support the IPSec client plugin in 128T versions `5.1.0` and greater.
- **PLUGIN-611** Added support for plugin state. Plugin state information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-ipsec-client`

### Release 1.0.6, 2.0.6

#### Issues Fixed

- **PLUGIN-1057** Ensure all critical IPsec client directories are created during installation of the plugin.
- **PLUGIN-1053** Added an inactive IPsec client plugin state to allow seamless migration from zscaler. The inactive state is achieved by excluding `ipsec-client` from the configuration.
- **PLUGIN-1046** Provide IPsec client auto-upgrade capability while crossing the 128T version `4.3.0` boundary.

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
