<!----Add the Conductor to the Authority---->

Take this opportunity to log into the Conductor GUI to complete the following operations. This will provide validation that the installation was successful, and familiarize you with GUI operations. 

#### Connecting the Conductor to the Network

To make sure the conductor is on a network and accessible via GUI, the IP address on the interface must be in the same subnet as the VLAN on the switch port. Use `https://<interface IP address>` for GUI login.

1. Select the **Conductor** from the Authority menu on the left side of the GUI. 

 ![Configuration menu](/img/config_menu_gui.png)

2. Select the **Configure** icon.

 ![Conductor Configuration Icon](/img/conductor_config_icon.png)

3. Select the node for the conductor - in this example it is `node1`.

 ![Conductor Node](/img/conductor_node.png) 

4. Under **Associated Asset ID** select the hostname for the conductor.

 ![Asset ID](/img/conductor_asset-id.png)

5. Validate and Commit the changes to the configuration. 