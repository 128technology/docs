---
title: FIB Best Practices
sidebar_label: FIB Best Practices
---
We have provided a lot of detailed information on the FIB. Let’s summarize some best practices when considering your SSR network design.

## Complexity

Avoid complex transport configurations in a service. The previous examples show that transport overlap can account for many potential conflicts in the FIB. Services with multiple port-range entries across multiple transports can make this difficult to track. 

If your configuration calls for scenarios with many port-ranges, consider breaking these out into multiple services. This does not create more FIB entries. The first configuration example is from earlier in this document. The second example shows these services broken out into multiple services resulting in equivalent FIB entries with a reduced risk of encountering unexpected transport overlap.

#### Original Example

```
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
	        service            s6-udp1000
            name           s6-udp1000

            transport      udp
                protocol    udp

                port-range  1000
                    start-port  1000
                    end-port    2000
                exit
            exit
            address        10.1.1.0/24

            access-policy  t0
                source  t0
            exit
        exit
```

#### Multiple Services

```
        service            s6-udp3000
            name           s6-udp3000

            transport      udp
                protocol    udp

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

        service            s7-udp
            name           s7-udp

            transport      udp
                protocol    udp

                port-range  3500
                    start-port  3500
                    end-port    4500
                exit
            exit
            address        10.1.0.0/16

            access-policy  t0
                source  t0
            exit
        exit

        service            s7-tcp
            name           s7-tcp

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

## FIB Matching

Enable [`fib-service-match any-match`](config_command_guide.md#configure-authority-fib-service-match) at the beginning of a deployment. This option more closely matches what is typically expected and intended in the configuration. 

:::important
For existing deployments, great care should be taken to compare existing configuration to existing RIB to ensure that changing this value does not result in overloading the FIB on deployed systems.
:::

## BGP over SVR

When using BGP over SVR, be careful when choosing routing interface address space. It should not conflict with useable network space in the deployment. Addresses in link local address space (169.254.0.0/16) can be used, and is recommended. 
