"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[6652],{86193:function(e,t,n){var i=n(75068),o=n(67294),a=n(45697),s=n.n(a),r=n(10412),l=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={},n}(0,i.Z)(t,e);var a=t.prototype;return a.componentDidMount=function(){r.Z.canUseDOM&&this.setState({Flowchart:n(11677).Z})},a.render=function(){var e=this.state.Flowchart,t=this.props,n=t.chartCode,i=t.scale,a=void 0===i?.7:i;return r.Z.canUseDOM&&e?o.createElement("div",{style:{overflowX:"scroll"}},o.createElement(e,{options:{scale:a},chartCode:n})):o.createElement("div",null)},t}(o.Component);l.propTypes={chartCode:s().string.isRequired,scale:s().number},t.Z=l},80286:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return c},default:function(){return u}});var i=n(87462),o=n(63366),a=(n(67294),n(3905)),s=n(86193),r=["components"],l={title:"Router Installation Using OTP",sidebar_label:"Router Installation Using OTP"},d=void 0,p={unversionedId:"intro_otp_iso_install",id:"intro_otp_iso_install",title:"Router Installation Using OTP",description:"The Session Smart Router has a software-driven framework for rapid and dynamic deployment of network nodes across the enterprise using One Touch Provisioning (OTP). The software has been architected to enable automated deployment across a large set of scenarios, including simple, repeatable branch deployments and dynamic, scalable data center/cloud deployments. The solution may be deployed with minimal configuration using the default SSR installation process, or customized and integrated with 3rd party tools.",source:"@site/docs/intro_otp_iso_install.mdx",sourceDirName:".",slug:"/intro_otp_iso_install",permalink:"/docs/intro_otp_iso_install",tags:[],version:"current",lastUpdatedAt:1667593956,formattedLastUpdatedAt:"11/4/2022",frontMatter:{title:"Router Installation Using OTP",sidebar_label:"Router Installation Using OTP"},sidebar:"docs",previous:{title:"Basic Router Configuration",permalink:"/docs/intro_basic_router_config"},next:{title:"QuickStart from the OTP ISO",permalink:"/docs/intro_install_quickstart_otpiso"}},c=[{value:"Software Delivery Options",id:"software-delivery-options",children:[],level:2},{value:"QuickStart Provisioning",id:"quickstart-provisioning",children:[{value:"Disk Cloning",id:"disk-cloning",children:[],level:3}],level:2},{value:"Before you Begin",id:"before-you-begin",children:[],level:2},{value:"Installing SSR Using One Touch Provisioning (OTP)",id:"installing-ssr-using-one-touch-provisioning-otp",children:[{value:"SSR System via Serial Console",id:"ssr-system-via-serial-console",children:[],level:4},{value:"SSR System with VGA Console",id:"ssr-system-with-vga-console",children:[],level:4},{value:"SSR Installation",id:"ssr-installation",children:[],level:3}],level:2},{value:"Bootstrapping",id:"bootstrapping",children:[{value:"1. Configure Hostname and Salt Minion Identifier",id:"1-configure-hostname-and-salt-minion-identifier",children:[],level:3},{value:"2. Configure the SSR and Network Interfaces",id:"2-configure-the-ssr-and-network-interfaces",children:[],level:3},{value:"3. Enable the SSR and Salt-Minion Service",id:"3-enable-the-ssr-and-salt-minion-service",children:[],level:3},{value:"4. Write a Result Report",id:"4-write-a-result-report",children:[],level:3},{value:"5. Reboot",id:"5-reboot",children:[],level:3},{value:"Scriptlets",id:"scriptlets",children:[],level:3},{value:"Bootstrapping Flow Chart",id:"bootstrapping-flow-chart",children:[],level:3},{value:"QuickStart File via REST",id:"quickstart-file-via-rest",children:[],level:3},{value:"Testing",id:"testing",children:[],level:3}],level:2}],h={toc:c};function u(e){var t=e.components,l=(0,o.Z)(e,r);return(0,a.kt)("wrapper",(0,i.Z)({},h,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Session Smart Router has a software-driven framework for rapid and dynamic deployment of network nodes across the enterprise using One Touch Provisioning (OTP). The software has been architected to enable automated deployment across a large set of scenarios, including simple, repeatable branch deployments and dynamic, scalable data center/cloud deployments. The solution may be deployed with minimal configuration using the default SSR installation process, or customized and integrated with 3rd party tools."),(0,a.kt)("p",null,"An important aspect of the 128 Technology OTP solution is its flexibility. When the product is deployed using the standard SSR images, many customers appreciate the simplicity of enabling an enterprise-wide SessionSmart","\u2122"," routing fabric without investing additional time to customize the deployment. Rapid deployment of session-enabled routing, security and network visibility is the key objective."),(0,a.kt)("p",null,"In this deployment model, the SSR node is deployed into the production environment with no site-specific configuration during shipment of units and initial on-line state. A site configuration file is directed via the SSR for initial provisioning."),(0,a.kt)("h2",{id:"software-delivery-options"},"Software Delivery Options"),(0,a.kt)("p",null,"The simplest deployment of the 128 Technology OTP solution is highly automated and leverages just two components, the Conductor and at least one SSR. For many customers, the SSR platform is ordered and delivered as a pre-integrated, off-the-shelf solution through the Juniper SSR partner network. An image leveraging QuickStart provisioning can also be deployed into a VM or cloud environment, though consideration must be made to the mechanism of injecting the file. Virtual environments may be better suited for cloud automation tools to assist in automated, dynamic deployment."),(0,a.kt)("p",null,"The OTP installation process produces a Router installed with SSR software set to factory defaults. Upon completing the OTP installation process, the default behavior is to provision the device to be configured with a DHCP client on the first ethernet port and DHCP server listening on all other ports. A user then connects to the SSR via ethernet cable and use the QuickStart file generated by the Conductor to finalize the SSR configuration. After performing the QuickStart operation, the SSR will have connectivity to its Conductor and can download the latest configuration (if necessary) and begin operation. These defaults ",(0,a.kt)("a",{parentName:"p",href:"#quickstart-location"},"can be changed")," to suit your needs."),(0,a.kt)("h2",{id:"quickstart-provisioning"},"QuickStart Provisioning"),(0,a.kt)("p",null,"Basic configuration parameters are encoded within an encrypted file. For each node, a custom file can be exported from the Conductor and minimally contains the following configuration encoded parameters:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"WAN IP address, subnet mask and gateway"),(0,a.kt)("li",{parentName:"ul"},"Conductor IP address"),(0,a.kt)("li",{parentName:"ul"},"Asset ID")),(0,a.kt)("h3",{id:"disk-cloning"},"Disk Cloning"),(0,a.kt)("p",null,"Disk Cloning allows you to create a generic router platform image that can be used to perform multiple installations quickly and efficiently. After the initial ISO installation and power off, the platform is generic and can be cloned to a disk to create a copy of that platform. "),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"When using cloned images, an identical hardware platform must be used. Create a new disk image for each hardware variation."))),(0,a.kt)("p",null,"The cloned platform disk is then used to install the filesystem and SSR software on any number of other identical hardware platforms. "),(0,a.kt)("p",null,"The general process for disk cloning is as follows:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"The platform is installed using an ISO image which powers down on success."),(0,a.kt)("li",{parentName:"ol"},"Use Clonezilla or other Live USB to make a copy of the platform."),(0,a.kt)("li",{parentName:"ol"},"Distribute the cloned disk using USB, multicast, or other technique."),(0,a.kt)("li",{parentName:"ol"},"Start each platform after installation."),(0,a.kt)("li",{parentName:"ol"},"Allow each platform to bootstrap and then reboot."),(0,a.kt)("li",{parentName:"ol"},"Verify the platform validation report.xs")),(0,a.kt)("h2",{id:"before-you-begin"},"Before you Begin"),(0,a.kt)("p",null,"Before beginning the Router installation, you must have a Conductor operationally deployed and reachable by the router."),(0,a.kt)("p",null,"This diagram is one possible topology for a standalone SSR deployed at the edge of the network."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"QuickStart network diagram",src:n(5212).Z})),(0,a.kt)("h2",{id:"installing-ssr-using-one-touch-provisioning-otp"},"Installing SSR Using One Touch Provisioning (OTP)"),(0,a.kt)("p",null,"If you are installing the SSR Networking Software using the interactive installation workflow, use the process found under the ",(0,a.kt)("a",{parentName:"p",href:"/docs/intro_installation_bootable_media#choose-the-installation-type"},"Conductor Interactive Install; Choose the Installation Type")," and select ",(0,a.kt)("strong",{parentName:"p"},"Router")," during the installation prompts. "),(0,a.kt)("p",null,"To install the Router using the OTP workflow (this is the preferred method), use the arrow keys to select the ",(0,a.kt)("strong",{parentName:"p"},"OTP Install Routing Software")," option (Serial or VGA Console)."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"VGA Boot with OTP Install",src:n(3534).Z})),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Not all hardware has video support. Booting to the serial console 115200 baud is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior."),(0,a.kt)("p",{parentName:"div"},"Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed, and if left to continue will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware."))),(0,a.kt)("h4",{id:"ssr-system-via-serial-console"},"SSR System via Serial Console"),(0,a.kt)("p",null,"Use this option when running on hardware with no video chipset. It uses ",(0,a.kt)("inlineCode",{parentName:"p"},"/dev/ttyS0")," 115200 baud as the serial console for interacting with the installer. For serial console issues please refer to ",(0,a.kt)("a",{parentName:"p",href:"/docs/intro_installation_bootable_media#serial-console-troubleshooting"},"Serial Console Troubleshooting"),"."),(0,a.kt)("h4",{id:"ssr-system-with-vga-console"},"SSR System with VGA Console"),(0,a.kt)("p",null,"Use this option when running on hardware that has onboard graphics chipsets. This installs the SSR using the GUI installer."),(0,a.kt)("h3",{id:"ssr-installation"},"SSR Installation"),(0,a.kt)("p",null,"This installation process is an automated workflow which does not require user interaction after selecting and initiating the OTP menu option. The system will power off after installation."),(0,a.kt)("h2",{id:"bootstrapping"},"Bootstrapping"),(0,a.kt)("p",null,"After the initial installation and poweroff, the system is generic - it has no specific configuration. Once the platform is started again, an automated script performs bootstrapping of the platform. This script is a single run service unit that executes ",(0,a.kt)("strong",{parentName:"p"},"once")," during the first bootup, and automatically performs the following steps:"),(0,a.kt)("h3",{id:"1-configure-hostname-and-salt-minion-identifier"},"1. Configure Hostname and Salt Minion Identifier"),(0,a.kt)("p",null,"The hostname and salt minion identifier are set to the same value during the bootstrapping process."),(0,a.kt)("p",null,"If the system serial number is provisioned (seen by ",(0,a.kt)("inlineCode",{parentName:"p"},"dmidecode --string system-serial-number"),") this value will be used. Otherwise use the first MAC address found in the format of: ",(0,a.kt)("inlineCode",{parentName:"p"},"mac-<address>")),(0,a.kt)("h3",{id:"2-configure-the-ssr-and-network-interfaces"},"2. Configure the SSR and Network Interfaces"),(0,a.kt)("p",null,"The Bootstrapper sets the SSR configuration via the QuickStart file found in one of the following locations:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The root of an attached USB drive. i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"/bootstrap.quickstart"),'. The USB drive MUST be named "BOOTSTRAP" in all caps.')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"In ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/128technology/bootstrap.quickstart"),"."))),(0,a.kt)("p",null,"If no file source is present in either location, the Bootstrapper executes HTTP GET requests to the following endpoints to download the QuickStart File from a server. The REST response is explained in ",(0,a.kt)("a",{parentName:"p",href:"#quickstart-file-via-rest"},"REST details"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"1. `http://quickstart.128t-bootstrap.local/quickstart/<identifier>`\n2. `http://192.168.128.128/quickstart/<identifier>`\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"<identifier>")," is the minion-id as determined by the algorithm discussed in ",(0,a.kt)("a",{parentName:"p",href:"#configure-hostname-and-salt-minion-identifier"},"Configure Hostname and Salt Minion Identifier"),". Typically, it is the system serial number."),(0,a.kt)("p",null,"If none of the above are successful, the OTP defaults are used. This configures the DHCP client on the first ethernet port and a DHCP server listening on all other ports."),(0,a.kt)("h3",{id:"3-enable-the-ssr-and-salt-minion-service"},"3. Enable the SSR and Salt-Minion Service"),(0,a.kt)("p",null,"The quickstart file configures and enables the SSR and the associated salt-minion service."),(0,a.kt)("h3",{id:"4-write-a-result-report"},"4. Write a Result Report"),(0,a.kt)("p",null,"Once the platform is rebooted after bootstrapping, the bootstrap validation report can be found at the root filesystem (",(0,a.kt)("inlineCode",{parentName:"p"},"/root/128T-bootstrap.txt"),") containing details about the steps taken. The ",(0,a.kt)("inlineCode",{parentName:"p"},"/root/128T-bootstrap.json")," file contains the same information in JSON format. The report contains a message that includes additional details for each step."),(0,a.kt)("p",null,"Shown below is the location of the bootstrap report as well as an example of the contents."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"[root@sn123456789 ~]# cat /root/128T-bootstrap.txt\n+--------------------+--------+---------------------------------+\n| Label              | Result | Message                         |\n+--------------------+--------+---------------------------------+\n| Minion ID          | True   | mac-000000                      |\n| Hostname           | True   | mac-000000                      |\n| Clock Sync         | True   |                                 |\n| Initialize 128T    | True   | node.Router                     |\n| Enable 128T        | True   |                                 |\n| Enable salt-minion | True   |                                 |\n| Factory Defaults   | True   | http://192.168.0.100/quickstart |\n| Ifgcfg files       | True   |                                 |\n+--------------------+--------+---------------------------------+\n")),(0,a.kt)("h3",{id:"5-reboot"},"5. Reboot"),(0,a.kt)("p",null,"After reboot, the SSR service will be configured and running."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"It is important to note that after the OS installation the dhclient is configured across all network interfaces until the platform has completed Bootstrapping."))),(0,a.kt)("h3",{id:"scriptlets"},"Scriptlets"),(0,a.kt)("p",null,"In addition to the above steps, the Bootstrap utility supports executing pre- and post- scriptlets on a USB drive for further customization of the platform. The scriptlets will be executed as the first and last steps in the bootstrap process."),(0,a.kt)("p",null,"The names and locations for the scriptlets are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"If scriptlet exists at the root of USB drive and is called \u201c/pre-bootstrap\u201d, it will be the first step. Otherwise use /etc/128technology/pre-bootstrap."),(0,a.kt)("li",{parentName:"ul"},"If scriptlet exists at the root of USB drive and is called \u201c/post-bootstrap\u201d, it will be the last step. Otherwise use /etc/128technology/post-bootstrap.")),(0,a.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"The scriptlets must have executable permissions to be executed properly."))),(0,a.kt)("p",null,"Any stdout/stderr output generated from the scriptlets is logged in ",(0,a.kt)("inlineCode",{parentName:"p"},"/var/log/128T-bootstrap/<scriptlet-name>-scriptlet.log"),"."),(0,a.kt)("h3",{id:"bootstrapping-flow-chart"},"Bootstrapping Flow Chart"),(0,a.kt)("p",null,"The diagram below shows the procedure the Bootstrap utility follows during the first bootup of the platform after the ISO installation completes. "),(0,a.kt)(s.Z,{chartCode:"\n    st=>start: Start\n      bs=>operation: Check for Pre-Bootstrap Scriptlet\n      usb1=>condition: On USB?\n      def1=>condition: Default?\n      es=>inputoutput: Execute Pre-Bootstrap Scriptlet\n      smh=>operation: Set Minion ID\nSet Hostname\nSynchronize Clock\n      sfd=>operation: Set 128T Factory Defaults\n      usb2=>condition: On USB?\n      def2=>condition: Default?\n      rest=>condition: REST get?\n      aq=>inputoutput: Apply quickstart.txt\n      aotpd=>inputoutput: Apply OTP Defaults\n      ist=>operation: Setup IFCFG\nEnable salt-minion\nEnable 128T\n      pbs=>operation: Check for Post-Bootstrap Scriptlet\n      usb3=>condition: On USB?\n      def3=>condition: Default?\n      es2=>inputoutput: Execute Post-Bootstrap Scriptlet\n      fin=>operation: Finalize\n      wbr=>subroutine: Write Bootstrap Report\n      reb=>operation: Reboot\n      e=>end: End\n    st->bs->usb1\n    usb1(no)->def1\n    usb1(yes)->es\n    def1(yes)->es\n    def1(no)->smh\n    es->smh\n    smh->sfd->usb2\n    usb2(no, right)->def2\n    usb2(yes, right)->aq\n    def2(yes)->aq\n    def2(no)->rest\n    rest(no)->aotpd\n    rest(yes)->aq->ist\n    aotpd->ist->pbs->usb3\n    usb3(yes)->es2\n    usb3(no)->def3\n    def3(yes)->es2->fin\n    def3(no)->fin\n    fin->wbr->reb->e\n  ",mdxType:"Flowchart"}),(0,a.kt)("h3",{id:"quickstart-file-via-rest"},"QuickStart File via REST"),(0,a.kt)("p",null,"If no bootstrap file is present on the USB device or disk, the Bootstrapper will execute HTTP GET requests in an attempt to download the QuickStart file from a server."),(0,a.kt)("p",null,"The server must respond to the HTTP GET request with valid JSON data that is of format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"{\n  \u201cquickstart\u201d: \u201c<quickstart-file-contents>\u201d,\n  \u201cpassword\u201d: \u201cthis-is-my-password\u201d\n}\n")),(0,a.kt)("div",{className:"admonition admonition-important alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"The response must be URL-encoded, otherwise the client will not decode the data correctly."))),(0,a.kt)("p",null,"The password data within the JSON is required if the QuickStart file was encrypted when exported from the Conductor."),(0,a.kt)("h3",{id:"testing"},"Testing"),(0,a.kt)("p",null,"The Bootstrap utility provides an entrypoint to test your QuickStart Server. By executing the command below, the client makes requests to URLs and attempts to download and decode the QuickStart file. It will NOT apply the QuickStart to the platform - only test the process."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ bootstrap128t rest-test -i <test-identifier>\n")),(0,a.kt)("p",null,"Or, if you want to test a specific url:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ bootstrap128t rest-test -i <test-identifier> --url <a-fully-qualified-url>\n")))}u.isMDXComponent=!0},3534:function(e,t,n){t.Z=n.p+"assets/images/install_select_OTP-fa7ccde3bdabf9acbf1973d6db133465.png"},5212:function(e,t,n){t.Z=n.p+"assets/images/intro_ztp_quickstart_network_diagram-f002e32051f073ac14e244958c0314b8.png"}}]);