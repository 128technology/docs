"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[4065],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return h}});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var u=o.createContext({}),s=function(e){var t=o.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=s(e.components);return o.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=s(r),h=n,f=p["".concat(u,".").concat(h)]||p[h]||d[h]||i;return r?o.createElement(f,a(a({ref:t},l),{},{components:r})):o.createElement(f,a({ref:t},l))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=p;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var s=2;s<i;s++)a[s]=r[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}p.displayName="MDXCreateElement"},61515:function(e,t,r){r.r(t),r.d(t,{assets:function(){return l},contentTitle:function(){return u},default:function(){return h},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return d}});var o=r(87462),n=r(63366),i=(r(67294),r(3905)),a=["components"],c={title:"Conductor Migration"},u=void 0,s={unversionedId:"howto_conductor_migration",id:"howto_conductor_migration",title:"Conductor Migration",description:"Before going through this document, it is beneficial to first understand the best practices for deploying your conductor.",source:"@site/docs/howto_conductor_migration.md",sourceDirName:".",slug:"/howto_conductor_migration",permalink:"/docs/howto_conductor_migration",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"Conductor Migration"},sidebar:"docs",previous:{title:"Upgrade the SSR Conductor",permalink:"/docs/conductor_upgrade"},next:{title:"Router Interactive Installation",permalink:"/docs/intro_installation_bootable_media"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Migration Process",id:"migration-process",level:2},{value:"Verify Migration",id:"verify-migration",level:2}],p={toc:d};function h(e){var t=e.components,r=(0,n.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Before going through this document, it is beneficial to first understand the ",(0,i.kt)("a",{parentName:"p",href:"/docs/bcp_conductor_deployment"},"best practices for deploying your conductor"),"."),(0,i.kt)("p",null,"The purpose of this guide is to provide an overview and walkthrough the process of migrating the routers and their conductor configurations to a newly installed SSR Conductor"),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"This document presumes that the reader has already installed a new conductor and wants to migrate the routers in the network along with their configurations. If you have not yet setup your SSR nodes, you can follow the ",(0,i.kt)("a",{parentName:"p",href:"/docs/intro_installation"},"installation guide")," to walk you through that process."),(0,i.kt)("h2",{id:"migration-process"},"Migration Process"),(0,i.kt)("p",null,"Before proceeding with the migration of the router, ensure that you have exported the configurations from the existing Conductor and import them to the new Conductor."),(0,i.kt)("p",null,"While importing the configurations to the Conductor, we will need to ",(0,i.kt)("em",{parentName:"p"},"\u201ccommit\u201d")," the changes from the PCLI as long as the candidate configuration is valid. A restart will be required and then we can proceed with the migration."),(0,i.kt)("admonition",{type:"important"},(0,i.kt)("p",{parentName:"admonition"},"It is extremely important that the conductor configurations are exported/imported correctly to avoid losing the configuration.")),(0,i.kt)("p",null,"Once the new conductor is set up, we can go on with migrating the routers one at a time. The below commands have to be run on the PCLI on every router and should be repeated for all the routers individually."),(0,i.kt)("p",null,"For standalone conductor, on the router use the command: ",(0,i.kt)("inlineCode",{parentName:"p"},"migrate conductor <address1>")),(0,i.kt)("p",null,"For HA conductor, on the routers use the command: ",(0,i.kt)("inlineCode",{parentName:"p"},"migrate conductor <address1> <address2>")," "),(0,i.kt)("h2",{id:"verify-migration"},"Verify Migration"),(0,i.kt)("p",null,"If any router does not get migrated successfully, it will show an error or else the migration will proceed smoothly."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Make sure that the TCP ports 930, 4505 and 4506 on the Conductor are enabled, as the routers will require to access these ports in order for them and the new Conductor to communicate."),(0,i.kt)("li",{parentName:"ul"},"These TCP ports have to be added open on any firewalls in front of the conductor. (In reference to the public connections a Conductor runs, and the firewall required to allow those connections)"),(0,i.kt)("li",{parentName:"ul"},"After the migration runs successfully, all the assets will show \u201crunning\u201d from the new Conductor.")))}h.isMDXComponent=!0}}]);