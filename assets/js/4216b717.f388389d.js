"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[1737],{66396:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>a});var r=n(74848),i=n(28453);const s={title:"Intra- and Inter-System Communication",sidebar_label:"Machine Communication"},o=void 0,d={id:"concepts_machine_communication",title:"Intra- and Inter-System Communication",description:"This document lists the different communication channels between nodes within a router, between peering routers, and between routers and their conductor. This is to provide:",source:"@site/docs/concepts_machine_communication.md",sourceDirName:".",slug:"/concepts_machine_communication",permalink:"/docs/concepts_machine_communication",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Intra- and Inter-System Communication",sidebar_label:"Machine Communication"},sidebar:"docs",previous:{title:"Metrics",permalink:"/docs/concepts_metrics"},next:{title:"PCLI",permalink:"/docs/concepts_pcli"}},c={},a=[{value:"Connections",id:"connections",level:2},{value:"Node to Node Connectivity (High Availability)",id:"node-to-node-connectivity-high-availability",level:2},{value:"Router to Router Connectivity",id:"router-to-router-connectivity",level:2},{value:"BFD (Peer Path Detection)",id:"bfd-peer-path-detection",level:3},{value:"BFD (Path Quality)",id:"bfd-path-quality",level:3},{value:"Firewall Detector",id:"firewall-detector",level:3},{value:"Path MTU Discovery",id:"path-mtu-discovery",level:3},{value:"Secure Vector Routing Traffic",id:"secure-vector-routing-traffic",level:3},{value:"Protocol",id:"protocol",level:4},{value:"Port Ranges",id:"port-ranges",level:4},{value:"Example:",id:"example",level:4},{value:"TTL Handling",id:"ttl-handling",level:3},{value:"Router to Conductor Connectivity",id:"router-to-conductor-connectivity",level:2},{value:"Software Version Check",id:"software-version-check",level:3},{value:"Alarms",id:"alarms",level:3},{value:"Site-Wide Entitlement",id:"site-wide-entitlement",level:3},{value:"Conductor/Asset Keepalives",id:"conductorasset-keepalives",level:3},{value:"Key Exchange/Security Rekeying",id:"key-exchangesecurity-rekeying",level:3},{value:"Asset Keepalives",id:"asset-keepalives",level:3},{value:"Shell <code>connect</code>",id:"shell-connect",level:3},{value:"Log Retriever Connection",id:"log-retriever-connection",level:3},{value:"Conductor-hosted Software Repository",id:"conductor-hosted-software-repository",level:3},{value:"Conductor Software Proxy",id:"conductor-software-proxy",level:3},{value:"SSH Keepalives",id:"ssh-keepalives",level:3},{value:"Dynamic Peer Update",id:"dynamic-peer-update",level:3}];function l(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"This document lists the different communication channels between nodes within a router, between peering routers, and between routers and their conductor. This is to provide:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"A guide for port forwarding when deploying a conductor behind a firewall"}),"\n",(0,r.jsx)(t.li,{children:'A tool to help predict and manage the amount of ambient, management-plane bandwidth that SSR software will use during "steady state." (This is useful when deploying devices that have limited use and/or expensive WAN connections, such as LTE.)'}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"connections",children:"Connections"}),"\n",(0,r.jsxs)(t.p,{children:["Each running instance of SSR software (generically termed as a ",(0,r.jsx)(t.em,{children:"node"}),") can exist in one of two ",(0,r.jsx)(t.em,{children:"roles"}),": a ",(0,r.jsx)(t.em,{children:"router"})," or a ",(0,r.jsx)(t.em,{children:"conductor"}),". Furthermore, two ",(0,r.jsx)(t.em,{children:"nodes"})," can be coupled together to form a highly available router or conductor. There are machine to machine (M2M) connections between the various topologies of nodes, which will be covered here. These include:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Node to node connectivity within a highly available router"}),"\n",(0,r.jsx)(t.li,{children:"Router to router connectivity between peering routers"}),"\n",(0,r.jsx)(t.li,{children:"Router to conductor connectivity for management, adminstration, and orchestration"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"node-to-node-connectivity-high-availability",children:"Node to Node Connectivity (High Availability)"}),"\n",(0,r.jsx)(t.p,{children:"The vast majority of node-to-node connections, deployed as highly available systems, are done over directly connected interfaces between collocated machines. As such, bandwidth consumption and firewall management are not applicable. However, it is possible to geographically separate highly available nodes and have them communicate over a WAN, typically in the form of a data center interconnection."}),"\n",(0,r.jsx)(t.admonition,{type:"important",children:(0,r.jsx)(t.p,{children:"Geographic distribution for highly available systems is only supported for nodes serving as conductors. Juniper does not support geographic distribution of nodes acting as routers."})}),"\n",(0,r.jsx)(t.p,{children:"When deploying geographically separated conductor nodes, the following requirements must be met:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Latency less than 150ms"}),"\n",(0,r.jsx)(t.li,{children:"Packet loss less than 0.01%"}),"\n",(0,r.jsx)(t.li,{children:"No firewalling between the systems"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"router-to-router-connectivity",children:"Router to Router Connectivity"}),"\n",(0,r.jsx)(t.p,{children:"Between peered routers, there are four different M2M connections that are established aside from forwarding plane traffic that is sent between them, and excluding routing protocol control plane traffic (BGP). Each of the connections is described here."}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsxs)(t.p,{children:["Peering SSR routers requires a successful exchange of BFD packets in order to initiate SVR connections. ",(0,r.jsx)(t.em,{children:"At least one of the devices must be reachable at 1280/UDP."})," Peering can be established if one device is behind a NAT that allocates dynamic ports, but not both. To peer devices that are both behind distinct NATs (not recommended), you must forward 1280/UDP to one or both of them."]})}),"\n",(0,r.jsx)(t.h3,{id:"bfd-peer-path-detection",children:"BFD (Peer Path Detection)"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"1280/UDP"}),(0,r.jsx)(t.td,{children:"1s"}),(0,r.jsxs)(t.td,{children:["Frequency negotiated between devices by configuring ",(0,r.jsx)(t.code,{children:"desired-tx-interval"})," and ",(0,r.jsx)(t.code,{children:"required-min-rx-interval"})," settings. Client and server payloads are variable length, typically greater than 90 bytes. This is due to the presence of peer-name."]})]})})]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Bidirectional_Forwarding_Detection",children:"BFD"}),", or Bidirectional Forwarding Detection (as defined in ",(0,r.jsx)(t.a,{href:"https://tools.ietf.org/html/rfc5880",children:"RFC 5880"}),"), is exchanged between SSR routers to detect SVR path availability. I.e., the successful, and continued exchange of BFD packets is a prerequisite for choosing that path to carry SVR traffic. For peer path detection, SSR uses the ",(0,r.jsx)(t.em,{children:"asynchronous mode"})," of BFD."]}),"\n",(0,r.jsxs)(t.p,{children:["The peering status between SSR devices is viewable using the PCLI command ",(0,r.jsx)(t.code,{children:"show peers"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"The default timer values for BFD traffic are adequate for deployments where head end routers are managing 1,000 aggregate peer paths. For larger deployments, these values should be dilated."}),"\n",(0,r.jsx)(t.h3,{id:"bfd-path-quality",children:"BFD (Path Quality)"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"1280/UDP"}),(0,r.jsx)(t.td,{children:"10s"}),(0,r.jsx)(t.td,{children:"A ten (10) packet burst sent between SSR routers on each peer path. Client and server payloads are variable length, typically greater than 90 bytes. This is due to the presence of peer-name."})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["Each SSR router will measure the path quality to its peer using the ",(0,r.jsx)(t.em,{children:"echo mode"})," of BFD. It does so by sending a burst of ten packets every ten seconds over each peer path. These packets are echoed back from the remote SSR instance and returned to the point of origin. This allows the transmitter to accurately measure round trip time, and calculate packet loss and jitter (variability in interpacket arrival times)."]}),"\n",(0,r.jsxs)(t.p,{children:["The results of the path quality testing are available in the output of the PCLI command ",(0,r.jsx)(t.code,{children:"show peers detail"}),"."]}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsxs)(t.p,{children:["The SSR will also ",(0,r.jsx)(t.em,{children:"calculate"})," a Mean Opinion Score (MOS) for each peer path. This is derived from the loss, latency, and jitter values empirically determined by the Path Quality BFD packets."]})}),"\n",(0,r.jsx)(t.p,{children:'In many common deployment scenarios, the SSR software is deployed as "hub-and-spoke," where the traffic flows exclusively (or nearly exclusively) in one direction from branch deployments toward data centers. In these topologies, it is common and recommended to disable the asynchronous packets sent by the hub routers toward the edge routers, since the path selection critieria is not relevant.'}),"\n",(0,r.jsx)(t.h3,{id:"firewall-detector",children:"Firewall Detector"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"1280 and 1283/TCP"}),(0,r.jsx)(t.td,{children:"6516"}),(0,r.jsx)(t.td,{children:"6516"}),(0,r.jsx)(t.td,{children:"300s"}),(0,r.jsxs)(t.td,{children:["Rate can be adjusted by setting ",(0,r.jsx)(t.code,{children:"udp-transform/detect-interval"})," or disabled by setting ",(0,r.jsx)(t.code,{children:"udp-transform/mode"})," to ",(0,r.jsx)(t.code,{children:"always-transform"}),"."]})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["Each SSR periodically sends ",(0,r.jsx)(t.em,{children:"firewall detector"})," packets on each peer path to determine if stateful firewalls exist on the peer path. Firewalls between SSR devices can interfere with SVR behavior; because of this, the firewall detector is used to automatically trigger a ",(0,r.jsx)(t.em,{children:"UDP transform"})," feature, to carry SVR over UDP when firewalls would otherwise block TCP. The status of the firewall detector is show in the PCLI in the output of ",(0,r.jsx)(t.code,{children:"show udp-transform"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"admin@labsystem1.fiedler# show udp-transform router newton\n============= ============ ============ ========== =========================================\n Router Name   Node Name    Peer         Status     Reason(s)\n============= ============ ============ ========== =========================================\n newton        labsystem2   becket       enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;\n                            becket       enabled    TCP SYN; TCP SYN Jumbo;\n                            burlington   enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The firewall detector function sends deliberately malformed, out-of-order, and missequenced packets in bursts of four packets every five minutes (by default). This time may be increased if you are certain there is no firewall on the path, nor any possibility of the path changing to include a stateful device. If you know there is a firewall device in the path, you can force the ",(0,r.jsx)(t.code,{children:"udp-transform"})," to ",(0,r.jsx)(t.code,{children:"always-transform"}),", which suppresses the firewall detector packets entirely."]}),"\n",(0,r.jsx)(t.h3,{id:"path-mtu-discovery",children:"Path MTU Discovery"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"1280/UDP"}),(0,r.jsx)(t.td,{children:"2945"}),(0,r.jsx)(t.td,{children:"90"}),(0,r.jsx)(t.td,{children:"600s"}),(0,r.jsxs)(t.td,{children:["Interval is configurable within ",(0,r.jsx)(t.code,{children:"path-mtu-discovery/interval"}),", or disabled ",(0,r.jsx)(t.code,{children:"path-mtu-discovery/enabled"}),"."]})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Peering SSR routers will perform path MTU discovery on each peer path between each other. This test is run every ten (10) minutes by default, to adjust in the event of path changes between peering devices. During the test, SSR routers send packets of various sizes to discover the MTU of the path. However, in some government deployments the use of MTU discovery is not possible."}),"\n",(0,r.jsx)(t.p,{children:"In order to accommodate these deployments where \u201cICMP Destination Unreachable - Fragmentation Needed\u201d response messages are not generated (RFC1911 is not followed), three successive non-responses are considered equivalent to ICMP responses for the purposes of driving the algorithm with an inferred MTU."}),"\n",(0,r.jsxs)(t.p,{children:["The discovered MTU is viewable in the output of ",(0,r.jsx)(t.code,{children:"show peers"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"secure-vector-routing-traffic",children:"Secure Vector Routing Traffic"}),"\n",(0,r.jsxs)(t.p,{children:["By using SVR, the SSR creates sessions to transport directional, encrypted, tunnel-free traffic to its peers by creating engineered pathways between waypoints \u2013 IP addresses assigned to SSR interfaces. This is a significant departure from legacy tunnel-based approaches. For additional information about Waypoints and Secure Vector Routing (SVR) please refer to ",(0,r.jsx)(t.a,{href:"/docs/concepts_waypoint_ports",children:"Concepts of Waypoints and Waypoint Ports"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsxs)(t.td,{children:["16385-65,533 ",(0,r.jsx)("br",{})," TCP/UDP"]}),(0,r.jsx)(t.td,{children:"--"}),(0,r.jsx)(t.td,{children:"--"}),(0,r.jsx)(t.td,{children:"--"}),(0,r.jsxs)(t.td,{children:["Native TCP sessions use TCP for transport. UDP is used for all other session types. Use ",(0,r.jsx)(t.code,{children:"udp-transform"})," to force UDP transport."]})]})})]}),"\n",(0,r.jsx)(t.h4,{id:"protocol",children:"Protocol"}),"\n",(0,r.jsxs)(t.p,{children:["By default, native TCP sessions use TCP, and UDP is used for all other session types. However, if firewall detection is enabled and ",(0,r.jsx)(t.a,{href:"#firewall-detector",children:"triggered"}),", all traffic destined for a peer transitions to UDP."]}),"\n",(0,r.jsxs)(t.p,{children:["You can manually configure traffic to use UDP for transport by modifying the ",(0,r.jsx)(t.a,{href:"/docs/config_reference_guide#udp-transform",children:(0,r.jsx)(t.code,{children:"udp-transform"})})," sub-element under ",(0,r.jsx)(t.a,{href:"/docs/config_reference_guide#adjacency",children:"network-interface > adjacency"})," or ",(0,r.jsx)(t.a,{href:"/docs/config_reference_guide#neighborhood",children:"network-interface > neighborhood"}),"."]}),"\n",(0,r.jsx)(t.h4,{id:"port-ranges",children:"Port Ranges"}),"\n",(0,r.jsx)(t.p,{children:"The default range of ports used for configuring waypoints with SVR is 16,385 through 65,533. When sending traffic to a peer, the SSR will allocate an even numbered waypoint for itself and an odd numbered waypoint for its peer."}),"\n",(0,r.jsxs)(t.p,{children:["If you need to limit the ports or port range the SSR uses for receiving traffic, a ",(0,r.jsx)(t.code,{children:"port-range"})," can be configured under the ",(0,r.jsx)(t.code,{children:"neighborhood"}),". This tells peer SSRs to constrain the destination port range used when communicating with another router. Note that when manually specifying a port range, port numbers 1025 to 16383 can also be used."]}),"\n",(0,r.jsx)(t.h4,{id:"example",children:"Example:"}),"\n",(0,r.jsx)(t.p,{children:"Let's say you want to utilize UDP for transport, but do not want to open up all the default ports. To limit the number of ports open on your firewall, you choose to specify a port range of 10,000 to 12,000. With each new waypoint, thousands of active sessions are added. Even with a small port range selection you can easily support many active users."}),"\n",(0,r.jsx)(t.h3,{id:"ttl-handling",children:"TTL Handling"}),"\n",(0,r.jsx)(t.p,{children:"Beginning with version 6.0.0, the SSR's handling of SVR traffic can be configured to adjust the TTL value on hops between SSR routers. This adjustment can prevent situations where the TTL expires on packets flowing through multiple hops and then out to the Internet to their final destination."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Element"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"ttl-padding"}),(0,r.jsx)(t.td,{children:"enumeration"}),(0,r.jsx)(t.td,{children:"Valid values: 0-255, automatic, false. Default is 0. A numeric value is used to adjust the TTL of each packet destined to the next SSR. All subsequent routers continue to decrement the TTL value, but seeding at a higher value at each SSR hop minimizes the risk of TTL expiring mid-route. Automatic allows BFD traffic to help determine hops between SSR's and adjusts padding automatically. False disables the feature."})]})})]}),"\n",(0,r.jsx)(t.h2,{id:"router-to-conductor-connectivity",children:"Router to Conductor Connectivity"}),"\n",(0,r.jsxs)(t.p,{children:["Each deployed router (and in many cases, individual nodes within that router) has multiple concurrent connections to each conductor node within its authority. The primary connection between a router and a conductor is using 930/TCP, which is an encrypted SSH connection that bears most router-to-conductor inter-process communication (IPC). The secondary connetion is that between a router's ",(0,r.jsx)(t.em,{children:"salt-minion"})," and a conductor's ",(0,r.jsx)(t.em,{children:"salt-master"}),", which leverages 4505-4506/TCP."]}),"\n",(0,r.jsx)(t.admonition,{type:"important",children:(0,r.jsx)(t.p,{children:"When deploying a firewall in front of your SSR conductor, it is important to ensure that ports 930/TCP, 4505/TCP, and 4506/TCP are forwarded to your conductor node."})}),"\n",(0,r.jsx)(t.h3,{id:"software-version-check",children:"Software Version Check"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"to router"}),(0,r.jsx)(t.td,{children:"4506/TCP"}),(0,r.jsx)(t.td,{children:"950"}),(0,r.jsx)(t.td,{children:"2100"}),(0,r.jsx)(t.td,{children:"12hr"}),(0,r.jsx)(t.td,{children:"The payload size will be variable based on how many software versions are available for upgrade."})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Every twelve (12) hours, the conductor will query the router to see which versions it is eligible to download. This value is not configurable."}),"\n",(0,r.jsx)(t.h3,{id:"alarms",children:"Alarms"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"to conductor"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"214 (est.)"}),(0,r.jsx)(t.td,{children:"150"}),(0,r.jsx)(t.td,{children:"variable"}),(0,r.jsx)(t.td,{children:"The payload size and frequency of alarms sent from a router to a conductor is variable based on the types and frequencies of alarms."})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Alarms are sent by every managed router node to the conductor using a secure socket. The payload exchanged is dependent on the frequency and count of alarms that are sent."}),"\n",(0,r.jsxs)(t.p,{children:["Alarms are shown on the GUI of the conductor as well as via the PCLI command ",(0,r.jsx)(t.code,{children:"show alarms"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"site-wide-entitlement",children:"Site-Wide Entitlement"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"to conductor"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"182 (est.)"}),(0,r.jsx)(t.td,{children:"0"}),(0,r.jsx)(t.td,{children:"300s"}),(0,r.jsx)(t.td,{children:"The payload size is variable based on the name of the device transmitting the entitlement data."})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["Each router relays its utilization data to the conductor every five minutes, to render it on the conductor UI as part of the conductor's ",(0,r.jsx)(t.em,{children:"entitlement"})," graph. This value is not configurable."]}),"\n",(0,r.jsxs)(t.p,{children:["The current entitlement usage is shown in the device GUI as well as the output of the PCLI command ",(0,r.jsx)(t.code,{children:"show entitlement"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"conductorasset-keepalives",children:"Conductor/Asset Keepalives"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"to conductor"}),(0,r.jsx)(t.td,{children:"4505/TCP"}),(0,r.jsx)(t.td,{children:"0"}),(0,r.jsx)(t.td,{children:"0"}),(0,r.jsx)(t.td,{children:"10s (client), 20s (server)"}),(0,r.jsx)(t.td,{children:"TCP keepalive ACKs only"})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The TCP socket between the router node's ",(0,r.jsx)(t.em,{children:"salt-minion"})," and the conductor's ",(0,r.jsx)(t.em,{children:"salt-master"})," is refreshed periodically to ensure that the minion/master connectivity persists. This value is not configurable."]}),"\n",(0,r.jsx)(t.h3,{id:"key-exchangesecurity-rekeying",children:"Key Exchange/Security Rekeying"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"to conductor"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"150"}),(0,r.jsx)(t.td,{children:"294"}),(0,r.jsx)(t.td,{children:"none"}),(0,r.jsxs)(t.td,{children:["Variable based on configured ",(0,r.jsx)(t.code,{children:"rekey-interval"})," and the number of ",(0,r.jsx)(t.code,{children:"security"})," configuration elements."]})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The conductor orchestrates a periodic key exchange when the ",(0,r.jsx)(t.code,{children:"authority > rekey-interval"})," is changed from its default value of ",(0,r.jsx)(t.code,{children:"never"}),". When set, each router will receive a key from conductor at the defined interval for each ",(0,r.jsx)(t.code,{children:"security"})," element configured."]}),"\n",(0,r.jsxs)(t.p,{children:["The status for the key exchange and rekeying process is shown in the output of the PCLI command ",(0,r.jsx)(t.code,{children:"show security key-status"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"asset-keepalives",children:"Asset Keepalives"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"4506/TCP"}),(0,r.jsx)(t.td,{children:"514"}),(0,r.jsx)(t.td,{children:"84"}),(0,r.jsx)(t.td,{children:"1s"}),(0,r.jsx)(t.td,{})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The asset keepalive messages are used to ensure persistent connectivity between a router's ",(0,r.jsx)(t.em,{children:"minion"})," and the corresponding ",(0,r.jsx)(t.em,{children:"master"})," running on its conductor(s). The asset's connection state is viewable using the ",(0,r.jsx)(t.code,{children:"show assets"})," command within the PCLI on the conductor."]}),"\n",(0,r.jsxs)(t.h3,{id:"shell-connect",children:["Shell ",(0,r.jsx)(t.code,{children:"connect"})]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"20s (client), 5s (server)"}),(0,r.jsx)(t.td,{children:"Amount of data exchanged is largely dependent on administrator activity once connected to a remote router."})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The conductor offers several ways of connecting to a remote router's shell (including both its PCLI shell and Linux shell): either via the ",(0,r.jsx)(t.code,{children:"connect"})," command within the PCLI, or using the ",(0,r.jsx)(t.em,{children:"PCLI cut-through"})," feature within the conductor's GUI. Both of these leverage a secure (SSH) connection between the router its conductor(s)."]}),"\n",(0,r.jsxs)(t.p,{children:["Each ",(0,r.jsx)(t.em,{children:"node"})," within a router will connect to each of its conductors."]}),"\n",(0,r.jsx)(t.h3,{id:"log-retriever-connection",children:"Log Retriever Connection"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"20s (client), 5s (server)"}),(0,r.jsx)(t.td,{children:"Amount of data exchanged is entirely dependent on if/when administrators retrieve logs from remote routers via conductor GUI."})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.em,{children:"log retriever"})," is a function within the conductor's GUI to allow administrators to download log files, packet captures, and tech-support-info bundles. When using this GUI function on the conductor, it will retrieve a file inventory via this connection, and also use that same connection to relay any logs to the user via their web browser."]}),"\n",(0,r.jsxs)(t.p,{children:["Each ",(0,r.jsx)(t.em,{children:"node"})," within a router will connect using this mechanism to each of its conductors."]}),"\n",(0,r.jsx)(t.h3,{id:"conductor-hosted-software-repository",children:"Conductor-hosted Software Repository"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"20s (client), 5s (server)"}),(0,r.jsx)(t.td,{children:"Only exchanged if the conductor hosted software repository is configured."})]})})]}),"\n",(0,r.jsx)(t.p,{children:"When the conductor is used as a software repository for its managed routers, there will be connectivity checks sent periodically. The frequency at which these are exchanged is not configurable. When the conductor is not used as a software repository (which is the default behavior), these keepalives are not sent."}),"\n",(0,r.jsx)(t.h3,{id:"conductor-software-proxy",children:"Conductor Software Proxy"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"104"}),(0,r.jsx)(t.td,{children:"20s (client), 5s (server)"}),(0,r.jsx)(t.td,{children:"Only exchanged if the conductor is configured as a proxy for software retrieval."})]})})]}),"\n",(0,r.jsx)(t.p,{children:"When the conductor is used as a proxy for reaching the SSR software repository, there will be connectivity checks sent periodically. The frequency at which these are exchanged is not configurable. When the conductor is not used as a software proxy (which is the default behavior), these keepalives are not sent."}),"\n",(0,r.jsx)(t.h3,{id:"ssh-keepalives",children:"SSH Keepalives"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"84"}),(0,r.jsx)(t.td,{children:"48"}),(0,r.jsx)(t.td,{children:"5s"}),(0,r.jsx)(t.td,{children:"Maintains secure socket connection between conductor and deployed router."})]})})]}),"\n",(0,r.jsx)(t.p,{children:"The connection between the router and conductor is refreshed every five seconds using keepalive messages."}),"\n",(0,r.jsx)(t.h3,{id:"dynamic-peer-update",children:"Dynamic Peer Update"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Direction"}),(0,r.jsx)(t.th,{children:"Port/Proto"}),(0,r.jsx)(t.th,{children:"Client Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Server Payload (bytes)"}),(0,r.jsx)(t.th,{children:"Default Interval"}),(0,r.jsx)(t.th,{children:"Notes"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"bidirectional"}),(0,r.jsx)(t.td,{children:"930/TCP"}),(0,r.jsx)(t.td,{children:"128"}),(0,r.jsx)(t.td,{children:"100"}),(0,r.jsx)(t.td,{children:"on demand"}),(0,r.jsx)(t.td,{children:"Variable size payload based on router and node name. This is exercised whenever a dynamic IP address on a deployed router changes."})]})})]}),"\n",(0,r.jsxs)(t.p,{children:["The Dynamic Peer Update (DPU) process supplies dynamic IP address information from a router to conductor, which will then propagate that information down to all routers that create adjacencies to that address. When a ",(0,r.jsx)(t.code,{children:"network-interface"})," that uses dynamic addressing (e.g., DHCP, PPPoE) acquires an address for the first time or changes its address, that information is sent to conductor via DPU."]}),"\n",(0,r.jsxs)(t.p,{children:["The status of the DPU exchange is shown in the output of the PCLI command ",(0,r.jsx)(t.code,{children:"show dynamic-peer-update"}),"."]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>d});var r=n(96540);const i={},s=r.createContext(i);function o(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);