---
title: Pre-Install VMWare Configuration
sidebar_label: Pre-Install VMWare Configuration
---

These high level steps will be explored in detail to help you configure VMWare ESXi for an SSR or conductor installation.

- Download the SSR package-based or image-based ISO. Refer to [Downloading ISOs](intro_downloading_iso.md)
- Log into VMware ESXi with Administrative rights
- Create a new Virtual Machine and configure
- Boot Virtual Machine to run the Juniper SSR ISO and install software

## VMWare Configuration

In order to perform the configuration and installation of the SSR software, you must have a properly installed and working configuration of VMware ESXi. This documentation references VMware ESXi version 7.0.0, however, the software has been tested on all earlier versions. Additoinally, you must have administrator access to the ESXi platform.

## Procedure

1. Log in to your VMWare ESXi instance as the Administrator. [image]
2. Load the SSR ISO into the ESXi Data Store. [image]
	- From the ESXi Navigator in the left hand pane, select Storage.
	- Select the **Datastore Browser** button. [image]
	- From the Datastore Browser window, select **Upload**.
	- Navigate to the directory containing the Juniper SSR ISO. 
	- Select the ISO and click **Open**. The Datastore browser now shows the ISO.
	-  Click **Close** to continue.

3. From the ESXi Navigator select **Virtual Machines**.

### Define the Virtual Machine

1. Click on “Create / Register VM”
2. Select Create a new virtual machine and click Next. 

![Register VM](/img/vmware_registervm.jpg])

#### Virtual Machine Name and OS

5. Name the virtual machine. The name should indicate whether the instance is a router or conductor, and provide other information such as the physical location.
6. Set compatibility to ESXi 5.5 virtual machine.
7. Set the Guest OS family to: “Linux”
8. Set the Guest OS version to: “CentOS 4/5/6/7 (64-bit)” and click “Next”. 

![Name the VM](/img/vmware_name-os.png)

#### Storage Type

9. Select the storage type and datastore to be used and then click “Next” 
![Storage Type](/img/vmware_storage.jpg)

### Customize Settings

Ensure the “Virtual Hardware” button is selected and configure the following settings:
o	Expand open the CPU section
	Set the number of CPU’s to at least four (4)
	Update the “Scheduling Affinity” to “0-3”
o	Set memory to at least “8GB”
o	Set hard disk 1 to at least “26GB”
o	Set the “SCSI Controller 0” to “LSI Logic SAS” (vmware_virt_hdwr.jpg)


11. Configure network adapters
o	Click the button “Add network adapter (2) two times, so you have a total of (3) network adapters
o	Expand open each network adapter by clicking the small triangle next to it and set the Adapter Type on all (3) network adapter to be “E1000” series. 
[](vmware_net_adapter.jpg)

12. •	Configure CD (ISO) **(is this really still a CD option?)**
o	Expand the “CD/DVD Media” selection
o	Change the dropdown from “Host Device” to “Datastore ISO file”
o	The “Datastore browser” will appear.  Select the Juniper SSR/SSC (128T) ISO file and click the “Select” button”
[(vmware_cd-iso.jpg)]
vmware_cd-iso2.jpg


Configure “VM Options”
•	Click on the “VM Options” button at the top of the screen, next to “Virtual Hardware”

vmware_vmoptions1.jpg

o	Expand open the “Boot Options” section
o	Set firmware to “EFI”
o	Ensure that “Enable UEFI secure boot” is DISABLED (no check mark)
o	Click “Next” when done
[](vmware_vmoptions2.jpg)

•	“Ready to complete”
o	This screen provides you a summary of the new virtual machine configuration. Please verify all settings. Click “Back” if you need to modify anything.
o	If everything is correct, then click “Next” to finalize the setup of the new virtual machine.
[](vmware_complete.png)


## Launch new virtual machine and install Juniper SSR/SSC (128T) software

After creating a new virtual machine, the screen returns to the VMware navigator. 
vmware_finish.png

Ensure that the new virtual machine is selected and click the “Play” icon or the “Power on” button.
vmware_pwr-on.png

The virtual machine boots into a menu. Select “VGA: Install 128T x.x.x.x.x”. Note: that if you choose nothing then the system will default to booting into the “Serial Console” mode.

![VGA Boot with Interactive Install](/img/install_select_interactive.png)

During the install process, the status is displayed on the screen.

[](/img/vmware_install_status.png)

Once the installation has finished, there is a prompt to shut down the computer. Select “Yes” and press enter.  After the computer has shut down, the window can be closed.

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)


### Configure Juniper SSR/SSC software

From the VMware navigator. Ensure that the new virtual machine is selected and click the “Play” icon or the “Power on” button to launch the virtual machine again. 
Please reference the following documents to continue installing and configuring the software:

Additional information on installing a conductor in interactive mode can be found in [Single Conductor Interactive Install](single_conductor_install.md).
For Router installation information, see [Router Interactive Installation](intro_installation_bootable_media.md)

