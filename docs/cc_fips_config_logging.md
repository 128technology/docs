---
title: Configuring Logging
sidebar_label: Configuring Logging
---

A secure SSR environment requires auditing of events and storing them in a local audit file. The recorded events are simultaneously sent to an external syslog server. A syslog server receives the syslog messages streamed from the device. The syslog server must have an SSH client with NETCONF support configured to receive the streamed syslog messages.

The NDcPP logs capture the events, few of them are listed below:

- Committed changes
- Login and logout of users
- Failure to establish an SSH session
- Establishment or termination of an SSH session
- Changes to the system time
- Configuring Event Logging to a Local File

You can configure storing of messages to a local file and the level of detail to be recorded with the syslog statement. This example stores logs in a file named syslog:



## Configuring Event Logging to a Remote Server

Configure the export of audit information to a secure, remote server by setting up an event trace monitor that sends event log messages by using NETCONF over SSH to the remote system event logging server. The following procedures show the configuration needed to send system log messages to a secure external server by using NETCONF over SSH.

Configuring Event Logging to a Remote Server when Initiating the Connection from the Remote Server

The following procedure describes the steps to configure event logging to a remote server when the SSH connection to the TOE is initiated from the remote system log server.

Generate an RSA public key on the remote syslog server.




## Forwarding Logs to the External Syslog Server

When the device running Junos OS is set up for an external syslog server, the TOE forwards copies of local logs to the external syslog server and retains local copies of all logs when the TOE is configured in event log mode. In stream log mode, all logs except traffic logs are stored locally and can be forwarded to an external syslog server, whereas traffic logs can only be forwarded to an external syslog server.

The connection between the device running Junos OS and the syslog server is established on an event basis depending on preconfiguration of what type of logs are forwarded from local to external. When the configured condition is met, the device sends local logs to the external syslog server


## Configuring Audit Log Options in the Evaluated Configuration

The following section describes how to configure audit log options in the evaluated configuration.

Configuring Audit Log Options 

To configure audit log options:

Specify the number of files to be archived in the system logging facility.




## Event Logging Overview

The evaluated configuration requires the auditing of configuration changes through the system log.

In addition, Junos OS can:

Send automated responses to audit events (syslog entry creation).
Allow authorized managers to examine audit logs.
Send audit files to external servers.
Allow authorized managers to return the system to a known state.
The logging for the evaluated configuration must capture the events. The logging events are listed below:

Table 1 shows sample for syslog auditing for NDcPPv2:




## Login and Logout Events Using SSH

System log messages are generated whenever a user successfully or unsuccessfully attempts SSH access. Logout events are also recorded. For example, the following logs are the result of two failed authentication attempts, then a successful one, and finally a logout:


