---
title: Secure ZTP Onboarding Using a Mist Proxy
sidebar_label: Secure ZTP Onboarding Using a Mist Proxy
---

With only MPLS or private connectivity available, it is possible to leverage a connection to Mist using an explicit proxy and a private web proxy in the network. This type of web proxy is often used to bridge the gap between private and public networks.

There are two steps to the process of onboarding using a Mist proxy; Provisioning a conductor, and configuring the SSR to identify and use the non-transparent proxy. 

This document provides information perform the secure ZTP onboarding process.

- It is recommended that before configuring the web proxy and secure ZTP, you provision the Conductor. For information about onboarding a conductor-managed router through Mist, please see [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md).

- After the conductor has been provisioned, [Configure the proxy server](config-proxy-server.md). 

- Once those steps have been completed, continue with the [Secure ZTP Onboarding](#secure-ztp-onboarding) procedure below. 

## Secure ZTP Onboarding

The sZTP process is the following:

1. SSR devices are [configured with an SSR Mist connection using a web proxy](config-proxy-server.md).
2. Upon installation, the SSR will "phone home" to the Mist Global1 EP terminator `ep-terminator.mistsys.net`. 
3. Based on the target claimed environment, the device is redirected to the appropriate organization.
4. The client creates a TLS connection to Mist cloud and validates using OCRA authentication. 
Mist Cloud validates the client by leveraging onboard TPM with a request/response challenge.

5. The Mist org/site is configured with the following information to be validated and installed on the device:
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
