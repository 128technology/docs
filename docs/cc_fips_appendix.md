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

