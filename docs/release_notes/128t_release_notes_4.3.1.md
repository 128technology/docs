---
title: 128T 4.3.1 Release Notes
sidebar_label: 4.3.1
---

## Special Considerations ##
Consult the [4.3.0 release notes Special Considerations](./release_notes/128t_release_notes_4.3.0.md#special-considerations) section


## Issues Fixed
- **I95-34058, I95-34064** Session setup fails for outbound only when first packet exceeds MTU

## Caveats
- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need to be restarted on the respective node. This is done with the following command on the node as the root Linux user:
  ```
systemctl restart salt-minion
  ```

- **I95-27808** `sync peer addresses router force` from Conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the Conductor.


- **I95-32789** Peer stats in Conductor UI not provided during upgrade

  _**Symptom:**_ When upgrading a node from pre 4.3 to 4.3, the peer node will not provide general stats in the conductor UI until the peer is also upgraded.

  _**Conditions:**_ When nodes of a router or conductor pair are on different versions (for routers this is the short transition where the first node is upgraded and the second node is in the process of upgrading but still operational)

  _**Corrective Action:**_ NA, when both nodes are operational and on the 4.3 version the stats information on the router dialog will be provided. Stats can still be retrieved from the PCLI of the node while it is running.