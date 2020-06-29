---
title: IPSEC Client plugin
sidebar_label: IPSEC Client
---

The 128T-ipsec-client plugin provides a way to send and encrypt traffic to IPSEC endpoints through the 128T. It is possible to configure the plugin for each router to have multiple destination IPSEC endpoints and thus the 128T will failover between them.

This is accomplished by performing a Service Function Chain (SFC) with Libreswan, a third-party IPSEC client.

By enabling this plugin, you can provide IPSEC tunnel connectivity to third party providers from your 128T.

## Installation

The following versions are available for corresponding 128T software versions:

| IPSEC Client            | 128T                        |
| ----------------------- | --------------------------- |
| 128T-ipsec-client-1.0.4 | 128T >= 3.2.8; 128T < 4.3.0 |
| 128T-ipsec-client-2.0.4 | 128T >= 4.3.0               |

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
::::

## Configuration

### Profiles
Profiles are reusable IPSEC settings that can be used across multiple nodes in a router and multiple IPSEC endpoint `remote`s.

The below configuration has two profiles. One has all configuration elements shown and the other is the bare minimum using all of the default values. The only required fields are the `name` and `pre-shared-key`. The values enclosed in `<>` are fields that didn’t have default values specified by the plugin. If any of the optional, non-defaulted fields are not specified, then they will use the Libreswan defaults which can be found [here](https://libreswan.org/man/ipsec.conf.5.html).

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

### Clients
Clients are a collection of remote endpoints that will be switched between in the case of failures.

The following configuration has two `remote`s. The first one has all configuration possibilities and the second has the minimum configuration needed. The values enclosed in `<>` are fields that didn’t have default values specified by the plugin and will use the Libreswan defaults which can be found [here](https://libreswan.org/man/ipsec.conf.5.html). The values enclosed in `[]` are fields that didn't have default values specified by the plugin and will not be included in the generated 128T configuration.
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

### Generated 128T Configuration
A KNI per remote is created with the name of the `remote` and a single egress kni is created with the name of the `ipsec-client`.

### User-Responsible 128T Configuration
To allow the maximum flexibility on getting the traffic into the plugin's network namespace and getting the traffic out, we rely on the user to configure those means (usually through services and service routes).

You will need to have the IPSEC endpoint bound traffic sent into the KNIs with the names of the `remote`s. You can use builtin 128T failover techniques due to the KNIs being reported operationally down when the corresponding tunnel is down.

You will also need to configure a way for the traffic to be routed towards the IPSEC endpoint after being encrypted. All of this traffic will be assigned to the `tenant` configured under `ipsec-client`.

## Thirdparty Software & Licenses
- Libreswan v3.23-5.el7_5 (GNU GPLv2)

## Known Caveats or Limitations

### Number of Clients
Only one `ipsec-client` can be configured per node, but n `remote`s can be configured per client.

### Scale
It is known that plugins in general are limited in the scale that they can operate. Strain can be put on the conductor with a large amount of managed routers since a lot of work is being done on the conductor.

### RPM Access
The network scripts and other files are installed on the router as part of an rpm so the router will either need internet access or a conductor hosted repo will need to be setup. In 4.4, we support offline-mode where an ISO will need to be imported on the conductor.

### Pre-Shared Key Only
For now, this plugin is limited to only be able to connect to ipsec endpoints that support pre-shared key authentication.

### Throughput
It has not been tested how much traffic can be sent through this SFC flow and through Libreswan.


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
To check the status of the ipsec tunnels for given ingress kni, extra ipsec tunnel related output will be found in the `show device-interface` command.

### Systemd Services
To check the status of the ipsec client service on the router, you can run `show system services` which will show all 128T related services running on the specified node. The one for this plugin is named `128t-ipsec`.

To verify that the services are running properly on the 128T router:
* `systemctl status 128t-ipsec@<client>.service`

### Failover Alarms
If a tunnel goes down, we set the corresponding ingress kni to be operationally down. There will be an alarm created when this happens.
