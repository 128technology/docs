---
title: Domain-based Routing and Application Identification
sidebar: Domain-based Routing and Application Identification
---

## Overview

Domain-based Routing allows users to create generic services for a broad range of domains that fall into a categories such as “Sports” (i.e.; espn.com, nfl.com, nhl.com, etc.) “Social Media” (Facebook, LinkedIn, etc), “Adult” and others. Categories are populated with known domains associated with the traffic type. Domain learning can be enabled so that the default domains are supplemented with discovered domains in each category. Additionally, users can modify the list of domains in a category. 

Services can be defined based on categories to filter a broad set of related domains. Services can also be assigned to individual domains.

## Configuring Domain-based Routing

Domain-based Web Filtering is enabled on a child service. In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

The high level steps for configuring Domain-based Routing are:

- Create a parent service
- Create the child service to be filtered
- Create an access policy on the child service to filter traffic 

#### Create the Parent Service

```
config
    authority
        service     internet
            name          internet
            scope         public
            address       0.0.0.0/0
        exit
    exit
exit
```

#### Create the Child Service
The following example uses the domain category to classify traffic.
```
config
    authority
        service       adult.internet
           name            adult.internet
           domain-name-category    Adult 
        exit
    exit
exit
```
#### Configure the Access Policy
Configure the access-policy to block (deny) traffic.

```
config
    authority
        service    adult.internet
            name                  adult.internet
            domain-name-category  Adult
            access-policy         adult.internet
                source      adult.internet
                permission  deny
            exit
        exit
    exit
exit

```

## Domain Categories

Listed below are the default set of SSR domain categories, which apply to all data sources on the system. These categories are not blocked by default, nor are they considered threatening, but represent a list of categories of information. Individual services and service policies can be configured on the SSR to allow or deny access to the category, or domains within a category. 

- Adult
- Advertisement
- ArtsAndEntertainment
- Business
- CareerAndEducation
- Collaboration
- Conferencing
- DeviceIoT
- FileSharing
- Financial
- Gambling
- Games
- Government
- Healthcare
- Illegal
- Infrastructure
- Malware
- Miscellaneous
- Networking
- NewsAndReference
- Recreation
- RemoteDesktop
- Search
- Security
- Shopping
- SocialMedia
- SoftwareUpdates
- Sports
- StreamingMedia
- Technology
- Travel
- Weapon

Active categories and domains are displayed in the GUI on the Applications Seen page. Use the link on the top right corner of the Routers page to view the applications available on the Routers page. 

![Select Applications Seen](/img/dbwf_appl_seen.png)

## Application Identification

Application Identification allows you to automatically generate category-based application identification services under a service. It also will automatically learn, identify, and classify applications processed by the SSR and store them in the [web filtering cache](config_web_filtering.md). 

#### Modes

- **module:** The 128T router uses an external module for application classification. The 128T expects classification modules to be installed on the system in /var/etc/128technology/application-modules. (These modules are supplied by 128 Technology.)
- **tls:** The system inspects X.509 certificates exchanged during the TLS handshake to look for Common Name elements to identify applications. 
- **http:** The SSR will learn applications via HTTP host name parsing. 
- **all:** Includes all modes. To use the [web filtering feature](config_web_filtering.md), `application-identification` must be set to **all**. 

By default, Application Identification automatically downloads updated domain and application datatsets weekly. The defaults (shown below) can be adjusted as necessary using the Application Data Updates panel or from the PCLI for each router. For additional information, see [application-identification in the Element Reference section.](config_reference_guide.md#application-identification)

![Application Data Updates](/img/dbwf_app-id_updates.png)

## Configuring Domain-based Routing

To enable Domain-based Routing, configure a parent service, a child service, and access policies to allow or deny traffic. In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

The high level steps for configuring Domain-based Web Routing are:

- Create a parent service
- Create the child service to be filtered
- Configure a Tenant
- Create an access policy on the child service to filter traffic 

The following procedures describe configuring domain based filtering from the GUI. An example of the PCLI configuration is also shown.

### Create a Parent-level Service 
Create a broad service representing the internet.

1. Log in to the Conductor GUI.
2. Select Configuration.
3. Scroll down to Services.
4. Select ADD next to Services.
5. Name the service internet, and select SAVE.
6. On the Service screen, verify that Enabled is set to true.
7. Set Scope to public.
8. To generate Application Identification Categories, set the toggle to True.
9. Scroll down to Service Addresses and select ADD.
10. Enter the IP address 0.0.0.0/0, and select SAVE.
11. At the top of the screen, select VALIDATE.

```
config
    authority
        service  	internet
            name          internet
            scope         public
            address       0.0.0.0/0
        exit
    exit
exit
```

### Create Child Services 

The child service classifies the traffic and provides the option to filter different domains and categories. We will create two services, the second will be filtered out (denied).

#### Create the first service

1.	In the Services window, select ADD.
2.	Name the first service `netflix.internet`
3.	On the Service screen, verify that Enabled is set to **true**.
4.	Set share service routes to **true**.
5.	Scroll down to Domain Name and enter the domain name using a wildcard to allow identification of all domain names; `*.netflix.com`.
6.	In the Domain Name Category field, click ADD and select/add the domain category, Entertainment.

#### Create the second service, the one to be filtered 
1.	In the Services panel, select ADD.
2.	Create a new service, `adult.internet`.
3.	On the Service screen, verify that Enabled is set to **true**.
4.	Set Scope to private.
5.	Scroll down to the Domain Name Category field, click ADD and select/add the domain category, Adult. 

```
config
    authority
        service  	netflix.internet
           name       	netflix.internet
           domain-name             *.netflix.com
           domain-name-category    Entertainment
        exit
        service       adult.internet
           name            adult.internet
           domain-name-category    Adult 
        exit
    exit
exit
```

### Configure the Tenant
A tenant must be configured in order to create an Access Policy. If you have not already configured a tenant for the service, refer to [Create the Tenant](intro_basic_conductor_config.md#create-the-tenant) in the Conductor Configuration documentation.

### Create the Access Policy

Configure the access-policy to deny access to the domain category.

1.	Scroll down to services.
2.	Select adult.internet.
3.	In the Basic Information panel, set the Tenant to adult.internet.
4.	Scroll down to Access Policies and click ADD.
5.	In the Source field, enter adult.internet (name of the service).
6.	In the permission field, select deny.
7.	Click Validate.
8.	Return to the Configuration Home screen.
9.	Click Commit.

```
config
    authority
        service    adult.internet
            name                  adult.internet
            domain-name-category  Adult
            access-policy         adult.internet
                source      adult.internet
                permission  deny
            exit
            access-policy         home
                source      home
                permission  deny
            exit
        exit
    exit
exit

```

## Configuring Learning Mode

Learning mode is used to gather statistics about a domain or category. You can select the type of information to be gathered; Modules, HTTPS, TLS, or All. 

To configure Learning Mode via the GUI:
1. Select a router.
2. Scroll down to Router Settings and click Application Identification Settings.

![Application ID Setting Button](/img/config_app_learning1.png)

3. Set `enabled` to `true`.

![App ID Basic Info](/img/config_app_learning2.png)

4. Under Application Identification, select ADD.
5. Select a type of application to identify. In most cases, selecting `all` will provide the best data set.

![App Id Dropdown](/img/config_app_learning3.png)

6. Validate and Commit the changes. 

If Learning Mode is disabled, statistics are only gathered for categories/domains that are configured in a service.

## Show Commands

The following show commands can be used from the CLI to display the list of domains and domain categories available and in use for Domain based web Filtering. 

`show domain-name`:
```
admin@node1.test-home# show domain-names
Thu 2021-06-24 22:03:28 EDT

Retrieving from 'node1.test-home'...
Node: node1.test-home Page 1

=================================== =============== ================= =====================
 Domain                              Session Count   Category          Last Updated
=================================== =============== ================= =====================
 ps16.pndsn.com                                 44   <Uncategorized>   2021-06-24 21:37:52
 ps17.pndsn.com                                 40   <Uncategorized>   2021-06-24 21:37:52
 ps9.pndsn.com                                  39   <Uncategorized>   2021-06-24 21:37:53
 ps3.pndsn.com                                  36   <Uncategorized>   2021-06-24 21:37:52
 ps14.pndsn.com                                 36   <Uncategorized>   2021-06-24 21:37:52
 ps6.pndsn.com                                  30   <Uncategorized>   2021-06-24 21:37:52
 ps7.pndsn.com                                  20   <Uncategorized>   2021-06-24 22:01:26
 ps4.pndsn.com                                  20   <Uncategorized>   2021-06-24 21:37:52
 ps15.pndsn.com                                 20   <Uncategorized>   2021-06-24 21:37:52
 ps1.pndsn.com                                  20   <Uncategorized>   2021-06-24 21:37:52
 ps2.pndsn.com                                  10   <Uncategorized>   2021-06-24 21:37:52
 ps18.pndsn.com                                 10   <Uncategorized>   2021-06-24 21:38:15
 ps13.pndsn.com                                 10   <Uncategorized>   2021-06-24 21:38:06
 api-ws.mistsys.com                              3   Technology        2021-06-24 21:37:54
 wss-primary.slack.com                           2   Business          2021-06-24 21:37:53
 mtalk.google.com                                2   Conferencing      2021-06-24 07:49:11
 ep-terminator-staging.mistsys.net               2   Technology        2021-06-24 20:44:12
 mistsys.atlassian.net                           2   Technology        2021-06-24 21:37:53
 beacons.gvt2.com                                1   Business          2021-06-24 22:01:15
 *.immedia-semi.com                              1   DeviceIoT         2021-06-23 09:29:52
 status-integration.mistsys.com                  1   Technology        2021-06-24 21:37:55
 ssl.gstatic.com                                 1   Business          2021-06-24 22:00:21
 slackb.com                                      1   Business          2021-06-24 22:00:21
 slack.com                                       1   Business          2021-06-24 21:38:21
 skydrive.wns.windows.com                        1   Business          2021-06-24 21:38:08
 push.services.mozilla.com                       1   Business          2021-06-24 21:37:59
 addon-juniper.goskope.com                       1   <Uncategorized>   2021-06-24 21:37:55
 alive.github.com                                1   Technology        2021-06-24 21:37:54
 beacons.gcp.gvt2.com                            1   Business          2021-06-24 22:00:21
 beacons3.gvt2.com                               1   Business          2021-06-24 22:03:15
 beacons4.gvt2.com                               1   Business          2021-06-24 22:02:15
 courier.push.apple.com                          1   Business          2021-06-24 21:37:53
 gateway-juniper.goskope.com                     1   <Uncategorized>   2021-06-24 21:38:01
 github.com                                      1   Computers         2021-06-24 21:38:32
 gs-loc.apple.com                                1   Business          2021-06-24 21:38:37
 ibm.lakesidesoftware.com                        1   <Uncategorized>   2021-06-24 21:41:54
 lp-push-server-770.lastpass.com                 1   Business          2021-06-24 21:37:57

Completed in 0.09 seconds
```

`show domain-categories`: 
```
admin@node1.test-home# show domain-categories
Thu 2021-06-24 22:03:45 EDT
✔ Retrieving domain-name categories...

Node: node1
================= =============== ===================
 Category          Session Count   Domain-name Count
================= =============== ===================
 <Uncategorized>             403                  16
 Advertiser                    0                   0
 Arts                          0                   0
 Business                     14                  13
 CDN                           0                   0
 Computers                     1                   1
 Conferencing                  2                   1
 Cybersecurity                 0                   0
 DeviceIoT                     1                   1
 FileSharing                   0                   0
 Hosting                       0                   0
 Mail                          0                   0
 Recreation                    0                   0
 Reference                     0                   0
 Search                        0                   0
 SocialMedia                   0                   0
 SoftwareUpdates               0                   0
 StreamingMedia                0                   0
 Technology                   13                   6

Completed in 0.08 seconds
```


