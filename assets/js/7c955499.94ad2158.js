"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[8086],{63559:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var n=t(74848),s=t(28453);const a={title:"Service Policy Baseline Configurations",sidebar_label:"Service Policy Baseline Defaults"},r=void 0,o={id:"bcp_service-policy_defaults",title:"Service Policy Baseline Configurations",description:"One of the most powerful aspects of the SSR data model is the flexibility offered by a service-policy. Giving customers the ability to configure thresholds for when traffic should migrate from path to path based on current network status is a daunting task, however; most customers \u2013 and even application developers \u2013 are unaware of the sensitivity of their service to latency, loss, and jitter.",source:"@site/docs/bcp_service-policy_defaults.md",sourceDirName:".",slug:"/bcp_service-policy_defaults",permalink:"/docs/bcp_service-policy_defaults",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Service Policy Baseline Configurations",sidebar_label:"Service Policy Baseline Defaults"},sidebar:"docs",previous:{title:"Service and Service Policy Design",permalink:"/docs/bcp_service_and_service_policy_design"},next:{title:"Tenancy Design",permalink:"/docs/bcp_tenants"}},c={},l=[{value:"Traffic Categories",id:"traffic-categories",level:2},{value:"Real-Time Traffic",id:"real-time-traffic",level:3},{value:"VoIP",id:"voip",level:4},{value:"Interactive Video",id:"interactive-video",level:4},{value:"Remote Desktop Services",id:"remote-desktop-services",level:4},{value:"Gaming",id:"gaming",level:4},{value:"Non Real-Time Traffic",id:"non-real-time-traffic",level:3},{value:"Management Traffic",id:"management-traffic",level:4},{value:"Streaming Video",id:"streaming-video",level:4},{value:"Interactive Data",id:"interactive-data",level:4},{value:"Mission-Critical Data",id:"mission-critical-data",level:4},{value:"Best-Effort Data",id:"best-effort-data",level:4},{value:"Bulk/Scavenger Data",id:"bulkscavenger-data",level:4},{value:"References",id:"references",level:2},{value:"Basic Service Policy Definitions",id:"basic-service-policy-definitions",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i.p,{children:["One of the most powerful aspects of the SSR data model is the flexibility offered by a ",(0,n.jsx)(i.code,{children:"service-policy"}),". Giving customers the ability to configure thresholds for when traffic should migrate from path to path based on current network status is a daunting task, however; most customers \u2013 and even application developers \u2013 are unaware of the sensitivity of their service to latency, loss, and jitter."]}),"\n",(0,n.jsxs)(i.p,{children:["This document recommends several base class ",(0,n.jsx)(i.code,{children:"service-policy"})," definitions for common types of traffic. These can be used as sane starting points for configuring the SSR. Administrators should derive their own policies from these base definitions, adding in administrative preference for path selection using vectors."]}),"\n",(0,n.jsx)(i.p,{children:"The entire set of proposed base class policies is provided at the end of this document in a format suitable for copy/paste into existing systems."}),"\n",(0,n.jsx)(i.h2,{id:"traffic-categories",children:"Traffic Categories"}),"\n",(0,n.jsxs)(i.p,{children:["Traffic can be broken into two basic categories, each with their respective set of subcategories. The basic categories are ",(0,n.jsx)(i.em,{children:"real-time traffic"})," and ",(0,n.jsx)(i.em,{children:"non real-time traffic"}),". The goal of categorizing traffic is to construct a corresponding set of basic policies for managing that traffic. We will discuss the network resource consumption behavior of commonly deployed network services (such as VoIP, SCCM, and FTP) and create basic models for them, but will also discuss strategies for choosing an appropriate base class for custom applications."]}),"\n",(0,n.jsx)(i.h3,{id:"real-time-traffic",children:"Real-Time Traffic"}),"\n",(0,n.jsxs)(i.p,{children:["As described in [delay-limits], real-time traffic's basic requirement is the ",(0,n.jsx)(i.em,{children:"preservation of the time relation (variation) between the information entities of the stream"}),". In practice, this means the most important factor to consider for the success of the service traffic is ",(0,n.jsx)(i.strong,{children:"latency"}),". There are largely three major categories of real-time traffic today, of which two are common in enterprise networking:"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Voice/Video over IP (hereafter collectively referred to as VoIP)"}),"\n",(0,n.jsx)(i.li,{children:"Remote desktop services"}),"\n",(0,n.jsx)(i.li,{children:"Online gaming"}),"\n"]}),"\n",(0,n.jsx)(i.h4,{id:"voip",children:"VoIP"}),"\n",(0,n.jsxs)(i.p,{children:["VoIP traffic is somewhat unique in that it is comprised of (at least) two separate, parallel channels: the ",(0,n.jsx)(i.em,{children:"signaling"})," used for user location, call setup and teardown, etc., and the ",(0,n.jsx)(i.em,{children:"media"})," \u2013 the audio/video traffic itself. Each of these have significantly different properties and for this reason it is recommended that they be separated into unique services whenever possible. In most deployments, there is a clean separation between the IP",":ports"," used for signaling and the IP",":ports"," used for media."]}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsx)(i.p,{children:"VoIP signaling is in fact not a real-time network service, but is described here due to its codependence on media streaming, which is a classic real-time network service."})}),"\n",(0,n.jsxs)(i.p,{children:["VoIP signaling, at least for telephony applications, typically creates a long-lived session; this session is created when a phone is powered on and registers, and lasts until that phone is powered off. As such, it is important to ensure that the signaling follows the best path available at all times. This is done using the ",(0,n.jsx)(i.code,{children:"session-resiliency"})," setting ",(0,n.jsx)(i.code,{children:"revertible-failover"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["Signaling is not particularly sensitive to jitter or loss. The recommended latency for VoIP signaling is ",(0,n.jsx)(i.code,{children:"250"}),", as the most prevalent VoIP protocol (SIP) retransmits messages when no reply is received within 500ms. Using a value of ",(0,n.jsx)(i.code,{children:"250"})," accommodates one round trip between UAC and UAS."]}),"\n",(0,n.jsxs)(i.p,{children:["The ",(0,n.jsx)(i.code,{children:"service-class"})," is assigned the value ",(0,n.jsx)(i.code,{children:"Signalling"}),", one of SSR's factory default service classes. It will mark egress packets with DSCP 40 (CS5), per the recommendations of ",(0,n.jsx)(i.a,{href:"https://tools.ietf.org/html/rfc4594#section-4.2",children:"[RFC 4594]"}),"."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=voip-signaling])# show\nname                 voip-signaling\ndescription          "SIP, H.323, MEGACO, etc."\nservice-class        Signalling\nsession-resiliency   revertible-failover\npath-quality-filter  true\nbest-effort          true\nmax-latency          250\n'})}),"\n",(0,n.jsxs)(i.p,{children:['VoIP media, on the other hand, is very sensitive to latency, loss, and jitter. The SSR software calculates "MOS" (',(0,n.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Mean_opinion_score",children:"Mean Opinion Score"}),') for every peer path, as a composite metric derived by BFD metric data exchanged across the path. MOS is a "Quality of Experience" measurement, which assigns a single scalar value between 1 and 5 to an interactive session. Our benchmark for reasonable quality for VoIP media will be 3.6, which is the threshold below which many users will be disastisfied [MOS Estimation Using Quality Models](',(0,n.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Mean_opinion_score#MOS_estimation_using_quality_models",children:"https://en.wikipedia.org/wiki/Mean_opinion_score#MOS_estimation_using_quality_models"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["Because voice and video calls are transient, we ",(0,n.jsx)(i.em,{children:"strongly discourage"})," using ",(0,n.jsx)(i.code,{children:"revertible-failover"})," as the ",(0,n.jsx)(i.code,{children:"session-resiliency"}),' setting. This can cause traffic to "ping pong" between two links during congestion or periods of "brown outs," degrading the overall quality of experience for the caller.']}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=voip-audio])# show\nname                 voip-audio\ndescription          "RTP/bearer audio"\nservice-class        Telephony\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          true\nmin-mos              3.6\n'})}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsx)(i.p,{children:"MOS values can be dramatically affected by the codecs used in the audio/video streams. A G.711 stream (which is uncompressed) can achieve a theoretical maximum MOS of 4.4, whereas a G.729 stream can reach a theoretical maximum MOS of 3.9. However, the SSR's MOS calculation is derivative of path latency, loss, and jitter and will not consider codec. A value above 3.6 should be suitable for most signaled media traffic."})}),"\n",(0,n.jsx)(i.p,{children:"Alternatively, it is possible to approximate the same behavior by explicitly specifying loss, latency, and jitter values. This gives additional flexibility if the values need to be tuned individually."}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration (alternate):"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=voip-audio])# show\nname                 voip-audio\ndescription          "RTP/bearer audio"\nservice-class        Telephony\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          true\nmax-loss             1\nmax-latency          150\nmax-jitter           30\n'})}),"\n",(0,n.jsx)(i.h4,{id:"interactive-video",children:"Interactive Video"}),"\n",(0,n.jsxs)(i.p,{children:["For video traffic associated with VoIP sessions (videoconferencing), the only difference is the recommended marking of the packets; for video, this is ",(0,n.jsx)(i.code,{children:"MultimediaConferencing"})," which uses AF41 (Assured Forwarding)."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=voip-video])# show\nname                 voip-video\ndescription          "Interactive video"\nservice-class        MultimediaConferencing\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          true\nmax-loss             1\nmax-latency          150\nmax-jitter           30\n'})}),"\n",(0,n.jsx)(i.h4,{id:"remote-desktop-services",children:"Remote Desktop Services"}),"\n",(0,n.jsx)(i.p,{children:'Remote Desktop (including Virtual Desktop Infrastructure, a.k.a. "VDI") is a client/server implementation where a user communicates with a local client application that connects to a remote server, streaming display information from server to client, and keyboard/mouse information streamed from client to server. This is common in enterprise networking, whether it is in support of "thin client" deployments (as is popularized by the commercial applications Citrix Desktop and VMware\'s "PCoIP"), or troubleshooting tools such as Microsoft Remote Desktop and VNC.'}),"\n",(0,n.jsx)(i.p,{children:"Remote Desktop quality of experience is degraded for latency values above 225ms, so this will be our governing factor."}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=remote-desktop])# show\nname                 remote-desktop\ndescription          "Remote Desktop and VDI"\nservice-class        RealTimeInteractive\nsession-resiliency   failover\npath-quality-filter  true\nmax-latency          225\n'})}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsxs)(i.p,{children:["The baseline configuration recommends ",(0,n.jsx)(i.code,{children:"session-resiliency"})," to be set to ",(0,n.jsx)(i.code,{children:"failover"}),", which is acceptable for infrequent and/or transient use of remote desktop services such as troubleshooting exercices, or transactional applications. For enterprises that use VDI as a standard means for allowing employees to access their desktops as hosted server infrastructure, consider setting ",(0,n.jsx)(i.code,{children:"session-resiliency"})," to ",(0,n.jsx)(i.code,{children:"true"}),"."]})}),"\n",(0,n.jsx)(i.h4,{id:"gaming",children:"Gaming"}),"\n",(0,n.jsx)(i.p,{children:"Gaming traffic is highly susceptible to latency and fairly insensitive to loss (since most real-time games will periodically send cumulative updates to clients to ensure state synchronization). Thus the governing metric is again latency."}),"\n",(0,n.jsxs)(i.p,{children:["We will set ",(0,n.jsx)(i.code,{children:"best-effort"})," to ",(0,n.jsx)(i.code,{children:"false"}),", since gaming applications requiring low latency will become unplayable if latency exceeds 100ms. We will also set ",(0,n.jsx)(i.code,{children:"revertible-failover"})," to ",(0,n.jsx)(i.code,{children:"true"}),", as gaming sessions are typically long-lived."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=gaming])# show\nname                 gaming\ndescription          "Real-time gaming applications"\nservice-class        LowLatencyData\nsession-resiliency   revertible-failover\npath-quality-filter  true\nbest-effort          false\nmax-latency          100\n'})}),"\n",(0,n.jsx)(i.h3,{id:"non-real-time-traffic",children:"Non Real-Time Traffic"}),"\n",(0,n.jsxs)(i.p,{children:["As opposed to real-time traffic, the quality of experience for ",(0,n.jsx)(i.em,{children:"non real-time traffic"})," is less dependent on round trip latency. We will describe several categories of traffic:"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Management traffic, both interactive (e.g., SSH, telnet) and non-interactive (SNMP, NTP, Syslog, API calls, etc.)"}),"\n",(0,n.jsx)(i.li,{children:"Streaming video"}),"\n",(0,n.jsx)(i.li,{children:"Mission-critical data: enterprise-specific applications critical to day-to-day operations"}),"\n",(0,n.jsx)(i.li,{children:"Best-effort data, which typically represents the lion's share of the network traffic"}),"\n",(0,n.jsx)(i.li,{children:"Bulk/scavenger data, the lowest class of data and first to be dropped during congestion"}),"\n"]}),"\n",(0,n.jsx)(i.h4,{id:"management-traffic",children:"Management Traffic"}),"\n",(0,n.jsx)(i.p,{children:"Management traffic can be interactive, as is the case when administrators log into devices over the network; they can also be non-interactive, as is the case for machine-to-machine (M2M) traffic exemplified by SNMP. The difference between interactive and non-interactive focuses on latency: the human-to-machine interface quickly becomes unusable as latency grows."}),"\n",(0,n.jsxs)(i.p,{children:["For the interactive traffic, we set ",(0,n.jsx)(i.code,{children:"session-resiliency"})," to ",(0,n.jsx)(i.code,{children:"failover"})," as these types of interactive sessions are typically short-lived. For M2M traffic, management sessions may last indefinitely, hence the use of ",(0,n.jsx)(i.code,{children:"revertible-failover"}),"."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configurations:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=management-interactive])# show                                    \nname                 management-interactive\ndescription          "SSH, Telnet, mosh, etc."\nservice-class        OAM\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          true\nmax-latency          200\n\n*admin@labsystem1.fiedler (service-policy[name=management-m2m])# show                                            \nname                 management-m2m\ndescription          "SNMP, NTP, Syslog, etc."\nservice-class        OAM\nsession-resiliency   revertible-failover\npath-quality-filter  true\nbest-effort          true\nmax-latency          1000\n'})}),"\n",(0,n.jsx)(i.h4,{id:"streaming-video",children:"Streaming Video"}),"\n",(0,n.jsx)(i.p,{children:'There are many variants of streaming video in today\'s networks; for the purposes of session policy definition we will divided streaming video into two categories: enterprise-relevant (such as e-learning content), and non-critical or "scavenger" video (entertainment content such as YouTube).'}),"\n",(0,n.jsx)(i.p,{children:"Streaming video, unlike real-time video, is relatively insensitive to loss, latency, and jitter. The distinction we draw between the enterprise-class policy and the scavenger policy is in two factors:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Enterprise-class video is marked as AF31 as compared to scavenger video marked as CS1"}),"\n",(0,n.jsxs)(i.li,{children:["Enterprise-class video has ",(0,n.jsx)(i.code,{children:"best-effort"})," forwarding enabled, whereas scavenger video will not be forwarded if no paths meeth the quality criteria"]}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=video-streaming])# show\nname                 video-streaming\ndescription          "Enterprise video streaming services"\nservice-class        MultimediaStreaming\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          true\nmax-loss             5\nmax-latency          4000\n\n*admin@labsystem1.fiedler (service-policy[name=video-streaming-scavenger])# show\nname                 video-streaming-scavenger\ndescription          "Non-organizational streaming video"\nservice-class        LowPriorityData\nsession-resiliency   failover\npath-quality-filter  true\nbest-effort          false\nmax-loss             5\nmax-latency          4000\n'})}),"\n",(0,n.jsx)(i.h4,{id:"interactive-data",children:"Interactive Data"}),"\n",(0,n.jsxs)(i.p,{children:["When users (as network clients) interact with servers in a session-oriented, transactional way \u2013 typically using HTTP/HTTPS \u2013 this is referred to as ",(0,n.jsx)(i.em,{children:"interactive data"}),". Users are sensitive to high latency connections when interacting with network resources; as such, this ",(0,n.jsx)(i.code,{children:"service-policy"})," leverages ",(0,n.jsx)(i.code,{children:"path-quality-filter"})," to choose the most suitable forwarding path."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=data-interactive])# show\nname                 data-interactive\ndescription          "Interactive data"\nservice-class        LowLatencyData\npath-quality-filter  true\nbest-effort          true\nmax-latency          250\n'})}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsxs)(i.p,{children:["In present-day networks, a large percentage of network transactions leverage HTTP/HTTPS. For this reason, it is not advisable to classify all HTTP/HTTPS traffic as ",(0,n.jsx)(i.code,{children:"data-interactive"}),", as this could dramatically shift the percentages of traffic assigned to your SSR's traffic-engineering queues away from ",(0,n.jsx)(i.code,{children:"best-effort"})," data. This policy straddles between ",(0,n.jsx)(i.code,{children:"data-mission-critical"})," and ",(0,n.jsx)(i.code,{children:"data-best-effort"}),", and should be used judiciously to improve network performance for client/server applications that fit into that spot in your network's QoS framework."]})}),"\n",(0,n.jsx)(i.h4,{id:"mission-critical-data",children:"Mission-Critical Data"}),"\n",(0,n.jsxs)(i.p,{children:['The policy for "mission-critical" data differs from "interactive-data" only through the use of the ',(0,n.jsx)(i.code,{children:"service-class"})," (AF31 vs. AF21). As such, during times of network congestion and contention, mission-critical data will be prioritized over interactive data."]}),"\n",(0,n.jsxs)(i.p,{children:["Resist the temptation to assign this ",(0,n.jsx)(i.code,{children:"service-policy"})," to too many services; it should be used sparingly to truly reflect the highest priority services within your enterprise network."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=data-mission-critical])# show\nname                 data-mission-critical\ndescription          "Mission-critical data"\nservice-class        MultimediaStreaming\npath-quality-filter  true\nbest-effort          true\nmax-latency          250\n'})}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsxs)(i.p,{children:["This baseline configuration uses the ",(0,n.jsx)(i.code,{children:"MultimediaStreaming"})," service-class, which in turn uses DSCP 26 (AF31). MultimediaStreaming is assigned to the SSR's ",(0,n.jsx)(i.code,{children:"medium"})," traffic-engineering queue."]})}),"\n",(0,n.jsx)(i.h4,{id:"best-effort-data",children:"Best-Effort Data"}),"\n",(0,n.jsxs)(i.p,{children:['The majority of traffic on any network is classified as "best effort" data. Traditionally this will use the ',(0,n.jsx)(i.code,{children:"Standard"})," service class (DSCP 0). There are no path quality requirements explicitly called out for best effort data. This is recommended the ",(0,n.jsx)(i.code,{children:"service-policy"}),' for "default route" services such as ',(0,n.jsx)(i.code,{children:"0.0.0.0/0"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["Aside from the ",(0,n.jsx)(i.code,{children:"service-class"})," assignment, the only other configuration is the ",(0,n.jsx)(i.code,{children:"session-resiliency"})," value of ",(0,n.jsx)(i.code,{children:"failover"}),". The value of ",(0,n.jsx)(i.code,{children:"failover"})," is recommended for transient sessions; for long-lived sessions where resiliency is crucial, consider classifying that traffic discretely as its own ",(0,n.jsx)(i.code,{children:"service"})," and assigning a more appropriate ",(0,n.jsx)(i.code,{children:"service-policy"}),"."]}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=data-best-effort])# show\nname                data-best-effort\ndescription         "Best effort data"\nservice-class       Standard\nsession-resiliency  failover\n'})}),"\n",(0,n.jsx)(i.h4,{id:"bulkscavenger-data",children:"Bulk/Scavenger Data"}),"\n",(0,n.jsx)(i.p,{children:"Bulk/scavenger data is prioritized at the bottom of the list, and will be the last class of traffic to get network resources during periods of contention. This is typically used for things like OS updates, which can rapidly choke a network when populations of machines all attempt downloads in a synchronized fashion."}),"\n",(0,n.jsx)(i.p,{children:"Baseline configuration:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'*admin@labsystem1.fiedler (service-policy[name=data-scavenger])# show\nname                 data-scavenger\ndescription          "Scavenger class data"\nservice-class        LowPriorityData\npath-quality-filter  false\n'})}),"\n",(0,n.jsx)(i.h2,{id:"references",children:"References"}),"\n",(0,n.jsxs)(i.p,{children:['[delay-limits]\nSuznjevic, M. and Saldana, J., "Delay Limits for Real-Time Services", ',(0,n.jsx)(i.a,{href:"https://www.ietf.org/archive/id/draft-suznjevic-tsvwg-delay-limits-00.txt",children:"draft-suznjevic-tsvwg-delay-limits-00"}),", June 2016."]}),"\n",(0,n.jsxs)(i.p,{children:['[RFC 4594]\nBabiarz, J., et. al., "Configuration Guidelines for DiffServ Service Classes", ',(0,n.jsx)(i.a,{href:"https://tools.ietf.org/html/rfc4594",children:"RFC 4594"}),", August 2006."]}),"\n",(0,n.jsx)(i.h2,{id:"basic-service-policy-definitions",children:"Basic Service Policy Definitions"}),"\n",(0,n.jsxs)(i.p,{children:["The output here is provided in ",(0,n.jsx)(i.code,{children:"flat"})," format, to facilitate copy/pasting into an existing SSR conductor or router. Note that it has referencial dependencies on the various system-default ",(0,n.jsx)(i.code,{children:"service-class"})," configuration, so for users that have modified or removed those ",(0,n.jsx)(i.code,{children:"service-class"})," elements, adjustments will be required."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'config authority service-policy voip-signaling name voip-signaling\nconfig authority service-policy voip-signaling description "SIP, H.323, MEGACO, etc."\nconfig authority service-policy voip-signaling service-class Signalling\nconfig authority service-policy voip-signaling session-resiliency revertible-failover\nconfig authority service-policy voip-signaling path-quality-filter true\nconfig authority service-policy voip-signaling best-effort true\nconfig authority service-policy voip-signaling max-latency 250\nconfig authority service-policy remote-desktop name remote-desktop\nconfig authority service-policy remote-desktop description "Remote Desktop and VDI"\nconfig authority service-policy remote-desktop service-class RealTimeInteractive\nconfig authority service-policy remote-desktop session-resiliency failover\nconfig authority service-policy remote-desktop path-quality-filter true\nconfig authority service-policy remote-desktop max-latency 225\nconfig authority service-policy gaming name gaming\nconfig authority service-policy gaming description "Real-time gaming applications"\nconfig authority service-policy gaming service-class LowLatencyData\nconfig authority service-policy gaming session-resiliency revertible-failover\nconfig authority service-policy gaming path-quality-filter true\nconfig authority service-policy gaming best-effort false\nconfig authority service-policy gaming max-latency 100\nconfig authority service-policy management-interactive name management-interactive\nconfig authority service-policy management-interactive description "SSH, Telnet, mosh, etc."\nconfig authority service-policy management-interactive service-class OAM\nconfig authority service-policy management-interactive session-resiliency failover\nconfig authority service-policy management-interactive path-quality-filter true\nconfig authority service-policy management-interactive best-effort true\nconfig authority service-policy management-interactive max-latency 200\nconfig authority service-policy management-m2m name management-m2m\nconfig authority service-policy management-m2m description "SNMP, NTP, Syslog, etc."\nconfig authority service-policy management-m2m service-class OAM\nconfig authority service-policy management-m2m session-resiliency revertible-failover\nconfig authority service-policy management-m2m path-quality-filter true\nconfig authority service-policy management-m2m best-effort true\nconfig authority service-policy management-m2m max-latency 1000\nconfig authority service-policy voip-audio name voip-audio\nconfig authority service-policy voip-audio description "RTP/bearer audio"\nconfig authority service-policy voip-audio service-class Telephony\nconfig authority service-policy voip-audio session-resiliency failover\nconfig authority service-policy voip-audio path-quality-filter true\nconfig authority service-policy voip-audio best-effort true\nconfig authority service-policy voip-audio max-loss 1\nconfig authority service-policy voip-audio max-latency 150\nconfig authority service-policy voip-audio max-jitter 30\nconfig authority service-policy voip-video name voip-video\nconfig authority service-policy voip-video description "Interactive video"\nconfig authority service-policy voip-video service-class RealTimeInteractive\nconfig authority service-policy voip-video session-resiliency failover\nconfig authority service-policy voip-video path-quality-filter true\nconfig authority service-policy voip-video best-effort true\nconfig authority service-policy voip-video max-loss 1\nconfig authority service-policy voip-video max-latency 150\nconfig authority service-policy voip-video max-jitter 30\nconfig authority service-policy video-streaming name video-streaming\nconfig authority service-policy video-streaming description "Enterprise video streaming services"\nconfig authority service-policy video-streaming service-class MultimediaStreaming\nconfig authority service-policy video-streaming session-resiliency failover\nconfig authority service-policy video-streaming path-quality-filter true\nconfig authority service-policy video-streaming best-effort true\nconfig authority service-policy video-streaming max-loss 5\nconfig authority service-policy video-streaming max-latency 4000\nconfig authority service-policy video-streaming-scavenger name video-streaming-scavenger\nconfig authority service-policy video-streaming-scavenger description "Non-organizational streaming video"\nconfig authority service-policy video-streaming-scavenger service-class LowPriorityData\nconfig authority service-policy video-streaming-scavenger session-resiliency failover\nconfig authority service-policy video-streaming-scavenger path-quality-filter true\nconfig authority service-policy video-streaming-scavenger best-effort false\nconfig authority service-policy video-streaming-scavenger max-loss 5\nconfig authority service-policy video-streaming-scavenger max-latency 4000\nconfig authority service-policy data-best-effort name data-best-effort\nconfig authority service-policy data-best-effort description "Best effort data"\nconfig authority service-policy data-best-effort service-class Standard\nconfig authority service-policy data-best-effort session-resiliency failover\nconfig authority service-policy data-interactive name data-interactive\nconfig authority service-policy data-interactive description "Interactive data"\nconfig authority service-policy data-interactive service-class LowLatencyData\nconfig authority service-policy data-interactive path-quality-filter true\nconfig authority service-policy data-interactive best-effort true\nconfig authority service-policy data-interactive max-latency 250\nconfig authority service-policy data-mission-critical name data-mission-critical\nconfig authority service-policy data-mission-critical description "Mission-critical data"\nconfig authority service-policy data-mission-critical service-class MultimediaStreaming\nconfig authority service-policy data-mission-critical path-quality-filter true\nconfig authority service-policy data-mission-critical best-effort true\nconfig authority service-policy data-mission-critical max-latency 250\nconfig authority service-policy data-scavenger name data-scavenger\nconfig authority service-policy data-scavenger description "Scavenger class data"\nconfig authority service-policy data-scavenger service-class LowPriorityData\nconfig authority service-policy data-scavenger path-quality-filter false\n'})})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>r,x:()=>o});var n=t(96540);const s={},a=n.createContext(s);function r(e){const i=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(a.Provider,{value:i},e.children)}}}]);