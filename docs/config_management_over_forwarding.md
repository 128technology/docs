---
title: Management Traffic over Forwarding Interfaces
sidebar_label: Management over Forwarding
---

Management traffic is any service that makes direct contact to another asset, either to retrieve or interface with the configuration and status of hardware components (conductor to router), the core operating system (NTP), features of user interfaces to the OS (DNS), or the business application, sometimes taking subsequent action to maintain or change configurations. All actions ultimately provide underlying support to the service being delivered by the managed resource to its users. Access is typically controlled via a set of privileges and will usually allow either modification and/or viewing of sensitive system configurations. Management traffic includes three categories: management, monitoring, and data backups and restores.

Networking equipment's management traffic typically traverses a separate physical interface for the purposes of network isolation and policing.

Depending on the nature and size of a deployment, the hardware platform may not have the required number of physical interfaces to separate management traffic. In these cases, the forwarding WAN interface can be leveraged for management traffic.

## Benefits

When using a separate [non-forwarding](concepts_interface_types.md) interface for management traffic, packet forwarding is managed by Linux's routing table. Leveraging the SSR's native routing capabilities for management traffic provides additional security, segmentation and advanced routing policy.

When provisioning management traffic to traverse forwarding interfaces, those interfaces will continue to be available for management related functions (e.g., ssh) even when the SSR is not running, yet will still be protected by firewall rules that match the respective policy. This is particularly important during maintenance operations when the SSR software is taken offline for an upgrade.

:::warning
Once a forwarding interface is provisioned for management traffic, any existing OS configuration for that interface such as ifcfg and firewall rules will be overwritten to match the SSR configuration.
:::

## Management Services

One of the strengths of the SSR data model is to dynamically apply policy only as needed. As it relates to management traffic, service policy will only be created for those management applications provisioned. The list of applications natively supported are:

* [Conductor traffic](concepts_machine_communication.md#router-to-conductor-connectivity). This works in tandem with [conductor services](bcp_conductor_deployment.md)
* [Web server access](config_reference_guide.md#webserver)
* [PCLI/SSH](config_reference_guide.md#address)
* [DNS](#dns) traffic for FQDN resolution
* [NTP](config_reference_guide.md#ntp)
* [Software Updates](config_reference_guide.md#repository)
* [SNMP](config_reference_guide.md#snmp-server)
* [Syslog](config_reference_guide.md#syslog)
* [IPFIX](config_reference_guide.md#syslog)

## Configuration

When enabled, a default route will be configured in Linux's routing table to send all traffic to the interface [`kni254`](concepts_kni.md), which is the pathway into the SSR packet forwarding engine. Thus, standard SSR forwarding rules apply: any traffic originated by the host operating system that does not match a configured service will be dropped. Services and corresponding service routes are automatically created for the applications listed [above](#management-services).

:::important
Because a default route is added in Linux, all traffic not captured by a static route, will be sent to the SSR. This means that the traffic will either be dropped, or match an existing service and route.
:::

For each of the [management services](#management-services) configured, the SSR will automatically generate corresponding `service` and `service-route` configurations for forwarding the respective traffic. The generated configuration objects will all start with the prefix `_management_`.

Each of the service and service-routes share one important attribute: they are created with the `generated` flag set to `true`. If you want to make any modifications to the generated services, you must first set `generated` to `false`, or else your configuration changes will be stripped upon the next time the configuration is committed. For more information on configuration work-flows involving the `generated` flag, refer to the [128T software documentation](config_basics.md#generated-configuration).

:::note
`management` interfaces cannot be used on device-interface types of `host` or `bridge`.
:::

### DNS

DNS servers can be configured within `authority > router > dns-config > address` in one of two ways:

* `automatic` - if the management interface is configured for DHCP, then the DNS server(s) learned through the DHCP lease are used
* `static` - up to two DNS server addresses can be configured
  :::note
  These addresses are assumed to be reachable via the configured management interface(s).
  :::

If static DNS servers are configured and a network-interface is configured to obtain its address via DHCP, the DNS servers learned through the lease are ordered after any statically defined entries.

:::note
Configuring `dns-config > address` is required, however setting `dns-config > address` to `automatic` is only allowed when a management interface is enabled for DHCP.
:::

### Management Vectors

When provisioning multiple management interfaces, a _management vector_ is used to provide preference amongst the interfaces.

When the SSR service is not running, a default route is created for the interface configured as management with the lowest metric (if multiple management interfaces are configured).

For example, the following SSR configuration:
```
network-interface  wan1-intf
    name               wan1-intf
    conductor          true
    default-route      true
    source-nat         true
    management         true
    management-vector
        name      mgmt-vec-1
        priority  20
    exit
exit
```

Will produce the corresponding configuration within Linux:
```
# ip route
default dev wan1-intf scope link metric 20
```

### Utility Address

Management interfaces can be configured for redundancy between nodes of a HA pair by provisioning `authority > router > node > device-interface > shared-phys-address`. If the interface is redundant and management, a `authority > router > node > device-interface > network-interface > address > utility-ip-address` is required on the network-interface. This address is assigned to the Linux interface when SSR is not running with the original MAC address, not the virtual `shared-phys-address` from SSR configuration. The `utility-ip-address` must be unique per node across the router.


### Sample Configuration

```
config
    authority
        conductor-address  192.168.1.12
        router             Router1
            name                      Router1
            dns-config                automatic
                mode              automatic
            exit
            node                      Node1
                name              Node1
                device-interface  node1-mgmt
                    name               node1-mgmt
                    type               ethernet
                    pci-address        0000:00:03.0
                    forwarding         true
                    network-interface  node1-mgmt-intf
                        name               node1-mgmt-intf
                        global-id          3
                        conductor          true
                        default-route      true
                        source-nat         true
                        management         true
                        management-vector
                            name      mgmt-vec-1
                            priority  20
                        exit
                        dhcp               v4
                    exit
                exit
            exit
        exit
    exit
exit
```

:::important
`router > node > device-interface > network-interface > source-nat` must be set to `true` when using management over forwarding since all management traffic will originate from `169.254.x.x`.
`router > node > device-interface > network-interface > default-route` must also be set to `true` to ensure that Linux uses the network interface as its preferred route for traffic originating from the host OS.
:::

### User Defined Services

For any other service not defined by the default management services list, the user can configure a _service_ to best suit their needs. It is necessary to configure the [_internal_](bcp_tenants.mdx#the-internal-tenant) tenant within the `access-policy` of the service to allow traffic originating from the Linux host.
