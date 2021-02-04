---
title: Ethernet Over Secure Vector Routing
sidebar_label: Ethernet Over Secure Vector Routing
---

128T Routers can provide a site-to-site ethernet broadcast domain over the IP network without additional encapsulation, and provide increased security and efficiency. This new technology is termed Ethernet over SVR (EOSVR). 

EOSVR for point to point L2 services provides the following advantages over traditional MPLS networks:
- Eliminate additional CE routers that need to be deployed to set up MPLS pseudowires
- First packet processing with metadata for VxLAN packets eliminates the need to tunnel the VxLAN packet within yet another IP packet (e.g. GRE).
- SVR packets can go over internet or MPLS. Hence it provides multipath failover redundancy.
- Increased security as SVR packets are encrypted and authenticated.
