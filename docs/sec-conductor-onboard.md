---
title: Secure Conductor Onboarding
sidebar_label: Secure Conductor Onboarding
---

Secure Conductor Onboarding (SCO) provides the ability to onboard a router to a conductor ensuring that each device proves possession of a private key, and that the connection is trusted and authenticated. SCO employs asymmetric cryptography (e.g., RSA key pairs) to perform digital signatures and verification. The secure conductor onboarding process leverages the physical or virtual TPM module for mutual authentication. 

When a router has SCO enabled, asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor, so any devices not using this feature will fail to onboard to the conductor. In addition, if an SCO enabled device attempts to onboard using the legacy method, the onboarding is rejected.

## Configuration

Configuration components: Onboarding conductor, router, Operational conductor. 

On the onboarding conductor create the minimum router configuration necessary for secure onboarding;

- thing one
- thing two
- thing three
Run the `create token` command for the router to create the token. 

The SSR4x0 is flashed with an image that tells it upon boot to reach out to Mist to get the onboarding conductor connection information. 

The router then connects to the Onboarding Conductor, and receives the the SCO token, the certificates, and the IP address of the Operational Conductor.

It redirects to the Operational Conductor to complete the secure conductor onboarding process which includes downloading the SVR configs, certificates, and necessary pre-shared secrets to operate in a secure manner/environment.

Use the information in this guide to configure the SCO process. 

**Prerequisites**

1.  The secure conductor onboarding mode must be enabled
2.  The secure-conductor-onboarding > public-key field must be configured
3.  The secure-conductor-onboarding > ca-certificate field must be configured

To provide a secure and mutually authenticated onboarding mechanism, the following information must be configured and in place:

- Pre-shared key: The onboarding pre-shared key is a 48-character alpha-numeric string, configured at the authority or the router level. This key is mandatory for the SCO process.
- Conductor Public certificate: A public-private key certificate
- Conductor CA certificate: Optionally, you can configure a public certificate signed by a preferred CA signing authority. 

The public certificate and CA certificate are configured on the conductor.

- must be configured at ALL(?) the Authority, Conductor, and router level
    - what has to be configured at each level?

### Authority Level Configuration Parameters

The following parameters are required, and are configured at the Authority level.

#### `configure authority secure-conductor-onboarding`

From the GUI, **authority > router > node > secure-conductor-onboarding**

**`mode`**

- `disabled` (default)
- `psk-only`: Configured on devices with no TPM, but which require the Sceure Conductor Onboarding workflow.
- `weak`: This setting enables, SCO but allows the router to use a self-signed certificate. This conductor will skip the CA certificate validation for this router.
- `strong`: On SSR devices manufactured with a device ID (SSR400/440), `strong` mode ensures that the asset-id matches the serialNumber field in the subject line of the router’s public certificate. For vTPM workflows, the router’s endorsement key must match the configuration at **authority > router > node > secure-conductor-onboarding > endorsement-key**.

- **authority > secure-conductor-onboarding > pre-shared-secret**: 48-character alpha-numeric string  
- **authority > secure-conductor-onboarding > public-certificate** This configures the public certificate which the conductor will present on port 933 to prove that it is the correct conductor. This references the **authority > client-certificate** list.
- **authority > secure-conductor-onboarding > ca-certificate**: This identifies the certificate to be included in the token. This references the **authority > trusted-ca-certificate** list. This must be the ca certificate used to sign the public certificate, and is verified at commit time.


### Per Router Configuration

The following parameters are required, and are configured at the router level.

•   authority > router > secure-conductor-onboarding > pre-shared-secret
o   When SCO is enabled, any empty PSK will auto generate random 32-byte alphanumeric string using FIPS approved highly secure DRBG function from OpenSSL library on the conductor. Once generated, the key will not automatically change and can be updated by the user if necessary.
•   authority > router > secure-conductor-onboarding > mode
o   auto (default) – defer to the authority level setting
o   disabled – means use legacy onboarding model
o   psk-only – same as above
o   weak – same as above 
o   strong – same as above 
o   strict – same as above

### Conductor Configuration

To enable this feature on the conductor, a few prerequisites must be met.
1.  The secure conductor onboarding mode should not be disabled
2.  The secure-conductor-onboarding > public-key field must be configured
3.  The secure-conductor-onboarding > ca-certificate field must be configured
When all routers have SCO enabled, the legacy asset-id based onboarding will be disabled and thus port 4505 and 4506 will be disabled on the conductor to disable any devices not using this feature will fail to onboard to the conductor. In addition, if a SCO enabled device onboards using the legacy method or vice versa, the onboarding will be rejected.

To provide a secure and mutually authenticated onboarding mechanism, the following additional pieces of information are required during the process
1.  Pre-shared key
2.  Conductor Public cert
3.  Conductor CA cert
The onboarding pre-shared key will be 48-character alpha-numeric string which can configured at the authority or the router level. This key is mandatory for SCO process to work successfully.
The conductor is expected to contain a public-private key certificate with the additional option to sign the public cert by the organization’s preferred CA signing authority. The public cert and CA cert will be configured in the conductor data model.

## Tokens

Use the following command to create an authority level token:

`create secure-conductor-onboarding token global [expiration-timeout <1d>]`

Use the following command to create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token creation requires the following settings be in place:

1. The fields `authority > secure-conductor-onboarding > ca-certificate` and `secure-conductor-onboarding > public-certificate` must be configured, valid, and signed by the root CA of the conductor. 

2. SCO must be enabled on the conductor at the Authority or per router level (can be both).

3. The router and node must be configured with at least the minimum valid configuration. For example, a minimum configuration for a standalone node: 

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

If any checks fail, the `create system connectivity` command returns an error explaining why. This command can be run as many times as needed for each node. All information to form the token is present in the configuration.

The CA certificate is read from disk at the location given in `authority > secure-conductor-onboarding > ca-certificate`. 

## Token Management

Use the following command to create an authority level token:

`create secure-conductor-onboarding token global [expiration-timeout <1d>]`

Use the following command to create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token Management requires the following settings be in place:

1. The fields `authority > secure-conductor-onboarding > ca-certificate` and `secure-conductor-onboarding > public-certificate` must be configured, valid, and signed by the root CA of the conductor. 

2. SCO must be enabled on the conductor at authority or per router level (can be both).

3. The router and node must be configured with at least the minimum valid configuration. For example, a minimum configuration for a standalone node: 

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

If any checks fail, the `create system connectivity` command returns an error explaining why. This command can be run as many times as needed for each node. All information to form the token is present in the configuration.

The CA certificate is read from disk at the location given in `authority > secure-conductor-onboarding > ca-certificate`. 

### Token Contents

The next step in the process is to generate an onboarding token from conductor Web interface, command line, or using APIs. The generated tokens are signed by the conductor’s private key so that they cannot be altered once generated. The SSR supports two modes; Authority Wide and Router Specific tokens. These are mutually exclusive and are defined in the configuration.

### Router-Specific Tokens

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
3. Update conductor certificate: When the conductor certificate expires and a new certificate is installed instead, all existing tokens signed by the old certificate will no longer be valid. The details of how to update the conductor cert should follow existing supported procedures and are outside the scope of this document.



