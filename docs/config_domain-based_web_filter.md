---
title: Configuring Domain-Based Services
sidebar: Configuring Domain-Based Services
---

Creating domain-based services allow users to create generic services for a broad range of domains that fall into a category such as “Sports” (i.e.; espn.com, nfl.com, nhl.com, etc.) “Social Media” (Facebook, LinkedIn, etc), “Adult” and others. Categories are populated with known domains associated with the traffic type. Domain learning can be enabled so that the default domains are supplemented with discovered domains in each category. Additionally, users can modify the list of domains in a category. 

Services can be defined based on categories to filter a broad set of related domains. Services can also be assigned to individual domains, and filtering performed in a more targeted manner. 

## Configuring Domain-based Services

Filtering is configured from the GUI, using the Domain Name and Domain Name Category fields. 
![Configuration Fields](/img/dbwf_config_fields.png)

The domain name category field is pre-populated with a default list of categories. Select from the existing categories for each service, or configure specific categories and add domains manually. 

**How does this process work? I have 5.2 installed and did not see the default categories. I created categories, but even after adding them, they do not show up in the drop down to be used for other Services.**

To allow the dynamic learning of domain categories, enable the feature on the Basic Information screen for the service. 

![Generate Application Identification Categories](/img/dbwf_gen_categories.png)

## Default Categories

Use the `show domain-categories` command to display the list in the CLI. The data is stored in the /etc/128technology/application-categories directory. The default categories available for filtering are:

```
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
```

To specify a Domain Name Category in the GUI, enter one of the names above into the Domain Name Category field. Active categories and domains are displayed on the Applications Seen page. Adding a new category or domain in the GUI writes the information to the directory, and is added to the master list. 

The category and domain lists are generated on config. As new categories and domains are added, the config is updated, but the entire list is not regenerated. 

## Configuring Domain-based Services

To enable Domain-based Services, you must configure a broader service under which your child service will nest. In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

The high level steps for configuring Domain-based Services are:

- Create a parent service
- Create a child service to filter
- Configure a Tenant
- Create an access policy on the child service to filter traffic 

### Create a Parent-level Service 
In this example we create a broad service representing the internet.

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

The child service classifies the traffic and provides the option to filter different domains and categories. We will create two services, one of which will be filtered out (denied).

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
A tenant must be configured in order to create an Access Policy.

1.	Select Conductor under Authority.
2.	Select Configuration.
3.	Under Tenants, select ADD.
4.	Give the new Tenant the same name as the access policy you will use to restrict the service, adult.internet *(why does this have to have the same name as the access policy??)*.
5.	Add a description if necessary to identify the tenant.
6.	Click Validate.
7.	Return to the Configuration Home screen.

### Create the Access Policy

Create an access policy on a service to deny (filter) traffic from the indicated domain or category.

1.	Scroll down to services
2.	Select adult.internet
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
        service    sports.internet
            name                  sports.internet
            domain-name-category  Sports
            access-policy         interior.remusers.t128
                source      interior.remusers.t128
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

If Learning Mode is not enabled, statistics are only gathered for categories/domains that are configured in a service.

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

Domain names are displayed on the Applications Seen page available on the Routers page, using the link in the top right corner. 

![Select Applications Seen](/img/dbwf_appl_seen.png)

