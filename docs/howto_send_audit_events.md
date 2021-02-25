---
title: Send Audit Events to a Syslog Server
sidebar_label: Send Audit Events to a Syslog Server
---

Audit and alarm events can now be pushed to syslog and other services via the Monitoring Agent. The four basic steps to configure audit events to be sent to a Syslog Server.

- Enable relevant audit events
- Create a Monitoring Agent events input
- Create a Syslog output
- Tie the input to the output

For in-depth explanations of how to configure the Monitoring Agent to handle audit events, refer to the [128T Monitoring Agent](plugin_monitoring_agent.md) documentation.

### Enable relevant audit events
Traffic events are disabled and not persisted by default because they often produce a large volume of data. However, in situations where the traffic events are important, they can be enabled but not persisted. This prevents overconsumption of resources. If traffic events are not of interest, no configuration changes are necessary. 

The following snippet describes the path to enable traffic events, and disable persistence. 
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

### Create a Monitoring Agent events input

When creating a Monitoring Agent events input, it is a best practice to specify a custom location for the `index-file`. Use the following documentation to create the events input; [Event Collector](plugin_monitoring_agent.md/#event-collector).

### Create a Syslog output

Use the following documentation to create the Syslog output, [Output Configuration Example](plugin_monitoring_agent.md#outputs-1).

### Tie the input to the output

The input and output are placed in the input and output directories respectively and tied together by the [Monitoring Agent configuration](plugin_monitoring_agent.md/#configuration). Once those pieces are in place, starting the Monitoring Agent will send events to syslog. 


