---
title: AWS Transit Gateway Connect Plugin
sidebar_label: AWS Transit Gateway Connect
---

The 128T-aws-transit-gateway-connect plugin provides integration between a 128T and a Transit Gateway. It does so with the use of BGP for sharing routes and GRE tunnels to encapsulate the BGP traffic as well as any other traffic to be sent to the Transit Gateway.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Version Restrictions

 The router configuration that is generated is only compatible with 128T versions which have native GRE support (128T >= 5.2.0). 


### Terms

General Terms:
* Transit Gateway - A cloud router which connects VPCs and on-premise networks through a cental hub.
* Virtual Private Cloud (VPC) - A logically isolated virtual network in AWS where you can put resources.
* Transit Gateway Attachment - A way for the Transit Gateway to attach to a certain type of network.

Transit Gateway Connect Terms:
* Transit Gateway Connect - A logical unit containing the Connect Attachment, Transport Attachment, a Connect VPC, and the 128T.
* Transit Gateway Connect Attachment - A new type of Transit Gateway Attachment that operates on top of one of the existing Transport Transit Gateway Attachments.
* Transport Transit Gateway Attachment - An attachment that you can create a Connect Attachment on top of. Must be either of type VPC or VPN.
* Transit Gateway Connect Peer - A peer that communicates over GRE and with BGP to the Transit Gateway Connect. In our case, this is a 128T.

### Approach

The user is required to configure the Transit Gateway, the Transport Transit Gateway Attachment, and the Transit Gateway Connect Attachment. Also the user needs to configure the route tables to transport the 128T GRE traffic to the Transit Gateway network interface.

The plugin interacts with the AWS APIs to find if there already exists a connect peer that applies to the given node. Matching is based on the network interface ip address and the Connect Peer's peer address. If none exist, then the plugin creates one on behalf of the user. The plugin will choose the first `available` state Transit Gateway Connect Attachment to create the Transit Gateway Connect Peer on. 

This logic collects the necessary data for the plugin to generate the appropriate BGP and GRE config to connect to it.

## Setup Credentials on the Conductor

The conductor needs some setup to be able to query and create AWS objects. On each conductor node, follow the steps:
1. [Install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) the AWS CLI if not already installed.
2. [Configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) AWS CLI using `aws configure`. Be sure to specify the credentials, and `json` for the `output`.
3. Try running `aws ec2 describe-transit-gateway-connect-peers`.
   * If it prints out some json, then you are done
4. [Update](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-upgrade) the aws cli to the latest version available and then try step 3 again.

## Configuration Snippet

To determine which nodes/interfaces are to be used to connect to the transit gateway, the plugin configuration datamodel needs a tagging mechanism on the `network-interface`'s `address` to let the plugin know which interfaces should try to connect.

```
router
    node
        device-interface      base
            network-interface   base-intf
                address
                    ip-address                   10.10.10.10
                    prefix-length                24
                    gateway                      10.10.10.11

                    aws-transit-gateway-connect
                        enable true
                    exit
                exit
            exit
        exit
    exit
exit
```

If the router you are tagging is in a different region than the conductor, you must configure the region of the router.
```
router
    aws-transit-gateway-connect
        region us-west-2
    exit
exit
```

## Restrictions

* Due to the nature of tagging a specific `address` under the `network-interface`, this plugin only supports peering over a static IP addressed interface.

## Troubleshooting

### Configuration Generation

The `/var/log/128technology/persistentDataManager.log` file at trace level will hold whether the configuration generation was run as well as output and return code.
Configuration generation logs can be found on the conductor under `/var/**log**/128technology/plugins/cloud-ha-config-generation.log`.

### Helpful Commands

After the configuration is generated, the BGP peering status can be queried on the 128T side with the following commands for the router:

* `show bgp`
* `show bgp neighbors`
* `show bgp summary`

On the AWS Portal, under `VPC` > `Transit Gateway Attachments` > `<your connect attachments>` > `Connect peers`, there will be entries for the 128T as a connect peer and the BGP status. 


## Appendix

### Example Configuration Generation

With the example configuration and the following AWS TGW connect peer 

| Field        | Value          |
| ------------ | -------------- |
| TGW GRE IP   | 10.128.2.201   |
| TGW BGP IP 1 | 169.254.192.26 |
| TGW BGP IP 2 | 169.254.192.27 |
| 128T GRE IP  | 10.128.2.25    |
| 128T BGP IP  | 169.254.192.25 |


The following config will be generated:

:::note
The `base` device-interface already had existed.
:::

```
router
    node
        device-interface base
            network-interface  gre
                name       gre
                type       gre-tunnel

                tunnel
                    destination  10.128.2.201

                    source
                        network-interface
                    exit
                exit
            exit
        exit
        device-interface  bgp
            name               bgp
            description        "Auto-generated host KNI interface for aws-transit-gateway-connect"
            type               host

            network-interface  bgp-intf
                name       bgp-intf
                type       external

                address    169.254.192.25
                    ip-address     169.254.192.25
                    prefix-length  29
                exit
            exit
        exit
    exit

    routing              default-instance
        type              default-instance

        routing-protocol  bgp
            type            bgp
            local-as        64512
            router-id       169.254.192.25

            address-family  ipv4-unicast
                afi-safi  ipv4-unicast
            exit

            neighbor        169.254.192.26
                neighbor-address  169.254.192.26
                neighbor-as       64512

                transport

                    local-address
                        node       Node1
                        interface  bgp-intf
                    exit
                exit

                address-family    ipv4-unicast
                    afi-safi       ipv4-unicast
                    next-hop-self  true
                exit
            exit

            neighbor        169.254.192.27
                neighbor-address  169.254.192.27
                neighbor-as       64512

                transport

                    local-address
                        node       Node1
                        interface  bgp-intf
                    exit
                exit

                address-family    ipv4-unicast
                    afi-safi       ipv4-unicast
                    next-hop-self  true
                exit
            exit

            redistribute    connected
                protocol  connected
            exit
        exit

        static-route      169.254.192.26/32 1
            destination-prefix  169.254.192.26/32
            distance            1

            next-hop-interface  Node1 gre
                node       Node1
                interface  gre
            exit
        exit

        static-route      169.254.192.27/32 1
            destination-prefix  169.254.192.27/32
            distance            1

            next-hop-interface  Node1 gre
                node       Node1
                interface  gre
            exit
        exit
    exit
exit
```
