"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[7152],{83646:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var r=t(74848),i=t(28453);const o={title:"Programmable Command Line Interface (PCLI)",sidebar_label:"PCLI"},s=void 0,c={id:"concepts_pcli",title:"Programmable Command Line Interface (PCLI)",description:"About the PCLI",source:"@site/docs/concepts_pcli.md",sourceDirName:".",slug:"/concepts_pcli",permalink:"/docs/concepts_pcli",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Programmable Command Line Interface (PCLI)",sidebar_label:"PCLI"},sidebar:"docs",previous:{title:"Machine Communication",permalink:"/docs/concepts_machine_communication"},next:{title:"Session Timers",permalink:"/docs/concepts_session_timer"}},a={},d=[{value:"About the PCLI",id:"about-the-pcli",level:2},{value:"The PCLI Prompt",id:"the-pcli-prompt",level:2},{value:"Shortcuts",id:"shortcuts",level:2},{value:"<code>&lt;ctrl&gt;+z</code>",id:"ctrlz",level:3},{value:"<code>!</code> (run previous command)",id:"-run-previous-command",level:3},{value:"Features",id:"features",level:2},{value:"Paste Config",id:"paste-config",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",sup:"sup",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"about-the-pcli",children:"About the PCLI"}),"\n",(0,r.jsx)(n.p,{children:"The Programmable Command Line Interface (PCLI) is one of the two primary human interfaces for the SSR; this document uses the terms PCLI and CLI interchangeably. This document describes how to use the PCLI commands supported by the SSR."}),"\n",(0,r.jsxs)(n.p,{children:["Note that all of the examples in this document are run as the ",(0,r.jsx)(n.em,{children:"admin"})," role (as denoted by the prompt in this and other examples); however, each command also indicates which user roles \u2013 either ",(0,r.jsx)(n.em,{children:"user"})," or ",(0,r.jsx)(n.em,{children:"admin"})," at the time of this writing \u2013 are eligible to run the command based upon that command's privileges. Note that unprivileged ",(0,r.jsx)(n.em,{children:"user"}),' accounts are not only unable to execute these commands, they do not "see" them in the PCLI as part of the help text, etc.']}),"\n",(0,r.jsxs)(n.p,{children:["Optional arguments are written in brackets (",(0,r.jsx)(n.code,{children:"["})," ",(0,r.jsx)(n.code,{children:"]"}),"), and users may include or omit them as needed. Variable arguments (where users need to supply a value, rather than entering in the literal string shown in the syntax) are written in angle brackets (",(0,r.jsx)(n.code,{children:"<"})," ",(0,r.jsx)(n.code,{children:">"}),")."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"show stats packet-processing action failure [core <core>]\n"})}),"\n",(0,r.jsxs)(n.p,{children:["In this example, a user may include core information",(0,r.jsx)(n.sup,{children:(0,r.jsx)(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),'. If including core, the user must supply the literal string "core" and a value for the core, such as "0".']}),"\n",(0,r.jsx)(n.p,{children:"Braces, brackets, and pipes are often combined and nested to describe the complete grammar of the command line syntax for any given command."}),"\n",(0,r.jsx)(n.h2,{id:"the-pcli-prompt",children:"The PCLI Prompt"}),"\n",(0,r.jsx)(n.p,{children:'The PCLI will indicate when there are uncommitted configuration changes via a change to the prompt. When uncommitted changes exist, the prompt is prefixed with an asterisk ("*"):'}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"*admin@labsystem1.fiedler#\n*admin@labsystem1.fiedler# validate\nCandidate configuration is valid\n*admin@labsystem1.fiedler# commit\nAre you sure you want to commit the candidate config? [y/N]: y\nConfiguration committed\nadmin@labsystem1.fiedler#\n"})}),"\n",(0,r.jsx)(n.h2,{id:"shortcuts",children:"Shortcuts"}),"\n",(0,r.jsx)(n.h3,{id:"ctrlz",children:(0,r.jsx)(n.code,{children:"<ctrl>+z"})}),"\n",(0,r.jsx)(n.p,{children:"This command is the equivalent to the following two actions:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<enter>"}),": Execute what is currently on the prompt line (if any)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"top<enter>"}),": Exit the current menu and go to the root of the PCLI tree."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"When the buffer is empty:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@node1.router1# configure authority router router1 <enter>\nadmin@node1.router1 (router[name=router1])# <ctrl-z>\nadmin@node1.router1#\n"})}),"\n",(0,r.jsx)(n.p,{children:"With a valid command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@node1.router1# configure authority router router1 <enter>\nadmin@node1.router1 (router[name=Fabric128])# validate <ctrl-z>\n\u2714 Validating...\nCandidate configuration is valid\nadmin@node1.router1#\n"})}),"\n",(0,r.jsx)(n.p,{children:"With an invalid command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@node1.router1 (router[name=router1])# bad <ctrl-z>\nCommand 'bad' not found (use '?' for help)\nadmin@node1.router1#\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"-run-previous-command",children:[(0,r.jsx)(n.code,{children:"!"})," (run previous command)"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"!"})," can be used to execute a previously executed command from the PCLI's history."]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["PCLI history can be seen by running ",(0,r.jsx)(n.code,{children:"show history"}),"."]})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"!"})," command offers three options:"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"!!"}),": Re-run the last command."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"!<number>"}),": Re-run a specific command from the PCLI history. Negative numbers are supported to perform a reverse search of the history (i.e., ",(0,r.jsx)(n.code,{children:"!-1"})," = ",(0,r.jsx)(n.code,{children:"!!"}),")."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"!<string>"}),": Re-run the most recent substring match from the PCLI history (reverse search of history)."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsx)(n.h3,{id:"paste-config",children:"Paste Config"}),"\n",(0,r.jsxs)(n.p,{children:["When working across multiple systems, it is convenient to copy snippets of one configuration and paste them directly into another SSR configuration. The PCLI detects configuration entered in bulk and accepts input in either ",(0,r.jsx)(n.code,{children:"show config"})," native format or flat format. Invalid configuration is handled as if it were entered line by line."]}),"\n",(0,r.jsx)(n.p,{children:"An example of copying a service from one system and pasting it to another is shown below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@tp-colo-primary.tp-colo# show config running authority service internet_service\n\nconfig\n\n    authority\n\n        service  internet_service\n            name                  internet_service\n            enabled               true\n            scope                 private\n            security              no_encryption\n            address               0.0.0.0/0\n\n            access-policy         _internal_\n                source      _internal_\n                permission  allow\n            exit\n\n            access-policy         t128\n                source      t128\n                permission  allow\n            exit\n            service-policy        data-best-effort\n            share-service-routes  true\n        exit\n    exit\nexit\n\n...\n\nadmin@tp-colo-secondary.tp-colo# config\n(config)> authority\n(authority)> service internet_service\n(service)> name internet_service\n(service)> enabled true\n(service)> scope private\n(service)> security no_encryption\n(service)> address 0.0.0.0/0\n(service)> access-policy linux\n(access-policy)> source linux\n(access-policy)> permission allow\n(access-policy)> exit\n(service)> access-policy t128\n(access-policy)> source t128\n(access-policy)> permission allow\n(access-policy)> exit\n(service)> service-policy data-best-effort\n(service)> share-service-routes true\n(service)> exit\n(authority)> exit\n(config)> exit\n"})}),"\n",(0,r.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,r.jsx)(n.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{id:"user-content-fn-1",children:["\n",(0,r.jsxs)(n.p,{children:["forwarding plan metrics are stored uniquely per worker ",(0,r.jsx)(n.code,{children:"forwarding-core-count"}),". ",(0,r.jsx)(n.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var r=t(96540);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);