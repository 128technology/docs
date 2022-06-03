---
title: Installing in Equinix Metal
sidebar_label: Installing in Equinix Metal
---

## Introduction

[Equinix Metal](https://metal.equinix.com/) is a globally-available bare metal “as-a-service” that can be deployed and interconnected in minutes. "Click and go" to deploy to the edge of the internet.

![Plans](/img/platforms_equinix_metal_logo.png)

This guide describes the process for deploying a Session Smart Router (SSR) in Equinix Metal. The process consists of the following steps:

1. Deploying a Session Smart Conductor. For a quick deployment you can use the Hourly/PAYG offerins available in Azure or AWS. Refer to the [Azure documentation](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_azure/#session-smart-conductor-deployment) or the [AWS documentation](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_quickstart_aws) for more information.
2. Completing the [requirements for the deployment](#requirements).
3. Preparing the [Equinix Metal Project for deployment](#equinix-metal-project-deployment).
4. Deploying a [Session Smart Router](#session-smart-router-deployment).

Additional technical documentation on Equinix Metal can be found [here](https://metal.equinix.com/developers/docs/).

## Requirements

* Account and credentials to access the [Equinix Metal Console](https://console.equinix.com/login).
* [Generate a SSH Key](https://metal.equinix.com/developers/docs/accounts/ssh-keys/#generating-ssh-keys) if you don't have one.
  * Add your SSH Key to your Equinix Metal account or project as described [here](https://metal.equinix.com/developers/docs/accounts/ssh-keys/#personal-keys-vs-project-keys).
* A token or certificate to install the Juniper Session Smart Router software. If a token or certificate is not in your possession, please contact your Juniper Sales representative.

Once all the requirements are satisfied, proceed to the next section [Equinix Metal Project Deployment](#equinix-metal-project-deployment) to deploy the network infrastructure required to deploy a Session Smart Router.

## Equinix Metal Project Deployment

It is recommended to implement a network infrastructure design that complies with the following principles:

* The network type of the server is configured as "Hybrid Unbounded".
* For the forwarding data plane specific Layer 2 VLANs are created.
  * For example, one `Internet VLAN` for data plane Internet access. A second `Peering VLAN` to forward traffic destined to other Equinix Metal regions, to Public Cloud Providers, etc.
* For those type of servers that only have 2 ports (network interfaces), the recommendation is:
  * The first port is dedicated for management purposes only. The port must have access to the Internet, so that the SSR is reachable for SSH for administration purposes. In additionn, if Conductor is hosted in the Internet connectivity to Conductor is provided via this network interface.
  * The second port is dedicated to the data plane. The second port is attached to multiple L2 VLANs using 802.1q

Proceed to the next sections to implement the recommended design in Equinix Metal.

### Creating L2 Networks

Login to the [Equinix Metal Console](https://console.equinix.com/login).
Click on the tab "IPs & Networks" and select "Layer 2".
Click on the "Add VLAN" button.
Select the location of your deployment.
Provide a descritpion and an ID for the VLAN.
Repeat the steps described above to create as many L2 VLANs as needed to meet your specific requirements. For example:

For example: Internet and VLAN ID 128.

| Description | VNID |
| ----------- | ---- |
| Internet    | 128  |
| Peering     | 129  |

### Deploying a Metal Gateway

An Equinix Metal™ Metal Gateway provides a single IPv4 Gateway for a subnet. This allows you to deploy a group of servers in a Metro that are all on the same subnet and that can all connect to each other or the Internet through the Metal Gateway.

Deploy a Metal Gateway in the `Internet VLAN` to break out to the Internet:

Login to the [Equinix Metal Console](https://console.equinix.com/login).
Click on the tab "IPs & Networks" and select "IPs".
Click on the "Request IP Addresses" button.
Select deployment type `Public IPv4`.
Select the location where you want to deploy the Metal Gateway.
Select a quantity/subnet size of at least `/29` or larger.
Click on the "Submit Request" button.
Click on the tab "IPs & Networks" and select "Metal Gateway".
Click on the "Create Metal Gateway" button.
Select the location of your deployment.
Choose the VLAN where you want to deploy the Gateway. For example, `Internet VLAN`.
Select `Public IPv4` and select the IP range created above.
Click on the "Create Metal Gateway" button.

Proceed to the next section [Session Smart Router Deployment](#session-smart-router-deployment) to deploy a Session Smart Router.

## Session Smart Router Deployment

### Deployment

To deploy a Session Smart Router software via the [Equinix Metal Console](https://console.equinix.com/login):

Click on the “Servers" tab.
Click on one the reservation options available. Select "On Demand" if you do not need to reserve the a server for a committed period of time.
Select the desired location where you want to deploy.
Select one of the server types between the following: **c3.medium.x86**
Select the Operating System by clicking on "All" and then CentOS. Select **CentOS 7**.
Select the numbers of server you want to reserve, and provide a name to each.
Click on the "Deploy Now" button.

Once the reservation request completes the Public IP address of the management interface of the server will be accessible. The Public IP address of the server is displayed in the Equinix Metal Console.

SSH into the Public IP address of the server with the following command: 

```ssh root@<Public IP address>```

then run the following commands:

yum install wget -y
wget ftp://ftp.pbone.net/mirror/vault.centos.org/7.5.1804/updates/x86_64/Packages/centos-release-7-5.1804.1.el7.centos.x86_64.rpm
yum downgrade centos-release-7-5.1804.1.el7.centos.x86_64.rpm -y
reboot

Once the server restarts SSH in again and run the following commands:

sudo yum install --enablerepo=* http://yum.128technology.com/installer/repo.rpm -y
sudo yum install dnf -y
sudo dnf remove tmux -y
sudo dnf install 128T-installer -y

Create the `t128` user and set a password:

sudo useradd -s /bin/bash t128
sudo usermod -a -G wheel t128 
sudo passwd t128

When the password has been updated successfully the following message is displayed:

`passwd: all authentication tokens updated successfully`

:::note 
Do not proceed to the next step until the password has been updated successfully, the `t128` username will be used to login to the VM for administration purposes when required from now on rather than the `root` username.
:::

Lastly, launch the installer with the following command:

sudo install128t

To complete the installation of the Session Smart Router (SSR) software, continue from the step 4 of the procedure described [here](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_installation_installer#manually-installing-using-the-128t-installer).

At the end of the installation process the server will restart. Login to the Conductor GUI and proceed to the next section to configure the device interfaces of the Session Smart Router.

### Attaching the L2 Networks to the server

Login to the [Equinix Metal Console](https://console.equinix.com/login).
Click on the “Servers" tab.
Click on the "hostname" of the server.
Click on the "Network" tab.
Click on the "Convert to Other Network Type" button.
Select "Hybrid" and "Unbounded".
Click on the "Convert to Hybrid Networking" button.
Scroll down to the "Layer 2" section and click the "Add New Vlan" button.
Select the network interface `eth1` and select the L2 Network.
Repeat these last two steps to add all the VLANs required. For example, `Internet VLAN` and `Peering VLAN`.

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

## Annexes

### Console access

There are times when a server becomes unreachable over SSH due to broken networking, a bad install, misconfiguration, a kernel upgrade, bad firewall rules, etc. Equinix Metal™ offers an out-of-band console called "SOS" - which stands for Serial Over SSH. Additional documentation provided [here](https://metal.equinix.com/developers/docs/resilience-recovery/serial-over-ssh/).