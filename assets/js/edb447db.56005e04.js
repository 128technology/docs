"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[1203],{19628:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>r,default:()=>l,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var n=t(74848),a=t(28453);const i={title:"MAC Address Uniqueness",sidebar_label:"MAC Address Uniqueness"},r=void 0,o={id:"ts_mac_uniqueness",title:"MAC Address Uniqueness",description:"Each Ethernet device uses an address referred to as the Media Access Control (MAC) address that allows other devices to communicate with it at the Data Link layer. These addresses must be unique on each L2 (broadcast) domain, in order to ensure that Ethernet frames are sent to the appropriate device.",source:"@site/docs/ts_mac_uniqueness.md",sourceDirName:".",slug:"/ts_mac_uniqueness",permalink:"/docs/ts_mac_uniqueness",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"MAC Address Uniqueness",sidebar_label:"MAC Address Uniqueness"},sidebar:"docs",previous:{title:"Logs",permalink:"/docs/ts_logs"},next:{title:"Packet Capture",permalink:"/docs/ts_packet_capture"}},d={},h=[{value:"The Symptoms",id:"the-symptoms",level:2},{value:"The Resolution",id:"the-resolution",level:2}];function c(e){const s={admonition:"admonition",code:"code",em:"em",h2:"h2",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"Each Ethernet device uses an address referred to as the Media Access Control (MAC) address that allows other devices to communicate with it at the Data Link layer. These addresses must be unique on each L2 (broadcast) domain, in order to ensure that Ethernet frames are sent to the appropriate device."}),"\n",(0,n.jsx)(s.p,{children:'Because two devices with the same MAC on the same L2 broadcast domain are indistinguishable from one another, this is often leveraged by equipment manufaturers for the purposes of interface failover; deliberately deploying two devices with the same MAC on the same broadcast domain, and controlling which of them "owns" the interface lets adjacent devices continue to communicate with the same L2 destination when ownership changes from one piece of equipment to another.'}),"\n",(0,n.jsxs)(s.p,{children:['The SSR uses this technique for its "protected interface" failover; by assigning the same ',(0,n.jsx)(s.code,{children:"shared-phys-address"})," on two interfaces spanning two nodes that comprise a router, you can have those nodes elect an active owner of the interface, and transfer ownership to the partner node in the event of a failure."]}),"\n",(0,n.jsxs)(s.p,{children:["Thus, enabling this behavior only requires assigning a unique ",(0,n.jsx)(s.code,{children:"shared-phys-address"})," that is shared between the two devices. Furthermore, for the reasons mentioned above, this ",(0,n.jsx)(s.code,{children:"shared-phys-address"})," must be otherwise unique on its broadcast domain."]}),"\n",(0,n.jsxs)(s.p,{children:["We have observed cases where broadcast domains span ",(0,n.jsx)(s.em,{children:"much further"})," than anticipated, and reusing the same ",(0,n.jsx)(s.code,{children:"shared-phys-address"})," on two routers many miles apart has contributed to difficult-to-diagnose issues. In one instance, a nationwide enterprise branch location shared a common broadcast domain with anoter branch location over 12 miles away, using the same ISP."]}),"\n",(0,n.jsx)(s.p,{children:'Furthermore, data suggests that the issue may not necessarily be limited to broadcast domains; if an ISP uses shared DHCP servers that cover many broadcast domains, these may be unwilling to issue DHCP leases to two different broadcast domains if the DHCP requests share a common L2 source address. For this reason, in the remainder of the document we will refer to the problem as existing in a common "domain," which may represent either a broadcast domain or a DHCP domain.'}),"\n",(0,n.jsx)(s.h2,{id:"the-symptoms",children:"The Symptoms"}),"\n",(0,n.jsx)(s.p,{children:'If MAC addresses are not unique in a domain, this will lead to peculiar behavior as observed by the network admin. An interface may suddenly "lose" its IP address, and dutifully send DHCP requests to acquire a new address, but have those requests go unanswered. Then, without warning, it will suddenly spring to life and acquire an IP address.'}),"\n",(0,n.jsxs)(s.p,{children:["When you see a DHCP-enabled interface that has an ",(0,n.jsx)(s.code,{children:"<empty>"})," value for its address, this is a possible culprit. An example is below (output is truncated to fit the page):"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"admin@SOL2035P3A.SOL2035P3# show network-interface node all\nThu 2019-05-09 13:23:49 UTC\n\n=========== ============ ========= ============= ========== ==================== \n Router      Node          Device   Name          DHCP       Address\n=========== ============ ========= ============= ========== ====================\n SOL2035P3   SOL2035P3A         2   ha-fabric     disabled   169.254.255.0/31\n SOL2035P3   SOL2035P3A         3   pos           disabled   10.120.135.1/25\n SOL2035P3   SOL2035P3A         3   utility       disabled   10.120.135.161/27\n SOL2035P3   SOL2035P3A         3   voice         disabled   10.120.135.193/27\n SOL2035P3   SOL2035P3A         4   DIA           v4         <empty>/32    \n"})}),"\n",(0,n.jsxs)(s.p,{children:["As you can see here, the DIA interface has no IP address. Capturing packets on that interface (using a ",(0,n.jsx)(s.code,{children:"len>0"})," filter or equivalent) will confirm that the interface is sending DHCP requests. However, if the ISP has already issued a DHCP lease for the MAC address requesting an IP address, these requests may go unanswered."]}),"\n",(0,n.jsx)(s.h2,{id:"the-resolution",children:"The Resolution"}),"\n",(0,n.jsxs)(s.p,{children:["To avoid colliding MAC addresses within a domain, we must ensure each is unique. In one representative deployment, the enterprise uses four digit numbers to uniquely identify each location. Thus, we leveraged the last two octets of the ",(0,n.jsx)(s.code,{children:"shared-phys-address"})," to insert this four digit identifier. For example, the branch 1234 uses the MAC address ",(0,n.jsx)(s.code,{children:"5a:1f:2b:57:12:34"}),", and the branch 5678 uses the MAC address ",(0,n.jsx)(s.code,{children:"5a:1f:2b:57:56:78"}),'. While this does not guarantee that MAC addresses are unique within a domain (since another device could conceivably have one of those two addresses "natively"), the chances are far, far more remote.']}),"\n",(0,n.jsxs)(s.p,{children:["To rectify the problem, we must change the ",(0,n.jsx)(s.code,{children:"shared-phys-address"})," on both the A and B nodes in a router."]}),"\n",(0,n.jsx)(s.p,{children:"Additionally, for specific deployments where the two nodes in a router are not persistently connected to the same L2 interface at the same time, we recommend configuring Linux's MAC address on that interface to match the one that will be used by the SSR software. (This is because we have observed certain business-class DIA circuits that will only issue one IP/MAC binding at a time, and if Linux has a different MAC than the SSR, the host's MAC may take a lease at the expense of the SSR's MAC.)"}),"\n",(0,n.jsxs)(s.p,{children:["This is done by editing the ",(0,n.jsx)(s.code,{children:"MACADDR"})," field within ",(0,n.jsx)(s.code,{children:"/etc/sysconfig/network-scripts/ifcfg-<ifname>"}),". Ensure this matches the MAC configured within the SSR's configuration."]}),"\n",(0,n.jsx)(s.admonition,{type:"warning",children:(0,n.jsx)(s.p,{children:'This is NOT TO BE DONE for "traditional" high availability deployments where both interfaces are plugged into the same L2 broadcast domain at the same time. This is because stopping SSR on one node will cause Linux to ARP out for the MAC address, which will cause disruption to service for its counterpart that is still running.'})})]})}function l(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,s,t)=>{t.d(s,{R:()=>r,x:()=>o});var n=t(96540);const a={},i=n.createContext(a);function r(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);