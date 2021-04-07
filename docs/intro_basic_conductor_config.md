---
title: Configure the Conductor
sidebar: Configure the Conductor
---
 
The 128T Conductor is a 128T instance that is used to manage the 128T Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the 128T routers. 

The Authority is where system-wide data is stored. Conceptually, the Authority represents the complete set of all 128T Routers managed under a single organizational entity. Service configuration, which represents the cornerstone of the 128T Router’s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Each Authority is uniquely named, in the same way a domain name is unique.

Use the steps below to complete a base configuration of the Conductor.

### Name the Authority
1. Log in to the GUI for your Conductor.
2. Select **Configuration**.
3. Select Authority and change the Authority Name to a unique identifier for your system.
4. Select VALIDATE and then COMMIT.

### Create a Service
The *service* configuration element is the cornerstone of the 128T data model. It is what allows administrators to describe eligible destinations for traffic, and subsequently define access controls, routing policy, and traffic treatment. 

Each IP destination that will receive traffic must be configured as a *service*. A service can be defined as broadly as a netmask or as specific as a transport protocol and single port. This example creates a service representing the entire internet, as 0.0.0.0/0.

1.	Log in to the Conductor GUI.
2.	Select Configuration.
3.	Scroll down to Services.
4.	Select ADD next to Services.
5.	Name the service *internet*, and select SAVE.
6.	On the **Service** screen, verify that **Enabled** is set to *true*.
7.  Set **Scope** to *public*.
8.  Scroll down to Service Addresses and select ADD.
9.  Enter the IP address 0.0.0.0/0, and select SAVE.
10. At the top of the screen, select VALIDATE and then COMMIT. 

For a more in-depth look at Services, please see [Service and Service Policy Design](bcp_service_and_service_policy_design.md).

### Create the Tenant

Tenancy is the logical partitioning of a network’s resources to restrict access to network services to only the users and groups for which they’re intended. Tenants are defined within an *Authority*, and span each router within that authority. An example of how tenants are used would be to segregate two distinct user populations within an organization; e.g., "developers" from "administrators."
In the steps below, we provide an example tenant name, _corp_, which is used in the [Basic Router Configuration](intro_basic_router_config.md) procedure that follows.

1.	Log in to the Conductor GUI.
2.	Select Configuration.
3.	Select ADD next to Tenants, enter name _corp_ and select SAVE. 
4.	Return to the top level. 
5.	At the top of the screen, select VALIDATE and then COMMIT.

For more information about Tenancy, please see [Tenancy Design](bcp_tenants.mdx).
For more information about configuring and deploying conductors, please see [conductor Deployment](bcp_conductor_deployment.md).
