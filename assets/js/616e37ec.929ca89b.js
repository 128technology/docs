"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[8474],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return f}});var o=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=o.createContext({}),s=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=s(e.components);return o.createElement(c.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},d=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=s(t),f=r,m=d["".concat(c,".").concat(f)]||d[f]||l[f]||i;return t?o.createElement(m,a(a({ref:n},u),{},{components:t})):o.createElement(m,a({ref:n},u))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=d;var p={};for(var c in n)hasOwnProperty.call(n,c)&&(p[c]=n[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,a[1]=p;for(var s=2;s<i;s++)a[s]=t[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},75213:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var o=t(87462),r=t(63366),i=(t(67294),t(3905)),a=["components"],p={title:"Configuring PPPoE",sidebar_label:"Configuring PPPoE"},c=void 0,s={unversionedId:"howto_config_PPPoE",id:"howto_config_PPPoE",title:"Configuring PPPoE",description:"Configuration",source:"@site/docs/howto_config_PPPoE.md",sourceDirName:".",slug:"/howto_config_PPPoE",permalink:"/docs/howto_config_PPPoE",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Configuring PPPoE",sidebar_label:"Configuring PPPoE"},sidebar:"docs",previous:{title:"LTE and Dual LTE Configuration",permalink:"/docs/howto_lte"},next:{title:"VLAN Support on PPPoE",permalink:"/docs/howto_pppoe_vlan"}},u=[{value:"Configuration",id:"configuration",children:[{value:"Configure a PPPoE Interface",id:"configure-a-pppoe-interface",children:[],level:3},{value:"Configure Dual PPPoE Interfaces",id:"configure-dual-pppoe-interfaces",children:[],level:3},{value:"Reconnection Timer",id:"reconnection-timer",children:[{value:"Connection Status using Linux",id:"connection-status-using-linux",children:[],level:4}],level:3}],level:2}],l={toc:u};function d(e){var n=e.components,t=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"Use the following examples to configure PPPoE."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"PPPoE interfaces are natively Linux interfaces. The SSR uses a set of scripts (running in Linux) to manage the PPPoE interface and leverages KNI, iptable rules, and network namespace to exchange packets with the PPPoE interface."))),(0,i.kt)("h3",{id:"configure-a-pppoe-interface"},"Configure a PPPoE Interface"),(0,i.kt)("p",null,"Use the following example to configure a PPPoE interface."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"device-interface pppoe-dev-0\n    name pppoe-dev-0\n    type pppoe\n    target-interface eth0\n    pppoe\n        user-name user1\n        password passw0rd1\n        authentication-protocol chap\n    exit\n    network-interface pppoe-intf-0\n        name pppoe-intf-0\n        source-nat true\n    exit\nexit\n")),(0,i.kt)("h3",{id:"configure-dual-pppoe-interfaces"},"Configure Dual PPPoE Interfaces"),(0,i.kt)("p",null,"Support for multiple PPPoE interfaces on a single node is configured as follows."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"device-interface pppoe-dev-1\n    name pppoe-dev-1\n    type pppoe\n    target-interface eth1\n    pppoe\n        user-name user1\n        password passw0rd1\n        authentication-protocol chap\n    exit\n    network-interface pppoe-intf-1\n        name pppoe-intf-1\n        source-nat true\n    exit\nexit\ndevice-interface pppoe-dev-2\n    name pppoe-dev-2\n    type pppoe\n    target-interface eth2\n    pppoe\n        user-name user2\n        password passw0rd2\n        authentication-protocol chap\n    exit\n    network-interface pppoe-intf-2\n        name pppoe-intf-2\n        source-nat true\n    exit\nexit\n")),(0,i.kt)("p",null,"In the event of a disconnection, the ",(0,i.kt)("inlineCode",{parentName:"p"},"failure")," section of ",(0,i.kt)("inlineCode",{parentName:"p"},"show device-interface")," displays the ",(0,i.kt)("inlineCode",{parentName:"p"},"ppd-exit-code")," and the ",(0,i.kt)("inlineCode",{parentName:"p"},"ppd-exit-reason"),". The example below shows an authentication failure."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"*admin@test1.Fabric128# show device-interface name pppoe-new\nFri 2020-05-15 17:29:02 UTC\n=========================================================================\n test1:pppoe-new\n=========================================================================\n Type:                pppoe\n Forwarding:          true\n Mode:                host\n MAC Address:         4e:b1:12:11:9e:fd\n Admin Status:        up\n Operational Status:  down\n Redundancy Status:   non-redundant\n Speed:               0\n Duplex:              unknown\n in-octets:                        2942\n in-unicast-pkts:                    44\n in-errors:                           0\n out-octets:                       1050\n out-unicast-pkts:                   25\n out-errors:                          0\n Error:\n   PPPoE State:\n     connection-status:ppp2 does not exist\n     failure:\n       attempt:       2\n       last-failure-time:Fri May 15 17:28:17 2020\n       next-retry-time:Fri May 15 17:33:17 2020\n       pppd-exit-code:19\n       pppd-exit-reason:We failed to authenticate ourselves to the peer.\nCompleted in 0.12 seconds \n")),(0,i.kt)("h3",{id:"reconnection-timer"},"Reconnection Timer"),(0,i.kt)("p",null,"In situations where there are several connection attempts (for example, consecutive authenication failures), logic is used to back off the reconnect attempts on specific failure codes. Failure codes and the intervals between reconnection attempts are configurable. Use the JSON file ",(0,i.kt)("inlineCode",{parentName:"p"},"/var/lib/128technology/pppoe/{ppp<giid>}.init")," to specify the exit codes and adjust interval times. The defaults are shown in the example below. "),(0,i.kt)("p",null,"After the first authentication failure (for pppd exit code 19), the intervals between each subsequent reconnect attempt will be 60s (1min), 300s (5min), 600s (10min), 1200s (20min), 2400s (40min), and 3600s (1hr). If the reconnect attempts continue after the sixth failure, the same interval time is used (3600s)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'{\n    "backoff-intervals": [60, 300, 600, 1200, 2400, 3600],\n    "pppd-exit-codes": [19],\n}\n')),(0,i.kt)("h4",{id:"connection-status-using-linux"},"Connection Status using Linux"),(0,i.kt)("p",null,"When the SSR is not running and the PPPoE connection is managed by linux, a ",(0,i.kt)("inlineCode",{parentName:"p"},"pppoe-state")," utility is used to return the connection status. To use the utility, run ",(0,i.kt)("inlineCode",{parentName:"p"},"pppoe-state ppp<giid>")," as shown below."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'[root@t189-dut1 ~]# pppoe-state ppp2\n{\n    "PPPoE State": {\n        "RX-OK": "7",\n        "TX-OVR": "0",\n        "Iface": "ppp2",\n        "TX-OK": "7",\n        "prefix": "32",\n        "MTU": "1492",\n        "RX-ERR": "0",\n        "TX-DRP": "0",\n        "TX-ERR": "0",\n        "RX-DRP": "0",\n        "address": "172.16.100.2",\n        "peer": "172.16.100.1",\n        "Flags": "PPP, RUNNING, PROMISCUOUS, UP, NOARP",\n        "RX-OVR": "0"\n    }\n}\n')))}d.isMDXComponent=!0}}]);