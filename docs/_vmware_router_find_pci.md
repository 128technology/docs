<!--- VMware Router - Find WAN and LAN NIC PCI Addresses --->

The SSR router configuration requires the PCI address of each VMXNet3 NIC. Because VMware assigns PCI addresses dynamically based on VM slot assignment, you must discover the actual values from the running VM.

## Log In to the Router

1. If you are in the Router CLI, exit and return to the root linux level.

   ```
   admin@node0.branch1# shell
   ```

2. Run `lshw -c network businfo` to display the device interfaces and their PCI addresses.

   ![Device Interfaces and PCI Addresses](/img/dep-vmrouter-lshw-pci-address.png)

3. Record the device names and addresses in your network design reference:

   | Interface | Device Name | Example PCI Address |
   |-----------|-----------|---------------------|
   | WAN (`wan-dev`) | `ge-0-0` _(example)_ | `0000:0b:00.0` _(example)_ |
   | LAN (`lan-dev`) | `ge-0-1` _(example)_ | `0000:13:00.0` _(example)_ |

   :::important
   These are example values. Your actual PCI addresses will differ. Use the values you discover here in [Step 4 — Configure the Router on the Conductor](deploy_vmware_router_config.mdx).
   :::