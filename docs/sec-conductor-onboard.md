---
title: Secure Conductor Onboarding
sidebar_label: Secure Conductor Onboarding
---

Secure Conductor Onboarding (SCO) is an onboarding protocol between the router and the conductor that provides mutual authentication using a challenge–response mechanism. It employs asymmetric cryptography (e.g., RSA key pairs) to perform digital signatures and verification, ensuring that each party proves possession of its private key and that the connection is trusted and authenticated. The SCO process will leverage any physical or virtual TPM module detected on the platform for mutual authentication. 

To enable this feature on the conductor, a few prerequisites must be met.

1.	The secure conductor onboarding mode should not be disabled
2.	The secure-conductor-onboarding > public-key field must be configured
3.	The secure-conductor-onboarding > ca-certificate field must be configured
When all routers have SCO enabled, the legacy asset-id based onboarding will be disabled and thus port 4505 and 4506 will be disabled on the conductor to disable any devices not using this feature will fail to onboard to the conductor. In addition, if a SCO enabled device onboards using the legacy method or vice versa, the onboarding will be rejected.

## Onboarding Token Management

Configuration Pre-Requisites

To provide a secure and mutually authenticated onboarding mechanism, the following additional pieces of information are required during the process:

1.	Pre-shared key
2.	Conductor Public cert
3.	Conductor CA cert
The onboarding pre-shared key will be 48-character alpha-numeric string which can configured at the authority or the router level. This key is mandatory for SCO process to work successfully.
The conductor is expected to contain a public-private key certificate with the additional option to sign the public cert by the organization’s preferred CA signing authority. The public cert and CA cert will be configured in the conductor data model.

### Token Management

Use the following command to create an authority level token:

`create secure-conductor-onboarding token global [expiration-timeout <1d>]`


To create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optional and will default to 1 day if not specified. It will be in the form of time short-hand (ex. 1s, 2m, 3h, 4d, 5mo, 1y) with 1 year being the maximum value.

The command must pass the following checks before being successful:

1.	The fields `authority > secure-conductor-onboarding > ca-certificate` and `secure-conductor-onboarding > public-certificate` must be present, not expired, and signed by the root CA of the conductor. Generation of the certificate will follow the normal process involving APIs and a CA.
2.	SCO must be enabled on the conductor at the Authority or per router level.
3.	The given router and node must be configured with at least the minimum config to commit. For example, for a standalone node: 
```
router min-router
    name min-router 
    inter-node-security internal
    node min-node 
        name min-node 
        asset-id test-id 
        role combo 
    exit
exit
```

If any of these checks fail, the `create system connectivity` command will return an error explaining why. This command can be run as many times as needed for each node and does not store any additional information in the data stores – the user is responsible for the correct and secure storage of the token on their end. All information to form the token is already present in the config.
The ca cert will be read from disk at the location given in `authority > secure-conductor-onboarding > ca-certificate`. 

### Token Contents

The next step in the process is to generate an onboarding token from conductor UI/PCLI or using API. The generated tokens are signed by the conductor’s private key so that they cannot be altered once generated. The device will support two modes; which are mutually exclusive and will be toggled via configuration: Authority Wide and Router Specific tokens.

#### Authority-Wide Tokens

When using a single authority level PSK, the token can be generated once and used for any router within that authority. The authority wide token contains the following information:

- conductor-public-cert: a base64 encoded public cert
- conductor-ca-cert: a base64 encoded ca cert
- secret: a base64 encoded 48 byte string
- expiration: 1234567

#### Router-Specific Tokens

For better control over distribution and re-use of tokens the user can request unique tokens per router. In this mode it is required that an asset-id be assigned to each of the node(s) within the router before generating a token. 

- conductor-public-cert: a base64 encoded public cert
- conductor-ca-cert: a base64 encoded ca cert
- secret: a base64 encoded 48 byte string
- asset-id: `[node0-asset-id, node1-asset-id]`
- expiration: 1234567

The onboarding-token will use the JSON Web Token format and the above represents the payload section. Additional information about the router configuration necessary for initialization can also be included in the token.

### Token Invalidation
The onboarding tokens are stateless and self-contained. As a result, there needs to be a mechanism where the tokens can be invalidated if they are compromised or are not necessary anymore. There are a few different methods to perform invalidation:

1. Expiration: Token is automatically invalid past its expiration date. Since the token is signed by the conductor, the expiration time cannot be modified by the end user. 

:::note 
The conductor’s current date/time is used to validate the expiration. If the conductor undergoes any significant time skew that could result in accidental invalidation of user tokens. It’s imperative that conductor clocks towards an external NTP source.
:::

2. Change pre-shared key: To invalidate unexpired tokens, the user can change the pre-shared key in the conductor config. This would be done at the authority or router level depending on the mode of operation
3. Update conductor certificate: When the conductor certificate expires and a new certificate is installed instead, all existing tokens signed by the old certificate will no longer be valid. The details of how to update the conductor cert should follow existing supported procedures and are outside the scope of this document

