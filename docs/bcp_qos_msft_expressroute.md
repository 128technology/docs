---
title: ExpressRoute QoS Configuration
sidebar_label: ExpressRoute QoS Configuration
---

When peering with Microsoft using ExpressRoute – particularly for Skype for Business and Microsoft Teams applications – it is important to ensure that you leverage appropriate QoS (DSCP) markings. Failing to use recognized marks will cause your packets to get dropped by Microsoft.[^1] This document identifies the appropriate `service-class` configuration to be used to ensure smooth interoperability with Microsoft ExpressRoute peering.

:::note
This applies only to ExpressRoute peering for voice applications. Consult your Microsoft account representative to ensure these requirements apply to your peering connection for other service types.
:::

Microsoft only recognizes five different DSCP values on ExpressRoute. Any packets marked with a DSCP value other than one of these five will be dropped; therefore, _it is important to ensure any services that will leverage ExpressRoute have a service-policy that marks traffic to one of thsee five values._

The table below is an augmented version of [the one provided by Microsoft](https://docs.microsoft.com/en-us/azure/expressroute/expressroute-qos), to indicate the mapping of ExpressRoute DSCP to built-in 128T `service-class` definitions. Each 128T system will have these mappings as part of the "factory default" configuration.

:::important
It is possible that your factory default configuration has been administratively modified or various elements administratively deleted, and thus these `service-class` definitions do not exist on your system. You can confirm the presence or absence of these configuration elements by using the PCLI command `show config running authority service-class verbose all`, and ensuring the five classes mentioned below exist, and match the DSCP markings as indicated.
:::

| Traffic Class | DSCP Marking | 128T Service Class | Workload                         |
| ------------- | ------------ | - | -------------------------------- |
| Voice         | EF (46)      | Telephony | Skype/Microsoft Teams/Lync voice |
| Interactive | AF41 (34) | MultimediaConferencing | Video, VBSS |
| Interactive | AF21 (18) | LowLatencyData | App sharing |
| Default | AF11 (10) | HighThroughputData | File transfer |
| Default | CS0 (0) | Standard | Anything else |

[^1]: https://docs.microsoft.com/en-us/azure/expressroute/expressroute-qos
