<!---Initialize SSR as Standalone Conductor - Universal ISO Web Workflow--->

After the SSR software has installed and the device has rebooted from the USB drive, connect a laptop or workstation to one of the SSR1200's LAN ports—**Port 0/3** (`ge-0-3`) is recommended.

Assign the laptop a static IP address in the range `192.168.128.2`–`192.168.128.254` with a subnet mask of `255.255.255.0` (`/24`).

Open a browser and navigate to `https://192.168.128.1`. Accept the self-signed certificate warning if prompted.

1. On the Device Selection screen, under **SSR Managed**, select **SSR Conductor**.

   ![SSR Conductor](/img/u-iso8a_initialize_conductor.png)

2. Select **STANDALONE** for a single-node conductor. Select **STATIC** for the address type.

   :::note
   For a High Availability conductor pair, see [Conductor High Availability](ha_conductor_install.mdx) before proceeding. **HA NODE 0** must be configured before HA NODE 1.
   :::

3. Enter the following information:

   | Field | Value |
   |-------|-------|
   | **Conductor Name** | A name for this conductor system, for example `corp-conductor`. |
   | **Node Name** | A name for this conductor node, for example `node1`. |
   | **Node IP Address** | The static management IP address for the conductor (for example, `10.0.0.10`). |
   | **Node Gateway** | The default gateway for the management network. |
   | **Interface Name** | The Linux network interface name for the management-side port (for example, `eth0`). |
   | **DNS Server** | (Optional) IP address of a DNS resolver accessible from the management network. |
   | **Admin Password** | A strong password for the `admin` account. Minimum 8 characters; must include uppercase, lowercase, and a number. |
   | **Artifactory Username / Password** | Your Juniper software portal username and access token. These are used to download software packages. If not available now, you can configure them from the PCLI after initialization—see [Configure the Software Access Token](#configure-the-software-access-token). |

   ![Conductor Association](/img/u-iso9_define_conductor.png)

4. Click **ASSOCIATE**. The device reboots and comes online as a Conductor.

5. Once the conductor has restarted, access the Conductor GUI at `https://<conductor-management-IP>` using the `admin` account and the password you configured above.

:::note
All system account passwords (`admin`, `root`, and `t128`) are set to the value entered during initialization.
:::
