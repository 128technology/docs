---
title: Deploying SSR in Amazon Web Services
sidebar_label: AWS Deployment Overview
---

This section provides end-to-end deployment guides for running the Juniper Session Smart Router (SSR) in Amazon Web Services (AWS). The guides cover the full journey: from creating an AWS account and setting up the required cloud infrastructure through to a running, configured SSR deployment.

## Deployment Models

SSR supports two management models and two licensing models in AWS. Review the options below to choose the right guide for your deployment.

### Management Model

| Management Model | Description | Best For |
| ---------------- | ----------- | -------- |
| **Conductor-managed** | A Session Smart Conductor (also deployed in AWS or on-premises) centrally manages one or more SSR routers. Supports full SSR feature set including advanced routing policies, HA, and CLI/GUI administration. | Enterprise deployments requiring full control over routing policy and configuration |
| **Mist-managed** | SSR routers are managed through the Juniper Mist cloud portal using Zero Touch Provisioning (ZTP). Requires an active Mist organization and registration code. | WAN Assurance deployments integrated with the Mist AI platform |

:::important
SSR Version 6.x installed from an AWS Marketplace image supports **Mist-managed** routers only. For a conductor-managed deployment running SSR 6.x, install SSR 5.x first and upgrade through the Conductor, or use the BYOL image with explicit version selection.
:::

### Licensing Model

| License Model | Description |
| ------------- | ----------- |
| **PAYG (Pay As You Go)** | Hourly billing through the AWS Marketplace. Includes a 30-day free trial. Best for proof-of-concept and evaluation. Software upgrades and on-premises deployments require a separate token. |
| **BYOL (Bring Your Own License)** | Install your own licensed copy of SSR software. Requires Artifactory credentials or a Mist registration code. Supports image-based installations. Requires Conductor version 6.3.0-R1 or newer for BYOL router management. |

## Available Guides

| Guide | Management | Licensing | Notes |
| ----- | ---------- | --------- | ----- |
| [AWS: Conductor-Managed Deployment](deploy_aws_conductor.mdx) | Conductor | BYOL | **Recommended starting point.** Complete end-to-end guide from AWS account to running router |
| [AWS: PAYG Conductor-Managed Router](intro_installation_quickstart_aws.md) | Conductor | PAYG | Evaluation / PoC deployments using marketplace hourly billing |
| [AWS: PAYG Mist-Managed Router](intro_installation_quickstart_mist_aws.md) | Mist | PAYG | Mist WAN Assurance with marketplace hourly billing |
| [AWS: BYOL Mist-Managed Router](intro_installation_quickstart_byol_mist_aws.md) | Mist | BYOL | Mist WAN Assurance with your own license |

## Supported AWS Instance Types

The following EC2 instance sizes are supported for SSR deployments. Choose the size that best meets your throughput and interface requirements.

| AWS Instance Size | Max vNICs | vCPU | Memory |
| ----------------- | --------- | ---- | ------ |
| c5.xlarge | 4 | 4 | 8 GB |
| c5.2xlarge | 4 | 8 | 16 GB |
| c5.4xlarge | 8 | 16 | 32 GB |
| c5.9xlarge | 8 | 36 | 72 GB |
| c5n.xlarge | 4 | 4 | 10.5 GB |
| c5n.2xlarge | 4 | 8 | 21 GB |
| c5n.4xlarge | 8 | 16 | 42 GB |
| c5n.9xlarge | 8 | 36 | 96 GB |

For Conductor sizing guidance when managing multiple routers, see [System Requirements](intro_system_reqs.md#conductor-scaling-recommendations).

## Additional Resources

- [Cloud Platform Support](supported_cloud_platforms.md)
- [System Requirements](intro_system_reqs.md)
- [Firewall Port Reference](config_firewall_ports.md)
- [BYOL Cloud Images Release Notes](release_notes_byol.md)
