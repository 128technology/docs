"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2299],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return m}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(a),m=r,g=u["".concat(l,".").concat(m)]||u[m]||p[m]||i;return a?n.createElement(g,o(o({ref:t},d),{},{components:a})):n.createElement(g,o({ref:t},d))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9112:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return d},default:function(){return u}});var n=a(87462),r=a(63366),i=(a(67294),a(3905)),o=["components"],s={title:"LDAP",sidebar_label:"LDAP"},l=void 0,c={unversionedId:"config_ldap",id:"config_ldap",title:"LDAP",description:"Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an Internet Protocol (IP) network. The SSR Networking Platform can be configured to leverage an LDAP server to authenticate administrative users to the PCLI and GUI interfaces for administration, configuration, and management.",source:"@site/docs/config_ldap.md",sourceDirName:".",slug:"/config_ldap",permalink:"/docs/config_ldap",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"LDAP",sidebar_label:"LDAP"},sidebar:"docs",previous:{title:"Access Management",permalink:"/docs/config_access_mgmt"},next:{title:"Authentication Methods",permalink:"/docs/config_radius"}},d=[{value:"Basic Configuration",id:"basic-configuration",children:[],level:2},{value:"Sample Configurations",id:"sample-configurations",children:[{value:"<code>certificate-assurance</code> Configuration Example",id:"certificate-assurance-configuration-example",children:[],level:4},{value:"<code>auto-generate-filter</code> Configuration Example",id:"auto-generate-filter-configuration-example",children:[],level:4},{value:"<code>user-search-base</code> and <code>group-search-base</code> Configuration Examples",id:"user-search-base-and-group-search-base-configuration-examples",children:[],level:4}],level:2},{value:"LDAP User Account Requirements",id:"ldap-user-account-requirements",children:[],level:2},{value:"Implementation Notes",id:"implementation-notes",children:[{value:"Logging",id:"logging",children:[],level:3}],level:2},{value:"Debugging Issues Using LDAP",id:"debugging-issues-using-ldap",children:[],level:2}],p={toc:d};function u(e){var t=e.components,a=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an Internet Protocol (IP) network.",(0,i.kt)("sup",{parentName:"p",id:"fnref-1"},(0,i.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," The SSR Networking Platform can be configured to leverage an LDAP server to authenticate administrative users to the PCLI and GUI interfaces for administration, configuration, and management."),(0,i.kt)("h2",{id:"basic-configuration"},"Basic Configuration"),(0,i.kt)("p",null,"Configuring LDAP on the SSR is done globally, and is done within the ",(0,i.kt)("inlineCode",{parentName:"p"},"authority > ldap-server")," configuration element. The SSR authority configuration may only have one ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap-server")," configured at a time."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap-server")," configuration has the following attributes:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"name"),": a unique name that the SSR uses to reference this configuration."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"address"),": the IP address or FQDN of the LDAP server.",(0,i.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If using an FQDN/hostname, this name must be resolvable by the SSR.")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"search-base"),": The search base defines the starting point for the search in the directory tree. For example, SSR might need to query the entire directory, in which case the search base must specify the root of the directory service. Or, SSR might need to query a specific organizational unit (OU) in the directory. Generally this is configured as a series of ",(0,i.kt)("em",{parentName:"li"},"Domain Components"),', which are abbreviated "dc."'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"server-type"),": An enumeration, which can be ",(0,i.kt)("em",{parentName:"li"},"global-catalog"),", ",(0,i.kt)("em",{parentName:"li"},"ldaps"),", or ",(0,i.kt)("em",{parentName:"li"},"starttls"),". For Active Directory LDAP servers, use ",(0,i.kt)("inlineCode",{parentName:"li"},"global-catalog"),". LDAPS is LDAP wrapped in SSL, and is a non-standard (yet popular) implementation. StartTLS is instead built into the LDAP protocol itself. Consult your LDAP server's documentation to determine the server-type most appropriate for your deployment.",(0,i.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The default type is ldaps, which requires TLS/SSL for the entire duration of the connection"))),(0,i.kt)("div",{parentName:"li",className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},'The "starttls" type will not send user passwords in the process of being validated in the clear (it requires that STARTTLS be performed, and uses that channel for sending the password), but all other LDAP traffic (including the bind request and credentials used for binding) ',(0,i.kt)("em",{parentName:"p"},"are")," sent in the clear.")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"port"),": the listening port on your LDAP server. Using ",(0,i.kt)("inlineCode",{parentName:"li"},"server-type-default")," will select the default port based on the server-type configured (3269 for global-catalog, 636 for LDAPS, 389 for StartTLS)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"bind-type"),": an enumeration of ",(0,i.kt)("em",{parentName:"li"},"anonymous"),", ",(0,i.kt)("em",{parentName:"li"},"unauthenticated"),", or ",(0,i.kt)("em",{parentName:"li"},"password"),". This is how your SSR will authenticate to your LDAP server."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"distinguished-name"),": the name to use when binding to the server; available when bind-type is set to ",(0,i.kt)("inlineCode",{parentName:"li"},"password"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"password"),": the password to use to bind to the server (available when bind-type is set to ",(0,i.kt)("inlineCode",{parentName:"li"},"password"),")")),(0,i.kt)("p",null,"The following ",(0,i.kt)("inlineCode",{parentName:"p"},"ldap-server")," configuration options have been added with SSR Version 5.5.2:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"certificate-assurance"),": Allows the SSR to perform different levels of server certificate verification in a TLS session. The following values can be specified:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Weak:")," Do not request or check any server certificates."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Mild:")," Ignore invalid or missing certificates, but check for hostname."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Moderate:")," Terminate on invalid certificate, but ignore missing certificates."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Strong:")," (Default) Terminate on invalid and missing certificates."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"auto-generate-filter"),": Turn on or off user- and group-based filters automatically.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"True"),": (Default) SSR generates user- and group-based filters."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"False"),": SSR does not generate user- and group-based filters."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"user-search-base"),": Allows users to set user-search-base filters when auto-generate-filter is false for server-type global-catalog. See the configuration examples below for usage."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"group-search-base"),": Allows users to set group-search-base filters when auto-generate-filter is false for server-type global-catalog.  See the configuration examples below for usage.")),(0,i.kt)("h2",{id:"sample-configurations"},"Sample Configurations"),(0,i.kt)("p",null,"The following sample configuration interfaces with Microsoft Active Directory."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'ldap-server ActiveDirectory\n    name ActiveDirectory\n    address activedirectory.mydomain.com\n    search-base DC=mydomain,DC=com\n    server-type global-catalog\n    port server-type-default\n    bind-type password\n    distinguished-name "CN=commonname,OU=orgunit,DC=mydomain,DC=com"\n    password (removed)\nexit\n')),(0,i.kt)("h4",{id:"certificate-assurance-configuration-example"},(0,i.kt)("inlineCode",{parentName:"h4"},"certificate-assurance")," Configuration Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    true\ncertificate-assurance   strong\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n")),(0,i.kt)("h4",{id:"auto-generate-filter-configuration-example"},(0,i.kt)("inlineCode",{parentName:"h4"},"auto-generate-filter")," Configuration Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    false\ncertificate-assurance   strong\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n")),(0,i.kt)("h4",{id:"user-search-base-and-group-search-base-configuration-examples"},(0,i.kt)("inlineCode",{parentName:"h4"},"user-search-base")," and ",(0,i.kt)("inlineCode",{parentName:"h4"},"group-search-base")," Configuration Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    false\ncertificate-assurance   strong\nuser-search-base    DC=DIR, DC=slb,DC=com?subtree?(|(&(objectCategory=user)(memberOf=CN=128t-admin,OU=EAR-AA-899,OU=Applications,OU=Groups,DC=DIR,DC=slb,DC=com)))\n\ngroup-search-base      OU=EAR-AA-899,OU=Applications,OU=Groups,DC=DIR,DC=slb,DC=com?subtree?(&(objectclass=group)(|(cn=128t-admin)(cn=128t-user)))\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n")),(0,i.kt)("h2",{id:"ldap-user-account-requirements"},"LDAP User Account Requirements"),(0,i.kt)("p",null,"It is important to ensure that administrative users are configured on the LDAP server as being a member of a group called ",(0,i.kt)("inlineCode",{parentName:"p"},"128t-user")," for read-only access to the configuration, or ",(0,i.kt)("inlineCode",{parentName:"p"},"128t-admin")," for read-write access to configuration. These group names are case sensitive."),(0,i.kt)("h2",{id:"implementation-notes"},"Implementation Notes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"show user")," within the PCLI (and GUI's User management page) allows viewing LDAP users that have connected to SSR"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"edit user")," within the PCLI (and GUI's User management page) allows editing LDAP users, (changing password, display name, enabled/disabled). While saving these changes may report back that it has completed successfully, these changes ",(0,i.kt)("em",{parentName:"li"},"are not")," saved in the LDAP server."),(0,i.kt)("li",{parentName:"ul"},"Having local SSR users with the same name as LDAP users is not supported."),(0,i.kt)("li",{parentName:"ul"},'The "admin" user is always authenticated locally;  any "admin" user in ldap is ignored'),(0,i.kt)("li",{parentName:"ul"},"If the TLS certificates for LDAP servers are not from a CA recognized by openssl's CA bundle, trust for the certificate must be configured manually (in linux)"),(0,i.kt)("li",{parentName:"ul"},"When the system is configured to use LDAP for user authentication, the status of the LDAP connection can be seen on the Users page of the GUI. This is a high level status of connectivity to retrieve user and group information based on the LDAP configuration.")),(0,i.kt)("h3",{id:"logging"},"Logging"),(0,i.kt)("p",null,"For SSR Version 5.5.2 an LDAP log category has been added to allow you to change the LDAP log level."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"admin@test1.RTR_EAST_CONDUCTOR# set log level category ldap\nconfigured debug      error      fatal      force      info       node       router     trace      warning    \nadmin@test1.RTR_EAST_CONDUCTOR# set log level category ldap debug\n\u2714 Setting log level...\nLog level successfully set\n")),(0,i.kt)("h2",{id:"debugging-issues-using-ldap"},"Debugging Issues Using LDAP"),(0,i.kt)("p",null,"For diagnosing connection status from linux"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sssctl domain-status <name-of-configured-ldap-server-in-128t-config>\n")),(0,i.kt)("p",null,"To test what a user's current group memberships are from linux"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"id -Gn <user-name>\n")),(0,i.kt)("p",null,"There is a minimum delay of 5 minutes from when a user's groups are retrieved before the server will be consulted again, so changes that are made on the server may appear to lag a bit."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sss_cache -u <user>\n")),(0,i.kt)("div",{className:"footnotes"},(0,i.kt)("hr",{parentName:"div"}),(0,i.kt)("ol",{parentName:"div"},(0,i.kt)("li",{parentName:"ol",id:"fn-1"},(0,i.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol"},"https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol"),(0,i.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}u.isMDXComponent=!0}}]);