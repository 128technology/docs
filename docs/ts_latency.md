---
title: Troubleshooting Latency
sidebar_label: roubleshooting Latency
---

This document is for network administrators responsible for managing a deployed Session Smart Networking Platform.

## Troubleshooting Steps

The basic approach used to troubleshoot applications on the Session Smart Networking Platform follows the set of steps below:

1. Identify the requesting _tenant_ that is attempting to use the application
2. Identify the _service_ associated with the application.
3. Identify the applications affected; what are the application names and functions. 
4. Does this application have any dependencies - DNS, LDAP/TACACS+, etc. 
5. What are the Source IP and VLAN?
6. What are the Destination IP/port/protocol?


Determine the SSR's selected route for the application
4. Check the status of peers (for SVR traffic) or next hops (for non-SVR traffic)
5. Use the `service-ping` command to generate test traffic
6. Perform end user testing

Each of these steps will be discussed in more detail in the sections that follow.