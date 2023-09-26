---
title: Deployment Using QCOW2
sidebar_label: Deployment Using QCOW2
---

The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages which can be used to automate instance deployment. Cloud-init can be used for linux network provisioning and for disk volume dynamic expansion on first boot.

For successful SSR qcow2 deployment, a cloud-init (or nocloud) configuration **must** provide persistent network interface bindings on first boot of the VM; otherwise the SSR will not correlate virtual machine NICs to router interfaces, and they may change across VM reboots. Operation of SSR qcow2 without persistent NIC bindings is not supported at this time.

Download the qcow2 image using the link below:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-images-release-local

## Using cloud-init to bootstrap SSR connection to Conductor

The simplest method for onboarding a new SSR to an existing conductor is to initialize the system as a router node and provide the addresses for any conductor nodes. The manual initialization process can be automated by providing an [initializer preferences](initializer_preferences.md) file. This can be automated through `cloud-init cloud-config` by providing a user-data to a cloud-init capable hypervisor similar to what is shown below.

```
#cloud-config
ssh_pwauth: True
write_files:
- path: /root/initializer-preferences.json
  content: |
    {"node-role": "combo", "node-ip": "127.0.0.1", "node-name": "dummy-node", "router-name": "dummy-router", "admin-password": "$6$W2wtGSOP7lT4vqLj$zG3eYb9/QAWD/0PqiN/I6vVLtDhBzhecx.aBpdweIx4D.0NJzxIUGVRRBQPmO9K8LlU/Jj8iBaL3OS7aa75KD1", "conductor": {"primary": {"ip": "10.10.10.10"}}}
runcmd:
- initialize128t -p /root/initializer-preferences.json
```

This causes this device's salt-minion to attempt to connect to the Conductor at IP address `10.10.10.10`. The device, by default, will set its `asset-id` to match the hostname provided by the hypervisor's cloud-init metadata. If this unique asset-id is associated with a node in the Conductor's configuration, the Conductor's Automated Provisioner process will reinitialize this device with the appropriate router and node name, allowing the system to pull a full configuration.

:::note
The example above assumes that the system will be able obtain an IP address via DHCP on the first network interface, which provides connectivity to the Conductor. If this is not the case, additional configuration can be provided to cloud-init to assist in provisioning network interfaces. However, these details are beyond the scope of this document. Please consult the official cloud-init documentation and the documentation for your particular hypervisor for further guidance.
:::

## Using NoCloud to provide cloud-init meta-data, user-data, and network-config

Even when using a hypervisor that does not directly provide a cloud-init metadata service, it is possible to use NoCloud to seed the required data to cloud-init. On first boot, if the cloud-init process finds an attached disk with the volume label `cidata`, it will look on this disk for the configuration data that is typically provided by a hypervisor's metadata service. There are three specific configuration files that may be supplied for different purposes: `meta-data`, `user-data`, and `network-config`.

Instance meta-data must be provided. This will set the system's hostname which will also, by default, be used as the SSR's asset-id. An example of this data is shown below.

```
instance-id: ssr1
local-hostname: ssr1
```

As discussed in the previous section, the user-data is very useful for automating onboarding of the VM by a Conductor. Additional considerations should be made for persistent interface naming when using NoCloud. When network configuration is provided by a hypervisor's metadata service it maps the interface names to MAC addresses to provide this persistence. It is typically not feasible to have this information in advance in scenarios where NoCloud is used for automation. Instead, the NICs of the system should be mapped by PCI address to interface names. To obtain the list of PCI addresses of the NIC interfaces, a sample VM containing all required interfaces for the deployment should be booted on the hypervisor. As root, run the command `lshw -c net -businfo` on this VM to obtain this list of PCI addresses and substitute them in the example user-data shown below. It may take some experimentation to identify which PCI address maps to the appropriate interface on the VM in the order they are added. Also, please note that Linux will run into issues renaming the devices to the standard `ethX` naming convention, a different interface naming convention must be used. It is suggested to use the convention `ge-0-X`.

Below is an example user-data which will achieve persistent interface mapping as well as initialize a router to connect to a Conductor at address `10.10.10.10`. The file containing the configuration to map the new interface names to PCI address is written, along with the initializer preference file. Then, the system is initialized, the legacy `ifcfg-eth0` file that is no longer valid is removed, and finally the system is rebooted so that the new interface naming is applied.

```
#cloud-config
ssh_pwauth: True
write_files:
- path: /etc/udev/rules.d/70-persistent-net.rules
  content: |
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:02.0", NAME:="ge-0-0"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:03.0", NAME:="ge-0-1"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:04.0", NAME:="ge-0-2"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:05.0", NAME:="ge-0-3"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:06.0", NAME:="ge-0-4"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:07.0", NAME:="ge-0-5"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:08.0", NAME:="ge-0-6"
    SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", KERNELS=="0000:00:09.0", NAME:="ge-0-7"
- path: /root/initializer-preferences.json
  content: |
    {"node-role": "combo", "node-ip": "127.0.0.1", "node-name": "dummy-node", "router-name": "dummy-router", "admin-password": "$6$W2wtGSOP7lT4vqLj$zG3eYb9/QAWD/0PqiN/I6vVLtDhBzhecx.aBpdweIx4D.0NJzxIUGVRRBQPmO9K8LlU/Jj8iBaL3OS7aa75KD1", "conductor": {"primary": {"ip": "10.10.10.10"}}}
runcmd:
- initialize128t -p /root/initializer-preferences.json
- /bin/rm -f /etc/sysconfig/network-scripts/ifcfg-eth0
- /usr/bin/sync;/usr/bin/sync;/usr/sbin/shutdown -r
```

NoCloud supports optionally supplying network configuration via an additional `network-config` script which can be useful for configuring interfaces. On the initial boot, the system will use legacy interface naming. Therefore, we will put in a basic configuration for eth0 that will remove DHCP from the existing interface configuration, which may cause a delay in the initial boot. We will also create a configuration for the interface after it is renamed on ensuing boots. The interface will not be found on the first boot and therefore will be skipped, but will apply to all ensuing boots. This example can be tweaked to provide a different Linux networking configuration including static addressing as needed. Please consult cloud-init documentation on network-config version 1 for additional details.

```
version: 1
config:
- type: physical
  name: eth0
- type: physical
  name: ge-0-0
  subnets:
  - type: dhcp
```

To create an ISO image with these configuration files and the volume label `cidata` on a Linux system, place the user-data in a file named `user-data`, the meta-data in a file named `meta-data`, and the network-config in a file named `network-config` and run the command `genisoimage -output cidata.iso -V cidata -r -J user-data meta-data network-config`. This ISO should be attached to the SSR VM when booted and the cloud-init process on the system will find the data and perform the desired actions.
