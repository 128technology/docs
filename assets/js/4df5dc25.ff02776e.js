"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[1597],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return f}});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=l(t),f=o,m=u["".concat(c,".").concat(f)]||u[f]||p[f]||a;return t?r.createElement(m,i(i({ref:n},d),{},{components:t})):r.createElement(m,i({ref:n},d))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},13255:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var r=t(87462),o=t(63366),a=(t(67294),t(3905)),i=["components"],s={title:"Dynamic Host Configuration Protocol (DHCP)",sidebar_label:"DHCP"},c=void 0,l={unversionedId:"config_dhcp",id:"config_dhcp",title:"Dynamic Host Configuration Protocol (DHCP)",description:"The Dynamic Host Configuration Protocol (DHCP) is a network management protocol used on IP networks whereby a DHCP server dynamically assigns an IP address and other network configuration parameters to each device on a network so they can communicate with other IP networks.",source:"@site/docs/config_dhcp.md",sourceDirName:".",slug:"/config_dhcp",permalink:"/docs/config_dhcp",draft:!1,tags:[],version:"current",lastUpdatedAt:1707314492,formattedLastUpdatedAt:"Feb 7, 2024",frontMatter:{title:"Dynamic Host Configuration Protocol (DHCP)",sidebar_label:"DHCP"},sidebar:"docs",previous:{title:"Link Aggregation and LACP",permalink:"/docs/config_lacp"},next:{title:"Dual Node High Availability",permalink:"/docs/config_ha"}},d={},p=[{value:"Basic Configuration",id:"basic-configuration",level:2},{value:"Vendor-Specific Information DHCP Options",id:"vendor-specific-information-dhcp-options",level:3},{value:"Configuration",id:"configuration",level:4},{value:"Troubleshooting",id:"troubleshooting",level:2}],u={toc:p};function f(e){var n=e.components,s=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,s,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The ",(0,a.kt)("strong",{parentName:"p"},"Dynamic Host Configuration Protocol")," (",(0,a.kt)("strong",{parentName:"p"},"DHCP"),") is a network management protocol used on IP networks whereby a DHCP server dynamically assigns an IP address and other network configuration parameters to each device on a network so they can communicate with other IP networks."),(0,a.kt)("p",null,"The DHCP protocol provides a mechanism for unprovisioned hosts to request an IP-address and configuration via broadcast requests. Based on available address pools, a DHCP server can provide a DHCP client a time-limited IP address \u201clease\u201d."),(0,a.kt)("p",null,"When running in a HA configuration with two nodes, only one of the nodes will actively operate as a DHCP server for those intererfaces that are shared between both systems. Client lease information is sychronized between nodes to ensure that upon link or node failure, the newly active DHCP server will operate with the same information."),(0,a.kt)("admonition",{type:"important"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The same interface configured as a DHCP server cannot also be configured for DHCP relay.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The DHCP server cannot itself reside on an interface that is configured as a DHCP client.")))),(0,a.kt)("p",null,"For supporting information and DHCP configuration Best Practices, please refer to the ",(0,a.kt)("a",{parentName:"p",href:"/docs/bcp_dhcp_relay_overview"},"DHCP Relay Best Practices Guide.")),(0,a.kt)("h2",{id:"basic-configuration"},"Basic Configuration"),(0,a.kt)("p",null,"A DHCP Server is configured on the ",(0,a.kt)("em",{parentName:"p"},"network-interface")," as a ",(0,a.kt)("em",{parentName:"p"},"host-service")," of type ",(0,a.kt)("inlineCode",{parentName:"p"},"dhcp-server"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"network-interface    intf4\n    name        intf4\n    global-id   4\n    vlan        4\n    type        external\n    source-nat  false\n    mtu         9216\n\n    address     172.16.4.1\n        ip-address     172.16.4.1\n        prefix-length  24\n\n        host-service   dhcp-server\n            service-type    dhcp-server\n            server-name     128TDhcpServer4\n            max-lease-time  10\n\n            address-pool    172.16.4.161\n                start-address  172.16.4.161\n                domain-server  4.4.4.4\n                domain-name    www.128technology.com\n            exit\n        exit\n    exit\nexit\n")),(0,a.kt)("p",null,"The DHCP server supports setting custom options per ",(0,a.kt)("em",{parentName:"p"},"dhcp-server")," instance.  Custom options are configured as type-value pairs."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"custom             4\n  code   4\n  descriptime time-server\n  value  4.4.4.4\nexit\n")),(0,a.kt)("p",null,"Static reservations are supported.  When configuring a static assignment within an address pool, the lease will inherit the attributes of the pool (typically this would be the ",(0,a.kt)("em",{parentName:"p"},"router")," and ",(0,a.kt)("em",{parentName:"p"},"domain-server"),").  If you desire to override any of the attributes of the DHCP pool, these can be configured uniquely per static assignment."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"address-pool       192.168.0.20\n    start-address      192.168.0.20\n    end-address        192.168.0.200\n    router             192.168.0.1\n    domain-server      192.168.0.1\n\n    static-assignment  192.168.0.5\n        address             192.168.0.5\n        link-layer-address  77:88:CC:00:22:11\n        domain-server       1.1.1.1\n    exit\nexit\n")),(0,a.kt)("h3",{id:"vendor-specific-information-dhcp-options"},"Vendor-Specific Information DHCP Options"),(0,a.kt)("p",null,"Being deployed as a router requires the SSR platform to successfully interoperate with a myriad of network elements.  These elements can change from customer to customer and use case to use case.  To ensure interoperability between these network elements it can become necessary to support Options and Vendor Extensions on top of base functional support."),(0,a.kt)("p",null,"The two supported Vendor-Specific Information are:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Vendor-Specific Information Option ",(0,a.kt)("a",{parentName:"li",href:"https://tools.ietf.org/html/rfc2132#section-8.4"},"RFC 2132")),(0,a.kt)("li",{parentName:"ol"},"Vendor-Identifying Vendor-Specific Information Option ",(0,a.kt)("a",{parentName:"li",href:"https://tools.ietf.org/html/rfc3925#section-4"},"RFC 3925"))),(0,a.kt)("h4",{id:"configuration"},"Configuration"),(0,a.kt)("p",null,"Two new configuration objects have added to the ",(0,a.kt)("inlineCode",{parentName:"p"},"dhcp-server")," object: ",(0,a.kt)("inlineCode",{parentName:"p"},"vendor-specific-information")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"vendor-indentifying-vendor-specific-information"),"."),(0,a.kt)("p",null,"An example ",(0,a.kt)("inlineCode",{parentName:"p"},"vendor-specific-information")," DHCP option is shown below:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Code 72"),", AP Controller Type")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"}," network-interface dhcp-server-intf\n     name dhcp-server-intf\n     ...\n     address 192.168.1.1\n         ...\n         host-service dhcp-server\n             service-type dhcp-server\n             server-name my-dhcp-server\n             max-lease-time 3600\n             address-pool 192.168.1.100\n                 ...\n                 vendor-specific-information 72\n                     code 72\n                     description AP Controller Type\n                     value 1\n                     encoded-type uint8\n                     quantity singular\n                 exit\n                 ...\n             exit\n         exit\n     exit\n exit\n")),(0,a.kt)("p",null,"An example of two ",(0,a.kt)("inlineCode",{parentName:"p"},"vendor-identifying vendor-specific information")," DHCP options are shown below:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Code 72"),", Enterprise-Number 122 (SONY), PS Server Addresses"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Code 72"),", Enterprise-Number 311 (Microsoft), Enable/Disable xBox Live")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"network-interface dhcp-server-intf\n     name dhcp-server-intf\n     ...\n     address 192.168.1.1\n         ...\n         host-service dhcp-server\n             service-type dhcp-server\n             server-name my-dhcp-server\n             max-lease-time 3600\n             address-pool 192.168.1.100\n                 ...\n                 vendor-identifying-vendor-specific-information 122 72\n                     description AP Controller addresses\n                     code 72\n                     enterprise-number 122\n                     description PS Server Addresses\n                     value 10.1.1.1\n                     value 10.1.1.2\n                     encoded-type ipv4-address\n                     quantity array\n                 exit\n                 vendor-identifying-vendor-specific-information 311 72\n                     description AP Controller addresses\n                     code 72\n                     enterprise-number 311\n                     description Enable/Disable xBox Live\n                     value false\n                     encoded-type boolean\n                     quantity singular\n                 exit\n                 ...\n             exit\n         exit\n     exit\n exit\n")),(0,a.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,a.kt)("p",null,"From within the PCLI, you can execute ",(0,a.kt)("a",{parentName:"p",href:"/docs/cli_reference#show-network-interface-application"},"show network-interface application")," to show statistics related to the DHCP server as well as any active DHCP client leases."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"admin@gouda.novigrad# show network-interface application\nTue 2020-04-21 15:26:19 UTC\n\n====================================================================================================\n Application Data\n====================================================================================================\n\n Interface:                                    gouda:wan-interface\n state:                                        Interface not configured for any managed application\n\n Interface:                                    gouda:lan-interface\n dhcp-server:\n     kea-status:\n       active (running/success) since Sat 2020-04-11 12:57:23 UTC\n     kea-ctrl-status:\n       active (running/success) since Sat 2020-04-11 12:57:23 UTC\n     metrics:\n         declined-addresses:                   0\n         pkt4-ack-sent:                        1900\n         pkt4-discover-received:               403\n         pkt4-inform-received:                 469\n         pkt4-offer-sent:                      403\n         pkt4-received:                        2317\n         pkt4-release-received:                2\n         pkt4-request-received:                1443\n         pkt4-sent:                            2303\n         reclaimed-declined-addresses:         0\n         reclaimed-leases:                     13\n         subnet[1].assigned-addresses:         24\n         subnet[1].declined-addresses:         0\n         subnet[1].reclaimed-declined-addresses:0\n         subnet[1].reclaimed-leases:           13\n         subnet[1].total-addresses:            181\n     subnets:\n         subnet:\n           current-lease-count:                24\n           current-leases:\n               lease:\n                 client-last-transaction-time: 2020-04-21 15:26:12\n                 hostname:                     homecomtsiphone\n                 hw-address:                   70:3c:69:58:01:28\n                 ip-address:                   192.168.0.36\n                 valid-lifetime:               86400\n           subnet:                             192.168.0.1/24\n\n           ...\n\n     ha-heartbeat:\n       role:                                   primary\n       state:                                  standalone\n\n Interface:                                    gouda:lan-untrusted\n state:                                        Interface not configured for any managed application\n\n Interface:                                    gouda:mgmt-interface\n state:                                        Interface not configured for any managed application\n\nCompleted in 0.76 seconds\n")),(0,a.kt)("p",null,"Active client lease management can be seen in the GUI by navigating to Router > Node > DHCP Server.  It is also from within this interface that you can selectively revoke a client lease.\n",(0,a.kt)("img",{alt:"config_dhcp_1",src:t(14816).Z,width:"1396",height:"951"})))}f.isMDXComponent=!0},14816:function(e,n,t){n.Z=t.p+"assets/images/config_dhcp_1-db8838acfd05d9a50099dde99dd49e27.png"}}]);