"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[5070],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(n),h=i,u=c["".concat(s,".").concat(h)]||c[h]||m[h]||o;return n?a.createElement(u,r(r({ref:t},p),{},{components:n})):a.createElement(u,r({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var d=2;d<o;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},92785:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return c}});var a=n(87462),i=n(63366),o=(n(67294),n(3905)),r=["components"],l={title:"Installer Command Line Reference",sidebar_label:"Installer Command Line Reference"},s=void 0,d={unversionedId:"installer_cli_reference",id:"installer_cli_reference",title:"Installer Command Line Reference",description:"This is a reference document for the SSR Installer command line interface.",source:"@site/docs/installer_cli_reference.md",sourceDirName:".",slug:"/installer_cli_reference",permalink:"/docs/installer_cli_reference",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Installer Command Line Reference",sidebar_label:"Installer Command Line Reference"},sidebar:"docs",previous:{title:"Show Stats Reference",permalink:"/docs/cli_stats_reference"},next:{title:"Installer Preferences File Reference",permalink:"/docs/installer_preferences"}},p=[{value:"Interactive Mode",id:"interactive-mode",children:[],level:2},{value:"Automated Mode",id:"automated-mode",children:[],level:2},{value:"Install from RPM",id:"install-from-rpm",children:[],level:2},{value:"Options",id:"options",children:[{value:"Subcommands",id:"subcommands",children:[],level:3},{value:"<code>download</code>",id:"download",children:[],level:3},{value:"<code>import</code>",id:"import",children:[{value:"Automatically find and import ISO",id:"automatically-find-and-import-iso",children:[],level:4},{value:"Specify an ISO path",id:"specify-an-iso-path",children:[],level:4}],level:3},{value:"<code>repo</code>",id:"repo",children:[{value:"List Repositories",id:"list-repositories",children:[],level:4},{value:"Enable Repositories",id:"enable-repositories",children:[],level:4},{value:"Disable Repositories",id:"disable-repositories",children:[],level:4},{value:"Update Repository Authentication",id:"update-repository-authentication",children:[],level:4}],level:3}],level:2},{value:"Manual Token Process",id:"manual-token-process",children:[],level:2},{value:"Uninstalling the SSR",id:"uninstalling-the-ssr",children:[],level:2}],m={toc:p};function c(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This is a reference document for the SSR Installer command line interface.\nTo get started installing the SSR with the Installer, see the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_installation_bootable_media"},"Conductor Interactive Installation"),"."),(0,o.kt)("p",null,"To start the Installer, run the ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t")," command."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"install128t")," must always be run as the root user, or with ",(0,o.kt)("inlineCode",{parentName:"p"},"sudo install128t.")," The Installer will detect non-root usage and exit with this message:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-txt"},"You must run the Installer as root.\n")))),(0,o.kt)("p",null,"Beginning with Installer version 2.7.0, the use of the Screen utility is no longer necessary. However, for older versions of the Installer, it is strongly recommended to use the Screen utility when performing a manual installation to avoid SSH session timeout. "),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"-h"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--help")," flag to display help information for the ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t"),"\ncommand line:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t --help\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"--version")," flag or the ",(0,o.kt)("inlineCode",{parentName:"p"},"rpm")," command may be used to determine the Installer\nversion:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ install128t --version\n128T Installer 3.0.0\n\n$ rpm -q 128T-installer\n128T-installer-3.0.0-1.x86_64\n")),(0,o.kt)("p",null,"When the Installer is used to install the SSR for the first time, it will automatically\nrun the SSR Initializer to complete setup of the SSR, unless the\n",(0,o.kt)("a",{parentName:"p",href:"#options"},(0,o.kt)("inlineCode",{parentName:"a"},"--install-only")," option")," is specified. See the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/initializer_cli_reference"},"Initializer documentation"),"\nfor the relevant version of the SSR for details on its usage and options."),(0,o.kt)("p",null,"After a successful run, the ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t")," process will exit with a return code\nof 0. If any error was encountered during the operation, the return code will\nbe non-zero."),(0,o.kt)("h2",{id:"interactive-mode"},"Interactive Mode"),(0,o.kt)("p",null,"Without any arguments, the Installer will open a wizard interface to install\nthe SSR."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t\n")),(0,o.kt)("p",null,"Follow the on-screen prompts to complete the installation and initialization process.\nStep-by-step instructions for the Installer wizard can be found in the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/intro_installation_installer#install-using-128t-installer"},"Installation Guide"),"."),(0,o.kt)("h2",{id:"automated-mode"},"Automated Mode"),(0,o.kt)("p",null,"For more advanced use cases, preferences may be specified on the command line\nto perform an operation in an automated fashion, using the ",(0,o.kt)("inlineCode",{parentName:"p"},"-p"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--preferences"),"\noption."),(0,o.kt)("p",null,"In this mode, no wizard will be displayed, but informational messages will be\nprinted to the console as the Installer is running."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ cat /tmp/preferences.json\n{\n  "install": {\n    "initialize": {\n      "node-name": "MyNode",\n      "node-ip": "127.0.0.1",\n      "node-role": "combo",\n      "router-name": "MyRouter"\n    }\n  }\n}\n\n$ install128t --preferences /tmp/preferences.json\n')),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Did you know?")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"You can specify a preferences file with ",(0,o.kt)("inlineCode",{parentName:"p"},"-p"),", but you can ",(0,o.kt)("em",{parentName:"p"},"also")," pass the\npreferences directly on the command line. For example:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'install128t -p \'{"download": {"128T-version": "4.5.7"}}\'\n')))),(0,o.kt)("p",null,"The specified preferences ",(0,o.kt)("strong",{parentName:"p"},"must")," be valid JSON (trailing commas are not allowed),\nand they must conform to the Installer preferences file schema.\nSee the ",(0,o.kt)("a",{parentName:"p",href:"/docs/installer_preferences"},"full schema documentation")," for details."),(0,o.kt)("h2",{id:"install-from-rpm"},"Install from RPM"),(0,o.kt)("p",null,"To install or upgrade the SSR directly from RPM files, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"--rpm-path")," option\nto specify a directory in which the RPM files are located."),(0,o.kt)("p",null,"In order to use this option, both an SSR RPM and the corresponding version of the\nSSR manifest RPM must be in the specified directory, as shown here:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ ls /tmp/local-install/\n128T-4.5.7-1.el7.x86_64.rpm\n128T-manifest-4.5.7.1.el7-1.x86_64.rpm\n\n$ install128t --rpm-path /tmp/local-install/\n")),(0,o.kt)("p",null,"The Installer will ask for confirmation before proceeding with the operation."),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If the specified RPM is not an upgrade to the currently installed SSR version,\nthis option will ",(0,o.kt)("strong",{parentName:"p"},"erase and reinstall")," the SSR! Pay attention to the confirmation\nprompt to ensure an upgrade will be performed (",(0,o.kt)("inlineCode",{parentName:"p"},"Confirm Upgrade"),") rather than\na reinstallation (",(0,o.kt)("inlineCode",{parentName:"p"},"Confirm Install"),")."))),(0,o.kt)("h2",{id:"options"},"Options"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Option"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-d"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--dry-run")),(0,o.kt)("td",{parentName:"tr",align:null},"Skip all steps that modify the system, e.g. downloading software or rebooting the system. This can be useful to validate a preference file without executing the operation specified in it.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-l LOG_LEVEL"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--log-level LOG_LEVEL")),(0,o.kt)("td",{parentName:"tr",align:null},"Change the log level the Installer runs with. Must be one of ",(0,o.kt)("inlineCode",{parentName:"td"},"ERROR"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"INFO"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"WARNING"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"DEBUG"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"--install-only")),(0,o.kt)("td",{parentName:"tr",align:null},"If specified, the Installer will not run the Initializer when it completes a successful installation. ",(0,o.kt)("strong",{parentName:"td"},"NOTE"),": Use this option with care; the SSR will be unable to start until it has been initialized. See the ",(0,o.kt)("a",{parentName:"td",href:"/docs/initializer_cli_reference"},"Initializer documentation")," for details on how to use it to manually initialize the SSR.")))),(0,o.kt)("h3",{id:"subcommands"},"Subcommands"),(0,o.kt)("p",null,"Besides using a preference file, ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t")," may also be used to perform other\ntasks directly from the command line, without using the interactive wizard interface."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Any subcommand may be passed the ",(0,o.kt)("inlineCode",{parentName:"p"},"-h"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--help")," flag to show its usage information\nand available options:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t download --help\n")))),(0,o.kt)("h3",{id:"download"},(0,o.kt)("inlineCode",{parentName:"h3"},"download")),(0,o.kt)("p",null,"Download the SSR software and save it to the local repository.\nAfter download, the software will be available for future installation and upgrades."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t download\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"--128T-version")," option is used to specify a version to download:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t download --128T-version 4.5.7\n")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Version requirements of the same format as the preference file may be used for\nthis option:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'install128t download --128T-version ">= 4.5.1"\n')))),(0,o.kt)("p",null,"If no version is specified, the latest available version will be downloaded."),(0,o.kt)("h3",{id:"import"},(0,o.kt)("inlineCode",{parentName:"h3"},"import")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"import")," subcommand is used to save software from other locations to the\nlocal repository, after which it will be available for future installation and\nupgrades."),(0,o.kt)("h4",{id:"automatically-find-and-import-iso"},"Automatically find and import ISO"),(0,o.kt)("p",null,"With this option, the Installer will attempt to search the local filesystem for\nan SSR ISO file, mount it, and save the contents to the local repository."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t import --iso-hunt\n")),(0,o.kt)("h4",{id:"specify-an-iso-path"},"Specify an ISO path"),(0,o.kt)("p",null,"With this option, the Installer will attempt to mount and import packages from\nthe ISO file specified."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t import --iso-path /root/128T-4.5.1-1.el7.v1.x86_64.iso\n")),(0,o.kt)("h3",{id:"repo"},(0,o.kt)("inlineCode",{parentName:"h3"},"repo")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"repo")," subcommand is used to enable or disable SSR software repositories\nused for downloading the SSR. Advanced users can use this subcommand to enable\npre-release software or update software access credentials."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"install128t repo")," has several subcommands of its own, each of which may be passed\nthe ",(0,o.kt)("inlineCode",{parentName:"p"},"-h"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--help")," option to display usage and options, like other subcommands."))),(0,o.kt)("h4",{id:"list-repositories"},"List Repositories"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"repo list")," subcommand shows the configured SSR software repositories. The ",(0,o.kt)("inlineCode",{parentName:"p"},"-a"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--all"),"\noption may be be used to show disabled repositories as well as enabled repositories."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t repo list\n")),(0,o.kt)("h4",{id:"enable-repositories"},"Enable Repositories"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"repo enable")," subcommand is used to enable SSR software repositories.\nMultiple repositories may be specified to enable each of them. The name specified\nto this command should match the name in the ",(0,o.kt)("inlineCode",{parentName:"p"},"Repository")," column of the\n",(0,o.kt)("inlineCode",{parentName:"p"},"install128t repo list")," command output."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t repo enable alpha beta\n")),(0,o.kt)("h4",{id:"disable-repositories"},"Disable Repositories"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"repo disable")," subcommand is used to disable SSR software repositories."),(0,o.kt)("p",null,"Usage matches the ",(0,o.kt)("inlineCode",{parentName:"p"},"repo enable")," command."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t repo disable alpha beta\n")),(0,o.kt)("h4",{id:"update-repository-authentication"},"Update Repository Authentication"),(0,o.kt)("p",null,"Beginning with SSR Version 5.5.2, the preferred method to save repository access credentials is to use the PCLI command ",(0,o.kt)("inlineCode",{parentName:"p"},"set software access-token"),". For additional information on this command, see ",(0,o.kt)("a",{parentName:"p",href:"/docs/cli_reference#set-software-access-token"},(0,o.kt)("inlineCode",{parentName:"a"},"set software access-token")),"."),(0,o.kt)("p",null,"For earlier software versions, the ",(0,o.kt)("inlineCode",{parentName:"p"},"repo authenticate")," subcommand is used to configure credentials for\nauthenticating with SSR software repositories. To use this subcommand, you\nmust specify both a username and a token for authentication."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"install128t repo authenticate --username my_user --token 'example$token'\n")),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If your authentication token contains special characters, the shell may expand\nor interpret them. Enclose the token in single quotes (",(0,o.kt)("inlineCode",{parentName:"p"},"'"),") to prevent shell\nexpansion."))),(0,o.kt)("p",null,"If the specified credentials are found to be invalid, the Installer will display\nan error message and exit, and the credentials will not be saved. To verify credential status, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t repo list")," command. "),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If the credentials cannot be checked (e.g. no Internet connection is available), the remote packages will appear unavailable (no upgrades available) but the credentials will still be saved. They will be checked again, if possible, the next time the Installer is run. "))),(0,o.kt)("h2",{id:"manual-token-process"},"Manual Token Process"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"It is strongly recommended that you update the token during a maintenance window. Performing these operations on a large deployment may take an extended amount of time to complete."))),(0,o.kt)("p",null,"If the SSR conductors are ugpraded to 4.5.7, 5.0.1, 5.1.1, or greater, and have the 3.0.0 (or greater) Installer, use the following procedure to either add or update the username/token:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the username/token with the ",(0,o.kt)("a",{parentName:"p",href:"#repo"},(0,o.kt)("inlineCode",{parentName:"a"},"install128t repo authenticate -u <user> -t <token>"))," process on BOTH conductors.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Restart the primary conductor with ",(0,o.kt)("inlineCode",{parentName:"p"},"systemctl restart 128T")," and wait for the conductor to be fully operational (can be up to 5 minutes).")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Restart the secondary conductor with ",(0,o.kt)("inlineCode",{parentName:"p"},"systemctl restart 128T")," (After the routers return to a running state the systems will be updated with the username/token)."))),(0,o.kt)("p",null,"If the SSR conductors are NOT upgraded to 4.5.7, 5.0.1, 5.1.1 or greater, the following steps must be taken to ADD the username/token:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the username/token with the ",(0,o.kt)("a",{parentName:"p",href:"#repo"},(0,o.kt)("inlineCode",{parentName:"a"},"install128t repo authenticate -u <user> -t <token>"))," process and run ",(0,o.kt)("inlineCode",{parentName:"p"},"yum makecache --assumeyes")," on both conductors.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"For the first use of the token, run the following commands on the primary conductor. Be sure to replace ",(0,o.kt)("inlineCode",{parentName:"p"},"<conductor-1-asset-id>")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"<conductor-2-asset-id>")," with the appropriate conductor asset ID."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"ln -s /etc/pki/install128t/GPG-RPM-KEY* /srv/salt\nt128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cp.get_file salt://GPG-RPM-KEY-128T-RELEASE /etc/pki/install128t/GPG-RPM-KEY-128T-RELEASE\nt128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cp.get_file salt://GPG-RPM-KEY-128T-RELEASE-LEGACY /etc/pki/install128t/GPG-RPM-KEY-128T-RELEASE-LEGACY\ncd /etc/yum.repos.d/\nfor i in 128t-authenticated-*; do ln -s /etc/yum.repos.d/${i} /srv/salt/${i}; t128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cp.get_file salt://${i} /etc/yum.repos.d/${i}; done\nt128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cmd.run \"dnf makecache --assumeyes; yum makecache --assumeyes\"\n")),(0,o.kt)("p",null,"If the username/token needs to be updated from an existing username/token AND the SSR conductors are not upgraded to 4.5.7, 5.0.1, 5.1.1 or greater, the following steps must be taken to update the username/token:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the username/token with the ",(0,o.kt)("a",{parentName:"p",href:"#repo"},(0,o.kt)("inlineCode",{parentName:"a"},"install128t repo authenticate -u <user> -t <token>"))," process and run ",(0,o.kt)("inlineCode",{parentName:"p"},"yum makecache --assumeyes")," on BOTH conductors.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"To update the token after the initial token instance, run the following commands. Be sure to replace ",(0,o.kt)("inlineCode",{parentName:"p"},"<conductor-1-asset-id>")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"<conductor-2-asset-id>")," with the appropriate conductor asset ID."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd /etc/yum.repos.d/\nfor i in 128t-authenticated-*; do t128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cp.get_file salt://${i} /etc/yum.repos.d/${i}; done\nt128-salt -C '* and not L@<conductor-1-asset-id>,<conductor-2-asset-id>' cmd.run \"dnf makecache --assumeyes; yum makecache --assumeyes\"\n")),(0,o.kt)("h2",{id:"uninstalling-the-ssr"},"Uninstalling the SSR"),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This command stops and uninstalls the SSR. It will also remove the SSR data files,\nincluding configuration, logs, and more. Use with caution!"))),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"erase128t")," can be used to uninstall the SSR. It is packaged with the Installer,\nbut it is ",(0,o.kt)("em",{parentName:"p"},"not")," a subcommand of the ",(0,o.kt)("inlineCode",{parentName:"p"},"install128t")," command."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"erase128t\n")),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"-h"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"--help")," to see all available options."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Option"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-y"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--assume-yes")),(0,o.kt)("td",{parentName:"tr",align:null},'Skip confirmation prompts and run as if the answer was "yes".')),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-c"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--cleanup-only")),(0,o.kt)("td",{parentName:"tr",align:null},"Do not uninstall the SSR, but still delete associated data such as configuration.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-l"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--keep-logs")),(0,o.kt)("td",{parentName:"tr",align:null},"Do not remove the SSR log files.")))))}c.isMDXComponent=!0}}]);