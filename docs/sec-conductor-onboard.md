---
title: Secure Conductor Onboarding
sidebar_label: Secure Conductor Onboarding
---

Secure Conductor Onboarding (SCO) provides the ability to onboard a router to a conductor ensuring that each device proves possession of a private key, and that the connection is trusted and authenticated. SCO employs asymmetric cryptography (RSA key pairs) to perform digital signatures and verification. The secure conductor onboarding process leverages the physical or virtual TPM module for mutual authentication. 

When a router has SCO enabled, asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor, so any devices not using this feature will fail to onboard to the conductor. In addition, if an SCO enabled device attempts to onboard using the legacy method, the onboarding is rejected.

### Prerequisites

- The `secure-conductor-onboarding` must be enabled
- The `secure-conductor-onboarding public-key` field must be configured
- The `secure-conductor-onboarding ca-certificate` field must be configured
- The conductor nodes must have asset-id's configured

To provide a secure and mutually authenticated onboarding mechanism, the following information must be configured.

- Pre-shared key: The onboarding pre-shared key is a 48-character alpha-numeric string, configured at the router level. This key is mandatory for the SCO process.
- Conductor Public certificate: A public-private key certificate.
- Conductor CA certificate: A public certificate signed by a preferred CA signing authority. 

The public certificate and CA certificate are configured on the conductor at the Authority level.

## Basic Configuration 

The following information are the steps to configure and use Secure Conductor Onboarding. For details about any of the commands and steps, see [How It Works](#how-it-works)

- Configure the Conductor where the router will onboard.
    - Configure the conductor to accept the router.
- Generate signed certs for the conductor and place the certificates in the appropriate location on the conductor. 
    ```
    mv myCA.key /etc/128technology/pki/myCA.key 
    mv myCA.pem /etc/128technology/pki/myCA.pem 
    mv server.key /etc/128technology/pki/server.key 
    mv server.pem /etc/128technology/pki/server.pem 
    ```
:::note
Only RSA keys are supported at this time. 
::: 

- Load the certificate for SCO configuration. 
    ```
    configure authority client-certificate server file server 
    configure authority trusted-ca-certificate myCA file myCA 
    ```

- Enable ssh-only for asset resiliency. 
    `configure authority asset-connection-resiliency ssh-only true `

- On the conductor, enable SCO for each router. 
    - For devices with a built-in dev-id certificate 
    ```
    config authority router router1 system secure-conductor-onboarding mode strong 
    config authority router router1 system secure-conductor-onboarding pre-shared-secret  (removed)
    ``` 
    - For Public cloud VMs with vTPM  
    ```
    config authority router router1 system secure-conductor-onboarding mode strong 
    config authority router router1 system secure-conductor-onboarding pre-shared-secret  (removed) 
    config authority router router1 node node0 secure-conductor-onboarding endorsement-key  (text/plain) 
    ```

Configuring a pre-shared-secret is an optional parameter. If one is not specifically configured, it will be automatically generated.

:::note
To read the EK from the public cloud instance, run `tpm2_readpublic -c 0x81010001 -f DER -o /dev/stdout -Q | base64 -w0` and configure the contents in the endorsement-key field above. 
:::

:::note
Ports 4505 and 4506 are automatically closed after SCO is enabled on the conductor and the conductor is restarted.
:::

- Create the SCO token on the conductor. 
    ```
    create secure-conductor-onboarding token router-name <router> [expiration-timeout <1d>] 
    ```

- Enter the token and other onboarding details using CLI commands, or in the Onboarding interface. 

    After the user generates an onboarding token, enter the token and other onboarding details in the onboarding UI or using CLI commands. There are two methods to onboard a router:

    - Using the Command line: `create secure-conductor-onboarding token` command and `onboarding-config.json`.
    - Mist Conductor Redirect: In the Mist interface, token information is entered with the conductor IP address. This information is sent to the router once SZTP has been completed and then passed to the router client to perform secure conductor onboarding.

Once the process is initiated, the conductor CA certificate is loaded on the system as a trusted CA, allowing the device to trust the conductor in subsequent workflows.

### Onboarding Workflow

Once the Secure Conductor Onboarding workflow is initiated, the router performs the following:

1. Establish a TLS connection to the conductor on port 933.
2. Perform mutual authentication over TLS socket to ensure the client and server can trust one another.
3. Once the connection is validated by both parties, the persistent SSH keys for establishing SSH tunnels between router and conductor are exchanged.
4. The router connects to the conductor over port 930 using the SSH keys exchanged in previous steps.
5. The router is prepped and initialized by the conductor. During this process, the system goes through the reboot cycle.

Once the secure SSH tunnels are established, the SCO workflow concludes. All future communication between the router and conductor will occur over port 930.

### Known Caveats 

- Once SCO is enabled on the HA conductor, both conductor nodes must be restarted. 

- Only RSA key-based certificates are supported on the conductor at this time. 

## How It Works

The following sections provide details about the commands and parameters used for Secure Conductor Onboarding. 

### Router Level Configuration Parameters

The following parameters are required, and are configured at the Router level.

`configure authority router system secure-conductor-onboarding mode`

- `disabled`: Default is true, must be false to enable.
- `psk-only`: Configured on devices with no TPM, but which require the Secure Conductor Onboarding workflow.
- `weak`: This setting enables SCO but allows the router to use a self-signed certificate, and can be used on devices with no TPM. Generates a self signed certificate per authentication attempt for non-TPM devices. For TPM devices, the certificate from the TPM is used. The conductor does not verify that these certificates are signed by a CA.
- `strong`: On SSR devices manufactured with a device ID (SSR400/SSR440), `strong` mode ensures that the asset-id matches the serial number field in the subject line of the router’s public certificate. For vTPM workflows, the router’s endorsement key must match the `endorsement-key` configuration. 

### Conductor Configuration

To enable this feature on the conductor, verify the following:

- The `secure-conductor-onboarding public-key` field must be configured.
- The `secure-conductor-onboarding ca-certificate` field must be configured.

When all routers have SCO enabled, the legacy asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor to prevent any devices not using this feature from onboarding. In addition, if a SCO enabled device attempts to onboard using the legacy method, the attempt will be rejected.

To provide secure and mutually authenticated onboarding, the following additional information is required.

- Pre-shared key
- Conductor Public certificate
- Conductor CA certificate

The onboarding pre-shared key will be 48-character alpha-numeric string configured at the router level. This key is mandatory for SCO process to work successfully.
The conductor is expected to contain a public-private key certificate with the additional option to sign the public certificate by the organization’s preferred CA signing authority. The public certificate and CA certificate will be configured in the conductor data model.

## Token Creation

Create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token creation requires the following:

- The fields `secure-conductor-onboarding ca-certificate` and `secure-conductor-onboarding public-certificate` must be configured, valid, and signed by the root CA of the conductor. 

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

If any checks fail, the `create secure-conductor-onboarding token` command returns an error with an explanation. This command can be run as many times as needed for each router. All information to form the token is present in the configuration.

The CA certificate is read from disk at the location given in `secure-conductor-onboarding ca-certificate`.  

### Token Contents

The next step in the process is to generate an onboarding token from the conductor Web interface, command line, or using APIs. The generated tokens are signed by the conductor’s private key so that they cannot be altered once generated. The SSR supports Router-specific tokens. These are mutually exclusive and are defined in the configuration.

### Router-Specific Tokens

For better control over distribution and re-use of tokens the user can request unique tokens per router. In this mode it is required that an `asset-id` be assigned to each node within the router before generating a token. 

The onboarding-token uses the JSON Web Token format. Below is an example of the payload section. Additional information about the router configuration necessary for initialization can also be included in the token.

```
{
    “conductor-public-cert": “<base64 encoded public cert >”,
    “conductor-ca-cert": “<base64 encoded ca cert >”,
    “secret”: “<base64 encoded 48 byte string>”,
    “asset-id”: [“node0-asset-id”, “node1-asset-id”],
    “exp”: 1234567
}
```

### Invalid Tokens

The onboarding tokens are stateless and self-contained. If a token is compromised or no longer necessary, they can be labeled as invalid, and removed. 

- Expiration: Token automatically becomes invalid after the expiration date. Since the token is signed by the conductor, the expiration time cannot be modified by the end user. 

:::note 
The conductor’s current date/time is used to validate the expiration. If the conductor undergoes any significant time skew, it could result in accidental invalidation of user tokens. It is imperative that conductors use an external NTP source.
:::

- Change pre-shared key: To invalidate unexpired tokens, the user can change the pre-shared key in the conductor configuration. This is done at the authority or router level, based on the mode of operation.

- Update conductor certificate: When the conductor certificate expires and a new certificate is installed, all existing tokens signed by the old certificate are no longer valid. The details of how to update the conductor certificate follow existing supported procedures.








