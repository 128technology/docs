"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[398],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||s;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<s;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},98214:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var r=n(87462),a=n(63366),s=(n(67294),n(3905)),o=["components"],l={title:"WAN Assurance Plugin 3.4 Release Notes",sidebar_label:"3.4"},i=void 0,c={unversionedId:"release_notes_wan_assurance_plugin_3.4",id:"release_notes_wan_assurance_plugin_3.4",title:"WAN Assurance Plugin 3.4 Release Notes",description:"Release 3.4.1",source:"@site/docs/release_notes_wan_assurance_plugin_3.4.md",sourceDirName:".",slug:"/release_notes_wan_assurance_plugin_3.4",permalink:"/docs/release_notes_wan_assurance_plugin_3.4",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"WAN Assurance Plugin 3.4 Release Notes",sidebar_label:"3.4"},sidebar:"docs",previous:{title:"3.5",permalink:"/docs/release_notes_wan_assurance_plugin_3.5"},next:{title:"3.3",permalink:"/docs/release_notes_wan_assurance_plugin_3.3"}},u={},p=[{value:"Release 3.4.1",id:"release-341",level:2},{value:"Resolved Issues",id:"resolved-issues",level:3},{value:"Release 3.4.0",id:"release-340",level:2},{value:"New Features",id:"new-features",level:3},{value:"Resolved Issues",id:"resolved-issues-1",level:3}],d={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,s.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"release-341"},"Release 3.4.1"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Release Date:")," May 16, 2022"),(0,s.kt)("h3",{id:"resolved-issues"},"Resolved Issues"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"I95-46089 WAN assurance process consumes excessive memory resulting in alarms:")," The mist-agent will limit the amount of data it buffers in internal cache when processing data with errors.")),(0,s.kt)("h2",{id:"release-340"},"Release 3.4.0"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Release Date:")," May 13, 2022"),(0,s.kt)("h3",{id:"new-features"},"New Features"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"WAN-667 Improve the connection diagnostics for MIST cloud"))),(0,s.kt)("p",null,"When the router is unable to connect to the MIST cloud the ",(0,s.kt)("inlineCode",{parentName:"p"},"show plugin state summary")," command will provide additional details to help diagnose the connection failure."),(0,s.kt)("h3",{id:"resolved-issues-1"},"Resolved Issues"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"WAN-955 Custom app names don't match the service names on Application Insights:")," The auto detected custom app names will not be sanitized and the actual names will be included in the data sent to the MIST cloud.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"I95-45196 Restart command does not reboot the device")," The restart command will now reboot the device instead of starting the SSR systemd service.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"MIST-61604 Device release command was not processed correctly:")," The logic to detect whether a device has been released from the MIST cloud handles the cloud disconnect cases more gracefully.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"WAN-962 Higher than normal TCP reset counts being observed for Application SLE:")," The device side logic to detect TCP reset was too aggressive which resulted in the reported data being unusable. With this fix, the device will only report the TCP reset metrics for SSR version 5.6.0 or higher."))),(0,s.kt)("admonition",{type:"important"},(0,s.kt)("p",{parentName:"admonition"},"After upgrade the device will stop reporting the TCP reset metrics for SSR version 5.6.0 and lower since those metrics were reporting higher than normal error counts.")))}m.isMDXComponent=!0}}]);