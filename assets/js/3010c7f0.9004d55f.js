"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6749],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),g=a,f=d["".concat(c,".").concat(g)]||d[g]||p[g]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},76444:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return c},default:function(){return g},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var r=n(87462),a=n(63366),i=(n(67294),n(3905)),o=["components"],s={title:"Add Device to Site",sidebar_label:"Add Device to Site"},c=void 0,l={unversionedId:"intro_wa_quickstart_4_siteassign",id:"intro_wa_quickstart_4_siteassign",title:"Add Device to Site",description:"At this point you have the following:",source:"@site/docs/intro_wa_quickstart_4_siteassign.md",sourceDirName:".",slug:"/intro_wa_quickstart_4_siteassign",permalink:"/docs/intro_wa_quickstart_4_siteassign",draft:!1,tags:[],version:"current",lastUpdatedAt:1695413319,formattedLastUpdatedAt:"Sep 22, 2023",frontMatter:{title:"Add Device to Site",sidebar_label:"Add Device to Site"},sidebar:"docs",previous:{title:"WAN Edge Templates",permalink:"/docs/intro_wa_quickstart_3_templates"},next:{title:"Whitebox Staging",permalink:"/docs/wan_staging"}},u={},p=[{value:"Congratulations!",id:"congratulations",level:2}],d={toc:p};function g(e){var t=e.components,s=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"At this point you have the following:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Your SSR device in your inventory."),(0,i.kt)("li",{parentName:"ul"},"A WAN edge template for configuration in Mist."),(0,i.kt)("li",{parentName:"ul"},"Your WAN edge template associated with your site in Mist.")),(0,i.kt)("p",null,"Associating the device with the site and template gets you a working config!"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Add network",src:n(76931).Z,width:"1115",height:"764"})),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Go to your organization's WAN Edges Inventory.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Select your device.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Assign the device to your site.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"If you are configuring a ",(0,i.kt)("strong",{parentName:"p"},"Mist-managed")," router (SSR Software version 6.x and greater), check the ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Manage configuration with Mist"))," checkbox. "),(0,i.kt)("p",{parentName:"li"},"For version 5.4.x and greater conductor-managed routers, make sure there is ",(0,i.kt)("strong",{parentName:"p"},"no")," checkmark in the ",(0,i.kt)("strong",{parentName:"p"},"Manage Configuration from Mist")," under ",(0,i.kt)("strong",{parentName:"p"},"Manage Configuration"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Select ",(0,i.kt)("strong",{parentName:"p"},"Assign to Site"),"."))),(0,i.kt)("h2",{id:"congratulations"},"Congratulations!"),(0,i.kt)("p",null,"Mist is now sending the template-driven configuration down to your device. After a few minutes to process and apply the configuration, it will begin forwarding sessions from LAN to WAN as described by your policy."),(0,i.kt)("p",null,"Head over to the WAN Edges menu on the sidebar, select your device, and watch events as the device completes ZTP."),(0,i.kt)("p",null,"As your client devices connected to the LAN are assigned addresses from the WAN Edge DHCP server and begin sending sessions, telemetry will populate the insights page, and Marvis will start analyzing it on your behalf."),(0,i.kt)("p",null,"For conductor-managed devices, additional views for Cloud Telemetry are configurable in the SSR GUI and PCLI. See ",(0,i.kt)("a",{parentName:"p",href:"/docs/wan_telemetry_features"},"Features")," for more information"),(0,i.kt)("p",null,"Continue reading in the Mist and SSR Documentation for more advanced design use cases, deployment and onboarding scenarios, and AI operations with Mist WAN Assurance!"))}g.isMDXComponent=!0},76931:function(e,t,n){t.Z=n.p+"assets/images/intro_wa_quickstart_site_assign-8204f702a4ef41218bcad5b9baec0710.gif"}}]);