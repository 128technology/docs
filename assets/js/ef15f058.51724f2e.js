"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6085],{742:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var i=t(74848),s=t(28453);const o={title:"Extending the GUI Navigation Bar",sidebar_label:"Extending the GUI Navigation Bar"},a=void 0,r={id:"howto_extend_gui_nav",title:"Extending the GUI Navigation Bar",description:"The SSR Networking Platform has been designed to be extended beyond its base set of capabilities. One way in which this can be realized is in extending the navigation pane within the GUI to links external to the SSR platform. This is useful when integrating third party packages into the SSR ecosystem, such as using Squid Proxy to perform URL filtering. Extending the navigation bar provides a seamless integration between the application so the user does not need to leave the SSR experience.",source:"@site/docs/howto_extend_gui_nav.md",sourceDirName:".",slug:"/howto_extend_gui_nav",permalink:"/docs/howto_extend_gui_nav",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"Extending the GUI Navigation Bar",sidebar_label:"Extending the GUI Navigation Bar"},sidebar:"docs",previous:{title:"Local Configuration Override",permalink:"/docs/how_to_local_config_override"},next:{title:"LTE and Dual LTE Configuration",permalink:"/docs/howto_lte"}},d={},c=[];function l(e){const n={a:"a",code:"code",em:"em",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["The SSR Networking Platform has been designed to be extended beyond its base set of capabilities. One way in which this can be realized is in extending the navigation pane within the GUI to links external to the SSR platform. This is useful when integrating third party packages into the SSR ecosystem, such as using ",(0,i.jsx)(n.a,{href:"http://www.squid-cache.org",children:"Squid Proxy"})," to perform URL filtering. Extending the navigation bar provides a seamless integration between the application so the user does not need to leave the SSR experience."]}),"\n",(0,i.jsx)(n.p,{children:'The example below shows the "Apple" and "Hello" added as external resources.'}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Example",src:t(14963).A+"",width:"313",height:"410"})}),"\n",(0,i.jsx)(n.p,{children:"For applications that are running on the same platform as the SSR, the authentication token can be used to guarantee access to the requested resource."}),"\n",(0,i.jsx)(n.p,{children:"In order to access the user token, the following code snippet can be leveraged:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"export function getUserToken(): string | undefined {\n  const userRaw = window.sessionStorage.getItem('user') || '{}';\n  const user = JSON.parse(userRaw);\n  return user.token;\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If the function ",(0,i.jsx)(n.code,{children:"getUserToken()"})," returns a non-emtpy string, then the token is valid and the user is considered to be logged in. Any other return value indicates an invalid token or set of credentials."]}),"\n",(0,i.jsxs)(n.p,{children:["In order to extend the web UI's sidebar, create a JSON file in the directory ",(0,i.jsx)(n.code,{children:"/etc/128technology/thirdparty/ui-links"}),".  The contents of the file ",(0,i.jsx)(n.em,{children:"must"})," follow the format:"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"example_link.json"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{ "name": "Title Of My Link", "url": "http://link.destination" }\n'})}),"\n",(0,i.jsx)(n.p,{children:"Links added in this fashion are opened in a new browser tab."}),"\n",(0,i.jsx)(n.p,{children:"Each external link requires a unique file per resource."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},14963:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/howto_extend_gui_nav-eb99dfcb6d3eee6b45201fdac323c2e9.png"},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(96540);const s={},o=i.createContext(s);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);