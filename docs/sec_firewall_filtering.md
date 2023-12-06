---
title: Customizable Firewall Rules and Filters
sidebar_label: Customizable Firewall Rules and Filters
---

This section describes a bunch of stuff. Here is some of it. 

## Packet Filtering

The SSR uses Berkeley Packet Filters (BPF) to create customizable firewall filters. This filtering solution can be used to prevent packet level attacks. Packets can be filtered by any known packet field, and the order in which filters are applied can be set by the user. 
Filters are configured and applied on the receiving network-interface. 

#### Configure using the GUI: 

Authority > Router > Node > device-interface > network-interface

1. Scroll to Filter Rule.

[Network interface filter configuration](/img/bpf_image1.png)

2. Click Add.

3. In the New Item window, name the rule and click SAVE.

[New filter name](/img/bpf_image2.png)

4. In the Filter Rule window, define:
- The action - Deny discards any matching packets (what do they match? you haven't set any packet information in this filter). Permit allows packets that match the rule to bypass any additional rules, and passes the traffic.  
- The Filter type - BPF is currently the only option. 
- Berkeley Packet Filter - Identifies the filter to be applied. Validation confirms proper BPF syntax.

[BPF Filter Rule](/img/bpf_image4.png)

5. Click Validate and Commit. From the authority drop down, select the network interface to return to the Filter list.

6. Configuration of permit rules follows the same process. 

[Permit rule configuration](/img/bpf_image5.png) 

7. After the Filter Rule list has been created, you can reorder the rules using the drop down menu to the left of the filter name. 

[Reorder menu](/img/bpf_image6.png)

This list determines the order in which filter rules are applied. 

:::note
The number of rules and the filtering operation is resource heavy and may impact performance.
:::

#### Configure from the PCLI:

```
*admin@conductor.conductor# configure authority router 128t-west
*admin@conductor.conductor (router[name=128t-west])# node 128t-west
*admin@conductor.conductor (node[name=128t-west])# device-interface bfp-test
*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30
*admin@conductor.conductor (network-interface[name=intf30])# filter-rule DropUDP_Port400
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# action deny
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# bpf "udp port 400"
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# exit
*admin@conductor.conductor (network-interface[name=intf30])# filter-rule PermitIPaddress
*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# action permit
*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# bpf "host 192.168.0.0"
```
Rules can be moved using the `move` command:

```
*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30
*admin@conductor.conductor (network-interface[name=intf30])# move filter-rule DropUDP_Port400 after PermitIPaddress
*admin@conductor.conductor (network-interface[name=intf30])# show
name         intf30

filter-rule  PermitIPaddress
    name    PermitIPaddress
    bpf     host
    action  permit
exit

filter-rule  DropUDP_Port400
    name    DropUDP_Port400
    bpf     "udp port 400"
    action  deny
exit
```

## ICMP 
**Need graphic and pcli example

#### Discard ICMP Echo Replies With No Request

ICMP Echo Replies that arrive at the SSR are dropped if no corresponding request has been seen and the ICMP Aysnc Reply is set to drop. This is the new default behavior; no change in configuration is necessary.

#### ICMP Type As A Session Attribute

By default, the SSR does not use ICMP codes as a session attribute. However, the SSR does match ICMP error packets with the sessions that generated them, and only accepts those ICMP packets when they match an existing session. For instance, if a TCP packet generates a `Destination Unreachable`, upon receipt of the `Destination Unreachable` the SSR uses the code to interpret the packet and match it to an existing session. If a match is found, the packet is forwarded to the end host. If a match is not found, the packet is rejected.

To enable ICMP type as a session attribute, change the `ICMP Session Match` to `identifier and type`.  This is not the default behavior, and a configuration change is necessary to enable this behavior.

## IPv4 Option Filtering

------
Currently in the SSR, only basic checking is done for both IPv4 options and IPv6 extension headers verifying the validity of these extra headers. The SSR now has the ability to go further than this basic check and inspect these additional headers and make necessary decisions as to whether these packets should be allowed or dropped and logged.
There are various IPv4 options that should have a default behavior of drop when packets arrive at the SSR. However, due to existing behavior within the SSR, these options should not be dropped by default should none of the provided configuration exist within the running configuration. This is to prevent any disruption in an existing deployment when upgrading to an image that supports IPv4 option filtering.
------

By default, all IPv4 options are allowed traffic. To configure the dropping of specific IPv4 options, you must first enable `drop-all`. This reveals the Drop Exclusions list, where you can define IPv4 options to exclude from the drop action. 

1. At the Authority level, select the Authority Settings button. 

![Authority Settings button](/img/ipv4_option_filter1.png)

2. Scroll down to the IPv4 Option Filter button, and select it.

![IPv4 Option Filter button](/img/ipv4_option_filter2.png)

3. The IPv4 Options Filter window opens, indicating the `allow-all` action. Open the drop down and select `drop-all`.

![IPv4 Option Filter window](/img/ipv4_option_filter3.png)

If you do not want any allowed options, you do not have to proceed any farther. Return to the Authority level and continue with other configuration activities. 

4. In the Drop Exclusion field, select **ADD**. 

![Drop Exclusion field](/img/ipv4_option_filter4.png)

5. Enter the Option type/number from the [IPv4 Parameters](https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1) and click Save.

![Drop Exclusion Option number](/img/ipv4_option_filter5.png)

6. The new exclusion is listed in the Drop Exclusions table. Click ADD to configure more exclusions. 

![Drop Exclusion Option table](/img/ipv4_option_filter6.png)

#### Using the PCLI

```
*admin@conductor.conductor# configure authority ipv4-option-filter action drop-all
*admin@conductor.conductor# configure authority ipv4-option-filter drop-exclusion 11
*admin@conductor.conductor# show config candidate authority ipv4-option-filter

config

    authority

        ipv4-option-filter
            action          drop-all
            drop-exclusion  11
        exit
    exit
exit

*admin@conductor.conductor#
```

### Broadcast and Multicast Source Addresses

Packets with broadcast or multicast source L2 addresses will now be dropped by default.

## Transport State Enforcement

------
By default, the SSR checks and follows the TCP sequence numbers of all the sessions passing through it. However, no action has been taken based on it, aside from incrementing metrics. Part of the certification testing is looking at whether or not the SSR is actually dropping packets that have sequence numbers that don’t fit the stream. Now, the configured field transport-state-enforcement has a Strict mode that enables this new enforcement along with the others.

Under the Service Policy (which is under Authority), you will find a field called Transport State Enforcement. This field defaults to “reset”, which preserves the existing default behavior.

![service policy](/img/transport_state_enforce1.png)

Change that to “strict” to enable dropping packets in the TCP stream which fall outside of the window. This will apply to any service that has this service policy configured.

![service](/img/transport_state_enforce2.png)

```
*admin@conductor.conductor# configure authority service-policy prefer-path-2 transport-
state-enforcement strict
*admin@conductor.conductor#
```


## TCP SYN Limitation
------
The SSR provides the ability to limit half-open TCP connections to a configurable limit.  Half-open TCP connections are those where the handshake has started but not completed.  A SYN flood is a type of distributed denial of service (DDoS) attack that opens as many connections with a server as possible without completing them to force the server to run out of session contexts and deny future requests.
The certification process is looking to address this by limiting the number of half-open connections on the SSR to a configurable limit and drop any new session requests above that.  The SSR can now do just that, tracking how many half-open sessions there are based on existing TCP session state.
New configuration has been added for this feature.  At the router level, there is a new field called half-open-connection-limit which defaults to unlimited but be configurable with a number.



```
*admin@conductor.conductor#
*admin@conductor.conductor# configure authority router 128t-west half-open-connection-l
imit 100000
```


