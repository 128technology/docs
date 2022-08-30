---
title: Configure Intrusion Detection and Prevention
sidebar_label: Configure IDP
---

In a typical network deployment, there is always a mix of trusted and untrusted traffic. To prevent against security breaches, the SSR uses the IDP Signature database to identify and take action against malicious traffic. SSR services and tenants are configured to be monitored by the IDP engine, and an IDP policy is applied to the traffic. 

The `idp-policy` has three levels of policy; Alert, Standard, and Strict. These are configured in the `access-policy`, allowing the same service to receive different IDP treatment for different tenants.

In the following example, all internet traffic originating from the `corporate` tenant identified as malicious or threatening receives a `strict` policy enforcement. Traffic originating from the `guest` tenant that is identified as malicious or threatening only triggers an alert. This means that the same threat entering two different network segments receives different treatment, allowing the administrator to enforce the right level of protection based on corporate policies.

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

## High Availability

The IDP engine runs on each node of the system. Traffic is always sent to the IDP instance on the first node - per the order in configuration. Upon failover, the existing sessions do not gracefully failover; the TCP sessions are reset, and new sessions must be established by the client. For UDP sessions, the same best effort behavior can be expected from the IDP engine.


