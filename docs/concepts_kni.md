---
title: Kernel Network Interfaces
sidebar_label: Kernel Network Interfaces
---

The DPDK kernel network interface (KNI) provides a way for the SSR to route traffic to the Linux OS for access to various USER space applications. KNIs also provide a way for traffic originating in the Linux OS to be routed via the SSR. Every SSR creates a KNI called `kni254` by default which is used to implement [in-band management access](concepts_linux_host_networking.md) to the router.


## Configuration
There are several types of interfaces in the product that leverage KNIs such as [LTE](howto_lte.md), PPPoE and T1 are all implemented using KNIs under the covers. The SSR router also provides the ability to provision KNIs in various modes and provides an extensible scripting framework around them.

### Host KNI
The `host` mode KNI creates a KNI in Linux with the name specified. The following configuration shows the example of such KNI

```
config

    authority

        router  router1
            name  router1

            node  node1
                name              node1

                device-interface  host-kni
                    name               host-kni
                    type               host
                    enabled            true

                    network-interface  host-kni-intf
                        name       host-kni-intf
                        tenant     _internal_

                        address    169.254.10.20
                            ip-address     169.254.10.20
                            prefix-length  24
                            gateway        169.254.10.21
                        exit
                    exit
                exit
            exit
        exit
    exit
exit

```

The above configuration, creates a KNI called `host-kni` in Linux which can be utilized for sending and/or receiving traffic from the SSR. The configured `gateway` will be added as the IP address of the interface in Linux and the `ip-address` will be added as the gateway for the KNI from Linux's perspective.

```
# ip addr
...
89: host-kni: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 36:10:e9:cc:16:3c brd ff:ff:ff:ff:ff:ff
    inet 169.254.10.21/24 brd 169.254.10.255 scope global host-kni
       valid_lft forever preferred_lft forever
    inet6 fe80::3410:e9ff:fecc:163c/64 scope link
       valid_lft forever preferred_lft forever
```

Users can also configure a `network-namespace` for the host KNI which is useful for isolating the host KNI into a namespace and is commonly how KNIs are used. Applications and plugins leverage the [scripting framework](#scripting-framework) in order to implement [SFC](plugin_intro.md#service-function-chaining). To simplify the adoption of this model and to speed up plugin development using this model, [a utility with a set of namespace scripts](plugin_kni_namespace_scripts.md) is provided to simplify this process.


### Bridge KNI
The `bridge` mode KNI is used to create a Linux bridge with another ethernet interface in Linux. The following configuration shows an example of such a KNI

```
config

    authority

        router  router1
            name  router1

            node  node1
                name              node1

                device-interface  test-bridge
                    name               test-bridge
                    type               bridged
                    target-interface   dpdk3

                    network-interface  test-bridge-intf
                        name        test-bridge-intf
                        global-id   7
                        tenant      _internal_
                        source-nat  true

                        address     169.254.100.100
                            ip-address     169.254.100.100
                            prefix-length  24
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

In this mode, the SSR router will create a Linux bridge (of the form `kni<global-id>_bridge`). To make the bridge name more predictable or to use an existing bridge network user can also configure the `bridge-name` field for the KNI. Once applied, the system will put both the KNI called `test-bridge` and `dpdk3` interface on the same bridge interface. In addition, the router will perform a mac swap by first learning the `mac-address` of the target-interface `dpdk3` and installing it on the KNI and installing the randomly generated KNI MAC address on the bridge and target interfaces.

```console
# ip addr
...
5: dpdk3: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast kni7_bridge state UP group default qlen 1000
    link/ether ee:43:6b:45:51:7e brd ff:ff:ff:ff:ff:ff
    inet6 fe80::ec43:6bff:fe45:517e/64 scope link
       valid_lft forever preferred_lft forever
...
93: test-bridge: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast kni7_bridge state UP group default qlen 1000
    link/ether ee:43:6b:45:51:7e brd ff:ff:ff:ff:ff:ff
94: kni7_bridge: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ee:43:6b:45:51:7e brd ff:ff:ff:ff:ff:ff
    inet6 fe80::ec43:6bff:fe45:517e/64 scope link
       valid_lft forever preferred_lft forever
```


## Scripting Framework
The KNI scripting framework provides a programmable interface to bring-up, initialize and monitor applications that are associated with KNIs. Several of the built in device types such as LTE, PPPoE and T1 all leverage this framework to implement majority of their functions. Other features in the product such as DHCP server and [plugins](plugin_intro.md#service-function-chaining) also leverage this scripting framework.

### Directory structure
The scripting framework scans for executable scripts in the `/etc/128technology/plugins/network-scripts` directory for each of the configured types. Each of the built in type has its own dedicated sub-directory called `lte`, `pppoe` and `t1` where the router stages the necessary scripts. For the `host` type interface, the software will look for scripts in a sub-directory by the name of the KNI interface under `/etc/128technology/plugins/network-scripts/host/`. For the `bridge` type interface, the software will look for a scripts in a sub-directory by the name of the `target-interface` under `/etc/128technology/plugins/network-scripts/bridged/`. From the above example, this will be `128technology/plugins/network-scripts/host/host-kni` and `/etc/128technology/plugins/network-scripts/bridged/dpdk3` respectively.

```console
# ls /etc/128technology/plugins/network-scripts/
bridged  common  default  dhcp-server  host  kni  pppoe  t1

# ls /etc/128technology/plugins/network-scripts/host/
host-kni

# ls /etc/128technology/plugins/network-scripts/bridged/
dpdk3
```

:::important
`root` access is required for executing all the scripts
:::

### Script Types
The framework supports a set of scripts to assist in the initialization, maintenance and graceful shutdown of applications built around the KNIs. These scripts are run at various logic points in the code and expected to trigger specific behavior per the contract.

#### startup

The `startup` script is executed when the KNI is created for the first time. This typically happens when either a new KNI config is added or the SSR service (re)starts. This is typically the place where the application should perform any cleanup of previous context, perform one time operations such as loading necessary drivers etc.

#### init

Once the interface is created and started, the `init` script will be invoked to initialize the KNI and the underlying application. This is where typically the bulk of the operation happens such as moving KNIs and other interfaces (if needed) to a network namespace, launching other applications, setting up Linux routing etc. Once this state is complete, the system is expected to be in an operation state with regards to this KNI.

#### monitoring

While the interface is up, the `monitoring` script is invoked every `1 second` and is meant to inspect the health of the KNI and its application. This is typically where the user could check for the status of the systemd service, some upstream connectivity etc. The script can report the word `down` over standard out to the SSR software to bring the interface operationally down. Once in this state, the system will continue to run the `monitoring` script to detect any other change in status if necessary.

#### reinit

In a normal scenario, the system is monitoring the operational status of the KNI as well as the bridge and target interface for the bridge type. At any point if the operational status goes down or the `monitoring` script reports down, the system has a `10 second` hold down time to let the system normalize on its own and then calls the `reinit` script to try and reinitialize the device. This provides an opportunity for the application to perform any cleanup before re-initializing the connection. In most cases, this will perform the same tasks as the `init` script.

#### shutdown
The `shutdown` script is called when the SSR router is stopped or if the KNI interface is deleted from the configuration. The script is intended to do final cleanup such as deleting namespaces, restoring routes in global namespace, etc.

#### info

When the interface comes up for the first time or after any subsequent `down` to `up` transition, the system invokes the `info` script. The script can produce a JSON document which will be used to provide an output within the `show platform` command for the KNI interface. This is useful for capturing and reporting static information such as software or firmware version.

```json
{
    "Device Info": {
        "IMEI": "359225056050065",
        "Model": "MC7354",
        "Firmware Version": "SWI9X15C_05.05.58.00 r27038 carmd-fwbuild1 2015/03/04 21:30:23",
        "Manufacturer": "Sierra Wireless, Incorporated"
    },
    "Network Info": {
        "Wireless Network": "LTE",
        "Supported Technology": "GSM, GPRS, EDGE, UMTS, HSDPA/HSUPA, HSPA+, LTE",
        "Sim Type": "3G USIM"
    },
    "Carrier Info": {
        "preferred carrier name": "GENNA-UMTS",
        "current fw version": "05.05.58.00",
        "current config name": "GENNA-UMTS_005.025_002",
        "current carrier name": "GENNA-UMTS",
        "preferred fw version": "05.05.58.00",
        "preferred config name": "GENNA-UMTS_005.025_002"
    }
}

```

:::note
The script will be terminated if it takes longer than 30 seconds to finish.
:::

#### state

The system invokes another script called `state` every `5 seconds` and is useful for capturing dynamic information associated with the KNI such as application status, connection status etc. The script can produce a JSON output to standard out and the content is displayed as part of `show device-interface` command.

```json
{
    "GRE": {
        "stats": {
            "TX errors:": {
                "transns": "0",
                "heartbeat": "0",
                "window": "0",
                "aborted": "0",
                "fifo": "0"
            },
            "TX": {
                "collsns": "0",
                "errors": "1",
                "dropped": "0",
                "bytes": "10428144",
                "carrier": "1",
                "packets": "289627"
            },
            "RX": {
                "mcast": "0",
                "overrun": "0",
                "errors": "0",
                "dropped": "0",
                "bytes": "10419744",
                "packets": "289408"
            },
            "RX errors": {
                "missed": "0",
                "fifo": "0",
                "frame": "0",
                "length": "0",
                "crc": "0"
            }
        },
        "icmp-probe-status": "unavailable"
    }
}

```

:::note
The script will be terminated if it takes longer than 30 seconds to finish.
:::

### Script command line arguments
In order to provide actionable information for script to perform their automation, each of the scripts are provided with a set of command line arguments that reflects the SSR configuration, specifically for the `host` and `bridged` types the following information is provided

Each script for the `host` type is passed each of the following arguments

| arguments | description  | example |
| ----------| -------------| --------|
| `--kni-interface=<kni-intf-name>` | name of the device-interface | host-kni |
| `--kni-ip=<kni-interface-ip>` | ip-address of the network-interface | 169.254.10.20 |
| `--kni-prefix=<kni-interface-prefix>` | prefix-length of network-interface | 24 |
| `--kni-gateway=<kni-interface-gateway>` | gateway of network-interface | 169.254.10.21 |
| `--namespace=<namespace-name>` | Optional: If `network-namespace` is configured | None |

Each script for the `bridged` type is passed each of the following arguments

| arguments | description  | example |
| ----------| -------------| --------|
| `--kni-interface=<kni-intf-name>` | name of the device-interface | test-bridge |
| `--target-interface=<target-intf-name>` | name of the target-interface | dpdk3 |
| `--bridge=<bridge-name>` | auto generated bridge name or `bridge-name` from config | kni7_bridge |


### Script Requirements
The following requirements apply to the scripts:

* The name of the scripts are case sensitive, must match the names in the previous sections and should not include any file extension. For example, init.sh is not a valid `init` script. Similarly `STATE` is also not considered a valid name for `state` script.
* The scripts must be executable and must have execute permission for `root` user
* The scripts must have the ability to interpret [command line arguments](#script-command-line-arguments) containing ip-address and other information.
* The scripts are language agnostic as long as the operating system can understand how to execute them. This is typically accomplished by including an interpreter shebang such as `#!/bin/bash` as the first line of the script. More details can be found [here](https://en.wikipedia.org/wiki/Shebang_(Unix)).
* The scripts must exit with a code of `zero` to indicate success and use a `non-zero` code to indicate a failure.
* Some scripts such as `monitoring`, `state` and `info` are expected to produce output on `stdout`. The format of this output depends on the type of the script.

## References
* [Kernel NIC Interface](https://doc.dpdk.org/guides-21.11/prog_guide/kernel_nic_interface.html)
* [Linux Interpreter Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
