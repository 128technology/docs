"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5857],{587:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var i=t(74848),r=t(28453);const o={title:"Customizable Firewall Rules and Filters",sidebar_label:"Customizable Firewall Rules and Filters"},s=void 0,a={id:"cc_fips_sec_firewall_filtering",title:"Customizable Firewall Rules and Filters",description:"As part of the security hardening and certification process, the SSR has implemented the following firewall features to provide a more secure platform for network traffic.",source:"@site/docs/cc_fips_sec_firewall_filtering.md",sourceDirName:".",slug:"/cc_fips_sec_firewall_filtering",permalink:"/docs/cc_fips_sec_firewall_filtering",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Customizable Firewall Rules and Filters",sidebar_label:"Customizable Firewall Rules and Filters"},sidebar:"docs",previous:{title:"Audit Events and Logging",permalink:"/docs/cc_fips_config_audit_event"},next:{title:"Configuring Banners",permalink:"/docs/cc_fips_banners"}},c={},d=[{value:"Packet Filtering",id:"packet-filtering",level:2},{value:"Configuration",id:"configuration",level:4},{value:"Configuration Example:",id:"configuration-example",level:4},{value:"ICMP",id:"icmp",level:2},{value:"ICMP Type as a Session Attribute",id:"icmp-type-as-a-session-attribute",level:3},{value:"Configuration Example",id:"configuration-example-1",level:4},{value:"Discard ICMP Echo Replies With No Request",id:"discard-icmp-echo-replies-with-no-request",level:3},{value:"IPv4 Option Filtering",id:"ipv4-option-filtering",level:2},{value:"Configuration Example",id:"configuration-example-2",level:4},{value:"Broadcast and Multicast Source Addresses",id:"broadcast-and-multicast-source-addresses",level:3},{value:"Transport State Enforcement",id:"transport-state-enforcement",level:2},{value:"Configuration Example",id:"configuration-example-3",level:4},{value:"TCP Half-Open Connection Limit",id:"tcp-half-open-connection-limit",level:2},{value:"Configuration Example",id:"configuration-example-4",level:4},{value:"Firewall Audit Events",id:"firewall-audit-events",level:2},{value:"Discarded Traffic",id:"discarded-traffic",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"As part of the security hardening and certification process, the SSR has implemented the following firewall features to provide a more secure platform for network traffic."}),"\n",(0,i.jsx)(n.p,{children:"The SSR implements a packet filtering firewall which allows you to define rules for filtering traffic. The rules may be defined for specific traffic or all  traffic."}),"\n",(0,i.jsxs)(n.p,{children:["When Firewall filtering rules are defined, the traffic identified in the traffic filtering rules is filtered. Traffic that is not identified in the firewall filtering rules is allowed to pass, but is subject to conditions configured as part of SSR services. Services can be configured using IP addresses, hostnames, CIDR block ranges, and optionally transport protocols and specific ports. In order for any traffic to pass through an SSR, it must be identified in a service - its source must be classified as belonging to a tenant, its destination needs to match a FIB entry for this tenant, and a next-hop must be available for this service traffic. If traffic arrives at the SSR and does not match the firewall filters or a service, that traffic is not allowed to pass. If no firewall rules are configured, traffic is subject to the SSR and Services configuration. Traffic that does not meet these criteria is dropped. For additional service information, see ",(0,i.jsx)(n.a,{href:"https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service_and_service_policy_design",children:"Service and Service Policy Design."})]}),"\n",(0,i.jsx)(n.p,{children:"Firewall rules may be applied to each network interface separately, and are applied in the order defined by the user. The SSR follows the rule base for each network connection and implements the first rule that matches the traffic. The SSR inspects each packet independently, and no residual information for previously inspected packets influences the inspection."}),"\n",(0,i.jsx)(n.h2,{id:"packet-filtering",children:"Packet Filtering"}),"\n",(0,i.jsx)(n.p,{children:"The SSR uses Berkeley Packet Filters (BPF) to create customizable firewall filters. This filtering solution can be a key tool to prevent packet level attacks and aid with intrusion detection and prevention. Using BPF, packets on the SSR can be filtered by any known packet field, and the order in which filters are applied can be set by the user.\nFilters are configured and applied on the receiving network-interface."}),"\n",(0,i.jsx)(n.h4,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"At the Authority level, define the router, then the node, the device interface, and the network interface where the filters will be configured."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Under ",(0,i.jsx)(n.code,{children:"filter-rule"}),", define:"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"action"})," - ",(0,i.jsx)(n.code,{children:"deny"})," discards any packets matching the filter applied. ",(0,i.jsx)(n.code,{children:"permit"})," allows packets that match the rule to bypass any additional rules, and passes the traffic."]}),"\n",(0,i.jsxs)(n.li,{children:["The filter type - ",(0,i.jsx)(n.code,{children:"bpf"})," (Berkeley Packet Filter) is currently the only option. This identifies the filter to be applied. Validation confirms proper BPF syntax."]}),"\n"]}),"\n",(0,i.jsxs)(n.ol,{start:"3",children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Configuration of permit rules follows the same process."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["After the Filter Rule list has been created, you can reorder the rules using the ",(0,i.jsx)(n.code,{children:"move"})," command. This list determines the order in which filter rules are applied."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"The number and complexity of rules will have an impact on forwarding performance."})}),"\n",(0,i.jsx)(n.h4,{id:"configuration-example",children:"Configuration Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'*admin@conductor.conductor# configure authority router 128t-west\n*admin@conductor.conductor (router[name=128t-west])# node 128t-west\n*admin@conductor.conductor (node[name=128t-west])# device-interface bfp-test\n*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30\n*admin@conductor.conductor (network-interface[name=intf30])# filter-rule DropUDP_Port400\n*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# action deny\n*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# bpf "udp port 400"\n*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# exit\n*admin@conductor.conductor (network-interface[name=intf30])# filter-rule PermitIPaddress\n*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# action permit\n*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# bpf "host 192.168.0.0"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Rules can be moved using the ",(0,i.jsx)(n.code,{children:"move"})," command:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30\n*admin@conductor.conductor (network-interface[name=intf30])# move filter-rule DropUDP_Port400 after PermitIPaddress\n*admin@conductor.conductor (network-interface[name=intf30])# show\nname         intf30\n\nfilter-rule  PermitIPaddress\n    name    PermitIPaddress\n    bpf     "host 192.168.0.0"\n    action  permit\nexit\n\nfilter-rule  DropUDP_Port400\n    name    DropUDP_Port400\n    bpf     "udp port 400"\n    action  deny\nexit\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Detailed information about Berkeley Packet Filters is outside of the scope of this documentation, but is readily available on the internet."})}),"\n",(0,i.jsx)(n.h2,{id:"icmp",children:"ICMP"}),"\n",(0,i.jsx)(n.p,{children:"Because ICMP can be an attack vector for a network or used to discover your network topology, ICMP attributes have been updated for firewall protection."}),"\n",(0,i.jsx)(n.h3,{id:"icmp-type-as-a-session-attribute",children:"ICMP Type as a Session Attribute"}),"\n",(0,i.jsxs)(n.p,{children:["By default, the SSR does not use ICMP codes as a session attribute. However, the SSR does match ICMP error packets with the sessions that generated them, and only accepts those ICMP packets when they match an existing session. For instance, to protect against ICMP attacks from using a barrage of ",(0,i.jsx)(n.code,{children:"Destination Unreachable"})," messages, if a TCP packet generates a ",(0,i.jsx)(n.code,{children:"Destination Unreachable"}),", upon receipt of the ",(0,i.jsx)(n.code,{children:"Destination Unreachable"})," the SSR uses the code to interpret the packet and match it to an existing session. If a match is found, the packet is forwarded to the end host. If a match is not found, the packet is rejected."]}),"\n",(0,i.jsx)(n.p,{children:"To enable ICMP type as a session attribute:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["From the Authority level, configure ",(0,i.jsx)(n.code,{children:"icmp-control"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Set ",(0,i.jsx)(n.code,{children:"icmp-async-reply"})," to ",(0,i.jsx)(n.code,{children:"drop"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Set ",(0,i.jsx)(n.code,{children:"icmp-session-match"})," to ",(0,i.jsx)(n.code,{children:"identifier and type"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"configuration-example-1",children:"Configuration Example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"*admin@conductor.conductor# configure authority icmp-control icmp-async-reply drop\n*admin@conductor.conductor# configure authority icmp-control icmp-session-match identifier-and-type\n"})}),"\n",(0,i.jsx)(n.h3,{id:"discard-icmp-echo-replies-with-no-request",children:"Discard ICMP Echo Replies With No Request"}),"\n",(0,i.jsxs)(n.p,{children:["When you configure the ICMP Async Reply as ",(0,i.jsx)(n.code,{children:"drop"})," (shown above), any ICMP Echo Replies that arrive at the SSR are dropped if no corresponding request has been seen. This helps to prevent DoS (Denial of Service) attacks such as an ICMP Ping flood."]}),"\n",(0,i.jsx)(n.h2,{id:"ipv4-option-filtering",children:"IPv4 Option Filtering"}),"\n",(0,i.jsx)(n.p,{children:"Attackers sometimes configure IPv4 options incorrectly, producing either incomplete or malformed fields. These malformed packets can be used to compromise hosts on the network. IPv4 Options Filtering provides a mechanism to determine what to do with network data packets based on the options field of the packets. The SSR will inspect the IPv4 header options, compare them to a user defined exclusiont list, and make necessary decisions whether the packets are allowed or dropped and logged."}),"\n",(0,i.jsxs)(n.p,{children:["By default, all IPv4 packets with options are allowed. To configure the dropping of specific IPv4 options, you must first enable ",(0,i.jsx)(n.code,{children:"drop-all"}),". This reveals the Drop Exclusions list, where you can define IPv4 options to exclude from the drop action."]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["At the Authority level, configure ",(0,i.jsx)(n.code,{children:"ipv4-option-filter action drop-all"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["To configure allowed options, ",(0,i.jsx)(n.code,{children:"ipv4-option-filter drop-exclusion 11"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Enter the Option type/number from the ",(0,i.jsx)(n.a,{href:"https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1",children:"IPv4 Parameters"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"configuration-example-2",children:"Configuration Example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"*admin@conductor.conductor# configure authority ipv4-option-filter action drop-all\n*admin@conductor.conductor# configure authority ipv4-option-filter drop-exclusion 11\n*admin@conductor.conductor# show config candidate authority ipv4-option-filter\n\nconfig\n\n    authority\n\n        ipv4-option-filter\n            action          drop-all\n            drop-exclusion  11\n        exit\n    exit\nexit\n\n*admin@conductor.conductor#\n"})}),"\n",(0,i.jsx)(n.h3,{id:"broadcast-and-multicast-source-addresses",children:"Broadcast and Multicast Source Addresses"}),"\n",(0,i.jsx)(n.p,{children:"To prevent DoS attacks, packets with broadcast or multicast source IP and MAC addresses are now dropped by default. Otherwise the traffic is propogated across the entire network, flooding the network."}),"\n",(0,i.jsx)(n.h2,{id:"transport-state-enforcement",children:"Transport State Enforcement"}),"\n",(0,i.jsx)(n.p,{children:"This functionality sets the action on how the TCP state machine should process unexpected TCP packets. This is important because in some cases where these unexpected packets arrive, it may indicate a TCP Reset attack. By default, the SSR checks and follows the TCP sequence numbers of all the sessions passing through, and increments the associated metrics. Setting the Transport State Enforcement field to Strict ensures any packets in the TCP stream that fall outside of the sequence number stream will be dropped."}),"\n",(0,i.jsx)(n.p,{children:"Any packets in the TCP stream that fall outside of the sequence number stream will be dropped. This will apply to any service that has this service policy configured."}),"\n",(0,i.jsx)(n.h4,{id:"configuration-example-3",children:"Configuration Example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"*admin@conductor.conductor# configure authority service-policy prefer-path-2 transport-\nstate-enforcement strict\n*admin@conductor.conductor#\n"})}),"\n",(0,i.jsxs)(n.p,{children:["For a detailed description of Transport State Enforcement, refer to ",(0,i.jsx)(n.a,{href:"https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service_and_service_policy_design#transport-state-enforcement",children:"Transport State Enforcement"}),". For additional configuration information, see the ",(0,i.jsx)(n.a,{href:"https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_reference_guide#service-policy",children:"transport-state-enforcement"})," parameter."]}),"\n",(0,i.jsx)(n.h2,{id:"tcp-half-open-connection-limit",children:"TCP Half-Open Connection Limit"}),"\n",(0,i.jsx)(n.p,{children:"Half-open TCP connections are those where the handshake has started but not completed. An attacker will initiate the handshake in order to take over all available TCP connections, known as a SYN Flood attack or distributed denial of service  (DDoS) attack. This prevents service to legitimate traffic and potentially bring down the network."}),"\n",(0,i.jsx)(n.p,{children:"The SSR provides the ability to configure a limit to these half-open TCP connections."}),"\n",(0,i.jsxs)(n.p,{children:["The connection limit is configured at the router level (Authority > Router), and is unlimited by default. To set a limit, enter a numerical value in the ",(0,i.jsx)(n.code,{children:"Half-Open Connection Limit"})," field in the Router Basic Information panel. When configured, the SSR tracks how many half-open sessions there are based on existing TCP session state ",(0,i.jsx)(n.strong,{children:"and will deny any new TCP sessions once the limit has been reached"}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["When the SSR approaches the configured limit of half-open TCP connections, the establishment of ",(0,i.jsx)(n.strong,{children:"healthy"})," TCP sessions may be significantly impacted. Please ensure that this value is set appropriately for your network. More importantly, attempt to identify the devices that are creating half-open sessions."]})}),"\n",(0,i.jsx)(n.p,{children:"Additionally, if you require a limit for half-open TCP sessions, it may be helpful to consider the initial TCP session timeout value. The default timer is 10 seconds. If an application fails to establish a TCP socket, the sessions that are in that state will still remain on the SSR for that initial timeout."}),"\n",(0,i.jsxs)(n.p,{children:["An awareness of these two values (half-open limit and TCP session timer) may mitigate the impact of limiting the establishment of ",(0,i.jsx)(n.strong,{children:"healthy"})," TCP sessions."]}),"\n",(0,i.jsx)(n.h4,{id:"configuration-example-4",children:"Configuration Example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"*admin@conductor.conductor#\n*admin@conductor.conductor# configure authority router 128t-west half-open-connection-l\nimit 100000\n"})}),"\n",(0,i.jsx)(n.h2,{id:"firewall-audit-events",children:"Firewall Audit Events"}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"show events type traffic"})," to display the two types of traffic events."]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"show events type traffic.denied"})," or the ",(0,i.jsx)(n.code,{children:"show events type traffic.permitted"})," to display the  firewall audit events."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"admin@combo-east-a.combo-east# show events type traffic.denied\nWed 2024-03-06 21:00:24 UTC\n==================================================================\n 2024-03-06T21:00:23.956Z Traffic request violates access policy.\n==================================================================\n Type:               traffic.denied\n Node:               combo-east-a\n Denied Reason:      access\n Destination Address:172.16.2.40\n Destination Port:   1024\n Ingress Interface:  1.10\n Ip Protocol:        udp\n Permitted:          False\n Source Address:     172.16.1.40\n Source Port:        1024\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"admin@combo-east-a.combo-east# show events type traffic.permitted\nWed 2024-03-06 21:12:25 UTC\n=====================================================\n 2024-03-06T21:11:18.014Z Traffic request permitted.\n=====================================================\n Type:               traffic.permitted\n Node:               combo-east-a\n Destination Address:172.16.1.40\n Destination Port:   1024\n Ingress Interface:  5.0\n Ip Protocol:        udp\n Permitted:          True\n Source Address:     172.16.2.40\n Source Port:        1024\n\n=====================================================\n 2024-03-06T21:08:57.335Z Traffic request permitted.\n=====================================================\n Type:               traffic.permitted\n Node:               combo-east-a\n Destination Address:172.16.1.2\n Icmp Type:          8\n Ingress Interface:  1.10\n Ip Protocol:        icmp\n Permitted:          True\n Source Address:     172.16.1.40\n"})}),"\n",(0,i.jsxs)(n.p,{children:["To correlate an interface with a firewall audit event, use the internal ID of the interface to undrestand which interface generated the event. This is visible in the ",(0,i.jsx)(n.code,{children:"show device-interface"})," command as the ",(0,i.jsx)(n.code,{children:"Internal ID: 1"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"admin@test1.Fabric128# show device-interface\nFri 2023-10-27 10:06:30 EDT\n\u2714 Retrieving device interface information...\n\n========================================\n test1:LAN\n========================================\n Type:                ethernet\n Internal ID:         1\n Forwarding:          true\n PCI Address:         0000:00:04.0\n MAC Address:         fa:16:3e:88:8d:c1\n\n Admin Status:        up\n Operational Status:  up\n Provisional Status:  up\n Redundancy Status:   non-redundant\n Speed:               10 Gb/s\n Duplex:              full\n\n in-octets:                         360\n in-unicast-pkts:                     4\n in-errors:                           0\n out-octets:                          0\n out-unicast-pkts:                    0\n out-errors:                          0\n\n Plugin Info:         unavailable\n\n"})}),"\n",(0,i.jsx)(n.h3,{id:"discarded-traffic",children:"Discarded Traffic"}),"\n",(0,i.jsx)(n.p,{children:"When firewall filtering is enabled, and rules are configured, any traffic that does not match the configured policies will be discarded/dropped. Additionally, any traffic meeting the following conditions will be discarded:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Any malformed packets."}),"\n",(0,i.jsx)(n.li,{children:"If the source address of the network packet is defined as being on a broadcast network."}),"\n",(0,i.jsx)(n.li,{children:"If the source address of the network packet is defined as being on a multicast network."}),"\n",(0,i.jsx)(n.li,{children:"Any packets with the following IP options: Loose Source Routing, Strict Source Routing, or Record Route."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var i=t(96540);const r={},o=i.createContext(r);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);