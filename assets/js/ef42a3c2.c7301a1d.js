"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9091],{96839:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=t(74848),o=t(28453);const s={title:"SSR1500 Device Onboarding",sidebar_label:"SSR1500 Device Onboarding"},r=void 0,a={id:"wan_assurance_ssr1500_quickstart",title:"SSR1500 Device Onboarding",description:"Congratulations on your new Session Smart Routing (SSR) WAN Edge device!",source:"@site/docs/wan_assurance_ssr1500_quickstart.md",sourceDirName:".",slug:"/wan_assurance_ssr1500_quickstart",permalink:"/docs/wan_assurance_ssr1500_quickstart",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"SSR1500 Device Onboarding",sidebar_label:"SSR1500 Device Onboarding"},sidebar:"docs",previous:{title:"SSR1400 Device Onboarding",permalink:"/docs/wan_assurance_ssr1400_quickstart"},next:{title:"WAN Edge Templates",permalink:"/docs/intro_wa_quickstart_3_templates"}},c={},l=[{value:"Connect Your Device to the Cloud",id:"connect-your-device-to-the-cloud",level:2},{value:"Claim Your Device",id:"claim-your-device",level:2},{value:"Mobile App QR Scan",id:"mobile-app-qr-scan",level:3},{value:"Mist Claim Code Entry",id:"mist-claim-code-entry",level:3},{value:"Onboarding Complete!",id:"onboarding-complete",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Congratulations on your new Session Smart Routing (SSR) WAN Edge device!"}),"\n",(0,i.jsxs)(n.p,{children:["Let's get it set up in the Mist cloud with WAN Assurance. This guide walks you through the simple steps to get a new cloud-ready Juniper Networks\xae SSR1500 router up and running in the Juniper Mist\u2122 cloud portal. You can onboard a single device using your mobile phone, or one or more devices using your computer. Once onboarded, we'll walk you through the steps to create a basic configuration.\nYou'll need your Juniper Mist WAN Assurance subscription and your login credentials for the Juniper Mist portal. If you have not already activated your subscriptions and set up your organization and sites, please follow the steps in ",(0,i.jsx)(n.a,{href:"https://www.juniper.net/documentation/us/en/quick-start/software/mist/quick-start/mist-quick-start/product-quick-start/topics/topic-map/step-1-begin.html",children:"Create a Mist Account and Organization"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"connect-your-device-to-the-cloud",children:"Connect Your Device to the Cloud"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Port Connections",src:t(32557).A+"",width:"1500",height:"1075"})}),"\n",(0,i.jsxs)(n.p,{children:["Your SSR device uses the MGMT port (",(0,i.jsx)(n.code,{children:"mgmt-0-0"}),") as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 2/1 (",(0,i.jsx)(n.code,{children:"ge-2-1"}),") with a LAN network."]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Connect the MGMT port"})," to an Ethernet link capable of providing the device with:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"DHCP address assignment"}),"\n",(0,i.jsx)(n.li,{children:"Connectivity to the Internet and Mist"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"For management, you can connect the SSR1500 to Mist using the MGMT port. You can also connect to Mist from one of the WAN ports only when the MGMT port is disconnected, or does not have a valid DHCP leased address and default route."})}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Connect port 2/1"})," to your LAN devices, including:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Mist-managed Juniper EX switches"}),"\n",(0,i.jsx)(n.li,{children:"Mist APs"}),"\n",(0,i.jsx)(n.li,{children:"User devices"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Power on the device"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Great job! Your SSR device is now connected to the Mist cloud and awaiting further instructions."}),"\n",(0,i.jsx)(n.h2,{id:"claim-your-device",children:"Claim Your Device"}),"\n",(0,i.jsx)(n.p,{children:"To add the SSR1500 to your organization's WAN Edge inventory, you must enter the SSR1500 claim information into Mist. The claim label (QR code sticker) on the front panel has the claim information."}),"\n",(0,i.jsx)(n.p,{children:"To enter the claim information, do one of the following:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Scan the QR code with the Mist mobile application."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"You can also manually enter the claim code in Mist. The claim code is the number above the QR code."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Claim Code",src:t(72246).A+"",width:"1500",height:"398"})}),"\n",(0,i.jsx)(n.h3,{id:"mobile-app-qr-scan",children:"Mobile App QR Scan"}),"\n",(0,i.jsxs)(n.p,{children:["You can download the Mist AI App from the ",(0,i.jsx)(n.a,{href:"https://apps.apple.com/us/app/mistai/id1215196902",children:"Mac App Store"})," or from the ",(0,i.jsx)(n.a,{href:"https://play.google.com/store/apps/details?id=com.mist.mistify&hl=en_US&gl=US",children:"Google Play Store"}),"."]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Open your MistAI app."}),"\n",(0,i.jsx)(n.li,{children:'Select "Claim Devices to Org".'}),"\n",(0,i.jsx)(n.li,{children:"Scan the QR code."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Mist AI App",src:t(68237).A+"",width:"258",height:"292"})}),"\n",(0,i.jsx)(n.h3,{id:"mist-claim-code-entry",children:"Mist Claim Code Entry"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Log into your Mist organization's dashboard."}),"\n",(0,i.jsx)(n.li,{children:"Navigate to your organization's inventory, and select the WAN tab at the top."}),"\n",(0,i.jsx)(n.li,{children:'Select the "Claim WAN Edges" button in the upper right of the inventory screen.'}),"\n",(0,i.jsx)(n.li,{children:"Add the device claim code into the list of devices to claim."}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Un-check"}),' the "Assign claimed WAN edges to site" box. This will place the device into inventory, and it will be assigned to a site later.']}),"\n",(0,i.jsx)(n.li,{children:'Click the "Claim" button to claim the device into your inventory.'}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Claim device",src:t(35732).A+"",width:"1115",height:"764"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"When a device is assigned to a site and set to be managed by Mist, upon first connection of the device to the cloud you will be prompted to upgrade to a version of software compatible with Mist. In some initial onboarding cases, this upgrade process may take up to 30 minutes or more."})}),"\n",(0,i.jsx)(n.h2,{id:"onboarding-complete",children:"Onboarding Complete!"}),"\n",(0,i.jsxs)(n.p,{children:["Fantastic, your device is in your inventory! To provision your SSR device with ZTP, log into Mist and ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.a,{href:"/docs/intro_wa_quickstart_3_templates",children:"configure a template"})})," for your SSR."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},32557:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/hdwr_ssr1400_qs_ports_g101991-016e6289d281b65fe46c3228db180e8f.png"},72246:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/hdwr_ssr1500_qs_claimcodes_s053306-32af23d80339ec42c73f8d42d533b01a.png"},35732:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/intro_wa_quickstart_claim-525d97aec4e28562382832c547bef85b.gif"},68237:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/intro_wa_quickstart_mobile_app-208ca9fda4bc40257cb1e5991ac533be.png"},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(96540);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);