---
title: Router Migration
sidebar_label: Router Migration
---

This process is used to migrate an existing conductor-managed router to a new conductor and infrastructure. From the PCLI, the command can be run from the existing conductor to automatically migrate the router to the new conductor, or it can be run from the router itself. Before perfoming the procedure below, the new conductor must be installed and configured, and both the old and the new conductors must be reachable. For steps to install a conductor, see [Single Conductor Interactive Installation](single_conductor_install.mdx).

### PCLI

The `migrate` command automates the process of migrating a router to a new conductor. 

1. Export the router configuration from the old conductor, and import and commit the router configuration to the new conductor. 

 A.) From the **router PCLI** (this will include only configuration for the specific router), run `show config running flat > /tmp/router_config.txt`. The router configuration is exported to the temp directory as a text file.

 B.) Open the `router_config.txt` file and remove the `conductor-address` from the configuration. This prevents the import operation from overwriting the new conductor address with the old one. Adjust any routing configuration necessary for the router to reach the new conductor.

 C.) From the PCLI of the new conductor, import `/tmp/router_config.txt`.

 `< /tmp/router_config.txt`

 D.) Perform migration using the migrate command as shown in step 2 below.

2. Run the `migrate` command from the old conductor: 

 `migrate conductor <new-address> router <router>`

 In some situations, such as debugging or for monitoring purposes, the `migrate` command can be run from the router: `migrate conductor <new_address>`. However, it is recommended to execute the command from the conductor. 

### GUI

When using the GUI, a **Migrate** button is visible for Routers that are possible to migrate. 

1. From the Authority menu, select Routers.
2. On the Routers page, choose the router to migrate.
3. At the top of the Router page, select the **More** list (three vertical dots) to display the Migrate button.

 ![Migrate Button](/img/howto_migrate_router_button.png)

4. Click the button to display the Migrate Router dialog.

 ![Migrate Dialog](/img/howto_migrate_router_dialog.png)

5. Enter the new Conductor address(es). You can also choose to rollback to the existing configuration if there is a failure (recommended), or to force the configuration change regardless of errors.
6. Click **Migrate**.

### Verify Migration

After the migration command is run, you will see a **Connected** state on the conductor showing the migration was successful. The router(s) will transition to running after a few minutes. If a router does not migrate successfully, an error message will be displayed and no action will be taken.

- Verify that the TCP ports 930, 4505 and 4506 on the conductor are enabled. The routers use these ports to communicate with the conductor.
- If there is a firewall in front of the conductor, these same TCP ports must be enabled.