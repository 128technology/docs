"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[8246],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return d}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),f=u(r),d=a,m=f["".concat(i,".").concat(d)]||f[d]||p[d]||o;return r?n.createElement(m,l(l({ref:t},c),{},{components:r})):n.createElement(m,l({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,l[1]=s;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},13127:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return p}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),l=["components"],s={title:"128T Installer 3.0 Release Notes",sidebar_label:"3.0"},i=void 0,u={unversionedId:"release_notes_128t_installer_3.0",id:"release_notes_128t_installer_3.0",title:"128T Installer 3.0 Release Notes",description:"Release 3.0.0",source:"@site/docs/release_notes_128t_installer_3.0.md",sourceDirName:".",slug:"/release_notes_128t_installer_3.0",permalink:"/docs/release_notes_128t_installer_3.0",draft:!1,tags:[],version:"current",lastUpdatedAt:1695413319,formattedLastUpdatedAt:"Sep 22, 2023",frontMatter:{title:"128T Installer 3.0 Release Notes",sidebar_label:"3.0"},sidebar:"docs",previous:{title:"3.1",permalink:"/docs/release_notes_128t_installer_3.1"},next:{title:"2.7",permalink:"/docs/release_notes_128t_installer_2.7"}},c={},p=[{value:"Release 3.0.0",id:"release-300",level:2},{value:"New Features and Improvements",id:"new-features-and-improvements",level:3},{value:"Caveats",id:"caveats",level:3}],f={toc:p};function d(e){var t=e.components,r=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"release-300"},"Release 3.0.0"),(0,o.kt)("h3",{id:"new-features-and-improvements"},"New Features and Improvements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Support for token-based software access"))),(0,o.kt)("h3",{id:"caveats"},"Caveats"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"IN-418 Installer 3.0 first download attempt from conductor fails on router:")," ")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Workaround:")," Initiate the download again. The Installer will download."),(0,o.kt)("hr",null),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"I95-39793 Conductor fails to self-upgrade:")," This issue affects only 4.5.6-1 systems performing Conductor self-upgrade with Installer version 2.7.0 (or later). Released versions of 128T prior or after 4.5.6-1 are not affected.")),(0,o.kt)("p",null,"The following error is displayed:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"/usr/bin/nice: /usr/lib/128T-installer/install128t.par: No such file or directory\nFailed to upgrade 128T!\n")),(0,o.kt)("p",null,"The recommended course of action is to perform a manual interactive upgrade of the conductor. Please refer to ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_upgrading#upgrading-using-the-interactive-installer"},"Upgrading Using the Interactive Installer")," for that process."))}d.isMDXComponent=!0}}]);