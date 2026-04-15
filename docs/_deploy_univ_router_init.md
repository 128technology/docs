<!---Initialize SSR130 as a Conductor-Managed Router - Universal ISO Web Workflow--->

After the SSR 7.1.4 software has installed and the SSR130 has rebooted from the USB drive, connect a laptop to **Port 3** (`ge-0-3`, LAN 1) on the SSR130.

Assign the laptop a static IP address in the range `192.168.128.2`–`192.168.128.254` with a subnet mask of `255.255.255.0` (`/24`).

1. Open a browser and navigate to `https://192.168.128.1`. Accept the self-signed certificate warning if prompted.

2. On the Device Selection screen, under **SSR Managed**, select **SSR Router Managed via Conductor**.

   ![SSR Conductor-managed router](/img/u-iso10_cond-mngd_router.png)

3. Enter the following information:

   | Field | Value |
   |-------|-------|
   | **Router Name** | The router name **must exactly match** the router name configured on the conductor (for example, `branch-site-01`). |
   | **Conductor Address** | The management IP address of the SSR1200 conductor (for example, `10.0.0.10`). |
   | **Admin Password** | A strong password for the `admin` account on this router. |

   ![Conductor Managed Association](/img/u-iso11_cond-mngd-assoc-new.png)

4. Click **ASSOCIATE**. The router contacts the conductor, downloads its pre-provisioned configuration, and completes onboarding automatically.

:::tip
Monitor onboarding progress from the Conductor GUI: navigate to **Routers** and check the status of the router. The router transitions from **Initializing** to **Running** once onboarding is complete.
:::

:::note
If the **Router Name** does not match a configured router on the conductor, or if the **Asset ID** on the device does not match the value in the conductor configuration, onboarding will fail. Verify both values and retry.
:::
