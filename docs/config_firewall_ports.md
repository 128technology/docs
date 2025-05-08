---
title: Enable Ports on the Firewall
sidebar_label: Enable Ports on the Firewall
---

SSR software requires that the following ports be enabled on your firewall to allow connectivity and proper operation. 

### SSR to a Conductor

Enable the following on your firewall for SSR to Conductor connectivity:

- [Conductor IP address] 
- Port 930/TCP 
- Port 4505/TCP 
- Port 4506/TCP

### SSR to SSR

Enable the following on your firewall for SSR to SSR connectivity:

- [SSR IP address]
- Port 1280/UDP
- Ports 1280 and 1283/TCP
- Ports in the range 16,385-65,533 TCP/UDP
- rp.cloud.threatseeker.com on port 443/TCP; this is required for Web Filtering

For detailed information about different communication channels between nodes within a router, between peering routers, and between routers and their conductor, see [Intra- and Inter-System Communication](concepts_machine_communication.md)

### SSR to the Mist Cloud

For the most up to date SSR to Mist Cloud connectivity information, see [Juniper Mist Firewall Ports and IP Addresses for Firewall Configuration](https://www.juniper.net/documentation/us/en/software/mist/mist-management/topics/ref/firewall-ports-to-open.html).

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 | Global 05 | EMEA 01 | EMEA 02 | EMEA 03 | EMEA 04 | APAC 01 | APAC 03 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SSR | ep-terminator.mistsys.net (TCP 443)<br/> portal.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc1.mist.com (TCP 443)<br/> portal.gc1.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.ac2.mist.com (TCP 443)<br/> portal.ac2.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc2.mist.com (TCP 443)<br/> portal.gc2.mist.com (TCP443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc4.mist.com (TCP 443)<br/> portal.gc4.mist.com (TCP443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.eu.mist.com (TCP 443)<br/> portal.eu.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc3.mist.com (TCP 443)<br/> portal.gc3.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.ac6.mist.com (TCP 443)<br/> portal.ac6.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc6.mist.com (TCP 443)<br/> portal.gc6.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.ac5.mist.com (TCP 443)<br/> portal.ac5.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc7.mist.com (TCP 443)<br/> portal.gc7.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443)<br/> software.128technology.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) |

### Connect Directly to the Mist Cloud 

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 | Europe 01 | APAC 01 |
| --- | --- | --- | --- | --- | --- | --- |
| Admin Portal | manage.mist.com/signin.html<br/> api-ws.mist.com<br/> api.mist.com(TCP 443) | manage.gc1.mist.com<br/> api-ws.gc1.mist.com<br/> api.gc1.mist.com(TCP 443) | manage.ac2.mist.com<br/> api-ws.ac2.mist.com<br/> api.ac2.mist.com(TCP 443) | manage.gc2.mist.com (TCP 443)<br/> api-ws.gc2.mist.com (TCP 443) | manage.eu.mist.com<br/> api-ws.eu.mist.com<br/> api.eu.mist.com(TCP 443) | manage.ac5.mist.com (TCP 443) <br/> api-ws.ac5.mist.com (TCP 443)<br/> api.ac5.mist.com (TCP 443)<br/> |
| Guest Wi-Fi Portal | portal.mist.com (TCP 443) | portal.gc1.mist.com (TCP 443) | portal.ac2.mist.com (TCP 443) | portal.gc2.mist.com (TCP 443) | portal.eu.mist.com (TCP 443) | portal.ac5.mist.com (TCP 443) |
| Webhooks Source IP Addresses | 54.193.71.17<br/> 54.215.237.20 | 34.94.120.8<br/> 35.236.34.24<br/> 35.236.92.224 | 34.231.34.177<br/> 54.235.187.11<br/> 18.233.33.230 | 34.152.4.85<br/> 35.203.21.42<br/>  34.152.7.156 | 3.122.172.223<br/> 3.121.19.146<br/> 3.120.167.1 | 54.206.226.168<br/> 13.238.77.6<br/> 54.79.134.226 |




