---
title: Upgrade Considerations
sidebar_label: Upgrade Considerations
---
Before upgrading to **version 5.3 or 5.4 and higher**, please review the following information.

### Upgrade Installer 
Before **upgrading to, or installing** version 5.4, update the Installer to version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.

### Rollback Considerations
Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is highly recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.

## Configuration Validation Changes
Several modifications have been made to the verification process for configurations. As a result, configurations that were valid in earlier versions of the SSR software may now present configuration errors. The information below provides an awareness of what to look for and address.

The following configuration validation checks may present errors in previously valid configurations:

#### The Candidate configuration is not synchronized between nodes and is not stored on disk.

Configuration changes are always made to a candidate configuration. In releases prior to 5.3 the candidate configuration was stored on disk and would persist through product reboots. The candidate configuration is no longer saved to disk and will not persistent through reboot.

Additionally, the candidate configuration is no longer synchronized between HA nodes. Only the running configuration is synchronized between nodes.

It is strongly recommended to frequently save the candidate configuration using the [`export config`](cli_reference.md#export-config) command while working, especially if you are performing multiple changes. Doing so will provide a checkpoint for changes to be committed. Changes to the running configuration are only made when the configuration is committed.

#### A Profile is required when `performance-monitoring` is enabled on a neighborhood.

Stricter validations have been added to enforce the requirement that a profile must be configured when `performance-monitoring` is enabled on a neighborhood. This requirement was loosely enforced prior to version 5.3 through configuration checks. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.

#### A service with a peer-service route that does not have security configured generates an "Error: Candidate configuration is invalid: Security not configured" message.

Services with a peer-service route must have security configured. If there is no security configuration, the message "Error: Candidate configuration is invalid: Security not configured" is displayed when performing a commit on new configuration changes. Stricter validations have been added. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated by configuring a security policy on each service with a `peer` and `next-peer` service route.

#### Stricter validations have been added to InterfaceRedundancyCheck:

When configuring redundant interfaces, **all** configured fields must be identical. This requirement was loosely enforced prior to version 5.3 through configuration checks, and allowed invalid configurations to be accepted. Stricter checks have been added, causing errors to appear in previously valid configurations. To avoid any configuration issues, it is highly recommended to correct the errors **as well as perform a manual comparison of the redundant interfaces** immediately after upgrade to ensure correct operation during failover.

#### Committing changes to a configuration during an upgrade is not permitted:

Committing configuration changes is not allowed when the system is in a "mixed version" state that may occur during an upgrade. For example, if one node of an HA pair is at 4.5.3 and an upgrade to 5.3 or higher has been performed on the other node, do not attempt to commit a configuration change until both nodes are updated to the new release.


## Plugin Configuration Generation Changes

The configuration generation for plugins have been adapted to work with the improved configuration handling available in 5.3 and higher. When upgrading from a 4.x version of conductor, no action is required to take advantage of this new functionality. 

However, when upgrading from 5.1 or 5.2 to version 5.3 or higher, the following plugins must be updated **prior to upgrading** the SSR conductor. Please see [Upgrading an Existing Plugin](plugin_intro.md#upgrading-an-existing-plugin) for instructions.

| Plugin | Version |
| ------ | ------- |
| dns-cache | [>=3.2.1](plugin_dns_cache.md#release-notes) |
| dns-app-id | [>=3.1.3](plugin_dns_app_id.md#release-notes) |
| ha-sync-redundancy | [>=1.1.0](plugin_ha_sync_redundancy.md#release-notes) |
| icmp-reachability-detection | [>=3.0.3](plugin_icmp_reachability_detection.md#release-notes) |
| wireguard | [>=2.0.3](plugin_wireguard.md#release-notes) |
