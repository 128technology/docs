---
title: Appendix - Common Criteria Sample Configuration
sidebar_label: Appendix - Common Criteria Sample Configuration
---

Shown below is a simple example configuration. Note that this is not a complete configuration, and some values have been removed. 

```
config

    authority
        conductor-address   10.0.0.2



        router              conductor
            name    conductor

            system
                inactivity-timer  86400

                audit

                    traffic
                        enabled  true
                    exit
                exit
            exit

            node    node
                name              node

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
                    exit
                exit
            exit
        exit

        router              router
            name                        router
            inter-node-security         internal
            half-open-connection-limit  100

            system
                inactivity-timer  86400

                audit

                    traffic
                        enabled  true
                    exit
                exit
            exit

            node                        node
                name              node
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

                device-interface  ge-0-2
                    name               ge-2
                    pci-address        <pci-address>

                    network-interface  ge-0-2
                        name         ge-0-2
                        global-id    3
                        tenant       lab

                        address      2.2.2.1
                            ip-address     2.2.2.1
                            prefix-length  24
                            gateway        2.2.2.2
                        exit

                        address      	   <address>
                            ip-address     <ip-address>
                            prefix-length  64
                            gateway        <ip-address>
                        exit
                    exit
                exit

                device-interface  ge-0-3
                    name               ge-0-3
                    pci-address        <pci-address>

                    network-interface  ge-0-3
                        name       ge-0-3
                        global-id  4

                        address    3.3.3.1
                            ip-address     3.3.3.1
                            prefix-length  24
                            gateway        3.3.3.2
                        exit

                        address      	   <address>
                            ip-address     <ip-address>
                            prefix-length  64
                            gateway        <ip-address>
                        exit
                    exit
                exit
            exit

            routing                     default-instance
                type          default-instance

                static-route  0.0.0.0/0 10
                    destination-prefix  0.0.0.0/0
                    distance            10

                    next-hop-interface  node ge-0-3
                        node       node
                        interface  ge-0-3
                    exit
                exit

                static-route  ::/0 10
                    destination-prefix  ::/0
                    distance            10

                    next-hop-interface  node ge-0-3
                        node       node
                        interface  ge-0-3
                    exit
                exit
            exit
        exit

        tenant              lab
            name  lab
        exit



        icmp-control
            icmp-session-match  identifier-and-type
        exit

        ipv4-option-filter
            action  drop-all
        exit

        service             lab_ipv4
            name            lab_ipv4
            enabled         true
            address         0.0.0.0/0

            access-policy   lab
                source      lab
                permission  allow
            exit
            service-policy  lab_service_policy
        exit

        service             lab_ipv6
            name            lab_ipv6
            enabled         true
            address         ::0/0

            access-policy   lab
                source      lab
                permission  allow
            exit
            service-policy  lab_service_policy
        exit

        service-policy      lab_service_policy
            name                         lab_service_policy
            transport-state-enforcement  strict
        exit

        session-type        HTTP
            name     HTTP
            timeout  120000
        exit

        session-type        ICMP
            name           ICMP
            service-class  Standard

            transport      icmp
                protocol  icmp
            exit
        exit
    exit
exit

```