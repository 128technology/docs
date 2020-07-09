---
title: Asset Connection Resiliency
sidebar_label: Asset Connection Resiliency
---

128T provides path resiliency to a destination when multiple paths exist between peering 128T routers. However, not every destination may not have another 128T peered in its path. Specifically, the Conductor may be deployed on the public Internet without a front-ended 128T.
:::info
Read the [BCP on Conductor Deployment](bcp_conductor_deployment.md) for recommendations on how to deploy a Conductor.
:::

Without a peering 128T router, or without the use of dynamic routing protocols, the 128T considers all next hops equally, even though some paths may not provide a path to the destination. The following diagram depicts a case where two of the three paths to the Conductor are not available, even though the next hop gateway is responsive.

![Topology](/img/config_asset_connection_resiliency.png)

One of the [connections a 128T router establishes to a Conductor](concepts_machine_communication.md) is that of the salt-minion (router) connecting to a salt-master (Conductor).  The salt-minion and salt-master maintain a persistent TCP connection on port 4505 which the salt-master uses to publish requests to all salt-minions. When a salt-minion completes a request, it creates a transient connection on port 4506 back to the salt-master, sends an event with the result, then closes the connection.

The effect this problem has on salt is that if an event is sent to an invalid next hop, the request will never make it back to the salt-master. Since 128T load balances Conductor traffic between all possible paths, some percentage of salt events will fail to be returned to the salt-master, resulting in state inconsistencies between router and Conductor.

In order to avoid these intermittent failures, the 128T can optionally create a long-lived SSH session to the salt-master utilizing FIPS OpenSSH. Long-lived SSH sessions mitigate downstream network failures by ensuring the SSH session is established on at least one of the paths before the salt events are transmitted. As network failures occur, the SSH session will be reestablished on the next available, working path. Salt transactions are instead instantiated within the long-lived SSH connection. The 128T creates SSH sessions for both the salt publish port (4505) and return port (4506).[^1]

[^1]: Salt does not have a way to configure different IP addresses for the publish and return ports.


## Configuration

Asset connection resiliency is configured both at the `authority > asset-connection-resiliency` level (so as to apply to every router within an _authority_) as well as at the `router > asset-connection-resiliency` level (so as to provide an override to the value set at the _authority_). These SSH connections are unnecessary if the network topology already affords reliable salt connectivity.

## Troubleshooting

In order to determine if the long-lived SSH sessions are established, executing `show system services` will display if the service is running properly:

```
Retrieving system services...
================== ==================================== ==============
 Node               Service                              Active State
================== ==================================== ==============
 T114_DUT3.Router   128TWeb.service                  	active
 T114_DUT3.Router   auditd.service                   	active
 T114_DUT3.Router   prank.service                    	active
 T114_DUT3.Router   salt-ssh@192.168.1.14-4505.service  active
 T114_DUT3.Router   salt-ssh@192.168.1.14-4506.service  active
 T114_DUT3.Router   salt-ssh@192.168.1.6-4505.service	active
 T114_DUT3.Router   salt-ssh@192.168.1.6-4506.service	active
 T114_DUT3.Router   t128-process-metrics.service     	active
 T114_DUT3.Router   tank.service                     	active
 T114_DUT4.Router   128TWeb.service                  	active
 T114_DUT4.Router   auditd.service                   	active
 T114_DUT4.Router   prank.service                    	active
 T114_DUT4.Router   salt-ssh@192.168.1.14-4505.service  active
 T114_DUT4.Router   salt-ssh@192.168.1.14-4506.service  active
 T114_DUT4.Router   salt-ssh@192.168.1.6-4505.service	active
 T114_DUT4.Router   salt-ssh@192.168.1.6-4506.service	active
 T114_DUT4.Router   t128-process-metrics.service     	active
 T114_DUT4.Router   tank.service                     	active

Completed in 0.04 seconds
```

This output shows a total of four SSH connections, one SSH connection per salt port per node of a HA router.