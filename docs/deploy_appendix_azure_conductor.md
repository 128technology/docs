---
title: Appendix - Azure Conductor Configuration
sidebar_label: Appendix - Azure Conductor Configuration
---

This appendix contains the SSR PCLI configuration for the `Conductor` deployment described in this guide. This configuration exists after completing [Step 3 — Configure the Conductor](deploy_azure_conductor_config.mdx).

## Complete Configuration

Replace any placeholder values (shown in angle brackets) with values from your environment before applying.

```text
config
    authority
        name              Authority128

        conductor-address  <conductor-public-ip>

        tenant  corp
            name  corp
        exit

        service  Internet-Traffic
            name             Internet-Traffic
            scope            public
            security         internal

            access-policy
                source  corp
            exit

            address  0.0.0.0/0
        exit

        router  Conductor
            name                 Conductor
            inter-node-security  internal

            node  node0
                name  node0
                role  conductor

                device-interface  mgmt-dev
                    name         mgmt-dev
                    type         ethernet
                    forwarding   false
                    vmbus-uuid   <conductor-vmbus-uuid>

                    network-interface  mgmt-intf
                        name  mgmt-intf
                        type  management

                        address  10.0.0.10
                            ip-address     10.0.0.10
                            prefix-length  24
                            gateway        10.0.0.1
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```
