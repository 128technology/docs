"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9441],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),f=a,h=u["".concat(s,".").concat(f)]||u[f]||d[f]||i;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},51051:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return d}});var r=n(87462),a=n(63366),i=(n(67294),n(3905)),o=["components"],c={title:"Ethernet Over Secure Vector Routing",sidebar_label:"Ethernet Over Secure Vector Routing"},s=void 0,l={unversionedId:"concepts_EthOverSVR",id:"concepts_EthOverSVR",title:"Ethernet Over Secure Vector Routing",description:"Ethernet Over SVR (EoSVR) is a proprietary protocol that extends the Ethernet broadcast domain across multiple sites. EoSVR provides a site to site ethernet broadcast domain between SSR routers with increased security and efficiency, without the overhead of IP packet encapsulation.",source:"@site/docs/concepts_EthOverSVR.md",sourceDirName:".",slug:"/concepts_EthOverSVR",permalink:"/docs/concepts_EthOverSVR",draft:!1,tags:[],version:"current",lastUpdatedAt:1695413319,formattedLastUpdatedAt:"Sep 22, 2023",frontMatter:{title:"Ethernet Over Secure Vector Routing",sidebar_label:"Ethernet Over Secure Vector Routing"},sidebar:"docs",previous:{title:"Application Identification",permalink:"/docs/concepts_appid"},next:{title:"HA - Theory of Operation",permalink:"/docs/concepts_ha_theoryofoperation"}},p={},d=[{value:"Packet Types",id:"packet-types",level:2},{value:"Non-IP, Multicast and broadcast Traffic",id:"non-ip-multicast-and-broadcast-traffic",level:3},{value:"Tunneling",id:"tunneling",level:4},{value:"IP Traffic",id:"ip-traffic",level:3},{value:"VxLAN Traffic",id:"vxlan-traffic",level:3}],u={toc:d};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Ethernet Over SVR (EoSVR) is a proprietary protocol that extends the Ethernet broadcast domain across multiple sites. EoSVR provides a site to site ethernet broadcast domain between SSR routers with increased security and efficiency, without the overhead of IP packet encapsulation."),(0,i.kt)("p",null,"Layer 2 and IP traffic destined for your LAN arrives on the SSR and is transported over an Ethernet Over SVR bridge to the destination SSR within the customer network. The bridge is configured between not more than two routers, and the configuration is validated before committing it to the running config."),(0,i.kt)("p",null,"EoSVR is only supported for point to point layer 2 services, and provides the following advantages over traditional MPLS networks:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Eliminates additional CE routers needed to deploy MPLS pseudowires."),(0,i.kt)("li",{parentName:"ul"},"First packet processing with metadata for VxLAN packets eliminates the need to tunnel the VxLAN packet within another IP packet (e.g. GRE)."),(0,i.kt)("li",{parentName:"ul"},"SVR packets can travel over multiple transport types (Internet or MPLS), providing multipath failover redundancy. "),(0,i.kt)("li",{parentName:"ul"},"Increased security; SVR packets are encrypted and authenticated.")),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/docs/config_EthoSVR"},"Configuring Ethernet over SVR")," for configuration information. "),(0,i.kt)("h2",{id:"packet-types"},"Packet Types"),(0,i.kt)("p",null,"There are four types of packets that are enabled for Ethernet Over SVR:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Non-IP, multicast, and broadcast packets."),(0,i.kt)("li",{parentName:"ul"},"IP packets."),(0,i.kt)("li",{parentName:"ul"},"VxLAN packets carrying Non-IP packets."),(0,i.kt)("li",{parentName:"ul"},"VxLAN packets carrying IP packets.")),(0,i.kt)("h3",{id:"non-ip-multicast-and-broadcast-traffic"},"Non-IP, Multicast and broadcast Traffic"),(0,i.kt)("p",null,"Non-IP (ARP, CDP, LLDP, etc), multicast, and broadcast traffic are encapsulated within an IP payload and transported as an SVR packet. Once marked as EoSVR, the flow is given a high timeout, allowing the flow to be reused for all non-IP packets.\nAll SVR capabilities are available for non-IP encapsulated packets including failover, service policy enforcement, and multi-hop. EoSVR is backward compatible with all existing routers, and can be enabled on a per end point basis."),(0,i.kt)("p",null,"Each router with an EoSVR bridge auto generates a new, specific service and service-route for EoSVR traffic, allowing remote routers with the same bridge name to access the EoSVR bridge. When the bridge name is manually specified, a new service-route is introduced."),(0,i.kt)("p",null,"Non-IP traffic is unidirectional. For example, router R1 and router R2 have the same bridge name configured. An ARP request on EoSVR bridge on router R1 creates a session to R2 via SVR. The ARP reply from R2 creates another session to R1. These sessions will timeout if no other non-IP packets are detected."),(0,i.kt)("h4",{id:"tunneling"},"Tunneling"),(0,i.kt)("p",null,"There is an option to encapsulate and tunnel all traffic if necessary. In this case, even the IP traffic will be tunneled under the session. Q-in-Q traffic is treated as non-ip traffic and uses the same session."),(0,i.kt)("h3",{id:"ip-traffic"},"IP Traffic"),(0,i.kt)("p",null,"All IP traffic is sent over SVR with the following new fields in the metadata:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Source MAC"),(0,i.kt)("li",{parentName:"ul"},"Destination MAC")),(0,i.kt)("p",null,"The first packet carries the metadata containing the L2 information to the final SSR. There the ethernet header is replaced with the fields above, and the packet is sent to the final destination."),(0,i.kt)("p",null,"The new metadata field avoids tunneling the entire IP packet inside another IP packet. The first packet carries the layer 2 information. Any subsequent packets that are sent without metadata have the layer 2 information restored at the final SSR, which extends the broadcast domain."),(0,i.kt)("p",null,"Flows setup for IP Traffic are bidirectional. These packets are expected to be in the same broadcast domain, and the ethernet address is preserved at the final SSR."),(0,i.kt)("h3",{id:"vxlan-traffic"},"VxLAN Traffic"),(0,i.kt)("p",null,"VxLAN traffic is is identified by having a destination port of 4789. When VxLAN traffic arrives on an SSR, a service is defined to carry the traffic. This service will have a service-route with a next-hop to the peer SSR. Because VxLAN traffic is unidirectional, two services are used to transport VxLAN traffic from one SSR to another, one in each direction. "),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"SSR R1 Service")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Service Vxlan_To_R2\n  protocol UDP\n  Port 4789\n  Address 1.1.1.0/24\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"SSR R2 Service")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Service Vxlan_To_R1\n  protocol UDP\n  Port 4789\n  Address 2.2.2.0/24\n")),(0,i.kt)("p",null,"If more addresses are involved, they are added to the existing service. All VxLAN traffic is sent over SVR with new fields in ebedded in the metadata."))}f.isMDXComponent=!0}}]);