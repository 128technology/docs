---
title: Initialize Your Device - Advanced Workflows
sidebar_label: Initialize Your Device - Advanced Workflows
---

While the Web Interface is the recommended method of initializing and onboarding your SSR device, there are additional methods to complete the process.

- PCLI Workflow
- USB
- File on Disk
- API Initialization


## PCLI Workflow

### Conductor

The `initialize-conductor` command allows the user to overwrite the defaults provided in the Web workflow and allows for further customization of conductors.

`initialize conductor <options>`

Allowed Options:

| name | description |
| ---- | ----------- |
| `artifactory-password` | Password portion of the artifactory credentials |
| `artifactory-user` | User portion of the artifactory credentials |
| `clustered` | Whether or not this conductor is to be configured as an HA pair |
| `dns-servers` | comma separated list of DNS servers |
| `ha-interface-name` | Interface name (matching a port in the device-map) to bind the ha-ip to. |
| `ha-ip` | The IPv4 address to assign to the HA interface on this node |
| `ha-peer-ip` | The IPv4 address of the node to be used as an HA peer |
| `ha-peer-name` | The name of the Node to be used as an HA peer |
| `ha-peer-username` | The user on the peer node to authenticate as. This user must have sudo privileges. Required if &#x27;learn-from-ha-peer&#x27; is true. |
| `interface-name` | Interface name (matching a port in the device-map) to bind the node-ip and node-gateway to. |
| `learn-from-ha-peer` | If true, the Initializer will use the HA peer to obtain setup information. |
| `node-gateway` | The IP address of the gateway of the node being provisioned |
| `node-ip` | The IPv4 address of the node being provisioned (x.x.x.x/y) |
| `node-name` | The name of the node being provisioned |
| `router-name` | Assign a name to the router |
| `unsafe-ha-peer-password` | The password for the user on the peer node to authenticate as. WARNING: If this field is used, the preferences file should not be world-readable to avoid leaking the peer node password. Required if `learn-from-ha-peer` is true. |

For more information on the available options and parameters, refer to the [`initialize conductor`](cli_reference.md#initialize-conductor) command.

### Conductor-Managed Router

The following PCLI command can be used to onboard a router to a conductor as conductor managed.

`initialize conductor-managed router-name <rtr-name> conductor-ip <ip-address>`

For additional information, refer to the [initialize conductor-managed](cli_reference.md#initialize-conductor-managed) command.

### Mist-Managed Router

The following PCLI command will onboard a router to the Mist inventory.

`adopt router-name <router-name> registration-code <reg-code>`

## Automated Onboarding

Automated onboarding can be used whenever the user wants to automatically set up a device during first boot, and does not require manual input. All the onboarding configurations must be known prior to starting the process. These methods must also be used if the user wants to provide a customized devicemap.

### Onboarding Config

The brains behind the automated onboarding process is a json file named `onboarding-config.json`. This file contains all the configuration parameters and drives the entire onboarding process. The `onboarding-config.json` can be provided from a USB, as a file placed on the SSR disk, or applied via API initialization. For virtual and cloud based deployments, the same mechanism is supported via cloud-init as well.

### Conductor Onboarding Configuration

The following JSON is an example of a valid conductor `onboarding-config.json`. 

```
{
"name": "MyConductor",
"mode": "conductor",
"artifactory-user": "username",
"artifactory-password": "password",
"node-name": "node0",
"node-ip": "10.73.1.10/24",
"node-gateway": "10.73.1.11",
"interface-name": "ge-0-0",
"dns-servers": [
	"8.8.8.8",
	"1.1.1.1"
	]
}
```

#### Onboarding Config - Conductor-Managed Router

The following is an example onboarding config that can be used to onboard a conductor-managed router via API initialization or a file placed on disk. 
```
{ 
“mode”: “conductor-managed”, 
“conductor-hosts”: [“1.2.3.4”] 
} 
```

#### Onboarding Config - Mist-Managed Router

The following is an example onboarding config that can be used to onboard a Mist-managed router via API initialization or a file placed on disk.
```
{
“mode”: “mist-managed”,
“name”: “mist-router”,
“registration-code”: "<mist-reg-code>”
}
```

:::note
If no onboarding configuration file is provided, it is assumed that the device is an unmanaged router, and an onboarding configuration will be provided later.
:::

### USB Config

When the device boots for the first time it looks for a connected USB device named **BOOTSTRAP**. On this device, you can provide an onboarding config, devicemap, and/or pre-post boot scriptlets in the root directory. These files must be called:

- onboarding-config.json
- devicemap.json
- pre-scriptlet
- post-scriptlet

### File on Disk

If no onboarding config was found on a USB device, the initialization process looks for a config file placed on the device; this is a common workflow for virtual devices. You can also provide a customized devicemap in the onboarding config at this time. This configuration file is located at:

`/etc/128T-hardware-bootstrapper/onboarding-config.json`

If you wish to not onboard the device and only supply a devicemap, the device is onboarded as an unmanaged router. The current default devicemaps along with examples of the devicemap format can be found in the public SSR GitHub repository.

### API Initialization

If an `onboarding-config.json` was not provided during the initial bootstrapping of the device, the you can choose to initialize the device by supplying an onboarding config path directly from the API. The POST endpoint is `/api/bootstrap/onboarding` with a json body containing the contents of the onboarding-config file. To apply an onboarding configuration, place the contents of the desired onboarding config file in `onboarding-cfg.json` and run the following command. Alternatively, you can include the JSON contents directly in the curl request.

```
curl -X POST -H "Content-Type: application/json" -d @onboard-cfg.json http://localhost:31517/api/bootstrap/onboarding
```






