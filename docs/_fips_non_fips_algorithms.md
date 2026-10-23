<!---FIPS default behavior in 7.0 / 7.1 and the impact on non-FIPS algorithms--->

:::important
The SSR4x0 series devices have **FIPS mode enabled by default**. On these devices, FIPS enforcement prevents the use of non-FIPS-compliant cryptographic algorithms such as **MD5** and **SHA-1**. This affects features that rely on these algorithms, including:

- BGP MD5 neighbor authentication (`auth-password`).
- MSDP peer/mesh-group authentication (`auth-password`).
- OSPF MD5 message-digest authentication.
- NTP client authentication using `md5`.
- RADIUS, which uses MD5 internally to protect attributes and the shared secret.
- Any other feature that negotiates or stores a hash using MD5 or SHA-1.

If you need to use one of these features on an SSR4x0 series device, FIPS mode must be disabled on the affected node **before** the feature is configured. See [Disable FIPS Mode](#disable-fips-mode-to-use-non-fips-algorithms) below.

With the release of software version 7.2.x, FIPS is **compliance-by-configuration** and no longer blocks these algorithms. **However, the use of MD5 is strictly prohibited for secure hashing and cryptographic authentication by FIPS 140** because MD5 is vulnerable to collision attacks and considered legacy from a compliance standpoint. The use of these legacy BGP and MSDP protocols with TCP MD5 authentication enabled is outside of the SSR cryptographic module boundary, and is not covered by the FIPS power-on self-tests. Operators who require strict FIPS compliance must avoid configuring non-FIPS algorithms.
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

**To re-enable FIPS later, repeat the procedure substituting `--set-fips 1` and reboot.**

:::caution
Disabling FIPS mode takes the node out of any FIPS- or Common Criteria-compliant posture. Do not disable FIPS on nodes that must remain compliant for regulatory reasons.
:::
