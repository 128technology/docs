"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[7789],{92911:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var i=n(74848),s=n(28453);const o={title:"Metrics",sidebar_label:"Metrics"},r=void 0,a={id:"concepts_metrics",title:"Metrics",description:"When querying the STATS API, you will notice the resolution of the data changes over time.  This is due to the downsampling that occurs. Downsampling is performed to reduce the amount of data persisted to disk, ultimately purging the data from the system after a period of time.",source:"@site/docs/concepts_metrics.md",sourceDirName:".",slug:"/concepts_metrics",permalink:"/docs/concepts_metrics",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Metrics",sidebar_label:"Metrics"},sidebar:"docs",previous:{title:"SSR Metadata",permalink:"/docs/concepts_metadata"},next:{title:"Machine Communication",permalink:"/docs/concepts_machine_communication"}},c={},l=[{value:"In Memory Metrics",id:"in-memory-metrics",level:3},{value:"Session Establishment Metrics",id:"session-establishment-metrics",level:2},{value:"Time to Establish",id:"time-to-establish",level:3},{value:"Sessions Reached Establishment",id:"sessions-reached-establishment",level:3},{value:"Sessions Timed Out Before Establishment",id:"sessions-timed-out-before-establishment",level:3},{value:"Destination Unreachable",id:"destination-unreachable",level:3},{value:"Session Close Before TCP Establishment",id:"session-close-before-tcp-establishment",level:3},{value:"Session Close Before TLS Establishment",id:"session-close-before-tls-establishment",level:3},{value:"Configuration",id:"configuration",level:3}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["When querying the ",(0,i.jsx)(t.code,{children:"STATS"})," API, you will notice the resolution of the data changes over time.  This is due to the downsampling that occurs. Downsampling is performed to reduce the amount of data persisted to disk, ultimately purging the data from the system after a period of time."]}),"\n",(0,i.jsxs)(t.p,{children:["The system samples data every 5 seconds. The sampling interval is configurable under ",(0,i.jsx)(t.code,{children:"authority > router > system > metrics > sample-period <value>"}),"."]}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"It is not recommended to change the sample-period. Increasing the value reduces the resolution of the information collected. Decreasing the value creates a greater computational load on the system. The software has been tuned to operate optimally at a sampling interval of 5 seconds."})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The full resolution of 5 second sampled data is kept for 1 hour."}),"\n",(0,i.jsx)(t.li,{children:"Every five minutes, the sampled data is aggregated. The 5 minute values are kept for a day."}),"\n",(0,i.jsx)(t.li,{children:"Every hour the 5 minute values are aggregated. The 1 hour values are kept for 6 months."}),"\n",(0,i.jsx)(t.li,{children:"After 6 months, the data is purged from disk."}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"in-memory-metrics",children:"In Memory Metrics"}),"\n",(0,i.jsxs)(t.p,{children:["By default, not all metrics are persisted to disk and subject to downsampling. When executing ",(0,i.jsx)(t.code,{children:"show stats"})," commands utilizing the ",(0,i.jsx)(t.code,{children:"since"})," argument, the command reports that the requested data is unavailable."]}),"\n",(0,i.jsxs)(t.p,{children:["To view in-memory metrics, create a Metrics Profile containing the specific metrics to be collected and persisted. For information about creating a Metrics Profile to collect your metrics, see ",(0,i.jsx)(t.a,{href:"/docs/config_in-memory_metrics",children:"Configuring In-Memory Metrics"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"Care should be taken to avoid overloading the system with the metrics. Many metrics are currently in-memory because of the heavy load they introduce to the system if they were all persisted."}),"\n",(0,i.jsxs)(t.p,{children:["An Example of ",(0,i.jsx)(t.code,{children:"show stats"})," command using a ",(0,i.jsx)(t.code,{children:"since"})," argument is shown below:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@node.router# show stats ipfix since 5:30\nTue 2020-03-15 13:07:06 UTC\nWARNING: Some metrics are not available historically. Their current values will be displayed.\nRetrieving statistics...\n\nSince: 2020-03-15 05:30:00\n\nIPFIX Stats\n-----------\n\n======================= ======== =======\n Metric                  Node     Value\n======================= ======== =======\n record-export-rate      sydney       0\n time-per-export         sydney       0\n time-per-session        sydney       0\n total-generation-time   sydney       0\n total-records           sydney       0\n\nCompleted in 0.06 seconds\n"})}),"\n",(0,i.jsx)(t.h2,{id:"session-establishment-metrics",children:"Session Establishment Metrics"}),"\n",(0,i.jsx)(t.p,{children:"A key indicator of application performance is the time it takes to establish the TCP session between client and server. This is effectively the time it takes to get to the first data packet between endpoints. This metric is more telling than packet transmission rates because it is directional and end to end. Importantly, this information can be used as a measure of SLA to influence path selection."}),"\n",(0,i.jsx)(t.p,{children:"Session establishment metrics have been created and are gathered on a per service, per interface, per destination, per traffic-class basis. This level of granularity provides surgically accurate information on how the network treatment and performance is impacting application behavior. A capability that is unique only to the SSR router."}),"\n",(0,i.jsxs)(t.p,{children:["To add more context to the sessions traversing the SSR router, the newly added session establishment metrics detailed below are collected in protocol based buckets ",(0,i.jsx)(t.em,{children:"TCP"}),", ",(0,i.jsx)(t.em,{children:"UDP"}),", ",(0,i.jsx)(t.em,{children:"ICMP"}),", and ",(0,i.jsx)(t.em,{children:"TLS"}),". Each protocol has its own determination of what qualifications need to be met for a session to become ",(0,i.jsx)(t.em,{children:"established"}),". In turn there is protocol/application-specific handling of each of these, defined by what is considered ",(0,i.jsx)(t.em,{children:"established"}),".  For the remainder of the document, the following definitions of establishment are implied per protocol:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"TCP"})," - session has seen an acknowledgement to the first packet after the TCP handshake that contains payload"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"UDP"})," - session has seen a packet in the reverse direction"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"ICMP"})," - session has seen a packet in the reverse direction"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"TLS"})," - session has seen an acknowledgement to the first packet after the TLS handshake that contains payload"]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"time-to-establish",children:"Time to Establish"}),"\n",(0,i.jsx)(t.p,{children:"This is a grouping of 3 different metrics: min, max, and mean. The time from session start to when it reaches the established state as defined above per-protocol. The exception is for TLS, the start time is at TCP establishment instead of session start."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment\nTue 2020-03-31 20:33:26 UTC\nRetrieving statistics...\n\ntime-to-establishment\n---------------------\n\n======== =========== ========= =================== ==================== =============== =======\n Metric   Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n======== =========== ========= =================== ==================== =============== =======\n max      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n          t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n          t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n          t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n min      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n          t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n          t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n          t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment max\nTue 2020-03-31 20:39:12 UTC\nRetrieving statistics...\n\nMaximum time to establishment\n-----------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment min\nTue 2020-03-31 20:39:25 UTC\nRetrieving statistics...\n\nMinimum time to establishment\n-----------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.h3,{id:"sessions-reached-establishment",children:"Sessions Reached Establishment"}),"\n",(0,i.jsx)(t.p,{children:"Counts of how many sessions reach the established state as defined per-protocol above."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp established\nTue 2020-03-31 20:38:29 UTC\nRetrieving statistics...\n\nTCP sessions that were successfully established\n-----------------------------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n"})}),"\n",(0,i.jsx)(t.h3,{id:"sessions-timed-out-before-establishment",children:"Sessions Timed Out Before Establishment"}),"\n",(0,i.jsx)(t.p,{children:"Counts of how many sessions timed out without reaching establishment, as defined per-protocol above. The TLS bucket of this metric is incremented only when the TCP established state has been reached but before the TLS established state has been reached."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp timeout-before-establishment\nTue 2020-03-31 20:40:21 UTC\nRetrieving statistics...\n\nTimed out TCP sessions before establishment\n-------------------------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.h3,{id:"destination-unreachable",children:"Destination Unreachable"}),"\n",(0,i.jsx)(t.p,{children:"Counts of how many sessions could not complete because the destination was unreachable. This is determined by receipt of an ICMP destination unreachable for the session."}),"\n",(0,i.jsx)(t.p,{children:"The below metrics do not apply across all of the specified protocols/applications (UDP, ICMP, TCP, TLS) and have the specific protocol/application name in the metric."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp unreachable\nTue 2020-03-31 20:41:06 UTC\nRetrieving statistics...\n\nTCP unreachable\n---------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.h3,{id:"session-close-before-tcp-establishment",children:"Session Close Before TCP Establishment"}),"\n",(0,i.jsx)(t.p,{children:"Counts the number of sessions closed by reset or fin before the session has finished the TCP handshake and data has been acknowledged. This can be a server responding to a SYN with a reset or a proxy terminating a session it cannot complete."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tcp close-before-establishment\nTue 2020-03-31 20:41:56 UTC\nRetrieving statistics...\n\nClosed TCP sessions before establishment\n----------------------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.h3,{id:"session-close-before-tls-establishment",children:"Session Close Before TLS Establishment"}),"\n",(0,i.jsx)(t.p,{children:"Counts the number of sessions that are closed by reset or fin after TCP establishment but before the session has finished the TLS handshake and data has been acknowledged."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability tls close-before-establishment\nTue 2020-03-31 20:42:30 UTC\nRetrieving statistics...\n\nClosed TlS sessions before establishment\n----------------------------------------\n\n=========== ========= =================== ==================== =============== =======\n Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=========== ========= =================== ==================== =============== =======\n t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n t116-dut1   foo       controlKniIf        192.168.56.51        high                0\n t116-dut1   foo       controlKniIf        192.168.56.51        low                 0\n t116-dut1   foo       controlKniIf        192.168.56.51        medium              0\n\nCompleted in 0.02 seconds\n"})}),"\n",(0,i.jsx)(t.h3,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsx)(t.p,{children:"In order to begin collection of the metrics described above, a service-route must be configured to enable reachability-detection."}),"\n",(0,i.jsx)(t.p,{children:"Example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"service-route\n  name                   service-agent1\n  nat-target             1.2.3.4\n  service-name           web\n  service-route-policy   sap1\n  reachability-detection\n    enabled     true\n  next-hop\n    node-name   slice1\n    interface   intf1\n    gateway-ip  1.1.1.2\n"})}),"\n",(0,i.jsx)(t.p,{children:"In order to filter reachability by destination prefix by traffic class:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"admin@t116-dut1.t116# show stats highway destination-reachability destination-prefix 192.168.56.51 traffic-class best-effort\nTue 2020-03-31 20:44:47 UTC\nRetrieving statistics...\n\nDestination Reachability Statistics\n-----------------------------------\n\n=================================== =========== ========= =================== ==================== =============== =======\n Metric                              Node        Service   Network-interface   Destination-prefix   Traffic-class   Value\n=================================== =========== ========= =================== ==================== =============== =======\n icmp established                    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n icmp time-to-establishment max      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n icmp time-to-establishment min      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n icmp timeout-before-establishment   t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n icmp unreachable                    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp close-before-establishment      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tcp unreachable                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tls close-before-establishment      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tls established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tls time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tls time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n tls timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n udp established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n udp time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n udp time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n udp timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n udp unreachable                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0\n\nCompleted in 0.03 seconds\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var i=n(96540);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);