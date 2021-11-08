---
title: Upgrade Considerations
sidebar_label: Upgrade Considerations
---
Before upgrading to **version 5.3 and higher**, please review the following information.

### Config Validation Changes
Several modifications have been made to the verification process for configurations. As a result, configurations that were valid in earlier versions of the SSR/128T software may now present configuration errors. The information below provides an awareness of what to look for and address.

The following configuration validation checks may present errors in previously valid configurations:

#### The Candidate configuration is not synchronized between nodes and is not stored on disk.

Configuration changes are always made to a candidate configuration. In releases prior to 5.3 the candidate configuration was stored on disk and would persist through product reboots. Beginning with 5.3, the candidate configuration is not saved to disk and will not persistent through reboot.

Additionally, the candidate configuration is no longer synchronized between HA nodes. Beginning with release 5.3, only the running configuration is synchronized between nodes.

It is strongly recommended to frequently save the candidate configuration using the [`export config`](cli_reference.md/#export-config) command while working, especially if you are performing multiple changes. Doing so will provide a checkpoint for changes to be committed. Changes to the running configuration are only made when the configuration is committed.

#### A Profile is required when `performance-monitoring` is enabled on a neighborhood.

Stricter validations have been added to enforce the requirement that a profile must be configured when `performance-monitoring` is enabled on a neighborhood. This requirement was loosely enforced prior to version 5.3 through configuration checks. With the stricter checks beginning with version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.

#### A service with a peer-service route that does not have security configured generates an "Error: Candidate configuration is invalid: Security not configured" message.

Services with a peer-service route must have security configured. If there is no security configuration, the message "Error: Candidate configuration is invalid: Security not configured" is displayed when performing a commit on new configuration changes. Stricter validations have been added to version 5.3. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated by configuring a security policy on each service with a `peer` and `next-peer` service route.

#### Stricter validations have been added to InterfaceRedundancyCheck:

When configuring redundant interfaces, **all** configured fields must be identical. This requirement was loosely enforced prior to version 5.3 through configuration checks, and allowed invalid configurations to be accepted. Stricter checks have been added beginning with version 5.3, causing errors to appear in previously valid configurations. To avoid any configuration issues, it is highly recommended to correct the errors **as well as perform a manual comparison of the redundant interfaces** immediately after upgrade to ensure correct operation during failover.

#### Committing changes to a configuration during an upgrade is not permitted:

Committing configuration changes is not allowed when the system is in a "mixed version" state that may occur during an upgrade. For example, if one node of an HA pair is at 4.5.3 and an upgrade to 5.3 (or higher) has been performed on the other node, do not attempt to commit a configuration change until both nodes are updated to the new release.


### Plugin Config Generation changes
The config generation for plugins have been adapted to work with the improved config handling available in 5.3 and higher. When upgrading from 4.x version of conductor, no action is required to take advantage of this new functionality. However, when upgrading from 5.1 or 5.2 to the latest 5.3 or higher, the following plugins must be updated prior to upgrading the 128T conductor. Instructions on upgrading the plugins can be found [here](plugin_intro.md#upgrading-an-existing-plugin)

| Plugin | Version |
| ------ | ------- |
| dns-cache | [>=3.2.1](plugin_dns_cache.md#release-notes) |
| dns-app-id | [>=3.1.3](plugin_dns_app_id.md#release-notes) |
| ha-sync-redundancy | [>=1.1.0](plugin_ha_sync_redundancy.md#release-notes) |
| icmp-reachability-detection | [>=3.0.3](plugin_icmp_reachability_detection.md#release-notes) |
| wireguard | [>-2.0.3](plugin_wireguard.md#release-notes) |
