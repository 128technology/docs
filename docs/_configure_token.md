<!----Configure the Token--->

Once the system has been setup for the first time, the next step is to provision credentials for SSR software access on the conductor. Provisioning the software credentials on the conductor propagates those settings down to all of the managed routers.

Use the PCLI command `set software access-token`. For information on this command, see [`set software access-token`](cli_reference.md#set-software-access-token).

From the root user in the workflow above, run the `pcli` command to access the PCLI and configure the token.

```
[root@test-conductor ~]# pcli
Starting the PCLI...
root@node1.test-conductor# set software access-token <username> <password>
Saving...
Waiting for process to complete
...(messages removed for brevity)...
Making the DNF cache
No further operation requested. Exiting
Installer complete
Successfully saved credentials.
root@node1.test-conductor#
```