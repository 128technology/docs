<!---Set Conductor IP Address--->

import useBaseUrl from '@docusaurus/useBaseUrl';

Configure the IP address that will be used to manage the network routers.  

1. Select the device ethernet interface that corresponds to the management port for your Conductor and select `<Edit>`

<img src={useBaseUrl('/img/nmtui-linux-a.png')} alt="Configure the Ethernet port" width="192" height="243" />

2. In the Edit Connection screen, configure the following:
- The IP address for the port
- the Gateway IP address
- DNS server addresses

<img src={useBaseUrl('/img/nmtui-linux-b-static-ipv4-config.png')} alt="Edit Connection" width="654" height="394" />

3. Scroll to the bottom of the screen and select `Automatically Connect` and `Available to All Users`, then select OK. 

<img src={useBaseUrl('/img/nmtui-linux-c-static-ipv4-autoconx.png')} alt="Edit Connection" width="654" height="394" />

4. From the NMTUI screen, select `Set system hostname`, and `<OK>`.

<img src={useBaseUrl('/img/nmtui-linux-set-hostname.png')} alt="Select Hostname" width="354" height="381" />

5. Enter the hostname and select `<OK>`. Note that the hostname will be used as the Asset ID.

<img src={useBaseUrl('/img/nmtui-linux-set-hostname2.png')} alt="Add Hostname" width="354" height="381" />

6. From the NMTUI screen, select `Activate a connection`, and `<OK>`.

7. Select the port, and `<Activate>`. 

<img src={useBaseUrl('/img/nmtui-linux-activate-port.png')} alt="Activate port" width="379" height="378" />

 When the port has been activated, an asterisk will appear next to the port name.

```
Ethernet (enp2s0f0)
* enp2s0f0
```
8. Select `<Back>` and then `<Quit>` NMTUI.

The Initializer process starts automatically.
