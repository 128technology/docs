"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2029],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return u}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),d=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=d(e.components);return r.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=d(t),u=a,m=f["".concat(s,".").concat(u)]||f[u]||p[u]||o;return t?r.createElement(m,i(i({ref:n},l),{},{components:t})):r.createElement(m,i({ref:n},l))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var d=2;d<o;d++)i[d]=t[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},21906:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return l},default:function(){return f}});var r=t(87462),a=t(63366),o=(t(67294),t(3905)),i=["components"],c={title:"Non-forwarding HA Interfaces",sidebar_label:"Non-forwarding HA Interfaces"},s=void 0,d={unversionedId:"config_non_forwarding_ha_interfaces",id:"config_non_forwarding_ha_interfaces",title:"Non-forwarding HA Interfaces",description:"Non forwarding interfaces are used for several purposes, including HA peer node control traffic, reaching a 128T Conductor from a 128T Router, reaching managed 128T Routers from a 128T Conductor, management traffic and reaching the public internet.",source:"@site/docs/config_non_forwarding_ha_interfaces.md",sourceDirName:".",slug:"/config_non_forwarding_ha_interfaces",permalink:"/docs/config_non_forwarding_ha_interfaces",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Non-forwarding HA Interfaces",sidebar_label:"Non-forwarding HA Interfaces"},sidebar:"docs",previous:{title:"Dual Router High Availability and VRRP",permalink:"/docs/config_ha_vrrp"},next:{title:"Adding Interfaces to HA Team Interface",permalink:"/docs/config_adding_interfaces_to_ha_team"}},l=[],p={toc:l};function f(e){var n=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Non forwarding interfaces are used for several purposes, including HA peer node control traffic, reaching a 128T Conductor from a 128T Router, reaching managed 128T Routers from a 128T Conductor, management traffic and reaching the public internet."),(0,o.kt)("p",null,"Before we get started, it is important to understand the ",(0,o.kt)("a",{parentName:"p",href:"/docs/concepts_interface_types"},"terminology relating to 128T interfaces")),(0,o.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Changing a forwarding interface to non forwarding and vice versa is not dynamically reconfigurable and requires a restart of the 128T node"))),(0,o.kt)("p",null,"A quick recap:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"External")," interfaces are not used for any control traffic to the node's HA peer and the user has no limit to how many ",(0,o.kt)("inlineCode",{parentName:"p"},"external")," interfaces they configure. A user may configure either one ",(0,o.kt)("inlineCode",{parentName:"p"},"fabric")," or one ",(0,o.kt)("inlineCode",{parentName:"p"},"shared")," interface per node, and that interface will be used for all HA control traffic."),(0,o.kt)("p",null,"This example will configure an interface to be used to establish connectivity between HA peers. To configure a non-forwarding interface, set the ",(0,o.kt)("inlineCode",{parentName:"p"},"forwarding")," flag to ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),". This example uses a ",(0,o.kt)("inlineCode",{parentName:"p"},"device-interface")," set to type ",(0,o.kt)("inlineCode",{parentName:"p"},"ethernet"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"node    T116_DUT1\n    name                      T116_DUT1\n\n    device-interface          control\n        name               control\n        type               ethernet\n        pci-address        0000:00:04.0\n        forwarding         false\n")),(0,o.kt)("p",null,"The next step is to add a ",(0,o.kt)("inlineCode",{parentName:"p"},"network-interface"),". Start by creating a ",(0,o.kt)("inlineCode",{parentName:"p"},"fabric")," interface to reach the HA peer node.  ",(0,o.kt)("inlineCode",{parentName:"p"},"fabric")," was chosen in this situation because the HA nodes are directly connected:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"node    T127_DUT1\n    name                      T127_DUT1\n\n    device-interface          control\n        name               control\n        type               ethernet\n        pci-address        0000:00:04.0\n        forwarding         false\n\n        network-interface  peer-fabric-intf\n            name       peer-fabric-intf\n            type       fabric\n\n            address    172.16.1.1\n                ip-address     172.16.1.1\n                prefix-length  24\n                gateway        172.16.1.201\n            exit\n        exit\n    exit\nexit\n")),(0,o.kt)("p",null,"This interface is needed to establish connectivity to the HA peer node. A similar ",(0,o.kt)("inlineCode",{parentName:"p"},"fabric")," interface is required on each node of the HA pair."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"node    T127_DUT2\n    name                      T127_DUT2\n\n    device-interface          control\n        name               control\n        type               ethernet\n        pci-address        0000:00:04.0\n        forwarding         false\n\n        network-interface  peer-fabric-intf\n            name       peer-fabric-intf\n            type       fabric\n\n            address    172.16.1.2\n                ip-address     172.16.1.2\n                prefix-length  24\n                gateway        172.16.1.201\n            exit\n        exit\n    exit\nexit\n")),(0,o.kt)("p",null,"At this point, it may be a good time to commit the configuration."),(0,o.kt)("p",null,"The interfaces created within the 128T configuration will manage corresponding interfaces in Linux. 128T will dynamically update all SSH tunnels which are used to send control traffic to the peer node."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::f816:3eff:fe4c:5ebe  prefixlen 64  scopeid 0x20<link>\n        ether fa:16:3e:4c:5e:be  txqueuelen 1000  (Ethernet)\n        RX packets 5581689  bytes 1057148542 (1008.1 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 5818989  bytes 1002306918 (955.8 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nteam-eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 172.16.1.1  netmask 255.255.255.0  broadcast 172.16.1.255\n        inet6 fe80::f816:3eff:fe4c:5ebe  prefixlen 64  scopeid 0x20<link>\n        ether fa:16:3e:4c:5e:be  txqueuelen 1000  (Ethernet)\n        RX packets 5544219  bytes 977056448 (931.7 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 5777931  bytes 979222766 (933.8 MiB)\n        TX errors 0  dropped 2 overruns 0  carrier 0  collisions 0\n")),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},'The first time a non-forwarding interface is configured and 128T "takes over" the Linux interfaces, a backup of all the previous ifcfg scripts will be created at ',(0,o.kt)("inlineCode",{parentName:"p"},"/var/run/128technology/network-script-backups.tar.gz"),"."))),(0,o.kt)("p",null,"Notice the interfaces are configured as network team because the type was set to ",(0,o.kt)("inlineCode",{parentName:"p"},"fabric"),". If instead the type was set to ",(0,o.kt)("inlineCode",{parentName:"p"},"shared")," then interface ",(0,o.kt)("inlineCode",{parentName:"p"},"eth1")," would have been configured directly with the static IP address."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Upon committing configuration changing the control IP addresses, it can take up to ",(0,o.kt)("strong",{parentName:"p"},"two minutes")," for the node to reconnect internally or reconnect to its HA peer node. This delay happens because 128T is waiting for the TCP state machine to close existing connections.  Don't panic.  Just sit tight and wait for everything to reconnect."))),(0,o.kt)("p",null,"While this example showcases peering with a HA node on a conductor, the configuration and operations are identical for a router."),(0,o.kt)("p",null,"Run ",(0,o.kt)("inlineCode",{parentName:"p"},"show system connectivity")," to ensure that both nodes are connected."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"admin@T127_DUT1.Conductor# show system connectivity\nWed 2019-02-13 16:09:06 UTC\n\n===================== ===================== ==============\n Local Node            Remote Node           State\n===================== ===================== ==============\n T127_DUT1.Conductor   T127_DUT2.Conductor   connected\n\nCompleted in 0.11 seconds\n")),(0,o.kt)("p",null,"Run ",(0,o.kt)("inlineCode",{parentName:"p"},"show system connectivity internal")," to confirm that the internal processes are communicating with each other."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"admin@T127_DUT1.Conductor# show system connectivity internal\nWed 2019-02-13 16:09:30 UTC\n\n===================== ===================== ================= ================= ===========\n Local Node            Remote Node           Service           Address           Message\n===================== ===================== ================= ================= ===========\n T127_DUT1.Conductor   T127_DUT1.Conductor   Zookeeper         127.0.0.1:4370    Connected\n T127_DUT1.Conductor   T127_DUT1.Conductor   ssc               127.0.0.2:12222   Connected\n T127_DUT1.Conductor   T127_DUT1.Conductor   step-repository   127.0.0.2:15555   Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   Internal SSH      127.0.0.1:932     Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   LeaderElect       127.0.0.1:2225    Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   Quorum            127.0.0.1:2224    Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   ZED               127.0.0.1:4392    Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   Zookeeper         127.0.0.1:4371    Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   influx-rpc        127.0.0.3:8088    Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   ssc               127.0.0.3:12222   Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   step-repository   127.0.0.3:15555   Connected\n T127_DUT1.Conductor   T127_DUT2.Conductor   tank              127.0.0.3:11011   Connected\n")),(0,o.kt)("p",null,"Now that connectivity has been fully established between HA peer nodes, it is useful to configure some external management interfaces. This example will create an ",(0,o.kt)("inlineCode",{parentName:"p"},"external")," Ethernet interface using ",(0,o.kt)("inlineCode",{parentName:"p"},"DHCPv4"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"device-interface          mgmt\n    name               mgmt\n    type               ethernet\n    pci-address        0000:00:03.0\n    forwarding         false\n\n    network-interface  ext-mgmt-intf\n        name               ext-mgmt-intf\n        type               external\n        default-route      true\n\n        management-vector\n            name      ext-mgmt-vector\n            priority  100\n        exit\n        dhcp               v4\n    exit\nexit\n")),(0,o.kt)("p",null,"Notice that some additional fields were configured. The ",(0,o.kt)("inlineCode",{parentName:"p"},"default-route")," is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),".  This instructs Linux to set this external interface as the default route for all traffic. Secondly, a ",(0,o.kt)("inlineCode",{parentName:"p"},"management-vector")," was configured.  This is required when setting the ",(0,o.kt)("inlineCode",{parentName:"p"},"default-route")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),". The user is allowed to define multiple interfaces as the ",(0,o.kt)("inlineCode",{parentName:"p"},"default-route"),", so the ",(0,o.kt)("inlineCode",{parentName:"p"},"management-vector")," is used to define the priority of all interfaces which are set as the default route."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If you configure the interface that is currently being used to connect to 128T as an ",(0,o.kt)("inlineCode",{parentName:"p"},"external")," interface, you will notice your connection hang for a few moments while 128T takes over the interface after the config is committed. Once the commit is complete you will notice the interface's ifcfg script has been updated:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"[root@t127-dut1 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0\nBOOTPROTO=dhcp\nDEFROUTE=yes\nDEVICE=eth0\nMETRIC=100\nMTU=1500\nNM_CONTROLLED=no\nONBOOT=yes\nTYPE=Ethernet\nUSERCTL=no\n")),(0,o.kt)("p",null,"The goal of this functionality is to eliminate the need for administrators to have to drop to the Linux shell to manually configure interfaces. A configuration field name ",(0,o.kt)("inlineCode",{parentName:"p"},"ifcfg-option")," was added to the ",(0,o.kt)("inlineCode",{parentName:"p"},"network-interface")," to allow super users to add any config field directly to an ifcfg script that 128T currently does not support. 128T does validate that the user is not trying to configure any options that 128T already configures to avoid creating conflicts with 128T settings. An example is firewalld zones.  Perhaps this external interface needs to be configured as a trusted interface."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"network-interface  ext-mgmt-intf\n    name               ext-mgmt-intf\n    global-id          5\n    type               external\n    default-route      true\n\n    management-vector\n        name      ext-mgmt-vector\n        priority  100\n    exit\n    dhcp               v4\n\n    ifcfg-option       ZONE\n        name   ZONE\n        value  trusted\n    exit\nexit\n")),(0,o.kt)("p",null,"Upon committing this configuration you will see the ifcfg script get updated with the new value."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"[root@t127-dut1 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0\nBOOTPROTO=dhcp\nDEFROUTE=yes\nDEVICE=eth0\nMETRIC=100\nMTU=1500\nNM_CONTROLLED=no\nONBOOT=yes\nTYPE=Ethernet\nUSERCTL=no\nZONE=trusted\n")))}f.isMDXComponent=!0}}]);