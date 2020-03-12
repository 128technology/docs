---
title: Transitioning a Conductor from Standalone to HA
sidebar_label: Transitioning a Conductor from Standalone to HA
---

This guide provides a procedure for transitioning a standalone 128T Conductor to an HA 128T Conductor.

This example starts with a standalone Conductor named `Conductor` and one node named `T104_DUT1`, along with a single managed Router named `Router`, which has two nodes `T104_DUT3` and `T104_DUT4`:

```
admin@T104_DUT1.Conductor# show assets
Wed 2019-12-04 18:27:59 UTC

=========== =========== =========== ============== ========= ========
 Router      Node        Asset Id    128T Version   Status    Errors
=========== =========== =========== ============== ========= ========
 Conductor   T104_DUT1   T104_DUT1   4.2.0-2.el7    running        0
 Router      T104_DUT3   T104_DUT3   4.2.0-2.el7    running        0
             T104_DUT4   T104_DUT4   4.2.0-2.el7    running        0

Completed in 0.14 seconds
```


This is the starting basic configuration on the standalone Conductor node:

```markup
admin@T104_DUT1.Conductor# configure authority router Conductor
admin@T104_DUT1.Conductor (router[name=Conductor])# show
name  Conductor

node  T104_DUT1
    name              T104_DUT1
    asset-id          T104_DUT1
    role              conductor
exit
```


The first step is to configure the second Conductor node. If you start with the same basic configuration for the second node then you will see warnings below when you attempt to validate. The first warning states that a non-forwarding interfaces between the Conductor nodes needs to be configured to establish connectivity. For more information regarding non-forwarding interfaces please refer to this blog: [Configuring Non Forwarding Interfaces](config_non_forwarding_ha_interfaces). The second warning states that 128T needs to be restarted after creating a new node.  This will be addressed later.

```
admin@T104_DUT1.Conductor# configure authority router Conductor
admin@T104_DUT1.Conductor (router[name=Conductor])# show
name  Conductor

node  T104_DUT1
    name              T104_DUT1
    asset-id          T104_DUT1
    role              conductor
exit

node  T104_DUT2
    name              T104_DUT2
    asset-id          T104_DUT2
    role              conductor
exit

admin@T104_DUT1.Conductor# validate
Validating...
Warnings:
1. Router 'Conductor' is missing a non-forwarding fabric or shared interface on each node. The router may not have inter node
connectivity unless the interfaces were set up manually.
reported by router 'Conductor'

    config
        authority
            router Conductor

2. The field 'name' cannot be created while the system is running. To apply the configuration, 'T104_DUT1.Conductor' and
'T104_DUT2.Conductor' must be restarted after committing this change.
reported by router 'Conductor'

    config
        authority
            router Conductor
                node T104_DUT2

Candidate configuration is valid
```

:::note
While the conductor is not 128T router, it shares the same configuration model as the router and therefore is configured as a `router`.
:::

Next, configure two non-forwarding interfaces so connectivity can be established between both Conductor nodes.  Once the configuration has been created, you should see that validation warning go away:

```
admin@T104_DUT1.Conductor# configure authority router Conductor
admin@T104_DUT1.Conductor (router[name=Conductor])# show
name  Conductor

node  T104_DUT1
    name              T104_DUT1
    asset-id          T104_DUT1

    device-interface  mgmt
        name               mgmt
        type               ethernet
        pci-address        0000:00:04.0
        forwarding         false

        network-interface  ha-fabric
            name     ha-fabric
            type     fabric

            address  172.16.1.1
                ip-address     172.16.1.1
                prefix-length  24
                gateway        172.16.1.201
            exit
        exit
    exit
exit

node  T104_DUT2
    name              T104_DUT2
    asset-id          T104_DUT2
    role              conductor

    device-interface  mgmt
        name               mgmt
        type               ethernet
        pci-address        0000:00:04.0
        forwarding         false

        network-interface  ha-fabric
            name     ha-fabric
            type     fabric

            address  172.16.1.2
                ip-address     172.16.1.2
                prefix-length  24
                gateway        172.16.1.201
            exit
        exit
    exit
exit

admin@T104_DUT1.Conductor (router[name=Conductor])# validate
Validating...
Warnings:
1. The field 'name' cannot be created while the system is running. To apply the configuration, 'T104_DUT1.Conductor' and
'T104_DUT2.Conductor' must be restarted after committing this change.
reported by router 'Conductor'

    config
        authority
            router Conductor
                node T104_DUT2

Candidate configuration is valid
```

Commit the configuration, then stop 128T on the standalone Conductor node by dropping into the Linux shell and executing `systemctl stop 128T`. Wait for 128T to completely stop. The user can monitor the status of the service with `systemctl status 128T`.

Once 128T is fully stopped, the user needs to make changes to the salt minion configuration file. Since the Conductor was installed as a Standalone Conductor, the salt minion config is initialized with the loopback address. The user need to fix it manually to be the IP address of our management interface because when the second Conductor node is installed, it uses the IP address in these files to learn the management IP address of its peer node. Here is what the salt minion config look like before any modification:

```
[root@t104-dut1 ~]# cat /etc/salt/minion
auth_safemode: True
autoload_dynamic_modules: False
enable_legacy_startup_events: False
include: /usr/lib/128technology/python/salt/file_roots/_beacons/*.conf
log_level_logfile: debug
master:
  - 127.0.0.1
master_alive_interval: 30
master_tries: -1
ping_interval: 1
random_reauth_delay: 120
recon_default: 5000
recon_max: 30000
recon_randomize: True
tcp_authentication_retries: -1
tcp_keepalive_cnt: 3
tcp_keepalive_idle: 5
tcp_keepalive_intvl: 10
transport: tcp
```

Now here is what it looks like after the management IP address has been properly updated:

```markup
auth_safemode: True
autoload_dynamic_modules: False
enable_legacy_startup_events: False
include: /usr/lib/128technology/python/salt/file_roots/_beacons/*.conf
log_level_logfile: debug
master:
  - 172.16.1.1
master_alive_interval: 30
master_tries: -1
ping_interval: 1
random_reauth_delay: 120
recon_default: 5000
recon_max: 30000
recon_randomize: True
tcp_authentication_retries: -1
tcp_keepalive_cnt: 3
tcp_keepalive_idle: 5
tcp_keepalive_intvl: 10
transport: tcp
```

At this point, the first Conductor node is still stopped and it is time to install the second Conductor node. The user will launch the interactive installer to install the second node. You need to double check that the node name entered in the interactive installer matches the node name in the configuration. Wait for the interactive installer to finish then pick yes when it prompts the user to reboot. While the second node is rebooting, this is a good time to double check the _global.init_ file and salt minion configuration file on the first Conductor node have been modified and the second Conductor node has been added:

:::important
When installing a new HA node (conductor or router), ensure that the same version is being installed on both nodes.
:::

```
[root@t104-dut1 ~]# cat /etc/128technology/global.init
{
  "init" : {
    "control" : {},
    "conductor" : {
      "T104_DUT1" : {
        "host" : "172.16.1.1"
      },
      "T104_DUT2" : {
        "host" : "172.16.1.2"
      }
    },
    "routerName" : "Conductor"
  }
```
```
[root@t104-dut1 ~]# cat /etc/salt/minion
auth_safemode: True
autoload_dynamic_modules: False
enable_legacy_startup_events: False
include: /usr/lib/128technology/python/salt/file_roots/_beacons/*.conf
log_level_logfile: debug
master:
  - 172.16.1.1
  - 172.16.1.2
master_alive_interval: 30
master_tries: -1
ping_interval: 1
random_reauth_delay: 120
recon_default: 5000
recon_max: 30000
recon_randomize: True
tcp_authentication_retries: -1
tcp_keepalive_cnt: 3
tcp_keepalive_idle: 5
tcp_keepalive_intvl: 10
transport: tcp
```

Now that the _global.init_ and salt minion config look correct we can restart the salt-minion so it picks up the config changes and then start 128T. From the Linux shell first execute `systemctl restart salt-minion` then `systemctl start 128T`. Once they are up login and verify they both have connectivity to each other:

```
admin@T104_DUT1.Conductor# show system connectivity
Wed 2019-12-04 20:35:35 UTC

===================== ===================== ===========
 Local Node            Remote Node           State
===================== ===================== ===========
 T104_DUT1.Conductor   T104_DUT2.Conductor   connected
 T104_DUT1.Conductor   T104_DUT3.Router      connected
 T104_DUT1.Conductor   T104_DUT4.Router      connected

Completed in 0.11 seconds
```

Note that the second Conductor node will not have connectivity to any managed routers yet, we will address that next:

```
admin@T104_DUT2.Conductor# show system connectivity
Wed 2019-12-04 20:44:18 UTC

===================== ===================== ==============
 Local Node            Remote Node           State
===================== ===================== ==============
 T104_DUT2.Conductor   T104_DUT1.Conductor   connected
 T104_DUT2.Conductor   T104_DUT3.Router      disconnected
 T104_DUT2.Conductor   T104_DUT4.Router      disconnected

Completed in 0.12 seconds
```

In order for this procedure to work correctly, the user should have the `conductor-address` field configured for their standalone Conductor, which is the public IP address of the Conductor:

```
admin@T104_DUT1.Conductor# configure authority
admin@T104_DUT1.Conductor (authority)# conductor-address
192.168.1.8
```

The next step is to configure the second Conductor node as well as a `conductor-address` for the second Conductor node. This example shows the second `conductor-address` being configured:

```
admin@T104_DUT1.Conductor (authority)# conductor-address 192.168.1.13
admin@T104_DUT1.Conductor (authority)# conductor-address
192.168.1.8
192.168.1.13
```

Adding the second conductor address will also produce a new validation warning, which is expected:

```
admin@T104_DUT1.Conductor (router[name=Conductor])# validate
Validating...
Warnings:
1. Incorrectly modifying this field can result in permanent loss of connectivity to managed routers and will require manual intervention
to fix. Make sure the configured address is valid and reachable before committing this change
reported by router 'Conductor'

    config
        authority
            conductor-address

Candidate configuration is valid
```

Commit this configuration and you see all managed assets disconnect and reconnect because the new Conductor IP address was added and the minion was restarted:

```
admin@T104_DUT1.Conductor# show assets
Wed 2019-12-04 19:00:17 UTC

=========== =========== =========== ============== ============== ========
 Router      Node        Asset Id    128T Version   Status         Errors
=========== =========== =========== ============== ============== ========
 Conductor   T104_DUT1   T104_DUT1   4.2.0-2.el7    running             0
             T104_DUT2   T104_DUT2   4.2.0-2.el7    running             0
 Router      T104_DUT3   T104_DUT3   None           connected           0
             T104_DUT4   T104_DUT4   None           connected           0

Completed in 0.14 seconds
```

Wait until all assets transition back into the `running` state:

```
admin@T104_DUT1.Conductor# show assets
Wed 2019-12-04 19:01:59 UTC

=========== =========== =========== ============== ============== ========
 Router      Node        Asset Id    128T Version   Status         Errors
=========== =========== =========== ============== ============== ========
 Conductor   T104_DUT1   T104_DUT1   4.2.0-2.el7    running             0
             T104_DUT2   T104_DUT2   4.2.0-2.el7    running             0
 Router      T104_DUT3   T104_DUT3   4.2.0-2.el7    running             0
             T104_DUT4   T104_DUT4   4.2.0-2.el7    running             0

Completed in 0.16 seconds
```

There is no need to restart 128T on any managed routers all of them will properly recognize the new Conductor!

```
admin@T104_DUT3.Router# show system connectivity
Sun 2019-12-08 14:26:10 UTC

============ ===================== ===========
 Local Node   Remote Node           State
============ ===================== ===========
 T104_DUT3    T104_DUT1.Conductor   connected
 T104_DUT3    T104_DUT2.Conductor   connected
 T104_DUT3    T104_DUT4.Router      connected

Completed in 0.04 seconds
```