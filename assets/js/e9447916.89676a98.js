"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6212],{63966:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var i=s(74848),t=s(28453);const r={title:"128T 4.0 Release Notes",sidebar_label:"4.0"},l=void 0,o={id:"release_notes_128t_4.0",title:"128T 4.0 Release Notes",description:"Release 4.0.1",source:"@site/docs/release_notes_128t_4.0.md",sourceDirName:".",slug:"/release_notes_128t_4.0",permalink:"/docs/release_notes_128t_4.0",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"128T 4.0 Release Notes",sidebar_label:"4.0"},sidebar:"docs",previous:{title:"4.1",permalink:"/docs/release_notes_128t_4.1"},next:{title:"3.2",permalink:"/docs/release_notes_128t_installer_3.2"}},c={},a=[{value:"Release 4.0.1",id:"release-401",level:2},{value:"Issues Fixed",id:"issues-fixed",level:3}];function d(e){const n={h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"release-401",children:"Release 4.0.1"}),"\n",(0,i.jsx)(n.h3,{id:"issues-fixed",children:"Issues Fixed"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-24556"})," Analytics log file now follows the same rotation scheme as the other log files on the system."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-24873"})," HTTP CONNECT method dropped when adaptive-encryption is enabled."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25203"})," ZScaler plugin could cause a system fault when configured for HA."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25205"})," PPPoE configured interfaces may cause the system to take longer than 5 minutes to start."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25235"})," Race condition between monitoring scripts managing T1 interfaces could cause the link to be in the down state."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25241"})," When logs are at DEBUG level, extensive interface flapping can cause a system fault."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25242"})," Race condition with applying kernel routes could produce a FIB with the incorrect route"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25283"})," Receiving a packet without metadata for an established session can cause a system fault, which can happen during upgrades or path flaps."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25292"}),' For 128T network-interfaces with link  mtu smaller than configured  value, Path MTU discovery results in "Path MTU: unavailable"']}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25327"})," shared-phys-address incorrectly checks against entire authority instead of the router."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25333"})," Race condition in security key distribution can cause encryption failures."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25346"})," Top sessions table does not update time correctly when graph is clicked."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25352"})," Peering connection statistics displaying no data on topology page."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25353"})," HA nodes of a Router that do not have their time synchronized will be unable to synchronize time series data."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25356"})," Device and network Interface graphs are rendering as having no data when data is traversing links."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25425"})," DHCP relay service defined as /32 causes traffic to be black-holed."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25454"})," Forwarding interfaces are not able to come up when deployed in AWS."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25527"})," Kernel route with next hops cannot resolve BGP route when there is also a kernel blackhole route."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25535"})," Malformed packets can lead to a system fault due to misclassification."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25575"})," 128T peers are unable to establish a connection when deployed in AWS."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25579"})," DHCP HA interface unable to renew lease on newly active link when link down occurs."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25739"})," Reverse path traffic could be dropped for BGP over SVR traffic when going over an internode link."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25748"})," Asymmetric routing may occur if static/kernel routes are configured as the appropriate cost is not being applied to those routes."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"I95-25813"})," When utilizing the Conductor as a proxy for upgrades, a Router upgrade to 4.0.0 could fail if no connection to the Internet is available."]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var i=s(96540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);