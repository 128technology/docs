---
title: Conductor-Managed SSR Onboarding
sidebar_label: Conductor-Managed SSR Onboarding
---

Juniper SSR hardware devices (SSR120/130, SSR1200/1300/1400/1500) come pre-installed with the version 5.4.4 software. The device includes a QR code that when scanned, automatically adopts the device into your Mist Organization. Before scanning, it is suggested that you verify the IP address of the managing conductor using the process below. 

## Pre-Onboarding Verification

When onboarding a conductor-managed device, the process is simplified by ensuring that the IP address of the managing conductor is configured for the site that will adopt the device. This is typically done during Site Configuration. To verify the conductor IP address has been assigned:

1. Select Site Configuration from the Organization menu.

	![Site Configuration](/img/wanas_select_site_config.png)

2. Select the Site the device will be adopted into from the list of Sites.

3. Scroll down to **Session Smart Conductor** and verify the IP address. 

	![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

If no IP address is present, use the SSR GUI to copy the IP address.

1.  On the Configuration Home panel in the SSR GUI, click the Authority button. 

	![Authority Home](/img/wanas_conductor_ip1.png)

2. Under Authority Settings, scroll down to **Conductor Addresses** and copy the IP address of the conductor.

	![Conductor Address](/img/wanas_conductor_ip.png)

3. Return to the Mist Site Configuration, and scroll down to the Session Smart Conductor field and add the Conductor IP address.

	![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

Proceed to either [SSR120 Onboarding](wan_assurance_ssr120_quickstart.md) or the [SSR130 Onboarding](wan_assurance_ssr130_quickstart.md) and the process that follows. 