---
title: Conductor Backup and Migration
slidebar_label: Conductor Backup and Migration
---

This guide provides the steps to migrate a conductor and it's routers to a new conductor using the original conductor's configuration files, as well as the procedure to migrate existing routers to a new conductor when the original conductor is no longer accessible.

Before going through this process, it is beneficial to understand the [best practices for deploying your conductor](bcp_conductor_deployment.md).

## Conductor Backup and Migration

The following process desribes the steps to migrate your conductor and router configurations using a copy / migrate process. Once the conductor configuration has been copied, the full configuration is migrated to the new conductor. The copy process is also useful for disaster recovery.

1. Create a new conductor with the **same conductor and router node names, and the same IP address**. If you do not use the same information the migration will fail. For steps to install a conductor, see [Single Conductor Interactive Installation](single_conductor_install.md).

2. Run the Initializer on the new conductor. 
```
initialize128t
```

3. Run the following command to stop 128T:
```
systemctl stop 128T
```
4. Copy the following files from the old conductor to the new conductor:

 - /var/lib/128technology/t128-running.json
 - /var/lib/128technology/user-running.json
 - /etc/128technology/salt/pki/master/master.pem
 - /etc/128technology/salt/pki/master/master.pub
 - /etc/128technology/global.init
 - /etc/128technology/local.init

5. Restart the new conductor. The conductor will automatically reboot twice. After the second restart, the routers will attempt to connect to the conductor and begin operation. 

:::important
If the salt-master keys are not copied over correctly, you will need to access each SSR and delete the old master public and private keys from the router. This forces the router to reconnect and authenticate with the new conductor. 
:::

## Migration Process

The following process is used when the old conductor is no longer accessible, i.e., cannot copy the files above but you have the router configurations. While importing the configurations to the conductor, you have to `commit` the validated configuration from the PCLI. A restart is required, and then you can proceed with the migration.

:::important
It is extremely important that the conductor configurations are exported/imported correctly to avoid losing the configuration.
:::

For steps to install a conductor, see [Single Conductor Interactive Installation](single_conductor_install.md). 

1. After the new conductor configuration is complete, copy the router configuration to the new conductor.
2. Commit the router configuration.
3. Run the appropriate command **on each router to be migrated**. 

 - For a standalone conductor, use the following command on each router: `migrate conductor <address1>`

 - For an HA conductor, use the following command on each router: `migrate conductor <address1> <address2>`

:::note
**This information needs to be broken out in this doc. Based on the Conductor Backup and Migration above and feedback I received while writing it, this note does not make complete sense to me.** 

The `migrate conductor` PCLI command uses WAN IP(s) to migrate a router from one conductor to another. Because the command uses WAN IPs, it is not possible to use it when both the old and new conductor are behind the same head-end router and use dest-nat or SVR to reach the conductor. In this case, the WAN IP will be the same for both conductors, so the command has no impact.
:::

## Verify Migration

After the migration runs successfully, the routers are shown as **Running** from the new conductor. If a router does not migrate successfully, an error is displayed. 

- Verify that the TCP ports 930, 4505 and 4506 on the conductor are enabled. The routers use these ports to communicate with the conductor.
- If there is a firewall in front of the conductor, these same TCP ports must be enabled.

