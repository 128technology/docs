---
title: Enable Ports on the Firewall
sidebar_label: Enable Ports on the Firewall
---

SSR software requires that the following ports be enabled on your firewall to allow connectivity and proper operation. 

### Connect directly to the Mist Cloud 

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 | Europe 01 |
| --- | --- | --- | --- | --- | --- |
| Admin Portal | manage.mist.com/signin.html<br/> api-ws.mist.com<br/> api.mist.com(TCP 443) | manage.gc1.mist.com<br/> api-ws.gc1.mist.com<br/> api.gc1.mist.com(TCP 443) | manage.ac2.mist.com<br/> api-ws.ac2.mist.com<br/> api.ac2.mist.com(TCP 443) | manage.gc2.mist.com (TCP 443)<br/> api-ws.gc2.mist.com (TCP 443) | manage.eu.mist.com<br/> api-ws.eu.mist.com<br/> api.eu.mist.com(TCP 443) |
| Guest Wi-Fi Portal | portal.mist.com (TCP 443) | portal.gc1.mist.com (TCP 443) | portal.ac2.mist.com (TCP 443) | portal.gc2.mist.com (TCP 443) | portal.eu.mist.com (TCP 443) |
| Webhooks Source IP Addresses | 54.193.71.17<br/> 54.215.237.20 | 34.94.120.8<br/> 35.236.34.24<br/> 35.236.92.224 | 34.231.34.177<br/> 54.235.187.11<br/> 18.233.33.230 | 34.152.4.85<br/> 35.203.21.42<br/>  34.152.7.156 | 3.122.172.223<br/> 3.121.19.146<br/> 3.120.167.1 |

### SSR to the Mist Cloud

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 |
| --- | --- | --- | --- | --- |
| SSR | ep-terminator.mistsys.net (TCP 443)<br/> portal.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc1.mist.com (TCP 443)<br/> portal.gc1.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.ac2.mist.com (TCP 443)<br/> portal.ac2.mist.com (TCP 443)<br/> redirect.mist.com (TCP 443) | ep-terminator.mistsys.net (TCP 443)<br/> ep-terminator.gc2.mist.com (TCP 443)<br/> portal.gc2.mist.com (TCP443)<br/> redirect.mist.com (TCP 443) |

| <br/> software.128technology.com (TCP 443)<br/> jfrog-prod-use1-shared-virginia-main.s3.amazonaws.com (TCP 443)<br/> rp.cloud.threatseeker.com (TCP 443) |


### SSR to a Conductor

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 |
| --- | --- | --- | --- | --- |



### SSR to SSR

| Service Type | Global 01 | Global 02 | Global 03 | Global 04 |
| --- | --- | --- | --- | --- |


