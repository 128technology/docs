"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[3358],{30552:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=s(74848),t=s(28453);const i={title:"LDAP",sidebar_label:"LDAP"},a=void 0,o={id:"config_ldap",title:"LDAP",description:"Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an Internet Protocol (IP) network. The SSR Networking Platform can be configured to leverage an LDAP server to authenticate administrative users to the PCLI and GUI interfaces for administration, configuration, and management.",source:"@site/docs/config_ldap.md",sourceDirName:".",slug:"/config_ldap",permalink:"/docs/config_ldap",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1710958440,formattedLastUpdatedAt:"Mar 20, 2024",frontMatter:{title:"LDAP",sidebar_label:"LDAP"},sidebar:"docs",previous:{title:"Access Management",permalink:"/docs/config_access_mgmt"},next:{title:"Authentication Methods",permalink:"/docs/config_radius"}},l={},c=[{value:"Basic Configuration",id:"basic-configuration",level:2},{value:"Sample Configurations",id:"sample-configurations",level:2},{value:"<code>certificate-assurance</code> Configuration Example",id:"certificate-assurance-configuration-example",level:4},{value:"<code>auto-generate-filter</code> Configuration Example",id:"auto-generate-filter-configuration-example",level:4},{value:"<code>user-search-base</code> and <code>group-search-base</code> Configuration Examples",id:"user-search-base-and-group-search-base-configuration-examples",level:4},{value:"LDAP User Account Requirements",id:"ldap-user-account-requirements",level:2},{value:"Implementation Notes",id:"implementation-notes",level:2},{value:"Logging",id:"logging",level:3},{value:"Debugging Issues Using LDAP",id:"debugging-issues-using-ldap",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",strong:"strong",sup:"sup",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an Internet Protocol (IP) network.",(0,r.jsx)(n.sup,{children:(0,r.jsx)(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})})," The SSR Networking Platform can be configured to leverage an LDAP server to authenticate administrative users to the PCLI and GUI interfaces for administration, configuration, and management."]}),"\n",(0,r.jsx)(n.h2,{id:"basic-configuration",children:"Basic Configuration"}),"\n",(0,r.jsxs)(n.p,{children:["Configuring LDAP on the SSR is done globally, and is done within the ",(0,r.jsx)(n.code,{children:"authority > ldap-server"})," configuration element. The SSR authority configuration may only have one ",(0,r.jsx)(n.code,{children:"ldap-server"})," configured at a time."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ldap-server"})," configuration has the following attributes:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"name"}),": a unique name that the SSR uses to reference this configuration."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"address"}),": the IP address or FQDN of the LDAP server."]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsx)(n.p,{children:"If using an FQDN/hostname, this name must be resolvable by the SSR."})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"search-base"}),": The search base defines the starting point for the search in the directory tree. For example, SSR might need to query the entire directory, in which case the search base must specify the root of the directory service. Or, SSR might need to query a specific organizational unit (OU) in the directory. Generally this is configured as a series of ",(0,r.jsx)(n.em,{children:"Domain Components"}),', which are abbreviated "dc."']}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"server-type"}),": An enumeration, which can be ",(0,r.jsx)(n.em,{children:"global-catalog"}),", ",(0,r.jsx)(n.em,{children:"ldaps"}),", or ",(0,r.jsx)(n.em,{children:"starttls"}),". For Active Directory LDAP servers, use ",(0,r.jsx)(n.code,{children:"global-catalog"}),". LDAPS is LDAP wrapped in SSL, and is a non-standard (yet popular) implementation. StartTLS is instead built into the LDAP protocol itself. Consult your LDAP server's documentation to determine the server-type most appropriate for your deployment."]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsx)(n.p,{children:"The default type is ldaps, which requires TLS/SSL for the entire duration of the connection"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:['The "starttls" type will not send user passwords in the process of being validated in the clear (it requires that STARTTLS be performed, and uses that channel for sending the password), but all other LDAP traffic (including the bind request and credentials used for binding) ',(0,r.jsx)(n.em,{children:"are"})," sent in the clear."]})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"port"}),": the listening port on your LDAP server. Using ",(0,r.jsx)(n.code,{children:"server-type-default"})," will select the default port based on the server-type configured (3269 for global-catalog, 636 for LDAPS, 389 for StartTLS)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"bind-type"}),": an enumeration of ",(0,r.jsx)(n.em,{children:"anonymous"}),", ",(0,r.jsx)(n.em,{children:"unauthenticated"}),", or ",(0,r.jsx)(n.em,{children:"password"}),". This is how your SSR will authenticate to your LDAP server."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"distinguished-name"}),": the name to use when binding to the server; available when bind-type is set to ",(0,r.jsx)(n.code,{children:"password"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"password"}),": the password to use to bind to the server (available when bind-type is set to ",(0,r.jsx)(n.code,{children:"password"}),")"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The following ",(0,r.jsx)(n.code,{children:"ldap-server"})," configuration options have been added with SSR Version 5.5.2:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"certificate-assurance"}),": Allows the SSR to perform different levels of server certificate verification in a TLS session. The following values can be specified:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Weak:"})," Do not request or check any server certificates."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Mild:"})," Ignore invalid or missing certificates, but check for hostname."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Moderate:"})," Terminate on invalid certificate, but ignore missing certificates."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Strong:"})," (Default) Terminate on invalid and missing certificates."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"auto-generate-filter"}),": Turn on or off user- and group-based filters automatically.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"True"}),": (Default) SSR generates user- and group-based filters."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"False"}),": SSR does not generate user- and group-based filters."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"user-search-base"}),": Allows users to set user-search-base filters when auto-generate-filter is false for server-type global-catalog. See the configuration examples below for usage."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"group-search-base"}),": Allows users to set group-search-base filters when auto-generate-filter is false for server-type global-catalog.  See the configuration examples below for usage."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"sample-configurations",children:"Sample Configurations"}),"\n",(0,r.jsx)(n.p,{children:"The following sample configuration interfaces with Microsoft Active Directory."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'ldap-server ActiveDirectory\n    name ActiveDirectory\n    address activedirectory.mydomain.com\n    search-base DC=mydomain,DC=com\n    server-type global-catalog\n    port server-type-default\n    bind-type password\n    distinguished-name "CN=commonname,OU=orgunit,DC=mydomain,DC=com"\n    password (removed)\nexit\n'})}),"\n",(0,r.jsxs)(n.h4,{id:"certificate-assurance-configuration-example",children:[(0,r.jsx)(n.code,{children:"certificate-assurance"})," Configuration Example"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    true\ncertificate-assurance   strong\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n"})}),"\n",(0,r.jsxs)(n.h4,{id:"auto-generate-filter-configuration-example",children:[(0,r.jsx)(n.code,{children:"auto-generate-filter"})," Configuration Example"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    false\ncertificate-assurance   strong\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n"})}),"\n",(0,r.jsxs)(n.h4,{id:"user-search-base-and-group-search-base-configuration-examples",children:[(0,r.jsx)(n.code,{children:"user-search-base"})," and ",(0,r.jsx)(n.code,{children:"group-search-base"})," Configuration Examples"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@test1.RTR_EAST_CONDUCTOR (ldap-server[name=myldap])# show \nname                    myldap\naddress                 ad.systemsadtest.local\nsearch-base             dc=systemsadtest,dc=local\nauto-generate-filter    false\ncertificate-assurance   strong\nuser-search-base    DC=DIR, DC=slb,DC=com?subtree?(|(&(objectCategory=user)(memberOf=CN=128t-admin,OU=EAR-AA-899,OU=Applications,OU=Groups,DC=DIR,DC=slb,DC=com)))\n\ngroup-search-base      OU=EAR-AA-899,OU=Applications,OU=Groups,DC=DIR,DC=slb,DC=com?subtree?(&(objectclass=group)(|(cn=128t-admin)(cn=128t-user)))\nserver-type             global-catalog\nport                    server-type-default\nbind-type               password\ndistinguished-name  ldapuser@systemsadtest.local\npassword            (removed)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"ldap-user-account-requirements",children:"LDAP User Account Requirements"}),"\n",(0,r.jsxs)(n.p,{children:["It is important to ensure that administrative users are configured on the LDAP server as being a member of a group called ",(0,r.jsx)(n.code,{children:"128t-user"})," for read-only access to the configuration, or ",(0,r.jsx)(n.code,{children:"128t-admin"})," for read-write access to configuration. These group names are case sensitive."]}),"\n",(0,r.jsx)(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"show user"})," within the PCLI (and GUI's User management page) allows viewing LDAP users that have connected to SSR"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"edit user"})," within the PCLI (and GUI's User management page) allows editing LDAP users, (changing password, display name, enabled/disabled). While saving these changes may report back that it has completed successfully, these changes ",(0,r.jsx)(n.em,{children:"are not"})," saved in the LDAP server."]}),"\n",(0,r.jsx)(n.li,{children:"Having local SSR users with the same name as LDAP users is not supported."}),"\n",(0,r.jsx)(n.li,{children:'The "admin" user is always authenticated locally;  any "admin" user in ldap is ignored'}),"\n",(0,r.jsx)(n.li,{children:"If the TLS certificates for LDAP servers are not from a CA recognized by openssl's CA bundle, trust for the certificate must be configured manually (in linux)"}),"\n",(0,r.jsx)(n.li,{children:"When the system is configured to use LDAP for user authentication, the status of the LDAP connection can be seen on the Users page of the GUI. This is a high level status of connectivity to retrieve user and group information based on the LDAP configuration."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"logging",children:"Logging"}),"\n",(0,r.jsx)(n.p,{children:"For SSR Version 5.5.2 an LDAP log category has been added to allow you to change the LDAP log level."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"admin@test1.RTR_EAST_CONDUCTOR# set log level category ldap\nconfigured debug      error      fatal      force      info       node       router     trace      warning    \nadmin@test1.RTR_EAST_CONDUCTOR# set log level category ldap debug\n\u2714 Setting log level...\nLog level successfully set\n"})}),"\n",(0,r.jsx)(n.h2,{id:"debugging-issues-using-ldap",children:"Debugging Issues Using LDAP"}),"\n",(0,r.jsx)(n.p,{children:"For diagnosing connection status from linux"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sssctl domain-status <name-of-configured-ldap-server-in-128t-config>\n"})}),"\n",(0,r.jsx)(n.p,{children:"To test what a user's current group memberships are from linux"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"id -Gn <user-name>\n"})}),"\n",(0,r.jsx)(n.p,{children:"There is a minimum delay of 5 minutes from when a user's groups are retrieved before the server will be consulted again, so changes that are made on the server may appear to lag a bit."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sss_cache -u <user>\n"})}),"\n",(0,r.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,r.jsx)(n.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{id:"user-content-fn-1",children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol",children:"https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol"})," ",(0,r.jsx)(n.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var r=s(96540);const t={},i=r.createContext(t);function a(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);