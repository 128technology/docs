"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[3039],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=i.createContext({}),s=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,v=d["".concat(c,".").concat(m)]||d[m]||u[m]||r;return n?i.createElement(v,o(o({ref:t},p),{},{components:n})):i.createElement(v,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},61355:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return d}});var i=n(87462),a=n(63366),r=(n(67294),n(3905)),o=["components"],l={title:"SSR120 Device Onboarding",sidebar_label:"SSR120 Device Onboarding"},c=void 0,s={unversionedId:"wan_assurance_ssr120_quickstart",id:"wan_assurance_ssr120_quickstart",title:"SSR120 Device Onboarding",description:"Congratulations on your new Session Smart Routing (SSR) WAN Edge device!",source:"@site/docs/wan_assurance_ssr120_quickstart.md",sourceDirName:".",slug:"/wan_assurance_ssr120_quickstart",permalink:"/docs/wan_assurance_ssr120_quickstart",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"SSR120 Device Onboarding",sidebar_label:"SSR120 Device Onboarding"},sidebar:"docs",previous:{title:"Overview",permalink:"/docs/wan_overview"},next:{title:"SSR130 Device Onboarding",permalink:"/docs/wan_assurance_ssr130_quickstart"}},p=[{value:"Connect Your Device to the Cloud",id:"connect-your-device-to-the-cloud",children:[],level:2},{value:"Claim Your Device",id:"claim-your-device",children:[{value:"Mist Claim Code Entry",id:"mist-claim-code-entry",children:[],level:3},{value:"Mobile App QR Scan",id:"mobile-app-qr-scan",children:[],level:3}],level:2},{value:"Onboarding Complete!",id:"onboarding-complete",children:[],level:2}],u={toc:p};function d(e){var t=e.components,l=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Congratulations on your new Session Smart Routing (SSR) WAN Edge device!"),(0,r.kt)("p",null,"Let's get it set up in the Mist cloud with WAN Assurance."),(0,r.kt)("h2",{id:"connect-your-device-to-the-cloud"},"Connect Your Device to the Cloud"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Device Connections",src:n(83240).Z})),(0,r.kt)("p",null,"Your SSR device uses port 0 (",(0,r.kt)("inlineCode",{parentName:"p"},"ge-0/0/0"),") as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up port 3 (",(0,r.kt)("inlineCode",{parentName:"p"},"ge-0/0/3"),") with a LAN network."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Connect port 0")," to an Ethernet WAN link capable of providing the device with:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"DHCP address assignment"),(0,r.kt)("li",{parentName:"ul"},"Connectivity to the Internet and Mist"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Connect port 3")," to your LAN devices, including:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Mist-managed Juniper EX switches"),(0,r.kt)("li",{parentName:"ul"},"Mist APs"),(0,r.kt)("li",{parentName:"ul"},"User devices"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Power on the device"),"."))),(0,r.kt)("p",null,"Great job! Your SSR device is now connected to the Mist cloud and awaiting further instructions."),(0,r.kt)("h2",{id:"claim-your-device"},"Claim Your Device"),(0,r.kt)("p",null,"To add the device to your organization's WAN Edge inventory, locate the claim label found on the device."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Claim Code",src:n(54334).Z})),(0,r.kt)("p",null,"To enter the device claim information into Mist, you can:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Enter the claim code in Mist"),(0,r.kt)("li",{parentName:"ul"},"Scan the QR code with the Mist mobile app")),(0,r.kt)("h3",{id:"mist-claim-code-entry"},"Mist Claim Code Entry"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Log into your Mist organization's dashboard."),(0,r.kt)("li",{parentName:"ol"},"Navigate to your organization's inventory, and select the WAN tab at the top."),(0,r.kt)("li",{parentName:"ol"},'Select the "Claim WAN Edges" button in the upper right of the inventory screen.'),(0,r.kt)("li",{parentName:"ol"},"Add the device claim code into the list of devices to claim."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Un-check"),' the "Assign claimed WAN edges to site" box. This will place the device into inventory, and it will be assigned to a site later.'),(0,r.kt)("li",{parentName:"ol"},'Click the "Claim" button to claim the device into your inventory.')),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Claim device",src:n(74333).Z})),(0,r.kt)("h3",{id:"mobile-app-qr-scan"},"Mobile App QR Scan"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Open your MistAI app."),(0,r.kt)("li",{parentName:"ol"},'Select "Claim Devices to Org".'),(0,r.kt)("li",{parentName:"ol"},"Scan the QR code.")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Mist AI App",src:n(42243).Z})),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The MistAI app can be downloaded from mobile app stores:"),(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://apps.apple.com/us/app/mistai/id1215196902"},"For Apple Devices")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://play.google.com/store/apps/details?id=com.mist.mistify&hl=en_US&gl=US"},"For Android Devices"))))),(0,r.kt)("h2",{id:"onboarding-complete"},"Onboarding Complete!"),(0,r.kt)("p",null,"Fantastic, your device is in your inventory! To provision your SSR device with ZTP, log into Mist and ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"/docs/intro_wa_quickstart_1_networks"},"continue to WAN configuration."))))}d.isMDXComponent=!0},74333:function(e,t,n){t.Z=n.p+"assets/images/intro_wa_quickstart_claim-525d97aec4e28562382832c547bef85b.gif"},42243:function(e,t,n){t.Z=n.p+"assets/images/intro_wa_quickstart_mobile_app-208ca9fda4bc40257cb1e5991ac533be.png"},83240:function(e,t,n){t.Z=n.p+"assets/images/intro_wa_ssr120_quickstart_1-42b5694161ec94efa2dc181bbfe99356.png"},54334:function(e,t,n){t.Z=n.p+"assets/images/intro_wa_ssr120_quickstart_2-e91e2cbab13db73318529451f7c8b5e3.png"}}]);