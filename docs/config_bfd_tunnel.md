---
title: BFD Overlay over SVR
sidebar_label: BFD Overlay over SVR
---

In deployments where the number of SVR sessions between SSRs are limited due to carrier settings, the established BFD channel is leveraged to encapsulate SVR sessions. When enabled, the SSR transforms each packet in the SVR session to a UDP packet, matching the IP/Port tuples of the BFD peer connection. The carrier does not see any additional sessions between the SSRs beyond the initial BFD peer connection. 

## Configuration

This feature is accessed from Authority > Router > Node > Device > Network Interface > Neighborhood, as part of a `spoke` configuration.

#### From the SSR GUI
Use the path described above to access the Neighborhood configuration. After naming the neighborhood, choose the `spoke` topology type. This opens the Peer Path Overlay field. The following options are available:

- **svr**: The original SVR overlay connection method. This is the default method for bidirectional connectivity. 
- **bfd-tunnel**: Outbound only connection method; enables the BFD Overlay over SVR feature. 

![BFD Tunnel on Neighborhood](/img/config_bfd_tunnel_gui.png)

These options are the same for the PCLI.

#### From the PCLI

```
config

    authority

        router  spo8
            name  spo8

            node  spo8
                name              spo8

                device-interface  lte
                    name               lte

                    network-interface  lte
                        name          lte

                        neighborhood  internet-act-lte
                            name               internet-act-lte
                            peer-path-overlay  bfd-tunnel
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

### How It Works
:::note
Both peers must be running the version of the SSR software that supports this feature, and have the same `bfd-tunnel` overlay model. 
:::

An attribute is added to the unencrypted metadata of UDP packets going over the BFD connection to distinguish this traffic from other BFD traffic. New sessions are established with additional metadata. Sessions continue to allocate waypoints, and are used to create individual flows. These waypoints are carried in the metadata and used locally on each router. 

 ## Troubleshooting

 Use the following `show stats` metrics to view and troubleshoot issues encountered with BFD Overlay over SVR:

- [`show stats packet-processing action success tunnel bfd encapsulate`](cli_stats_reference.md#show-stats-packet-processing-action-success-tunnel-bfd-encapsulate)
- [`show stats packet-processing action success tunnel bfd decapsulate`](cli_stats_reference.md#show-stats-packet-processing-action-success-tunnel-bfd-decapsulate)
