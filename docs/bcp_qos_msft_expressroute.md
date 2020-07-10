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

## Sample Configuration Excerpt

The following example configuration excerpt illustrates the relationship between a `service`, a `service-policy`, and a `service-class`:

```
config

    authority

        service  Skype-Voice
            name              Skype-Voice
            description       "Skype voice traffic"
            scope             private
            security          my-encryption-policy
            application-name  O365-Skype

            access-policy     trusted
                source      trusted
                permission  allow
            exit

            access-policy     quarantine
                source      quarantine
                permission  deny
            exit
            service-policy    voip-audio
        exit

        service-policy  voip-audio
            name                 voip-audio
            description          "RTP/bearer audio"
            service-class        Telephony
            session-resiliency   failover
            path-quality-filter  true
            best-effort          true
            max-loss             1
            max-latency          150
            max-jitter           30
        exit

        service-class  Telephony
            name           Telephony
            dscp           46
            traffic-class  high
        exit
    exit
exit
```

In this example, the `Skype-Voice` service leverages the built-in O365 application module for Skype and is given treatment according to the `voip-audio` policy. The `voip-audio` policy in turn references the `service-class` named `Telephony`, which will mark packets with DSCP 46 (a.k.a. EF).

Given this configuration, as traffic arrives and is matched to the O365-Skype service, it will be marked as EF (46) on egress.

:::note
This marking is path independent, so even if this traffic does not use an ExpressRoute (if for example the ExpressRoute is temporarily unavailable), the packets will still be marked per the `service-class` assigned.
:::

[^1]: https://docs.microsoft.com/en-us/azure/expressroute/expressroute-qos
