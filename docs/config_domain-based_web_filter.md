---
title: Web Filtering
sidebar: Web Filtering
---

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.0.0   | Application categorization and Domain Filtering introduced |
| 5.5.0   | Support for Enhanced Web Filtering added |

## Overview

Web filtering allows administrators to prevent access to dangerous, malicious, or inappropriate internet content. Services are created to handle traffic using the following set of configuration elements:

- url
- domain-name
- subcategory
- category

Web filtering extracts the full URL as http traffic traverses the router, allowing a targeted approach to filtering. Additionally, web filtering provides domain classification using third party data sources to generate a comprehensive, real time, and up-to-date worldwide database for categorizing domains and URLs.

:::note
Web Filtering is a separate, optional feature, available through the purchase of a Web-Filtering license. For information about activating this powerful feature, please contact Customer Support or your Sales Engineer.
::: 

### Basic Configuration

- Configure `application-identification` and `web-filtering`
- Configure or edit a child service to block the content

#### Example Config

Configure `application-identification` mode `all` and enable `web-filtering`:

```
config
    authority
              router  office
                name      office
                application-identification
                  mode  all
                  web-filtering
                      enabled true                   
                exit
              exit
    exit
exit
```

Create a child service with an `access-policy` to restrict traffic:

```
config
    authority
        service      internet
            name                internet
            description         "The INTERNET"
            address             0.0.0.0/0
            access-policy       lan
                source  lan
                permission allow
            exit
        exit
        service  block.internet
            name                block.internet
            description         "Block certain content"
            domain-name-category    Sports
            access-policy       lan
                source      lan
                permission  deny
            exit
        exit
exit

```

## How it Works

The SSR maintains a cache of the most frequently used domains and URLs. As clients request URLs over HTTP, the SSR compares the request to the cache. If a requested URL is matched to one in the cache, then the information configured for the Category is used - allow or block. If the requested URL does not exist in the cache, the SSR makes a secure, authenticated, and asynchronous query to the Websense ThreatSeeker Cloud service for categorization of the URL. 

- While waiting for a response to the categorization query, the SSR will drop packets for the request. Clients are expected to retransmit the request. If a configurable threshold of retransmissions is hit, the SSR will give up on categorization and allow the session.
- When a response is received, the cache is updated, and the category information in the service policy is applied.

### Configuring Web Filtering using the PCLI

Web Filtering is enabled on the router through [Application Identification](config_app_ident.md). The mode must be set to `all`, and `web-filtering` must be `enabled true` as shown above. A child service is then created with an allow or deny action for the domain category. 

The high level steps for configuring Web Filtering are:

- Enable `application-identification mode all`
- Enable web filtering
- Create a parent service
- Create the child service to be filtered
- Create an access policy on the child service to filter traffic 

In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

#### Configure `application-identification` 

```
config
    authority
              router  office
                name      office
                application-identification
                  mode  all
                  web-filtering
                      enabled true                   
                exit
              exit
    exit
exit
```
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

## Service Matching Order

When matching a session to a service, the list below represents the priority order in which the service resolution is performed. 

- URL
- domain-name
- subcategory
- category

The SSR obtains the category and subcategory for the URL and domain from Websense, which is then used for the service matching algorithm described below. 

For example, on the URL: http://www.google.com/doodles/doodle-champion-island-games-september-05, matching will be performed in the following order. 

1.  Does any child service URL list contain a match for this URL, including any wild-card patterns for URLs? 
- Yes, the following child service matches the URL:

```
     service  google-doodle.internet
            name                google-doodle.internet
            description         "No doodling at work"
            url                 http://www.google.com/doodles/*

            access-policy       lan
                source      lan
                permission  deny
            exit
        exit
```

2. If there was no match to the first query, then does any child service match the domain in the URL? 
- Yes, the following domain based service matches the URL:

```
        service  google.internet
            name                google.internet
            description         "No searching at work"
            domain-name             *google.com

            access-policy       lan
                source      lan
                permission  deny
            exit
        exit
```

3.  If there was no match to query 2, then is there a child service which contains the subcategory Search Engines and Portals ? 
- Yes, the URL matches a sub-category called *Search Engines and Portals* within the category of **Technology**.

```
        service  search.internet
            name                search.internet
            description         "No searching at work"
            subcategory             Search Engines and Portals

            access-policy       lan
                source      lan
                permission  deny
            exit
        exit
```

4.  And finally, if there is no match to query 3; is there a child service which matches category Technology? For example:

```
        service  technology.internet
            name                technology.internet
            description         "Technology is okay at work"
            domain-category         Technology

            access-policy       lan
                source      lan
                permission  allow
            exit
        exit
```
In this case, `google.com` does not fall into the category of Technology.

### Matching Order Algorithm

The matching order algorithm is the same for scenarios when all the web filtering config options are used across different child services under the parent, or used on the same child service. For example, consider the following service:

```
        service  block-search.internet
            name                search.internet
            description         "No searching at work"
            url                 http://www.google.com/doodles/*
            domain-name         *google.com
            subcategory         Search Engines and Portals

            access-policy       lan
                source      lan
                permission  deny
            exit
        exit
```
The `block-search.internet` child service will match the various URLs as follows:

| URL | Match Type | Description |
| --- | --- | --- |
| http://www.google.com/doodles/doodle-champion-island-games-september-05 | By URL<br /> http://www.google.com/doodles/* | The wild-card URL is the best match in this case. |
| http://www.google.com | By domain *google.com | The URL is not a match, but the domain is and the overall child service is a match as a result. |
| http://www.bing.com | By subcategory Search Engines and Portals. | The URL matches neither the configured URL or domain pattern, however, it is a Search Engine and matches the child service. |

## Configuring Web Filtering using the GUI

To enable Web Filtering, configure application identification, a parent service, a child service, and access policies to allow or deny traffic. In many cases, you may have pieces of this procedure already in place, such as  the *internet* service configured as an example below. 

The high level steps for configuring web filtering are:

- Create a parent service
- Create the child service
- Configure a Tenant
- Create an access policy on the child service to filter traffic 

The following procedures describe configuring web filtering from the GUI. An example of the PCLI configuration is also shown.

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

### Create the Child Service 

The child service classifies the traffic and provides the option to filter different domains and categories.

#### Create the child service 
1.	In the Services panel, select ADD.
2.	Create a new service, `adult.internet`.
3.	On the Service screen, verify that Enabled is set to **true**.
4.	Set Scope to private.
5.	Scroll down to the Domain Name Category field, click ADD and select/add the domain category, Adult. 

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

## Show Commands

The following show commands can be used from the CLI to display the list of domains and domain categories available and in use for web filtering. 

- `show domain-name`: Displays a list of the domain names.
- `show domain-categories`: Displays the list of categories shown [above.](#domain-categories)
