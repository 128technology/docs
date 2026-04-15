<!---Configure SSR130 Router on the Conductor--->

Before an SSR130 can onboard, its configuration must be pre-provisioned on the conductor. The conductor uses the **Asset ID** (the device serial number, typically printed on the label on the underside of the unit) to recognize and associate the device when it first connects.

:::important
Record the **Asset ID** (serial number) for each SSR130 before powering it on. The Asset ID entered on the conductor must exactly match the asset ID on the physical device. A mismatch prevents onboarding.
:::

### SSR130 Default Interface Assignments

The following interfaces are used in a basic single-WAN, single-LAN configuration. See the [SSR130 Port Mapping Reference](#ssr130-port-connections) for a full list.

| Interface | Port | PCI Address | Default Role |
|-----------|------|-------------|--------------|
| `ge-0-0`  | Port 0 | `0000:04:00.3` | WAN 1 (DHCP) |
| `ge-0-3`  | Port 3 | `0000:04:00.0` | LAN 1        |

### Create the Router

1. Log in to the Conductor GUI at `https://<conductor-management-IP>`.
2. Select **Configuration** from the left-side navigation menu.
3. In the **Routers** list, select **ADD**.
4. Enter a unique name for the router (for example, `branch-site-01`) and select **SAVE**.
5. Configure the following fields:
   - **Location / Coordinates**: Enter GPS coordinates or a descriptive location if desired.
   - **Inter-node Security Policy**: Select `internal`.

### Create the Node

1. Scroll down to **Nodes** and select **ADD**.
2. Enter the node name (for example, `node1`) and select **SAVE**.
3. Set the node **Role** to `Combo`.
4. Scroll down to **Associated Asset ID** and enter the serial number of the SSR130 device.

### Create the WAN Interface

1. Scroll down to **Device Interfaces** and select **ADD**.
2. Name the device interface `wan1` and select **SAVE**.
3. Set **Device Interface Type** to `Ethernet`.
4. Enter the PCI Address `0000:04:00.3`.
5. Scroll down to **Network Interfaces** and select **ADD**.
6. Name the network interface `wan1` and select **SAVE**.
7. Set **Type** to `external`.
8. Scroll down to **Interface Addresses** and select **ADD**.

   :::tip DHCP WAN
   If the WAN connection uses DHCP, scroll to the **DHCP** field and set it to `v4` instead of entering a static address.
   For a static WAN IP, enter the IP address, prefix length, and default gateway.
   :::

9. Return to the **Network Interface** level (`wan1`).
10. Scroll down to **Neighborhoods**, select **ADD**, select **internet**, and select **SAVE**.
11. Under **Basic Information**, confirm the **Topology** is set to **Spoke**.

### Create the LAN Interface

1. Return to the **Node** level and scroll to **Device Interfaces**. Select **ADD**.
2. Name the device interface `lan1` and select **SAVE**.
3. Set **Device Interface Type** to `Ethernet`.
4. Enter the PCI Address `0000:04:00.0`.
5. Scroll to **Network Interfaces** and select **ADD**.
6. Name the network interface `lan1` and select **SAVE**.
7. Set **Type** to `external`.
8. Assign a **Tenant** (for example, `corp`) to associate LAN traffic with a tenant policy.
9. Scroll to **Interface Addresses** and select **ADD**.
10. Enter the LAN gateway IP address (for example, `192.168.1.1`) with prefix length `24`, then select **SAVE**.

### Create a Service Route

1. Return to the **Router** level.
2. Scroll to **Service Routes** and select **ADD**.
3. Name the service route `internet-route` and select **SAVE**.
4. Set **Service Name** to `internet` and **Service Route Type** to `Service Agent`.
5. Scroll to **Next Hop** and select **ADD**.
6. Select `node1` for the Node and `wan1` for the Network Interface, then select **SAVE**.

### Validate and Commit the Configuration

1. Return to the **Authority** level.
2. Select **VALIDATE** and resolve any reported errors before proceeding.
3. Select **COMMIT** to activate the configuration on the conductor.

:::note
Repeat these steps for each SSR130 in your deployment, using a **unique router name** and **Asset ID** for each device.
:::
