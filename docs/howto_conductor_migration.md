---
title: Conductor Backup and Migration
slidebar_label: Conductor Backup and Migration
---

This guide provides the steps to migrate a conductor and the associated routers to a new conductor using the original conductor's configuration files, as well as the procedure to migrate existing routers to a new conductor when the original conductor is no longer accessible.

Before going through this process, it is beneficial to understand the [best practices for deploying your conductor](bcp_conductor_deployment.md).

## Conductor Backup

Use the following process to backup your conductor and router configurations from your existing conductor. It is a Juniper recommended best practice to perform this process (or create a script to perform the process) on a regular schedule. The files in the tarball are used to recover the network/node configuration to a new conductor. The process is also useful to mitigate disaster recovery.

Copy the following files into a tarball (a `*.tar.gz` file) on the existing conductor:
```
 /var/lib/128technology/t128-running.json
 /var/lib/128technology/user-running.json
 /etc/128technology/salt/pki/master/master.pem
 /etc/128technology/salt/pki/master/master.pub
 /etc/128technology/global.init
 /etc/128technology/local.init
```
 - If you have created custom salt states, copy the contents of `/svr/salt` with the above files.

 - It is also recommended to copy and save the router public keys stored in `/etc/128technology/salt/pki/master/minions/`. Migrating these files prevents a router that may have the same `minion_id` as a previously accepted router from being accepted after migration.

Use the following command to create the `*.tar.gz` file. 

```
tar -czf /var/log/128technology/conductor-backup-$(hostname)-$(date '+%Y-%d-%d').tar.gz <list of files>
```

For example:

```
tar -czf /var/log/128technology/conductor-backup-$(hostname)-$(date '+%Y-%d-%d').tar.gz /var/lib/128technology/t128-running.json /var/lib/128technology/user-running.json /etc/128technology/salt/pki/master/master.pem /etc/128technology/salt/pki/master/master.pub /etc/128technology/salt/pki/master/minions/ /etc/128technology/global.init /etc/128technology/local.init /svr/salt
 ```
The tarball can then be copied from the old conductor, placed on the new conductor, and extracted there. The procedures below describe the Migration and Restoration processes.

## Migrating to a New Conductor

This process is used to migrate an existing conductor and router configuration to a new infrastructure where the new conductor has a new IP address. It assumes that the old and the new conductors are both available, but have separate IP addresses

1. Create a new conductor with the same conductor and router node names, but a **different IP address**. For steps to install a conductor, see [Single Conductor Interactive Installation](single_conductor_install.mdx).
2. Import and Commit the router configurations to the new conductor.
**---->What are the commands associated with this<----**
3. From the conductor, run the appropriate command **on each router to be migrated**. 
 - For a standalone conductor, use the following command on each router: `migrate conductor <address1>`
 - For an HA conductor, use the following command on each router: `migrate conductor <address1> <address2>`

## Recover the Configuration from a Damaged or Corrupt Conductor

This process is used to create a new conductor on the same network when the old conductor has been corrupted or is otherwise unusable, but a backup tarball has been or is able to be created.

1. If a conductor backup tarball has not been created, and the old conductor is accessible, create the tarball as described in the [Conductor Backup](#conductor-backup) procedure. 
2. Shut down and remove the old conductor from the network to prevent routers from reconnecting there rather than the new conductor.
3. Create a new conductor with the **same conductor and router node names, and the same IP address**. For steps to install a conductor, see [Single Conductor Interactive Installation](single_conductor_install.mdx).
4.  Run the Initializer on the new conductor. 
```
initialize128t
```
5. Run the following command to stop 128T:
```
systemctl stop 128T
```
6. Copy the conductor backup tarball onto the new conductor and extract the files.

**---> Need the command example here <----**

7. Restart 128T on the new conductor. 
```
systemctl start 128T
```

After the restart, the routers will attempt to connect to the conductor and begin operation. You will see a **Connected** state on the conductor showing the migration was successful, and the routers will transition to **Running** after a few minutes. If a router does not migrate successfully, an error is displayed. 

:::important
If the salt-master public and private keys (`master_minion.pub`) are not copied over correctly or are overwritten, the routers will not be able to authenticate. You will need to access each SSR and delete the existing master public and private keys from the router. This forces the router to reconnect and authenticate with the new conductor. 
:::

### Re-Authentication Process

**I need the steps for deleting the salt-master public and private keys**

## Verify Migration

After the migration command is run, you will see a “connected” state on the conductor showing the migration was successful, and the routers will transition to running after a few minutes. If a router does not migrate successfully, an error is displayed. 

- Verify that the TCP ports 930, 4505 and 4506 on the conductor are enabled. The routers use these ports to communicate with the conductor.
- If there is a firewall in front of the conductor, these same TCP ports must be enabled.

