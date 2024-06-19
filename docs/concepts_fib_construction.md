---
title: How the FIB is Constructed
sidebar_label: How the FIB is Constructed
---

The FIB is constructed using a combination of user configured services, with routes from the RIB (connected, static, kernel, and routing protocols OSPF and BGP). Each address configured in a service creates at least one FIB entry per access-policy (unique tenant) in that service. A simple service with two addresses and an access-policy for two tenants will result in four FIB entries, as shown below.

```
        service  s0
            name           s0
            address        10.0.0.0/8
            address        172.16.0.0/16

            access-policy  t0
                source  t0
            exit

            access-policy  t1
                source  t1
            exit
        exit

FIB:
================ ====== ======= ======== ===== ========= =========== ======== ======
 IP Prefix        Port   Proto   Tenant   VRF   Service   Next Hops   Vector   Cost
================ ====== ======= ======== ===== ========= =========== ======== ======
 10.0.0.0/8          0   None    t0       -     s0        None        -        -
                                 t1       -     s0        None        -        -
 172.16.0.0/16       0   None    t0       -     s0        None        -        -
                                 t1       -     s0        None        -        -
```

Each transport configured on the service will result in at least one FIB entry per address, per tenant configured as an access-policy. If there are port ranges configured along with any transports, each port range will result in unique entries. Shown below is a more complicated configuration example and the resulting FIB entries.

```
service  s6
            name           s6

            transport      udp
                protocol    udp

                port-range  1000
                    start-port  1000
                    end-port    2000
                exit

                port-range  3000
                    start-port  3000
                    end-port    4000
                exit
            exit

            transport      tcp
                protocol  tcp
            exit
            address        10.1.1.0/24
            address        10.1.2.0/24

            access-policy  t0
                source  t0
            exit

            access-policy  t1
                source  t1
            exit

            access-policy  t2
                source  t2
            exit
        exit

FIB:
============= =========== ======= ======== ===== ========= =========== ======== ======
 IP Prefix          Port   Proto   Tenant   VRF   Service   Next Hops   Vector   Cost
============= =========== ======= ======== ===== ========= =========== ======== ======
 10.1.1.0/24           0   TCP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -
               1000-2000   UDP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -
               3000-4000   UDP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -
 10.1.2.0/24           0   TCP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -
               1000-2000   UDP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -
               3000-4000   UDP     t0       -     s6        None        -        -
                                   t1       -     s6        None        -        -
                                   t2       -     s6        None        -        -

```
The above examples do not take the RIB into account. A change in the configuration or a change in the RIB will cause the policy to be reapplied.
 
Each selected route in the RIB produces a route update that *may* influence the FIB. The route update is compared to all addresses for configured services. If a route update is more specific than a service address, this will result in multiple FIB entries for the service. An example of this is shown below. The service is configured with address 10.0.0.0/8, which automatically receives an entry. There is also a more specific BGP route in the RIB for 10.1.1.0/24. This results in a FIB entry for the configured service address (10.0.0.0/8), and a FIB entry for the more specific RIB route (10.1.1.0/24).

```
        service            s0
            name           s0
            address        10.0.0.0/8

            access-policy  t0
                source  t0
            exit
        exit

RIB:
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 Vrf       Prefix               Protocol    Selected   Distance   Metric   Uptime   Ip            Interface name   Directly connected   Fib
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 default   10.1.1.0/24          bgp         true             20        0       19   192.168.1.2   g1               unavailable          true
           169.254.127.126/31   connected   true              0        0    10323   unavailable   g4294967294      true                 true
           192.168.1.0/30       connected   true              0        0    10334   unavailable   g1               true                 true

FIB:
============= ====== ======= ======== ===== ========= ============= ======== ======
 IP Prefix     Port   Proto   Tenant   VRF   Service   Next Hops     Vector   Cost
============= ====== ======= ======== ===== ========= ============= ======== ======
 10.0.0.0/8       0   None    t0       -     s0        None          -        -
 10.1.1.0/24      0   None    t0       -     s0        192.168.1.2   -        0

```

This behavior potentially results in FIB conflicts. In these cases, the more specific service address by LPM is used for the FIB entry. 

In the example below, the route update for 10.1.0.0/20 matches both service addresses 10.0.0.0/8 and 10.1.0.0/16. This potentially creates an entry for 10.1.0.0/20 for services s0 and s1 for tenant t0, which would be conflicting. Therefore, the service address with the LPM wins the conflict, and the entry for service s1 is created.

```
        service            s0
            name           s0
            address        10.0.0.0/8

            access-policy  t0
                source  t0
            exit

            access-policy  t1
                source  t1
            exit
        exit

        service            s1
            name           s1
            address        10.1.0.0/16

            access-policy  t0
                source  t0
            exit
        exit

RIB:
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 Vrf       Prefix               Protocol    Selected   Distance   Metric   Uptime   Ip            Interface name   Directly connected   Fib
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 default   10.1.0.0/20          bgp         true             20        0       13   192.168.1.2   g1               unavailable          true
           169.254.127.126/31   connected   true              0        0    10323   unavailable   g4294967294      true                 true
           192.168.1.0/30       connected   true              0        0    10334   unavailable   g1               true                 true

FIB:
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 10.0.0.0/8                   0   None    t0         -     s0                        None          -        -
                                          t1         -     s0                        None          -        -
 10.1.0.0/16                  0   None    t0         -     s1                        None          -        -
 10.1.0.0/20                  0   None    t1         -     s0                        192.168.1.2   -        0
                                  None    t0         -     s1                        192.168.1.2   -        0

```

### How Transports on Services Affect the FIB

If transports are configured on services, route updates may add complexity to the above scenarios. To avoid colliding FIB entries, transport and port range configuration must be compared among services that share a prefix. The default behavior for this process continues from the procedure above. The prefix from the route update is used to find the most specific prefix configured in a service address. This address may be configured on multiple services that share the same tenant but have different transport and port range configurations. Only services that share this address will be considered for transport overlap. In case there is transport overlap between services, the service names will be used, and the first name lexicographically will be the service that gets the FIB entries. The way transport overlap scenarios are handled can have implications that may seem unintuitive. Take the example shown below:

```
        service  s0
            name           s0
            address        10.0.0.0/8

            access-policy  t0
                source  t0
            exit

            access-policy  t1
                source  t1
            exit
        exit

        service  s1
            name           s1

            transport      icmp
                protocol  icmp
            exit

            transport      tcp
                protocol  tcp
            exit

            transport      udp
                protocol  udp
            exit
            address        10.1.0.0/16

            access-policy  t0
                source  t0
            exit
        exit

        service  s6
            name           s6

            transport      udp
                protocol    udp

                port-range  1000
                    start-port  1000
                    end-port    2000
                exit

                port-range  3000
                    start-port  3000
                    end-port    4000
                exit
            exit
            address        10.1.1.0/24

            access-policy  t0
                source  t0
            exit
        exit

RIB:
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 Vrf       Prefix               Protocol    Selected   Distance   Metric   Uptime   Ip            Interface name   Directly connected   Fib
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 default   10.1.1.0/24          bgp         true             20        0       28   192.168.1.2   g1               unavailable          true
           169.254.127.126/31   connected   true              0        0    10323   unavailable   g4294967294      true                 true
           192.168.1.0/30       connected   true              0        0    10334   unavailable   g1               true                 true

FIB:
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 10.0.0.0/8                   0   None    t0         -     s0                        None          -        -
                                          t1         -     s0                        None          -        -
 10.1.0.0/16                  0   ICMP    t0         -     s1                        None          -        -
                                  TCP     t0         -     s1                        None          -        -
                                  UDP     t0         -     s1                        None          -        -
 10.1.1.0/24                  0   None    t1         -     s0                        192.168.1.2   -        0
                      1000-2000   UDP     t0         -     s6                        192.168.1.2   -        0
                      3000-4000   UDP     t0         -     s6                        192.168.1.2   -        0

```

In this scenario, the route update for 10.1.1.0/24 finds the best match for a service address for tenant `t0`, which is 10.1.1.0/24. This is configured in service `s0` and therefore only service `s0` is considered for transport overlap. Service `s1` is not considered. If a packet classified as source tenant `t0` comes into the router destined for 10.1.1.10 TCP/443, it will match the FIB entry for 10.1.0.0/16 TCP/0 for service `s1`, which has no next-hop. A session will not be installed in the session table, and no traffic will be forwarded. A network operator may think this traffic should reach its destination based on the intent of this configuration.

Due to the confusion of the above scenario, the configuration parameter [`fib-service-match`](config_command_guide.md#configure-authority-fib-service-match)has been added. The default value for this parameter, `best-match-only`, preserves the default functionality. Changing this to `any-match` will enhance the functionality. When `any-match` is configured, a route update visits other, less-specific service addresses. These addresses will be considered for transport overlap in the same manner as the best match is in the default behavior. Configuring `fib-service-match any-match`  changes the way the FIB is built from the above example to what is shown below.

```
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 10.0.0.0/8                   0   None    t0         -     s0                        None          -        -
                                          t1         -     s0                        None          -        -
 10.1.0.0/16                  0   ICMP    t0         -     s1                        None          -        -
                                  TCP     t0         -     s1                        None          -        -
                                  UDP     t0         -     s1                        None          -        -
 10.1.1.0/24                  0   None    t0         -     s0                        192.168.1.2   -        0
                                          t1         -     s0                        192.168.1.2   -        0
                                  ICMP    t0         -     s1                        192.168.1.2   -        0
                                  TCP     t0         -     s1                        192.168.1.2   -        0
                                  UDP     t0         -     s1                        192.168.1.2   -        0
                      1000-2000   UDP     t0         -     s6                        192.168.1.2   -        0
                      3000-4000   UDP     t0         -     s6                        192.168.1.2   -        0

```

In this case, if a packet classified as source tenant `t0` comes into the router destined for 10.1.1.10 TCP/443, it will match the FIB entry for 10.1.1.0/24 TCP/0 for service `s1`. This entry has a next-hop from the route update and therefore a session will be installed and traffic forwarded to next-hop 192.168.1.2.

Be aware, though, that even with this behavior, when there is any transport conflict between two services for entries of a particular prefix, the service declared as the winner (alphabetically) will create FIB entries for all of its transports and the losing service or services will create **no** FIB entries for this prefix. This is illustrated below:

```
        service            s0
            name           s0
            address        10.0.0.0/8

            access-policy  t0
                source  t0
            exit

            access-policy  t1
                source  t1
            exit
        exit

        service            s1
            name           s1
            enabled        true

            transport      icmp
                protocol  icmp
            exit

            transport      tcp
                protocol  tcp
            exit

            transport      udp
                protocol  udp
            exit
            address        10.1.0.0/16

            access-policy  t0
                source  t0
            exit
        exit

        service            s6
            name           s6

            transport      udp
                protocol    udp

                port-range  1000
                    start-port  1000
                    end-port    2000
                exit

                port-range  3000
                    start-port  3000
                    end-port    4000
                exit
            exit
            address        10.1.1.0/24

            access-policy  t0
                source  t0
            exit
        exit

        service            s7
            name           s7

            transport      udp
                protocol    udp

                port-range  3500
                    start-port  3500
                    end-port    4500
                exit
            exit

            transport      tcp
                protocol    tcp

                port-range  1000
                    start-port  1000
                    end-port    2000
                exit
            exit
            address        10.1.0.0/16

            access-policy  t0
                source  t0
            exit
        exit
```

```
RIB:
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 Vrf       Prefix               Protocol    Selected   Distance   Metric   Uptime   Ip            Interface name   Directly connected   Fib
========= ==================== =========== ========== ========== ======== ======== ============= ================ ==================== ======
 default   10.1.1.0/24          bgp         true             20        0      440   192.168.1.2   g1               unavailable          true
           169.254.127.126/31   connected   true              0        0    10323   unavailable   g4294967294      true                 true
           192.168.1.0/30       connected   true              0        0    10334   unavailable   g1               true                 true
```

```
FIB:
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 10.0.0.0/8                   0   None    t0         -     s0                        None          -        -
                                          t1         -     s0                        None          -        -
 10.1.0.0/16                  0   ICMP    t0         -     s1                        None          -        -
                                  TCP     t0         -     s1                        None          -        -
                                  UDP     t0         -     s1                        None          -        -
                      1000-2000   TCP     t0         -     s7                        None          -        -
                      3500-4500   UDP     t0         -     s7                        None          -        -
 10.1.1.0/24                  0   None    t0         -     s0                        192.168.1.2   -        0
                                          t1         -     s0                        192.168.1.2   -        0
                                  ICMP    t0         -     s1                        192.168.1.2   -        0
                                  TCP     t0         -     s1                        192.168.1.2   -        0
                                  UDP     t0         -     s1                        192.168.1.2   -        0
                      1000-2000   UDP     t0         -     s6                        192.168.1.2   -        0
                      3000-4000   UDP     t0         -     s6                        192.168.1.2   -        0
                           5000   UDP     t0         -     s8                        192.168.1.2   -        0

```

In this example, service `s7` has a port-range overlap with service `s6` because both contain entries for UDP ports 3500-4000. When the route update for 10.1.1.0/24 is applied, this address range is valid for both services. Due to this conflict, they cannot both create FIB entries for prefix 10.1.1.0/24. Even though there is no overlap for service `s7`’s TCP port range configuration, this entry is not installed for address 10.1.1.0/24. In this case, service `s6` has a more specific LPM for the route update address, so those entries are created first. When the behavior of `fib-service-match any-match` continues to look for less specific service addresses that match the route update and finds service `s7`, it is unable to create those entries due to the conflict with existing entries from service `s6`.

### FIB Next-Hops

The default behavior when creating FIB entries is to use the next-hop from the RIB obtained from the route update. This could be a connected interface, a next-hop address for a standard L3 hop, or the routing interface address of another SSR as learned from [BGP over SVR](concepts_fib_design.md#bgp-over-svr). 
