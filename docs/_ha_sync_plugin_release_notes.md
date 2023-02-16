<!--- HA Sync Plugin Release Notes--->
:::warning
The plugin must be updated to version 1.1.0 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-config-generation-changes)
:::

### Release 1.1.2

#### Issues Fixed

- **PLUGIN-1580**  Communication through HA sync interface was broken after one HA node was rebooted

  _**Resolution:**_ Set a priority on the teams interface so each node prefers the same interface as active

### Release 1.1.0

#### Issues Fixed

- **PLUGIN-1451**  Config generation for the plugin failing

  _**Resolution:**_ Correctly handle the config generation for routers where the plugin is not enabled during config generation
