---
title: Wireguard Plugin
sidebar_label: Wireguard
---

The wireguard plugin allows your 128T router to peer with other endpoints using [wireguard](https://www.wireguard.com/).  With this plugin you can securely connect endpoints to your 128T fabric, extending services and network tenancy.

![Wireguard overview](/img/plugin_wireguard_1.png)

:::note
See instructions for [installing and managing](plugin_intro.md#installation-and-management) plugins.
:::

## Wireguard Basics

Wireguard operates using [cryptokey routing](https://www.wireguard.com/#cryptokey-routing), which provides device-to-edge security with a 128T service centric fabric. For any wireguard peer to securely communicate with another, a [Curve25519](https://tools.ietf.org/html/rfc7748) public/private keypair is generated. Each endpoint wishing to form a peering relationship must be configured minimally with the public key of the peer, and the prefixes that are allowed to be sent to the peer.

When a 128T router is configured for wireguard, it will generate a public key which can be configured in remote endpoints that are to peer with it. Additionally service prefixes that should be sent to the 128T router by a wireguard peer, can be configured as allowed IPs. More information on wireguard configuration can be found [here](https://www.wireguard.com/quickstart/).

## Basic Configuration

To configure your 128T router for wireguard peering, you first create a wireguard profile on the router. For example, the following defines a profile called `wg-profile-1`. Each wireguard endpoint will use a unique address from the prefix `10.10.10.0/24` as defined in the profile and the router wireguard instance will use the first address of `10.10.10.1`.:

```
config
  authority
    router             r1
      wireguard-profile    wg-profile-1
        name             wg-profile-1

        private-network
            neighborhood  remote
            address       10.10.10.1/24
        exit
      exit
    exit
  exit
exit
```

With a profile configured, the next step is to reference the wireguard profile on a network-interface address that you want to use for wireguard peering. For example, this sets `eth1-net` address `192.168.128.1` to function as a wireguard peering endpoint:
```
config
  authority
    router             r1
      node                 node1
        device-interface  eth1
          network-interface  eth1-net
            address     192.168.128.1
              wireguard-profile wg-profile-1
            exit
          exit
        exit
      exit
    exit
  exit
exit
```
With the profile configured and set on an interface, the router will install the required components for wireguard peering.


#### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 2.1.0        | Support for DHCP interfaces is introduced        |

Wireguard profile can be configured on DHCP enabled network interfaces:
```
config
  authority
    router             r1
      node                 node1
        device-interface  eth1
          network-interface  eth1-net
            dhcp            v4
            wireguard-profile wg-profile-1
          exit
        exit
      exit
    exit
  exit
exit
```


## Services and Tenants with Wireguard

Configuration of a wireguard profile on a 128T router interface does **not** provide access to network services. It simply allows the endpoint to connect to the router using wireguard for secure transport, and all sessions will still be subject to the rules of [tenants and services](concepts_glossary.md#service-layer). To facilitate network tenancy being given to traffic coming from wireguard peers, a profile is configured with a neighborhood. The neighborhood in the wireguard profile will function as a named Layer 3 network, and used in defining [neighborhood based tenancy](bcp_tenants.mdx#per-neighborhood-tenancy) to provide access to services.

:::tip
If you do not have a pre-defined tenant to use for wireguard endpoints, you can optionally configure a `tenant` in the profile, and one will be automatically generated for you.
:::

## Connecting Remote Endpoints

You have devices that are remote from your 128T fabric, but you want to give them network tenancy and access to services. In this example use case, assume you have two datacenter routers `dc1` and `dc2`, hosting services for `172.16.1.0/24` and `172.16.2.0/24` respectively. You want your remote devices to connect directly to each datacenter for these services, and be given a tenant called `remote`. `dc1` has a network-interface address of `1.1.1.1`, and `dc2` has a network-interface address of `2.2.2.2` that will be used to allow wireguard peers to connect.

![Wireguard remote endpoints](/img/plugin_wireguard_2.png)

Each peer is assigned an address out of a `10.10.10.0/24` private network, which they can use when sending sessions on to the fabric. Also every peer will end up having a public/private wirguard keypair. For this use case example, each peers have the following info assigned to them:

| peer | private address | public key |
| --- | --- | --- |
| p1 | `10.10.10.2` | `cScVKF4nTbdDcGoZgbkNMRFhSEC0dVqdufIBBnCNvCk=` |
| p2 | `10.10.10.3` | `4uXibv7XeeTxYhc5clp0G4cIYicvY03RQGxLwDNCCEY=` |
| p3 | `10.10.10.4` | `lqvXPuopoYfVcVgpUEtF8Y6BXn8n6YXXAhRGhS50vU8=` |

### Profile Configuration

The following config sets up profiles on each of the `dc1` and `dc2` routers, and provisions each peer.

#### Router dc1
```
config
  authority
    router             dc1
      wireguard-profile    wg-profile-1
        name             wg-profile-1

        private-network
            neighborhood  remote
            address       10.10.10.1/24
        exit

        peer             p1
            name        p1
            public-key  cScVKF4nTbdDcGoZgbkNMRFhSEC0dVqdufIBBnCNvCk=
            allowed-ip  10.10.10.2/32
        exit

        peer             p2
            name        p2
            public-key  4uXibv7XeeTxYhc5clp0G4cIYicvY03RQGxLwDNCCEY=
            allowed-ip  10.10.10.3/32
        exit

        peer             p3
            name        p3
            public-key  lqvXPuopoYfVcVgpUEtF8Y6BXn8n6YXXAhRGhS50vU8=
            allowed-ip  10.10.10.4/32
        exit
      exit

      node                 node1
        device-interface  eth1
          network-interface  eth1-net
            address     1.1.1.1
              wireguard-profile wg-profile-1
            exit
          exit
        exit
      exit
    exit
  exit
exit
```
#### Router dc2
```
config
  authority
    router             dc2
      wireguard-profile    wg-profile-1
        name             wg-profile-1

        private-network
            neighborhood  remote
            address       10.10.10.1/24
        exit

        peer             p1
            name        p1
            public-key  cScVKF4nTbdDcGoZgbkNMRFhSEC0dVqdufIBBnCNvCk=
            allowed-ip  10.10.10.2/32
        exit

        peer             p2
            name        p2
            public-key  4uXibv7XeeTxYhc5clp0G4cIYicvY03RQGxLwDNCCEY=
            allowed-ip  10.10.10.3/32
        exit

        peer             p3
            name        p3
            public-key  lqvXPuopoYfVcVgpUEtF8Y6BXn8n6YXXAhRGhS50vU8=
            allowed-ip  10.10.10.4/32
        exit
      exit
    exit

    node                 node1
      device-interface  eth1
        network-interface  eth1-net
          address     2.2.2.2
            wireguard-profile wg-profile-1
          exit
        exit
      exit
    exit
  exit
exit
```

With this config committed, wireguard will be installed and set up on `dc1` and `dc2`, and it will generate a wireguard keypair automatically. Once the interface is fully installed, you can view the public wireguard key of the profile by using the CLI command `show device-interface router <router_name> name <profile_name>`. Example:

```
admin@node1.dev-conductor# show device-interface router dc1 name wg-profile-1
Wed 2020-08-05 16:46:41 UTC

===================================================================
 node1.dc1:wg-profile-1
===================================================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         6a:ca:96:7b:e3:4c

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1 Gb/s
 Duplex:              full

 in-octets:                       99768
 in-unicast-pkts:                  1653
 in-errors:                           0
 out-octets:                      67788
 out-unicast-pkts:                 1614
 out-errors:                          0

 wireguard:
   interface:
     listening port:  12800
     name:            wg0
     public key:      lV8egtiC8AKNh+DawkSM6G8t4x6BMFCsz8m48ToxHyA=
   number of peers:   3
   peers:
       peer#1 - p1:
         allowed ips: 10.10.10.2/32
         public key:  cScVKF4nTbdDcGoZgbkNMRFhSEC0dVqdufIBBnCNvCk=
       peer#2 - p2:
         allowed ips: 10.10.10.3/32
         public key:  4uXibv7XeeTxYhc5clp0G4cIYicvY03RQGxLwDNCCEY=
       peer#3 - p3:
         allowed ips: 10.10.10.4/32
         public key:  lqvXPuopoYfVcVgpUEtF8Y6BXn8n6YXXAhRGhS50vU8=

Completed in 0.27 seconds
```

### Remote Endpoint Configuration

Now the remote peer endpoints can be configured to peer with the `dc1` and `dc2` routers at their respective interface addresses, and route the corresponding service prefixes of `172.16.1.0/24` and `172.16.2.0/24` to each. For example, a wireguard config for peer `p1` might look like the following:
:::tip
See [wireguard documentation](https://www.wireguard.com/quickstart/) for more on configuring wireguard on other endpoints.
:::
```
[Interface]
# p1
Address = 10.10.10.2/32
PrivateKey = kLbzfaAMMn1Nen3zZ+LreKCglYJuBgdvy/fFNgIZxHk=

[Peer]
# dc1
PublicKey = lV8egtiC8AKNh+DawkSM6G8t4x6BMFCsz8m48ToxHyA=
AllowedIPs = 172.16.1.0/24
Endpoint = 1.1.1.1:12800

[Peer]
# dc2
PublicKey = uB/YI6A/UZtLCLsnOuoWI+lopiwBO0/QdbdN5ryBsm4=
AllowedIPs = 172.16.2.0/24
Endpoint = 2.2.2.2:12800
```

### Network Tenant For Endpoints

In the remote endpoint example, traffic coming from endpoints will be transported to the appropriate 128T `dc1` or `dc2` routers using wireguard, and then be sent into the fabric sourced from each endpoint's assigned private address in the `10.10.10.0/24` network. To assign these endpoints a tenant, thus giving them access to services, the profile is configured with a `neighborhood` of `remote`. Based on this, you can define tenant membership for each endpoint in the private network.

For example, the following could be used to give endpoints in the network a tenant of `remote-worker` (including `p1` and `p2`), but give just `p3` tenant `engineering`:

```
config
  authority
    tenant             remote-worker
      name    remote-worker

      member  remote
          neighborhood  remote
          address       10.10.10.0/24
      exit
    exit

    tenant             engineering
      name    engineering

      member  remote
          neighborhood  remote
          address       10.10.10.4/32
      exit
    exit
  exit
exit
```

## Remote Service Agent

You have a remote device that needs to be accessed as an agent of a service in your 128T network. In this example use case you have a remote IoT device that hosts a `thing` service with address `128.128.128.128/32`, which must be accessed by a tenant `technician`.

A remote IoT device has a wireguard peer with a public key of `Jihom426SSceUCPpS1147NSNzZcY1wl40Sf+OQ1rjGU=`. It will be given an address of `10.10.10.2` from the private network, and it will peer with the 128T router `r1` on the  `1.1.1.1` network-interface address.

![Wireguard service agent](/img/plugin_wireguard_3.png)

### Profile Configuration

The following configuration sets up the wireguard profile, along with the IoT device wireguard peer:
```
config
  authority
    router             r1
      wireguard-profile    wg-profile-1
        name             wg-profile-1

        private-network
          neighborhood  remote
          address       10.10.10.1/24
        exit

        peer             iot-dev-1
          name        iot-dev-1
          public-key  Jihom426SSceUCPpS1147NSNzZcY1wl40Sf+OQ1rjGU=
          allowed-ip  10.10.10.2/32
        exit
      exit

      node                 node1
        device-interface  eth1
          network-interface  eth1-net
            address     1.1.1.1
              wireguard-profile wg-profile-1
            exit
          exit
        exit
      exit
    exit
  exit
exit
```

### Remote Endpoint Configuration

The wireguard configuration on the IoT device might look like the following:
```
[Interface]
# IoT device
Address = 10.10.10.2/32
PrivateKey = MEAtlWq4Ou7++yxjYGtTa85gzDj3mbbCy76J5oWPaG8=

[Peer]
# r1
PublicKey = lV8egtiC8AKNh+DawkSM6G8t4x6BMFCsz8m48ToxHyA=
AllowedIPs = 0.0.0.0/0
Endpoint = 1.1.1.1:12800
PersistentKeepalive = 30
```
:::note
If wireguard is hosted on a DHCP enabled interface, the peer's `Endpoint` address needs to be configured with the latest IP address assigned.
:::

:::note
The `PersistentKeepalive` in this wireguard configuration causes the peer to keep the connection to the peer alive by sending periodic traffic. This has the effect of allowing the 128T to originate sessions to the peer at any time. See [wireguard documentation](https://www.wireguard.com/quickstart/) for more on configuring wireguard on other endpoints.
:::

With the profile and peer configured on the 128T router `r1`, and wireguard configured on the remote IoT device, you can verify the device is keeping the connection alive by reviewing the `latest handshake` output of `show device-interface router <router_name> name <profile_name>`:

```

admin@node1.dev-conductor# show device-interface router r1 name wg-profile-1
Wed 2020-08-05 23:33:02 UTC

===================================================================
 node1.r1:wg-profile-1
===================================================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         6a:ca:96:7b:e3:4c

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1 Gb/s
 Duplex:              full

 in-octets:                      493467
 in-unicast-pkts:                  7115
 in-errors:                           0
 out-octets:                     356373
 out-unicast-pkts:                 7218
 out-errors:                          0

 wireguard:
   interface:
     listening port:  12800
     name:            wg0
     public key:      lV8egtiC8AKNh+DawkSM6G8t4x6BMFCsz8m48ToxHyA=
   number of peers:   4
   peers:
       peer#1 - iot-dev-1:
         allowed ips: 10.10.10.2/32
         endpoint:    192.168.128.222:42948
         latest handshake: 21 seconds ago
         public key:  Jihom426SSceUCPpS1147NSNzZcY1wl40Sf+OQ1rjGU=
         transfer:    17.96 KiB received, 67.58 KiB sent

Completed in 0.25 seconds
```

### Service Routing

Finally the `thing` service must be routed to the remote wireguard peer.

#### Service
```
config
  authority
    service            thing
      name           thing
      description    "IoT sensor data service"
      address        128.128.128.128/32

      access-policy  technician
        source      technician
        permission  allow
      exit
    exit
  exit
exit
```

#### Service-route
```
config
  authority
    router             r1
      service-route        static-thing
        name          static-thing
        service-name  thing
        nat-target    10.10.10.2

        next-hop      node1 wg-profile-1-intf
          node-name   node1
          interface   wg-profile-1-intf
          gateway-ip  169.254.140.129
        exit
      exit
    exit
  exit
exit
```
:::note
The `interface` and `gateway-ip` in this configuration are automatically generated as part of the profile configuration on the router, and can be seen with `show network-interface`.
:::

With this configuration, sessions sent from the `technician` tenant to `128.128.128.128` will be given access as part of the `thing` service, and routed with a destination NAT to the wireguard interface of `10.10.10.2` on the IoT device peer.

## Configuration Reference

### wireguard-profile

#### Path

authority > router > wireguard-profile

#### Description

A profile describing an instance of wireguard on the router.

| Element              | Type          | Description |
| -------------------- | ------------- | ----------- |
| `name`               | string        | A string identifier for wireguard profile. This identifier is used as a device interface name in the host, therefore it can only use alphanumerics, underscores, or dashes, and cannot exceed 12 characters. |
| `description`        | string        | A description about the wireguard profile. |
| `loopback-address`   | ipv4-prefix   | An internal address prefix for KNI connectivity between wireguard and the data plane. |
| `port`               | l4-port       | The UDP port for the wireguard instance to recieve connections on. |
| `inactivity-timeout` | milliseconds  | Inactivity timeout for wireguard sessions. By default this uses 180000 ms UDP timeout value. If customized to a non-default value, a new session-type will be automatically generated. |
| `service-class`      | string        | The service-class to associate with the generated session-type for this wireguard profile. Wireguard sessions arriving at the router will be given this service-class. |
| `access-policy`      | access-policy | List of access policies for the wireguard service. Packets allowed by this access policy will additionally be subject to wireguard security validation. See [service access policy](config_reference_guide.md#access-policy-service). |

### private-network

#### Path

authority > router > wireguard-profile > private-network

#### Description

A network to be associated with router the wireguard network-interface. This network handles packets after they have been decrypted from a wireguard peer connection, or prior to being encrypted and sent to a wireguard peer connection. The router wireguard instance will use the address given, and other peers can send or receive sessions using the remaining addresses in the network.

| Element           | Type            | Description |
| ----------------- | --------------- | ----------- |
| `neighborhood`    | neighborhood-id | Neighborhood to be associated with the wireguard network. Addresses assigned to peers can be made members of an appropriate existing tenant based on this neighborhood. |
| `tenant-name`     | string          | A tenant to be associated with addresses in the network. If configured, a tenant will be automatically generated with the addresses in the neighborhood set as members. If not configured, no tenant will be generated, and peer addresses in the network will need to be defined as members of existing tenants. |
| `address`         | ip prefix       | The address and prefix associated with the wireguard profile. The wireguard interface created on the router will use the address defined, and other peers can send or receive sessions using the remaining addresses in the network. |

### peer

#### Path

authority > router > wireguard-profile > peer

#### Description

Set of allowed wireguard peers.

| Element                | Type      | Description |
| ---------------------- | --------- | ----------- |
| `name`                 | string    | Name identifier for the peer. |
| `public-key`           | string    | The peer's base64 encoded 32 byte Curve25519 public wireguard key. |
| `preshared-key`        | string    | The peer's optional base64 encoded 32 byte Curve25519 pre-shared wireguard key. |
| `persistent-keepalive` | seconds   | Interval in seconds at which to send keepalive messages to the peer. Keepalives are optional. No configuration or a setting of '0' disables keepalives. |
| `allowed-ip`           | ip prefix | The prefixes that are allowed to be sent to the peer. When the peer is an endpoint, typically the allowed-ip is the /32 of the peer's wireguard interface. If the peer is a gateway device, the allowed-ip list would include any prefixes reachable as services via the peer, or prefixes from which traffic may be sourced. |

:::note
Disabled keepalives on the router does not mean keepalives cannot be generated by the remote peer. If keepalives are desired, a typical configuration is to have keepalives disabled on the router, but enabled on the remote peer.
:::

### endpoint

#### Path

authority > router > wireguard-profile > peer > endpoint

#### Description

IP and port of the endpoint. If not set, the endpoint of the peer will establish dynamically based on the source address discovered during the wireguard handshake.

| Element | Type        | Description |
| ------- | ----------- | ----------- |
| `ip`    | ip address  | Static IP address where the peer can be reached to connect. |
| `port`  | port number | Port at which the peer can be reached to connect. |

:::note
If an endpoint is configured, wireguard on the 128T may attempt to send outbound sessions to the IP and port defined. The sessions will originate from the profile loopback-address. A tenant and service must be created to route the outbound wireguard session to the defined peer endpoint.
:::

## Troubleshooting

#### Interface status

To view the status of a wireguard interface, and its peers, use the following PCLI command:
```
show device-interface router <router_name> name <profile_name>
```

Example:
```
admin@node1.dev-conductor# show device-interface router r1 name wg-profile-1
Fri 2020-08-07 13:35:22 UTC

===================================================================
 node1.r1:wg-profile-1
===================================================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         6a:ca:96:7b:e3:4c

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1 Gb/s
 Duplex:              full

 in-octets:                     4349806
 in-unicast-pkts:                 50978
 in-errors:                           0
 out-octets:                    4793736
 out-unicast-pkts:                63193
 out-errors:                          0

 wireguard:
   interface:
     listening port:  12800
     name:            wg0
     public key:      lV8egtiC8AKNh+DawkSM6G8t4x6BMFCsz8m48ToxHyA=
   number of peers:   5
   peers:
       peer#1 - iot-dev-1:
         allowed ips: 10.10.10.5/32
         endpoint:    192.168.128.222:42948
         latest handshake:1 minute, 2 seconds ago
         public key:  Jihom426SSceUCPpS1147NSNzZcY1wl40Sf+OQ1rjGU=
         transfer:    368.22 KiB received, 177.72 KiB sent
       peer#2 - p1:
         allowed ips: 10.10.10.2/32, 192.168.8.0/24
         endpoint:    192.168.128.30:58608
         latest handshake:11 hours, 35 minutes, 38 seconds ago
         public key:  cScVKF4nTbdDcGoZgbkNMRFhSEC0dVqdufIBBnCNvCk=
         transfer:    775.50 KiB received, 771.83 KiB sent
       peer#3 - p2:
         allowed ips: 10.10.10.3/32
         public key:  4uXibv7XeeTxYhc5clp0G4cIYicvY03RQGxLwDNCCEY=
       peer#4 - p3:
         allowed ips: 10.10.10.4/32
         public key:  lqvXPuopoYfVcVgpUEtF8Y6BXn8n6YXXAhRGhS50vU8=

```

#### Interface and profile configuration logging

Logging of new configuration sent to the router can be viewed in the Linux shell using the system journal.

```
journalctl -u 128T-handle-wireguard-config
```

Example:
```
[t128@dev-fitlet ~]$ sudo journalctl -u 128T-handle-wireguard-config
-- Logs begin at Sun 2012-01-01 00:37:26 UTC, end at Fri 2020-08-07 13:38:00 UTC. --
Jul 30 02:06:25 dev-fitlet systemd[1]: Starting Handler for 128T wireguard config...
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote' does not exist
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote' created
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/init' does not exist
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/reinit' does not exist
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/shutdown' does not exist
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/startup' does not exist
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/init' symlink to '/etc/128technology/plugins/network-scripts/default/kni_namespace/init' created
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/reinit' symlink to '/etc/128technology/plugins/network-scripts/default/kni_namespace/reinit' created
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/shutdown' symlink to '/etc/128technology/plugins/network-scripts/default/kni_namespace/shutdown' created
Jul 30 02:06:25 dev-fitlet node[2602]: '/etc/128technology/plugins/network-scripts/host/remote/startup' symlink to '/etc/128technology/plugins/network-scripts/default/kni_namespace/startup' created
```

#### Peer configuration logging

Looging of peer configuration handling can be viewed in the Linux shell using the system journal.
```
journalctl -u 128T-handle-wireguard-peer-config@<profile_name>
```

Example:
```
[t128@dev-fitlet ~]$ sudo journalctl -u 128T-handle-wireguard-peer-config@wg-profile-1
-- Logs begin at Sun 2012-01-01 00:37:26 UTC, end at Fri 2020-08-07 13:36:42 UTC. --
Aug 05 14:32:40 dev-fitlet systemd[1]: Starting Handler for wireguard peer and network config wg/profile/1...
Aug 05 14:32:40 dev-fitlet node[32315]: '/etc/128technology/plugins/network-scripts/host/wg-profile-1/wg0.conf' written
```

#### Wireguard not installed on the router
In some cases, it is possible that the version of 128T router is not compatible with wireguard. In such a case you will see the log messages like below in the journal

```
Dec 18 20:56:03 t211-dut2.openstacklocal python3.6[28707]: __main__ - Could not validate wireguard packages: Could not query package kmod-wireguard, Command '['rpm', '-q', 'kmod-wireguard']' returned non-zero exit status 1.
```

In some upgrade and rollback scenarios, it is possible that an older version of the module is installed on the router but that version is not compatible. Typically in such scenarios, a new version will be installed by the conductor but in some scenarios a compatible version might not be available. The following log messages in the journal can help troubleshoot these errors.

```
Dec 18 20:56:03 t211-dut2.openstacklocal python3.6[26711]: __main__ - Running startup check commands for ns: wg-profile-1
Dec 18 20:56:03 t211-dut2.openstacklocal python3.6[26711]: __main__ - Executing command: ['/usr/libexec/wireguard/startup-check']
Dec 18 20:56:03 t211-dut2.openstacklocal python3.6[28707]: __main__ - Could not validate wireguard packages: Invalid kmod-wireguard for kernel version 3.10.0-1160.el7
Dec 18 20:56:03 t211-dut2.openstacklocal python3.6[26711]: __main__ - not starting wg-profile-1: startup check error: Command '['/usr/libexec/wireguard/startup-check']' returned non-zero exit status 1.
```

## Release Notes

:::warning
The plugin must be updated to version 2.0.3 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-config-generation-changes)
:::

### Release 2.1.2

**Release Date:** Dec 07, 2022

**Router Version**
- 128T-wireguard-router-2.1.6-3

#### New Features and Improvements
- **PLUGIN-1839** Reduce time to apply salt states in large scale deployments

By using Saltstack data files, the time to apply high states across all assets is significantly reduced.

#### Issues Fixed

- **PLUGIN-1771** Missing neighborhood config on router breaks the config for other routers

  _**Resolution:**_ The plugin will validate for the missing configuration and will also prevent failures on one router to impact other routes config.

- **PLUGIN-1947** Wireguard plugin fails to operate on certain DHCP enabled interfaces

  _**Resolution:**_ The plugin handles the DHCP address in the presence of a neighborhood configuration more gracefully.

- **PLUGIN-1954** Wireguard plugin fails to run on 128T-5.5.5 and higher

  _**Resolution:**_ The wireguard plugin was extended to support newer kernel versions required for 128T-5.5.5 and above.

### Release 2.1.1

**Release Date:** Jun 16, 2022

#### Issues Fixed

- **PLUGIN-1505** Wireguard config does not allow reference to an existing tenant

  _**Resolution:**_ The config generation logic for the plugin will allow references to existing tenants.

- **PLUGIN-1753** Disabling wireguard plugin can cause the 128T manifest to be removed

  _**Resolution:**_ When disabling the plugin, the kernel modules and 128T manifest are no longer removed.

### Release 2.1.0

#### New Features and Improvements

- **PLUGIN-1429**  Support wireguard on DHCP interfaces
  - The feature adds support for configuring wireguard profile on the network interface level when DHCP is enabled.

#### Issues Fixed

- **PLUGIN-1469**  Add support for kernel version `4.18.0-305.19.1`.

- **PLUGIN-1480** Large configuration was causing plugin config generation to fail

  _**Resolution:**_ The config generation logic for the plugin will handle config with long lines correctly

### Release 2.0.3

#### Issues Fixed

- **PLUGIN-1443**  Config generation for the plugin failing

  _**Resolution:**_ Correctly handle the config generation for routers where the DNS cache plugin is not enabled during config generation

- **PLUGIN-1220**  Add support for kernel version `3.10.0-1160.21.1`.


### Release 2.0.2, 1.2.2

#### Issues Fixed

- **PLUGIN-1089** Add support for kernel version `3.10.0-1160.11.1`.

### Release 2.0.1, 1.2.1

#### Issues Fixed

- **PLUGIN-1072** Allow wireguard to start when the required version of `kmod-wireguard` is installed along with versions not used by the active kernel.
- **PLUGIN-611** Added support for plugin state. Plugin state information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-wireguard`
- **PLUGIN-768** Support the Wireguard plugin on conductors running 128T versions `5.1.0` and greater.

### Caveat

- **I95-38622** The plugin is not supported on routers running 128T version `5.1.0`.

### Release 1.2.0

#### Issues Fixed

- **PLUGIN-922** Support multiple kernel versions for 128T Wireguard plugin and allow for graceful upgrade and rollback of the 128T software releases. The enhancement currently supports the following kernel versions: `3.10.0-1062.9.1`, `3.10.0-1127.18.2`, `3.10.0-1160`, and `3.10.0-1160.6.1`.

### Caveat
- **PLUGIN-987** A 128T software downgrade might fail when the currently installed wireguard kernel module and the new kernel being downgraded to are not compatible. The following procedure may be used to work around this issue

:::caution
The process below will cause the wireguard tunnels to be torn down and the peers to disconnect. Please perform the operations during a maintenance window only.
:::

  - Create a backup of the current running configuration to be restored later.
  - Before rolling back the 128T version, remove all references to `wireguard-profile` from `authority > router > device-interface > network-interface > address`. Once these changes are committed, the wireguard rpms will be removed from the router.
  - Rollback the 128T software to the desired version.
  - Restore the backup created in the first step. Once the changes are committed, the correct wireguard rpm's will be installed on the router.

### Release 1.1.0

#### Issues Fixed

- **PLUGIN-863** A kernel panic condition occurs when running Wireguard with the kernel version `3.10.0-1127.18.2` or above.
