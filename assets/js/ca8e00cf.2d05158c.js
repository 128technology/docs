"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5229],{60161:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var i=n(74848),a=n(28453);const s={title:"Getting Started with the SSR Networking Platform",sidebar_label:"Getting Started with the SSR Networking Platform"},r=void 0,o={id:"intro_getting_started",title:"Getting Started with the SSR Networking Platform",description:"Introduction",source:"@site/docs/intro_getting_started.md",sourceDirName:".",slug:"/intro_getting_started",permalink:"/docs/intro_getting_started",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Getting Started with the SSR Networking Platform",sidebar_label:"Getting Started with the SSR Networking Platform"},sidebar:"docs",previous:{title:"Contributing",permalink:"/docs/CONTRIBUTING"},next:{title:"System Requirements",permalink:"/docs/intro_system_reqs"}},d={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Conductor",id:"conductor",level:2},{value:"Session Smart Router (SSR)",id:"session-smart-router-ssr",level:2},{value:"Secure Vector Routing (SVR)",id:"secure-vector-routing-svr",level:3},{value:"Data Model",id:"data-model",level:3},{value:"Routing with Words",id:"routing-with-words",level:3},{value:"Session-Aware Data Plane",id:"session-aware-data-plane",level:2},{value:"High Availability and Resilience",id:"high-availability-and-resilience",level:2}];function c(e){const t={h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(t.p,{children:"The Session Smart Networking Platform is the first 100% software-defined, session-based distributed IP routing and network services platform designed from the ground-up with an application and service-centric context.  The platform consists of two primary components: the Session Smart Router (SSR) and the Conductor. Together, they form a single logical control plane that is highly distributed, and a data plane that is truly session-aware. The Session Smart Networking Platform supports a wide range of deployment models scaling from a small branch office to a high capacity edge router to a hyper-scale software-defined data center."}),"\n",(0,i.jsx)(t.h2,{id:"conductor",children:"Conductor"}),"\n",(0,i.jsx)(t.p,{children:"The Conductor is a centralized management and policy engine that provides orchestration, administration, provisioning, monitoring, and analytics for distributed SSRs \u2013 while maintaining a network-wide, multi-tenant service, and policy data model."}),"\n",(0,i.jsx)(t.h2,{id:"session-smart-router-ssr",children:"Session Smart Router (SSR)"}),"\n",(0,i.jsx)(t.p,{children:"The Session Smart Router combines a service-centric control plane and a session-aware data plane to offer all IP routing tables, feature-rich policy management, advanced data collection, and analytics in addition to high-speed packet forwarding, classification, and security functions."}),"\n",(0,i.jsx)(t.h3,{id:"secure-vector-routing-svr",children:"Secure Vector Routing (SVR)"}),"\n",(0,i.jsx)(t.p,{children:"The Session Smart Networking Platform uses Secure Vector Routing, an innovative approach to IP routing that eliminates the need for tunnel-based overlay networks. The Session Smart Networking Platform and Secure Vector Routing make existing networks dramatically simpler, smarter, more secure and seamless. SVR comprises two unique control plane and data plane components, the service-centric control plane and the session-aware data plane."}),"\n",(0,i.jsx)(t.h3,{id:"data-model",children:"Data Model"}),"\n",(0,i.jsx)(t.p,{children:"At the core of the SVR control plane is a service-based data model, which provides the language for describing the network\u2019s services, tenancy, and associated policies. The SVR data model is global and location independent, meaning every router in an SVR fabric shares the same service-based policies and topology, at all times \u2013 no matter where it is. The service-centric data model is expressed in YANG and exposed via northbound REST, GraphQL, and NETCONF APIs to deliver a full suite of application and orchestration integration services."}),"\n",(0,i.jsx)(t.h3,{id:"routing-with-words",children:"Routing with Words"}),"\n",(0,i.jsx)(t.p,{children:"To simplify routing, addressing, and access control, SVR uses the concept of \u201cRouting with Words.\u201d This is where services are described and communicated across the network in plain language, and aligned with the principles of Named Data Networking. In place of routes solely defined by IP addresses and CIDR blocks, SVR uses a URL-like Qualified Service Name (QSN) where service-based routes are described by name and carry a hierarchical multi-tenancy context."}),"\n",(0,i.jsx)(t.h2,{id:"session-aware-data-plane",children:"Session-Aware Data Plane"}),"\n",(0,i.jsx)(t.p,{children:"The session-aware data plane makes dynamic forwarding and policy decisions based on SVR\u2019s distributed service-centric control plane, the unique attributes and policies of sessions, and real-time network monitoring. SVR-based routers, deployed at network edges, transform a stateless L2 fabric or L3 network data plane into one that is fully session-aware. This is made possible through the combination of three features: session detection and control, waypoint setting, and session-based signaling (metadata). A session-aware data plane creates end-to-end route vectors that are:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Deterministic"})," \u2013 Session traffic is steered in segments between waypoints, with enforced flow symmetry, all without tunnel-based overlays."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Secure"})," \u2013 Each route vector controls the directionality of the session with its initiation. Every session is authenticated at each hop. Payload encryption is defined per service and applied per session."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Dynamic"})," \u2013 Paths are established dynamically based on application policies and network state. Statically provisioned stateful tunnels are replaced with a model based on session state, where sessions are created on-demand and terminated when they\u2019re no longer needed. Link and endpoint session load balancing is native."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Multi-tenant"})," \u2013 Hierarchical multi-tenancy and secure segmentation is supported end-to-end across network and NAT (network address translation) boundaries."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"high-availability-and-resilience",children:"High Availability and Resilience"}),"\n",(0,i.jsx)(t.p,{children:"The Session Smart Networking platform has been designed to provide High Availability to provide stateful failover in addition to load sharing. The SSR solution can utilize redundant or alternate paths between nodes in a network to reroute traffic, improve resiliency, and maximize throughput. These diverse paths can provide link and node protection."}),"\n",(0,i.jsx)(t.p,{children:"The solution operates in active/active clustering mode. Routers are grouped together as a pair of nodes, with each unit processing traffic and sharing the network load. Each router consists of two units acting as a stateful HA pair. Active/active clustering provides stateful failover in addition to load sharing. A fabric link between the routers is used to route traffic between them in case of failure. All information between the routers are shared using highly efficient in-memory databases to minimize bandwidth usage and to enable instantaneous information exchange. All processes in an SSR are self-resilient. They can regenerate themselves independently in case of process failures or exceptions."})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var i=n(96540);const a={},s=i.createContext(a);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);