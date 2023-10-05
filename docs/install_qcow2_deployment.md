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

Even when using a hypervisor that does not directly provide a cloud-init metadata service, it is possible to use NoCloud to seed the required data to cloud-init. On first boot, if the cloud-init process finds an attached disk with the volume label `cidata`, it looks on this disk for configuration data that is typically provided by a hypervisor's metadata service. 

There are three specific configuration files that may be supplied for different purposes: 
- `meta-data` 
- `user-data` 
- `network-config`

### `meta-data`

Instance meta-data must be provided to sets the system hostname. By default it is used as the SSR's asset-id. An example of this data is shown below.

```
instance-id: ssr1
local-hostname: ssr1
```

### `user-data`

The user-data is very useful for automating the onboarding of the VM by a Conductor. Additional considerations should be made for persistent interface naming when using NoCloud. When network configuration is provided by a hypervisor's metadata service, it maps the interface names to MAC addresses to provide this persistence. In scenarios where NoCloud is used for automation it is not feasible to have this information in advance. Instead, the NICs on the system should be mapped by PCI address to interface names. To obtain the list of PCI addresses of the NIC interfaces, use the following steps.

1. Boot a sample VM containing all required interfaces for the deployment on the hypervisor. 
2. As root, run the command `lshw -c net -businfo` on this VM to obtain this list of PCI addresses.
3. Using the example user-data below, substitute the PCI addresses using the naming convention `ge-0-X` as Linux will run into issues renaming the devices to the standard `ethX` naming convention. 

It may take some experimentation to identify which PCI address maps to the appropriate interface on the VM in the order they are added. 

The example user-data below will achieve persistent interface mapping, as well as initialize a router to connect to a Conductor at address `10.10.10.10`. The subsequent initialization process is as follows:

- The file containing the configuration to map the new interface names to PCI address is written to /etc/udev/rules.d/70-persistent-net.rules.
- The initializer preferences file is written to /root/initializer-preferences.json. 
- The system is initialized. 
- The legacy `ifcfg-eth0` file (that is no longer valid) is removed.
- The system is rebooted and the new interface naming is applied.

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

### `network-config`

NoCloud supports optionally supplying network configuration via an additional `network-config` script, which can be used to configure interfaces. 

On the initial boot, the system uses legacy interface naming. The `network-config` file provided below creates a basic configuration for eth0 that removes DHCP from the existing interface configuration. This may cause a delay in the initial boot. We also create a configuration for the interface after it is renamed on ensuing boots. The interface will not be found on the first boot and therefore will be skipped, but will apply to all ensuing boots. This example can be tweaked as needed to provide a different Linux networking configuration, including static addressing. Please consult the `cloud-init` documentation on **network-config version 1** for additional details.

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
### `cidata`

To create an ISO image containing these configuration files and the volume label `cidata` on a Linux system:

1. Place the user-data in a file named `user-data`, 
2. Place the meta-data in a file named `meta-data`, and 
3. Place the network-config in a file named `network-config`.
4. Run the command `genisoimage -output cidata.iso -V cidata -r -J user-data meta-data network-config`. 

This ISO should be attached to the SSR VM when booted, please consult the documentation for your specific hypervisor for details on how to do this. The cloud-init process on the system will find the data during first boot, and perform the desired actions.

