"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2132],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return h}});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),h=r,f=p["".concat(c,".").concat(h)]||p[h]||u[h]||a;return n?o.createElement(f,i(i({ref:t},d),{},{components:n})):o.createElement(f,i({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},86405:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return d},default:function(){return p}});var o=n(87462),r=n(63366),a=(n(67294),n(3905)),i=["components"],s={title:"Session Smart Networking Platform",sidebar_label:"Session Smart Networking Platform"},c=void 0,l={unversionedId:"about_128t",id:"about_128t",title:"Session Smart Networking Platform",description:"What is the Session Smart Networking Platform?",source:"@site/docs/about_128t.md",sourceDirName:".",slug:"/about_128t",permalink:"/docs/about_128t",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Session Smart Networking Platform",sidebar_label:"Session Smart Networking Platform"},sidebar:"docs",next:{title:"Secure Vector Routing Savings",permalink:"/docs/about_svr_savings"}},d=[{value:"What is the Session Smart Networking Platform?",id:"what-is-the-session-smart-networking-platform",children:[],level:2},{value:"How does it work?",id:"how-does-it-work",children:[],level:2}],u={toc:d};function p(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"what-is-the-session-smart-networking-platform"},"What is the Session Smart Networking Platform?"),(0,a.kt)("p",null,"Networks exist to connect users to services and applications, and network design should start with those services at the core. Secure Vector Routing (SVR) is a new routing architecture that enables the network to differentiate the way it delivers applications and services with simplicity, security, and scalability in mind. It replaces tunnel-based network overlays and inefficient provisioning systems with distributed control, simple intelligent service-based routing, and in-band (data plane) session-based signaling. SVR is fully compatible and interoperable with existing network protocols and architectures, allowing it to be gradually introduced into an existing IP network without affecting the network endpoints or hosts."),(0,a.kt)("h2",{id:"how-does-it-work"},"How does it work?"),(0,a.kt)("p",null,"At the core of the SVR control plane is a service-based data model, which provides the language for describing the network\u2019s services, tenancy, and associated policies. The SVR data model is global and location independent, meaning every router in an SVR fabric shares the same service-based policies and topology, at all times \u2013 no matter where it is. The service-centric data model is expressed in YANG and exposed via northbound REST/GraphQL and NETCONF APIs to deliver a full suite of application and orchestration integration services."),(0,a.kt)("p",null,"To simplify routing, addressing, and access control, SVR uses the concept of \u201cRouting with Words.\u201d This is where services are described and communicated across the network in plain language, and aligned with the principles of Named Data Networking. In place of routes solely defined by IP addresses and CIDR blocks, SVR uses names that carry a hierarchical multi-tenancy context."),(0,a.kt)("p",null,"SVR ensures that bi-directional sessions follow the same path. Traditional routers use a stateless per packet \u201chot potato\u201d forwarding approach with no notion of session. With SVR, all packets associated with a session are routed along the same path, no matter which way they\u2019re traveling. This symmetric flow enables packets to be intelligently routed, sessions to be controlled, and traffic to be proactively analyzed. It also prevents unauthorized flows from using a given path."),(0,a.kt)("p",null,"Session directionality forms the foundation of SVR\u2019s secure routing and segmentation model. It enables a SVR fabric to behave as a zone-based firewall. As every SVR route defines the direction of session at initiation, each route becomes a secure vector that tightly controls access to the destination or service. In short, secure vector routing unifies access control and security policies during routing."),(0,a.kt)("p",null,"SVR architecture defines a location independent and segmented approach to routing and addressing based on waypoints. Waypoint addresses (or simply \u201cwaypoints\u201d) are IP addresses configured on secure vector routers that are used to govern sessions across network paths."),(0,a.kt)("p",null,"Waypoints are separate and distinct from the IP addresses and named services that identify end-to-end network sessions between devices and services. Secure vector routes define the path (e.g., set of routers) each session must follow within an SVR topology. Every SVR-based router can be reached by one or more waypoints, and Bi-directional Forwarding Detection (BFD) and inline flow monitorint are used to test connection and path attributes between the waypoints."),(0,a.kt)("p",null,"The waypoint-based routing with SVR is inherently segment based, meaning that end-to-end route vectors can be created based on multiple router (or waypoint) hops. Since each SVR router maintains an overall view of the topology and service-based policies, dynamic multi-segment paths can be established. Ephemeral session state in each router along the path guarantees symmetric communications."),(0,a.kt)("p",null,"To establish a symmetric flow, the ingress secure vector router adds metadata to the first packet of each session. This metadata is used to signal information about a session including original IP addresses, tenant, and policy information. The metadata is only included when the SVR router is aware that there is another secure vector router downstream and, from there, all packets for that session follow the same path. Reverse metadata is included in the first packet on the return path for the same session. The metadata is only included in the initial packets sent between the two SVR routers. The exchange of metadata is always digitally signed to prevent tampering and can be optionally encrypted."),(0,a.kt)("p",null,"The forward metadata includes information about the original source IP address and port, original  destination address and port, the tenant associated with the origin of the request, desired class of service, and other policy and control information. The reverse metadata includes utilization metrics and possible service class modification information so as to influence future routing decisions."))}p.isMDXComponent=!0}}]);