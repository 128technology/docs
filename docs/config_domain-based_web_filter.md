---
title: Configuring Domain-Based Web Filtering
sidebar: Configuring Domain-Based Web Filtering
---

Domain-Based Web Filtering is the ability to categorize internet traffic based on the domain name or a domain category. This provides the option for users to create generic services for a broad range of domains that fall into a category such as “Sports” (i.e.; espn.com, nfl.com, nhl.com, etc.) “Social Media” (Facebook, LinkedIn, etc), “Adult” and others. Each category is pre-populated with a list of domains associated with the traffic type. Domain learning can be enabled so that the default domains are supplemented with discovered domains in each category. Additionally, users can modify the list of domains in a category. 

Services can be defined based on categories to filter a broad set of related domains. Services can also be assigned to individual domains, and filtering performed in a more targeted manner. 

## Configuring Domain-Based Web Filtering

Filtering is configured from the user interface, using the Domain Name and Domain Name Category fields. 
![Configuration Fields](/img/dbwf_config_fields.png)

The domain name category field is pre-populated with a default list of categories. Select from the existing categories for each service, or configure specific categories and add domains manually. 

**How does this process work? I have 5.2 installed and did not see the default categories. I created categories, but even after adding them, they do not show up in the drop down to be used for other Services.**

To allow the dynamic learning of domain categories, enable the feature on the Basic Information screen for the service. 

![Generate Application Identification Categories](/img/dbwf_gen_categories.png)



## Show Commands

The following show commands can be used from the CLI to display the list of domains and domain categories available and in use for Domain based web Filtering. 

*These commands do not return any default information, or newly added categories or domains.*

`show domain-name`:
`show domain-categories`: 

*Need examples of the show commands and descriptions of what is displayed.*

Domain names are displayed on the Applications Seen page available on the Routers page, using the link in the top right corner. 

![Select Applications Seen](/img/dbwf_appl_seen.png)

## Default Categories

The default categories available for filtering are:

*This list does not display in the UI as indicated below*

The Domain Name Category dropdown provides a list of the default categories. Active categories and domains are displayed on the Applications Seen page. Adding a new category or domain in the GUI writes the information to the directory, and is added to the master list. 

Use the show domain-categories command to display the list in the CLI. The data is stored in the /etc/128technology/application-categories directory. 

The category and domain lists are generated on config. As new categories and domains are added, the config is updated, but the entire list is not regenerated. 

## Configuring Domain-based Web Filtering

To enable Domain-based Web Filtering, you must configure a broader service under which your child service will nest. In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

The high level steps for configuring Domain based web filtering are:

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
5.	Set share service routes to **true**.
6.	Set Generate Application Identification Categories to **true**.
7.	Scroll down to the Domain Name Category field, click ADD and select/add the domain category, Adult. 

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

*Where are the Learning Mode statistics/information available?* 

If Learning Mode is not enabled, statistics are only gathered for categories/domains that are configured in a service.


