"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2615],{3939:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>l,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var i=n(74848),o=n(28453);const s={title:"Whitebox Onboarding",sidebar_label:"Whitebox Onboarding"},a=void 0,r={id:"wan_onboarding_whitebox",title:"Whitebox Onboarding",description:"Use the following information to access the management port and begin the onboarding process.",source:"@site/docs/wan_onboarding_whitebox.md",sourceDirName:".",slug:"/wan_onboarding_whitebox",permalink:"/docs/wan_onboarding_whitebox",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Whitebox Onboarding",sidebar_label:"Whitebox Onboarding"},sidebar:"docs",previous:{title:"Whitebox Device Default Port Layout",permalink:"/docs/hdwr_whitebox_port_layout"},next:{title:"Site Assignment",permalink:"/docs/wan_telemetry_site_assign"}},d={},c=[{value:"GUI Adoption",id:"gui-adoption",level:2},{value:"CLI Adoption",id:"cli-adoption",level:2},{value:"Manual Adoption",id:"manual-adoption",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Use the following information to access the management port and begin the onboarding process."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"/docs/hdwr_whitebox_port_layout",children:"Connect to the Device"})}),"\n",(0,i.jsxs)(t.li,{children:["Adopt the Router into the Mist Cloud","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#gui-adoption",children:"GUI"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#cli-adoption",children:"CLI"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#manual-adoption",children:"Enter the Registration Code Manually"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.admonition,{type:"info",children:(0,i.jsx)(t.p,{children:"IP connectivity is required for GUI onboarding. If you do not have an ethernet interface to connect to the device, you must use pcli adoption through the console."})}),"\n",(0,i.jsx)(t.h2,{id:"gui-adoption",children:"GUI Adoption"}),"\n",(0,i.jsx)(t.p,{children:"This section covers the basic steps to associate your router with a Mist Organization using the SSR and Mist GUI. The following animation presents the steps for associating the onboarded router with a Mist organization. The steps performed in the animation are provided below."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"GUI Adopt",src:n(85514).A+"",width:"1101",height:"667"})}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Upon reboot, you are presented with the SSR login screen where you can choose to Manage the router through the Mist cloud. Select this option."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Choose how to associate the router with the Mist Cloud; selecting an Organization, or use a registration code. In this example, we will choose the organization."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Log in to Mist."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Select the organization from the drop down list."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"If you assigned your router a name, enter it here and select ADOPT."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"If there are no errors, the router is associated with the organization and visible in the Mist UI."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"Click on the link to the Mist Cloud to see the router in the Mist inventory and begin managing your device."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"GUI Adoption Success",src:n(46499).A+"",width:"1022",height:"680"})}),"\n",(0,i.jsx)(t.h2,{id:"cli-adoption",children:"CLI Adoption"}),"\n",(0,i.jsxs)(t.p,{children:["If you prefer to work from the PCLI, you can use the ",(0,i.jsx)(t.a,{href:"/docs/cli_reference#adopt",children:(0,i.jsx)(t.code,{children:"adopt"})})," command to associate the router with Mist."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Adopt command",src:n(66134).A+"",width:"1016",height:"682"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Adopt output",src:n(47757).A+"",width:"1528",height:"634"})}),"\n",(0,i.jsx)(t.h2,{id:"manual-adoption",children:"Manual Adoption"}),"\n",(0,i.jsx)(t.p,{children:"It is possible to obtain a registration code directly from the Mist portal."}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsxs)(t.p,{children:["In the Mist portal, under Organization > Inventory, select ",(0,i.jsx)(t.strong,{children:"WAN Edges"})," at the top of the screen."]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:'Select "Adopt WAN Edge" on the top-right.'}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:'Select the radio button "Session Smart Router (SSR)" to create a registration code.'}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Adopt WAN Edge",src:n(28682).A+"",width:"630",height:"268"})}),"\n",(0,i.jsxs)(t.ol,{start:"4",children:["\n",(0,i.jsx)(t.li,{children:"Copy the registration code into your clipboard."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Registration Code",src:n(79467).A+"",width:"930",height:"386"})}),"\n",(0,i.jsxs)(t.ol,{start:"5",children:["\n",(0,i.jsx)(t.li,{children:"Enter the registration code via GUI:"}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.img,{alt:"GUI Adoption Step 1",src:n(66568).A+"",width:"780",height:"454"}),"\n",(0,i.jsx)(t.img,{alt:"GUI Adoption Step 2",src:n(28547).A+"",width:"824",height:"468"}),"\n",(0,i.jsx)(t.img,{alt:"GUI Adoption Step 3",src:n(38714).A+"",width:"840",height:"498"})]}),"\n",(0,i.jsx)(t.p,{children:"Or enter the registration code using the PCLI:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@128t-east.128t-east# adopt\n\u2714 Waiting for help...\nusage: adopt [{org-id <org-id> | registration-code <registration-code>}] [force]\n             [router-name <router-name>]\n\nAssign the current router to a Mist organization.\n\nIf you already know the ID of the organization or the registration code then you can\nuse the optional 'org-id' or 'registration-code' arguments. Otherwise an interactive\ndialog will walk you through entering your Mist credentials and choosing an\norganization to assign the router to.\n\nkeyword arguments:\nforce                Skip confirmation prompt\norg-id               The ID of the mist organization to assign the router to.\nregistration-code    The registration code used to assign this router to an\n                     organization.\nrouter-name          Assign a name to the router\n\nsee also:\nshow mist    Display information about the link between the SSR and the Mist Cloud\nadmin@128t-east.128t-east# adopt router-name 128t-east registration-code eyJ0eXAi...\n"})})]})}function l(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},79467:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/adopt-registration-code-cdbb9843134d1a7a275d6381bb981cbc.png"},28682:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/adopt-wan-edge-bad884b46960021e42e3939105e571a3.png"},66134:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/adopt_pcli_imagebased1-236daee5e8b0bbfd1fc6a69074ac969a.png"},47757:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/adopt_pcli_imagebased2-9d7a4faf005c81a3b85a59d88e5b9ae2.png"},85514:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/gui-adopt-28cda0ae42732ad11cea33bf374b97f4.gif"},66568:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/gui-reg-code-adoption-1-7a500a0aac8e0eef3d1774504659f662.png"},28547:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/gui-reg-code-adoption-2-7df1a9a6f150829248b376de5ad5589e.png"},38714:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/gui-reg-code-adoption-3-acb5f7f40a54da5ab31daf877f3f4a72.png"},46499:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/gui_adopt_success-487ea6b04cdf95ce59adfbbabb24b527.png"},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var i=n(96540);const o={},s=i.createContext(o);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);