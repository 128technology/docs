<!---- Redundant HA Sync Interface --->

The configuration sample below adds a Linux interface `enp0s14f1` to the HA sync team interface.
```
config

    authority

        router  lshields
            name  lshields

            node  lanner7573
                name                lanner7573

                ha-sync-redundancy
                    redundant-interface    enp0s14f1
                exit
            exit
        exit
    exit
exit
```

### HA Fabric Over HA Sync
The configuration sample below auto-generates HA fabric interfaces that leverage the existing HA sync connection to transit between the nodes.
```
config

    authority

        router  lshields
            name  lshields

            ha-sync-redundancy
                generate-shared-fabric-interface    true
            exit
        exit
    exit
exit
```

This auto-generates the configuration for a device-interface named `ha-fabric` on any nodes in the router, each with a network-interface named `ha-fabric-intf`. The addresses used on these interfaces will be from the network `169.254.252.0/30`. The network can be overridden by specifying a different network range for the option `fabric-network` within the `ha-sync-redundancy` container.