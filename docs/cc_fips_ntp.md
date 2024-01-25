---
title: NTP
sidebar_label: NTP
---
Network Time Protocol (NTP) is a widely used protocol used to synchronize the clocks of routers and other hardware devices on the Internet. Primary NTP servers are synchronized to a reference clock directly traceable to Coordinated Universal Time (UTC). Reference clocks include GPS receivers and telephone modem services, NTP accuracy expectations depend on the environment application requirements. However, NTP can generally maintain time to within tens of milliseconds over the public internet.

NTP is defined in the RFC 5905: Network Time Protocol Version 4: Protocol and Algorithms Specification

Devices running Junos OS can be configured to act as an NTP client, a secondary NTP server, or a primary NTP server. These variations are as follows:

Primary NTP Server—Primary NTP servers are synchronized to a reference clock that is directly traceable to UTC. These servers then re-distribute this time data downstream to other Secondary NTP servers or NTP clients.
Secondary NTP Server—Secondary NTP servers are synchronized to a primary or secondary NTP server. These servers then re-distribute this data downstream to other Secondary NTP servers or NTP clients.
NTP Client—NTP clients are synchronized to a primary or secondary NTP server. Clients do not re-distribute this time data to other devices.