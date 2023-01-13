---
title: Deployment Using QCOW2
sidebar_label: Deployment Using QCOW2
---

The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages for linux network provisioning and for disk volume dynamic expansion on first boot to support OpenStack VM deployments. Any operations beyond bootstrapping the OS layer are not supported. 

For successful SSR qcow2 deployment, a cloud-init configuration **must** provide persistent network interface bindings and be run on first boot of the VM; otherwise the SSR will not correlate virtual machine NICs to router interfaces, and they may change across VM reboots. Operation of SSR qcow2 without cloud-init is not supported at this time. 

Download the qcow2 image using the link below:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-images-release-local

Use the OpenStack management tool to load the image into your virtual environment, or deploy it directly from the hypervisor. The VM then boots using the pre-installed software.

The steps used for deployment vary depending on the hypervisor used for the environment and the management tool. For example, qcow2 can be deployed directly to a KVM hypervisor, or it can be deployed via KVM that is being managed as part of an OpenStack cluster. It is recommended that you refer to your hypervisor’s documentation for supporting information.

Supported Hypervisors

- KVM

Supported Management Environments

- OpenStack
