<!--- VMware Router - Find WAN and LAN NIC PCI Addresses --->

The SSR router configuration requires the PCI address of each VMXNet3 NIC. Because VMware assigns PCI addresses dynamically based on VM slot assignment, you must discover the actual values from the running VM.

## Log In to the Router

1. From the **Conductor PCLI**, open a shell session on the router:

   ```
   admin@node0.conductor1# enter router branch1
   admin@node0.branch1# shell
   ```

   Alternatively, SSH directly to the router's WAN IP (if known):

   ```bash
   ssh admin@<router-WAN-IP>
   ```

   Then drop to the Linux shell from the PCLI:

   ```
   admin@node0.branch1# shell
   ```

## List Network Interfaces

2. List all network interfaces:

   ```bash
   ip link show
   ```

   The output shows the Linux interface names for each NIC. VMXNet3 NICs on VMware are commonly named `ens192`, `ens224`, `eth0`, `eth1`, or similar.

   :::tip
   If you are unsure which Linux interface corresponds to which VMware portgroup, compare the MAC addresses. In the VMware ESXi UI, select the VM → **Edit Settings** → expand each Network Adapter to see its MAC address. Match these to the MAC addresses shown in `ip link show`.
   :::

## Find the PCI Address for Each Interface

3. Use `ethtool` to retrieve the PCI bus address for the WAN interface (NIC 1). Replace `ens192` with your actual WAN interface name:

   ```bash
   ethtool -i ens192 | grep bus-info
   ```

   Example output:

   ```
   bus-info: 0000:0b:00.0
   ```

4. Repeat for the LAN interface (NIC 2). Replace `ens224` with your actual LAN interface name:

   ```bash
   ethtool -i ens224 | grep bus-info
   ```

   Example output:

   ```
   bus-info: 0000:13:00.0
   ```

5. Record both addresses in your network design reference:

   | Interface | Linux Name | Example PCI Address |
   |-----------|-----------|---------------------|
   | WAN (`wan-dev`) | `ens192` _(example)_ | `0000:0b:00.0` _(example)_ |
   | LAN (`lan-dev`) | `ens224` _(example)_ | `0000:13:00.0` _(example)_ |

   :::important
   These are example values. Your actual PCI addresses will differ. Use the values you discover here in [Step 4 — Configure the Router on the Conductor](deploy_vmware_router_config.mdx).
   :::

:::tip
If `ethtool` is not available, you can find the PCI address using:
```bash
ls -la /sys/class/net/ens192/device
```
The symlink target contains the PCI address in the path, for example `../../../0000:0b:00.0`.
:::
