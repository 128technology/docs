---
title: "Step 3: Configure the Conductor"
sidebar_label: "Configure the Conductor"
---

This step accesses the conductor web GUI and configures the authority name, conductor address, and asset ID. All steps are performed from a browser.

## 1. Set the Authority Name

The authority name identifies your organization within the SSR configuration model. It applies globally to all routers managed by this conductor and cannot be changed after routers have been provisioned without re-onboarding them.

1. In the left menu, click **Authority** under **Configuration**.

2. Click **Authority**.

   ![Authority Name](/img/deploy-gcp-conductor-config3.png)

3. In the **Basic Information** section, update the **Name** field to your organization's name. This guide uses the default value `Authority128`.

   ![Authority128](/img/deploy-gcp-conductor-config4.png)

## 2. Add the Conductor Address

The conductor address is the IP address that managed routers use to reach this conductor. Use the conductor VM's external IP address.

1. Scroll down to the **Conductor Addresses** section, click **Add**.

   ![Add conductor address](/img/deploy-gcp-conductor-config5.png)

2. In the **New Conductor Address** window, enter the conductor VM's external IP address and click **Save**.

   ![External IP Address](/img/deploy-gcp-conductor-config6.png)

3. In the top-right corner, click **Validate** and then **Commit**. In the confirmation window, click **Proceed Commit**.

   ![Commit the Config](/img/deploy-gcp-conductor-config7.png)

## 3. Assign the Asset ID and Confirm the Role

1. In the left menu, click **Authority** under **Configuration**, then click **conductor** under **Routers**.

   ![Authority view](/img/deploy-gcp-conductor-config8.png)

2. In the **Nodes** section, click **node0**.

   ![node0](/img/deploy-gcp-conductor-config9.png)

3. In the **Basic Information** section:
   - In the **Associated Asset ID** field, select the conductor VM name.
   - Verify that the **Role** field shows `conductor`.

   ![Node Basic Info](/img/deploy-gcp-conductor-config10.png)

4. In the top-right corner, click **Validate** and then **Commit**. In the confirmation window, click **Proceed Commit**.

## What Was Configured

At the end of this step your authority contains:

| Object | Name | Value |
|--------|------|-------|
| Authority | `Authority128` | |
| Conductor Address | | `35.X.X.X` (external IP) |
| Node Asset ID | `node0` | Linked to conductor VM |
| Node Role | `node0` | `conductor` |

The conductor is now fully deployed and ready to onboard SSR routers.

## Related Topics

- [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md)
- [Conductor Deployment Best Practices](bcp_conductor_deployment.md)
- [Appendix — Deployment Parameters](deploy_appendix_gcp_conductor.mdx)
