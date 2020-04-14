---
title: Quick Start from Bootable ISO
sidebar_label: QuickStart
---

128 Technology has a software-driven framework for rapid and dynamic deployment of network nodes across the enterprise using Zero Touch Provisioning (ZTP). The software was architected from the ground up to enable automated deployment across a large set of scenarios, including simple, repeatable branch deployments and dynamic, scalable data center/cloud deployments. The solution may be deployed with minimal configuration using the default 128T installation process, or customized and integrated with 3rd party tools.

An important aspect of the 128 Technology ZTP solution is its flexibility. When the product is deployed using the standard 128T images, many customers appreciate the simplicity of enabling an enterprise-wide SessionSmart&trade; routing fabric without investing additional time to customize the deployment. Rapid deployment of session-enabled routing, security and network visibility is the key objective.

In this deployment model, the 128T node is deployed into the production environment with no site-specific configuration during shipment of units and initial on-line state. A site configuration file is directed via the 128T for initial provisioning.

## Software Delivery Options
The simplest deployment of the 128 Technology ZTP solution is highly automated and leverages just two components, the 128T Conductor and at least one 128T SessionSmart&trade; Router. For many customers, the 128T platform is ordered and delivered as a pre-integrated, off-the-shelf solution through the 128T partner network. An image leveraging QuickStart provisioning can also be deployed into a VM or cloud environment, though consideration must be made to the mechanism of injecting the file. Virtual environments may be better suited for cloud automation tools to assist in automated, dynamic deployment.

## QuickStart Provisioning
Basic configuration parameters are encoded within an encrypted file. For each node, a custom file is generated and minimally contains the following configuration encoded parameters:
- WAN IP address, subnet mask and gateway
- Conductor IP address
- Asset ID

Upon node startup, the data is passed (through a Web browser interface) directly to the 128T node LAN IP interface address and decoded within the running node software. The node is dynamically configured with the correct addressing and Conductor assignment and restarted to download the final configuration.  Upon restart, the node establishes outbound connectivity with the Conductor and dynamically joins the 128T topology as a pending or fully managed asset.

## Before you Begin

Ensure that you have met the following prerequisites:

- 128T Conductor operationally deployed and reachable by router
- System installed with 128T software
  :::info
  If do not have 128T already installed on a platform, you can follow [this procedure](intro_creating_bootable_usb.md)
  :::
- 128T Router has one or more WAN links

This diagram is one possible topology for a standalone 128T deployed at the edge of the network.

![QuickStart network diagram](/img/intro_ztp_quickstart_network_diagram.png)

## Procedure

The rest of this guide will walk you through setting up a typical standalone branch router leveraging the QuickStart capabilities of the 128T Networking Platform.

### 128T Configuration

The 128T router will need to be provisioned a priori on the conductor.  This procedure presumes you are familiar with the [concepts](concepts_glossary.md) and [configuration](config_basics.md) of the 128T platform.

When a router configuration has been added to the conductor, but the device has not yet connected, in place of device-specific information, QuickStart instructions will be displayed.

After the configuration has been added to the authority on the conductor:

- On the Conductor, go to the UI to start the QuickStart process for the newly created 128T Router by accessing “Routers” -> “Router Name” -> “QUICKSTART LINK”

![QuickStart Generate QuickStart Link](/img/intro_ztp_quickstart_server_2.png)

Clicking on the generate "QuickStart Link" will present you with a dialog box confirming some basic information about the target platform. Notably the *router name*, *node name*, and *asset ID*.

By default the conductor generates a UUID for the asset ID so as to unqiuely identify the endpoint. It is often desirable to set the asset ID to be that of the serial number of the device for tracking purposes.

:::note
The serial number can be obtained from the device by using `dmidecode`
```
dmidecode -t system | grep Serial
```
If you plan on setting the asset ID to the serial number, now is the time to make that change to the configuration on the conductor.
:::

The *device host address* is the IP address that is assigned to the 128T router during the staging process.  By default this is set to `192.168.0.128`.

A password is used to encrypt the contents of the QuickStart file.  This password will be required when applying the file to the target platform.

<p align="center"><img src="/img/intro_ztp_quickstart_server_3.png" alt="QuickStart Link Generation"/></p>

- Copy the auto generated “Password” (this can be set to a different value)
- Follow step 1 to download the QuickStart file locally by selecting the “Click Here” link
- Plug in the computer that contains the QuickStart file to any ethernet port on the router. Ensure DHCP is enabled on the computer connecting to the router.
- Follow step 2 and click the link to start the QuickStart URL process
- Login locally to the new router with the default username `admin` and password `128Tadmin`
- Drag and drop the QuickStart file and click “Proceed”

![QuickStart file upload](/img/intro_ztp_quickstart_client_1.png)

- Paste the “Password” previously copied to unencrypt the QuickStart file and click “Continue”

![QuickStart Password Field](/img/intro_ztp_quickstart_client_2.png)

- Click “Proceed” to start this process
- Optionally, select the “Show Details” slider to view the full config that will be configured

![QuickStart File Accepted](/img/intro_ztp_quickstart_client_3.png)

- After a couple minutes, this process will complete and your 128T Router will be fully configured.

![QuickStart Working](/img/intro_ztp_quickstart_client_4.png)

- After a few more minutes, the router QuickStart webpage will show a message that the router was successfully configured.

![QuickStart Success](/img/intro_ztp_quickstart_client_5.png)

### Verifying Operation
The 128T router will have connected to the conductor.  The Router page that was previously empty should now be populated with information about the system.  Go to the 128T Conductor UI to verify the process completed for this newly created 128T Router by accessing “Routers” -> “Router Name” -> “Node Name”
- Verify “128T Processes” -> “All Processes Running”
- Verify “Asset Status” -> “RUNNING”
- Verify all 4 interfaces are “Up”

![QuickStart Verification](/img/intro_ztp_quickstart_verification.png)

Congratulations, you have setup your 128T router.