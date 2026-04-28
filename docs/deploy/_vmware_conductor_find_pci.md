<!--- VMware Conductor - Find NIC PCI Address --->

The SSR conductor configuration requires the PCI address of the VMXNet3 management NIC. Because VMware assigns PCI addresses dynamically based on VM slot assignment, you must discover the address from the running VM rather than assuming a fixed value.

### Identify the Interface Name

1. Log in to the conductor CLI or SSH session:

   ```
   ssh admin@192.168.100.10
   ```

2. Enter the Linux shell from the PCLI:

   ```
   admin@node0.conductor1# shell
   ```

3. List the network interfaces:

   ```bash
   ip link show
   ```

   The output shows the Linux interface names for each NIC. A VMXNet3 NIC on VMware is commonly named `ens192`, `ens160`, or `eth0`. Identify the interface that corresponds to the management network.

### Find the PCI Address

4. Use `ethtool` to retrieve the PCI bus info for that interface. Replace `ens192` with your actual interface name:

   ```bash
   ethtool -i ens192 | grep bus-info
   ```

   Example output:

   ```
   bus-info: 0000:0b:00.0
   ```

   The value after `bus-info:` (for example `0000:0b:00.0`) is the PCI address to use in the SSR conductor configuration.

:::tip
If `ethtool` is not available, you can find the PCI address using:
```bash
ls -la /sys/class/net/ens192/device
```
The symlink target contains the PCI address in the path, for example `../../../0000:0b:00.0`.
:::
