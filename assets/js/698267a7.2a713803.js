"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5217],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return h}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=p(a),h=i,u=m["".concat(s,".").concat(h)]||m[h]||c[h]||o;return a?n.createElement(u,r(r({ref:t},d),{},{components:a})):n.createElement(u,r({ref:t},d))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},64069:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var n=a(87462),i=a(63366),o=(a(67294),a(3905)),r=["components"],l={title:"Conductor Interactive Installation",sidebar_label:"Conductor Interactive Installation"},s=void 0,p={unversionedId:"intro_installation_bootable_media",id:"intro_installation_bootable_media",title:"Conductor Interactive Installation",description:"This section assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in Downloading an SSR ISO and Creating a Bootable USB.",source:"@site/docs/intro_installation_bootable_media.md",sourceDirName:".",slug:"/intro_installation_bootable_media",permalink:"/docs/intro_installation_bootable_media",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Conductor Interactive Installation",sidebar_label:"Conductor Interactive Installation"},sidebar:"docs",previous:{title:"Creating Bootable USB",permalink:"/docs/intro_creating_bootable_usb"},next:{title:"Configure the Conductor",permalink:"/docs/intro_basic_conductor_config"}},d=[{value:"Prerequisites",id:"prerequisites",children:[],level:2},{value:"Installing the ISO",id:"installing-the-iso",children:[{value:"Choose the Installation Type",id:"choose-the-installation-type",children:[],level:3},{value:"FIPS Enforcement Mode",id:"fips-enforcement-mode",children:[{value:"SSR System via Serial Console",id:"ssr-system-via-serial-console",children:[],level:4},{value:"SSR System with VGA Console",id:"ssr-system-with-vga-console",children:[],level:4}],level:3},{value:"SSR Installation",id:"ssr-installation",children:[],level:3}],level:2},{value:"Initial Boot and NMTUI",id:"initial-boot-and-nmtui",children:[],level:2},{value:"Initialize the SSR Node",id:"initialize-the-ssr-node",children:[{value:"Install a Second HA Node for the Conductor",id:"install-a-second-ha-node-for-the-conductor",children:[],level:3}],level:2},{value:"Verify Installation",id:"verify-installation",children:[{value:"To Verify the SSR Installation:",id:"to-verify-the-ssr-installation",children:[],level:3}],level:2},{value:"Serial Console Installation Information",id:"serial-console-installation-information",children:[{value:"Serial Console Troubleshooting",id:"serial-console-troubleshooting",children:[],level:3}],level:2}],c={toc:d};function m(e){var t=e.components,l=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This section assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_downloading_iso"},"Downloading an SSR ISO")," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_creating_bootable_usb"},"Creating a Bootable USB"),"."),(0,o.kt)("p",null,"The steps in this section describe the interactive Conductor installation from the ISO. The section ",(0,o.kt)("a",{parentName:"p",href:"#initialize-the-128t-node"},"Initialize the SSR")," describes using the Initializer to configure the system as a Conductor after installing from the Interactive ISO. "),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The Conductor installation must be completed before installing a router or routers using the OTP ISO."))),(0,o.kt)("p",null,"This same procedure may be used to install a router, or the procedure ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_otp_iso_install"},"Router Installation Using OTP")," can be used to install complex router configurations ",(0,o.kt)("strong",{parentName:"p"},"after")," installing and configuring the Conductor. "),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Ensure that the platform you are installing on meets the SSR hardware requirements."),(0,o.kt)("li",{parentName:"ul"},"Verify that the boot priority of the USB drive is properly listed in the system BIOS.")),(0,o.kt)("h2",{id:"installing-the-iso"},"Installing the ISO"),(0,o.kt)("p",null,"After imaging the ISO onto removable media, insert it into the target machine and power it on."),(0,o.kt)("h3",{id:"choose-the-installation-type"},"Choose the Installation Type"),(0,o.kt)("p",null,"Upon boot, the following screen is displayed. Not all hardware has video support, so booting to the serial console (115200 baud) is the default. "),(0,o.kt)("p",null,"To install using the Interactive Installation, use the arrow keys to select either ",(0,o.kt)("inlineCode",{parentName:"p"},"Install 128T Routing Software Serial Console")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Install 128T Routing Software VGA Console"),". As noted earlier, this guide describes the installation process using the Interactive Installation, specifically using the VGA console. The process for a Conductor or a Router is the same. "),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"VGA Boot with Interactive Install",src:a(43400).Z})),(0,o.kt)("p",null,"Differences for the serial console are described in ",(0,o.kt)("a",{parentName:"p",href:"#serial-console-installation-information"},"Serial Console Installation Information"),". "),(0,o.kt)("p",null,"To perform the installation using the OTP Installation, use the arrow keys to select either ",(0,o.kt)("inlineCode",{parentName:"p"},"OTP Install 128T Routing Software Serial Console")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"OTP Install 128T Routing Software VGA Console"),". The OTP Installation for the serial or VGA console is described in the section ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_otp_iso_install"},"Router Installation Using OTP"),"."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Not all hardware has video support. Booting to the serial console 115200 baud is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior."),(0,o.kt)("p",{parentName:"div"},"Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed, and if left to continue will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware."))),(0,o.kt)("h3",{id:"fips-enforcement-mode"},"FIPS Enforcement Mode"),(0,o.kt)("p",null,"FIPS Enforcement is available for ",(0,o.kt)("strong",{parentName:"p"},"version 6.0 and later"),". FIPS mode can be enabled manually during the installation. In cases where the flag was not or cannot be set during installation, a FIPS RPM is available for download from the SSR repos, and can be installed."),(0,o.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If you require strict FIPS compliance, the ",(0,o.kt)("inlineCode",{parentName:"p"},"fips=1")," kernel option must be added to the kernel command line during system installation to ensure that key generation is done with FIPS approved algorithms and continuous monitoring tests in place."),(0,o.kt)("p",{parentName:"div"},"If FIPS enablement is done retrospectively via RPM installation, the already created accounts could be using non-FIPS compliant cyphers."))),(0,o.kt)("p",null,"Use the following procedure to enable FIPS enforcement."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Use up/down keys to highlight the desired install mode. "),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Bios Install",src:a(10879).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Press TAB to edit the config.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add ",(0,o.kt)("inlineCode",{parentName:"p"},"fips=1")," to the end of the vmlinuz parameters."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"FIPS Parameter",src:a(65586).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Press Enter to start the install.   "))),(0,o.kt)("p",null,"The procedure that follows here is the Interactive Install on the VGA Console."),(0,o.kt)("h4",{id:"ssr-system-via-serial-console"},"SSR System via Serial Console"),(0,o.kt)("p",null,"Use this option when running on hardware with no video chipset. It uses ",(0,o.kt)("inlineCode",{parentName:"p"},"/dev/ttyS0")," 115200 baud as the serial console for interacting with the installer. For serial console issues please refer to ",(0,o.kt)("a",{parentName:"p",href:"#serial-console-troubleshooting"},"Serial Console Troubleshooting"),"."),(0,o.kt)("h4",{id:"ssr-system-with-vga-console"},"SSR System with VGA Console"),(0,o.kt)("p",null,"Use this option when running on hardware that has onboard graphics chipsets. This installs SSR software using the GUI installer."),(0,o.kt)("h3",{id:"ssr-installation"},"SSR Installation"),(0,o.kt)("p",null,"After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Installation Complete",src:a(86783).Z})),(0,o.kt)("p",null,"Shut down the system and remove the bootable media. Then power the system up to complete the installation process. "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"GUI login via HTTPS is enabled by default on port 443.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"The following user accounts and passwords are created during the ISO installation process:"),(0,o.kt)("table",{parentName:"li"},(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Username"),(0,o.kt)("th",{parentName:"tr",align:null},"Password"),(0,o.kt)("th",{parentName:"tr",align:null},"Access Scope"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"root"),(0,o.kt)("td",{parentName:"tr",align:null},"128tRoutes"),(0,o.kt)("td",{parentName:"tr",align:null},"Linux account")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"t128"),(0,o.kt)("td",{parentName:"tr",align:null},"128tRoutes"),(0,o.kt)("td",{parentName:"tr",align:null},"Linux account")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"admin"),(0,o.kt)("td",{parentName:"tr",align:null},"128Tadmin"),(0,o.kt)("td",{parentName:"tr",align:null},"SSR PCLI admin account - see note below")))),(0,o.kt)("p",{parentName:"li"}," It is ",(0,o.kt)("em",{parentName:"p"},"strongly recommended")," that you change these passwords immediately."),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The admin default password is only created during the OTP installation. There is no admin defaut for an interactive installation."))))),(0,o.kt)("h2",{id:"initial-boot-and-nmtui"},"Initial Boot and NMTUI"),(0,o.kt)("p",null,"When the system boots from the ",(0,o.kt)("inlineCode",{parentName:"p"},"Install 128T Routing Software...")," Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the SSR Initializer is started."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T NetManager TUI Start",src:a(59025).Z})),(0,o.kt)("p",null,"Selecting ",(0,o.kt)("inlineCode",{parentName:"p"},"Yes")," launches the CentOS NMTUI application to perform an initial network interface setup."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T NetManager TUI Option",src:a(2957).Z})),(0,o.kt)("p",null,"Refer to the NMTUI user documentation for more details."),(0,o.kt)("h2",{id:"initialize-the-ssr-node"},"Initialize the SSR Node"),(0,o.kt)("p",null,"The SSR Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot for the ",(0,o.kt)("inlineCode",{parentName:"p"},"Install 128T Routing Software...")," installation options."),(0,o.kt)("p",null,"If you are installing a highly available Conductor on the cloud, please refer to ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_initialize_HA_conductor"},"Conductor High Availability for Cloud Deployments"),"."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"On the SSR Initializer wizard screen, use the space bar to select either a ",(0,o.kt)("strong",{parentName:"p"},"Router")," or ",(0,o.kt)("strong",{parentName:"p"},"Conductor\xa0"),"role for the SSR node and press the ",(0,o.kt)("strong",{parentName:"p"},"Enter")," key to select ",(0,o.kt)("strong",{parentName:"p"},"OK"),"."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"SSR Role",src:a(32450).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"For SSR routers, you will be prompted for the IP\xa0address(es) of your conductor(s). If you have conductors, enter the administrative addresses and the node will retrieve the configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose ",(0,o.kt)("strong",{parentName:"p"},"Skip"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"When asked ",(0,o.kt)("em",{parentName:"p"},"What kind of Router/Conductor node is this?"),", select from the following options:"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Identify the Node",src:a(88390).Z})))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Standalone:")," This router/conductor has no highly available peer, and is not currently planned for high availability.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"1st HA\xa0Node:")," This router/conductor is the first node of a high availability pair. You will be prompted to provide the local IP address for this node. The 2nd HA node will contact this node at the address provided to synchronize state. Note: The 1st Node IP address must be reachable by the 2nd HA Node.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"2nd HA\xa0Node:")," This router/conductor is the second node of a high availability pair, where the first node has been initialized. You will be prompted to provide the 1st Node IP address for this 2nd node that will be used to synchronize state. Note: The 2nd Node IP address must be reachable by the 1st HA Node."))),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The following steps configure a high availability conductor node. If you are not configuring HA, you will be presented with the ",(0,o.kt)("strong",{parentName:"p"},"Node Info")," screen in step 4b. "),(0,o.kt)("p",{parentName:"li"},"a). Enter the IP address of the local HA sync interface. "),(0,o.kt)("p",{parentName:"li"},"  ",(0,o.kt)("img",{alt:"High Availability IP Address",src:a(72495).Z})),(0,o.kt)("p",{parentName:"li"},"b). Enter the following system properties on the ",(0,o.kt)("strong",{parentName:"p"},"Node Info")," screen:"),(0,o.kt)("p",{parentName:"li"},"  ",(0,o.kt)("img",{alt:"Node Information",src:a(20332).Z})),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Node Name:")," The name of the system within your SSR Router or Conductor, for example, ",(0,o.kt)("em",{parentName:"p"},"conductor"),". By default this field uses the Linux system's hostname."),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).")))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Router/Conductor Name:")," The name of the Router or Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name of ",(0,o.kt)("inlineCode",{parentName:"p"},"nodeName.routerName"),"; e.g., ",(0,o.kt)("inlineCode",{parentName:"p"},"conductor-node1.conductor"),". The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.")))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"On the ",(0,o.kt)("strong",{parentName:"p"},"Password Setup")," screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer."),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. "))),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Password Setup",src:a(24294).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Press the ",(0,o.kt)("strong",{parentName:"p"},"Enter")," key to select ",(0,o.kt)("strong",{parentName:"p"},"OK"),". The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"When prompted, either reboot your system or start SSR."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Initializer Complete",src:a(67922).Z})),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If installing the SSR software for the first time, a system reboot is required."))))),(0,o.kt)("h3",{id:"install-a-second-ha-node-for-the-conductor"},"Install a Second HA Node for the Conductor"),(0,o.kt)("p",null,"If there is a second node for Conductor HA, install the system using the same process beginning with ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_installation_bootable_media#installing-the-iso"},"Installing the ISO")," and ending at ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_installation_bootable_media#initialize-the-128t-node"},"Initialize 128T")," step 2. From step 2, perform the following:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"When prompted for ",(0,o.kt)("inlineCode",{parentName:"p"},"What kind of Conductor node is this?")," Select the ",(0,o.kt)("strong",{parentName:"p"},"2nd HA Node"),"."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"2nd HA Node Setup",src:a(67813).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Enter the ",(0,o.kt)("strong",{parentName:"p"},"HA Address")," and ",(0,o.kt)("strong",{parentName:"p"},"Peer HA Address")," for the second node. The HA Address is the local 2nd HA Node IP address, and the Peer HA Address is the 1st HA Node IP address."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"2nd HA Peer IP",src:a(17297).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Enter the ",(0,o.kt)("strong",{parentName:"p"},"HA Peer Credentials"),". This is a one time operation for the initialization of the second HA Node with the first HA Peer. The ",(0,o.kt)("inlineCode",{parentName:"p"},"t128")," user can be used for this operation."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"HA Peer Credentials",src:a(91138).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Press the ",(0,o.kt)("strong",{parentName:"p"},"Enter")," key to select ",(0,o.kt)("strong",{parentName:"p"},"OK"),". The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no ",(0,o.kt)("strong",{parentName:"p"},"failures")," are present, you can choose to continue with the installation even if multiple warnings exist. For information about why a specific test may have failed or generated a warning, contact Juniper Technical Support.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"After the initialization process completes the setup, the following screen displays. Use the Enter key to select ",(0,o.kt)("inlineCode",{parentName:"p"},"Got it!")),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Peer Restart",src:a(50430).Z}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The Installer Status screen indicates success. Use the spacebar to either reboot your system or start SSR."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Initializer Complete",src:a(67922).Z})),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If installing the SSR software for a router, a system reboot may be required."))))),(0,o.kt)("h2",{id:"verify-installation"},"Verify Installation"),(0,o.kt)("p",null,"After installing the SSR Software it is important to verify that the installation was completed successfully."),(0,o.kt)("h3",{id:"to-verify-the-ssr-installation"},"To Verify the SSR Installation:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Launch a command prompt window.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Execute the command:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"sudo systemctl status 128T\n")),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Result:")," The service is listed as ",(0,o.kt)("em",{parentName:"p"},"Active (running)"),"."),(0,o.kt)("p",{parentName:"li"},"If the service is listed as ",(0,o.kt)("em",{parentName:"p"},"Inactive"),", run the ",(0,o.kt)("inlineCode",{parentName:"p"},"sudo systemctl start 128T"),"\xa0command. This may take several minutes to fully launch the service.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Once the service is listed as ",(0,o.kt)("em",{parentName:"p"},"Active"),", log into the system as Admin using the system default password."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Result:")," The installation is verified.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Close the command prompt window. "))),(0,o.kt)("h2",{id:"serial-console-installation-information"},"Serial Console Installation Information"),(0,o.kt)("p",null,"Please note that Legacy and UEFI consoles display differently. The following is the  installation screen when booting to a Legacy console:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Boot Screen",src:a(11406).Z})),(0,o.kt)("p",null,"The following is the  installation screen when booting to a UEFI console:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"New Boot Screen",src:a(49824).Z})),(0,o.kt)("h3",{id:"serial-console-troubleshooting"},"Serial Console Troubleshooting"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Default baud rate for serial console access is 115200/8-n-1")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"When performing an installation via the serial console, some systems do not interpret control characters that may be passed on the serial console line. For example, the following may be seen during the installation process:"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Corrupt Serial Install Complete",src:a(95211).Z})),(0,o.kt)("p",{parentName:"li"},"In cases where the screen output becomes unreadable, use the following procedure. "),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Type: ",(0,o.kt)("inlineCode",{parentName:"li"},"^a")," (Ctrl-a)"),(0,o.kt)("li",{parentName:"ul"},"Type: ",(0,o.kt)("inlineCode",{parentName:"li"},"k")),(0,o.kt)("li",{parentName:"ul"},"Type: ",(0,o.kt)("inlineCode",{parentName:"li"},"y")," ","[for yes to exist screen]"),(0,o.kt)("li",{parentName:"ul"},"Reconnect with screen (i.e., Screen command could be ",(0,o.kt)("inlineCode",{parentName:"li"},"screen /dev/tty.usbserial-1430 115200"),")."),(0,o.kt)("li",{parentName:"ul"},"Type: ",(0,o.kt)("inlineCode",{parentName:"li"},"^l")," (Ctrl-l) (lower case L) to repaint the screen. ")),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Resolved Serial Install Complete",src:a(42775).Z})),(0,o.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Repaint does not work on the initial boot screen when imaging a system. If the serial console is disconnected, it is recommended to restart the system and begin the imaging process again."))),(0,o.kt)("p",{parentName:"li"},"Repeat these steps if the screen becomes unreadable at any time during the initialization process."))))}m.isMDXComponent=!0},10879:function(e,t,a){t.Z=a.p+"assets/images/56fips_BIOSinstall_1-2427894e00c6f522682a4f5ff6ddbcc5.png"},65586:function(e,t,a){t.Z=a.p+"assets/images/56fips_BIOSinstall_2-80e3c1079cb78096f2c2e67fee668822.png"},59025:function(e,t,a){t.Z=a.p+"assets/images/Initializer_Serial0-e607826204402e45ff6e02202113b4f8.png"},2957:function(e,t,a){t.Z=a.p+"assets/images/Initializer_Serial1-228c6976cce5089ab6c64bcd65392ee2.png"},32450:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial2-7ab3273fb33657cbc2bdfaf59ec59581.png"},88390:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial3-6a1a712ab9b31385c177bb2d26d1397d.png"},72495:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial3HAIP-db69fe992e10e339920457ac1cbfdb53.png"},67813:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial4cHANode-ab6aab82aac6bcbe470938280181bfce.png"},17297:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial4dHANode-55a5d0adc1169fc1eb4544feee201aa0.png"},91138:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial4eHAPeer-29caa701203e235288fe7a125982884a.png"},20332:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial5-4572196f483b32e062c6497215e71347.png"},24294:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial6-03036c862150fcb1da1fa9115568bfc6.png"},50430:function(e,t,a){t.Z=a.p+"assets/images/initializer_Serial7-a041d94700dbf12f9b827b9611128d26.png"},67922:function(e,t,a){t.Z=a.p+"assets/images/initializer_complete-31b5e02463d05c72b58293e2cfeb8940.png"},43400:function(e,t,a){t.Z=a.p+"assets/images/install_select_interactive-8d3e09560e267009293bc282c8d97f49.png"},95211:function(e,t,a){t.Z=a.p+"assets/images/install_serial_corrupt-41a8b473e7bbbb92dafb34929d2a4338.png"},42775:function(e,t,a){t.Z=a.p+"assets/images/install_serial_resolved-dbe9f0e8474cc41592ae20cc524a0da5.png"},11406:function(e,t,a){t.Z=a.p+"assets/images/intro_install_LegacyInstall-5d95307ec85d08f49cc9e2c203282efa.png"},49824:function(e,t,a){t.Z=a.p+"assets/images/intro_install_OTPInstall_1-3523a47a1d01c1f9824410ba92112d04.png"},86783:function(e,t,a){t.Z=a.p+"assets/images/intro_installation_bootable_media_install_complete-b5552ee6cc8d84ce585059d7ca910f41.png"}}]);