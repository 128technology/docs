---
title: Cloud Upgrade Backup Process
sidebar_label: Cloud Upgrade Backup Process
---

#### USSS Version

Use the following process to backup important information for the Conductor. Commands are issued from both the Web interface and the command line.

From the UI, navigate to the **Import / Export** option under **Configuration**. 
Click the button with the circular arrow in the upper right of the screen. 
Select the option to **Export Running Configuration**.

A menu will pop up asking you to provide a name for the export. Provide a name and then click the “Export” button. Now, you should see your configuration export as shown below. Click the icon to download the export off the Conductor and onto your local machine. This can be used in cases where the entire conductor may need to be restored.

Also, there are two files in the “/etc/128technology/salt/pki/master” directory. One is named “master.pem” and the other is named “master.pub”. Please copy these files off the conductor. These files will be necessary for restoring service should the conductor need to be rebuilt from scratch. These are keys that the routers use to authenticate the conductor and should the conductor be rebuilt without these exact keys, the routers will reject any attempt to be managed by the new conductor and require hands on each router instance to accept the new conductor’s keys. These keys are synced between HA nodes of an active conductor so therefore they should be the same on both nodes of your existing conductor.

Lastly, copy of the file “/var/lib/128technology/user-running.json” which contains all current users and their credentials. This file will be synchronized between both nodes on the conductor so you only need to copy it off of one node.

On both conductor nodes, please execute the following commands and save their output. This information will be helpful when building the new instance:

```
ip a
ip r
firewall-cmd --list-all-zones
for f in /etc/sysconfig/network-scripts/ifcfg-*; do echo "------ $f ------"; cat $f; done 
for f in /etc/sysconfig/network-scripts/route-*; do echo "------ $f ------"; cat $f; done
cat /etc/resolv.conf
cat /etc/128technology/local.init
cat /etc/128technology/global.init
```

#### Rogers Version

This section provides the steps to create a backup of all relevant conductor files. You will use these files to recreate your conductor on a new, LVM enabled cloud instance. 

Run the command below to save the necessary files as a tarball in the `/var/log/128technology/` directory. The tarball file name is unique for each conductor node, and uses the convention: `conductor-backup-$(hostname)-$(date '+%Y-%m-%d').tar.gz`. 

For example, on a primary node named `primary-node` where the command was executed on 10/10/2026, the tarball file name is `conductor-backup-primary-node-2026-10-10.tar.gz`.

```
sudo tar -czf /var/log/128technology/conductor-backup-$(hostname)-$(date '+%Y-%m-%d').tar.gz /var/lib/128technology/t128-running.json 
/var/lib/128technology/user-running.json 
/etc/128technology/salt/pki/master/master.pem 
/etc/128technology/salt/pki/master/master.pub 
/etc/128technology/salt/pki/master/minions/ /etc/128technology/global.init 
/etc/128technology/local.init /etc/salt/pki/minion/minion.pem 
/etc/salt/pki/minion/minion.pub /etc/salt/pki/minion/minion_master.pub /srv/salt 
/etc/salt/minion_id
```

To verify that the backup tarball file was successfully created, run the below command on each conductor node.
ls -lh /var/log/128technology/conductor-backup*

To verify all files that were copied into the backup tarball file, run the below command on each conductor node.
tar -ztvf /var/log/128technology/<insert-your-tarball-filename>

On a separate machine, securely copy the tarball file from each conductor node into this separate machine. Note that this machine needs to be able to connect to the conductor nodes. Below is a sample command using scp on a Ubuntu machine to copy the tarball file from a conductor node (with the IP address 10.9.0.6) and saving the file in the Ubuntu machine’s local user’s Downloads folder.
scp -i <insert-your-private-key-filename> t128@10.9.0.6:'/var/log/128technology/<insert-your-tarball-filename>' ~/Downloads
