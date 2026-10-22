---
title: Virtual SSR Incompatible With Azure MANA Hardware
date: 2026-10-19
tags: ['azure', 'vssr', 'mana', 'field-alert', '7.3.3-r2']
hide_table_of_contents: false
---

Microsoft is rolling out Azure host hardware based on the Microsoft Azure Network Adapter (MANA), and virtual Session Smart Router (vSSR) instances placed on MANA-enabled hardware will not function until you upgrade to SSR version 7.3.3-r2 or above, which is targeted to add MANA support.

<!-- truncate -->

**Advisory Type:** Field Alert

**Date:** 2026-10-19

**Impacted Deployments:** Virtual Session Smart Router (vSSR) instances deployed in Microsoft Azure

**Last Updated:** 2026-10-19

:::important

Customer action is required. Review your Azure vSSR deployments and evaluate application of the Microsoft LegacyVMNVA opt-out tag before May 31, 2027.

:::

## Problem Description

Microsoft is actively rolling out Azure host hardware based on the Microsoft Azure Network Adapter (MANA) across Azure infrastructure. HPE Networking is targeting support for MANA-enabled hardware in SSR version 7.3.3-r2 (and higher), **which is expected to release in Q1 of 2027**. Once SSR version 7.3.3-r2 is released, it is recommended to upgrade your vSSR instances to obtain MANA support.

As Azure expands the deployment of MANA-enabled hosts, both new and existing vSSR instances may be placed on MANA-enabled hardware. This placement can occur during any of the following events:

1. New VM deployments.
2. VM stop, deallocate, and restart operations.
3. VM redeployments.
4. Azure infrastructure maintenance and host relocation events.

## Affected Deployments

| Deployment Attribute | Detail |
| :-- | :-- |
| Product | HPE Networking virtual Session Smart Router (vSSR) instances. |
| Cloud Platform | Microsoft Azure. |
| Deployment Types | vSSR deployments acting as a Network Virtual Appliance (NVA). |
| Trigger Events | Creation of a new vSSR instance, VM stop/deallocation and restart, VM redeployment, Azure host maintenance, and placement on MANA-enabled hardware. |

If you run vSSRs within an Azure VNet, upgrade to SSR version 7.3.3-r2 or above when it is available, before the May 31, 2027 deadline to ensure that your NVA continues to operate. Once the opt-out mechanism expires, placement on MANA-enabled hardware causes the vSSR instance to fail completely and not function in any capacity.

## Symptom And Cause

A vSSR instance placed on MANA-enabled hardware will not function in any capacity because the current vSSR software does not contain native MANA support.

Existing vSSR instances currently running on non-MANA Azure infrastructure continue to operate normally unless Azure relocates the VM to MANA-enabled hardware. **Azure may perform such relocation during stop, deallocate, and restart operations**.

## Required Customer Action

Customers who are concerned about MANA compatibility should apply the Microsoft `LegacyVMNVA` opt-out tag. Refer to the Microsoft instructions on how to [apply the LegacyVMNVA tag](https://learn.microsoft.com/en-us/azure/virtual-network/accelerated-networking-mana-network-virtual-appliance-opt-out#temporary-mana-exception-with-legacyvmnva).

According to information provided by Microsoft and communicated through HPE internal guidance:

1. You can apply the `LegacyVMNVA` tag to existing vSSR deployments.
2. You can specify the `LegacyVMNVA` tag during new vSSR deployments.
3. Microsoft has indicated that the opt-out mechanism remains available through May 31, 2027.
4. vSSR instances using the `LegacyVMNVA` tag are expected to remain on the current hardware platform during the opt-out period.

:::note

Consult Microsoft Azure documentation for updates or changes to the opt-out policy.

:::

### Important Considerations

1. Your existing vSSR deployments can continue operating today on the current Azure infrastructure.
2. If you are concerned about MANA placement, avoid unnecessary stop/deallocate operations until you have applied the `LegacyVMNVA` tag.
3. Monitor Azure Service Health notifications and Microsoft Azure communications regarding MANA rollout activities.

## Recommended Workaround

Apply the `LegacyVMNVA` opt-out tag to keep your vSSR instance on its current hardware platform until you complete your upgrade to SSR version 7.3.3-r2 or above.

## Future Upgrade Planning

Support for MANA is planned for the upcoming SSR version 7.3.3-r2 release or above. Plan your upgrade to SSR version 7.3.3-r2 or above well before the May 31, 2027 opt-out expiration:

1. Review the release notes for SSR version 7.3.3-r2 for MANA support details.
2. Develop and schedule an upgrade plan targeting SSR version 7.3.3-r2 or above.
3. Validate your Azure deployment and operational procedures before the Microsoft opt-out period expires on May 31, 2027.

:::caution

After May 31, 2027, the Microsoft opt-out mechanism may no longer be available. Upgrade to SSR version 7.3.3-r2 or above when it becomes available (expected to release in Q1 of 2027) before May 31, 2027 to avoid complete loss of service and function.

:::

## Frequently Asked Questions

**Does SSR software currently support MANA?**

No currently released SSR version supports MANA-enabled hardware. Once SSR version 7.3.3-r2 or above is released, upgrade to that version to obtain MANA support.

**What is the recommended workaround?**

Microsoft provides the `LegacyVMNVA` opt-out tag, which you can use to keep vSSR instances on the current hardware platform during the opt-out period.

**Can I apply the LegacyVMNVA tag to an existing VM?**

Yes. Microsoft has indicated that you can apply the `LegacyVMNVA` tag to already deployed VMs, and it remains effective through May 31, 2027.

**Are existing vSSR deployments already affected?**

Existing vSSR deployments running on current hardware can continue operating normally. However, Azure may place a VM on MANA-capable hardware following stop, deallocate, and restart operations. You should be aware of this scenario and implement proactive planning and operational measures to prevent it.

## Advisory Status

Customer action is required.

If you operate a virtual Session Smart Router (vSSR) within Microsoft Azure, review your deployments, evaluate application of the `LegacyVMNVA` opt-out tag, and plan your upgrade to SSR version 7.3.3-r2 or above well before the May 31, 2027 opt-out expiration to avoid complete loss of service if Azure places your instance on MANA-enabled hardware.
