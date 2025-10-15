---
title: Smart Download
sidebar_label: Smart Download
---

Sometimes network connections can become unreliable, slow, or just plain break. To mitigate these disruptions, the SSR download process provides the following features for better recovery and control over software downloads.

* [Failover Resiliency](#download-failover-resiliency)
* [Resumable Download](#resumable-ssr-download)
* [Sequenced HA Download](#sequenced-ha-download)
* [Bandwidth Limiting](#bandwidth-limiting) 
* [Show Download Progress](#show-download-progress)

Downloads that have been stopped either by a manual pause or due to connection issues are able to be resumed, starting from where they left off.

## Download Failover Resiliency

SSR images can be downloaded from a variety of sources, depending on software access mode (eg. internet-only, prefer-conductor, conductor-only, offline-mode): the HA peer, both conductor nodes, artifactory, and the mist proxy to artifactory (cloud deployments only).

To improve resiliency to network connectivity issues, the SSR queries available versions from all sources before beginning the download. It compiles a list of sources where the requested version is available and begins the download. If more than 50% of requests to a source fail within a window of 10 requests, the SSR marks that source unavailable and moves on to the next source. The following priority order is used for sources: 

1. Peer 
2. Conductor node 1
3. Conductor node 2
4. Artifactory
5. Mist proxy

Only when the SSR has tried all available sources and reached the consecutive failure threshold on each is the download considered **failed due to connectivity issues**. In that case, an error is reported and the download stopped. 

## Resumable SSR Download

Downloads can be paused manually using a CLI command, or automatically paused if the connection fails. When manually paused, the process can be continued by manually restarting the download. In the case of a failed connection, the SSR will automatically resume the download when the connection is restored. In both instances, the download resumes from the point where the download was stopped. 

To manually pause a download from the CLI, use the `request system software download pause` command. 

Example:

```
request system software download pause version SSR-7.0.1-1
request system software download pause router Router1 node Node1 version 6.3.6-1
```
The GUI also supports pausing and resuming downloads.

### Auto-resume Download on WAN Failures

In the event that all sources have reached the threshold of consecutive failures and a download attempt has returned an error, the SSR can be configured to wait for a specified amount of time and then retry the download. If a connection is successfully made, the download will resume where it left off.  

When the timeout is enabled, the SSR waits for a configurable amount of time (default is 10800s) for the download to complete. When the timeout value is reached, the download is marked as **Failed** and the retry delay begins.  

The retry delay time starts lower than the configured time and exponentially backs off up to the configured maximum (default is 3600 seconds). A maximum number of times to retry can also be configured.

The retry timeout can be disabled. If it is disabled, the download will retry indefinitely.

Use the command `configure authority router system software-update download enable-timeout [enabled]` to enable auto-resume. The following fields allow you to configure the feature for your needs:

- `enable-timeout`: True/false, default is true. This enables a time limit for the overall download.
- `timeout`: Amount of time in seconds that the SSR waits for the software download to complete. When the timeout value is reached the download is marked as **Failed**, and the retry delay begins. The default download wait time is 10800s. Range is 1800s - 604800s.
- `max retry delay`: The maximum amount of time in seconds to wait in between retry attempts. The retry delay will start off low and back off exponentially up to this duration. Range is 0 to 86400s. Default is 3600s.
- `max retry attempts`: The maximum number of attempts to download before considering the download as failed. If set to 0, the SSR will retry the download until the timeout is hit. Default is 10.

### Sequenced HA Download

The SSR supports sequenced downloading; one node of an HA pair downloads an image from the remote repository, and the other node waits for it to complete. Once that download is complete, the second node downloads it from the first. When targeting an HA router, the download is sequenced by default. To disable this sequencing, use `request system software download simultaneous disable`.

## Bandwidth Limiting

In some deployments, downloads speeds may be restricted by bandwidth sharing, or cabling or signal limitations. The `software-update` configuration command allows administrative controls over the speeds used to retrieve software. 

Use the `configure-authority-router-system-software-update-max-bandwidth` command to define the bandwidth limiter applied to software downloads. Valid values are; unlimited, 1-999999999999 bits/second.

## Show Download Progress

To display the progress of a software download on the command line, use the `show system software download [{router <router> | resource-group <resource-group>}] [version <version>] [force] [node <node>]` command. 
