---
title: Intrusion Detection and Prevention
sidebar_label: Intrusion Detection and Prevention
---

Intrusion Detection and Prevention (IDP) leverages the Juniper IDP Signature Database, providing state of the art protection against the most up-to-date vulnerabilities. This database contains definitions of attack objects and application signatures defined in the form of IDP policy rules, and is updated regularly. By automatically downloading the latest definitions and application signatures, the SSR is able to provide cutting edge security solutions for your network. 

## How It Works

The following IDP profiles are available to apply the necessary policy enforcement on services.

- **Standard** - The **Standard** profile is the default and represents a set of IDP signatures and rules recommended by Juniper. Each type and severity of attack has a Juniper-defined action that is enforced when an attack is detected. 

- **Strict** - The **Strict** profile contains a similar set of IDP signatures and rules as the Standard profile. However, when an attack is detected the actions are more likely to actively block any malicious traffic or other attacks detected in the network.

- **Alert** - When the user selects an **Alert** profile, the IDP engine only generates alerts when it detects malicious traffic on the network. The IDP signature and rules are the same as the Standard profile.

### IDP Actions

The actions taken when a threat is identified or an attack is detected are listed below.

- **Recommended** - The Juniper IDP ruleset defines the type of action to be taken for a vulnerability. Some of the possible actions taken include:
	- Close the client and server TCP connection.
	- Drop current and all subsequent packets.
	- Alert only, no additional action taken.

- **Close or Block** - The TCP connection is closed towards the client and server. For UDP and other non-stream-oriented protocols, the packets are dropped. 

- **Alert** - Events are always generated for any detected vulnerability. However, when the **Alert** action is specified, no additional measure is taken by the system to prevent the attack. Alerts are typically only to low severity attacks, or when the administrator explicitly configures the alert-only action for a service and tenant. 

### Security Events Dashboard

Security events are generated any time a vulnerability is detected. These events are stored on the system for up to 24 hours, and can be viewed on the Security Event History page on the SSR Conductor, or from the PCLI using the `show idp events` command. 

![Show IDP Events in PCLI](/img/idp_show-idp-events.jpg)

Events can be filtered for focused results. See [`show idp events`](cli_reference.md#show-idp-events) for a complete list of event filters. 

### Automatic Updates

IDP Automatic Updates are defined using the same value configured in the Application Identification **auto-update** setting. If no value is set, the default is weekly. 

![App ID Update Frequency](/img/idp_app-id-data-update.jpg)

## Limitations

The following is a list of the current limitations of the IDP solution. 

- The IDP solution is designed for use with local breakout services, and on a spoke router. 

- IDP is not supported for hierarchical services. The policy can be enabled on a parent service, but not on the child services.

- The tenants used for IDP-based services must have well-defined prefixes. Define the tenant used for the access-policy in one of two ways:
	- Use the tenant-prefix on the network-interface
	- Use the tenant with a member with well-defined subnets

- IDP Mode: This is set to Auto by default, and automatically determines the status of your SSR for IDP. This is an Advanced administrative setting and it is not recommended to be changed. The options are described here for adminstrators. 

![Advanced IDP Settings](/img/idp_adv-idp-setting-mode.jpg)

- `auto`: Default. Automatically reviews the configuration to determine whether the SSR is a Hub or Spoke. It is recommended to leave this setting.
- `disabled`: Used to disable IDP, for example on an individual router.
- `spoke`: Defines the router as the location that is performing the IDP inspection. 
- `hub`: Configures the router as an SVR pass-through. 
