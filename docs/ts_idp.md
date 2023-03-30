---
title: Troubleshooting IDP
sidebar_label: Troubleshooting IDP
---

[`show idp application status`](cli_reference.md#show-idp-application-status) and its sub-commands provide information about the running state of the IDP engine.

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

### Additional Commands

The following commands are visible only in the Advanced view, and should only be run when instructed to do so by Juniper technical support.

| command | description |
| ------- | ----------- |
| [`request idp restart rebuild`](cli_reference.md#request-idp-rebuild) | Rebuild IDP Command. |
| [`request idp restart`](cli_reference.md#request-idp-restart) | Restart IDP Command. |

## Stats

The [`show stats idp`](cli_stats_reference.md#show-stats-idp) display metrics for attacks, bytes received and transmitted, and packets dropped, processed, received, and transmitted, as well as by indiviual protocol.

- [`attacks`](#show-stats-idp-attacks)
- [`bytes`](#show-stats-idp-bytes)
- [`packets`](#show-stats-idp-packets)

## Logs

The `save tech-support` info contains the relevant logs and journals associated with the IDP engine. A log category of `IDP` is available to increase the level of IDP info logged. IDP function logs are stored here: `/var/log/128technology/idp/*`.