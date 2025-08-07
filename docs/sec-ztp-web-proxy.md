---
title: Secure ZTP Onboarding Using a Mist Proxy
sidebar_label: Secure ZTP Onboarding Using a Mist Proxy
---

With only MPLS or private connectivity available, it is possible to leverage a connection to MIST using a non-transparent proxy and a private web proxy in the network. This type of web proxy is often used to bridge the gap between private and public networks.

This document provides information to configure the SSR to identify and use the non-transparent proxy, and use that address to perform the secure ZTP onboarding process.

It is recommended that before configuring the web proxy and secure ZTP, you provision the Onboarding Conductor and Operational Conductor. For information about onboarding a conductor-managed router through Mist, please see [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md).

## Configure an SSR Mist Web Proxy

By default the SSR uses DHCP to identify the SSR web proxy addresses. To leverage a connection to MIST using a non-transparent proxy and a private web proxy, you can configure the SSR to either dynamically learn the proxy address or configure a static proxy IP address and port. 

### Learned 

Once the router management-proxy is enabled, the default mode is `learned`. In this case, the device will identify the web proxy addresses from a DHCP server on the network. 
 
```
config authority router router management-proxy enable
config authority router router management-proxy mode  learned
```
#### Network Interface Override 

In a case where you do not want an SSR to learn a proxy address from a network interface, you can disable learning mode on that interface. This allows a user to define from which network-interfaces the web-proxy can be learned.

```
config authority router router network-interface enable-proxy-discovery false
```

### Static 

If you prefer to set the proxy IP addresses manually, set the management-proxy mode to static, and enter the IP address and port to be accessed by the SSR.

```
config authority router router management-proxy mode   static
config authority router router management-proxy proxy 10.0.0.1 address  10.0.0.1
config authority router router management-proxy proxy 10.0.0.1 port     5000
```

This same address will be used for both nodes in an HA pair, and across all WAN interfaces.

Optionally, you can use the Hardware Bootstrapper onboarding.json to set the static IP address and port number until the router is onboarded to the conductor. 

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

1. SSR devices are [configured with an SSR Mist connection using a web proxy](configure-an-ssr-mist-web-proxy).
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
