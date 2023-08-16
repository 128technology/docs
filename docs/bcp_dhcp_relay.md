---
title: DHCP Relay Best Practices
sidebar_label: DHCP Relay Best Practices
---

The purpose of a DHCP relay is to relay DHCP server requests/responses to one-to-many subnets for clients. Normally, a client can talk directly to a DHCP server; especially when there is a single subnet. However, in the case where clients are not on the same subnet, and thus not directly served by DHCP server, a DCHP relay agent can be deployed to mediate these requests. The SSR can accommodate DHCP relay services.

