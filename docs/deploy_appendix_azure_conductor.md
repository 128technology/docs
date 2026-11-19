---
title: Appendix - Azure Conductor Configuration
sidebar_label: Appendix - Azure Conductor Configuration
---

This appendix contains the SSR PCLI configuration for the `Conductor` deployment described in this guide. This configuration exists after completing [Step 3 — Configure the Conductor](deploy_azure_conductor_config.mdx).

## Complete Configuration

Replace any placeholder values (shown in angle brackets) with values from your environment before applying.

```
config

    authority       Authority128
        conductor-address  <conductor-public-ip>

        router      conductor
            name    conductor

            node    node0
                name           node0
                asset-id       conductor
                platform-type  "Virtual Machine"
            exit
        exit

        tenant      corp
            name        corp
        exit

        service     Internet-Traffic
            name        Internet-Traffic
            address     0.0.0.0/0

            access-policy   corp
                source          corp
            exit
        exit
    exit
exit
```

