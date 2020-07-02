---
title: Static Hostname Mappings
---

[Services](concepts_glossary.md#services) are the construct used to define the properties and destination for traffic traversing the 128T. An example service for a printer can be seen below.

```
config

    authority

        service  printer
            name            printer
            tenant          trusted-users
            address         192.168.0.123
            service-policy  printer-policy
        exit
    exit
exit
```

It is common to define a service for every destination of traffic within a network so as to shape traffic and affect policy in a way that assures quality of experience. In deployments of dozens or even hundreds of locations, this may result in duplicate or redundant configuration if a similar service exists at every site. Given the printer example, it is likely that the service configuration would be similar at every location, except for perhaps the `address`. The overall configuration can be simplified by using a hostname as the service address instead of an IP address.

```
config

    authority

        service  printer
            name            printer
            tenant          trusted-users
            address         local.printer.service
            service-policy  printer-policy
        exit
    exit
exit
```

This single service template of sorts can now be used for every location, however it requires a DNS server at the location to correctly resolve `local.printer.service` to the location-specific address. If it not possible to leverage a DNS server to resolve hostnames, the 128T can be used to define a static mapping to achieve the same result.

A mapping of hostname to a list of addresses can be added to the router configuration which in turn adds entries to `/etc/hosts`. 128T will use these addresses as resolutions for the hostnames as if they were directly added to `/etc/hosts` or returned by dynamic DNS lookup. The hostname/address mappings are used for all hostnames within the 128T configuration, not only on service addresses.

## Configuration

```
config

    authority

        router  burl-corp
            name                     burl-corp

            static-hostname-mapping

                static-entry  local.printer.service
                    hostname    local.printer.service
                    ip-address  192.168.0.123
                exit
            exit
        exit
    exit
exit
```

The service configuration from above, in combination with this router-specific hostname mapping will allow the printer service to be properly defined at each respective location.

## Troubleshooting

[`show dns resolutions`](cli_reference.md#show-dns-resolutions) displays whether hostnames provisioned within the 128T configuration have been resolved, either through configuration, leveraging `static-hostname-mapping` or manual through the PCLI.

This output from `show dns resolutions` is performed with the _service_ configured with an address of `local.printer.service` but does not yet have a `static-hostname-mapping` configured.
```
admin@test1.Fabric128# show dns resolutions
Mon 2020-06-29 19:21:19 UTC
=========== ======= ======================= ========== =============== ============
 Router      Node    Hostname                Resolved   Last Resolved   Expiration
=========== ======= ======================= ========== =============== ============
 Fabric128   test1   local.printer.service   N          -               -
Completed in 0.10 seconds
```

As can be seen from the output, the hostname has not been resolved.
After the mapping has been configured:

```
admin@test1.Fabric128# configure authority router Fabric128 static-hostname-mapping static-entry local.printer.service
admin@test1.Fabric128 (static-entry[hostname=local.printer.service])# ip-address 192.168.0.123
*admin@test1.Fabric128 (static-entry[hostname=local.printer.service])# commit
*admin@test1.Fabric128 (static-entry[hostname=local.printer.service])# top
```

The output of `show dns resolutions` will show that the hostname now resolves to a valid address.

```
admin@test1.Fabric128# show dns resolutions
Mon 2020-06-29 19:22:20 UTC
=========== ======= ======================= ========== =============== ============
 Router      Node    Hostname                Resolved   Last Resolved   Expiration
=========== ======= ======================= ========== =============== ============
 Fabric128   test1   local.printer.service   Y          -               -
Completed in 0.11 seconds
```

[`set dns resolutions`](cli_reference.md#set-dns-resolution) can be used to override or set a value learned from a DNS resolver.
```
admin@test1.Fabric128# show dns resolutions
Mon 2020-06-29 19:00:05 UTC
=========== ======= ========== ========== =============== ============
 Router      Node    Hostname   Resolved   Last Resolved   Expiration
=========== ======= ========== ========== =============== ============
 Fabric128   test1   foo        Y          -               -
 Fabric128   test1   bar        N          -               -
Completed in 0.11 seconds
```
```
admin@test1.Fabric128# set dns resolution bar 2.2.2.2
Successfully set hostname resolution on node test1
```
```
admin@test1.Fabric128# show dns resolutions
Mon 2020-06-29 19:00:12 UTC
=========== ======= ========== ========== =============== ============
 Router      Node    Hostname   Resolved   Last Resolved   Expiration
=========== ======= ========== ========== =============== ============
 Fabric128   test1   bar        Y          -               -
 Fabric128   test1   foo        Y          -               -
 ```

:::note
If using `set dns resolution` on a hostname resolved by a DNS server, the 128T will no longer attempt to resolve those addresses as static entries do not have a TTL.
:::