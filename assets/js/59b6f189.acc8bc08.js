"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6322],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},59497:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var a=n(87462),r=n(63366),o=(n(67294),n(3905)),l=["components"],i={title:"Installing in Equinix Metal",sidebar_label:"Installing in Equinix Metal"},s=void 0,p={unversionedId:"intro_installation_equinix_metal",id:"intro_installation_equinix_metal",title:"Installing in Equinix Metal",description:"Introduction",source:"@site/docs/intro_installation_equinix_metal.md",sourceDirName:".",slug:"/intro_installation_equinix_metal",permalink:"/docs/intro_installation_equinix_metal",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Installing in Equinix Metal",sidebar_label:"Installing in Equinix Metal"}},u=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Prerequisites",id:"prerequisites",children:[],level:2},{value:"Equinix Metal Project Deployment",id:"equinix-metal-project-deployment",children:[{value:"Creating L2 Networks",id:"creating-l2-networks",children:[],level:3},{value:"Deploying a Metal Gateway",id:"deploying-a-metal-gateway",children:[],level:3}],level:2},{value:"Session Smart Router Deployment",id:"session-smart-router-deployment",children:[{value:"Attaching the L2 Networks to the Server",id:"attaching-the-l2-networks-to-the-server",children:[],level:3},{value:"Network Interfaces Layout",id:"network-interfaces-layout",children:[],level:3},{value:"Configuration",id:"configuration",children:[],level:3}],level:2},{value:"Appendix",id:"appendix",children:[{value:"Console Access",id:"console-access",children:[],level:3}],level:2}],c={toc:u};function d(e){var t=e.components,i=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://metal.equinix.com/"},"Equinix Metal"),' is a globally-available bare metal \u201cas-a-service\u201d that can be deployed and interconnected in minutes. "Click and go" to deploy to the edge of the internet.'),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Plans",src:n(24310).Z})),(0,o.kt)("p",null,"This guide describes the process for deploying a Session Smart Router (SSR) in Equinix Metal. The process consists of the following steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Deploying a Session Smart Conductor. For a quick deployment you can use the Hourly/PAYG offering available in Azure or AWS. Refer to the ",(0,o.kt)("a",{parentName:"li",href:"/docs/intro_installation_azure#session-smart-conductor-deployment"},"Azure documentation")," or the ",(0,o.kt)("a",{parentName:"li",href:"/docs/intro_installation_quickstart_aws#session-smart-conductor-deployment"},"AWS documentation")," for more information."),(0,o.kt)("li",{parentName:"ol"},"Completing the ",(0,o.kt)("a",{parentName:"li",href:"#prerequisites"},"prerequisites for the deployment"),"."),(0,o.kt)("li",{parentName:"ol"},"Preparing the ",(0,o.kt)("a",{parentName:"li",href:"#equinix-metal-project-deployment"},"Equinix Metal Project for deployment"),"."),(0,o.kt)("li",{parentName:"ol"},"Deploying a ",(0,o.kt)("a",{parentName:"li",href:"#session-smart-router-deployment"},"Session Smart Router"),".")),(0,o.kt)("p",null,"For additional information about Equinix Metal, please refer to the ",(0,o.kt)("a",{parentName:"p",href:"https://metal.equinix.com/developers/docs/"},"Equinix Metal Product Documentation"),"."),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Account and credentials to access the ",(0,o.kt)("a",{parentName:"li",href:"https://console.equinix.com/login"},"Equinix Metal Console"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://metal.equinix.com/developers/docs/accounts/ssh-keys/#generating-ssh-keys"},"Generate an SSH Key")," if you don't have one.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Add your SSH Key to your Equinix Metal account or project as described ",(0,o.kt)("a",{parentName:"li",href:"https://metal.equinix.com/developers/docs/accounts/ssh-keys/#personal-keys-vs-project-keys"},"here"),"."))),(0,o.kt)("li",{parentName:"ul"},"A token or certificate to install the Juniper Session Smart Router software. If a token or certificate is not in your possession, please contact your Juniper Sales representative.")),(0,o.kt)("p",null,"Once you have all the prerequisites, begin with ",(0,o.kt)("a",{parentName:"p",href:"#equinix-metal-project-deployment"},"Equinix Metal Project Deployment")," to deploy the network infrastructure required to deploy a Session Smart Router."),(0,o.kt)("h2",{id:"equinix-metal-project-deployment"},"Equinix Metal Project Deployment"),(0,o.kt)("p",null,"It is recommended to implement a network infrastructure design that complies with the following principles:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'Configure the server network type as "Hybrid Unbounded".'),(0,o.kt)("li",{parentName:"ul"},"Create specific Layer 2 VLANs for the forwarding data plane.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"For example, create one ",(0,o.kt)("inlineCode",{parentName:"li"},"Internet VLAN")," for data plane Internet access, and a second ",(0,o.kt)("inlineCode",{parentName:"li"},"Peering VLAN")," to forward traffic destined for other Equinix Metal regions, or to Public Cloud Providers, etc."))),(0,o.kt)("li",{parentName:"ul"},"For servers that only have 2 ports (network interfaces):",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"The first port is dedicated to management functions only. The port must have access to the Internet, allowing the SSR to be reachable by SSH for administration activities. In addition, if the Conductor is hosted in the Internet, connectivity to Conductor must be provided via this network interface."),(0,o.kt)("li",{parentName:"ul"},"The second port is dedicated to the data plane, and is attached to multiple L2 VLANs using 802.1q.")))),(0,o.kt)("p",null,"The next sections implement the recommended design in Equinix Metal."),(0,o.kt)("h3",{id:"creating-l2-networks"},"Creating L2 Networks"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Login to the ",(0,o.kt)("a",{parentName:"li",href:"https://console.equinix.com/login"},"Equinix Metal Console"),"."),(0,o.kt)("li",{parentName:"ol"},'Click on the tab "IPs & Networks" and select "Layer 2".'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Add VLAN" button.'),(0,o.kt)("li",{parentName:"ol"},"Select the location of your deployment."),(0,o.kt)("li",{parentName:"ol"},"Provide a descritpion and an ID for the VLAN.")),(0,o.kt)("p",null,"Repeat the steps above to create as many L2 VLANs as necessary to meet your specific requirements. For example: Internet and VLAN ID 128."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Description"),(0,o.kt)("th",{parentName:"tr",align:null},"VNID"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Internet"),(0,o.kt)("td",{parentName:"tr",align:null},"128")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Peering"),(0,o.kt)("td",{parentName:"tr",align:null},"129")))),(0,o.kt)("h3",{id:"deploying-a-metal-gateway"},"Deploying a Metal Gateway"),(0,o.kt)("p",null,"An Equinix Metal\u2122 Metal Gateway provides a single IPv4 Gateway for a subnet. This allows you to deploy a group of servers in a Metro on the same subnet, and able to connect to each other or the Internet through the Metal Gateway."),(0,o.kt)("p",null,"Deploy a Metal Gateway in the ",(0,o.kt)("inlineCode",{parentName:"p"},"Internet VLAN")," to break out to the Internet:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Login to the ",(0,o.kt)("a",{parentName:"li",href:"https://console.equinix.com/login"},"Equinix Metal Console"),"."),(0,o.kt)("li",{parentName:"ol"},'Click on the tab "IPs & Networks" and select "IPs".'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Request IP Addresses" button.'),(0,o.kt)("li",{parentName:"ol"},"Select deployment type ",(0,o.kt)("inlineCode",{parentName:"li"},"Public IPv4"),"."),(0,o.kt)("li",{parentName:"ol"},"Select the location where you want to deploy the Metal Gateway."),(0,o.kt)("li",{parentName:"ol"},"Select a quantity/subnet size of at least ",(0,o.kt)("inlineCode",{parentName:"li"},"/29")," or larger."),(0,o.kt)("li",{parentName:"ol"},'Click on the "Submit Request" button.'),(0,o.kt)("li",{parentName:"ol"},'Click on the tab "IPs & Networks" and select "Metal Gateway".'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Create Metal Gateway" button.'),(0,o.kt)("li",{parentName:"ol"},"Select the location of your deployment."),(0,o.kt)("li",{parentName:"ol"},"Choose the VLAN where you want to deploy the Gateway. For example, ",(0,o.kt)("inlineCode",{parentName:"li"},"Internet VLAN"),"."),(0,o.kt)("li",{parentName:"ol"},"Select ",(0,o.kt)("inlineCode",{parentName:"li"},"Public IPv4")," and select the IP range created above."),(0,o.kt)("li",{parentName:"ol"},'Click on the "Create Metal Gateway" button.')),(0,o.kt)("h2",{id:"session-smart-router-deployment"},"Session Smart Router Deployment"),(0,o.kt)("p",null,"Use the following procedure to deploy a Session Smart Router software via the ",(0,o.kt)("a",{parentName:"p",href:"https://console.equinix.com/login"},"Equinix Metal Console"),":"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},'Click on the \u201cServers" tab.'),(0,o.kt)("li",{parentName:"ol"},'Click on one of the reservation options available. Select "On Demand" if you do not need to reserve the server for a committed period of time.'),(0,o.kt)("li",{parentName:"ol"},"Select the desired location for deployment."),(0,o.kt)("li",{parentName:"ol"},"Select one of the server types between the following: ",(0,o.kt)("strong",{parentName:"li"},"c3.medium.x86")),(0,o.kt)("li",{parentName:"ol"},'Select the Operating System by clicking on "All" and then CentOS. Select ',(0,o.kt)("strong",{parentName:"li"},"CentOS 7"),"."),(0,o.kt)("li",{parentName:"ol"},"Select the number of servers to reserve, and provide a name for each."),(0,o.kt)("li",{parentName:"ol"},'Click on the "Deploy Now" button.')),(0,o.kt)("p",null,"After the reservation request is complete, the Public IP address of the management interface of the server is accessible. The Public IP address of the server is displayed in the Equinix Metal Console."),(0,o.kt)("p",null,"SSH into the Public IP address of the server with the following command: "),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ssh root@<Public IP address>")),(0,o.kt)("p",null,"then run the following commands:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yum install wget -y\nwget ftp://ftp.pbone.net/mirror/vault.centos.org/7.5.1804/updates/x86_64/Packages/centos-release-7-5.1804.1.el7.centos.x86_64.rpm\nyum downgrade centos-release-7-5.1804.1.el7.centos.x86_64.rpm -y\nreboot\n")),(0,o.kt)("p",null,"Once the server restarts SSH in again and run the following commands:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo yum install --enablerepo=* http://yum.128technology.com/installer/repo.rpm -y\nsudo yum install dnf -y\nsudo dnf remove tmux -y\nsudo dnf install 128T-installer -y\n")),(0,o.kt)("p",null,"Create the ",(0,o.kt)("inlineCode",{parentName:"p"},"t128")," user and set a password:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo useradd -s /bin/bash t128\nsudo usermod -a -G wheel t128 \nsudo passwd t128\n")),(0,o.kt)("p",null,"When the password has been updated successfully the following message is displayed:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"passwd: all authentication tokens updated successfully")),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Do not proceed to the next step until the password has been updated successfully. The ",(0,o.kt)("inlineCode",{parentName:"p"},"t128")," username and password will now be used to login to the VM for administrative functions, rather than the ",(0,o.kt)("inlineCode",{parentName:"p"},"root")," username."))),(0,o.kt)("p",null,"Launch the installer using the following command:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"sudo install128t")),(0,o.kt)("p",null,"To complete the installation of the Session Smart Router (SSR) software, continue from the step 4 of the ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_installation_installer#manually-installing-using-the-128t-installer"},"Manual Installation procedure"),"."),(0,o.kt)("p",null,"The server restarts at the end of the installation process. Login to the Conductor GUI and use the procedure below (Attaching the L2 Networks to the Server) to configure the Session Smart Router device interfaces."),(0,o.kt)("h3",{id:"attaching-the-l2-networks-to-the-server"},"Attaching the L2 Networks to the Server"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Login to the ",(0,o.kt)("a",{parentName:"li",href:"https://console.equinix.com/login"},"Equinix Metal Console"),"."),(0,o.kt)("li",{parentName:"ol"},'Click on the \u201cServers" tab.'),(0,o.kt)("li",{parentName:"ol"},'Click on the "hostname" of the server.'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Network" tab.'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Convert to Other Network Type" button.'),(0,o.kt)("li",{parentName:"ol"},'Select "Hybrid" and "Unbounded".'),(0,o.kt)("li",{parentName:"ol"},'Click on the "Convert to Hybrid Networking" button.'),(0,o.kt)("li",{parentName:"ol"},'Scroll down to the "Layer 2" section and click the "Add New Vlan" button.'),(0,o.kt)("li",{parentName:"ol"},"Select the network interface ",(0,o.kt)("inlineCode",{parentName:"li"},"eth1")," and select the L2 Network.")),(0,o.kt)("p",null,"Repeat steps 8 and 9 to add all the required VLANs. For example, ",(0,o.kt)("inlineCode",{parentName:"p"},"Internet VLAN")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Peering VLAN"),"."),(0,o.kt)("h3",{id:"network-interfaces-layout"},"Network Interfaces Layout"),(0,o.kt)("p",null,"The network interface layout of the server type ",(0,o.kt)("strong",{parentName:"p"},"c3.medium.x86")," is the following:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Network interface name"),(0,o.kt)("th",{parentName:"tr",align:null},"Subnet"),(0,o.kt)("th",{parentName:"tr",align:null},"PCI Address"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"enp65s0f0"),(0,o.kt)("td",{parentName:"tr",align:null},"Management"),(0,o.kt)("td",{parentName:"tr",align:null},"0000:41:00.0")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"enp65s0f1"),(0,o.kt)("td",{parentName:"tr",align:null},"Public"),(0,o.kt)("td",{parentName:"tr",align:null},"0000:41:00.1")))),(0,o.kt)("h3",{id:"configuration"},"Configuration"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"config\n\n    authority\n\n        router  fm-router\n            name  fm-router\n\n            node  fm-node\n                name              fm-node\n\n                device-interface  private\n                    name               private\n                    pci-address        0000:41:00.1\n\n                    network-interface  peering\n                        name       peering\n                        global-id  1\n                        vlan       128\n\n                        address    192.168.1.10\n                            ip-address     192.168.1.10\n                            prefix-length  24\n                        exit\n                    exit\n\n                    network-interface  internet\n                        name       internet\n                        global-id  2\n                        vlan       129\n\n                        address    147.28.X.X\n                            ip-address     147.28.X.X\n                            prefix-length  29\n                            gateway        147.28.X.X\n                        exit\n                    exit\n                exit\n            exit\n        exit\n    exit\nexit\n")),(0,o.kt)("h2",{id:"appendix"},"Appendix"),(0,o.kt)("h3",{id:"console-access"},"Console Access"),(0,o.kt)("p",null,'There may be times when a server becomes unreachable over SSH due to broken networking, a bad install, misconfiguration, a kernel upgrade, bad firewall rules, etc. Equinix Metal\u2122 offers an out-of-band console called "SOS" - which stands for Serial Over SSH. Refer to the ',(0,o.kt)("a",{parentName:"p",href:"https://metal.equinix.com/developers/docs/resilience-recovery/serial-over-ssh/"},"SOS - Serial Over SSH")," documentation for additional information."))}d.isMDXComponent=!0},24310:function(e,t,n){t.Z=n.p+"assets/images/platforms_equinix_metal_logo-08b7fee4b2659da1d33c0127783548b6.png"}}]);