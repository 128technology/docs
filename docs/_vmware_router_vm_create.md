<!--- VMware ESXi VM Creation for SSR Router --->

## Log In to VMware ESXi

1. Open a web browser and navigate to your ESXi host. Log in with administrative credentials.

   ![VMware ESXi Login](/img/vmware_login.png)

## Upload the SSR ISO to the Datastore

1. From the ESXi Navigator, select **Storage**.

   ![Navigator Storage](/img/vmware_storage.png)

2. Click the **Datastore Browser** button.

   ![Datastore Browser Button](/img/vmware_datastore_browser_button.png)

3. Click **Upload**, navigate to the `SSR-7.1.5-7.r2.el9.x86_64.ibu-v1.iso` on your local workstation, and click **Open**. The ISO appears in the datastore.

   ![SSR ISO in Datastore](/img/vmware_ssr-iso.png)

4. Click **Close**.

## Create the Virtual Machine

1. From the ESXi Navigator, select **Virtual Machines**, then click **Create / Register VM**.

   ![Register VM](/img/vmware_registervm.png)

2. Select **Create a new virtual machine** and click **Next**.

### Name and Guest OS

3. Configure the following:

   | Field | Value |
   |-------|-------|
   | Name | A descriptive name, for example `ssr-router-branch1` |
   | Compatibility | `ESXi 7.0 U2 virtual machine` |
   | Guest OS family | `Linux` |
   | Guest OS version | `CentOS 7 (64-bit)` |

   Click **Next**.

   ![Name the VM](/img/vmware_name-os.png)

### Storage

4. Select the datastore and storage type for the VM, then click **Next**.

   ![Storage Type](/img/vmware_storage_type.png)

### Virtual Hardware

5. Click **Virtual Hardware** and configure the following settings. These values meet the minimum router requirements:

   | Setting | Value | Notes |
   |---------|-------|-------|
   | CPUs | `4` | Minimum |
   | Scheduling Affinity | `0-3` | Set under CPU → expand |
   | Memory | `8 GB` | Minimum |
   | Hard Disk 1 | `60 GB` | Minimum |
   | SCSI Controller 0 | `VMware Paravirtual` | |

   ![Virtual Hardware Settings](/img/vmware_virt_hdwr.png)

### Network Adapters

6. A VMware router requires **two VMXNet3 network adapters**: one for WAN and one for LAN. By default, one adapter is created.

   - Set the existing adapter's **Adapter Type** to **VMXNET3** and connect it to your **WAN portgroup** — the portgroup that provides your ISP WAN connection with DHCP.
   - Click **Add network adapter** to add a second adapter. Set its **Adapter Type** to **VMXNET3** and connect it to your **LAN portgroup** — the portgroup connected to your branch LAN.

   :::note
   The order of the adapters (NIC 1 = WAN, NIC 2 = LAN) corresponds to the PCI addresses you will identify in [Step 3 — Find VM NIC PCI Addresses](deploy_vmware_router_pci.mdx). Note which portgroup each adapter is connected to.
   :::

   ![Network Adapter Type](/img/vmware_net_adapter.png)

### CD/DVD Media

7. Expand **CD/DVD Drive 1**. In the dropdown, select **Datastore ISO file** and check **Connect**. The Datastore Browser opens.

8. Select the `SSR-7.1.5-7.r2.el9.x86_64.ibu-v1.iso` file and click **Select**.

   ![Select CD/ISO](/img/vmware_cd-iso.png)

### VM Options

9. Click **VM Options** at the top of the page.

   ![VM Options](/img/vmware_vmoptions1.png)

10. Expand **Boot Options** and configure the following:

    - **Firmware**: `EFI`
    - **Enable UEFI secure boot**: Disabled (no check mark)

    Click **Next**.

    ![Boot Options](/img/vmware_vmoptions2.png)

11. Review the configuration summary. Click **Back** to make any corrections, then click **Finish**.

    ![VM Complete](/img/vmware_finish.png)
