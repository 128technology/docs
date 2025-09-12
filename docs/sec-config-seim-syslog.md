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

Configure a syslog policy. This identifies which messages are of interest.

```
config authority syslog-policy target-policy
  enabled true          # can be disabled to stop sending for this policy
  create true           # export on create messages
  close true            # close messages
  security true         # security messages
```

### Associate the Syslog Policy with an Access Policy

The syslog policy is associated with an access policy to indicate that messages should be produced when tennats access services. The `access-policy server-access syslog` identifies only the name of the syslog policy being used. 

```
config authority service target-servers access-policy server-access syslog syslog-policy target-policy
```

If you configure a syslog policy and an access policy, but do not reference the syslog policy from the access policy, then the information will not be logged.

### Configure the Syslog Server

A syslog server must be in place to receive the data/messages, and must be identified in the SSR configuration. Additionally, a filter can be applied according to syslog standards, a match regex can be provided to further filter, and the protocol is specified.  

```
config authority router <router> system syslog
    server <syslog-server-ip> <syslog-server-port>
        filter auth
        match ".*connect.*"
        protocol UDP
```

## Configuration Parameters

This section covers the parameters associated with SEIM syslog configuration.

### Syslog Server Configuration Parameters

The existing syslog config under **authority > router > syslog** expands the support of facility, severity, transport and other relevant config parameters per server. The configuration on a per server will take precedence over the configuration at the syslog level.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| protocol  | enum: udp, tcp, tls  |  udp |  Transport to use to connect to the server |
|  filter | list |  Empty |  List of facility and severity to be configured for a server |
|  filter > facility |  existing enum |  local0 (existing) |  The facility or the type of syslog message to be sent to the server. <br/> For session and config-change events, SSR will use the auth facility as that’s the convention for most firewall and gateway devices. |
| filter > severity  | existing enum  |  error |  The log level for the given facility at which the message will be sent to the server. |
|  filter > match |  string | empty  |  Regex match that will be applied to the raw syslog message to filter specific messages for the configured facility and severity. |
| ocsp  |  Same as  config > authority > router > system > syslog > ocsp | When protocol=tls  |   |
|  certificate |  Same as  config > authority > router > system > syslog > certificate |  When protocol=tls |   |

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
| name | string | **Required** | The name by which this profile will be referenced |
| enabled | bool | true | Whether to send syslog messages for access policies referencing this policy |
| create | bool | false | Whether to send a syslog message on session creation |
| close | bool | true | Whether to send a syslog message session deletion |
| error | bool | true | Whether to send a syslog message on failure to create a session |
| security | bool | true | Whether to send a syslog message for any access-policy deny or block triggered by L7 security feature such as URL filtering, IDP or antivirus on this service |

Path: **config > authority > service > access-policy > syslog-policy**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| syslog-policy | string | null | A reference to the config > authority > syslog-policy to be used |

:::note
By default, the settings apply to all the child services. To disable or control the settings on the child service, assign a different access-policy than the parent.
:::

## Example Configurations

#### Default Configuration

```
config authority
  router ROUTER system syslog
    server 192.168.1.54 514
        protocol UDP
    exit
  exit
  service target-servers
    access-policy server-access
      syslog
        syslog-policy default-syslog-policy
      exit
    exit
  exit
  syslog-policy default-syslog-policy
  exit
exit

```




