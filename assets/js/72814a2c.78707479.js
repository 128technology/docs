"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5852],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return c}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(r),c=a,f=d["".concat(i,".").concat(c)]||d[c]||m[c]||l;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<l;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},31415:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return c},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return m}});var n=r(87462),a=r(63366),l=(r(67294),r(3905)),o=["components"],s={title:"Installer 2.3 Release Notes",sidebar_label:2.3},i=void 0,p={unversionedId:"release_notes_128t_installer_2.3",id:"release_notes_128t_installer_2.3",title:"Installer 2.3 Release Notes",description:"Release 2.3.2",source:"@site/docs/release_notes_128t_installer_2.3.md",sourceDirName:".",slug:"/release_notes_128t_installer_2.3",permalink:"/docs/release_notes_128t_installer_2.3",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"Installer 2.3 Release Notes",sidebar_label:"2.3"},sidebar:"docs",previous:{title:"2.4",permalink:"/docs/release_notes_128t_installer_2.4"},next:{title:"2.2",permalink:"/docs/release_notes_128t_installer_2.2"}},u={},m=[{value:"Release 2.3.2",id:"release-232",level:2},{value:"Issues Fixed",id:"issues-fixed",level:3},{value:"Release 2.3.1",id:"release-231",level:2},{value:"Issues Fixed",id:"issues-fixed-1",level:3},{value:"Release 2.3.0",id:"release-230",level:2},{value:"Issues Fixed",id:"issues-fixed-2",level:3},{value:"Caveats",id:"caveats",level:2}],d={toc:m};function c(e){var t=e.components,r=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"release-232"},"Release 2.3.2"),(0,l.kt)("h3",{id:"issues-fixed"},"Issues Fixed"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-83"),"  - Installer does not retry on DNF -13 error code")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-155")," - Roll back operations performed when system cannot roll back")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-170")," - The Installer may fail to download all packages required for a system update if empty rpms are present in local repo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-171"),' - asset detail view may show "Attempt 1/3: Stopped SSR service" for a long time'))),(0,l.kt)("h2",{id:"release-231"},"Release 2.3.1"),(0,l.kt)("h3",{id:"issues-fixed-1"},"Issues Fixed"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"IN-164")," DNF subsystem fails during SSR Software upgrade and DNF repository cache refresh.")),(0,l.kt)("h2",{id:"release-230"},"Release 2.3.0"),(0,l.kt)("h3",{id:"issues-fixed-2"},"Issues Fixed"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-150"),' SSR Upgrade terminates with "Unhandled exception: OSError"')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-154")," Installer rollback does not work offline"))),(0,l.kt)("h2",{id:"caveats"},"Caveats"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-126")," - Installation does not fully complete but returns Success\n",(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Symptom:"))," When performing an upgrade, the installer will complete however not all packages will be updated."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Cause:"))," The router node could not resolve the SSR software repository"),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Corrective Action:"))," When performing the upgrade ensure internet or Conductor access (where Conducted hosted services are enabled)")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-141")," - Unsupported installed rpms result in Canceled upgrade\n",(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Symptom:"))," GUI presents a failure on upgrade with the following text provided:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"Error: transaction check vs depsolve:\n")),(0,l.kt)("p",{parentName:"li"},"example:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"Cancelling upgrade of the second node on the router due to failure on this node: Failed to install 128T-manifest-0:4.1.0.1.el7:\nError: transaction check vs depsolve:\niptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64\n")),(0,l.kt)("p",{parentName:"li"},"To diagnose the problem, try running: ",(0,l.kt)("inlineCode",{parentName:"p"},"rpm -Va --nofiles --nodigest"),".\nIf this is a corrupted RPMDB, running ",(0,l.kt)("inlineCode",{parentName:"p"},"rpm --rebuilddb")," may address the issue."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Cause:"))," Installed version of the RPM's come from a later version of the Supported SSR OS version."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Corrective Action:"))," For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},'Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed'),(0,l.kt)("li",{parentName:"ol"},"Setup a new repo pointing to the support SSR-OS vault version and downgrade the related rpms"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"IN-157")," - Installer fails with DNF -11 SIGSEGV failure"),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Symptom:")),' Install fails with the following error: "Error executing DNF command (code: -11)"'),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Cause:"))," DNF uses the curl functions, in earlier versions of SSR-OS the curl libraries may exhibit this issue."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("em",{parentName:"p"},(0,l.kt)("strong",{parentName:"em"},"Corrective Action:"))," If SSR 4.1.0 or greater is installed this is not an issue. If upgrading from a previous version and using the Conductor, the Conductor will perform retries to work around this issue. If using the local installer for installation, re-execute the installer to work around this issue."))))}c.isMDXComponent=!0}}]);