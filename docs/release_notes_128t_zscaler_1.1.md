---
title: '128T ZScaler Plugin 1.1 Release Notes'
sidebar_label: '1.1'
---
## Special Considerations
After upgrading to this version, a 128T service restart will be needed on the conductor. Note: If this is an HA conductor, restart the backup (non-primary) conductor node first, wait until all processes are running and then restart the primary conductor node. `systemctl restart 128T`

## Release 1.1.2

### Issues Fixed

- **PLUGIN-135** Resolved incompatible inclusion of dependent package version which would result in asset failures with the message: `Plugins highstate: ["No matching sls found for '_states' in env 'plugins'"]`.

