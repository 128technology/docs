<!--- HA Sync Plugin Release Notes--->
:::warning
The plugin must be updated to version 1.1.0 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-configuration-generation-changes)
:::

### Release 2.1.1

**Release Date:** Apr 30, 2025

#### Issues Fixed

- **PLUGIN-2939** Handle User configured host address for fabric-network more gracefully
- **PLUGIN-2959** Resolve copying unncessary files on image-based upgrade

### Release 2.1.0

**Release Date:** Jan 8, 2025

#### New Features and Improvements
- **PLUGIN-2626** Support configuring MTU, DSCP Map, and Transmit Cap options which will be applied to the auto-generted HA fabric interface.

#### Issues Fixed
- **PLUGIN-2721** Resolve plugin downgrade config removal

### Release 2.0.0

Image based install and upgrade (IBU) support for SSR 6.3.0.

**Release Date:** Sep 30, 2024

### Release 1.1.3

#### Issues Fixed

- **PLUGIN-2233**  VLAN ID cannot be modified

  _**Resolution:**_ Add new configuration field to modify the default VLAN ID used for the interface

### Release 1.1.2

#### Issues Fixed

- **PLUGIN-1580**  Communication through HA sync interface was broken after one HA node was rebooted

  _**Resolution:**_ Set a priority on the teams interface so each node prefers the same interface as active

### Release 1.1.0

#### Issues Fixed

- **PLUGIN-1451**  Config generation for the plugin failing

  _**Resolution:**_ Correctly handle the config generation for routers where the plugin is not enabled during config generation
