---
title: Application Steering
sidebar_label: Application Steering
---

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 6.1.4   | Application Steering introduced |

Application Steering provides the ability to configure unique steering policies for individual applications based on the application name, category, application signatures, URLs, and domains. In addition, Application Steering is available for configurations where multiple applications point to the same port and destination. 

### Define the Application in the Service

During the service configuration, applications are simply identified by name, for example `Facebook`. If the application is not in the application database, an error is generated.

<!--- need Reid's clarification of this statement; not sure how this will be handled.
The application database is updated on a regular basis/a static database and is updated when the software version is updated. (Or we just say it is periodically updated, or we don't say anything) ---->

To steer the application, you can configure an access-policy to allow or deny the traffic, and a service-route to steer the traffic to a specific interface or next hop. 

The following steps show configuring services, access policies, and service routes using only application names, and steering them to interfaces and specific next hops.  

1. Configure a service for the internet:
```
service internet
    name internet
    address 0.0.0.0/0
```
2. Configure access policies
```
    access-policy corp
      source corp

    access-policy corp
      source guest
```
3. Configure a service for the application you wish to steer, in this case we use Facebook, and an access policy that will not allow the application on the corporate network.

```
service facebook.internet
    name facebook.internet
    application-name facebook

    access-policy corp
      source corp
      permission deny    
```
4. Configure a service and an access policy for the Workday application, which will be allowed on the corporate network.
``` 
service workday.internet
    name workday.internet
    application-name Workday

    access-policy corp
      source corp
      permission allow
```

### Child Services

Beginning with version 6.1.4, service routes can be configured on child services allowing sessions to be re-routed accordingly. The following example shows child services configured using application names, and steered to specific interfaces and next hops.

```
router myRouter
  name myRouter
  service-route   internet-rte
      name  internet-rte
      service-name  internet

      next-hop  node1 broadband
        node node1
        interface broadband

      next-hop  node1 lte
        node node1
        interface lte        

  service-route workday.internet__headend
      name  workday.internet__headend
      service-name workday.internet
      peer   headend
```

## Category-based Steering

In addition to application based steering, traffic can be routed based on the application category. For example, steering all `social-media` traffic over `broadband` and the remaining internet traffic to the headend. 

```
service social-media.internet
    name social-media.internet
    domain-name-category social-media

    access-policy guest
      source corp
      permission allow

router myRouter
  name myRouter
  service-route   social-media-rte
      name  social-media-rte
      service-name  social-media.internet
     
      next-hop  node1 broadband
        node node1
        interface broadband

service-route internet-rte
   name internet-rte
   service-name internet
   peer headend
```