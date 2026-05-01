<!--- VMware ESXi VM Creation for SSR Conductor --->

## Log In to VMware ESXi

1. Open a web browser and navigate to your ESXi host. Log in with administrative credentials.

   ![VMware ESXi Login](/img/vmware_login.png)

## Upload the SSR ISO to the Datastore

1. From the ESXi Navigator, select **Storage**.

   ![Navigator Storage](/img/vmware_storage.png)

2. Click the **Datastore Browser** button.

   ![Datastore Browser Button](/img/vmware_datastore_browser_button.png)

3. Click **Upload**, navigate to the SSR 7.1.4 Universal ISO on your local workstation, and click **Open**. The ISO appears in the datastore.

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
   | Name | A descriptive name, for example `ssr-conductor` |
   | Compatibility | `ESXi 7.0 U2 virtual machine` |
   | Guest OS family | `Linux` |
   | Guest OS version | `CentOS 7 (64-bit)` |

   Click **Next**.

   ![Name the VM](/img/vmware_name-os.png)

### Storage

4. Select the datastore and storage type for the VM, then click **Next**.

   ![Storage Type](/img/vmware_storage_type.png)

### Virtual Hardware

5. Click **Virtual Hardware** and configure the following settings. These values meet the minimum conductor requirements; scale up for larger deployments (see [Conductor Scaling Recommendations](intro_system_reqs.md#conductor-scaling-recommendations)).

   | Setting | Value | Notes |
   |---------|-------|-------|
   | CPUs | `4` | Minimum; expand for >25 managed routers |
   | Scheduling Affinity | `0-3` | Set under CPU → expand |
   | Memory | `8 GB` | Minimum |
   | Hard Disk 1 | `60 GB` | Minimum |
   | SCSI Controller 0 | `VMware Paravirtual` | |

   ![Virtual Hardware Settings](/img/vmware_virt_hdwr.png)

### Network Adapters

6. By default, one network adapter is created. For a standalone conductor, one adapter is sufficient. Click the adapter to expand it and set the **Adapter Type** to **VMXNET3**. Set the **Network** to the management network portgroup connected to your conductor management subnet.

   :::note
   If you plan to connect additional networks (for example, a dedicated conductor-to-router WAN), click **Add network adapter** to add additional VMXNet3 adapters now. For most deployments, one adapter is sufficient.
   :::

   ![Network Adapter Type](/img/vmware_net_adapter.png)

### CD/DVD Media

7. Expand **CD/DVD Drive 1**. In the dropdown, select **Datastore ISO file** and check **Connect**. The Datastore Browser opens.

8. Select the SSR 7.1.4 ISO you uploaded earlier and click **Select**.

   ![CD ISO Selected](/img/vmware_cd-iso2.png)

### VM Options (Boot Settings)

9. Click the **VM Options** tab.

   ![VM Options](/img/vmware_vmoptions1.png)

10. Expand **Boot Options** and configure:

    | Setting | Value |
    |---------|-------|
    | Firmware | `EFI` |
    | Enable UEFI secure boot | **Disabled** (no check mark) |

    :::important
    Secure Boot **must be disabled**. The SSR kernel modules are not signed, and Secure Boot will prevent the NIC drivers from loading, causing installation to fail.
    :::

    ![Boot Options](/img/vmware_vmoptions2.png)

11. Click **Next**, review the summary, then click **Finish**.

   ![VM Complete](/img/vmware_finish.png)
