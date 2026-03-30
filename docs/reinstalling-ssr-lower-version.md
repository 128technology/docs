---
title: Reinstalling SSR to a Lower Version
sidebar_label: Reinstall SSR to Lower Version
---

## Reinstall path when an SSR is pre-staged to a higher version

If a router is staged with an SSR software version that is higher than the version your network has qualified, always use the reinstallation workflow rather than a downgrade operation. This keeps the version transition explicit and minimizes the risk of inconsistent package dependencies, plugin compatibility issues, and unsupported rollback behavior.

1. Confirm the current installed version and available target versions:

   - `show system software available skip-version-check router <router>`
   - `show system software available skip-version-check node <node>`

2. In the conductor GUI, enable "Reinstallation" (checkbox) and select the desired qualified version (same or lower than current).

3. In PCLI, request reinstallation explicitly:

   - `request system software reinstall router <router> version <desired-version>`
   - `request system software reinstall node <node> version <desired-version>`

   If the desired version is not listed in the default command output, include `skip-version-check`:

   - `request system software reinstall router <router> version <desired-version> skip-version-check`

4. Verify progress and completion:

   - `show system software revert` (for rollback status)
   - `show system software available` (for queued software state)
   - `show assets` to check Install Type and Status

5. After successful reinstallation, verify the router is running desired version:

   - `show system software` (should show the target version)
   - `show assets` (Install Type: Image; Status: Synchronized)

:::important
Do not attempt to use `request system software downgrade` as the primary mechanism for this scenario. `reinstall` is the supported, predictable process when the staged version is newer than the desired deployment version.
:::

## Reinstallation from Mist

In the Mist interface you have the option of selecting any available software version from the repository. Selecting the same or lower version of firmware than is currently installed initiates an SSR firmware reinstall to the requested version. An informational message is displayed, explaining limitations of reinstall.

## Conductor-initiated Reinstallation

### Web Interface

The Conductor web interface displays a checkbox to allow reinstallation. When selected, the UI displays **all** versions in the selection dropdown. If you select a version less than or equal to the router’s current version, the reinstallation is initiated and proceeds in the same manner as an upgrade.

### PCLI

Use the `request system software reinstall` command to identify the image-based target version of firmware to be installed. To display all software versions available for reinstallation, use the `skip-version-check` flag with `show system software available`.

The reinstallation status is visible under **Install Type** in the PCLI using `show assets`.

### Limitations

- Configuration that enables features not present in the target SSR version will no longer apply after a reinstall.
- System state and configuration outside of the datamodel (for example; analytics, logs, custom salt states, user-installed packages) will not be preserved after a reinstall, except for those required for basic system functionality and cloud connectivity.
- SSR plugins may be downgraded (but not removed) as part of a reinstall, if the currently installed plugins are not compatible with the target SSR version.
