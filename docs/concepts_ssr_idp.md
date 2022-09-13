---
title: Intrusion Detection and Prevention
sidebar_label: Intrusion Detection and Prevention
---

Intrusion Detection and Prevention (IDP) leverages the Juniper IDP Signature Database, providing state of the art protection against the most up-to-date vulnerabilities. The database contains definitions of attack objects and application signatures defined in the form of an IDP policy ruleset that is updated regularly. By automatically downloading the latest definitions and application signatures, the SSR is able to provide cutting edge security solutions for your network. 

## How It Works

You can apply a profile (Alert, Standard, Strict) to an `access-policy`. Each profile has an associated traffic action. These actions define how the ruleset is handled on each service or access policy. Actions are not user-configurable. The following IDP profiles apply the policy enforcement.

- **Alert** - When the IDP engine detects malicious traffic on the network, only an alert is generated; no additional measures are taken by the system to prevent the attack. The IDP signature and rules are the same as the Standard profile. Alerts are typically only for low severity attacks, or when the administrator explicitly configures the `alert` action for a service and tenant.

- **Standard** - The **Standard** profile is the default, and represents the set of IDP signatures and rules recommended by Juniper. Each type and severity of attack has a Juniper-defined, non-configurable action that is enforced when an attack is detected. These actions include:

	- Close the client and server TCP connection.
	- Drop current and all subsequent packets.
	- Alert only, no additional action taken.

- **Strict** - The **Strict** profile contains a similar set of IDP signatures and rules as the Standard profile. However, when an attack is detected the actions are more likely to actively block any malicious traffic or other attacks detected in the network.

### Security Events Dashboard

Security events are generated any time a vulnerability is detected. These events are stored on the system for up to 24 hours, and can be viewed on the Security Event History page on the SSR GUI, or from the PCLI using the `show idp events` command. 

```
admin@node.cadillac# show idp events
Wed 2022-08-31 13:38:54 UTC
========== ================================== ========== ============= ================================= ========== ========
 Severity   Time                               Threat     Application   Attack                            Protocol   Action
========== ================================== ========== ============= ================================= ========== ========
        6   2022-08-31 13:36:20.872000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:GENERIC              TCP        CLOSE
        6   2022-08-31 13:36:20.872000+00:00   HIGH       NONE          HTTP:XSS:SMARTSTORE-NET-INPUT     TCP        CLOSE
        6   2022-08-31 13:36:20.870000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:REQ-VAR-5            TCP        CLOSE
        6   2022-08-31 13:36:15.863000+00:00   MEDIUM     NONE          HTTP:NTOP-BASIC-AUTHORIZATION-6   TCP        CLOSE
        6   2022-08-31 13:36:03.351000+00:00   MEDIUM     NONE          HTTP:EXTRA_CONTROL_CHARACTERS     TCP        CLOSE
        6   2022-08-31 13:35:53.333000+00:00   MEDIUM     NONE          HTTP:STC:SCRIPT:HTML-SCRIPT       TCP        CLOSE
        6   2022-08-31 13:35:43.328000+00:00   HIGH       NONE          HTTP:CTS:ZOHO-MNGNENG-SDP-RCE     TCP        CLOSE
        6   2022-08-31 13:35:30.818000+00:00   MEDIUM     NONE          HTTP:XSS:DOLIBARR-ERP-CRM-GROUP   TCP        CLOSE
        6   2022-08-31 13:35:30.816000+00:00   MEDIUM     NONE          HTTP:XSS:HTML-SCRIPT-IN-POST      TCP        CLOSE
        6   2022-08-31 13:35:20.812000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:CMD-IN-URL           TCP        CLOSE
        6   2022-08-31 13:35:20.811000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:REQ-VAR-5            TCP        CLOSE
        6   2022-08-31 13:35:20.810000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:GENERIC              TCP        CLOSE
        6   2022-08-31 13:35:20.809000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:REQ-VAR-1            TCP        CLOSE
        6   2022-08-31 13:35:20.808000+00:00   MEDIUM     NONE          HTTP:IIS:ENCODING:PERC-PERC-2     TCP        CLOSE
        6   2022-08-31 13:35:20.807000+00:00   MEDIUM     NONE          HTTP:SQL:INJ:ADVNTECH-RSNET-SQL   TCP        CLOSE
        6   2022-08-31 13:35:17.242000+00:00   HIGH       NONE          HTTP:CTS:ZOHO-ADMGR-FILEUPLD      TCP        CLOSE
        6   2022-08-31 13:35:10.800000+00:00   MEDIUM     NONE          HTTP:DIR:HTTP-REQ-URL             TCP        CLOSE
        6   2022-08-31 13:35:10.799000+00:00   HIGH       NONE          HTTP:CTS:ZOHO-MGN-ENG-AUTHBYPAS   TCP        CLOSE
        6   2022-08-31 13:34:58.286000+00:00   MEDIUM     NONE          HTTP:OVERFLOW:DOPSFT-XLS-MUL      TCP        CLOSE
        6   2022-08-31 13:34:54.505000+00:00   CRITICAL   NONE          HTTP:APACHE:LOG4J-JNDI-MGNR-RCE   TCP        CLOSE
        6   2022-08-31 13:34:54.502000+00:00   HIGH       NONE          HTTP:INVALID:MSNG-HTTP-VER        TCP        CLOSE
        6   2022-08-31 13:34:45.782000+00:00   MEDIUM     NONE          HTTP:REMOTE-URL-IN-VAR            TCP        CLOSE
        6   2022-08-31 13:34:35.776000+00:00   CRITICAL   NONE          HTTP:APACHE:LOG4J-JNDI-MGNR-RCE   TCP        CLOSE
        6   2022-08-31 13:34:35.775000+00:00   HIGH       NONE          HTTP:INVALID:MSNG-HTTP-VER        TCP        CLOSE
        6   2022-08-31 13:34:25.791000+00:00   CRITICAL   NONE          HTTP:DIR:AUTODSK-FBX-ZIP-DIRTRV   TCP        CLOSE
        6   2022-08-31 13:34:25.788000+00:00   CRITICAL   NONE          HTTP:DIR:AUTODSK-FBX-ZIP-DIRTRV   TCP        CLOSE
        6   2022-08-31 13:34:25.783000+00:00   HIGH       NONE          HTTP:DIR:SCHNDR-STU-STA-MUL-TRV   TCP        CLOSE
        6   2022-08-31 13:34:15.774000+00:00   MEDIUM     NONE          HTTP:DOS:APACHE-LOG4J-DOS         TCP        CLOSE
        6   2022-08-31 13:34:15.771000+00:00   HIGH       NONE          HTTP:INVALID:MSNG-HTTP-VER        TCP        CLOSE
        6   2022-08-31 13:34:05.772000+00:00   HIGH       NONE          HTTP:INVALID:MSNG-HTTP-VER        TCP        CLOSE
        6   2022-08-31 13:33:53.308000+00:00   HIGH       NONE          HTTP:INVALID:MSNG-HTTP-VER        TCP        CLOSE
        6   2022-08-31 13:33:53.305000+00:00   HIGH       NONE          UDP:LINUX-KERNEL-TIPC-OVERFLOW    UDP        DROP
        6   2022-08-31 13:33:49.787000+00:00   MEDIUM     NONE          HTTP:STC:DL:MS-VS-DDS-HEAP-BO     TCP        CLOSE
```

Events can be filtered for focused results. See [`show idp events`](cli_reference.md#show-idp-events) for a complete list of event filters. 

### Automatic Updates

IDP Automatic Updates are defined using the same values configured in the Application Identification **auto-update** setting. If no value is set, the defaults are used:

- Enabled
- Update time: 2AM
- Frequency: Weekly 

For information about changing the settings, see [Application Identification Modes.](config_app_ident.md#modes)

![App ID Update Frequency](/img/idp_app-id-data-update.jpg)

## Core Requirements 

The SSR IDP engine requires a dedicated core. When the SSR is configured with `forwarding-core-mode` as automatic, the system automatically assigns cores based on the hardware type, as well as an additional core for IDP. 

When the router is configured with `forwarding-core-mode` as manual, the administrator must account for the `forwarding-core-count` to include IDP core. For an HA router, each node follows the above scheme.
:::note
The system requires a reboot for the IDP core allocation; after upgrading to SSR 6.x for the first time, an additional reboot is required to enable the IDP engine.
:::

## Limitations

The following is a list of the current limitations of the IDP solution. 

- The IDP solution is designed for use with local breakout services, and on a spoke router. 

- IDP is not supported for hierarchical services. The policy can be enabled on a parent service, but not on the child services.

- The tenants used for IDP-based services must have well-defined prefixes. Define the tenant used for the access-policy in one of two ways:
	- Use the tenant-prefix on the network-interface
	- Use the tenant with a member with well-defined subnets

- IDP Mode: Set as `auto` by default. It is NOT recommended to change the default. **Auto** automatically determines the status of your SSR for IDP. 

	- `auto`: Default. Automatically reviews the configuration to determine whether the SSR is a Hub or Spoke.
	- `disabled`: Used to disable IDP.
	- `spoke`: Defines the router as the location that is performing the IDP inspection. 
	- `hub`: Configures the router as an SVR pass-through. 

![IDP Settings](/img/idp_adv-idp-setting-mode.jpg)
