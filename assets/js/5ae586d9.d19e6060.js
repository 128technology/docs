"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2076],{43145:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var r=n(74848),t=n(28453);const i={title:"WAN Assurance Plugin 3.5 Release Notes",sidebar_label:"3.5"},o=void 0,l={id:"release_notes_wan_assurance_plugin_3.5",title:"WAN Assurance Plugin 3.5 Release Notes",description:"Release 3.5.2",source:"@site/docs/release_notes_wan_assurance_plugin_3.5.md",sourceDirName:".",slug:"/release_notes_wan_assurance_plugin_3.5",permalink:"/docs/release_notes_wan_assurance_plugin_3.5",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"WAN Assurance Plugin 3.5 Release Notes",sidebar_label:"3.5"},sidebar:"docs",previous:{title:"3.6",permalink:"/docs/release_notes_wan_assurance_plugin_3.6"},next:{title:"3.4",permalink:"/docs/release_notes_wan_assurance_plugin_3.4"}},a={},d=[{value:"Release 3.5.2",id:"release-352",level:2},{value:"Resolved Issues",id:"resolved-issues",level:3},{value:"Release 3.5.1",id:"release-351",level:2},{value:"Resolved Issues",id:"resolved-issues-1",level:3},{value:"Release 3.5.0",id:"release-350",level:2},{value:"New Features",id:"new-features",level:3}];function c(e){const s={admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h2,{id:"release-352",children:"Release 3.5.2"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Release Date:"})," Sep 06, 2022"]}),"\n",(0,r.jsx)(s.h3,{id:"resolved-issues",children:"Resolved Issues"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"WAN-1238 Report missing FPM metrics:"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.em,{children:(0,r.jsx)(s.strong,{children:"Resolution:"})})," Update the mist-agent telemetry configuration to not filter FPM metrics so they can be reported to the cloud."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"release-351",children:"Release 3.5.1"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Release Date:"})," Aug 03, 2022"]}),"\n",(0,r.jsx)(s.h3,{id:"resolved-issues-1",children:"Resolved Issues"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"I95-47351 Conductor with a large number of assets would take a long time to apply WAN Assurance Plugin state:"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.em,{children:(0,r.jsx)(s.strong,{children:"Resolution:"})})," The WAN Assurance plugin uses plugin data files instead of pillar to synchronize data and apply plugin state to speed up the process."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"release-350",children:"Release 3.5.0"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Release Date:"})," Jul 20, 2022"]}),"\n",(0,r.jsx)(s.h3,{id:"new-features",children:"New Features"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.strong,{children:"I95-45678 Report the TCP round trip time metric"})}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"For TCP sessions the SSR collects metrics on TCP round-trip time which are reported via application summary to the MIST cloud."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.strong,{children:"WAN-903 Improve the reporting for the release workflow"})}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["When a device is released from the MIST portal, the ",(0,r.jsx)(s.code,{children:"show mist details"})," command provides additional context around the status, registration code being used, and other information to assist in re-onboarding the device."]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.strong,{children:"PLUGIN-1768 Add configuration commit warnings for expired registration code"})}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.code,{children:"authority > mist-wan-assurance > registration-code"})," is used for onboarding new routers and has an expiration of one year. A warning is now displayed when using an expired code. The ",(0,r.jsx)(s.code,{children:"show mist details"})," commands also displays the expiration date for the configured token."]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.strong,{children:"WAN-720 Support Greenfield and Whitebox devices for MIST onboarding"})}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"Support for onboarding and conductor redirection for Juniper branded devices as well as other Whiteboxes was introduced."}),"\n",(0,r.jsx)(s.admonition,{type:"important",children:(0,r.jsx)(s.p,{children:"After upgrade the device will stop reporting the TCP reset metrics for SSR version 5.6.0 and lower since those metrics were reporting higher than normal error counts."})})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>l});var r=n(96540);const t={},i=r.createContext(t);function o(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);