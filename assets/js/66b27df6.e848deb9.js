"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6971],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=c(r),f=a,m=p["".concat(u,".").concat(f)]||p[f]||d[f]||o;return r?n.createElement(m,i(i({ref:t},l),{},{components:r})):n.createElement(m,i({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},35635:function(e,t,r){r.r(t),r.d(t,{assets:function(){return l},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),i=["components"],s={title:"Authentication Methods",sidebar_label:"Authentication Methods"},u=void 0,c={unversionedId:"config_radius",id:"config_radius",title:"Authentication Methods",description:"| Release | Modification |",source:"@site/docs/config_radius.md",sourceDirName:".",slug:"/config_radius",permalink:"/docs/config_radius",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"Authentication Methods",sidebar_label:"Authentication Methods"},sidebar:"docs",previous:{title:"LDAP",permalink:"/docs/config_ldap"},next:{title:"Username and Password Policies",permalink:"/docs/config_password_policies"}},l={},d=[{value:"Overview",id:"overview",level:2},{value:"Configure the Radius Server",id:"configure-the-radius-server",level:2},{value:"Configure Radius Users",id:"configure-radius-users",level:2},{value:"LDAP User Authentication",id:"ldap-user-authentication",level:2},{value:"Local Users",id:"local-users",level:3}],p={toc:d};function f(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Release"),(0,o.kt)("th",{parentName:"tr",align:null},"Modification"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"5.6.0"),(0,o.kt)("td",{parentName:"tr",align:null},"Feature introduced")))),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"With the release of version 5.6, both Radius and LDAP remote authentication can be configured on a system. Radius will take precedence over LDAP, and is the first authorization request sent out. If Radius authentication is rejected or if the Radius Server is not available, then LDAP authorization is requested."),(0,o.kt)("p",null,"It is also possible to configure only Radius authentication."),(0,o.kt)("h2",{id:"configure-the-radius-server"},"Configure the Radius Server"),(0,o.kt)("p",null,"To configure radius authentication, provide the following information in the configuration of the authority:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"  radius-server  myradius\n      name     myradius\n      address  172.18.2.183\n      port     8120\n      secret   (removed) <--- testing123\n      timeout  10\n    exit\n")),(0,o.kt)("h2",{id:"configure-radius-users"},"Configure Radius Users"),(0,o.kt)("p",null,"Radius authentication is locally administered and remotely authenticated."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"admin@conductor-node-1.Conductor# create user\nUsername: test\nFull Name: Test\nAuthentication Type (remote or local): remote\nRoles (space separated): admin\nEnabled (true or false): true\nAccount 'test' successfully created\nadmin@conductor-node-1.Conductor#\n")),(0,o.kt)("h2",{id:"ldap-user-authentication"},"LDAP User Authentication"),(0,o.kt)("p",null,"LDAP users are remotely administered and remotely authenticated. For information about configuring LDAP users, please refer to ",(0,o.kt)("a",{parentName:"p",href:"/docs/config_ldap#ldap-user-account-requirements"},"LDAP User Account Requirements.")),(0,o.kt)("h3",{id:"local-users"},"Local Users"),(0,o.kt)("p",null,"Local users are locally administered and locally authenticated."),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/docs/cli_reference#create-user"},(0,o.kt)("inlineCode",{parentName:"a"},"create user"))," command allows administrators to create user accounts for user and administrative access to the SSR router's management port. Issuing the ",(0,o.kt)("inlineCode",{parentName:"p"},"create user <username>")," prompts for the new user's full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'admin@labsystem1.fiedler# create user jdeveloper\nCreating account "jdeveloper"...\nFull Name: Joe Developer\nAuthentication Type (remote or local): local\nPassword: <not echoed to screen>\nConfirm: <not echoed to screen>\nRole (user | admin) [user]: admin\nEnabled: true\nAccount "jdeveloper" successfully created\n')),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Password requirements have been updated in version 5.6. Please refer to ",(0,o.kt)("a",{parentName:"p",href:"/docs/config_password_policies"},(0,o.kt)("strong",{parentName:"a"},"Password Policies"))," for more information. ")))}f.isMDXComponent=!0}}]);