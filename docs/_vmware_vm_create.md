<!--- VMware ESXi VM Creation for SSR Conductor --->

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
   | Name | A descriptive name. In this example, `Conductor` |
   | Compatibility | `ESXi 7.0 U2 virtual machine` |
   | Guest OS family | `Linux` |
   | Guest OS version | `Oracle Linux 9 (64-bit)` or highest available Oracle Linux (64-bit) version |

3. Name the Virtual Machine **Conductor**.  

4. Select **Linux** from the Guest OS family dropdown selection, and select the Guest OS version as **Oracle Linux 9 (64-bit)** or the highest available Oracle Linux (64-bit) version . Click **Next**.

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
   | Scheduling Affinity | `0-3` | Set under CPU → expand |
   | Memory | `8 GB` | Minimum |
   | Hard Disk 1 | `62 GB` | Minimum |

   ![Storage Parameters](/img/dep5-vm-params.png)

   Click **Next** when the settings are configured.

### Network Adapters

By default, one network adapter is created. For a standalone conductor, one adapter is sufficient. Click the adapter to expand it and set the **Adapter Type** to **VMXNET3**. Set the **Network** to the management network portgroup connected to your conductor management subnet.

   ![Network Adapter Type](/img/dep6-vm-nics.png)

### CD/DVD Media - Software Selection

7. As shown in the image above, expand **CD/DVD Drive 1**. 

8. Place a check next to **Connect at power on**. In the dropdown to the right, select **Datastore ISO file** and then click **Browse**. The Datastore Browser opens.

9. Select the `SSR-7.1.4-3.r2.el9.x86_64.ibu-v1.iso` and click **Select**.

   ![CD ISO Selected](/img/dep7-vm-selectversion.png)

   ![Settings complete](/img/dep8-vm-all-settings.png)

10. Confirm the settings, and then click **Next**.

11. Review the summary, scroll to the bottom of the window and click **Finish**.

   ![VM Complete](/img/dep9-vm-summary.png)


