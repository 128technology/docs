"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5492],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=i.createContext({}),l=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return i.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},y=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),y=l(n),u=r,h=y["".concat(c,".").concat(u)]||y[u]||p[u]||a;return n?i.createElement(h,o(o({ref:t},d),{},{components:n})):i.createElement(h,o({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=y;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<a;l++)o[l]=n[l];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}y.displayName="MDXCreateElement"},44683:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var i=n(87462),r=n(63366),a=(n(67294),n(3905)),o=["components"],s={title:"Security Policies",sidebar_label:"Security Policies"},c=void 0,l={unversionedId:"sec_security_policy",id:"sec_security_policy",title:"Security Policies",description:"The Session Smart Router - or SSR, should have been called the SSSR for Secure Session Smart Router, but folks in tech love TLAs. By design, the SSR will only forward packets to a destination upon creation of a policy. Once a routed path exists within the network, it is important to ensure that the payload is encrypted to keep data safe. Even though more and more traffic is being natively encrypted, there is still content that is sent over untrusted networks without encryption, or without the additional layers of encryption necessary to thwart bad actors. The SSR offers a policy-driven approach to defining the level of encryption needed per service and per path.",source:"@site/docs/sec_security_policy.md",sourceDirName:".",slug:"/sec_security_policy",permalink:"/docs/sec_security_policy",draft:!1,tags:[],version:"current",lastUpdatedAt:1707314492,formattedLastUpdatedAt:"Feb 7, 2024",frontMatter:{title:"Security Policies",sidebar_label:"Security Policies"},sidebar:"docs",previous:{title:"Customizable Firewall Rules and Filters",permalink:"/docs/sec_firewall_filtering"},next:{title:"Intrusion Detection and Prevention",permalink:"/docs/concepts_ssr_idp"}},d={},p=[{value:"HMAC",id:"hmac",level:3},{value:"Payload Encryption",id:"payload-encryption",level:3},{value:"Best Practices",id:"best-practices",level:3},{value:"Changing a Security Policy",id:"changing-a-security-policy",level:2}],y={toc:p};function u(e){var t=e.components,s=(0,r.Z)(e,o);return(0,a.kt)("wrapper",(0,i.Z)({},y,s,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Session Smart Router - or SSR, should have been called the SSSR for Secure Session Smart Router, but folks in tech love TLAs. By design, the SSR will only forward packets to a destination upon creation of a policy. Once a routed path exists within the network, it is important to ensure that the payload is encrypted to keep data safe. Even though more and more traffic is being natively encrypted, there is still content that is sent over untrusted networks without encryption, or without the additional layers of encryption necessary to thwart bad actors. The SSR offers a policy-driven approach to defining the level of encryption needed per service and per path."),(0,a.kt)("p",null,"While there are many aspects to security, the focus of this document is the security of payload and metadata encryption between SSRs."),(0,a.kt)("p",null,"Metadata is encrypted and decrypted between SSR routers, but payload encryption is performed end-to-end. This is illustrated in a multi-hop router deployment by the image below."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"End-to-end encryption and decryption",src:n(66342).Z,width:"751",height:"168"})),(0,a.kt)("h3",{id:"hmac"},"HMAC"),(0,a.kt)("p",null,"HMAC signatures, appended to the end of a packet's payload, guarantee the contents of each packet have not been changed, and that the peering router is known and trusted by the receiver. While possible, it is not recommended to disable HMAC between SSRs, as it will prevent middle-man attempts to corrupt or impact active sessions."),(0,a.kt)("p",null,"Timed Based HMAC signatures can be used to protect SVR pathways against replay attacks. Upon initiation of every session, a Session HMAC Key is created. The Session HMAC Keys persist for the life of a session and deployments not change. Time-based HMAC signatures change at a specified interval."),(0,a.kt)("h3",{id:"payload-encryption"},"Payload Encryption"),(0,a.kt)("p",null,'The SSR uses industry hardened AES encryption ciphers that rely on the use of an encryption key and an initialization vector (IV). The IV is used to "prime the session" as a unique IV is generated per packet, allowing encryption to be stateless.\nWhen creating a new security policy within the SSR, the SSR will automatically generate random values for the key and IV and store them securely within the device. It is not recommended to manually supply values for these attributes as this ',(0,a.kt)("em",{parentName:"p"},"may")," compromise the security of the network."),(0,a.kt)("p",null,"There are three locations where security policies can be defined:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The security policy defined in the ",(0,a.kt)("inlineCode",{parentName:"li"},"service > security-policy")," serves to encrypt and decrypt the payload of packets within a session. The encryption keys and algorithms defined at the service are always symmetric between SSR nodes."),(0,a.kt)("li",{parentName:"ul"},"A security policy can be defined in ",(0,a.kt)("inlineCode",{parentName:"li"},"network-interface > inter-router-security"),". This security policy defines how metadata are ",(0,a.kt)("strong",{parentName:"li"},"decrypted")," for SVR traffic received on the respective interface."),(0,a.kt)("li",{parentName:"ul"},"A security policy can be defined on ",(0,a.kt)("inlineCode",{parentName:"li"},"network-interface > adjacency > inter-router-security"),". The security policy associated with the adjacency defines what keys and ",(0,a.kt)("strong",{parentName:"li"},"encryption")," algorithms are used for encrypting metadata (and hmac signing packets) sent to an SVR peer."),(0,a.kt)("li",{parentName:"ul"},"A security policy can be defined in ",(0,a.kt)("inlineCode",{parentName:"li"},"router > inter-node-security"),". This security policy defines the encryption of metadata (and hmac signing packets) for HA interfaces used for inter-node communication.")),(0,a.kt)("h3",{id:"best-practices"},"Best Practices"),(0,a.kt)("p",null,"The SSR affords you the ability to provision a unique security policy per service. However, in a typical hub-and-spoke topology, a single security policy can be shared among all services, with a separate security policy used for metadata encryption and authentication."),(0,a.kt)("p",null,"HA interfaces between SSR nodes are directly connected between nodes and therefore pose no risk of interception. Given the additional computational cost of encrypting and decrypting traffic, it is recommended to apply a security policy to ",(0,a.kt)("inlineCode",{parentName:"p"},"inter-node-security")," with encryption and hmac disabled for this purpose."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'        security  encrypt-hmac-disabled\n            name                 encrypt-hmac-disabled\n            description          "Encryption and message authentication disabled"\n            hmac-cipher          sha256\n            hmac-key             (removed)\n            encryption-cipher    aes-cbc-128\n            encryption-key       (removed)\n            encryption-iv        (removed)\n            encrypt              false\n            hmac-mode            disabled\n            adaptive-encryption  false\n        exit\n')),(0,a.kt)("h2",{id:"changing-a-security-policy"},"Changing a Security Policy"),(0,a.kt)("p",null,"Changing a security policy is a service impacting event as it is not possible to alter security keys and encryption ciphers for existing flows. Care must be taken to understand the blast radius of these changes. It goes without saying, you must understand the security policy that needs to change and how it is being used for services and peer paths. If altering the global security policy that is used for all services, all traffic will be impacted. Changing a security policy should always be performed during a maintenance window after fully understanding the overall impact to the environment. Due to the fact that sessions are not terminated on security policy change, the best course of action is to ",(0,a.kt)("strong",{parentName:"p"},"reboot all the routers where traffic flows through the SSR with a security policy change has been made"),"."),(0,a.kt)("p",null,"The best approach to making any change to a security policy is to create a new policy, with a new name, and apply it to the respective service, interface, or adjacency. This affords network administrators the ability to readily identify sessions that may not have adopted the new policy.\nAfter applying the change, be sure to restart the SSR on any routers that share the same security policy to clear any active sessions. After the SSR has restarted, ensure that traffic is traversing the service as expected:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"admin@node0.0200017bb97d# show service contains-service-name any\nWed 2023-11-15 17:25:55 UTC\n\u2714 Retrieving service information...\n\n========= =========== =========== ================ ================ ======= ========== ============== ==============\n Service   Prefixes    Transport   Tenant Allowed   Service-Policy   State   Sessions   Tx Bandwidth   Rx Bandwidth\n========= =========== =========== ================ ================ ======= ========== ============== ==============\n any       0.0.0.0/0   -           trusted-lan      any-sp           Up           119   23.56 kbps     23.59 kbps\n\nCompleted in 0.12 seconds\n")),(0,a.kt)("p",null,"Identify that sessions are traversing the service. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"shadmin@node0.0200017bb97d# show sessions service-name any\nWed 2023-11-15 17:27:06 UTC\nNode: node0.0200017bb97d Page 1\n\n====================================== ===== ========= ============= ========== ============ ====== ======= =============== ========== =============== =========== =============== =========== =========== ========= ================\n Session Id                             Dir   Service   Tenant        Dev Name   Intf Name    VLAN   Proto   Src IP          Src Port   Dest IP         Dest Port   NAT IP          NAT Port    Payload     Timeout   Uptime\n                                                                                                                                                                                                Encrypted\n====================================== ===== ========= ============= ========== ============ ====== ======= =============== ========== =============== =========== =============== =========== =========== ========= ================\n 48e2d02a-cd65-43b7-b3f5-621c91525426   fwd   any       trusted-lan   ge-0-1     ge-0-1_400    400   TCP     172.16.1.11.2      62360   162.159.6.1.3         443   192.168.0.247       37993   False           677   0 days 0:21:11\n 48e2d02a-cd65-43b7-b3f5-621c91525426   rev   any       trusted-lan   ge-0-0     ge-0-0          0   TCP     162.159.61.3         443   192.168.0.247       37993   0.0.0.0                 0   False          1078   0 days 0:21:11\n 1fa9a14d-b216-4c4f-93da-efdaef25d61c   fwd   any       trusted-lan   ge-0-1     ge-0-1_400    400   TCP     172.16.1.11.2      62403   140.82.11.2.25        443   192.168.0.247       38028   False           670   0 days 0:20:30\n 1fa9a14d-b216-4c4f-93da-efdaef25d61c   rev   any       trusted-lan   ge-0-0     ge-0-0          0   TCP     140.82.112.25        443   192.168.0.247       38028   0.0.0.0                 0   False           790   0 days 0:20:30\n")),(0,a.kt)("p",null,"Sample some of the newly created sessions and confirm that the new security policy is in effect by examining the output of ",(0,a.kt)("inlineCode",{parentName:"p"},"show sessions by-id"),"."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Note the output of:",(0,a.kt)("br",null),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"Forward Flows > Metadata Security Policy"),": This comes from the configuration of ",(0,a.kt)("inlineCode",{parentName:"p"},"network-interface > adjacency > inter-router-security"),", which is the metadata encryption policy.",(0,a.kt)("br",null),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"Payload Security Policy"),": This comes from the configuration ",(0,a.kt)("inlineCode",{parentName:"p"},"service > security-policy"),", which is the payload encryption policy.",(0,a.kt)("br",null),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"Reverse Flows > Decrypt Security Policy"),": This comes from the configuration ",(0,a.kt)("inlineCode",{parentName:"p"},"network-interface > inter-router-security"),", which is the metadata decryption policy.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"admin@conductor.site1# show sessions by-id router west-dc-router 30da8df9-2f91-42a2-b54c-cc66e5651714\nThu 2023-11-09 22:20:42 UTC\nRetrieving session information...\n===============================================================================================================================================================================================================================\n west-dc-router.west-dc-01         Session ID: 30da8df9-2f91-42a2-b54c-cc66e5651714\n===============================================================================================================================================================================================================================\n Service Name:                      local-subnets\n Service Route Name:                N/A\n Session Source:                    SourceType: INTER_NODE\n Payload Security Policy:           service-sec\n Payload Encrypted:                 True\n Forward Flows:\n     Decrypt Security Policy:       encrypt-hmac-disabled\n     Attributes:\n         Metadata Security Policy:  peer-sec\n Reverse Flows:\n     Decrypt Security Policy:       peer-sec\n     Attributes:\n         Metadata Security Policy:  encrypt-hmac-disabled\n========================================================================================================================================================\n west-dc-router.west-dc-02         Session ID: 30da8df9-2f91-42a2-b54c-cc66e5651714\n===================================================================================================================================================================================================\n Service Name:                      local-subnets\n Session Source:                    SourceType: PUBLIC\n Inter Node:                        True\n Payload Security Policy:           service-sec\n Payload Encrypted:                 True\n Forward Flows:\n     Decrypt Security Policy:       <empty>\n     Attributes:\n         Metadata Security Policy:  encrypt-hmac-disabled\n Reverse Flows:\n     Decrypt Security Policy:       encrypt-hmac-disabled\n     Attributes:\n         Metadata Security Policy:  <empty>\n")))}u.isMDXComponent=!0},66342:function(e,t,n){t.Z=n.p+"assets/images/sec_metadata_payload_encryption-ce5021c7fc66c894cd1c027cf76943cb.png"}}]);