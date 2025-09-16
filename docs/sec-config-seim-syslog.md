---
title: SEIM Syslog Integration
sidebar_label: SEIM Syslog Integration
---

Many customers operate independent (third party) Security Event and Incident Management (SEIM) platforms, for aggregating and analyzing security events across vendors and devices in their network. SEIM tools support the needs of attack detection, investigation, response, and compliance solutions by:

- Collecting security event logs and telemetry in real-time for threat detection and compliance use cases
- Analyzing telemetry in real-time and over time to detect attacks and other activities of interest
- Investigating incidents to determine their potential severity and impact on business
- Producing reports on these activities
- Storing relevant events and logs

SSR supports a structured, standardized syslog format to export the information off-box, in real time, and allows faster and easier integration with SIEM providers. Some of the information collected and exported for analysis are:

- System login details
- Configuration Changes
- Traffic Events
- Sites blocked by URL filtering
- Vulnerabilities reported by IDP, AV, and other L7 Security solutions

SEIM integration on the SSR allows you to:

- Configure multiple syslog servers
- Support UDP, TCP, and TLS as available transports per server
- Configure the type of data to be exported to each syslog server
- Export system login attempts
- Export traffic events off box
- Control the traffic event per policy

## How Does It Work?

There are three elements to configure:
- A syslog policy
- Associate the policy with an access-policy
- Configure the syslog server to receive the exported data

### Syslog Policy

[Configure a syslog policy](#syslog-policy-configuration). This identifies which messages are of interest.

```
config
  authority
    syslog-policy target-syslog-policy
      name target-syslog-policy
      enabled true
      close true
      create false
      error false
      security true
    exit
```

### Associate the Syslog Policy with an Access Policy

The syslog policy is associated with an access policy to indicate that messages should be produced when tennats access services. The `access-policy server-access syslog` identifies only the name of the syslog policy being used. 

```
config authority service target-servers access-policy server-access syslog syslog-policy target-policy
```

If you configure a syslog policy and an access policy, but do not reference the syslog policy from the access policy, then the information will not be logged.

### Configure the Syslog Server

A [syslog server](#syslog-server-configuration) must be in place to receive the data/messages, and must be identified in the SSR configuration. Additionally, a filter can be applied according to syslog standards, a match regex can be provided to further filter, and the protocol specified. 

```
config
  authority
    router target-router
      name target-router
      system
        syslog
          server 10.20.30.40 514
            ip-address 10.20.30.40
            port 514
            protocol udp
            filter kern
              facility kern
              severity notice
            exit
          exit
```

## Configuration Parameters

This section covers the parameters associated with SEIM syslog configuration.

### Syslog Server Configuration Parameters

The existing syslog config under **authority > router > system > syslog** expands the support of facility, severity, transport and other relevant config parameters per server. The configuration on a per server will take precedence over the configuration at the syslog level.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| protocol | enum: udp, tcp, tls | udp | Transport to use to connect to the server. |
| filter | list | Empty | List of facility and severity to be configured for a server. |
| filter > facility | existing enum | local0 (existing) | The facility or the type of syslog message to be sent to the server. <br/> For session and config-change events, SSR will use the auth facility as that’s the convention for most firewall and gateway devices. |
| filter > severity | existing enum | error | The message is sent to the server using the configured log level for the facility, or a less severe level if applicable. |
| filter > match | string | empty | Regex match that will be applied to the raw syslog message to filter specific messages for the configured facility and severity. |
| ocsp | Same as config > authority > router > system > syslog > ocsp | When protocol=tls |  |
| certificate | Same as config > authority > router > system > syslog > certificate | When protocol=tls |  |

#### Auth(entication) Facility Considerations

Syslog RFC5424 supports standard facility codes (see Section 6.2.1 of RFC). It is common industry practice to use `auth facility` for sending flow related events. By default, the SSR uses the `auth facility` for configuration change and session related events. The `auth facility` in syslog also captures all the login/authentication style events. By default, when a user enables the `auth facility` they also receive those events. For MIST users this might not be desirable. The SSR provides a filter to only allow the session events through. 

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| authority > router > system > syslog > auth > include | enum list with options <br/> [all, login, session, config-change]	| all | Since `auth` contains many different types of events, this filter will allow the users to pick which changes should be sent to the remote server. |
<!---
#### Disk Retention Configuration

To capture the syslog events on disk, use the following configuration parameters under **authority > router > system > syslog > retention**.

| Base Path | Name | Options | Description |
| --- | --- | --- | --- |
| authority > router > system > syslog > retention | enabled | Default: False | Default is disabled but can be enabled to log syslog messages to disk |
| authority > router > system > syslog > retention | max-duration | Default: 1h<br/> Max: 1d<br/> Type: t128ext:duration | Log all the syslog messages sent to the server to disk under /var/log/128technology/syslog/events.log |
| authority > router > system > syslog > retention | max-files | Default: 10<br/> Range: 1 to 20 | Maximum number of files stored on disk for the allowed duration. Each file is only allowed to be 10M. |
--->
#### Control the Traffic Event per Policy

The config > authority > service > access-policy references a syslog-policy and allows the user to toggle the sending of syslog messages as well as control the types of messages generated for the service.

Path: **config > authority > syslog-policy**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | **Required** | The name by which this profile will be referenced. |
| enabled | bool | true | Whether to send syslog messages for access policies referencing this policy. |
| create | bool | false | Whether to send a syslog message on session creation. |
| close | bool | true | Whether to send a syslog message session deletion. |
| error | bool | true | Whether to send a syslog message on failure to create a session. |
| security | bool | true | Whether to send a syslog message for any access-policy deny or block triggered by L7 security feature such as URL filtering, IDP or antivirus on this service. |

Path: **config > authority > service > access-policy > syslog-policy**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| syslog-policy | string | null | A reference to the config > authority > syslog-policy to be used |

:::note
By default, the settings apply to all the child services. To disable or control the settings on the child service, assign a different access-policy than the parent.
:::

## Traffic Events and Messages

The following system events can be logged and the resulting messages exported to the syslog server:

- [SESSION_CREATE](#session_create)
- [SESSION_CLOSE](#session_close)
- [SESSION_BLOCK](#session_block)
- [SESSION_FAIL](#session_fail)

### Structured Syslog Format

A standard structured syslog message takes the following format

`<PRI>VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID [STRUCTURED-DATA] MESSAGE`

For example:

`<134>1 2025-01-10T15:45:12.345Z mynode.myrouter SSR 1234 SESSION_CREATE [ssr@2636.1.0.0 key1=”value1” key2=”value2”]`

| Field | Description | SSR Value |
| --- | --- | --- |
| `<PRI>` | Priority value obtained by combining facility and severity values. | Combination of the severity and facility values from data model. |
| VERSION | Syslog version | 1 (default for syslog) |
| TIMESTAMP | Time of the event in UTC format UTC | Timestamp in RFC3339 format <br/> Example: 1970-01-01T00:00:00Z |
| HOSTNAME | Name of the generating entity. | `<node-name>.<router-router>` from the configuration |
| APP-NAME | Name of the application generating the message. | SSR |
| PROCID | The process-id of the application generating the message. | 128 |
| MSGID | Unique identifier indicating the type of message being sent. | One of: <br/> SESSION_CREATE <br/> SESSION_CLOSE <br/> SESSION_BLOCK <br/> SESSION_FAIL |
| [STRUCTURED-DATA] | Vendor proprietary fields in the form name=value. | [ssr@2636.1.0.0 …] <br/> The `ssr@2636.1.0.0` can be used to identify this message as SSR proprietary syslog message. <br/> ssr – name of the vendor <br/> 2636 – IANA assigned Juniper vendor-id <br/> 1.0.0 – version of the message format. |
| MESSAGE | Optional string containing description or helpful information about the message. | Left empty. |

### Common Fields 

Each event message will contain common information as described below. Individual event messages contain additional information specific to the event.

| Field | Description |
| --- | --- |
| session-id | UUID of the session. |
| source-address | Source IP address of the packet that triggered the session creation. |
| source-port | Source port of the packet that triggered the session creation. |
| destination-address | Destination IP address of the packet that triggered the session creation. |
| destination-port | Destination port of the packet that triggered the session creation. |
| protocol-id | IANA assigned integer value of transport protocol of the packet that triggered the session creation; udp, tcp, tls, etc. |
| protocol | Name of the protocol. |
| ingress-interface | Name of the network-interface which received the packet. |
| tenant | Name of the tenant associated with the session. |
| service | Name of the service associated with the session. |
| policy | Name of the MIST policy associated with the session. For conductor-managed, the service name. |
| session-source | Source of the session was received. Options are local, inter-node, inter-router. | 
| application | Name of the application and domain associated with this session. Displays “-“ when none available. |
| category | Name of the category associated with this session. Displays “-“ when none available. |
| sub-category | Name of the sub-category associated with this session. Displays “-“ when none available. |

### SESSION_CREATE

When SESSION_CREATE is enabled, messages are generated when a session is created. The messages will contain the following SESSION_CREATE specific information:

| Field | Description |
| --- | --- |
| next-hop-type | The type of egress interface the session was routed to. Options are: local, inter-node, inter-router. |
| next-hop-interface | The name of the egress network interface used for routing the session.
| source-nat-address | For local breakout sessions, if source-nat is applied, the IP address is used as the source.<br/> For inter-router sessions, the source IP address is used for creating the waypoint port allocation for inter-router SVR sessions.<br/> When source-nat or waypoint is not applicable, value is set to “-“ |
| source-nat-port | For local breakout sessions, if source-nat is applied, the port is used as the source.<br/> For inter-router sessions, the source port is used for creating the waypoint port allocation for inter-router SVR sessions.<br/> When source-nat or waypoint is not applicable, value is set to “-“ |
| source-nat-protocol-id | For local breakout sessions, the session protocol-id is used.<br/> For inter-router sessions, protocol is used for SVR session.<br/> When the value is different from protocol-id, a transform is being applied.<br/> When source-nat or waypoint is not applicable, the value is set to the source protocol-id |
| source-nat-protocol | Name of protocol: udp, tcp |
| peer-name | For inter-router sessions, the name of the remote peer where the session is routed.<br/> For other scenarios, the value is set to “-“ |
| destination-nat-address | When destination-nat is enabled, the destination IP address is used for routing this session. <br/> For inter-router sessions, the destination IP is used for creating the waypoint port allocation for inter-router SVR sessions.<br/> When destination-nat is disabled, value is set to “-“ |
| destination-nat-port | When destination-nat is enabled, the destination port is used for routing this session. <br/> For inter-router sessions, the destination port is used for creating the waypoint port allocation for inter-router SVR sessions. <br/> When destination-nat is disabled, value is set to “-“. |
| dscp | DSCP value used for the session on the egress flow. |
| time-to-live | The amount of time (in seconds) left on the session to survive any network inactivity. |

#### Example Output

``` 
<134>1 2025-01-10T15:45:12.345Z mynode.myrouter SSR 1234 SESSION_CREATE
[ssr@2636.1.0.0 session-id="abcdabcd-ffff-ffff-ffff-ffffffffffff"
source-address="1.1.1.1" source-port="1234" destination-address="2.2.2.2"
destination-port="5678" protocol-id="6" protocol="tcp"
ingress-interface="lan-intf" tenant="corp-lan" service="web" policy="-"
session-source="PUBLIC" application="Facebook" category="SocialMedia"
sub-category="SocialWeb-Facebook" next-hop-type="PUBLIC"
next-hop-interface="wan-intf" source-nat-address="20.20.20.20"
source-nat-port="10000" soure-nat-protocol-id="6" source-nat-protocol="tcp"
peer-name="-" destination-nat-address="100.100.100.100"
destination-nat-port="20000" dscp="-" time-to-live="60"] 
```
<!---
### SESSION_MODIFY

When SESSION_MODIFY is enabled, messages are generated when the session is modified, triggering a change in session properties. A session can be modified multiple times during its lifetime. Each event will trigger a MODIFY message to be sent to the server. Typically, SESSION_MODIFY works best in conjunction with SESSION_CREATE to capture any changes that have occurred since the previous instance; for example such as a change of way point ports, or an interface. The messages will contain the following SESSION_CREATE specific information:

| Field | Description |
| --- | --- |
| bytes-from-client | Total amount of bytes received from the ingress client. |
| bytes-to-server | Total amount of bytes sent to the egress destination. |
| packets-from-client | Total packets received from the ingress client. |
| packets-to-server | Total packets sent to the egress destination. |
--->
### SESSION_CLOSE 

When SESSION_CLOSE is enabled, messages are generated when a session has been deleted from the SSR. This could be a result of a timeout in UDP, or an RST in TCP. The message indicates the cause of the session deletion. Please note that the SESSION_CLOSE is only generated in the cases where the session was previously successfully established; failures and other errors are captured in messages generated by other system events listed below.

| Field | Description |
| --- | --- |
| close-reason | The reason for session deletion. Options are timeout, tcp-close, etc. |

### SESSION_FAIL

When enabled, a SESSION_FAIL message is generated anytime the system is unable to successfully create a session. For example, when all provisioned interfaces for the service are unavailable, or when all waypoint ports are exhausted. The messages contain the information about the failure, along with the reason for the failure. 

| Field | Description |
| --- | --- |
| reason | The reason for session failure. This might include exceptions during session creation/modification. |

### SESSION_BLOCK

The SESSION_BLOCK message is triggered in the following (but not limited to) security scenarios:

- Access-policy deny: A service denies access to a tenant(s).
- URL Filtering block: A child-service blocks access to apps, domains, categories, or subcategories.
- IDP and AV: A service has advanced L7 security features such as IDP/AV enabled, and identifies a vulnerability. 

The messages contain the following fields, including details on the reason for the session being blocked.

| Field | Description |
| --- | --- |
| block-type | Either access-policy-deny, url-filtering, idp, or antivirus |
| reason | For IDP and AV, the name of the vulnerability that triggered the block. <br/> For others, value is set to “-“. |
| severity | For IDP and AV, the severity of the vulnerability being detected. <br/> For others, value is set to “-“. |
| start-time | The timestamp when the sequence started. <br/> - access-policy-block: When the first packet was received and buffering starts. <br/> - url-filtering, idp, av: Time when the session creation packet was received. |
| count | Number of packets represented by this block event. <br/> - access-policy-block: Number of packets dropped since the start-time <br/> - Others: Value is set to “-”. |

#### IDP Fields

| Field | Description |
| --- | --- |
| cve-id | Standardized reference ID for known threats. |
| threat-severity | Severity of the threat: CRITICAL, LOW, MEDIUM, HIGH, INFO or UNDEFINED. |
| action | Action for the blocked event: DROP, CLOSE, CLOSE_SERVER, CLOSE_CLIENT. |

**Example of syslog IDP Event**

``` 
<38> Jun 5 12:10:07 node0.Spoke1 SSR 128 SESSION_BLOCK
[ssr@2636.1.0.0 source-address="172.16.3.9" destination-address="10.73.3.11"
count="0" action="CLOSE" session-source="-"
reason="HTTP:UNIX-FILE:ETC-PASSWD"
session-id="1db28fc8-65c5-430f-8345-f035a5add46a" source-port="58872"
destination-port="80" ingress-interface="ge-0/0/0.0"
tenant="spoke1-to-traffic-gen" policy="localbreakout" category="-"
protocol="TCP" application="HTTP" severity="6" start-time="1749125403"
threat-severity="MEDIUM" egress-interface="ge-0/0/1.0" protocol-id="6"
sub-category="-" service="localbreakout" block-type="idp" cve-id="N/A"] 
```

#### Anti-Virus Fields

| Field | Description |
| --- | --- |
| verdict-number | Threat score of the event. |

**Example of Anti-Virus Event**

``` 
<38> Jun 5 11:59:35 node0.Spoke1 SSR 128 SESSION_BLOCK
[ssr@2636.1.0.0 start-time="-" verdict-number="0"
session-id="a2f55654-b513-4c1a-b1ab-3ea76a771364" service="localbreakout"
policy="localbreakout" application="-" count="0" url="-" session-source="-"
source-address="172.16.3.9" tenant="spoke1-to-traffic-gen"
block-type="antivirus" protocol-id="-" category="-"
reason="secure.eicar.org/eicar.com.txt:80" destination-port="80"
protocol="http" ingress-interface="-" sub-category="-" source-port="58868"
destination-address="10.73.3.11" severity="4"] ```
```
## Example Configurations

### Syslog Server Configuration

Syslog server configuration allows administrators to configure SSR interaction with external syslog services. The following example shows a syslog server configuration with filtering to select the messages received. Note that the default protocol is `udp`. For more information about syslog server configuration and command parameters, see [`configure authority router system syslog`](config_command_guide.md#configure-authority-router-system-syslog)

```
config
  authority
    router target-router
      name target-router
      system
        syslog
          server 11.21.31.40 514
            ip-address 11.21.31.40
            port 514
            protocol udp
            filter auth
              facility auth
              severity info
            exit
          exit
        exit
      exit
    exit
  exit
exit
```

### Syslog Policy Configuration

The following is a syslog policy example with two servers (server 10.20.30.40 514, and server 11.21.31.40 514) where each is using filtering to select which messages it receives. It is associated with the access-policy `lan`. 

For configuration command and parameter information, see [`configure authority syslog-policy`](config_command_guide.md#configure-authority-syslog-policy).

```
config
  authority
    syslog-policy target-syslog-policy
      name target-syslog-policy
      enabled true
      close true
      create false
      error false
      security true
    exit
    service internet
      name internet
      access-policy lan
        source lan
        syslog
          syslog-policy target-syslog-policy
        exit
      exit
    exit
  exit
exit
```

### Syslog Policy and Server Sample Configuration

```
config
  authority
    syslog-policy target-syslog-policy
      name target-syslog-policy
      enabled true
      close true
      create false
      error false
      security true
    exit
    service internet
      name internet
      access-policy lan
        source lan
        syslog
          syslog-policy target-syslog-policy
        exit
      exit
    exit
    router target-router
      name target-router
      system
        syslog
          server 10.20.30.40 514
            ip-address 10.20.30.40
            port 514
            protocol udp
            filter kern
              facility kern
              severity notice
            exit
          exit
          server 11.21.31.40 514
            ip-address 11.21.31.40
            port 514
            protocol udp
            filter auth
              facility auth
              severity info
            exit
          exit
        exit
      exit
    exit
  exit
exit
```
