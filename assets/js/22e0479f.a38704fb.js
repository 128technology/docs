"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[3274],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),f=r,d=m["".concat(s,".").concat(f)]||m[f]||u[f]||o;return n?a.createElement(d,i(i({ref:t},p),{},{components:n})):a.createElement(d,i({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},35143:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var a=n(87462),r=n(63366),o=(n(67294),n(3905)),i=["components"],l={title:"SNMP - Configuration",sidebar_label:"SNMP - Configuration"},s=void 0,c={unversionedId:"howto_config_snmp",id:"howto_config_snmp",title:"SNMP - Configuration",description:"Overview",source:"@site/docs/howto_config_snmp.md",sourceDirName:".",slug:"/howto_config_snmp",permalink:"/docs/howto_config_snmp",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"SNMP - Configuration",sidebar_label:"SNMP - Configuration"},sidebar:"docs",previous:{title:"SNMP - Overview",permalink:"/docs/config_snmp"},next:{title:"SNMP: User defined metrics",permalink:"/docs/config_snmp_metrics"}},p=[{value:"Overview",id:"overview",children:[],level:2},{value:"Configuration",id:"configuration",children:[{value:"Configure the KNI Interface",id:"configure-the-kni-interface",children:[],level:3},{value:"Configure Router System Settings",id:"configure-router-system-settings",children:[],level:3},{value:"Configure Global Services",id:"configure-global-services",children:[{value:"Configure the SNMP-trap",id:"configure-the-snmp-trap",children:[],level:4}],level:3},{value:"Configure the SNMP Service Routes",id:"configure-the-snmp-service-routes",children:[{value:"SNMP Service Route",id:"snmp-service-route",children:[],level:4},{value:"SNMP-trap Service Route",id:"snmp-trap-service-route",children:[],level:4}],level:3}],level:2}],u={toc:p};function m(e){var t=e.components,l=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"The following are the high level steps for configuring SNMP. Each procedure is detailed below. "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Configure KNI Interface at both hub and spoke SSRs")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Enable SNMP Server in Router System Settings at both hub and spoke SSRs")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Configure Global Services: snmp (polling) and snmp-trap"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"A unique Service for snmp polling for every hub and spoke SSR"),(0,o.kt)("li",{parentName:"ul"},"One common Service snmp-trap "))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Configure Service Routes at both hub and spoke SSRs"))),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"The procedures below use the GUI to create the configuration, and assume the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The SNMP Manager is located behind the hub SSR"),(0,o.kt)("li",{parentName:"ul"},"Both spoke and hub SSRs are not located behind any firewall or NAT devices")),(0,o.kt)("h3",{id:"configure-the-kni-interface"},"Configure the KNI Interface"),(0,o.kt)("p",null,"For additional information about the configuration of KNI interfaces, see ",(0,o.kt)("a",{parentName:"p",href:"/docs/concepts_kni"},"Kernel Network Interfaces.")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"From the Authority, navigate to the Router > Node > Device Interface.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Under the Device Interface, click ADD."))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Add Device Interface",src:n(82270).Z})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"In the New Device Interface pane, enter a name for the device interface.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Device Interface",src:n(19637).Z})),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Set the Device interface type as Host. ")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Device Interface Type",src:n(49403).Z})),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Scroll down to Network Interfaces. Click on ADD to add a new network interface for the SNMP device interface.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Add Network Interface",src:n(80175).Z})),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"Enter ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp")," as the name of the network interface and click SAVE.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Network Interface",src:n(68268).Z})),(0,o.kt)("ol",{start:7},(0,o.kt)("li",{parentName:"ol"},"Under Management Traffic Settings, define a dedicated management vector. This vector should be associated with the management interface. ")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Enter the name "),(0,o.kt)("li",{parentName:"ul"},"Set the priority to 100"),(0,o.kt)("li",{parentName:"ul"},"Enable a default route ")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Management Traffic Settings",src:n(91851).Z})),(0,o.kt)("ol",{start:8},(0,o.kt)("li",{parentName:"ol"},"Scroll down to Interface Addresses, click ADD and enter the IP address of the network interface and click SAVE.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Network Interface IP Address",src:n(68817).Z})),(0,o.kt)("ol",{start:9},(0,o.kt)("li",{parentName:"ol"},"Configure the KNI IP subnet. Every SSR running SNMP must be configured with a unique, routable IP subnet. Choosing /30 maximizes the number of subnets in a chosen IP block. ")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"IP Subnet",src:n(23199).Z})),(0,o.kt)("p",null,"It is important that this address is specified as the address to be polled by the SNMP Manager. The Gateway IP address is also used by the SSR to automatically create an interface at the Linux level later in this procedure.  "),(0,o.kt)("ol",{start:10},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Under Host Services, click ADD.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Under Service Type, select snmp-server."))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Host Service",src:n(50988).Z})),(0,o.kt)("ol",{start:12},(0,o.kt)("li",{parentName:"ol"},"Under Access Policies, click add, and enter the IP address for the SNMP manager.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Access Policy IP",src:n(49802).Z})),(0,o.kt)("h3",{id:"configure-router-system-settings"},"Configure Router System Settings"),(0,o.kt)("p",null,"Return to the Router level, and scroll down to the Router Settings."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Click the System Settings button."),(0,o.kt)("li",{parentName:"ol"},"Scroll down to the SNMP Server Settings and Enable the SNMP Server.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SNMP Server Settings",src:n(26113).Z})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Under SNMP Notification Receivers, click ADD, enter the IP address of the SNMP Manager, and set the Notification Type to ",(0,o.kt)("strong",{parentName:"li"},"trap"),".")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Notification Receiver",src:n(67633).Z})),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Return to the router system settings, scroll down to the SNMP Access Control Policies and click ADD."),(0,o.kt)("li",{parentName:"ol"},"Enter the ",(0,o.kt)("inlineCode",{parentName:"li"},"management")," as the new Access Control Policy name and click SAVE. ")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Access Control Policy",src:n(71531).Z})),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"In the SNMP Access Control Policies pane, enter the Permitted Client Host IP address. ")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SNMP Access Control Policy",src:n(79522).Z})),(0,o.kt)("ol",{start:7},(0,o.kt)("li",{parentName:"ol"},"Click Validate, then Commit.")),(0,o.kt)("p",null,"A new interface is created at the Linux level bearing the same name and gateway IP of the snmp interface created earlier. The gateway IP is the address that the SNMP Manager will be polling."),(0,o.kt)("h3",{id:"configure-global-services"},"Configure Global Services"),(0,o.kt)("p",null,"At the Authority Level, scroll down to Services, and click ADD."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Enter a name for the new service; in this case, the service name is ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp-<SSR-name>"),". Create a service for each SSR. This service is used for polling of individual SSRs.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Polling Service",src:n(18033).Z})),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Share Service Routes",src:n(67496).Z})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Scroll down to Policies, and set the Security Policy to ",(0,o.kt)("strong",{parentName:"li"},"internal"),". ",(0,o.kt)("em",{parentName:"li"},"(Is there no need to configure a Service Policy?)"))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Security Policy",src:n(63060).Z})),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Scroll back up to Service Addresses and enter the KNI Subnet for the SSR configured in step 9 of the KNI Interface process.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"KNI Subnet",src:n(24242).Z})),(0,o.kt)("h4",{id:"configure-the-snmp-trap"},"Configure the SNMP-trap"),(0,o.kt)("p",null,"Return to the Authority level, scroll down to Services, and click ADD."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Name the service ",(0,o.kt)("strong",{parentName:"li"},"snmp-trap"),". This service is used for traps from all SSRs.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Trap Service",src:n(14302).Z})),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Share Service Routes",src:n(14302).Z})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Scroll down to Policies, and set the Security Policy to ",(0,o.kt)("strong",{parentName:"li"},"internal"),".")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Security Policy",src:n(63060).Z})),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Scroll back up to Service Addresses, click ADD, and enter the IP address of the SNMP manager.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SNMP Manager IP Address",src:n(19693).Z})),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Click Validate, then Commit. ")),(0,o.kt)("h3",{id:"configure-the-snmp-service-routes"},"Configure the SNMP Service Routes"),(0,o.kt)("p",null,"The SNMP Service routes are used for polling each SSR by the SNMP manager."),(0,o.kt)("h4",{id:"snmp-service-route"},"SNMP Service Route"),(0,o.kt)("p",null,"This procedure creates the service route used for SNMP polling, and must be repeated at each SSR to be polled by the SNMP Manager. "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"From the Authority level, select the router."),(0,o.kt)("li",{parentName:"ol"},"Scroll down to Service Routes and click ADD."),(0,o.kt)("li",{parentName:"ol"},"Enter the New Service Route name; ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp")," and click SAVE. "),(0,o.kt)("li",{parentName:"ol"},"In the Service route Information pane, choose the ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp-<service-name>")," service name created earlier.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Service Name",src:n(7466).Z})),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Under Service Route Type, select Use Learned Routes from the drop down.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Use Learned Routes",src:n(71216).Z})),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"Click Validate, then Commit.")),(0,o.kt)("p",null,"Return to the Router level, and select the Hub SSR. You can see the service route is automatically generated at the SNMP Manager."),(0,o.kt)("h4",{id:"snmp-trap-service-route"},"SNMP-trap Service Route"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"From the Router level, and select Service Routes."),(0,o.kt)("li",{parentName:"ol"},"Click ADD."),(0,o.kt)("li",{parentName:"ol"},"Enter a new Service Route name, ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp-trap")," and click SAVE.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SNMP Trap",src:n(40222).Z})),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"In the Service route Information pane, choose the ",(0,o.kt)("inlineCode",{parentName:"li"},"snmp-trap")," service route created earlier.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SNMP Trap Route",src:n(24255).Z})),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Under Service Route Type, select Use Learned Routes from the drop down.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Use Learned Routes",src:n(71216).Z})),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"Click Validate, then Commit.")),(0,o.kt)("p",null,"Return to the Router level, and select the Spoke SSR. You can see the service route is automatically generated where the snmp traps are generated."))}m.isMDXComponent=!0},82270:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp1-25bb9ead3d8c1621c3b5a35740f1d86e.png"},50988:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp10-cca605cff63cd88d7b1eb432275e692a.png"},49802:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp11-17ac2e2d2d478123c7dcab378666c9d3.png"},26113:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp12-c1b1935e036fc8cd9de50e204bc42ace.png"},67633:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp14-af3f5f69e694b85319deb551e24c1e9b.png"},79522:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp15-1-80d3df256cc4fc1ba9240bef32a473af.png"},71531:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp15-d31486301e749c0193a0f095a16329c3.png"},67496:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-1-7a7e8a3fdeb23c9e7f60005c3807c0d5.png"},63060:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-2-07f74b986609481e88bcb17bc65adad1.png"},24242:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-3-17a3d8213e006c8379d63847f57477c4.png"},14302:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-4-7fbabc52bf7d2f9d03a84843f7453a6d.png"},19693:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-6-09ac2481d9081b07f4f93cafe7285e9e.png"},18033:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp16-88afb1377a5b56f0727154a9f08848a6.png"},7466:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp17-607d624b1904cccb305bc226d28d6f98.png"},71216:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp18-42d83907b737a4f74ff3f52641a600f9.png"},24255:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp19-1-239c210c6f3a3f4b7a69033f0ed1525a.png"},40222:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp19-eafc6cf0d50b19cba49c9d0993036f49.png"},19637:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp2-101eeed78eccd45baeb9d16406c7a69f.png"},49403:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp3-22738d797cea68f90da8e0fdc2072611.png"},80175:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp4-38b164c4f7fc9bb95412570cae1a0ffe.png"},68268:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp5-f404a43579783b72789f4fa739aaeead.png"},91851:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp6-585516606e1ac1d96ab1d209e9c58f46.png"},68817:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp8-3937e10174c36a100a256455ef97d74d.png"},23199:function(e,t,n){t.Z=n.p+"assets/images/howto_config_snmp9-0884b295a8c8a3197f8192e7ad70a98b.png"}}]);