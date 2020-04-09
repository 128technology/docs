---
title: 128T 4.2.2 Release Notes
sidebar_label: 4.2.2
---

:::note
The 4.2.2 release is a superset of the 4.2.1 release. Features and corrections in the 4.2.1 release are not provided in these release notes. Please refer to the [4.2.1 release notes](./128t_release_notes_4.2.1.md) for further information.
:::

## Special Considerations
- Support has been added to manage the Linux interfaces that are not part of the controlled 128T interfaces. These interfaces are called non-forwarding interfaces. These interfaces should be configured, when the conductors are upgraded to 4.2.0 the configuration validation will provide a warning that a non-forwarding interface is not configured until this configuration is added for each node/router. If these interfaces are configured and defined before the conductors are upgraded, the shared or fabric device interface type must be explicitly set and DHCP is not supported. Note: 4.1.5 does not raise a validation error if the interface had DHCP. (I95-30831)

- Support has been added to allow the 128T Software to determine the number of CPU forwarding Cores that the router will use. In previous releases the "automatic/manual" parameter was not available and the core count was set in either the local.init or in the UI for the number of cores. If local.init is set only, 4.2.0 will set to automatic and determine the number of cores to use. If set in the UI, this parameter will be set to manual and the existing value will be used. Note if automatic is set and the core count is changed in the PCLI the change will be accepted as valid configuration but the automatic parameter will override as this parameter takes precedence over the value in the forwarding core count. (I95-30884)

- Prior to 4.1.5, any peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:

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

- On 128T nodes installed after July 1 2019 on pre 4.2.0 versions, Chrome running on MAC OSX Cataline does not consider the 128T self signed web certificates valid. Apple has put out an advisory: https://support.apple.com/en-us/HT210176 . Once the node is upgraded to 4.2.0, create a new self signed web cert in the PCLI `create certificate self-signed webserver` (I95-31672)


## Issues Fixed

- **I95-32521** Packets continuously dropping on HA failover triggered by power outage

- **I95-32686** BFD packets only sent once a minute on an outbound only link even when the peer is sending once a second

- **I95-32699** Packets dropped on HA failure with adaptive encryption


## Caveats

- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

    _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

    _**Conditions:**_ After the asset has been upgraded

    _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need a restart on the asset node that does not update the version. This is done with the following command on the node as the root Linux user:
    ```
systemctl restart salt-minion
    ```

- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

    _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

    _**Conditions:**_ Unknown

    _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.