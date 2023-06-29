---
title: Configure Intrusion Detection and Prevention
sidebar_label: Configure IDP
---

In a typical network deployment, there is always a mix of trusted and untrusted traffic. To prevent against security breaches, the SSR uses the IDP Signature database to identify and take action against malicious traffic. SSR services are configured to be monitored, and an IDP policy is applied to the traffic. 

The `idp-policy` has three profiles that can be applied to an `access-policy`; Alert, Standard, and Strict. This allows the same service to receive different IDP treatment for different tenants. Each profile has an associated traffic action that may include all or some of the following actions:

- Close the client and server TCP connection.
- Drop current and all subsequent packets.
- Alert only, no additional action taken.

In the following example, all internet traffic originating from the `corporate` tenant identified as malicious or threatening receives a `strict` policy enforcement. Traffic originating from the `guest` tenant that is identified as malicious or threatening only triggers an alert. This means that the same threat entering two different network segments receives different treatment, allowing the administrator to enforce the right level of protection based on corporate policies.

## Configuration

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

## Tenant Configuration

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

## Modify IDP Policies and Rules

The following is an example workflow:
- An IDP policy is put in place.
- Security events are triggered because traffic typical for that network configuration is considered a risk.
- Create a custom IDP profile in the Authority Settings configuration that can be referenced in the `access-policy`. 

Using an existing IDP policy, you can modify the profile to allow the specific traffic to flow as expected within the network, for example, modifying the severity or the action. Changes are implemented from the SSR GUI or PCLI, and validated as part of the existing configuration workflow. 

### Configuration

1. Navigate to the IDP Profile feature.
![Add IDP Profile](/img/auth-settings-idp-profiles.png)

2. Click ADD.
3. Enter a Profile Name and click Save. The IDP Profiles configuration screen opens.
![Configure the IDP Profile](/img/idp-profiles.png)

4. In the Base Policy, select an existing policy to modify. 
5. To add exceptions to the rules, select ADD in the Rules field. 
6. Name the New item and click Save. This opens the settings for the new rule.
7. Identify the following items that will be compared for a match:

:::note
To populate and modify the Rules fields shown below, use the information available on the Security Events screen or from the [`show idp-events`](concepts_ssr_idp.md#security-events-dashboard) command.
:::
- Client IP Address prefix
- Destination IP Address
- Vulnerability 
- Severity
- Action Options 

![New Rule Settings](/img/idp-profiles-rules.png)
After creating the custom ruleset, use the `access-policy` as shown in the [Configuration section above](#configuration) to define the IDP policy where this custom ruleset is used. 

:::note
After creating a new ruleset for IDP, the traffic will initially be routed "around" that particular set of rules until it is fully loaded into the IDP engine. Use the `show idp application status` to verify the traffic status affected by the new rule.
:::

#### PCLI Configuration Example

```
        idp-profile      corp-idp-allowed
            name         corp-idp-allowed
            base-policy  standard

            rule         allowed-exceptions-corpidp
                name     allowed-exceptions-corpidp
                  description    Rule to allow traffic exceptions

                match
                    client-address  192.168.10.11/24
                exit

                match
                    vulnerability  PORTMAPPER:INFO:DUMP_PROC
                exit

                outcome
                    action alert
                    severity minor
                exit
            exit
         exit
```         



