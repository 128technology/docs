---
title: Configuration Element Reference
sidebar_label: Element Reference
---

## access-policy (service)

Path:

authority \> service \> access-policy

Description:

Access policies are a multiple instance sub-element within a service configuration. Conceptually akin to an access control list (ACL), access-policy objects are configured to explicitly grant or deny access to a service, and therefore service route, to the group of users specified by either an address block or a Qualified Service Name (QSN).

| Element | Type | Description |
| ------- | ---- | ----------- |
| permission | enumeration | Valid values: allow, deny. Default: allow. This setting determines whether or not the address(es) or QSN defined in the "source" field should be allowed access to this service.|
| source | source-spec | Key field. This field contains either an IP prefix, or a QSN, or a combination of the two, and represents the "user population" subjected to this access policy.|
> Note that QSNs are entered without the qsn:// scheme, using only dotted name notation (e.g., "engineering.128technology").

Version History:

Introduced in 1.0. Enhanced in 2.0, added the ability to specify a specific subnet within a tenant as a source (e.g., `tenantName@192.168.1.0/24`).

## access-policy (host-service)

Path:

authority \> router \> node \> device-interface \> network-interface \> address \> host-service \> access-policy

Description:

Access policies are a multiple instance sub-element within a host-service configuration. Much as they're used within 128T defined services, when defined within *host-service* elements they explicitly grant or deny access to an underlying Linux service, to the group of users specified by either an address block or a Qualified Service Name (QSN).

| Element | Type | Description |
| --- | --- | --- |
| permission | enumeration | Valid values: allow, deny. Default: allow. This setting determines whether or not the address(es) or QSN defined in the "source" field should be allowed access to this service.|
| source | source-spec | Key field. This field contains either an IP prefix, or a QSN, or a combination of the two, and represents the "user population" subjected to this access policy.|
> Note that QSNs are entered without the qsn:// scheme, using only dotted name notation (e.g., "engineering.128technology").

Version History:

Introduced as part of the addition of *host-service* capabilities in 3.1.

## action

Path:

authority > routing > policy > statement > action

Description:

The *action* configuration element lets administrators define actions to take within route policy `statement` configuration.

| Element | Type | Description |
| --- | --- | --- |
| type | enumeration | Key field. Valid values: set-aggregator, modify-as-path, set-atomic-aggregate, set-community, remove-community, set-extended-community, set-next-hop, set-local-preference, modify-metric, set-originator-id, set-origin, set-tag, set-bgp-weight, continue, call. This governs the remaining configurable options for the `action` as described below. |
| add | uint32 | Configurable when `type` is `set-aggregator`. This will add the specified value to the route's metric. |
| additive | presence | Configurable when `type` is `set-aggregator`. When present, the action will merge the community attribute values with those specified in the action. |
| aggregator-address | ipv4-address | Configurable when `type` is `set-aggregator`. The IP address of the aggregator. |
| as | uint32 (ASN) | Configurable when `type` is `set-aggregator`. The ASN of the aggregator. |
| bgp-weight | uint32 | Configurable when `type` is `set-bgp-weight`. The value to set for the BGP weight of the route. |
| community-attribute | enumeration or string | Valid values: internet, local-AS, no-advertise, no-export, or a freeform community string written as `uint16:uint16`. This sets the community-attribute of the route. |
| community-filter | reference | Configurable when `type` is `remove-community`. The filter (of type `community-filter`) that will match all of the community strings to remove. |
| exclude | string | Configurable when `type` is `modify-as-path`. This is a space separated list of autonomous system numbers to exclude from the route advertisement. |
| ip-address | ipv4-address | The new next-hop IP address to use for this route. |
| local-preference | uint32 | Configurable when `type` is `set-local-preference`. This lets you specify the local preference value for the route. |
| none | presence | When present, will remove all communities from the route advertisement. |
| origin | ipv4-address | Configurable when `type` is `set-origin`. This sets the BGP origin for the route. |
| originator-id | ipv4-address | Configurable when `type` is `set-originator-id`. This sets the originator ID for the route. |
| peer-address | ipv4-address | Set the next-hop IP address of the route to that of the peer. |
| policy | reference | Configurable when `type` is `call`. This references another policy, and will cause the current policy statement to "branch" to that referenced policy. |
| prepend | string | Configurable when `type` is `modify-as-path`. This is a space separated list of autonomous system numbers to prepend to the route advertisement. |
| route-target | string | Configurable when `type` is `set-extended-community`. The new extended-community route target, in one of several formats. |
| set | uint32 | This will set the route metric to the configured value. |
| site-of-origin | string | Configurable when `type` is `set-extended-community`. The new site-of-origin value for an extended-community, configurable in one of several formats. |
| statement | reference | Configurable when `type` is `continue`. This will progress on to the specified `statement`, which must be after the current statement. This lets you "jump over" intervening statements. |
| subtract | uint32 | This will subtract the configured value from the route metric. |
| tag | uint32 | Configurable when `type` is `set-tag`. This sets the tag for the BGP route. |

## address

Path:

authority \> router \> node \> device-interface \> network-interface \> address

Description:

The *address* sub-element within a network-interface defines the IP address and its associated properties.

| Element | Type | Description |
| --- | --- | --- |
| gateway | address | The IP gateway for destinations that are not part of the subnet of this interface. This field is optional; a gateway may be learned through a routing protocol, for instance. |
| host-service | sub-element | Host services are node-specific services, such as enabling remote SSH access, HTTPS access, etc. to a specific platform on which 128T software is running. |
| ip-address | address | The IP address to assign to this interface. |
| prefix-length | uint8 |  The number of bits for the subnet mask on this interface. This is generally the number after the slash in CIDR notation; e.g., 24 is the prefix-length for the CIDR 192.168.1.128/24. |
| utility-ip-address | address | The *utility* address is a unique IP address assigned to a particular interface in a high availability pair. Unlike the *ip-address*, which is "owned" by the active interface in an interface pair and may migrate between two discrete systems, the utility-ip-address always remains fixed on a specific node, and ensures a unique target for that system irrespective of its role (active, standby). |

Version History:

Introduced in 1.0. Updated in 3.1: added *host-service*.

## address-family (neighbor)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> address-family

Description:

The *address-family* sub-element within each neighbor controls the behavior of the 128T router's interaction with its neighbor for the specified address-family (AFI/SAFI).

| Element |  Type |  Description |
| --- | --- | --- |
| afi-safi | enumeration | Key field. Valid value: ipv4-unicast.|
|  as-path-options | sub-element | This sub-element gives administrators the ability to manipulate the AS\_PATH attribute for this address-family.|
| next-hop-self | boolean | When true, sets this 128T router as the next hop for this neighbor for this address family.|
| prefix-limit | sub-element  |This sub-element allows administrators to control the number of prefixes received from this neighbor. |
| remove-private-as | enumeration | Valid value: all. When set to "all", the 128T router will remove private AS numbers from updates sent to this neighbor for this address-family. |
| route-reflector | sub-element   This sub-element controls the behavior of the 128T router when acting as a route reflector for this neighbor. |
| send-default-route | boolean | When true, the 128T router will send its default route to its neighbor. Note that this will occur even if the route is not present in the RIB.|

Version History:

Introduced in 1.0.

## address-family (routing-protocol)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family

Description:

The *address-family* sub-element controls the behavior of the 128T router's BGP tables, separated for each AFI/SAFI (Address Family Indicator, Subsequent Address Family Indicator). At this time, the 128T router supports IPv4 unicast address family only.

| Element | Type | Description |
| --- | --- | --- |
| afi-safi | enumeration | Key field. Valid value: ipv4-unicast. |
| (aggregate-address) | (sub-element) | (Multiple instance. Controls the 128T router's behavior regarding address aggregation.) |
| default-route-distance | sub-element | Sets default values for various routes learned through BGP for this address family. |
| graceful-restart | sub-element | The parameters and settings that control the 128T router's BGP graceful restart behavior. |
| network | sub-element | Multiple instance. One of these elements is configured for each prefix that the 128T router should announce for this address family. |
| prefix-limit | sub-element | Allows administrators to set prefix limits received from peers before the connection to that peer is torn down. |
| send-default-route | boolean | When true, the 128T router will send its default-route to neighbors, if one exists in its RIB for this address-family. |
| use-multiple-paths | sub-element | Allows administrators to set various parameters related to multiple path support for the same Network Layer Reachability Information (NLRI). |

Version History:

Introduced in 1.0.

## address-pool

Path:

authority > router > nat-pool > address-pool

Description:

The *address-pool* lets administrators replace one IP prefix with another as it forwards traffic. This can, for example, mask an entire CIDR block with another. As packets are forwarded, the least significant bits are replaced for traffic pertaining to that tenant with the prefix in the pool.

| Element | Type | Description |
| --- | --- | --- |
| address | prefix | The IPv4 or IPv6 prefix to mask egress traffic. |
| tenant-name | reference | The tenant to which the address masking should be applied. |

## adjacency

Path:

authority \> router \> node \> device-interface \> network-interface \> adjacency

Description:

An *adjacency* is a multiple instance element that allows administrators to define the set of adjacent routers reachable via a given network-interface. The adjacencies are referenced as *peers*, which contain the attributes (BFD properties, security policies) to be used when communicating with these adjacencies.

Adjacencies are given an administrative *cost* that affects the routing plane, as well as a "quality point" assignment, that allows administrators to indicate path preference -- useful for ensuring that traffic flows to locations using links that meet service level agreement thresholds.

| Element | Type | Description |
| --- | --- | --- |
| bfd | sub-element | This controls the properties of the BFD protocol used as keepalive/heartbeat signaling between this, and a remote 128T routing node. |
| cost | uint32 | Default: 0. This is the administrative cost of the link. |
| external-nat-address | address | When this 128T node is deployed behind a NAT, this field specifies the address that the adjacency will direct its packets to. This is due to the nature of the 128T communications; even if the NAT rewrites the destination address to match the local, NATted IP address of the 128T router's interface, the metadata within various packets will still refer to a pre-NATted address. This field allows a 128T node to identify with the pre-NATted address, if it appears in metadata received from an adajacency. |
| generated | boolean | Default value: false. This field is set to *true* when a 128T conductor generates configuration based on two 128T routers having interfaces in a common *neighborhood*. When this field is set to *true*, the 128T conductor will delete and regenerate this configuration element upon each *commit*. Thus, when an administrator wants to make persistent configuration changes to this object after it has been generated by a 128T conductor, it is important to manually change this field to *false*. |
| inter-router-security | reference | This refers to a configured *security* element, used for encrypting and decrypting packets when transmitting/receiving them to an adjacency. |
| ip-address | address | Key field. This is the IP address or hostname of the adjacent router, or *waypoint address* of the peer router. |
| peer | reference | A reference to a configured peer (from router:peer). This is the name of the peer router to which this waypoint address belongs. |
| port-range | reference | A reference to a port range to limit the far-end "waypoint" range to a defined set. This is useful when working with peers that have strict firewall restrictions on which ports can be used for communicating between 128T routers. (By default, when this field is left unconfigured, the range is 16384-65535.) This field is only configurable when *peer* specifies another 128T element. |
| qp-value | uint32 | An integer representing the quality points on the link between this node and its adjacent network element. Quality points are assigned to links from low values (representing bulk traffic links) to high values (representing managed, high-quality links). This is used in conjunction with a service's *service-class* when deciding on which path to use for a given service's traffic. |
| source-nat-address | CIDR | Multiple instance. Each source-nat-address is set to the address and prefix of the far-end NAT between this adjacency, and the network-interface on this node used to reach that adjacency. For NATs that use a single address, the prefix should be set to /32. For NATs that use a pool, the prefix should be set accordingly. Note: extreme caution should be used when configuring 0.0.0.0/0 in an attempt to "wildcard" the source-nat-address; network-interface configuration elements that do not have tenants associated with them (or those that do, where the tenant has no configured prefixes) will potentially collide with this configuration and lead to undesirable behavior. |
| vector | string | Multiple instance. This represents the list of *vector* labels (variable cost elements) to be used when calculating the shortest path to a route target. |

Version History:

Introduced in 1.0. Updated in 2.0 to add various NAT handlers. Updated in 3.1: now supports hostnames in addition to IPv4 addresses in the *ip-address* field. Updated in 3.2: added *generated* and *vector* fields.

## administrative

Path:

authority \> router \> system \> audit \> administrative

Description:

This sub-element gives administrators the ability to administratively enable or disable administrative events.

| Element | Type | Description |
| --- | --- | --- |
| enabled | boolean | Default: true. When false, the system will not register any administrative events. |

Version History:

Introduced in 3.2.

## aggregate-address

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> aggregate-address

Description:

The *aggregate-address* sub-element affects the 128T router's BGP behavior when it aggregates prefixes; whether it advertises those routes as aggregates, and whether or not it

| Element | Type | Description |
| --- | --- | --- |
| as-set | boolean | Controls whether or not the 128T router generates "AS set" information for the aggregate. An AS set is an unordered list of autonomous system numbers, collected from all the routes summarized by the aggregate. |
| prefix | CIDR | Key field. The IP prefix upon which the as-set and summary-only behaviors operate on. |
| summary-only | boolean | When *true*, the 128T router will advertise Network Layer Reachability Information (NLRI) in aggregate only. When false, the 128T router will not advertise aggregate NLRI. |

Version History:

Introduced in 1.0.

## application-identification

Path:

authority \> router \> application-identification

Description:

This sub-element lets the administrators set the behavior for the 128T router's application identification behavior.

| Element | Type | Description |
| --- | --- | --- |
| mode | enumeration | Valid values: module, tls. When set to *module*, the 128T router will use an external module for application classification. When set to *tls*, the system will inspect X.509 certificates exchanged during the TLS handshake to look for Common Name elements to identify applications. When set to *module*, the 128T will expect classification modules to be installed on the system in /var/etc/128technology/application-modules. (These modules will be supplied by 128 Technology.) |

Version History:

Introduced in 3.2.

## as-path-options

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> address-family \> as-path-options

Description:

This sub-element gives administrators the ability to manipulate the AS\_PATH attribute for this address-family.

| Element | Type | Description |
| --- | --- | --- |
| allow-own-as | uint8 | This value specifies the threshold of occurrences of the peer's AS that can occur within the AS\_PATH attribute before it is rejected. |

Version History:

Introduced in 1.0.

## audit

Path:

authority \> router \> system \> audit

Description:

This sub-element gives administrators the ability to administratively enable or disable various event types.

| Element | Type | Description |
| --- | --- | --- |
| administrative | sub-element | Controls whether or not the system registers various administrative events. |
| system | sub-element | Controls whether or not the system registers various system events. |
| traffic | sub-element | Controls whether or not the system registers various traffic-related events. |

Version History:

Introduced in 3.2.

## authority

Path:

authority

Description:

The *authority* configuration element is the top-most level in the 128T router configuration hierarchy. Conceptually, an *authority* is a collection of instances of the 128T router, managed by a single administrative body.

| Element | Type | Description |
| --- | --- | --- |
| auto-install | boolean | When true, this will automatically install the 128T software onto an asset once it connects to the conductor. When false, software will not be installed automatically and will require administrative intervention. |
| conductor-address | address | The IP address or hostname of your conductors. There can be at most two conductor addresses configured in an authority; note that the addresses here should be reachable by most/all of your authority's routers. (Routers that use different addresses to reach the same conductor can override this in their configuration.) |
| dscp-map | sub-element | Lets administrators map the inbound DSCP values received in packet headers into priority values, for traffic engineering purposes. |
| dynamic-hostname | string | This allows administrators to establish a templated pattern for how interfaces on routers will create "names" for their interfaces. These names, constructed using substitution variables in the dynamic-hostname syntax, can be used as (effectively) persistent labels for referring to the corresponding interface, rather than an IP address. This is particularly useful when an interface acquires its address using a dynamic protocol such as PPPoE or DHCP. Uses the following substitution variables: {interface-id} for Network Interface Global Identifier {router-name} for Router Name {authority-name} for Authority Name For example, \'interface-{interface-id}.{router-name}.{authority-name}\'. |
| ipfix-collector | sub-element | Allows administrators to configure authority-wide IPFIX (IP Flow Information Export) collectors, for flow-by-flow/session-by-session information. |
| ldap-server | sub-element | Configuration in support of an external authentication service for administrative logins. |
| name | string | A text string that names the authority. This should be unique to an administrative domain, as devices that are configured with the same authority:name are presumed to be associated with each other. It is recommended that an authority name be something associated with an enterprise deploying the 128T router; e.g., "128technology". |
| rekey-interval | union | Valid values: 1-720, or 'never' (default). The number of minutes between security key renegotiation events, when communicating with other 128T devices within an Authority. |
| remote-login | sub-element | Governs whether routers within the authority will be reachable using the "remote login" feature. This lets administrators log into the PCLI or shell of a remote router from the conductor's PCLI or shell. |
| router | sub-element | This is the branch of the configuration tree for defining all of the router-specific components and their properties. This includes things such as "nodes", the software instances that comprise the 128T router solution, routing policy, and traffic management attributes. |
| security | sub-element | Multiple instance. The security elements represent security policies for governing how and when the 128T router encrypts and/or authenticates packets. |
| service | sub-element | Multiple instance. These define the services that the 128T router is configured to deliver. |
| service-class | sub-element | Multiple instance. Service classes define the how the 128T router marks packets (DSCP), what "quality preference" is given to flows that are part of this service, and how those flows are prioritized by the 128T router's scheduling algorithm. |
| service-policy | sub-element | Multiple instance. Service policies associate services to service classes, and define the load balancing strategy that the 128T router will employ for flows belonging to the referenced service. |
| session-type | sub-element | Multiple instance. Session types are classifications, based on Layer 4 port and protocol. E.g., HTTP is (typically) TCP port 80. The 128T router uses session-type configuration elements for assigning default traffic categorization policy when the flows are not explicitly associated with a configured service. |
| tenant | sub-element | Multiple instance. Tenants are authority-wide categories of users (user populations) that are grouped for the purpose of service advertisement, service delivery, and security policy enforcement. |
| traffic-profile | sub-element | A container for sets of traffic profiles, to prioritize traffic using the 128T router's traffic engineering subsystem. |

Version History:

Introduced in 1.0. Updated in 3.0: added *rekey-interval*. Updated in 3.1: added dscp-map, ipfix-collector elements. Updated in 3.2: added *dynamic-hostname* and *traffic-profile*.

## best-effort

Path:

authority \> traffic-profile \> best-effort

Description:

This element has one configurable field, that lets administrators specify the guaranteed (minimum) bandwidth for best-effort traffic.

| Element | Type | Description |
| --- | --- | --- |
| distribution | percentage | Valid values: 0-100. |

Version History:

Introduced in version 3.2.

## bfd (adjaency)

Path:

authority \> router \> node \> device-interface \> network-interface \> adjacency \> bfd

Description:

The *bfd* sub-element within an adjacency is used to dictate how 128T routing nodes send BFD messages to counterparts in other routers and/or authorities. These values may be unique on a per-adjacency basis, but the configured values apply to all exchanges with a specific peer irrespective of the number of nodes exchanging BFD on either "side".

| Element | Type | Description |
| --- | --- | --- |
| authentication-type | enumeration | Valid values: simple, sha256. This is the authentication type used in BFD packets sent to the other devices in the peer router. |
| desired-tx-interval | uint32 | Valid values: 50-600000. Default: 1000. Configured in milliseconds. Represents the frequency with which BFD asynchronous control packets are sent by a router to the remote router. |
| link-test-interval | uint32 | Valid values: 1-86400. Default: 10. Configured in seconds. This determines the frequency with which a router will perform link tests with the peer router, using BFD echo packets. |
| link-test-length | uint8 | Default: 10. This is the number of packets sent in one link-test session between peers, used for determining latency and jitter. |
| multiplier | uint8 | Valid values: 3-20. Default: 3. This represents the number of missed consecutive messages from a peer before treating that peer as unusable. |
| required-min-echo-interval | uint32 | Default: 1000. This represents the minimum interval, configured in milliseconds, between BFD *echo packets* (used for measuring link quality) that the nodes in this router are capable of supporting. |
| required-min-rx-interval | uint32 | Default: 500. This represents the lowest inter-packet arrival interval (i.e., the fastest rate) at which this router can support asynchronous BFD packets. During negotiation with a BFD peer, this router will transmit packets at the higher of its desired-tx-interval and its peer's required-min-rx-interval. |
| state | enumeration | Valid values: enabled, disabled. Default: enabled. When enabled, BFD will be exchanged with the peer router. |

Version History:

Introduced within the adjacency element as of software version 3.1.

## bfd (neighborhood)

Path:

authority \> router \> device-interface \> network-interface \> neighborhood \> bfd

Description:

The *bfd* sub-element within a peer is used to dictate how 128T nodes send BFD messages to counterparts in other routers and/or authorities. These values may be unique on a per-peer basis, but the configured values apply to all exchanges with a specific peer irrespective of the number of nodes exchanging BFD on either "side."

| Element | Type | Description |
| --- | --- | --- |
| authentication-type | enumeration | Valid values: simple, sha256. This is the authentication type used in BFD packets sent to the other devices in the peer router. |
| desired-tx-interval | uint32 | Valid values: 50-600000. Default: 1000. Configured in milliseconds. Represents the frequency with which BFD asynchronous control packets are sent by a router to the remote router. |
| link-test-interval | uint32 | Valid values: 1-86400. Default: 10. Configured in seconds. This determines the frequency with which a router will perform link tests with the peer router, using BFD echo packets. |
| link-test-length | uint8 | Default: 10. This is the number of packets sent in one link-test session between peers, used for determining latency and jitter. |
| multiplier | uint8 | Valid values: 3-20. Default: 3. This represents the number of missed consecutive messages from a peer before treating that peer as unusable. |
| required-min-echo-interval | uint32 | Default: 1000. This represents the minimum interval, configured in milliseconds, between BFD *echo packets* (used for measuring link quality) that the nodes in this router are capable of supporting. |
| required-min-rx-interval | uint32 | Default: 500. This represents the lowest inter-packet arrival interval (i.e., the fastest rate) at which this router can support asynchronous BFD packets. During negotiation with a BFD peer, this router will transmit packets at the higher of its desired-tx-interval and its peer's required-min-rx-interval. |
| state | enumeration | Valid values: enabled, disabled. Default: enabled. When enabled, BFD will be exchanged with the peer router. |

Version History:

Introduced in 3.1.

## bfd (peer)

Path:

authority \> router \> peer \> bfd

Description:

The *bfd* sub-element within a peer is used to dictate how routers send BFD messages to counterparts in other routers and/or authorities. These values may be unique on a per-peer basis, but the configured values apply to all exchanges with a specific peer irrespective of the number of routers exchanging BFD on either "side".

| Element | Type | Description |
| --- | --- | --- |
| authentication-type | enumeration | Valid values: simple, sha256. This is the authentication type used in BFD packets sent to the other devices in the peer router. |
| desired-tx-interval | uint32 | Valid values: 50-600000. Configured in milliseconds. Represents the frequency with which BFD asynchronous control packets are sent by a router to the remote router. |
| link-test-interval | uint32 | Valid values: 1-86400. Default: 1. Configured in seconds. This determines the frequency with which a router will perform link tests with the peer router, using BFD echo packets. |
| link-test-length | uint8 | Valid values: 0-255. Default: 10. This is the number of packets sent in one link-test session between peers, used for determining latency and jitter. |
| multiplier | uint8 | Valid values: 3-20. Default: 3. This represents the number of missed consecutive messages from a peer before treating that peer as unusable. |
| required-min-echo-interval | uint32 | This represents the minimum interval, configured in milliseconds, between BFD *echo packets* (used for measuring link quality) that the nodes in this router are capable of supporting. |
| required-min-rx-interval | uint32 | Default: 500. This represents the lowest inter-packet arrival interval (i.e., the fastest rate) at which this router can support asynchronous BFD packets. During negotiation with a BFD peer, this router will transmit packets at the higher of its desired-tx-interval and its peer's required-min-rx-interval. |
| state | enumeration | Valid values: enabled, disabled. Default: enabled. When enabled, BFD will be exchanged with the peer router. |

Version History:

Introduced in 1.0. Updated in 3.0: exposed *required-min-echo-interval* and *required-min-rx-interval*.

## bfd (router)

Path:

authority \> router \> bfd

Description:

The *bfd* sub-element is used for configuring timers and behaviors associated with the Bidirectional Forwarding Detection protocol for *nodes* within the *router*. All 128T router packet forwarding components will use BFD to report to one another, governed by these parameters.

| Element | Type | Description |
| --- | --- | --- |
| authentication-type | enumeration | Valid values: simple, sha256. This is the authentication type used in BFD packets sent to the other devices within the router. |
| desired-tx-interval | uint32 | Valid values: 50-5000. Default: 1000. Configured in milliseconds, this represents the frequency with which BFD asynchronous control packets are sent by each node in a router to each other node within the same router. |
| dscp | uint8 | Valid values: 0-63. The DSCP value to use for outbound BFD. |
| link-test-interval | uint32 | Valid values: 1-86400. Default: 1. Configured in seconds. This determines the frequency with which a node will perform link tests with other nodes in the router, using BFD echo packets. |
| link-test-length | uint8 | Default: 10. This is the number of packets sent in one link-test session between peers, used for determining latency and jitter. |
| multiplier | uint8 | Valid values: 3-20. Default: 3. This represents the number of missed consecutive messages from a peer before treating that peer as unusable. |
| required-min-rx-interval | uint32 | Default: 500. This represents the lowest inter-packet arrival interval (i.e., the fastest rate) at which this router can support asynchronous BFD packets. During negotiation with a BFD peer, this router will transmit packets at the higher of its desired-tx-interval and its peer's required-min-rx-interval. |
| state | enumeration | Valid values: enabled, disabled. Default: enabled. When enabled, BFD is exchanged among all nodes within this router. |

Version History:

Introduced in 1.0. Updated in 3.0 (exposed required-min-rx-interval, which was previously fixed at 500ms, and required-min-echo-interval).

## confederation

Path:

authority \> router \> routing \> routing-protocol (bgp) \> confederation

Description:

This has the options for allowing administrators to specify the behavior of the 128T router when it is deployed into an autonomous system that is part of a BGP confederation.

| Element | Type | Description |
| --- | --- | --- |
| identifier | uint32 | The identifier for the confederation in the autonomous system. |
| member-as | uint32 | Multiple instance. The remote autonomous system(s) that are to be treated as part of the local confederation. |

Version History:

Introduced in 1.0.

## default-route-distance

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> default-route-distance

Description:

The *default-route-distance* element contains configuration fields that allow administrators to set administrative distance/preference for routes received by the 128T router's BGP stack.

| Element | Type | Description |
| --- | --- | --- |
| external | uint8 | The administrative distance for routes learned from external BGP (eBGP) peers. |
| internal | uint8 | The administrative distance for routes learned from internal BGP (iBGP) peers. |
| local | uint8 | The administrative distance for local routes. |

Version History:

Introduced in 1.0.

## device-interface

Path:

authority \> router \> node \> device-interface

Description:

A *device-interface* is what maps a physical interface (the "hardware-name") to one or more logical interfaces (the "network-interface") on a node. Each node may have multiple device-interfaces, each of which may house many network-interfaces, limited only by the number of unique VLAN tags (4,094).

| Element | Type | Description |
| --- | --- | --- |
| capture-filter | string | In Berkeley Packet Filter (BPF) syntax. This is the filter to use when matching packets on this interface, using the 128T router's packet capture feature. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| enabled | boolean | Default value: true: Setting this to *false* will administratively disable this device interface. |
| link-settings | enumeration | Valid values: auto, 10Mbps-half, 10Mbps-full, 100Mbps-half, 100Mbps-full. Default: auto. This lets administrators configure the speed and duplex for this interface (only configurable when *type* is *ethernet*). |
| load-balancing | sub-element | This contains parameters related to maximum link utilization before it is considered eligible/ineligible for new sessions by the 128T load balancing algorithm. |
| lte | sub-element | Container for properties related to the 128T router's support for LTE interfaces. This field is only configurable when the *type* of the interface is set to *lte*. |
| mode | enumeration | Valid values: host, bridged. Only configurable when type is *kni*. \[These modes are superseded in software version 3.1 in favor of the values *host* and *bridged* under *type*. |
| name | string | Key field. A text string that uniquely represents this interface, used to reference it in other parts of the 128T router's configuration. |
| network-interface | sub-element | The list of network interfaces associated with this device interface. |
| pci-address | string | The PCI bus address of the physical, or virtual interface as it is known by the underlying operating system. |
| pppoe | sub-element | Container for properties related to the 128T router's support for PPP over Ethernet (PPPoE). This field is only configurable when the *type* of the interface is set to *pppoe*. |
| shared-phys-address | string | The virtual MAC address that the interface will use (part of an interface's redundancy) |
| strip-vlan | boolean | Default: false. Set this to *true* when the system needs to strip a VLAN tag on packets ingressing this router. (Common in some cloud deployment models.) |
| target-interface | string | Only configurable when type is *kni* and mode is *bridged*. This is set to the name of the operating system's interface, which "bridges" this KNI interface to an interface known by the operating system. (This is used when setting up a 128T router in a cloud provider's network, for example.) |
| traffic-engineering | sub-element | This sub-element is where administrators set the traffic engineering properties (e.g., a bandwidth limiter) for this device-interface. |
| type | enumeration | Valid values: ethernet, kni, pppoe, host, bridged, lte, t1. |

Version History:

Introduced in 1.0. Updated for 1.1: hardware-name deprecated; interfaces are now known by their PCI address (pci-address added); shared-phys-address added in support of device interface redundancy. Updated in 3.0: added *transmit-cap*. Updated in 3.1: added *enabled*, *traffic-engineering* elements. Added enumeration values to *type*. Added configuration properties for PPPoE and LTE elements. Moved modes *host* and *bridged* to the enumeration for *type*. Updated in 3.2: added *name* to replace *id* as the unique key for the interface; moved *transmit-cap* to *traffic-engineering*.

## dscp-map

Path:

authority \> dscp-map

Description:

This element allows administrators to map the DSCP (Differentiated Services Code Point) values into 128T *traffic-class* values, which will subsequently affect their treatment from a traffic engineering standpoint. Many networks use DSCP marking within packet headers to convey a sense of relative priority of these packets as compared to others. Mapping these DSCP values into 128T traffic classes can place certain packets into queues that have more bandwidth, or have more scheduling time, etc.

:::note
Versions of 128T software prior to 3.2.0 only allowed mapping of DSCP values to *priority* values (using the `dscp-prioritization` element). As of 3.2.0, and going forward, the preferred method for mapping DSCP values into the traffic engineering subsystem is to use `dscp-traffic-class`.
:::

| Element | Type | Description |
| --- | --- | --- |
| name | string | Key field. The unique name of this map. |
| dscp-prioritization | sub-element | The sub-element used to map DSCP values into priority groups. |
| dscp-traffic-class | sub-element | Maps incoming DSCP into traffic-class. |

Version History:

Introduced in 3.1. Updated in version 3.2, added *dscp-traffic-class*.

## dscp-prioritization

Path:

authority \> dscp-map \> dscp-prioritzation

Description:

This element allows administrators to associate ranges of DSCP values to one of four priority values that the 128T router uses to prioritize packets within its traffic engineering engine.

| Element | Type | Description |
| --- | --- | --- |
| priority | integer | Key field. Valid range: 0-3. Priority 0 is the highest priority within the engine, and priority 3 is considered "best effort." |
| dscp-range | sub-element | The range of DSCP values to map to the specified priority. |

Version History:

Introduced in 3.1.

## dscp-range

Path:

authority \> dscp-map \> dscp-prioritzation \> dscp-range\
authority \> dscp-map \> dscp-traffic-class \> dscp-range

Description:

This element allows administrators to define a range of DSCP values that will map to a DSCP priority assignment. There may be more than one DSCP range associated with a single priority, to account for discontinuous ranges of DSCP values (e.g., 10, 13-15, 17 would be configured as three *dscp-range* elements within a single dscp-prioritization).

| Element | Type | Description |
| --- | --- | --- |
| start-value | integer | Key field. Valid range: 0-63. The lower bound of the DSCP range. When only configuring a range of a single DSCP value, it is sufficient to only configure the *start-value* and leave the *end-value* unconfigured. |
| end-value | integer | Valid range: 0-63 (and must be greater than start-value). The upper bound of the DSCP range. |

Version History:

Introduced in 3.1. Added as a sub-element of *dscp-traffic-class* in 3.2.0.

## dscp-traffic-class

Path:

authority \> dscp-map \> dscp-traffic-class

Description:

This element allows administrators to associate ranges of DSCP values to one of four traffic-class values that the 128T router uses to prioritize packets within its traffic engineering engine.

| Element | Type | Description |
| --- | --- | --- |
| traffic-class | enumeration | Valid values: high, medium, low, best-effort. This is the type of traffic to associate with the DSCP ranges configured in this element. |
| dscp-range | sub-element | The range of DSCP values to map to the specified priority. |

Version History:

Introduced in 3.2.

## ebgp

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> use-multiple-paths \> ebgp

Description:

This element contains configuration parameters related to the 128T router's multipath support for external BGP (eBGP).

| Element | Type | Description |
| --- | --- | --- |
| maximum-paths | uint32 | Default: 1. The maximum number of parallel paths to consider when using multipath eBGP for this address family. |

Version History:

Introduced in 1.0.

## entitlement

Path:

authority \> router \> entitlement

Description:

The entitlement is where you apply keys you received from 128 Technology, to license your 128T router for carrying traffic.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A textual description of the entitlement. |
| id | string | The entitlement string, supplied to you by 128 Technology. |
| max-bandwidth | uint64 | The purchased bandwidth for your 128T router, expressed in *bytes per second*. |

Version History:

Introduced in 1.1.

## filter

Path:

authority > routing > filter

Description:

This is where adminstrators configure  the 128T's implementation of *route filters*, which are sets of conditions for matching specific patterns in route advertisements (inbound or outbound). These are used in conjunction with [route policies](#policy) to manipulate those route advertisements.

| Element | Type | Description |
| --- | --- | ---|
| name | string | Key field. The unique label assigned to this filter, used to reference it in other parts of the 128T router's configuration. |
| rule | sub-element | The properties of the filter are configured in the `rule` sub-element. |
| type | enumeration | Valid values: prefix-filter, as-path-filter, community-filter, extended-community-filter. This specifies which portion of a BGP message is to be parsed to find a match: `prefix-filter` will look for matches based on advertised prefixes, `as-path-filter` will look for matches based on the AS PATH, `community-filter` based on the BGP community, and `extended-community-filter` based on the extended BGP community attribute. |

## graceful-restart

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> graceful-restart

Description:

This configuration element governs the behavior of the 128T router's support for BGP's graceful restart. It is a BGP extension that is used when peer connections are interrupted, and was designed to minimize the disruption to a system's BGP behavior upon reconnection to the (formerly) unreachable peer.

| Element | Type | Description |
| --- | --- | --- |
| restart-time | uint16 | Valid values: 0-4096. Described as the "Restart Time" in RFC 4724, this is the estimated time for the local BGP speaker to restart a session. The 128T router will advertise this value with a BGP peer as part of its declared support for graceful restart. Per RFC 4724, the suggested default value is less than or equal to the hold-time value. |
| stale-routes-time | uint16 | This is what RFC 4724 refers to as the "Selection\_Deferral\_Timer", and represents the upper bound on how long stale routes are retained by the 128T router after a BGP peering connection is restarted. If an EOR (End-of-RIB) marker is received from the peer before this timer expires, the stale routes are flushed. |

Version History:

Introduced in 1.0. Updated in version 3.1: added restart-time.

## high

Path:

authority \> traffic-profile \> high

Description:

This element has one configurable field, that lets administrators specify the guaranteed (minimum) bandwidth for high priority traffic.

| Element | Type | Description |
| --- | --- | --- |
| distribution | percentage | Valid values: 0-100. |

Version History:

Introduced in version 3.2.

## host-service

Path:

authority \> router \> node \> device-interface \> network-interface \> address \> host-service

Description:

Individual compute platforms that make up a 128T router may each "host" their own services -- things such as remote access via SSH, HTTPS, etc. When an administrator wants to enable remote management of a specific node within a 128T router, a host-service element is required. When an administrator creates a host-service, the 128T router will "bridge" this service (defined by address, port, and protocol) to a corresponding application on the underlying Linux platform.

| Element | Type | Description |
| --- | --- | --- |
| access-policy | sub-element | Selectively allows/denies access to the underlying host-service to collections of addresses. |
| description | string | An optional textual description of the element, for configuration ease of readability. |
| service-type | enumeration | Key field. Valid values: ssh, netconf, web, or custom. This identifies the underlying Linux service that will be bridged to the address on this specific node. |
| transport | sub-element | This is where port(s) and protocol(s) are defined, to match inbound packets to this host-service definition. Only configurable when service-type is *custom*. |

Version History:

Introduced in 3.1.

## ibgp

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> use-multiple-paths \> ibgp

Description:

This element contains configuration parameters related to the 128T router's multipath support for internal BGP (iBGP).

| Element | Type | Description |
| --- | --- | --- |
| maximum-paths | uint32 | Default: 1. The maximum number of parallel paths to consider when using multipath iBGP for this address family. |

Version History:

Introduced in 1.0.

## inter-node

Path:

authority \> router \> node \> ssh-keepalive \> inter-node

Description:

This element contains configuration parameters related to SSH keepalive properties between this node and other nodes within the same 128T router.

| Element | Type | Description |
| --- | --- | --- |
| interval | integer | Valid values: 1-10. Configured in seconds, the amount of idle time between keepalive messages. |
| max-attempts | integer | Valid values: 1-20. The number of missed keepalive messages before a connection is declared dead and a reconnection attempt is initiated. |

Version History:

Introduced in 3.2.

## inter-router

Path:

authority \> router \> node \> ssh-keepalive \> inter-router

Description:

This element contains configuration parameters related to SSH keepalive properties between this node and other routers within the same 128T authority.

| Element | Type | Description |
| --- | --- | --- |
| interval | integer | Valid values: 1-10. Configured in seconds, the amount of idle time between keepalive messages from this node to other routers |
| max-attempts | integer | Valid values: 1-20. The number of missed keepalive messages before a connection is declared dead and a reconnection attempt is initiated. |

Version History:

Introduced in 3.2.

## ipfix-collector

Path:

authority > ipfix-collector

Description:

This element contains information regarding externally reachable IPFIX (IP Flow Information eXport) collectors, for harvesting IPFIX data that is generated by the 128T router during its operation.

| Element | Type | Description |
| --- | --- | --- |
| interim-record-interval | uint32 | Valid values: 60-1800. The time (in seconds) for which the 128T router will generate IPFIX records for active sessions that are still in progress. |
| ip-address | address | The IP address of the IPFIX collection device. |
| name | string | Key field. The unique label assigned to this IPFIX collector, used to reference it in other parts of the 128T router's configuration. |
| port | l4-port | The Layer 4 (transport) port to which the 128T router(s) should send their IPFIX records at the specified address. |
| protocol | l4-protocol | Valid values: tcp, udp. The transport protocol to use for sending IPFIX records to the collector. |
| sampling-percentage | enumeration | Valid values: *dynamic* (default) or a decimal value. This represents the percentage of traffic for which IPFIX traffic is generated and sent to the collector. (IPFIX records are rarely, if ever, collected on each flow in a networking device due to the volume of data this generates for both the sender and receiver.) When set to *dynamic* (or left at its default), the routers in the Authority will use a default algorithm for sampling based on the busyness of the system. For traffic volumes under 100Mbps, the system will generate IPFIX records for one in every 256 flows, up to 1Gbps, one in every 512 flows, up to 10Gbps, one in every 1,024 flows, up to 25Gbps, one in every 2,048 flows, and one in every 8,192 flows for traffic exceeding 25Gbps. |
| tenant | list | The tenants for which this IPFIX collector will receive records. When no tenants are configured, all traffic will be eligible. |

Version History:

Introduced in 3.1. Updated in 3.2: added *tenant*.

## ldap-server

Path:

authority > ldap-server

Description:

The `ldap-server` element lets you configure an external server that is used to authenticate administrative users.

| Element | Type | Description |
| --- | --- | --- |
| address | address | The address of the LDAP server. |
| bind-type | enumeration | Valid values: anonymous, unauthenticated, password. This controls how the 128T routers will bind to the LDAP server. |
| name | string | Key field. This is the name of the LDAP server configuration element. |
| port | enumeration | Valid values: server-type-default or a L4 port (0-65535). This is the TCP port that the 128T will use when connecting to the LDAP server. When set to `server-type-default`, the 128T will use 3269 for global-catalog, 636 for LDAPS, and 389 for StartTLS. |
| search-base | string | The search base defines the starting point for the search in the directory tree. For example, 128T might need to query the entire directory, in which case the search base must specify the root of the directory service. Or, 128T might need to query a specific organizational unit (OU) in the directory. Generally this is configured as a series of _Domain Components_, which are abbreviated "dc." |
| server-type | enumeration | Valid values: global-catalog, ldaps, starttls. Default value: ldaps. LDAPS is LDAP wrapped in SSL, and is a non-standard (yet popular) implementation. StartTLS is instead built into the LDAP protocol itself. Consult your LDAP server's documentation to determine the server-type most appropriate for your deployment. |

### See Also
[Configuring LDAP](config_ldap.md)

## load-balancing

Path:

authority \> router \> node \> device-interface \> load-balancing

Description:

The *load-balancing* element lets administrators configure thresholds for a device-interface to be considered eligible/ineligible for load balancing purposes. When the 128T load balancing algorithm is choosing destinations, it will not choose an interface that has exceeded its configured "high water mark" (expressed as a percentage) until traffic has quieted down on that interface below its "low water mark," also configured as a percentage..

| Element | Type | Description |
| --- | --- | --- |
| utilization-high-water-mark | percentage | Valid values: 0-100. The value, in percent, of the link's capacity beyond which the interface will no longer be used as an egress point for new session assignments. |
| utilization-low-water-mark | percentage | Valid values: 0-100. The value, in percent, of the link's capacity before a previously declared ineligible link must fall below before it will be marked as an eligible path for new session assignments. |

Version History:

Introduced in 3.2.

## log-category

Path:

authority \> router \> system \> log-category

Description:

The *log-category* element is what allows administrators to selectively increase/decrease the verbosity of logging for various subsystems within the 128T router. At times, during troubleshooting (and in particular, at the specific request of a member of the 128 Technology Customer Support team), you may need to selectively increase the logging verbosity of a particular subsystem to isolate a fault or routing issue. To increase logging across all subsystems may overwhelm the system's resources (and potentially mask the issue you're trying to troubleshoot), so these subsystems can affect only a small portion of the overall system's logging behavior.

These logging subsystems will generally only be tuned at the direct request from a member of the technical support team at 128 Technology.

| Element | Type | Description |
| --- | --- | --- |
| name | enumeration | Valid values: ATCS, DATA, DISC, USER, FLC, HWMC, IPC, LINK, PLAT, RDB, RTG, TEST, UTIL. |
| log-level | enumeration | Valid values (in increasing order of verbosity): fatal, error, warning, info, debug, trace. |

Version History:

Introduced in 3.1.

## low

Path:

authority \> traffic-profile \> low

Description:

This element has one configurable field, that lets administrators specify the guaranteed (minimum) bandwidth for low priority traffic.

| Element | Type | Description |
| --- | --- | --- |
| distribution | percentage | Valid values: 0-100. |

Version History:

Introduced in version 3.2.

## lte

Path:

authority \> router \> node \> device-interface \> lte

Description:

This element contains information regarding the configuration attributes for device-interfaces that support LTE (Long-Term Evolution), a 4G mobile communications standard. Note that this interface type requires that specific hardware is installed on your 128T routing element to communicate with the mobile network.

| Element | Type | Description |
| --- | --- | --- |
| apn-name | string | Mobile networks register devices using Access Point Names, abbreviated as "APN." The apn-name field is where you put the apn-name as specified to you by your mobile carrier. This will be used by the 128T router to connect to the LTE network. |

Version History:

Introduced in 3.1.

## medium

Path:

authority \> traffic-profile \> medium

Description:

This element has one configurable field, that lets administrators specify the guaranteed (minimum) bandwidth for medium priority traffic.

| Element | Type | Description |
| --- | --- | --- |
| distribution | percentage | Valid values: 0-100. |

Version History:

Introduced in version 3.2.

## member (redundancy-group)

Path:

authority \> router \> redundancy-group \> member

Description:

The *member* sub-element is configured for each member interface to share fate in a *redundancy-group*.

| Element | Type | Description |
| --- | --- | --- |
| device-id | string | Key field. The node's device-interface \> name to be a member of this redundancy-group. |
| node | reference | Key field. A reference to a configured node's *name* field. |

Version History:

Introduced in 2.0. Updated in 3.2: changed device-id to refer to the device-interface's *name* rather than *id*.

## member (tenant)

Path:

authority \> tenant \> member

Description:

The *member* sub-element is configured to describe prefix-to-neighborhood mappings for membership to the tenant.

| Element | Type | Description |
| --- | --- | --- |
| address | CIDR | Multiple instance. The CIDR block of addresses that -- within a neighborhood -- are said to belong to this tenant. |
| neighborhood | string | Key field. The neighborhood for which the prefixes are to be treated as members of the tenant. |

Version History:

Introduced in 3.0.

## metrics

Path:

authority \> router \> system \> metrics

Description:

The *metrics* sub-element governs various aspects of the 128T router's data sampling for analytics purposes.

| Element | Type | Description |
| --- | --- | --- |
| sample-period | uint8 | Valid values: 1-60. Default is 5. Configured in seconds. |

Version History:

Introduced in 3.0. Updated in 3.2: revised range from 1-10.

## multihop

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> multihop

Description:

The *multihop* sub-element lets administrators set properties related to the 128T router's eBGP multihop behavior when sending BGP messages to its neighbor.

| Element | Type | Description |
| --- | --- | --- |
| ttl | uint8 | The time-to-live (TTL) value to use when packets are sent to the neighbor. Only applicable when eBGP multihop is also enabled. |

Version History:

Introduced in 1.0.

## nat-pool

Path:

authority > router > nat-pool

Description:

The *nat-pool* is used for masking one network range into another by changing the least significant bits.

| Element | Type | Description |
| --- | --- | --- |
| address-pool | sub-element | The address pool to NAT to. This can be either an IPv4 or IPv6 prefix. |
| name | string | A unique identifier for this nat-pool. |

## neighbor (network-interface)

Path:

authority \> router \> node \> device-interface \> network-interface \> neighbor

Description:

The *neighbor* sub-element (within a network-interface) defines the IP-to-MAC binding for all directly connected neighbors that the network-interface is capable of reaching.

| Element | Type | Description |
| --- | --- | --- |
| ip-address | address | Key field. The IP address of the neighboring device. |
| phys-address | phys-address | The MAC address of the neighboring device. |

Version History:

Introduced in 1.0.

## neighbor (routing-protocol)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor

Description:

The *neighbor* sub-element defines the IP address and Autonomous System (AS) number for remote BGP peers to which this 128T router instance will peer.

| Element | Type | Description |
| --- | --- | --- |
| address-family | sub-element | Multiple instance. This configures the various options and attributes for the behavior the 128T router should assume when speaking with this neighbor, per address-family. At this time only ipv4-unicast is supported. |
| auth-password | string | An MD5 authentication password to use with this neighbor. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| local-as | uint32 | The local autonomous system number (AS) that is to be used when establishing sessions with this neighbor. (If not configured, the value from the routing-protocol will be used.) |
| multihop | sub-element | This sub-element contains configuration parameters that govern the 128T router's behavior for multihop BGP sessions to this neighbor. |
| neighbor-address | address | Key field. |
| neighbor-as | uint32 | The autonomous system number of the BGP peer. |
| neighbor-policy | sub-element | Allows for configuring the policy statements to use when exchanging routes with this BGP neighbor. |
| outbound-policy-advertise | boolean | When false, this 128T will not advertise any routes to its BGP peer. |
| shutdown | boolean | When true, the neighbor connection is considered administratively shut down, and the connection will not be established. |
| timers | sub-element | This sub-element controls timers associated with the BGP behavior when communicating with this neighbor. |
| transport | sub-element | This sub-element controls transport layer behavior when communicating with this BGP neighbor. |

Version History:

Introduced in 1.0. Updated in 3.0: removed *inbound-policy* and *outbound-policy* references. Updated in 3.2: added *neighbor-policy*.

## neighbor-policy

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> neighbor-policy

Description:

The *neighbor-policy* sub-element defines how/whether certain types of routes get advertised to the applicable neighbor.

| Element | Type | Description |
| --- | --- | --- |
| outbound-policy-advertise | boolean | When false, this 128T will not advertise any routes to its BGP peer. |
| transit-policy-advertise | boolean | When false, this 128T will not advertise any transit routes to its BGP peer. |

Version History:

Introduced in 3.2.

## neighborhood

Path:

authority \> router \> node \> device-interface \> network-interface \> neighborhood

Description:

The *neighborhood* multiple-instance sub-element describes the network connectivity between the interface on which this neighborhood is configured and other 128T routers that share the same neighborhood. (It merely describes the *intent* of connectivity; it does not guarantee that all links are up between the two interfaces, etc.) This is what a 128T router uses to construct a logical map of the network topology between all interfaces on all 128T routers within an Authority.

| Element | Type | Description |
| --- | --- | --- |
| bfd | sub-element | Defines the BFD properties and parameters to use with all routers within the neighborhood (unless specifically overridden on a given adjacency). |
| external-nat-address | address | This should be configured with the IP address that adjacent routers in this neighborhood will observe when this interface is used to send them packets. |
| name | string | Key field. |
| port-range | sub-element | This lets administrators specify the port range this router will use to construct SVR sessions with peers. This is used when the router is behind a firewall, for example, and the range of ports needs to be constrained. |
| qp-value | uint32 | The number of Quality Points that this interface can support. Used for route determination. |
| topology | enumeration | Valid values: mesh, hub, spoke. Default: mesh. This describes the relationship that this interface has with other interfaces in the same neighborhood. When the value is *mesh*, all other interfaces within the neighborhood are considered adjacencies. When the value is *hub*, this router is said to peer with other *spoke* and *mesh* members within the same neighborhood. When the value is *spoke*, this router is said to peer with other *hub* and *mesh* members of the neighborhood. |
| udp-transform | sub-element | Configuration settings related to the 128T router's UDP transformation feature, which transforms L4 protocols to UDP in order to avoid middleboxes that filter/mangle/manage TCP sessions. |
| vector | string | The vector (variable cost) that will be used for path selection when transmitting traffic that has a commensurate service-policy. |

Version History:

Introduced in 3.0. Updated in 3.1: added the ability to specify neighborhood-wide *bfd* properties. Updated in 3.2: added *external-nat-address*, *port-range*, *udp-transform*, and *vector* elements.

## network

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> network

Description:

The *network* multiple-instance sub-element describes the networks that this 128T router will advertise to the specified BGP peer(s).

| Element | Type | Description |
| --- | --- | --- |
| network-address | CIDR | Key field. |

Version History:

Introduced in 1.0. Updated in 3.0: removed *policy*.

## network-interface

Path:

authority \> router \> node \> device-interface \> network-interface

Description:

The network-interface element represents a logical interface on a node.

| Element | Type | Description |
| --- | --- | --- |
| address | sub-element | The IP address assigned to this network-interface, and its various properties. |
| adjacency | sub-element | This multiple-instance sub-element references neighboring routers. |
| classify | boolean | Default: true. This governs whether packet classification is performed on packets arriving on this interface. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| dhcp | enumeration | Valid values: disabled, v4. Default value: disabled. When set to v4, this interface will attempt to acquire an IPv4 address using DHCP (Dynamic Host Configuration Protocol). When disabled, the address on the interface should be administratively set to a static IP. |
| dscp-map | reference | This specifies the particular dscp-map configuration (via its *name*) to use on this interface for inbound packets. A dscp-map represents a set of DSCP values that map to 128T priority values (0-3) to indicate the relative priority of the traffic within the 128T router's traffic engineering subsystem. |
| global-id | uint32 | This represents the "Global Interface ID" (a.k.a., the "GIID") of an interface. Two network-interface configurations on distinct nodes are configured to be redundant with each other through the use of a common GIID. |
| hostname | string | A hostname by which external parties can use DNS to resolve to this interface's IP address. |
| icmp | enumeration | Valid values: drop, allow. Governs whether this interface will block ICMP requests or allow them. |
| inter-router-security | reference | A reference to a configured *security* element, used when exchanging packets/sessions with other 128T routers on this interface. |
| mtu | uint32 | The maximum transmission unit (MTU) for packets sent by this interfaces. Packets larger than this MTU will be fragmented upon egress. |
| name | string | Key field. The unique label assigned to this interface, used to reference it in other parts of the 128T router's configuration. |
| neighbor | sub-element | Single instance. This lets administrators set the IP:MAC associations for a neighboring device. |
| neighborhood | sub-element | This is where *neighborhood* labels are applied, to indicate connectivity to other 128T routers within the Authority. When two routers both have an interface within the same *neighborhood* (i.e., they share a common label), they are intended to be mutually reachable. |
| prioritization-mode | enumeration | Valid values: local, dscp. Default value: local. When set to *local*, the 128T router will use its local classification configuration to assign priorities to inbound flows (for traffic engineering purposes). When set to *dscp*, the 128T router will use inbound DSCP values to map to priorities (based on the *dscp-map* referenced in this element). |
| qp-value | uint32 | The number of Quality Points that this interface can support. Used for route determination. |
| rewrite-dscp | boolean | When true, packet classification is performed (to look for known/configured session-types, etc.). When false, the classification step is not performed. |
| source-nat | boolean | When set to "true", the 128T router will perform network address and port translation (NAPT) for all flows egressing the interface. When set to "false", the original IP:port are preserved. |
| tenant | reference | When configured, all packets arriving on this interface are considered to be part of the named tenant. When empty, the tenant for ingress traffic will be determined using other techniques (matching the source table, derived from inbound metadata, matching a source prefix on a tenant's configuration, etc.). |
| type | enumeration | Valid values: fabric, external, shared. This enumeration is used by the 128T router to identify the interfaces it can use for inter-node (a.k.a. "fabric") traffic, or for interfaces that communicate with traditional networking equipment (a.k.a. "external"). When interfaces are used for both inter-node traffic as well as normal, ambient traffic the value "shared" should be used. |
| vlan | uint16 | Valid values: 0-4094. The L2 VLAN tag to use when sending packets, and the L2 tag to expect when receiving packets. |

Version History:

Introduced in 1.0. Updated in 1.1: deprecated "fabric-type" and replaced it with "type"; removed "gateway"; added global-id in support of network-interface redundancy. Updated in 2.0: "classify" renamed to "rewrite-dscp". Updated in 3.0: added *neighborhood*. Updated in 3.1: "auto" removed as an eligible value for *type*. Added *classify*, *dhcp*, *dscp-map*, and *prioritization-mode* configuration elements for features added in this software release. Updated in 3.2: added *hostname*, removed *enabled*.

## next-hop (service-route)

Path:

authority \> router \> service-route \> next-hop

Description:

This specifies the next-hop for reaching a service-route.

| Element | Type | Description |
| --- | --- | --- |
| gateway-ip | address | The IPv4 address for the gateway for the interface. |
| interface | reference | The name of a configured network-interface used to reach the service-route. |
| node-name | reference | The name of the node where the interface lives. |

Version History:

Introduced in 1.0.

## next-hop (static-route)

Path:

authority \> router \> routing \> static-route \> next-hop

Description:

This specifies the next-hop for an administratively-configured static route.

| Element | Type | Description |
| --- | --- | --- |
| ip-address | address | The IP address of the next hop. |
| distance | uint8 | Valid values: 1-255. The administrative distance for this static-route; the higher the value, the less preferred. |

Version History:

Introduced in 1.0. Updated in 3.0: removed *outgoing*. Updated in 3.2: added *distance*.

## node

Path:

authority \> router \> node

Description:

A *node* is a single software instance, one that comprises a whole or part of a 128T router or 128T conductor.

| Element | Type | Description |
| --- | --- | --- |
| asset-id | string | The *asset-id* is a unique identifier for a node within a 128T router, which is used with the 128T Conductor's "automated provisioning" feature. The asset-id, configured within a router's node in an Authority-wide configuration managed by a 128T Conductor, is matched to an asset-id supplied by an unprovisioned node. Once an asset-id match is established and accepted at the 128T Conductor, the 128T Conductor can definitively install and configure the appropriate software on that node. |
| asset-validation-enabled | boolean | When true, the system will check to ensure it meets minimum hardware requirements prior to launching 128T software. When false, this check is bypassed. This should not be bypassed unless it is recommended by the 128 Technology Customer Support team. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| device-interface | sub-element | Multiple instance. This list contains all of the physical devices that this node has configured. |
| enabled | boolean | True or false (default: true). Setting this field to disabled will administratively disable the node from participating in the 128T router. |
| forwarding-core-count | uint8 | The number of CPU cores that will be reserved on the underlying hardware platform for running 128T software. |
| location | string | A text description of this node's physical location. Used as descriptive text, only. |
| name | string | Key field. The unique label assigned to this interface, used to reference it in other parts of the 128T router configuration. |
| role | enumeration | Valid values: combo, conductor, control, slice. This defines the role of the node in the 128T router; combo is a single logical software deployment that behaves as both a Control and a Slice. For a standalone Control or Slice, select "control" or "slice", respectively. The "conductor" type refers to the 128T management platform. Note: only *combo* and *conductor* are supported at this time. |
| software-update-bandwidth | union | Range 1-999999999999, or "unlimited." Default: unlimited. Configured in bits/second, this lets you govern the amount of bandwidth that this 128T node will use when retrieving software download images during its upgrade operation. This is useful on slower links, to avoid congestion with production traffic. |
| ssh-keepalive | sub-element | Governs whether or not this system will support SSH keepalives. |
| usage-reporter-enabled | boolean | When true, this node will report anonymous usage statistics back to 128 Technology, Inc. for continuous improvement of our software. |

Version History:

Introduced in 1.0. Updated in 1.1: the *role* enumeration values changed to reflect the new element names. Updated in 3.0: added *conductor* to enumeration for *role*. Updated in 3.1: added *asset-id* as part of the Automated Provisioning feature introduced in software version 3.1. Updated in 3.2: added software-update-bandwidth, ssh-keepalive, asset-validation-enabled, forwarding-core-count.

## ntp

Path:

authority \> router \> system \> ntp

Description:

The *ntp* sub-element (within the *system* configuration) lets administrators configure information about the NTP servers within their management network. Configuring external NTP servers will cause all nodes within the 128T router to attempt to use them as a clock source.

| Element | Type | Description |
| --- | --- | --- |
| server | sub-element | The NTP server and its properties. |

Version History:

Introduced in 2.0.

## peer

Path:

authority \> router \> peer

Description:

A *peer* object models a remote router (in this system's *authority* or in a remote *authority*) that this 128T router will bridge to via STEP (the 128 Technology routing protocol) to share services.

| Element | Type | Description |
| --- | --- | --- |
| authority-name | string | This is the value configured as the *authority* \> *name* of the 128T router peer that this configuration element represents. |
| bfd | sub-element | Defines the BFD properties and parameters to use with the peer router. |
| description | string | Multiple instance. |
| generated | boolean | Default value: false. This field is set to *true* when a 128T conductor generates configuration based on two 128T routers having interfaces in a common *neighborhood*. When this field is set to *true*, the 128T conductor will delete and regenerate this configuration element upon each *commit*. Thus, when an administrator wants to make persistent configuration changes to this object after it has been generated by a 128T conductor, it is important to manually change this field to *false*. |
| inter-router-security | reference | Refers to a configured security-policy, and will be used when communicating with this peer. |
| name | string | Key field. An arbitrary name that represents the properties associated with the STEP bridge/connection to the peer router. This is typically set to be the name of the authority name or router name of the peer. |
| router-name | string | This is the value configured as the *router \> name* of the 128T router peer router that this configuration element represents. |

Version History:

Introduced in 1.0. Updated in 1.1: core-address renamed to control-address, to reflect new 128T naming conventions. Updated in 2.0: added tenant, removed role. Updated in 3.0: removed unused fields, removed *tenant*. Updated in 3.2: removed id, added generated.

## policy

Path:

authority > routing > policy

Description:

The *policy* element represents 128T's implementation of BGP route policies. A route policy lets administrators manipulate BGP messages based on criteria (as specified in `filter` configuration) to perform specific steps, each of which is contained within a `statement`.

| Element | Type | Description |
| --- | --- | --- |
| name | string | A unique identifier for this routing policy. This will be referenced by other configuration elements. |
| statement | sub-element | The actions to be taken as a part of the routing policy. |

## port-range

Path:

authority \> router \> node \> device-interface \> network-interface \> adjacency \> port‑range\
authority \> router \> node \> device-interface \> network-interface \> neighborhood \> port‑range\
authority \> service \> transport \> port-range

Description:

When a 128T router sends *vectored sessions* to another 128T router (that is, when it uses its 128T-specific routing technique), the device transmitting the packet to its peer chooses the L4 ports for itself as well as for the far end. Occasionally, 128T routers are deployed behind firewalls with only specific ranges of ports allowed through; by default, the 128T router will choose ports between 16,384 and 65,535. The port-range attribute (within an adjacency) defines the start and end ports that a local 128T router instead of the defaults, to account for any firewall rules that may exist between this 128T router and the far end 128T router (protecting the latter).

| Element | Type | Description |
| --- | --- | --- |
| end-port | l4-port | The ending port for the range. |
| start-port | l4-port | Key field. Valid values: 1025-16383. The starting port for the range. |

Version History:

Introduced in 2.0.

## port-range (host-service)

Path:

authority \> router \> node \> device-interface \> network-interface \> address \> host-service \> transport \> port-range

Description:

This is the range of ports (which may be as narrow as a single port) that are in use by the host-service that contains this sub-element.

| Element | Type | Description |
| --- | --- | --- |
| end-port | l4-port | The ending port for the range. |
| start-port | l4-port | Key field. The starting port for the range. |

Version History:

Introduced in 3.1 as part of the *host-service* feature.

## pppoe

Path:

authority \> router \> node \> device-interface \> pppoe

Description:

This is the container for the configurable attributes about a 128T router's support for PPPoE. The 128T router acts as a PPPoE client, and can retrieve information for this interface based upon the authentication protocol, password, and username elements configured here.

| Element | Type | Description |
| --- | --- | --- |
| authentication-protocol | enumeration | Valid values: chap, pap. The authentication protocol in use by the PPPoE server with which this 128T router will communicate. |
| password | string | The password to use when communicating with the PPPoE server. |
| user-name | string | The username to use when communicating with the PPPoE server. |

Version History:

Introduced in 3.1.

## prefix-limit (neighbor)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> address-family \> prefix-limit

Description:

This configuration element governs the number of prefixes that will be accepted for this specific neighbor.

| Element | Type | Description |
| --- | --- | --- |
| max-prefixes | uint32 | The number of prefixes accepted from each neighbor in this address-family. |
| restart-timer | uint16 | This controls the time (in seconds) after a connection is torn down with a peer due to excessive prefix limiting, before the 128T router will attempt to reconnect with the peer. |
| shutdown-threshold-pct | uint8 | Valid values: 0-100. Expressed as a percentage (of max-prefixes), the threshold before the 128T router generates log messages warning that a peer is approaching its max-prefix limit. |

Version History:

Introduced in 1.0.

## prefix-limit (routing-protocol)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> prefix-limit

Description:

This configuration element governs the number of prefixes that will be accepted for each BGP peer, for each address family.

| Element | Type | Description |
| --- | --- | --- |
| max-prefixes | uint32 | The number of prefixes accepted from each neighbor in this address-family. |
| restart-timer | uint16 | This controls the time (in seconds) after a connection is torn down with a peer due to excessive prefix limiting, before the 128T router will attempt to reconnect with the peer. |
| shutdown-threshold-pct | uint8 | Valid values: 0-100. Expressed as a percentage (of max-prefixes), the threshold before the 128T router generates log messages warning that a peer is approaching its max-prefix limit. |

Version History:

Introduced in 1.0.

## redundancy-group

Path:

authority \> router \> redundancy-group

Description:

The *redundancy-group* sub-element lets users specify device-interface elements (via their "id") that will share fate -- if any of them fail, the complements listed in the group will also be switched to their counterparts.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A human-readable description of the redundancy group. |
| member | sub-element | The member interfaces in a redundancy group. |
| name | string | Key field. This is a unique label used to identify the redundancy-group. |
| priority | uint8 | Valid values: 0-100. A number to indicate the preference of this group relative to other groups. The higher the number, the more preferred. |

Version History:

Introduced in 2.0.

## remote-login

Path:

authority \> remote-login

Description:

The *remote-login* feature creates management connections between the conductor and the routers it manages, allowing administrators to remotely log into the PCLI (or a Linux shell) from the conductor's PCLI or Linux shell.

| Element  | Type        | Description                                                  |
| -------- | ----------- | ------------------------------------------------------------ |
| enabled  | boolean     | Whether the remote-login feature is enabled for routers in this authority. |

### See Also
[Connecting to Routers](ts_connecting_to_routers.md)

## route-reflector

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> address-family \> route-reflector

Description:

This governs whether or not the 128T router should act as a route reflector for this neighbor, for this address family.

| Element | Type | Description |
| --- | --- | --- |
| client | boolean | When true, the neighbor is considered a route reflector client for this address family. |

Version History:

Introduced in 1.0.

## route-selection-options

Path:

authority \> router \> routing \> routing-protocol (bgp) \> route-selection-options

Description:

A sub-element within the BGP configuration that governs how the 128T router performs its best path selection.

| Element | Type | Description |
| --- | --- | --- |
| always-compare-med | boolean | Default: false. When true, the 128T router will compare multi-exit discriminator (MED) values from different ASes when selecting the best route. The default behavior only compares MED values received from the same AS. |
| external-compare-router-id | boolean | When true, the ID of the peer is a criteria for selecting the active path for external BGP neighbors. |
| ignore-as-path-length | boolean | Default: false. When true, the 128T router ignores the AS path length when choosing the best path. By default the 128T router will prefer paths with shorter lengths. |

Version History:

Introduced in 1.0.

## router

Path:

authority \> router

Description:

The *router* configuration element represents a 128T router or conductor; these are typically either one node (for standalone systems) or two nodes (for highly available systems).

The router element serves as a container for holding the nodes of a single deployed router, along with their associated services and policies.

| Element | Type | Description |
| --- | --- | --- |
| administrative-group | string | A tag that identifies this router as belonging to an administrative group for management purposes. |
| application-identification | sub-element | Allows administrators to configure the 128T router's behavior for application identification (understanding the applications based on the payload of packets). |
| bfd | sub-element | Allows administrators to configure the router-wide default BFD timers that all routers will use when sending exchanges among themselves. |
| conductor-address | hostname | Maximum two. This allows administrators to override the authority-wide addresses used to reach conductor for this specific router. This is typically used when a router is collocated with conductor and has access over a different network than the remaining router population. See [Conductor Deployment Patterns](bcp_conductor_deployment.md) for more information. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| dhcp-server-generated-address-pool | ipv4-prefix | This lets you configure the (internal) address prefix that will be used for the system's DHCP servers. By default it will use a link-local address block of 169.254.130.0/24. This should only be configured if you've already allocated that block for other purposes in your configuration. |
| entitlement | sub-element | An entitlement represents a purchased amount of bandwidth, licensing your 128T router. Each 128T router may only have one entitlement. |
| group | string | A label that is used to identify this router as belonging to a specific collection of one or more routers, for administrative access. E.g., administrators can group routers together with a common label configured here, and selectively show/hide groups within the 128T graphical user interface. |
| inter-node-security | reference | Refers to a configured *security* element (i.e., a security policy). |
| location | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| location-coordinates | geolocation | The router's location (coordinates), used for rendering it on the topology map in the 128T Conductor's GUI. The coordinates should be entered in ISO-6709 format. |
| maintenance-mode | boolean | Default: false. When true, alarms generated by this router will be shelved (not active). This is helpful when staging configuration for routers that have not yet been deployed. |
| name | string | Key field. A text string that names the router. Each distinct router within an authority must be named uniquely. |
| nat-pool | sub-element | A range of addresses (mask) that this router will use when forwarding traffic. |
| node | sub-element | A list of nodes that comprise this router. |
| peer | sub-element | Each peer defines the properties of another router (within this router's authority, or not) for bridging/connecting to via STEP. |
| redundancy-group | reference | A multiple instance sub-element for defining groups of interfaces that will all fail over in conjunction. (This supports what is known as a "shared fate" model of failover.) |
| reverse-flow-enforcement | enumeration | Valid values: none, strict. Default: none. This configuration element determines whether or not the 128T router requires that the egress interface for a reverse flow is the same as the ingress interface for a forward flow. In practice, when set to "strict", a router will perform a uRPF (Unicast Reverse Path Forwarding) check on the reverse flow to see if the interfaces match. If they do not match, the session will not be established. |
| routing | sub-element | This is a single instance sub-element for defining this router's routing properties. |
| service-route | sub-element | Multiple instance. The service-routes within this router are each defined as a sub-element within the router. |
| service-route-policy | sub-element | Multiple instance. The policies for distributing traffic to service-routes are defined as policies local to this router. |
| system | sub-element | Single instance, a reference to this 128T router instance's system-wide properties. |
| udp-transform | sub-element | The system settings for the 128T router's UDP transform function. |

Version History:

Introduced in 1.0. Updated in 1.1: added "entitlement" sub-element. Updated in 3.0: removed *priority*, added *location-coordinates*. Updated in 3.1: added *group*. Updated in 3.2: added *application-classification*, *maintenance-mode*, and *udp-tranform*.

## routing (authority-wide)

Path:

authority > routing

Description:

The *routing* element within an authority lets administrators configure policies and filters that are available to every router managed by a 128T conductor.

| Element | Type | Description |
| --- | --- | --- |
| filter | sub-element | A field for containing human-readable information. Has no impact on packet forwarding. |
| policy | sub-element | At this time, the 128T router only supports the BGPv4 routing protocol. |

## routing (per-router)

Path:

authority \> router \> routing

Description:

The *routing* element is a router-level container for all of the routing policies associated with a given 128T router deployment. Each routing element may have one and only one routing-instance.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| routing-protocol | sub-element | At this time, the 128T router only supports the BGPv4 routing protocol as a sub-element. (OSPF is configured within a different branch of the hierarchy.) |
| static-route | sub-element | Where administrators define static routes for their router. |
| type | enumeration | Valid values: default-instance. At this time, the 128T router only supports the "default-instance" type. |

Version History:

Introduced in 1.0.

## routing-protocol (bgp)

Path:

authority \> router \> routing \> routing-protocol (bgp)

Description:

The *routing-protocol* configuration element contains configuration properties related to each routing protocol. The fields shown in this element will vary based on the *type* chosen. (At this time, the only valid type is "bgp".)

| Element | Type | Description |
| --- | --- | --- |
| address-family | sub-element | A container for the behaviors, timers, and attributes related to each address family (AFI/SAFI) on the 128T router. |
| confederation | sub-element | This configuration sub-element controls the 128T router's behavior when it is within an autonomous system that is part of a BGP confederation. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| local-as | uint32 | The local autonomous system number of this 128T router. |
| neighbor | sub-element | Multiple instance. |
| route-selection-options | sub-element | This is a set of configuration options that control how the 128T router chooses the best path. |
| router-id | address | The ID of the 128T router, expressed as an IPv4 address. |
| timers | sub-element | Global timers related to the 128T router's BGP behavior. |
| type | enumeration | Valid value: bgp. |

Version History:

Introduced in 1.0.

## rule

Path:

authority > routing > filter > rule

Description:

The `rule` sub-element within a [route filter](#filter) will describe the matching criteria for the filter; note, the rule will attempt to match the attributes specified in the filter's `type`.

| Element | Type | Description |
| --- | --- | --- |
| as-path | regex | When the filter's type is set to `as-path-filter`, this allows you to specify a regex pattern to match the AS PATH in the BGP message. |
| community | regex | When the filter's type is `community-filter`, this lets you configure a regular expression pattern for matching the community of interest. |
| extended-community | regex | When the filter's type is `extended-community-filter`, this lets you configure a regular expression pattern for matching the BGP extended community attribute of interest. |
| filter | enumeration | Valid values: accept, reject. This will accept or reject the rule based on its `name`. |
| ge | uint8 | When the filter's type is `prefix-filter`, this lets you match prefixes greater than or equal to the prefix length specified. |
| le | uint8 | When the filter's type is set to `prefix-filter`, this lets you match prefixes less than the length of the prefix specified. |
| name | string | A unique identifier for this rule. |
| prefix | address prefix | When the filter's type is set to `prefix-filter`, this allows you to specify the prefix of interest. |

## security

Path:

authority \> security

Description:

This is a security policy that is attached to various other objects within the 128T router configuration hierarchy to govern how it interacts with its peers (within the router or inter-router). This includes the ciphers to use, when packets should be encrypted, when packets should include authentication information (so that a recipient may validate the sender), and which packets are considered permissible.

Generally, security policies are applied within routers, tenants, or services. When security policies are configured at several points within a hierarchy, *only the most specific security policy is enforced*. E.g., if traffic is sent within a router that has a configured security-policy within a tenant that has a security-policy, the tenant's security policy is enforced.

| Element | Type | Description |
| --- | --- | --- |
| adaptive-encryption | boolean | Default: true. When set to true, a router will not encrypt traffic that is already encrypted, irrespective of the setting of *encrypt* (below). E.g., if a session is already secured with IPsec or TLS, the 128T router will not re-encrypt this session, saving processing horsepower. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| encrypt | boolean | Default: true. This field affects whether information is encrypted when transmitted between 128T routers and/or 128T nodes. Depending on where this security policy is applied, it will affect whether a 128T router's metadata is encrypted (if applied to *router \> inter-node-security* or *peer \> inter-router-security*), or the payload of packets is encrypted (if applied to a *service* or *tenant*). |
| encryption-cipher | enumeration | Valid values: aes-cbc-128, aes-cbc-256. Defaults to aes-cbc-128. |
| encryption-iv | string | The initialization vector (IV) for encryption. |
| encryption-key | string | The encryption key for this security policy. |
| hmac | boolean | Default: true. When true, the 128T router will insert an HMAC value into packets. |
| hmac-cipher | enumeration | Valid values: sha1, sha256, sha256-128. The cipher used for generating the HMAC value inserted into metadata. |
| hmac-key | string | The HMAC key for this security policy. |
| hmac-mode | enumeration | Valid values: disabled, regular, time-based. Default: time-based. This governs whether and how the 128T router adds HMAC information to packets it transmits to an SVR peer. HMAC is used for peer-to-peer authentication of packets. When set to `disabled`, no HMAC is added to packets. When set to `regular`, a standard HMAC authentication pattern is included in all packets. When set to `time-based`, the HMAC authentication header will include timestamp information, as a replay attack mitigation. Note: including HMAC authentication headers in packets may impact performance. |
| name | string | Key field. This is a unique name used by other configuration elements to refer to this security-policy. |

Version History:

Introduced in 1.0.

Rearranged in 1.1. Eliminated unimplemented ciphers. Removed unnecessary modes for *encrypt* and *hmac* and set them as booleans. Moved *transport-state-enforcement [ ]{.underline}*to service-policy. Updated in 3.0: added *hmac-cipher*.

## server (ntp)

Path:

authority \> router \> system \> ntp \> server

Description:

This configuration defines external NTP timing sources that the 128T router's nodes will all attempt to clock from.

| Element | Type | Description |
| --- | --- | --- |
| ip-address | address | The IP address or hostname of the external NTP server. |

Version History:

Introduced in 2.0. Updated in 3.1: now supports hostnames in addition to IPv4 addresses.

## server (syslog)

Path:

authority \> router \> system \> syslog \> server

Description:

This configuration defines external syslog servers that the 128T router will send syslog messages to.

| Element | Type | Description |
| --- | --- | --- |
| ip-address | address | The IP address or hostname of the external syslog server. |
| port | l4-port | The L4 (UDP) port that the syslog server is listening on; this is typically 514. |

Version History:

Introduced in 2.0. Updated in 3.1: added support for hostnames in the *ip-address* field.

## server (webserver)

Path:

authority \> router \> system \> services \> webserver \> server

Description:

This configuration defines the listening address for running the 128T router's web GUI on a specific Control (or Combo) node.

| Element | Type | Description |
| --- | --- | --- |
| ip-address | address | The IP address to use for binding the 128T router's webserver. (The port will be taken from the *webserver* element.) |
| node-name | reference | Key field. The *name* field of the node that will use the IP address specified within this sub-element. |

Version History:

Introduced in 2.0.

## service

Path:

authority \> service

Description:

The 128T router solution is deployed to facilitate the delivery of new applications; as such, the service configuration is at the heart of the 128T router data model. It is where you define the services (such as web services, database services, etc.) that reside within the authority's tenants, as well as the properties of, and policies to apply to those services.

| Element | Type | Description |
| --- | --- | --- |
| access-policy | sub-element | This is a multiple instance sub-element that allows administrators to define groups of users (by address, address prefix, or QSN) that can be explicitly allowed or denied access to this service. See access-policy. |
| address | address | Multiple instance. When the 128T router receives packets matching the address(es) listed here, it considers those packets to be destined for this service and will follow its service routing logic. |
| application-name | string | The value configured here will be matched against the Common Name learned via application classification techniques for application identification purposes. |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| enabled | boolean | When false, this service is administratively disabled. Packets addressed to this service's address(es) will not be processed. |
| name | string | Key field. The name of the service, and used as the key for other objects needing to reference this service. |
| scope | enumeration | Valid values: public, private. |
| security | reference | Refers to a configured *security* instance by its name. |
| service-group | string | Optional. Placing a string here treats this service as belonging to a group with other services that share the same service-group string. This collection of services can be referred to en masse by the QSN that includes this service-group name. |
| service-policy | reference | Refers to a configured service-policy instance by its name. |
| share-service-routes | boolean | Default: true. When true, this will cause a conductor managing multiple routers in this router's Authority to create a service-route to point to any neighboring 128T router that contains a (non-peer) service-route for this service's traffic. |
| tenant | reference | Refers to a configured *tenant* instance by its name. |
| transport | sub-element | The transport protocol(s) and port(s) for the service. |

Version History:

Introduced in 1.0. Updated in 2.0: added *transport* to replace the deprecated *protocol*. Updated in 3.0: removed *protocol*. Updated in 3.1: removed *id*. Updated in 3.2: added *application-name* and *share-service-routes*.

## service-class

Path:

authority \> service-class

Description:

The service-class configuration is used to define the outbound treatment through the traffic engineering subsystem for sessions traversing a 128T router. The 128T router's term "service class" is used as defined in RFC 4594, "Configuration Guidelines for DiffServ Service Classes", which states:

A "service class" represents a set of traffic that requires specific delay, loss, and jitter characteristics from the network. Conceptually, a service class pertains to applications with similar characteristics and performance requirements, such as a "High-Throughput Data" service class for applications like the web and electronic mail, or a \"Telephony\" service class for real-time traffic such as voice and other telephony services. Such a service class may be defined locally in a Differentiated Services (DS) domain, or across multiple DS domains, possibly extending end to end.

The 128T router uses service classes to prioritize session flows through its traffic management subsystem. Service classes are assigned to traffic classes, which are in turn assigned to services, and each service class is mapped to one of four built-in traffic classes (high, medium, low, or best-effort). The 128T's traffic management subsystem uses these traffic-classes when scheduling packets for delivery to reserve bandwidth for each class, per egress interface.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| dscp | uint8 | The DSCP value to mark egress packets with for this service. |
| max-flow-burst | uint32 | Configured in bytes. Each flow using this service-class may be limited to bandwidth bursts by setting this field. |
| max-flow-rate | uint64 | Configured in bytes per second. This limits the maximum rate of each flow referencing this service class. |
| name | string | Key field. A unique label for this service-class that will be used by other objects to refer to a specific configured instance. |
| priority | integer | Valid values: 0-3. Deprecated in favor of traffic-class (below). The priority values govern the treatment for the traffic. Priority 0 is the highest priority, priority 3 is "best effort". |
| rate-limit | boolean | Default: false. When set to true, the 128T router will enforce the properties configured in max-flow-burst and max-flow-rate. |
| traffic-class | enumeration | Valid values: high, medium, low, best-effort. Working in concert with the 128T's traffic engineering subsystem, this lets administrators determine which traffic queues the traffic that references this service class will use, and therefore how much guaranteed bandwidth will be reserved for that class. |

Version History:

Introduced in 1.0. Reorganized in 1.1: *max-jitter*, *max-latency*, *max-loss*, *path-quality-filter*, *qp-preference*, *required-qp* all moved to service-policy. Updated in 3.0: *priority* is no longer a reference, but maps to one of four hardcoded priorities. Updated in 3.2: added *traffic-class*.

## service-policy

Path:

authority \> service-policy

Description:

These are policy parameters that may be applied to service traffic to affect its packet marking, rate limiting, load balancing strategy, etc.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| lb-strategy | enumeration | Valid values: hunt, proportional. This is the load balancing strategy to use for traffic that references this service-policy. |
| max-jitter | uint32 | Default: 100. Configured in milliseconds, the maximum acceptable jitter for services that use this service-class. |
| max-latency | uint32 | Default 250. Configured in milliseconds, the maximum acceptable latency for services that use this service class. |
| max-loss | decimal64 | Expressed as a percentage. Valid values: 0-100. Default 0.5 (0.05%). As a percentage of total packets, the acceptable threshold of packet loss for services that use this service class. |
| min-mos | union | Valid values: disabled or a decimal value from 1.00-5.00. When set to a decimal value, this will filter out paths that fall below the calculated MOS (Mean Opinion Score) based on the observed jitter, latency, and loss on the paths. |
| name | string | Key field. A unique label for this service-policy that will be used by other objects to refer to a specific configured instance. |
| path-quality-filter | boolean | Setting this to "true" causes the 128T router to enforce the configured values in max-jitter, max-latency, and max-loss when choosing paths for traffic forwarding. I.e., paths that do not meet the thresholds configured in these fields are *filtered out* and not considered viable. When set to false, the values configured in max-jitter, max-latency, and max-loss are ignored. |
| qp-preference | enumeration | Valid values: highest, lowest. After filtering out next hops that do not meet this service-class's required-qp value, the 128T router will order them from highest to lowest (when this is set to highest), or lowest to highest (when this is set to lowest). This determines whether a service's traffic will take the best quality link available, or the minimum viable link available. |
| required-qp | uint32 | The required number of Quality Points for this service. Interfaces not meeting this threshold are not considered as valid next hops. |
| service-class | reference | A reference to a configured service-class. |
| session-resiliency | enumeration | Valid values: none, failover, revertible-failover, packet-duplication. Default: none. This governs how the 128T router provides resilience for sessions in the event of network issues that would cause it to choose a new path for active traffic processing. The default "none" will take no action in the event of failure. The value "failover" will cause the 128T to seek another path for traffic when a failure is detected. The value "revertible-failover" will seek another path, but return to the previous path when the disruption is deemed to be restored. The value "packet-duplication" causes the 128T router to generate two sets of packets and sends them on multiple, distinct paths to the destination -- where the recipient 128T router filters the duplicates out prior to forwarding the traffic. |
| transport-state-enforcement | enumeration | Valid values: allow, block, reset. Default: reset. This governs the behavior of a router's TCP state machine when receiving unexpected packets. When set to 'reset', if a router receives a TCP packet that does not match any session-in progress and the SYN flag is not set, or it receives a packet that does match a session in progress but it does not conform to the router's TCP state machine (e.g., the sequence number is outside the expected window), the router will send a RST back to the sender. Setting this field to 'allow' causes the router to pass non-SYN first packets and non-conforming packets (per the TCP state machine's expectations). The 'block' setting causes the router to silently discard non-SYN first packets and non-conformant packets (again, per the state machine). |
| vector | sub-element | The vector sub-element is where administrators assign costs to vector labels (which are associated with neighborhoods on egress interfaces), to assist in choosing the most appropriate path for traffic that references this service-policy. Each service-policy can independently assign costs to these vector variables, and therefore the same topology of 128T routers can route distinct service traffic uniquely. |

Version History:

Introduced in 1.0. Updated in 1.1: many fields from service-class reorganized into service-policy; *transport-state-enforcement* moved from security to service-policy. Updated in 3.0: added *session-resiliency*. Updated in 3.1: added *min-mos*. Updated in 3.2: added *vector*.

## service-route

Path:

authority \> router \> service-route

Description:

A service-route is a target route for handling traffic for a given service.

| Element | Type | Description |
| --- | --- | --- |
| destination | address | The target address for this service-route. \[Deprecated, please use *nat-target*.\] |
| generated | boolean | Default value: false. This field is set to *true* when a 128T conductor generates configuration based on two 128T routers having interfaces in a common *neighborhood*. When this field is set to *true*, the 128T conductor will delete and regenerate this configuration element upon each *commit*. Thus, when an administrator wants to make persistent configuration changes to this object after it has been generated by a 128T conductor, it is important to manually change this field to *false*. |
| name | string | Key field. A unique name to represent this service-route. |
| nat-target | address | The target address for this service-route. |
| next-hop | sub-element | This specifies the fully qualified interface (node, interface, gateway) to use to reach this service-route. |
| peer | reference | The name of a configured *peer* element to use for this service-route. |
| service-name | reference | The name of the service to which this service-route belongs. |
| service-route-policy | reference | The service-route-policy to use when handling traffic for this service-route. |

Version History:

Introduced in 1.0. Updated in 1.1: renamed to *service-route* (was *service-agent*). Version 03: fixed old reference (*server-ip* should be *destination*). Updated in 3.0: added *peer*. Updated in 3.1: renamed *destination* as *nat-target*; removed *remote-tenant-id*. Updated in 3.2: added *generated*.

## service-route-policy

Path:

authority \> router \> service-route-policy

Description:

Service agent policies are used to define the properties of individual service agents for things such as capacity and rate-limiting. This in turn affects the selection process for a 128T router when determining the most appropriate service agent for a new inbound session request.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| max-sessions | enumeration | Valid values: unlimited, or a number ranging from 0-999999999999. When set to "unlimited", there will be no limit to the number of new sessions that can be sent to service-routes configured with this service-route-policy. When configured with a numerical value, once the service-route using this service-route-policy reaches the configured threshold, no new sessions will be sent to it. |
| name | string | Key field. An arbitrary, unique name for the service agent policy. |
| session-high-water-mark | uint8 | Expressed as a percentage. Valid values: 1-100. Percentage of maximum sessions above which the agent will no longer be considered for load balancing. The denominator for the percentage considers the max-sessions value configured in this policy. |
| session-low-water-mark | uint8 | Expressed as a percentage. Valid values: 1-100. Percentage of maximum sessions below which the agent will be reconsidered for load balancing. The denominator for the percentage considers the max-sessions value configured in this policy. |
| session-rate | enumeration | Valid values: unlimited, or uint32. This represents the maximum rate at which sessions can be sent to a service-route that references this service-route-policy. The configured value is expressed in sessions per second. When set to "unlimited", there will be no rate limiting of new session assignments that can be sent to service-routes configured with this service-route-policy. When configured with a numerical value, once the service-route using this service-route-policy reaches the configured rate limit threshold, no new sessions will be sent to it until the rate drops below the configured value. |

Version History:

Introduced in 1.0. Updated in 1.1: renamed to *service-route-policy* (was *service-agent-policy*).

## services

Path:

authority \> router \> system \> services

Description:

This represents the set of internal 128T router services and they should not be modified from their defaults unless instructed to do so by 128 Technology's support department. This list is included here for completeness only.

| Element | Type | Description |
| --- | --- | --- |
| webserver | sub-element | The 128T router's web server. |

Version History:

Introduced in 1.0. Updated in 2.0, removed most internal elements.

## session-type

Path:

authority \> session-type

Description:

The *session-type* sub-element lets administrators specify custom applications, for classification purposes, based on their Layer 4 port and transport. The 128T router is shipped with a series of default classification types for well-known port/protocol combinations (e.g., TCP:80 is HTTP).

Administrators may also re-classify any of the defaults if the values are different in their environment.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| name | string | Key field |
| service-class | reference | The service-class to use for flows matching this session-type. |
| timeout | uint64 | Expressed in milliseconds. The inactivity timer for sessions of this type; administrators can set this value to free 128T router resources if a protocol goes idle for an amount of time equal to this timeout value. |
| transport | sub-element | The transport protocol and port(s) that are used to match inbound requests to this session-type. |

Version History:

Introduced in 1.0. Updated in 2.0: deprecated *protocol* in favor of *transport*. Updated in 3.0: removed *protocol*.

## ssh-keepalive

Path:

authority \> router \> node \> ssh-keepalive

Description:

The *ssh-keepalive* sub-element lets administrators control how often it sends keepalives on SSH connections and how many consecutive missed keepalives indicate a connection failure/reconnection attempt.

| Element | Type | Description |
| --- | --- | --- |
| inter-node | sub-element | The SSH keepalive parameters for other nodes within this router. |
| inter-router | sub-element | The SSH keepalive parameters for other routers within this authority. |

Version History:

Introduced in 3.2.

## static-route

Path:

authority \> router \> routing \> static-route

Description:

This is the sub-element that allows administrators to configure static routes, that will be entered into the 128T router's Routing Information Base (RIB).

| Element | Type | Description |
| --- | --- | --- |
| blackhole | N/A | When present, the static-route is a blackhole route (drains packets). |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| destination-prefix | CIDR | Key field. |
| distance | uint8 | Key field. The administrative distance for this static-route; used in calculating route preference when multiple possible paths exist learned via different sources. |
| next-hop | sub-element | Specifies the next-hop for this static route. |

Version History:

Introduced in 1.0. Updated in 3.0: added *blackhole*, *distance*.

## statement

Path:

authoritng > routing > policy > statement

Description:

The *statement* is the programmatic step of a routing policy. Routing policies are comprised of one or more statements, which combine to take action (e.g., accept or reject routes based on criteria, or modify routes). Each statement will evaluate all of its `condition` elements. If all conditions match (including the case where there are no `condition` elements configured), the `policy` for that statement will govern whether the policy will accept or reject that route.

An `accept` will then execute each `action` in the statement and then terminate the policy returning, accept. A `reject` means do not execute the actions and terminate the policy returning reject.

:::note
If a policy reaches the end of the statement list and no statement has been executed there is an implicit reject.
:::

| Element | Type | Description |
| --- | --- | --- |
| action | sub-element | The action to take based when this statement is executed. |
| condition | sub-element | The condition that must be satisfied in order to enforce the `policy` action of accept or reject. |
| name | string | Key field. A unique name for this statement. |
| policy | enumeration | Valid values: accept, reject. Governs whether the statement will `accept` or `reject`, typically based on a `condition`. |

## syslog

Path:

authority \> router \> system \> syslog

Description:

The *syslog* sub-element lets administrators configure the 128T router's interaction with external syslog services.

| Element | Type | Description |
| --- | --- | --- |
| facility | string | Valid values: local0, local1, local2, local3, local4, local5, local6, local7. This indicates the facility value (per RFC 5424) that the 128T router will use when sending syslog messages to external servers. |
| server | sub-element | The syslog server(s) that the 128T router will send messages to is/are configured here. |
| severity | enumeration | Valid values: emergency, alert, critical, error, warning, notice, info, debug, trace. This sets the level at which messages will be sent to the syslog server. |

Version History:

Introduced in 2.0.

## system

Path:

authority \> router \> system

Description:

The *system* sub-element lets administrators configure system-wide properties for their 128T router deployment.

| Element | Type | Description |
| --- | --- | --- |
| audit | sub-element | The router's properties for audit-type events. |
| contact | string | The administrative contact for this 128T router deployment. |
| inactivity-timer | uint32 | Valid values: 300-86400. The number of seconds that a CLI session can be inactive before the 128T router closes it. |
| log-category | sub-element | Allows administrators to selectively affect the logging verbosity of various 128T routing subsystems. |
| log-level | enumeration | Valid values: debug, error, fatal, info, trace, warning. |
| metrics | sub-element | For configuring aspects of the 128T router's data sampling for its analytics. |
| ntp | sub-element | For configuring external NTP time sources. |
| services | sub-element | Internal system services that the 128T router launches. |
| syslog | sub-element | The 128T router's configuration for communication with external syslog services. |

Version History:

Introduced in 1.0. Updated in 1.1: *ntp* added. Updated in 2.0: inactivity-timer, syslog added. Updated in 3.0: added *metrics*. Updated in 3.1: removed *location*, added *log-category*.

## system (audit)

Path:

authority \> router \> system \> audit \> system

Description:

This sub-element gives administrators the ability to administratively enable or disable system events.

| Element | Type | Description |
| --- | --- | --- |
| enabled | boolean | Default: true. When false, the system will not register any system events. |

Version History:

Introduced in 3.2.

## tenant

Path:

authority \> tenant

Description:

Tenancy is the logical partitioning of a network's resources, done in the interest of restricting access to network services to only the users and groups for which they're intended. Tenants are defined within an *authority*, and can span one or more *routers* within that authority. I.e., the services made available to that tenant can exist anywhere within the authority, irrespective of router, and the 128T router propagates routing information throughout the tenant to advertise the service's availability irrespective of the client's location. Essentially, tenants are intended to provide complete network segregation. Traffic from one tenant will not be allowed to traverse through another tenant's network, unless explicitly configured to do so.

An example for how tenants could be used would be segregating engineering from accounting within an organization. Another example would be multiple customers within the AWS infrastructure. Each tenant would be a different customer.

In the absence of any configured tenants (that is, no logical partitioning in the configuration), all services are said to belong to the implicit tenant within the authority, referred to as *tenant zero*. Tenant zero always exists; provisioning any tenant does not remove *tenant zero.*

The 128T router includes the ability to construct hierarchical tenancies, where a "parent" tenant may have zero or more "child" tenants. The hierarchical tenant model allows administrators to create arbitrary groups of tenants and apply policies to that group as a whole, rather than piecemeal. Furthermore, tenants are not restricted to a single hierarchy; two separate parent tenants can both reference the same child tenant, and policies applied to those parent tenants can have different attributes (referred to as "service policies"). Creating these groups of tenants affords the maximum flexibility and minimizes the amount of redundant configuration.

The 128T router uses a dotted notation naming scheme for grouping hierarchies of tenants. For example, a tenant named engineering.128technology is a child of the tenant 128technology. When other configuration objects refer to tenants, the effective scope can be controlled by specifying only a portion of a tenant's name. For example, a service that specifies 128technology as the tenant is available to engineering.128technology, finance.128technology, and 128technology.

It is not necessary for an administrator to explicitly create a "parent" tenant prior to creating a "child" tenant (the UI will perform validation and warn an administrator that their action of creating a child tenant will also create a parent tenant). The UI will prevent the deletion of a parent tenant if it has any child tenants.

| Element | Type | Description |
| --- | --- | --- |
| description | string | A field for containing human-readable information. Has no impact on packet forwarding. |
| generated | boolean | This is set to `true` when the configuration element has been automatically generated by a conductor. In order to make changes to a generated element persist, this field must be set to `false`. |
| member | sub-element | This replaces *address* in previous software versions, and lets administrators define address blocks within *neighborhoods* to describe tenant membership. |
| name | string | Key field. It is an arbitrary, unique name that other configuration sections will refer to. |
| security | reference | This is a reference to the default security-policy to use for traffic within this tenancy. Note that this will be used only when a more specific service-policy (e.g., one within a service) is not specified. |

Version History:

Introduced in 1.0. Updated in 3.0: added *member*, removed (obsoleted) *address*. Updated in 3.1: removed *id*.

## timers (neighbor)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> timers

Description:

This sub-element allows administrators to control various BGP timers used when connecting to a specific neighbor.

| Element | Type | Description |
| --- | --- | --- |
| connect-retry | uint16 | This controls how long, in seconds, the 128T router waits between connection attempts to the neighbor. |
| hold-time | uint16 | The hold time is the amount of time a connection is considered active, when no messages (keepalive or otherwise) are received from the neighbor. This timer is reset upon each message received from the neighbor. The typical and recommended configuration is three times the keepalive-interval. |
| keepalive-interval | uint16 | The time interval (in seconds) that governs how often the 128T router sends keepalive messages to the neighbor. |
| minimum-advertisement-interval | uint16 | Referred to as the MinRouteAdvertisementIntervalTimer by RFC 4721, this is the minimum time between UPDATE messages sent to the neighbor. It is used to reduce traffic to the neighbor when NLRI exhibits instability. |

Version History:

Introduced in 1.0.

## timers (routing-protocol)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> timers

Description:

This sub-element allows administrators to control the default BGP timers the 128T router will use when connecting to any neighbor.

| Element | Type | Description |
| --- | --- | --- |
| hold-time | uint16 | The hold time is the amount of time a connection is considered active, when no messages (keepalive or otherwise) are received from a neighbor. This timer is reset upon each message received from a neighbor. The typical and recommended configuration is three times the keepalive-interval. |
| keepalive-interval | uint16 | The time interval (in seconds) that governs how often the 128T router sends keepalive messages to a neighbor. |

Version History:

Introduced in 1.0.

## traffic

Path:

authority \> router \> system \> audit \> traffic

Description:

This sub-element gives administrators the ability to administratively enable or disable traffic events.

| Element | Type | Description |
| --- | --- | --- |
| enabled | boolean | Default: true. When false, the system will not register any traffic events. |

Version History:

Introduced in 3.2.

## traffic-engineering

Path:

authority \> router \> node \> device-interface \> traffic-engineering

Description:

This sub-element allows administrators to adjust properties of this device-interface related to traffic engineering.

| Element | Type | Description |
| --- | --- | --- |
| enabled | boolean | Default: false. Setting this to *true* applies the configured properties of this traffic-engineering element. |
| traffic-profile | reference | This refers to a configured *traffic-profile* element used to adjust the relative percentages given for high, medium, low, and best-effort traffic classes. |
| transmit-cap | enumeration | Valid values: *unlimited* or an integer from 0-999999999999. This sets the maximum transmission rate of this interface in bits per second (bps). |

Version History:

The transmit-cap configuration field was previously located within the device-interface, and was moved to its own sub-element as of software version 3.1. Updated in 3.2: added *traffic-profile*.

## traffic-profile

Path:

authority \> traffic-profile

Description:

This sub-element allows administrators to adjust properties of how much guaranteed bandwidth is allocated for various traffic categories. Note that the values within best-effort, high, medium, and low are percentage values and must add up to 100 (percent).

| Element | Type | Description |
| --- | --- | --- |
| name | string | Key field. The name of this traffic-profile. |
| best-effort | sub-element | Sets the percentage of bandwidth reserved for best-effort priority traffic. |
| high | sub-element | Sets the percentage of bandwidth reserved for high priority traffic. |
| low | sub-element | Sets the percentage of bandwidth reserved for low priority traffic. |
| medium | sub-element | Sets the percentage of bandwidth reserved for medium priority traffic. |

Version History:

Introduced in version 3.2.

## transport (BGP neighbor)

Path:

authority \> router \> routing \> routing-protocol (bgp) \> neighbor \> transport

Description:

This sub-element governs the transport protocol parameters for a BGP connection to this neighbor.

| Element | Type | Description |
| --- | --- | --- |
| local-address | address | *or* reference   This is the local address to use for the BGP session with the neighbor. It may be an IPv4 address, or a reference to an interface configured on the 128T router. |
| passive-mode | boolean | When set to *true*, the 128T router will wait for its neighbor to initiate a BGP peering connection. |

Version History:

Introduced in 1.0.

## transport (host-service)

Path:

authority \> router \> node \> device-interface \> network-interface \> address \> host-service \> transport

Description:

This sub-element defines the port range and transport protocol for matching to inbound packets, to associate them with a configured *host-service*. Packets matching the *address* of a node's network-interface, as well as a port and protocol defined within this sub-element, will be bridged to a corresponding service on the underlying Linux platform.

| Element | Type | Description |
| --- | --- | --- |
| port-range | sub-element | The port(s) that the host-service uses. |
| protocol | enumeration | Valid values: tcp, udp, icmp. The transport protocol(s) that the host-service uses. |

Version History:

Introduced in 3.1 as part of the *host-service* feature.

## transport (service)

Path:

authority \> service \> transport

Description:

This sub-element defines the port range and transport protocol for the service.

| Element | Type | Description |
| --- | --- | --- |
| port-range | sub-element | The port(s) that the service uses. |
| protocol | enumeration | Valid values: tcp, udp, icmp. The transport protocol(s) that the service uses. |

Version History:

Introduced in 2.0. Updated in 3.1: removed *any* as a valid enumeration value for "protocol".

## transport (session-type)

Path:

authority \> session-type

Description:

This sub-element defines the port range and transport protocol that are used to match inbound packets to the properties associated with a session-type.

| Element | Type | Description |
| --- | --- | --- |
| port-range | sub-element | The port(s) that the service uses. |
| protocol | enumeration | Valid values: tcp, udp, icmp. The transport protocol(s) that the service uses. |

Version History:

Introduced in 2.0. Updated in 3.1: removed *any* as a valid enumeration for protocol.

## udp-transform

Path:

authority \> router \> node \> device-interface \> network-interface \> neighborhood \> udp-transform\
authority \> router \> udp-transform

Description:

This sub-element defines the port range and transport protocol that are used to match inbound packets to the properties associated with a session-type.

| Element | Type | Description |
| --- | --- | --- |
| detect-interval | uint32 | Valid values: 1-86400. The time, in seconds, between tests of the TCP firewall detector to see if UDP transform needs to be enabled on an interface. |
| mode | enumeration | Valid values: auto-detect, always-transform. Default: auto-detect. This governs whether the UDP transformation behavior is triggered upon detection of an interfering TCP middlebox or whether the UDP transformation should be applied even when no detection has occurred. |

Version History:

Introduced in 3.2.

## use-multiple-paths

Path:

authority \> router \> routing \> routing-protocol (bgp) \> address-family \> use-multiple-paths

Description:

The *use-multiple-paths* container has sub-elements for allowing administrators to configure the 128T router's behavior for multipath support for both eBGP and iBGP.

| Element | Type | Description |
| --- | --- | --- |
| ebgp | sub-element | This sub-element contains multipath parameters for external BGP (eBGP). |
| ibgp | sub-element | This sub-element contains multipath parameters for internal BGP (iBGP). |

Version History:

Introduced in 1.0.

## vector

Path:

authority \> service-policy \> vector

Description:

The *vector* sub-element lets administrators choose cost values for the vector labels that are assigned to neighborhoods on egress 128T forwarding interfaces. As part of the 128T's *secure vector routing* model, each vector can have a variable cost that is configured within the context of a service-policy, and these service-policy objects may have unique values for the same vectors -- effecting different traffic treatment over the same topology.

| Element | Type | Description |
| --- | --- | --- |
| name | string | The name associated with the vector. This must match a vector assigned to a neighborhood on a network-interface for it to have any impact on path selection. |
| priority | union | (uint32, enumeration)   The priority field can either be an explicit cost, ranging from 1-999999, or one of two keywords: ordered or never. When set to ordered, the vector will have an *implicit cost*, based on its configured order. (The *vector* elements may be manually reordered via the web UI or the PCLI.) When using *ordered*, the cost will default to the power of 10 in its list order, starting with 0 (i.e., the costs for a list of ordered items will be 1, 10, 100, ...). When set to *never*, the interface with the vector will never be used for traffic referencing this service-policy. |

Version History:

Introduced in 3.2.

## webserver

Path:

authority \> router \> system \> services \> webserver

Description:

The *webserver* element defines the address(es) and port upon which the 128T router's GUI listens. The 128T router's GUI is enabled by default, and will (by default) use the management address(es), on port 443.[^1] Thus, in the majority of deployment scenarios, this configuration is unused, despite the fact that the GUI is the primary mode of administrative interfacing with the 128T router.

Generally, this is only touched if an administrator wants to use either a nonstandard port, or to use an address distinct from the management address established (specified) during software installation.

| Element | Type | Description |
| --- | --- | --- |
| enabled | boolean | Default: true. When set to *true*, the webserver is enabled and will respond to inbound HTTPS requests on the specified address and port. |
| port | uint16 | The listening port for the 128T router's web server. |
| server | sub-element | The *server* element binds the 128T router's GUI to specific nodes at specific addresses using a series of these configuration elements. |

Version History:

Introduced in 1.0.

## Configuration Type Definitions

The items here reflect the base definition for each data type; specific field definitions may limit input for a data type to a more restrictive range than the base definition would allow. For example, the session-high-water-mark field within a service-route-policy is defined as a uint8, yet is expressed in the configuration as a percentage -- which limits its input to values between 0 and 100. The specific field definitions listed in the Configuration Element Reference section of this document list the validation rules for the values, when applicable.

| Data Type | Description |
| --- | --- |
| uint8 | An unsigned, 8-bit integer. The range of an unsigned 8-bit integer is 0-255. |
| uint16 | An unsigned, 16-bit integer. The range of an unsigned 16-bit integer is 0-65,535. |
| uint32 | An unsigned, 32-bit integer. The range of an unsigned 32-bit integer is 0-4,294,967,295. |
| string | A sequence of up to 64 alphanumeric characters. |
| source-spec | The source-spec is used to represent *either* an IPv4 address or a Qualified Service Name (QSN). The 128T router validates a source-spec using the *address* type or the *string* type, as applicable. |
| address | An IPv4 address, ranging from 0.0.0.0 to 255.255.255.255. |
| boolean | True or false. |
| CIDR | An IPv4 address plus subnet mask, expressed in the form aaa.bbb.ccc.ddd/ee. |
| base64 | A binary-to-text encoding that represents binary data in ASCII format. The 128T router uses MIME's Base64 implementation. |
| decimal64 | A 64-bit positive real number. |
| uint64 | An unsigned, 64-bit integer. The range of an unsigned 64-bit integer is 0-18,446,744,073,709,551,615. |
| geolocation | Geographic coordinates in ISO-6709 format. |