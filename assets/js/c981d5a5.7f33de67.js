"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[4701],{29405:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>l,frontMatter:()=>s,metadata:()=>r,toc:()=>h});var i=a(74848),n=a(28453);const s={title:"SSR Metadata"},o=void 0,r={id:"concepts_metadata",title:"SSR Metadata",description:"As part of the SSR's operation, it performs functions such as flow classification, route selection, load balancing, etc., upon receipt of a first packet from a new five tuple source. Before sending this packet to another SSR, it inserts metadata, a series of TLVs which describe attributes of the session, into the payload of the packet. Likewise, in the reverse direction, the first reverse packet will include metadata in the form of a different set of TLVs associated with decisions made on the egress SSR.",source:"@site/docs/concepts_metadata.md",sourceDirName:".",slug:"/concepts_metadata",permalink:"/docs/concepts_metadata",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"SSR Metadata"},sidebar:"docs",previous:{title:"Forwarding Planes",permalink:"/docs/concepts_network_planes"},next:{title:"Metrics",permalink:"/docs/concepts_metrics"}},d={},h=[{value:"Metadata Types",id:"metadata-types",level:2},{value:"Metadata Insertion",id:"metadata-insertion",level:2},{value:"Retriggering Metadata",id:"retriggering-metadata",level:3},{value:"Existing Flow Recognition",id:"existing-flow-recognition",level:4},{value:"Existing Flow Modification",id:"existing-flow-modification",level:4},{value:"Metadata Versioning",id:"metadata-versioning",level:2},{value:"Metadata Application: Load Balancing",id:"metadata-application-load-balancing",level:2},{value:"Service Feedback",id:"service-feedback",level:3},{value:"Metadata Application: High Availability",id:"metadata-application-high-availability",level:2},{value:"Metadata Application: Workload Mobility",id:"metadata-application-workload-mobility",level:2},{value:"Metadata Composition",id:"metadata-composition",level:2},{value:"Metadata Header",id:"metadata-header",level:3},{value:"Cookie (8 bytes)",id:"cookie-8-bytes",level:5},{value:"Version (4 bits)",id:"version-4-bits",level:5},{value:"Header Length (12 bits)",id:"header-length-12-bits",level:5},{value:"Payload Length (2 bytes)",id:"payload-length-2-bytes",level:5},{value:"False Positive Metadata",id:"false-positive-metadata",level:3},{value:"Guaranteed Unencrypted Attributes",id:"guaranteed-unencrypted-attributes",level:3},{value:"Contextually Encrypted Attributes (Payload attributes)",id:"contextually-encrypted-attributes-payload-attributes",level:3},{value:"Attributes",id:"attributes",level:2}];function c(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["As part of the SSR's operation, it performs functions such as flow classification, route selection, load balancing, etc., upon receipt of a first packet from a new five tuple source. Before sending this packet to another SSR, it inserts metadata, a series of ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Type-length-value",children:"TLVs"})," which describe attributes of the session, into the payload of the packet. Likewise, in the reverse direction, the first reverse packet will include metadata in the form of a different set of TLVs associated with decisions made on the egress SSR."]}),"\n",(0,i.jsxs)(t.p,{children:["These metadata inclusions are supplied by and exchanged between nodes within a router when deployed as a HA pair; this is frequently referred to as ",(0,i.jsx)(t.em,{children:"inter-node"})," metadata."]}),"\n",(0,i.jsxs)(t.p,{children:["In a similar way, the SSR uses metadata when exchanging packets between SSR instances. In these ",(0,i.jsx)(t.em,{children:"inter-router"})," applications, an SSR will insert metadata (on egress) to another SSR."]}),"\n",(0,i.jsx)(t.p,{children:"Irrespective of whether it is being used between nodes or between routers, the function of the metadata is to convey information between these two nodes; the ingress node sends information about the originator of the packet, authentication information about itself, the tenant that the endpoint has been determined to be in, the destination service, and a growing list of feature-specific parameters. In turn, the egress node supplies information back to the ingress node to provide real-time utilization information about the service, any downstream load balancing decisions it has employed, etc."}),"\n",(0,i.jsx)(t.h2,{id:"metadata-types",children:"Metadata Types"}),"\n",(0,i.jsx)(t.p,{children:"There are three main types of metadata in use within the SSR:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Session metadata. This is the \u2018signaling exchange\u2019 sent between routers. It occurs at the outset of a session, during a metadata handshake, and will reoccur when properties of the session change and need to be re-signaled."}),"\n",(0,i.jsx)(t.li,{children:'Per-packet metadata. This type of metadata is mostly associated with changes made to packets regardless of what session they are associated with. An example of this is when an SSR needs to fragment packets destined for another SSR; in this case, it adds "fabric fragmentation" metadata to each of the pieces, telling the egress node how to reassemble them.'}),"\n",(0,i.jsx)(t.li,{children:"BFD metadata. In a unique category unto itself, BFD metadata appears in every BFD packet exchanged between routers. It is a lightweight payload used to communicate service changes (e.g., when an active node fails and activity is resumed by a highly available counterpart), used as part of the BFD application to measure link quality."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"metadata-insertion",children:"Metadata Insertion"}),"\n",(0,i.jsx)(t.p,{children:"The SSR inserts metadata only when transmitting a packet between two routers, and under the following circumstances:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"It is a \u201cforward\u201d packet representing a new session and the ingress node has not yet received any reverse metadata from the recipient egress node."}),"\n",(0,i.jsx)(t.li,{children:"It is a \u201creverse\u201d packet from the recipient egress node to the initiating ingress node and the recipient egress node has not received forward packets from this session without metadata."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"These two comprise what is known as the \u201cmetadata handshake\u201d -- that is, the initiating router sends packets with metadata to the recipient router until it receives a reverse packet with metadata from that recipient. Likewise, the recipient continues to send metadata to the initiating router until it receives a packet without metadata. This is how two routers acknowledge receipt of metadata from their counterparts: the absence of metadata in a packet indicates that it has received metadata from its counterpart."}),"\n",(0,i.jsxs)(t.ol,{start:"3",children:["\n",(0,i.jsx)(t.li,{children:"Fragmented packets are being sent from an SSR to another SSR."}),"\n",(0,i.jsx)(t.li,{children:"Packets are being transformed to UDP between nodes because the original protocol has no support for L4 port numbers (and hence, SVR waypoint logic cannot be used. i.e. ICMP)."}),"\n",(0,i.jsx)(t.li,{children:"Packets are being transformed to UDP from TCP between routers due to the detection of a protocol-strict firewall between them."}),"\n",(0,i.jsx)(t.li,{children:"A NAT exists between two routers and a router detects that the NAT\u2019s address has changed.  Detection is done using a BFD exchange (not described in this document)."}),"\n",(0,i.jsx)(t.li,{children:"BFD Metadata."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Metadata is always inserted directly after the L4 header of a packet."}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"All packets between routers will have an L4 header, since the initiating router will insert one if one did not exist in the original packet."})}),"\n",(0,i.jsx)(t.h3,{id:"retriggering-metadata",children:"Retriggering Metadata"}),"\n",(0,i.jsx)(t.p,{children:"There are a variety of reasons why metadata may need to be retriggered after the initial handshake has been successfully completed. Additionally the retriggering itself can serve different purposes depending on the catalyst. The two main scenarios for retriggering of metadata are existing flow recognition as well as existing flow modification"}),"\n",(0,i.jsx)(t.h4,{id:"existing-flow-recognition",children:"Existing Flow Recognition"}),"\n",(0,i.jsx)(t.p,{children:"This method of retriggering metadata is intended to reopen the session on the next hop due to a variety of reasons such as detecting a source NAT change from a device in the middle via BFD, or the session for some reason no longer exists on the next hop router and needs to be reopened. Ultimately the next hop router is missing a flow entry associated with the flow table key (device interface, VLAN, source IP, destination IP, source L4 port, destination L4 port, and protocol). Retriggering metadata in this scenario aims to recreate a session which should have existed or is currently in a stale state on the next-hop node."}),"\n",(0,i.jsx)(t.h4,{id:"existing-flow-modification",children:"Existing Flow Modification"}),"\n",(0,i.jsx)(t.p,{children:"This form of metadata retriggering is a result of a router deciding that something about the existing session needs to change on the fly."}),"\n",(0,i.jsx)(t.p,{children:"This could be a result of:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Switching waypoints for an existing session due to a change in security actions of the session."}),"\n",(0,i.jsx)(t.li,{children:"The load balancer within the ingress router decided that there is a better SVR path to traverse for the session."}),"\n",(0,i.jsx)(t.li,{children:"Existing characteristics of a session (such as its traffic classification) have changed which must be communicated to the next hop router."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"metadata-versioning",children:"Metadata Versioning"}),"\n",(0,i.jsx)(t.p,{children:"Metadata header contains a version field which dictates the version of the header format. Presently there is only version 1 which is associated with the initial format of the header."}),"\n",(0,i.jsx)(t.h2,{id:"metadata-application-load-balancing",children:"Metadata Application: Load Balancing"}),"\n",(0,i.jsx)(t.p,{children:"Each router maintains local information about the utilization of all services which it contacts. This information is used to inform a router\u2019s session forwarding logic, which determines the most appropriate egress router for a given ingress session. There are three main inputs into a router\u2019s session forwarding algorithm:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The configuration of the fabric. This is where administrators define their preferences and requirements for session traffic. This includes application-based thresholds for the minimum viable link quality requirements (packet loss, jitter, latency), as well as the administrative preference for which path to use."}),"\n",(0,i.jsx)(t.li,{children:"Path (or link) data, as learned through BFD. This includes real-time path measurement for latency and jitter, as well as real-time reporting of observed packet loss."}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"service-feedback",children:"Service Feedback"}),"\n",(0,i.jsx)(t.p,{children:"With each new session that is established between two routers, the metadata from the egress router includes load information to describe that service\u2019s current occupancy. This is based strictly on a count of the number of active sessions, but could be extended to use other attributes as metric data (e.g., bandwidth). These metrics are collectively referred to as \u201ccapacity criteria\u201d."}),"\n",(0,i.jsx)(t.p,{children:"By inserting capacity criteria in metadata, the egress router can send real-time information back, in band, to the ingress router. This information can (and should) be time sensitive \u2013 after a period of time the information, if it is not refreshed by another session assignment (and hence more metadata from the egress router), is considered obsolete. With frequent exchanges between two specific routers, the ingress router will have nearly perfect load information on the egress router \u2013 even if that ingress router is not the only source of traffic to that egress router."}),"\n",(0,i.jsx)(t.h2,{id:"metadata-application-high-availability",children:"Metadata Application: High Availability"}),"\n",(0,i.jsx)(t.p,{children:"At its essence, metadata represents state information that is exchanged between routers. In its most primitive use case, an ingress router sends pre-transform packet information to the egress router for it to \u201creconstitute\u201d the original source and destination addresses and ports of the original inbound packet. This is performed with the first packet for every new session entering into the SSR fabric. This same technique is also employed on non-first packets for existing sessions if a router has determined that its counterpart is no longer reachable (due to network issues or system failure)."}),"\n",(0,i.jsx)(t.p,{children:"After a router (which could have originally been the ingress or egress router of a session) detects that the adjacent peer it has been talking with has failed over or rebooted, an event is triggered for all flows destined to the newly active peer to restart metadata generation.  When BFD notices a state change with a connected peer indicative of a failover or reboot, it triggers an event to reevaluate path selection for active sessions. This event tells all flows generating metadata to do a one time check (when going through action processing) to see if their relevant peer has had a state change and is in need of metadata. If the event is relevant to the flow, metadata is enabled, otherwise the event is marked as observed and the existing metadata action state is unchanged."}),"\n",(0,i.jsx)(t.h2,{id:"metadata-application-workload-mobility",children:"Metadata Application: Workload Mobility"}),"\n",(0,i.jsx)(t.p,{children:"Similar to the high availability scenario, network events may sometimes require session state to be moved among routers in an SSR fabric. The term workload mobility refers to the migration of a workload (virtual machine, container, etc.) from one location in a network to another; the challenge this presents to the SSR is that not only does the configuration need to account for the change (i.e., a service-route\u2019s egress interface moves), but sessions in progress may also need to move as a result."}),"\n",(0,i.jsx)(t.p,{children:"As with high availability, the use of metadata is critical to migrating a session from one router to another. In much the same way, when a (terminating) workload is moved to a new location, the ingress router will send packets for in-progress sessions to a new location, including brand new metadata to a new recipient."}),"\n",(0,i.jsx)(t.h2,{id:"metadata-composition",children:"Metadata Composition"}),"\n",(0,i.jsxs)(t.p,{children:["Metadata that the SSR system can generate is an accumulation of attributes associated with a session being established, or in certain circumstances per-packet attributes. Below is an example of the format of metadata that will sit between the layer 4 header of a packet and its payload.  There exist both ",(0,i.jsx)(t.em,{children:"Header attributes"})," as well as ",(0,i.jsx)(t.em,{children:"Payload attributes"}),". Header attributes are always guaranteed to be unencrypted. Payload attributes may be encrypted depending on the configuration of a security policy.  Each attribute listed below will indicate whether it is a header attribute (unencrypted) or payload attribute (optionally encrypted).  Attributes can not exist in both sections."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:" 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                                                               |\n+                             Cookie                            +\n|                                                               |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|Version|     Header Length     |         Payload Length        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|        Header TLVs ...        |         Payload TLVs ...      |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n"})}),"\n",(0,i.jsx)(t.h3,{id:"metadata-header",children:"Metadata Header"}),"\n",(0,i.jsxs)(t.p,{children:["The metadata header is the base structure for which all session and packet attributes are built upon. A well known \u201ccookie\u201d (",(0,i.jsx)(t.code,{children:"0x4c48dbc6ddf6670c"})," in network byte order or ",(0,i.jsx)(t.code,{children:"0x0c67f6ddc6db484c"})," in host byte order) is built into the header which is used in concert with contextual awareness of the packet itself to determine the presence of metadata within a packet. This is an eight byte pattern that immediately follows the L4 header, and is an indicator to a receiving router that a packet contains metadata."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:" 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                                                               |\n+                             Cookie                            +\n|                                                               |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|Version|     Header Length     |         Payload Length        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n"})}),"\n",(0,i.jsx)(t.h5,{id:"cookie-8-bytes",children:"Cookie (8 bytes)"}),"\n",(0,i.jsx)(t.p,{children:"The fingerprint of metadata. This value is used to determine the existence of metadata within a packet."}),"\n",(0,i.jsx)(t.h5,{id:"version-4-bits",children:"Version (4 bits)"}),"\n",(0,i.jsx)(t.p,{children:"Field representing the version of the metadata header. The current version of metadata is 0x1."}),"\n",(0,i.jsx)(t.h5,{id:"header-length-12-bits",children:"Header Length (12 bits)"}),"\n",(0,i.jsx)(t.p,{children:"Length of the metadata header including any added optional attributes that are guaranteed to be unencrypted. The value of this field is the number of bytes in the header."}),"\n",(0,i.jsx)(t.h5,{id:"payload-length-2-bytes",children:"Payload Length (2 bytes)"}),"\n",(0,i.jsx)(t.p,{children:"Length of data following the metadata header, not including the size of the header. This data could be encrypted. The value of this field is the number of bytes in the payload."}),"\n",(0,i.jsx)(t.h3,{id:"false-positive-metadata",children:"False Positive Metadata"}),"\n",(0,i.jsx)(t.p,{children:"Given that no byte sequence is truly unique in the payload of a packet, in the scenario where the original payload after the L4 header contains the same byte sequence as the cookie, false positive logic is enacted on the packet. If no metadata header has already been added to the packet, a false positive metadata header is added to the packet to indicate that the first eight bytes of the payload matches the cookie. The structure of a false positive metadata packet is one which has a metadata header length that is the same as the base header size as well as having zero payload length. The receiving side of a packet with false positive metadata will strip out the metadata header if the next hop of the packet is not expecting a metadata header."}),"\n",(0,i.jsx)(t.p,{children:"In the scenario where a router receives a false positive metadata header but intends to add metadata to the packet, the false positive metadata header is modified to contain the newly added attributes. Once attributes are added, the metadata header is no longer considered to be false positive."}),"\n",(0,i.jsx)(t.h3,{id:"guaranteed-unencrypted-attributes",children:"Guaranteed Unencrypted Attributes"}),"\n",(0,i.jsxs)(t.p,{children:["The metadata header contains a 12 bit field associated with the header length of the metadata header. The field represents the overall length of the header. Its base value is ",(0,i.jsx)(t.code,{children:"0xC"})," which is the initial length of the metadata header.\nThe value ",(0,i.jsx)(t.code,{children:"0xC"})," is derived from:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"  64 bits  Cookie Length\n   4 bits  Metadata Version\n  12 bits  Header Length\n+ 16 bits  Payload Length\n--------------------------\n96 bits = 12 bytes decimal = 0xC hex\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Any value greater than ",(0,i.jsx)(t.code,{children:"0xC"})," indicates additional attributes associated with this metadata header which are guaranteed to be unencrypted."]}),"\n",(0,i.jsx)(t.p,{children:"An example of an optional attribute which would reside in the guaranteed unencrypted section of metadata would be per-packet fabric fragment attribute. This attribute is not associated with any session or encryption schema and as such, must not be encrypted."}),"\n",(0,i.jsx)(t.h3,{id:"contextually-encrypted-attributes-payload-attributes",children:"Contextually Encrypted Attributes (Payload attributes)"}),"\n",(0,i.jsx)(t.p,{children:"The metadata header contains a two byte payload length field which is associated with attributes that could be encrypted."}),"\n",(0,i.jsx)(t.h2,{id:"attributes",children:"Attributes"}),"\n",(0,i.jsx)(t.p,{children:"Attributes are optionally included TLVs that are added to the metadata header. They can be added to either the guaranteed unencrypted section, or in the contextually encrypted section of the metadata header.  Each attribute will be marked with [header] or [payload] respectively to indicate in which metadata section it belongs."})]})}function l(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>o,x:()=>r});var i=a(96540);const n={},s=i.createContext(n);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);