"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[3224],{98952:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=n(74848),s=n(28453);const i={title:"Using Saltstack at Scale With SSR",sidebar_label:"Saltstack at Scale With SSR"},r=void 0,l={id:"bcp_salt_pillars",title:"Using Saltstack at Scale With SSR",description:"Introduction",source:"@site/docs/bcp_salt_pillars.md",sourceDirName:".",slug:"/bcp_salt_pillars",permalink:"/docs/bcp_salt_pillars",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Using Saltstack at Scale With SSR",sidebar_label:"Saltstack at Scale With SSR"},sidebar:"docs",previous:{title:"Per Adjacency Traffic Engineering",permalink:"/docs/bcp_per-adjacency_traffic_engineering"},next:{title:"SD-WAN Design Guide",permalink:"/docs/bcp_sdwan_design_guide"}},o={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Using Salt with SSR",id:"using-salt-with-ssr",level:2},{value:"Using Salt Pillars",id:"using-salt-pillars",level:2},{value:"A Better Approach: Map Files",id:"a-better-approach-map-files",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,a.jsx)(t.p,{children:"This guide is intended to provide methods for users to implement custom Saltstack functionality in a performant way that will not affect their ability to provision new systems at scale."}),"\n",(0,a.jsx)(t.p,{children:"This guide is not intended to teach the users how to use Saltstack. This document will reference the Salt top file and Salt pillars. Some good resources for these topics are:"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"https://docs.saltstack.com/en/latest/ref/states/top.html",children:"Salt Top File"})}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"https://docs.saltstack.com/en/latest/topics/tutorials/pillar.html",children:"Salt Pillars"})}),"\n",(0,a.jsx)(t.h2,{id:"using-salt-with-ssr",children:"Using Salt with SSR"}),"\n",(0,a.jsx)(t.p,{children:"The SSR Conductor uses different Salt environments to logically separate the SSR specific Salt state and modules from any custom Salt modules implemented by the user. The locations for each environment are defined in the Salt-Master configuration file on the Conductor."}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/etc/128technology/salt/master"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"file_roots:\n  128T:\n    - /usr/lib/128technology/python/salt/file_roots\n  base:\n    - /srv/salt\n  plugins:\n    - /var/lib/128technology/plugins/salt\n\npillar_roots:\n  128T:\n    - /usr/lib/128technology/python/salt/pillar\n  base:\n    - /srv/pillar\n  plugins:\n    - /var/lib/128technology/plugins/pillar\n"})}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"128T"})," and ",(0,a.jsx)(t.code,{children:"plugins"})," environments are managed by the Conductor and should not be modified. The ",(0,a.jsx)(t.code,{children:"base"})," environment is left for the user to implement any custom Salt logic for their specific deployment. When a Salt Minion connects to the SSR Conductor the Salt-Master will execute the Salt highstate for each Salt environment automatically. The highstate consists of the states listed in the ",(0,a.jsx)(t.code,{children:"top.sls"})," for each environment. By default the ",(0,a.jsx)(t.code,{children:"top.sls"})," for the ",(0,a.jsx)(t.code,{children:"base"})," environment performs a dummy state meant to serve as an example to users, but can be modified to perform states for the users specific deployment:"]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/salt/top.sls"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"base:\n  '*':\n    - dummy\n"})}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/salt/dummy.sls"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"/dev/null:\n  file.touch:\n    - name: /dev/null\n"})}),"\n",(0,a.jsx)(t.h2,{id:"using-salt-pillars",children:"Using Salt Pillars"}),"\n",(0,a.jsx)(t.p,{children:"Pillars are tree-like structures of data defined on the Salt-Master and passed through to Salt Minions. Salt pillars are intended to be used for confidential information as the information is encrypted and sent securely to the respective Salt Minion. The Salt Minion uses the pillar data assigned to its Minion ID to render Salt states before executing them. The following is an example of a common approach for using Salt pillars."}),"\n",(0,a.jsx)(t.p,{children:"The pillar top file defines which pillars apply to which Salt Minions:"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/pillar/top.sls"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"base:\n  '*':\n    - common\n  'Router1NodeA':\n    - router1A\n  'Router1NodeB':\n    - router1B\n\n   ...\n\n  'Router999NodeA':\n    - router999A\n  'Router999NodeB':\n    - router999B\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsx)(t.p,{children:"The ellipsis is not part of the syntax, it serves to illustrate there are a large number of Salt Minions"})}),"\n",(0,a.jsx)(t.p,{children:"Each pillar file defined above contains the variables for a specific Salt Minion:"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/pillar/router1A.sls"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"configured_interfaces:\n  - name: eth0\n    address: '192.168.1.1'\n    netmask: '255.255.255.254'\n    gateway: '192.168.1.2\n  - name: eth1\n    address: '172.16.0.1'\n    netmask: '255.255.255.0'\n    gateway: '172.16.0.100'\n\n"})}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/pillar/router1B.sls"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"configured_interfaces:\n  - name: eth0\n    address: '192.168.1.2'\n    netmask: '255.255.255.254'\n    gateway: '192.168.1.1'\n  - name: eth1\n    address: '172.16.0.2'\n    netmask: '255.255.255.0'\n    gateway: '172.16.0.100'\n"})}),"\n",(0,a.jsx)(t.p,{children:"The pillar data can be accessed as variables in Salt states and the Salt Minion will automatically render the state with the correct pillar information when the state is executed:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"{%- set configured_interfaces = pillar.get('configured_interfaces') %}\n{%- for interface in configured_interfaces %}\n\nInterface {{ interface.name }}:\n  network.managed:\n    - enabled: True\n    - type: eth\n    - ipaddr: {{ interface.address }}\n    - netmask: {{ interface.netmask }}\n    - gateway: {{ interface.gateway }}\n    - dns:\n      - 8.8.8.8\n      - 8.8.4.4\n"})}),"\n",(0,a.jsx)(t.p,{children:"This approach quickly breaks down at scale. Each time a highstate is run the Salt-Master needs to parse the pillar top file and decide which pillar files apply to each Salt Minion. The top file supports glob matching and is not always a simple 1:1 match from Salt Minion ID to pillar file, therefore the entire file needs to be parsed each time a highstate is performed. Next, the Salt-Master encrypts the pillar data and sends it securely to each Salt Minion. These operations become extremely costly and profiling shows the Salt-Master spends 95% of its compute time compiling pillar data if the pillar top file contains more than one thousand individual pillar files. The Salt-Master becomes unable to process incoming minion requests and cannot communicate with more than ~250 minions concurrently. The Salt-Master's ten worker threads saturate to 100% CPU usage and impact the performance of the rest of the SSR processes operating on the Conductor."}),"\n",(0,a.jsx)(t.h2,{id:"a-better-approach-map-files",children:"A Better Approach: Map Files"}),"\n",(0,a.jsx)(t.p,{children:"Pillar files are best used only for sensitive data like passwords or SSH keys. Any other data should be converted to use map files instead. The swap from pillar files to map files is very simple."}),"\n",(0,a.jsxs)(t.p,{children:["Move all pillar files from the pillar directory ",(0,a.jsx)(t.code,{children:"/srv/pillar/"})," to a new data directory within the Salt file roots ",(0,a.jsx)(t.code,{children:"/srv/salt/data"})," and rename the pillar files to have the extension matching their data type instead of the ",(0,a.jsx)(t.code,{children:".sls"})," extension:"]}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["In this example the map files for each Salt Minion contain contents formatted in YAML so the file extension becomes ",(0,a.jsx)(t.code,{children:".yaml"}),". Salt also supports map files formatted in JSON, which would result in the ",(0,a.jsx)(t.code,{children:".json"})," extension instead."]})}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"/srv/salt/data/"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"-rw-r--r-- 1 root root 473 May  6 23:06 common.yaml\n-rw-r--r-- 1 root root  74 May  6 23:06 router1A.yaml\n-rw-r--r-- 1 root root  74 May  6 23:06 router1B.yaml\n-rw-r--r-- 1 root root  74 May  6 23:06 router2A.yaml\n-rw-r--r-- 1 root root  74 May  6 23:06 router2B.yaml\n...\n-rw-r--r-- 1 root root  74 May  6 23:06 router999A.yaml\n-rw-r--r-- 1 root root  74 May  6 23:06 router999B.yaml\n"})}),"\n",(0,a.jsx)(t.p,{children:"Now convert all Salt states to access the information from the map file instead of the pillar file."}),"\n",(0,a.jsx)(t.p,{children:"Before:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"{%- set configured_interfaces = pillar.get('configured_interfaces') %}\n"})}),"\n",(0,a.jsx)(t.p,{children:"After:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"{%- import_yaml 'data/%s.yaml' % opts.id as data %}\n{%- set configured_interfaces = data.get('configured_interfaces') %}\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsx)(t.p,{children:"In this example the map files for each Salt Minion are named after the Salt Minion ID. The first line uses the Salt Minion ID to form the file name."})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["In this example the map files are formatted in YAML so the Salt state uses the ",(0,a.jsx)(t.code,{children:"import_yaml"})," keyword to load the data. If the user chose to format their map files in JSON then the Salt state would use the ",(0,a.jsx)(t.code,{children:"import_json"})," keyword instead."]})}),"\n",(0,a.jsxs)(t.p,{children:["There is no need to manually sync the map file from the data directory on the Salt-Master to the Salt Minions. Since the map files located at ",(0,a.jsx)(t.code,{children:"/srv/salt/data"})," are placed within the Salt file roots ",(0,a.jsx)(t.code,{children:"/srv/salt/"})," the Salt Minion can fetch them from the Salt-Master automatically. Within the states the data file path is referenced as ",(0,a.jsx)(t.code,{children:"data/"})," as seen in the first line of the example above because the Salt state's root directory is the Salt file roots."]}),"\n",(0,a.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,a.jsx)(t.p,{children:"With the Salt pillar approach the Salt-Master renders the entire pillar top file and encrypts the pillar data each time it needs to perform highstate. With the map file approach the Salt-Master simply executes the highstate and the Salt Minion will fetch the correct map file automatically and render the information locally, saving lots of CPU cycles on the Salt-Master. With either approach the data is retrieved over an encrypted SSH tunnel between Salt Minion and Salt-Master. The only downside with the map approach is that the data is not encrypted on the Salt Minion when cached locally, which is why the map approach should not be used for sensitive data."}),"\n",(0,a.jsx)(t.p,{children:"Pillars can still be used at scale provided that the pillar top file is small. One example would be using Salt pillars to set the same root password on all managed SSR Routers:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"base:\n  '*':\n    - password\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>l});var a=n(96540);const s={},i=a.createContext(s);function r(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);