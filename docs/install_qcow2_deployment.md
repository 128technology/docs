---
title: Deployment Using QCOW2
sidebar_label: Deployment Using QCOW2
---

The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages which can be used to automate instance deployment. Cloud-init can be used for linux network provisioning and for disk volume dynamic expansion on first boot.

Download the qcow2 image using the link below:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-images-release-local

## Using cloud-init to bootstrap SSR connection to Conductor

The simplest method for onboarding a new SSR to an existing conductor is to initialize the system as a router node and provide the addresses for any conductor nodes. The manual initialization process can be automated by providing an [initializer preferences](initializer_preferences.md) file. This can be automated throuch cloud-init cloud-config by providing a cloud-init capable hypervisor with user-data similar to what is shown below.

```
#cloud-config
ssh_pwauth: True
write_files:
- path: /root/initializer-preferences.json
  content: |
    {"node-role": "combo", "node-ip": "127.0.0.1", "node-name": "dummy-node", "router-name": "dummy-router", "admin-password": "$6$W2wtGSOP7lT4vqLj$zG3eYb9/QAWD/0PqiN/I6vVLtDhBzhecx.aBpdweIx4D.0NJzxIUGVRRBQPmO9K8LlU/Jj8iBaL3OS7aa75KD1", "conductor": {"primary": "10.10.10.10"}}
runcmd:
- initialize128t -p /root/initializer-preferences.json
```

This will case this device's salt-minion to attempt to connect to the Conductor at IP address `10.10.10.10`. The device, by default, will set its asset-id to match the hostname provided by the hypervisor's cloud-init metadata. If this unique asset-id is associated with a node in the Conductor's configuration, the Conductor's Automated Provisioner process will reinitialize this device with the appropriate router and node name and the system will be able to pull a full configuration.

:::note
The example above assumes that the system will be able obtain an IP address via DHCP on the first network interface which will provide connectivity to the Conductor. If this is not the case, additional configuration can be provided to cloud-init to assist in provisioning network interfaces. However, the details of this are beyond the scope of this document. Please consult the official cloud-init documentation and the documentation of your particular hypervisor for further guidance.
:::

## Using NoCloud to provide cloud-init meta-data and user-data

Even when using a hypervisor that does not directly provide a cloud-init metadata service, it is possible to use NoCloud to seed the required data to cloud-init. To do this, in addition to preparing the user-data as shown in the previous section, minimal meta-data must be provided. An example is shown below.

```
instance-id: ssr1
local-hostname: ssr1
```

The cloud-init process on the SSR ISO will look for this data on an attached disk with the volume label `cidata`. To create such an ISO image on a Linux system, place the user-data in a file named `user-data` and the meta-data in a file named `meta-data` and run the command `genisoimage -output cidata.iso -V cidata -r -J user-data meta-data`. When launching a new SSR from qcow, this ISO can be attached and the system will run the cloud-init process seeded with this data.
