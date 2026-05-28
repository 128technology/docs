<!---FIPS default behavior in 7.0 / 7.1 and the impact on non-FIPS algorithms--->

:::important
Beginning with SSR software **version 7.0** (including **7.1**), the SSR installs with **FIPS mode enabled by default**. In these releases, FIPS enforcement prevents the use of non-FIPS-compliant cryptographic algorithms such as **MD5** and **SHA-1**. This affects features that rely on these algorithms, including:

- BGP MD5 neighbor authentication (`auth-password`).
- MSDP peer/mesh-group authentication (`auth-password`).
- OSPF MD5 message-digest authentication.
- NTP client authentication using `md5`.
- RADIUS, which uses MD5 internally to protect attributes and the shared secret.
- Any other feature that negotiates or stores a hash using MD5 or SHA-1.

If you need to use one of these features on a 7.0 or 7.1 system, FIPS mode must be disabled on the affected node **before** the feature is configured. See [Disable FIPS Mode](#disable-fips-mode-to-use-non-fips-algorithms) below.

In future SSR releases, FIPS will continue to be enabled by default, but it will no longer prevent the configuration of non-FIPS algorithms. FIPS compliance will become *compliance by configuration* — operators who require strict FIPS compliance must avoid configuring non-FIPS algorithms, but the software will not block them.
:::

### Disable FIPS Mode To Use Non-FIPS Algorithms

Disabling FIPS mode is a node-local operation and requires a reboot. Perform the following on each SSR node (conductor or router) where a non-FIPS algorithm is required.

1. Open a Linux shell on the SSR as the `root` user.

2. Run the unpacker helper to clear the FIPS flag:

  ```bash
  /usr/libexec/unpacker.sh --set-fips 0
  ```

  Expected output:

  ```text
  Setting FIPS mode to 0
  ```

3. Reboot the node:

  ```bash
  reboot
  ```

4. After the node comes back up, verify that FIPS enforcement is disabled in the kernel:

  ```bash
  cat /proc/sys/crypto/fips_enabled
  ```

  The expected result is `0`.

To re-enable FIPS later, repeat the procedure substituting `--set-fips 1` and reboot.

:::caution
Disabling FIPS mode takes the node out of any FIPS- or Common Criteria-compliant posture. Do not disable FIPS on nodes that must remain compliant for regulatory reasons.
:::
