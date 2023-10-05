---
title: Configuration Command Guide 
sidebar_label: Configuration Command Guide
---

## `configure authority`

Authority configuration is the top-most level in the SSR configuration hierarchy. 

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-management`](#configure-authority-access-management) | Role Based Access Control (RBAC) configuration. |
| [`asset-connection-resiliency`](#configure-authority-asset-connection-resiliency) | Configure Asset Connection Resiliency |
| [`backwards-compatible-vrf-bgp-tenants`](#configure-authority-backwards-compatible-vrf-bgp-tenants) | When generating tenant names for VRF BGP over SVR, do not use leading or trailing underscores. This enables backwards compatibility with router versions earlier than 5.1.3 |
| [`bgp-service-generation`](#configure-authority-bgp-service-generation) | Configure BGP Service Generation |
| [`cli-messages`](#configure-authority-cli-messages) | Configure CLI Messages |
| [`client-certificate`](#configure-authority-client-certificate) | The client-certificate configuration contains client certificate content. |
| `clone` | Clone a list item |
| [`conductor-address`](#configure-authority-conductor-address) | IP address or FQDN of the conductor |
| [`currency`](#configure-authority-currency) | Local monetary unit. |
| `delete` | Delete configuration data |
| [`district`](#configure-authority-district) | Districts in the authority. |
| [`dscp-map`](#configure-authority-dscp-map) | Configure DSCP Map |
| [`dynamic-hostname`](#configure-authority-dynamic-hostname) | Hostname format for interfaces with dynamic addresses. It is a template with subsitution variables used to generate a unique hostname corresponding to Network Interfaces that have dynamically learned IP addresses. Uses the following substitution variables: {interface-id} for Network Interface Global Identifier {router-name} for Router Name {authority-name} for Authority Name For example, &#x27;interface-{interface-id}.{router-name}.{authority-name}&#x27;. |
| [`fib-service-match`](#configure-authority-fib-service-match) | When creating FIB entries by matching route updates to service addresses, consider the specified service addresses. |
| [`forward-error-correction-profile`](#configure-authority-forward-error-correction-profile) | A profile for Forward Error Correection parameters, describing how often to send parity packets. |
| [`idp-profile`](#configure-authority-idp-profile) | User defined IDP profiles. |
| [`ipfix-collector`](#configure-authority-ipfix-collector) | Configuration for IPFIX record export. |
| [`ldap-server`](#configure-authority-ldap-server) | LDAP Servers against which to authenticate user credentials. |
| [`management-service-generation`](#configure-authority-management-service-generation) | Configure Management Service Generation |
| [`metrics-profile`](#configure-authority-metrics-profile) | A collection of metrics |
| [`name`](#configure-authority-name) | The identifier for the Authority. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`password-policy`](#configure-authority-password-policy) | Password policy for user&#x27;s passwords. |
| [`pcli`](#configure-authority-pcli) | Configure the PCLI. |
| [`performance-monitoring-profile`](#configure-authority-performance-monitoring-profile) | A performance monitoring profile used to determine how often packets should be marked. |
| [`radius-server`](#configure-authority-radius-server) | Radius Servers against which to authenticate user credentials. |
| [`rekey-interval`](#configure-authority-rekey-interval) | Hours between security key regeneration. Recommended value 24 hours. |
| [`remote-login`](#configure-authority-remote-login) | Configure Remote Login |
| [`resource-group`](#configure-authority-resource-group) | Collect objects into a management group. |
| [`router`](#configure-authority-router) | The router configuration element serves as a container for holding the nodes of a single deployed router, along with their policies. |
| [`routing`](#configure-authority-routing) | authority level routing configuration |
| [`security`](#configure-authority-security) | The security elements represent security policies for governing how and when the SSR encrypts and/or authenticates packets. |
| [`service`](#configure-authority-service) | The service configuration is where you define the services that reside within the authority&#x27;s tenants as well as the policies to apply to those services. |
| [`service-class`](#configure-authority-service-class) | Defines the association between DSCP value and a priority queue. |
| [`service-policy`](#configure-authority-service-policy) | A service policy, which defines parameters applied to services that reference the policy |
| [`session-record-profile`](#configure-authority-session-record-profile) | A profile to describe how to collect session records. |
| [`session-recovery-detection`](#configure-authority-session-recovery-detection) | Configure Session Recovery Detection |
| [`session-type`](#configure-authority-session-type) | Type of session classification based on protocol and port, and associates it with a default class of service. |
| `show` | Show configuration data for &#x27;authority&#x27; |
| [`software-update`](#configure-authority-software-update) | Configure Software Update |
| [`step`](#configure-authority-step) | Configure Step |
| [`step-repo`](#configure-authority-step-repo) | List of Service and Topology Exchange Protocol repositories. |
| [`tenant`](#configure-authority-tenant) | A customer or user group within the Authority. |
| [`traffic-profile`](#configure-authority-traffic-profile) | A set of minimum guaranteed bandwidths, one for each traffic priority |
| [`trusted-ca-certificate`](#configure-authority-trusted-ca-certificate) | The trusted-ca-certificate configuration contains CA certificate content. |
| [`web-messages`](#configure-authority-web-messages) | Configure Web Messages |
| [`web-theme`](#configure-authority-web-theme) | Configure Web Theme |

## `configure authority access-management`

Role Based Access Control (RBAC) configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`role`](#configure-authority-access-management-role) | Configure Role |
| `show` | Show configuration data for &#x27;access-management&#x27; |
| [`token`](#configure-authority-access-management-token) | Configuration for HTTP authentication token generation. |

## `configure authority access-management role`

Configure Role

#### Usage

```
configure authority access-management role <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | A unique name that identifies this role. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`capability`](#configure-authority-access-management-role-capability) | The capabilities that this user will be granted. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-access-management-role-description) | A description about the role. |
| [`exclude-resource`](#configure-authority-access-management-role-exclude-resource) | Exclude a resource from being associated with this role. |
| [`name`](#configure-authority-access-management-role-name) | A unique name that identifies this role. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource`](#configure-authority-access-management-role-resource) | Associate this role with a resource. |
| [`resource-group`](#configure-authority-access-management-role-resource-group) | Associate this role with a top-level resource-group. |
| `show` | Show configuration data for &#x27;role&#x27; |

## `configure authority access-management role capability`

The capabilities that this user will be granted.

#### Usage

```
configure authority access-management role capability [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | Value to add to this list |

## `configure authority access-management role description`

A description about the role.

#### Usage

```
configure authority access-management role description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority access-management role exclude-resource`

Exclude a resource from being associated with this role.

#### Usage

```
configure authority access-management role exclude-resource <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Configure Id |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`id`](#configure-authority-access-management-role-exclude-resource-id) | Configure Id |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;exclude-resource&#x27; |

## `configure authority access-management role exclude-resource id`

Configure Id

#### Usage

```
configure authority access-management role exclude-resource id [<resource-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-id | The value to set for this field |

## `configure authority access-management role name`

A unique name that identifies this role.

#### Usage

```
configure authority access-management role name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority access-management role resource`

Associate this role with a resource.

#### Usage

```
configure authority access-management role resource <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Configure Id |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`generated`](#configure-authority-access-management-role-resource-generated) | Indicates whether or not the resource was automatically generated |
| [`id`](#configure-authority-access-management-role-resource-id) | Configure Id |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;resource&#x27; |

## `configure authority access-management role resource generated`

Indicates whether or not the resource was automatically generated

#### Usage

```
configure authority access-management role resource generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority access-management role resource id`

Configure Id

#### Usage

```
configure authority access-management role resource id [<resource-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-id | The value to set for this field |

## `configure authority access-management role resource-group`

Associate this role with a top-level resource-group.

#### Usage

```
configure authority access-management role resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority access-management token`

Configuration for HTTP authentication token generation.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`expiration`](#configure-authority-access-management-token-expiration) | Minutes after initial authentication that the authentication token is valid. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;token&#x27; |

## `configure authority access-management token expiration`

Minutes after initial authentication that the authentication token is valid.

#### Usage

```
configure authority access-management token expiration [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

#### Description

Units: minutes

## `configure authority asset-connection-resiliency`

Configure Asset Connection Resiliency

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-asset-connection-resiliency-enabled) | Enable asset connection resiliency by creating SSH tunnels for asset connections from managed Router to Conductor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;asset-connection-resiliency&#x27; |

## `configure authority asset-connection-resiliency enabled`

Enable asset connection resiliency by creating SSH tunnels for asset connections from managed Router to Conductor.

#### Usage

```
configure authority asset-connection-resiliency enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority backwards-compatible-vrf-bgp-tenants`

When generating tenant names for VRF BGP over SVR, do not use leading or trailing underscores. This enables backwards compatibility with router versions smaller than 5.1.3

#### Usage

```
configure authority backwards-compatible-vrf-bgp-tenants [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority bgp-service-generation`

Configure Bgp Service Generation

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`route-reflector-client-mesh`](#configure-authority-bgp-service-generation-route-reflector-client-mesh) | Generate service-route mesh for route reflector clients. |
| [`security-policy`](#configure-authority-bgp-service-generation-security-policy) | Security policy to be used instead of &#x27;internal&#x27;. |
| [`service-policy`](#configure-authority-bgp-service-generation-service-policy) | Service policy to be used for generated BGP services. |
| `show` | Show configuration data for &#x27;bgp-service-generation&#x27; |

## `configure authority bgp-service-generation route-reflector-client-mesh`

Generate service-route mesh for route reflector clients.

#### Usage

```
configure authority bgp-service-generation route-reflector-client-mesh [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority bgp-service-generation security-policy`

Security policy to be used instead of &#x27;internal&#x27;.

#### Usage

```
configure authority bgp-service-generation security-policy [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

## `configure authority bgp-service-generation service-policy`

Service policy to be used for generated BGP services.

#### Usage

```
configure authority bgp-service-generation service-policy [<service-policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-ref | The value to set for this field |

## `configure authority cli-messages`

Configure Cli Messages

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`login-message`](#configure-authority-cli-messages-login-message) | The message displayed before login through console. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;cli-messages&#x27; |
| [`welcome-message`](#configure-authority-cli-messages-welcome-message) | The message displayed after a successful login through console. |

## `configure authority cli-messages login-message`

The message displayed before login through console.

#### Usage

```
configure authority cli-messages login-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority cli-messages welcome-message`

The message displayed after a successful login through console.

#### Usage

```
configure authority cli-messages welcome-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority client-certificate`

The client-certificate configuration contains client certificate content.

#### Usage

```
configure authority client-certificate <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An identifier for the client certificate. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`content`](#configure-authority-client-certificate-content) | Client certificate content. |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-client-certificate-name) | An identifier for the client certificate. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;client-certificate&#x27; |

## `configure authority client-certificate content`

Client certificate content.

#### Usage

```
configure authority client-certificate content [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority client-certificate name`

An identifier for the client certificate.

#### Usage

```
configure authority client-certificate name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority conductor-address`

IP address or FQDN of the conductor

#### Usage

```
configure authority conductor-address [<hostv4>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostv4 | Value to add to this list |

## `configure authority currency`

Local monetary unit.

#### Usage

```
configure authority currency [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority district`

Districts in the authority.

#### Usage

```
configure authority district <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the district. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-district-name) | Name of the district. |
| [`neighborhood`](#configure-authority-district-neighborhood) | Neighborhoods which belong to this district. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-district-resource-group) | Associate this district with a top-level resource-group. |
| `show` | Show configuration data for &#x27;district&#x27; |

## `configure authority district name`

Name of the district.

#### Usage

```
configure authority district name [<non-default-district-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| non-default-district-name | The value to set for this field |

## `configure authority district neighborhood`

Neighborhoods which belong to this district.

#### Usage

```
configure authority district neighborhood [<neighborhood-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighborhood-id | Value to add to this list |

## `configure authority district resource-group`

Associate this district with a top-level resource-group.

#### Usage

```
configure authority district resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority dscp-map`

Configure Dscp Map

#### Usage

```
configure authority dscp-map <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the DSCP map |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`dscp-prioritization`](#configure-authority-dscp-map-dscp-prioritization) | Mapping from incoming DSCP value to a priority. These values are used when in DSCP trust mode. |
| [`dscp-traffic-class`](#configure-authority-dscp-map-dscp-traffic-class) | Mapping from incoming DSCP value to a traffic-class. These values are used when in DSCP trust mode. |
| [`name`](#configure-authority-dscp-map-name) | The name of the DSCP map |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-dscp-map-resource-group) | Associate this DSCP map with a top-level resource-group. |
| `show` | Show configuration data for &#x27;dscp-map&#x27; |

## `configure authority dscp-map dscp-prioritization`

Mapping from incoming DSCP value to a priority. These values are used when in DSCP trust mode.

#### Usage

```
configure authority dscp-map dscp-prioritization <priority>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| priority | The priority assigned to the incoming DSCP value. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`dscp-range`](#configure-authority-dscp-map-dscp-prioritization-dscp-range) | Configure Dscp Range |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-dscp-map-dscp-prioritization-priority) | The priority assigned to the incoming DSCP value. |
| `show` | Show configuration data for &#x27;dscp-prioritization&#x27; |

## `configure authority dscp-map dscp-prioritization dscp-range`

Configure Dscp Range

#### Usage

```
configure authority dscp-map dscp-prioritization dscp-range <start-value>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-value | Lower DSCP number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-value`](#configure-authority-dscp-map-dscp-prioritization-dscp-range-end-value) | Upper DSCP number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dscp-range&#x27; |
| [`start-value`](#configure-authority-dscp-map-dscp-prioritization-dscp-range-start-value) | Lower DSCP number. |

## `configure authority dscp-map dscp-prioritization dscp-range end-value`

Upper DSCP number.

#### Usage

```
configure authority dscp-map dscp-prioritization dscp-range end-value [<dscp-end-value>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp-end-value | The value to set for this field |

## `configure authority dscp-map dscp-prioritization dscp-range start-value`

Lower DSCP number.

#### Usage

```
configure authority dscp-map dscp-prioritization dscp-range start-value [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority dscp-map dscp-prioritization priority`

The priority assigned to the incoming DSCP value.

#### Usage

```
configure authority dscp-map dscp-prioritization priority [<priority-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| priority-id | The value to set for this field |

## `configure authority dscp-map dscp-traffic-class`

Mapping from incoming DSCP value to a traffic-class. These values are used when in DSCP trust mode.

#### Usage

```
configure authority dscp-map dscp-traffic-class <traffic-class>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-class | The traffic-class assigned to the incoming DSCP value. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`dscp-range`](#configure-authority-dscp-map-dscp-traffic-class-dscp-range) | Configure Dscp Range |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dscp-traffic-class&#x27; |
| [`traffic-class`](#configure-authority-dscp-map-dscp-traffic-class-traffic-class) | The traffic-class assigned to the incoming DSCP value. |

## `configure authority dscp-map dscp-traffic-class dscp-range`

Configure Dscp Range

#### Usage

```
configure authority dscp-map dscp-traffic-class dscp-range <start-value>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-value | Lower DSCP number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-value`](#configure-authority-dscp-map-dscp-traffic-class-dscp-range-end-value) | Upper DSCP number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dscp-range&#x27; |
| [`start-value`](#configure-authority-dscp-map-dscp-traffic-class-dscp-range-start-value) | Lower DSCP number. |

## `configure authority dscp-map dscp-traffic-class dscp-range end-value`

Upper DSCP number.

#### Usage

```
configure authority dscp-map dscp-traffic-class dscp-range end-value [<dscp-end-value>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp-end-value | The value to set for this field |

## `configure authority dscp-map dscp-traffic-class dscp-range start-value`

Lower DSCP number.

#### Usage

```
configure authority dscp-map dscp-traffic-class dscp-range start-value [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority dscp-map dscp-traffic-class traffic-class`

The traffic-class assigned to the incoming DSCP value.

#### Usage

```
configure authority dscp-map dscp-traffic-class traffic-class [<traffic-class-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-class-id | The value to set for this field |

## `configure authority dscp-map name`

The name of the DSCP map

#### Usage

```
configure authority dscp-map name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority dscp-map resource-group`

Associate this DSCP map with a top-level resource-group.

#### Usage

```
configure authority dscp-map resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority dynamic-hostname`

Hostname format for interfaces with dynamic addresses. It is a template with subsitution variables used to generate a unique hostname corresponding to Network Interfaces that have dynamically learned IP addresses. Uses the following substitution variables: {interface-id} for Network Interface Global Identifier {router-name} for Router Name {authority-name} for Authority Name For example, &#x27;interface-{interface-id}.{router-name}.{authority-name}&#x27;.

#### Usage

```
configure authority dynamic-hostname [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority fib-service-match`

When creating FIB entries by matching route updates to service addresses, consider the specified service addresses.

#### Usage

```
configure authority fib-service-match [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority forward-error-correction-profile`

A profile for Forward Error Correection parameters, describing how often to send parity packets.

#### Usage

```
configure authority forward-error-correction-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the Forward Error Correction profile |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-forward-error-correction-profile-mode) | Whether to dynamically adjust forward error correction to account for observed loss. |
| [`name`](#configure-authority-forward-error-correction-profile-name) | The name of the Forward Error Correction profile |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`ratio`](#configure-authority-forward-error-correction-profile-ratio) | The ratio (expressed as x:1) which will dictate the number of data packets to transmit before a parity packet will be transmitted. |
| `show` | Show configuration data for &#x27;forward-error-correction-profile&#x27; |

## `configure authority forward-error-correction-profile mode`

Whether to dynamically adjust forward error correction to account for observed loss.

#### Usage

```
configure authority forward-error-correction-profile mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority forward-error-correction-profile name`

The name of the Forward Error Correction profile

#### Usage

```
configure authority forward-error-correction-profile name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority forward-error-correction-profile ratio`

The ratio (expressed as x:1) which will dictate the number of data packets to transmit before a parity packet will be transmitted.

#### Usage

```
configure authority forward-error-correction-profile ratio [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority idp-profile`

User defined IDP profiles.

#### Usage

```
configure authority idp-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the profile. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`base-policy`](#configure-authority-idp-profile-base-policy) | Base policy used when building rules. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-idp-profile-name) | Name of the profile. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rule`](#configure-authority-idp-profile-rule) | Configure Rule |
| `show` | Show configuration data for &#x27;idp-profile&#x27; |

## `configure authority idp-profile base-policy`

Base policy used when building rules.

#### Usage

```
configure authority idp-profile base-policy [<idp-policy>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| idp-policy | The value to set for this field |

## `configure authority idp-profile name`

Name of the profile.

#### Usage

```
configure authority idp-profile name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority idp-profile rule`

Configure Rule

#### Usage

```
configure authority idp-profile rule <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the rule. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-idp-profile-rule-description) | Description of the rule. |
| [`match`](#configure-authority-idp-profile-rule-match) | The options to use for matching. |
| [`name`](#configure-authority-idp-profile-rule-name) | Name of the rule. |
| [`outcome`](#configure-authority-idp-profile-rule-outcome) | The outcome applied to the match |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rule&#x27; |

## `configure authority idp-profile rule description`

Description of the rule.

#### Usage

```
configure authority idp-profile rule description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority idp-profile rule match`

The options to use for matching.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`client-address`](#configure-authority-idp-profile-rule-match-client-address) | Client address prefix to match in the rule. |
| `delete` | Delete configuration data |
| [`destination-address`](#configure-authority-idp-profile-rule-match-destination-address) | Destination address prefix to match in the rule. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`severity`](#configure-authority-idp-profile-rule-match-severity) | Match vulnerabilities only with severity mentioned or above. |
| `show` | Show configuration data for &#x27;match&#x27; |
| [`vulnerability`](#configure-authority-idp-profile-rule-match-vulnerability) | List of custom vulnerabilities to match in the rule. |

## `configure authority idp-profile rule match client-address`

Client address prefix to match in the rule.

#### Usage

```
configure authority idp-profile rule match client-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority idp-profile rule match destination-address`

Destination address prefix to match in the rule.

#### Usage

```
configure authority idp-profile rule match destination-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority idp-profile rule match severity`

Match vulnerabilities only with severity mentioned or above.

#### Usage

```
configure authority idp-profile rule match severity [<idp-severity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| idp-severity | The value to set for this field |

## `configure authority idp-profile rule match vulnerability`

List of custom vulnerabilities to match in the rule.

#### Usage

```
configure authority idp-profile rule match vulnerability [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority idp-profile rule name`

Name of the rule.

#### Usage

```
configure authority idp-profile rule name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority idp-profile rule outcome`

The outcome applied to the match

##### Subcommands

| command | description |
| ------- | ----------- |
| [`action`](#configure-authority-idp-profile-rule-outcome-action) | Defines what action the system should take for the match. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`severity`](#configure-authority-idp-profile-rule-outcome-severity) | Modify a vulnerability severity level of the match. |
| `show` | Show configuration data for &#x27;outcome&#x27; |

## `configure authority idp-profile rule outcome action`

Defines what action the system should take for the match.

#### Usage

```
configure authority idp-profile rule outcome action [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority idp-profile rule outcome severity`

Modify a vulnerability severity level of the match.

#### Usage

```
configure authority idp-profile rule outcome severity [<idp-severity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| idp-severity | The value to set for this field |

## `configure authority ipfix-collector`

Configuration for IPFIX record export.

#### Usage

```
configure authority ipfix-collector <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | A unique name for the collector. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interim-record-interval`](#configure-authority-ipfix-collector-interim-record-interval) | The time after which a new interim record will be generated if a flow still exists. |
| [`ip-address`](#configure-authority-ipfix-collector-ip-address) | The IP address or hostname of the collector. |
| [`name`](#configure-authority-ipfix-collector-name) | A unique name for the collector. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-ipfix-collector-port) | The port of the collector. |
| [`protocol`](#configure-authority-ipfix-collector-protocol) | The transport protocol to be used when communicating with the collector. |
| [`resource-group`](#configure-authority-ipfix-collector-resource-group) | Associate this IPFIX collector with a top-level resource-group. |
| [`sampling-percentage`](#configure-authority-ipfix-collector-sampling-percentage) | The percentage of flows to be selected for export OR &#x27;dynamic&#x27;. When set to &#x27;dynamic&#x27;, the system will select a percentage based on the current data volume as follows: \|\| &lt; 100 Mb/s : 1 in 256 \|\| &lt; 1 Gb/s : 1 in 512 \|\| &lt; 10 Gb/s : 1 in 1024 \|\| &lt; 25 Gb/s : 1 in 2048 \|\| &gt; 25 Gb/s : 1 in 8192 \|\| |
| `show` | Show configuration data for &#x27;ipfix-collector&#x27; |
| [`template-refresh-interval`](#configure-authority-ipfix-collector-template-refresh-interval) | The time between template retransmissions when using the UDP protocol. |
| [`tenant`](#configure-authority-ipfix-collector-tenant) | The tenants whose records this collector should receive. An empty list indicates all tenants. |

## `configure authority ipfix-collector interim-record-interval`

The time after which a new interim record will be generated if a flow still exists.

#### Usage

```
configure authority ipfix-collector interim-record-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority ipfix-collector ip-address`

The IP address or hostname of the collector.

#### Usage

```
configure authority ipfix-collector ip-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority ipfix-collector name`

A unique name for the collector.

#### Usage

```
configure authority ipfix-collector name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority ipfix-collector port`

The port of the collector.

#### Usage

```
configure authority ipfix-collector port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority ipfix-collector protocol`

The transport protocol to be used when communicating with the collector.

#### Usage

```
configure authority ipfix-collector protocol [<ipfix-protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipfix-protocol | The value to set for this field |

## `configure authority ipfix-collector resource-group`

Associate this IPFIX collector with a top-level resource-group.

#### Usage

```
configure authority ipfix-collector resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority ipfix-collector sampling-percentage`

The percentage of flows to be selected for export OR &#x27;dynamic&#x27;. When set to &#x27;dynamic&#x27;, the system will select a percentage based on the current data volume as follows: || &lt; 100 Mb/s : 1 in 256 || &lt; 1 Gb/s : 1 in 512 || &lt; 10 Gb/s : 1 in 1024 || &lt; 25 Gb/s : 1 in 2048 || &gt; 25 Gb/s : 1 in 8192 ||

#### Usage

```
configure authority ipfix-collector sampling-percentage [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority ipfix-collector template-refresh-interval`

The time between template retransmissions when using the UDP protocol.

#### Usage

```
configure authority ipfix-collector template-refresh-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority ipfix-collector tenant`

The tenants whose records this collector should receive. An empty list indicates all tenants.

#### Usage

```
configure authority ipfix-collector tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | Value to add to this list |

## `configure authority ldap-server`

LDAP Servers against which to authenticate user credentials.

#### Usage

```
configure authority ldap-server <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the LDAP server. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-ldap-server-address) | The IP address or FQDN of the LDAP server. |
| [`auto-generate-filter`](#configure-authority-ldap-server-auto-generate-filter) | When enabled, the SSR will generate user-search-base and group-search-base LDAP filters. |
| [`bind-type`](#configure-authority-ldap-server-bind-type) | The type of binding to the LDAP server. |
| [`certificate-assurance`](#configure-authority-ldap-server-certificate-assurance) | LDAP assurance level to apply on server certificates in a TLS session. |
| `delete` | Delete configuration data |
| [`distinguished-name`](#configure-authority-ldap-server-distinguished-name) | The distinguished name to use for binding to the server. |
| [`group-search-base`](#configure-authority-ldap-server-group-search-base) | An optional group search LDAP filter to restrict searches for this attribute type. |
| [`name`](#configure-authority-ldap-server-name) | The name of the LDAP server. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`password`](#configure-authority-ldap-server-password) | The password to use for binding to the server. |
| [`port`](#configure-authority-ldap-server-port) | Port to connect to LDAP server. |
| [`resource-group`](#configure-authority-ldap-server-resource-group) | Associate this LDAP server with a top-level resource-group. |
| [`search-base`](#configure-authority-ldap-server-search-base) | The LDAP search base string. |
| [`server-type`](#configure-authority-ldap-server-server-type) | The type of LDAP server. |
| `show` | Show configuration data for &#x27;ldap-server&#x27; |
| [`user-search-base`](#configure-authority-ldap-server-user-search-base) | An optional user search LDAP filter to restrict searches for this attribute type. |

## `configure authority ldap-server address`

The IP address or FQDN of the LDAP server.

#### Usage

```
configure authority ldap-server address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority ldap-server auto-generate-filter`

When enabled, the SSR will generate user-search-base and group-search-base LDAP filters.

#### Usage

```
configure authority ldap-server auto-generate-filter [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority ldap-server bind-type`

The type of binding to the LDAP server.

#### Usage

```
configure authority ldap-server bind-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority ldap-server certificate-assurance`

LDAP assurance level to apply on server certificates in a TLS session.

#### Usage

```
configure authority ldap-server certificate-assurance [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority ldap-server distinguished-name`

The distinguished name to use for binding to the server.

#### Usage

```
configure authority ldap-server distinguished-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority ldap-server group-search-base`

An optional group search LDAP filter to restrict searches for this attribute type.

#### Usage

```
configure authority ldap-server group-search-base [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority ldap-server name`

The name of the LDAP server.

#### Usage

```
configure authority ldap-server name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority ldap-server password`

The password to use for binding to the server.

#### Usage

```
configure authority ldap-server password [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority ldap-server port`

Port to connect to LDAP server.

#### Usage

```
configure authority ldap-server port [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority ldap-server resource-group`

Associate this LDAP server with a top-level resource-group.

#### Usage

```
configure authority ldap-server resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority ldap-server search-base`

The LDAP search base string.

#### Usage

```
configure authority ldap-server search-base [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority ldap-server server-type`

The type of LDAP server.

#### Usage

```
configure authority ldap-server server-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority ldap-server user-search-base`

An optional user search LDAP filter to restrict searches for this attribute type.

#### Usage

```
configure authority ldap-server user-search-base [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority management-service-generation`

Configure Management Service Generation

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`service-policy`](#configure-authority-management-service-generation-service-policy) | Service policy to be used instead of auto-generated service policy. |
| [`service-route-type`](#configure-authority-management-service-generation-service-route-type) | Strategy to generate service-routes for management services. |
| `show` | Show configuration data for &#x27;management-service-generation&#x27; |

## `configure authority management-service-generation service-policy`

Service policy to be used instead of auto-generated service policy.

#### Usage

```
configure authority management-service-generation service-policy [<service-policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-ref | The value to set for this field |

## `configure authority management-service-generation service-route-type`

Strategy to generate service-routes for management services.

#### Usage

```
configure authority management-service-generation service-route-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority metrics-profile`

A collection of metrics

#### Usage

```
configure authority metrics-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the profile |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`filter`](#configure-authority-metrics-profile-filter) | A list of parameter values that should be included in the output. |
| [`metric`](#configure-authority-metrics-profile-metric) | The ID of the metric as it exists in the REST API |
| [`name`](#configure-authority-metrics-profile-name) | The name of the profile |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;metrics-profile&#x27; |

## `configure authority metrics-profile filter`

A list of parameter values that should be included in the output.

#### Usage

```
configure authority metrics-profile filter <parameter>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| parameter | The name of the parameter being referenced |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`parameter`](#configure-authority-metrics-profile-filter-parameter) | The name of the parameter being referenced |
| `show` | Show configuration data for &#x27;filter&#x27; |
| [`value`](#configure-authority-metrics-profile-filter-value) | The values that should be included if matched |

## `configure authority metrics-profile filter parameter`

The name of the parameter being referenced

#### Usage

```
configure authority metrics-profile filter parameter [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority metrics-profile filter value`

The values that should be included if matched

#### Usage

```
configure authority metrics-profile filter value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority metrics-profile metric`

The ID of the metric as it exists in the REST API

#### Usage

```
configure authority metrics-profile metric <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | The ID of the metric as it exists in the REST API |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-metrics-profile-metric-description) | A customizable description of this metric&#x27;s purpose |
| [`id`](#configure-authority-metrics-profile-metric-id) | The ID of the metric as it exists in the REST API |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;metric&#x27; |

## `configure authority metrics-profile metric description`

A customizable description of this metric&#x27;s purpose

#### Usage

```
configure authority metrics-profile metric description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority metrics-profile metric id`

The ID of the metric as it exists in the REST API

#### Usage

```
configure authority metrics-profile metric id [<metric-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| metric-id | The value to set for this field |

## `configure authority metrics-profile name`

The name of the profile

#### Usage

```
configure authority metrics-profile name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority name`

The identifier for the Authority.

#### Usage

```
configure authority name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority password-policy`

Password policy for user&#x27;s passwords.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`deny`](#configure-authority-password-policy-deny) | The number of failed login attempts before locking a user |
| [`lifetime`](#configure-authority-password-policy-lifetime) | The lifetime of a user&#x27;s password in days |
| [`minimum-length`](#configure-authority-password-policy-minimum-length) | The minimum length of user&#x27;s password. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;password-policy&#x27; |
| [`unlock-time`](#configure-authority-password-policy-unlock-time) | The time a user account will remained locked after failing login attempts |

## `configure authority password-policy deny`

The number of failed login attempts before locking a user

#### Usage

```
configure authority password-policy deny [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority password-policy lifetime`

The lifetime of a user&#x27;s password in days

#### Usage

```
configure authority password-policy lifetime [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: days

## `configure authority password-policy minimum-length`

The minimum length of user&#x27;s password.

#### Usage

```
configure authority password-policy minimum-length [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority password-policy unlock-time`

The time a user account will remained locked after failing login attempts

#### Usage

```
configure authority password-policy unlock-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority pcli`

Configure the PCLI.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`alias`](#configure-authority-pcli-alias) | An alias is a custom PCLI command that executes another PCLI command and optionally filters the output. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;pcli&#x27; |

## `configure authority pcli alias`

An alias is a custom PCLI command that executes another PCLI command and optionally filters the output.

#### Usage

```
configure authority pcli alias <path>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| path | The space-delimited path to the alias. This will be the text that a user must enter to run the alias. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| [`command`](#configure-authority-pcli-alias-command) | The PCLI command that the alias will run. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-pcli-alias-description) | A short, one line, description of the alias. This will be displayed in the PCLI as part of the command&#x27;s help text. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`path`](#configure-authority-pcli-alias-path) | The space-delimited path to the alias. This will be the text that a user must enter to run the alias. |
| [`resource-group`](#configure-authority-pcli-alias-resource-group) | Associate this PCLI alias with a top-level resource-group. |
| `show` | Show configuration data for &#x27;alias&#x27; |

## `configure authority pcli alias command`

The PCLI command that the alias will run.

#### Usage

```
configure authority pcli alias command <path>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| path | The PCLI command that the alias will run. This must be an existing PCLI command but may contain a pipe (\|), output redirection (&gt; or &gt;&gt;), input redirection (&lt; or &lt;&lt;), or the question mark to get help (?). |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`path`](#configure-authority-pcli-alias-command-path) | The PCLI command that the alias will run. This must be an existing PCLI command but may contain a pipe (\|), output redirection (&gt; or &gt;&gt;), input redirection (&lt; or &lt;&lt;), or the question mark to get help (?). |
| `show` | Show configuration data for &#x27;command&#x27; |
| [`table-filter`](#configure-authority-pcli-alias-command-table-filter) | Filter the output table to only include the specified columns. This is a case-insensitive match (and also excludes special characters such as dashes.) |

## `configure authority pcli alias command path`

The PCLI command that the alias will run. This must be an existing PCLI command but may contain a pipe (|), output redirection (&gt; or &gt;&gt;), input redirection (&lt; or &lt;&lt;), or the question mark to get help (?).

#### Usage

```
configure authority pcli alias command path [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority pcli alias command table-filter`

Filter the output table to only include the specified columns. This is a case-insensitive match (and also excludes special characters such as dashes.)

#### Usage

```
configure authority pcli alias command table-filter [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority pcli alias description`

A short, one line, description of the alias. This will be displayed in the PCLI as part of the command&#x27;s help text.

#### Usage

```
configure authority pcli alias description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority pcli alias path`

The space-delimited path to the alias. This will be the text that a user must enter to run the alias.

#### Usage

```
configure authority pcli alias path [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority pcli alias resource-group`

Associate this PCLI alias with a top-level resource-group.

#### Usage

```
configure authority pcli alias resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority performance-monitoring-profile`

A performance monitoring profile used to determine how often packets should be marked.

#### Usage

```
configure authority performance-monitoring-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the performance monitoring profile. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval-duration`](#configure-authority-performance-monitoring-profile-interval-duration) | Represents the duration of a packet marking interval in milliseconds. |
| [`marking-count`](#configure-authority-performance-monitoring-profile-marking-count) | The number of packets to mark within a given interval. |
| [`monitor-only`](#configure-authority-performance-monitoring-profile-monitor-only) | Collect statistics without influencing packet processing features. |
| [`name`](#configure-authority-performance-monitoring-profile-name) | The name of the performance monitoring profile. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-performance-monitoring-profile-resource-group) | Associate this performance monitoring profile with a top-level resource-group. |
| `show` | Show configuration data for &#x27;performance-monitoring-profile&#x27; |

## `configure authority performance-monitoring-profile interval-duration`

Represents the duration of a packet marking interval in milliseconds.

#### Usage

```
configure authority performance-monitoring-profile interval-duration [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority performance-monitoring-profile marking-count`

The number of packets to mark within a given interval.

#### Usage

```
configure authority performance-monitoring-profile marking-count [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: packets

## `configure authority performance-monitoring-profile monitor-only`

Collect statistics without influencing packet processing features.

#### Usage

```
configure authority performance-monitoring-profile monitor-only [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority performance-monitoring-profile name`

The name of the performance monitoring profile.

#### Usage

```
configure authority performance-monitoring-profile name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority performance-monitoring-profile resource-group`

Associate this performance monitoring profile with a top-level resource-group.

#### Usage

```
configure authority performance-monitoring-profile resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority radius-server`

Radius Servers against which to authenticate user credentials.

#### Usage

```
configure authority radius-server <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the Radius server. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-radius-server-address) | The IP address or FQDN of the Radius server. |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-radius-server-name) | The name of the Radius server. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-radius-server-port) | The port number Radius server listens on. |
| [`secret`](#configure-authority-radius-server-secret) | The secret key to bind to the Radius server. |
| `show` | Show configuration data for &#x27;radius-server&#x27; |
| [`timeout`](#configure-authority-radius-server-timeout) | Radius Request Timeout. |

## `configure authority radius-server address`

The IP address or FQDN of the Radius server.

#### Usage

```
configure authority radius-server address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority radius-server name`

The name of the Radius server.

#### Usage

```
configure authority radius-server name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority radius-server port`

The port number Radius server listens on.

#### Usage

```
configure authority radius-server port [<port-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| port-number | The value to set for this field |

## `configure authority radius-server secret`

The secret key to bind to the Radius server.

#### Usage

```
configure authority radius-server secret [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority radius-server timeout`

Radius Request Timeout.

#### Usage

```
configure authority radius-server timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority rekey-interval`

Hours between security key regeneration. Recommended value 24 hours.

#### Usage

```
configure authority rekey-interval [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

#### Description

Units: hours

## `configure authority remote-login`

Configure Remote Login

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-remote-login-enabled) | Enable remote login from a Conductor to managed assets. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;remote-login&#x27; |

## `configure authority remote-login enabled`

Enable remote login from a Conductor to managed assets.

#### Usage

```
configure authority remote-login enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority resource-group`

Collect objects into a management group.

#### Usage

```
configure authority resource-group <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the resource group. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-resource-group-description) | A description about the resource-group. |
| [`name`](#configure-authority-resource-group-name) | The name of the resource group. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;resource-group&#x27; |

## `configure authority resource-group description`

A description about the resource-group.

#### Usage

```
configure authority resource-group description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority resource-group name`

The name of the resource group.

#### Usage

```
configure authority resource-group name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router`

The router configuration element serves as a container for holding the nodes of a single deployed router, along with their policies.

#### Usage

```
configure authority router <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An identifier for the router. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`administrative-group`](#configure-authority-router-administrative-group) | An identifier that associates this router with an administrative group. |
| [`application-identification`](#configure-authority-router-application-identification) | Configure Application Identification |
| [`bfd`](#configure-authority-router-bfd) | BFD parameters for sessions between nodes within the router. |
| `clone` | Clone a list item |
| [`conductor-address`](#configure-authority-router-conductor-address) | IP address or FQDN of the conductor |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-description) | A human-readable string that allows administrators to describe this configuration. |
| [`dhcp-server-generated-address-pool`](#configure-authority-router-dhcp-server-generated-address-pool) | The address pool for KNI network-interfaces generated for dhcp-servers. |
| [`district-settings`](#configure-authority-router-district-settings) | Per-district settings for the router. |
| [`dns-config`](#configure-authority-router-dns-config) | Configure Dns Config |
| [`entitlement`](#configure-authority-router-entitlement) | Project configuration for entitlement reporting. |
| [`icmp-probe-profile`](#configure-authority-router-icmp-probe-profile) | Profile for active ICMP probes for reachability-detection enforcement |
| [`idp`](#configure-authority-router-idp) | Advanced IDP configuration. |
| [`inter-node-security`](#configure-authority-router-inter-node-security) | The name of the security policy used for inter node communication between router interfaces |
| [`location`](#configure-authority-router-location) | A descriptive location for this SSR. |
| [`location-coordinates`](#configure-authority-router-location-coordinates) | The geolocation of this router in ISO 6709 format. Some examples: (1) Degrees only: +50.20361-074.00417/ (2) Degrees and minutes: +5012.22-07400.25/ or (3) Degrees, minutes, and seconds: +501213.1-0740015.1/ |
| [`maintenance-mode`](#configure-authority-router-maintenance-mode) | When enabled, the router will be in maintenance mode and alarms related to this router will be shelved. |
| [`management-service-generation`](#configure-authority-router-management-service-generation) | Configure Management Service Generation |
| [`max-inter-node-way-points`](#configure-authority-router-max-inter-node-way-points) | Maximum number of way points to be allocated on inter-node path. |
| [`name`](#configure-authority-router-name) | An identifier for the router. |
| [`nat-pool`](#configure-authority-router-nat-pool) | A pool of shared NAT ports. |
| [`node`](#configure-authority-router-node) | List of one or two SSR software instances, comprising an SSR. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`path-mtu-discovery`](#configure-authority-router-path-mtu-discovery) | Automatic path MTU discovery between nodes within the router. |
| [`peer`](#configure-authority-router-peer) | Defines the properties associated with peer SSRs. The peer may be another router in the same authority or a router in a different authority |
| [`rate-limit-policy`](#configure-authority-router-rate-limit-policy) | Configuration for rate limiting policy for all associated service traffic across all interfaces on a given node, when configured within a service-class. |
| [`reachability-profile`](#configure-authority-router-reachability-profile) | Defines a traffic profile for reachability-detection enforcement |
| [`redundancy-group`](#configure-authority-router-redundancy-group) | A group of redundant interfaces which will fail over together if one goes down for any reason. |
| [`resource-group`](#configure-authority-router-resource-group) | Associate this router with a top-level resource-group. |
| [`reverse-flow-enforcement`](#configure-authority-router-reverse-flow-enforcement) | When to enforce biflow reverse fib entry check |
| [`reverse-packet-session-resiliency`](#configure-authority-router-reverse-packet-session-resiliency) | Parameters for setting session failover behavior without presence of forward traffic. |
| [`router-group`](#configure-authority-router-router-group) | Logical group of routers for filtering services. |
| [`routing`](#configure-authority-router-routing) | A router-level container for all of the routing policies associated with a given SSR deployment. Each routing element may have one and only one routing-instance. |
| [`service-route`](#configure-authority-router-service-route) | Defines a route for a service or an instance of a service (server or service agent). |
| [`service-route-policy`](#configure-authority-router-service-route-policy) | Used to define the properties of service routes. These capabilities influence route selection when determining the optimal path for establishing new sessions. |
| `show` | Show configuration data for &#x27;router&#x27; |
| [`static-hostname-mapping`](#configure-authority-router-static-hostname-mapping) | Map hostnames to ip-address resolutions. These entries will be put in /etc/hosts. This will prevent DNS requests from being sent for these hostnames. |
| [`system`](#configure-authority-router-system) | System group configuration. Lets administrators configure system-wide properties for their SSR deployment. |
| [`udp-transform`](#configure-authority-router-udp-transform) | UDP transform settings for interoperating with stateful TCP firewalls for nodes within the router. |

## `configure authority router administrative-group`

An identifier that associates this router with an administrative group.

#### Usage

```
configure authority router administrative-group [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | Value to add to this list |

#### Description

Warning: &#x27;administrative-group&#x27; is deprecated and will be removed in a future software version

## `configure authority router application-identification`

Configure Application Identification

##### Subcommands

| command | description |
| ------- | ----------- |
| [`application-director-cache-max-capacity`](#configure-authority-router-application-identification-application-director-cache-max-capacity) | The maximum capacity for caching application-director requests |
| [`auto-update`](#configure-authority-router-application-identification-auto-update) | Automatic updating of application data |
| `delete` | Delete configuration data |
| [`max-capacity`](#configure-authority-router-application-identification-max-capacity) | The maximum capacity for resolved next-hops under a client |
| [`mode`](#configure-authority-router-application-identification-mode) | Application learning modes. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;application-identification&#x27; |
| [`summary-retention`](#configure-authority-router-application-identification-summary-retention) | Configure Summary Retention |
| [`summary-tracking`](#configure-authority-router-application-identification-summary-tracking) | Enable session stats tracking by applications |
| [`web-filtering`](#configure-authority-router-application-identification-web-filtering) | Enhanced application identification with URL based filtering |
| [`write-interval`](#configure-authority-router-application-identification-write-interval) | Interval to define how often analytics are calculated |

## `configure authority router application-identification application-director-cache-max-capacity`

The maximum capacity for caching application-director requests

#### Usage

```
configure authority router application-identification application-director-cache-max-capacity [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

## `configure authority router application-identification auto-update`

Automatic updating of application data

##### Subcommands

| command | description |
| ------- | ----------- |
| [`day-of-week`](#configure-authority-router-application-identification-auto-update-day-of-week) | The day of the week to perform updates |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-application-identification-auto-update-enabled) | Enable updates |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;auto-update&#x27; |
| [`update-frequency`](#configure-authority-router-application-identification-auto-update-update-frequency) | How often to attempt to update |
| [`update-jitter`](#configure-authority-router-application-identification-auto-update-update-jitter) | The max random jitter applied to the update time |
| [`update-time`](#configure-authority-router-application-identification-auto-update-update-time) | The hour of the day on the local system to fetch |

## `configure authority router application-identification auto-update day-of-week`

The day of the week to perform updates

#### Usage

```
configure authority router application-identification auto-update day-of-week [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router application-identification auto-update enabled`

Enable updates

#### Usage

```
configure authority router application-identification auto-update enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router application-identification auto-update update-frequency`

How often to attempt to update

#### Usage

```
configure authority router application-identification auto-update update-frequency [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router application-identification auto-update update-jitter`

The max random jitter applied to the update time

#### Usage

```
configure authority router application-identification auto-update update-jitter [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router application-identification auto-update update-time`

The hour of the day on the local system to fetch

#### Usage

```
configure authority router application-identification auto-update update-time [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router application-identification max-capacity`

The maximum capacity for resolved next-hops under a client

#### Usage

```
configure authority router application-identification max-capacity [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

## `configure authority router application-identification mode`

Application learning modes.

#### Usage

```
configure authority router application-identification mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | Value to add to this list |

## `configure authority router application-identification summary-retention`

Configure Summary Retention

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`duration`](#configure-authority-router-application-identification-summary-retention-duration) | How long the AppID documents should be stored |
| [`enabled`](#configure-authority-router-application-identification-summary-retention-enabled) | Enable persistence of app summary to the DB for UI and other uses |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;summary-retention&#x27; |

## `configure authority router application-identification summary-retention duration`

How long the AppID documents should be stored

#### Usage

```
configure authority router application-identification summary-retention duration [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router application-identification summary-retention enabled`

Enable persistence of app summary to the DB for UI and other uses

#### Usage

```
configure authority router application-identification summary-retention enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router application-identification summary-tracking`

Enable session stats tracking by applications

#### Usage

```
configure authority router application-identification summary-tracking [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router application-identification web-filtering`

Enhanced application identification with URL based filtering

##### Subcommands

| command | description |
| ------- | ----------- |
| [`classify-session`](#configure-authority-router-application-identification-web-filtering-classify-session) | Configure Classify Session |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-application-identification-web-filtering-enabled) | Whether web filtering should be enabled |
| [`max-retransmission-attempts-before-allow`](#configure-authority-router-application-identification-web-filtering-max-retransmission-attempts-before-allow) | Maximum number of retransmission packet attempts having a category cache miss before allowing session to continue |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;web-filtering&#x27; |

## `configure authority router application-identification web-filtering classify-session`

Configure Classify Session

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-cache-size`](#configure-authority-router-application-identification-web-filtering-classify-session-max-cache-size) | The maximum size for the in-memory cache that stores url data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`retries`](#configure-authority-router-application-identification-web-filtering-classify-session-retries) | The maximum retries for client to request for classifying the session |
| `show` | Show configuration data for &#x27;classify-session&#x27; |
| [`timeout`](#configure-authority-router-application-identification-web-filtering-classify-session-timeout) | Maximum time in seconds that can be taken for classifying the session |

## `configure authority router application-identification web-filtering classify-session max-cache-size`

The maximum size for the in-memory cache that stores url data

#### Usage

```
configure authority router application-identification web-filtering classify-session max-cache-size [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router application-identification web-filtering classify-session retries`

The maximum retries for client to request for classifying the session

#### Usage

```
configure authority router application-identification web-filtering classify-session retries [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router application-identification web-filtering classify-session timeout`

Maximum time in seconds that can be taken for classifying the session

#### Usage

```
configure authority router application-identification web-filtering classify-session timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router application-identification web-filtering enabled`

Whether web filtering should be enabled

#### Usage

```
configure authority router application-identification web-filtering enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router application-identification web-filtering max-retransmission-attempts-before-allow`

Maximum number of retransmission packet attempts having a category cache miss before allowing session to continue

#### Usage

```
configure authority router application-identification web-filtering max-retransmission-attempts-before-allow [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets

## `configure authority router application-identification write-interval`

Interval to define how often analytics are calculated

#### Usage

```
configure authority router application-identification write-interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router bfd`

BFD parameters for sessions between nodes within the router.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-bfd-authentication-type) | Describes the authentication type used in BFD packets |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-bfd-desired-tx-interval) | Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers. |
| [`dscp`](#configure-authority-router-bfd-dscp) | The DSCP value to use with BFD packets. |
| [`dynamic-damping`](#configure-authority-router-bfd-dynamic-damping) | When enabled, extend the hold-down time if additional link flaps occur during the hold-down period. |
| [`hold-down-time`](#configure-authority-router-bfd-hold-down-time) | Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time. |
| [`link-test-interval`](#configure-authority-router-bfd-link-test-interval) | This represents the interval between BFD echo tests sent to the peer node/router. |
| [`link-test-length`](#configure-authority-router-bfd-link-test-length) | This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests. |
| [`maximum-hold-down-time`](#configure-authority-router-bfd-maximum-hold-down-time) | Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value. |
| [`multiplier`](#configure-authority-router-bfd-multiplier) | Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |
| [`state`](#configure-authority-router-bfd-state) | When enabled, run BFD between all nodes within the router. |

## `configure authority router bfd authentication-type`

Describes the authentication type used in BFD packets

#### Usage

```
configure authority router bfd authentication-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router bfd desired-tx-interval`

Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers.

#### Usage

```
configure authority router bfd desired-tx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router bfd dscp`

The DSCP value to use with BFD packets.

#### Usage

```
configure authority router bfd dscp [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority router bfd dynamic-damping`

When enabled, extend the hold-down time if additional link flaps occur during the hold-down period.

#### Usage

```
configure authority router bfd dynamic-damping [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router bfd hold-down-time`

Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time.

#### Usage

```
configure authority router bfd hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router bfd link-test-interval`

This represents the interval between BFD echo tests sent to the peer node/router.

#### Usage

```
configure authority router bfd link-test-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router bfd link-test-length`

This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests.

#### Usage

```
configure authority router bfd link-test-length [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets

## `configure authority router bfd maximum-hold-down-time`

Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value.

#### Usage

```
configure authority router bfd maximum-hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router bfd multiplier`

Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20).

#### Usage

```
configure authority router bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router bfd required-min-rx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router bfd state`

When enabled, run BFD between all nodes within the router.

#### Usage

```
configure authority router bfd state [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router conductor-address`

IP address or FQDN of the conductor

#### Usage

```
configure authority router conductor-address [<hostv4>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostv4 | Value to add to this list |

## `configure authority router description`

A human-readable string that allows administrators to describe this configuration.

#### Usage

```
configure authority router description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router dhcp-server-generated-address-pool`

The address pool for KNI network-interfaces generated for dhcp-servers.

#### Usage

```
configure authority router dhcp-server-generated-address-pool [<ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-prefix | The value to set for this field |

## `configure authority router district-settings`

Per-district settings for the router.

#### Usage

```
configure authority router district-settings <district-name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| district-name | Name of the district. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`district-name`](#configure-authority-router-district-settings-district-name) | Name of the district. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;district-settings&#x27; |
| [`step-peer-path-sla-metrics-advertisement`](#configure-authority-router-district-settings-step-peer-path-sla-metrics-advertisement) | STEP advertisement settings for peer path SLA metrics. |

## `configure authority router district-settings district-name`

Name of the district.

#### Usage

```
configure authority router district-settings district-name [<district-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| district-name | The value to set for this field |

## `configure authority router district-settings step-peer-path-sla-metrics-advertisement`

STEP advertisement settings for peer path SLA metrics.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`minimum-update-interval`](#configure-authority-router-district-settings-step-peer-path-sla-metrics-advertisement-minimum-update-interval) | Minimum (burst) interval in between updating peer path SLA metric values advertised in STEP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;step-peer-path-sla-metrics-advertisement&#x27; |
| [`update-burst-size`](#configure-authority-router-district-settings-step-peer-path-sla-metrics-advertisement-update-burst-size) | Limit on the number of peer path SLA metric value updates advertised in STEP at the minimum (burst) update interval. |
| [`update-rate-limit`](#configure-authority-router-district-settings-step-peer-path-sla-metrics-advertisement-update-rate-limit) | Rate limit interval in between updating peer path SLA metric values advertised in STEP |

## `configure authority router district-settings step-peer-path-sla-metrics-advertisement minimum-update-interval`

Minimum (burst) interval in between updating peer path SLA metric values advertised in STEP

#### Usage

```
configure authority router district-settings step-peer-path-sla-metrics-advertisement minimum-update-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router district-settings step-peer-path-sla-metrics-advertisement update-burst-size`

Limit on the number of peer path SLA metric value updates advertised in STEP at the minimum (burst) update interval.

#### Usage

```
configure authority router district-settings step-peer-path-sla-metrics-advertisement update-burst-size [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router district-settings step-peer-path-sla-metrics-advertisement update-rate-limit`

Rate limit interval in between updating peer path SLA metric values advertised in STEP

#### Usage

```
configure authority router district-settings step-peer-path-sla-metrics-advertisement update-rate-limit [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router dns-config`

Configure Dns Config

#### Usage

```
configure authority router dns-config <mode>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| mode | Mode of DNS server configuration. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-dns-config-address) | Address of servers to use for DNS queries. |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-dns-config-mode) | Mode of DNS server configuration. |
| [`move`](#configure-authority-router-dns-config-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dns-config&#x27; |

## `configure authority router dns-config address`

Address of servers to use for DNS queries.

#### Usage

```
configure authority router dns-config address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router dns-config mode`

Mode of DNS server configuration.

#### Usage

```
configure authority router dns-config mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router dns-config move address`

Address of servers to use for DNS queries.

#### Usage

```
configure authority router dns-config move address [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router entitlement`

Project configuration for entitlement reporting.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-entitlement-description) | A description of the project. |
| [`id`](#configure-authority-router-entitlement-id) | Project identifier. |
| [`max-bandwidth`](#configure-authority-router-entitlement-max-bandwidth) | Purchased bandwidth for the project. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;entitlement&#x27; |

## `configure authority router entitlement description`

A description of the project.

#### Usage

```
configure authority router entitlement description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router entitlement id`

Project identifier.

#### Usage

```
configure authority router entitlement id [<entitlement-project-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| entitlement-project-id | The value to set for this field |

## `configure authority router entitlement max-bandwidth`

Purchased bandwidth for the project.

#### Usage

```
configure authority router entitlement max-bandwidth [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router icmp-probe-profile`

Profile for active ICMP probes for reachability-detection enforcement

#### Usage

```
configure authority router icmp-probe-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the ICMP probe profile |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-icmp-probe-profile-name) | Name of the ICMP probe profile |
| [`number-of-attempts`](#configure-authority-router-icmp-probe-profile-number-of-attempts) | Number of consecutive ICMP ping requests to be sent within the probe-duration before deciding that destination is unreachable |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`probe-address`](#configure-authority-router-icmp-probe-profile-probe-address) | Address to send ICMP ping requests to |
| [`probe-duration`](#configure-authority-router-icmp-probe-profile-probe-duration) | Duration within which to reach the destination. Each attempt will be made in (probe-duration / number-of-attempts) interval |
| [`probe-failure-trigger`](#configure-authority-router-icmp-probe-profile-probe-failure-trigger) | Control how failure to ping probe-addresses impacts state. |
| [`probe-interval`](#configure-authority-router-icmp-probe-profile-probe-interval) | Duration of how often to perform a link test to the destination |
| `show` | Show configuration data for &#x27;icmp-probe-profile&#x27; |
| [`sla-metrics`](#configure-authority-router-icmp-probe-profile-sla-metrics) | SLA-metrics requirements for ICMP ping |

## `configure authority router icmp-probe-profile name`

Name of the ICMP probe profile

#### Usage

```
configure authority router icmp-probe-profile name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router icmp-probe-profile number-of-attempts`

Number of consecutive ICMP ping requests to be sent within the probe-duration before deciding that destination is unreachable

#### Usage

```
configure authority router icmp-probe-profile number-of-attempts [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router icmp-probe-profile probe-address`

Address to send ICMP ping requests to

#### Usage

```
configure authority router icmp-probe-profile probe-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router icmp-probe-profile probe-duration`

Duration within which to reach the destination. Each attempt will be made in (probe-duration / number-of-attempts) interval

#### Usage

```
configure authority router icmp-probe-profile probe-duration [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router icmp-probe-profile probe-failure-trigger`

Control how failure to ping probe-addresses impacts state.

#### Usage

```
configure authority router icmp-probe-profile probe-failure-trigger [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router icmp-probe-profile probe-interval`

Duration of how often to perform a link test to the destination

#### Usage

```
configure authority router icmp-probe-profile probe-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router icmp-probe-profile sla-metrics`

SLA-metrics requirements for ICMP ping

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`latency`](#configure-authority-router-icmp-probe-profile-sla-metrics-latency) | Configure Latency |
| [`max-loss`](#configure-authority-router-icmp-probe-profile-sla-metrics-max-loss) | The amount of acceptable loss on the link. Determined by sending number-of-attempts ICMP requests and waiting probe-duration for response |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;sla-metrics&#x27; |

## `configure authority router icmp-probe-profile sla-metrics latency`

Configure Latency

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max`](#configure-authority-router-icmp-probe-profile-sla-metrics-latency-max) | Maximum acceptable latency based on the ping test |
| [`mean`](#configure-authority-router-icmp-probe-profile-sla-metrics-latency-mean) | The maximum acceptable mean latency based on the ping test |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;latency&#x27; |

## `configure authority router icmp-probe-profile sla-metrics latency max`

Maximum acceptable latency based on the ping test

#### Usage

```
configure authority router icmp-probe-profile sla-metrics latency max [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router icmp-probe-profile sla-metrics latency mean`

The maximum acceptable mean latency based on the ping test

#### Usage

```
configure authority router icmp-probe-profile sla-metrics latency mean [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router icmp-probe-profile sla-metrics max-loss`

The amount of acceptable loss on the link. Determined by sending number-of-attempts ICMP requests and waiting probe-duration for response

#### Usage

```
configure authority router icmp-probe-profile sla-metrics max-loss [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router idp`

Advanced IDP configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bypass-enabled`](#configure-authority-router-idp-bypass-enabled) | IDP config to enable/disable bypass |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-idp-mode) | IDP config management mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;idp&#x27; |

## `configure authority router idp bypass-enabled`

IDP config to enable/disable bypass

#### Usage

```
configure authority router idp bypass-enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router idp mode`

IDP config management mode

#### Usage

```
configure authority router idp mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router inter-node-security`

The name of the security policy used for inter node communication between router interfaces

#### Usage

```
configure authority router inter-node-security [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

## `configure authority router location`

A descriptive location for this SSR.

#### Usage

```
configure authority router location [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router location-coordinates`

The geolocation of this router in ISO 6709 format. Some examples: (1) Degrees only: +50.20361-074.00417/ (2) Degrees and minutes: +5012.22-07400.25/ or (3) Degrees, minutes, and seconds: +501213.1-0740015.1/

#### Usage

```
configure authority router location-coordinates [<geolocation>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| geolocation | The value to set for this field |

## `configure authority router maintenance-mode`

When enabled, the router will be in maintenance mode and alarms related to this router will be shelved.

#### Usage

```
configure authority router maintenance-mode [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router management-service-generation`

Configure Management Service Generation

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`proxy`](#configure-authority-router-management-service-generation-proxy) | Enable/disable proxy of public to private conductor addresses |
| [`service-policy`](#configure-authority-router-management-service-generation-service-policy) | Service policy to be used instead of auto-generated service policy. |
| [`service-route-type`](#configure-authority-router-management-service-generation-service-route-type) | Strategy to generate service-routes for management services. |
| `show` | Show configuration data for &#x27;management-service-generation&#x27; |

## `configure authority router management-service-generation proxy`

Enable/disable proxy of public to private conductor addresses

#### Usage

```
configure authority router management-service-generation proxy [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router management-service-generation service-policy`

Service policy to be used instead of auto-generated service policy.

#### Usage

```
configure authority router management-service-generation service-policy [<service-policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-ref | The value to set for this field |

## `configure authority router management-service-generation service-route-type`

Strategy to generate service-routes for management services.

#### Usage

```
configure authority router management-service-generation service-route-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router max-inter-node-way-points`

Maximum number of way points to be allocated on inter-node path.

#### Usage

```
configure authority router max-inter-node-way-points [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Warning: a restart is required if max-inter-node-way-points is created, modified, or deleted

## `configure authority router name`

An identifier for the router.

#### Usage

```
configure authority router name [<reserved-name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| reserved-name-id | The value to set for this field |

#### Description

Warning: a restart is required if name is created or deleted

## `configure authority router nat-pool`

A pool of shared NAT ports.

#### Usage

```
configure authority router nat-pool <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An identifier for the NAT Pool. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address-pool`](#configure-authority-router-nat-pool-address-pool) | Defines the NAT prefix and ports in the pool. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`move`](#configure-authority-router-nat-pool-move) | Move list items |
| [`name`](#configure-authority-router-nat-pool-name) | An identifier for the NAT Pool. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nat-pool&#x27; |

## `configure authority router nat-pool address-pool`

Defines the NAT prefix and ports in the pool.

#### Usage

```
configure authority router nat-pool address-pool <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | IP Prefix for the pool of NAT ports. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-nat-pool-address-pool-address) | IP Prefix for the pool of NAT ports. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pool-type`](#configure-authority-router-nat-pool-address-pool-pool-type) | Type of NAT pool |
| `show` | Show configuration data for &#x27;address-pool&#x27; |
| [`tenant-name`](#configure-authority-router-nat-pool-address-pool-tenant-name) | Tenant for which this nat pool is applied |

## `configure authority router nat-pool address-pool address`

IP Prefix for the pool of NAT ports.

#### Usage

```
configure authority router nat-pool address-pool address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority router nat-pool address-pool pool-type`

Type of NAT pool

#### Usage

```
configure authority router nat-pool address-pool pool-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router nat-pool address-pool tenant-name`

Tenant for which this nat pool is applied

#### Usage

```
configure authority router nat-pool address-pool tenant-name [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | Value to add to this list |

## `configure authority router nat-pool move address-pool`

Defines the NAT prefix and ports in the pool.

#### Usage

```
configure authority router nat-pool move address-pool <address> <position> [<relative-to-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | IP Prefix for the pool of NAT ports. |
| position | first \| after \| before \| last |
| relative-to-address | Key of item before or after which to move |

## `configure authority router nat-pool name`

An identifier for the NAT Pool.

#### Usage

```
configure authority router nat-pool name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node`

List of one or two SSR software instances, comprising an SSR.

#### Usage

```
configure authority router node <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the node, used to reference it in other configuration sections. This MUST match the name in the local initialization file. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`asset-id`](#configure-authority-router-node-asset-id) | A unique identifier of an SSR node used for automated provisioning |
| [`asset-validation-enabled`](#configure-authority-router-node-asset-validation-enabled) | Validate that the asset is suitable to run SSR. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-description) | A description about the node. |
| [`device-interface`](#configure-authority-router-node-device-interface) | List of physical or virtual interfaces in the node. |
| [`enabled`](#configure-authority-router-node-enabled) | Enable/disable the whole node. |
| [`forwarding-core-count`](#configure-authority-router-node-forwarding-core-count) | The number of CPU cores to dedicate to traffic forwarding when using &#x27;manual&#x27; forwarding core mode. |
| [`forwarding-core-mode`](#configure-authority-router-node-forwarding-core-mode) | The method by which the number of CPU cores dedicated to traffic forwarding should be determined. |
| [`ipfix`](#configure-authority-router-node-ipfix) | Node specific IPFIX configuration |
| [`location`](#configure-authority-router-node-location) | A text description of the node&#x27;s physical location. |
| [`loopback-address`](#configure-authority-router-node-loopback-address) | The loopback IP address to use for management traffic originating on this node when routed via SVR. |
| [`name`](#configure-authority-router-node-name) | An arbitrary, unique name for the node, used to reference it in other configuration sections. This MUST match the name in the local initialization file. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-forwarding`](#configure-authority-router-node-port-forwarding) | Configuration for establishing local port-forwarding to remote server. |
| [`power-saver`](#configure-authority-router-node-power-saver) | Allow the traffic forwarding cores to sleep when there is no traffic to process |
| [`radius`](#configure-authority-router-node-radius) | Radius authentication parameters for this node. |
| [`reachability-detection`](#configure-authority-router-node-reachability-detection) | Layer 2 reachability detection |
| [`role`](#configure-authority-router-node-role) | The node&#x27;s role in the SSR system. |
| [`session-processor-count`](#configure-authority-router-node-session-processor-count) | The number of threads to use for session processing when using &#x27;manual&#x27; session-processor mode. |
| [`session-processor-mode`](#configure-authority-router-node-session-processor-mode) | The method by which the number of threads used for session processing should be determined. |
| [`session-setup-scaling`](#configure-authority-router-node-session-setup-scaling) | Whether or not to enable session setup scaling. |
| `show` | Show configuration data for &#x27;node&#x27; |
| [`ssh-keepalive`](#configure-authority-router-node-ssh-keepalive) | Configure Ssh Keepalive |
| [`top-sessions`](#configure-authority-router-node-top-sessions) | Views of top sessions by an ordering criteria. |

## `configure authority router node asset-id`

A unique identifier of an SSR node used for automated provisioning

#### Usage

```
configure authority router node asset-id [<asset-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| asset-id | The value to set for this field |

## `configure authority router node asset-validation-enabled`

Validate that the asset is suitable to run SSR.

#### Usage

```
configure authority router node asset-validation-enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node description`

A description about the node.

#### Usage

```
configure authority router node description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface`

List of physical or virtual interfaces in the node.

#### Usage

```
configure authority router node device-interface <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | A unique name identifier for the physical or virtual interface, used to reference it in other configuration sections and show commands. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bond-settings`](#configure-authority-router-node-device-interface-bond-settings) | Configure Bond Settings |
| [`bridge-name`](#configure-authority-router-node-device-interface-bridge-name) | An optional bridge name to be used for the bridging the kni and target interfaces. If no name is specified, one will be auto-generated |
| [`capture-filter`](#configure-authority-router-node-device-interface-capture-filter) | Filter to be used when matching packets on this device interface. Uses Berkeley Packet Filter (BPF) syntax. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-description) | A description of the device-interface. |
| [`enabled`](#configure-authority-router-node-device-interface-enabled) | Whether this interface is administratively enabled. |
| [`forwarding`](#configure-authority-router-node-device-interface-forwarding) | Whether this interface is used for forwarding traffic. |
| [`interface-name`](#configure-authority-router-node-device-interface-interface-name) | The interface name associated with the OS network device. |
| [`link-settings`](#configure-authority-router-node-device-interface-link-settings) | Ethernet link settings on the interface |
| [`lldp`](#configure-authority-router-node-device-interface-lldp) | Link Layer Description Protocol settings |
| [`load-balancing`](#configure-authority-router-node-device-interface-load-balancing) | Configure Load Balancing |
| [`lte`](#configure-authority-router-node-device-interface-lte) | Configure Lte |
| [`name`](#configure-authority-router-node-device-interface-name) | A unique name identifier for the physical or virtual interface, used to reference it in other configuration sections and show commands. |
| [`network-interface`](#configure-authority-router-node-device-interface-network-interface) | List of network interfaces for the device-interface. |
| [`network-namespace`](#configure-authority-router-node-device-interface-network-namespace) | The network namespace in which this network interface will be located |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`parent-bond`](#configure-authority-router-node-device-interface-parent-bond) | The bond type interface that this interface is grouped with. |
| [`pci-address`](#configure-authority-router-node-device-interface-pci-address) | The PCI address of the device. Only relevant if type is ethernet. |
| [`pppoe`](#configure-authority-router-node-device-interface-pppoe) | Configure Pppoe |
| [`promiscuous-mode`](#configure-authority-router-node-device-interface-promiscuous-mode) | Enables promiscuous mode on the interface. |
| [`q-in-q`](#configure-authority-router-node-device-interface-q-in-q) | Enables Q-in-Q encapsulation |
| [`reinsert-vlan`](#configure-authority-router-node-device-interface-reinsert-vlan) | Enables reinsertion of NIC-stripped VLAN on ingress packets, on supported devices. |
| [`session-optimization`](#configure-authority-router-node-device-interface-session-optimization) | Configure Session Optimization |
| [`shared-phys-address`](#configure-authority-router-node-device-interface-shared-phys-address) | Virtual MAC address for interface redundancy. |
| `show` | Show configuration data for &#x27;device-interface&#x27; |
| [`sriov-vlan-filter`](#configure-authority-router-node-device-interface-sriov-vlan-filter) | Enables VLAN filtering on supported SR-IOV devices. |
| [`strip-vlan`](#configure-authority-router-node-device-interface-strip-vlan) | Enables VLAN stripping on ingress packets on supported devices. |
| [`target-interface`](#configure-authority-router-node-device-interface-target-interface) | Specifies the name of an external interface to be automatically bridged to a logical interface. |
| [`traffic-engineering`](#configure-authority-router-node-device-interface-traffic-engineering) | Configure Traffic Engineering |
| [`type`](#configure-authority-router-node-device-interface-type) | Type of interface. |
| [`vmbus-uuid`](#configure-authority-router-node-device-interface-vmbus-uuid) | The VMBus UUID of the network device. Hyper-V Environment only. Only relevant if type is ethernet. |
| [`vrrp`](#configure-authority-router-node-device-interface-vrrp) | Parameters for Interface Redundancy using Virtual Router Redundancy Protocol (VRRP) like protocol. |

## `configure authority router node device-interface bond-settings`

Configure Bond Settings

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`lacp-enable`](#configure-authority-router-node-device-interface-bond-settings-lacp-enable) | Use 802.3ad LACP protocol for the Bond. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;bond-settings&#x27; |

## `configure authority router node device-interface bond-settings lacp-enable`

Use 802.3ad LACP protocol for the Bond.

#### Usage

```
configure authority router node device-interface bond-settings lacp-enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface bridge-name`

An optional bridge name to be used for the bridging the kni and target interfaces. If no name is specified, one will be auto-generated

#### Usage

```
configure authority router node device-interface bridge-name [<bridge-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| bridge-name | The value to set for this field |

## `configure authority router node device-interface capture-filter`

Filter to be used when matching packets on this device interface. Uses Berkeley Packet Filter (BPF) syntax.

#### Usage

```
configure authority router node device-interface capture-filter [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface description`

A description of the device-interface.

#### Usage

```
configure authority router node device-interface description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface enabled`

Whether this interface is administratively enabled.

#### Usage

```
configure authority router node device-interface enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface forwarding`

Whether this interface is used for forwarding traffic.

#### Usage

```
configure authority router node device-interface forwarding [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface interface-name`

The interface name associated with the OS network device.

#### Usage

```
configure authority router node device-interface interface-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface link-settings`

Ethernet link settings on the interface

#### Usage

```
configure authority router node device-interface link-settings [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface lldp`

Link Layer Description Protocol settings

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertisement-interval`](#configure-authority-router-node-device-interface-lldp-advertisement-interval) | The frequency of sending LLDP advertisements. |
| `delete` | Delete configuration data |
| [`hold-multiplier`](#configure-authority-router-node-device-interface-lldp-hold-multiplier) | The multiplier to apply to the advertisement-interval when setting the LLDP TTL. |
| [`mode`](#configure-authority-router-node-device-interface-lldp-mode) | The mode in which LLDP operates on the interface |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;lldp&#x27; |

## `configure authority router node device-interface lldp advertisement-interval`

The frequency of sending LLDP advertisements.

#### Usage

```
configure authority router node device-interface lldp advertisement-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface lldp hold-multiplier`

The multiplier to apply to the advertisement-interval when setting the LLDP TTL.

#### Usage

```
configure authority router node device-interface lldp hold-multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node device-interface lldp mode`

The mode in which LLDP operates on the interface

#### Usage

```
configure authority router node device-interface lldp mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface load-balancing`

Configure Load Balancing

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;load-balancing&#x27; |
| [`utilization-high-water-mark`](#configure-authority-router-node-device-interface-load-balancing-utilization-high-water-mark) | Percentage of allowed bandwidth utilization above which this interface will no longer be considered for load balancing. |
| [`utilization-low-water-mark`](#configure-authority-router-node-device-interface-load-balancing-utilization-low-water-mark) | Percentage of allowed bandwidth utilization below which this interface will be reconsidered for load balancing. |

## `configure authority router node device-interface load-balancing utilization-high-water-mark`

Percentage of allowed bandwidth utilization above which this interface will no longer be considered for load balancing.

#### Usage

```
configure authority router node device-interface load-balancing utilization-high-water-mark [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface load-balancing utilization-low-water-mark`

Percentage of allowed bandwidth utilization below which this interface will be reconsidered for load balancing.

#### Usage

```
configure authority router node device-interface load-balancing utilization-low-water-mark [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface lte`

Configure Lte

##### Subcommands

| command | description |
| ------- | ----------- |
| [`apn-name`](#configure-authority-router-node-device-interface-lte-apn-name) | Name of the access point to connect to the LTE network. |
| [`authentication`](#configure-authority-router-node-device-interface-lte-authentication) | Configure Authentication |
| [`carrier-image`](#configure-authority-router-node-device-interface-lte-carrier-image) | Name of the carrier-image to load the SIM card with. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;lte&#x27; |

## `configure authority router node device-interface lte apn-name`

Name of the access point to connect to the LTE network.

#### Usage

```
configure authority router node device-interface lte apn-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface lte authentication`

Configure Authentication

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-protocol`](#configure-authority-router-node-device-interface-lte-authentication-authentication-protocol) | Authentication protocol used to authenticate the user. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`password`](#configure-authority-router-node-device-interface-lte-authentication-password) | Password required to connect to the LTE network. |
| `show` | Show configuration data for &#x27;authentication&#x27; |
| [`user-name`](#configure-authority-router-node-device-interface-lte-authentication-user-name) | Username required to connect to the LTE network. |

## `configure authority router node device-interface lte authentication authentication-protocol`

Authentication protocol used to authenticate the user.

#### Usage

```
configure authority router node device-interface lte authentication authentication-protocol [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface lte authentication password`

Password required to connect to the LTE network.

#### Usage

```
configure authority router node device-interface lte authentication password [<password>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| password | The value to set for this field |

## `configure authority router node device-interface lte authentication user-name`

Username required to connect to the LTE network.

#### Usage

```
configure authority router node device-interface lte authentication user-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface lte carrier-image`

Name of the carrier-image to load the SIM card with.

#### Usage

```
configure authority router node device-interface lte carrier-image [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority router node device-interface name`

A unique name identifier for the physical or virtual interface, used to reference it in other configuration sections and show commands.

#### Usage

```
configure authority router node device-interface name [<device-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| device-name | The value to set for this field |

## `configure authority router node device-interface network-interface`

List of network interfaces for the device-interface.

#### Usage

```
configure authority router node device-interface network-interface <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the interface, used to reference it in other configuration sections. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-node-device-interface-network-interface-address) | The list of IP addresses (along with subnet prefix length) on the interface. |
| [`adjacency`](#configure-authority-router-node-device-interface-network-interface-adjacency) | A list of adjacent routers. |
| [`bidirectional-nat`](#configure-authority-router-node-device-interface-network-interface-bidirectional-nat) | Defines the prefixes that need to be static natted in both directions. |
| [`billing-rate`](#configure-authority-router-node-device-interface-network-interface-billing-rate) | Numeric rate of currency associated with the interface. When the billing-rate is flat the field indicated rate per day. When the billing-rate is metered the field indicates rate per byte. |
| [`billing-type`](#configure-authority-router-node-device-interface-network-interface-billing-type) | Billing type associated with the interface. |
| [`carrier`](#configure-authority-router-node-device-interface-network-interface-carrier) | Carrier associated with the interface. |
| `clone` | Clone a list item |
| [`conductor`](#configure-authority-router-node-device-interface-network-interface-conductor) | Whether the interface is used for communicating with the conductor. |
| [`default-route`](#configure-authority-router-node-device-interface-network-interface-default-route) | Whether the interface is used as default-route for non-forwarding interfaces. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-description) | A description about the interface. |
| [`dhcp`](#configure-authority-router-node-device-interface-network-interface-dhcp) | Whether this interface acquires IP address and other parameter via DHCP |
| [`dhcp-delayed-auth-key`](#configure-authority-router-node-device-interface-network-interface-dhcp-delayed-auth-key) | The key used to generate the HMAC-MD5 value. |
| [`dhcp-delayed-auth-key-id`](#configure-authority-router-node-device-interface-network-interface-dhcp-delayed-auth-key-id) | The key identifier that identifies the key used to generate the HMAC-MD5 value. |
| [`dhcp-delayed-auth-realm`](#configure-authority-router-node-device-interface-network-interface-dhcp-delayed-auth-realm) | The DHCP realm that identifies the key used to generate the HMAC-MD5 value. |
| [`dhcp-reconfig-auth-algorithm`](#configure-authority-router-node-device-interface-network-interface-dhcp-reconfig-auth-algorithm) | The algorithm used by the Reconfigure Key authentication protocol to authenticate prefix-delegation messages. |
| [`dscp-map`](#configure-authority-router-node-device-interface-network-interface-dscp-map) | Mapping of DSCP values to priorities. |
| [`dscp-steering`](#configure-authority-router-node-device-interface-network-interface-dscp-steering) | Configure Dscp Steering |
| [`egress-source-nat-pool`](#configure-authority-router-node-device-interface-network-interface-egress-source-nat-pool) | Indicates whether source address and port translation (NAPT) is performed for flows egressing the interface to the final destination. |
| [`enforced-mss`](#configure-authority-router-node-device-interface-network-interface-enforced-mss) | Maximum allowed value for maximum segment size (MSS) on this interface. |
| [`ethernet-over-svr`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr) | L2 Bridge this network interface is assigned to. |
| [`global-id`](#configure-authority-router-node-device-interface-network-interface-global-id) | Global Interface Id (GIID) used in next-hop egress interface for routing data. All instances of a redundant interface will have the same GIID. |
| [`host-service`](#configure-authority-router-node-device-interface-network-interface-host-service) | The host-service configuration is a service hosted by a router node. |
| [`hostname`](#configure-authority-router-node-device-interface-network-interface-hostname) | Hostname for the interface. This is an optional fully-qualified domain name (FQDN). |
| [`icmp`](#configure-authority-router-node-device-interface-network-interface-icmp) | Enable/disable ICMP Blackhole |
| [`ifcfg-option`](#configure-authority-router-node-device-interface-network-interface-ifcfg-option) | Interface config options for non-forwarding interfaces |
| [`ingress-source-nat-pool`](#configure-authority-router-node-device-interface-network-interface-ingress-source-nat-pool) | Indicates whether source address (and optional port) translation is performed for flows targetted towards an inter-router peer. In this case, the nat will be applied on the ingress router as opposed to the final egress router. |
| [`inter-router-security`](#configure-authority-router-node-device-interface-network-interface-inter-router-security) | The name of the security policy used for inbound inter-router traffic. |
| [`management`](#configure-authority-router-node-device-interface-network-interface-management) | Allow management traffic to be sent over this interface |
| [`management-vector`](#configure-authority-router-node-device-interface-network-interface-management-vector) | Vector configuration for non-forwarding interfaces |
| [`move`](#configure-authority-router-node-device-interface-network-interface-move) | Move list items |
| [`mtu`](#configure-authority-router-node-device-interface-network-interface-mtu) | The maximum transmission unit (MTU) for packets sent on the interface. |
| [`multicast-listeners`](#configure-authority-router-node-device-interface-network-interface-multicast-listeners) | Enables the sending of IGMP and MLD queries on this interface. |
| [`multicast-report-proxy`](#configure-authority-router-node-device-interface-network-interface-multicast-report-proxy) | Enables the forwarding of IGMP and MLD joins/leaves/reports to valid multicast services to this network interface. These must come from other network interfaces which allow multicast listeners. |
| [`name`](#configure-authority-router-node-device-interface-network-interface-name) | An arbitrary, unique name for the interface, used to reference it in other configuration sections. |
| [`neighbor`](#configure-authority-router-node-device-interface-network-interface-neighbor) | A list of mappings from IP addresses to physical addresses. Entries in this list are used as static entries in the ARP cache. |
| [`neighborhood`](#configure-authority-router-node-device-interface-network-interface-neighborhood) | The neighborhoods to which this interface belongs. |
| [`off-subnet-arp-prefix`](#configure-authority-router-node-device-interface-network-interface-off-subnet-arp-prefix) | Address(es) for which the router will respond to ARP requests. |
| [`off-subnet-reverse-arp-mac-learning`](#configure-authority-router-node-device-interface-network-interface-off-subnet-reverse-arp-mac-learning) | When enabled, the source MAC address of the packet will be used for reverse traffic for off-subnet source ip address. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix-delegation`](#configure-authority-router-node-device-interface-network-interface-prefix-delegation) | Enable/disable IPv6 Prefix Delegation Client. |
| [`prefix-delegation-authentication`](#configure-authority-router-node-device-interface-network-interface-prefix-delegation-authentication) | Whether prefix-delegation messages are authenticated. |
| [`prefix-delegation-group`](#configure-authority-router-node-device-interface-network-interface-prefix-delegation-group) | The name to identify a prefix-delegation group within which the pd-client interface will request a prefix and all the internal interfaces will be assigned a global address from this prefix based on their subnet-ids. |
| [`prefix-delegation-subnet-id`](#configure-authority-router-node-device-interface-network-interface-prefix-delegation-subnet-id) | The identifier of a subnet within a prefix-delegation group which is used to construct a global IPv6 address for an internal interface. |
| [`preserve-dscp`](#configure-authority-router-node-device-interface-network-interface-preserve-dscp) | Controls if DSCP bits are preserved on this interface. |
| [`prioritization-mode`](#configure-authority-router-node-device-interface-network-interface-prioritization-mode) | Controls how packets received on this interface are prioritized. |
| [`qp-value`](#configure-authority-router-node-device-interface-network-interface-qp-value) | Quality points value that represents the &#x27;quality&#x27; of the network the interface is connected to. It used for selecting egress interface based on the service class required minimum quality points. |
| [`reverse-arp-mac-learning`](#configure-authority-router-node-device-interface-network-interface-reverse-arp-mac-learning) | Controls whether the source MAC address of the packet can be used for reverse traffic when ARP is unresolved. |
| [`rewrite-dscp`](#configure-authority-router-node-device-interface-network-interface-rewrite-dscp) | Controls if DSCP bits are rewritten on this interface. |
| [`router-advertisement`](#configure-authority-router-node-device-interface-network-interface-router-advertisement) | Enable/disable IPv6 router advertisement to advertise the prefix learned via DHCPv6-PD. |
| `show` | Show configuration data for &#x27;network-interface&#x27; |
| [`source-nat`](#configure-authority-router-node-device-interface-network-interface-source-nat) | Indicates whether source address and port translation (NAPT) is performed for flows egressing the interface to the final destination. |
| [`tenant`](#configure-authority-router-node-device-interface-network-interface-tenant) | Tenant to which this interface belongs. |
| [`tenant-prefixes`](#configure-authority-router-node-device-interface-network-interface-tenant-prefixes) | Tenant to source prefix mapping. |
| [`tunnel`](#configure-authority-router-node-device-interface-network-interface-tunnel) | Configure Tunnel |
| [`type`](#configure-authority-router-node-device-interface-network-interface-type) | Type of network that the interface is connected to. Type is fabric for inter-node traffic, external for regular traffic, and shared for both fabric and external. |
| [`vlan`](#configure-authority-router-node-device-interface-network-interface-vlan) | The VLAN id for the interface (0 for no VLAN, otherwise 1-4094). |

## `configure authority router node device-interface network-interface address`

The list of IP addresses (along with subnet prefix length) on the interface.

#### Usage

```
configure authority router node device-interface network-interface address <ip-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The IP address on the interface. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`gateway`](#configure-authority-router-node-device-interface-network-interface-address-gateway) | Optional gateway for destinations outside the subnet of the interface. |
| [`host-service`](#configure-authority-router-node-device-interface-network-interface-address-host-service) | The host-service configuration is a service hosted by a router node. |
| [`in-subnet-arp-prefix`](#configure-authority-router-node-device-interface-network-interface-address-in-subnet-arp-prefix) | Address(es) for which the router will respond to ARP requests. |
| [`ip-address`](#configure-authority-router-node-device-interface-network-interface-address-ip-address) | The IP address on the interface. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`ppp-peer-ip`](#configure-authority-router-node-device-interface-network-interface-address-ppp-peer-ip) | PPP Peer IP address for interfaces like T1. |
| [`prefix-length`](#configure-authority-router-node-device-interface-network-interface-address-prefix-length) | The length of the subnet prefix. |
| `show` | Show configuration data for &#x27;address&#x27; |
| [`utility-ip-address`](#configure-authority-router-node-device-interface-network-interface-address-utility-ip-address) | Utility IP address used for purposes other than forwarding traffic. |

## `configure authority router node device-interface network-interface address gateway`

Optional gateway for destinations outside the subnet of the interface.

#### Usage

```
configure authority router node device-interface network-interface address gateway [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service`

The host-service configuration is a service hosted by a router node.

#### Usage

```
configure authority router node device-interface network-interface address host-service <service-type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-type | The type of hosted service |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-policy`](#configure-authority-router-node-device-interface-network-interface-address-host-service-access-policy) | List of access policies by address prefix, QSN or tenant and prefix. |
| [`address-pool`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool) | Address pool for allocation by the DHCP server |
| [`authoritative`](#configure-authority-router-node-device-interface-network-interface-address-host-service-authoritative) | Whether this is the authoritative DHCP server in the network. If true, server will respond to requests with NAK where appropriate according to RFC 2131 |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-description) | A description about the hosted service. |
| [`echo-client-id`](#configure-authority-router-node-device-interface-network-interface-address-host-service-echo-client-id) | Whether the client id should be echoed in DHCP server responses as specified in RFC 6842 or not as specified in the original RFC 2131. |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-address-host-service-enabled) | Enable/disable for host services |
| [`max-lease-time`](#configure-authority-router-node-device-interface-network-interface-address-host-service-max-lease-time) | Maximum lease time for leases allocated to clients. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`server-name`](#configure-authority-router-node-device-interface-network-interface-address-host-service-server-name) | Server name that identifies the DHCP server to clients. |
| [`service-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-service-type) | The type of hosted service |
| `show` | Show configuration data for &#x27;host-service&#x27; |
| [`static-assignment`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment) | Static assignment(s) for DHCP configuration for a specific client |
| [`transport`](#configure-authority-router-node-device-interface-network-interface-address-host-service-transport) | The transport protocol(s) and port(s) for the service. |

## `configure authority router node device-interface network-interface address host-service access-policy`

List of access policies by address prefix, QSN or tenant and prefix.

#### Usage

```
configure authority router node device-interface network-interface address host-service access-policy <source>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`permission`](#configure-authority-router-node-device-interface-network-interface-address-host-service-access-policy-permission) | Whether or not to allow access to the service. |
| `show` | Show configuration data for &#x27;access-policy&#x27; |
| [`source`](#configure-authority-router-node-device-interface-network-interface-address-host-service-access-policy-source) | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

## `configure authority router node device-interface network-interface address host-service access-policy permission`

Whether or not to allow access to the service.

#### Usage

```
configure authority router node device-interface network-interface address host-service access-policy permission [<access-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| access-mode | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service access-policy source`

The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service

#### Usage

```
configure authority router node device-interface network-interface address host-service access-policy source [<source-spec>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source-spec | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool`

Address pool for allocation by the DHCP server

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool <start-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-address | Start of address pool. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| [`custom`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom) | Custom DHCP options to be provided to clients. |
| `delete` | Delete configuration data |
| [`domain-name`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-domain-name) | Domain name provided to clients. |
| [`domain-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-domain-server) | Domain name server address(es) provided to clients in priority order. |
| [`end-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-end-address) | End of address pool. |
| [`interface-mtu`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-interface-mtu) | Interface MTU provided to clients. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-move) | Move list items |
| [`ntp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-ntp-server) | NTP server address(es) provided to clients in priority order. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pop-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-pop-server) | POP server address(es) provided to clients in priority order. |
| [`router`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-router) | Gateway router address(es) provided to clients in priority order. |
| `show` | Show configuration data for &#x27;address-pool&#x27; |
| [`smtp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-smtp-server) | SMTP server address(es) provided to clients in priority order. |
| [`start-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-start-address) | Start of address pool. |
| [`static-assignment`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment) | Static assignment(s) for DHCP configuration for a specific client |
| [`static-route`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-route) | Static route(s) provided to clients. Note that for default routes the router option should be used. |
| [`tenant`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-tenant) | Tenant to which clients will be assigned. |
| [`vendor-identifying-vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information) | Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925]. |
| [`vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information) | Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132]. |

## `configure authority router node device-interface network-interface address host-service address-pool custom`

Custom DHCP options to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;custom&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-custom-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool custom code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool custom description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool custom encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool custom move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool custom quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool custom value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool custom value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool domain-name`

Domain name provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool domain-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool domain-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool end-address`

End of address pool.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool end-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool interface-mtu`

Interface MTU provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool interface-mtu [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool move domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool move domain-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool move ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool move ntp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool move pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool move pop-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool move router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool move router [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool move smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool move smtp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool ntp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool pop-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool router [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool smtp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool start-address`

Start of address pool.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool start-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment`

Static assignment(s) for DHCP configuration for a specific client

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | Address for static assignment of this client. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-address) | Address for static assignment of this client. |
| [`circuit-identifier`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-circuit-identifier) | DHCP circuit identifier option (RFC3046) identifying this client. |
| [`client-identifier`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-client-identifier) | DHCP client identifier option identifying this client. |
| `clone` | Clone a list item |
| [`custom`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom) | Custom DHCP options to be provided to clients. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-description) | A description of the static DHCP assignment. |
| [`domain-name`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-domain-name) | Domain name provided to clients. |
| [`domain-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-domain-server) | Domain name server address(es) provided to clients in priority order. |
| [`interface-mtu`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-interface-mtu) | Interface MTU provided to clients. |
| [`link-layer-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-link-layer-address) | MAC address identifying this client. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-move) | Move list items |
| [`ntp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-ntp-server) | NTP server address(es) provided to clients in priority order. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pop-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-pop-server) | POP server address(es) provided to clients in priority order. |
| [`router`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-router) | Gateway router address(es) provided to clients in priority order. |
| `show` | Show configuration data for &#x27;static-assignment&#x27; |
| [`smtp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-smtp-server) | SMTP server address(es) provided to clients in priority order. |
| [`static-route`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-static-route) | Static route(s) provided to clients. Note that for default routes the router option should be used. |
| [`tenant`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-tenant) | Tenant to which clients will be assigned. |
| [`vendor-identifying-vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information) | Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925]. |
| [`vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information) | Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132]. |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment address`

Address for static assignment of this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment circuit-identifier`

DHCP circuit identifier option (RFC3046) identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment circuit-identifier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment client-identifier`

DHCP client identifier option identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment client-identifier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom`

Custom DHCP options to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;custom&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-custom-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment custom value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment custom value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment description`

A description of the static DHCP assignment.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment domain-name`

Domain name provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment domain-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment domain-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment interface-mtu`

Interface MTU provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment interface-mtu [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment link-layer-address`

MAC address identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment link-layer-address [<mac-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| mac-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment move domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment move domain-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment move ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment move ntp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment move pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment move pop-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment move router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment move router [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment move smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment move smtp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment ntp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment pop-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment router [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment smtp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route`

Static route(s) provided to clients. Note that for default routes the router option should be used.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route <destination-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-address | Destination address of static route. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`destination-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-static-route-destination-address) | Destination address of static route. |
| [`gateway`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-static-route-gateway) | Gateway address of static route. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route destination-address`

Destination address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route destination-address [<non-default-ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| non-default-ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route gateway`

Gateway address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment static-route gateway [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment tenant`

Tenant to which clients will be assigned.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information`

Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925].

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information <enterprise-number> <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enterprise-number | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`enterprise-number`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-enterprise-number) | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-identifying-vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-identifying-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information enterprise-number`

The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information enterprise-number [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-identifying-vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information`

Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132].

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-assignment-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-assignment vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool static-route`

Static route(s) provided to clients. Note that for default routes the router option should be used.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-route <destination-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-address | Destination address of static route. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`destination-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-route-destination-address) | Destination address of static route. |
| [`gateway`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-static-route-gateway) | Gateway address of static route. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router node device-interface network-interface address host-service address-pool static-route destination-address`

Destination address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-route destination-address [<non-default-ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| non-default-ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool static-route gateway`

Gateway address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool static-route gateway [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool tenant`

Tenant to which clients will be assigned.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information`

Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925].

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information <enterprise-number> <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enterprise-number | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`enterprise-number`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-enterprise-number) | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-identifying-vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-identifying-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information enterprise-number`

The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information enterprise-number [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-identifying-vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information`

Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132].

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-address-pool-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service address-pool vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service authoritative`

Whether this is the authoritative DHCP server in the network. If true, server will respond to requests with NAK where appropriate according to RFC 2131

#### Usage

```
configure authority router node device-interface network-interface address host-service authoritative [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service authoritative`

Whether this is the authoritative DHCP server in the network. If true, server will respond to requests with NAK where appropriate according to RFC 2131

#### Usage

```
configure authority router node device-interface network-interface address host-service authoritative [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service description`

A description about the hosted service.

#### Usage

```
configure authority router node device-interface network-interface address host-service description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service echo-client-id`

Whether the client id should be echoed in DHCP server responses as specified in RFC 6842 or not as specified in the original RFC 2131.

#### Usage

```
configure authority router node device-interface network-interface address host-service echo-client-id [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service enabled`

Enable/disable for host services

#### Usage

```
configure authority router node device-interface network-interface address host-service enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service max-lease-time`

Maximum lease time for leases allocated to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service max-lease-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface address host-service server-name`

Server name that identifies the DHCP server to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service server-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service service-type`

The type of hosted service

#### Usage

```
configure authority router node device-interface network-interface address host-service service-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment`

Static assignment(s) for DHCP configuration for a specific client

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | Address for static assignment of this client. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-address) | Address for static assignment of this client. |
| [`circuit-identifier`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-circuit-identifier) | DHCP circuit identifier option (RFC3046) identifying this client. |
| [`client-identifier`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-client-identifier) | DHCP client identifier option identifying this client. |
| `clone` | Clone a list item |
| [`custom`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom) | Custom DHCP options to be provided to clients. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-description) | A description of the static DHCP assignment. |
| [`domain-name`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-domain-name) | Domain name provided to clients. |
| [`domain-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-domain-server) | Domain name server address(es) provided to clients in priority order. |
| [`interface-mtu`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-interface-mtu) | Interface MTU provided to clients. |
| [`link-layer-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-link-layer-address) | MAC address identifying this client. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-move) | Move list items |
| [`ntp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-ntp-server) | NTP server address(es) provided to clients in priority order. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pop-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-pop-server) | POP server address(es) provided to clients in priority order. |
| [`router`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-router) | Gateway router address(es) provided to clients in priority order. |
| `show` | Show configuration data for &#x27;static-assignment&#x27; |
| [`smtp-server`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-smtp-server) | SMTP server address(es) provided to clients in priority order. |
| [`static-route`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-static-route) | Static route(s) provided to clients. Note that for default routes the router option should be used. |
| [`tenant`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-tenant) | Tenant to which clients will be assigned. |
| [`vendor-identifying-vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information) | Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925]. |
| [`vendor-specific-information`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information) | Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132]. |

## `configure authority router node device-interface network-interface address host-service static-assignment address`

Address for static assignment of this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment circuit-identifier`

DHCP circuit identifier option (RFC3046) identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment circuit-identifier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment client-identifier`

DHCP client identifier option identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment client-identifier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment custom`

Custom DHCP options to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;custom&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-custom-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service static-assignment custom code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment custom description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment custom encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment custom move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment custom quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment custom value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment custom value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment description`

A description of the static DHCP assignment.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment domain-name`

Domain name provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment domain-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment domain-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment interface-mtu`

Interface MTU provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment interface-mtu [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment link-layer-address`

MAC address identifying this client.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment link-layer-address [<mac-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| mac-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment move domain-server`

Domain name server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment move domain-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment move ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment move ntp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment move pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment move pop-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment move router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment move router [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment move smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment move smtp-server [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment ntp-server`

NTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment ntp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment pop-server`

POP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment pop-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment router`

Gateway router address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment router [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment smtp-server`

SMTP server address(es) provided to clients in priority order.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment smtp-server [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment static-route`

Static route(s) provided to clients. Note that for default routes the router option should be used.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment static-route <destination-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-address | Destination address of static route. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`destination-address`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-static-route-destination-address) | Destination address of static route. |
| [`gateway`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-static-route-gateway) | Gateway address of static route. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router node device-interface network-interface address host-service static-assignment static-route destination-address`

Destination address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment static-route destination-address [<non-default-ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| non-default-ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment static-route gateway`

Gateway address of static route.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment static-route gateway [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment tenant`

Tenant to which clients will be assigned.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information`

Vendor-Identifying Vendor-Specific Information Options (Option 125) to be provided to clients [RFC3925].

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information <enterprise-number> <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enterprise-number | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`enterprise-number`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-enterprise-number) | The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-identifying-vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-identifying-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information enterprise-number`

The vendor&#x27;s registered 32-bit Enterprise Number as registered with IANA.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information enterprise-number [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-identifying-vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information`

Vendor-Specific Information Options (Option 43) to be provided to clients [RFC2132].

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information <code>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| code | The code of the custom DHCP option. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`code`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-code) | The code of the custom DHCP option. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-description) | A description of the custom DHCP option. |
| [`encoded-type`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-encoded-type) | The encoded type of the custom option. |
| [`move`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`quantity`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-quantity) | The allowed quantity of the custom option values. |
| `show` | Show configuration data for &#x27;vendor-specific-information&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-address-host-service-static-assignment-vendor-specific-information-value) | The value(s) of custom option to be provided to clients. |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information code`

The code of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information code [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information description`

A description of the custom DHCP option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information encoded-type`

The encoded type of the custom option.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information encoded-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information move value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information move value [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information quantity`

The allowed quantity of the custom option values.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information quantity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information value`

The value(s) of custom option to be provided to clients.

#### Usage

```
configure authority router node device-interface network-interface address host-service static-assignment vendor-specific-information value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority router node device-interface network-interface address host-service transport`

The transport protocol(s) and port(s) for the service.

#### Usage

```
configure authority router node device-interface network-interface address host-service transport <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | Layer 4 transport protocol. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-range`](#configure-authority-router-node-device-interface-network-interface-address-host-service-transport-port-range) | Configure Port Range |
| [`protocol`](#configure-authority-router-node-device-interface-network-interface-address-host-service-transport-protocol) | Layer 4 transport protocol. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority router node device-interface network-interface address host-service transport port-range`

Configure Port Range

#### Usage

```
configure authority router node device-interface network-interface address host-service transport port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-router-node-device-interface-network-interface-address-host-service-transport-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-router-node-device-interface-network-interface-address-host-service-transport-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority router node device-interface network-interface address host-service transport port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface address host-service transport port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service transport port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface address host-service transport port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node device-interface network-interface address host-service transport protocol`

Layer 4 transport protocol.

#### Usage

```
configure authority router node device-interface network-interface address host-service transport protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority router node device-interface network-interface address in-subnet-arp-prefix`

Address(es) for which the router will respond to ARP requests.

#### Usage

```
configure authority router node device-interface network-interface address in-subnet-arp-prefix [<unicast-ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-prefix | Value to add to this list |

## `configure authority router node device-interface network-interface address ip-address`

The IP address on the interface.

#### Usage

```
configure authority router node device-interface network-interface address ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address ppp-peer-ip`

PPP Peer IP address for interfaces like T1.

#### Usage

```
configure authority router node device-interface network-interface address ppp-peer-ip [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface address prefix-length`

The length of the subnet prefix.

#### Usage

```
configure authority router node device-interface network-interface address prefix-length [<prefix-length>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix-length | The value to set for this field |

## `configure authority router node device-interface network-interface address utility-ip-address`

Utility IP address used for purposes other than forwarding traffic.

#### Usage

```
configure authority router node device-interface network-interface address utility-ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency`

A list of adjacent routers.

#### Usage

```
configure authority router node device-interface network-interface adjacency <ip-address> <peer>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The IP address or hostname of adjacent router or waypoint-address of the peer router. |
| peer | Peer router to which this waypoint address belongs. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bfd`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd) | BFD parameters for the adjacency. |
| `clone` | Clone a list item |
| [`cost`](#configure-authority-router-node-device-interface-network-interface-adjacency-cost) | Cost of the link. |
| `delete` | Delete configuration data |
| [`encapsulate-icmp-error-messages`](#configure-authority-router-node-device-interface-network-interface-adjacency-encapsulate-icmp-error-messages) | Encapsulate ICMP errors in UDP across SVR for this adjacency |
| [`external-nat-address`](#configure-authority-router-node-device-interface-network-interface-adjacency-external-nat-address) | This is the address or hostname that is seen by the adjacent router when it receives a packet from this router. |
| [`generated`](#configure-authority-router-node-device-interface-network-interface-adjacency-generated) | Indicates whether or not the Adjacency was automatically generated as a result of STEP topology builder. |
| [`inter-router-security`](#configure-authority-router-node-device-interface-network-interface-adjacency-inter-router-security) | The name of the security policy used for inter-router traffic to the peer via this adjacency. |
| [`ip-address`](#configure-authority-router-node-device-interface-network-interface-adjacency-ip-address) | The IP address or hostname of adjacent router or waypoint-address of the peer router. |
| [`max-way-points`](#configure-authority-router-node-device-interface-network-interface-adjacency-max-way-points) | Maximum number of way points to be allocated on the peer path. |
| [`nat-keep-alive`](#configure-authority-router-node-device-interface-network-interface-adjacency-nat-keep-alive) | NAT keep-alive settings for interoperating with external NATs for this adjacency. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`packet-resiliency`](#configure-authority-router-node-device-interface-network-interface-adjacency-packet-resiliency) | Enable/disable packet-resiliency per path. |
| [`path-metrics-rolling-avg-interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-path-metrics-rolling-avg-interval) | This defines the rolling average interval used for computing various path metrics such as latency and loss. |
| [`path-mtu-discovery`](#configure-authority-router-node-device-interface-network-interface-adjacency-path-mtu-discovery) | Automatic path MTU discovery for this adjacency. |
| [`payload-encryption-override`](#configure-authority-router-node-device-interface-network-interface-adjacency-payload-encryption-override) | Transport based encryption override for payload setting for the adjacency. |
| [`peer`](#configure-authority-router-node-device-interface-network-interface-adjacency-peer) | Peer router to which this waypoint address belongs. |
| [`peer-connectivity`](#configure-authority-router-node-device-interface-network-interface-adjacency-peer-connectivity) | Whether the peer router is publicly reachable, or behind a firewall/NAT. |
| [`performance-monitoring`](#configure-authority-router-node-device-interface-network-interface-adjacency-performance-monitoring) | Performance Monitoring settings for this adjacency. |
| [`port-range`](#configure-authority-router-node-device-interface-network-interface-adjacency-port-range) | Range of destination ports that peer router is reachable at |
| [`post-encryption-padding`](#configure-authority-router-node-device-interface-network-interface-adjacency-post-encryption-padding) | Whether to add a padding byte with value of 0x0 at the end of the packet payload when encryption is enabled for this adjacency. |
| [`qp-value`](#configure-authority-router-node-device-interface-network-interface-adjacency-qp-value) | Quality points value that represents the &#x27;quality&#x27; of the the link to the adjacent router. Used for selecting egress interface based on the service class required minimum quality points. |
| [`session-optimization`](#configure-authority-router-node-device-interface-network-interface-adjacency-session-optimization) | Configure Session Optimization |
| `show` | Show configuration data for &#x27;adjacency&#x27; |
| [`source-nat-address`](#configure-authority-router-node-device-interface-network-interface-adjacency-source-nat-address) | The source nat IP address or prefixes for packets received on the interface. |
| [`step-peer-path-advertisement`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement) | Update frequency and timeliness of the STEP peer path advertisement for this adjacency. |
| [`traffic-engineering`](#configure-authority-router-node-device-interface-network-interface-adjacency-traffic-engineering) | Configure Traffic Engineering |
| [`ttl-padding`](#configure-authority-router-node-device-interface-network-interface-adjacency-ttl-padding) | Whether to perform TTL Padding on routers for this adjacency |
| [`udp-transform`](#configure-authority-router-node-device-interface-network-interface-adjacency-udp-transform) | UDP transform settings for interoperating with stateful TCP firewalls for the adjacency. |
| [`vector`](#configure-authority-router-node-device-interface-network-interface-adjacency-vector) | Vector names for path selection. |

## `configure authority router node device-interface network-interface adjacency bfd`

BFD parameters for the adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-authentication-type) | Describes the authentication type used in BFD packets |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-desired-tx-interval) | Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers. |
| [`dscp`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-dscp) | The DSCP value to use with BFD packets. |
| [`dynamic-damping`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-dynamic-damping) | When enabled, extend the hold-down time if additional link flaps occur during the hold-down period. |
| [`hold-down-time`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-hold-down-time) | Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time. |
| [`link-test-interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-link-test-interval) | This represents the interval between BFD echo tests sent to the peer node/router. |
| [`link-test-length`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-link-test-length) | This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests. |
| [`maximum-hold-down-time`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-maximum-hold-down-time) | Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value. |
| [`multiplier`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-multiplier) | Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |
| [`state`](#configure-authority-router-node-device-interface-network-interface-adjacency-bfd-state) | When enabled, run BFD between all nodes within the router. |

## `configure authority router node device-interface network-interface adjacency bfd authentication-type`

Describes the authentication type used in BFD packets

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd authentication-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency bfd desired-tx-interval`

Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd desired-tx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface adjacency bfd dscp`

The DSCP value to use with BFD packets.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd dscp [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency bfd dynamic-damping`

When enabled, extend the hold-down time if additional link flaps occur during the hold-down period.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd dynamic-damping [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency bfd hold-down-time`

Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency bfd link-test-interval`

This represents the interval between BFD echo tests sent to the peer node/router.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd link-test-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency bfd link-test-length`

This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd link-test-length [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets

## `configure authority router node device-interface network-interface adjacency bfd maximum-hold-down-time`

Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd maximum-hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency bfd multiplier`

Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20).

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd required-min-rx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface adjacency bfd state`

When enabled, run BFD between all nodes within the router.

#### Usage

```
configure authority router node device-interface network-interface adjacency bfd state [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency cost`

Cost of the link.

#### Usage

```
configure authority router node device-interface network-interface adjacency cost [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency encapsulate-icmp-error-messages`

Encapsulate ICMP errors in UDP across SVR for this adjacency

#### Usage

```
configure authority router node device-interface network-interface adjacency encapsulate-icmp-error-messages [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency external-nat-address`

This is the address or hostname that is seen by the adjacent router when it receives a packet from this router.

#### Usage

```
configure authority router node device-interface network-interface adjacency external-nat-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency generated`

Indicates whether or not the Adjacency was automatically generated as a result of STEP topology builder.

#### Usage

```
configure authority router node device-interface network-interface adjacency generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency inter-router-security`

The name of the security policy used for inter-router traffic to the peer via this adjacency.

#### Usage

```
configure authority router node device-interface network-interface adjacency inter-router-security [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency ip-address`

The IP address or hostname of adjacent router or waypoint-address of the peer router.

#### Usage

```
configure authority router node device-interface network-interface adjacency ip-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency max-way-points`

Maximum number of way points to be allocated on the peer path.

#### Usage

```
configure authority router node device-interface network-interface adjacency max-way-points [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Warning: a restart is required if max-way-points is created, modified, or deleted

## `configure authority router node device-interface network-interface adjacency nat-keep-alive`

NAT keep-alive settings for interoperating with external NATs for this adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-adjacency-nat-keep-alive-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nat-keep-alive&#x27; |
| [`tcp-inactivity-timeout`](#configure-authority-router-node-device-interface-network-interface-adjacency-nat-keep-alive-tcp-inactivity-timeout) | Represents the frequency with which TCP keep-alive packets are generated and should be shorter than the external NAT&#x27;s TCP timeout settings. |
| [`udp-inactivity-timeout`](#configure-authority-router-node-device-interface-network-interface-adjacency-nat-keep-alive-udp-inactivity-timeout) | Represents the frequency with which UDP keep-alive packets are generated and should be shorter than the external NAT&#x27;s UDP timeout settings. |

## `configure authority router node device-interface network-interface adjacency nat-keep-alive mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface adjacency nat-keep-alive mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency nat-keep-alive tcp-inactivity-timeout`

Represents the frequency with which TCP keep-alive packets are generated and should be shorter than the external NAT&#x27;s TCP timeout settings.

#### Usage

```
configure authority router node device-interface network-interface adjacency nat-keep-alive tcp-inactivity-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency nat-keep-alive udp-inactivity-timeout`

Represents the frequency with which UDP keep-alive packets are generated and should be shorter than the external NAT&#x27;s UDP timeout settings.

#### Usage

```
configure authority router node device-interface network-interface adjacency nat-keep-alive udp-inactivity-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency packet-resiliency`

Enable/disable packet-resiliency per path.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-adjacency-packet-resiliency-enabled) | Whether packet resiliency is enabled on this path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;packet-resiliency&#x27; |

## `configure authority router node device-interface network-interface adjacency packet-resiliency enabled`

Whether packet resiliency is enabled on this path.

#### Usage

```
configure authority router node device-interface network-interface adjacency packet-resiliency enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency path-metrics-rolling-avg-interval`

This defines the rolling average interval used for computing various path metrics such as latency and loss.

#### Usage

```
configure authority router node device-interface network-interface adjacency path-metrics-rolling-avg-interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency path-mtu-discovery`

Automatic path MTU discovery for this adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-adjacency-path-mtu-discovery-enabled) | Controls whether or not peer-path MTU discovery is performed |
| [`interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-path-mtu-discovery-interval) | Represents the frequency with which the peer-path MTU discovery is performed. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;path-mtu-discovery&#x27; |

## `configure authority router node device-interface network-interface adjacency path-mtu-discovery enabled`

Controls whether or not peer-path MTU discovery is performed

#### Usage

```
configure authority router node device-interface network-interface adjacency path-mtu-discovery enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency path-mtu-discovery interval`

Represents the frequency with which the peer-path MTU discovery is performed.

#### Usage

```
configure authority router node device-interface network-interface adjacency path-mtu-discovery interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency payload-encryption-override`

Transport based encryption override for payload setting for the adjacency.

#### Usage

```
configure authority router node device-interface network-interface adjacency payload-encryption-override [<payload-encryption-override>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| payload-encryption-override | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency peer`

Peer router to which this waypoint address belongs.

#### Usage

```
configure authority router node device-interface network-interface adjacency peer [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency peer-connectivity`

Whether the peer router is publicly reachable, or behind a firewall/NAT.

#### Usage

```
configure authority router node device-interface network-interface adjacency peer-connectivity [<peer-connectivity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| peer-connectivity | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency performance-monitoring`

Performance Monitoring settings for this adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-adjacency-performance-monitoring-enabled) | Whether performance monitoring is enabled. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`profile`](#configure-authority-router-node-device-interface-network-interface-adjacency-performance-monitoring-profile) | The name of the performance monitoring profile used for marking traffic. |
| `show` | Show configuration data for &#x27;performance-monitoring&#x27; |

## `configure authority router node device-interface network-interface adjacency performance-monitoring enabled`

Whether performance monitoring is enabled.

#### Usage

```
configure authority router node device-interface network-interface adjacency performance-monitoring enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency performance-monitoring profile`

The name of the performance monitoring profile used for marking traffic.

#### Usage

```
configure authority router node device-interface network-interface adjacency performance-monitoring profile [<performance-monitoring-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| performance-monitoring-profile-ref | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency port-range`

Range of destination ports that peer router is reachable at

#### Usage

```
configure authority router node device-interface network-interface adjacency port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-router-node-device-interface-network-interface-adjacency-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-router-node-device-interface-network-interface-adjacency-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority router node device-interface network-interface adjacency port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface adjacency port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface adjacency port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency post-encryption-padding`

Whether to add a padding byte with value of 0x0 at the end of the packet payload when encryption is enabled for this adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-adjacency-post-encryption-padding-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;post-encryption-padding&#x27; |

## `configure authority router node device-interface network-interface adjacency post-encryption-padding mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface adjacency post-encryption-padding mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency qp-value`

Quality points value that represents the &#x27;quality&#x27; of the the link to the adjacent router. Used for selecting egress interface based on the service class required minimum quality points.

#### Usage

```
configure authority router node device-interface network-interface adjacency qp-value [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency session-optimization`

Configure Session Optimization

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-adjacency-session-optimization-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;session-optimization&#x27; |

## `configure authority router node device-interface network-interface adjacency session-optimization mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface adjacency session-optimization mode [<session-optimization-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| session-optimization-mode | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency source-nat-address`

The source nat IP address or prefixes for packets received on the interface.

#### Usage

```
configure authority router node device-interface network-interface adjacency source-nat-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

#### Description

Warning: &#x27;source-nat-address&#x27; is deprecated and will be removed in a future software version

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement`

Update frequency and timeliness of the STEP peer path advertisement for this adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;step-peer-path-advertisement&#x27; |
| [`sla-metrics`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics) | Configure Sla Metrics |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics`

Configure Sla Metrics

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| [`decrease-report-delay`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-decrease-report-delay) | Specifies mappings of peer path SLA metrics decrease to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function. |
| `delete` | Delete configuration data |
| [`increase-report-delay`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-increase-report-delay) | Specifies mappings of peer path SLA metrics increase to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function. |
| [`moving-average-sample-size`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-moving-average-sample-size) | Sample size for calculating the weighted moving average of peer path SLA metrics to be advertised into STEP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;sla-metrics&#x27; |
| [`significance-threshold`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-significance-threshold) | Thresholds for peer path SLA metrics. Values above the threshold are considered significant enough to be advertised into STEP. |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay`

Specifies mappings of peer path SLA metrics decrease to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay <percentage>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | Largest percentage decrease seen among all of the metric values. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-decrease-report-delay-delay) | Reporting delay for the given percentage decrease. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`percentage`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-decrease-report-delay-percentage) | Largest percentage decrease seen among all of the metric values. |
| `show` | Show configuration data for &#x27;decrease-report-delay&#x27; |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay delay`

Reporting delay for the given percentage decrease.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay percentage`

Largest percentage decrease seen among all of the metric values.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics decrease-report-delay percentage [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay`

Specifies mappings of peer path SLA metrics increase to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay <percentage>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | Largest percentage increase seen among all of the metric values. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-increase-report-delay-delay) | Reporting delay for the given percentage increase. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`percentage`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-increase-report-delay-percentage) | Largest percentage increase seen among all of the metric values. |
| `show` | Show configuration data for &#x27;increase-report-delay&#x27; |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay delay`

Reporting delay for the given percentage increase.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay percentage`

Largest percentage increase seen among all of the metric values.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics increase-report-delay percentage [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics moving-average-sample-size`

Sample size for calculating the weighted moving average of peer path SLA metrics to be advertised into STEP.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics moving-average-sample-size [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold`

Thresholds for peer path SLA metrics. Values above the threshold are considered significant enough to be advertised into STEP.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`min-jitter`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-significance-threshold-min-jitter) | The threshold jitter value considered significant enough for advertising into STEP. |
| [`min-latency`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-significance-threshold-min-latency) | The threshold latency value considered significant enough for advertising into STEP. |
| [`min-loss`](#configure-authority-router-node-device-interface-network-interface-adjacency-step-peer-path-advertisement-sla-metrics-significance-threshold-min-loss) | The threshold of packet loss considered significant enough for advertising into STEP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;significance-threshold&#x27; |

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-jitter`

The threshold jitter value considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-jitter [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-latency`

The threshold latency value considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-latency [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-loss`

The threshold of packet loss considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface adjacency step-peer-path-advertisement sla-metrics significance-threshold min-loss [<decimal64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| decimal64 | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface adjacency traffic-engineering`

Configure Traffic Engineering

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-adjacency-traffic-engineering-enabled) | Whether traffic engineering is enabled on the adjacency. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;traffic-engineering&#x27; |
| [`traffic-profile`](#configure-authority-router-node-device-interface-network-interface-adjacency-traffic-engineering-traffic-profile) | The name of the traffic profile used for traffic engineering on this adjacency |
| [`transmit-cap`](#configure-authority-router-node-device-interface-network-interface-adjacency-traffic-engineering-transmit-cap) | The transmit capacity of the this adjacency. |

## `configure authority router node device-interface network-interface adjacency traffic-engineering enabled`

Whether traffic engineering is enabled on the adjacency.

#### Usage

```
configure authority router node device-interface network-interface adjacency traffic-engineering enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency traffic-engineering traffic-profile`

The name of the traffic profile used for traffic engineering on this adjacency

#### Usage

```
configure authority router node device-interface network-interface adjacency traffic-engineering traffic-profile [<traffic-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-profile-ref | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency traffic-engineering transmit-cap`

The transmit capacity of the this adjacency.

#### Usage

```
configure authority router node device-interface network-interface adjacency traffic-engineering transmit-cap [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router node device-interface network-interface adjacency ttl-padding`

Whether to perform TTL Padding on routers for this adjacency

#### Usage

```
configure authority router node device-interface network-interface adjacency ttl-padding [<ttl-padding-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ttl-padding-type | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency udp-transform`

UDP transform settings for interoperating with stateful TCP firewalls for the adjacency.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`detect-interval`](#configure-authority-router-node-device-interface-network-interface-adjacency-udp-transform-detect-interval) | Represents the frequency with which the stateful TCP firewall discovery is performed. |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-adjacency-udp-transform-mode) | Configure Mode |
| [`nat-keep-alive-mode`](#configure-authority-router-node-device-interface-network-interface-adjacency-udp-transform-nat-keep-alive-mode) | Configure Nat Keep Alive Mode |
| [`nat-keep-alive-timeout`](#configure-authority-router-node-device-interface-network-interface-adjacency-udp-transform-nat-keep-alive-timeout) | Represents the frequency with which keep-alive packets are generated. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;udp-transform&#x27; |

## `configure authority router node device-interface network-interface adjacency udp-transform detect-interval`

Represents the frequency with which the stateful TCP firewall discovery is performed.

#### Usage

```
configure authority router node device-interface network-interface adjacency udp-transform detect-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency udp-transform mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface adjacency udp-transform mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency udp-transform nat-keep-alive-mode`

Configure Nat Keep Alive Mode

#### Usage

```
configure authority router node device-interface network-interface adjacency udp-transform nat-keep-alive-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface adjacency udp-transform nat-keep-alive-timeout`

Represents the frequency with which keep-alive packets are generated.

#### Usage

```
configure authority router node device-interface network-interface adjacency udp-transform nat-keep-alive-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface adjacency vector`

Vector names for path selection.

#### Usage

```
configure authority router node device-interface network-interface adjacency vector [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | Value to add to this list |

## `configure authority router node device-interface network-interface bidirectional-nat`

Defines the prefixes that need to be static natted in both directions.

#### Usage

```
configure authority router node device-interface network-interface bidirectional-nat <local-ip>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| local-ip | For packets ingressing this interface, local IP will be source natted to remote IP. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`local-ip`](#configure-authority-router-node-device-interface-network-interface-bidirectional-nat-local-ip) | For packets ingressing this interface, local IP will be source natted to remote IP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`remote-ip`](#configure-authority-router-node-device-interface-network-interface-bidirectional-nat-remote-ip) | For packets egressing this interface, the remote IP will be destination natted to local IP. |
| `show` | Show configuration data for &#x27;bidirectional-nat&#x27; |

## `configure authority router node device-interface network-interface bidirectional-nat local-ip`

For packets ingressing this interface, local IP will be source natted to remote IP.

#### Usage

```
configure authority router node device-interface network-interface bidirectional-nat local-ip [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority router node device-interface network-interface bidirectional-nat remote-ip`

For packets egressing this interface, the remote IP will be destination natted to local IP.

#### Usage

```
configure authority router node device-interface network-interface bidirectional-nat remote-ip [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority router node device-interface network-interface billing-rate`

Numeric rate of currency associated with the interface. When the billing-rate is flat the field indicated rate per day. When the billing-rate is metered the field indicates rate per byte.

#### Usage

```
configure authority router node device-interface network-interface billing-rate [<decimal64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| decimal64 | The value to set for this field |

## `configure authority router node device-interface network-interface billing-type`

Billing type associated with the interface.

#### Usage

```
configure authority router node device-interface network-interface billing-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface carrier`

Carrier associated with the interface.

#### Usage

```
configure authority router node device-interface network-interface carrier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface conductor`

Whether the interface is used for communicating with the conductor.

#### Usage

```
configure authority router node device-interface network-interface conductor [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface default-route`

Whether the interface is used as default-route for non-forwarding interfaces.

#### Usage

```
configure authority router node device-interface network-interface default-route [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface description`

A description about the interface.

#### Usage

```
configure authority router node device-interface network-interface description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface dhcp`

Whether this interface acquires IP address and other parameter via DHCP

#### Usage

```
configure authority router node device-interface network-interface dhcp [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface dhcp-delayed-auth-key`

The key used to generate the HMAC-MD5 value.

#### Usage

```
configure authority router node device-interface network-interface dhcp-delayed-auth-key [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface dhcp-delayed-auth-key-id`

The key identifier that identifies the key used to generate the HMAC-MD5 value.

#### Usage

```
configure authority router node device-interface network-interface dhcp-delayed-auth-key-id [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface dhcp-delayed-auth-realm`

The DHCP realm that identifies the key used to generate the HMAC-MD5 value.

#### Usage

```
configure authority router node device-interface network-interface dhcp-delayed-auth-realm [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface dhcp-reconfig-auth-algorithm`

The algorithm used by the Reconfigure Key authentication protocol to authenticate prefix-delegation messages.

#### Usage

```
configure authority router node device-interface network-interface dhcp-reconfig-auth-algorithm [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface dscp-map`

Mapping of DSCP values to priorities.

#### Usage

```
configure authority router node device-interface network-interface dscp-map [<dscp-map-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp-map-ref | The value to set for this field |

## `configure authority router node device-interface network-interface dscp-steering`

Configure Dscp Steering

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-enabled) | Whether or not traffic on this interface should use DSCP values for flow and service lookups. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dscp-steering&#x27; |
| [`transport`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-transport) | Protocol and port(s) on which to enable dscp-steering. |

## `configure authority router node device-interface network-interface dscp-steering enabled`

Whether or not traffic on this interface should use DSCP values for flow and service lookups.

#### Usage

```
configure authority router node device-interface network-interface dscp-steering enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface dscp-steering transport`

Protocol and port(s) on which to enable dscp-steering.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-range`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-transport-port-range) | Configure Port Range |
| [`protocol`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-transport-protocol) | Layer 4 transport protocol. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority router node device-interface network-interface dscp-steering transport port-range`

Configure Port Range

#### Usage

```
configure authority router node device-interface network-interface dscp-steering transport port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-transport-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-router-node-device-interface-network-interface-dscp-steering-transport-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority router node device-interface network-interface dscp-steering transport port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface dscp-steering transport port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority router node device-interface network-interface dscp-steering transport port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface dscp-steering transport port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node device-interface network-interface dscp-steering transport protocol`

Layer 4 transport protocol.

#### Usage

```
configure authority router node device-interface network-interface dscp-steering transport protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority router node device-interface network-interface egress-source-nat-pool`

Indicates whether source address and port translation (NAPT) is performed for flows egressing the interface to the final destination.

#### Usage

```
configure authority router node device-interface network-interface egress-source-nat-pool [<nat-pool-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| nat-pool-ref | The value to set for this field |

## `configure authority router node device-interface network-interface enforced-mss`

Maximum allowed value for maximum segment size (MSS) on this interface.

#### Usage

```
configure authority router node device-interface network-interface enforced-mss [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

#### Description

Units: bytes

## `configure authority router node device-interface network-interface ethernet-over-svr`

L2 Bridge this network interface is assigned to.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-enabled) | Whether the interface is used as ethernet over SVR bridge. |
| [`encapsulate-all-traffic`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-encapsulate-all-traffic) | Whether all traffic arriving on the bridge should be encapsulated. |
| [`name`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-name) | Name of the L2 over SVR bridge. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-peer) | A list of peer IPs representing the L2 adjacencies. |
| `show` | Show configuration data for &#x27;ethernet-over-svr&#x27; |

## `configure authority router node device-interface network-interface ethernet-over-svr enabled`

Whether the interface is used as ethernet over SVR bridge.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface ethernet-over-svr encapsulate-all-traffic`

Whether all traffic arriving on the bridge should be encapsulated.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr encapsulate-all-traffic [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface ethernet-over-svr name`

Name of the L2 over SVR bridge.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface ethernet-over-svr peer`

A list of peer IPs representing the L2 adjacencies.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr peer <ip-address> <peer>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The IP address or hostname of the LAN segment of peer router which is associated with the same eosvr-bridge name. |
| peer | Peer router on which this L2 adjacency exists. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`ip-address`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-peer-ip-address) | The IP address or hostname of the LAN segment of peer router which is associated with the same eosvr-bridge name. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-node-device-interface-network-interface-ethernet-over-svr-peer-peer) | Peer router on which this L2 adjacency exists. |
| `show` | Show configuration data for &#x27;peer&#x27; |

## `configure authority router node device-interface network-interface ethernet-over-svr peer ip-address`

The IP address or hostname of the LAN segment of peer router which is associated with the same eosvr-bridge name.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr peer ip-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node device-interface network-interface ethernet-over-svr peer peer`

Peer router on which this L2 adjacency exists.

#### Usage

```
configure authority router node device-interface network-interface ethernet-over-svr peer peer [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router node device-interface network-interface global-id`

Global Interface Id (GIID) used in next-hop egress interface for routing data. All instances of a redundant interface will have the same GIID.

#### Usage

```
configure authority router node device-interface network-interface global-id [<global-interface-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| global-interface-id | The value to set for this field |

## `configure authority router node device-interface network-interface host-service`

The host-service configuration is a service hosted by a router node.

#### Usage

```
configure authority router node device-interface network-interface host-service <service-type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-type | The type of hosted service |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-policy`](#configure-authority-router-node-device-interface-network-interface-host-service-access-policy) | List of access policies by address prefix, QSN or tenant and prefix. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-node-device-interface-network-interface-host-service-description) | A description about the hosted service. |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-host-service-enabled) | Enable/disable for host services |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`service-type`](#configure-authority-router-node-device-interface-network-interface-host-service-service-type) | The type of hosted service |
| `show` | Show configuration data for &#x27;host-service&#x27; |
| [`transport`](#configure-authority-router-node-device-interface-network-interface-host-service-transport) | The transport protocol(s) and port(s) for the service. |

## `configure authority router node device-interface network-interface host-service access-policy`

List of access policies by address prefix, QSN or tenant and prefix.

#### Usage

```
configure authority router node device-interface network-interface host-service access-policy <source>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`permission`](#configure-authority-router-node-device-interface-network-interface-host-service-access-policy-permission) | Whether or not to allow access to the service. |
| `show` | Show configuration data for &#x27;access-policy&#x27; |
| [`source`](#configure-authority-router-node-device-interface-network-interface-host-service-access-policy-source) | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

## `configure authority router node device-interface network-interface host-service access-policy permission`

Whether or not to allow access to the service.

#### Usage

```
configure authority router node device-interface network-interface host-service access-policy permission [<access-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| access-mode | The value to set for this field |

## `configure authority router node device-interface network-interface host-service access-policy source`

The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service

#### Usage

```
configure authority router node device-interface network-interface host-service access-policy source [<source-spec>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source-spec | The value to set for this field |

## `configure authority router node device-interface network-interface host-service description`

A description about the hosted service.

#### Usage

```
configure authority router node device-interface network-interface host-service description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface host-service enabled`

Enable/disable for host services

#### Usage

```
configure authority router node device-interface network-interface host-service enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface host-service service-type`

The type of hosted service

#### Usage

```
configure authority router node device-interface network-interface host-service service-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface host-service transport`

The transport protocol(s) and port(s) for the service.

#### Usage

```
configure authority router node device-interface network-interface host-service transport <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | Layer 4 transport protocol. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-range`](#configure-authority-router-node-device-interface-network-interface-host-service-transport-port-range) | Configure Port Range |
| [`protocol`](#configure-authority-router-node-device-interface-network-interface-host-service-transport-protocol) | Layer 4 transport protocol. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority router node device-interface network-interface host-service transport port-range`

Configure Port Range

#### Usage

```
configure authority router node device-interface network-interface host-service transport port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-router-node-device-interface-network-interface-host-service-transport-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-router-node-device-interface-network-interface-host-service-transport-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority router node device-interface network-interface host-service transport port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface host-service transport port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority router node device-interface network-interface host-service transport port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface host-service transport port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node device-interface network-interface host-service transport protocol`

Layer 4 transport protocol.

#### Usage

```
configure authority router node device-interface network-interface host-service transport protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority router node device-interface network-interface hostname`

Hostname for the interface. This is an optional fully-qualified domain name (FQDN).

#### Usage

```
configure authority router node device-interface network-interface hostname [<domain-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| domain-name | The value to set for this field |

## `configure authority router node device-interface network-interface icmp`

Enable/disable ICMP Blackhole

#### Usage

```
configure authority router node device-interface network-interface icmp [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface ifcfg-option`

Interface config options for non-forwarding interfaces

#### Usage

```
configure authority router node device-interface network-interface ifcfg-option <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the ifcfg option |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-node-device-interface-network-interface-ifcfg-option-name) | Name of the ifcfg option |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ifcfg-option&#x27; |
| [`value`](#configure-authority-router-node-device-interface-network-interface-ifcfg-option-value) | Value of the ifcfg options |

## `configure authority router node device-interface network-interface ifcfg-option name`

Name of the ifcfg option

#### Usage

```
configure authority router node device-interface network-interface ifcfg-option name [<ifcfg-key>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ifcfg-key | The value to set for this field |

## `configure authority router node device-interface network-interface ifcfg-option value`

Value of the ifcfg options

#### Usage

```
configure authority router node device-interface network-interface ifcfg-option value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface ingress-source-nat-pool`

Indicates whether source address (and optional port) translation is performed for flows targetted towards an inter-router peer. In this case, the nat will be applied on the ingress router as opposed to the final egress router.

#### Usage

```
configure authority router node device-interface network-interface ingress-source-nat-pool [<nat-pool-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| nat-pool-ref | The value to set for this field |

## `configure authority router node device-interface network-interface inter-router-security`

The name of the security policy used for inbound inter-router traffic.

#### Usage

```
configure authority router node device-interface network-interface inter-router-security [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

## `configure authority router node device-interface network-interface management`

Allow management traffic to be sent over this interface

#### Usage

```
configure authority router node device-interface network-interface management [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface management-vector`

Vector configuration for non-forwarding interfaces

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-node-device-interface-network-interface-management-vector-name) | Name of the vector. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-router-node-device-interface-network-interface-management-vector-priority) | Priority value for the paths with the vector. |
| `show` | Show configuration data for &#x27;management-vector&#x27; |

## `configure authority router node device-interface network-interface management-vector name`

Name of the vector.

#### Usage

```
configure authority router node device-interface network-interface management-vector name [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | The value to set for this field |

## `configure authority router node device-interface network-interface management-vector priority`

Priority value for the paths with the vector.

#### Usage

```
configure authority router node device-interface network-interface management-vector priority [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface move neighborhood`

The neighborhoods to which this interface belongs.

#### Usage

```
configure authority router node device-interface network-interface move neighborhood <name> <position> [<relative-to-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The neighborhood to which this interface belongs. |
| position | first \| after \| before \| last |
| relative-to-name | Key of item before or after which to move |

## `configure authority router node device-interface network-interface mtu`

The maximum transmission unit (MTU) for packets sent on the interface.

#### Usage

```
configure authority router node device-interface network-interface mtu [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router node device-interface network-interface multicast-listeners`

Enables the sending of IGMP and MLD queries on this interface.

#### Usage

```
configure authority router node device-interface network-interface multicast-listeners [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface multicast-report-proxy`

Enables the forwarding of IGMP and MLD joins/leaves/reports to valid multicast services to this network interface. These must come from other network interfaces which allow multicast listeners.

#### Usage

```
configure authority router node device-interface network-interface multicast-report-proxy [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface name`

An arbitrary, unique name for the interface, used to reference it in other configuration sections.

#### Usage

```
configure authority router node device-interface network-interface name [<interface-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| interface-name | The value to set for this field |

## `configure authority router node device-interface network-interface neighbor`

A list of mappings from IP addresses to physical addresses. Entries in this list are used as static entries in the ARP cache.

#### Usage

```
configure authority router node device-interface network-interface neighbor <ip-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The IP address of a neighbor node. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`ip-address`](#configure-authority-router-node-device-interface-network-interface-neighbor-ip-address) | The IP address of a neighbor node. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`phys-address`](#configure-authority-router-node-device-interface-network-interface-neighbor-phys-address) | The physical level address (MAC address) of the neighbor node. |
| `show` | Show configuration data for &#x27;neighbor&#x27; |

## `configure authority router node device-interface network-interface neighbor ip-address`

The IP address of a neighbor node.

#### Usage

```
configure authority router node device-interface network-interface neighbor ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface neighbor phys-address`

The physical level address (MAC address) of the neighbor node.

#### Usage

```
configure authority router node device-interface network-interface neighbor phys-address [<phys-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| phys-address | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood`

The neighborhoods to which this interface belongs.

#### Usage

```
configure authority router node device-interface network-interface neighborhood <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The neighborhood to which this interface belongs. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bfd`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd) | BFD parameters for peers in the neighborhood. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`encapsulate-icmp-error-messages`](#configure-authority-router-node-device-interface-network-interface-neighborhood-encapsulate-icmp-error-messages) | Encapsulate ICMP errors in UDP across SVR on routers within this neighborhood |
| [`external-nat-address`](#configure-authority-router-node-device-interface-network-interface-neighborhood-external-nat-address) | This is the address or hostname that is seen by the adjacent router when it receives a packet from this router. |
| [`max-way-points`](#configure-authority-router-node-device-interface-network-interface-neighborhood-max-way-points) | Maximum number of way points to be allocated on each peer paths within the neighborhood. |
| [`name`](#configure-authority-router-node-device-interface-network-interface-neighborhood-name) | The neighborhood to which this interface belongs. |
| [`nat-keep-alive`](#configure-authority-router-node-device-interface-network-interface-neighborhood-nat-keep-alive) | NAT keep-alive settings for interoperating with external NATs for peers in the neighborhood. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`packet-resiliency`](#configure-authority-router-node-device-interface-network-interface-neighborhood-packet-resiliency) | Enable/disable packet-resiliency per path. |
| [`path-metrics-rolling-avg-interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-path-metrics-rolling-avg-interval) | This defines the rolling average interval used for computing various path metrics such as latency and loss. |
| [`path-mtu-discovery`](#configure-authority-router-node-device-interface-network-interface-neighborhood-path-mtu-discovery) | Automatic path MTU discovery for peers in the neighborhood. |
| [`payload-encryption-override`](#configure-authority-router-node-device-interface-network-interface-neighborhood-payload-encryption-override) | Transport based encryption override for payload setting within the neighborhood. |
| [`peer-connectivity`](#configure-authority-router-node-device-interface-network-interface-neighborhood-peer-connectivity) | Whether the peer router is publicly reachable, or behind a firewall/NAT. |
| [`peer-path-overlay`](#configure-authority-router-node-device-interface-network-interface-neighborhood-peer-path-overlay) | Overlay type for the neighborhood. |
| [`performance-monitoring`](#configure-authority-router-node-device-interface-network-interface-neighborhood-performance-monitoring) | Performance Monitoring settings in the neighborhood. |
| [`port-range`](#configure-authority-router-node-device-interface-network-interface-neighborhood-port-range) | Range of destination ports that local router is reachable by peer routers in the neighborhood. |
| [`post-encryption-padding`](#configure-authority-router-node-device-interface-network-interface-neighborhood-post-encryption-padding) | Whether to add a padding byte with value of 0x0 at the end of the packet payload when encryption is enabled for peers in the neighborhood. |
| [`qp-value`](#configure-authority-router-node-device-interface-network-interface-neighborhood-qp-value) | Quality points value that represents the &#x27;quality&#x27; of the the links to adjacent routers in the neighborhood. Used for selecting egress interface based on the service class required minimum quality points. |
| [`session-optimization`](#configure-authority-router-node-device-interface-network-interface-neighborhood-session-optimization) | Configure Session Optimization |
| `show` | Show configuration data for &#x27;neighborhood&#x27; |
| [`step-peer-path-advertisement`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement) | Update frequency and timeliness of the STEP peer path advertisements for this neighborhood. |
| [`topology`](#configure-authority-router-node-device-interface-network-interface-neighborhood-topology) | Type of topology for this router in the network for the neighborhood. This determines the other routers in the neighborhood with which this router has an adjacency. |
| [`traffic-engineering`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering) | Configure Traffic Engineering |
| [`ttl-padding`](#configure-authority-router-node-device-interface-network-interface-neighborhood-ttl-padding) | Whether to perform TTL Padding on routers within this neighborhood |
| [`udp-transform`](#configure-authority-router-node-device-interface-network-interface-neighborhood-udp-transform) | UDP transform settings for interoperating with stateful TCP firewalls for peers in the neighborhood. |
| [`vector`](#configure-authority-router-node-device-interface-network-interface-neighborhood-vector) | Vector name to associate with adjacencies in the neighborhood. |

## `configure authority router node device-interface network-interface neighborhood bfd`

BFD parameters for peers in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-authentication-type) | Describes the authentication type used in BFD packets |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-desired-tx-interval) | Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers. |
| [`dscp`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-dscp) | The DSCP value to use with BFD packets. |
| [`dynamic-damping`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-dynamic-damping) | When enabled, extend the hold-down time if additional link flaps occur during the hold-down period. |
| [`hold-down-time`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-hold-down-time) | Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time. |
| [`link-test-interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-link-test-interval) | This represents the interval between BFD echo tests sent to the peer node/router. |
| [`link-test-length`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-link-test-length) | This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests. |
| [`maximum-hold-down-time`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-maximum-hold-down-time) | Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value. |
| [`multiplier`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-multiplier) | Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |
| [`state`](#configure-authority-router-node-device-interface-network-interface-neighborhood-bfd-state) | When enabled, run BFD between all nodes within the router. |

## `configure authority router node device-interface network-interface neighborhood bfd authentication-type`

Describes the authentication type used in BFD packets

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd authentication-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood bfd desired-tx-interval`

Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd desired-tx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface neighborhood bfd dscp`

The DSCP value to use with BFD packets.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd dscp [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood bfd dynamic-damping`

When enabled, extend the hold-down time if additional link flaps occur during the hold-down period.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd dynamic-damping [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood bfd hold-down-time`

Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood bfd link-test-interval`

This represents the interval between BFD echo tests sent to the peer node/router.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd link-test-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood bfd link-test-length`

This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd link-test-length [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets

## `configure authority router node device-interface network-interface neighborhood bfd maximum-hold-down-time`

Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd maximum-hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood bfd multiplier`

Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20).

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd required-min-rx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface neighborhood bfd state`

When enabled, run BFD between all nodes within the router.

#### Usage

```
configure authority router node device-interface network-interface neighborhood bfd state [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood encapsulate-icmp-error-messages`

Encapsulate ICMP errors in UDP across SVR on routers within this neighborhood

#### Usage

```
configure authority router node device-interface network-interface neighborhood encapsulate-icmp-error-messages [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood external-nat-address`

This is the address or hostname that is seen by the adjacent router when it receives a packet from this router.

#### Usage

```
configure authority router node device-interface network-interface neighborhood external-nat-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood max-way-points`

Maximum number of way points to be allocated on each peer paths within the neighborhood.

#### Usage

```
configure authority router node device-interface network-interface neighborhood max-way-points [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Warning: a restart is required if max-way-points is created, modified, or deleted

## `configure authority router node device-interface network-interface neighborhood name`

The neighborhood to which this interface belongs.

#### Usage

```
configure authority router node device-interface network-interface neighborhood name [<neighborhood-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighborhood-id | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood nat-keep-alive`

NAT keep-alive settings for interoperating with external NATs for peers in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-neighborhood-nat-keep-alive-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nat-keep-alive&#x27; |
| [`tcp-inactivity-timeout`](#configure-authority-router-node-device-interface-network-interface-neighborhood-nat-keep-alive-tcp-inactivity-timeout) | Represents the frequency with which TCP keep-alive packets are generated and should be shorter than the external NAT&#x27;s TCP timeout settings. |
| [`udp-inactivity-timeout`](#configure-authority-router-node-device-interface-network-interface-neighborhood-nat-keep-alive-udp-inactivity-timeout) | Represents the frequency with which UDP keep-alive packets are generated and should be shorter than the external NAT&#x27;s UDP timeout settings. |

## `configure authority router node device-interface network-interface neighborhood nat-keep-alive mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface neighborhood nat-keep-alive mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood nat-keep-alive tcp-inactivity-timeout`

Represents the frequency with which TCP keep-alive packets are generated and should be shorter than the external NAT&#x27;s TCP timeout settings.

#### Usage

```
configure authority router node device-interface network-interface neighborhood nat-keep-alive tcp-inactivity-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood nat-keep-alive udp-inactivity-timeout`

Represents the frequency with which UDP keep-alive packets are generated and should be shorter than the external NAT&#x27;s UDP timeout settings.

#### Usage

```
configure authority router node device-interface network-interface neighborhood nat-keep-alive udp-inactivity-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood packet-resiliency`

Enable/disable packet-resiliency per path.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-neighborhood-packet-resiliency-enabled) | Whether packet resiliency is enabled on this path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;packet-resiliency&#x27; |

## `configure authority router node device-interface network-interface neighborhood packet-resiliency enabled`

Whether packet resiliency is enabled on this path.

#### Usage

```
configure authority router node device-interface network-interface neighborhood packet-resiliency enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood path-metrics-rolling-avg-interval`

This defines the rolling average interval used for computing various path metrics such as latency and loss.

#### Usage

```
configure authority router node device-interface network-interface neighborhood path-metrics-rolling-avg-interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood path-mtu-discovery`

Automatic path MTU discovery for peers in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-neighborhood-path-mtu-discovery-enabled) | Controls whether or not peer-path MTU discovery is performed |
| [`interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-path-mtu-discovery-interval) | Represents the frequency with which the peer-path MTU discovery is performed. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;path-mtu-discovery&#x27; |

## `configure authority router node device-interface network-interface neighborhood path-mtu-discovery enabled`

Controls whether or not peer-path MTU discovery is performed

#### Usage

```
configure authority router node device-interface network-interface neighborhood path-mtu-discovery enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood path-mtu-discovery interval`

Represents the frequency with which the peer-path MTU discovery is performed.

#### Usage

```
configure authority router node device-interface network-interface neighborhood path-mtu-discovery interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood payload-encryption-override`

Transport based encryption override for payload setting within the neighborhood.

#### Usage

```
configure authority router node device-interface network-interface neighborhood payload-encryption-override [<payload-encryption-override>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| payload-encryption-override | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood peer-connectivity`

Whether the peer router is publicly reachable, or behind a firewall/NAT.

#### Usage

```
configure authority router node device-interface network-interface neighborhood peer-connectivity [<peer-connectivity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| peer-connectivity | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood peer-path-overlay`

Overlay type for the neighborhood.

#### Usage

```
configure authority router node device-interface network-interface neighborhood peer-path-overlay [<peer-path-overlay>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| peer-path-overlay | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood performance-monitoring`

Performance Monitoring settings in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-neighborhood-performance-monitoring-enabled) | Whether performance monitoring is enabled. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`profile`](#configure-authority-router-node-device-interface-network-interface-neighborhood-performance-monitoring-profile) | The name of the performance monitoring profile used for marking traffic. |
| `show` | Show configuration data for &#x27;performance-monitoring&#x27; |

## `configure authority router node device-interface network-interface neighborhood performance-monitoring enabled`

Whether performance monitoring is enabled.

#### Usage

```
configure authority router node device-interface network-interface neighborhood performance-monitoring enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood performance-monitoring profile`

The name of the performance monitoring profile used for marking traffic.

#### Usage

```
configure authority router node device-interface network-interface neighborhood performance-monitoring profile [<performance-monitoring-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| performance-monitoring-profile-ref | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood port-range`

Range of destination ports that local router is reachable by peer routers in the neighborhood.

#### Usage

```
configure authority router node device-interface network-interface neighborhood port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-router-node-device-interface-network-interface-neighborhood-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-router-node-device-interface-network-interface-neighborhood-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority router node device-interface network-interface neighborhood port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface neighborhood port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority router node device-interface network-interface neighborhood port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood post-encryption-padding`

Whether to add a padding byte with value of 0x0 at the end of the packet payload when encryption is enabled for peers in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-neighborhood-post-encryption-padding-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;post-encryption-padding&#x27; |

## `configure authority router node device-interface network-interface neighborhood post-encryption-padding mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface neighborhood post-encryption-padding mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood qp-value`

Quality points value that represents the &#x27;quality&#x27; of the the links to adjacent routers in the neighborhood. Used for selecting egress interface based on the service class required minimum quality points.

#### Usage

```
configure authority router node device-interface network-interface neighborhood qp-value [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Warning: &#x27;qp-value&#x27; is deprecated and will be removed in a future software version

## `configure authority router node device-interface network-interface neighborhood session-optimization`

Configure Session Optimization

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-neighborhood-session-optimization-mode) | Configure Mode |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;session-optimization&#x27; |

## `configure authority router node device-interface network-interface neighborhood session-optimization mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface neighborhood session-optimization mode [<session-optimization-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| session-optimization-mode | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement`

Update frequency and timeliness of the STEP peer path advertisements for this neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;step-peer-path-advertisement&#x27; |
| [`sla-metrics`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics) | Configure Sla Metrics |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics`

Configure Sla Metrics

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| [`decrease-report-delay`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-decrease-report-delay) | Specifies mappings of peer path SLA metrics decrease to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function. |
| `delete` | Delete configuration data |
| [`increase-report-delay`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-increase-report-delay) | Specifies mappings of peer path SLA metrics increase to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function. |
| [`moving-average-sample-size`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-moving-average-sample-size) | Sample size for calculating the weighted moving average of peer path SLA metrics to be advertised into STEP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;sla-metrics&#x27; |
| [`significance-threshold`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-significance-threshold) | Thresholds for peer path SLA metrics. Values above the threshold are considered significant enough to be advertised into STEP. |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay`

Specifies mappings of peer path SLA metrics decrease to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay <percentage>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | Largest percentage decrease seen among all of the metric values. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-decrease-report-delay-delay) | Reporting delay for the given percentage decrease. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`percentage`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-decrease-report-delay-percentage) | Largest percentage decrease seen among all of the metric values. |
| `show` | Show configuration data for &#x27;decrease-report-delay&#x27; |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay delay`

Reporting delay for the given percentage decrease.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay percentage`

Largest percentage decrease seen among all of the metric values.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics decrease-report-delay percentage [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay`

Specifies mappings of peer path SLA metrics increase to STEP reporting delay. In combination, these mappings define a piecewise linear mapping function.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay <percentage>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | Largest percentage increase seen among all of the metric values. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-increase-report-delay-delay) | Reporting delay for the given percentage increase. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`percentage`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-increase-report-delay-percentage) | Largest percentage increase seen among all of the metric values. |
| `show` | Show configuration data for &#x27;increase-report-delay&#x27; |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay delay`

Reporting delay for the given percentage increase.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay percentage`

Largest percentage increase seen among all of the metric values.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics increase-report-delay percentage [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics moving-average-sample-size`

Sample size for calculating the weighted moving average of peer path SLA metrics to be advertised into STEP.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics moving-average-sample-size [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold`

Thresholds for peer path SLA metrics. Values above the threshold are considered significant enough to be advertised into STEP.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`min-jitter`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-significance-threshold-min-jitter) | The threshold jitter value considered significant enough for advertising into STEP. |
| [`min-latency`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-significance-threshold-min-latency) | The threshold latency value considered significant enough for advertising into STEP. |
| [`min-loss`](#configure-authority-router-node-device-interface-network-interface-neighborhood-step-peer-path-advertisement-sla-metrics-significance-threshold-min-loss) | The threshold of packet loss considered significant enough for advertising into STEP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;significance-threshold&#x27; |

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-jitter`

The threshold jitter value considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-jitter [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-latency`

The threshold latency value considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-latency [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-loss`

The threshold of packet loss considered significant enough for advertising into STEP.

#### Usage

```
configure authority router node device-interface network-interface neighborhood step-peer-path-advertisement sla-metrics significance-threshold min-loss [<decimal64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| decimal64 | The value to set for this field |

#### Description

Units: percent

## `configure authority router node device-interface network-interface neighborhood topology`

Type of topology for this router in the network for the neighborhood. This determines the other routers in the neighborhood with which this router has an adjacency.

#### Usage

```
configure authority router node device-interface network-interface neighborhood topology [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering`

Configure Traffic Engineering

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`download`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-download) | Configure Download |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;traffic-engineering&#x27; |
| [`upload`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-upload) | Configure Upload |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering download`

Configure Download

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-download-enabled) | Whether traffic engineering should be enabled by our peer to limit its transmit capacity on this peer path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`receive-cap`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-download-receive-cap) | Value that is used as the limit of our peer&#x27;s transmit capacity on this peer path as to not overwhelm our interface. |
| `show` | Show configuration data for &#x27;download&#x27; |
| [`traffic-profile`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-download-traffic-profile) | The name of the traffic profile our peer should use when limiting its transmit-capacity on this peer path |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering download enabled`

Whether traffic engineering should be enabled by our peer to limit its transmit capacity on this peer path.

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering download enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering download receive-cap`

Value that is used as the limit of our peer&#x27;s transmit capacity on this peer path as to not overwhelm our interface.

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering download receive-cap [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router node device-interface network-interface neighborhood traffic-engineering download traffic-profile`

The name of the traffic profile our peer should use when limiting its transmit-capacity on this peer path

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering download traffic-profile [<traffic-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-profile-ref | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering upload`

Configure Upload

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-upload-enabled) | Whether traffic engineering is enabled on this peer path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;upload&#x27; |
| [`traffic-profile`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-upload-traffic-profile) | The name of the traffic profile used for traffic engineering on this peer path |
| [`transmit-cap`](#configure-authority-router-node-device-interface-network-interface-neighborhood-traffic-engineering-upload-transmit-cap) | The transmit capacity of this peer path. |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering upload enabled`

Whether traffic engineering is enabled on this peer path.

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering upload enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering upload traffic-profile`

The name of the traffic profile used for traffic engineering on this peer path

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering upload traffic-profile [<traffic-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-profile-ref | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood traffic-engineering upload transmit-cap`

The transmit capacity of this peer path.

#### Usage

```
configure authority router node device-interface network-interface neighborhood traffic-engineering upload transmit-cap [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router node device-interface network-interface neighborhood ttl-padding`

Whether to perform TTL Padding on routers within this neighborhood

#### Usage

```
configure authority router node device-interface network-interface neighborhood ttl-padding [<ttl-padding-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ttl-padding-type | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood udp-transform`

UDP transform settings for interoperating with stateful TCP firewalls for peers in the neighborhood.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`detect-interval`](#configure-authority-router-node-device-interface-network-interface-neighborhood-udp-transform-detect-interval) | Represents the frequency with which the stateful TCP firewall discovery is performed. |
| [`mode`](#configure-authority-router-node-device-interface-network-interface-neighborhood-udp-transform-mode) | Configure Mode |
| [`nat-keep-alive-mode`](#configure-authority-router-node-device-interface-network-interface-neighborhood-udp-transform-nat-keep-alive-mode) | Configure Nat Keep Alive Mode |
| [`nat-keep-alive-timeout`](#configure-authority-router-node-device-interface-network-interface-neighborhood-udp-transform-nat-keep-alive-timeout) | Represents the frequency with which keep-alive packets are generated. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;udp-transform&#x27; |

## `configure authority router node device-interface network-interface neighborhood udp-transform detect-interval`

Represents the frequency with which the stateful TCP firewall discovery is performed.

#### Usage

```
configure authority router node device-interface network-interface neighborhood udp-transform detect-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood udp-transform mode`

Configure Mode

#### Usage

```
configure authority router node device-interface network-interface neighborhood udp-transform mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood udp-transform nat-keep-alive-mode`

Configure Nat Keep Alive Mode

#### Usage

```
configure authority router node device-interface network-interface neighborhood udp-transform nat-keep-alive-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface neighborhood udp-transform nat-keep-alive-timeout`

Represents the frequency with which keep-alive packets are generated.

#### Usage

```
configure authority router node device-interface network-interface neighborhood udp-transform nat-keep-alive-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node device-interface network-interface neighborhood vector`

Vector name to associate with adjacencies in the neighborhood.

#### Usage

```
configure authority router node device-interface network-interface neighborhood vector [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | The value to set for this field |

## `configure authority router node device-interface network-interface off-subnet-arp-prefix`

Address(es) for which the router will respond to ARP requests.

#### Usage

```
configure authority router node device-interface network-interface off-subnet-arp-prefix [<unicast-ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-prefix | Value to add to this list |

## `configure authority router node device-interface network-interface off-subnet-reverse-arp-mac-learning`

When enabled, the source MAC address of the packet will be used for reverse traffic for off-subnet source ip address.

#### Usage

```
configure authority router node device-interface network-interface off-subnet-reverse-arp-mac-learning [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface prefix-delegation`

Enable/disable IPv6 Prefix Delegation Client.

#### Usage

```
configure authority router node device-interface network-interface prefix-delegation [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface prefix-delegation-authentication`

Whether prefix-delegation messages are authenticated.

#### Usage

```
configure authority router node device-interface network-interface prefix-delegation-authentication [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface prefix-delegation-group`

The name to identify a prefix-delegation group within which the pd-client interface will request a prefix and all the internal interfaces will be assigned a global address from this prefix based on their subnet-ids.

#### Usage

```
configure authority router node device-interface network-interface prefix-delegation-group [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface network-interface prefix-delegation-subnet-id`

The identifier of a subnet within a prefix-delegation group which is used to construct a global IPv6 address for an internal interface.

#### Usage

```
configure authority router node device-interface network-interface prefix-delegation-subnet-id [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node device-interface network-interface preserve-dscp`

Controls if DSCP bits are preserved on this interface.

#### Usage

```
configure authority router node device-interface network-interface preserve-dscp [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface prioritization-mode`

Controls how packets received on this interface are prioritized.

#### Usage

```
configure authority router node device-interface network-interface prioritization-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface qp-value`

Quality points value that represents the &#x27;quality&#x27; of the network the interface is connected to. It used for selecting egress interface based on the service class required minimum quality points.

#### Usage

```
configure authority router node device-interface network-interface qp-value [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Warning: &#x27;qp-value&#x27; is deprecated and will be removed in a future software version

## `configure authority router node device-interface network-interface reverse-arp-mac-learning`

Controls whether the source MAC address of the packet can be used for reverse traffic when ARP is unresolved.

#### Usage

```
configure authority router node device-interface network-interface reverse-arp-mac-learning [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface rewrite-dscp`

Controls if DSCP bits are rewritten on this interface.

#### Usage

```
configure authority router node device-interface network-interface rewrite-dscp [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface router-advertisement`

Enable/disable IPv6 router advertisement to advertise the prefix learned via DHCPv6-PD.

#### Usage

```
configure authority router node device-interface network-interface router-advertisement [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface source-nat`

Indicates whether source address and port translation (NAPT) is performed for flows egressing the interface to the final destination.

#### Usage

```
configure authority router node device-interface network-interface source-nat [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface network-interface tenant`

Tenant to which this interface belongs.

#### Usage

```
configure authority router node device-interface network-interface tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

## `configure authority router node device-interface network-interface tenant-prefixes`

Tenant to source prefix mapping.

#### Usage

```
configure authority router node device-interface network-interface tenant-prefixes <tenant>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant | Tenant name. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;tenant-prefixes&#x27; |
| [`source-address`](#configure-authority-router-node-device-interface-network-interface-tenant-prefixes-source-address) | The source address(es) that define the tenant. |
| [`tenant`](#configure-authority-router-node-device-interface-network-interface-tenant-prefixes-tenant) | Tenant name. |

## `configure authority router node device-interface network-interface tenant-prefixes source-address`

The source address(es) that define the tenant.

#### Usage

```
configure authority router node device-interface network-interface tenant-prefixes source-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority router node device-interface network-interface tenant-prefixes tenant`

Tenant name.

#### Usage

```
configure authority router node device-interface network-interface tenant-prefixes tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

## `configure authority router node device-interface network-interface tunnel`

Configure Tunnel

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`destination`](#configure-authority-router-node-device-interface-network-interface-tunnel-destination) | The destination of this tunnel. |
| [`internal-address`](#configure-authority-router-node-device-interface-network-interface-tunnel-internal-address) | The source address to use when sending packets over the tunnel. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;tunnel&#x27; |
| [`source`](#configure-authority-router-node-device-interface-network-interface-tunnel-source) | How the tunnel source address will be obtained. |

## `configure authority router node device-interface network-interface tunnel destination`

The destination of this tunnel.

#### Usage

```
configure authority router node device-interface network-interface tunnel destination [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node device-interface network-interface tunnel internal-address`

The source address to use when sending packets over the tunnel.

#### Usage

```
configure authority router node device-interface network-interface tunnel internal-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface tunnel source`

How the tunnel source address will be obtained.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-node-device-interface-network-interface-tunnel-source-address) | The source address of this tunnel. |
| `delete` | Delete configuration data |
| [`network-interface`](#configure-authority-router-node-device-interface-network-interface-tunnel-source-network-interface) | Use the address of the interface with the same vlan. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;source&#x27; |

## `configure authority router node device-interface network-interface tunnel source address`

The source address of this tunnel.

#### Usage

```
configure authority router node device-interface network-interface tunnel source address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node device-interface network-interface tunnel source network-interface`

Use the address of the interface with the same vlan.

#### Usage

```
configure authority router node device-interface network-interface tunnel source network-interface
```

## `configure authority router node device-interface network-interface type`

Type of network that the interface is connected to. Type is fabric for inter-node traffic, external for regular traffic, and shared for both fabric and external.

#### Usage

```
configure authority router node device-interface network-interface type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface network-interface vlan`

The VLAN id for the interface (0 for no VLAN, otherwise 1-4094).

#### Usage

```
configure authority router node device-interface network-interface vlan [<vlan>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vlan | The value to set for this field |

## `configure authority router node device-interface network-namespace`

The network namespace in which this network interface will be located

#### Usage

```
configure authority router node device-interface network-namespace [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface parent-bond`

The bond type interface that this interface is grouped with.

#### Usage

```
configure authority router node device-interface parent-bond [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router node device-interface pci-address`

The PCI address of the device. Only relevant if type is ethernet.

#### Usage

```
configure authority router node device-interface pci-address [<pci-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| pci-address | The value to set for this field |

## `configure authority router node device-interface pppoe`

Configure Pppoe

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-protocol`](#configure-authority-router-node-device-interface-pppoe-authentication-protocol) | Authentication protocol used to authenticate the user. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`password`](#configure-authority-router-node-device-interface-pppoe-password) | Password required to setup PPPoE connection. |
| `show` | Show configuration data for &#x27;pppoe&#x27; |
| [`user-name`](#configure-authority-router-node-device-interface-pppoe-user-name) | Username required to setup PPPoE connection. |

## `configure authority router node device-interface pppoe authentication-protocol`

Authentication protocol used to authenticate the user.

#### Usage

```
configure authority router node device-interface pppoe authentication-protocol [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface pppoe password`

Password required to setup PPPoE connection.

#### Usage

```
configure authority router node device-interface pppoe password [<password>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| password | The value to set for this field |

## `configure authority router node device-interface pppoe user-name`

Username required to setup PPPoE connection.

#### Usage

```
configure authority router node device-interface pppoe user-name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node device-interface promiscuous-mode`

Enables promiscuous mode on the interface.

#### Usage

```
configure authority router node device-interface promiscuous-mode [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface q-in-q`

Enables Q-in-Q encapsulation

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`outer-ethertype`](#configure-authority-router-node-device-interface-q-in-q-outer-ethertype) | The ethertype for the outer VLAN tag |
| [`outer-vlan`](#configure-authority-router-node-device-interface-q-in-q-outer-vlan) | Add an outer VLAN tag to all non-zero VLAN interfaces |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;q-in-q&#x27; |

## `configure authority router node device-interface q-in-q outer-ethertype`

The ethertype for the outer VLAN tag

#### Usage

```
configure authority router node device-interface q-in-q outer-ethertype [<hex-string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hex-string | The value to set for this field |

## `configure authority router node device-interface q-in-q outer-vlan`

Add an outer VLAN tag to all non-zero VLAN interfaces

#### Usage

```
configure authority router node device-interface q-in-q outer-vlan [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router node device-interface reinsert-vlan`

Enables reinsertion of NIC-stripped VLAN on ingress packets, on supported devices.

#### Usage

```
configure authority router node device-interface reinsert-vlan [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface session-optimization`

Configure Session Optimization

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enable-detection`](#configure-authority-router-node-device-interface-session-optimization-enable-detection) | Whether session optimization detection is enabled on this device interface. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;session-optimization&#x27; |

## `configure authority router node device-interface session-optimization enable-detection`

Whether session optimization detection is enabled on this device interface.

#### Usage

```
configure authority router node device-interface session-optimization enable-detection [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface shared-phys-address`

Virtual MAC address for interface redundancy.

#### Usage

```
configure authority router node device-interface shared-phys-address [<unicast-phys-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-phys-address | The value to set for this field |

## `configure authority router node device-interface sriov-vlan-filter`

Enables VLAN filtering on supported SR-IOV devices.

#### Usage

```
configure authority router node device-interface sriov-vlan-filter [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface strip-vlan`

Enables VLAN stripping on ingress packets on supported devices.

#### Usage

```
configure authority router node device-interface strip-vlan [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface target-interface`

Specifies the name of an external interface to be automatically bridged to a logical interface.

#### Usage

```
configure authority router node device-interface target-interface [<target-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| target-name | The value to set for this field |

## `configure authority router node device-interface traffic-engineering`

Configure Traffic Engineering

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-traffic-engineering-enabled) | Whether traffic engineering is enabled on the interface. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;traffic-engineering&#x27; |
| [`traffic-profile`](#configure-authority-router-node-device-interface-traffic-engineering-traffic-profile) | The name of the traffic profile used for traffic engineering on this device interface |
| [`transmit-cap`](#configure-authority-router-node-device-interface-traffic-engineering-transmit-cap) | Value that is used in conjunction with the negotiated link speed to determine the transmit capacity of the interface. |

## `configure authority router node device-interface traffic-engineering enabled`

Whether traffic engineering is enabled on the interface.

#### Usage

```
configure authority router node device-interface traffic-engineering enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface traffic-engineering traffic-profile`

The name of the traffic profile used for traffic engineering on this device interface

#### Usage

```
configure authority router node device-interface traffic-engineering traffic-profile [<traffic-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-profile-ref | The value to set for this field |

## `configure authority router node device-interface traffic-engineering transmit-cap`

Value that is used in conjunction with the negotiated link speed to determine the transmit capacity of the interface.

#### Usage

```
configure authority router node device-interface traffic-engineering transmit-cap [<limit>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| limit | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router node device-interface type`

Type of interface.

#### Usage

```
configure authority router node device-interface type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node device-interface vmbus-uuid`

The VMBus UUID of the network device. Hyper-V Environment only. Only relevant if type is ethernet.

#### Usage

```
configure authority router node device-interface vmbus-uuid [<vmbus-uuid>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vmbus-uuid | The value to set for this field |

## `configure authority router node device-interface vrrp`

Parameters for Interface Redundancy using Virtual Router Redundancy Protocol (VRRP) like protocol.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertisement-interval`](#configure-authority-router-node-device-interface-vrrp-advertisement-interval) | How frequently (in milliseconds) advertisements should be sent. |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-device-interface-vrrp-enabled) | Whether or not this interface should participate in VRRP. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-router-node-device-interface-vrrp-priority) | The priority of this interface within the virtual router pair. |
| `show` | Show configuration data for &#x27;vrrp&#x27; |
| [`use-physical-address`](#configure-authority-router-node-device-interface-vrrp-use-physical-address) | Use the physical mac address of the device instead of the VRRP virtual mac. |
| [`vlan`](#configure-authority-router-node-device-interface-vrrp-vlan) | Vlan of the network-interface that will represent this device |
| [`vrid`](#configure-authority-router-node-device-interface-vrrp-vrid) | The Virtual Router ID. This value must be mirrored by the redundant interface. |

## `configure authority router node device-interface vrrp advertisement-interval`

How frequently (in milliseconds) advertisements should be sent.

#### Usage

```
configure authority router node device-interface vrrp advertisement-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node device-interface vrrp enabled`

Whether or not this interface should participate in VRRP.

#### Usage

```
configure authority router node device-interface vrrp enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node device-interface vrrp priority`

The priority of this interface within the virtual router pair.

#### Usage

```
configure authority router node device-interface vrrp priority [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node device-interface vrrp vlan`

Vlan of the network-interface that will represent this device

#### Usage

```
configure authority router node device-interface vrrp vlan [<vlan>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vlan | The value to set for this field |

## `configure authority router node device-interface vrrp vrid`

The Virtual Router ID. This value must be mirrored by the redundant interface.

#### Usage

```
configure authority router node device-interface vrrp vrid [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router node enabled`

Enable/disable the whole node.

#### Usage

```
configure authority router node enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node forwarding-core-count`

The number of CPU cores to dedicate to traffic forwarding when using &#x27;manual&#x27; forwarding core mode.

#### Usage

```
configure authority router node forwarding-core-count [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Warning: a restart is required if forwarding-core-count is created, modified, or deleted

## `configure authority router node forwarding-core-mode`

The method by which the number of CPU cores dedicated to traffic forwarding should be determined.

#### Usage

```
configure authority router node forwarding-core-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: a restart is required if forwarding-core-mode is created, modified, or deleted

## `configure authority router node ipfix`

Node specific IPFIX configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-node-ipfix-enabled) | Enable or disable IPFIX export on this node |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ipfix&#x27; |

## `configure authority router node ipfix enabled`

Enable or disable IPFIX export on this node

#### Usage

```
configure authority router node ipfix enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router node location`

A text description of the node&#x27;s physical location.

#### Usage

```
configure authority router node location [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node loopback-address`

The loopback IP address to use for management traffic originating on this node when routed via SVR.

#### Usage

```
configure authority router node loopback-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node name`

An arbitrary, unique name for the node, used to reference it in other configuration sections. This MUST match the name in the local initialization file.

#### Usage

```
configure authority router node name [<reserved-name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| reserved-name-id | The value to set for this field |

#### Description

Warning: a restart is required if name is created or deleted

## `configure authority router node port-forwarding`

Configuration for establishing local port-forwarding to remote server.

#### Usage

```
configure authority router node port-forwarding <local-address> <local-port> <local-interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| local-address | The local address to forward from |
| local-port | The local port to forward from |
| local-interface | The local interface to forward from |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`local-address`](#configure-authority-router-node-port-forwarding-local-address) | The local address to forward from |
| [`local-interface`](#configure-authority-router-node-port-forwarding-local-interface) | The local interface to forward from |
| [`local-port`](#configure-authority-router-node-port-forwarding-local-port) | The local port to forward from |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`remote-host`](#configure-authority-router-node-port-forwarding-remote-host) | The remote host to connect to from server |
| [`remote-interface`](#configure-authority-router-node-port-forwarding-remote-interface) | The remote interface to connect via on server |
| [`remote-port`](#configure-authority-router-node-port-forwarding-remote-port) | The remote port to connect to from server |
| [`server-address`](#configure-authority-router-node-port-forwarding-server-address) | The server at the host address |
| [`server-destination`](#configure-authority-router-node-port-forwarding-server-destination) | The server at known destination |
| [`server-port`](#configure-authority-router-node-port-forwarding-server-port) | The port to connect to on the server |
| `show` | Show configuration data for &#x27;port-forwarding&#x27; |

## `configure authority router node port-forwarding local-address`

The local address to forward from

#### Usage

```
configure authority router node port-forwarding local-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node port-forwarding local-interface`

The local interface to forward from

#### Usage

```
configure authority router node port-forwarding local-interface [<device-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| device-name | The value to set for this field |

## `configure authority router node port-forwarding local-port`

The local port to forward from

#### Usage

```
configure authority router node port-forwarding local-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node port-forwarding remote-host`

The remote host to connect to from server

#### Usage

```
configure authority router node port-forwarding remote-host [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node port-forwarding remote-interface`

The remote interface to connect via on server

#### Usage

```
configure authority router node port-forwarding remote-interface [<device-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| device-name | The value to set for this field |

## `configure authority router node port-forwarding remote-port`

The remote port to connect to from server

#### Usage

```
configure authority router node port-forwarding remote-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node port-forwarding server-address`

The server at the host address

#### Usage

```
configure authority router node port-forwarding server-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node port-forwarding server-destination`

The server at known destination

#### Usage

```
configure authority router node port-forwarding server-destination [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node port-forwarding server-port`

The port to connect to on the server

#### Usage

```
configure authority router node port-forwarding server-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node port-forwarding`

Configuration for establishing local port-forwarding to remote server.

#### Usage

```
configure authority router node port-forwarding <local-address> <local-port> <local-interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| local-address | The local address to forward from |
| local-port | The local port to forward from |
| local-interface | The local interface to forward from |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`local-address`](#configure-authority-router-node-port-forwarding-local-address) | The local address to forward from |
| [`local-interface`](#configure-authority-router-node-port-forwarding-local-interface) | The local interface to forward from |
| [`local-port`](#configure-authority-router-node-port-forwarding-local-port) | The local port to forward from |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`remote-host`](#configure-authority-router-node-port-forwarding-remote-host) | The remote host to connect to from server |
| [`remote-interface`](#configure-authority-router-node-port-forwarding-remote-interface) | The remote interface to connect via on server |
| [`remote-port`](#configure-authority-router-node-port-forwarding-remote-port) | The remote port to connect to from server |
| [`server-address`](#configure-authority-router-node-port-forwarding-server-address) | The server at the host address |
| [`server-destination`](#configure-authority-router-node-port-forwarding-server-destination) | The server at known destination |
| [`server-port`](#configure-authority-router-node-port-forwarding-server-port) | The port to connect to on the server |
| `show` | Show configuration data for &#x27;port-forwarding&#x27; |

## `configure authority router node port-forwarding local-address`

The local address to forward from

#### Usage

```
configure authority router node port-forwarding local-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node port-forwarding local-interface`

The local interface to forward from

#### Usage

```
configure authority router node port-forwarding local-interface [<device-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| device-name | The value to set for this field |

## `configure authority router node port-forwarding local-port`

The local port to forward from

#### Usage

```
configure authority router node port-forwarding local-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node port-forwarding remote-host`

The remote host to connect to from server

#### Usage

```
configure authority router node port-forwarding remote-host [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node port-forwarding remote-interface`

The remote interface to connect via on server

#### Usage

```
configure authority router node port-forwarding remote-interface [<device-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| device-name | The value to set for this field |

## `configure authority router node port-forwarding remote-port`

The remote port to connect to from server

#### Usage

```
configure authority router node port-forwarding remote-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node port-forwarding server-address`

The server at the host address

#### Usage

```
configure authority router node port-forwarding server-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router node port-forwarding server-destination`

The server at known destination

#### Usage

```
configure authority router node port-forwarding server-destination [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router node port-forwarding server-port`

The port to connect to on the server

#### Usage

```
configure authority router node port-forwarding server-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router node power-saver`

Allow the traffic forwarding cores to sleep when there is no traffic to process

#### Usage

```
configure authority router node power-saver [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

#### Description

Warning: a restart is required if power-saver is created, modified, or deleted

## `configure authority router node radius`

Radius authentication parameters for this node.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`nas-identifier`](#configure-authority-router-node-radius-nas-identifier) | The NAS Identifier to be used in outgoing Radius authentication requests. |
| [`nas-ip-address`](#configure-authority-router-node-radius-nas-ip-address) | The NAS IP Address to be used in outgoing Radius authentication requests. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;radius&#x27; |

## `configure authority router node radius nas-identifier`

The NAS Identifier to be used in outgoing Radius authentication requests.

#### Usage

```
configure authority router node radius nas-identifier [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router node radius nas-ip-address`

The NAS IP Address to be used in outgoing Radius authentication requests.

#### Usage

```
configure authority router node radius nas-ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node reachability-detection`

Layer 2 reachability detection

##### Subcommands

| command | description |
| ------- | ----------- |
| [`arp-cache-timeout`](#configure-authority-router-node-reachability-detection-arp-cache-timeout) | Duration that an arp entry will be preserved in the system after it is no longer in use. |
| [`arp-refresh-interval`](#configure-authority-router-node-reachability-detection-arp-refresh-interval) | Represents the frequency in seconds that an arp entry is refreshed. |
| `delete` | Delete configuration data |
| [`expired-refresh-count`](#configure-authority-router-node-reachability-detection-expired-refresh-count) | Represents the number of attempts to resolve an arp before declaring expired. |
| [`expired-refresh-interval`](#configure-authority-router-node-reachability-detection-expired-refresh-interval) | Represents the retry frequency in milliseconds of arp in expired state. |
| [`gateway-refresh-interval`](#configure-authority-router-node-reachability-detection-gateway-refresh-interval) | Represents the frequency in seconds that a gateway arp entry is refreshed. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;reachability-detection&#x27; |

## `configure authority router node reachability-detection arp-cache-timeout`

Duration that an arp entry will be preserved in the system after it is no longer in use.

#### Usage

```
configure authority router node reachability-detection arp-cache-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node reachability-detection arp-refresh-interval`

Represents the frequency in seconds that an arp entry is refreshed.

#### Usage

```
configure authority router node reachability-detection arp-refresh-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node reachability-detection expired-refresh-count`

Represents the number of attempts to resolve an arp before declaring expired.

#### Usage

```
configure authority router node reachability-detection expired-refresh-count [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets

## `configure authority router node reachability-detection expired-refresh-interval`

Represents the retry frequency in milliseconds of arp in expired state.

#### Usage

```
configure authority router node reachability-detection expired-refresh-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router node reachability-detection gateway-refresh-interval`

Represents the frequency in seconds that a gateway arp entry is refreshed.

#### Usage

```
configure authority router node reachability-detection gateway-refresh-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router node role`

The node&#x27;s role in the SSR system.

#### Usage

```
configure authority router node role [<node-role>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node-role | The value to set for this field |

#### Description

Warning: a restart is required if role is created, modified, or deleted

## `configure authority router node session-processor-count`

The number of threads to use for session processing when using &#x27;manual&#x27; session-processor mode.

#### Usage

```
configure authority router node session-processor-count [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Warning: a restart is required if session-processor-count is created, modified, or deleted

## `configure authority router node session-processor-mode`

The method by which the number of threads used for session processing should be determined.

#### Usage

```
configure authority router node session-processor-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: a restart is required if session-processor-mode is created, modified, or deleted

## `configure authority router node session-setup-scaling`

Whether or not to enable session setup scaling.

#### Usage

```
configure authority router node session-setup-scaling [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

#### Description

Warning: a restart is required if session-setup-scaling is created, modified, or deleted

## `configure authority router node ssh-keepalive`

Configure Ssh Keepalive

##### Subcommands

| command | description |
| ------- | ----------- |
| [`asset-inter-conductor-router-server`](#configure-authority-router-node-ssh-keepalive-asset-inter-conductor-router-server) | Configure Asset Inter Conductor Router Server |
| `delete` | Delete configuration data |
| [`inter-conductor-router-server`](#configure-authority-router-node-ssh-keepalive-inter-conductor-router-server) | Configure Inter Conductor Router Server |
| [`inter-node`](#configure-authority-router-node-ssh-keepalive-inter-node) | Configure Inter Node |
| [`inter-node-server`](#configure-authority-router-node-ssh-keepalive-inter-node-server) | Configure Inter Node Server |
| [`inter-router`](#configure-authority-router-node-ssh-keepalive-inter-router) | Configure Inter Router |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ssh-keepalive&#x27; |

## `configure authority router node ssh-keepalive asset-inter-conductor-router-server`

Configure Asset Inter Conductor Router Server

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval`](#configure-authority-router-node-ssh-keepalive-asset-inter-conductor-router-server-interval) | Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between the conductor and a managed router&#x27;s asset connections. |
| [`max-attempts`](#configure-authority-router-node-ssh-keepalive-asset-inter-conductor-router-server-max-attempts) | Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between the conductor and a managed router&#x27;s asset connections. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;asset-inter-conductor-router-server&#x27; |

## `configure authority router node ssh-keepalive asset-inter-conductor-router-server interval`

Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between the conductor and a managed router&#x27;s asset connections.

#### Usage

```
configure authority router node ssh-keepalive asset-inter-conductor-router-server interval [<ssh-keepalive-interval>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-interval | The value to set for this field |

## `configure authority router node ssh-keepalive asset-inter-conductor-router-server max-attempts`

Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between the conductor and a managed router&#x27;s asset connections.

#### Usage

```
configure authority router node ssh-keepalive asset-inter-conductor-router-server max-attempts [<ssh-keepalive-max-attempts>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-max-attempts | The value to set for this field |

## `configure authority router node ssh-keepalive inter-conductor-router-server`

Configure Inter Conductor Router Server

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval`](#configure-authority-router-node-ssh-keepalive-inter-conductor-router-server-interval) | Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between the conductor and a managed router. |
| [`max-attempts`](#configure-authority-router-node-ssh-keepalive-inter-conductor-router-server-max-attempts) | Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between the conductor and a managed router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;inter-conductor-router-server&#x27; |

## `configure authority router node ssh-keepalive inter-conductor-router-server interval`

Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between the conductor and a managed router.

#### Usage

```
configure authority router node ssh-keepalive inter-conductor-router-server interval [<ssh-keepalive-interval>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-interval | The value to set for this field |

#### Description

Warning: a restart is required if interval is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-conductor-router-server max-attempts`

Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between the conductor and a managed router.

#### Usage

```
configure authority router node ssh-keepalive inter-conductor-router-server max-attempts [<ssh-keepalive-max-attempts>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-max-attempts | The value to set for this field |

#### Description

Warning: a restart is required if max-attempts is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-node`

Configure Inter Node

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval`](#configure-authority-router-node-ssh-keepalive-inter-node-interval) | Timeout interval in seconds to send keepalive from SSH client when an SSH connection is idle between nodes within a router. |
| [`max-attempts`](#configure-authority-router-node-ssh-keepalive-inter-node-max-attempts) | Number of keepalive messages sent from SSH client before disconnecting an SSH onnection between nodes within a router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;inter-node&#x27; |

## `configure authority router node ssh-keepalive inter-node interval`

Timeout interval in seconds to send keepalive from SSH client when an SSH connection is idle between nodes within a router.

#### Usage

```
configure authority router node ssh-keepalive inter-node interval [<ssh-keepalive-interval>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-interval | The value to set for this field |

#### Description

Warning: a restart is required if interval is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-node max-attempts`

Number of keepalive messages sent from SSH client before disconnecting an SSH onnection between nodes within a router.

#### Usage

```
configure authority router node ssh-keepalive inter-node max-attempts [<ssh-keepalive-max-attempts>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-max-attempts | The value to set for this field |

#### Description

Warning: a restart is required if max-attempts is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-node-server`

Configure Inter Node Server

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval`](#configure-authority-router-node-ssh-keepalive-inter-node-server-interval) | Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between nodes within a router. |
| [`max-attempts`](#configure-authority-router-node-ssh-keepalive-inter-node-server-max-attempts) | Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between nodes within a router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;inter-node-server&#x27; |

## `configure authority router node ssh-keepalive inter-node-server interval`

Timeout interval in seconds to send keepalive from SSHD server when an SSH connection is idle between nodes within a router.

#### Usage

```
configure authority router node ssh-keepalive inter-node-server interval [<ssh-keepalive-interval>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-interval | The value to set for this field |

#### Description

Warning: a restart is required if interval is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-node-server max-attempts`

Number of keepalive messages sent from SSHD server before disconnecting an SSH connection between nodes within a router.

#### Usage

```
configure authority router node ssh-keepalive inter-node-server max-attempts [<ssh-keepalive-max-attempts>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-max-attempts | The value to set for this field |

#### Description

Warning: a restart is required if max-attempts is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-router`

Configure Inter Router

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval`](#configure-authority-router-node-ssh-keepalive-inter-router-interval) | Timeout interval in seconds to send keepalive from SSH client when an SSH connection is idle between the conductor and a managed router. |
| [`max-attempts`](#configure-authority-router-node-ssh-keepalive-inter-router-max-attempts) | Number of keepalive messages sent from SSH client before disconnecting an SSH connection between the conductor and a managed router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;inter-router&#x27; |

## `configure authority router node ssh-keepalive inter-router interval`

Timeout interval in seconds to send keepalive from SSH client when an SSH connection is idle between the conductor and a managed router.

#### Usage

```
configure authority router node ssh-keepalive inter-router interval [<ssh-keepalive-interval>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-interval | The value to set for this field |

#### Description

Warning: a restart is required if interval is created, modified, or deleted

## `configure authority router node ssh-keepalive inter-router max-attempts`

Number of keepalive messages sent from SSH client before disconnecting an SSH connection between the conductor and a managed router.

#### Usage

```
configure authority router node ssh-keepalive inter-router max-attempts [<ssh-keepalive-max-attempts>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ssh-keepalive-max-attempts | The value to set for this field |

#### Description

Warning: a restart is required if max-attempts is created, modified, or deleted

## `configure authority router node top-sessions`

Views of top sessions by an ordering criteria.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bandwidth`](#configure-authority-router-node-top-sessions-bandwidth) | Top sessions by bandwidth usage. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;top-sessions&#x27; |

## `configure authority router node top-sessions bandwidth`

Top sessions by bandwidth usage.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`session`](#configure-authority-router-node-top-sessions-bandwidth-session) | Configure Session |
| `show` | Show configuration data for &#x27;bandwidth&#x27; |
| [`tstamp`](#configure-authority-router-node-top-sessions-bandwidth-tstamp) | Configure Tstamp |

## `configure authority router node top-sessions bandwidth session`

Configure Session

#### Usage

```
configure authority router node top-sessions bandwidth session <session-id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| session-id | The globally-unique session identification number |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`destination-ip`](#configure-authority-router-node-top-sessions-bandwidth-session-destination-ip) | The destination IP of the session |
| [`destination-port`](#configure-authority-router-node-top-sessions-bandwidth-session-destination-port) | The destination port of the session |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`protocol`](#configure-authority-router-node-top-sessions-bandwidth-session-protocol) | The transport protocol |
| [`service-name`](#configure-authority-router-node-top-sessions-bandwidth-session-service-name) | The name of the service that created session |
| [`session-id`](#configure-authority-router-node-top-sessions-bandwidth-session-session-id) | The globally-unique session identification number |
| `show` | Show configuration data for &#x27;session&#x27; |
| [`source-ip`](#configure-authority-router-node-top-sessions-bandwidth-session-source-ip) | The source IP of the session |
| [`source-port`](#configure-authority-router-node-top-sessions-bandwidth-session-source-port) | The source port of the session |
| [`tenant`](#configure-authority-router-node-top-sessions-bandwidth-session-tenant) | The tenant in which the session originated |
| [`value`](#configure-authority-router-node-top-sessions-bandwidth-session-value) | Session&#x27;s value |

## `configure authority router node top-sessions bandwidth session destination-ip`

The destination IP of the session

#### Usage

```
configure authority router node top-sessions bandwidth session destination-ip [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node top-sessions bandwidth session destination-port`

The destination port of the session

#### Usage

```
configure authority router node top-sessions bandwidth session destination-port [<port-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| port-number | The value to set for this field |

## `configure authority router node top-sessions bandwidth session protocol`

The transport protocol

#### Usage

```
configure authority router node top-sessions bandwidth session protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority router node top-sessions bandwidth session service-name`

The name of the service that created session

#### Usage

```
configure authority router node top-sessions bandwidth session service-name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router node top-sessions bandwidth session session-id`

The globally-unique session identification number

#### Usage

```
configure authority router node top-sessions bandwidth session session-id [<session-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| session-id | The value to set for this field |

## `configure authority router node top-sessions bandwidth session source-ip`

The source IP of the session

#### Usage

```
configure authority router node top-sessions bandwidth session source-ip [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router node top-sessions bandwidth session source-port`

The source port of the session

#### Usage

```
configure authority router node top-sessions bandwidth session source-port [<port-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| port-number | The value to set for this field |

## `configure authority router node top-sessions bandwidth session tenant`

The tenant in which the session originated

#### Usage

```
configure authority router node top-sessions bandwidth session tenant [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router node top-sessions bandwidth session value`

Session&#x27;s value

#### Usage

```
configure authority router node top-sessions bandwidth session value [<decimal64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| decimal64 | The value to set for this field |

## `configure authority router node top-sessions bandwidth tstamp`

Configure Tstamp

#### Usage

```
configure authority router node top-sessions bandwidth tstamp [<timestamp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| timestamp | The value to set for this field |

## `configure authority router path-mtu-discovery`

Automatic path MTU discovery between nodes within the router.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-path-mtu-discovery-enabled) | Controls whether or not peer-path MTU discovery is performed |
| [`interval`](#configure-authority-router-path-mtu-discovery-interval) | Represents the frequency with which the peer-path MTU discovery is performed. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;path-mtu-discovery&#x27; |

## `configure authority router path-mtu-discovery enabled`

Controls whether or not peer-path MTU discovery is performed

#### Usage

```
configure authority router path-mtu-discovery enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router path-mtu-discovery interval`

Represents the frequency with which the peer-path MTU discovery is performed.

#### Usage

```
configure authority router path-mtu-discovery interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router peer`

Defines the properties associated with peer SSRs. The peer may be another router in the same authority or a router in a different authority

#### Usage

```
configure authority router peer <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary name that represents the properties associated with the peer router. Typically this will be the name of the authority or the value of the name field in the peer&#x27;s router configuration. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authority-name`](#configure-authority-router-peer-authority-name) | Name of the authority of the peer router. |
| [`bfd`](#configure-authority-router-peer-bfd) | BFD parameters for the peer router (deprecated). This is being replaced by BFD parameters in the neighborhood and adjacency in network-interfaces. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-peer-description) | A description of the peer router. |
| [`generated`](#configure-authority-router-peer-generated) | Indicates whether or not the Peer was automatically generated as a result of routers existing in the same neighborhood. |
| [`name`](#configure-authority-router-peer-name) | An arbitrary name that represents the properties associated with the peer router. Typically this will be the name of the authority or the value of the name field in the peer&#x27;s router configuration. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`router-name`](#configure-authority-router-peer-router-name) | Name of the peer router. |
| `show` | Show configuration data for &#x27;peer&#x27; |

## `configure authority router peer authority-name`

Name of the authority of the peer router.

#### Usage

```
configure authority router peer authority-name [<authority-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| authority-name | The value to set for this field |

## `configure authority router peer bfd`

BFD parameters for the peer router (deprecated). This is being replaced by BFD parameters in the neighborhood and adjacency in network-interfaces.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-peer-bfd-authentication-type) | Describes the authentication type used in BFD packets |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-peer-bfd-desired-tx-interval) | Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers. |
| [`dscp`](#configure-authority-router-peer-bfd-dscp) | The DSCP value to use with BFD packets. |
| [`dynamic-damping`](#configure-authority-router-peer-bfd-dynamic-damping) | When enabled, extend the hold-down time if additional link flaps occur during the hold-down period. |
| [`hold-down-time`](#configure-authority-router-peer-bfd-hold-down-time) | Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time. |
| [`link-test-interval`](#configure-authority-router-peer-bfd-link-test-interval) | This represents the interval between BFD echo tests sent to the peer node/router. |
| [`link-test-length`](#configure-authority-router-peer-bfd-link-test-length) | This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests. |
| [`maximum-hold-down-time`](#configure-authority-router-peer-bfd-maximum-hold-down-time) | Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value. |
| [`multiplier`](#configure-authority-router-peer-bfd-multiplier) | Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-peer-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |
| [`state`](#configure-authority-router-peer-bfd-state) | When enabled, run BFD between all nodes within the router. |

#### Description

Warning: &#x27;bfd&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd authentication-type`

Describes the authentication type used in BFD packets

#### Usage

```
configure authority router peer bfd authentication-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: &#x27;authentication-type&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd desired-tx-interval`

Represents the frequency with which BFD asynchronous control packets are sent to peer nodes/routers.

#### Usage

```
configure authority router peer bfd desired-tx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds
Warning: &#x27;desired-tx-interval&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd dscp`

The DSCP value to use with BFD packets.

#### Usage

```
configure authority router peer bfd dscp [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

#### Description

Warning: &#x27;dscp&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd dynamic-damping`

When enabled, extend the hold-down time if additional link flaps occur during the hold-down period.

#### Usage

```
configure authority router peer bfd dynamic-damping [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: &#x27;dynamic-damping&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd hold-down-time`

Represents the hold-down time. If dynamic-damping is enabled, this is the initial hold-down time.

#### Usage

```
configure authority router peer bfd hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;hold-down-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd link-test-interval`

This represents the interval between BFD echo tests sent to the peer node/router.

#### Usage

```
configure authority router peer bfd link-test-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;link-test-interval&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd link-test-length`

This is the number of packets sent during one test cycle. A value of 0 disables BFD echo tests.

#### Usage

```
configure authority router peer bfd link-test-length [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: packets
Warning: &#x27;link-test-length&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd maximum-hold-down-time`

Represents the maximum hold-down time of dynamic-damping exponential backoff. If the hold-down-time hits the maximum three times in a row, it will reset back to the original value.

#### Usage

```
configure authority router peer bfd maximum-hold-down-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;maximum-hold-down-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd multiplier`

Number of consecutive missed messages from a peer before deciding that the link between them is unusable. Valid range is (3,20).

#### Usage

```
configure authority router peer bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Warning: &#x27;multiplier&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router peer bfd required-min-rx-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds
Warning: &#x27;required-min-rx-interval&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer bfd state`

When enabled, run BFD between all nodes within the router.

#### Usage

```
configure authority router peer bfd state [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: &#x27;state&#x27; is deprecated and will be removed in a future software version

## `configure authority router peer description`

A description of the peer router.

#### Usage

```
configure authority router peer description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router peer generated`

Indicates whether or not the Peer was automatically generated as a result of routers existing in the same neighborhood.

#### Usage

```
configure authority router peer generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router peer name`

An arbitrary name that represents the properties associated with the peer router. Typically this will be the name of the authority or the value of the name field in the peer&#x27;s router configuration.

#### Usage

```
configure authority router peer name [<peer-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| peer-name | The value to set for this field |

## `configure authority router peer router-name`

Name of the peer router.

#### Usage

```
configure authority router peer router-name [<router-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| router-name | The value to set for this field |

## `configure authority router rate-limit-policy`

Configuration for rate limiting policy for all associated service traffic across all interfaces on a given node, when configured within a service-class.

#### Usage

```
configure authority router rate-limit-policy <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name for the rate limit policy. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`download-settings`](#configure-authority-router-rate-limit-policy-download-settings) | max rate and burst values for rate-limiting applied for download of traffic. |
| [`mode`](#configure-authority-router-rate-limit-policy-mode) | Configure Mode |
| [`name`](#configure-authority-router-rate-limit-policy-name) | The name for the rate limit policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rate-limit-policy&#x27; |
| [`upload-settings`](#configure-authority-router-rate-limit-policy-upload-settings) | max rate and burst values for rate-limiting applied for upload of traffic. |

## `configure authority router rate-limit-policy download-settings`

max rate and burst values for rate-limiting applied for download of traffic.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-burst`](#configure-authority-router-rate-limit-policy-download-settings-max-burst) | Limit the maximum burst size to this value. |
| [`max-rate`](#configure-authority-router-rate-limit-policy-download-settings-max-rate) | Limit the maximum rate to this value. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;download-settings&#x27; |

## `configure authority router rate-limit-policy download-settings max-burst`

Limit the maximum burst size to this value.

#### Usage

```
configure authority router rate-limit-policy download-settings max-burst [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits

## `configure authority router rate-limit-policy download-settings max-rate`

Limit the maximum rate to this value.

#### Usage

```
configure authority router rate-limit-policy download-settings max-rate [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router rate-limit-policy mode`

Configure Mode

#### Usage

```
configure authority router rate-limit-policy mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router rate-limit-policy name`

The name for the rate limit policy.

#### Usage

```
configure authority router rate-limit-policy name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router rate-limit-policy upload-settings`

max rate and burst values for rate-limiting applied for upload of traffic.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-burst`](#configure-authority-router-rate-limit-policy-upload-settings-max-burst) | Limit the maximum burst size to this value. |
| [`max-rate`](#configure-authority-router-rate-limit-policy-upload-settings-max-rate) | Limit the maximum rate to this value. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;upload-settings&#x27; |

## `configure authority router rate-limit-policy upload-settings max-burst`

Limit the maximum burst size to this value.

#### Usage

```
configure authority router rate-limit-policy upload-settings max-burst [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits

## `configure authority router rate-limit-policy upload-settings max-rate`

Limit the maximum rate to this value.

#### Usage

```
configure authority router rate-limit-policy upload-settings max-rate [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router reachability-profile`

Defines a traffic profile for reachability-detection enforcement

#### Usage

```
configure authority router reachability-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the reachability-profile |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-reachability-profile-name) | Name of the reachability-profile |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`protocol`](#configure-authority-router-reachability-profile-protocol) | Reachability-detection enforcement for a protocol |
| `show` | Show configuration data for &#x27;reachability-profile&#x27; |

## `configure authority router reachability-profile name`

Name of the reachability-profile

#### Usage

```
configure authority router reachability-profile name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router reachability-profile protocol`

Reachability-detection enforcement for a protocol

#### Usage

```
configure authority router reachability-profile protocol <protocol-type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol-type | The protocol to enforce reachability for |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`protocol-type`](#configure-authority-router-reachability-profile-protocol-protocol-type) | The protocol to enforce reachability for |
| `show` | Show configuration data for &#x27;protocol&#x27; |
| [`traffic-class`](#configure-authority-router-reachability-profile-protocol-traffic-class) | Reachability-detection enforcement for a traffic-class |

## `configure authority router reachability-profile protocol protocol-type`

The protocol to enforce reachability for

#### Usage

```
configure authority router reachability-profile protocol protocol-type [<reachability-profile-protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| reachability-profile-protocol | The value to set for this field |

## `configure authority router reachability-profile protocol traffic-class`

Reachability-detection enforcement for a traffic-class

#### Usage

```
configure authority router reachability-profile protocol traffic-class <traffic-class-id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-class-id | Type of traffic-class to enforce |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`acceptable-error-threshold`](#configure-authority-router-reachability-profile-protocol-traffic-class-acceptable-error-threshold) | Percentage of errors acceptable on the path before taking it offline. For TCP, this will include session closed before establishment, and any ICMP error that constitutes and session timeout before establishment. For UDP, this will include the destination unreachable class of ICMP errors |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-reachability-profile-protocol-traffic-class-enabled) | Enable reachability-detection enforcment for this protocol and traffic class |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;traffic-class&#x27; |
| [`time-to-establishment`](#configure-authority-router-reachability-profile-protocol-traffic-class-time-to-establishment) | Reachability-detection time-to-establishment metrics |
| [`traffic-class-id`](#configure-authority-router-reachability-profile-protocol-traffic-class-traffic-class-id) | Type of traffic-class to enforce |

## `configure authority router reachability-profile protocol traffic-class acceptable-error-threshold`

Percentage of errors acceptable on the path before taking it offline. For TCP, this will include session closed before establishment, and any ICMP error that constitutes and session timeout before establishment. For UDP, this will include the destination unreachable class of ICMP errors

#### Usage

```
configure authority router reachability-profile protocol traffic-class acceptable-error-threshold [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router reachability-profile protocol traffic-class enabled`

Enable reachability-detection enforcment for this protocol and traffic class

#### Usage

```
configure authority router reachability-profile protocol traffic-class enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router reachability-profile protocol traffic-class time-to-establishment`

Reachability-detection time-to-establishment metrics

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-reachability-profile-protocol-traffic-class-time-to-establishment-enabled) | Include time-to-establishment metrics in reachability-detection |
| [`max`](#configure-authority-router-reachability-profile-protocol-traffic-class-time-to-establishment-max) | Maximum acceptable session time-to-establishment in the detection window |
| [`mean`](#configure-authority-router-reachability-profile-protocol-traffic-class-time-to-establishment-mean) | Maximum mean session time-to-establishment over the detection window |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;time-to-establishment&#x27; |

## `configure authority router reachability-profile protocol traffic-class time-to-establishment enabled`

Include time-to-establishment metrics in reachability-detection

#### Usage

```
configure authority router reachability-profile protocol traffic-class time-to-establishment enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router reachability-profile protocol traffic-class time-to-establishment max`

Maximum acceptable session time-to-establishment in the detection window

#### Usage

```
configure authority router reachability-profile protocol traffic-class time-to-establishment max [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router reachability-profile protocol traffic-class time-to-establishment mean`

Maximum mean session time-to-establishment over the detection window

#### Usage

```
configure authority router reachability-profile protocol traffic-class time-to-establishment mean [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router reachability-profile protocol traffic-class traffic-class-id`

Type of traffic-class to enforce

#### Usage

```
configure authority router reachability-profile protocol traffic-class traffic-class-id [<net-traffic-class>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| net-traffic-class | The value to set for this field |

## `configure authority router redundancy-group`

A group of redundant interfaces which will fail over together if one goes down for any reason.

#### Usage

```
configure authority router redundancy-group <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for this group. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-redundancy-group-description) | A description of the redundancy-group. |
| [`member`](#configure-authority-router-redundancy-group-member) | Configure Member |
| [`name`](#configure-authority-router-redundancy-group-name) | An arbitrary, unique name for this group. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-router-redundancy-group-priority) | Priority of member interfaces relative to their redundant interfaces. Higher priority interfaces take precedence. |
| `show` | Show configuration data for &#x27;redundancy-group&#x27; |

## `configure authority router redundancy-group description`

A description of the redundancy-group.

#### Usage

```
configure authority router redundancy-group description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router redundancy-group member`

Configure Member

#### Usage

```
configure authority router redundancy-group member <node> <device-id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Name of the node the interface is on. |
| device-id | Device interface name. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`device-id`](#configure-authority-router-redundancy-group-member-device-id) | Device interface name. |
| [`node`](#configure-authority-router-redundancy-group-member-node) | Name of the node the interface is on. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;member&#x27; |

## `configure authority router redundancy-group member device-id`

Device interface name.

#### Usage

```
configure authority router redundancy-group member device-id [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router redundancy-group member node`

Name of the node the interface is on.

#### Usage

```
configure authority router redundancy-group member node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router redundancy-group name`

An arbitrary, unique name for this group.

#### Usage

```
configure authority router redundancy-group name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router redundancy-group priority`

Priority of member interfaces relative to their redundant interfaces. Higher priority interfaces take precedence.

#### Usage

```
configure authority router redundancy-group priority [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router resource-group`

Associate this router with a top-level resource-group.

#### Usage

```
configure authority router resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority router reverse-flow-enforcement`

When to enforce biflow reverse fib entry check

#### Usage

```
configure authority router reverse-flow-enforcement [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router reverse-packet-session-resiliency`

Parameters for setting session failover behavior without presence of forward traffic.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`detection-interval`](#configure-authority-router-reverse-packet-session-resiliency-detection-interval) | Frequency at which each session will be checked for failover trigger in the absence of forward traffic. |
| [`enabled`](#configure-authority-router-reverse-packet-session-resiliency-enabled) | Whether reverse packet triggered failover is enabled on this router when session resiliency is set. |
| [`minimum-packet-count`](#configure-authority-router-reverse-packet-session-resiliency-minimum-packet-count) | Minimum number of packets received on the flow to activate the feature |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;reverse-packet-session-resiliency&#x27; |

## `configure authority router reverse-packet-session-resiliency detection-interval`

Frequency at which each session will be checked for failover trigger in the absence of forward traffic.

#### Usage

```
configure authority router reverse-packet-session-resiliency detection-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router reverse-packet-session-resiliency enabled`

Whether reverse packet triggered failover is enabled on this router when session resiliency is set.

#### Usage

```
configure authority router reverse-packet-session-resiliency enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router reverse-packet-session-resiliency minimum-packet-count`

Minimum number of packets received on the flow to activate the feature

#### Usage

```
configure authority router reverse-packet-session-resiliency minimum-packet-count [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: packets

## `configure authority router router-group`

Logical group of routers for filtering services.

#### Usage

```
configure authority router router-group [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | Value to add to this list |

## `configure authority router routing`

A router-level container for all of the routing policies associated with a given SSR deployment. Each routing element may have one and only one routing-instance.

#### Usage

```
configure authority router routing <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | The type of the routing instance. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| [`debug`](#configure-authority-router-routing-debug) | Routing engine debug commands. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-description) | Textual description of the routing instance. |
| [`igmp`](#configure-authority-router-routing-igmp) | IGMP configuration |
| [`interface`](#configure-authority-router-routing-interface) | Internal loopback interface used for routing protocols |
| [`mist-events`](#configure-authority-router-routing-mist-events) | MIST Event Configuration. |
| [`msdp`](#configure-authority-router-routing-msdp) | MSDP configuration |
| [`ospf`](#configure-authority-router-routing-ospf) | OSPF instance configuration |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pim`](#configure-authority-router-routing-pim) | PIM configuration |
| [`routing-protocol`](#configure-authority-router-routing-routing-protocol) | Each entry contains configuration of a routing protocol instance. |
| [`service-admin-distance`](#configure-authority-router-routing-service-admin-distance) | Administrative distance for routes generated from services. |
| `show` | Show configuration data for &#x27;routing&#x27; |
| [`static-route`](#configure-authority-router-routing-static-route) | A list of static routes. The sub-element that allows administrators to configure static routes, that will be entered into the SSR&#x27;s Routing Information Base (RIB). |
| [`type`](#configure-authority-router-routing-type) | The type of the routing instance. |
| [`vrf`](#configure-authority-router-routing-vrf) | A list of virtual router and forward instances (VRF&#x27;s). |

## `configure authority router routing debug`

Routing engine debug commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bfd`](#configure-authority-router-routing-debug-bfd) | Debug BFD commands. |
| [`bgp`](#configure-authority-router-routing-debug-bgp) | Debug BGP commands. |
| `delete` | Delete configuration data |
| [`ospf`](#configure-authority-router-routing-debug-ospf) | Debug OSPF commands. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rib`](#configure-authority-router-routing-debug-rib) | Debug RIB Manager commands. |
| `show` | Show configuration data for &#x27;debug&#x27; |
| [`static-route`](#configure-authority-router-routing-debug-static-route) | Debug static route commands. |

## `configure authority router routing debug bfd`

Debug BFD commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`network`](#configure-authority-router-routing-debug-bfd-network) | Debug BFD network layer. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-routing-debug-bfd-peer) | Debug BFD peer events. |
| [`rib`](#configure-authority-router-routing-debug-bfd-rib) | Debug BFD RIB. |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing debug bfd network`

Debug BFD network layer.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;network&#x27; |

## `configure authority router routing debug bfd peer`

Debug BFD peer events.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;peer&#x27; |

## `configure authority router routing debug bfd rib`

Debug BFD RIB.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rib&#x27; |

## `configure authority router routing debug bgp`

Debug BGP commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bestpath`](#configure-authority-router-routing-debug-bgp-bestpath) | Debug BGP bestpath. |
| [`bfd`](#configure-authority-router-routing-debug-bgp-bfd) | Debug BGP BFD. |
| `delete` | Delete configuration data |
| [`graceful-restart`](#configure-authority-router-routing-debug-bgp-graceful-restart) | Debug BGP graceful restart. |
| [`keepalives`](#configure-authority-router-routing-debug-bgp-keepalives) | Debug BGP keepalives. |
| [`neighbor-events`](#configure-authority-router-routing-debug-bgp-neighbor-events) | Debug BGP neighbor events. |
| [`nht`](#configure-authority-router-routing-debug-bgp-nht) | Debug BGP next hop tracker (NHT). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rib`](#configure-authority-router-routing-debug-bgp-rib) | Debug BGP RIB. |
| `show` | Show configuration data for &#x27;bgp&#x27; |
| [`update-groups`](#configure-authority-router-routing-debug-bgp-update-groups) | Debug BGP update groups. |
| [`updates`](#configure-authority-router-routing-debug-bgp-updates) | Debug BGP update. |

## `configure authority router routing debug bgp bestpath`

Debug BGP bestpath.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-debug-bgp-bestpath-prefix) | Debug BGP bestpath prefix. |
| `show` | Show configuration data for &#x27;bestpath&#x27; |

## `configure authority router routing debug bgp bestpath prefix`

Debug BGP bestpath prefix.

#### Usage

```
configure authority router routing debug bgp bestpath prefix [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority router routing debug bgp bfd`

Debug BGP BFD.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing debug bgp graceful-restart`

Debug BGP graceful restart.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |

## `configure authority router routing debug bgp keepalives`

Debug BGP keepalives.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;keepalives&#x27; |

## `configure authority router routing debug bgp neighbor-events`

Debug BGP neighbor events.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor-events&#x27; |

## `configure authority router routing debug bgp nht`

Debug BGP next hop tracker (NHT).

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nht&#x27; |

## `configure authority router routing debug bgp rib`

Debug BGP RIB.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rib&#x27; |

## `configure authority router routing debug bgp update-groups`

Debug BGP update groups.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;update-groups&#x27; |

## `configure authority router routing debug bgp updates`

Debug BGP update.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`in`](#configure-authority-router-routing-debug-bgp-updates-in) | Debug BGP updates in. |
| [`out`](#configure-authority-router-routing-debug-bgp-updates-out) | Debug BGP updates out. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-debug-bgp-updates-prefix) | Debug BGP update prefix. |
| `show` | Show configuration data for &#x27;updates&#x27; |

## `configure authority router routing debug bgp updates in`

Debug BGP updates in.

#### Usage

```
configure authority router routing debug bgp updates in [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing debug bgp updates out`

Debug BGP updates out.

#### Usage

```
configure authority router routing debug bgp updates out [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing debug bgp updates prefix`

Debug BGP update prefix.

#### Usage

```
configure authority router routing debug bgp updates prefix [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority router routing debug ospf`

Debug OSPF commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bfd`](#configure-authority-router-routing-debug-ospf-bfd) | Debug OSPF BFD. |
| [`default-information`](#configure-authority-router-routing-debug-ospf-default-information) | Debug OSPF default information. |
| `delete` | Delete configuration data |
| [`events`](#configure-authority-router-routing-debug-ospf-events) | Debug OSPF events. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ospf&#x27; |

## `configure authority router routing debug ospf bfd`

Debug OSPF BFD.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing debug ospf default-information`

Debug OSPF default information.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;default-information&#x27; |

## `configure authority router routing debug ospf events`

Debug OSPF events.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;events&#x27; |

## `configure authority router routing debug rib`

Debug RIB Manager commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`events`](#configure-authority-router-routing-debug-rib-events) | Debug RIB events. |
| [`fpm`](#configure-authority-router-routing-debug-rib-fpm) | Debug RIB FIB push module (FPM). |
| [`kernel`](#configure-authority-router-routing-debug-rib-kernel) | Debug RIB kernel. |
| [`nexthop`](#configure-authority-router-routing-debug-rib-nexthop) | Debug RIB next hop. |
| [`nht`](#configure-authority-router-routing-debug-rib-nht) | Debug RIB next hop tracker (NHT). |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`packet`](#configure-authority-router-routing-debug-rib-packet) | Debug RIB packets). |
| `show` | Show configuration data for &#x27;rib&#x27; |
| [`table`](#configure-authority-router-routing-debug-rib-table) | Debug RIB table. |

## `configure authority router routing debug rib events`

Debug RIB events.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;events&#x27; |

## `configure authority router routing debug rib fpm`

Debug RIB FIB push module (FPM).

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;fpm&#x27; |

## `configure authority router routing debug rib kernel`

Debug RIB kernel.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;kernel&#x27; |

## `configure authority router routing debug rib nexthop`

Debug RIB next hop.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nexthop&#x27; |

## `configure authority router routing debug rib nht`

Debug RIB next hop tracker (NHT).

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;nht&#x27; |

## `configure authority router routing debug rib packet`

Debug RIB packets).

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;packet&#x27; |

## `configure authority router routing debug rib table`

Debug RIB table.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;table&#x27; |

## `configure authority router routing debug static-route`

Debug static route commands.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`events`](#configure-authority-router-routing-debug-static-route-events) | Debug static route events. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routes`](#configure-authority-router-routing-debug-static-route-routes) | Debug static route routes. |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router routing debug static-route events`

Debug static route events.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;events&#x27; |

## `configure authority router routing debug static-route routes`

Debug static route routes.

##### Subcommands

| command | description |
| ------- | ----------- |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;routes&#x27; |

## `configure authority router routing description`

Textual description of the routing instance.

#### Usage

```
configure authority router routing description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing igmp`

IGMP configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-igmp-interface) | List of IGMP interfaces |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;igmp&#x27; |

## `configure authority router routing igmp interface`

List of IGMP interfaces

#### Usage

```
configure authority router routing igmp interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-igmp-interface-interface) | Network interface name |
| [`join`](#configure-authority-router-routing-igmp-interface-join) | List of Groups to join |
| [`node`](#configure-authority-router-routing-igmp-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |
| [`version`](#configure-authority-router-routing-igmp-interface-version) | IGMP Version |

## `configure authority router routing igmp interface interface`

Network interface name

#### Usage

```
configure authority router routing igmp interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing igmp interface join`

List of Groups to join

#### Usage

```
configure authority router routing igmp interface join <group>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group | IPv4 address of the Group to Join |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group`](#configure-authority-router-routing-igmp-interface-join-group) | IPv4 address of the Group to Join |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;join&#x27; |
| [`source`](#configure-authority-router-routing-igmp-interface-join-source) | IPv4 address of the Source to Join |

## `configure authority router routing igmp interface join group`

IPv4 address of the Group to Join

#### Usage

```
configure authority router routing igmp interface join group [<multicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-address | The value to set for this field |

## `configure authority router routing igmp interface join source`

IPv4 address of the Source to Join

#### Usage

```
configure authority router routing igmp interface join source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing igmp interface node`

Interface node name

#### Usage

```
configure authority router routing igmp interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing igmp interface version`

IGMP Version

#### Usage

```
configure authority router routing igmp interface version [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing igmp`

IGMP configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-igmp-interface) | List of IGMP interfaces |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;igmp&#x27; |

## `configure authority router routing igmp interface`

List of IGMP interfaces

#### Usage

```
configure authority router routing igmp interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-igmp-interface-interface) | Network interface name |
| [`join`](#configure-authority-router-routing-igmp-interface-join) | List of Groups to join |
| [`node`](#configure-authority-router-routing-igmp-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |
| [`version`](#configure-authority-router-routing-igmp-interface-version) | IGMP Version |

## `configure authority router routing igmp interface interface`

Network interface name

#### Usage

```
configure authority router routing igmp interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing igmp interface join`

List of Groups to join

#### Usage

```
configure authority router routing igmp interface join <group>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group | IPv4 address of the Group to Join |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group`](#configure-authority-router-routing-igmp-interface-join-group) | IPv4 address of the Group to Join |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;join&#x27; |
| [`source`](#configure-authority-router-routing-igmp-interface-join-source) | IPv4 address of the Source to Join |

## `configure authority router routing igmp interface join group`

IPv4 address of the Group to Join

#### Usage

```
configure authority router routing igmp interface join group [<multicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-address | The value to set for this field |

## `configure authority router routing igmp interface join source`

IPv4 address of the Source to Join

#### Usage

```
configure authority router routing igmp interface join source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing igmp interface node`

Interface node name

#### Usage

```
configure authority router routing igmp interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing igmp interface version`

IGMP Version

#### Usage

```
configure authority router routing igmp interface version [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing interface`

Internal loopback interface used for routing protocols

#### Usage

```
configure authority router routing interface <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-routing-interface-enabled) | Administratively enable/disable the interface. |
| [`ip-address`](#configure-authority-router-routing-interface-ip-address) | The IP address of the interface. |
| [`name`](#configure-authority-router-routing-interface-name) | An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing interface enabled`

Administratively enable/disable the interface.

#### Usage

```
configure authority router routing interface enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing interface ip-address`

The IP address of the interface.

#### Usage

```
configure authority router routing interface ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router routing interface name`

An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections.

#### Usage

```
configure authority router routing interface name [<bridge-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| bridge-name | The value to set for this field |

## `configure authority router routing mist-events`

MIST Event Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bgp`](#configure-authority-router-routing-mist-events-bgp) | MIST BGP Event Configuration. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;mist-events&#x27; |

## `configure authority router routing mist-events bgp`

MIST BGP Event Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enable`](#configure-authority-router-routing-mist-events-bgp-enable) | Enable/Disable MIST BGP Event Generation. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;bgp&#x27; |

## `configure authority router routing mist-events bgp enable`

Enable/Disable MIST BGP Event Generation.

#### Usage

```
configure authority router routing mist-events bgp enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing msdp`

MSDP configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`mesh-group`](#configure-authority-router-routing-msdp-mesh-group) | MSDP Mesh-Group Configuration |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-routing-msdp-peer) | MSDP Peer Configuration |
| `show` | Show configuration data for &#x27;msdp&#x27; |

## `configure authority router routing msdp mesh-group`

MSDP Mesh-Group Configuration

#### Usage

```
configure authority router routing msdp mesh-group <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the Mesh-Group |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`member`](#configure-authority-router-routing-msdp-mesh-group-member) | IPv4 address of the Mesh-group member |
| [`name`](#configure-authority-router-routing-msdp-mesh-group-name) | Name of the Mesh-Group |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;mesh-group&#x27; |
| [`source`](#configure-authority-router-routing-msdp-mesh-group-source) | Source Address for the mesh-group |

## `configure authority router routing msdp mesh-group member`

IPv4 address of the Mesh-group member

#### Usage

```
configure authority router routing msdp mesh-group member [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | Value to add to this list |

## `configure authority router routing msdp mesh-group name`

Name of the Mesh-Group

#### Usage

```
configure authority router routing msdp mesh-group name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router routing msdp mesh-group source`

Source Address for the mesh-group

#### Usage

```
configure authority router routing msdp mesh-group source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing msdp peer`

MSDP Peer Configuration

#### Usage

```
configure authority router routing msdp peer <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | IPv4 address of the Peer |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-routing-msdp-peer-address) | IPv4 address of the Peer |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;peer&#x27; |
| [`source`](#configure-authority-router-routing-msdp-peer-source) | Source Address for the peer adjacency |

## `configure authority router routing msdp peer address`

IPv4 address of the Peer

#### Usage

```
configure authority router routing msdp peer address [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing msdp peer source`

Source Address for the peer adjacency

#### Usage

```
configure authority router routing msdp peer source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing ospf`

OSPF instance configuration

#### Usage

```
configure authority router routing ospf <instance>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| instance | Number of OSPF instance |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertise-default`](#configure-authority-router-routing-ospf-advertise-default) | Advertise default route into OSPF |
| [`area`](#configure-authority-router-routing-ospf-area) | List of OSPF areas |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`distance`](#configure-authority-router-routing-ospf-distance) | OSPF route administrative distance |
| [`instance`](#configure-authority-router-routing-ospf-instance) | Number of OSPF instance |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-ospf-redistribute) | List of routing protocols to redistribute into OSPF |
| [`router-id`](#configure-authority-router-routing-ospf-router-id) | Defined in RFC 2328. A 32-bit number that uniquely identifies the router |
| `show` | Show configuration data for &#x27;ospf&#x27; |
| [`timers`](#configure-authority-router-routing-ospf-timers) | OSPF Timers |

## `configure authority router routing ospf advertise-default`

Advertise default route into OSPF

##### Subcommands

| command | description |
| ------- | ----------- |
| [`always`](#configure-authority-router-routing-ospf-advertise-default-always) | Advertise default route into OSPF even when there is no default route in the routing table |
| `delete` | Delete configuration data |
| [`metric`](#configure-authority-router-routing-ospf-advertise-default-metric) | Advertised metric of the default route |
| [`metric-type`](#configure-authority-router-routing-ospf-advertise-default-metric-type) | Advertised metric type of default route |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-ospf-advertise-default-policy) | A policy to apply to the default route |
| `show` | Show configuration data for &#x27;advertise-default&#x27; |

## `configure authority router routing ospf advertise-default always`

Advertise default route into OSPF even when there is no default route in the routing table

#### Usage

```
configure authority router routing ospf advertise-default always [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing ospf advertise-default metric`

Advertised metric of the default route

#### Usage

```
configure authority router routing ospf advertise-default metric [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing ospf advertise-default metric-type`

Advertised metric type of default route

#### Usage

```
configure authority router routing ospf advertise-default metric-type [<ospf-external-metric-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ospf-external-metric-type | The value to set for this field |

## `configure authority router routing ospf advertise-default policy`

A policy to apply to the default route

#### Usage

```
configure authority router routing ospf advertise-default policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing ospf area`

List of OSPF areas

#### Usage

```
configure authority router routing ospf area <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Area ID |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-routing-ospf-area-authentication-type) | Area authentication type |
| `clone` | Clone a list item |
| [`default-cost`](#configure-authority-router-routing-ospf-area-default-cost) | Set the summary default route cost for a stub or NSSA area. |
| `delete` | Delete configuration data |
| [`id`](#configure-authority-router-routing-ospf-area-id) | Area ID |
| [`interface`](#configure-authority-router-routing-ospf-area-interface) | List of interfaces in area |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-ospf-area-routing-interface) | List of routing interfaces in area |
| `show` | Show configuration data for &#x27;area&#x27; |
| [`summary-advertisement`](#configure-authority-router-routing-ospf-area-summary-advertisement) | Enable/Disable summary advertisement into the stub or NSSA area. |
| [`summary-range`](#configure-authority-router-routing-ospf-area-summary-range) | Summarize routes matching address/mask - Applicable to Area Border Routers (ABRs) only |
| [`type`](#configure-authority-router-routing-ospf-area-type) | Area type |

## `configure authority router routing ospf area authentication-type`

Area authentication type

#### Usage

```
configure authority router routing ospf area authentication-type [<area-authentication-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-authentication-type | The value to set for this field |

## `configure authority router routing ospf area default-cost`

Set the summary default route cost for a stub or NSSA area.

#### Usage

```
configure authority router routing ospf area default-cost [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing ospf area id`

Area ID

#### Usage

```
configure authority router routing ospf area id [<area-id-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-id-type | The value to set for this field |

## `configure authority router routing ospf area interface`

List of interfaces in area

#### Usage

```
configure authority router routing ospf area interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-routing-ospf-area-interface-authentication-type) | OSPF interface authentication type. |
| [`bfd`](#configure-authority-router-routing-ospf-area-interface-bfd) | BFD Client Configuration. |
| `clone` | Clone a list item |
| [`cost`](#configure-authority-router-routing-ospf-area-interface-cost) | Interface cost |
| [`dead-interval`](#configure-authority-router-routing-ospf-area-interface-dead-interval) | Interval after which a neighbor is declared down (seconds) if hello packets are not received. |
| `delete` | Delete configuration data |
| [`hello-interval`](#configure-authority-router-routing-ospf-area-interface-hello-interval) | Interval between hello packets (seconds). |
| [`interface`](#configure-authority-router-routing-ospf-area-interface-interface) | Network interface name |
| [`message-digest-key`](#configure-authority-router-routing-ospf-area-interface-message-digest-key) | MD5 HMAC authentication message digest keys |
| [`network-type`](#configure-authority-router-routing-ospf-area-interface-network-type) | Interface network type |
| [`node`](#configure-authority-router-routing-ospf-area-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`passive`](#configure-authority-router-routing-ospf-area-interface-passive) | Enable/Disable passive interface - a passive interface&#x27;s prefix will be advertised but no neighbor adjacencies will be formed on the interface. |
| [`password`](#configure-authority-router-routing-ospf-area-interface-password) | OSPF simple authentication password |
| [`priority`](#configure-authority-router-routing-ospf-area-interface-priority) | Router priority |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing ospf area interface authentication-type`

OSPF interface authentication type.

#### Usage

```
configure authority router routing ospf area interface authentication-type [<interface-authentication-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| interface-authentication-type | The value to set for this field |

## `configure authority router routing ospf area interface bfd`

BFD Client Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-routing-ospf-area-interface-bfd-desired-tx-interval) | The minimum transmission interval in milliseconds used to send BFD control packets. |
| [`enable`](#configure-authority-router-routing-ospf-area-interface-bfd-enable) | Enable/Disable BFD protocol |
| [`multiplier`](#configure-authority-router-routing-ospf-area-interface-bfd-multiplier) | The number of BFD packets that can be lost without the BFD session declared as down. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-routing-ospf-area-interface-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing ospf area interface bfd desired-tx-interval`

The minimum transmission interval in milliseconds used to send BFD control packets.

#### Usage

```
configure authority router routing ospf area interface bfd desired-tx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing ospf area interface bfd enable`

Enable/Disable BFD protocol

#### Usage

```
configure authority router routing ospf area interface bfd enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing ospf area interface bfd multiplier`

The number of BFD packets that can be lost without the BFD session declared as down.

#### Usage

```
configure authority router routing ospf area interface bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf area interface bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router routing ospf area interface bfd required-min-rx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing ospf area interface cost`

Interface cost

#### Usage

```
configure authority router routing ospf area interface cost [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router routing ospf area interface dead-interval`

Interval after which a neighbor is declared down (seconds) if hello packets are not received.

#### Usage

```
configure authority router routing ospf area interface dead-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing ospf area interface hello-interval`

Interval between hello packets (seconds).

#### Usage

```
configure authority router routing ospf area interface hello-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing ospf area interface interface`

Network interface name

#### Usage

```
configure authority router routing ospf area interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing ospf area interface message-digest-key`

MD5 HMAC authentication message digest keys

#### Usage

```
configure authority router routing ospf area interface message-digest-key <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Message digest key identifier |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`id`](#configure-authority-router-routing-ospf-area-interface-message-digest-key-id) | Message digest key identifier |
| [`key`](#configure-authority-router-routing-ospf-area-interface-message-digest-key-key) | Message digest secret key |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;message-digest-key&#x27; |

## `configure authority router routing ospf area interface message-digest-key id`

Message digest key identifier

#### Usage

```
configure authority router routing ospf area interface message-digest-key id [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf area interface message-digest-key key`

Message digest secret key

#### Usage

```
configure authority router routing ospf area interface message-digest-key key [<routing-password-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-password-type | The value to set for this field |

## `configure authority router routing ospf area interface network-type`

Interface network type

#### Usage

```
configure authority router routing ospf area interface network-type [<interface-network-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| interface-network-type | The value to set for this field |

## `configure authority router routing ospf area interface node`

Interface node name

#### Usage

```
configure authority router routing ospf area interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing ospf area interface passive`

Enable/Disable passive interface - a passive interface&#x27;s prefix will be advertised but no neighbor adjacencies will be formed on the interface.

#### Usage

```
configure authority router routing ospf area interface passive [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing ospf area interface password`

OSPF simple authentication password

#### Usage

```
configure authority router routing ospf area interface password [<routing-password-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-password-type | The value to set for this field |

## `configure authority router routing ospf area interface priority`

Router priority

#### Usage

```
configure authority router routing ospf area interface priority [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf area routing-interface`

List of routing interfaces in area

#### Usage

```
configure authority router routing ospf area routing-interface <routing-interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-interface | Routing interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`cost`](#configure-authority-router-routing-ospf-area-routing-interface-cost) | Interface cost |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-ospf-area-routing-interface-routing-interface) | Routing interface name |
| `show` | Show configuration data for &#x27;routing-interface&#x27; |

## `configure authority router routing ospf area routing-interface cost`

Interface cost

#### Usage

```
configure authority router routing ospf area routing-interface cost [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router routing ospf area routing-interface routing-interface`

Routing interface name

#### Usage

```
configure authority router routing ospf area routing-interface routing-interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing ospf area summary-advertisement`

Enable/Disable summary advertisement into the stub or NSSA area.

#### Usage

```
configure authority router routing ospf area summary-advertisement [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing ospf area summary-range`

Summarize routes matching address/mask - Applicable to Area Border Routers (ABRs) only

#### Usage

```
configure authority router routing ospf area summary-range <prefix>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | Summarization prefix |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertise`](#configure-authority-router-routing-ospf-area-summary-range-advertise) | Advertise or hide |
| [`cost`](#configure-authority-router-routing-ospf-area-summary-range-cost) | Advertised cost of summary route |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-ospf-area-summary-range-prefix) | Summarization prefix |
| `show` | Show configuration data for &#x27;summary-range&#x27; |

## `configure authority router routing ospf area summary-range advertise`

Advertise or hide

#### Usage

```
configure authority router routing ospf area summary-range advertise [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing ospf area summary-range cost`

Advertised cost of summary route

#### Usage

```
configure authority router routing ospf area summary-range cost [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing ospf area summary-range prefix`

Summarization prefix

#### Usage

```
configure authority router routing ospf area summary-range prefix [<ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-prefix | The value to set for this field |

## `configure authority router routing ospf area type`

Area type

#### Usage

```
configure authority router routing ospf area type [<area-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-type | The value to set for this field |

## `configure authority router routing ospf distance`

OSPF route administrative distance

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`external`](#configure-authority-router-routing-ospf-distance-external) | Administrative distance for external OSPF routes |
| [`inter-area`](#configure-authority-router-routing-ospf-distance-inter-area) | Administrative distance for inter-area OSPF routes |
| [`intra-area`](#configure-authority-router-routing-ospf-distance-intra-area) | Administrative distance for intra-area OSPF routes |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;distance&#x27; |

## `configure authority router routing ospf distance external`

Administrative distance for external OSPF routes

#### Usage

```
configure authority router routing ospf distance external [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf distance inter-area`

Administrative distance for inter-area OSPF routes

#### Usage

```
configure authority router routing ospf distance inter-area [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf distance intra-area`

Administrative distance for intra-area OSPF routes

#### Usage

```
configure authority router routing ospf distance intra-area [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf instance`

Number of OSPF instance

#### Usage

```
configure authority router routing ospf instance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing ospf redistribute`

List of routing protocols to redistribute into OSPF

#### Usage

```
configure authority router routing ospf redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into OSPF |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`metric`](#configure-authority-router-routing-ospf-redistribute-metric) | Advertised metric of redistributed route |
| [`metric-type`](#configure-authority-router-routing-ospf-redistribute-metric-type) | Advertised metric type of redistributed route |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-ospf-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-ospf-redistribute-protocol) | The routing protocol to redistribute into OSPF |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing ospf redistribute metric`

Advertised metric of redistributed route

#### Usage

```
configure authority router routing ospf redistribute metric [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing ospf redistribute metric-type`

Advertised metric type of redistributed route

#### Usage

```
configure authority router routing ospf redistribute metric-type [<ospf-external-metric-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ospf-external-metric-type | The value to set for this field |

## `configure authority router routing ospf redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing ospf redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing ospf redistribute protocol`

The routing protocol to redistribute into OSPF

#### Usage

```
configure authority router routing ospf redistribute protocol [<redistribute-into-ospf>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-ospf | The value to set for this field |

## `configure authority router routing ospf router-id`

Defined in RFC 2328. A 32-bit number that uniquely identifies the router

#### Usage

```
configure authority router routing ospf router-id [<dotted-quad>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dotted-quad | The value to set for this field |

## `configure authority router routing ospf timers`

OSPF Timers

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |
| [`spf`](#configure-authority-router-routing-ospf-timers-spf) | OSPF SPF Timers |

## `configure authority router routing ospf timers spf`

OSPF SPF Timers

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-routing-ospf-timers-spf-delay) | Initial SPF delay. |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-ospf-timers-spf-hold-time) | Adaptive hold-time. |
| [`maximum-hold-time`](#configure-authority-router-routing-ospf-timers-spf-maximum-hold-time) | Maximum hold-time. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;spf&#x27; |

## `configure authority router routing ospf timers spf delay`

Initial SPF delay.

#### Usage

```
configure authority router routing ospf timers spf delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing ospf timers spf hold-time`

Adaptive hold-time.

#### Usage

```
configure authority router routing ospf timers spf hold-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing ospf timers spf maximum-hold-time`

Maximum hold-time.

#### Usage

```
configure authority router routing ospf timers spf maximum-hold-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing pim`

PIM configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-pim-interface) | List of PIM interfaces |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rp`](#configure-authority-router-routing-pim-rp) | PIM RP Configuration |
| `show` | Show configuration data for &#x27;pim&#x27; |

## `configure authority router routing pim interface`

List of PIM interfaces

#### Usage

```
configure authority router routing pim interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`dr-priority`](#configure-authority-router-routing-pim-interface-dr-priority) | Preference of a particular device in the DR election process. The lowest priority is 1. |
| [`hello-interval`](#configure-authority-router-routing-pim-interface-hello-interval) | Configure Hello Interval |
| [`interface`](#configure-authority-router-routing-pim-interface-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-pim-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing pim interface dr-priority`

Preference of a particular device in the DR election process. The lowest priority is 1.

#### Usage

```
configure authority router routing pim interface dr-priority [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing pim interface hello-interval`

Configure Hello Interval

#### Usage

```
configure authority router routing pim interface hello-interval [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing pim interface interface`

Network interface name

#### Usage

```
configure authority router routing pim interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing pim interface node`

Interface node name

#### Usage

```
configure authority router routing pim interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing pim rp`

PIM RP Configuration

#### Usage

```
configure authority router routing pim rp <group-range>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group-range | Multicast Group address range for this RP |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-routing-pim-rp-address) | IPv4 address of the RP |
| `delete` | Delete configuration data |
| [`group-range`](#configure-authority-router-routing-pim-rp-group-range) | Multicast Group address range for this RP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rp&#x27; |

## `configure authority router routing pim rp address`

IPv4 address of the RP

#### Usage

```
configure authority router routing pim rp address [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing pim rp group-range`

Multicast Group address range for this RP

#### Usage

```
configure authority router routing pim rp group-range [<multicast-ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-prefix | The value to set for this field |

## `configure authority router routing routing-protocol`

Each entry contains configuration of a routing protocol instance.

#### Usage

```
configure authority router routing routing-protocol <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address-family`](#configure-authority-router-routing-routing-protocol-address-family) | Address family configuration |
| `clone` | Clone a list item |
| [`cluster-id`](#configure-authority-router-routing-routing-protocol-cluster-id) | Route reflector cluster id. |
| [`conditional-advertisement`](#configure-authority-router-routing-routing-protocol-conditional-advertisement) | Configure Conditional Advertisement |
| [`confederation`](#configure-authority-router-routing-routing-protocol-confederation) | Configuration options specifying parameters when the local router is within an autonomous system which is part of a BGP confederation. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-routing-protocol-description) | Textual description of the routing protocol instance. |
| [`graceful-restart`](#configure-authority-router-routing-routing-protocol-graceful-restart) | Configuration parameters relating to BGP graceful restart. |
| [`local-as`](#configure-authority-router-routing-routing-protocol-local-as) | Local autonomous system number of the router. Uses the 32-bit as-number type from the model in RFC 6991. |
| [`neighbor`](#configure-authority-router-routing-routing-protocol-neighbor) | List of BGP neighbors configured on the local system, uniquely identified by neighbor IPv[46] address |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-routing-protocol-redistribute) | List of routing protocols to redistribute into BGP |
| [`route-reflector-allow-outbound-policy`](#configure-authority-router-routing-routing-protocol-route-reflector-allow-outbound-policy) | Apply outbound policy on route reflector clients. |
| [`route-selection-options`](#configure-authority-router-routing-routing-protocol-route-selection-options) | Set of configuration options that govern best path selection. |
| [`router-id`](#configure-authority-router-routing-routing-protocol-router-id) | Router id of the router, expressed as an 32-bit value, IPv4 address. |
| `show` | Show configuration data for &#x27;routing-protocol&#x27; |
| [`timers`](#configure-authority-router-routing-routing-protocol-timers) | Config parameters related to timers associated with the BGP neighbor |
| [`type`](#configure-authority-router-routing-routing-protocol-type) | Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity. |

## `configure authority router routing routing-protocol address-family`

Address family configuration

#### Usage

```
configure authority router routing routing-protocol address-family <afi-safi>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`afi-safi`](#configure-authority-router-routing-routing-protocol-address-family-afi-safi) | Address family type |
| [`aggregate-address`](#configure-authority-router-routing-routing-protocol-address-family-aggregate-address) | Address prefixes to aggregate |
| `clone` | Clone a list item |
| [`default-route-distance`](#configure-authority-router-routing-routing-protocol-address-family-default-route-distance) | Configuration options relating to the administrative distance (or preference) assigned to routes received from different sources (external, internal, and local). |
| `delete` | Delete configuration data |
| [`graceful-restart`](#configure-authority-router-routing-routing-protocol-address-family-graceful-restart) | Configuration parameters relating to BGP graceful restart. |
| [`network`](#configure-authority-router-routing-routing-protocol-address-family-network) | Advertises a network into BGP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-routing-protocol-address-family-redistribute) | List of routing protocols to redistribute into BGP |
| `show` | Show configuration data for &#x27;address-family&#x27; |
| [`use-multiple-paths`](#configure-authority-router-routing-routing-protocol-address-family-use-multiple-paths) | Parameters related to the use of multiple paths for the same NLRI |
| [`vpn-export`](#configure-authority-router-routing-routing-protocol-address-family-vpn-export) | Configure Vpn Export |
| [`vpn-import`](#configure-authority-router-routing-routing-protocol-address-family-vpn-import) | Configure Vpn Import |

## `configure authority router routing routing-protocol address-family afi-safi`

Address family type

#### Usage

```
configure authority router routing routing-protocol address-family afi-safi [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

`identityref`
A value as defined below:

| name | description |
| ---- | ----------- |
| ipv4-unicast | IPv4 unicast (AFI,SAFI = 1,1) |
| ipv6-unicast | IPv6 unicast (AFI,SAFI = 2,1) |
| ipv4-vpn | IPv4 vpn (AFI,SAFI = 1,128) |
| ipv6-vpn | IPv6 vpn (AFI,SAFI = 2,128) |

## `configure authority router routing routing-protocol address-family aggregate-address`

Address prefixes to aggregate

#### Usage

```
configure authority router routing routing-protocol address-family aggregate-address <prefix>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | The prefix to aggregate from |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`as-set`](#configure-authority-router-routing-routing-protocol-address-family-aggregate-address-as-set) | Generate as-set information for the resultant aggregate |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-routing-protocol-address-family-aggregate-address-prefix) | The prefix to aggregate from |
| `show` | Show configuration data for &#x27;aggregate-address&#x27; |
| [`summary-only`](#configure-authority-router-routing-routing-protocol-address-family-aggregate-address-summary-only) | Specifies that the prefixes aggregated by this aggregation are not to be advertised: only the aggregate itself will be advertised |

## `configure authority router routing routing-protocol address-family aggregate-address as-set`

Generate as-set information for the resultant aggregate

#### Usage

```
configure authority router routing routing-protocol address-family aggregate-address as-set [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol address-family aggregate-address prefix`

The prefix to aggregate from

#### Usage

```
configure authority router routing routing-protocol address-family aggregate-address prefix [<not-host-ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| not-host-ip-prefix | The value to set for this field |

## `configure authority router routing routing-protocol address-family aggregate-address summary-only`

Specifies that the prefixes aggregated by this aggregation are not to be advertised: only the aggregate itself will be advertised

#### Usage

```
configure authority router routing routing-protocol address-family aggregate-address summary-only [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol address-family default-route-distance`

Configuration options relating to the administrative distance (or preference) assigned to routes received from different sources (external, internal, and local).

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`external`](#configure-authority-router-routing-routing-protocol-address-family-default-route-distance-external) | Administrative distance for routes learned from external BGP (eBGP). |
| [`internal`](#configure-authority-router-routing-routing-protocol-address-family-default-route-distance-internal) | Administrative distance for routes learned from internal BGP (iBGP). |
| [`local`](#configure-authority-router-routing-routing-protocol-address-family-default-route-distance-local) | Administrative distance for local routes |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;default-route-distance&#x27; |

## `configure authority router routing routing-protocol address-family default-route-distance external`

Administrative distance for routes learned from external BGP (eBGP).

#### Usage

```
configure authority router routing routing-protocol address-family default-route-distance external [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol address-family default-route-distance internal`

Administrative distance for routes learned from internal BGP (iBGP).

#### Usage

```
configure authority router routing routing-protocol address-family default-route-distance internal [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol address-family default-route-distance local`

Administrative distance for local routes

#### Usage

```
configure authority router routing routing-protocol address-family default-route-distance local [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol address-family graceful-restart`

Configuration parameters relating to BGP graceful restart.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-time`](#configure-authority-router-routing-routing-protocol-address-family-graceful-restart-restart-time) | Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value. |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |
| [`stale-routes-time`](#configure-authority-router-routing-routing-protocol-address-family-graceful-restart-stale-routes-time) | An upper-bound on the time that the stale routes will be retained by a router after a session is restarted. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724 |

#### Description

Warning: &#x27;graceful-restart&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing routing-protocol address-family graceful-restart restart-time`

Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value.

#### Usage

```
configure authority router routing routing-protocol address-family graceful-restart restart-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;restart-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing routing-protocol address-family graceful-restart stale-routes-time`

An upper-bound on the time that the stale routes will be retained by a router after a session is restarted. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724

#### Usage

```
configure authority router routing routing-protocol address-family graceful-restart stale-routes-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;stale-routes-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing routing-protocol address-family network`

Advertises a network into BGP

#### Usage

```
configure authority router routing routing-protocol address-family network <network-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| network-address | Specify a network to announce via BGP for this address family |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`network-address`](#configure-authority-router-routing-routing-protocol-address-family-network-network-address) | Specify a network to announce via BGP for this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-routing-protocol-address-family-network-policy) | a policy to apply to the imported route |
| `show` | Show configuration data for &#x27;network&#x27; |

## `configure authority router routing routing-protocol address-family network network-address`

Specify a network to announce via BGP for this address family

#### Usage

```
configure authority router routing routing-protocol address-family network network-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority router routing routing-protocol address-family network policy`

a policy to apply to the imported route

#### Usage

```
configure authority router routing routing-protocol address-family network policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol address-family redistribute`

List of routing protocols to redistribute into BGP

#### Usage

```
configure authority router routing routing-protocol address-family redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into BGP |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-routing-protocol-address-family-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-routing-protocol-address-family-redistribute-protocol) | The routing protocol to redistribute into BGP |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing routing-protocol address-family redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing routing-protocol address-family redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol address-family redistribute protocol`

The routing protocol to redistribute into BGP

#### Usage

```
configure authority router routing routing-protocol address-family redistribute protocol [<redistribute-into-bgp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-bgp | The value to set for this field |

## `configure authority router routing routing-protocol address-family use-multiple-paths`

Parameters related to the use of multiple paths for the same NLRI

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`ebgp`](#configure-authority-router-routing-routing-protocol-address-family-use-multiple-paths-ebgp) | Multipath parameters for eBGP |
| [`ibgp`](#configure-authority-router-routing-routing-protocol-address-family-use-multiple-paths-ibgp) | Multipath parameters for iBGP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;use-multiple-paths&#x27; |

## `configure authority router routing routing-protocol address-family use-multiple-paths ebgp`

Multipath parameters for eBGP

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`maximum-paths`](#configure-authority-router-routing-routing-protocol-address-family-use-multiple-paths-ebgp-maximum-paths) | Maximum number of parallel paths to consider when using eBGP multipath for this address family. The default is to use a single path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ebgp&#x27; |

## `configure authority router routing routing-protocol address-family use-multiple-paths ebgp maximum-paths`

Maximum number of parallel paths to consider when using eBGP multipath for this address family. The default is to use a single path.

#### Usage

```
configure authority router routing routing-protocol address-family use-multiple-paths ebgp maximum-paths [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: paths

## `configure authority router routing routing-protocol address-family use-multiple-paths ibgp`

Multipath parameters for iBGP

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`maximum-paths`](#configure-authority-router-routing-routing-protocol-address-family-use-multiple-paths-ibgp-maximum-paths) | Maximum number of parallel paths to consider when using iBGP multipath for this address family. The default is to use a single path |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ibgp&#x27; |

## `configure authority router routing routing-protocol address-family use-multiple-paths ibgp maximum-paths`

Maximum number of parallel paths to consider when using iBGP multipath for this address family. The default is to use a single path

#### Usage

```
configure authority router routing routing-protocol address-family use-multiple-paths ibgp maximum-paths [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: paths

## `configure authority router routing routing-protocol address-family vpn-export`

Configure Vpn Export

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`export-policy`](#configure-authority-router-routing-routing-protocol-address-family-vpn-export-export-policy) | Export policy for vpn export |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`route-distinguisher`](#configure-authority-router-routing-routing-protocol-address-family-vpn-export-route-distinguisher) | Route Distinguisher for vpn export |
| `show` | Show configuration data for &#x27;vpn-export&#x27; |
| [`vpn-export-route-target`](#configure-authority-router-routing-routing-protocol-address-family-vpn-export-vpn-export-route-target) | Route Target list for vpn export |

## `configure authority router routing routing-protocol address-family vpn-export export-policy`

Export policy for vpn export

#### Usage

```
configure authority router routing routing-protocol address-family vpn-export export-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol address-family vpn-export route-distinguisher`

Route Distinguisher for vpn export

#### Usage

```
configure authority router routing routing-protocol address-family vpn-export route-distinguisher [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | The value to set for this field |

## `configure authority router routing routing-protocol address-family vpn-export vpn-export-route-target`

Route Target list for vpn export

#### Usage

```
configure authority router routing routing-protocol address-family vpn-export vpn-export-route-target [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority router routing routing-protocol address-family vpn-import`

Configure Vpn Import

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`import-policy`](#configure-authority-router-routing-routing-protocol-address-family-vpn-import-import-policy) | Export policy for vpn import |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;vpn-import&#x27; |
| [`vpn-import-route-target`](#configure-authority-router-routing-routing-protocol-address-family-vpn-import-vpn-import-route-target) | Route Target list for vpn import |

## `configure authority router routing routing-protocol address-family vpn-import import-policy`

Export policy for vpn import

#### Usage

```
configure authority router routing routing-protocol address-family vpn-import import-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol address-family vpn-import vpn-import-route-target`

Route Target list for vpn import

#### Usage

```
configure authority router routing routing-protocol address-family vpn-import vpn-import-route-target [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority router routing routing-protocol cluster-id`

Route reflector cluster id.

#### Usage

```
configure authority router routing routing-protocol cluster-id [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority router routing routing-protocol conditional-advertisement`

Configure Conditional Advertisement

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval-time`](#configure-authority-router-routing-routing-protocol-conditional-advertisement-interval-time) | Conditional advertisement scanner process interval time. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;conditional-advertisement&#x27; |

## `configure authority router routing routing-protocol conditional-advertisement interval-time`

Conditional advertisement scanner process interval time.

#### Usage

```
configure authority router routing routing-protocol conditional-advertisement interval-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol confederation`

Configuration options specifying parameters when the local router is within an autonomous system which is part of a BGP confederation.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`identifier`](#configure-authority-router-routing-routing-protocol-confederation-identifier) | Confederation identifier for the autonomous system. |
| [`member-as`](#configure-authority-router-routing-routing-protocol-confederation-member-as) | Remote autonomous systems that are to be treated as part of the local confederation. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;confederation&#x27; |

## `configure authority router routing routing-protocol confederation identifier`

Confederation identifier for the autonomous system.

#### Usage

```
configure authority router routing routing-protocol confederation identifier [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing routing-protocol confederation member-as`

Remote autonomous systems that are to be treated as part of the local confederation.

#### Usage

```
configure authority router routing routing-protocol confederation member-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | Value to add to this list |

## `configure authority router routing routing-protocol description`

Textual description of the routing protocol instance.

#### Usage

```
configure authority router routing routing-protocol description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing routing-protocol graceful-restart`

Configuration parameters relating to BGP graceful restart.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-routing-routing-protocol-graceful-restart-mode) | Graceful restart mode. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-time`](#configure-authority-router-routing-routing-protocol-graceful-restart-restart-time) | Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value. |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |
| [`stale-routes-time`](#configure-authority-router-routing-routing-protocol-graceful-restart-stale-routes-time) | An upper-bound on the time that the stale routes will be retained by a router after a session is restarted or 0 to disable. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724 |

## `configure authority router routing routing-protocol graceful-restart mode`

Graceful restart mode.

#### Usage

```
configure authority router routing routing-protocol graceful-restart mode [<graceful-restart-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| graceful-restart-mode | The value to set for this field |

## `configure authority router routing routing-protocol graceful-restart restart-time`

Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value.

#### Usage

```
configure authority router routing routing-protocol graceful-restart restart-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol graceful-restart stale-routes-time`

An upper-bound on the time that the stale routes will be retained by a router after a session is restarted or 0 to disable. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724

#### Usage

```
configure authority router routing routing-protocol graceful-restart stale-routes-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol local-as`

Local autonomous system number of the router. Uses the 32-bit as-number type from the model in RFC 6991.

#### Usage

```
configure authority router routing routing-protocol local-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing routing-protocol neighbor`

List of BGP neighbors configured on the local system, uniquely identified by neighbor IPv[46] address

#### Usage

```
configure authority router routing routing-protocol neighbor <neighbor-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor-address | IP address of the BGP neighbor |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address-family`](#configure-authority-router-routing-routing-protocol-neighbor-address-family) | Address family configuration |
| [`auth-password`](#configure-authority-router-routing-routing-protocol-neighbor-auth-password) | Configures an MD5 authentication password for use with neighboring devices. |
| [`bfd`](#configure-authority-router-routing-routing-protocol-neighbor-bfd) | BFD Client Configuration. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-routing-protocol-neighbor-description) | An optional textual description (intended primarily for use with a neighbor or group |
| [`graceful-restart`](#configure-authority-router-routing-routing-protocol-neighbor-graceful-restart) | Configuration parameters relating to BGP neighbor graceful restart. If not explicitly configured, neighbor inherits from BGP instance. |
| [`local-as`](#configure-authority-router-routing-routing-protocol-neighbor-local-as) | The local autonomous system number that is to be used when establishing sessions with the remote neighbor or neighbor group, if this differs from the global BGP router autonomous system number. |
| [`multihop`](#configure-authority-router-routing-routing-protocol-neighbor-multihop) | Configuration parameters specifying the multihop behaviour for BGP sessions to the neighbor |
| [`negotiate-capabilities`](#configure-authority-router-routing-routing-protocol-neighbor-negotiate-capabilities) | If set to false, suppress sending the Capabilities Optional Parameter in the BGP OPEN message. |
| [`neighbor-address`](#configure-authority-router-routing-routing-protocol-neighbor-neighbor-address) | IP address of the BGP neighbor |
| [`neighbor-as`](#configure-authority-router-routing-routing-protocol-neighbor-neighbor-as) | AS number of the neighbor. |
| [`neighbor-policy`](#configure-authority-router-routing-routing-protocol-neighbor-neighbor-policy) | Configure Neighbor Policy |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor&#x27; |
| [`shutdown`](#configure-authority-router-routing-routing-protocol-neighbor-shutdown) | If set to true, the neighbors connection will not come up. |
| [`timers`](#configure-authority-router-routing-routing-protocol-neighbor-timers) | Config parameters related to timers associated with the BGP neighbor |
| [`transport`](#configure-authority-router-routing-routing-protocol-neighbor-transport) | Configuration parameters relating to the transport protocol used by the BGP session to the neighbor |

## `configure authority router routing routing-protocol neighbor address-family`

Address family configuration

#### Usage

```
configure authority router routing routing-protocol neighbor address-family <afi-safi>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`activate`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-activate) | Activate address family for neighbor |
| [`afi-safi`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-afi-safi) | Address family type |
| [`as-path-options`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-as-path-options) | Configuration parameters allowing manipulation of the AS_PATH attribute for this address family |
| [`conditional-advertisement`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-conditional-advertisement) | Configure Conditional Advertisement |
| `delete` | Delete configuration data |
| [`neighbor-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-neighbor-policy) | Configure Neighbor Policy |
| [`next-hop-self`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-next-hop-self) | Sets the router as the next hop for this neighbor and this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix-limit`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-prefix-limit) | Configure the maximum number of prefixes that will be accepted from a neighbor for this address family |
| [`remove-private-as`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-remove-private-as) | Modify private AS numbers in updates sent to neighbors for this address family. |
| [`route-reflector`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-route-reflector) | Route reflector client configuration |
| [`send-default-route`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-send-default-route) | If set to true, generate and send the default-route for this address-family to the neighbor |
| `show` | Show configuration data for &#x27;address-family&#x27; |

## `configure authority router routing routing-protocol neighbor address-family activate`

Activate address family for neighbor

#### Usage

```
configure authority router routing routing-protocol neighbor address-family activate [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family afi-safi`

Address family type

#### Usage

```
configure authority router routing routing-protocol neighbor address-family afi-safi [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

`identityref`
A value as defined below:

| name | description |
| ---- | ----------- |
| ipv4-unicast | IPv4 unicast (AFI,SAFI = 1,1) |
| ipv6-unicast | IPv6 unicast (AFI,SAFI = 2,1) |
| ipv4-vpn | IPv4 vpn (AFI,SAFI = 1,128) |
| ipv6-vpn | IPv6 vpn (AFI,SAFI = 2,128) |

## `configure authority router routing routing-protocol neighbor address-family as-path-options`

Configuration parameters allowing manipulation of the AS_PATH attribute for this address family

##### Subcommands

| command | description |
| ------- | ----------- |
| [`allow-own-as`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-as-path-options-allow-own-as) | Specify the number of occurrences of the local BGP speaker&#x27;s AS that can occur within the AS_PATH before it is rejected for this address family. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;as-path-options&#x27; |

## `configure authority router routing routing-protocol neighbor address-family as-path-options allow-own-as`

Specify the number of occurrences of the local BGP speaker&#x27;s AS that can occur within the AS_PATH before it is rejected for this address family.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family as-path-options allow-own-as [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family conditional-advertisement`

Configure Conditional Advertisement

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertisement-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-conditional-advertisement-advertisement-policy) | A policy selecting routes to conditionally advertise. |
| `delete` | Delete configuration data |
| [`exist-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-conditional-advertisement-exist-policy) | If this policy matches any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy. |
| [`non-exist-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-conditional-advertisement-non-exist-policy) | If this policy does not match any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;conditional-advertisement&#x27; |

## `configure authority router routing routing-protocol neighbor address-family conditional-advertisement advertisement-policy`

A policy selecting routes to conditionally advertise.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family conditional-advertisement advertisement-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family conditional-advertisement exist-policy`

If this policy matches any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family conditional-advertisement exist-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family conditional-advertisement non-exist-policy`

If this policy does not match any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family conditional-advertisement non-exist-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family neighbor-policy`

Configure Neighbor Policy

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`inbound-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-neighbor-policy-inbound-policy) | A policy to apply to the NLRIs inbound from this neighbor. |
| [`outbound-policy`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-neighbor-policy-outbound-policy) | A policy to apply to the NLRIs outbound to this neighbor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor-policy&#x27; |

## `configure authority router routing routing-protocol neighbor address-family neighbor-policy inbound-policy`

A policy to apply to the NLRIs inbound from this neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family neighbor-policy inbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family neighbor-policy outbound-policy`

A policy to apply to the NLRIs outbound to this neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family neighbor-policy outbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family next-hop-self`

Sets the router as the next hop for this neighbor and this address family

#### Usage

```
configure authority router routing routing-protocol neighbor address-family next-hop-self [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family prefix-limit`

Configure the maximum number of prefixes that will be accepted from a neighbor for this address family

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-prefixes`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-prefix-limit-max-prefixes) | Maximum number of prefixes that will be accepted from the neighbor for this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-timer`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-prefix-limit-restart-timer) | Time interval after which the BGP session is re-established after being torn down due to exceeding the max-prefix limit for this adddress family. |
| `show` | Show configuration data for &#x27;prefix-limit&#x27; |
| [`shutdown-threshold-pct`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-prefix-limit-shutdown-threshold-pct) | Threshold on number of prefixes that can be received from a neighbor for this address family before generation of warning messages or log entries. |

## `configure authority router routing routing-protocol neighbor address-family prefix-limit max-prefixes`

Maximum number of prefixes that will be accepted from the neighbor for this address family

#### Usage

```
configure authority router routing routing-protocol neighbor address-family prefix-limit max-prefixes [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: prefixes

## `configure authority router routing routing-protocol neighbor address-family prefix-limit restart-timer`

Time interval after which the BGP session is re-established after being torn down due to exceeding the max-prefix limit for this adddress family.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family prefix-limit restart-timer [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol neighbor address-family prefix-limit shutdown-threshold-pct`

Threshold on number of prefixes that can be received from a neighbor for this address family before generation of warning messages or log entries.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family prefix-limit shutdown-threshold-pct [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router routing routing-protocol neighbor address-family remove-private-as`

Modify private AS numbers in updates sent to neighbors for this address family.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family remove-private-as [<remove-private-as-option>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| remove-private-as-option | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family route-reflector`

Route reflector client configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| [`client`](#configure-authority-router-routing-routing-protocol-neighbor-address-family-route-reflector-client) | Configure the neighbor as a route reflector client for this address family. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;route-reflector&#x27; |

## `configure authority router routing routing-protocol neighbor address-family route-reflector client`

Configure the neighbor as a route reflector client for this address family.

#### Usage

```
configure authority router routing routing-protocol neighbor address-family route-reflector client [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor address-family send-default-route`

If set to true, generate and send the default-route for this address-family to the neighbor

#### Usage

```
configure authority router routing routing-protocol neighbor address-family send-default-route [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor auth-password`

Configures an MD5 authentication password for use with neighboring devices.

#### Usage

```
configure authority router routing routing-protocol neighbor auth-password [<password>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| password | The value to set for this field |

## `configure authority router routing routing-protocol neighbor bfd`

BFD Client Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-routing-routing-protocol-neighbor-bfd-desired-tx-interval) | The minimum transmission interval in milliseconds used to send BFD control packets. |
| [`enable`](#configure-authority-router-routing-routing-protocol-neighbor-bfd-enable) | Enable/Disable BFD protocol |
| [`multiplier`](#configure-authority-router-routing-routing-protocol-neighbor-bfd-multiplier) | The number of BFD packets that can be lost without the BFD session declared as down. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-routing-routing-protocol-neighbor-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing routing-protocol neighbor bfd desired-tx-interval`

The minimum transmission interval in milliseconds used to send BFD control packets.

#### Usage

```
configure authority router routing routing-protocol neighbor bfd desired-tx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing routing-protocol neighbor bfd enable`

Enable/Disable BFD protocol

#### Usage

```
configure authority router routing routing-protocol neighbor bfd enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor bfd multiplier`

The number of BFD packets that can be lost without the BFD session declared as down.

#### Usage

```
configure authority router routing routing-protocol neighbor bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol neighbor bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router routing routing-protocol neighbor bfd required-min-rx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing routing-protocol neighbor description`

An optional textual description (intended primarily for use with a neighbor or group

#### Usage

```
configure authority router routing routing-protocol neighbor description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing routing-protocol neighbor graceful-restart`

Configuration parameters relating to BGP neighbor graceful restart. If not explicitly configured, neighbor inherits from BGP instance.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-routing-routing-protocol-neighbor-graceful-restart-mode) | Graceful restart mode. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |

## `configure authority router routing routing-protocol neighbor graceful-restart mode`

Graceful restart mode.

#### Usage

```
configure authority router routing routing-protocol neighbor graceful-restart mode [<graceful-restart-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| graceful-restart-mode | The value to set for this field |

## `configure authority router routing routing-protocol neighbor local-as`

The local autonomous system number that is to be used when establishing sessions with the remote neighbor or neighbor group, if this differs from the global BGP router autonomous system number.

#### Usage

```
configure authority router routing routing-protocol neighbor local-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing routing-protocol neighbor multihop`

Configuration parameters specifying the multihop behaviour for BGP sessions to the neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;multihop&#x27; |
| [`ttl`](#configure-authority-router-routing-routing-protocol-neighbor-multihop-ttl) | Time-to-live value to use when packets are sent to the referenced group or neighbors and ebgp-multihop is enabled |

## `configure authority router routing routing-protocol neighbor multihop ttl`

Time-to-live value to use when packets are sent to the referenced group or neighbors and ebgp-multihop is enabled

#### Usage

```
configure authority router routing routing-protocol neighbor multihop ttl [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing routing-protocol neighbor negotiate-capabilities`

If set to false, suppress sending the Capabilities Optional Parameter in the BGP OPEN message.

#### Usage

```
configure authority router routing routing-protocol neighbor negotiate-capabilities [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor neighbor-address`

IP address of the BGP neighbor

#### Usage

```
configure authority router routing routing-protocol neighbor neighbor-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router routing routing-protocol neighbor neighbor-as`

AS number of the neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor neighbor-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing routing-protocol neighbor neighbor-policy`

Configure Neighbor Policy

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`inbound-policy`](#configure-authority-router-routing-routing-protocol-neighbor-neighbor-policy-inbound-policy) | A policy to apply to the NLRIs inbound from this neighbor. |
| [`outbound-policy`](#configure-authority-router-routing-routing-protocol-neighbor-neighbor-policy-outbound-policy) | A policy to apply to the NLRIs outbound to this neighbor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor-policy&#x27; |

## `configure authority router routing routing-protocol neighbor neighbor-policy inbound-policy`

A policy to apply to the NLRIs inbound from this neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor neighbor-policy inbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor neighbor-policy outbound-policy`

A policy to apply to the NLRIs outbound to this neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor neighbor-policy outbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor shutdown`

If set to true, the neighbors connection will not come up.

#### Usage

```
configure authority router routing routing-protocol neighbor shutdown [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol neighbor timers`

Config parameters related to timers associated with the BGP neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| [`connect-retry`](#configure-authority-router-routing-routing-protocol-neighbor-timers-connect-retry) | Time interval between attempts to establish a session with the neighbor. |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-routing-protocol-neighbor-timers-hold-time) | Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval. |
| [`keepalive-interval`](#configure-authority-router-routing-routing-protocol-neighbor-timers-keepalive-interval) | Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller. |
| [`minimum-advertisement-interval`](#configure-authority-router-routing-routing-protocol-neighbor-timers-minimum-advertisement-interval) | Minimum time which must elapse between subsequent UPDATE messages relating to a common set of NLRI being transmitted to a neighbor. This timer is referred to as MinRouteAdvertisementIntervalTimer by RFC 4721 and serves to reduce the number of UPDATE messages transmitted when a particular set of NLRI exhibit instability. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |

## `configure authority router routing routing-protocol neighbor timers connect-retry`

Time interval between attempts to establish a session with the neighbor.

#### Usage

```
configure authority router routing routing-protocol neighbor timers connect-retry [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol neighbor timers hold-time`

Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval.

#### Usage

```
configure authority router routing routing-protocol neighbor timers hold-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol neighbor timers keepalive-interval`

Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller.

#### Usage

```
configure authority router routing routing-protocol neighbor timers keepalive-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol neighbor timers minimum-advertisement-interval`

Minimum time which must elapse between subsequent UPDATE messages relating to a common set of NLRI being transmitted to a neighbor. This timer is referred to as MinRouteAdvertisementIntervalTimer by RFC 4721 and serves to reduce the number of UPDATE messages transmitted when a particular set of NLRI exhibit instability.

#### Usage

```
configure authority router routing routing-protocol neighbor timers minimum-advertisement-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol neighbor transport`

Configuration parameters relating to the transport protocol used by the BGP session to the neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bgp-service-generation`](#configure-authority-router-routing-routing-protocol-neighbor-transport-bgp-service-generation) | Approach used for generating a BGP service and service routes to enable SVR transport for the BGP session with the neighbor. |
| `delete` | Delete configuration data |
| [`local-address`](#configure-authority-router-routing-routing-protocol-neighbor-transport-local-address) | Set the source IP address to be used for the BGP peering session. This must be expressed as a reference to the name of a routing interface or network interface. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`passive-mode`](#configure-authority-router-routing-routing-protocol-neighbor-transport-passive-mode) | Wait for neighbors to issue requests to open a BGP session, rather than initiating sessions from the local router. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority router routing routing-protocol neighbor transport bgp-service-generation`

Approach used for generating a BGP service and service routes to enable SVR transport for the BGP session with the neighbor.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`disabled`](#configure-authority-router-routing-routing-protocol-neighbor-transport-bgp-service-generation-disabled) | Do not generate a BGP service or service routes. |
| [`neighbor-vrf`](#configure-authority-router-routing-routing-protocol-neighbor-transport-bgp-service-generation-neighbor-vrf) | Name of the neighbor&#x27;s VRF in which the peer BGP instance resides. Can be &#x27;default&#x27;. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`same-neighbor-vrf`](#configure-authority-router-routing-routing-protocol-neighbor-transport-bgp-service-generation-same-neighbor-vrf) | Generate BGP service if there is a matching peer with a BGP instance within the same VRF. |
| `show` | Show configuration data for &#x27;bgp-service-generation&#x27; |

## `configure authority router routing routing-protocol neighbor transport bgp-service-generation disabled`

Do not generate a BGP service or service routes.

#### Usage

```
configure authority router routing routing-protocol neighbor transport bgp-service-generation disabled
```

## `configure authority router routing routing-protocol neighbor transport bgp-service-generation neighbor-vrf`

Name of the neighbor&#x27;s VRF in which the peer BGP instance resides. Can be &#x27;default&#x27;.

#### Usage

```
configure authority router routing routing-protocol neighbor transport bgp-service-generation neighbor-vrf [<vrf-name-or-default-vrf>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vrf-name-or-default-vrf | The value to set for this field |

## `configure authority router routing routing-protocol neighbor transport bgp-service-generation same-neighbor-vrf`

Generate BGP service if there is a matching peer with a BGP instance within the same VRF.

#### Usage

```
configure authority router routing routing-protocol neighbor transport bgp-service-generation same-neighbor-vrf
```

## `configure authority router routing routing-protocol neighbor transport local-address`

Set the source IP address to be used for the BGP peering session. This must be expressed as a reference to the name of a routing interface or network interface.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-routing-protocol-neighbor-transport-local-address-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-routing-protocol-neighbor-transport-local-address-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-routing-protocol-neighbor-transport-local-address-routing-interface) | Configure Routing Interface |
| `show` | Show configuration data for &#x27;local-address&#x27; |

## `configure authority router routing routing-protocol neighbor transport local-address interface`

Network interface name

#### Usage

```
configure authority router routing routing-protocol neighbor transport local-address interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor transport local-address node`

Interface node name

#### Usage

```
configure authority router routing routing-protocol neighbor transport local-address node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor transport local-address routing-interface`

Configure Routing Interface

#### Usage

```
configure authority router routing routing-protocol neighbor transport local-address routing-interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing routing-protocol neighbor transport passive-mode`

Wait for neighbors to issue requests to open a BGP session, rather than initiating sessions from the local router.

#### Usage

```
configure authority router routing routing-protocol neighbor transport passive-mode [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol redistribute`

List of routing protocols to redistribute into BGP

#### Usage

```
configure authority router routing routing-protocol redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into BGP |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-routing-protocol-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-routing-protocol-redistribute-protocol) | The routing protocol to redistribute into BGP |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing routing-protocol redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing routing-protocol redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing routing-protocol redistribute protocol`

The routing protocol to redistribute into BGP

#### Usage

```
configure authority router routing routing-protocol redistribute protocol [<redistribute-into-bgp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-bgp | The value to set for this field |

## `configure authority router routing routing-protocol route-reflector-allow-outbound-policy`

Apply outbound policy on route reflector clients.

#### Usage

```
configure authority router routing routing-protocol route-reflector-allow-outbound-policy [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol route-selection-options`

Set of configuration options that govern best path selection.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`always-compare-med`](#configure-authority-router-routing-routing-protocol-route-selection-options-always-compare-med) | Compare multi-exit discriminator (MED) value from different ASes when selecting the best route. The default behavior is to only compare MEDs for paths received from the same AS. |
| `delete` | Delete configuration data |
| [`external-compare-router-id`](#configure-authority-router-routing-routing-protocol-route-selection-options-external-compare-router-id) | When comparing similar routes received from external BGP neighbors, use the router-id as a criterion to select the active path. |
| [`ignore-as-path-length`](#configure-authority-router-routing-routing-protocol-route-selection-options-ignore-as-path-length) | Ignore the AS path length when selecting the best path. The default is to use the AS path length and prefer paths with shorter length. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;route-selection-options&#x27; |

## `configure authority router routing routing-protocol route-selection-options always-compare-med`

Compare multi-exit discriminator (MED) value from different ASes when selecting the best route. The default behavior is to only compare MEDs for paths received from the same AS.

#### Usage

```
configure authority router routing routing-protocol route-selection-options always-compare-med [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol route-selection-options external-compare-router-id`

When comparing similar routes received from external BGP neighbors, use the router-id as a criterion to select the active path.

#### Usage

```
configure authority router routing routing-protocol route-selection-options external-compare-router-id [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol route-selection-options ignore-as-path-length`

Ignore the AS path length when selecting the best path. The default is to use the AS path length and prefer paths with shorter length.

#### Usage

```
configure authority router routing routing-protocol route-selection-options ignore-as-path-length [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing routing-protocol router-id`

Router id of the router, expressed as an 32-bit value, IPv4 address.

#### Usage

```
configure authority router routing routing-protocol router-id [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority router routing routing-protocol timers`

Config parameters related to timers associated with the BGP neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-routing-protocol-timers-hold-time) | Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval. |
| [`keepalive-interval`](#configure-authority-router-routing-routing-protocol-timers-keepalive-interval) | Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |

## `configure authority router routing routing-protocol timers hold-time`

Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval.

#### Usage

```
configure authority router routing routing-protocol timers hold-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol timers keepalive-interval`

Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller.

#### Usage

```
configure authority router routing routing-protocol timers keepalive-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing routing-protocol type`

Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity.

#### Usage

```
configure authority router routing routing-protocol type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority router routing service-admin-distance`

Administrative distance for routes generated from services.

#### Usage

```
configure authority router routing service-admin-distance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing static-route`

A list of static routes. The sub-element that allows administrators to configure static routes, that will be entered into the SSR&#x27;s Routing Information Base (RIB).

#### Usage

```
configure authority router routing static-route <destination-prefix> <distance>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-prefix | IPv4 or IPv6 destination prefix that must be unicast. |
| distance | Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-static-route-description) | Textual description of the route. |
| [`destination-prefix`](#configure-authority-router-routing-static-route-destination-prefix) | IPv4 or IPv6 destination prefix that must be unicast. |
| [`distance`](#configure-authority-router-routing-static-route-distance) | Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources. |
| [`next-hop`](#configure-authority-router-routing-static-route-next-hop) | List of next-hops. An empty list creates a blackhole route. |
| [`next-hop-interface`](#configure-authority-router-routing-static-route-next-hop-interface) | List of next-hop interfaces. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router routing static-route description`

Textual description of the route.

#### Usage

```
configure authority router routing static-route description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing static-route destination-prefix`

IPv4 or IPv6 destination prefix that must be unicast.

#### Usage

```
configure authority router routing static-route destination-prefix [<unicast-ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ip-prefix | The value to set for this field |

## `configure authority router routing static-route distance`

Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources.

#### Usage

```
configure authority router routing static-route distance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing static-route next-hop`

List of next-hops. An empty list creates a blackhole route.

#### Usage

```
configure authority router routing static-route next-hop [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router routing static-route next-hop-interface`

List of next-hop interfaces.

#### Usage

```
configure authority router routing static-route next-hop-interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`interface`](#configure-authority-router-routing-static-route-next-hop-interface-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-static-route-next-hop-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;next-hop-interface&#x27; |

## `configure authority router routing static-route next-hop-interface interface`

Network interface name

#### Usage

```
configure authority router routing static-route next-hop-interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing static-route next-hop-interface node`

Interface node name

#### Usage

```
configure authority router routing static-route next-hop-interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing type`

The type of the routing instance.

#### Usage

```
configure authority router routing type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority router routing vrf`

A list of virtual router and forward instances (VRF&#x27;s).

#### Usage

```
configure authority router routing vrf <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the VRF. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-vrf-description) | Textual description of the VRF instance. |
| [`igmp`](#configure-authority-router-routing-vrf-igmp) | IGMP VRF configuration |
| [`interface`](#configure-authority-router-routing-vrf-interface) | Internal loopback interface used for routing protocols |
| [`msdp`](#configure-authority-router-routing-vrf-msdp) | MSDP configuration |
| [`name`](#configure-authority-router-routing-vrf-name) | The name of the VRF. |
| [`ospf`](#configure-authority-router-routing-vrf-ospf) | OSPF instance configuration |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`pim`](#configure-authority-router-routing-vrf-pim) | PIM VRF configuration |
| [`routing-protocol`](#configure-authority-router-routing-vrf-routing-protocol) | Each entry contains configuration of a routing protocol instance. |
| [`service-admin-distance`](#configure-authority-router-routing-vrf-service-admin-distance) | Administrative distance for routes generated from services. |
| `show` | Show configuration data for &#x27;vrf&#x27; |
| [`static-route`](#configure-authority-router-routing-vrf-static-route) | A list of static routes. The sub-element that allows administrators to configure static routes, that will be entered into the SSR&#x27;s Routing Information Base (RIB). |
| [`tenant-name`](#configure-authority-router-routing-vrf-tenant-name) | List of tenants in this VRF. |

## `configure authority router routing vrf description`

Textual description of the VRF instance.

#### Usage

```
configure authority router routing vrf description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing vrf igmp`

IGMP VRF configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-vrf-igmp-interface) | List of IGMP interfaces |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;igmp&#x27; |

## `configure authority router routing vrf igmp interface`

List of IGMP interfaces

#### Usage

```
configure authority router routing vrf igmp interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-vrf-igmp-interface-interface) | Network interface name |
| [`join`](#configure-authority-router-routing-vrf-igmp-interface-join) | List of Groups to join |
| [`node`](#configure-authority-router-routing-vrf-igmp-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |
| [`version`](#configure-authority-router-routing-vrf-igmp-interface-version) | IGMP Version |

## `configure authority router routing vrf igmp interface interface`

Network interface name

#### Usage

```
configure authority router routing vrf igmp interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf igmp interface join`

List of Groups to join

#### Usage

```
configure authority router routing vrf igmp interface join <group>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group | IPv4 address of the Group to Join |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group`](#configure-authority-router-routing-vrf-igmp-interface-join-group) | IPv4 address of the Group to Join |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;join&#x27; |
| [`source`](#configure-authority-router-routing-vrf-igmp-interface-join-source) | IPv4 address of the Source to Join |

## `configure authority router routing vrf igmp interface join group`

IPv4 address of the Group to Join

#### Usage

```
configure authority router routing vrf igmp interface join group [<multicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf igmp interface join source`

IPv4 address of the Source to Join

#### Usage

```
configure authority router routing vrf igmp interface join source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf igmp interface node`

Interface node name

#### Usage

```
configure authority router routing vrf igmp interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf igmp interface version`

IGMP Version

#### Usage

```
configure authority router routing vrf igmp interface version [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf interface`

Internal loopback interface used for routing protocols

#### Usage

```
configure authority router routing vrf interface <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-routing-vrf-interface-enabled) | Administratively enable/disable the interface. |
| [`ip-address`](#configure-authority-router-routing-vrf-interface-ip-address) | The IP address of the interface. |
| [`name`](#configure-authority-router-routing-vrf-interface-name) | An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing vrf interface enabled`

Administratively enable/disable the interface.

#### Usage

```
configure authority router routing vrf interface enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf interface ip-address`

The IP address of the interface.

#### Usage

```
configure authority router routing vrf interface ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router routing vrf interface name`

An arbitrary, unique name for the routing interface, used to reference it in other routing configuration sections.

#### Usage

```
configure authority router routing vrf interface name [<bridge-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| bridge-name | The value to set for this field |

## `configure authority router routing vrf msdp`

MSDP configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`mesh-group`](#configure-authority-router-routing-vrf-msdp-mesh-group) | MSDP Mesh-Group Configuration |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-routing-vrf-msdp-peer) | MSDP Peer Configuration |
| `show` | Show configuration data for &#x27;msdp&#x27; |

## `configure authority router routing vrf msdp mesh-group`

MSDP Mesh-Group Configuration

#### Usage

```
configure authority router routing vrf msdp mesh-group <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the Mesh-Group |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`member`](#configure-authority-router-routing-vrf-msdp-mesh-group-member) | IPv4 address of the Mesh-group member |
| [`name`](#configure-authority-router-routing-vrf-msdp-mesh-group-name) | Name of the Mesh-Group |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;mesh-group&#x27; |
| [`source`](#configure-authority-router-routing-vrf-msdp-mesh-group-source) | Source Address for the mesh-group |

## `configure authority router routing vrf msdp mesh-group member`

IPv4 address of the Mesh-group member

#### Usage

```
configure authority router routing vrf msdp mesh-group member [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | Value to add to this list |

## `configure authority router routing vrf msdp mesh-group name`

Name of the Mesh-Group

#### Usage

```
configure authority router routing vrf msdp mesh-group name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router routing vrf msdp mesh-group source`

Source Address for the mesh-group

#### Usage

```
configure authority router routing vrf msdp mesh-group source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf msdp peer`

MSDP Peer Configuration

#### Usage

```
configure authority router routing vrf msdp peer <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | IPv4 address of the Peer |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-routing-vrf-msdp-peer-address) | IPv4 address of the Peer |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;peer&#x27; |
| [`source`](#configure-authority-router-routing-vrf-msdp-peer-source) | Source Address for the peer adjacency |

## `configure authority router routing vrf msdp peer address`

IPv4 address of the Peer

#### Usage

```
configure authority router routing vrf msdp peer address [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf msdp peer source`

Source Address for the peer adjacency

#### Usage

```
configure authority router routing vrf msdp peer source [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf name`

The name of the VRF.

#### Usage

```
configure authority router routing vrf name [<vrf-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vrf-name | The value to set for this field |

## `configure authority router routing vrf ospf`

OSPF instance configuration

#### Usage

```
configure authority router routing vrf ospf <instance>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| instance | Number of OSPF instance |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertise-default`](#configure-authority-router-routing-vrf-ospf-advertise-default) | Advertise default route into OSPF |
| [`area`](#configure-authority-router-routing-vrf-ospf-area) | List of OSPF areas |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`distance`](#configure-authority-router-routing-vrf-ospf-distance) | OSPF route administrative distance |
| [`instance`](#configure-authority-router-routing-vrf-ospf-instance) | Number of OSPF instance |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-vrf-ospf-redistribute) | List of routing protocols to redistribute into OSPF |
| [`router-id`](#configure-authority-router-routing-vrf-ospf-router-id) | Defined in RFC 2328. A 32-bit number that uniquely identifies the router |
| `show` | Show configuration data for &#x27;ospf&#x27; |
| [`timers`](#configure-authority-router-routing-vrf-ospf-timers) | OSPF Timers |

## `configure authority router routing vrf ospf advertise-default`

Advertise default route into OSPF

##### Subcommands

| command | description |
| ------- | ----------- |
| [`always`](#configure-authority-router-routing-vrf-ospf-advertise-default-always) | Advertise default route into OSPF even when there is no default route in the routing table |
| `delete` | Delete configuration data |
| [`metric`](#configure-authority-router-routing-vrf-ospf-advertise-default-metric) | Advertised metric of the default route |
| [`metric-type`](#configure-authority-router-routing-vrf-ospf-advertise-default-metric-type) | Advertised metric type of default route |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-vrf-ospf-advertise-default-policy) | A policy to apply to the default route |
| `show` | Show configuration data for &#x27;advertise-default&#x27; |

## `configure authority router routing vrf ospf advertise-default always`

Advertise default route into OSPF even when there is no default route in the routing table

#### Usage

```
configure authority router routing vrf ospf advertise-default always [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf ospf advertise-default metric`

Advertised metric of the default route

#### Usage

```
configure authority router routing vrf ospf advertise-default metric [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing vrf ospf advertise-default metric-type`

Advertised metric type of default route

#### Usage

```
configure authority router routing vrf ospf advertise-default metric-type [<ospf-external-metric-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ospf-external-metric-type | The value to set for this field |

## `configure authority router routing vrf ospf advertise-default policy`

A policy to apply to the default route

#### Usage

```
configure authority router routing vrf ospf advertise-default policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf ospf area`

List of OSPF areas

#### Usage

```
configure authority router routing vrf ospf area <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Area ID |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-routing-vrf-ospf-area-authentication-type) | Area authentication type |
| `clone` | Clone a list item |
| [`default-cost`](#configure-authority-router-routing-vrf-ospf-area-default-cost) | Set the summary default route cost for a stub or NSSA area. |
| `delete` | Delete configuration data |
| [`id`](#configure-authority-router-routing-vrf-ospf-area-id) | Area ID |
| [`interface`](#configure-authority-router-routing-vrf-ospf-area-interface) | List of interfaces in area |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-vrf-ospf-area-routing-interface) | List of routing interfaces in area |
| `show` | Show configuration data for &#x27;area&#x27; |
| [`summary-advertisement`](#configure-authority-router-routing-vrf-ospf-area-summary-advertisement) | Enable/Disable summary advertisement into the stub or NSSA area. |
| [`summary-range`](#configure-authority-router-routing-vrf-ospf-area-summary-range) | Summarize routes matching address/mask - Applicable to Area Border Routers (ABRs) only |
| [`type`](#configure-authority-router-routing-vrf-ospf-area-type) | Area type |

## `configure authority router routing vrf ospf area authentication-type`

Area authentication type

#### Usage

```
configure authority router routing vrf ospf area authentication-type [<area-authentication-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-authentication-type | The value to set for this field |

## `configure authority router routing vrf ospf area default-cost`

Set the summary default route cost for a stub or NSSA area.

#### Usage

```
configure authority router routing vrf ospf area default-cost [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing vrf ospf area id`

Area ID

#### Usage

```
configure authority router routing vrf ospf area id [<area-id-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-id-type | The value to set for this field |

## `configure authority router routing vrf ospf area interface`

List of interfaces in area

#### Usage

```
configure authority router routing vrf ospf area interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-type`](#configure-authority-router-routing-vrf-ospf-area-interface-authentication-type) | OSPF interface authentication type. |
| [`bfd`](#configure-authority-router-routing-vrf-ospf-area-interface-bfd) | BFD Client Configuration. |
| `clone` | Clone a list item |
| [`cost`](#configure-authority-router-routing-vrf-ospf-area-interface-cost) | Interface cost |
| [`dead-interval`](#configure-authority-router-routing-vrf-ospf-area-interface-dead-interval) | Interval after which a neighbor is declared down (seconds) if hello packets are not received. |
| `delete` | Delete configuration data |
| [`hello-interval`](#configure-authority-router-routing-vrf-ospf-area-interface-hello-interval) | Interval between hello packets (seconds). |
| [`interface`](#configure-authority-router-routing-vrf-ospf-area-interface-interface) | Network interface name |
| [`message-digest-key`](#configure-authority-router-routing-vrf-ospf-area-interface-message-digest-key) | MD5 HMAC authentication message digest keys |
| [`network-type`](#configure-authority-router-routing-vrf-ospf-area-interface-network-type) | Interface network type |
| [`node`](#configure-authority-router-routing-vrf-ospf-area-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`passive`](#configure-authority-router-routing-vrf-ospf-area-interface-passive) | Enable/Disable passive interface - a passive interface&#x27;s prefix will be advertised but no neighbor adjacencies will be formed on the interface. |
| [`password`](#configure-authority-router-routing-vrf-ospf-area-interface-password) | OSPF simple authentication password |
| [`priority`](#configure-authority-router-routing-vrf-ospf-area-interface-priority) | Router priority |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing vrf ospf area interface authentication-type`

OSPF interface authentication type.

#### Usage

```
configure authority router routing vrf ospf area interface authentication-type [<interface-authentication-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| interface-authentication-type | The value to set for this field |

## `configure authority router routing vrf ospf area interface bfd`

BFD Client Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-routing-vrf-ospf-area-interface-bfd-desired-tx-interval) | The minimum transmission interval in milliseconds used to send BFD control packets. |
| [`enable`](#configure-authority-router-routing-vrf-ospf-area-interface-bfd-enable) | Enable/Disable BFD protocol |
| [`multiplier`](#configure-authority-router-routing-vrf-ospf-area-interface-bfd-multiplier) | The number of BFD packets that can be lost without the BFD session declared as down. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-routing-vrf-ospf-area-interface-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing vrf ospf area interface bfd desired-tx-interval`

The minimum transmission interval in milliseconds used to send BFD control packets.

#### Usage

```
configure authority router routing vrf ospf area interface bfd desired-tx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf ospf area interface bfd enable`

Enable/Disable BFD protocol

#### Usage

```
configure authority router routing vrf ospf area interface bfd enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf ospf area interface bfd multiplier`

The number of BFD packets that can be lost without the BFD session declared as down.

#### Usage

```
configure authority router routing vrf ospf area interface bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf area interface bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router routing vrf ospf area interface bfd required-min-rx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf ospf area interface cost`

Interface cost

#### Usage

```
configure authority router routing vrf ospf area interface cost [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router routing vrf ospf area interface dead-interval`

Interval after which a neighbor is declared down (seconds) if hello packets are not received.

#### Usage

```
configure authority router routing vrf ospf area interface dead-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf ospf area interface hello-interval`

Interval between hello packets (seconds).

#### Usage

```
configure authority router routing vrf ospf area interface hello-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf ospf area interface interface`

Network interface name

#### Usage

```
configure authority router routing vrf ospf area interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf ospf area interface message-digest-key`

MD5 HMAC authentication message digest keys

#### Usage

```
configure authority router routing vrf ospf area interface message-digest-key <id>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Message digest key identifier |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`id`](#configure-authority-router-routing-vrf-ospf-area-interface-message-digest-key-id) | Message digest key identifier |
| [`key`](#configure-authority-router-routing-vrf-ospf-area-interface-message-digest-key-key) | Message digest secret key |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;message-digest-key&#x27; |

## `configure authority router routing vrf ospf area interface message-digest-key id`

Message digest key identifier

#### Usage

```
configure authority router routing vrf ospf area interface message-digest-key id [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf area interface message-digest-key key`

Message digest secret key

#### Usage

```
configure authority router routing vrf ospf area interface message-digest-key key [<routing-password-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-password-type | The value to set for this field |

## `configure authority router routing vrf ospf area interface network-type`

Interface network type

#### Usage

```
configure authority router routing vrf ospf area interface network-type [<interface-network-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| interface-network-type | The value to set for this field |

## `configure authority router routing vrf ospf area interface node`

Interface node name

#### Usage

```
configure authority router routing vrf ospf area interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf ospf area interface passive`

Enable/Disable passive interface - a passive interface&#x27;s prefix will be advertised but no neighbor adjacencies will be formed on the interface.

#### Usage

```
configure authority router routing vrf ospf area interface passive [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf ospf area interface password`

OSPF simple authentication password

#### Usage

```
configure authority router routing vrf ospf area interface password [<routing-password-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-password-type | The value to set for this field |

## `configure authority router routing vrf ospf area interface priority`

Router priority

#### Usage

```
configure authority router routing vrf ospf area interface priority [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf area routing-interface`

List of routing interfaces in area

#### Usage

```
configure authority router routing vrf ospf area routing-interface <routing-interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| routing-interface | Routing interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`cost`](#configure-authority-router-routing-vrf-ospf-area-routing-interface-cost) | Interface cost |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-vrf-ospf-area-routing-interface-routing-interface) | Routing interface name |
| `show` | Show configuration data for &#x27;routing-interface&#x27; |

## `configure authority router routing vrf ospf area routing-interface cost`

Interface cost

#### Usage

```
configure authority router routing vrf ospf area routing-interface cost [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

## `configure authority router routing vrf ospf area routing-interface routing-interface`

Routing interface name

#### Usage

```
configure authority router routing vrf ospf area routing-interface routing-interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf ospf area summary-advertisement`

Enable/Disable summary advertisement into the stub or NSSA area.

#### Usage

```
configure authority router routing vrf ospf area summary-advertisement [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf ospf area summary-range`

Summarize routes matching address/mask - Applicable to Area Border Routers (ABRs) only

#### Usage

```
configure authority router routing vrf ospf area summary-range <prefix>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | Summarization prefix |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertise`](#configure-authority-router-routing-vrf-ospf-area-summary-range-advertise) | Advertise or hide |
| [`cost`](#configure-authority-router-routing-vrf-ospf-area-summary-range-cost) | Advertised cost of summary route |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-vrf-ospf-area-summary-range-prefix) | Summarization prefix |
| `show` | Show configuration data for &#x27;summary-range&#x27; |

## `configure authority router routing vrf ospf area summary-range advertise`

Advertise or hide

#### Usage

```
configure authority router routing vrf ospf area summary-range advertise [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf ospf area summary-range cost`

Advertised cost of summary route

#### Usage

```
configure authority router routing vrf ospf area summary-range cost [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing vrf ospf area summary-range prefix`

Summarization prefix

#### Usage

```
configure authority router routing vrf ospf area summary-range prefix [<ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-prefix | The value to set for this field |

## `configure authority router routing vrf ospf area type`

Area type

#### Usage

```
configure authority router routing vrf ospf area type [<area-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| area-type | The value to set for this field |

## `configure authority router routing vrf ospf distance`

OSPF route administrative distance

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`external`](#configure-authority-router-routing-vrf-ospf-distance-external) | Administrative distance for external OSPF routes |
| [`inter-area`](#configure-authority-router-routing-vrf-ospf-distance-inter-area) | Administrative distance for inter-area OSPF routes |
| [`intra-area`](#configure-authority-router-routing-vrf-ospf-distance-intra-area) | Administrative distance for intra-area OSPF routes |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;distance&#x27; |

## `configure authority router routing vrf ospf distance external`

Administrative distance for external OSPF routes

#### Usage

```
configure authority router routing vrf ospf distance external [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf distance inter-area`

Administrative distance for inter-area OSPF routes

#### Usage

```
configure authority router routing vrf ospf distance inter-area [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf distance intra-area`

Administrative distance for intra-area OSPF routes

#### Usage

```
configure authority router routing vrf ospf distance intra-area [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf instance`

Number of OSPF instance

#### Usage

```
configure authority router routing vrf ospf instance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf ospf redistribute`

List of routing protocols to redistribute into OSPF

#### Usage

```
configure authority router routing vrf ospf redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into OSPF |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`metric`](#configure-authority-router-routing-vrf-ospf-redistribute-metric) | Advertised metric of redistributed route |
| [`metric-type`](#configure-authority-router-routing-vrf-ospf-redistribute-metric-type) | Advertised metric type of redistributed route |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-vrf-ospf-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-vrf-ospf-redistribute-protocol) | The routing protocol to redistribute into OSPF |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing vrf ospf redistribute metric`

Advertised metric of redistributed route

#### Usage

```
configure authority router routing vrf ospf redistribute metric [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing vrf ospf redistribute metric-type`

Advertised metric type of redistributed route

#### Usage

```
configure authority router routing vrf ospf redistribute metric-type [<ospf-external-metric-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ospf-external-metric-type | The value to set for this field |

## `configure authority router routing vrf ospf redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing vrf ospf redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf ospf redistribute protocol`

The routing protocol to redistribute into OSPF

#### Usage

```
configure authority router routing vrf ospf redistribute protocol [<redistribute-into-ospf>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-ospf | The value to set for this field |

## `configure authority router routing vrf ospf router-id`

Defined in RFC 2328. A 32-bit number that uniquely identifies the router

#### Usage

```
configure authority router routing vrf ospf router-id [<dotted-quad>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dotted-quad | The value to set for this field |

## `configure authority router routing vrf ospf timers`

OSPF Timers

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |
| [`spf`](#configure-authority-router-routing-vrf-ospf-timers-spf) | OSPF SPF Timers |

## `configure authority router routing vrf ospf timers spf`

OSPF SPF Timers

##### Subcommands

| command | description |
| ------- | ----------- |
| [`delay`](#configure-authority-router-routing-vrf-ospf-timers-spf-delay) | Initial SPF delay. |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-vrf-ospf-timers-spf-hold-time) | Adaptive hold-time. |
| [`maximum-hold-time`](#configure-authority-router-routing-vrf-ospf-timers-spf-maximum-hold-time) | Maximum hold-time. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;spf&#x27; |

## `configure authority router routing vrf ospf timers spf delay`

Initial SPF delay.

#### Usage

```
configure authority router routing vrf ospf timers spf delay [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf ospf timers spf hold-time`

Adaptive hold-time.

#### Usage

```
configure authority router routing vrf ospf timers spf hold-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf ospf timers spf maximum-hold-time`

Maximum hold-time.

#### Usage

```
configure authority router routing vrf ospf timers spf maximum-hold-time [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf pim`

PIM VRF configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-vrf-pim-interface) | List of PIM interfaces in the VRF |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rp`](#configure-authority-router-routing-vrf-pim-rp) | PIM RP Configuration |
| `show` | Show configuration data for &#x27;pim&#x27; |

## `configure authority router routing vrf pim interface`

List of PIM interfaces in the VRF

#### Usage

```
configure authority router routing vrf pim interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`dr-priority`](#configure-authority-router-routing-vrf-pim-interface-dr-priority) | Preference of a particular device in the DR election process. The lowest priority is 1. |
| [`hello-interval`](#configure-authority-router-routing-vrf-pim-interface-hello-interval) | Configure Hello Interval |
| [`interface`](#configure-authority-router-routing-vrf-pim-interface-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-vrf-pim-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing vrf pim interface dr-priority`

Preference of a particular device in the DR election process. The lowest priority is 1.

#### Usage

```
configure authority router routing vrf pim interface dr-priority [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router routing vrf pim interface hello-interval`

Configure Hello Interval

#### Usage

```
configure authority router routing vrf pim interface hello-interval [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf pim interface interface`

Network interface name

#### Usage

```
configure authority router routing vrf pim interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf pim interface node`

Interface node name

#### Usage

```
configure authority router routing vrf pim interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf pim rp`

PIM RP Configuration

#### Usage

```
configure authority router routing vrf pim rp <group-range>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group-range | Multicast Group address range for this RP |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-routing-vrf-pim-rp-address) | IPv4 address of the RP |
| `delete` | Delete configuration data |
| [`group-range`](#configure-authority-router-routing-vrf-pim-rp-group-range) | Multicast Group address range for this RP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rp&#x27; |

## `configure authority router routing vrf pim rp address`

IPv4 address of the RP

#### Usage

```
configure authority router routing vrf pim rp address [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf pim rp group-range`

Multicast Group address range for this RP

#### Usage

```
configure authority router routing vrf pim rp group-range [<multicast-ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-prefix | The value to set for this field |

## `configure authority router routing vrf pim`

PIM VRF configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-vrf-pim-interface) | List of PIM interfaces in the VRF |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rp`](#configure-authority-router-routing-vrf-pim-rp) | PIM RP Configuration |
| `show` | Show configuration data for &#x27;pim&#x27; |

## `configure authority router routing vrf pim interface`

List of PIM interfaces in the VRF

#### Usage

```
configure authority router routing vrf pim interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`interface`](#configure-authority-router-routing-vrf-pim-interface-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-vrf-pim-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;interface&#x27; |

## `configure authority router routing vrf pim interface interface`

Network interface name

#### Usage

```
configure authority router routing vrf pim interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf pim interface node`

Interface node name

#### Usage

```
configure authority router routing vrf pim interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf pim rp`

PIM RP Configuration

#### Usage

```
configure authority router routing vrf pim rp <group-range>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| group-range | Multicast Group address range for this RP |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-routing-vrf-pim-rp-address) | IPv4 address of the RP |
| `delete` | Delete configuration data |
| [`group-range`](#configure-authority-router-routing-vrf-pim-rp-group-range) | Multicast Group address range for this RP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;rp&#x27; |

## `configure authority router routing vrf pim rp address`

IPv4 address of the RP

#### Usage

```
configure authority router routing vrf pim rp address [<unicast-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ipv4-address | The value to set for this field |

## `configure authority router routing vrf pim rp group-range`

Multicast Group address range for this RP

#### Usage

```
configure authority router routing vrf pim rp group-range [<multicast-ipv4-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| multicast-ipv4-prefix | The value to set for this field |

## `configure authority router routing vrf routing-protocol`

Each entry contains configuration of a routing protocol instance.

#### Usage

```
configure authority router routing vrf routing-protocol <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address-family`](#configure-authority-router-routing-vrf-routing-protocol-address-family) | Address family configuration |
| `clone` | Clone a list item |
| [`cluster-id`](#configure-authority-router-routing-vrf-routing-protocol-cluster-id) | Route reflector cluster id. |
| [`conditional-advertisement`](#configure-authority-router-routing-vrf-routing-protocol-conditional-advertisement) | Configure Conditional Advertisement |
| [`confederation`](#configure-authority-router-routing-vrf-routing-protocol-confederation) | Configuration options specifying parameters when the local router is within an autonomous system which is part of a BGP confederation. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-vrf-routing-protocol-description) | Textual description of the routing protocol instance. |
| [`graceful-restart`](#configure-authority-router-routing-vrf-routing-protocol-graceful-restart) | Configuration parameters relating to BGP graceful restart. |
| [`local-as`](#configure-authority-router-routing-vrf-routing-protocol-local-as) | Local autonomous system number of the router. Uses the 32-bit as-number type from the model in RFC 6991. |
| [`neighbor`](#configure-authority-router-routing-vrf-routing-protocol-neighbor) | List of BGP neighbors configured on the local system, uniquely identified by neighbor IPv[46] address |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-vrf-routing-protocol-redistribute) | List of routing protocols to redistribute into BGP |
| [`route-reflector-allow-outbound-policy`](#configure-authority-router-routing-vrf-routing-protocol-route-reflector-allow-outbound-policy) | Apply outbound policy on route reflector clients. |
| [`route-selection-options`](#configure-authority-router-routing-vrf-routing-protocol-route-selection-options) | Set of configuration options that govern best path selection. |
| [`router-id`](#configure-authority-router-routing-vrf-routing-protocol-router-id) | Router id of the router, expressed as an 32-bit value, IPv4 address. |
| `show` | Show configuration data for &#x27;routing-protocol&#x27; |
| [`timers`](#configure-authority-router-routing-vrf-routing-protocol-timers) | Config parameters related to timers associated with the BGP neighbor |
| [`type`](#configure-authority-router-routing-vrf-routing-protocol-type) | Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity. |

## `configure authority router routing vrf routing-protocol address-family`

Address family configuration

#### Usage

```
configure authority router routing vrf routing-protocol address-family <afi-safi>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`afi-safi`](#configure-authority-router-routing-vrf-routing-protocol-address-family-afi-safi) | Address family type |
| [`aggregate-address`](#configure-authority-router-routing-vrf-routing-protocol-address-family-aggregate-address) | Address prefixes to aggregate |
| `clone` | Clone a list item |
| [`default-route-distance`](#configure-authority-router-routing-vrf-routing-protocol-address-family-default-route-distance) | Configuration options relating to the administrative distance (or preference) assigned to routes received from different sources (external, internal, and local). |
| `delete` | Delete configuration data |
| [`graceful-restart`](#configure-authority-router-routing-vrf-routing-protocol-address-family-graceful-restart) | Configuration parameters relating to BGP graceful restart. |
| [`network`](#configure-authority-router-routing-vrf-routing-protocol-address-family-network) | Advertises a network into BGP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`redistribute`](#configure-authority-router-routing-vrf-routing-protocol-address-family-redistribute) | List of routing protocols to redistribute into BGP |
| `show` | Show configuration data for &#x27;address-family&#x27; |
| [`use-multiple-paths`](#configure-authority-router-routing-vrf-routing-protocol-address-family-use-multiple-paths) | Parameters related to the use of multiple paths for the same NLRI |
| [`vpn-export`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-export) | Configure Vpn Export |
| [`vpn-import`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-import) | Configure Vpn Import |

## `configure authority router routing vrf routing-protocol address-family afi-safi`

Address family type

#### Usage

```
configure authority router routing vrf routing-protocol address-family afi-safi [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

`identityref`
A value as defined below:

| name | description |
| ---- | ----------- |
| ipv4-unicast | IPv4 unicast (AFI,SAFI = 1,1) |
| ipv6-unicast | IPv6 unicast (AFI,SAFI = 2,1) |
| ipv4-vpn | IPv4 vpn (AFI,SAFI = 1,128) |
| ipv6-vpn | IPv6 vpn (AFI,SAFI = 2,128) |

## `configure authority router routing vrf routing-protocol address-family aggregate-address`

Address prefixes to aggregate

#### Usage

```
configure authority router routing vrf routing-protocol address-family aggregate-address <prefix>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | The prefix to aggregate from |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`as-set`](#configure-authority-router-routing-vrf-routing-protocol-address-family-aggregate-address-as-set) | Generate as-set information for the resultant aggregate |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-router-routing-vrf-routing-protocol-address-family-aggregate-address-prefix) | The prefix to aggregate from |
| `show` | Show configuration data for &#x27;aggregate-address&#x27; |
| [`summary-only`](#configure-authority-router-routing-vrf-routing-protocol-address-family-aggregate-address-summary-only) | Specifies that the prefixes aggregated by this aggregation are not to be advertised: only the aggregate itself will be advertised |

## `configure authority router routing vrf routing-protocol address-family aggregate-address as-set`

Generate as-set information for the resultant aggregate

#### Usage

```
configure authority router routing vrf routing-protocol address-family aggregate-address as-set [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family aggregate-address prefix`

The prefix to aggregate from

#### Usage

```
configure authority router routing vrf routing-protocol address-family aggregate-address prefix [<not-host-ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| not-host-ip-prefix | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family aggregate-address summary-only`

Specifies that the prefixes aggregated by this aggregation are not to be advertised: only the aggregate itself will be advertised

#### Usage

```
configure authority router routing vrf routing-protocol address-family aggregate-address summary-only [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family default-route-distance`

Configuration options relating to the administrative distance (or preference) assigned to routes received from different sources (external, internal, and local).

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`external`](#configure-authority-router-routing-vrf-routing-protocol-address-family-default-route-distance-external) | Administrative distance for routes learned from external BGP (eBGP). |
| [`internal`](#configure-authority-router-routing-vrf-routing-protocol-address-family-default-route-distance-internal) | Administrative distance for routes learned from internal BGP (iBGP). |
| [`local`](#configure-authority-router-routing-vrf-routing-protocol-address-family-default-route-distance-local) | Administrative distance for local routes |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;default-route-distance&#x27; |

## `configure authority router routing vrf routing-protocol address-family default-route-distance external`

Administrative distance for routes learned from external BGP (eBGP).

#### Usage

```
configure authority router routing vrf routing-protocol address-family default-route-distance external [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family default-route-distance internal`

Administrative distance for routes learned from internal BGP (iBGP).

#### Usage

```
configure authority router routing vrf routing-protocol address-family default-route-distance internal [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family default-route-distance local`

Administrative distance for local routes

#### Usage

```
configure authority router routing vrf routing-protocol address-family default-route-distance local [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family graceful-restart`

Configuration parameters relating to BGP graceful restart.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-time`](#configure-authority-router-routing-vrf-routing-protocol-address-family-graceful-restart-restart-time) | Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value. |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |
| [`stale-routes-time`](#configure-authority-router-routing-vrf-routing-protocol-address-family-graceful-restart-stale-routes-time) | An upper-bound on the time that the stale routes will be retained by a router after a session is restarted. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724 |

#### Description

Warning: &#x27;graceful-restart&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing vrf routing-protocol address-family graceful-restart restart-time`

Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value.

#### Usage

```
configure authority router routing vrf routing-protocol address-family graceful-restart restart-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;restart-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing vrf routing-protocol address-family graceful-restart stale-routes-time`

An upper-bound on the time that the stale routes will be retained by a router after a session is restarted. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724

#### Usage

```
configure authority router routing vrf routing-protocol address-family graceful-restart stale-routes-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;stale-routes-time&#x27; is deprecated and will be removed in a future software version

## `configure authority router routing vrf routing-protocol address-family network`

Advertises a network into BGP

#### Usage

```
configure authority router routing vrf routing-protocol address-family network <network-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| network-address | Specify a network to announce via BGP for this address family |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`network-address`](#configure-authority-router-routing-vrf-routing-protocol-address-family-network-network-address) | Specify a network to announce via BGP for this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-vrf-routing-protocol-address-family-network-policy) | a policy to apply to the imported route |
| `show` | Show configuration data for &#x27;network&#x27; |

## `configure authority router routing vrf routing-protocol address-family network network-address`

Specify a network to announce via BGP for this address family

#### Usage

```
configure authority router routing vrf routing-protocol address-family network network-address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family network policy`

a policy to apply to the imported route

#### Usage

```
configure authority router routing vrf routing-protocol address-family network policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family redistribute`

List of routing protocols to redistribute into BGP

#### Usage

```
configure authority router routing vrf routing-protocol address-family redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into BGP |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-vrf-routing-protocol-address-family-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-vrf-routing-protocol-address-family-redistribute-protocol) | The routing protocol to redistribute into BGP |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing vrf routing-protocol address-family redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing vrf routing-protocol address-family redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family redistribute protocol`

The routing protocol to redistribute into BGP

#### Usage

```
configure authority router routing vrf routing-protocol address-family redistribute protocol [<redistribute-into-bgp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-bgp | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family use-multiple-paths`

Parameters related to the use of multiple paths for the same NLRI

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`ebgp`](#configure-authority-router-routing-vrf-routing-protocol-address-family-use-multiple-paths-ebgp) | Multipath parameters for eBGP |
| [`ibgp`](#configure-authority-router-routing-vrf-routing-protocol-address-family-use-multiple-paths-ibgp) | Multipath parameters for iBGP |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;use-multiple-paths&#x27; |

## `configure authority router routing vrf routing-protocol address-family use-multiple-paths ebgp`

Multipath parameters for eBGP

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`maximum-paths`](#configure-authority-router-routing-vrf-routing-protocol-address-family-use-multiple-paths-ebgp-maximum-paths) | Maximum number of parallel paths to consider when using eBGP multipath for this address family. The default is to use a single path. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ebgp&#x27; |

## `configure authority router routing vrf routing-protocol address-family use-multiple-paths ebgp maximum-paths`

Maximum number of parallel paths to consider when using eBGP multipath for this address family. The default is to use a single path.

#### Usage

```
configure authority router routing vrf routing-protocol address-family use-multiple-paths ebgp maximum-paths [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: paths

## `configure authority router routing vrf routing-protocol address-family use-multiple-paths ibgp`

Multipath parameters for iBGP

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`maximum-paths`](#configure-authority-router-routing-vrf-routing-protocol-address-family-use-multiple-paths-ibgp-maximum-paths) | Maximum number of parallel paths to consider when using iBGP multipath for this address family. The default is to use a single path |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;ibgp&#x27; |

## `configure authority router routing vrf routing-protocol address-family use-multiple-paths ibgp maximum-paths`

Maximum number of parallel paths to consider when using iBGP multipath for this address family. The default is to use a single path

#### Usage

```
configure authority router routing vrf routing-protocol address-family use-multiple-paths ibgp maximum-paths [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: paths

## `configure authority router routing vrf routing-protocol address-family vpn-export`

Configure Vpn Export

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`export-policy`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-export-export-policy) | Export policy for vpn export |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`route-distinguisher`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-export-route-distinguisher) | Route Distinguisher for vpn export |
| `show` | Show configuration data for &#x27;vpn-export&#x27; |
| [`vpn-export-route-target`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-export-vpn-export-route-target) | Route Target list for vpn export |

## `configure authority router routing vrf routing-protocol address-family vpn-export export-policy`

Export policy for vpn export

#### Usage

```
configure authority router routing vrf routing-protocol address-family vpn-export export-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family vpn-export route-distinguisher`

Route Distinguisher for vpn export

#### Usage

```
configure authority router routing vrf routing-protocol address-family vpn-export route-distinguisher [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family vpn-export vpn-export-route-target`

Route Target list for vpn export

#### Usage

```
configure authority router routing vrf routing-protocol address-family vpn-export vpn-export-route-target [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority router routing vrf routing-protocol address-family vpn-import`

Configure Vpn Import

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`import-policy`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-import-import-policy) | Export policy for vpn import |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;vpn-import&#x27; |
| [`vpn-import-route-target`](#configure-authority-router-routing-vrf-routing-protocol-address-family-vpn-import-vpn-import-route-target) | Route Target list for vpn import |

## `configure authority router routing vrf routing-protocol address-family vpn-import import-policy`

Export policy for vpn import

#### Usage

```
configure authority router routing vrf routing-protocol address-family vpn-import import-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol address-family vpn-import vpn-import-route-target`

Route Target list for vpn import

#### Usage

```
configure authority router routing vrf routing-protocol address-family vpn-import vpn-import-route-target [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority router routing vrf routing-protocol cluster-id`

Route reflector cluster id.

#### Usage

```
configure authority router routing vrf routing-protocol cluster-id [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority router routing vrf routing-protocol conditional-advertisement`

Configure Conditional Advertisement

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interval-time`](#configure-authority-router-routing-vrf-routing-protocol-conditional-advertisement-interval-time) | Conditional advertisement scanner process interval time. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;conditional-advertisement&#x27; |

## `configure authority router routing vrf routing-protocol conditional-advertisement interval-time`

Conditional advertisement scanner process interval time.

#### Usage

```
configure authority router routing vrf routing-protocol conditional-advertisement interval-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol confederation`

Configuration options specifying parameters when the local router is within an autonomous system which is part of a BGP confederation.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`identifier`](#configure-authority-router-routing-vrf-routing-protocol-confederation-identifier) | Confederation identifier for the autonomous system. |
| [`member-as`](#configure-authority-router-routing-vrf-routing-protocol-confederation-member-as) | Remote autonomous systems that are to be treated as part of the local confederation. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;confederation&#x27; |

## `configure authority router routing vrf routing-protocol confederation identifier`

Confederation identifier for the autonomous system.

#### Usage

```
configure authority router routing vrf routing-protocol confederation identifier [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing vrf routing-protocol confederation member-as`

Remote autonomous systems that are to be treated as part of the local confederation.

#### Usage

```
configure authority router routing vrf routing-protocol confederation member-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | Value to add to this list |

## `configure authority router routing vrf routing-protocol description`

Textual description of the routing protocol instance.

#### Usage

```
configure authority router routing vrf routing-protocol description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing vrf routing-protocol graceful-restart`

Configuration parameters relating to BGP graceful restart.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-routing-vrf-routing-protocol-graceful-restart-mode) | Graceful restart mode. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-time`](#configure-authority-router-routing-vrf-routing-protocol-graceful-restart-restart-time) | Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value. |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |
| [`stale-routes-time`](#configure-authority-router-routing-vrf-routing-protocol-graceful-restart-stale-routes-time) | An upper-bound on the time that the stale routes will be retained by a router after a session is restarted or 0 to disable. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724 |

## `configure authority router routing vrf routing-protocol graceful-restart mode`

Graceful restart mode.

#### Usage

```
configure authority router routing vrf routing-protocol graceful-restart mode [<graceful-restart-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| graceful-restart-mode | The value to set for this field |

## `configure authority router routing vrf routing-protocol graceful-restart restart-time`

Estimated time for the local BGP speaker to restart a session. This value is advertised in the graceful restart BGP capability. This is a 12-bit value, referred to as Restart Time in RFC4724. Per RFC4724, the suggested default value is less than or equal to the hold-time value.

#### Usage

```
configure authority router routing vrf routing-protocol graceful-restart restart-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol graceful-restart stale-routes-time`

An upper-bound on the time that the stale routes will be retained by a router after a session is restarted or 0 to disable. If an End-of-RIB (EOR) marker is received prior to this timer expiring stale-routes will be flushed upon its receipt - if no EOR is received, then when this timer expires stale paths will be purged. This timer is referred to as the Selection_Deferral_Timer in RFC4724

#### Usage

```
configure authority router routing vrf routing-protocol graceful-restart stale-routes-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol local-as`

Local autonomous system number of the router. Uses the 32-bit as-number type from the model in RFC 6991.

#### Usage

```
configure authority router routing vrf routing-protocol local-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor`

List of BGP neighbors configured on the local system, uniquely identified by neighbor IPv[46] address

#### Usage

```
configure authority router routing vrf routing-protocol neighbor <neighbor-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor-address | IP address of the BGP neighbor |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address-family`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family) | Address family configuration |
| [`auth-password`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-auth-password) | Configures an MD5 authentication password for use with neighboring devices. |
| [`bfd`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-bfd) | BFD Client Configuration. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-description) | An optional textual description (intended primarily for use with a neighbor or group |
| [`graceful-restart`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-graceful-restart) | Configuration parameters relating to BGP neighbor graceful restart. If not explicitly configured, neighbor inherits from BGP instance. |
| [`local-as`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-local-as) | The local autonomous system number that is to be used when establishing sessions with the remote neighbor or neighbor group, if this differs from the global BGP router autonomous system number. |
| [`multihop`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-multihop) | Configuration parameters specifying the multihop behaviour for BGP sessions to the neighbor |
| [`negotiate-capabilities`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-negotiate-capabilities) | If set to false, suppress sending the Capabilities Optional Parameter in the BGP OPEN message. |
| [`neighbor-address`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-neighbor-address) | IP address of the BGP neighbor |
| [`neighbor-as`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-neighbor-as) | AS number of the neighbor. |
| [`neighbor-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-neighbor-policy) | Configure Neighbor Policy |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor&#x27; |
| [`shutdown`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-shutdown) | If set to true, the neighbors connection will not come up. |
| [`timers`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-timers) | Config parameters related to timers associated with the BGP neighbor |
| [`transport`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport) | Configuration parameters relating to the transport protocol used by the BGP session to the neighbor |

## `configure authority router routing vrf routing-protocol neighbor address-family`

Address family configuration

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family <afi-safi>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`activate`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-activate) | Activate address family for neighbor |
| [`afi-safi`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-afi-safi) | Address family type |
| [`as-path-options`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-as-path-options) | Configuration parameters allowing manipulation of the AS_PATH attribute for this address family |
| [`conditional-advertisement`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-conditional-advertisement) | Configure Conditional Advertisement |
| `delete` | Delete configuration data |
| [`neighbor-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-neighbor-policy) | Configure Neighbor Policy |
| [`next-hop-self`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-next-hop-self) | Sets the router as the next hop for this neighbor and this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix-limit`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-prefix-limit) | Configure the maximum number of prefixes that will be accepted from a neighbor for this address family |
| [`remove-private-as`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-remove-private-as) | Modify private AS numbers in updates sent to neighbors for this address family. |
| [`route-reflector`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-route-reflector) | Route reflector client configuration |
| [`send-default-route`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-send-default-route) | If set to true, generate and send the default-route for this address-family to the neighbor |
| `show` | Show configuration data for &#x27;address-family&#x27; |

## `configure authority router routing vrf routing-protocol neighbor address-family activate`

Activate address family for neighbor

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family activate [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family afi-safi`

Address family type

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family afi-safi [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| afi-safi | Address family type |

`identityref`
A value as defined below:

| name | description | 
| ---- | ----------- |
| ipv4-unicast | IPv4 unicast (AFI,SAFI = 1,1) |
| ipv6-unicast | IPv6 unicast (AFI,SAFI = 2,1) |

## `configure authority router routing vrf routing-protocol neighbor address-family as-path-options`

Configuration parameters allowing manipulation of the AS_PATH attribute for this address family

##### Subcommands

| command | description |
| ------- | ----------- |
| [`allow-own-as`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-as-path-options-allow-own-as) | Specify the number of occurrences of the local BGP speaker&#x27;s AS that can occur within the AS_PATH before it is rejected for this address family. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;as-path-options&#x27; |

## `configure authority router routing vrf routing-protocol neighbor address-family as-path-options allow-own-as`

Specify the number of occurrences of the local BGP speaker&#x27;s AS that can occur within the AS_PATH before it is rejected for this address family.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family as-path-options allow-own-as [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement`

Configure Conditional Advertisement

##### Subcommands

| command | description |
| ------- | ----------- |
| [`advertisement-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-conditional-advertisement-advertisement-policy) | A policy selecting routes to conditionally advertise. |
| `delete` | Delete configuration data |
| [`exist-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-conditional-advertisement-exist-policy) | If this policy matches any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy. |
| [`non-exist-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-conditional-advertisement-non-exist-policy) | If this policy does not match any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;conditional-advertisement&#x27; |

## `configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement advertisement-policy`

A policy selecting routes to conditionally advertise.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement advertisement-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement exist-policy`

If this policy matches any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement exist-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement non-exist-policy`

If this policy does not match any BGP route, advertise the routes matched by advertisement-policy, otherwise do not advertise the routes matched by advertisement-policy.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family conditional-advertisement non-exist-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family neighbor-policy`

Configure Neighbor Policy

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`inbound-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-neighbor-policy-inbound-policy) | A policy to apply to the NLRIs inbound from this neighbor. |
| [`outbound-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-neighbor-policy-outbound-policy) | A policy to apply to the NLRIs outbound to this neighbor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor-policy&#x27; |

## `configure authority router routing vrf routing-protocol neighbor address-family neighbor-policy inbound-policy`

A policy to apply to the NLRIs inbound from this neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family neighbor-policy inbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family neighbor-policy outbound-policy`

A policy to apply to the NLRIs outbound to this neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family neighbor-policy outbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family next-hop-self`

Sets the router as the next hop for this neighbor and this address family

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family next-hop-self [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family prefix-limit`

Configure the maximum number of prefixes that will be accepted from a neighbor for this address family

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-prefixes`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-prefix-limit-max-prefixes) | Maximum number of prefixes that will be accepted from the neighbor for this address family |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`restart-timer`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-prefix-limit-restart-timer) | Time interval after which the BGP session is re-established after being torn down due to exceeding the max-prefix limit for this adddress family. |
| `show` | Show configuration data for &#x27;prefix-limit&#x27; |
| [`shutdown-threshold-pct`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-prefix-limit-shutdown-threshold-pct) | Threshold on number of prefixes that can be received from a neighbor for this address family before generation of warning messages or log entries. |

## `configure authority router routing vrf routing-protocol neighbor address-family prefix-limit max-prefixes`

Maximum number of prefixes that will be accepted from the neighbor for this address family

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family prefix-limit max-prefixes [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: prefixes

## `configure authority router routing vrf routing-protocol neighbor address-family prefix-limit restart-timer`

Time interval after which the BGP session is re-established after being torn down due to exceeding the max-prefix limit for this adddress family.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family prefix-limit restart-timer [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol neighbor address-family prefix-limit shutdown-threshold-pct`

Threshold on number of prefixes that can be received from a neighbor for this address family before generation of warning messages or log entries.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family prefix-limit shutdown-threshold-pct [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router routing vrf routing-protocol neighbor address-family remove-private-as`

Modify private AS numbers in updates sent to neighbors for this address family.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family remove-private-as [<remove-private-as-option>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| remove-private-as-option | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family route-reflector`

Route reflector client configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| [`client`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-address-family-route-reflector-client) | Configure the neighbor as a route reflector client for this address family. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;route-reflector&#x27; |

## `configure authority router routing vrf routing-protocol neighbor address-family route-reflector client`

Configure the neighbor as a route reflector client for this address family.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family route-reflector client [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor address-family send-default-route`

If set to true, generate and send the default-route for this address-family to the neighbor

#### Usage

```
configure authority router routing vrf routing-protocol neighbor address-family send-default-route [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor auth-password`

Configures an MD5 authentication password for use with neighboring devices.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor auth-password [<password>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| password | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor bfd`

BFD Client Configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`desired-tx-interval`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-bfd-desired-tx-interval) | The minimum transmission interval in milliseconds used to send BFD control packets. |
| [`enable`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-bfd-enable) | Enable/Disable BFD protocol |
| [`multiplier`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-bfd-multiplier) | The number of BFD packets that can be lost without the BFD session declared as down. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`required-min-rx-interval`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-bfd-required-min-rx-interval) | Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting. |
| `show` | Show configuration data for &#x27;bfd&#x27; |

## `configure authority router routing vrf routing-protocol neighbor bfd desired-tx-interval`

The minimum transmission interval in milliseconds used to send BFD control packets.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor bfd desired-tx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf routing-protocol neighbor bfd enable`

Enable/Disable BFD protocol

#### Usage

```
configure authority router routing vrf routing-protocol neighbor bfd enable [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor bfd multiplier`

The number of BFD packets that can be lost without the BFD session declared as down.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor bfd multiplier [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor bfd required-min-rx-interval`

Represents the minimum interval between BFD asynchronous control packets that this router is capable of supporting.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor bfd required-min-rx-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority router routing vrf routing-protocol neighbor description`

An optional textual description (intended primarily for use with a neighbor or group

#### Usage

```
configure authority router routing vrf routing-protocol neighbor description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor graceful-restart`

Configuration parameters relating to BGP neighbor graceful restart. If not explicitly configured, neighbor inherits from BGP instance.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`mode`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-graceful-restart-mode) | Graceful restart mode. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;graceful-restart&#x27; |

## `configure authority router routing vrf routing-protocol neighbor graceful-restart mode`

Graceful restart mode.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor graceful-restart mode [<graceful-restart-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| graceful-restart-mode | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor local-as`

The local autonomous system number that is to be used when establishing sessions with the remote neighbor or neighbor group, if this differs from the global BGP router autonomous system number.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor local-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor multihop`

Configuration parameters specifying the multihop behaviour for BGP sessions to the neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;multihop&#x27; |
| [`ttl`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-multihop-ttl) | Time-to-live value to use when packets are sent to the referenced group or neighbors and ebgp-multihop is enabled |

## `configure authority router routing vrf routing-protocol neighbor multihop ttl`

Time-to-live value to use when packets are sent to the referenced group or neighbors and ebgp-multihop is enabled

#### Usage

```
configure authority router routing vrf routing-protocol neighbor multihop ttl [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor negotiate-capabilities`

If set to false, suppress sending the Capabilities Optional Parameter in the BGP OPEN message.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor negotiate-capabilities [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor neighbor-address`

IP address of the BGP neighbor

#### Usage

```
configure authority router routing vrf routing-protocol neighbor neighbor-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor neighbor-as`

AS number of the neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor neighbor-as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor neighbor-policy`

Configure Neighbor Policy

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`inbound-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-neighbor-policy-inbound-policy) | A policy to apply to the NLRIs inbound from this neighbor. |
| [`outbound-policy`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-neighbor-policy-outbound-policy) | A policy to apply to the NLRIs outbound to this neighbor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;neighbor-policy&#x27; |

## `configure authority router routing vrf routing-protocol neighbor neighbor-policy inbound-policy`

A policy to apply to the NLRIs inbound from this neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor neighbor-policy inbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor neighbor-policy outbound-policy`

A policy to apply to the NLRIs outbound to this neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor neighbor-policy outbound-policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor shutdown`

If set to true, the neighbors connection will not come up.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor shutdown [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor timers`

Config parameters related to timers associated with the BGP neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| [`connect-retry`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-timers-connect-retry) | Time interval between attempts to establish a session with the neighbor. |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-timers-hold-time) | Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval. |
| [`keepalive-interval`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-timers-keepalive-interval) | Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller. |
| [`minimum-advertisement-interval`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-timers-minimum-advertisement-interval) | Minimum time which must elapse between subsequent UPDATE messages relating to a common set of NLRI being transmitted to a neighbor. This timer is referred to as MinRouteAdvertisementIntervalTimer by RFC 4721 and serves to reduce the number of UPDATE messages transmitted when a particular set of NLRI exhibit instability. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |

## `configure authority router routing vrf routing-protocol neighbor timers connect-retry`

Time interval between attempts to establish a session with the neighbor.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor timers connect-retry [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol neighbor timers hold-time`

Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor timers hold-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol neighbor timers keepalive-interval`

Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor timers keepalive-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol neighbor timers minimum-advertisement-interval`

Minimum time which must elapse between subsequent UPDATE messages relating to a common set of NLRI being transmitted to a neighbor. This timer is referred to as MinRouteAdvertisementIntervalTimer by RFC 4721 and serves to reduce the number of UPDATE messages transmitted when a particular set of NLRI exhibit instability.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor timers minimum-advertisement-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol neighbor transport`

Configuration parameters relating to the transport protocol used by the BGP session to the neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bgp-service-generation`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-bgp-service-generation) | Approach used for generating a BGP service and service routes to enable SVR transport for the BGP session with the neighbor. |
| `delete` | Delete configuration data |
| [`local-address`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-local-address) | Set the source IP address to be used for the BGP peering session. This must be expressed as a reference to the name of a routing interface or network interface. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`passive-mode`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-passive-mode) | Wait for neighbors to issue requests to open a BGP session, rather than initiating sessions from the local router. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation`

Approach used for generating a BGP service and service routes to enable SVR transport for the BGP session with the neighbor.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`disabled`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-bgp-service-generation-disabled) | Do not generate a BGP service or service routes. |
| [`neighbor-vrf`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-bgp-service-generation-neighbor-vrf) | Name of the neighbor&#x27;s VRF in which the peer BGP instance resides. Can be &#x27;default&#x27;. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`same-neighbor-vrf`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-bgp-service-generation-same-neighbor-vrf) | Generate BGP service if there is a matching peer with a BGP instance within the same VRF. |
| `show` | Show configuration data for &#x27;bgp-service-generation&#x27; |

## `configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation disabled`

Do not generate a BGP service or service routes.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation disabled
```

## `configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation neighbor-vrf`

Name of the neighbor&#x27;s VRF in which the peer BGP instance resides. Can be &#x27;default&#x27;.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation neighbor-vrf [<vrf-name-or-default-vrf>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vrf-name-or-default-vrf | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation same-neighbor-vrf`

Generate BGP service if there is a matching peer with a BGP instance within the same VRF.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport bgp-service-generation same-neighbor-vrf
```

## `configure authority router routing vrf routing-protocol neighbor transport local-address`

Set the source IP address to be used for the BGP peering session. This must be expressed as a reference to the name of a routing interface or network interface.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`interface`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-local-address-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-local-address-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`routing-interface`](#configure-authority-router-routing-vrf-routing-protocol-neighbor-transport-local-address-routing-interface) | Configure Routing Interface |
| `show` | Show configuration data for &#x27;local-address&#x27; |

## `configure authority router routing vrf routing-protocol neighbor transport local-address interface`

Network interface name

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport local-address interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor transport local-address node`

Interface node name

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport local-address node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor transport local-address routing-interface`

Configure Routing Interface

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport local-address routing-interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf routing-protocol neighbor transport passive-mode`

Wait for neighbors to issue requests to open a BGP session, rather than initiating sessions from the local router.

#### Usage

```
configure authority router routing vrf routing-protocol neighbor transport passive-mode [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol redistribute`

List of routing protocols to redistribute into BGP

#### Usage

```
configure authority router routing vrf routing-protocol redistribute <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The routing protocol to redistribute into BGP |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-router-routing-vrf-routing-protocol-redistribute-policy) | A policy to apply to the redistributed route |
| [`protocol`](#configure-authority-router-routing-vrf-routing-protocol-redistribute-protocol) | The routing protocol to redistribute into BGP |
| `show` | Show configuration data for &#x27;redistribute&#x27; |

## `configure authority router routing vrf routing-protocol redistribute policy`

A policy to apply to the redistributed route

#### Usage

```
configure authority router routing vrf routing-protocol redistribute policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority router routing vrf routing-protocol redistribute protocol`

The routing protocol to redistribute into BGP

#### Usage

```
configure authority router routing vrf routing-protocol redistribute protocol [<redistribute-into-bgp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| redistribute-into-bgp | The value to set for this field |

## `configure authority router routing vrf routing-protocol route-reflector-allow-outbound-policy`

Apply outbound policy on route reflector clients.

#### Usage

```
configure authority router routing vrf routing-protocol route-reflector-allow-outbound-policy [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol route-selection-options`

Set of configuration options that govern best path selection.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`always-compare-med`](#configure-authority-router-routing-vrf-routing-protocol-route-selection-options-always-compare-med) | Compare multi-exit discriminator (MED) value from different ASes when selecting the best route. The default behavior is to only compare MEDs for paths received from the same AS. |
| `delete` | Delete configuration data |
| [`external-compare-router-id`](#configure-authority-router-routing-vrf-routing-protocol-route-selection-options-external-compare-router-id) | When comparing similar routes received from external BGP neighbors, use the router-id as a criterion to select the active path. |
| [`ignore-as-path-length`](#configure-authority-router-routing-vrf-routing-protocol-route-selection-options-ignore-as-path-length) | Ignore the AS path length when selecting the best path. The default is to use the AS path length and prefer paths with shorter length. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;route-selection-options&#x27; |

## `configure authority router routing vrf routing-protocol route-selection-options always-compare-med`

Compare multi-exit discriminator (MED) value from different ASes when selecting the best route. The default behavior is to only compare MEDs for paths received from the same AS.

#### Usage

```
configure authority router routing vrf routing-protocol route-selection-options always-compare-med [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol route-selection-options external-compare-router-id`

When comparing similar routes received from external BGP neighbors, use the router-id as a criterion to select the active path.

#### Usage

```
configure authority router routing vrf routing-protocol route-selection-options external-compare-router-id [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol route-selection-options ignore-as-path-length`

Ignore the AS path length when selecting the best path. The default is to use the AS path length and prefer paths with shorter length.

#### Usage

```
configure authority router routing vrf routing-protocol route-selection-options ignore-as-path-length [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router routing vrf routing-protocol router-id`

Router id of the router, expressed as an 32-bit value, IPv4 address.

#### Usage

```
configure authority router routing vrf routing-protocol router-id [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority router routing vrf routing-protocol timers`

Config parameters related to timers associated with the BGP neighbor

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`hold-time`](#configure-authority-router-routing-vrf-routing-protocol-timers-hold-time) | Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval. |
| [`keepalive-interval`](#configure-authority-router-routing-vrf-routing-protocol-timers-keepalive-interval) | Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;timers&#x27; |

## `configure authority router routing vrf routing-protocol timers hold-time`

Time interval that a BGP session will be considered active in the absence of keepalive or other messages from the neighbor. The hold-time is typically set to 3x the keepalive-interval.

#### Usage

```
configure authority router routing vrf routing-protocol timers hold-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol timers keepalive-interval`

Time interval between transmission of keepalive messages to the neighbor. Must be set to 1/3 the hold-time or smaller.

#### Usage

```
configure authority router routing vrf routing-protocol timers keepalive-interval [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router routing vrf routing-protocol type`

Type of the routing protocol - an identity derived from the &#x27;routing-protocol&#x27; base identity.

#### Usage

```
configure authority router routing vrf routing-protocol type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority router routing vrf service-admin-distance`

Administrative distance for routes generated from services.

#### Usage

```
configure authority router routing vrf service-admin-distance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf static-route`

A list of static routes. The sub-element that allows administrators to configure static routes, that will be entered into the SSR&#x27;s Routing Information Base (RIB).

#### Usage

```
configure authority router routing vrf static-route <destination-prefix> <distance>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-prefix | IPv4 or IPv6 destination prefix that must be unicast. |
| distance | Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-routing-vrf-static-route-description) | Textual description of the route. |
| [`destination-prefix`](#configure-authority-router-routing-vrf-static-route-destination-prefix) | IPv4 or IPv6 destination prefix that must be unicast. |
| [`distance`](#configure-authority-router-routing-vrf-static-route-distance) | Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources. |
| [`next-hop`](#configure-authority-router-routing-vrf-static-route-next-hop) | List of next-hops. An empty list creates a blackhole route. |
| [`next-hop-interface`](#configure-authority-router-routing-vrf-static-route-next-hop-interface) | List of next-hop interfaces. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-route&#x27; |

## `configure authority router routing vrf static-route description`

Textual description of the route.

#### Usage

```
configure authority router routing vrf static-route description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router routing vrf static-route destination-prefix`

IPv4 or IPv6 destination prefix that must be unicast.

#### Usage

```
configure authority router routing vrf static-route destination-prefix [<unicast-ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-ip-prefix | The value to set for this field |

## `configure authority router routing vrf static-route distance`

Static route administrative distance. Used in calculating route preference when multiple possible paths exist learned via different sources.

#### Usage

```
configure authority router routing vrf static-route distance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority router routing vrf static-route next-hop`

List of next-hops. An empty list creates a blackhole route.

#### Usage

```
configure authority router routing vrf static-route next-hop [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router routing vrf static-route next-hop-interface`

List of next-hop interfaces.

#### Usage

```
configure authority router routing vrf static-route next-hop-interface <node> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node | Interface node name |
| interface | Network interface name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`interface`](#configure-authority-router-routing-vrf-static-route-next-hop-interface-interface) | Network interface name |
| [`node`](#configure-authority-router-routing-vrf-static-route-next-hop-interface-node) | Interface node name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;next-hop-interface&#x27; |

## `configure authority router routing vrf static-route next-hop-interface interface`

Network interface name

#### Usage

```
configure authority router routing vrf static-route next-hop-interface interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf static-route next-hop-interface node`

Interface node name

#### Usage

```
configure authority router routing vrf static-route next-hop-interface node [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router routing vrf tenant-name`

List of tenants in this VRF.

#### Usage

```
configure authority router routing vrf tenant-name [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | Value to add to this list |

## `configure authority router service-route`

Defines a route for a service or an instance of a service (server or service agent).

#### Usage

```
configure authority router service-route <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the service route. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bridge-name`](#configure-authority-router-service-route-bridge-name) | EOSVR bridge to forward packets to for the service. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`enable-failover`](#configure-authority-router-service-route-enable-failover) | Enable failover across next-hops and service-routes that have this flag set. |
| [`generated`](#configure-authority-router-service-route-generated) | Indicates whether or not the Service Route was automatically generated as a result of STEP topology builder, Conductor, BGP/SVR, or DHCP Relay services. |
| [`host`](#configure-authority-router-service-route-host) | Packets are passed to the host operating system for processing |
| [`name`](#configure-authority-router-service-route-name) | An arbitrary, unique name for the service route. |
| [`nat-target`](#configure-authority-router-service-route-nat-target) | The address or fqdn of the server that packets are forwarded to for the service. The destination is natted to this address. |
| [`next-hop`](#configure-authority-router-service-route-next-hop) | An instance of the nexthop for the service route. |
| [`next-peer`](#configure-authority-router-service-route-next-peer) | Peer router to forward packets to for the service. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer`](#configure-authority-router-service-route-peer) | Peer router to forward packets to for the service. |
| [`port-target`](#configure-authority-router-service-route-port-target) | The port of the server that packets are forwarded to for the service. The destination is port natted to this port. If no value is specified, no translation occurs. |
| [`reachability-detection`](#configure-authority-router-service-route-reachability-detection) | Configure Reachability Detection |
| [`routing-stack`](#configure-authority-router-service-route-routing-stack) | Packets are passed to the internal routing agent for processing |
| [`routing-stack-vrf`](#configure-authority-router-service-route-routing-stack-vrf) | VRF in which the internal routing agent will receive the packets |
| [`service-name`](#configure-authority-router-service-route-service-name) | The name of the service that this service route applies to. |
| [`service-route-policy`](#configure-authority-router-service-route-service-route-policy) | Service Route Policy that applies to the service route. |
| `show` | Show configuration data for &#x27;service-route&#x27; |
| [`use-bgp-over-svr`](#configure-authority-router-service-route-use-bgp-over-svr) | Combine BGP over SVR routes with local service routes. |
| [`use-learned-routes`](#configure-authority-router-service-route-use-learned-routes) | Use learned (from routing protocols), connected, and static routes. |
| [`vector`](#configure-authority-router-service-route-vector) | Vector name to assign a cost to this service-route. |

## `configure authority router service-route bridge-name`

EOSVR bridge to forward packets to for the service.

#### Usage

```
configure authority router service-route bridge-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route enable-failover`

Enable failover across next-hops and service-routes that have this flag set.

#### Usage

```
configure authority router service-route enable-failover [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route generated`

Indicates whether or not the Service Route was automatically generated as a result of STEP topology builder, Conductor, BGP/SVR, or DHCP Relay services.

#### Usage

```
configure authority router service-route generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route host`

Packets are passed to the host operating system for processing

#### Usage

```
configure authority router service-route host <node-name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node-name | The name of the node on which the host interface resides. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`move`](#configure-authority-router-service-route-host-move) | Move list items |
| [`node-name`](#configure-authority-router-service-route-host-node-name) | The name of the node on which the host interface resides. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;host&#x27; |
| [`target-address`](#configure-authority-router-service-route-host-target-address) | The ipv4 address or fqdn of the server that packets are forwarded to for the service. The destination is natted to this address. |

## `configure authority router service-route host move target-address`

The ipv4 address or fqdn of the server that packets are forwarded to for the service. The destination is natted to this address.

#### Usage

```
configure authority router service-route host move target-address [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router service-route host node-name`

The name of the node on which the host interface resides.

#### Usage

```
configure authority router service-route host node-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route host target-address`

The ipv4 address or fqdn of the server that packets are forwarded to for the service. The destination is natted to this address.

#### Usage

```
configure authority router service-route host target-address [<hostv4>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostv4 | Value to add to this list |

## `configure authority router service-route name`

An arbitrary, unique name for the service route.

#### Usage

```
configure authority router service-route name [<service-route-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-route-name | The value to set for this field |

## `configure authority router service-route nat-target`

The address or fqdn of the server that packets are forwarded to for the service. The destination is natted to this address.

#### Usage

```
configure authority router service-route nat-target [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router service-route next-hop`

An instance of the nexthop for the service route.

#### Usage

```
configure authority router service-route next-hop <node-name> <interface>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node-name | The name of the node on which the interface resides. |
| interface | A reference to the name of a configured network layer interface used to reach the destination. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`gateway-ip`](#configure-authority-router-service-route-next-hop-gateway-ip) | Gateway ip address of the service route nexthop. |
| [`interface`](#configure-authority-router-service-route-next-hop-interface) | A reference to the name of a configured network layer interface used to reach the destination. |
| [`move`](#configure-authority-router-service-route-next-hop-move) | Move list items |
| [`node-name`](#configure-authority-router-service-route-next-hop-node-name) | The name of the node on which the interface resides. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;next-hop&#x27; |
| [`source-nat-pool`](#configure-authority-router-service-route-next-hop-source-nat-pool) | Apply source address (and optional port) translation for flows created towards the configured next-hop. This config will override any source-nat settings on the egress network-interface. |
| [`target-address`](#configure-authority-router-service-route-next-hop-target-address) | Target addresses for the service route nexthop. |
| [`vector`](#configure-authority-router-service-route-next-hop-vector) | Vector name to assign a cost to this next-hop in service-route |

## `configure authority router service-route next-hop gateway-ip`

Gateway ip address of the service route nexthop.

#### Usage

```
configure authority router service-route next-hop gateway-ip [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router service-route next-hop interface`

A reference to the name of a configured network layer interface used to reach the destination.

#### Usage

```
configure authority router service-route next-hop interface [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route next-hop move target-address`

Target addresses for the service route nexthop.

#### Usage

```
configure authority router service-route next-hop move target-address [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router service-route next-hop node-name`

The name of the node on which the interface resides.

#### Usage

```
configure authority router service-route next-hop node-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route next-hop source-nat-pool`

Apply source address (and optional port) translation for flows created towards the configured next-hop. This config will override any source-nat settings on the egress network-interface.

#### Usage

```
configure authority router service-route next-hop source-nat-pool [<nat-pool-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| nat-pool-ref | The value to set for this field |

## `configure authority router service-route next-hop target-address`

Target addresses for the service route nexthop.

#### Usage

```
configure authority router service-route next-hop target-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | Value to add to this list |

## `configure authority router service-route next-hop vector`

Vector name to assign a cost to this next-hop in service-route

#### Usage

```
configure authority router service-route next-hop vector [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | The value to set for this field |

## `configure authority router service-route next-peer`

Peer router to forward packets to for the service.

#### Usage

```
configure authority router service-route next-peer [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority router service-route peer`

Peer router to forward packets to for the service.

#### Usage

```
configure authority router service-route peer [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route port-target`

The port of the server that packets are forwarded to for the service. The destination is port natted to this port. If no value is specified, no translation occurs.

#### Usage

```
configure authority router service-route port-target [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router service-route reachability-detection`

Configure Reachability Detection

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`detection-window`](#configure-authority-router-service-route-reachability-detection-detection-window) | Time window for aggregate stats calculation (max and mean) |
| [`enabled`](#configure-authority-router-service-route-reachability-detection-enabled) | Whether reachability detection is enabled on this service-route. |
| [`enforcement`](#configure-authority-router-service-route-reachability-detection-enforcement) | Whether reachability detection is enforced on this service-route. |
| [`hold-down`](#configure-authority-router-service-route-reachability-detection-hold-down) | Hold-down time for when the path is determined down |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`probe`](#configure-authority-router-service-route-reachability-detection-probe) | Configure Probe |
| [`probe-type`](#configure-authority-router-service-route-reachability-detection-probe-type) | The mode for performing probes in addition to reachability-detection enforcement |
| [`reachability-profile`](#configure-authority-router-service-route-reachability-detection-reachability-profile) | The reachability-profile to apply to this service-route |
| `show` | Show configuration data for &#x27;reachability-detection&#x27; |

## `configure authority router service-route reachability-detection detection-window`

Time window for aggregate stats calculation (max and mean)

#### Usage

```
configure authority router service-route reachability-detection detection-window [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router service-route reachability-detection enabled`

Whether reachability detection is enabled on this service-route.

#### Usage

```
configure authority router service-route reachability-detection enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route reachability-detection enforcement`

Whether reachability detection is enforced on this service-route.

#### Usage

```
configure authority router service-route reachability-detection enforcement [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route reachability-detection hold-down`

Hold-down time for when the path is determined down

#### Usage

```
configure authority router service-route reachability-detection hold-down [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router service-route reachability-detection probe`

Configure Probe

#### Usage

```
configure authority router service-route reachability-detection probe <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the probe |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-service-route-reachability-detection-probe-enabled) | Enable reachability probe |
| [`icmp-probe-profile`](#configure-authority-router-service-route-reachability-detection-probe-icmp-probe-profile) | The ICMP probe profile settings to use for this path |
| [`name`](#configure-authority-router-service-route-reachability-detection-probe-name) | Name of the probe |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;probe&#x27; |

## `configure authority router service-route reachability-detection probe enabled`

Enable reachability probe

#### Usage

```
configure authority router service-route reachability-detection probe enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route reachability-detection probe icmp-probe-profile`

The ICMP probe profile settings to use for this path

#### Usage

```
configure authority router service-route reachability-detection probe icmp-probe-profile [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route reachability-detection probe name`

Name of the probe

#### Usage

```
configure authority router service-route reachability-detection probe name [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router service-route reachability-detection probe-type`

The mode for performing probes in addition to reachability-detection enforcement

#### Usage

```
configure authority router service-route reachability-detection probe-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router service-route reachability-detection reachability-profile`

The reachability-profile to apply to this service-route

#### Usage

```
configure authority router service-route reachability-detection reachability-profile [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route routing-stack`

Packets are passed to the internal routing agent for processing

#### Usage

```
configure authority router service-route routing-stack
```

## `configure authority router service-route routing-stack-vrf`

VRF in which the internal routing agent will receive the packets

#### Usage

```
configure authority router service-route routing-stack-vrf [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route service-name`

The name of the service that this service route applies to.

#### Usage

```
configure authority router service-route service-name [<service-name-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-name-ref | The value to set for this field |

## `configure authority router service-route service-route-policy`

Service Route Policy that applies to the service route.

#### Usage

```
configure authority router service-route service-route-policy [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router service-route use-bgp-over-svr`

Combine BGP over SVR routes with local service routes.

#### Usage

```
configure authority router service-route use-bgp-over-svr
```

## `configure authority router service-route use-learned-routes`

Use learned (from routing protocols), connected, and static routes.

#### Usage

```
configure authority router service-route use-learned-routes
```

## `configure authority router service-route vector`

Vector name to assign a cost to this service-route.

#### Usage

```
configure authority router service-route vector [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | The value to set for this field |

## `configure authority router service-route-policy`

Used to define the properties of service routes. These capabilities influence route selection when determining the optimal path for establishing new sessions.

#### Usage

```
configure authority router service-route-policy <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | A unique name for the service route policy. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-router-service-route-policy-description) | A description for the service route policy. |
| [`include-parent-routes`](#configure-authority-router-service-route-policy-include-parent-routes) | When true, the routes from the immediate parent service will be used in addition to those provisioned for the child service. By default, only provisioned routes for a child service is in use. |
| [`max-sessions`](#configure-authority-router-service-route-policy-max-sessions) | Maximum number of active sessions. When configured, once the service-route using this service-route-policy reaches the configured threshold, no new sessions will be established until the rate drops below the configured value. |
| [`name`](#configure-authority-router-service-route-policy-name) | A unique name for the service route policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`packet-replication`](#configure-authority-router-service-route-policy-packet-replication) | When true, packets will be replicated for all next-hops in the associated service-route. |
| [`session-high-water-mark`](#configure-authority-router-service-route-policy-session-high-water-mark) | Percentage of maximum sessions above which the route will no longer be considered for load balancing. |
| [`session-low-water-mark`](#configure-authority-router-service-route-policy-session-low-water-mark) | Percentage of maximum sessions below which the route will be reconsidered for load balancing. |
| [`session-rate`](#configure-authority-router-service-route-policy-session-rate) | Maximum rate in sessions per second. When configured, once the service-route using this service-route-policy reaches the configured rate limit threshold, no new sessions will be established until the rate drops below the configured value. |
| `show` | Show configuration data for &#x27;service-route-policy&#x27; |

## `configure authority router service-route-policy description`

A description for the service route policy.

#### Usage

```
configure authority router service-route-policy description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router service-route-policy include-parent-routes`

When true, the routes from the immediate parent service will be used in addition to those provisioned for the child service. By default, only provisioned routes for a child service is in use.

#### Usage

```
configure authority router service-route-policy include-parent-routes [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route-policy max-sessions`

Maximum number of active sessions. When configured, once the service-route using this service-route-policy reaches the configured threshold, no new sessions will be established until the rate drops below the configured value.

#### Usage

```
configure authority router service-route-policy max-sessions [<limit>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| limit | The value to set for this field |

## `configure authority router service-route-policy name`

A unique name for the service route policy.

#### Usage

```
configure authority router service-route-policy name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router service-route-policy packet-replication`

When true, packets will be replicated for all next-hops in the associated service-route.

#### Usage

```
configure authority router service-route-policy packet-replication [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router service-route-policy session-high-water-mark`

Percentage of maximum sessions above which the route will no longer be considered for load balancing.

#### Usage

```
configure authority router service-route-policy session-high-water-mark [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router service-route-policy session-low-water-mark`

Percentage of maximum sessions below which the route will be reconsidered for load balancing.

#### Usage

```
configure authority router service-route-policy session-low-water-mark [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority router service-route-policy session-rate`

Maximum rate in sessions per second. When configured, once the service-route using this service-route-policy reaches the configured rate limit threshold, no new sessions will be established until the rate drops below the configured value.

#### Usage

```
configure authority router service-route-policy session-rate [<limit>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| limit | The value to set for this field |

## `configure authority router static-hostname-mapping`

Map hostnames to ip-address resolutions. These entries will be put in /etc/hosts. This will prevent DNS requests from being sent for these hostnames.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-hostname-mapping&#x27; |
| [`static-entry`](#configure-authority-router-static-hostname-mapping-static-entry) | Static hostname mapping entry. |

## `configure authority router static-hostname-mapping static-entry`

Static hostname mapping entry.

#### Usage

```
configure authority router static-hostname-mapping static-entry <hostname>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostname | Hostname to set the resolution for. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`hostname`](#configure-authority-router-static-hostname-mapping-static-entry-hostname) | Hostname to set the resolution for. |
| [`ip-address`](#configure-authority-router-static-hostname-mapping-static-entry-ip-address) | Ip-address for the corresponding hostname. |
| [`move`](#configure-authority-router-static-hostname-mapping-static-entry-move) | Move list items |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;static-entry&#x27; |

## `configure authority router static-hostname-mapping static-entry hostname`

Hostname to set the resolution for.

#### Usage

```
configure authority router static-hostname-mapping static-entry hostname [<domain-name-not-ipv4>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| domain-name-not-ipv4 | The value to set for this field |

## `configure authority router static-hostname-mapping static-entry ip-address`

Ip-address for the corresponding hostname.

#### Usage

```
configure authority router static-hostname-mapping static-entry ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | Value to add to this list |

## `configure authority router static-hostname-mapping static-entry move ip-address`

Ip-address for the corresponding hostname.

#### Usage

```
configure authority router static-hostname-mapping static-entry move ip-address [force] <value> <position> [<relative-to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | Value to move |
| position | first \| after \| before \| last |
| relative-to | Value before or after which to move |

## `configure authority router system`

System group configuration. Lets administrators configure system-wide properties for their SSR deployment.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`asset-connection-resiliency`](#configure-authority-router-system-asset-connection-resiliency) | Configure Asset Connection Resiliency |
| [`audit`](#configure-authority-router-system-audit) | Configuration for audit events |
| `clone` | Clone a list item |
| [`contact`](#configure-authority-router-system-contact) | The administrator contact information for the system. |
| `delete` | Delete configuration data |
| [`inactivity-timer`](#configure-authority-router-system-inactivity-timer) | The amount of time a user is allowed to be idle before being automatically disconnected from the system. |
| [`local-login`](#configure-authority-router-system-local-login) | Configure Local Login |
| [`log-category`](#configure-authority-router-system-log-category) | Log category configuration lets administrators configure the SSR&#x27;s log level for specific log categories, overriding the default log-level setting. |
| [`log-level`](#configure-authority-router-system-log-level) | The log level is the degree to which the SSR writes information into its log files, by default. WARNING: using the &#x27;trace&#x27; level will significantly impact system performance and is not recommended for production environments. The &#x27;log-category&#x27; configuration should be used instead for &#x27;trace&#x27; level of specific categories. |
| [`metrics`](#configure-authority-router-system-metrics) | Parameters controlling metric configuration and collection. Governs various aspects of the SSR&#x27;s data sampling for analytics purposes. |
| [`ntp`](#configure-authority-router-system-ntp) | NTP configuration lets administrators configure information about the NTP servers within their management network. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`remote-login`](#configure-authority-router-system-remote-login) | Configure Remote Login |
| [`services`](#configure-authority-router-system-services) | Address information for internal services |
| `show` | Show configuration data for &#x27;system&#x27; |
| [`software-update`](#configure-authority-router-system-software-update) | Configuration for SSR software updates. Supported on managed assets only. |
| [`syslog`](#configure-authority-router-system-syslog) | Syslog configuration lets administrators configure the SSR&#x27;s interaction with external syslog services. |

## `configure authority router system asset-connection-resiliency`

Configure Asset Connection Resiliency

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-asset-connection-resiliency-enabled) | Enable asset connection resiliency by creating SSH tunnels for asset connections from managed Router to Conductor. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;asset-connection-resiliency&#x27; |

## `configure authority router system asset-connection-resiliency enabled`

Enable asset connection resiliency by creating SSH tunnels for asset connections from managed Router to Conductor.

#### Usage

```
configure authority router system asset-connection-resiliency enabled [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority router system audit`

Configuration for audit events

##### Subcommands

| command | description |
| ------- | ----------- |
| [`administration`](#configure-authority-router-system-audit-administration) | Configure Administration |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`disk-full-action`](#configure-authority-router-system-audit-disk-full-action) | Action to take when disk is full. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`remote-logging-server`](#configure-authority-router-system-audit-remote-logging-server) | Audit remote logging server. |
| [`retention`](#configure-authority-router-system-audit-retention) | How long events should be persisted. This includes the explicit events here as well as the the implicit alarm and provisioning events |
| [`security`](#configure-authority-router-system-audit-security) | Configure Security |
| `show` | Show configuration data for &#x27;audit&#x27; |
| [`system`](#configure-authority-router-system-audit-system) | Configuration for system events |
| [`traffic`](#configure-authority-router-system-audit-traffic) | Configuration for traffic requests |

## `configure authority router system audit administration`

Configure Administration

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-audit-administration-enabled) | Enable/disable logging of administration events |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`persist`](#configure-authority-router-system-audit-administration-persist) | Enable/disable persistence of administration events by SSR |
| `show` | Show configuration data for &#x27;administration&#x27; |

## `configure authority router system audit administration enabled`

Enable/disable logging of administration events

#### Usage

```
configure authority router system audit administration enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit administration persist`

Enable/disable persistence of administration events by SSR

#### Usage

```
configure authority router system audit administration persist [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit disk-full-action`

Action to take when disk is full.

#### Usage

```
configure authority router system audit disk-full-action [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system audit remote-logging-server`

Audit remote logging server.

#### Usage

```
configure authority router system audit remote-logging-server <address> <port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | The remote IP address or FQDN of the audit logging server. |
| port | The remote port of the audit logging server. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-system-audit-remote-logging-server-address) | The remote IP address or FQDN of the audit logging server. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-router-system-audit-remote-logging-server-port) | The remote port of the audit logging server. |
| `show` | Show configuration data for &#x27;remote-logging-server&#x27; |

## `configure authority router system audit remote-logging-server address`

The remote IP address or FQDN of the audit logging server.

#### Usage

```
configure authority router system audit remote-logging-server address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router system audit remote-logging-server port`

The remote port of the audit logging server.

#### Usage

```
configure authority router system audit remote-logging-server port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router system audit retention`

How long events should be persisted. This includes the explicit events here as well as the the implicit alarm and provisioning events

#### Usage

```
configure authority router system audit retention [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system audit security`

Configure Security

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-audit-security-enabled) | Enable/disable logging of security events |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`persist`](#configure-authority-router-system-audit-security-persist) | Enable/disable persistence of security events by SSR |
| `show` | Show configuration data for &#x27;security&#x27; |

## `configure authority router system audit security enabled`

Enable/disable logging of security events

#### Usage

```
configure authority router system audit security enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit security persist`

Enable/disable persistence of security events by SSR

#### Usage

```
configure authority router system audit security persist [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit system`

Configuration for system events

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-audit-system-enabled) | Enable/disable logging of system events |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`persist`](#configure-authority-router-system-audit-system-persist) | Enable/disable persistence of system events by SSR |
| `show` | Show configuration data for &#x27;system&#x27; |

## `configure authority router system audit system enabled`

Enable/disable logging of system events

#### Usage

```
configure authority router system audit system enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit system persist`

Enable/disable persistence of system events by SSR

#### Usage

```
configure authority router system audit system persist [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit traffic`

Configuration for traffic requests

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-audit-traffic-enabled) | Enable/disable logging of traffic requests |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`persist`](#configure-authority-router-system-audit-traffic-persist) | Enable/disable persistence of traffic events by SSR |
| `show` | Show configuration data for &#x27;traffic&#x27; |

## `configure authority router system audit traffic enabled`

Enable/disable logging of traffic requests

#### Usage

```
configure authority router system audit traffic enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system audit traffic persist`

Enable/disable persistence of traffic events by SSR

#### Usage

```
configure authority router system audit traffic persist [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system contact`

The administrator contact information for the system.

#### Usage

```
configure authority router system contact [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system inactivity-timer`

The amount of time a user is allowed to be idle before being automatically disconnected from the system.

#### Usage

```
configure authority router system inactivity-timer [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router system local-login`

Configure Local Login

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`netconf`](#configure-authority-router-system-local-login-netconf) | Configure Netconf |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;local-login&#x27; |

## `configure authority router system local-login netconf`

Configure Netconf

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`session-limit`](#configure-authority-router-system-local-login-netconf-session-limit) | Number of Netconf sessions permitted on the system. |
| [`session-limit-action`](#configure-authority-router-system-local-login-netconf-session-limit-action) | Action performed when local session limit exceeded. |
| `show` | Show configuration data for &#x27;netconf&#x27; |

## `configure authority router system local-login netconf session-limit`

Number of Netconf sessions permitted on the system.

#### Usage

```
configure authority router system local-login netconf session-limit [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router system local-login netconf session-limit-action`

Action performed when local session limit exceeded.

#### Usage

```
configure authority router system local-login netconf session-limit-action [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system log-category`

Log category configuration lets administrators configure the SSR&#x27;s log level for specific log categories, overriding the default log-level setting.

#### Usage

```
configure authority router system log-category <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The log category. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`log-level`](#configure-authority-router-system-log-category-log-level) | The log level setting for this category. |
| [`name`](#configure-authority-router-system-log-category-name) | The log category. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;log-category&#x27; |

## `configure authority router system log-category log-level`

The log level setting for this category.

#### Usage

```
configure authority router system log-category log-level [<log-level>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| log-level | The value to set for this field |

## `configure authority router system log-category name`

The log category.

#### Usage

```
configure authority router system log-category name [<log-category>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| log-category | The value to set for this field |

## `configure authority router system log-level`

The log level is the degree to which the SSR writes information into its log files, by default. WARNING: using the &#x27;trace&#x27; level will significantly impact system performance and is not recommended for production environments. The &#x27;log-category&#x27; configuration should be used instead for &#x27;trace&#x27; level of specific categories.

#### Usage

```
configure authority router system log-level [<log-level>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| log-level | The value to set for this field |

## `configure authority router system metrics`

Parameters controlling metric configuration and collection. Governs various aspects of the SSR&#x27;s data sampling for analytics purposes.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`application-stats-interval`](#configure-authority-router-system-metrics-application-stats-interval) | Interval at which the delta of identified application stats will be computed |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`profile`](#configure-authority-router-system-metrics-profile) | Configure Profile |
| [`retention`](#configure-authority-router-system-metrics-retention) | The durations to be used for internal metric storage |
| [`sample-period`](#configure-authority-router-system-metrics-sample-period) | The period on which metrics are sampled |
| `show` | Show configuration data for &#x27;metrics&#x27; |

## `configure authority router system metrics application-stats-interval`

Interval at which the delta of identified application stats will be computed

#### Usage

```
configure authority router system metrics application-stats-interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics profile`

Configure Profile

#### Usage

```
configure authority router system metrics profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | A profile to be used on this router |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-system-metrics-profile-name) | A profile to be used on this router |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`retention`](#configure-authority-router-system-metrics-profile-retention) | How long the metrics should be retained on box |
| `show` | Show configuration data for &#x27;profile&#x27; |

## `configure authority router system metrics profile name`

A profile to be used on this router

#### Usage

```
configure authority router system metrics profile name [<metrics-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| metrics-profile-ref | The value to set for this field |

## `configure authority router system metrics profile retention`

How long the metrics should be retained on box

#### Usage

```
configure authority router system metrics profile retention [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system metrics retention`

The durations to be used for internal metric storage

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`intermediate`](#configure-authority-router-system-metrics-retention-intermediate) | The intermediate historical retention bucket |
| [`long`](#configure-authority-router-system-metrics-retention-long) | The longest historical retention bucket |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`short`](#configure-authority-router-system-metrics-retention-short) | The shortest historical retention bucket |
| `show` | Show configuration data for &#x27;retention&#x27; |

## `configure authority router system metrics retention intermediate`

The intermediate historical retention bucket

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`duration`](#configure-authority-router-system-metrics-retention-intermediate-duration) | How long the intermediate retention should retain metrics |
| [`enabled`](#configure-authority-router-system-metrics-retention-intermediate-enabled) | Whether intermediate and subsequent retentions should be disabled |
| [`interval`](#configure-authority-router-system-metrics-retention-intermediate-interval) | How frequently metrics should be aggregated into the intermediate retention |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;intermediate&#x27; |

## `configure authority router system metrics retention intermediate duration`

How long the intermediate retention should retain metrics

#### Usage

```
configure authority router system metrics retention intermediate duration [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics retention intermediate enabled`

Whether intermediate and subsequent retentions should be disabled

#### Usage

```
configure authority router system metrics retention intermediate enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system metrics retention intermediate interval`

How frequently metrics should be aggregated into the intermediate retention

#### Usage

```
configure authority router system metrics retention intermediate interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics retention long`

The longest historical retention bucket

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`duration`](#configure-authority-router-system-metrics-retention-long-duration) | How long the long retention should retain metrics |
| [`enabled`](#configure-authority-router-system-metrics-retention-long-enabled) | Whether the long retention should be disabled |
| [`interval`](#configure-authority-router-system-metrics-retention-long-interval) | How frequently metrics should be aggregated into the long retention |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;long&#x27; |

## `configure authority router system metrics retention long duration`

How long the long retention should retain metrics

#### Usage

```
configure authority router system metrics retention long duration [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics retention long enabled`

Whether the long retention should be disabled

#### Usage

```
configure authority router system metrics retention long enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system metrics retention long interval`

How frequently metrics should be aggregated into the long retention

#### Usage

```
configure authority router system metrics retention long interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics retention short`

The shortest historical retention bucket

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`duration`](#configure-authority-router-system-metrics-retention-short-duration) | How long the short retention should retain metrics |
| [`enabled`](#configure-authority-router-system-metrics-retention-short-enabled) | Whether short and subsequent retentions should be disabled |
| [`interval`](#configure-authority-router-system-metrics-retention-short-interval) | How frequently metrics should be inserted into the short retention. This is equivallent to the deprecated &#x27;sample-period&#x27; element. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;short&#x27; |

## `configure authority router system metrics retention short duration`

How long the short retention should retain metrics

#### Usage

```
configure authority router system metrics retention short duration [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics retention short enabled`

Whether short and subsequent retentions should be disabled

#### Usage

```
configure authority router system metrics retention short enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system metrics retention short interval`

How frequently metrics should be inserted into the short retention. This is equivallent to the deprecated &#x27;sample-period&#x27; element.

#### Usage

```
configure authority router system metrics retention short interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority router system metrics sample-period`

The period on which metrics are sampled

#### Usage

```
configure authority router system metrics sample-period [<int8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| int8 | The value to set for this field |

#### Description

Units: seconds
Warning: &#x27;sample-period&#x27; is deprecated and will be removed in a future software version

## `configure authority router system ntp`

NTP configuration lets administrators configure information about the NTP servers within their management network.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`orphan-stratum`](#configure-authority-router-system-ntp-orphan-stratum) | Value to use as stratum when upstream NTP servers are unavailable and router nodes synchronize in orphan mode. The numerical value should be greater than the expected stratum value of the upstream NTP servers. For example if upstream clocks are stratum 4 or 5, then this setting should be 6. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`server`](#configure-authority-router-system-ntp-server) | The list of NTP servers configured for this device. |
| `show` | Show configuration data for &#x27;ntp&#x27; |

## `configure authority router system ntp orphan-stratum`

Value to use as stratum when upstream NTP servers are unavailable and router nodes synchronize in orphan mode. The numerical value should be greater than the expected stratum value of the upstream NTP servers. For example if upstream clocks are stratum 4 or 5, then this setting should be 6.

#### Usage

```
configure authority router system ntp orphan-stratum [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router system ntp server`

The list of NTP servers configured for this device.

#### Usage

```
configure authority router system ntp server <ip-address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The address or hostname of NTP server. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication-key`](#configure-authority-router-system-ntp-server-authentication-key) | Configure Authentication Key |
| `delete` | Delete configuration data |
| [`ip-address`](#configure-authority-router-system-ntp-server-ip-address) | The address or hostname of NTP server. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;server&#x27; |

## `configure authority router system ntp server authentication-key`

Configure Authentication Key

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`key-number`](#configure-authority-router-system-ntp-server-authentication-key-key-number) | The key number identifier for the authentication key |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;authentication-key&#x27; |
| [`type`](#configure-authority-router-system-ntp-server-authentication-key-type) | The algorithm used by symmetric key |
| [`value`](#configure-authority-router-system-ntp-server-authentication-key-value) | The authentication key value |

## `configure authority router system ntp server authentication-key key-number`

The key number identifier for the authentication key

#### Usage

```
configure authority router system ntp server authentication-key key-number [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority router system ntp server authentication-key type`

The algorithm used by symmetric key

#### Usage

```
configure authority router system ntp server authentication-key type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system ntp server authentication-key value`

The authentication key value

#### Usage

```
configure authority router system ntp server authentication-key value [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system ntp server ip-address`

The address or hostname of NTP server.

#### Usage

```
configure authority router system ntp server ip-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router system remote-login`

Configure Remote Login

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-remote-login-enabled) | Enable remote login from a Conductor to assets on this Router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;remote-login&#x27; |

## `configure authority router system remote-login enabled`

Enable remote login from a Conductor to assets on this Router.

#### Usage

```
configure authority router system remote-login enabled [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority router system services`

Address information for internal services

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;services&#x27; |
| [`snmp-server`](#configure-authority-router-system-services-snmp-server) | SNMP server configuration. |
| [`webserver`](#configure-authority-router-system-services-webserver) | Web server &amp; REST API. |

## `configure authority router system services snmp-server`

SNMP server configuration.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-control`](#configure-authority-router-system-services-snmp-server-access-control) | SNMP access control policy. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-services-snmp-server-enabled) | Enable SNMP server on all control nodes in this router. |
| [`engine-id`](#configure-authority-router-system-services-snmp-server-engine-id) | The SNMPv3 Engine ID. |
| [`notification-receiver`](#configure-authority-router-system-services-snmp-server-notification-receiver) | List of SNMP receivers that the SNMP server will send notifications. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-router-system-services-snmp-server-port) | The port on which the SNMP server listens. |
| `show` | Show configuration data for &#x27;snmp-server&#x27; |
| [`vacm`](#configure-authority-router-system-services-snmp-server-vacm) | View-based Access Control Model settings. |
| [`version`](#configure-authority-router-system-services-snmp-server-version) | The SNMP server protocol version. |

## `configure authority router system services snmp-server access-control`

SNMP access control policy.

#### Usage

```
configure authority router system services snmp-server access-control <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for this access control policy. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`community`](#configure-authority-router-system-services-snmp-server-access-control-community) | The SNMP community string for this access-control policy. |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-router-system-services-snmp-server-access-control-name) | An arbitrary, unique name for this access control policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;access-control&#x27; |
| [`source`](#configure-authority-router-system-services-snmp-server-access-control-source) | The SNMP client host to restrict access to. |
| [`usm`](#configure-authority-router-system-services-snmp-server-access-control-usm) | User-based Security Model settings. |
| [`view`](#configure-authority-router-system-services-snmp-server-access-control-view) | The view to use for this access control policy. |

## `configure authority router system services snmp-server access-control community`

The SNMP community string for this access-control policy.

#### Usage

```
configure authority router system services snmp-server access-control community [<snmp-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-community | The value to set for this field |

## `configure authority router system services snmp-server access-control name`

An arbitrary, unique name for this access control policy.

#### Usage

```
configure authority router system services snmp-server access-control name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router system services snmp-server access-control source`

The SNMP client host to restrict access to.

#### Usage

```
configure authority router system services snmp-server access-control source [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router system services snmp-server access-control usm`

User-based Security Model settings.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authentication`](#configure-authority-router-system-services-snmp-server-access-control-usm-authentication) | Authentication type. |
| [`authentication-key`](#configure-authority-router-system-services-snmp-server-access-control-usm-authentication-key) | Authentication key. |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`privacy`](#configure-authority-router-system-services-snmp-server-access-control-usm-privacy) | Privacy type. |
| [`privacy-key`](#configure-authority-router-system-services-snmp-server-access-control-usm-privacy-key) | Privacy key. |
| `show` | Show configuration data for &#x27;usm&#x27; |
| [`user-name`](#configure-authority-router-system-services-snmp-server-access-control-usm-user-name) | USM User name. |

## `configure authority router system services snmp-server access-control usm authentication`

Authentication type.

#### Usage

```
configure authority router system services snmp-server access-control usm authentication [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system services snmp-server access-control usm authentication-key`

Authentication key.

#### Usage

```
configure authority router system services snmp-server access-control usm authentication-key [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system services snmp-server access-control usm privacy`

Privacy type.

#### Usage

```
configure authority router system services snmp-server access-control usm privacy [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system services snmp-server access-control usm privacy-key`

Privacy key.

#### Usage

```
configure authority router system services snmp-server access-control usm privacy-key [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system services snmp-server access-control usm user-name`

USM User name.

#### Usage

```
configure authority router system services snmp-server access-control usm user-name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router system services snmp-server access-control view`

The view to use for this access control policy.

#### Usage

```
configure authority router system services snmp-server access-control view [<snmp-vacm-view-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-vacm-view-ref | The value to set for this field |

## `configure authority router system services snmp-server enabled`

Enable SNMP server on all control nodes in this router.

#### Usage

```
configure authority router system services snmp-server enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system services snmp-server engine-id`

The SNMPv3 Engine ID.

#### Usage

```
configure authority router system services snmp-server engine-id [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system services snmp-server notification-receiver`

List of SNMP receivers that the SNMP server will send notifications.

#### Usage

```
configure authority router system services snmp-server notification-receiver <ip-address> <port> <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The address to which the SNMP servers send notifications. |
| port | The port to which the SNMP servers send notifications. |
| type | The type of notification to send. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-control`](#configure-authority-router-system-services-snmp-server-notification-receiver-access-control) | The access-control policy to use when notifying this receiver. |
| [`community`](#configure-authority-router-system-services-snmp-server-notification-receiver-community) | The SNMP community string to use when notifying this receiver. |
| `delete` | Delete configuration data |
| [`ip-address`](#configure-authority-router-system-services-snmp-server-notification-receiver-ip-address) | The address to which the SNMP servers send notifications. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-router-system-services-snmp-server-notification-receiver-port) | The port to which the SNMP servers send notifications. |
| `show` | Show configuration data for &#x27;notification-receiver&#x27; |
| [`type`](#configure-authority-router-system-services-snmp-server-notification-receiver-type) | The type of notification to send. |

## `configure authority router system services snmp-server notification-receiver access-control`

The access-control policy to use when notifying this receiver.

#### Usage

```
configure authority router system services snmp-server notification-receiver access-control [<snmp-access-control-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-access-control-ref | The value to set for this field |

## `configure authority router system services snmp-server notification-receiver community`

The SNMP community string to use when notifying this receiver.

#### Usage

```
configure authority router system services snmp-server notification-receiver community [<snmp-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-community | The value to set for this field |

#### Description

Warning: &#x27;community&#x27; is deprecated and will be removed in a future software version

## `configure authority router system services snmp-server notification-receiver ip-address`

The address to which the SNMP servers send notifications.

#### Usage

```
configure authority router system services snmp-server notification-receiver ip-address [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority router system services snmp-server notification-receiver port`

The port to which the SNMP servers send notifications.

#### Usage

```
configure authority router system services snmp-server notification-receiver port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router system services snmp-server notification-receiver type`

The type of notification to send.

#### Usage

```
configure authority router system services snmp-server notification-receiver type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system services snmp-server port`

The port on which the SNMP server listens.

#### Usage

```
configure authority router system services snmp-server port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router system services snmp-server vacm`

View-based Access Control Model settings.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;vacm&#x27; |
| [`view`](#configure-authority-router-system-services-snmp-server-vacm-view) | SNMP view policy. |

## `configure authority router system services snmp-server vacm view`

SNMP view policy.

#### Usage

```
configure authority router system services snmp-server vacm view <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for this view policy. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`excluded`](#configure-authority-router-system-services-snmp-server-vacm-view-excluded) | OID view to disallow. |
| [`included`](#configure-authority-router-system-services-snmp-server-vacm-view-included) | OID view to allow. |
| [`name`](#configure-authority-router-system-services-snmp-server-vacm-view-name) | An arbitrary, unique name for this view policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;view&#x27; |
| [`strict`](#configure-authority-router-system-services-snmp-server-vacm-view-strict) | When parsing the included OIDs, strict mode will prevent any OIDs that are not a part of the SSR supported OIDs from being added to the specified view. |

## `configure authority router system services snmp-server vacm view excluded`

OID view to disallow.

#### Usage

```
configure authority router system services snmp-server vacm view excluded [<snmp-oid>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-oid | Value to add to this list |

## `configure authority router system services snmp-server vacm view included`

OID view to allow.

#### Usage

```
configure authority router system services snmp-server vacm view included [<snmp-oid>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| snmp-oid | Value to add to this list |

## `configure authority router system services snmp-server vacm view name`

An arbitrary, unique name for this view policy.

#### Usage

```
configure authority router system services snmp-server vacm view name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority router system services snmp-server vacm view strict`

When parsing the included OIDs, strict mode will prevent any OIDs that are not a part of the SSR supported OIDs from being added to the specified view.

#### Usage

```
configure authority router system services snmp-server vacm view strict [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system services snmp-server version`

The SNMP server protocol version.

#### Usage

```
configure authority router system services snmp-server version [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system services webserver`

Web server &amp; REST API.

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-router-system-services-webserver-enabled) | Enable Web server &amp; REST API on all control nodes in this router. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-router-system-services-webserver-port) | The port on which the Web servers listen. |
| [`server`](#configure-authority-router-system-services-webserver-server) | List of control node server addresses. When present, they override the defaults from global configuration. |
| `show` | Show configuration data for &#x27;webserver&#x27; |

## `configure authority router system services webserver enabled`

Enable Web server &amp; REST API on all control nodes in this router.

#### Usage

```
configure authority router system services webserver enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system services webserver port`

The port on which the Web servers listen.

#### Usage

```
configure authority router system services webserver port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router system services webserver server`

List of control node server addresses. When present, they override the defaults from global configuration.

#### Usage

```
configure authority router system services webserver server <node-name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node-name | The name of the control node. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`ip-address`](#configure-authority-router-system-services-webserver-server-ip-address) | IP address for the server on the control node. |
| [`node-name`](#configure-authority-router-system-services-webserver-server-node-name) | The name of the control node. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;server&#x27; |

## `configure authority router system services webserver server ip-address`

IP address for the server on the control node.

#### Usage

```
configure authority router system services webserver server ip-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority router system services webserver server node-name`

The name of the control node.

#### Usage

```
configure authority router system services webserver server node-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority router system software-update`

Configuration for SSR software updates. Supported on managed assets only.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`max-bandwidth`](#configure-authority-router-system-software-update-max-bandwidth) | Bandwidth limit for downloads of software updates. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`repository`](#configure-authority-router-system-software-update-repository) | Configuration for how to retrieve software updates. |
| `show` | Show configuration data for &#x27;software-update&#x27; |

## `configure authority router system software-update max-bandwidth`

Bandwidth limit for downloads of software updates.

#### Usage

```
configure authority router system software-update max-bandwidth [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

#### Description

Units: bits/second

## `configure authority router system software-update repository`

Configuration for how to retrieve software updates.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-router-system-software-update-repository-address) | The address of the Conductor to use as a proxy to the Internet. |
| `delete` | Delete configuration data |
| [`offline-mode`](#configure-authority-router-system-software-update-repository-offline-mode) | Software updates are received through the Conductor without internet connectivity |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;repository&#x27; |
| [`source-type`](#configure-authority-router-system-software-update-repository-source-type) | The location from which to retrieve software updates. |

## `configure authority router system software-update repository address`

The address of the Conductor to use as a proxy to the Internet.

#### Usage

```
configure authority router system software-update repository address [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority router system software-update repository offline-mode`

Software updates are received through the Conductor without internet connectivity

#### Usage

```
configure authority router system software-update repository offline-mode [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority router system software-update repository source-type`

The location from which to retrieve software updates.

#### Usage

```
configure authority router system software-update repository source-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system syslog`

Syslog configuration lets administrators configure the SSR&#x27;s interaction with external syslog services.

##### Subcommands

| command | description |
| ------- | ----------- |
| [`client-certificate-name`](#configure-authority-router-system-syslog-client-certificate-name) | A client certificate to be used to communicate with syslog server. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`facility`](#configure-authority-router-system-syslog-facility) | The facility under which syslog messages will be recorded. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`protocol`](#configure-authority-router-system-syslog-protocol) | Use TCP or UDP protocol to communicate with syslog server. |
| [`server`](#configure-authority-router-system-syslog-server) | The list of syslog servers configured for this device. |
| [`severity`](#configure-authority-router-system-syslog-severity) | Sets the level at which messages will be sent to the syslog server. |
| `show` | Show configuration data for &#x27;syslog&#x27; |

## `configure authority router system syslog client-certificate-name`

A client certificate to be used to communicate with syslog server.

#### Usage

```
configure authority router system syslog client-certificate-name [<client-certificate-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| client-certificate-ref | The value to set for this field |

## `configure authority router system syslog facility`

The facility under which syslog messages will be recorded.

#### Usage

```
configure authority router system syslog facility [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system syslog protocol`

Use TCP or UDP protocol to communicate with syslog server.

#### Usage

```
configure authority router system syslog protocol [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router system syslog server`

The list of syslog servers configured for this device.

#### Usage

```
configure authority router system syslog server <ip-address> <port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The address of remote syslog server. |
| port | The port on which remote syslog server listens |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`ip-address`](#configure-authority-router-system-syslog-server-ip-address) | The address of remote syslog server. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port`](#configure-authority-router-system-syslog-server-port) | The port on which remote syslog server listens |
| `show` | Show configuration data for &#x27;server&#x27; |

## `configure authority router system syslog server ip-address`

The address of remote syslog server.

#### Usage

```
configure authority router system syslog server ip-address [<host>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host | The value to set for this field |

## `configure authority router system syslog server port`

The port on which remote syslog server listens

#### Usage

```
configure authority router system syslog server port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority router system syslog severity`

Sets the level at which messages will be sent to the syslog server.

#### Usage

```
configure authority router system syslog severity [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router udp-transform`

UDP transform settings for interoperating with stateful TCP firewalls for nodes within the router.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`detect-interval`](#configure-authority-router-udp-transform-detect-interval) | Represents the frequency with which the stateful TCP firewall discovery is performed. |
| [`mode`](#configure-authority-router-udp-transform-mode) | Configure Mode |
| [`nat-keep-alive-mode`](#configure-authority-router-udp-transform-nat-keep-alive-mode) | Configure Nat Keep Alive Mode |
| [`nat-keep-alive-timeout`](#configure-authority-router-udp-transform-nat-keep-alive-timeout) | Represents the frequency with which keep-alive packets are generated. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;udp-transform&#x27; |

## `configure authority router udp-transform detect-interval`

Represents the frequency with which the stateful TCP firewall discovery is performed.

#### Usage

```
configure authority router udp-transform detect-interval [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority router udp-transform mode`

Configure Mode

#### Usage

```
configure authority router udp-transform mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router udp-transform nat-keep-alive-mode`

Configure Nat Keep Alive Mode

#### Usage

```
configure authority router udp-transform nat-keep-alive-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority router udp-transform nat-keep-alive-timeout`

Represents the frequency with which keep-alive packets are generated.

#### Usage

```
configure authority router udp-transform nat-keep-alive-timeout [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: seconds

## `configure authority routing`

authority level routing configuration

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`filter`](#configure-authority-routing-filter) | A filter which operates on a set of objects and returns accept or reject to be used by other constructs to process the objects |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-routing-policy) | A construct for processing which consists of a set of statements executed in sequence |
| [`resource-group`](#configure-authority-routing-resource-group) | Associate this routing configuration with a top-level resource-group. |
| `show` | Show configuration data for &#x27;routing&#x27; |

## `configure authority routing filter`

A filter which operates on a set of objects and returns accept or reject to be used by other constructs to process the objects

#### Usage

```
configure authority routing filter <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`move`](#configure-authority-routing-filter-move) | Move list items |
| [`name`](#configure-authority-routing-filter-name) | An arbitrary identifying name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rule`](#configure-authority-routing-filter-rule) | A fragment of the filter which defines a subset of the logic on how to process the objects going through the filter |
| `show` | Show configuration data for &#x27;filter&#x27; |
| [`type`](#configure-authority-routing-filter-type) | A filter type |

## `configure authority routing filter move rule`

A fragment of the filter which defines a subset of the logic on how to process the objects going through the filter

#### Usage

```
configure authority routing filter move rule <name> <position> [<relative-to-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |
| position | first \| after \| before \| last |
| relative-to-name | Key of item before or after which to move |

## `configure authority routing filter name`

An arbitrary identifying name

#### Usage

```
configure authority routing filter name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority routing filter rule`

A fragment of the filter which defines a subset of the logic on how to process the objects going through the filter

#### Usage

```
configure authority routing filter rule <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`as-path`](#configure-authority-routing-filter-rule-as-path) | An AS-path regex to match on |
| [`community`](#configure-authority-routing-filter-rule-community) | A BGP community regex to match on |
| `delete` | Delete configuration data |
| [`extended-community`](#configure-authority-routing-filter-rule-extended-community) | A BGP extended community regex to match on |
| [`filter`](#configure-authority-routing-filter-rule-filter) | Filter action indicating how to handle elements matching the rule |
| [`ge`](#configure-authority-routing-filter-rule-ge) | Match the prefix greater than or equal to said prefix length |
| [`le`](#configure-authority-routing-filter-rule-le) | Match the prefix less than or equal to said prefix length |
| [`name`](#configure-authority-routing-filter-rule-name) | An arbitrary identifying name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`prefix`](#configure-authority-routing-filter-rule-prefix) | The prefix to match |
| `show` | Show configuration data for &#x27;rule&#x27; |

## `configure authority routing filter rule as-path`

An AS-path regex to match on

#### Usage

```
configure authority routing filter rule as-path [<regex>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| regex | The value to set for this field |

## `configure authority routing filter rule community`

A BGP community regex to match on

#### Usage

```
configure authority routing filter rule community [<regex>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| regex | The value to set for this field |

## `configure authority routing filter rule extended-community`

A BGP extended community regex to match on

#### Usage

```
configure authority routing filter rule extended-community [<regex>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| regex | The value to set for this field |

## `configure authority routing filter rule filter`

Filter action indicating how to handle elements matching the rule

#### Usage

```
configure authority routing filter rule filter [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority routing filter rule ge`

Match the prefix greater than or equal to said prefix length

#### Usage

```
configure authority routing filter rule ge [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority routing filter rule le`

Match the prefix less than or equal to said prefix length

#### Usage

```
configure authority routing filter rule le [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority routing filter rule name`

An arbitrary identifying name

#### Usage

```
configure authority routing filter rule name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority routing filter rule prefix`

The prefix to match

#### Usage

```
configure authority routing filter rule prefix [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | The value to set for this field |

## `configure authority routing filter type`

A filter type

#### Usage

```
configure authority routing filter type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority routing policy`

A construct for processing which consists of a set of statements executed in sequence

#### Usage

```
configure authority routing policy <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`move`](#configure-authority-routing-policy-move) | Move list items |
| [`name`](#configure-authority-routing-policy-name) | An arbitrary identifying name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;policy&#x27; |
| [`statement`](#configure-authority-routing-policy-statement) | A fragment of a policy that is executed in sequence. A statement is executed by first running the conditions. If all the conditions match (or if no conditions are specified) the policy (accept or reject) is consulted. An accept means execute the actions in the statement and then terminate the policy returning accept. A reject means do not execute the actions and terminate the policy returning reject. The accept terminating the policy may be modified by flow actions. If a policy reaches the end of the statement list and no statement has been executed there is an implicit reject |

## `configure authority routing policy move statement`

A fragment of a policy that is executed in sequence. A statement is executed by first running the conditions. If all the conditions match (or if no conditions are specified) the policy (accept or reject) is consulted. An accept means execute the actions in the statement and then terminate the policy returning accept. A reject means do not execute the actions and terminate the policy returning reject. The accept terminating the policy may be modified by flow actions. If a policy reaches the end of the statement list and no statement has been executed there is an implicit reject

#### Usage

```
configure authority routing policy move statement <name> <position> [<relative-to-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |
| position | first \| after \| before \| last |
| relative-to-name | Key of item before or after which to move |

## `configure authority routing policy name`

An arbitrary identifying name

#### Usage

```
configure authority routing policy name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority routing policy statement`

A fragment of a policy that is executed in sequence. A statement is executed by first running the conditions. If all the conditions match (or if no conditions are specified) the policy (accept or reject) is consulted. An accept means execute the actions in the statement and then terminate the policy returning accept. A reject means do not execute the actions and terminate the policy returning reject. The accept terminating the policy may be modified by flow actions. If a policy reaches the end of the statement list and no statement has been executed there is an implicit reject

#### Usage

```
configure authority routing policy statement <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary identifying name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`action`](#configure-authority-routing-policy-statement-action) | The actions to take if the conditions evaluates to true and policy is accept. Flow altering actions are executed last |
| `clone` | Clone a list item |
| [`condition`](#configure-authority-routing-policy-statement-condition) | The conditions which define a match to the statement. |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-routing-policy-statement-name) | An arbitrary identifying name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`policy`](#configure-authority-routing-policy-statement-policy) | The policy action, accept or reject, to be returned if the conditions evaluate to true. If no conditions are given the condition evaluation is true |
| `show` | Show configuration data for &#x27;statement&#x27; |

## `configure authority routing policy statement action`

The actions to take if the conditions evaluates to true and policy is accept. Flow altering actions are executed last

#### Usage

```
configure authority routing policy statement action <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | The action type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`add`](#configure-authority-routing-policy-statement-action-add) | The metric value to add |
| [`additive`](#configure-authority-routing-policy-statement-action-additive) | Merge the community attribute values |
| [`aggregator-address`](#configure-authority-routing-policy-statement-action-aggregator-address) | The aggregator IP address |
| [`as`](#configure-authority-routing-policy-statement-action-as) | The aggregator as |
| [`bgp-weight`](#configure-authority-routing-policy-statement-action-bgp-weight) | The BGP weight value |
| [`community-attribute`](#configure-authority-routing-policy-statement-action-community-attribute) | The new community attribute values |
| [`community-filter`](#configure-authority-routing-policy-statement-action-community-filter) | The community filter to use to remove matching communities. |
| `delete` | Delete configuration data |
| [`distance`](#configure-authority-routing-policy-statement-action-distance) | The administrative distance value |
| [`exclude`](#configure-authority-routing-policy-statement-action-exclude) | The AS(s) to exclude from the as-path |
| [`ip-address`](#configure-authority-routing-policy-statement-action-ip-address) | The new next hop IP address to set |
| [`local-preference`](#configure-authority-routing-policy-statement-action-local-preference) | The local preference value |
| [`none`](#configure-authority-routing-policy-statement-action-none) | Remove all communities |
| [`origin`](#configure-authority-routing-policy-statement-action-origin) | The BGP origin value |
| [`originator-id`](#configure-authority-routing-policy-statement-action-originator-id) | The new originator id to set |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer-address`](#configure-authority-routing-policy-statement-action-peer-address) | Set the next hop to the IP address of the peer |
| [`policy`](#configure-authority-routing-policy-statement-action-policy) | The policy to call. If this policy returns reject then the current policy will terminate and return reject |
| [`prepend`](#configure-authority-routing-policy-statement-action-prepend) | The AS(s) to prepend to the as-path |
| [`route-target`](#configure-authority-routing-policy-statement-action-route-target) | The new extended-community route target value |
| [`service-policy`](#configure-authority-routing-policy-statement-action-service-policy) | The service policy to select the best path. |
| [`set`](#configure-authority-routing-policy-statement-action-set) | The metric value |
| `show` | Show configuration data for &#x27;action&#x27; |
| [`site-of-origin`](#configure-authority-routing-policy-statement-action-site-of-origin) | The new extended-community site of origin value |
| [`statement`](#configure-authority-routing-policy-statement-action-statement) | The statement to process next which must be after the current statement. |
| [`subtract`](#configure-authority-routing-policy-statement-action-subtract) | The metric value to subtract |
| [`tag`](#configure-authority-routing-policy-statement-action-tag) | The tag value |
| [`type`](#configure-authority-routing-policy-statement-action-type) | The action type |

## `configure authority routing policy statement action add`

The metric value to add

#### Usage

```
configure authority routing policy statement action add [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action additive`

Merge the community attribute values

#### Usage

```
configure authority routing policy statement action additive
```

## `configure authority routing policy statement action aggregator-address`

The aggregator IP address

#### Usage

```
configure authority routing policy statement action aggregator-address [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority routing policy statement action as`

The aggregator as

#### Usage

```
configure authority routing policy statement action as [<as-number>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-number | The value to set for this field |

## `configure authority routing policy statement action bgp-weight`

The BGP weight value

#### Usage

```
configure authority routing policy statement action bgp-weight [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action community-attribute`

The new community attribute values

#### Usage

```
configure authority routing policy statement action community-attribute [<set-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-community | Value to add to this list |

## `configure authority routing policy statement action community-filter`

The community filter to use to remove matching communities.

#### Usage

```
configure authority routing policy statement action community-filter [<filter-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filter-ref | The value to set for this field |

## `configure authority routing policy statement action distance`

The administrative distance value

#### Usage

```
configure authority routing policy statement action distance [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority routing policy statement action exclude`

The AS(s) to exclude from the as-path

#### Usage

```
configure authority routing policy statement action exclude [<as-path>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-path | The value to set for this field |

## `configure authority routing policy statement action ip-address`

The new next hop IP address to set

#### Usage

```
configure authority routing policy statement action ip-address [<unicast-non-default-ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| unicast-non-default-ipv4-address | The value to set for this field |

## `configure authority routing policy statement action local-preference`

The local preference value

#### Usage

```
configure authority routing policy statement action local-preference [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action none`

Remove all communities

#### Usage

```
configure authority routing policy statement action none
```

## `configure authority routing policy statement action origin`

The BGP origin value

#### Usage

```
configure authority routing policy statement action origin [<origin>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| origin | The value to set for this field |

## `configure authority routing policy statement action originator-id`

The new originator id to set

#### Usage

```
configure authority routing policy statement action originator-id [<ipv4-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ipv4-address | The value to set for this field |

## `configure authority routing policy statement action peer-address`

Set the next hop to the IP address of the peer

#### Usage

```
configure authority routing policy statement action peer-address
```

## `configure authority routing policy statement action policy`

The policy to call. If this policy returns reject then the current policy will terminate and return reject

#### Usage

```
configure authority routing policy statement action policy [<policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-ref | The value to set for this field |

## `configure authority routing policy statement action prepend`

The AS(s) to prepend to the as-path

#### Usage

```
configure authority routing policy statement action prepend [<as-path>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| as-path | The value to set for this field |

## `configure authority routing policy statement action route-target`

The new extended-community route target value

#### Usage

```
configure authority routing policy statement action route-target [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority routing policy statement action service-policy`

The service policy to select the best path.

#### Usage

```
configure authority routing policy statement action service-policy [<service-policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-ref | The value to set for this field |

## `configure authority routing policy statement action set`

The metric value

#### Usage

```
configure authority routing policy statement action set [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action site-of-origin`

The new extended-community site of origin value

#### Usage

```
configure authority routing policy statement action site-of-origin [<set-extended-community>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| set-extended-community | Value to add to this list |

## `configure authority routing policy statement action statement`

The statement to process next which must be after the current statement.

#### Usage

```
configure authority routing policy statement action statement [<policy-statement-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| policy-statement-ref | The value to set for this field |

## `configure authority routing policy statement action subtract`

The metric value to subtract

#### Usage

```
configure authority routing policy statement action subtract [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action tag`

The tag value

#### Usage

```
configure authority routing policy statement action tag [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement action type`

The action type

#### Usage

```
configure authority routing policy statement action type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority routing policy statement condition`

The conditions which define a match to the statement.

#### Usage

```
configure authority routing policy statement condition <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | The condition type |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`as-path-filter`](#configure-authority-routing-policy-statement-condition-as-path-filter) | The autonomous system path filter name |
| [`community-filter`](#configure-authority-routing-policy-statement-condition-community-filter) | The community filter name |
| `delete` | Delete configuration data |
| [`extended-community-filter`](#configure-authority-routing-policy-statement-condition-extended-community-filter) | The extended community filter name |
| [`metric`](#configure-authority-routing-policy-statement-condition-metric) | The metric value to match on. |
| [`next-hop-interface`](#configure-authority-routing-policy-statement-condition-next-hop-interface) | Name of the next hop interface to match on |
| [`next-hop-node`](#configure-authority-routing-policy-statement-condition-next-hop-node) | Name of the node the next hop interface resides on. |
| [`origin`](#configure-authority-routing-policy-statement-condition-origin) | The BGP origin to match on |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`peer-address`](#configure-authority-routing-policy-statement-condition-peer-address) | The peer address to match |
| [`peer-local`](#configure-authority-routing-policy-statement-condition-peer-local) | Match local addresses (static or redistributed routes) |
| [`prefix-filter`](#configure-authority-routing-policy-statement-condition-prefix-filter) | The prefix filter name |
| [`probability`](#configure-authority-routing-policy-statement-condition-probability) | The probability of a match |
| `show` | Show configuration data for &#x27;condition&#x27; |
| [`tag`](#configure-authority-routing-policy-statement-condition-tag) | The tag to match |
| [`type`](#configure-authority-routing-policy-statement-condition-type) | The condition type |

## `configure authority routing policy statement condition as-path-filter`

The autonomous system path filter name

#### Usage

```
configure authority routing policy statement condition as-path-filter [<filter-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filter-ref | The value to set for this field |

## `configure authority routing policy statement condition community-filter`

The community filter name

#### Usage

```
configure authority routing policy statement condition community-filter [<filter-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filter-ref | The value to set for this field |

## `configure authority routing policy statement condition extended-community-filter`

The extended community filter name

#### Usage

```
configure authority routing policy statement condition extended-community-filter [<filter-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filter-ref | The value to set for this field |

## `configure authority routing policy statement condition metric`

The metric value to match on.

#### Usage

```
configure authority routing policy statement condition metric [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement condition next-hop-interface`

Name of the next hop interface to match on

#### Usage

```
configure authority routing policy statement condition next-hop-interface [<network-interface-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| network-interface-ref | The value to set for this field |

## `configure authority routing policy statement condition next-hop-node`

Name of the node the next hop interface resides on.

#### Usage

```
configure authority routing policy statement condition next-hop-node [<node-name-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| node-name-ref | The value to set for this field |

## `configure authority routing policy statement condition origin`

The BGP origin to match on

#### Usage

```
configure authority routing policy statement condition origin [<origin>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| origin | The value to set for this field |

## `configure authority routing policy statement condition peer-address`

The peer address to match

#### Usage

```
configure authority routing policy statement condition peer-address [<ip-address>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address | The value to set for this field |

## `configure authority routing policy statement condition peer-local`

Match local addresses (static or redistributed routes)

#### Usage

```
configure authority routing policy statement condition peer-local
```

## `configure authority routing policy statement condition prefix-filter`

The prefix filter name

#### Usage

```
configure authority routing policy statement condition prefix-filter [<filter-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filter-ref | The value to set for this field |

## `configure authority routing policy statement condition probability`

The probability of a match

#### Usage

```
configure authority routing policy statement condition probability [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

## `configure authority routing policy statement condition tag`

The tag to match

#### Usage

```
configure authority routing policy statement condition tag [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

## `configure authority routing policy statement condition type`

The condition type

#### Usage

```
configure authority routing policy statement condition type [<identityref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| identityref | The value to set for this field |

## `configure authority routing policy statement name`

An arbitrary identifying name

#### Usage

```
configure authority routing policy statement name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority routing policy statement policy`

The policy action, accept or reject, to be returned if the conditions evaluate to true. If no conditions are given the condition evaluation is true

#### Usage

```
configure authority routing policy statement policy [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority routing resource-group`

Associate this routing configuration with a top-level resource-group.

#### Usage

```
configure authority routing resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority security`

The security elements represent security policies for governing how and when the SSR encrypts and/or authenticates packets.

#### Usage

```
configure authority security <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the security policy, used to reference it in other configuration sections. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`adaptive-encryption`](#configure-authority-security-adaptive-encryption) | Prevent packets that are detected as encrypted from being encrypted again as they pass through the router. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-security-description) | A description of the security policy. |
| [`encrypt`](#configure-authority-security-encrypt) | When enabled, the router will encrypt metadata (between nodes or routers) or payload (for a service or a tenant). |
| [`encryption-cipher`](#configure-authority-security-encryption-cipher) | Encryption cipher and mode. |
| [`encryption-iv`](#configure-authority-security-encryption-iv) | The initialization vector (IV) for encryption. |
| [`encryption-key`](#configure-authority-security-encryption-key) | The encryption key for the security policy. |
| [`hmac`](#configure-authority-security-hmac) | Whether or not to add HMAC to a packet. |
| [`hmac-cipher`](#configure-authority-security-hmac-cipher) | The cipher used for generating the HMAC value inserted into metadata. |
| [`hmac-key`](#configure-authority-security-hmac-key) | The HMAC key for the security policy. |
| [`hmac-mode`](#configure-authority-security-hmac-mode) | Whether or not to add HMAC to packets. |
| [`name`](#configure-authority-security-name) | An arbitrary, unique name for the security policy, used to reference it in other configuration sections. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-security-resource-group) | Associate this security with a top-level resource-group. |
| `show` | Show configuration data for &#x27;security&#x27; |

## `configure authority security adaptive-encryption`

Prevent packets that are detected as encrypted from being encrypted again as they pass through the router.

#### Usage

```
configure authority security adaptive-encryption [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority security description`

A description of the security policy.

#### Usage

```
configure authority security description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority security encrypt`

When enabled, the router will encrypt metadata (between nodes or routers) or payload (for a service or a tenant).

#### Usage

```
configure authority security encrypt [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority security encryption-cipher`

Encryption cipher and mode.

#### Usage

```
configure authority security encryption-cipher [<encryption-cipher>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| encryption-cipher | The value to set for this field |

## `configure authority security encryption-iv`

The initialization vector (IV) for encryption.

#### Usage

```
configure authority security encryption-iv [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority security encryption-key`

The encryption key for the security policy.

#### Usage

```
configure authority security encryption-key [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority security hmac`

Whether or not to add HMAC to a packet.

#### Usage

```
configure authority security hmac [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

#### Description

Warning: &#x27;hmac&#x27; is deprecated and will be removed in a future software version

## `configure authority security hmac-cipher`

The cipher used for generating the HMAC value inserted into metadata.

#### Usage

```
configure authority security hmac-cipher [<hmac-cipher>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hmac-cipher | The value to set for this field |

## `configure authority security hmac-key`

The HMAC key for the security policy.

#### Usage

```
configure authority security hmac-key [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority security hmac-mode`

Whether or not to add HMAC to packets.

#### Usage

```
configure authority security hmac-mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority security name`

An arbitrary, unique name for the security policy, used to reference it in other configuration sections.

#### Usage

```
configure authority security name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority security resource-group`

Associate this security with a top-level resource-group.

#### Usage

```
configure authority security resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority service`

The service configuration is where you define the services that reside within the authority&#x27;s tenants as well as the policies to apply to those services.

#### Usage

```
configure authority service <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the service such as the domain/host name portion of the URL to reach the service. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`access-policy`](#configure-authority-service-access-policy) | List of access policies by address prefix, QSN or tenant and prefix. |
| [`access-policy-generated`](#configure-authority-service-access-policy-generated) | Indicates whether or not the access-policy configuration was automatically created during conductor service generation. |
| [`address`](#configure-authority-service-address) | The destination address prefix or hostname to match the route. |
| [`application-identification`](#configure-authority-service-application-identification) | Application identification mode. |
| [`application-name`](#configure-authority-service-application-name) | Application name to identify application. This will be matched against the Domain Names imported via the application modules |
| [`application-type`](#configure-authority-service-application-type) | Use generic service behavior, or custom application specific logic. |
| [`applies-to`](#configure-authority-service-applies-to) | Logical group to which a configuration element applies |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-service-description) | A description about the service/application. |
| [`domain-name`](#configure-authority-service-domain-name) | Domain name that identifies a service. Traffic matching this domain name will be considered to belong to this service. |
| [`domain-name-category`](#configure-authority-service-domain-name-category) | Domain name categorization of this service. This will be matched against the imported categories using the domain pulled from the data stream |
| [`dscp-range`](#configure-authority-service-dscp-range) | When matched with a dscp-steering configuration in the network-interface, this dscp-range allows tunnel traffic to be matched to a more specific service via DSCP value. |
| [`enabled`](#configure-authority-service-enabled) | Enable/disable the service. When disabled, packets addressed to this service&#x27;s address(es) will not be processed. |
| [`fqdn-resolution-type`](#configure-authority-service-fqdn-resolution-type) | IP address family to use for FQDN resolutions for this service. |
| [`generate-categories`](#configure-authority-service-generate-categories) | Automatically generate category-based application identification services under this service. |
| [`generated`](#configure-authority-service-generated) | Indicates whether or not the Service was automatically generated as a result of Conductor, BGP/SVR, or DHCP Relay services. |
| [`multicast-sender-policy`](#configure-authority-service-multicast-sender-policy) | List of multicast sender policies by address prefix, QSN or tenant and prefix. |
| [`name`](#configure-authority-service-name) | An arbitrary, unique name for the service such as the domain/host name portion of the URL to reach the service. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`scope`](#configure-authority-service-scope) | Defines whether or not tenantless sources have access to this service. |
| [`security`](#configure-authority-service-security) | The name of the security policy to use for the service |
| [`service-group`](#configure-authority-service-service-group) | A string used to group services together, where each service with the same string gets added to the service group. Service Groups can be referenced within the QSN to target a group of services. |
| [`service-policy`](#configure-authority-service-service-policy) | Service policy that applies to the service. |
| [`session-record`](#configure-authority-service-session-record) | Settings related to session records. |
| [`share-service-routes`](#configure-authority-service-share-service-routes) | Enable/disable sharing of service routes with other routers via STEP. |
| `show` | Show configuration data for &#x27;service&#x27; |
| [`source-nat`](#configure-authority-service-source-nat) | Configure Source Nat |
| [`subcategory`](#configure-authority-service-subcategory) | Subcategory of this service. This will be matched against the subcategory classification derived from the data stream. Subcategories are treated as more specific matches than its enclosing category. |
| [`tap-multiplexing`](#configure-authority-service-tap-multiplexing) | Enable/disable tap-multiplexing on this service. |
| [`tenant`](#configure-authority-service-tenant) | The configured tenant. |
| [`transport`](#configure-authority-service-transport) | The transport protocol(s) and port(s) for the service. |
| [`ttl-padding`](#configure-authority-service-ttl-padding) | Configure Ttl Padding |
| [`url`](#configure-authority-service-url) | URL that identifies a service. Traffic matching this URL will be considered to belong to this service. |

## `configure authority service access-policy`

List of access policies by address prefix, QSN or tenant and prefix.

#### Usage

```
configure authority service access-policy <source>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`idp-policy`](#configure-authority-service-access-policy-idp-policy) | Built-in policy for intrusion detection prevention and monitoring. |
| [`idp-profile`](#configure-authority-service-access-policy-idp-profile) | User-defined profile for intrusion detection prevention and monitoring. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`permission`](#configure-authority-service-access-policy-permission) | Whether or not to allow access to the service. |
| `show` | Show configuration data for &#x27;access-policy&#x27; |
| [`source`](#configure-authority-service-access-policy-source) | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

## `configure authority service access-policy idp-policy`

Built-in policy for intrusion detection prevention and monitoring.

#### Usage

```
configure authority service access-policy idp-policy [<optional-idp-policy>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| optional-idp-policy | The value to set for this field |

## `configure authority service access-policy idp-profile`

User-defined profile for intrusion detection prevention and monitoring.

#### Usage

```
configure authority service access-policy idp-profile [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | The value to set for this field |

## `configure authority service access-policy permission`

Whether or not to allow access to the service.

#### Usage

```
configure authority service access-policy permission [<access-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| access-mode | The value to set for this field |

## `configure authority service access-policy source`

The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service

#### Usage

```
configure authority service access-policy source [<source-spec>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source-spec | The value to set for this field |

## `configure authority service access-policy-generated`

Indicates whether or not the access-policy configuration was automatically created during conductor service generation.

#### Usage

```
configure authority service access-policy-generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service address`

The destination address prefix or hostname to match the route.

#### Usage

```
configure authority service address [<host-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| host-prefix | Value to add to this list |

## `configure authority service application-identification`

Application identification mode.

#### Usage

```
configure authority service application-identification [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service application-name`

Application name to identify application. This will be matched against the Domain Names imported via the application modules

#### Usage

```
configure authority service application-name [<glob-pattern>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| glob-pattern | Value to add to this list |

## `configure authority service application-type`

Use generic service behavior, or custom application specific logic.

#### Usage

```
configure authority service application-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service applies-to`

Logical group to which a configuration element applies

#### Usage

```
configure authority service applies-to <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | Type of group to which the configuration applies. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group-name`](#configure-authority-service-applies-to-group-name) | Name of the router-group to which this configuration applies. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-service-applies-to-resource-group) | Name of the resource-group to which this configuration applies. |
| [`router-name`](#configure-authority-service-applies-to-router-name) | Name of the router to which this configuration applies. |
| `show` | Show configuration data for &#x27;applies-to&#x27; |
| [`type`](#configure-authority-service-applies-to-type) | Type of group to which the configuration applies. |

## `configure authority service applies-to group-name`

Name of the router-group to which this configuration applies.

#### Usage

```
configure authority service applies-to group-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority service applies-to resource-group`

Name of the resource-group to which this configuration applies.

#### Usage

```
configure authority service applies-to resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority service applies-to router-name`

Name of the router to which this configuration applies.

#### Usage

```
configure authority service applies-to router-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority service applies-to type`

Type of group to which the configuration applies.

#### Usage

```
configure authority service applies-to type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service description`

A description about the service/application.

#### Usage

```
configure authority service description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority service domain-name`

Domain name that identifies a service. Traffic matching this domain name will be considered to belong to this service.

#### Usage

```
configure authority service domain-name [<glob-pattern>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| glob-pattern | Value to add to this list |

## `configure authority service domain-name-category`

Domain name categorization of this service. This will be matched against the imported categories using the domain pulled from the data stream

#### Usage

```
configure authority service domain-name-category [<domain-category-type>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| domain-category-type | Value to add to this list |

## `configure authority service dscp-range`

When matched with a dscp-steering configuration in the network-interface, this dscp-range allows tunnel traffic to be matched to a more specific service via DSCP value.

#### Usage

```
configure authority service dscp-range <start-value>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-value | Lower DSCP number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-value`](#configure-authority-service-dscp-range-end-value) | Upper DSCP number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;dscp-range&#x27; |
| [`start-value`](#configure-authority-service-dscp-range-start-value) | Lower DSCP number. |

## `configure authority service dscp-range end-value`

Upper DSCP number.

#### Usage

```
configure authority service dscp-range end-value [<dscp-end-value>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp-end-value | The value to set for this field |

## `configure authority service dscp-range start-value`

Lower DSCP number.

#### Usage

```
configure authority service dscp-range start-value [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority service enabled`

Enable/disable the service. When disabled, packets addressed to this service&#x27;s address(es) will not be processed.

#### Usage

```
configure authority service enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service fqdn-resolution-type`

IP address family to use for FQDN resolutions for this service.

#### Usage

```
configure authority service fqdn-resolution-type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service generate-categories`

Automatically generate category-based application identification services under this service.

#### Usage

```
configure authority service generate-categories [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service generated`

Indicates whether or not the Service was automatically generated as a result of Conductor, BGP/SVR, or DHCP Relay services.

#### Usage

```
configure authority service generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service multicast-sender-policy`

List of multicast sender policies by address prefix, QSN or tenant and prefix.

#### Usage

```
configure authority service multicast-sender-policy <source>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`permission`](#configure-authority-service-multicast-sender-policy-permission) | Whether or not to allow access to the service. |
| `show` | Show configuration data for &#x27;multicast-sender-policy&#x27; |
| [`source`](#configure-authority-service-multicast-sender-policy-source) | The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service |

## `configure authority service multicast-sender-policy permission`

Whether or not to allow access to the service.

#### Usage

```
configure authority service multicast-sender-policy permission [<access-mode>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| access-mode | The value to set for this field |

## `configure authority service multicast-sender-policy source`

The source QSN or address(es) to which the policy applies. For a QSN, this may be a tenant, service-group, or service, or a combination there of. The following forms are valid: tenant tenant/service-group/ tenant/service-group/service tenant/service /service-group/ /service-group/service /service

#### Usage

```
configure authority service multicast-sender-policy source [<source-spec>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| source-spec | The value to set for this field |

## `configure authority service name`

An arbitrary, unique name for the service such as the domain/host name portion of the URL to reach the service.

#### Usage

```
configure authority service name [<service-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-name | The value to set for this field |

## `configure authority service scope`

Defines whether or not tenantless sources have access to this service.

#### Usage

```
configure authority service scope [<service-scope>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-scope | The value to set for this field |

## `configure authority service security`

The name of the security policy to use for the service

#### Usage

```
configure authority service security [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

## `configure authority service service-group`

A string used to group services together, where each service with the same string gets added to the service group. Service Groups can be referenced within the QSN to target a group of services.

#### Usage

```
configure authority service service-group [<service-group>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-group | The value to set for this field |

## `configure authority service service-policy`

Service policy that applies to the service.

#### Usage

```
configure authority service service-policy [<service-policy-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-ref | The value to set for this field |

## `configure authority service session-record`

Settings related to session records.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`include-hierarchical-services`](#configure-authority-service-session-record-include-hierarchical-services) | Enable/disable session-record-profile inheritance to ancestor hierarchical services. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`profile`](#configure-authority-service-session-record-profile) | The session record profile to use. |
| `show` | Show configuration data for &#x27;session-record&#x27; |

## `configure authority service session-record include-hierarchical-services`

Enable/disable session-record-profile inheritance to ancestor hierarchical services.

#### Usage

```
configure authority service session-record include-hierarchical-services [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service session-record profile`

The session record profile to use.

#### Usage

```
configure authority service session-record profile [<short-name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| short-name-id | The value to set for this field |

## `configure authority service share-service-routes`

Enable/disable sharing of service routes with other routers via STEP.

#### Usage

```
configure authority service share-service-routes [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service source-nat`

Configure Source Nat

#### Usage

```
configure authority service source-nat [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service subcategory`

Subcategory of this service. This will be matched against the subcategory classification derived from the data stream. Subcategories are treated as more specific matches than its enclosing category.

#### Usage

```
configure authority service subcategory [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | Value to add to this list |

## `configure authority service tap-multiplexing`

Enable/disable tap-multiplexing on this service.

#### Usage

```
configure authority service tap-multiplexing [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service tenant`

The configured tenant.

#### Usage

```
configure authority service tenant [<tenant-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-ref | The value to set for this field |

#### Description

Warning: &#x27;tenant&#x27; is deprecated and will be removed in a future software version

## `configure authority service transport`

The transport protocol(s) and port(s) for the service.

#### Usage

```
configure authority service transport <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | Layer 4 transport protocol. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-range`](#configure-authority-service-transport-port-range) | Configure Port Range |
| [`protocol`](#configure-authority-service-transport-protocol) | Layer 4 transport protocol. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority service transport port-range`

Configure Port Range

#### Usage

```
configure authority service transport port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-service-transport-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-service-transport-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority service transport port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority service transport port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority service transport port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority service transport port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority service transport protocol`

Layer 4 transport protocol.

#### Usage

```
configure authority service transport protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority service ttl-padding`

Configure Ttl Padding

#### Usage

```
configure authority service ttl-padding [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service url`

URL that identifies a service. Traffic matching this URL will be considered to belong to this service.

#### Usage

```
configure authority service url [<glob-pattern>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| glob-pattern | Value to add to this list |

## `configure authority service-class`

Defines the association between DSCP value and a priority queue.

#### Usage

```
configure authority service-class <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Configure Name |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`aggregate-rate-limit-policy`](#configure-authority-service-class-aggregate-rate-limit-policy) | Apply this rate limiting policy for all incoming traffic for services associated with this service-class. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-service-class-description) | A description of the service class. |
| [`dscp`](#configure-authority-service-class-dscp) | The DSCP value assigned to this service class to mark egress packets with. |
| [`max-flow-burst`](#configure-authority-service-class-max-flow-burst) | Limit the maximum burst size of each flow of this service class to this value. |
| [`max-flow-rate`](#configure-authority-service-class-max-flow-rate) | Limit the maximum rate of each flow of this service class to this value. |
| [`name`](#configure-authority-service-class-name) | Configure Name |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`rate-limit`](#configure-authority-service-class-rate-limit) | Enable/disable rate limiting for flows of this service class. |
| [`resource-group`](#configure-authority-service-class-resource-group) | Associate this service class with a top-level resource-group. |
| `show` | Show configuration data for &#x27;service-class&#x27; |
| [`traffic-class`](#configure-authority-service-class-traffic-class) | The traffic-class assigned to this service class. Governs the treatment for the traffic. |

## `configure authority service-class aggregate-rate-limit-policy`

Apply this rate limiting policy for all incoming traffic for services associated with this service-class.

#### Usage

```
configure authority service-class aggregate-rate-limit-policy [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority service-class description`

A description of the service class.

#### Usage

```
configure authority service-class description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority service-class dscp`

The DSCP value assigned to this service class to mark egress packets with.

#### Usage

```
configure authority service-class dscp [<dscp>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| dscp | The value to set for this field |

## `configure authority service-class max-flow-burst`

Limit the maximum burst size of each flow of this service class to this value.

#### Usage

```
configure authority service-class max-flow-burst [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits

## `configure authority service-class max-flow-rate`

Limit the maximum rate of each flow of this service class to this value.

#### Usage

```
configure authority service-class max-flow-rate [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: bits/second

## `configure authority service-class name`

Configure Name

#### Usage

```
configure authority service-class name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority service-class rate-limit`

Enable/disable rate limiting for flows of this service class.

#### Usage

```
configure authority service-class rate-limit [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service-class resource-group`

Associate this service class with a top-level resource-group.

#### Usage

```
configure authority service-class resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority service-class traffic-class`

The traffic-class assigned to this service class. Governs the treatment for the traffic.

#### Usage

```
configure authority service-class traffic-class [<traffic-class-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| traffic-class-id | The value to set for this field |

## `configure authority service-policy`

A service policy, which defines parameters applied to services that reference the policy

#### Usage

```
configure authority service-policy <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the service policy. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`applies-to`](#configure-authority-service-policy-applies-to) | Logical group to which a configuration element applies |
| [`best-effort`](#configure-authority-service-policy-best-effort) | Enable/disable filtering out paths that exceed the acceptable SLA threshold. When enabled, even if all paths do not meet the acceptable SLA threshold, they will be used as a best-effort |
| [`best-path-criteria`](#configure-authority-service-policy-best-path-criteria) | This defines the criteria for selecting best paths for the service. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-service-policy-description) | A description of the service policy. |
| [`forward-error-correction-profile`](#configure-authority-service-policy-forward-error-correction-profile) | Parameters for Forward Error Correction. |
| [`generated`](#configure-authority-service-policy-generated) | Indicates whether or not the Service Policy was automatically generated as a result of Conductor services. |
| [`ingress-source-nat`](#configure-authority-service-policy-ingress-source-nat) | Controls the ingress source nat treatment for the service |
| [`lb-strategy`](#configure-authority-service-policy-lb-strategy) | Defines load balancing strategy to distribute traffic to service routes of services assigned this policy. |
| [`max-jitter`](#configure-authority-service-policy-max-jitter) | Maximum acceptable jitter for services that use this service class. |
| [`max-latency`](#configure-authority-service-policy-max-latency) | Maximum acceptable latency for services that use this service class. |
| [`max-loss`](#configure-authority-service-policy-max-loss) | The acceptable threshold of packet loss for services that use this service class. |
| [`min-mos`](#configure-authority-service-policy-min-mos) | Minimum acceptable Mean Opinion Score (MOS) for services that use thus service class |
| [`move`](#configure-authority-service-policy-move) | Move list items |
| [`name`](#configure-authority-service-policy-name) | An arbitrary, unique name for the service policy. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`packet-resiliency`](#configure-authority-service-policy-packet-resiliency) | Types of packet resiliency govern how the SSR provides resilience for packets in the event of network loss. |
| [`path-quality-filter`](#configure-authority-service-policy-path-quality-filter) | Enable/disable filtering out paths that exceed maximum quality limits. |
| [`peer-path-resiliency`](#configure-authority-service-policy-peer-path-resiliency) | Whether or not session resiliency failover occurs among multiple peers. |
| [`qp-preference`](#configure-authority-service-policy-qp-preference) | Preference for ordering interfaces by QP values. |
| [`required-qp`](#configure-authority-service-policy-required-qp) | Minimum quality points required on network interface. |
| [`service-class`](#configure-authority-service-policy-service-class) | A reference to the name of the service class to use. |
| [`session-resiliency`](#configure-authority-service-policy-session-resiliency) | Types of session resiliency govern how the SSR provides resilience for sessions in the event of network issues that would cause it to choose a new path for active traffic processing. |
| `show` | Show configuration data for &#x27;service-policy&#x27; |
| [`transport-state-enforcement`](#configure-authority-service-policy-transport-state-enforcement) | The level of enforcement applied to the transport layer. Governs the behavior of the TCP state machine when processing packets. |
| [`vector`](#configure-authority-service-policy-vector) | List of vectors to prefer/avoid for the service. |

## `configure authority service-policy applies-to`

Logical group to which a configuration element applies

#### Usage

```
configure authority service-policy applies-to <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | Type of group to which the configuration applies. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group-name`](#configure-authority-service-policy-applies-to-group-name) | Name of the router-group to which this configuration applies. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-service-policy-applies-to-resource-group) | Name of the resource-group to which this configuration applies. |
| [`router-name`](#configure-authority-service-policy-applies-to-router-name) | Name of the router to which this configuration applies. |
| `show` | Show configuration data for &#x27;applies-to&#x27; |
| [`type`](#configure-authority-service-policy-applies-to-type) | Type of group to which the configuration applies. |

## `configure authority service-policy applies-to group-name`

Name of the router-group to which this configuration applies.

#### Usage

```
configure authority service-policy applies-to group-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority service-policy applies-to resource-group`

Name of the resource-group to which this configuration applies.

#### Usage

```
configure authority service-policy applies-to resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority service-policy applies-to router-name`

Name of the router to which this configuration applies.

#### Usage

```
configure authority service-policy applies-to router-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority service-policy applies-to type`

Type of group to which the configuration applies.

#### Usage

```
configure authority service-policy applies-to type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy best-effort`

Enable/disable filtering out paths that exceed the acceptable SLA threshold. When enabled, even if all paths do not meet the acceptable SLA threshold, they will be used as a best-effort

#### Usage

```
configure authority service-policy best-effort [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service-policy best-path-criteria`

This defines the criteria for selecting best paths for the service.

#### Usage

```
configure authority service-policy best-path-criteria [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy description`

A description of the service policy.

#### Usage

```
configure authority service-policy description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority service-policy forward-error-correction-profile`

Parameters for Forward Error Correction.

#### Usage

```
configure authority service-policy forward-error-correction-profile [<fec-profile-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| fec-profile-ref | The value to set for this field |

## `configure authority service-policy generated`

Indicates whether or not the Service Policy was automatically generated as a result of Conductor services.

#### Usage

```
configure authority service-policy generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service-policy ingress-source-nat`

Controls the ingress source nat treatment for the service

#### Usage

```
configure authority service-policy ingress-source-nat [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy lb-strategy`

Defines load balancing strategy to distribute traffic to service routes of services assigned this policy.

#### Usage

```
configure authority service-policy lb-strategy [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy max-jitter`

Maximum acceptable jitter for services that use this service class.

#### Usage

```
configure authority service-policy max-jitter [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority service-policy max-latency`

Maximum acceptable latency for services that use this service class.

#### Usage

```
configure authority service-policy max-latency [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority service-policy max-loss`

The acceptable threshold of packet loss for services that use this service class.

#### Usage

```
configure authority service-policy max-loss [<decimal64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| decimal64 | The value to set for this field |

#### Description

Units: percent

## `configure authority service-policy min-mos`

Minimum acceptable Mean Opinion Score (MOS) for services that use thus service class

#### Usage

```
configure authority service-policy min-mos [<union>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| union | The value to set for this field |

## `configure authority service-policy move vector`

List of vectors to prefer/avoid for the service.

#### Usage

```
configure authority service-policy move vector <name> <position> [<relative-to-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the vector. |
| position | first \| after \| before \| last |
| relative-to-name | Key of item before or after which to move |

## `configure authority service-policy name`

An arbitrary, unique name for the service policy.

#### Usage

```
configure authority service-policy name [<service-policy-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-policy-name | The value to set for this field |

## `configure authority service-policy packet-resiliency`

Types of packet resiliency govern how the SSR provides resilience for packets in the event of network loss.

#### Usage

```
configure authority service-policy packet-resiliency [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy path-quality-filter`

Enable/disable filtering out paths that exceed maximum quality limits.

#### Usage

```
configure authority service-policy path-quality-filter [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service-policy peer-path-resiliency`

Whether or not session resiliency failover occurs among multiple peers.

#### Usage

```
configure authority service-policy peer-path-resiliency [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority service-policy qp-preference`

Preference for ordering interfaces by QP values.

#### Usage

```
configure authority service-policy qp-preference [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

#### Description

Warning: &#x27;qp-preference&#x27; is deprecated and will be removed in a future software version

## `configure authority service-policy required-qp`

Minimum quality points required on network interface.

#### Usage

```
configure authority service-policy required-qp [<uint32>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint32 | The value to set for this field |

#### Description

Units: points
Warning: &#x27;required-qp&#x27; is deprecated and will be removed in a future software version

## `configure authority service-policy service-class`

A reference to the name of the service class to use.

#### Usage

```
configure authority service-policy service-class [<service-class-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-class-ref | The value to set for this field |

## `configure authority service-policy session-resiliency`

Types of session resiliency govern how the SSR provides resilience for sessions in the event of network issues that would cause it to choose a new path for active traffic processing.

#### Usage

```
configure authority service-policy session-resiliency [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy transport-state-enforcement`

The level of enforcement applied to the transport layer. Governs the behavior of the TCP state machine when processing packets.

#### Usage

```
configure authority service-policy transport-state-enforcement [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority service-policy vector`

List of vectors to prefer/avoid for the service.

#### Usage

```
configure authority service-policy vector <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the vector. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-service-policy-vector-name) | Name of the vector. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-service-policy-vector-priority) | Priority value for the paths with the vector. |
| `show` | Show configuration data for &#x27;vector&#x27; |

## `configure authority service-policy vector name`

Name of the vector.

#### Usage

```
configure authority service-policy vector name [<vector-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-name | The value to set for this field |

## `configure authority service-policy vector priority`

Priority value for the paths with the vector.

#### Usage

```
configure authority service-policy vector priority [<vector-priority>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| vector-priority | The value to set for this field |

## `configure authority session-record-profile`

A profile to describe how to collect session records.

#### Usage

```
configure authority session-record-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of session record profile. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`applies-to`](#configure-authority-session-record-profile-applies-to) | Logical group to which a configuration element applies |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-session-record-profile-enabled) | Whether to enable session records for this service |
| [`include-modify-record`](#configure-authority-session-record-profile-include-modify-record) | Whether to include the modify record. |
| [`include-start-record`](#configure-authority-session-record-profile-include-start-record) | Whether to include the start record. |
| [`intermediate-records`](#configure-authority-session-record-profile-intermediate-records) | Configuration for intermediate records. |
| [`name`](#configure-authority-session-record-profile-name) | The name of session record profile. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;session-record-profile&#x27; |

## `configure authority session-record-profile applies-to`

Logical group to which a configuration element applies

#### Usage

```
configure authority session-record-profile applies-to <type>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| type | Type of group to which the configuration applies. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`group-name`](#configure-authority-session-record-profile-applies-to-group-name) | Name of the router-group to which this configuration applies. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-session-record-profile-applies-to-resource-group) | Name of the resource-group to which this configuration applies. |
| [`router-name`](#configure-authority-session-record-profile-applies-to-router-name) | Name of the router to which this configuration applies. |
| `show` | Show configuration data for &#x27;applies-to&#x27; |
| [`type`](#configure-authority-session-record-profile-applies-to-type) | Type of group to which the configuration applies. |

## `configure authority session-record-profile applies-to group-name`

Name of the router-group to which this configuration applies.

#### Usage

```
configure authority session-record-profile applies-to group-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority session-record-profile applies-to resource-group`

Name of the resource-group to which this configuration applies.

#### Usage

```
configure authority session-record-profile applies-to resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority session-record-profile applies-to router-name`

Name of the router to which this configuration applies.

#### Usage

```
configure authority session-record-profile applies-to router-name [<leafref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| leafref | Value to add to this list |

## `configure authority session-record-profile applies-to type`

Type of group to which the configuration applies.

#### Usage

```
configure authority session-record-profile applies-to type [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority session-record-profile enabled`

Whether to enable session records for this service

#### Usage

```
configure authority session-record-profile enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority session-record-profile include-modify-record`

Whether to include the modify record.

#### Usage

```
configure authority session-record-profile include-modify-record [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority session-record-profile include-start-record`

Whether to include the start record.

#### Usage

```
configure authority session-record-profile include-start-record [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority session-record-profile intermediate-records`

Configuration for intermediate records.

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`enabled`](#configure-authority-session-record-profile-intermediate-records-enabled) | Enable/disable intermediate records |
| [`interval`](#configure-authority-session-record-profile-intermediate-records-interval) | Interval in which to send intermediate records. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;intermediate-records&#x27; |

## `configure authority session-record-profile intermediate-records enabled`

Enable/disable intermediate records

#### Usage

```
configure authority session-record-profile intermediate-records enabled [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority session-record-profile intermediate-records interval`

Interval in which to send intermediate records.

#### Usage

```
configure authority session-record-profile intermediate-records interval [<duration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| duration | The value to set for this field |

## `configure authority session-record-profile name`

The name of session record profile.

#### Usage

```
configure authority session-record-profile name [<short-name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| short-name-id | The value to set for this field |

## `configure authority session-recovery-detection`

Configure Session Recovery Detection

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`inactivity-timeout`](#configure-authority-session-recovery-detection-inactivity-timeout) | How long the flow must remain idle before session recovery detection will trigger. |
| [`mode`](#configure-authority-session-recovery-detection-mode) | What mode to enable session recovery detection. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;session-recovery-detection&#x27; |

## `configure authority session-recovery-detection inactivity-timeout`

How long the flow must remain idle before session recovery detection will trigger.

#### Usage

```
configure authority session-recovery-detection inactivity-timeout [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority session-recovery-detection mode`

What mode to enable session recovery detection.

#### Usage

```
configure authority session-recovery-detection mode [<enumeration>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| enumeration | The value to set for this field |

## `configure authority session-type`

Type of session classification based on protocol and port, and associates it with a default class of service.

#### Usage

```
configure authority session-type <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the session type. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-session-type-description) | A description of the session type. |
| [`initial-timeout`](#configure-authority-session-type-initial-timeout) | The inactivity timeout for sessions that are not yet established. |
| [`name`](#configure-authority-session-type-name) | The name of the session type. |
| [`nat-keep-alive`](#configure-authority-session-type-nat-keep-alive) | Enable/disable generation of NAT keep-alives for sessions of this type if the functionality is enabled in the neighborhood |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-session-type-resource-group) | Associate this session type with a top-level resource-group. |
| [`service-class`](#configure-authority-session-type-service-class) | The service class this type belongs to. |
| `show` | Show configuration data for &#x27;session-type&#x27; |
| [`timeout`](#configure-authority-session-type-timeout) | The inactivity timeout for sessions of this type. |
| [`transport`](#configure-authority-session-type-transport) | The transport protocol(s) and port(s) for the session type. |

## `configure authority session-type description`

A description of the session type.

#### Usage

```
configure authority session-type description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority session-type initial-timeout`

The inactivity timeout for sessions that are not yet established.

#### Usage

```
configure authority session-type initial-timeout [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority session-type name`

The name of the session type.

#### Usage

```
configure authority session-type name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority session-type nat-keep-alive`

Enable/disable generation of NAT keep-alives for sessions of this type if the functionality is enabled in the neighborhood

#### Usage

```
configure authority session-type nat-keep-alive [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority session-type resource-group`

Associate this session type with a top-level resource-group.

#### Usage

```
configure authority session-type resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority session-type service-class`

The service class this type belongs to.

#### Usage

```
configure authority session-type service-class [<service-class-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| service-class-ref | The value to set for this field |

## `configure authority session-type timeout`

The inactivity timeout for sessions of this type.

#### Usage

```
configure authority session-type timeout [<uint64>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint64 | The value to set for this field |

#### Description

Units: milliseconds

## `configure authority session-type transport`

The transport protocol(s) and port(s) for the session type.

#### Usage

```
configure authority session-type transport <protocol>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | Layer 4 transport protocol. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`port-range`](#configure-authority-session-type-transport-port-range) | Configure Port Range |
| [`protocol`](#configure-authority-session-type-transport-protocol) | Layer 4 transport protocol. |
| `show` | Show configuration data for &#x27;transport&#x27; |

## `configure authority session-type transport port-range`

Configure Port Range

#### Usage

```
configure authority session-type transport port-range <start-port>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-port | Lower transport (layer 4) port number. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`end-port`](#configure-authority-session-type-transport-port-range-end-port) | Upper transport (layer 4) port number. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;port-range&#x27; |
| [`start-port`](#configure-authority-session-type-transport-port-range-start-port) | Lower transport (layer 4) port number. |

## `configure authority session-type transport port-range end-port`

Upper transport (layer 4) port number.

#### Usage

```
configure authority session-type transport port-range end-port [<end-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| end-port | The value to set for this field |

## `configure authority session-type transport port-range start-port`

Lower transport (layer 4) port number.

#### Usage

```
configure authority session-type transport port-range start-port [<l4-port>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| l4-port | The value to set for this field |

## `configure authority session-type transport protocol`

Layer 4 transport protocol.

#### Usage

```
configure authority session-type transport protocol [<protocol>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| protocol | The value to set for this field |

## `configure authority software-update`

Configure Software Update

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`proxy-allowed-domain`](#configure-authority-software-update-proxy-allowed-domain) | Domains that should be accessible through the conductor repo proxy |
| [`proxy-allowed-ip`](#configure-authority-software-update-proxy-allowed-ip) | IP addresses or prefixes that should be accessible through the conductor repo proxy |
| `show` | Show configuration data for &#x27;software-update&#x27; |

## `configure authority software-update proxy-allowed-domain`

Domains that should be accessible through the conductor repo proxy

#### Usage

```
configure authority software-update proxy-allowed-domain [<squid-proxy-domain>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| squid-proxy-domain | Value to add to this list |

## `configure authority software-update proxy-allowed-ip`

IP addresses or prefixes that should be accessible through the conductor repo proxy

#### Usage

```
configure authority software-update proxy-allowed-ip [<ip-address-or-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-address-or-prefix | Value to add to this list |

## `configure authority step`

Configure Step

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`session-expiry-time`](#configure-authority-step-session-expiry-time) | The maximum amount of time waiting for a request response after which the session between STEP repository and client will be disconnected. |
| `show` | Show configuration data for &#x27;step&#x27; |

## `configure authority step session-expiry-time`

The maximum amount of time waiting for a request response after which the session between STEP repository and client will be disconnected.

#### Usage

```
configure authority step session-expiry-time [<uint16>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint16 | The value to set for this field |

#### Description

Units: seconds

## `configure authority step-repo`

List of Service and Topology Exchange Protocol repositories.

#### Usage

```
configure authority step-repo <address>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| address | Address of the STEP server. This could be the IP address/FQDN of the Conductor, standalone server or router where the STEP server is hosted. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-step-repo-address) | Address of the STEP server. This could be the IP address/FQDN of the Conductor, standalone server or router where the STEP server is hosted. |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-step-repo-description) | A description about the STEP repository. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`priority`](#configure-authority-step-repo-priority) | The priority assigned to the STEP server. The STEP server with the highest priority will be preferred. |
| [`resource-group`](#configure-authority-step-repo-resource-group) | Associate this STEP repo with a top-level resource-group. |
| `show` | Show configuration data for &#x27;step-repo&#x27; |

## `configure authority step-repo address`

Address of the STEP server. This could be the IP address/FQDN of the Conductor, standalone server or router where the STEP server is hosted.

#### Usage

```
configure authority step-repo address [<hostv4>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostv4 | The value to set for this field |

## `configure authority step-repo description`

A description about the STEP repository.

#### Usage

```
configure authority step-repo description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority step-repo priority`

The priority assigned to the STEP server. The STEP server with the highest priority will be preferred.

#### Usage

```
configure authority step-repo priority [<uint8>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| uint8 | The value to set for this field |

## `configure authority step-repo resource-group`

Associate this STEP repo with a top-level resource-group.

#### Usage

```
configure authority step-repo resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority tenant`

A customer or user group within the Authority.

#### Usage

```
configure authority tenant <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An arbitrary, unique name for the tenant, used to reference it in other configuration sections. |

##### Subcommands

| command | description |
| ------- | ----------- |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`description`](#configure-authority-tenant-description) | A description about the tenant. |
| [`generated`](#configure-authority-tenant-generated) | Indicates whether or not the Tenant was automatically generated as a result of Conductor or BGP/SVR services. |
| [`member`](#configure-authority-tenant-member) | A member of the tenant. |
| [`name`](#configure-authority-tenant-name) | An arbitrary, unique name for the tenant, used to reference it in other configuration sections. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-tenant-resource-group) | Associate this tenant with a top-level resource-group. |
| [`security`](#configure-authority-tenant-security) | The name of the security policy to use when the service does not specify a security policy |
| `show` | Show configuration data for &#x27;tenant&#x27; |

## `configure authority tenant description`

A description about the tenant.

#### Usage

```
configure authority tenant description [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority tenant generated`

Indicates whether or not the Tenant was automatically generated as a result of Conductor or BGP/SVR services.

#### Usage

```
configure authority tenant generated [<boolean>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| boolean | The value to set for this field |

## `configure authority tenant member`

A member of the tenant.

#### Usage

```
configure authority tenant member <neighborhood>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighborhood | Neigborhood where tenant members are located. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`address`](#configure-authority-tenant-member-address) | The source address(es) within the neighborhood that define the tenant members. |
| `delete` | Delete configuration data |
| [`neighborhood`](#configure-authority-tenant-member-neighborhood) | Neigborhood where tenant members are located. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;member&#x27; |

## `configure authority tenant member address`

The source address(es) within the neighborhood that define the tenant members.

#### Usage

```
configure authority tenant member address [<ip-prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | Value to add to this list |

## `configure authority tenant member neighborhood`

Neigborhood where tenant members are located.

#### Usage

```
configure authority tenant member neighborhood [<neighborhood-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighborhood-id | The value to set for this field |

## `configure authority tenant name`

An arbitrary, unique name for the tenant, used to reference it in other configuration sections.

#### Usage

```
configure authority tenant name [<tenant-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| tenant-name | The value to set for this field |

## `configure authority tenant resource-group`

Associate this tenant with a top-level resource-group.

#### Usage

```
configure authority tenant resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority tenant security`

The name of the security policy to use when the service does not specify a security policy

#### Usage

```
configure authority tenant security [<security-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| security-ref | The value to set for this field |

#### Description

Warning: &#x27;security&#x27; is deprecated and will be removed in a future software version

## `configure authority traffic-profile`

A set of minimum guaranteed bandwidths, one for each traffic priority

#### Usage

```
configure authority traffic-profile <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the Traffic Profile |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`best-effort`](#configure-authority-traffic-profile-best-effort) | Configure Best Effort |
| `delete` | Delete configuration data |
| [`high`](#configure-authority-traffic-profile-high) | Configure High |
| [`low`](#configure-authority-traffic-profile-low) | Configure Low |
| [`medium`](#configure-authority-traffic-profile-medium) | Configure Medium |
| [`name`](#configure-authority-traffic-profile-name) | The name of the Traffic Profile |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`resource-group`](#configure-authority-traffic-profile-resource-group) | Associate this traffic profile with a top-level resource-group. |
| `show` | Show configuration data for &#x27;traffic-profile&#x27; |

## `configure authority traffic-profile best-effort`

Configure Best Effort

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`distribution`](#configure-authority-traffic-profile-best-effort-distribution) | Percentage of minimum guaranteed bandwidth of the port rate for best-effort priority traffic. This value, plus high, medium, and low must add up to 100. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;best-effort&#x27; |

## `configure authority traffic-profile best-effort distribution`

Percentage of minimum guaranteed bandwidth of the port rate for best-effort priority traffic. This value, plus high, medium, and low must add up to 100.

#### Usage

```
configure authority traffic-profile best-effort distribution [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority traffic-profile high`

Configure High

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`distribution`](#configure-authority-traffic-profile-high-distribution) | Percentage of minimum guaranteed bandwidth of the port rate for high priority traffic. This value, plus medium, low, and best-effort must add up to 100. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;high&#x27; |

## `configure authority traffic-profile high distribution`

Percentage of minimum guaranteed bandwidth of the port rate for high priority traffic. This value, plus medium, low, and best-effort must add up to 100.

#### Usage

```
configure authority traffic-profile high distribution [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority traffic-profile low`

Configure Low

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`distribution`](#configure-authority-traffic-profile-low-distribution) | Percentage of minimum guaranteed bandwidth of the port rate for low priority traffic. This value, plus high, medium, and best-effort must add up to 100. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;low&#x27; |

## `configure authority traffic-profile low distribution`

Percentage of minimum guaranteed bandwidth of the port rate for low priority traffic. This value, plus high, medium, and best-effort must add up to 100.

#### Usage

```
configure authority traffic-profile low distribution [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority traffic-profile medium`

Configure Medium

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`distribution`](#configure-authority-traffic-profile-medium-distribution) | Percentage of minimum guaranteed bandwidth of the port rate for medium priority traffic. This value, plus high, low, and best-effort must add up to 100. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;medium&#x27; |

## `configure authority traffic-profile medium distribution`

Percentage of minimum guaranteed bandwidth of the port rate for medium priority traffic. This value, plus high, low, and best-effort must add up to 100.

#### Usage

```
configure authority traffic-profile medium distribution [<percentage>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| percentage | The value to set for this field |

#### Description

Units: percent

## `configure authority traffic-profile name`

The name of the Traffic Profile

#### Usage

```
configure authority traffic-profile name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority traffic-profile resource-group`

Associate this traffic profile with a top-level resource-group.

#### Usage

```
configure authority traffic-profile resource-group [<resource-group-ref>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| resource-group-ref | Value to add to this list |

## `configure authority trusted-ca-certificate`

The trusted-ca-certificate configuration contains CA certificate content.

#### Usage

```
configure authority trusted-ca-certificate <name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An identifier for the trusted CA certificate. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`content`](#configure-authority-trusted-ca-certificate-content) | Trusted CA certificate content. |
| `delete` | Delete configuration data |
| [`name`](#configure-authority-trusted-ca-certificate-name) | An identifier for the trusted CA certificate. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;trusted-ca-certificate&#x27; |

## `configure authority trusted-ca-certificate content`

Trusted CA certificate content.

#### Usage

```
configure authority trusted-ca-certificate content [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority trusted-ca-certificate name`

An identifier for the trusted CA certificate.

#### Usage

```
configure authority trusted-ca-certificate name [<name-id>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name-id | The value to set for this field |

## `configure authority web-messages`

Configure Web Messages

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`login-message`](#configure-authority-web-messages-login-message) | The message displayed on the login screen. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;web-messages&#x27; |
| [`welcome-message`](#configure-authority-web-messages-welcome-message) | The message displayed after a successful login. |

## `configure authority web-messages login-message`

The message displayed on the login screen.

#### Usage

```
configure authority web-messages login-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority web-messages welcome-message`

The message displayed after a successful login.

#### Usage

```
configure authority web-messages welcome-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority web-theme`

Configure Web Theme

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`logo`](#configure-authority-web-theme-logo) | The logo used across the authority. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`primary-color`](#configure-authority-web-theme-primary-color) | The hexidecimal code of the primary color in the authority&#x27;s theme. |
| [`secondary-color`](#configure-authority-web-theme-secondary-color) | The hexidecimal code of the secondary color in the authority&#x27;s theme. |
| `show` | Show configuration data for &#x27;web-theme&#x27; |
| [`tab-icon`](#configure-authority-web-theme-tab-icon) | The icon displayed in the browser tab. |

## `configure authority web-theme logo`

The logo used across the authority.

#### Usage

```
configure authority web-theme logo [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

## `configure authority web-theme primary-color`

The hexidecimal code of the primary color in the authority&#x27;s theme.

#### Usage

```
configure authority web-theme primary-color [<hex-string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hex-string | The value to set for this field |

## `configure authority web-theme secondary-color`

The hexidecimal code of the secondary color in the authority&#x27;s theme.

#### Usage

```
configure authority web-theme secondary-color [<hex-string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hex-string | The value to set for this field |

## `configure authority web-theme tab-icon`

The icon displayed in the browser tab.

#### Usage

```
configure authority web-theme tab-icon [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |
