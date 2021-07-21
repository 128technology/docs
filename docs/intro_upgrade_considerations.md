---
title: 5.3.0 Upgrade Considerations
sidebar_label: Upgrade Considerations
---
Before upgrading to version 5.3.0, please review the following information regarding upgrades to 5.3.0. Several modifications have been made to the verification process for configurations. As a result, configurations that were valid in earlier versions of the SSR/128T software may now present configuration errors. The information below provides an awareness of what to look for and address. 

The following configuration validation checks may present errors in previously valid configurations:

#### A Profile is required when `performance-monitoring` is enabled on a neighborhood. 

Stricter validations have been added to enforce the requirement that a profile must be configured when `performance-monitoring` is enabled on a neighborhood. This requirement was loosely enforced prior to version 5.3.0 through configuration checks. With the stricter checks in Version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.

#### A mismatched global_id on redundant interfaces generates an "Error: Candidate configuration is invalid" message. 

When configuring redundant interfaces, **all** configured fields must be identical. Stricter validations have been added to version 5.3.0. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation.

#### A service with a peer-service route that does not have security configured generates an "Error: Candidate configuration is invalid: Security not configured" message.

Services with a peer-service route must have security configured. If there is no security configuration, the message "Error: Candidate configuration is invalid: Security not configured" is displayed when performing a commit on new configuration changes. Stricter validations have been added to version 5.3.0. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated by configuring a security policy on each service with a `peer` and `next-peer` service route.

#### Stricter validations have been added to InterfaceRedundancyCheck: 

These validations have been added to enforce the requirement that redundant network interface configurations must be identical. This requirement was loosely enforced prior to version 5.3.0 through configuration checks, and allowed invalid configurations to be accepted. With the stricter checks in Version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.

#### Committing changes to a configuration during an upgrade is not permitted: 

Committing configuration changes is not allowed when the system is in a "mixed version" state, ie: during upgrade. For example, if one node of an HA pair is at 4.5.3 and an upgrade to 5.3.0 has been performed on the other node, do not attempt to commit a configuration change until both nodes are updated to the new release.

#### The Candidate configuration is not synced between nodes and is not stored on disk:

Configuration changes are always made to a candidate configuration. In releases prior to 5.3.0 the candidate configuration was stored on disk and would persist through product reboots. Beginning with 5.3.0, the candidate configuration is not saved to disk and will not persistent through reboot. 

Additionally, the candidate configuration is no longer synchronized between HA nodes. In release 5.3.0, only the running configuration is synchronized between nodes.
