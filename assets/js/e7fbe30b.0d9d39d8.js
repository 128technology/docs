"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[8962],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var l=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=l.createContext({}),u=function(e){var t=l.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return l.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},c=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=u(n),m=a,k=c["".concat(i,".").concat(m)]||c[m]||p[m]||r;return n?l.createElement(k,s(s({ref:t},d),{},{components:n})):l.createElement(k,s({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=c;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var u=2;u<r;u++)s[u]=n[u];return l.createElement.apply(null,s)}return l.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4410:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return p}});var l=n(87462),a=n(63366),r=(n(67294),n(3905)),s=["components"],o={title:"SSR Installer 3.1 Release Notes",sidebar_label:"3.1"},i=void 0,u={unversionedId:"release_notes_128t_installer_3.1",id:"release_notes_128t_installer_3.1",title:"SSR Installer 3.1 Release Notes",description:"Upgrade Installer: Before upgrading to, or installing version 5.4, update the Installer to the latest version. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.",source:"@site/docs/release_notes_128t_installer_3.1.md",sourceDirName:".",slug:"/release_notes_128t_installer_3.1",permalink:"/docs/release_notes_128t_installer_3.1",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"SSR Installer 3.1 Release Notes",sidebar_label:"3.1"},sidebar:"docs",previous:{title:"3.2",permalink:"/docs/release_notes_128t_installer_3.2"},next:{title:"3.0",permalink:"/docs/release_notes_128t_installer_3.0"}},d={},p=[{value:"Release 3.1.7",id:"release-317",level:2},{value:"Resolved Issues",id:"resolved-issues",level:3},{value:"Release 3.1.6",id:"release-316",level:2},{value:"Resolved Issues",id:"resolved-issues-1",level:3},{value:"Release 3.1.5",id:"release-315",level:2},{value:"Resolved Issues",id:"resolved-issues-2",level:3},{value:"Release 3.1.4",id:"release-314",level:2},{value:"Resolved Issues",id:"resolved-issues-3",level:3},{value:"Release 3.1.3",id:"release-313",level:2},{value:"Resolved Issues",id:"resolved-issues-4",level:3},{value:"Release 3.1.2",id:"release-312",level:2},{value:"Resolved Issues",id:"resolved-issues-5",level:3},{value:"Release 3.1.1",id:"release-311",level:2},{value:"Resolved Issues",id:"resolved-issues-6",level:3},{value:"Release 3.1.0",id:"release-310",level:2},{value:"New Features and Improvements",id:"new-features-and-improvements",level:3},{value:"Resolved Issues",id:"resolved-issues-7",level:3}],c={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,s);return(0,r.kt)("wrapper",(0,l.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("admonition",{type:"important"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"Upgrade Installer:")," Before ",(0,r.kt)("strong",{parentName:"p"},"upgrading to, or installing")," version 5.4, update the Installer to the latest version. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.")),(0,r.kt)("h2",{id:"release-317"},"Release 3.1.7"),(0,r.kt)("h3",{id:"resolved-issues"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-508 Prompt user to disable salt-minion:")," When the installer is being run manually, the installer now will alert the user that the ",(0,r.kt)("inlineCode",{parentName:"li"},"salt-minion")," is active and ask whether the ",(0,r.kt)("inlineCode",{parentName:"li"},"salt-minion")," should be disabled for the duration of the operation.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-513 Include ",(0,r.kt)("inlineCode",{parentName:"strong"},"shim-x86")," package is downloaded:")," The ",(0,r.kt)("inlineCode",{parentName:"li"},"shim-x86")," package is now a required component of the installer and is always downloaded and installed on EFI systems.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-515 ",(0,r.kt)("inlineCode",{parentName:"strong"},"auditd")," service always restarted upon install:")," The installer now identifies and respects the ",(0,r.kt)("inlineCode",{parentName:"li"},"auditd")," state before an installation, and if it was disabled prior to the install, it does not restart it. ")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-518 Prevent ",(0,r.kt)("inlineCode",{parentName:"strong"},"erase128t")," from running on Image-Based systems:")," ",(0,r.kt)("inlineCode",{parentName:"li"},"erase128t")," will now refuse to perform any operations on an Image-Based (IBU) system. ")),(0,r.kt)("h2",{id:"release-316"},"Release 3.1.6"),(0,r.kt)("h3",{id:"resolved-issues-1"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-504 Conductor-only software download takes too long:")," The installer now complies with the configured proxy settings when validating authenticated repository credentials.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-510 Installer can hang indefinitely:")," The installer now enforces a 30 second timeout when checking credentials against remote repositories to prevent the installer from  hanging indefinitely under poor network conditions.")),(0,r.kt)("h2",{id:"release-315"},"Release 3.1.5"),(0,r.kt)("h3",{id:"resolved-issues-2"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-491 Installer Repo uses HTTP instead of HTTPS:")," Installer repo now defaults to HTTPS. ")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-502 Improve error message for package-based install attempt on an image-based install:")," The package-based installation process will not attempt to install on an image-based install, and provides relevant messaging. ")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-503 Help prevent a DNF crash that can occur under poor network conditions:")," Installer and download operations will now provide useful error feedback when poor network conditions are encountered, and operations will halt. This may result in the upgrade option not being available.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-505 Installer does not attempt to use subsequent configured repositories:")," When multiple conductor-hosted repositories are used (",(0,r.kt)("inlineCode",{parentName:"li"},"prefer-conductor")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"conductor-only")," configuration) with an HA conductor, package availability is checked on both Conductors instead of just one.")),(0,r.kt)("h2",{id:"release-314"},"Release 3.1.4"),(0,r.kt)("h3",{id:"resolved-issues-3"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-497 Router upgrades take an extended amount if the repo times out with conductor-only configured:")," Routers that are configured as ",(0,r.kt)("inlineCode",{parentName:"li"},"conductor-only")," and that can resolve the remote repo, but where the repo access operations time out, may result in an extended amount of time for upgrades to complete. This issue has been resolved.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},'IN-464/IN-487 Reinstall is now an "Advanced Feature":')," Reinstallation should be performed from the ISO, rather than the Installer to avoid problems of leftover packages and kernel mismatches.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-479 Update Support Contacts in the Installer:")," The contact information in the Installer has been updated.")),(0,r.kt)("h2",{id:"release-313"},"Release 3.1.3"),(0,r.kt)("h3",{id:"resolved-issues-4"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-482 Prevent inadvertent restart of the service:")," This issue has been resolved.  ")),(0,r.kt)("h2",{id:"release-312"},"Release 3.1.2"),(0,r.kt)("h3",{id:"resolved-issues-5"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-472 CVE-2020-14352:")," This vulnerability has been addressed. ")),(0,r.kt)("h2",{id:"release-311"},"Release 3.1.1"),(0,r.kt)("h3",{id:"resolved-issues-6"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-467 install/rollback operation flags rpmdb corruption when database is not corrupt:")," During an installation or rollback, the rpmdb corruption detection process could terminate the operation and result in a failed install/rollback operation.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-469 Initial splash screen notice is hidden:")," Initial notice was hidden in the slash screen on startup, This notice is now visible once the first screen is provided.")),(0,r.kt)("h2",{id:"release-310"},"Release 3.1.0"),(0,r.kt)("h3",{id:"new-features-and-improvements"},"New Features and Improvements"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Installer upgrade to support SSR Release 5.4.0"))),(0,r.kt)("h3",{id:"resolved-issues-7"},"Resolved Issues"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-365 Installer tries to delete users from groups:")," The installer no longer tries to delete users from groups even if they don't exist. ")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-435 Rollback Failing:")," An upgrade is prevented if the SSR-manifest package is not installed before the upgrade.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-438 Upgrade did not reboot, leaving system in Stopped state:")," Resolved an issue where the system would sometimes not reboot after upgrading the SSR.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-446 Install does not enable the rappid repos by default:")," Resolved an issue where some dependencies were missing.")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-452 Handle End of File error:")," Resolved an issue where the installer was not handling an end of file error. ")),(0,r.kt)("hr",null),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"IN-455 Rollback operations failing:")," Resolved an issue where the installer was being upgraded again as part of the SSR installation.")))}m.isMDXComponent=!0}}]);