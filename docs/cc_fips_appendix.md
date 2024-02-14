---
title: Appendix
sidebar_label: Appendix
---

## Common Criteria Sample Configuration

Shown below is a simple example configuration. Note that this is not a complete configuration, and some values have been removed. 

```
config

    authority
        conductor-address  10.0.0.2



        router             conductor
            name  test-conductor

            node  node1
                name              node1

                device-interface  mgmt
                    name               mgmt
                    pci-address        <pci-address>
                    forwarding         false

                    network-interface  mgmt
                        name       mgmt
                        global-id  1

                        address    10.0.0.2
                            ip-address     10.0.0.2
                            prefix-length  24
                        exit

                        address    2001::2
                            ip-address     2001::2
                            prefix-length  64
                        exit
                    exit
                exit
            exit
        exit

        router             router
            name                 test-router
            inter-node-security  internal

            system
                inactivity-timer  86400

                audit

                    traffic
                        enabled  true
                    exit
                exit
            exit

            node                 node1
                name              node1
                asset-id          <asset-id>
                role              combo

                device-interface  mgmt
                    name               mgmt
                    pci-address        <pci-address>
                    forwarding         false

                    network-interface  mgmt
                        name       mgmt
                        global-id  2

                        address    10.0.0.3
                            ip-address     10.0.0.3
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface  ge-2
                    name               ge-2
                    pci-address        <pci-address>

                    network-interface  ge-2
                        name       ge-2
                        global-id  3
                        tenant     lab

                        address    2.2.2.1
                            ip-address     2.2.2.1
                            prefix-length  24
                        exit

                        address    2001:0:2::1
                            ip-address     2001:0:2::1
                            prefix-length  64
                        exit
                    exit
                exit

                device-interface  ge-3
                    name               ge-3
                    pci-address        <pci-address>

                    network-interface  ge-3
                        name       ge-3
                        global-id  4

                        address    3.3.3.1
                            ip-address     3.3.3.1
                            prefix-length  24
                        exit

                        address    2001:0:3::1
                            ip-address     2001:0:3::1
                            prefix-length  64
                        exit
                    exit
                exit
            exit
        exit

        tenant             lab
            name  lab
        exit



        service            lab_ipv4
            name            lab_ipv4
            address         0.0.0.0/0

            access-policy   lab
                source      lab
                permission  allow
            exit
            service-policy  lab_service_policy
        exit

        service            lab_ipv6
            name            lab_ipv6
            address         ::0/0

            access-policy   lab
                source      lab
                permission  allow
            exit
            service-policy  lab_service_policy
        exit

        service-policy     lab_service_policy
            name  lab_service_policy
        exit
    exit
exit

```

## OTP Bootstrapping 

This information is not necessary as part of a CC compliant install, but may be interesting or of relevance to the admin performing the installation process. 

After the initial installation and poweroff, the system is generic - it has no specific configuration. Once the platform is started again, an automated script performs bootstrapping of the platform. This script is a single run service unit that executes **once** during the first bootup, and automatically performs the following steps:

### 1. Configure Hostname and Salt Minion Identifier

The hostname and salt minion identifier are set to the same value during the bootstrapping process.

If the system serial number is provisioned (seen by `dmidecode --string system-serial-number`) this value will be used. Otherwise use the first MAC address found in the format of: `mac-<address>`

### 2. Configure the SSR and Network Interfaces

The Bootstrapper sets the SSR configuration via the QuickStart file found in one of the following locations:

- The root of an attached USB drive. i.e. `/bootstrap.quickstart`. The USB drive MUST be named "BOOTSTRAP" in all caps.

- In `/etc/128technology/bootstrap.quickstart`.

If no file source is present in either location, the Bootstrapper executes HTTP GET requests to the following endpoints to download the QuickStart File from a server. The REST response is explained in [REST details](#quickstart-file-via-rest).
    1. `http://quickstart.128t-bootstrap.local/quickstart/<identifier>`
    2. `http://192.168.128.128/quickstart/<identifier>`

The `<identifier>` is the minion-id as determined by the algorithm discussed in [Configure Hostname and Salt Minion Identifier](#configure-hostname-and-salt-minion-identifier). Typically, it is the system serial number.

If none of the above are successful, the OTP defaults are used. This configures the DHCP client on the first ethernet port and a DHCP server listening on all other ports.

### 3. Enable the SSR and Salt-Minion Service

The quickstart file configures and enables the SSR and the associated salt-minion service.

### 4. Write a Result Report

Once the platform is rebooted after bootstrapping, the bootstrap validation report can be found at the root filesystem (`/root/128T-bootstrap.txt`) containing details about the steps taken. The `/root/128T-bootstrap.json` file contains the same information in JSON format. The report contains a message that includes additional details for each step.

Shown below is the location of the bootstrap report as well as an example of the contents.
```
[root@sn123456789 ~]# cat /root/128T-bootstrap.txt
+--------------------+--------+---------------------------------+
| Label              | Result | Message                         |
+--------------------+--------+---------------------------------+
| Minion ID          | True   | mac-000000                      |
| Hostname           | True   | mac-000000                      |
| Clock Sync         | True   |                                 |
| Initialize 128T    | True   | node.Router                     |
| Enable 128T        | True   |                                 |
| Enable salt-minion | True   |                                 |
| Factory Defaults   | True   | http://192.168.0.100/quickstart |
| Ifgcfg files       | True   |                                 |
+--------------------+--------+---------------------------------+
```

### 5. Reboot

After reboot, the SSR service will be configured and running.

:::info
It is important to note that after the OS installation the dhclient is configured across all network interfaces until the platform has completed Bootstrapping.
:::

