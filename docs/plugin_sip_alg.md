---
title: SIP ALG Plugin
sidebar_label: SIP ALG
---

The Session Initiation Protocol (SIP)[^1] is a signaling protocol used for initiating, maintaining, and terminating real-time sessions that include voice, video and messaging applications. SIP is a text based protocol and exchanges IP address information within its messages as a means to establish signaling and media sessions between endpoints. When the SIP clients are behind NAT this poses a particular challenge since the addresses in the SIP messages for such clients will be private IPs which are not reachable beyond the NAT boundaries.

When 128T router is present at the edge of the NAT boundary, it is capable of performing a Application Layer Gateway (ALG) function for SIP protocol by doing packet inspection and re-writing the private IP address information in the SIP messages for both SIP headers and Session Description Protocol (SDP)[^2]. This enables both signaling and media traffic to traverse the NAT and makes the communication possible between the client behind the NAT and the remote SIP endpoint(s). The SIP ALG function can be enabled by installing and configuring the `128T-sip-alg` plugin.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::


## Configuration
The sip-alg configuration can be enabled on a router. In order to configure `sip-alg`, it is important to consider the following:

* Static IP mappings
* Services for making inbound and outbound calls
* Additional changes to the SDP to enable SIP interworking

:::important
The 128T sip-alg function only supports a scenario whereby all the SIP endpoints on the private network communicate via a SIP enabled PBX device.
:::

The following configuration shows an example of what the configuration for a single PBX device would look like:

```config
authority
    router router1
        sip-alg                   PBX
            name                        PBX
            enabled                     true
            proxy-ip                    172.16.2.128

            ip-mappings                 192.168.2.128
                private-ip  192.168.2.128
                public-ip   172.16.2.128
            exit

            sip-service                 outbound
                direction       outbound

                egress-service  sip-outbound-dc1
                    name           sip-inbound

                    access-policy  lan
                        source      lan
                        permission  allow
                    exit
                exit

                egress-service  sip-outbound-dc2
                    name           sip-outbound

                    access-policy  lan
                        source      lan
                        permission  allow
                    exit
                exit
            exit

            sip-service                 inbound
                direction       inbound

                egress-service  sip-inbound-pbx
                    name           sip-inbound-pbx

                    access-policy  datacenter
                        source      datacenter
                        permission  allow
                    exit

                    additional-address   192.168.2.128
                    ingress-service-policy  custom
                exit
            exit

            remove-sdp-lines-by-prefix  a=candidate
        exit
    exit
exit
```

:::note
The `128T-sip-alg` plugin supports multiple branch PBXs by letting the user configure multiple `sip-alg` instances on the router. There is a limit of 10 sip-alg configurations per router.
:::

### Proxy IP and IP Mappings

The `proxy-ip` represents a non-private address for the branch PBX that the remote endpoint (such as a data center server) can use for all inbound and outbound calls. The `ip-mappings` on the other hand provide the translation to the private IP address that can be used to reach the branch PBX. In the above example, the mappings are a way to indicate that any inbound calls on the `172.16.2.128` from the remote endpoint will be routed to the `192.168.2.128` address. This information is also useful for [fixing](#sip-message-changes) all the relevant IP addresses in the SIP messages. For the outbound calls, the `proxy-ip` is used to replace the private branch PBX IP address with a non-private address that represents the branch from the perspective of the data center.

### Inbound and Outbound Services

The `sip-alg` plugin operates on the concept of [SFC](plugin_intro.md#service-function-chaining) where all traffic is routed using KNIs to and from Linux. The 128T router uses `kamailio`[^3] to then [fix all SIP messages](#sip-message-changes) and perform additional routing to manage both inbound and outbound calls. For each of the `inbound` and `outbound` calls the plugin requires two services - an `ingress service` to route the traffic to the KNI and an `egress service` to route the traffic to the other SIP endpoint. The user is responsible for configuring the `egress service` and corresponding routes. The plugin automatically generates the `ingress service` and associated routes using the egress service and plugin configuration.

#### Outbound Service and Config Auto Generation

The `outbound` service is used for initial registration between the branch PBX and the SIP server as well as making all outbound calls to remote endpoints. A typical call flow originates from the private LAN network, routed via the 128T sip-alg function that transforms the SIP messages, which are then routed over the WAN interface to the remote endpoint. Consider the following example:

```config
authority
    service  sip-outbound-dc1
        name           sip-outbound-dc1
        service-group  all
        description    "outbound service for sip towards data center 1"
        enabled        true
        scope          private

        transport      udp
            protocol    udp

            port-range  5060
                start-port  5060
            exit
        exit
        address        172.16.2.102/32

        access-policy  _internal_
            source      _internal_
            permission  allow
        exit
    exit
exit
```

The service `sip-outbound-dc1` captures all SIP UDP traffic towards port 5060 originating from the [`_internal_` tenant](bcp_tenants.mdx#the-internal-tenant). This is a special tenant associated with the SFC KNIs. The `sip-service > outbound` for the sip-alg configuration refers to this user configured service in the above example. In this process, the plugin will inherit all the address and transport configuration from this _service_, combined with the defined _access-policy_ on the plugin, will generate the configuration for SIP traffic received on the lan tenant. The `ingress-service-policy` can be used to provide a custom policy to be applied to the generated service. More details on service policy design can be found [here](bcp_service_and_service_policy_design.md#service-policy)

:::note
If the egress service has no transport configured, the plugin assumes the default SIP port of `5060` for both TCP and UDP.
:::

:::note
Custom SIP ports are supported by configuring the appropriate ports for the inbound and outbound services
:::

![SIP ALG outbound call](/img/sip_alg_outbound_call.png)

The overall sessions for an outbound SIP call will appear as follows:

```
admin@node1.router1# show sessions
Tue 2020-07-07 21:37:11 UTC

Node: node1

====================================== ===== =================================================== ============ ============== ====== ======= ============== ========== ============== =========== ========= ========== =========== ========= =========
 Session Id                             Dir   Service                                             Tenant       Dev Name       VLAN   Proto   Src IP         Src Port   Dest IP        Dest Port   NAT IP    NAT Port   Payload     Timeout   Uptime
                                                                                                                                                                                                                       Encrypted
====================================== ===== =================================================== ============ ============== ====== ======= ============== ========== ============== =========== ========= ========== =========== ========= =========
 1fe41d38-9385-4e4d-a801-19204ddde325   fwd   outbound-ingress_router1_PBX-                       lan          lan               0   udp     192.168.2.128       5060   172.16.2.102        5060   0.0.0.0          0   false          3590   0 days
                                              outbound-dc1                                                                                                                                                                                   0:00:16
 1fe41d38-9385-4e4d-a801-19204ddde325   rev   outbound-ingress_router1_PBX-                       lan          sip-private0      0   udp     172.16.2.102       5060   192.168.2.128        5060   0.0.0.0          0   false          3590   0 days
                                              outbound-dc1                                                                                                                                                                                   0:00:16
 0b70b390-0704-4504-911a-08cc93306e59   fwd   sip-outbound-dc1                                    _internal_   sip-public0       0   udp     172.16.2.128       5060   172.16.2.102        5060   0.0.0.0          0   false          3590   0 days
                                                                                                                                                                                                                                             0:00:16
 0b70b390-0704-4504-911a-08cc93306e59   rev   sip-outbound-dc1                                    _internal_   wan               0   udp     172.16.2.102       5060   172.16.2.128        5060   0.0.0.0          0   false          3590   0 days
                                                                                                                                                                                                                                             0:00:16

Completed in 0.04 seconds
admin@node1.router1#

```

#### Inbound Service and Config Auto Generation

The `inbound` service is used for processing all incoming calls to the branch PBX from the remote server. A typical call flow originates from the public WAN network, routed via the 128T sip-alg function that transforms the SIP messages, which are then routed over the LAN interface to the branch PBX. The user is responsible for configuring the ingress service and the associated service-routes. Consider the following example:

```config
authority
    service  sip-inbound-pbx
        name           sip-inbound-pbx
        service-group  all
        description    "inbound service for sip towards branch PBX"
        enabled        true
        scope          private
        security       aes1

        transport      udp
            protocol    udp

            port-range  5060
                start-port  5060
            exit
        exit
        address        172.16.2.128

        access-policy  _internal_
            source      _internal_
            permission  allow
        exit
    exit
exit
```

The service `sip-inbound-pbx` captures all SIP UDP traffic towards port 5060 originating from the [`_internal_` tenant](bcp_tenants.mdx#the-internal-tenant). This is a special tenant associated with the SFC KNIs. The `sip-service > inbound` for the sip-alg configuration refers to this user configured service in the above example. In this process, the plugin will inherit all the address and transport configuration from this _service_, combined with the defined _access-policy_ on the plugin, will generate the configuration for SIP traffic received on the `datacenter` tenant. The `ingress-service-policy` can be used to provide a custom policy to be applied to the generated service. More details on service policy design can be found [here](bcp_service_and_service_policy_design.md#service-policy)

:::note
If the ingress service has no transport configured, the plugin assumes the default SIP port of `5060` for both TCP and UDP.
:::

:::note
The `additional-address` configuration can be used to add the `proxy-ip` address to the generated service.
:::

![SIP ALG inbound call](/img/sip_alg_inbound_call.png)

The overall sessions for an inbound SIP call will appear as follows:

```
admin@node1.router1# show sessions
Tue 2020-07-07 21:42:32 UTC

Node: node1

====================================== ===== ================================================== ============ ============== ====== ======= ============== ========== ============== =========== ========= ========== =========== ========= =========
 Session Id                             Dir   Service                                            Tenant       Dev Name       VLAN   Proto   Src IP         Src Port   Dest IP        Dest Port   NAT IP    NAT Port   Payload     Timeout   Uptime
                                                                                                                                                                                                                      Encrypted
====================================== ===== ================================================== ============ ============== ====== ======= ============== ========== ============== =========== ========= ========== =========== ========= =========
 6997aaf4-8d20-40bc-827e-494bb881563c   fwd   inbound-ingress_router1_PBX-                        wan          wan               0   udp     172.16.2.102       5060   172.16.2.128        5060   0.0.0.0          0   false          3538   0 days
                                              inbound-pbx                                                                                                                                                                                   0:01:07
 6997aaf4-8d20-40bc-827e-494bb881563c   rev   inbound-ingress_router1_PBX-                        wan          sip-public0       0   udp     172.16.2.128       5060   172.16.2.102        5060   0.0.0.0          0   false          3538   0 days
                                              inbound-pbx                                                                                                                                                                                   0:01:07
 f62248d7-a003-4e6b-b586-d196c4b23d3d   fwd   sip-inbound-pbx                                    _internal_   sip-private0      0   udp     172.16.2.128       5060   192.168.2.128        5060   0.0.0.0          0   false          3538   0 days
                                                                                                                                                                                                                                            0:01:07
 f62248d7-a003-4e6b-b586-d196c4b23d3d   rev   sip-inbound-pbx                                    _internal_   lan               0   udp     192.168.2.128       5060   172.16.2.128        5060   0.0.0.0          0   false          3538   0 days
                                                                                                                                                                                                                                            0:01:07

Completed in 0.05 seconds
admin@node1.router1#
```

### Remove SDP Prefixes

Some of the SDP options can include private IP addresses and pose additional challenges with the SIP NAT inter-working. The `remove-sdp-lines-by-prefix` can be used to remove such lines from the SIP messages. As shown in the [above example](#configuration), the `a=candidate` line is configured to be removed from all SIP messages.

## SIP Message Changes

The 128T `sip-alg` functionality is completely stateless and works by applying NAT rules to every SIP message sent and received. The SIP stack, however, is aware of directionality and uses this information to fix the messages with the correct set of IP addresses.

#### Outbound Call Changes

Consider an outbound `SIP INVITE` message received from the PBX destined towards a remote endpoint.

```
INVITE sip:service@172.16.2.102:5060 SIP/2.0
Via: SIP/2.0/UDP 192.168.2.128:5060;branch=z9hG4bK-4178-1-0
From: sipp <sip:sipp@192.168.2.128:5060>;tag=4178SIPpTag001
To: service <sip:service@172.16.2.102:5060>
Call-ID: 1-4178@192.168.2.128
CSeq: 1 INVITE
Contact: sip:sipp@192.168.2.128:5060
Max-Forwards: 70
Subject: Performance Test
Content-Type: application/sdp
Content-Length:   135

v=0
o=user1 53655765 2353687637 IN IP4 192.168.2.128
s=-
c=IN IP4 192.168.2.128
t=0 0
m=audio 6000 RTP/AVP 0
a=rtpmap:0 PCMU/8000
```

The above message, contains the private address `192.168.2.128` in several key places such as `Contact` header and the `c=` line in the SDP. These fields are typically used by the remote server to communicate with the endpoint and establish a call. In the scenario where the endpoint is behind a NAT, these addresses are not reachable. After passing through the `sip-alg` function, the above SIP INVITE message is fixed up as shown below:

```
INVITE sip:service@172.16.2.102:5060 SIP/2.0
Record-Route: <sip:172.16.2.128;lr;ftag=4178SIPpTag001>
Via: SIP/2.0/UDP 172.16.2.128:5060;branch=z9hG4bK9d03.16530dac338af7723b8b1d42857c6b6d.0
Via: SIP/2.0/UDP 192.168.2.128:5060;branch=z9hG4bK-4178-1-0
From: sipp <sip:sipp@172.16.2.128:5060>;tag=4178SIPpTag001
To: service <sip:service@172.16.2.102:5060>
Call-ID: 1-4178@192.168.2.128
CSeq: 1 INVITE
Contact: sip:sipp@172.16.2.128:5060
Max-Forwards: 70
Subject: Performance Test
Content-Type: application/sdp
Content-Length:   135

v=0
o=user1 53655765 2353687637 IN IP4 172.16.2.128
s=-
c=IN IP4 172.16.2.128
t=0 0
m=audio 6000 RTP/AVP 0
a=rtpmap:0 PCMU/8000

```

A few important aspects of the changes made to the original SIP INVITE are as follows:

* A SIP `Record-Route` header is added to the `INVITE` to ensure that the router stays in path of all requests associates with this call-id.
* A new `Via` header is added to insert the router in paths of all responses associated with this call-id. The information related to the client is encoded in the `branch` cookie within the `Via` header.
* The `Contact`, `Call-ID`, `SDP` and any other header that referenced the private address of `192.168.2.128` has been replaced with the corresponding proxy address of `172.16.2.128`.


#### Inbound Call Changes

Consider an inbound SIP call received from the server `172.16.2.102` on the `proxy-ip` representing the PBX.

```
INVITE sip:phone3@172.16.2.128:5060 SIP/2.0
Via: SIP/2.0/UDP 172.16.2.102:5060;branch=z9hG4bK-3585-1-0
From: sipp <sip:sipp@172.16.2.102:5060>;tag=3585SIPpTag001
To: phone3 <sip:phone3@172.16.2.128:5060>
Call-ID: 1-3585@172.16.2.102
CSeq: 1 INVITE
Contact: sip:sipp@172.16.2.102:5060
Max-Forwards: 70
Subject: Performance Test
Content-Type: application/sdp
Content-Length:   135

v=0
o=user1 53655765 2353687637 IN IP4 172.16.2.102
s=-
c=IN IP4 172.16.2.102
t=0 0
m=audio 6000 RTP/AVP 0
a=rtpmap:0 PCMU/8000
```

The above message is sent to `kamailio` which in turn converts the public IPs to private addresses and forwards the message to the branch PBX. The new message will look as follows:

```
INVITE sip:phone3@192.168.2.128:5060 SIP/2.0
Record-Route: <sip:172.16.2.128;lr;ftag=3585SIPpTag001>
Via: SIP/2.0/UDP 172.16.2.128:5060;branch=z9hG4bK626e.01bb9cb7cd546e70477186f224a898da.0
Via: SIP/2.0/UDP 172.16.2.102:5060;branch=z9hG4bK-3585-1-0
From: sipp <sip:sipp@172.16.2.102:5060>;tag=3585SIPpTag001
To: phone3 <sip:phone3@192.168.2.128:5060>
Call-ID: 1-3585@172.16.2.102
CSeq: 1 INVITE
Contact: sip:sipp@172.16.2.102:5060
Max-Forwards: 70
Subject: Performance Test
Content-Type: application/sdp
Content-Length:   135

v=0
o=user1 53655765 2353687637 IN IP4 172.16.2.102
s=-
c=IN IP4 172.16.2.102
t=0 0
m=audio 6000 RTP/AVP 0
a=rtpmap:0 PCMU/8000
```

In the inbound case, the following modifications were performed:
* The `Record-Route` header was added to ensure that the proxy is in the path for all future requests for the call.
* The `Via` header is added to ensure the proxy remains in path for all response messages.
* The Request URI and the `To` headers are fixed to point to the PBX private address instead of the `proxy-ip`.

## Troubleshooting

### Inspecting Kamailio

The 128T `sip-alg` function launches a `kamailio` service which is responsible for fixing up all the SIP messages. The operation of the process can be inspected via querying the systemd service for the appropriate `sip-alg` instance. For example:

```
# systemctl status t128-sip-alg@PBX.service
● t128-sip-alg@PBX.service - Kamailio service running in PBX
   Loaded: loaded (/etc/systemd/system/t128-sip-alg@.service; disabled; vendor preset: disabled)
   Active: active (running) since Wed 2020-07-08 18:52:33 UTC; 10h ago
 Main PID: 22261 (kamailio)
   CGroup: /system.slice/system-t128\x2dsip\x2dalg.slice/t128-sip-alg@PBX.service
           ├─22261 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22264 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22265 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22266 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22267 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22268 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22269 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22270 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22271 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22272 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22273 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22274 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22275 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22276 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22277 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22278 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22279 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22280 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22281 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           ├─22282 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4
           └─22283 /usr/sbin/kamailio -DD -P /var/run/kamailio/kamailio.pid -f /etc/kamailio/kamailio.PBX.cfg -m 64 -M 4

Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ TO service <sip:service@172.16.2.102:5061>;tag=11336SIPpTag015 ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ CONTACT <sip:172.16.2.102:5061;transport=UDP> ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: It is a response to an outbound request
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: Reverse natting From header
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: Sending natted reply as:
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ STATUS 200 OK ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ VIA SIP/2.0/UDP 172.16.2.128:5061;branch=z9hG4bK4911.716b96ecc6684d3543e468d8454f285e.0, SIP/2.0/UDP 172.16.1.1...hG4bK-12741-5-7 ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ FROM sipp <sip:sipp@192.168.2.128:5060>;tag=12741SIPpTag005 ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ TO service <sip:service@172.16.2.102:5061>;tag=11336SIPpTag015 ]
Jul 08 18:57:36 t190-dut2.openstacklocal PBX[22278]: INFO: {2 Cseq: 2 BYE CId: 5-12741@192.168.2.128} <script>: [ CONTACT <sip:172.16.2.102:5061;transport=UDP> ]
Hint: Some lines were ellipsized, use -l to show in full.
#
```

The `kamailio` configuration can be found under `/etc/kamailio/kamailio.PBX.cfg` and should reflect the ip-mappings and other configuration from the plugin configuration.

:::note
Users should not make any manual changes to the `kamailio` config as it would get overwritten from the 128T conductor.
:::

### Inspecting the sip-alg Namespace

All of the `sip-alg` function, including `kamailio`, operate from within a network namespace. Some of the common commands and the expected outputs are shown below.

The following example shows the KNI configuration and the default route on a running system
```
# ip netns exec PBX ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
62: sip-private0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 66:2e:6e:54:ac:cb brd ff:ff:ff:ff:ff:ff
    inet 169.254.129.18/30 scope global sip-private0
       valid_lft forever preferred_lft forever
    inet6 fe80::642e:6eff:fe54:accb/64 scope link
       valid_lft forever preferred_lft forever
63: sip-public0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 3e:01:42:65:a9:fc brd ff:ff:ff:ff:ff:ff
    inet 169.254.129.22/30 scope global sip-public0
       valid_lft forever preferred_lft forever
    inet6 fe80::3c01:42ff:fe65:a9fc/64 scope link
       valid_lft forever preferred_lft forever
#
# ip netns exec PBX ip route
default via 169.254.129.21 dev sip-public0
169.254.129.16/30 dev sip-private0 proto kernel scope link src 169.254.129.18
169.254.129.20/30 dev sip-public0 proto kernel scope link src 169.254.129.22
192.168.2.128 via 169.254.129.17 dev sip-private0
#
```

The `kamailio` process would be listening on the configured SIP port to intercept and fix the SIP messages. The behavior can be validated by running the following command:
```
# ip netns exec PBX netstat -pant
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 169.254.129.22:5060     0.0.0.0:*               LISTEN      19098/kamailio
tcp        0      0 169.254.129.18:5060     0.0.0.0:*               LISTEN      19098/kamailio
```

Finally, the namespace is configured with a set of `iptables` rules to enable the static mapping from public to private. A typical set of rules can be seen below.

```
# ip netns exec PBX iptables -t nat -nvL
Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    4  1776 DNAT       all  --  sip-private0 *       0.0.0.0/0            0.0.0.0/0            to:169.254.129.18
    5  2558 DNAT       all  --  sip-public0 *       0.0.0.0/0            0.0.0.0/0            to:169.254.129.22

Chain INPUT (policy ACCEPT 9 packets, 4334 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 10 packets, 5485 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
   10  5485 SNAT       all  --  *      *       0.0.0.0/0            0.0.0.0/0            to:172.16.2.128
```

[^1]: https://en.wikipedia.org/wiki/Session_Initiation_Protocol
[^2]: https://en.wikipedia.org/wiki/Session_Description_Protocol
[^3]: https://www.kamailio.org/

## Release Notes

### Release 3.2.1
**Release Date:** Nov 04, 2022

**Router Version**
- 128T-sip-alg-router-1.2.0-2

#### Issues Fixed

- **PLUGIN-1908** SIP ALG plugin consumes a lot of memory on a running system

    _**Resolution**_ Reduced the overall number of child processes running on the system as well as stopped default kamailio service which is not used.

### Release 3.2.0

#### New Features and Improvements
- **PLUGIN-1839** Reduce time to apply salt states in large scale deployments

By using Saltstack data files, the time to apply high states across all assets is significantly reduced.

### Release 2.4.0, 3.1.1

#### New Features and Improvements
- **PLUGIN-756** Provide support for DSCP marking on transformed packets

The feature adds support for configuring `sip-alg > dscp` to specify the TOS marking to be used for the packets transformed by the SIP ALG plugin, allowing the traffic to be prioritized appropriately on the egress.

#### Issues Fixed
- **PLUGIN-1131** The default log-level for the plugin on the router is too high

  _**Resolution:**_ Reduce the log level by default and allow the appropriate log level to be configured for debugging and troubleshooting as needed.

- **PLUGIN-756** Missing `access-policy > permission` for the SIP ALG configuration caused config to fail

  _**Resolution:**_ The logic for service config generation now defaults to the appropriate permission when user does not configure it

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the SIP ALG plugin in 128T versions `5.1.0` and greater.

