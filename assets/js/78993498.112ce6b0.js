"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[2904],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return g}});var i=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(t),g=a,h=d["".concat(s,".").concat(g)]||d[g]||u[g]||o;return t?i.createElement(h,r(r({ref:n},p),{},{components:t})):i.createElement(h,r({ref:n},p))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var c=2;c<o;c++)r[c]=t[c];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},72819:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var i=t(87462),a=t(63366),o=(t(67294),t(3905)),r=["components"],l={title:"Introduction to Plugins",sidebar_label:"Introduction"},s=void 0,c={unversionedId:"plugin_intro",id:"plugin_intro",title:"Introduction to Plugins",description:"128T plugins are software components that enhance the functionality and user experience of the 128T Session Smart routing platform by leveraging the extensible nature of the 128T conductor and router. Plugins can provide a robust delivery mechanism for a variety of use cases. The behavior of each plugin is specific to the use case but follow a general pattern",source:"@site/docs/plugin_intro.md",sourceDirName:".",slug:"/plugin_intro",permalink:"/docs/plugin_intro",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Introduction to Plugins",sidebar_label:"Introduction"},sidebar:"docs",previous:{title:"Initializer Preferences File Reference",permalink:"/docs/initializer_preferences"},next:{title:"AWS Transit Gateway Connect",permalink:"/docs/plugin_aws_tgw_connect"}},p=[{value:"Plugin Workflow",id:"plugin-workflow",children:[{value:"Installation and management",id:"installation-and-management",children:[{value:"Installing a new plugin",id:"installing-a-new-plugin",children:[],level:4},{value:"Upgrading an existing plugin",id:"upgrading-an-existing-plugin",children:[],level:4},{value:"Removing installed plugin",id:"removing-installed-plugin",children:[],level:4},{value:"Running Plugin Commands",id:"running-plugin-commands",children:[],level:4}],level:3},{value:"Enabling plugin-specific configuration",id:"enabling-plugin-specific-configuration",children:[],level:3},{value:"Installing and managing software on the router",id:"installing-and-managing-software-on-the-router",children:[],level:3}],level:2},{value:"Plugin Concepts",id:"plugin-concepts",children:[{value:"KNI network scripts",id:"kni-network-scripts",children:[],level:3},{value:"Service Function Chaining",id:"service-function-chaining",children:[],level:3},{value:"Application Identification",id:"application-identification",children:[],level:3},{value:"Plugin Management",id:"plugin-management",children:[{value:"Show Available Plugins",id:"show-available-plugins",children:[],level:4},{value:"Show Installed Plugins",id:"show-installed-plugins",children:[],level:4},{value:"Show Plugin State",id:"show-plugin-state",children:[],level:4},{value:"Install or Remove a Plugin",id:"install-or-remove-a-plugin",children:[],level:4}],level:3}],level:2}],u={toc:p};function d(e){var n=e.components,l=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},u,l,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"128T plugins are software components that enhance the functionality and user experience of the 128T Session Smart routing platform by leveraging the extensible nature of the 128T conductor and router. Plugins can provide a robust delivery mechanism for a variety of use cases. The behavior of each plugin is specific to the use case but follow a general pattern"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Add plugin specific configuration to the conductor GUI and PCLI"),(0,o.kt)("li",{parentName:"ul"},"Manage and install software on the router"),(0,o.kt)("li",{parentName:"ul"},"Leverage extensible functions on the router")),(0,o.kt)("h2",{id:"plugin-workflow"},"Plugin Workflow"),(0,o.kt)("p",null,"Plugins enable a variety of use cases to be implemented to enhance the 128T router experience. These plugins can range from something as simple as managing system settings on the router like the ",(0,o.kt)("inlineCode",{parentName:"p"},"128T-journal")," plugin for managing systemd journal size to something more advanced such as ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_ipsec_client"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-ipsec-client"))," which allows for the creation and management of IPSec client tunnels on the 128T router. Regardless of the usage and the complexity of the plugin they follow a general workflow."),(0,o.kt)("h3",{id:"installation-and-management"},"Installation and management"),(0,o.kt)("p",null,"The 128T conductor GUI provides a dashboard to view and manage all available plugins."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T Plugin Dasboard",src:t(96216).Z})),(0,o.kt)("p",null,"The dashboard above shows the available and installed plugins. The ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_dns_cache"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-dns-cache"))," plugin in the dashboard above is available and ready to be installed on the conductor. The ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_gre"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-gre"))," plugin shows a green icon meaning it has been installed and ready to be configured. The ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_ipsec_client"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-ipsec-client"))," plugin has an orange icon indicating that a new version of the plugin is available for installation, though the currently installed version is still actively being used by the conductor."),(0,o.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Upon installation, removal or upgrade of a plugin, the Conductor must be restarted for the changes to take effect."))),(0,o.kt)("h4",{id:"installing-a-new-plugin"},"Installing a new plugin"),(0,o.kt)("p",null,"The available plugin can be downloaded and installed by clicking on the ",(0,o.kt)("inlineCode",{parentName:"p"},"Install")," button on the bottom right and it provides feedback on the installation status and other instructions."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T Plugin Installation",src:t(57653).Z})),(0,o.kt)("h4",{id:"upgrading-an-existing-plugin"},"Upgrading an existing plugin"),(0,o.kt)("p",null,"When plugin upgrades are available, the ",(0,o.kt)("inlineCode",{parentName:"p"},"Upgrade")," button on the bottom can be used to install the latest version of the plugin."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T Plugin Upgrade",src:t(10042).Z})),(0,o.kt)("h4",{id:"removing-installed-plugin"},"Removing installed plugin"),(0,o.kt)("p",null,"Installed plugin can be removed from the UI by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"Uninstall")," button on the bottom right."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T Plugin Uninstall",src:t(79688).Z})),(0,o.kt)("h4",{id:"running-plugin-commands"},"Running Plugin Commands"),(0,o.kt)("p",null,"Commands that are bundled with installed plugins may be run from the GUI using the Plugin Commands interface. Selecting Plugins from the Administration menu opens a list of the installed plugins. Select the DETAILS button for an installed plugin to view the State and Commands Tabs. Use the Commands tab to execute commands available for the individual plugins. "),(0,o.kt)("h3",{id:"enabling-plugin-specific-configuration"},"Enabling plugin-specific configuration"),(0,o.kt)("p",null,"The conductor provides extensibility APIs through which plugins can add plugin-specific configuration to the 128T conductor. This mechanism is especially useful for collecting various user inputs to drive the plugin behavior. For example, the ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_gre"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-gre"))," uses the configuration to obtain tunnel configuration for the router."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T GRE configuration",src:t(55108).Z})),(0,o.kt)("p",null,"Such advanced plugins take advantage of other conductor APIs to inject derived configuration such as ",(0,o.kt)("a",{parentName:"p",href:"#kni-network-scripts"},"knis"),", service and service-route into the configuration. This enables the plugins to better manage their feature and functionality on the router.  Such plugins are used to chain together various ",(0,o.kt)("a",{parentName:"p",href:"#service-function-chaining"},"service functions")," on the router to allow additional software to be easily deployed and managed."),(0,o.kt)("h3",{id:"installing-and-managing-software-on-the-router"},"Installing and managing software on the router"),(0,o.kt)("p",null,"In the 128T platform architecture, ",(0,o.kt)("inlineCode",{parentName:"p"},"salt")," is used as communication mechanism between router and conductor for managing the 128T software on the router. In the similar fashion, the plugins can also install additional software and manage state on the router via ",(0,o.kt)("inlineCode",{parentName:"p"},"salt")," by leveraging pillar generation APIs provided by the conductor. Most plugins will typically leverage salt to perform one or all of the following functions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Install an rpm along with its dependencies on the router"),(0,o.kt)("li",{parentName:"ul"},"Configure additional software on the router"),(0,o.kt)("li",{parentName:"ul"},"Trigger additional services or functions on the router such as systemd services etc.")),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Plugins rely on connectivity between the conductor and router to drive their logic. They also rely on the router to have access to the 128T RPM repository as either direct access over internet or by leveraging ",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_upgrading#routers-with-restricted-internet-access"},"conductor hosted repo"),"."))),(0,o.kt)("h2",{id:"plugin-concepts"},"Plugin Concepts"),(0,o.kt)("p",null,"Some of the more advanced plugins such as ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_ipsec_client"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-ipsec-client"))," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_gre"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-gre"))," rely on various extensibility features available on the router to perform their functions. Some of the commonly used concepts are as follows."),(0,o.kt)("h3",{id:"kni-network-scripts"},"KNI network scripts"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://doc.dpdk.org/guides/prog_guide/kernel_nic_interface.html"},"The Kernel Network Interface (KNI)")," is a special interface which allows for communication between 128T router and the underlying operating system. Most common instance of KNI is the presence of a loopback interface called ",(0,o.kt)("inlineCode",{parentName:"p"},"kni254")," on the system which is typically used to enable in-band management sessions on a 128T router. KNIs also provide an extensive set of ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_kni_namespace_scripts"},"scripting functionality")," which can be used to drive additional applications on the system such as DNS masquerade, ipsec-client using libreswan, GRE stack in linux OS etc. A more detailed guide on KNI interface scripting can be found ",(0,o.kt)("a",{parentName:"p",href:"/docs/concepts_kni"},"here"),"."),(0,o.kt)("h3",{id:"service-function-chaining"},"Service Function Chaining"),(0,o.kt)("p",null,"One of the most common use case for plugins is the notion of service function chaining whereby ",(0,o.kt)("inlineCode",{parentName:"p"},"ingress")," traffic (typically from a lan interface) is routed through the linux OS to be passed through a ",(0,o.kt)("inlineCode",{parentName:"p"},"service function")," which can be used to inspect, encapsulate, transform or provide additional functionality on the incoming traffic. Once the service function in linux is applied it will result in a new set of sessions being created towards the ",(0,o.kt)("inlineCode",{parentName:"p"},"egress")," interfaces (typically towards a wan interface). Such a SFC function relies on the safe and reliable 128T Session Smart routing in both directions."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"128T plugin sfc",src:t(19923).Z})),(0,o.kt)("p",null,"In a SFC implementation, typically the traffic is received from the ",(0,o.kt)("inlineCode",{parentName:"p"},"ingress")," interface and is processed by an ",(0,o.kt)("inlineCode",{parentName:"p"},"ingress-service"),". The service would then direct the traffic towards an ",(0,o.kt)("inlineCode",{parentName:"p"},"ingress")," KNI. Depending on the type of the plugin, there may be additional applications running in a network namespace. For example, the ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_gre"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-gre"))," plugin creates native GRE tunnels supported by Linux OS in an network namespace. This is referred to as a ",(0,o.kt)("inlineCode",{parentName:"p"},"service function")," as seen in the graphic above. Once the function performs its intended role, the traffic is then forwarded through the ",(0,o.kt)("inlineCode",{parentName:"p"},"egress kni")," back into the 128T router for further processing. Once the egress traffic is received (back) into 128T router, it allows the user to apply all possible routing concepts such as local breakout, secure-vector routing etc to the ",(0,o.kt)("inlineCode",{parentName:"p"},"egress")," traffic. In case of the GRE plugin, for example, the tunnel IP traffic is typically forwarded to the peer endpoint via local breakout."),(0,o.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Consider appropriate tenancy for each side of the traffic (ingress vs egress) to not only provide appropriate security but also to avoid issues with the sessions from two sides colliding with each other."))),(0,o.kt)("h3",{id:"application-identification"},"Application Identification"),(0,o.kt)("p",null,"128T router have powerful application-based routing capabilities using ",(0,o.kt)("a",{parentName:"p",href:"/docs/concepts_appid#appid-using-modules"},"modules")," which can provide a name to ip-prefix mapping. As the documentation suggests, the module based approach requires programming expertise and as a result lends itself very well as a plugin. Several plugins utilize the app-id feature in the product to provide a meaningful user experience. The ",(0,o.kt)("a",{parentName:"p",href:"/docs/plugin_dns_app_id"},(0,o.kt)("inlineCode",{parentName:"a"},"128T-dns-app-id"))," plugin, for example, combines both the SFC concept as described ",(0,o.kt)("a",{parentName:"p",href:"#service-function-chaining"},"above")," in order to learn and cache DNS records routed through the 128T platform as well as leveraging the learned information to provide named routing for applications such as GSuite, Gmail etc by leveraging application-id."),(0,o.kt)("h3",{id:"plugin-management"},"Plugin Management"),(0,o.kt)("p",null,"The following PCLI commands are helpful for managing a suite of plugins on 128T. The commands are available for conductors running 128T versions ",(0,o.kt)("inlineCode",{parentName:"p"},"4.5.0")," and greater."),(0,o.kt)("h4",{id:"show-available-plugins"},"Show Available Plugins"),(0,o.kt)("p",null,"Show available plugins by category using ",(0,o.kt)("inlineCode",{parentName:"p"},"show plugins available [node <node>] category <category>"),". The supported categories are Application Classification, Cloud, Connectivity, Monitoring, Security, Unified Communications, Utility and Other. Show an overview of a plugin along with available versions using ",(0,o.kt)("inlineCode",{parentName:"p"},"show plugins available [node <node>] name <plugin-name>")),(0,o.kt)("h4",{id:"show-installed-plugins"},"Show Installed Plugins"),(0,o.kt)("p",null,"Show installed plugins using ",(0,o.kt)("inlineCode",{parentName:"p"},"show plugins installed [node <node>]")),(0,o.kt)("h4",{id:"show-plugin-state"},"Show Plugin State"),(0,o.kt)("p",null,"Show the current ",(0,o.kt)("inlineCode",{parentName:"p"},"detail")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"summary")," state of a plugin using ",(0,o.kt)("inlineCode",{parentName:"p"},"show plugins state [router <router>] [node <node>] [{detail | summmary}] name <plugin-name>"),". Plugin state is supported in deployments with conductors and routers running 128T versions ",(0,o.kt)("inlineCode",{parentName:"p"},"5.1.0")," and greater. Some plugins do not support state data and will not give meaningful output from this command."),(0,o.kt)("h4",{id:"install-or-remove-a-plugin"},"Install or Remove a Plugin"),(0,o.kt)("p",null,"Install/remove a plugin using ",(0,o.kt)("inlineCode",{parentName:"p"},"manage plugin {install | remove} [node <node>] name <plugin-name>")))}d.isMDXComponent=!0},55108:function(e,n,t){n.Z=t.p+"assets/images/plugin_gre_config-a2dc8adf736349cce65e2d6ef5ed5493.gif"},57653:function(e,n,t){n.Z=t.p+"assets/images/plugin_install-579f3f8a30e5a4092acbb134c5fba9c2.gif"},19923:function(e,n,t){n.Z=t.p+"assets/images/plugin_sfc-036e45af50c416ee14307707cfca9502.png"},79688:function(e,n,t){n.Z=t.p+"assets/images/plugin_uninstall-1ab42e88e0cc6a43d3792ff7ebb583dd.gif"},10042:function(e,n,t){n.Z=t.p+"assets/images/plugin_upgrade-7381124d628e782cbcef07261b8d62a3.gif"},96216:function(e,n,t){n.Z=t.p+"assets/images/plugins_dashboard-47ad414c3d74c8b89ee2af418e173193.png"}}]);