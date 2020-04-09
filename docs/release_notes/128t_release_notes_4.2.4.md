---
title: 128T 4.2.4 Release Notes
sidebar_label: 4.2.4
---

:::note
The 4.2.4 release is a superset of the 4.2.3 release. Features and corrections in the 4.2.3 release are not provided in these release notes. Please refer to the [4.2.3 release notes](./128t_release_notes_4.2.3.md) for further information.
:::

## Special Considerations
- Support has been added to provision management interfaces.  Typically, these are Linux interfaces that are not part of the 128T configuration. These interfaces are called non-forwarding interfaces. It is strongly recommended that non-forwarding interfaces now be configured within the 128T.  When the Conductors are upgraded to 4.2.X, the configuration validation will provide a warning when non-forwarding interfaces are not configured for 128T routers configured in a HA pair. If non-forwarding interfaces are configured prior to upgrading the Conductors to 4.2.X, the shared or fabric device interface type must be explicitly set.  DHCP however is not supported. Note: 4.1.5 does not raise a validation error if the interface had DHCP. (I95-30831)

- Support has been added to allow the 128T Software to automatically determine the number of CPU forwarding cores that the router will use. In previous releases the "automatic/manual" parameter was not available and the core count was defined in environment config or within the UI. If set within the environment config (local.init), 4.2.X will set core count to automatic and determine the number of cores to use. If set in the UI, this parameter will be set to manual and the existing value will be used. Note that if automatic is set and the core count is changed in the PCLI, the change will be accepted as valid configuration but the automatic parameter will override as this parameter takes precedence over the value in the forwarding core count. (I95-30884)

- Prior to 4.1.5, peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:

    The following is supported:
    ```
        R1(172.16.1.1) --- peered --- R2 (192.168.1.1)
                  |------- peered --- R3 (192.168.1.1)
    ```
    The following is not supported:
    ```
        R1(192.168.1.1) --- peered --- R2 (192.168.1.1)
                   |------- peered --- R3 (192.168.1.1)
    ```

- When creating non-forwarding interfaces on pre 4.2.0 routers, these interfaces should not be configured with default routes until after upgrading the routers to 4.2.0 or greater. (I95-30940)

- On 128T, nodes installed after July 1, 2019 on pre 4.2.X versions, Chrome running on MAC OSX Catalina does not consider the 128T self-signed web certificates valid. Apple has put out an advisory: https://support.apple.com/en-us/HT210176 . Once the node is upgraded to 4.2.X, create a new self signed web cert in the PCLI `create certificate self-signed webserver` (I95-31672)


## Issues Fixed

- **I95-30084** Empty BGP neighbor/transport/local-address prevents configuration from being committed

- **I95-32449** WayPoint allocation failures resulting in session setup failures

- **I95-32463** DHCP server rejects packets larger than 500 bytes

- **I95-32625** service-route/host configuration results in invalid route, dropping packets

- **I95-32754** DHCP Server can flood the journal with monitoring messages

- **I95-32843** System can fault when routing loop is created with OSPF

- **I95-32902** LTE APN name not displayed correctly

- **I95-32957** The LTE reset command did not handle some error cases resulting in a failure

- **I95-33122** Configuration now enforces non-forwarding-fabric interfaces must be in the same subnet as its HA pair

- **I95-33148** Non-forwarding interfaces could not come up if a manually created bridge interface existed with the same IP address with that of another 128T provisioned interface

- **I95-33149** Changing a HA non-forwarding interface address will fail to reestablish the connection between nodes

    _**Corrective Action:**_ Restart 128T on the node that did not receive the config change

- **I95-33161** Interfaces that are DHCP enabled within linux (128T not running), returning it from being managed by 128T will result in the error: `dhclient(pid) is already running - exiting`. The interface, as a result will not be able to acquire any IP, until the interface is restarted.

    _**Corrective Action:**_ Invoke `ifdown` on the interface being converted by 128T

- **I95-33170** `show system connectivity internal` incorrectly shows interprocess communication connections status as disconnected

- **I95-33216** Interfaces that are DHCP enabled that are "returned" to linux after 128T shutdown will result in the dhclient process being killed. This results in the interface being unable to renew its dhcp lease after it expires.

    _**Corrective Action:**_ Create a `oneshot` service to be invoked by 128T at `ExecStopPost` so that the `control-group` is separate from 128T service.

- **I95-33277** Traceroute using TCP does not work if udp-transform is enabled.

    _**Corrective Action:**_ Traceroute over UDP should be used as a workaround

- **I95-33279** Path MTU discovery unresolvable when no ICMP is generated

- **I95-33296** Removing a redundant interface and its corresponding redundancy-group within the same commit would abort the commit

- **I95-33441** Changing node name can cause the 128T to fault on shutdown due to a rare race condition

- **I95-33449** 128T Application fault on startup of LTE interface and node name change that is taking place during the startup

- **I95-33474** 128T added MLX4 Azure Accelerated networking devices

- **I95-33486** commit failed when PPPoE interface is set in next-hop interface on service-route

- **I95-33529** Promiscuous mode on ethernet interfaces is not dynamically reconfigurable

- **I95-33536** 128T fault on shutdown with very large number of peer paths

- **I95-33586** Using hostnames rather than IP addresses for nat-target or target-address in a service-route would cause config validation to fail and report an Invalid IP when inspector is enabled.


## Caveats

- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need to be restarted on the respective node. This is done with the following command on the node as the root Linux user:
  ```
systemctl restart salt-minion
  ```

- **I95-27808** `sync peer addresses router force` from Conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the Conductor.