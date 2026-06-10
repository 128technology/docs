<!--- VMware ESXi VM Creation for SSR Router --->

## Log In to VMware ESXi

Open a web browser and navigate to your ESXi host. Log in with administrative credentials.

   ![VMware ESXi Login](/img/vmware_login.png)

## Create the Virtual Machine

1. From the VMWare Navigator window, click on **Create/Register VM**.

   ![Create VM](/img/dep1-vm-create-vm.png)

2. In the **Select creation type** window click **Create a new virtual machine** and then click **Next**.

   ![VM Type](/img/dep2-vm-creation-type.png)

### Name and Guest OS

Use the steps below to configure the following:

   | Field | Value |
   |-------|-------|
   | Name | A descriptive name, for example `spoke1` |
   | Compatibility | `ESXi 7.0 U2 virtual machine` |
   | Guest OS family | `Linux` |
   | Guest OS version | `Oracle Linux 9 (64-bit)` or highest available Oracle Linux (64-bit) version |

3. Name the Virtual Machine **Spoke1**.  

4. Select **Linux** from the Guest OS family dropdown selection, and select the Guest OS version as `Oracle Linux 9 (64-bit)` or highest available Oracle Linux (64-bit) version. Click **Next**.

   ![Name the VM](/img/dep3-vmrouter-name-os.png)

### Storage

5. From the Storage screen, select **datastore1** and click **Next**. 

   ![VM Storage](/img/dep4-vm-storage.png)

### Virtual Hardware

6. On the **Customize settings** screen, click **Virtual Hardware** and configure the following settings. 

   Click **Virtual Hardware** and configure the following settings. These values meet the minimum router requirements:

   | Setting | Value | Notes |
   |---------|-------|-------|
   | CPUs | `4` | Minimum |
   | Scheduling Affinity | `0-3` | Set under CPU → expand |
   | Memory | `8 GB` | Minimum |
   | Hard Disk 1 | `62 GB` | Minimum |
   | SCSI Controller 0 | `VMware Paravirtual` | |

   ![Storage Parameters](/img/dep5-vm-params.png)

   Click **Next** when the settings are configured.

### Network Adapters

A VMware router requires at least **two VMXNet3 network adapters**: one for WAN and one for LAN. By default, one adapter is created.

   ![Network Adapter Type](/img/dep6-vmrouter-nics.png)

7. Set the existing adapter's **Adapter Type** to **VMXNET3** and connect it to your **WAN portgroup** — the portgroup that provides your ISP WAN connection with DHCP.

8. Click **Add network adapter** to add a second adapter. Set its **Adapter Type** to **VMXNET3** and connect it to your **LAN portgroup** — the portgroup connected to your branch LAN.

   :::note
   The order of the adapters (NIC 1 = WAN, NIC 2 = LAN) corresponds to the PCI addresses you will identify in [Step 3 — Find VM NIC PCI Addresses](deploy_vmware_router_pci.mdx). Note which portgroup each adapter is connected to.
   :::

### CD/DVD Media - Software Selection

9. As shown in the image above, expand **CD/DVD Drive 1**. 

10. Place a check next to **Connect at power on**. In the dropdown to the right, select **Datastore ISO file** and then click **Browse**. The Datastore Browser opens.

11. Select the `SSR-7.1.4-3.r2.el9.x86_64.ibu-v1.iso` and click **Select**.

   ![CD ISO Selected](/img/dep7-vm-selectversion.png)

12. Confirm the settings, and then click **Next**.

   ![Confirm Settings](/img/dep8-vm-all-settings.png) 

13. Review the summary, then click **Finish**.

   ![VM Complete](/img/dep9-vmrouter-summary.png)
