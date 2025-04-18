---
title: Introduction to Plugins
sidebar_label: Introduction
---

SSR plugins are software components that enhance the functionality and user experience of the Session Smart Routing (SSR) platform by leveraging the extensible nature of the conductor and router. Plugins can provide a robust delivery mechanism for a variety of use cases. The behavior of each plugin is specific to the use case but follow a general pattern

* Add plugin specific configuration to the conductor GUI and PCLI
* Manage and install software on the router
* Leverage extensible functions on the router


## Plugin Workflow
Plugins enable a variety of use cases to be implemented to enhance the SSR experience. These plugins can range from something as simple as managing system settings on the router like the `128T-journal` plugin for managing systemd journal size to something more advanced such as [`128T-ipsec-client`](plugin_ipsec_client.md) which allows for the creation and management of IPSec client tunnels on the SSR. Regardless of the usage and the complexity of the plugin they follow a general workflow.

### Installation and management
The conductor GUI provides a dashboard to view and manage all available plugins.

![SSR Plugin Dasboard](/img/plugins_dashboard.png)

The dashboard above shows the available and installed plugins. The [`128T-dns-cache`](plugin_dns_cache.md) plugin in the dashboard above is available and ready to be installed on the conductor. The [`128T-gre`](plugin_gre.md) plugin shows a green icon meaning it has been installed and ready to be configured. The [`128T-ipsec-client`](plugin_ipsec_client.md) plugin has an orange icon indicating that a new version of the plugin is available for installation, though the currently installed version is still actively being used by the conductor.

:::important
Upon installation, removal or upgrade of a plugin, the Conductor must be restarted for the changes to take effect.
:::

#### Installing a new plugin
The available plugin can be downloaded and installed by clicking on the `Install` button on the bottom right and it provides feedback on the installation status and other instructions.

![SSR Plugin Installation](/img/plugin_install.gif)

#### Upgrading an existing plugin
When plugin upgrades are available, the `Upgrade` button on the bottom can be used to install the latest version of the plugin.

![SSR Plugin Upgrade](/img/plugin_upgrade.gif)


#### Removing installed plugin
Installed plugin can be removed from the UI by using the `Uninstall` button on the bottom right.

![SSR Plugin Uninstall](/img/plugin_uninstall.gif)

#### Running Plugin Commands
Commands that are bundled with installed plugins may be run from the GUI using the Plugin Commands interface. Selecting Plugins from the Administration menu opens a list of the installed plugins. Select the DETAILS button for an installed plugin to view the State and Commands Tabs. Use the Commands tab to execute commands available for the individual plugins. 

### Enabling plugin-specific configuration
The conductor provides extensibility APIs through which plugins can add plugin-specific configuration to the conductor. This mechanism is especially useful for collecting various user inputs to drive the plugin behavior. For example, the [`128T-gre`](plugin_gre.md) uses the configuration to obtain tunnel configuration for the router.

![SSR GRE configuration](/img/plugin_gre_config.gif)

Such advanced plugins take advantage of other conductor APIs to inject derived configuration such as [knis](#kni-network-scripts), service and service-route into the configuration. This enables the plugins to better manage their feature and functionality on the router.  Such plugins are used to chain together various [service functions](#service-function-chaining) on the router to allow additional software to be easily deployed and managed.

### Installing and managing software on the router
In the SSR platform architecture, `salt` is used as communication mechanism between router and conductor for managing the SSR software on the router. In the similar fashion, the plugins can also install additional software and manage state on the router via `salt` by leveraging pillar generation APIs provided by the conductor. Most plugins will typically leverage salt to perform one or all of the following functions:

* Install an rpm along with its dependencies on the router
* Configure additional software on the router
* Trigger additional services or functions on the router such as systemd services etc.

:::note
Plugins rely on connectivity between the conductor and router to drive their logic. They also rely on the router to have access to the SSR RPM repository as either direct access over internet or by leveraging [conductor hosted repo](upgrade_restricted_access.md).
:::

## Plugin Concepts
Some of the more advanced plugins such as [`128T-ipsec-client`](plugin_ipsec_client.md) and [`128T-gre`](plugin_gre.md) rely on various extensibility features available on the router to perform their functions. Some of the commonly used concepts are as follows.

### KNI network scripts
[The Kernel Network Interface (KNI)](https://doc.dpdk.org/guides-21.11/prog_guide/kernel_nic_interface.html) is a special interface which allows for communication between the SSR and the underlying operating system. Most common instance of KNI is the presence of a loopback interface called `kni254` on the system which is typically used to enable in-band management sessions on an SSR. KNIs also provide an extensive set of [scripting functionality](plugin_kni_namespace_scripts.md) which can be used to drive additional applications on the system such as DNS masquerade, ipsec-client using libreswan, GRE stack in linux OS etc. A more detailed guide on KNI interface scripting can be found [here](concepts_kni.md).

### Service Function Chaining
One of the most common use case for plugins is the notion of service function chaining whereby `ingress` traffic (typically from a lan interface) is routed through the linux OS to be passed through a `service function` which can be used to inspect, encapsulate, transform or provide additional functionality on the incoming traffic. Once the service function in linux is applied it will result in a new set of sessions being created towards the `egress` interfaces (typically towards a wan interface). Such a SFC function relies on the safe and reliable Session Smart Routing in both directions.

![SSR plugin sfc](/img/plugin_sfc.png)

In a SFC implementation, typically the traffic is received from the `ingress` interface and is processed by an `ingress-service`. The service would then direct the traffic towards an `ingress` KNI. Depending on the type of the plugin, there may be additional applications running in a network namespace. For example, the [`128T-gre`](plugin_gre.md) plugin creates native GRE tunnels supported by Linux OS in an network namespace. This is referred to as a `service function` as seen in the graphic above. Once the function performs its intended role, the traffic is then forwarded through the `egress kni` back into the SSR for further processing. Once the egress traffic is received (back) into an SSR, it allows the user to apply all possible routing concepts such as local breakout, secure-vector routing etc to the `egress` traffic. In case of the GRE plugin, for example, the tunnel IP traffic is typically forwarded to the peer endpoint via local breakout.

:::important
Consider appropriate tenancy for each side of the traffic (ingress vs egress) to not only provide appropriate security but also to avoid issues with the sessions from two sides colliding with each other.
:::

### Application Identification
SSRs have powerful application-based routing capabilities using [modules](concepts_appid.md#appid-using-modules) which can provide a name to ip-prefix mapping. As the documentation suggests, the module based approach requires programming expertise and as a result lends itself very well as a plugin. Several plugins utilize the app-id feature in the product to provide a meaningful user experience. The [`128T-dns-app-id`](plugin_dns_app_id.md) plugin, for example, combines both the SFC concept as described [above](#service-function-chaining) in order to learn and cache DNS records routed through the SSR platform as well as leveraging the learned information to provide named routing for applications such as GSuite, Gmail etc by leveraging application-id.

### Plugin Management
The following PCLI commands are helpful for managing a suite of plugins on an SSR. The commands are available for conductors running SSR versions `4.5.0` and greater.

#### Show Available Plugins
Show available plugins by category using `show plugins available [node <node>] category <category>`. The supported categories are Application Classification, Cloud, Connectivity, Monitoring, Security, Unified Communications, Utility and Other. Show an overview of a plugin along with available versions using `show plugins available [node <node>] name <plugin-name>`

#### Show Installed Plugins
Show installed plugins using `show plugins installed [node <node>]`

#### Show Plugin State
Show the current `detail` or `summary` state of a plugin using `show plugins state [router <router>] [node <node>] [{detail | summmary}] name <plugin-name>`. Plugin state is supported in deployments with conductors and routers running SSR versions `5.1.0` and greater. Some plugins do not support state data and will not give meaningful output from this command.

#### Install or Remove a Plugin
Install/remove a plugin using `manage plugin {install | remove} [node <node>] name <plugin-name>`
