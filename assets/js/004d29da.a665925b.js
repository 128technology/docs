"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6649],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=i.createContext({}),l=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return i.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),u=o,m=d["".concat(c,".").concat(u)]||d[u]||f[u]||r;return n?i.createElement(m,a(a({ref:t},p),{},{components:n})):i.createElement(m,a({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<r;l++)a[l]=n[l];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},32605:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return f}});var i=n(87462),o=n(63366),r=(n(67294),n(3905)),a=["components"],s={title:"TCP Session Optimization",sidebar_label:"TCP Session Optimization"},c=void 0,l={unversionedId:"config_session_optimization",id:"config_session_optimization",title:"TCP Session Optimization",description:"TCP session optimization is specifically for customers using low-bandwidth, high-latency links, that experience random drops not due to traffic congestion. In this environment, session optimization will override congestion control and the send window to provide better performance for the TCP stream over low-bandwidth, high-latency, lossy links.",source:"@site/docs/config_session_optimization.md",sourceDirName:".",slug:"/config_session_optimization",permalink:"/docs/config_session_optimization",draft:!1,tags:[],version:"current",lastUpdatedAt:1707314492,formattedLastUpdatedAt:"Feb 7, 2024",frontMatter:{title:"TCP Session Optimization",sidebar_label:"TCP Session Optimization"},sidebar:"docs",previous:{title:"Tuning BFD",permalink:"/docs/howto_tune_bfd"},next:{title:"BGP",permalink:"/docs/config_bgp"}},p={},f=[{value:"Limitations",id:"limitations",level:3}],d={toc:f};function u(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"TCP session optimization is specifically for customers using low-bandwidth, high-latency links, that experience random drops not due to traffic congestion. In this environment, session optimization will override congestion control and the ",(0,r.kt)("inlineCode",{parentName:"p"},"send")," window to provide better performance for the TCP stream over low-bandwidth, high-latency, lossy links. "),(0,r.kt)("p",null,"To identify paths for TCP session optimization, BFD must indicate that the path has a high latency (more than half a second). The following settings are then configured on the device-interface.  "),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Set a ",(0,r.kt)("a",{parentName:"li",href:"/docs/config_reference_guide#traffic-engineering"},(0,r.kt)("inlineCode",{parentName:"a"},"traffic-engineering transmit-cap"))," of 30Mbs or lower on the desired device-interface."),(0,r.kt)("li",{parentName:"ol"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"enable-detection")," field under ",(0,r.kt)("a",{parentName:"li",href:"/docs/config_reference_guide#session-optimization-device-interface"},(0,r.kt)("inlineCode",{parentName:"a"},"device-interface > session-optimization"))," must be set to ",(0,r.kt)("inlineCode",{parentName:"li"},"true")," (true is the default value).")),(0,r.kt)("h3",{id:"limitations"},"Limitations"),(0,r.kt)("p",null,"Session failover for optimized routers deployed as standalone nodes (i.e., without HA)."),(0,r.kt)("p",null,"SVR uses UDP transport on transport links, so any WAN optimization features for TCP will no longer effect SVR UDP-based underlay traffic."),(0,r.kt)("p",null,"Since the SSR operates as a full caching TCP proxy for optimized sessions, third party TCP optimization solutions deployed on overlay endpoints may not function properly across the SVR optimized links."))}u.isMDXComponent=!0}}]);