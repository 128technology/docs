---
title: Configuring Audit Events
sidebar_label: Audit Events
---
The Session Smart Router can be configured to maintain a history of several different class of events in its *event log* , which can subsequently be used to support compliance audits, forensics on network issues related to configuration (misapplied or otherwise), and traceability. This document covers:
- Types of events available on the router
- Enabling the Audit events (using the PCLI or the GUI)
- Using the Event Viewer in the GUI

## Event Types
The events generated by the router are classified into the following categories:

### Traffic Events 
Traffic events are generated as sessions as created on the router. These include details such as the protocol, source address, source port, destination address and destination port. In addition, the success or failure status along with a reason code for failure cases are included in the event.

### Administration Events
Various administration actions performed by a user such as SSH login generate this category of events. The events contain the details about the user action, whether or not the action was permitted, and the reason for any failures.

### System Events
Various system level events such as service and process restarts are generated by this event category. The details include information about the user and details about the underlying action.

### Alarm Events
All the SSR alarms generate an add event when the alarm is raised and a clear event when the alarm is cleared. The alarm events can be used to view the history of the events associated with the alarms. The alarm events are implicit events and cannot be disabled via configuration. More details on alarms and events can be found [here](events_overview.md) 

### Provisioning Events
The provisioning events are generated for software download and upgrades as well as for configuration changes that are processed on the router. For configuration changes the event contains a diff of the configuration change that triggered the event. These are implicit events and cannot be disabled via configuration.

## Basic Configuration
The configuration for audit logging is performed within the `system > audit` branch within a `router` hierarchy. In most cases, the only configuration required for enabling audit logging is adding it to the `router` element for your Authority's conductor. For cases where an SSR router is not managed by a conductor, its audit logging configuration is similarly added to the `system > audit` branch of its `router` hierarchy.

SSR version 5.1.0 introduces capabilities to provide additional control over persistence and storage duration of the various events listed above. The table below shows the various configuration options and the corresponding behavior pre- and post- 5.1.0 software.

| name | type | available version | default | description |
| ---- | ---- | ------- | ------- | ----------- |
| retention | duration | 5.1.0 | 180 days | How long to persist the events listed above. |
| traffic > enabled | boolean | all | false | Enable/disable the generation of traffic events. |
| traffic > persist | boolean | 5.1.0 | false | If enabled, whether or not to persist the events to the local storage for the configured retention duration. |
| administration > enabled | boolean | all | true | Enable/disable the generation of administration events. |
| administration > persist | boolean | 5.1.0 | true | If enabled, whether or not to persist the events to the local storage for the configured retention duration. |
| system > enabled | boolean | all | true | Enable/disable the generation of system events. |
| system > persist | boolean | 5.1.0 | true | If enabled, whether or not to persist the events to the local storage for the configured retention duration. |

Beginning with version 5.6, if `auditd` fails to start or is prevented from running, an imediate, real-time message is displayed to all users indicating that the audit logging capability is impacted. This message persists until the failure is resolved.

## Sample Configuration

:::note
Configuration not related to audit logging has been filtered out for illustrative purposes.
:::

### Enable Basic Audit Logging

```
config
    authority
        router  my-router
            name    my-router
            system
                audit
                    administration
                        enabled  true
                    exit
                exit
            exit
        exit
    exit
exit
```

### Storing Events for Short Durations
By default the SSR routers store all events except traffic events for up to six months on the local disk. In some cases it might be desirable to shorten the length of time for these events to minimize the impact on the local disk. This can be accomplished as follows:

```
config
    authority
        router my-router
            system
                audit
                    retention 1d
                exit
            exit
        exit
    exit
exit
```

In the above example all the events available on the SSR router are only retained for one day. The `retention` is of type duration and can take values in hours and days; for example, 24h or 1d.

### Sending Traffic Events to a Syslog Server
Traffic events are disabled and not persisted by default because they can produce a large volume of data. However, in situations where the traffic events need to be sent off-box for storage, such as a syslog server, they can be enabled but not persisted to local storage. The following snippet provides an example of that configuration.

```
config
    authority
        router my-router
            system
                audit
                    traffic
                        enabled true
                        persist false
                    exit
                exit
            exit
        exit
    exit
```

:::note
For in-depth explanations of how to configure the Monitoring Agent to handle audit events, refer to the [SSR Monitoring Agent](plugin_monitoring_agent.md) documentation.
:::

#### Basic Input and Output Configurations
Use the following information to create basic Input and Output configurations.

1. Create an event collector input to capture the traffic events. An example input configuration is shown below.

```toml
[[inputs.t128_events]]
    # It is a best practice to specify a custom index file location
    index-file = "/var/lib/128t-monitoring/state/events.index"
    topic = "events"
    [inputs.t128_events.tagpass]
        type = ["traffic"]
```

2. Define an output for where the events are to be sent. In this example, the events are sent to a syslog server.

```toml
[[outputs.syslog]]
  address = "udp://<ip>:514"
  default_sdid = "128T"
```

3. The input and output are placed in the input and output directories respectively and tied together by the [Monitoring Agent configuration](plugin_monitoring_agent.md#configuration). A sample monitoring agent configuration:

```yaml
enabled: true

inputs:
  - name: traffic-events
outputs:
  - name: my-syslog

```

Once these configurations are in place, starting the Monitoring Agent will send events to syslog. 

## Remote Logging 

Audit logs can be stored off system by configuring a remote logging server. When the IP address and port are configured, audit logs are sent to the remote system for storage and review. 

```
config
    authority
        router  Fabric128
            name    Fabric128
            system
                audit
                    remote-logging-server  1.1.1.1 60
                        address  1.1.1.1
                        port     60
                    exit
                exit
            exit
        exit
    exit
exit
```
### Secure Syslog Transport

Beginning with Version 6.0.4, the SSR can be configured to send system generated events over a secure TLS or TCP connection to a remote-logging server for analysis and storage. The current default is a UDP connection.

A new configuration element, `protocol`, has been added to the syslog configuration under `authority/router/system` to configure the protocol that the SSR uses to open communication with the syslog server. 

#### Certificates

Use `config authority` to configure a certificate for use when opening the TLS connection, and to encrypt packets sent to the syslog server.

- Configure a Trusted CA Certificate on the SSR 

Copy the content of the trusted CA certificate into the configuration.
```
    admin@test1.Fabric128 (trusted-ca-certificate[name=server-ca])# show
        name     server-ca
        content  (text/plain) <-- contents of the server certificate.
```

- Configure a Client Certificate on the SSR

Copy the content of the client certificate into the configuration.
```
    admin@test1.Fabric128 (client-certificate[name=ABC])# show
        name     ABC
        content  (text/plain) <---- contents of the client certificate.
```
See [Adding a Trusted Certificate](howto_trusted_ca_certificate.md) for more information.

#### TLS and TCP Transport

To provide secure transport for the system generated events, the SSR can be configured to use TLS to open an encrypted communication channel with the syslog server.

```
    admin@test1.Fabric128 (syslog)# show
        severity        info
        facility        any
        protocol        tls
        client-certificate-name  ABC <-- client certificate already configured under authority/client-certificate

        server          172.18.2.183 514
            ip-address  172.18.2.183
            port        514
    exit
```

##### TCP Transport

Configure the SSR to use TCP for transport to syslog server.

:::important
Although using TCP guarantees events are transmitted to the destination syslog server, it is not considered secure because TCP without TLS transmits data in clear text.
:::

```
    admin@test1.Fabric128 (syslog)# show
        severity        info
        facility        any
        protocol        tcp

        server          172.18.2.183 514
            ip-address  172.18.2.183
            port        514
    exit
```

## Viewing the Audit Log

To view the contents of the audit log via the GUI (on the Conductor or Router as configured above), navigate to the **Tools** page and choose **Event History**. The Event History viewer shows all of the events that the SSR has accumulated, including audit log events. Audit log events are of type **ADMIN**; use the built-in filtering mechanism to limit the Event History search results to ADMIN type events.