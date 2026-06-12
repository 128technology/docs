<!--- VMware ESXi VM Creation for SSR Conductor --->

## Log In to VMware ESXi

Open a web browser and navigate to your ESXi host. Log in with administrative credentials.

   ![VMware ESXi Login](/img/vmware_login.png)

## Upload the SSR ISO to the Datastore

1. From the ESXi Navigator, select **Storage**.

   ![Storage](/img/dep-vmware-router-uploadssr1.png)

2. Click the **Datastore Browser** button.

   ![Datastore Browser](/img/dep-vmware-router-uploadssr2.png)

3. Click **Upload**, navigate to the SSR 7.1.4-3r2 ISO on your local workstation, and click **Open**. The ISO appears in the datastore.

   ![Upload SSR Software](/img/dep-vmware-router-uploadssr3.png)

4. Click **Close**. 

## Create the Virtual Machine

1. From the VMWare Navigator window, click on **Create/Register VM**.

   ![Create VM](/img/dep1-vm-create-vm.png)

2. In the **Select creation type** window click **Create a new virtual machine** and then click **Next**.

   ![VM Type](/img/dep2-vm-creation-type.png)

### Name and Guest OS

Use the steps below to configure the following:
   
   | Field | Value |
   |-------|-------|
   | Name | A descriptive name. In this example, `Conductor` |
   | Compatibility | `ESXi 7.0 U2 virtual machine` |
   | Guest OS family | `Linux` |
   | Guest OS version | Select the highest available Oracle Linux (64-bit) version |

3. Name the Virtual Machine **Conductor**.  

4. Select the highest available Oracle Linux (64-bit) Guest OS version. Click **Next**.

   ![Name VM](/img/dep3-vm-name-os.png)

### Storage

5. From the Storage screen, select **datastore1** and click **Next**. 

   ![VM Storage](/img/dep4-vm-storage.png)

### Virtual Hardware

6. On the **Customize settings** screen, click **Virtual Hardware** and configure the following settings. 

   These values meet the minimum conductor requirements; scale up for larger deployments (see [Conductor Scaling Recommendations](intro_system_reqs.md#conductor-scaling-recommendations)).

   | Setting | Value | Notes |
   |---------|-------|-------|
   | CPUs | `4` | Minimum; expand for >25 managed routers |
   | Hardware virtualization | Check Expose Hardware assisted virtualization to guest OS | Set under CPU dropdown |
   | Memory | `8 GB` | Minimum |
   | Hard Disk 1 | `62 GB` | Minimum |

   ![Storage Parameters](/img/dep5-vm-params.png)

   In the Hardware Virtualization field, place a check next to Expose Hardware assisted virtualization to guest OS.

   [Hardware virtualization](dep-vmconductor-hrdwr-virtualization.png)

### Boot Options

7. Expand **Boot Options** and configure:

    | Setting | Value |
    |---------|-------|
    | Firmware | `BIOS` |
    | Enable UEFI secure boot | **Disabled** (no check mark) |

    :::important
    Secure Boot **must be disabled**. The SSR kernel modules are not signed, and Secure Boot will prevent the NIC drivers from loading, causing installation to fail.
    :::

    ![Boot Options](/img/dep-vmconductor-vmoptions-bios.png)

### Network Adapters

By default, one network adapter is created. For a standalone conductor, one adapter is sufficient. Click the adapter to expand it and set the **Adapter Type** to **VMXNET3**. Set the **Network** to the management network portgroup connected to your conductor management subnet.

   ![Network Adapter Type](/img/dep6-vm-nics.png)

### CD/DVD Media - Software Selection

8. Expand **CD/DVD Drive 1**. 

9. Place a check next to **Connect at power on**. In the dropdown to the right, select **Datastore ISO file** and then click **Browse**. The Datastore Browser opens.

10. Select the `SSR-7.1.4-3.r2.el9.x86_64.ibu-v1.iso` and click **Select**.

   ![CD ISO Selected](/img/dep7-vm-selectversion.png)

   ![Settings complete](/img/dep8-vm-all-settings.png)

10. Confirm the settings, and then click **Next**.

### Boot Settings

11. Click the **VM Options** tab.

   ![VM Options](/img/vmware_vmoptions1.png)

12. 

13. Click **Next**.

14. Review the summary, scroll to the bottom of the window and click **Finish**.

   ![VM Complete](/img/dep9-vm-summary.png)


