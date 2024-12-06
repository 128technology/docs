---
title: SSR Anti-Virus 
sidebar_label: SSR Anti-Virus
---

The SSR provides Anti-Virus protection on spoke and hub devices, and is configurable on a per-application basis. SSR Anti-Virus runs with or without IDP configuration, reports metrics to the User Interface, and will generate alarms if the anti-virus engine fails for any reason. With both built-in and user-customizable security profiles, it provides a high level of flexibility.

## How Does It Work?

SSR Anti-Virus uses the Sophos anti-virus engine and includes a self signing certificate for simplified, secure connection. Similar to IDP, Anti-Virus is configurable directly on the hub and spokes of the network. You can select one of the built-in security profiles, or define parameters on your own for a custom profile.

## SSR Anti-Virus Profiles

The SSR provides the following standard profiles:

- http-only: Process only http traffic.
- default-profile: Process all traffic: ftp, http, imap, pop3, smtp.
- No-ftp: Process all traffic except ftp.

Custom Profile Parameters

If you choose to configure a custom profile, the following lists and values are configurable:

- URL-whitelist: A list of URLs or addresses to be bypassed by antivirus scanning.
- MIME-whitelist: A MIME exception list to be bypassed by antivirus scanning.
- Fallback action: A list of fallback options: block, log and permit, or permit. The default setting is log-and-permit, and can be changed to block or permit if desired. 
- Protocols: The type of traffic to process. This list includes http, smtp, pop3, imap, ftp. Only the protocols selected from the list are processed by the AV engine.
- Max-filesize: The maximum filesize permitted. The default is 10,000.

## Configuration

Configuration can be performed from either the CLI or the Web Interface (GUI). 

Configure Anti-Virus Standard Profiles (CLI)

```
configure
    authority
        service internet
            access-policy branch
            anti-virus-policy[KA1]    [KA2]     http-only
        exit
    exit
exit
```



Custom Profile Example (CLI)

```
configure
    authority
        service internet
            access-policy branch
            anti-virus-profile custom-profile
        exit
            anti-virus-profile          custom-profile
            name                        custom-profile
            url-allowlist               *.juniper.net
            url-allowlist               *.mist.com[KA1] [MB2]    
            mime-allowlist              audio/
            mime-allowlist              video/
            protocol                    http
            protocol                    icmp
            max-filesize                20000
            fallback-action             permit
         exit
    exit
exit
```

In most cases, entering invalid values or parameters during configuration will generate a message in either the CLI or web interface informing the user that the entry is not correct. Invalid configurations will not be permitted, and will generate a validation error. 

## Troubleshooting

Use the following information and show commands to help identify issues with configuring or running Anti-virus. 

### Alarms
Sophos server is down: An alarm is triggered and an error logged. 
Anti-virus engine not running: An alarm is triggered and an error logged after X number of restart attempts.

### Show Commands

`show utm status`
`show antivirus status` - Sophos AV Engine status, license information.
`show antivirus statistics` - Information regarding traffic processed by the AV engine. 

