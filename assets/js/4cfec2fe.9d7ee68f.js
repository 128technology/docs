"use strict";(self.webpackChunk_128t_docs=self.webpackChunk_128t_docs||[]).push([[9033],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return h}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=s(t),h=a,m=u["".concat(l,".").concat(h)]||u[h]||p[h]||i;return t?r.createElement(m,o(o({ref:n},d),{},{components:t})):r.createElement(m,o({ref:n},d))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3054:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return p}});var r=t(87462),a=t(63366),i=(t(67294),t(3905)),o=["components"],c={title:"DHCP Relay Best Practices",sidebar_label:"DHCP Relay Best Practices"},l=void 0,s={unversionedId:"bcp_dhcp_relay_overview",id:"bcp_dhcp_relay_overview",title:"DHCP Relay Best Practices",description:"The purpose of a DHCP relay is to forward incoming requests from DHCP clients to a DHCP server. Normally, a client can talk directly to a DHCP server; especially on a single subnet. However, in the case where the server and clients are not on the same subnet, a DCHP relay agent can be deployed to mediate these requests. The SSR can accommodate this type of DHCP relay services.",source:"@site/docs/bcp_dhcp_relay_overview.md",sourceDirName:".",slug:"/bcp_dhcp_relay_overview",permalink:"/docs/bcp_dhcp_relay_overview",draft:!1,tags:[],version:"current",lastUpdatedAt:1695905845,formattedLastUpdatedAt:"Sep 28, 2023",frontMatter:{title:"DHCP Relay Best Practices",sidebar_label:"DHCP Relay Best Practices"},sidebar:"docs",previous:{title:"Branch NTP Service",permalink:"/docs/bcp_using_128T_as_ntp_server"},next:{title:"ExpressRoute QoS Configuration",permalink:"/docs/bcp_qos_msft_expressroute"}},d={},p=[{value:"Requirements",id:"requirements",level:3},{value:"Design Types",id:"design-types",level:3},{value:"Architecture",id:"architecture",level:3},{value:"Site Types",id:"site-types",level:3},{value:"DHCP Relay with SVR",id:"dhcp-relay-with-svr",level:2},{value:"Tenant",id:"tenant",level:3},{value:"Service",id:"service",level:3},{value:"Service Route",id:"service-route",level:3},{value:"Network Interface",id:"network-interface",level:3},{value:"Sample Configuration",id:"sample-configuration",level:3},{value:"DHCP Relay and Multiple DHCP Servers",id:"dhcp-relay-and-multiple-dhcp-servers",level:2},{value:"Adding Service-Routes",id:"adding-service-routes",level:3},{value:"Sample Configuration",id:"sample-configuration-1",level:3},{value:"DHCP Relay with BGP over SVR",id:"dhcp-relay-with-bgp-over-svr",level:2},{value:"Service",id:"service-1",level:3},{value:"Service Routes",id:"service-routes",level:3},{value:"RIB/FIB/BGP Show Commands",id:"ribfibbgp-show-commands",level:3},{value:"SSR Branch 1",id:"ssr-branch-1",level:4},{value:"SSR Branch 2",id:"ssr-branch-2",level:4},{value:"Sample Configuration",id:"sample-configuration-2",level:3}],u={toc:p};function h(e){var n=e.components,c=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},u,c,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The purpose of a DHCP relay is to forward incoming requests from DHCP clients to a DHCP server. Normally, a client can talk directly to a DHCP server; especially on a single subnet. However, in the case where the server and clients are not on the same subnet, a DCHP relay agent can be deployed to mediate these requests. The SSR can accommodate this type of DHCP relay services."),(0,i.kt)("h3",{id:"requirements"},"Requirements"),(0,i.kt)("p",null,"To configure DHCP relay on the SSR, the following requirements must be met or available."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"IP address of the DHCP server which manages the DHCP address pool."),(0,i.kt)("li",{parentName:"ul"},"The DHCP server must be accessible from the SSR."),(0,i.kt)("li",{parentName:"ul"},"A unique tenant must be configured for the DHCP relay to flag requests observed by the SSR.")),(0,i.kt)("h3",{id:"design-types"},"Design Types"),(0,i.kt)("p",null,"The following standard design models for DHCP Relay are addressed in this guide:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#dhcp-relay-with-svr"},"DHCP relay with SVR")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#dhcp-relay-and-multiple-dhcp-servers"},"DHCP relay with SVR and multiple DHCP servers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#dhcp-relay-with-bgp-over-svr"},"DHCP relay with BGP over SVR"))),(0,i.kt)("h3",{id:"architecture"},"Architecture"),(0,i.kt)("p",null,"A high-level overview of the architecture used for testing is shown in the diagram below."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"DHCP Test Architecture",src:t(27547).Z,width:"360",height:"300"})),(0,i.kt)("h3",{id:"site-types"},"Site Types"),(0,i.kt)("p",null,"The following characteristics define the common models where DHCP Relay is deployed:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Enterprise DC to Branch relay (DHCP server lives on the DC LAN)"),(0,i.kt)("li",{parentName:"ul"},"Branch to Branch relay (DHCP server lives on one of the branch LANs)")),(0,i.kt)("h2",{id:"dhcp-relay-with-svr"},"DHCP Relay with SVR"),(0,i.kt)("p",null,"Most basic deployments utilize DHCP relay with SVR only, where DHCP relay is implemented in its simplest form. The key elements to configure are tenants, services, and service-routes. The final step is to tag the branch office\u2019s network interface with the tenant. This will be the interface receiving DHCP broadcasts."),(0,i.kt)("h3",{id:"tenant"},"Tenant"),(0,i.kt)("p",null,"A unique tenant and service must be designed as shown below. This tenant will be used to tag and identify DHCP request session on the ingress interface and associated them with the dhcp-relay service."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        tenant dhcp.demo \n            name dhcp.demo\n        exit \n    exit\nexit\n\n")),(0,i.kt)("h3",{id:"service"},"Service"),(0,i.kt)("p",null,"A service is created with ",(0,i.kt)("inlineCode",{parentName:"p"},"application-type dhcp-relay"),". A unique tenant must be applied to the access policy to allow the SSR to process DHCP requests."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        service     dhcp_relay\n            name            dhcp_relay\n            security        internal\n\n            access-policy   dhcp.demo\n                source      dhcp.demo\n            exit\n            application-type    dhcp-relay\n        exit\n    exit\nexit\n\n")),(0,i.kt)("h3",{id:"service-route"},"Service Route"),(0,i.kt)("p",null,"A service-route is configured on the Branch1 or Enterprise DC routers referencing the DHCP relay service, with a ",(0,i.kt)("inlineCode",{parentName:"p"},"service-agent next-hop")," pointing to the IP address of the DHCP server (",(0,i.kt)("inlineCode",{parentName:"p"},"nat-target")," in the example below)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router      Branch1\n            name        Branch1\n\n            service-route        dhcp_relay_service-route\n                name             dhcp_relay_service-route\n                service-name     dhcp-relay\n                nat-target       172.16.1.3\n\n                next-hop         node1 lan1\n                    node-name    node1\n                    interface    node1\n                exit\n            exit\n        exit\n    exit\nexit\n")),(0,i.kt)("h3",{id:"network-interface"},"Network Interface"),(0,i.kt)("p",null,"On the router processing the DHCP relay requests (Branch 2), the unique tenant created must be applied to the network-interface receiving the DHCP broadcasts. These DHCP request broadcasts are tagged by the tenant and associated with the ",(0,i.kt)("inlineCode",{parentName:"p"},"dhcp-relay")," service. After the association is made, the SSR will convert the broadcast into a unicast and forward it to the IP of the DHCP servers."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router    Branch2\n            name    Branch2\n\n            node    node1\n                name                node1\n\n                device-interface    blue-lan1\n                    name                blue-lan1\n                    pci-address         0000:00:04.0\n\n                    network-interface   lan1\n                        name                     lan1\n                        global-id                6\n                        tenant                   dhcp.demo\n                        inter-router-security    internal\n                        source-nat               true\n\n                        address                  172.26.2.25\n                            ip-address           172.26.2.25\n                            prefix-length        24\n                            gateway              172.26.2.1\n                        exit\n                    exit\n                exit\n            exit\n        exit\n    exit\n")),(0,i.kt)("h3",{id:"sample-configuration"},"Sample Configuration"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router              Branch1 \n            name                Branch1\n\n            node        node1\n                name            node1\n                asset-id        t220-dut1.openstacklocal\n\n                device-interface    wan-eth0 \n                    name                wan-eth0\n                    pci-address         0000:00:03.0\n\n                    network-interface   wan\n                        name                wan\n                        global-id           1\n                        conductor           true\n                        default-route       true\n\n                        neighborhood    Broadband \n                            name            Broadband\n                            topology        mesh \n                        exit\n                        inter-router-security   internal \n                        source-nat              true\n                        management              true\n\n                        management-vector \n                            name        mgmt \n                            priority    5\n                        exit\n\n                        address         192.168.1.9\n                            ip-address      192.168.1.9\n                            prefix-length   24\n                            gateway         192.168.1.1\n                        exit \n                    exit\n                exit\n\n                device-interface    red-lan1 \n                    name                red-lan1\n                    pci-address         0000:00:04.0\n\n                    network-interface   lan1\n                        name                lan1\n                        global-id           6\n                        tenant              lan\n                        inter-router-security   internal\n                        source-nat          true\n                        address             172.16.1.15\n                            ip-address          172.16.1.15\n                            prefix-length       24\n                            gateway             172.16.1.1\n                        exit \n                    exit\n                exit \n            exit\n\n            service-route   dhcp-relay_route\n                name            dhcp-relay_route \n                service-name    dhcp_relay\n                nat-target      172.16.1.3\n                next-hop        node1 lan1 \n                    node-name       node1 \n                    interface       lan1\n                exit \n            exit\n        exit\n            \n        router    Branch2\n            name    Branch2\n\n            node    node1\n                name                node1\n\n                device-interface    blue-lan1\n                    name                blue-lan1\n                    pci-address         0000:00:04.0\n\n                    network-interface   lan1\n                        name                     lan1\n                        global-id                6\n                        tenant                   dhcp.demo\n                        inter-router-security    internal\n                        address                  172.26.2.25\n                            ip-address           172.26.2.25\n                            prefix-length        24\n                            gateway              172.26.2.1\n                            exit\n                        exit\n                    exit\n                exit\n            exit\n        exit\n\n        tenant  lan\n            name    lan\n        exit\n\n        tenant  dhcp.demo\n            name    dhcp.demo\n        exit\n\n        service     internet\n            name    internet\n            address     0.0.0.0/0\n\n            access-policy   lan\n                source          lan\n            exit\n        exit\n\n        service     dhcp_relay\n            name        dhcp_relay\n            security    internal\n\n            access-policy   dhcp.demo\n                source          dhcp.demo\n            exit\n\n            service-policy      dhcp_relay\n            application-type    dhcp-relay\n        exit\n    exit\nexit\n")),(0,i.kt)("h2",{id:"dhcp-relay-and-multiple-dhcp-servers"},"DHCP Relay and Multiple DHCP Servers"),(0,i.kt)("p",null,"To achieve redundancy, more than one DHCP server is deployed. ",(0,i.kt)("strong",{parentName:"p"},"The SSR accommodates multiple severs by configuring additional service-route elements referencing the same service.")," When ingress traffic on the SSR is tagged by the network-interface with the tenant associated with ",(0,i.kt)("inlineCode",{parentName:"p"},"dhcp_relay")," service, the SSR broadcasts DHCP requests to all next-hops within the service-route's next-hop. "),(0,i.kt)("p",null,"The fastest server wins."),(0,i.kt)("h3",{id:"adding-service-routes"},"Adding Service-Routes"),(0,i.kt)("p",null,"Building upon the earlier configuration and the information above, all that is needed to add additional DHCP servers is an additional ",(0,i.kt)("strong",{parentName:"p"},"service-route")," for each DHCP server. In our example configuration, we will be adding a second service route (",(0,i.kt)("inlineCode",{parentName:"p"},"dhcp-relay_route2"),") to the Branch1 router with the new DHCP Server IP address - ",(0,i.kt)("inlineCode",{parentName:"p"},"nat-target")," 172.16.1.4."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router      Branch1\n            name        Branch1\n\n            service-route        dhcp-relay_route1\n                name             dhcp-relay_route1\n                service-name     dhcp-relay\n                nat-target       172.16.1.3\n\n                next-hop         node1 lan1\n                    node-name    node1\n                    interface    lan1\n                exit\n            exit\n\n            service-route        dhcp-relay_route2\n                name             dhcp-relay_route2\n                service-name     dhcp-relay\n                nat-target       172.16.1.4\n\n                next-hop         node1 lan1\n                    node-name    node1\n                    interface    lan1\n                exit\n            exit\n        exit\n    exit\nexit\n")),(0,i.kt)("h3",{id:"sample-configuration-1"},"Sample Configuration"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router              Branch1 \n            name                Branch1\n\n            node    node1\n                name    node1\n                asset-id    t220-dut1.openstacklocal\n\n                device-interface    wan-eth0 \n                    name                wan-eth0\n                    pci-address         0000:00:03.0\n\n                    network-interface   wan\n                        name                wan\n                        global-id           1\n                        conductor           true\n                        default-route       true\n\n                        neighborhood    Broadband \n                            name            Broadband\n                            topology        mesh \n                        exit\n                        inter-router-security   internal \n                        source-nat              true\n                        management              true\n\n                        management-vector \n                            name        mgmt \n                            priority    5\n                        exit\n\n                        address         192.168.1.9\n                            ip-address      192.168.1.9\n                            prefix-length   24\n                            gateway         192.168.1.1\n                        exit \n                    exit\n                exit\n\n                device-interface    red-lan1 \n                    name            red-lan1\n                    pci-address     0000:00:04.0\n\n                    network-interface   lan1\n                        name                lan1\n                        global-id           6\n                        tenant              lan\n                        inter-router-security       internal\n                        source-nat          true\n                        address             172.16.1.15\n                            ip-address      172.16.1.15\n                            prefix-length   24\n                            gateway         172.16.1.1\n                        exit \n                    exit\n                exit \n\n                service-route   dhcp-relay_route1\n                    name            dhcp-relay_route1 \n                    service-name    dhcp_relay\n                    nat-target      172.16.1.3\n                    next-hop        node1 lan1 \n                        node-name       node1 \n                        interface       lan1\n                    exit \n                exit\n\n                service-route   dhcp-relay_route2\n                    name            dhcp-relay_route2 \n                    service-name    dhcp_relay\n                    nat-target      172.16.1.4\n                    next-hop        node1 lan1 \n                        node-name       node1 \n                        interface       lan1\n                    exit \n                exit\n\n        router    Branch2\n            name    Branch2\n\n            node    node1\n                name                node1\n\n                device-interface    blue-lan1\n                    name                blue-lan1\n                    pci-address         0000:00:04.0\n\n                    network-interface   lan1\n                        name                     lan1\n                        global-id                6\n                        tenant                   dhcp.demo\n                        inter-router-security    internal\n                        source-nat               true\n\n                        address                  172.26.2.25\n                            ip-address           172.26.2.25\n                            prefix-length        24\n                            gateway              172.26.2.1\n                            exit\n                        exit\n                    exit\n                exit\n            exit\n        exit\n\n        tenant  lan\n            name    lan\n        exit\n\n        tenant  dhcp.demo\n            name    dhcp.demo\n        exit\n\n        service     internet\n            name        internet\n            address     0.0.0.0/0\n\n            access-policy   lan\n                source      lan\n            exit\n        exit\n        service         local-lan-summary_router1\n            name        local-lan-summary_router1\n            security    internal\n            address     172.16.1.12/32\n\n            access-policy   lan \n                source      lan\n            exit \n        exit\n\n        service     local-lan-summary_router3\n            name        local-lan-summary_router3\n            security    internal\n            address     172.16.1.12/32\n\n            access-policy   wan \n                source      wan\n            exit \n        exit\n\n        service     dhcp_relay\n            name        dhcp_relay\n            security    internal\n\n            access-policy   dhcp.demo\n                source      dhcp.demo\n            exit\n\n            service-policy      dhcp_relay\n            application-type    dhcp-relay\n        exit\n    exit\nexit\n")),(0,i.kt)("h2",{id:"dhcp-relay-with-bgp-over-svr"},"DHCP Relay with BGP over SVR"),(0,i.kt)("p",null,"By default, the SSR will auto-generate service-routes and services for each DHCP server. This is good for SVR without BGP. To make DHCP relay work with BGP over SVR, we need to make additional changes to the auto-generated configuration ",(0,i.kt)("strong",{parentName:"p"},"after")," the auto-generation of configuration objects is complete. "),(0,i.kt)("p",null,"Please review DHCP Relay with SVR for tenant and network-interface configurations."),(0,i.kt)("h3",{id:"service-1"},"Service"),(0,i.kt)("p",null,"Configure the ",(0,i.kt)("inlineCode",{parentName:"p"},"dhcp-relay")," service with ",(0,i.kt)("inlineCode",{parentName:"p"},"application-type dhcp-relay")," and add the tenants to which this applies. Finally, set ",(0,i.kt)("inlineCode",{parentName:"p"},"share-service-route")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        service     dhcp_relay\n            name            dhcp_relay\n            security        service-sec\n\n            access-policy   dhcp.demo\n                source      dhcp.demo\n            exit\n            share-service-routes false\n            application-type    dhcp-relay\n        exit\n    exit\nexit\n")),(0,i.kt)("h3",{id:"service-routes"},"Service Routes"),(0,i.kt)("p",null,"On the Branch 1 SSR Router:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Create a ",(0,i.kt)("inlineCode",{parentName:"li"},"service-route")," for this service with a ",(0,i.kt)("inlineCode",{parentName:"li"},"nat-target")," of the DHCP server, and perform a commit. The conductor auto-generates an additional DHCP service.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router      Branch1\n            name        Branch1\n\n            service-route        dhcp_relay_service-route\n                name             dhcp_relay_service-route\n                service-name     dhcp-relay\n                nat-target       172.16.1.3\n\n                next-hop         node1 lan1\n                    node-name    node1\n                    interface    lan1\n                exit\n            exit\n        exit\n    exit\nexit\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Change the configuration of the auto-generated DHCP service")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"generated=false")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"share-service-routes=false"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'config\n    authority\n\n        service _dhcp_relay_5_172.16.1.3\n            name                _dhcp_relay_5_172.16.1.3\n            description         "Auto generated DHCP relay service for DHCP server 172.16.1.3"\n            enabled             true\n            scope               private\n            tap-multiplexing    false\n\n            transport   udp\n                protocol        udp\n                port-range      67\n                    start-port  67\n                    end-port        67\n                exit\n            exit\n            address                     172.16.1.3/32\n            generate-categories         false\n            access-policy-generated     false\n            \n            access-policy               dhcp.demo\n                source                  dhcp.demo\n                permission              allow\n            exit\n            share-service-routes        false\n            source-nat                  disabled\n            application-type            generic\n            fqdn-resolution-type        v4\n            \n            session-record\n                include-hierarchical-services   true\n            exit\n            generated       false\n        exit\n    exit\nexit\n')),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Go into the auto-generated service-route and change ",(0,i.kt)("inlineCode",{parentName:"li"},"generated")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"false"),", change type to ",(0,i.kt)("inlineCode",{parentName:"li"},"use-learned-routes"),", and perform one last commit.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"config\n    authority\n        router  Branch1\n            name        Branch1\n            service-route       _dhcp_relay_dhcp_relay_service-route\n                name            _dhcp_relay_dhcp_relay_service-route\n                service-name    _dhcp_relay_5_172.16.1.3\n                enable-failover false\n                generated       false\n                use-learned-routes\n            exit\n        exit\n    exit\nexit\n")),(0,i.kt)("ol",{start:4},(0,i.kt)("li",{parentName:"ol"},"RIB/FIB should show the service for BGP as the path for ",(0,i.kt)("inlineCode",{parentName:"li"},"dhcp_relay"),". In this case, the SSR on Branch2 has a path for ",(0,i.kt)("inlineCode",{parentName:"li"},"dhcp_relay")," to the SSR on Branch1 over BGP.")),(0,i.kt)("h3",{id:"ribfibbgp-show-commands"},"RIB/FIB/BGP Show Commands"),(0,i.kt)("h4",{id:"ssr-branch-1"},"SSR Branch 1"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"admin@node1.Branch1# show bgp summary\nThu 2022-03-31 20:24:49 UTC\nIPv4 Unicast Summary:\nBGP router identifier 2.2.2.1, local AS number 64512 vrf-id 0\nBGP table version 3\nRIB entries 5, using 960 bytes of memory\nPeers 2, using 43 KiB of memory\n\nNeighbor    V       AS      MsgRcvd     MsgSent     TblVer  InQ     OutQ    Up/Down     State/PfxRcd    PfxSnt\n2.2.2.2     4    64513        18087       19383          0    0        0    6d01h18m               0         3\n2.2.2.4     4    64514        17219       17221          0    0        0    5d23h27m               0         3\n\n\nTotal number of neighbors 2\nCompleted in 0.20 seconds\nadmin@node1.Branch1# show bgp\nThu 2022-03-31 20:24:51 UTC\nBGP table version is 3, local router ID is 2.2.2.1, vrf id 0\nDefault local pref 100, local AS 64512\nStatus codes: s suppressed, d damped, h history, * valid, > best, = multipath,\n              i internal, r RIB-failure, S Stale, R Removed\nNexthop codes: @NNN nexthop's vrf id, < announce-nh-self\nOrigin codes: i - IGP, e - EGP, ? - incomplete\n\n    Network         Next Hop    Metric  LocPrf Weight Path\n*>  2.2.2.1/32      0.0.0.0          0          32768   ?\n*>  172.16.1.0/24   0.0.0.0          0          32768   ?\n*>  192.168.1.0/24  0.0.0.0          0          32768   ?\n\nDisplayed 3 routes and 3 total paths\nCompleted in 0.22 seconds\n\nadmin@node1.Branch1# show fib service-name _bgp_Branch1_R1\nThu 2022-03-31 20:31:42 UTC\n\nEntry Count: 109\nCapacity: 23387\n\n============ ====== ======= =============== ===== ================= ============= ======== ======\nIP Prefix     Port   Proto   Tenant          VRF    Service         Next Hops     Vector    Cost\n============ ====== ======= =============== ===== ================= ============= ======== ======\n2.2.2.1/32    179     TCP   _bgp_speaker_     -   _bgp_Branch1_R1   0-None.4095     -        0\n\nCompleted in 0.05 seconds\nadmin@node1.Branch1# show fib service-name _dhcp_relay_5_172.16.1.3\nThu 2022-03-31 20:31:45 UTC\n\nEntry Count: 109\nCapacity: 23387\n\n=============== ====== ======= ========= ===== ========================== =========== ======== ======\nIP Prefix       Port    Proto   Tenant    VRF   Service                   Next Hops   Vector   Cost\n=============== ====== ======= ========= ===== ========================== =========== ======== ======\n172.16.1.3/32    67      UDP   dhcp.demo   -    _dhcp_relay_5_172.16.1.3    1-2.0        -       0\n")),(0,i.kt)("h4",{id:"ssr-branch-2"},"SSR Branch 2"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Default local pref 100, local AS 64514\nStatus codes: s suppressed, d damped, h history, * valid, > best, = multipath,\n              i internal, r RIB-failure, S Stale, R Removed\nNexthop codes: @NNN nexthop's vrf id, < announce-nh-self\nOrigin codes: i - IGP, e - EGP, ? - incomplete\n\n    Network         Next Hop    Metric  LocPrf Weight Path\n*>  2.2.2.1/32      2.2.2.1          0       0  64512  ?\n*>  172.16.1.0/24   2.2.2.1          0       0  64512  ?\n*>  192.168.1.0/24  2.2.2.1          0       0  64512  ?\n\nDisplayed 3 routes and 3 total paths\nCompleted in 0.40 seconds\n\nadmin@node1.Branch2# show bgp summary\nThu 2022-03-31 20:32:25 UTC\n\nIPv4 Unicast Summary:\nBGP router identifier 2.2.2.4, local AS number 64514 vrf-id 0\nBGP table version 3\nRIB entries 5, using 960 bytes of memory\nPeers 1, using 21KiB of memory\n\nNeighbor    V       AS      MsgRcvd     MsgSent     TblVer  InQ     OutQ    Up/Down     State/PfxRcd    PfxSnt\n2.2.2.1     4       64512   17236       17234            0   0        0     5d23h35m        3               3\n\n\nTotal number of neighbors 1 Completed in 0.18 seconds\n\nadmin@node1.Branch2# show fib service-name _dhcp_relay_5_172.16.1.3 Thu 2022-03-31 20:32:38 UTC\n\nEntry Count: 112\nCapacity:   23387\n\n=============== ====== ======= ========= ===== ========================== =========== ======== ======\nIP Prefix       Port    Proto   Tenant    VRF   Service                   Next Hops   Vector   Cost\n=============== ====== ======= ========= ===== ========================== =========== ======== ======\n172.16.1.3/32    67     UDP     dhcp.demo  -    _dhcp_relay_5_172.16.1.3  192.168.1.9    -       0\n\nCompleted in 0.15 seconds\n\nadmin@node1.Branch2# show fib service-name _bgp_Branch1_R1 Thu 2022-03-31 20:33:05 UTC\n\nEntry Count: 112\nCapacity:   23387\n\n=============== ====== ======= ============= ===== ========================== =========== ======== ======\nIP Prefix       Port    Proto   Tenant       VRF    Service                   Next Hops   Vector   Cost\n=============== ====== ======= ============= ===== ========================== =========== ======== ======\n2.2.2.1/32      179     TCP    _bgp_speaker_   -    _bgp_Branch1_R1           192.168.1.9    -        0\n")),(0,i.kt)("h3",{id:"sample-configuration-2"},"Sample Configuration"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'config\n    authority\n        service         dhcp_relay\n            name            dhcp_relay\n            access-policy   dhcp.demo\n                source      dhcp.demo\n            exit\n\n            share-service-routes    false\n            application-type        dhcp-relay\n        exit\n    exit\nexit\n\nconfig\n    authority\n        service         _dhcp_relay_5_172.16.1.3\n            name            _dhcp_relay_5_172.16.1.3\n            description     "Auto generated DHCP relay service for DHCP server 172.16.1.3"\n            enabled         true\n            scope           private\n            tap-multiplexing    false\n            transport       udp\n                protocol    udp\n\n                port-range  67\n                    start-port  67\n                    end-port    67\n                exit\n            exit\n\n            address     172.16.1.3/32\n            generate-categories     false\n            access-policy-generated false\n\n            access-policy       dhcp.demo\n                source          dhcp.demo\n                permission      allow\n            exit\n\n            share-service-routes    false\n            source-nat              disabled\n            application-type generic\n            fqdn-resolution-type    v4\n\n            session-record\n                include-hierarchical-services   true\n            exit\n\n            generated       false\n        exit\n    exit\nexit\n\nconfig\n    authority\n        router      Branch1\n            name            Branch1\n            service-route   dhcp_relay_service-route\n                name            dhcp_relay_service-route\n                service-name    dhcp_relay\n                nat-target      172.16.1.3\n                next-hop        node1 lan1\n                    node-name   node1\n                    interface   lan1\n                exit\n            exit\n        exit\n    exit\nexit\n\nconfig\n    authority\n        router  Branch1\n            name    Branch1\n            service-route   _dhcp_relay_dhcp_relay_service-route\n                name            _dhcp_relay_dhcp_relay_service-route\n                service-name    _dhcp_relay_5_172.16.1.3\n                enable-failover false\n                generated       false\n                use-learned-routes\n                \n                reachability-detection\n                    enabled             false\n                    detection-window    5\n                exit\n            exit\n        exit\n    exit\nexit\n')))}h.isMDXComponent=!0},27547:function(e,n,t){n.Z=t.p+"assets/images/dhcp_relay_arch-f7ff65e65489d9559496eab006599bdf.jpg"}}]);