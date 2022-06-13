---
title: Troubleshooting IDP
sidebar_label: Troubleshooting IDP
---

### Show Commands

**(need more information, better troubleshooting information)**

The `show idp application` and its sub-commands provide information about the running state of the IDP engine. 

```
admin@node.idp # show idp application status
Thu 2022-05-19 04:45:49 UTC
✔ Retrieving IDP application status...

======================
 node.idp 
======================
 Engine:     on
 Last:       starting

 Pod:        active
 Docker:     running

```

### Stats and Metrics 

The `show stats idp` metrics track the number of packets and bytes sent in/out of the IDP engine. Additionally, data is captured by protocol such as UDP, TCP, ICMP etc. 

Alarms 

When IDP is configured on a router, an alarm is generated if the IDP engine is in a failed state. The alarm clears when the IDP engine is operational. 

Logs 

The `show tech-support` info contains the relevant logs and journals associated with the IDP engine.  