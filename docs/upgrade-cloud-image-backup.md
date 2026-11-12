---
title: Cloud Upgrade Backup Process
sidebar_label: Cloud Upgrade Backup Process
---

#### USSS Version (Mix of CLI and GUI)

Use the following process to backup the information necessary to reconstruct the conductor on the new cloud instance. Commands are issued from **either/both** the Web interface and the command line. You will use these files to recreate your conductor on a new, LVM-enabled cloud instance.

1. From the UI, navigate to the **Import / Export** option under **Configuration**. 
2. Click the button with the circular arrow in the upper right of the screen. 
3. Select the option to **Export Running Configuration**.
4. Enter a name for the exported file, and click the **Export** button. 
5. The configuration export file displays as shown below. Click the icon to download the export onto your local machine. 

6. There are three additional files that must be copied off of the conductor to your local machine:

	- Two files in the `/etc/128technology/salt/pki/master` directory that need to be exported from the conductor with the exported configuration files; `master.pem` and `master.pub`. These are keys that the routers use to authenticate the conductor - without these keys the routers will reject any attempt to be managed by the new conductor.

	- The file `/var/lib/128technology/user-running.json` contains all current users and their credentials. 

7. Execute the following commands and save the output. This information is important when building the new instance:

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

### Command Line

This section provides the steps to backup and download the files necessary to reconstruct the conductor on a new, LVM-enabled cloud instance. Commands are run from an SSR command line instance.

1. Run the command below to create a tarball in the `/var/log/128technology/` directory. The tarball file name is unique for each conductor node, and uses the convention: `conductor-backup-$(hostname)-$(date '+%Y-%m-%d').tar.gz`. 

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

2. Run the following command to verify the tarball file was created successfully.

	`ls -lh /var/log/128technology/conductor-backup*`

	As an option, use the command below to verify the files copied into the tarball:

	`tar -ztvf /var/log/128technology/<insert-your-tarball-filename>`

3. Copy the tarball file from the conductor to your local machine. Note that this device must be able to connect to the new instance of the cloud conductor. 

	The following is an example, using scp on a Ubuntu machine to copy the tarball file from a conductor node (with the IP address 10.9.0.6), and saving the file in the local user’s `Downloads` folder.
	
	```
	scp -i <insert-your-private-key-filename> t128@10.9.0.6:'/var/log/128technology/<insert-your-tarball-filename>' ~/Downloads
	```





