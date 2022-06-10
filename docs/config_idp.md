---
title: Configure Intrusion Detection and Prevention
sidebar_label: Configure IDP
---

In a typical network deployment, there is always a mix of trusted and untrusted traffic. The administrator specifies the services and tenants that receive IDP treatment, and which IDP policy to apply to the traffic. 

By configuring the `idp-policy` at the `access-policy` level, the same service can receive different IDP treatment for different tenants. 

In the following example, all internet traffic originating from the `corporate` tenant idenfied as malicious or threatening receives a `strict` policy enforcement. Traffic originating from the `guest` tenant that is idenfied as malicious or threatening only triggers alerts. This means that the same threat entering two different network segments receives different treatment, allowing the administrator to enforce the right level of protection based on corporate policies.

### Configuration

In the following example configuration, three access policies are defined for the service `internet`.


```
config
    authority
        service  internet
            name           internet
            address        0.0.0.0/0

            access-policy  corporate
                idp-policy  strict
                source      corporate
                permission  allow
            exit

            access-policy  guest
                idp-policy  alert
                source      guest
                permission  allow
            exit

            access-policy  other
                source      other
                permission  allow
            exit
        exit
    exit
exit

```


It is also important to control the amount of traffic flowing through the IDP engine, as there are system constraints around performance and bandwidth. Intrusion detection is a resource intensive operation and the configuration and expectations must reflect these limitations. (How does one do this? Need to add this info.)

### Tenant Configuration

IDP requires clear association of subnet to tenant; it is best to define the association as tenant-prefix:

```
config
    authority
        service  internet
            name           internet
            address        0.0.0.0/0

            access-policy  corporate
                idp-policy  strict
                source      corporate
                permission  allow
            exit
        exit

        tenant  corporate
            name    corporate
        exit

        router  idp 
            name  idp 

            node  node
                name              node

                device-interface  corp-lan
                    name               corp-lan

                    network-interface  corp-lan
                        name                   corp-lan
                        global-id              7

                        tenant-prefixes        corporate
                            tenant          corporate
                            source-address  172.16.3.0/24
                        exit
                        address                172.16.3.3
                            ip-address     172.16.3.3
                            prefix-length  24
                        exit
                    exit
                exit
            exit
        exit
```

## Core Requirements 

The SSR IDP engine requires a dedicated core. When the SSR is configured with  `forwarding-core-mode` as automatic, the system automatically assigns cores based on the hardware type, as well as an additional core for IDP. 

When the router is configured with `forwarding-core-mode` as manual, the administrator must account for the `forwarding-core-count` to include IDP core. For an HA router, each node follows the above scheme.
:::note
The system requires a reboot for the IDP core allocation; after upgrading to SSR 6.x for the first time, an additional reboot is required to enable the IDP engine.
:::

## High Availability

The IDP engine runs on each node of the system. Traffic is always sent to the IDP instance on the first node - per the order in configuration. Upon failover, the existing sessions do not gracefully failover; the TCP sessions are reset, and new sessions must be established by the client. For UDP sessions, the same best effort behavior can be expected from the IDP engine.


