---
title: Secure ZTP Onboarding Using a Mist Proxy
sidebar_label: Secure ZTP Onboarding Using a Mist Proxy
---

With only MPLS or private connectivity available, it is possible to leverage a connection to MIST using a non-transparent proxy and a private web proxy in the network. This type of web proxy is often used to bridge the gap between private and public networks.

This document provides information to configure the SSR to identify and use the non-transparent proxy, and use that address to perform the secure ZTP onboarding process.

It is recommended that before configuring the web proxy and secure ZTP, you provision the Conductor. For information about onboarding a conductor-managed router through Mist, please see [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md).

## Configure an SSR Mist Web Proxy

By default the SSR uses DHCP to identify the SSR web proxy addresses. To leverage a connection to MIST using a non-transparent proxy and a private web proxy, you can configure the SSR to either configure a static proxy IP address and port, or dynamically learn the proxy address. 

### Static 

If you prefer to set the proxy IP addresses manually, configure the `management-proxy mode` to `static`, and enter the IP address and port to be accessed by the SSR.

```
config authority router router management-proxy mode   static
config authority router router management-proxy proxy 10.0.0.1 address  10.0.0.1
config authority router router management-proxy proxy 10.0.0.1 port     5000
```

This same address will be used for both nodes in an HA pair, and across all WAN interfaces.

Optionally, you can use the Hardware Bootstrapper onboarding.json to set the static IP address and port number until the router is onboarded to the conductor. 

### Learned 

The SSR can be configured to dynamically learn proxy addresses from a DHCP-server on the network.

When the `router management-proxy` is `enabled`, the default mode is `learned`. In this case, the device will identify the web proxy addresses from a DHCP server on the network. 
 
```
config authority router router management-proxy enable
config authority router router management-proxy mode  learned
```

The following diagram describes the DHCP discovery process.

![DHCP Discovery Process](/img/sec-dhcp-discover-process.png)

1. The SSR sends a DHCP DISCOVER message with `Option 60` and value of `JuniperSSR`. The message also includes `Option 43` as a requested parameter.

```
08:34:24.685760 IP (tos 0x0, ttl 128, id 0, offset 0, flags [none], proto UDP (17), length 306)
    0.0.0.0.bootpc > 255.255.255.255.bootps: [udp sum ok] BOOTP/DHCP, Request from fa:16:3e:14:db:05 (oui Unknown), length 278, xid 0xe5dadd09, Flags [none] (0x0000)
	  Client-Ethernet-Address fa:16:3e:14:db:05 (oui Unknown)
	  Vendor-rfc1048 Extensions
	    Magic Cookie 0x63825363
	    DHCP-Message Option 53, length 1: Discover
	    Client-ID Option 61, length 7: ether fa:16:3e:14:db:05
	    Parameter-Request Option 55, length 4:
	      Subnet-Mask, Default-Gateway, Domain-Name-Server, Vendor-Option
	    Vendor-Class Option 60, length 10: "JuniperSSR
```

2. To enable proxy auto-discovery, the DHCP server must send DHCP option `43` with a sub-option of `128`. The sub-option should contain the proxy address and port information.

```
08:34:25.687329 IP (tos 0x10, ttl 128, id 0, offset 0, flags [none], proto UDP (17), length 337)
    linux-router.novalocal.bootps > 10.73.3.50.bootpc: [udp sum ok] BOOTP/DHCP, Reply, length 309, xid 0xe5dadd09, Flags [none] (0x0000)
	  Your-IP 10.73.3.50
	  Client-Ethernet-Address fa:16:3e:14:db:05 (oui Unknown)
	  Vendor-rfc1048 Extensions
	    Magic Cookie 0x63825363
	    DHCP-Message Option 53, length 1: Offer
	    Server-ID Option 54, length 4: linux-router.novalocal
	    Lease-Time Option 51, length 4: 6000
	    Subnet-Mask Option 1, length 4: 255.255.255.0
	    Default-Gateway Option 3, length 4: linux-router.novalocal
	    Domain-Name-Server Option 6, length 8: dns.google,dns.google
	    Vendor-Option Option 43, length 17: 10.92.53.8:3128
```

3. The same sequence repeats for `DHCP REQUEST` and `DHCP ACK` messages. This ensures that the information is successfully obtained during lease renewals.

By default, the SSR includes the above options in its DHCP discovery implementation. When the `router management-proxy` is `enabled`, the discovered proxy is used. 

#### Network Interface Override 

In a case where you do not want an SSR to learn a proxy address from a network interface, you can disable learning mode on that interface. This allows a user to define from which network-interfaces the web-proxy can be learned.

```
config authority router router network-interface enable-proxy-discovery false
```

### Proxy Address Selection 

It is possible that multiple SSR device-interfaces may be configured to use a DHCP client, which could result in learning multiple IP addresses. This may happen in cases where a device has multiple interfaces with `dhcp` enabled, or in an HA deployment using `learned` mode.  

In these situations, the SSR will use the lowest integer value from the list of proxy-addresses learned. For example, if the DHCP mode learns the following address: 

`192.168.10.10, 192.168.10.11` 

The SSR will select `192.168.10.10` - the address with the lowest integer value. 

### Troubleshooting 

Use the following commands to see the learned proxy address and the selected proxy address. 

- `show dhcp learned-proxies` shows all learned proxy addresses for each network-interface.
- `show management-proxy` shows the active proxy (if applicable). 
 
## Installation via Mist Proxy / Secure ZTP Onboarding

The sZTP process is the following:

1. SSR devices are [configured with an SSR Mist connection using a web proxy](#configure-an-ssr-mist-web-proxy).
2. Upon installation, the SSR will "phone home" to the MIST Global1 EP terminator (ep-terminator.mistsys.net). 
3. Based on the target claimed environment, the device is redirected to the appropriate organization.
4. The client creates a TLS connection to MIST cloud and validates using OCRA authentication. 
MIST Cloud validates the client by leveraging onboard TPM with a request/response challenge.

5. The MIST org/site is configured with the following information to be validated and installed on the device:
	- Conductor IP address 
	- Pre-shared secret obtained from the conductor 
	- Root CA for the cert installed on the conductor (optional)
	- Install the Root CA on the local router to validate the conductor
	- Install the pre-shared secret in secure storage
	- The SSR will securely onboard itself to the provided staging conductor

6. Once the router is onboarded to the Onboarding Conductor, the following information is sent to the router:
	- Conductor IP address of the operational/production conductor
	- Pre-shared secret obtained from the operational conductor 
	- Root CA for the cert installed on the operational conductor
7. The Onboarding Conductor triggers certificate creation on the router.
8. A Certificate Signing Request for the generated public key is triggered.
9. The Onboarding Conductor pushes down the SVR configuration for peering with the operational hub.
10. The Root CA is installed on the local router to validate the conductor.
11. The pre-shared secret is installed in secure storage.
12. Finally, the onboarding conductor will trigger a `migrate` command to re-target the router to the operational conductor.
