"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9809],{74194:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var t=i(74848),s=i(28453);const o={title:"Configure Intrusion Detection and Prevention",sidebar_label:"Configure IDP"},r=void 0,a={id:"config_idp",title:"Configure Intrusion Detection and Prevention",description:"In a typical network deployment, there is always a mix of trusted and untrusted traffic. To prevent against security breaches, the SSR uses the IDP Signature database to identify and take action against malicious traffic. SSR services are configured to be monitored, and an IDP policy is applied to the traffic.",source:"@site/docs/config_idp.md",sourceDirName:".",slug:"/config_idp",permalink:"/docs/config_idp",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Configure Intrusion Detection and Prevention",sidebar_label:"Configure IDP"},sidebar:"docs",previous:{title:"Intrusion Detection and Prevention",permalink:"/docs/concepts_ssr_idp"},next:{title:"Troubleshooting IDP",permalink:"/docs/ts_idp"}},c={},l=[{value:"Configuration",id:"configuration",level:2},{value:"Tenant Configuration",id:"tenant-configuration",level:2},{value:"High Availability",id:"high-availability",level:2},{value:"Modifying IDP Policies",id:"modifying-idp-policies",level:2},{value:"GUI Configuration",id:"gui-configuration",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"In a typical network deployment, there is always a mix of trusted and untrusted traffic. To prevent against security breaches, the SSR uses the IDP Signature database to identify and take action against malicious traffic. SSR services are configured to be monitored, and an IDP policy is applied to the traffic."}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"idp-policy"})," has three profiles that can be applied to an ",(0,t.jsx)(n.code,{children:"access-policy"}),"; Alert, Standard, and Strict. This allows the same service to receive different IDP treatment for different tenants. Each profile has an associated traffic action that may include all or some of the following actions:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Close the client and server TCP connection."}),"\n",(0,t.jsx)(n.li,{children:"Drop current and all subsequent packets."}),"\n",(0,t.jsx)(n.li,{children:"Alert only, no additional action taken."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["In the following example, all internet traffic originating from the ",(0,t.jsx)(n.code,{children:"corporate"})," tenant identified as malicious or threatening receives a ",(0,t.jsx)(n.code,{children:"strict"})," policy enforcement. Traffic originating from the ",(0,t.jsx)(n.code,{children:"guest"})," tenant that is identified as malicious or threatening only triggers an alert. This means that the same threat entering two different network segments receives different treatment, allowing the administrator to enforce the right level of protection based on corporate policies."]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.p,{children:["In the following example configuration, three access policies are defined for the service ",(0,t.jsx)(n.code,{children:"internet"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"config\n    authority\n        service  internet\n            name           internet\n            address        0.0.0.0/0\n\n            access-policy  corporate\n                idp-policy  strict\n                source      corporate\n                permission  allow\n            exit\n\n            access-policy  guest\n                idp-policy  alert\n                source      guest\n                permission  allow\n            exit\n\n            access-policy  other\n                source      other\n                permission  allow\n            exit\n        exit\n    exit\nexit\n\n"})}),"\n",(0,t.jsx)(n.h2,{id:"tenant-configuration",children:"Tenant Configuration"}),"\n",(0,t.jsx)(n.p,{children:"IDP requires clear association of subnet to tenant; it is best to define the association as tenant-prefix:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"config\n    authority\n        service  internet\n            name           internet\n            address        0.0.0.0/0\n\n            access-policy  corporate\n                idp-policy  strict\n                source      corporate\n                permission  allow\n            exit\n        exit\n\n        tenant  corporate\n            name    corporate\n        exit\n\n        router  idp \n            name  idp \n\n            node  node\n                name              node\n\n                device-interface  corp-lan\n                    name               corp-lan\n\n                    network-interface  corp-lan\n                        name                   corp-lan\n                        global-id              7\n\n                        tenant-prefixes        corporate\n                            tenant          corporate\n                            source-address  172.16.3.0/24\n                        exit\n                        address                172.16.3.3\n                            ip-address     172.16.3.3\n                            prefix-length  24\n                        exit\n                    exit\n                exit\n            exit\n        exit\n"})}),"\n",(0,t.jsx)(n.h2,{id:"high-availability",children:"High Availability"}),"\n",(0,t.jsx)(n.p,{children:"The IDP engine runs on each node of the system. Traffic is always sent to the IDP instance on the first node - per the order in configuration. Upon failover, the existing sessions do not gracefully failover; the TCP sessions are reset, and new sessions must be established by the client. For UDP sessions, the same best effort behavior can be expected from the IDP engine."}),"\n",(0,t.jsx)(n.h2,{id:"modifying-idp-policies",children:"Modifying IDP Policies"}),"\n",(0,t.jsx)(n.p,{children:"Starting with SSR 6.1.4-R2, users can customize an existing IDP policy, creating exception-based rules. The following is an example workflow:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["A ",(0,t.jsx)(n.strong,{children:"strict"})," ",(0,t.jsx)(n.code,{children:"idp-policy"})," is initially configured for the service below."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"        service      test-app\n            name                  test-app\n            address               172.16.2.0/24\n\n            access-policy         lan\n                idp-policy  strict\n                source      lan\n            exit\n            share-service-routes  false\n        exit\n\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Security events are triggered because traffic typical for that network configuration is considered a risk. The Attack is blocked with the Action CLOSE."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"admin@node.cadillac# show idp events since 2m\nWed 2023-07-12 14:19:00 UTC\n========== ================================== ======== ============= =============================== ========== ========\n Severity   Time                               Threat   Application   Attack                          Protocol   Action\n========== ================================== ======== ============= =============================== ========== ========\n        6   2023-07-12 14:17:54.659000+00:00   MEDIUM   HTTP          HTTP:EXTRA_CONTROL_CHARACTERS   TCP        CLOSE\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The user has identified the attack ",(0,t.jsx)(n.code,{children:"HTTP:EXTRA_CONTROL_CHARACTERS"})," to be of minimal risk to this network and would like to create a rule to change this event to be ",(0,t.jsx)(n.strong,{children:"alert"})," only."]}),"\n",(0,t.jsxs)(n.li,{children:["The user creates an ",(0,t.jsx)(n.code,{children:"idp-profile"})," based on the original ",(0,t.jsx)(n.strong,{children:"strict"})," policy, modifying the outcome and action to alert/allow. By creating an exception for the attack, the specific traffic flows as desired within the network."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Changes are implemented from the SSR GUI or PCLI (in this example the PCLI is used), and validated as part of the existing configuration workflow."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"        idp-profile  strict-but-alert\n            name         strict-but-alert\n            base-policy  strict\n\n            rule         alert-chunk-overflow\n                name     alert-chunk-overflow\n\n                match\n                    vulnerability  HTTP:EXTRA_CONTROL_CHARACTERS\n                exit\n\n                outcome\n                    action  alert\n                exit\n            exit\n        exit\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The new service configuration uses the ",(0,t.jsx)(n.code,{children:"idp-profile"})," instead of the ",(0,t.jsx)(n.code,{children:"idp-policy"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"        service      test-app\n            name                  test-app\n            address               172.16.2.0/24\n\n            access-policy         lan\n                idp-profile  strict-but-alert\n                source       lan\n            exit\n            share-service-routes  false\n        exit\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:['After creating a new ruleset for IDP, the traffic will initially be routed "around" that particular set of rules until it is fully loaded into the IDP engine. Use ',(0,t.jsx)(n.code,{children:"show idp application status"})," to verify the traffic status affected by the new rule."]})}),"\n",(0,t.jsx)(n.p,{children:"When the modified profile is applied to the configuration, the following state message appears while it compiles:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"admin@node.cadillac# show idp application status\nWed 2023-07-12 14:25:19 UTC\n\u2714 Retrieving IDP state data...\n\n===============================================\n node.cadillac\n===============================================\n Mode:                    spoke\n Engine:                  on\n Pod:                     active\n Engine Started:          2023-07-11T14:39:55Z\n Up Time:                 23h 45m 24s\n Last Commit:             2023-07-12T13:55:00Z\n Last:                    starting\n\n Engine Message:\n   IDP policy compiling, waiting to finish\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Once the engine has applied the new policies, the compilation message disappears."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Retrieved IDP state data.\nCompleted in 0.02 seconds\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now when the vulnerability is matched, the event is logged, and traffic is allowed to pass:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"admin@node.cadillac# show idp events since 2m\nWed 2023-07-12 14:27:45 UTC\n========== ================================== ======== ============= =============================== ========== ========\n Severity   Time                               Threat   Application   Attack                          Protocol   Action\n========== ================================== ======== ============= =============================== ========== ========\n        6   2023-07-12 14:27:02.777000+00:00   MEDIUM   HTTP          HTTP:EXTRA_CONTROL_CHARACTERS   TCP        NONE\n\n"})}),"\n",(0,t.jsx)(n.h3,{id:"gui-configuration",children:"GUI Configuration"}),"\n",(0,t.jsx)(n.p,{children:"The following steps show how to use the GUI to use an existing IDP policy to create a modified IDP Profile."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Navigate to the IDP Profile feature.\n",(0,t.jsx)(n.img,{alt:"Add IDP Profile",src:i(27592).A+"",width:"1498",height:"470"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Click ADD."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Enter a Profile Name and click Save. The IDP Profiles configuration screen opens.\n",(0,t.jsx)(n.img,{alt:"Configure the IDP Profile",src:i(37413).A+"",width:"1682",height:"698"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"In the Base Policy, select an existing policy to modify."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"To add exceptions to the rules, select ADD in the Rules field."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Name the New item and click Save. This opens the settings for the new rule."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Identify the following items that will be compared for a match:"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["The information available on the Security Events screen or the ",(0,t.jsx)(n.a,{href:"/docs/concepts_ssr_idp#security-events-dashboard",children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"show idp-events"})})})," command can be used to populate and modify the Rules fields shown below."]})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Client IP Address prefix"}),"\n",(0,t.jsx)(n.li,{children:"Destination IP Address"}),"\n",(0,t.jsx)(n.li,{children:"Vulnerability"}),"\n",(0,t.jsx)(n.li,{children:"Severity"}),"\n",(0,t.jsx)(n.li,{children:"Action Options"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{alt:"New Rule Settings",src:i(47747).A+"",width:"1674",height:"1692"}),"\nAfter creating the custom ruleset, use the ",(0,t.jsx)(n.code,{children:"access-policy"})," as shown in the workflow above to define the IDP policy where this custom ruleset is used."]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:['After creating a new ruleset for IDP, the traffic will initially be routed "around" that particular set of rules until it is fully loaded into the IDP engine. Use ',(0,t.jsx)(n.code,{children:"show idp application status"})," to verify the traffic status affected by the new rule."]})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},27592:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/auth-settings-idp-profiles-36c3066085e5bd7b9b143d914ddd99a3.png"},47747:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/idp-profiles-rules-201f9f245e4ac1805bfb63385f6b1fbf.png"},37413:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/idp-profiles-f73af9eccbcbc64a79d7c0df71e4cb96.png"},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var t=i(96540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);