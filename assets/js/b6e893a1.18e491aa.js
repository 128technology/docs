"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6279],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(n),f=o,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},59571:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return d}});var r=n(87462),o=n(63366),i=(n(67294),n(3905)),a=["components"],c={title:"Conductor Overview",sidebar_label:"Conductor Overview"},l=void 0,u={unversionedId:"install_conductor_overview",id:"install_conductor_overview",title:"Conductor Overview",description:"The Conductor is an SSR instance that is used to manage the SSR Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the SSR routers.",source:"@site/docs/install_conductor_overview.md",sourceDirName:".",slug:"/install_conductor_overview",permalink:"/docs/install_conductor_overview",draft:!1,tags:[],version:"current",lastUpdatedAt:1695413319,formattedLastUpdatedAt:"Sep 22, 2023",frontMatter:{title:"Conductor Overview",sidebar_label:"Conductor Overview"},sidebar:"docs",previous:{title:"Creating Bootable USB",permalink:"/docs/intro_creating_bootable_usb"},next:{title:"Conductor Deployment",permalink:"/docs/bcp_conductor_deployment"}},s={},d=[],p={toc:d};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The Conductor is an SSR instance that is used to manage the SSR Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the SSR routers. "),(0,i.kt)("p",null,"The Authority is where system-wide data is stored. Conceptually, the Authority represents the complete set of all SSR Routers managed under a single organizational entity. Service configuration, which represents the cornerstone of the SSR Router\u2019s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Each Authority is uniquely named, in the same way a domain name is unique."),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"/docs/bcp_conductor_deployment"},"Conductor Deployment")," section is a great starting point before installing and configuring your conductor. This document includes best practices for conductor deployment, creating a topology, example configurations, and conductor redundancy. It is recommended to review this section before installing and configuring the conductor."),(0,i.kt)("p",null,"The following Conductor installation processes are covered in this guide:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/single_conductor_install"},"Standalone Conductor")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ha_conductor_install"},"High Availability")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/single_conductor_config"},"Import Configurations to the Conductor")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/conductor_upgrade"},"Conductor Software Upgrades")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/single_conductor_install#conductor-conversion"},"Conversion of an SSR Router to a Conductor"))),(0,i.kt)("p",null,"Cloud deployments are not covered in this guide. Please see ",(0,i.kt)("a",{parentName:"p",href:"/docs/intro_initialize_HA_conductor"},"Conductor High Availability for Cloud Deployments")," for more information."))}f.isMDXComponent=!0}}]);