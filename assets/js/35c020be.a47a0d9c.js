"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[3008],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),f=l(n),u=i,h=f["".concat(s,".").concat(u)]||f[u]||p[u]||r;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:i,o[1]=c;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},51184:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return d},default:function(){return f}});var a=n(87462),i=n(63366),r=(n(67294),n(3905)),o=["components"],c={title:"Per Adjacency Traffic Engineering",sidebar_label:"Per Adjacency Traffic Engineering"},s=void 0,l={unversionedId:"bcp_per-adjacency_traffic_engineering",id:"bcp_per-adjacency_traffic_engineering",title:"Per Adjacency Traffic Engineering",description:"Packet loss due to congestion in networks, particularly over WAN links, is inevitable. Depending on where drops occur, it can have a major impact on perceived quality of experience. Packet loss due to exceeding transmit caps between instances of SSR should be avoided. Per-adjacency traffic engineering can be enabled to regulate the upload and download rates between peers.",source:"@site/docs/bcp_per-adjacency_traffic_engineering.md",sourceDirName:".",slug:"/bcp_per-adjacency_traffic_engineering",permalink:"/docs/bcp_per-adjacency_traffic_engineering",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Per Adjacency Traffic Engineering",sidebar_label:"Per Adjacency Traffic Engineering"},sidebar:"docs",previous:{title:"Conductor Deployment",permalink:"/docs/bcp_conductor_deployment"},next:{title:"ExpressRoute QoS Configuration",permalink:"/docs/bcp_qos_msft_expressroute"}},d=[{value:"Overview",id:"overview",children:[{value:"Traffic Profile",id:"traffic-profile",children:[],level:3},{value:"Auto-Configuration via Neighborhoods",id:"auto-configuration-via-neighborhoods",children:[],level:3},{value:"Manual Configuration via Adjacencies",id:"manual-configuration-via-adjacencies",children:[],level:3},{value:"Gathering Statistics",id:"gathering-statistics",children:[],level:3},{value:"Additional Information",id:"additional-information",children:[],level:3}],level:2}],p={toc:d};function f(e){var t=e.components,c=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},p,c,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Packet loss due to congestion in networks, particularly over WAN links, is inevitable. Depending on where drops occur, it can have a major impact on perceived quality of experience. Packet loss due to exceeding transmit caps between instances of SSR should be avoided. Per-adjacency traffic engineering can be enabled to regulate the upload and download rates between peers.  "),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"Per-adjacency traffic engineering provides targeted traffic engineering for both directions on a bandwidth restricted link between two SSR instances. Traffic engineering on the device interface continues to be associated with the upload rate of a connected link; the ",(0,r.kt)("inlineCode",{parentName:"p"},"transmit-cap"),". Traffic engineering at the adjacency level is associated with the download limit of the adjacent SSR instance; the ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap"),".  "),(0,r.kt)("p",null,"For example, in the following hub and spoke diagram the Datacenter router has 5 adjacencies off of the individual device interface with a ",(0,r.kt)("inlineCode",{parentName:"p"},"transmit-cap")," upload speed configured at 50Mb. The adjacent branch routers have 10Mb, 5Mb, 1Mb, 5Mb, and 2.5Mb configured as their device interface transmit caps. With such a large ",(0,r.kt)("inlineCode",{parentName:"p"},"transmit-cap")," at the Datacenter, traffic rates exceeding the allowed download speeds (10Mb, 5Mb, 1Mb, 5Mb, and 2.5Mb) on each of the paths to the branch routers will result in traffic being dropped by the ISP. "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Hub and Spoke Network",src:n(97965).Z})),(0,r.kt)("p",null,"Per-adjacency traffic engineering allows you to automatically identify the adjacent path and the ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap"),", and limit the rate of traffic destined for that path. With a ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap")," configured for each adjacency, traffic does not exceed the ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap")," associated with the adjacency, and is not dropped by the ISP. "),(0,r.kt)("h3",{id:"traffic-profile"},"Traffic Profile"),(0,r.kt)("p",null,"A traffic profile allows you to adjust the amount of bandwidth allocated for various traffic categories. When a traffic profile is configured, it is applied on a network or device interface. Note that the values for best-effort, high, medium, and low are percentage values, and collectively must add up to 100 percent. See ",(0,r.kt)("a",{parentName:"p",href:"/docs/config_reference_guide#traffic-profile"},(0,r.kt)("inlineCode",{parentName:"a"},"traffic-profile"))," for additional information. "),(0,r.kt)("h3",{id:"auto-configuration-via-neighborhoods"},"Auto-Configuration via Neighborhoods"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Per adjacency traffic-engineering is limited to spoke nodes in a hub and spoke topology. "))),(0,r.kt)("p",null,"Typically, adjacencies are automatically configured via ",(0,r.kt)("a",{parentName:"p",href:"/docs/concepts_glossary#neighborhoods"},"neighborhoods"),". All nodes in a neighborhood share layer 3 connectivity. Between any two nodes we can form a pair of adjacencies, one on each router, which describes their peering. When the adjacencies are automatically created, the spoke\u2019s neighborhood ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap")," is inspected by the neighborhood Hub router. It creates an adjacency with a ",(0,r.kt)("inlineCode",{parentName:"p"},"transmit-cap")," matching the spoke\u2019s ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap"),". "),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In order to generate the adjacencies correctly, configure a ",(0,r.kt)("inlineCode",{parentName:"p"},"receive-cap")," on the neighborhood of the network interface with limited receive capabilities."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"network-interface foo\n    neighborhood bar\n        topology spoke\n  vector internet\n        traffic-engineering\n            enabled true\n            receive-cap 1000000 (<---)\n          traffic-profile profile\n        exit\n    exit\nexit\n")),(0,r.kt)("h3",{id:"manual-configuration-via-adjacencies"},"Manual Configuration via Adjacencies"),(0,r.kt)("p",null,"The preferred method for configuring adjacencies is using auto-configure via neighborhoods. However, it is possible to manually configure per adjacency traffic-engineering. To limit the router\u2019s transmit speeds when communicating with a specific peer, set the ",(0,r.kt)("inlineCode",{parentName:"p"},"traffic-engineering")," container in the adjacency to have the desired ",(0,r.kt)("inlineCode",{parentName:"p"},"transmit-cap"),". "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"network-interface foo\n    adjacency 1.1.1.1\n        ip-address 1.1.1.1\n        peer peer_router\n        inter-router-security interfabric\n        peer-connectivity bidirectional\n        traffic-engineering\n            enabled true\n            transmit-cap 1000000\n    traffic-profile profile\n        exit\n    exit\nexit\n")),(0,r.kt)("h3",{id:"gathering-statistics"},"Gathering Statistics"),(0,r.kt)("p",null,"To gather information about Per-Adjacency Traffic Engineering, query the following statistics using the ",(0,r.kt)("inlineCode",{parentName:"p"},"show stats traffic-eng device-interface peer-path")," command within the CLI. These statistics are specific to the peer-path and provide insight into how the adjacency schedulers are operating."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"enqueue-cycle-count"),": The current enqueue cycle count in traffic engineering for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"dequeue-cycle-count"),": The current dequeue cycle count in traffic engineering for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"packets-queued"),": The current number of packets queued in traffic engineering for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-success-bytes"),": The number of bytes successfully scheduled for transmission for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-success-packets"),": The number of packets successfully scheduled for transmission for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-failure-bytes"),": The number of bytes failed to be scheduled for transmission due to bandwidth oversubscription for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-failure-packets"),": The number of packets failed to be scheduled for transmission due to bandwidth oversubscription for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-success-bytes"),": The number of bytes successfully dequeued from the scheduler for transmission for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-success-packets"),": The number of packets successfully dequeued from the scheduler for transmission for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-max-latency-drop-bytes"),": The number of bytes scheduled for transmission that were dropped due to excessive latency for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-max-latency-drop-packets"),": The number of packets scheduled for transmission that were dropped due to excessive latency for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-aqm-drop-bytes"),": The number of bytes scheduled for transmission that were dropped due to Active Queue Management for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class dequeue-aqm-drop-packets"),": The number of packets scheduled for transmission that were dropped due to Active Queue Management for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class buffer-capacity-exceeded-bytes"),": The number of bytes failed to be scheduled for transmission due to exceeded buffer capacity for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class buffer-capacity-exceeded-packets"),": The number of packets failed to be scheduled for transmission due to exceeded buffer capacity for this peer path."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-success-bandwidth"),": Traffic bandwidth successfully scheduled for transmission for this peer path. "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"per-traffic-class schedule-failure-bandwidth"),": Current scheduler enqueue failure rate in bytes per second for a given traffic class within the scheduler.")),(0,r.kt)("h3",{id:"additional-information"},"Additional Information"),(0,r.kt)("p",null,"Per adjacency traffic engineering works well in a one-to-many topology described above. However, it is less effective in the following topologies:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Topologies where multiple routers are communicating with a bandwidth-restricted branch router. Multiple routers sourcing traffic into the ISP destined for the branch router do not communicate how much traffic they are sending. As a result, oversubscription of the link is possible and the distribution of prioritized traffic from the sourcing routers will be dropped. "),(0,r.kt)("li",{parentName:"ul"},"A topology that includes multiple active paths from an individual datacenter router to the branch routers. "),(0,r.kt)("li",{parentName:"ul"},"A Full-mesh topology.")))}f.isMDXComponent=!0},97965:function(e,t,n){t.Z=n.p+"assets/images/per_adjacency_example-3a4ebfbc33dc3a70e90cf087b7f51b3e.png"}}]);