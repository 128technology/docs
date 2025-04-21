---
title: Hypervisor Support 
sidebar_label: Hypervisor Support
---

Hypervisor is supported with the following minimum requirements: 

- The host system must be running an Intel x86_64 processor with Intel VT-x and VT-d support enabled in the BIOS. 

- The host CPU must be capable of passing all required CPU flags to the VM. To validate this, run `128tok.sh` from a Linux shell on an SSR VM running on the server. 

- VMs must comply with the following minimum resource requirements: 

	- 4 cores 
	- 8GB RAM 
	- 120GB disk space 

Performance is based on these resources, and increasing each of these may enhance performance. 

- VM CPU cores must be tied to a single NUMA node on the host CPU. To ensure high performance, SSR virtual machines should be configured with dedicated vCPU resources that are not shared by other virtual machines or applications on the host. This can be configured on the hypervisor through CPU scheduling and affinity. Please consult your hypervisor's documentation for specifics. 

### Hyper-V: 

Virtualized instances of the SSR are supported on Microsoft Hyper-V running Windows Server 2022. The use of Hyper-V specific (non-legacy) adapters are required. VLAN support requires a minimum of SSR Version 6.2.4.

### VMWare: 

Virtualized instances of the SSR are supported on VMWare ESXi versions 6.7, 7.0, and 8.0. The use of VMXNET3 type adapters is required. For High Availability configurations (VRRP, use-physical-mac), SSR 6.3.0 is the required minimum version.

### KVM 

Virtualized instances of the SSR are supported in KVM on a Linux host running a minimum 6.1 kernel, and a minimum QEMU version of 6.2. The use of virtio type adapters is required.

### Live Migrations

A live-migration in a virtualized environment is a service impacting event. The snapshots taken to migrate the virtual instance to the new environment cannot be performed in a timeframe that avoids packet loss. It is recommended to deploy systems in an HA cluster to minimize service interruption. VM migration should be performed one node at a time with the SSR being migrated in stopped state. Once the first node has been migrated, the other node may follow. Depending on the distance between hypervisors (ensure systems meet the [minimum requirements](concepts_machine_communication.md#node-to-node-connectivity-high-availability)), the system may result in a split-brain. If the system does not meet these specifications, both nodes must be stopped and migrated simultaneously.
