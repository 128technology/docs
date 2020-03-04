---
title: Connecting to 128T Routers from Conductor
sidebar_label: Connecting to Routers
---

The `connect` command affords administrators the ability to connect to any managed 128T node via the PCLI from the conductor. This is implemented as a reverse SSH tunnel, originated by the 128T router, and associated with a specific loopback address and port on the conductor. (The loopback address for all managed routers is `127.127.0.1`, and the port is unique per router.)

Information about the IP and port assignments is maintained by the conductor in the file located at:

```
/var/lib/128technology/connect/nodeIdentifier
```

As new 128T nodes (the fundamental building block of a 128T router) are added to or removed from an Authority, this `nodeIdentifier` file will get rotated in the same way that log files get rotated. Thus, you may see many iterations of this file on your filesystem. The newest will always be the copy without any suffix appended to it, as indicated above.

## The nodeIdentifier File Contents

Because the `connect` command uses SSH, the `nodeIdentifier` file is written in the format of a SSH configuration file. Here is an excerpt from one sample system:

```
[t128@conductor ~]$ cat /var/lib/128technology/connect/nodeIdentifier
Host node1.router1
    Port 16496
    HostName 127.127.0.1

Host node2.router1
    Port 16497
    HostName 127.127.0.1

Host node1.router2
    Port 16498
    HostName 127.127.0.1
```

Each node for each router is represented as a separate `Host` statement, and is written in the form `node-name.router-name`.

## Connecting to a Managed Node

While the PCLI gives administrators the ability to connect to managed nodes using its packaged `connect` command, the implementation also gives you the flexibility to use the same reverse SSH tunnels manually within Linux via the `connect128t` command.

```
[t128@conductor ~]$ connect128t --router router1 --node node1
t128@127.127.0.1's password: ••••••••
Last login: Wed Jan 16 23:07:45 2019 from 10.128.0.1
[t128@node1 ~]$ 
```

## Using Other SSH-based Applications

Various other applications have been built using SSH, and can leverage the same techniques described above to perform remote actions on managed nodes. Namely `scp` (which is a derivative of BSD's _rcp_ utility, but built on top of SSH) for copying files, and `sftp` (which is loosely based on FTP, and also built on top of SSH) for an interactive file transfer session.

These two applications (`scp` and `sftp`) in particular are extremely useful for copying files to and from remote devices within the Linux shell. As we demonstrated with SSH above, we can use the reverse SSH tunnel to connect to managed nodes either by port reference, or by alias reference when using the configuration in the `nodeIdentifier` file.

For example, assume I have a PCAP file on a managed node and I want to copy that to my conductor so I can later pull it down to my desktop for analysis. This can be done as follows:

```
[t128@conductor ~]$ scp -F /var/lib/128technology/connect/nodeIdentifier t128@node1.router1:/var/log/128technology/128T_wan.pcap /tmp
```

Just as with SSH, we can pass the `nodeIdentifier` file using `-F` as an argument to `scp`. This command will copy the `128T_wan.pcap` file from the 128T's log directory to the conductor's filesystem in /tmp.

Here's another example, using `sftp`.

```
[t128@conductor ~]$ sftp -F /var/lib/128technology/connect/nodeIdentifier t128@node1.router1
t128@127.127.0.1's password: ••••••••
Connected to node1.router1.
sftp>
```

Now we can interactively transfer many files to or from the remote node within the `sftp` application.