"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9138],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var o=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,h=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return n?o.createElement(h,r(r({ref:t},d),{},{components:n})):o.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,r=new Array(a);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var c=2;c<a;c++)r[c]=n[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},21221:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var o=n(87462),i=n(63366),a=(n(67294),n(3905)),r=["components"],s={title:"Deployment Using QCOW2",sidebar_label:"Deployment Using QCOW2"},l=void 0,c={unversionedId:"install_qcow2_deployment",id:"install_qcow2_deployment",title:"Deployment Using QCOW2",description:"The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages which can be used to automate instance deployment. Cloud-init can be used for linux network provisioning and for disk volume dynamic expansion on first boot.",source:"@site/docs/install_qcow2_deployment.md",sourceDirName:".",slug:"/install_qcow2_deployment",permalink:"/docs/install_qcow2_deployment",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"Deployment Using QCOW2",sidebar_label:"Deployment Using QCOW2"},sidebar:"docs",previous:{title:"Manually Installing the SSR",permalink:"/docs/intro_installation_installer"},next:{title:"Installing Using the Pre-5.0 Interactive ISO",permalink:"/docs/legacy_OTP_install"}},d={},u=[{value:"Using cloud-init to bootstrap SSR connection to Conductor",id:"using-cloud-init-to-bootstrap-ssr-connection-to-conductor",level:2},{value:"Using NoCloud to provide cloud-init meta-data and user-data",id:"using-nocloud-to-provide-cloud-init-meta-data-and-user-data",level:2}],p={toc:u};function m(e){var t=e.components,n=(0,i.Z)(e,r);return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages which can be used to automate instance deployment. Cloud-init can be used for linux network provisioning and for disk volume dynamic expansion on first boot."),(0,a.kt)("p",null,"For successful SSR qcow2 deployment, a cloud-init (or nocloud) configuration ",(0,a.kt)("strong",{parentName:"p"},"must")," provide persistent network interface bindings on first boot of the VM; otherwise the SSR will not correlate virtual machine NICs to router interfaces, and they may change across VM reboots. Operation of SSR qcow2 without persistent NIC bindings is not supported at this time."),(0,a.kt)("p",null,"Download the qcow2 image using the link below:"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://software.128technology.com/artifactory/list/generic-128t-images-release-local"},"https://software.128technology.com/artifactory/list/generic-128t-images-release-local")),(0,a.kt)("h2",{id:"using-cloud-init-to-bootstrap-ssr-connection-to-conductor"},"Using cloud-init to bootstrap SSR connection to Conductor"),(0,a.kt)("p",null,"The simplest method for onboarding a new SSR to an existing conductor is to initialize the system as a router node and provide the addresses for any conductor nodes. The manual initialization process can be automated by providing an ",(0,a.kt)("a",{parentName:"p",href:"/docs/initializer_preferences"},"initializer preferences")," file. This can be automated through ",(0,a.kt)("inlineCode",{parentName:"p"},"cloud-init cloud-config")," by providing a user-data to a cloud-init capable hypervisor similar to what is shown below."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'#cloud-config\nssh_pwauth: True\nwrite_files:\n- path: /root/initializer-preferences.json\n  content: |\n    {"node-role": "combo", "node-ip": "127.0.0.1", "node-name": "dummy-node", "router-name": "dummy-router", "admin-password": "$6$W2wtGSOP7lT4vqLj$zG3eYb9/QAWD/0PqiN/I6vVLtDhBzhecx.aBpdweIx4D.0NJzxIUGVRRBQPmO9K8LlU/Jj8iBaL3OS7aa75KD1", "conductor": {"primary": {"ip": "10.10.10.10"}}}\nruncmd:\n- initialize128t -p /root/initializer-preferences.json\n')),(0,a.kt)("p",null,"This causes this device's salt-minion to attempt to connect to the Conductor at IP address ",(0,a.kt)("inlineCode",{parentName:"p"},"10.10.10.10"),". The device, by default, will set its ",(0,a.kt)("inlineCode",{parentName:"p"},"asset-id")," to match the hostname provided by the hypervisor's cloud-init metadata. If this unique asset-id is associated with a node in the Conductor's configuration, the Conductor's Automated Provisioner process will reinitialize this device with the appropriate router and node name, allowing the system to pull a full configuration."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The example above assumes that the system will be able obtain an IP address via DHCP on the first network interface, which provides connectivity to the Conductor. If this is not the case, additional configuration can be provided to cloud-init to assist in provisioning network interfaces. However, these details are beyond the scope of this document. Please consult the official cloud-init documentation and the documentation for your particular hypervisor for further guidance.")),(0,a.kt)("h2",{id:"using-nocloud-to-provide-cloud-init-meta-data-and-user-data"},"Using NoCloud to provide cloud-init meta-data and user-data"),(0,a.kt)("p",null,"Even when using a hypervisor that does not directly provide a cloud-init metadata service, it is possible to use NoCloud to seed the required data to cloud-init. To do this, in addition to preparing the user-data as shown in the previous section, minimal meta-data must be provided. An example is shown below."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"instance-id: ssr1\nlocal-hostname: ssr1\n")),(0,a.kt)("p",null,"The cloud-init process on the SSR ISO will look for this data on an attached disk with the volume label ",(0,a.kt)("inlineCode",{parentName:"p"},"cidata"),". To create such an ISO image on a Linux system, place the user-data in a file named ",(0,a.kt)("inlineCode",{parentName:"p"},"user-data")," and the meta-data in a file named ",(0,a.kt)("inlineCode",{parentName:"p"},"meta-data")," and run the command ",(0,a.kt)("inlineCode",{parentName:"p"},"genisoimage -output cidata.iso -V cidata -r -J user-data meta-data"),". When launching a new SSR from qcow, this ISO can be attached and the system will run the cloud-init process seeded with this data."))}m.isMDXComponent=!0}}]);