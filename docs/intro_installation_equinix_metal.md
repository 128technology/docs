---
title: Installing in Equinix Metal
sidebar_label: Installing in Equinix Metal
---

## Introduction

[Equinix Metal](https://metal.equinix.com/) is a globally-available bare metal “as-a-service” that can be deployed and interconnected in minutes. "Click and go" to deploy to the edge of the internet.

![Plans](/img/platforms_equinix_metal_logo.png)

This guide describes the process for deploying a Session Smart Router (SSR) in Equinix Metal. The process consists of the following steps:

1. Deploying a Session Smart Conductor. For a quick deployment you can use the Hourly/PAYG offering available in Azure or AWS. Refer to the [Azure documentation](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_azure/#session-smart-conductor-deployment) or the [AWS documentation](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_quickstart_aws) for more information.
2. Completing the [prerequisites for the deployment](#prerequisites).
3. Preparing the [Equinix Metal Project for deployment](#equinix-metal-project-deployment).
4. Deploying a [Session Smart Router](#session-smart-router-deployment).

For additional information about Equinix Metal, please refer to the [Equinix Metal Product Documentation](https://metal.equinix.com/developers/docs/).

## Prerequisites

* Account and credentials to access the [Equinix Metal Console](https://console.equinix.com/login).
* [Generate an SSH Key](https://metal.equinix.com/developers/docs/accounts/ssh-keys/#generating-ssh-keys) if you don't have one.
  * Add your SSH Key to your Equinix Metal account or project as described [here](https://metal.equinix.com/developers/docs/accounts/ssh-keys/#personal-keys-vs-project-keys).
* A token or certificate to install the Juniper Session Smart Router software. If a token or certificate is not in your possession, please contact your Juniper Sales representative.

Once you have all the prerequisites, begin with [Equinix Metal Project Deployment](#equinix-metal-project-deployment) to deploy the network infrastructure required to deploy a Session Smart Router.

## Equinix Metal Project Deployment

It is recommended to implement a network infrastructure design that complies with the following principles:

* Configure the server network type as "Hybrid Unbounded".
* Create specific Layer 2 VLANs for the forwarding data plane.
  * For example, create one `Internet VLAN` for data plane Internet access, and a second `Peering VLAN` to forward traffic destined for other Equinix Metal regions, or to Public Cloud Providers, etc.
* For servers that only have 2 ports (network interfaces):
  * The first port is dedicated to management functions only. The port must have access to the Internet, allowing the SSR to be reachable by SSH for administration activities. In addition, if the Conductor is hosted in the Internet, connectivity to Conductor must be provided via this network interface.
  * The second port is dedicated to the data plane, and is attached to multiple L2 VLANs using 802.1q.

The next sections implement the recommended design in Equinix Metal.

### Creating L2 Networks

1. Login to the [Equinix Metal Console](https://console.equinix.com/login).
2. Click on the tab "IPs & Networks" and select "Layer 2".
3. Click on the "Add VLAN" button.
4. Select the location of your deployment.
5. Provide a descritpion and an ID for the VLAN.

Repeat the steps above to create as many L2 VLANs as necessary to meet your specific requirements. For example: Internet and VLAN ID 128.

| Description | VNID |
| ----------- | ---- |
| Internet    | 128  |
| Peering     | 129  |

### Deploying a Metal Gateway

An Equinix Metal™ Metal Gateway provides a single IPv4 Gateway for a subnet. This allows you to deploy a group of servers in a Metro on the same subnet, and able to connect to each other or the Internet through the Metal Gateway.

Deploy a Metal Gateway in the `Internet VLAN` to break out to the Internet:

1. Login to the [Equinix Metal Console](https://console.equinix.com/login).
2. Click on the tab "IPs & Networks" and select "IPs".
3. Click on the "Request IP Addresses" button.
4. Select deployment type `Public IPv4`.
5. Select the location where you want to deploy the Metal Gateway.
6. Select a quantity/subnet size of at least `/29` or larger.
7. Click on the "Submit Request" button.
8. Click on the tab "IPs & Networks" and select "Metal Gateway".
9. Click on the "Create Metal Gateway" button.
10. Select the location of your deployment.
11. Choose the VLAN where you want to deploy the Gateway. For example, `Internet VLAN`.
12. Select `Public IPv4` and select the IP range created above.
13. Click on the "Create Metal Gateway" button.

## Session Smart Router Deployment

Use the following procedure to deploy a Session Smart Router software via the [Equinix Metal Console](https://console.equinix.com/login):

1. Click on the “Servers" tab.
2. Click on one of the reservation options available. Select "On Demand" if you do not need to reserve the server for a committed period of time.
3. Select the desired location for deployment.
4. Select one of the server types between the following: **c3.medium.x86**
5. Select the Operating System by clicking on "All" and then CentOS. Select **CentOS 7**.
6. Select the number of servers to reserve, and provide a name for each.
7. Click on the "Deploy Now" button.

After the reservation request is complete, the Public IP address of the management interface of the server is accessible. The Public IP address of the server is displayed in the Equinix Metal Console.

SSH into the Public IP address of the server with the following command: 

`ssh root@<Public IP address>`

then run the following commands:

```
yum install wget -y
wget ftp://ftp.pbone.net/mirror/vault.centos.org/7.5.1804/updates/x86_64/Packages/centos-release-7-5.1804.1.el7.centos.x86_64.rpm
yum downgrade centos-release-7-5.1804.1.el7.centos.x86_64.rpm -y
reboot
```

Once the server restarts SSH in again and run the following commands:

```
sudo yum install --enablerepo=* http://yum.128technology.com/installer/repo.rpm -y
sudo yum install dnf -y
sudo dnf remove tmux -y
sudo dnf install 128T-installer -y
```

Create the `t128` user and set a password:

```
sudo useradd -s /bin/bash t128
sudo usermod -a -G wheel t128 
sudo passwd t128
```

When the password has been updated successfully the following message is displayed:

`passwd: all authentication tokens updated successfully`

:::note 
Do not proceed to the next step until the password has been updated successfully. The `t128` username and password will now be used to login to the VM for administrative functions, rather than the `root` username.
:::

Launch the installer using the following command:

`sudo install128t`

To complete the installation of the Session Smart Router (SSR) software, continue from the step 4 of the [Manual Installation procedure](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_installer#manually-installing-using-the-128t-installer).

The server restarts at the end of the installation process. Login to the Conductor GUI and use the procedure below (Attaching the L2 Networks to the Server) to configure the Session Smart Router device interfaces.

### Attaching the L2 Networks to the Server

1. Login to the [Equinix Metal Console](https://console.equinix.com/login).
2. Click on the “Servers" tab.
3. Click on the "hostname" of the server.
4. Click on the "Network" tab.
5. Click on the "Convert to Other Network Type" button.
6. Select "Hybrid" and "Unbounded".
7. Click on the "Convert to Hybrid Networking" button.
8. Scroll down to the "Layer 2" section and click the "Add New Vlan" button.
9. Select the network interface `eth1` and select the L2 Network.

Repeat steps 8 and 9 to add all the required VLANs. For example, `Internet VLAN` and `Peering VLAN`.

### Network Interfaces Layout

The network interface layout of the server type **c3.medium.x86** is the following:

| Network interface name | Subnet           | PCI Address     |
| ---------------------- | ---------------- | ----------------|
| enp65s0f0              | Management       | 0000:41:00.0    |
| enp65s0f1              | Public           | 0000:41:00.1    |


### Configuration

```
config

    authority

        router  fm-router
            name  fm-router

            node  fm-node
                name              fm-node

                device-interface  private
                    name               private
                    pci-address        0000:41:00.1

                    network-interface  peering
                        name       peering
                        global-id  1
                        vlan       128

                        address    192.168.1.10
                            ip-address     192.168.1.10
                            prefix-length  24
                        exit
                    exit

                    network-interface  internet
                        name       internet
                        global-id  2
                        vlan       129

                        address    147.28.X.X
                            ip-address     147.28.X.X
                            prefix-length  29
                            gateway        147.28.X.X
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

## Appendix

### Console Access

There may be times when a server becomes unreachable over SSH due to broken networking, a bad install, misconfiguration, a kernel upgrade, bad firewall rules, etc. Equinix Metal™ offers an out-of-band console called "SOS" - which stands for Serial Over SSH. Refer to the [SOS - Serial Over SSH](https://metal.equinix.com/developers/docs/resilience-recovery/serial-over-ssh/) documentation for additional information.