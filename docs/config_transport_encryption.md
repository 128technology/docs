---
title: Transport Based Encryption
sidebar_label: Transport Based Encryption
---

Providing a secure transport system for traffic often requires enabling encryption on all links/paths. For traffic already traversing a trusted link, this adds unnecesary processing overhead. Transport based encryption allows you to select specific links for encryption, such as public broadband or LTE. This reduces the performance hit taken when encrypting traffic over an already secure transport link. When a failover occurs from a trusted link to a public connection, payload encryption can be enabled to maintain the secure connection. 
 
Transport based encryption does not change how packets are encrypted, it simply provides more control points for enabling payload encryption. This provides flexibility when expanding your network from a legacy, all-private VPN MPLS network to include more modern communication technologies, such as wireless LTE connections. By retaining the service level payload encryption setting as disabled and enabling the transport level payload encryption at the new LTE link, traffic is encrypted on the public link maintaining the necessary security. 

- Transport based encryption only applies to the services that have a security policy defined but encryption turned off.
- Payload encryption happens on the first router where the override is enabled (irrespective of the number of hops and payload override configuration) and decryption happens on the last hop.
- [Adaptive encryption](sec_adaptive_encrypt.md) does not apply to transport based encryption.

## Configuration

To provide control on transport based encryption, use the following configuration options:

`payload-encryption-override`: Enforces transport based encryption using the following options.
- `enable-encryption`: Enable encryption of the payload even when the security-policy associated with the service is set to `encrypt=false`. If the payload is already encrypted by another 128T, send it out as is. 
- `disabled-override`: Disable override of the security policy and use the security policy settings associated with the service.

```
config authority
  router Router1
	node bar
	    device-interface dev1
		network-interface net1
			neighborhood n1
				payload-encryption-override disable-override
				adjacency 1.1.1.1 peer1
					payload-encryption-override enable-encryption
					generated false
					exit
        exit
      exit
    exit
  exit
exit
```

### Validating the Configuration

The compatibility of `payload-encryption-override` settings is checked at the corresponding peers. If `enable-encryption` is selected at one adjacency, the adjacency at the corresponding peer should also select `enable-encryption` for `payload-encryption-override`. If this has not been done, a pair of error messages are displayed during the validation step. 

```
*admin@conductor-east-1.RTR_EAST_CONDUCTOR (adjacency[ip-address=172.16.4.3][peer=RTR_CENTRAL_COMBO])# validate
✖ Validating...
% Error: Candidate configuration is invalid:
1. payload-encryption-override is not compatible with corresponding peer (RTR_EAST_COMBO) network-interface 'intf11' address '172.16.4.2' ('disable-override' != 'enable-encryption')

    config
        authority
            router RTR_CENTRAL_COMBO
                node combo-central-1
                    device-interface 11
                        network-interface intf11
                            adjacency 172.16.4.2 RTR_EAST_COMBO
                                peer

2. payload-encryption-override is not compatible with corresponding peer (RTR_CENTRAL_COMBO) network-interface 'intf11' address '172.16.4.3' ('enable-encryption' != 'disable-override')

    config
        authority
            router RTR_EAST_COMBO
                node combo-east-1
                    device-interface 11
                        network-interface intf11
                            adjacency 172.16.4.3 RTR_CENTRAL_COMBO
                                peer

```

A packet duplication warning message is displayed when the session resiliency of a service policy is discovered with a potential peer path `payload-encryption-override` to `enable-encryption`. 

```
All of the packet duplication paths for service 'west' that potentially go through peer 'RTR_WEST_COMBO' (service-route 'to-west') might be overridden to enable-encryption.
```

## Failover

If a session fails over to a different link, the session’s encryption is changed accordingly based on the transport based encryption setting.

![Transport Encryption](/img/config_transport_encryption.png)

Transport based encryption can be disabled through the configuration if encryption problems occur, such as the platform being under-powered, packet decryption issues due to configuration errors, etc.

### Troubleshooting

- `show sessions` displays the field “Payload Encrypted” to indicate if the session is being encrypted.
- `show session by-id` includes the field “Payload Encryption” to show the encryption status of the session.


