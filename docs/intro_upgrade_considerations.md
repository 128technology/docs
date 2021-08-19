---
title: 5.3 Upgrade Considerations
sidebar_label: Upgrade Considerations
---
Before upgrading to version 5.3, please review the following information regarding upgrades to 5.3. Several modifications have been made to the verification process for configurations. As a result, configurations that were valid in earlier versions of the SSR/128T software may now present configuration errors. The information below provides an awareness of what to look for and address. 

The following configuration validation checks may present errors in previously valid configurations:

#### The Candidate configuration is not synchronized between nodes and is not stored on disk.

Configuration changes are always made to a candidate configuration. In releases prior to 5.3 the candidate configuration was stored on disk and would persist through product reboots. Beginning with 5.3, the candidate configuration is not saved to disk and will not persistent through reboot. 

Additionally, the candidate configuration is no longer synchronized between HA nodes. In release 5.3, only the running configuration is synchronized between nodes. 

It is strongly recommended to frequently save the candidate configuration using the [`export config`](cli_reference.md/#export-config) command while working, especially if you are performing multiple changes. Doing so will provide a checkpoint for changes to be committed. Changes to the running configuration are only made when the configuration is committed.  

#### A Profile is required when `performance-monitoring` is enabled on a neighborhood. 

Stricter validations have been added to enforce the requirement that a profile must be configured when `performance-monitoring` is enabled on a neighborhood. This requirement was loosely enforced prior to version 5.3 through configuration checks. With the stricter checks in version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.

#### A service with a peer-service route that does not have security configured generates an "Error: Candidate configuration is invalid: Security not configured" message.

Services with a peer-service route must have security configured. If there is no security configuration, the message "Error: Candidate configuration is invalid: Security not configured" is displayed when performing a commit on new configuration changes. Stricter validations have been added to version 5.3. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated by configuring a security policy on each service with a `peer` and `next-peer` service route.

#### Stricter validations have been added to InterfaceRedundancyCheck: 

When configuring redundant interfaces, **all** configured fields must be identical. This requirement was loosely enforced prior to version 5.3 through configuration checks, and allowed invalid configurations to be accepted. Stricter checks have been added in version 5.3, causing errors to appear in previously valid configurations. To avoid any configuration issues, it is highly recommended to correct the errors **as well as perform a manual comparison of the redundant interfaces** immediately after upgrade to ensure correct operation during failover.

#### Committing changes to a configuration during an upgrade is not permitted: 

Committing configuration changes is not allowed when the system is in a "mixed version" state that may occur during an upgrade. For example, if one node of an HA pair is at 4.5.3 and an upgrade to 5.3 has been performed on the other node, do not attempt to commit a configuration change until both nodes are updated to the new release.

