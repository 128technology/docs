"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9894],{46467:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var o=t(74848),i=t(28453);const r={title:"Rolling Back Software",sidebar_label:"Rollback"},l=void 0,s={id:"intro_rollback",title:"Rolling Back Software",description:"Occasionally you may want or need to revert to a previously running version of SSR software. This is referred to as rolling back, and can be accomplished via either the standalone SSR installer application, or by using Automated Provisioner. (Note: as with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by an SSR Conductor.)",source:"@site/docs/intro_rollback.md",sourceDirName:".",slug:"/intro_rollback",permalink:"/docs/intro_rollback",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Rolling Back Software",sidebar_label:"Rollback"},sidebar:"docs",previous:{title:"Upgrading",permalink:"/docs/intro_upgrading"},next:{title:"Manually Installing the SSR",permalink:"/docs/intro_installation_installer"}},a={},c=[{value:"Rollback Considerations",id:"rollback-considerations",level:2},{value:"Rolling Back using Automated Provisioner",id:"rolling-back-using-automated-provisioner",level:3},{value:"Rolling Back using the Interactive Installer",id:"rolling-back-using-the-interactive-installer",level:3}];function d(e){const n={admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["Occasionally you may want or need to revert to a previously running version of SSR software. This is referred to as ",(0,o.jsx)(n.em,{children:"rolling back"}),", and can be accomplished via either the standalone SSR installer application, or by using Automated Provisioner. (Note: as with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by an SSR Conductor.)"]}),"\n",(0,o.jsx)(n.h2,{id:"rollback-considerations",children:"Rollback Considerations"}),"\n",(0,o.jsx)(n.p,{children:"Rollbacks are not supported if configuration changes are made after the conductor or router are updated to the target version. For example, if the conductor and/or router has been upgraded to version 5.4, and a new feature such as Traffic Engineering is configured on the target conductor or router, rolling back to an earlier version of software may result in loss of configuration or router functionality."}),"\n",(0,o.jsx)(n.p,{children:"If rolling back must be done with the interactive installer (below), the salt-minion must be shutdown.\nThis is done on the target node using the following command:"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"sudo systemctl stop salt-minion"})}),"\n",(0,o.jsx)(n.p,{children:"Conductors can only be rolled back with the interactive installer. Shutting down the salt-minion is required."}),"\n",(0,o.jsx)(n.h3,{id:"rolling-back-using-automated-provisioner",children:"Rolling Back using Automated Provisioner"}),"\n",(0,o.jsx)(n.p,{children:"From the PCLI command line on your conductor, issue the command:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"send command rollback router [router name]\n"})}),"\n",(0,o.jsx)(n.p,{children:"Confirming the action will initiate the rollback process."}),"\n",(0,o.jsx)(n.h3,{id:"rolling-back-using-the-interactive-installer",children:"Rolling Back using the Interactive Installer"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Launch a Linux command prompt window on the node you wish to rollback."}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"To avoid SSH session timeout during installation, it is strongly recommended to use the Screen utility when performing a rollback in interactive mode."})}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Create a screen and attach to it."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"screen -d -m -s <name-of-screen-session>\nscreen -x <name-of-screen-session>\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Shut down the salt-minion on the target node using the following command:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"sudo systemctl stop salt-minion\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Enter the command to launch the interactive installer wizard."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"sudo install128t\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Skip the step regarding the installation of a certificate by selecting ",(0,o.jsx)(n.em,{children:"No"})," at the prompt."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"The Interactive Installer will determine that SSR software is already installed. In the dialog box, navigate to the item labeled Roll Back and press the space bar to select the item."}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsx)(n.p,{children:"The version of software that will be running after executing the roll back function is displayed in the footer of the window."})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Navigate to the OK button and press ",(0,o.jsx)(n.code,{children:"enter"})," to select it."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Follow the on-screen prompts to complete the Roll Back operation."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Detach from the Screen utility."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ctrl+a\nd\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>s});var o=t(96540);const i={},r=o.createContext(i);function l(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);