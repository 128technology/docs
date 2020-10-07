---
title: Configure the Conductor
sidebar: Configure the Conductor
---
 
The 128T Conductor is a 128T instance that is used to manage the 128T Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, and analytics. 

The Authority is where system-wide data is stored. Conceptually, the Authority represents the complete set of all 128T Routers managed under a single organizational entity. Service configuration, which represents the cornerstone of the 128T Router’s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Each Authority is uniquely named, in the same way a domain name is unique.

To complete a base configuration of the Conductor, name the Authority, and configure the web server as a service.

### Name the Authority
1. Log in to the GUI for your Conductor.
2. Select **Configuration**.
3. Select Authority and change the Authority Name to a unique identifier for your system.
4. Select **Validate** and then **Commit**.

### Configure the Web Server as a Service 
1. From the Configuration screem, select **Services**.
2. Select **Add** and enter the name of the webserver for the service. 
3. Set **Enabled** to True.
4. Set **Scope** to Public.
5. Enter the IP Address of the webserver in the Service Address field.
6. Select **Validate** and then **Commit**.

### Create the Tenant

Tenancy is the logical partitioning of a network’s resources to restrict access to network services to only the users and groups for which they’re intended. Tenants are defined within an *Authority*, and span each router within that authority. An example of how tenants are used would be to segregate two distinct user populations within an organization; e.g., "developers" from "administrators."
In the steps below, we provide an example tenant name, _dallas.corp_, which is used in the [Basic Router Configuration](intro_basic_router_config.md) procedure that follows.

1.	Log in to the Conductor GUI.
2.	Select Configuration.
3.	Select Tenants, and create the tenant _dallas.corp_. 
4.	Return to the top level. 

For more information about Tenancy, please see [Tenancy Design](bcp_tenants.mdx).