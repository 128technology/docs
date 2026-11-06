---
title: Secure Conductor Onboarding
sidebar_label: Secure Conductor Onboarding
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.1.3   | Secure Conductor Onboarding added. |

Secure Conductor Onboarding (SCO) provides the ability to onboard a router to a conductor ensuring that each device proves possession of a private key, and that the connection is trusted and authenticated. SCO employs asymmetric cryptography (RSA key pairs) to perform digital signatures and verification. The secure conductor onboarding process leverages the physical or virtual TPM module for mutual authentication. 

When a router has SCO enabled, asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor, so any devices not using this feature will fail to onboard to the conductor. In addition, if an SCO enabled device attempts to onboard using the legacy method, the onboarding is rejected.

### Prerequisites

- The `secure-conductor-onboarding` must be enabled
- The `secure-conductor-onboarding public-certificate` field must be configured
- The `secure-conductor-onboarding ca-certificate` field must be configured
- The conductor nodes must have asset-id's configured

To provide a secure and mutually authenticated onboarding mechanism, the following information must be configured.

- Pre-shared key: The onboarding pre-shared key is a 48-character alphanumeric string, configured at the router level. This key is mandatory for the SCO process.
- Conductor identity certificate: A CA-signed leaf certificate, its supporting intermediate certificates, and the matching private key.
- Conductor CA certificate: The CA certificate selected as the trust anchor for validating the conductor's identity chain.

The public certificate and CA certificate are configured on the conductor at the Authority level.

Secure Conductor Onboarding requires the use of an IP SAN (subject alternative name) for routers to securely identify the conductor's identity. This requires that the certificate issued by the CA includes the IP SAN for the conductor, allowing the router to validate the connection to the conductor and securely onboard. 

The IP SAN should be incuded under the `authority -> conductor-address` list, which specifies addresses routers should use to reach the conductor.

For an HA conductor, each node must have an separate IP SAN entry.

For additional information about certificates, see [Certificate Requirements and Validation](cert_validation_requirements.md). For details on the IP SAN naming and configuration, see [Issue a `certificate-signing-request`](config_custom_certs.md#issue-a-certificate-signing-request).

## Trust Anchor and Identity Certificate Chain

SCO uses two separate certificate inputs configured at the authority level:

| Input | Configuration | Purpose |
| --- | --- | --- |
| Trust anchor | `trusted-ca-certificate`, referenced by `secure-conductor-onboarding ca-certificate` | Supplies the CA certificate embedded in the SCO onboarding token. |
| Conductor identity chain | `client-certificate`, referenced by `secure-conductor-onboarding public-certificate` | Supplies the conductor's leaf certificate and any intermediate CA certificates needed to build a path to the trust anchor. |

The conductor generates the onboarding token using the configured trust anchor. In the Mist Conductor Redirect workflow, Mist delivers the token and conductor address information to the router before the router connects to the conductor. Mist transports the trust anchor; it does not select or generate it. Alternatively, the token can be supplied through the router's onboarding configuration.

The router uses the CA certificate from the token to validate the conductor's TLS identity chain. Trust is therefore provisioned independently of the conductor's TLS connection. Including a root CA certificate in the conductor's identity file does not make that root trusted.

### Certificate Placement and Ordering

Place the conductor's leaf certificate first in the identity PEM file, followed by its issuing intermediate CA, then each successive issuing intermediate:

```text
Leaf -> issuing intermediate -> next issuing intermediate -> ...
```

Stop before the configured trust anchor and omit the anchor itself from the identity file. The anchor need not be a root CA; it can be an explicitly trusted intermediate CA. An intermediate supplied with the identity chain is not independently trusted as an anchor: its signature and constraints must be validated as part of a path to the provisioned anchor.

For a root CA -> intermediate CA -> conductor leaf hierarchy, use:

| Configuration object | File | Contents |
| --- | --- | --- |
| `trusted-ca-certificate sco-root` | `sco-root.pem` | Root CA only |
| `client-certificate sco-conductor` | `sco-conductor.pem` | Conductor leaf -> intermediate CA |

If the root issued the conductor's leaf directly, the identity file contains only the leaf. If an intermediate is the configured trust anchor, omit that intermediate and any certificates above it from the identity file.

:::note
SCO requires file references for both certificate objects. Currently, SCO embeds only the first certificate from the referenced CA file in the onboarding token. Use a single intended trust-anchor certificate in that file; do not assume that a multi-certificate CA bundle provisions multiple trust anchors.
:::

### Certificate Ordering and Validation

Configuration-time certificate-property validation treats the first identity-file certificate as the leaf and the remaining certificates as CAs. It does not reorder the certificates, combine the identity file with the trust-anchor file, or verify a signature path between them.

| Identity-file contents | Property-check result | Guidance when the root is the separately provisioned anchor |
| --- | --- | --- |
| Leaf -> intermediate | Can pass | Recommended identity-chain layout. |
| Leaf -> root -> intermediate | Can pass | Not the recommended layout; passing does not prove a valid or trusted chain. |
| Leaf -> intermediate -> root | Can pass | Omit the root from the identity file. |
| Root -> intermediate -> leaf | Fails leaf checks | The first certificate must be the conductor leaf. |

Passing these checks does not prove successful SCO authentication. During TLS establishment, the router validates the conductor's presented chain against the trust anchor provisioned through the onboarding token and verifies the conductor's IP identity. See [Certificate Requirements and Validation](cert_validation_requirements.md#config-time-vs-runtime-validation).

## Basic Configuration 

The following information are the steps to configure and use Secure Conductor Onboarding. For details about any of the commands and steps, see [How It Works](#how-it-works)

- Configure the Conductor where the router will onboard.
    - Configure the conductor to accept the router.
- Provision the conductor's signed identity chain, matching private key, and trust-anchor certificate using the [certificate management APIs](config_custom_certs.md#authenticate-to-use-rest). For the root-anchor example above, the files under `/etc/128technology/pki/` are:

    | File | Contents |
    | --- | --- |
    | `sco-conductor.pem` | Conductor leaf followed by intermediate CA certificates in issuer order, excluding the trust anchor. |
    | `sco-conductor.key` | Private key matching the conductor leaf certificate. |
    | `sco-root.pem` | Root trust-anchor certificate only. |

    The CA's private key is not required on the conductor and must not be copied there for SCO.
:::note
Only RSA keys are supported at this time. 
::: 

- Configure the file references and associate them with SCO. A file reference does not upload, create, or concatenate certificate files; the files must be provisioned separately.
    ```
    configure authority client-certificate sco-conductor file sco-conductor
    configure authority trusted-ca-certificate sco-root file sco-root
    configure authority secure-conductor-onboarding public-certificate sco-conductor
    configure authority secure-conductor-onboarding ca-certificate sco-root
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
Enabling SCO does not immediately close ports 4505 and 4506. The ports close automatically only after you manually restart the SSR software on the conductor. This is a restart of the `128T` service (`systemctl restart 128T`) — a full operating-system reboot is not required. On a high-availability (HA) conductor, restart the `128T` service on both conductor nodes; see [High-Availability Conductor Workflow](#high-availability-conductor-workflow) for the recommended order.
:::

- Create the SCO token on the conductor. 
    ```
    create secure-conductor-onboarding token router-name <router> [expiration-timeout <1d>] 
    ```

- Enter the token and other onboarding details using CLI commands, or in the Onboarding interface. 

    After the user generates an onboarding token, enter the token and other onboarding details in the onboarding UI or using CLI commands. There are two methods to onboard a router:

    - Using the Command line: `create secure-conductor-onboarding token` command and `onboarding-config.json`.
    - Mist Conductor Redirect: In the Mist interface, token information is entered with the conductor IP address. This information is sent to the router once SZTP has been completed and then passed to the router client to perform secure conductor onboarding.

Before establishing the TLS connection to the conductor, the router loads the CA certificate from the onboarding token into its SCO TLS trust pool. The conductor's presented identity chain is validated against that anchor.

### Onboarding Workflow

Once the Secure Conductor Onboarding workflow is initiated, the router performs the following:

1. Establish a TLS connection to the conductor on port 933.
2. Perform mutual authentication over TLS socket to ensure the client and server can trust one another.
3. Once the connection is validated by both parties, the persistent SSH keys for establishing SSH tunnels between router and conductor are exchanged.
4. The router connects to the conductor over port 930 using the SSH keys exchanged in previous steps.
5. The router is prepped and initialized by the conductor. During this process, the system goes through the reboot cycle.

Once the secure SSH tunnels are established, the SCO workflow concludes. All future communication between the router and conductor will occur over port 930.

### Re-Onboarding Workflow

Secure Cloud Onboarding (SCO) re-onboarding may be necessary when a router is factory reset and fails to re-onboard because the conductor identifies it as **already onboarded**. This may also occur in scenarios involving transitions from non-SCO to SCO environments.

1. Rename the asset ID.

`config authority router <router> node <node> asset-id <asset-id>-temp`

The conductor processes the removal of the original asset ID and cleans up the associated content. The asset is then removed from the `show assets` list. 

2. Check the show assets command ouptut to verify the original ID is no longer present.

```
admin@node0.Conductor# show assets Spoke1Node0
Mon 2026-08-10 18:29:01 UTC
✔ Retrieving assets...
====================================================
 Spoke1Node0
====================================================
  Router:                       Spoke1
  Node:                         node0
  Current Version:              7.1.6-7.sts.el9
  Platform:                     OpenStack Nova
  Install Type:                 Image
  Status:                       Synchronized
  Conductor Connectivity:       Connected
  Peer Conductor Connectivity:  Connected
  Service Status:               Running
  First Connection Date:        2026-08-03 19:03:19
  Time in Status:               2h 34m 41s
Completed in 0.14 seconds
admin@node0.Conductor# show assets Spoke1Node0
Mon 2026-08-10 18:29:06 UTC
✖ Retrieving assets...
% Error: Failed to retrieve assets: Asset id 'Spoke1Node0' does not exist

```

3. Ensure all authorized keys are removed for the original asset ID.

`delete system connectivity authorized-keys entry comment <asset-id> node all`

This operation may indicate keys were removed.

```
admin@node0.Conductor# delete system connectivity authorized-keys entry comment Spoke1Node0 node all
✔ Updating SSH Configuration...
Deleted 2 entries on node0.Conductor
```

Alternatively, the keys may have been missing or removed by the temporary asset rename. It is **not an issue** if no entries are removed.

```
admin@node0.Conductor# delete system connectivity authorized-keys entry comment Spoke1Node0 node all
✔ Updating SSH Configuration...
Deleted 0 entries on node0.Conductor
```

4. Restore the original asset ID.

    `config authority router <router> node <node> asset-id <asset-id>`

    The conductor is ready for the device to re-onboard. Verify this using `show secure-conductor-onboarding <asset-id>`

```
admin@node0.Conductor# show secure-conductor-onboarding <asset-id>
Mon 2026-08-10 18:43:30 UTC
✔ Retrieving Secure Conductor Onboarding state...
======================================
 Secure Conductor Onboarding Detail
======================================
 Asset Id:                <asset-id>
 Auth State:              waiting
 Last Problem:
 Last Attempt Time:       —
 Number of Attempts:      0
 Mode:                    weak/strong
Completed in 0.01 seconds
```

### Verifying Onboarding Status In The Conductor UI

After SCO is enabled, the conductor GUI **Routers** page displays a **Secure Conductor Onboarding** panel for each node, replacing the legacy asset-id onboarding view. Use this panel to monitor the SCO handshake as it progresses.

<!-- ![Conductor Routers page showing a Secure Conductor Onboarding panel for each node, with Asset ID, Auth State, Last Updated, Attempts, Last Problem, and Mode fields](/img/sec-conductor-onboarding-router-view.png) -->

Each panel reports the following fields:

| Field        | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Asset ID     | The asset-id of the node being onboarded.                                                                      |
| Auth State   | The current state of the authentication handshake, such as `waiting` while the router has not yet connected.   |
| Last Updated | The time the onboarding status was last updated.                                                               |
| Attempts     | The number of onboarding attempts made by the node.                                                            |
| Last Problem | The most recent error encountered during onboarding, if any.                                                  |
| Mode         | The configured SCO mode for the node (`weak` or `strong`).                                                     |

When onboarding completes successfully, the **Auth State** transitions away from `waiting` and the node connects to the conductor over port 930.

### High-Availability Conductor Workflow

When onboarding a router to a high-availability (HA) conductor pair, the following additional considerations apply:

- Enable SCO on both conductor nodes. After enabling SCO, restart the `128T` service (`systemctl restart 128T`) on each node so that ports 4505 and 4506 close. Restart one node at a time to keep the conductor available: restart the primary node first, wait until it is fully operational, then restart the secondary node.
- During initialization, the router establishes the TLS connection on port 933 (see [Onboarding Workflow](#onboarding-workflow)). The conductor interface that the router targets during initialization is the interface that listens on port 933. Ensure this interface is reachable from the router and that port 933 is permitted through any intervening firewall.

### Known Caveats 

- Once SCO is enabled on the HA conductor, both conductor nodes must be restarted. See [High-Availability Conductor Workflow](#high-availability-conductor-workflow).

- Only RSA key-based certificates are supported on the conductor at this time. 

## How It Works

The following sections provide details about the commands and parameters used for Secure Conductor Onboarding. 

### Router Level Configuration Parameters

The following parameters are required, and are configured at the Router level.

`configure authority router system secure-conductor-onboarding mode`

- `disabled`: Default is true, must be false to enable.
- `weak`: This setting enables SCO but allows the router to use a self-signed certificate, and can be used on devices with no TPM. Generates a self signed certificate per authentication attempt for non-TPM devices. For TPM devices, the certificate from the TPM is used. The conductor does not verify that these certificates are signed by a CA.
- `strong`: On SSR devices manufactured with a device ID (SSR400/SSR440), `strong` mode ensures that the asset-id matches the serial number field in the subject line of the router’s public certificate. For vTPM workflows, the router’s endorsement key must match the `endorsement-key` configuration. 

### Conductor Configuration

To enable this feature on the conductor, verify the following:

- The `secure-conductor-onboarding public-certificate` field must reference the file-backed `client-certificate` containing the conductor's identity chain.
- The `secure-conductor-onboarding ca-certificate` field must be configured.

When all routers have SCO enabled, the legacy asset-id based onboarding is disabled. Ports 4505 and 4506 are disabled on the conductor to prevent any devices not using this feature from onboarding. In addition, if a SCO enabled device attempts to onboard using the legacy method, the attempt will be rejected.

To provide secure and mutually authenticated onboarding, the following additional information is required.

- Pre-shared key
- Conductor Public certificate
- Conductor CA certificate

The onboarding pre-shared key will be 48-character alphanumeric string configured at the router level. This key is mandatory for SCO process to work successfully.
The conductor must have a CA-signed leaf certificate, any supporting intermediate certificates, and the matching private key. Configure the identity chain and trust anchor separately as described in [Trust Anchor and Identity Certificate Chain](#trust-anchor-and-identity-certificate-chain).

## Token Creation

Create a router level token:

`create secure-conductor-onboarding token router <router> [expiration-timeout <1d>]`

`expiration-timeout` is optionaL. Default is 1 day. 1 year (1y) is the maximum value.

Token creation requires the following:

- The fields `secure-conductor-onboarding ca-certificate` and `secure-conductor-onboarding public-certificate` must reference the provisioned trust anchor and conductor identity chain, respectively. The conductor's identity chain must validate to that anchor, which may itself be a self-signed root CA. Successful token creation does not establish that the identity chain validates to the anchor; this is checked during the router's TLS connection.

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

The `secure-conductor-onboarding ca-certificate` field references a `trusted-ca-certificate` object. SCO reads the CA certificate from that object's file reference and embeds the first certificate in the onboarding token.

### Token Contents

The next step in the process is to generate an onboarding token from the conductor Web interface, command line, or using APIs. The generated tokens are signed by the conductor’s private key so that they cannot be altered once generated. The SSR supports Router-specific tokens. These are mutually exclusive and are defined in the configuration.

### Router-Specific Tokens

For better control over distribution and reuse of tokens the user can request unique tokens per router. In this mode it is required that an `asset-id` be assigned to each node within the router before generating a token. 

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
