"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[990],{41375:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var n=i(74848),r=i(28453);const s={title:"SNMP - User defined metrics",sidebar_label:"SNMP - User defined metrics"},a=void 0,o={id:"config_snmp_metrics",title:"SNMP - User defined metrics",description:"Because of the large numbers of metrics available in the SSR platform and because only a fraction of these are useful for a functional Network Management System (NMS) the t128MetricsTable is only populated with a few metrics by default. If required, any SSR metric can be provided in this table via a user configurable JSON file.",source:"@site/docs/config_snmp_metrics.md",sourceDirName:".",slug:"/config_snmp_metrics",permalink:"/docs/config_snmp_metrics",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"SNMP - User defined metrics",sidebar_label:"SNMP - User defined metrics"},sidebar:"docs",previous:{title:"SNMP - Configuration",permalink:"/docs/howto_config_snmp"},next:{title:"Static Hostname Mappings",permalink:"/docs/config_static_hostname_mapping"}},c={},d=[{value:"Metrics Table Overview",id:"metrics-table-overview",level:2},{value:"Configuration File",id:"configuration-file",level:2},{value:"Identifying Metric ID and Contributors",id:"identifying-metric-id-and-contributors",level:2},{value:"Example Configurations",id:"example-configurations",level:2},{value:"System and process metrics",id:"system-and-process-metrics",level:3},{value:"Aggregate bandwith and active session count",id:"aggregate-bandwith-and-active-session-count",level:3},{value:"CPU usage filtered by core",id:"cpu-usage-filtered-by-core",level:3}];function l(e){const t={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"Because of the large numbers of metrics available in the SSR platform and because only a fraction of these are useful for a functional Network Management System (NMS) the t128MetricsTable is only populated with a few metrics by default. If required, any SSR metric can be provided in this table via a user configurable JSON file."}),"\n",(0,n.jsx)(t.h2,{id:"metrics-table-overview",children:"Metrics Table Overview"}),"\n",(0,n.jsx)(t.p,{children:"The following are the two value columns of the t128MetricsTable:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"t128MetricAlias.t128MetricIndex.t128MetricValue\nt128MetricAlias.t128MetricIndex.t128MetricContributors\n"})}),"\n",(0,n.jsx)(t.p,{children:'Each row of the metrics table is keyed by two objects, the t128MetricAlias and the t128MetricIndex. The t128MetricAlias is an arbitrary string of up to 64 characters long that represents a description of the metric. When read from the table this alias also includes a series instance suffix, which represents a unique instance of metrics. In this context an instance of metrics represents one set of qualified metrics. For example the default CPU utlization metric has an alias "cpuUtilization" will be returned as "cpuUtilization_0". In addition to the alias the t128MetricIndex key represents a unique time series of a metric and representing one set of metrics "contributors".'}),"\n",(0,n.jsxs)(t.p,{children:['The values contained in each row are the t128MetricValue and t128MetricContributors objects. The t128MetricValue is simply the current value of the metric. To understand the t128MetricContributors object requires a little more understanding of the way SSR metrics are stored and modelled. All metrics in SSR are assigned a "Metric ID" that is modeled in the YANG metrics data-model. This modelled metric ID is typically represented in a path like syntax, for example the CPU utilization metric id is "/stats/cpu/utilization". For a given metric there can be more than one series of data. For example with the "/stats/cpu/utilization" metric, on a system containing 4 CPU cores this metric will have 4 unique data series, one for each CPU core. The unique parameters that identify each data series are referred to as "contributors". There is always an implicit contributor which is the current router name and usually there is also a node contributor too as metrics are generally generated by a specific node (eg',":in"," the case of the CPU utilization each node will have its own 4 CPU cores). For the CPU metric the contributors are router, node and core and the t128MetricContributors object will contain a string representation of these values so that each row can be correlated with the correct metric data series."]}),"\n",(0,n.jsx)(t.h2,{id:"configuration-file",children:"Configuration File"}),"\n",(0,n.jsxs)(t.p,{children:["The metrics configuration file is stored in ",(0,n.jsx)(t.code,{children:"/etc/128technology/snmpMetricsConfig.json"}),'. There is currently only one element; "metrics" which is an array of metrics configuration elements. Each of these elements represents one metric configuration. The following elements are used to configure each metric:']}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Element"}),(0,n.jsx)(t.th,{children:"Required"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"alias"}),(0,n.jsx)(t.td,{children:"yes"}),(0,n.jsx)(t.td,{children:"Base alias returned in t128MetricAlias"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"metric_id"}),(0,n.jsx)(t.td,{children:"yes"}),(0,n.jsx)(t.td,{children:"The modelled metric ID in path form"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"contributors"}),(0,n.jsx)(t.td,{children:"yes"}),(0,n.jsx)(t.td,{children:"The list of metrics contributors defined in the metrics model"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"filters"}),(0,n.jsx)(t.td,{children:"no"}),(0,n.jsx)(t.td,{children:"An array of elements containing contributor/value pairs to filter metric with"})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"identifying-metric-id-and-contributors",children:"Identifying Metric ID and Contributors"}),"\n",(0,n.jsxs)(t.p,{children:["The metrics are modelled in YANG form which is then exported on the SSR device as the file ",(0,n.jsx)(t.code,{children:"/var/model/consolidatedStatsModel.xml"}),'. This document contains a hierarchical structure that defines the metrics, for example the "/stats/cpu/utilization" is defined as shown:']}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'<yin:container name="stats">\n  ...\n  <yin:container xmlns:nm="http://128technology.com/t128/stats/node-monitor" name="cpu" module-prefix="nm" module-name="node-monitor-stats">\n    ...\n    <yin:container name="utilization">\n      <stats:metric-type>meter</stats:metric-type>\n      ...\n      <yin:leaf name="node">\n        ...\n      </yin:leaf>\n      <yin:leaf name="core">\n        ...\n      </yin:leaf>\n'})}),"\n",(0,n.jsx)(t.p,{children:'Note that some of the XML is ommitted for brevity. Within this model it is possible to see the "node" and "core" contributors represented as leafs of the "utilization" metric.'}),"\n",(0,n.jsx)(t.h2,{id:"example-configurations",children:"Example Configurations"}),"\n",(0,n.jsx)(t.p,{children:"The following configurations give some working examples of metrics configurations."}),"\n",(0,n.jsx)(t.h3,{id:"system-and-process-metrics",children:"System and process metrics"}),"\n",(0,n.jsx)(t.p,{children:"The following configuration provides metrics related to the system CPU, disk, memory and process metrics:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "metrics": [\n        {\n            "alias": "cpuUtilization",\n            "metric_id": "/stats/cpu/utilization",\n            "contributors": ["node", "core"]\n        },\n        {\n            "alias": "memoryCapacity",\n            "metric_id": "/stats/memory/capacity",\n            "contributors": ["node"]\n        },\n        {\n            "alias": "memoryUsed",\n            "metric_id": "/stats/memory/used",\n            "contributors": ["node"]\n        },\n        {\n            "alias": "diskCapacity",\n            "metric_id": "/stats/disk/capacity",\n            "contributors": ["node"]\n        },\n        {\n            "alias": "diskUsed",\n            "metric_id": "/stats/disk/used",\n            "contributors": ["node"]\n        },\n        {\n            "alias": "processCpuUsage",\n            "metric_id": "/stats/process/cpu/usage",\n            "contributors": ["node", "process-name"]\n        },\n        {\n            "alias": "processMemoryRss",\n            "metric_id": "/stats/process/memory/rss",\n            "contributors": ["node", "process-name"]\n        }\n    ]\n}\n'})}),"\n",(0,n.jsx)(t.h3,{id:"aggregate-bandwith-and-active-session-count",children:"Aggregate bandwith and active session count"}),"\n",(0,n.jsx)(t.p,{children:"The following configuration provides metrics showing the aggregate bandwidth by each service, service-route, network-interface and tenant on the SSR platform as well as the total session count:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "metrics": [\n        {\n            "alias": "aggregateBandwithByService",\n            "metric_id": "/stats/aggregate-session/service/bandwidth",\n            "contributors": ["service"]\n        },\n        {\n            "alias": "aggregateBandwithByServiceRoute",\n            "metric_id": "/stats/aggregate-session/service-route/bandwidth",\n            "contributors": ["service-route"]\n        },\n        {\n            "alias": "aggregateBandwithByTenant",\n            "metric_id": "/stats/aggregate-session/tenant/bandwidth",\n            "contributors": ["tenant"]\n        },\n        {\n            "alias": "aggregateBandwithByNetworkInterface",\n            "metric_id": "/stats/aggregate-session/network-interface/bandwidth",\n            "contributors": ["network-interface"]\n        },\n        {\n            "alias": "sessionActive",\n            "metric_id": "/stats/session/active",\n            "contributors": ["node"]\n        }\n    ]\n}\n'})}),"\n",(0,n.jsx)(t.h3,{id:"cpu-usage-filtered-by-core",children:"CPU usage filtered by core"}),"\n",(0,n.jsx)(t.p,{children:"Metrics can be filtered to only the series desired. This may be done to minimize the size of the data being polled or to reduce extraneous information. Below is an example of a configuration showing a very simple metrics configuration with only the CPU utilization metric, filtering for metrics from only two of the cores:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "metrics": [\n        {\n            "alias": "cpuUtilization",\n            "metric_id": "/stats/cpu/utilization",\n            "contributors": ["node", "core"],\n            "filters": [{"core": "0"}, {"core": "1"}]\n        }\n    ]\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:"The resulting query of the t128MetricsTable is shown below:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'snmptable -Cl -Ci -mALL -v2c -c public 172.18.0.55 T128-METRICS-MIB::t128MetricsTable\nSNMP table: T128-METRICS-MIB::t128MetricsTable\n\nindex                   t128MetricContributors      t128MetricValue\n"cpuUtilization_0".0    Fabric128.test1.0           1\n"cpuUtilization_1".0    Fabric128.test1.1           100\n'})}),"\n",(0,n.jsx)(t.p,{children:'Note that in this response the t128MetricAlias returns two metric instances "cpuUtilization_0" and "cpuUtilization_1", one for each filter. Within each of these metrics instances there is one data series one for each data series and that the series are limited to only the cores specified (in this system cores 2 and 3 are being filtered).'})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>o});var n=i(96540);const r={},s=n.createContext(r);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);