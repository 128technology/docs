---
title: Troubleshooting IDP
sidebar_label: Troubleshooting IDP
---

`show idp application` and its sub-commands provide information about the running state of the IDP engine. 

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
The `show stats idp` metrics track the number of packets and bytes sent in/out of the IDP engine. Additionally, data is captured by protocol such as UDP, TCP, ICMP etc. 

## Show Commands

Each of the commands listed below, and the subcommands for each, provide additional details for IDP visibility. Use the links to learn more about each command. 

| command | description |
| ------- | ----------- |
| [`request idp refresh-security-package`](cli_reference.md#request-idp-refresh-security-packages) | Update the IDP connectivity details. |
| [`show idp application status`](cli_reference.md#show-idp-application-status) | Show underlying IDP application status. |
| [`show idp details`](cli_reference.md#show-idp-details) | Show underlying IDP details. |
| [`show idp events`](cli_reference.md#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](cli_reference.md#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](cli_reference.md#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](cli_reference.md#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](cli_reference.md#show-idp-network) | Show underlying IDP network status. |
| [`show idp platform`](cli_reference.md#show-idp-platform) | Show underlying IDP platform data. |
| [`show idp security-package`](cli_reference.md#show-idp-security-package) | Show underlying IDP security package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

### Administrator Only Commands

The following commands are visible only to Administrators, and should only be run when instructed to do so by Juniper technical support. 

| command | description |
| ------- | ----------- |
| [`request idp rebuild`](cli_reference.md#request-idp-rebuild) | Rebuild IDP Command. |
| [`request idp restart`](cli_reference.md#request-idp-restart) | Restart IDP Command. |

## Logs 

The `save tech-support` info contains the relevant logs and journals associated with the IDP engine. A log category of `IDP` is available to increase the level of IDP info logged. IDP function logs are stored here: `/var/logs/128technology/idp/*`.