---
title: Kernel Network Namespace Scripts
sidebar_label: KNI Namespace Scripts
---

As part of plugin development to extend the functionality of a 128T router, a very common model is to leverage [KNI (Kernel Network Interface)](concepts_kni) along with Linux network namespaces. They allow for isolation of various networking components such as interfaces, routing table, iptables, etc., while running applications that leverage these networking namespaces. This is also very common method to deploy [Service Function Chaining](plugin_intro#service-function-chaining) within the product.

The goal of this package is to provide a set of scripts which do most of the tasks when it comes to setting up the namespaces and associated environment.

## Scripts
The following scripts are part of the package and have a well-defined role as described [here](concepts_kni#script-types).

### startup
This script is invoked at the beginning of the KNI creation and is intended to do clean-up. In the current implementation this script will stop the configured [application](#application-definition) (if any).

### init
The [init script](concepts_kni#init) is responsible for the majority of the setup. The script performs the following high-level function:

- Create the configured network-namespace in Linux as per 128T requirements.
- Move and setup any configured target-interface into the namespace
- Tune common parameters within the namespace such as ip-forwarding, arp-proxy, etc.
- Start any configured application(s) within the namespace
- Setup routes and iptable rules

### reinit
The [reinit](concepts_kni#reinit) script is called when the interface is deemed to be down for more than 10 seconds. For the sake of this implementation we simply symlink the `reinit` to `init` script

### shutdown
The [shutdown](concepts_kni#shutdown) script is called during 128T shutdown or deletion of the interface. This script will stop the configured [application](#application-definition) (if any) and delete the network namespace

### Installation
The `t128-kni-namespace-scripts` package contains all the scripts mentioned [above](#scripts). Upon installation, the scripts in this package are placed under `/etc/128technology/plugins/network-scripts/default/kni_namespace/` with the right set of permissions and settings required for operation by 128T router.


### Symlink To KNI scripts ##
The package only contains a subset of the scripts provided by the [network-script design](concepts_kni#script-types). There are other scripts such as state, info, monitoring, etc., which are not covered in this package. As a result, the best practice is to symlink the host KNI scripts to the pre-packaged scripts listed [above](#scripts).

For example, for a configuration with a `host` kni called `test-sfc` the scripts above would be used as follows:

```console
# ll /etc/128technology/plugins/network-scripts/host/test-sfc/
total 0
lrwxrwxrwx 1 root root 69 Jan 21 04:09 init -> /etc/128technology/plugins/network-scripts/default/kni_namespace/init
lrwxrwxrwx 1 root root 71 Jan 21 04:09 reinit -> /etc/128technology/plugins/network-scripts/default/kni_namespace/reinit
lrwxrwxrwx 1 root root 73 Jan 21 04:09 shutdown -> /etc/128technology/plugins/network-scripts/default/kni_namespace/shutdown
lrwxrwxrwx 1 root root 72 Jan 21 04:09 startup -> /etc/128technology/plugins/network-scripts/default/kni_namespace/startup
```

## Configuration
A YAML based configuration is used to control various aspects of the KNIs and namespaces that are driven through this scripts. The configuration file is optional and the scripts will still perform the basic tasks as described [above](#scripts). The scripts looks for a file called `<kni-name>.conf` under `/var/lib/128technology/kni/host/`.

```yaml
target-interface:
    name: "eth0"
    ip-address: "10.10.20.10"
    prefix-length: 24
    gateway: "10.10.20.11"
    default-route: True
application:
    startup:
        - "ifup test-tun0"
    shutdown:
        - "ifdown test-tun0"
routing:
    - "default dev test-tun0"
route-tables:
    default:
        routes:
            - "default dev test-tun0"
    gre:
        table-id: 1024
        ingress-interface: t0
        routes:
        - "default dev kni345"
```

The above example shows all the possible configuration. All of these configuration are optional and reasonable defaults are assumed. Each of the sections below discuss the options in more details.

### Variable Substitution
The configuration supports basic variable substitutions which directly map to the [arguments passed to the network-scripts](concepts_kni#script-command-line-arguments) by 128T router. The following keywords can be used in the config and will be substituted with the correct arguments at runtime.

Consider the following configuration
```config
device-interface
    name test
    type host
    network-namespace test-ns
    network-interface
        name test-intf
        global-id  5
        address
            ip-address 169.254.140.1
            prefix-length 30
            gateway 169.254.140.2
```

|Variable|Meaning|Config Example|
|-------|--------|--------|
|`{kni_interface}`|Name of the KNI interface|`test`|
|`{namespace}`|Name of the namespace the KNI belongs to (including the namespace-id)|`testns:1073741829`|
|`{kni_ip}`|Configured IP address for the KNI interface (corresponds to `address > gateway` |`169.254.140.2`|
|`{kni_prefix_length}`|Configured prefix-length for the KNI interface (corresponds to `address > prefix-length` |30|
|`{kni_gateway}`|Configured gateway address for the KNI interface (corresponds to `address > ip-address` |`169.254.140.1`|


The following YAML configurations
```yaml
routing:
    - "default dev {kni_interface} via {kni_gateway}"
```

will therefore be converted to the following at runtime:
```yaml
routing:
    - "default dev test via 169.254.140.1"
```

### Target Definition
This configuration allows for another interface to be configured as part of the namespace. This is usually an interface in Linux which is used for forwarding the traffic through to an endpoint. Only a `single` target interface can be configured and it's optional. The following snippet shows an example of setting parameters for the `target-interface`.

```yaml
target-interface:
    name: "eth0"
    ip-address: "10.10.20.10"
    prefix-length: 24
    gateway: "10.10.20.11"
    default-route: True
```

The `default-route` flag is used to set the target-interface as a `default` route with zero metric in the namespace making it the preferred choice for routing all traffic.

### Application Definition
Any [SFC application](plugin_intro#service-function-chaining) will require some applications to run within the namespace to consume the KNI and other network resources. This configuration provides a list of commands to be run within the namespace.

:::note
The scripts will automatically append `ip netns exec` for every configured command.
:::

This configuration is optional. Consider this example:
```
application:
    startup:
        - "ifup test-tun0"
    shutdown:
        - "ifdown test-tun0"
```

In this case, the user can configure the logic to start and stop applications as needed.

### Routing Definition
It's useful to be able to influence the basic routing rules within the namespace. The `routing` config in its simplest form can be used to add routes to the default routing table. For most applications this is sufficient and acts as a way to create quick configuration of routes. For example

```
routing:
    - "192.168.0.0/16 via 169.254.140.1 dev test"
```

The above example, will create a single route table entry for the prefix `192.168.0.0/16`.

:::note
If a target interface is configured as default-route and no routing rules are specified, a default route for the target will be added.
:::

:::note
The `routing definition` section will override any other routes specified elsewhere in the config
:::

For a more advanced use case, such as tunneling or NAT, a single routing table is not enough. For such applications, a `route-tables` definition can be used. The `route-tables` allow the user to do the following:
* Create a new routing table in the namespace
* Specify the conditions under which to use this routing table
* Create rules to be used for this new table.

```yaml
route-tables:
    default:
        routes:
            - "default dev test-tun0"
    gre:
        table-id: 1024
        ingress-interface: t0
        routes:
        - "default dev kni345"

```

The `default` keyword is used to create route entries for the default route table in Linux. In the above example, the second entry for `gre` table will create a new table with the identifier `1024`. For each route-table, the user can configure the conditions and parameters for which the table can be used. These parameters translate to the options for the `ip rules add` command. The currently supported parameters include
* ingress-interface (iif)
* egress-interface (off)
* from-prefix (from)
* to-prefix (to)

:::note 
The rules defined under `routing` will be applied before any `route-tables`. Since the `route-tables` supersede the functionality of `routing` it is not recommended to use both in the same config.
:::

## Usage ##
In order to leverage these scripts, the user has to do at most two things:
- [Symlink to the kni scripts](#symlink-to-kni-scripts)
- [Configure various aspects of the pre-packaged scripts](#configuration)
