---
title: Secure Conductor Onboarding
sidebar_label: Secure Conductor Onboarding
---

Secure Conductor Onboarding (SCO) provides the ability to onboard a router to a conductor ensuring that each device proves possession of a private key, and that the connection is trusted and authenticated. SCO employs asymmetric cryptography (e.g., RSA key pairs) to perform digital signatures and verification. The secure conductor onboarding process leverages the physical or virtual TPM module for mutual authentication. 

When a router has SCO enabled, asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor, so any devices not using this feature will fail to onboard to the conductor. In addition, if an SCO enabled device attempts to onboard using the legacy method, the onboarding is rejected.

## Configuration

Configure the Conductor where the router will onboard.
- Configure the conductor to accept the router.
- Run the `create token` command on the conductor to create the token for the router.

### Prerequisites

- The `secure-conductor-onboarding mode` must be enabled
- The `secure-conductor-onboarding public-key` field must be configured
- The `secure-conductor-onboarding ca-certificate` field must be configured

To provide a secure and mutually authenticated onboarding mechanism, the following information must be configured.

- Pre-shared key: The onboarding pre-shared key is a 48-character alpha-numeric string, configured at the authority or the router level. This key is mandatory for the SCO process.
- Conductor Public certificate: A public-private key certificate.
- Conductor CA certificate: Optionally, you can configure a public certificate signed by a preferred CA signing authority. 

The public certificate and CA certificate are configured on the conductor at the Authority, Conductor, and Router level.

### Authority Level Configuration Parameters

The following parameters are required, and are configured at the Authority level.

#### `configure authority secure-conductor-onboarding public-certificate` 

This configures the public certificate which the conductor will present on port 933 to prove that it is the correct conductor. This references the `client-certificate` list.

#### `configure authority secure-conductor-onboarding ca-certificate`

This identifies the certificate to be included in the token, referencing the  `trusted-ca-certificate` list. This must be the CA certificate used to sign the public certificate, and is verified at commit time.

### Router Level Configuration Parameters

The following parameters are required, and are configured at the Router level.

#### `configure authority router secure-conductor-onboarding mode`

- `disabled`: Default is true, must be false to enable.
- `psk-only`: Configured on devices with no TPM, but which require the Secure Conductor Onboarding workflow.
- `weak`: This setting enables SCO but allows the router to use a self-signed certificate. This conductor will skip the CA certificate validation for this router.
- `strong`: On SSR devices manufactured with a device ID (SSR400/SSR440), `strong` mode ensures that the asset-id matches the serial number field in the subject line of the router’s public certificate. For vTPM workflows, the router’s endorsement key must match the `endorsement-key` configuration. 

#### `configure authority router secure-conductor-onboarding pre-shared-secret` 

The pre-shared secret is a 48-character alpha-numeric string. When enabled, any empty PSK will auto generate a random 48-byte alphanumeric string using the FIPS-approved, highly secure DRBG function from OpenSSL. Once generated, the key does not automatically change. It can be updated by the user if necessary.

### Conductor Configuration

To enable this feature on the conductor, verify the following:

- The `secure conductor onboarding mode` should not be disabled (see above).
- The `secure-conductor-onboarding public-key` field must be configured.
- The `secure-conductor-onboarding ca-certificate` field must be configured.

When all routers have SCO enabled, the legacy asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor to prevent any devices not using this feature from onboarding. In addition, if a SCO enabled device attempts to onboard using the legacy method, the attempt will be rejected.

To provide secure and mutually authenticated onboarding, the following additional information is required.

- Pre-shared key
- Conductor Public certificate
- Conductor CA certificate

The onboarding pre-shared key will be 48-character alpha-numeric string which can configured at the authority or the router level. This key is mandatory for SCO process to work successfully.
The conductor is expected to contain a public-private key certificate with the additional option to sign the public certificate by the organization’s preferred CA signing authority. The public certificate and CA certificate will be configured in the conductor data model.

## Token Creation

Create an authority level token:

`create secure-conductor-onboarding token global [expiration-timeout <1d>]`

Create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token creation requires the following:

- The fields `authority > secure-conductor-onboarding > ca-certificate` and `secure-conductor-onboarding > public-certificate` must be configured, valid, and signed by the root CA of the conductor. 

- SCO must be enabled on the conductor at the Authority or per router level (can be both).

- The router and node must be configured with at least the minimum valid configuration. For example, a minimum configuration for a standalone node: 

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

The CA certificate is read from disk at the location given in `secure-conductor-onboarding ca-certificate`. 

## Token Management

Use the following command to create an authority level token:

`create secure-conductor-onboarding token global [expiration-timeout <1d>]`

Use the following command to create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token Management requires the following settings:

- The fields `secure-conductor-onboarding ca-certificate` and `secure-conductor-onboarding public-certificate` must be configured, valid, and signed by the root CA of the conductor. 

- SCO must be enabled on the conductor at authority or per router level (can be both).

- The router and node must be configured with at least the minimum valid configuration. For example, a minimum configuration for a standalone node: 

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

The CA certificate is read from disk at the location given in `secure-conductor-onboarding ca-certificate`. 

### Token Contents

The next step in the process is to generate an onboarding token from the conductor Web interface, command line, or using APIs. The generated tokens are signed by the conductor’s private key so that they cannot be altered once generated. The SSR supports two modes; Authority-wide and Router-specific tokens. These are mutually exclusive and are defined in the configuration.

### Router-Specific Tokens

For better control over distribution and re-use of tokens the user can request unique tokens per router. In this mode it is required that an `asset-id` be assigned to each node within the router before generating a token. 

- conductor-public-cert: a base64 encoded public cert
- conductor-ca-cert: a base64 encoded ca cert
- secret: a base64 encoded 48 byte string
- asset-id: `[node0-asset-id, node1-asset-id]`
- expiration: 1234567

The onboarding-token uses the JSON Web Token format, and the above represents the payload section. Additional information about the router configuration necessary for initialization can also be included in the token.

### Token Invalidation

The onboarding tokens are stateless and self-contained. If a token is compromised or no longer necessary, they can be labeled invalid, and removed. Thefoloowing methods can be used to perform invalidation:

- Expiration: Token automatically becomes invalid after the expiration date. Since the token is signed by the conductor, the expiration time cannot be modified by the end user. 

:::note 
The conductor’s current date/time is used to validate the expiration. If the conductor undergoes any significant time skew, it could result in accidental invalidation of user tokens. It is imperative that conductors use an external NTP source.
:::

- Change pre-shared key: To invalidate unexpired tokens, the user can change the pre-shared key in the conductor configuration. This is done at the authority or router level, based on the mode of operation.

- Update conductor certificate: When the conductor certificate expires and a new certificate is installed, all existing tokens signed by the old certificate are no longer valid. The details of how to update the conductor certificate follow existing supported procedures.

## Secure Conductor Onboarding Workflow

After the user generates an onboarding token, enter the token and other onboarding details in the onboarding UI or using CLI commands. Two main methods are supported to onboard a router:

- UISO via `onboarding-config.json` suing the `secure-conductor-onboarding-token` command.
- Mist Conductor Redirect – using a field alongside the conductor IP address. This information is sent to the router once SZTP has been complete and then passed to the router client to perform secure conductor onboarding.

Once the process is initiated, the conductor CA certificate is loaded on the system as a trusted CA. This allows the device to trust the conductor in subsequent workflows. If empty, the CA cert validation is skipped.

### Onboarding Workflow

Once the Secure Conductor Onboarding workflow is initiated, the router performs the following:

1. Establish a TLS connection to the conductor on port 933.
2. Perform mutual authentication over TLS socket to ensure the client and server can trust one another.
3. Once the connection is validated by both parties, exchange the persistent SSH keys for establish SSH tunnels between router and conductor.
4. Router connects to conductor over port 930 using the SSH keys exchanged in previous steps.
5. The router is prepped and initialized by the conductor. During this process, the system goes through the reboot cycle.

Once the secure SSH tunnels are established, the SCO workflow concludes. All future communication between the router and conductor will occur on standard SSR to conductor ports such as 930, 4505, 4506, etc.







