"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[4447],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=p(n),m=i,u=h["".concat(l,".").concat(m)]||h[m]||d[m]||o;return n?a.createElement(u,r(r({ref:t},c),{},{components:n})):a.createElement(u,r({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},37470:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d}});var a=n(87462),i=n(63366),o=(n(67294),n(3905)),r=["components"],s={title:"Installing Using the Pre-5.0 Interactive ISO",sidebar_label:"Installing Using the Pre-5.0 Interactive ISO"},l=void 0,p={unversionedId:"legacy_OTP_install",id:"legacy_OTP_install",title:"Installing Using the Pre-5.0 Interactive ISO",description:"The steps in this section describe installing the legacy Interactive ISO from bootable media. The section, Initialize the SSR describes using the Initializer to configure the system as a Conductor after installing from the Interactive ISO.",source:"@site/docs/legacy_OTP_install.md",sourceDirName:".",slug:"/legacy_OTP_install",permalink:"/docs/legacy_OTP_install",draft:!1,tags:[],version:"current",lastUpdatedAt:1707314492,formattedLastUpdatedAt:"Feb 7, 2024",frontMatter:{title:"Installing Using the Pre-5.0 Interactive ISO",sidebar_label:"Installing Using the Pre-5.0 Interactive ISO"},sidebar:"docs",previous:{title:"Deployment Using QCOW2",permalink:"/docs/install_qcow2_deployment"},next:{title:"Application Discovery",permalink:"/docs/concepts_application_discovery"}},c={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installing the ISO",id:"installing-the-iso",level:2},{value:"Choose the Installation Type",id:"choose-the-installation-type",level:3},{value:"SSR System via Serial Console",id:"ssr-system-via-serial-console",level:4},{value:"SSR System with VGA Console",id:"ssr-system-with-vga-console",level:4},{value:"SSR Installation",id:"ssr-installation",level:3},{value:"Installation Notes",id:"installation-notes",level:3},{value:"Initialize the Node",id:"initialize-the-node",level:2},{value:"Verify Installation",id:"verify-installation",level:3},{value:"To Verify the SSR Installation:",id:"to-verify-the-ssr-installation",level:4}],h={toc:d};function m(e){var t=e.components,s=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},h,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The steps in this section describe installing the legacy Interactive ISO from bootable media. The section, ",(0,o.kt)("a",{parentName:"p",href:"#initialize-the-128t-node"},"Initialize the SSR")," describes using the Initializer to configure the system as a Conductor after installing from the Interactive ISO. "),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"The Conductor installation must be completed before installing a router or routers using the OTP ISO.")),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_otp_iso_install"},"Installing Using the One Touch Provisioning ISO")," for details to install complex router configurations ",(0,o.kt)("strong",{parentName:"p"},"after")," installing and configuring the Conductor. "),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Ensure that the platform you are installing on meets the SSR hardware requirements."),(0,o.kt)("li",{parentName:"ul"},"Verify that the boot priority of the USB drive is properly listed in the system BIOS.")),(0,o.kt)("h2",{id:"installing-the-iso"},"Installing the ISO"),(0,o.kt)("p",null,"After imaging the ISO onto removable media, insert it into the target machine and power it on."),(0,o.kt)("h3",{id:"choose-the-installation-type"},"Choose the Installation Type"),(0,o.kt)("p",null,"Upon boot, you are prompted with the following screen for the Linux installation:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Boot Screen",src:n(54524).Z,width:"1402",height:"895"})),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Not all hardware has video support, therefore booting to console is the default (a console user may not be able to select an option). The default option is selected after a 30 second timeout.")),(0,o.kt)("h4",{id:"ssr-system-via-serial-console"},"SSR System via Serial Console"),(0,o.kt)("p",null,"Use this option when running on hardware with no video chipset. It uses ",(0,o.kt)("inlineCode",{parentName:"p"},"/dev/ttyS0")," as the serial console for interacting with the installer."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Selecting the wrong type of console may result in garbage characters being displayed and the install hanging. If this is the case, reboot the target system and select the correct line for the target hardware.")),(0,o.kt)("h4",{id:"ssr-system-with-vga-console"},"SSR System with VGA Console"),(0,o.kt)("p",null,"Use this option when running on hardware that has onboard graphics chipsets. This installs the SSR using the GUI installer."),(0,o.kt)("h3",{id:"ssr-installation"},"SSR Installation"),(0,o.kt)("p",null,"After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Installation Complete",src:n(14052).Z,width:"586",height:"484"})),(0,o.kt)("p",null,"After shutting down the system, remove the bootable media.\nIf you installed the Interactive ISO powering up the system will start the Initializer.\nIf you installed using One Touch Provisioning, power the system up to complete the installation process. "),(0,o.kt)("h3",{id:"installation-notes"},"Installation Notes"),(0,o.kt)("p",null,"The following user accounts and passwords are created during the ISO installation process:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Username"),(0,o.kt)("th",{parentName:"tr",align:null},"Password"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"root"),(0,o.kt)("td",{parentName:"tr",align:null},"128tRoutes")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"t128"),(0,o.kt)("td",{parentName:"tr",align:null},"128tRoutes")))),(0,o.kt)("p",null,"   It is ",(0,o.kt)("em",{parentName:"p"},"strongly recommended")," that you change these passwords immediately."),(0,o.kt)("p",null,"GUI login via HTTPS is enabled by default on port 443."),(0,o.kt)("h2",{id:"initialize-the-node"},"Initialize the Node"),(0,o.kt)("p",null,"The Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched after the installation reboot."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"On the Initializer wizard screen, use the space bar to select either a ",(0,o.kt)("strong",{parentName:"p"},"Router")," or ",(0,o.kt)("strong",{parentName:"p"},"Conductor\xa0"),"role for the SSR\xa0node and press the ",(0,o.kt)("strong",{parentName:"p"},"Enter")," key to select ",(0,o.kt)("strong",{parentName:"p"},"OK"),".\n",(0,o.kt)("img",{alt:"128T Role",src:n(19566).Z,width:"1182",height:"657"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"For routers, you will be prompted for the IP\xa0address(es) of your conductor(s). If you have conductors, Enter their administrative addresses here, and this node will retrieve its configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose ",(0,o.kt)("strong",{parentName:"p"},"Skip"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"When asked ",(0,o.kt)("em",{parentName:"p"},"What kind of Router node is this?"),", select from the following options:"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Identify the Node",src:n(4460).Z,width:"1182",height:"663"})))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Standalone:")," This router has no highly available peer, and is not currently planned for high availability."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"1st HA\xa0Node:")," This router is the first node of a high availability pair. You will be prompted for the\xa0High Availability address of this node. Note:\xa0The address ",(0,o.kt)("em",{parentName:"li"},"must"),"\xa0be reachable by the 2nd HA\xa0Node."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"2nd HA\xa0Node:")," This router is the second node of a high availability pair, where the first node has been initialized. You will be prompted for the High Availability address of the first node.")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Enter the following system properties on the Node Info screen:"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Node Information",src:n(35862).Z,width:"1182",height:"658"})))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Node Name:")," The unique name of the system within your Router or Conductor, for example ",(0,o.kt)("em",{parentName:"li"},"labsystem1"),". By default this field uses the Linux system's hostname.",(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems)."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Router/Conductor Name:")," The name of the Router or Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name of ",(0,o.kt)("inlineCode",{parentName:"li"},"nodeName.routerName"),"; e.g., ",(0,o.kt)("inlineCode",{parentName:"li"},"labsystem1.boston"),". The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.")),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("strong",{parentName:"p"},"Advanced")," button allows you to specify the number of CPU\xa0cores to be allocated for running your SSR routing software."),(0,o.kt)("admonition",{parentName:"li",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"This is only recommended for experienced users. This setting is intended to optimize the forwarding capabilites of the SSR beyond the default settings for the target platform."),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("strong",{parentName:"p"},"Advanced")," selection is only available when configuring a Router. "))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"On the ",(0,o.kt)("strong",{parentName:"p"},"Password Setup")," screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, and cannot repeat characters more than 3 times."),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. ")),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Password Setup",src:n(61268).Z,width:"1182",height:"660"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"If presented with the ",(0,o.kt)("strong",{parentName:"p"},"Anonymous Data Collection")," screen, select either ",(0,o.kt)("strong",{parentName:"p"},"Accept")," or ",(0,o.kt)("strong",{parentName:"p"},"Disable")," to enable or disable the process that measures the health of your SSR router and components.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Press the ",(0,o.kt)("strong",{parentName:"p"},"Enter")," key to select ",(0,o.kt)("strong",{parentName:"p"},"OK"),". The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact technical support.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"When prompted, either reboot your system or start SSR."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Initializer Complete",src:n(32454).Z,width:"1182",height:"656"})),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"If installing the SSR software for the first time, a system reboot is required.")))),(0,o.kt)("h3",{id:"verify-installation"},"Verify Installation"),(0,o.kt)("p",null,"After installing the SSR Software it is important to verify that the installation was completed successfully."),(0,o.kt)("h4",{id:"to-verify-the-ssr-installation"},"To Verify the SSR Installation:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Launch a command prompt window.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Execute the\xa0command:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"sudo systemctl status 128T\n")),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Result:"),"\xa0The service is listed as ",(0,o.kt)("em",{parentName:"p"},"Active (running)"),"."),(0,o.kt)("p",{parentName:"li"},"If the service is listed as ",(0,o.kt)("em",{parentName:"p"},"Inactive"),", run the ",(0,o.kt)("inlineCode",{parentName:"p"},"sudo systemctl start 128T"),"\xa0command. This may take several minutes to fully launch the service.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Once the service is listed as ",(0,o.kt)("em",{parentName:"p"},"Active"),", log into the system as Admin using the system default password."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Result:"),"\xa0The installation is verified.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Close the command prompt window."))))}m.isMDXComponent=!0},4460:function(e,t,n){t.Z=n.p+"assets/images/intro_install_initializer_HASetup-482fdda2449228e0480f9aec1fc1e51e.png"},32454:function(e,t,n){t.Z=n.p+"assets/images/intro_install_initializer_complete-c3a3bb4dc9122bad4fc41e931bdf8a38.png"},35862:function(e,t,n){t.Z=n.p+"assets/images/intro_install_initializer_nodeinfo-8f8ac95da736a253b2b93f9e9cb30dce.png"},61268:function(e,t,n){t.Z=n.p+"assets/images/intro_install_initializer_password-b0b00f5ec3f59aa4c144af02e6574cce.png"},19566:function(e,t,n){t.Z=n.p+"assets/images/intro_install_initializer_role-f3fd68b423dd7653ff0c8d0ca784ebe5.png"},54524:function(e,t,n){t.Z=n.p+"assets/images/intro_installation_bootable_media_boot-6e482d110e4aab20e8bed4143ce76a5d.png"},14052:function(e,t,n){t.Z=n.p+"assets/images/intro_installation_bootable_media_install_complete-b5552ee6cc8d84ce585059d7ca910f41.png"}}]);