---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

Juniper Session Smart Networking provides the following workflows for the installation process:

- **Image-based ISO:** Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments.

  The image-based ISO's are available to download at the following location:

  `https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/<Major>.<Minor>/`. 

  For details about the Image-based install process, see [Image-based Installation.](intro_installation_image.md) 

- **Interactive:** Installation is done via a serial console or VGA. An interactive session is started to configure network interfaces, passwords, node name and type, and conductor IP (if applicable) before the SSR software is started.

- **One Touch Provisioning (OTP):** This is the preferred method of installation. Sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP bootstrap process will install and configure the router.

Prior to versions 4.5.6-1 and 5.0.0-1 v2 there were two separate ISO’s available:

- 128T-4.5.5-1.el7.OTP.v1.x86_64.iso – OTP ISO
- 128T-4.5.5-1.el7.v1.x86_64.iso - Interactive (Refer to [Installing Using the Pre-5.0 Interactive ISO](legacy_OTP_install.md) for additional information)

With releases 4.5.6-1 and 5.0.0-1 v2 (and greater), we now provide a single ISO that supports both  the OTP and Interactive Installation workflows.

- 128T-4.5.6-1.el7.OTP.v1.x86_64.iso
- 128T-5.0.0-1.el7.OTP.v2.x86_64.iso

With release 5.4.7-7 (and greater) the iso name format has changed from using `OTP` to `ISO`:

- 128T-5.4.7-7.el7.ISO.v1.x86_64.iso

### Installation Considerations

The newer installation process uses a username and token that is provided with the software license. The username/token simplifies access and does not require the conversion process used for the certificate. With the latest releases of the Installer, both a certificate or username/token can be used for installation. However, to use a username/token for software access, Installer 3.0.0 or greater is required. SSR software version 5.3 and greater accept **only** the username and token for software access. 

:::note
Do not uninstall old versions of the 128T/SSR Installer. Later versions of the Installer have dependencies on the earlier versions, and uninstalling them may cause issues for upgrade and/or rollback operations. 
:::

Juniper requires upgrading your Conductor to a minimum 4.5.7, 5.0.1, or 5.1.1 version before the username and token software access can be used (upgrading to the latest patch release for your deployed version is always recommended). These versions contain updates for using a username/token for software access. If a username/token is used and the SSR software is not upgraded, a manual process must be followed each time the username/token is changed. Before using a manual process for upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) the [**Rolling Back Software**](intro_rollback.md) documentation, then review the [Manual Token Process](installer_cli_reference.md#manual-token-process) for more information.

## Downloading an ISO

The SSR Software packages are available from our public servers using the username and token provided to you. 

For versions prior to release 5.3, use: `https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/`. 

For versions 5.3 and later, use `https://software.128technology.com/artifactory/list/generic-128t-isos-release-local/<Major>.<Minor>/`. 

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page. If your client certificate or token is currently installed on your SSR routers and conductors, you can download software updates from our yum servers or the web page. 

### Downloading from the Command Line

The ISO installation media is hosted at the same location as the SSR software packages, in the iso directories provided above. To acquire the ISO, use the `curl` command. Specify the certificate or username and token obtained from Juniper Networks, Inc. with a valid software license.

#### Username and Token Download
##### Legacy ISO access (Versions less than 5.3.0)
```
curl -L -O -u <username>:<token> https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/128T-<VERSION>.x86_64.<file_format>
```

Example: 
```
curl -L -O -u username:token https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/128T-4.5.0-1.el7.OTP.v6.x86_64.iso
```

##### ISO access (Versions 5.3.0 or greater)
```
curl -L -O -u <username>:<token> https://software.128technology.com/artifactory/list/generic-128t-isos-release-local/<Major>.<Minor>/128T-<VERSION>.x86_64.<file_format>
```

Example:
```
curl -O -L -u username:token https://software.128technology.com/artifactory/list/generic-128t-isos-release-local/5.4/128T-5.4.0-104.el7.OTP.v1.x86_64.iso
```

Where `<VERSION>` is `<Major>.<Minor>.<patch>-<build>.<OS>.<img_variant>.<img_version>` of the version to download

`<Major>` - Major release version number

`<Minor>` - Minor release version number

`<patch>` - patch release version number

`<build>` - Build ID

`<OS>` - Base OS (Currently only el7 is available)

`<img_variant>` - Image (img) Type, current image types are: `OTP` and `img`

`<img_version>` - ISO version for the `<Major>.<Minor>.<patch>-<build>.<OS>.<img_variant>`

Where `<file_format>` is one of `iso` for an ISO image, or `raw.gz` for a gzip compressed disk image

#### Certificate Download
```bash
curl -O --cert /etc/pki/128technology/release.pem https://yum.128technology.com/isos/128T-<VERSION>.x86_64.<file_format>
```

Where `<VERSION>` is replaced with the SSR version to download.

### Listing Available ISOs from the Command Line
To view ISOs available for download, type the command below. Here, egrep is used to filter the results to 5.4.x.
#### Username and Token based listing
```
# curl -u username:token https://software.128technology.com/artifactory/list/generic-128t-isos-release-local/5.4/ | egrep '5\.4'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   911    0   911    0     0   2853      0 --:--:-- --:--:-- --:--:--  2846
<title>Index of generic-128t-isos-release-local/5.4</title>
<h1>Index of generic-128t-isos-release-local/5.4</h1>
<a href="128T-5.4.0-104.el7.OTP.v1.x86_64.iso">128T-5.4.0-104.el7.OTP.v1.x86_64.iso</a>                 18-Nov-2021 19:54  1.54 GB
<a href="128T-5.4.0-104.el7.OTP.v1.x86_64.iso.sha256sum">128T-5.4.0-104.el7.OTP.v1.x86_64.iso.sha256sum</a>       18-Nov-2021 19:54  64 bytes
<a href="128T-5.4.0-104.el7.OTP.v1.x86_64.iso.sha256sum.asc">128T-5.4.0-104.el7.OTP.v1.x86_64.iso.sha256sum.asc</a>   18-Nov-2021 19:54  821 bytes
```

#### Certificate based listing
To view ISOs available for download, type the command below. Here, egrep is used to filter the results to 4.2.x.
```
# curl --cert /etc/pki/128technology/release.pem https://yum.128technology.com/isos/ | egrep '4\.2'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.0-2.el7.x86_64.iso">128T-4.2.0-2.el7.x86_64.iso</a></td><td align="right">2019-12-09 19:16  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.0-2.el7.x86_64.qcow2">128T-4.2.0-2.el7.x86_64.qcow2</a></td><td align="right">2020-01-22 20:05  </td><td align="right">5.2G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.1-1.el7.x86_64.iso">128T-4.2.1-1.el7.x86_64.iso</a></td><td align="right">2019-12-14 16:23  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.2-1.el7.x86_64.iso">128T-4.2.2-1.el7.x86_64.iso</a></td><td align="right">2019-12-21 00:21  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.3-1.el7.x86_64.iso">128T-4.2.3-1.el7.x86_64.iso</a></td><td align="right">2020-01-30 03:57  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.4-1.el7.v1.x86_64.iso">128T-4.2.4-1.el7.v1.x86_64.iso</a></td><td align="right">2020-02-14 22:05  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.5-2.el7.OTP.v1.x86_64.iso">128T-4.2.5-2.el7.OTP.v1.x86_64.iso</a></td><td align="right">2020-03-28 16:33  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.5-2.el7.v1.x86_64.iso">128T-4.2.5-2.el7.v1.x86_64.iso</a></td><td align="right">2020-03-28 19:05  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.6-1.el7.OTP.v1.x86_64.iso">128T-4.2.6-1.el7.OTP.v1.x86_64.iso</a></td><td align="right">2020-04-08 22:18  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-4.2.6-1.el7.v1.x86_64.iso">128T-4.2.6-1.el7.v1.x86_64.iso</a></td><td align="right">2020-04-09 02:50  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.0-1.el7.x86_64.iso">128T-OTP-4.2.0-1.el7.x86_64.iso</a></td><td align="right">2019-12-09 19:22  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.0-2.el7.x86_64.iso">128T-OTP-4.2.0-2.el7.x86_64.iso</a></td><td align="right">2019-12-09 19:28  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.1-1.el7.x86_64.iso">128T-OTP-4.2.1-1.el7.x86_64.iso</a></td><td align="right">2019-12-14 01:14  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.2-1.el.x86_64.iso">128T-OTP-4.2.2-1.el.x86_64.iso</a></td><td align="right">2019-12-20 17:22  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.3-1.el7.x86_64.iso">128T-OTP-4.2.3-1.el7.x86_64.iso</a></td><td align="right">2020-01-27 20:06  </td><td align="right">1.3G</td></tr>
<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="128T-OTP-4.2.4-1.el7.x86_64.iso">128T-OTP-4.2.4-1.el7.x86_64.iso</a></td><td align="right">2020-02-14 19:17  </td><td align="right">1.3G</td></tr>
100  8372    0  8372    0     0  12938      0 --:--:-- --:--:-- --:--:-- 12959
```
:::note
Select the appropriate image for your needs.
:::

#### Verifying Install Media

Each ISO image has corresponding checksum to ensure that the image has not been tampered withor corrupted on transfer. The checksum file contains all the checksums for all hosted ISOs. The name of the checksum file is sha256sum.txt.

To verify the ISO image, run the following command and check the output with the contents of the associated .sha256sum file:

- Linux: `sha256sum <iso_file>`
- OSX: `shasum -a 256 <iso_file>`

Both commands generate the checksum of the file. For example:

```
sha256sum 128T-5.1.3-1.el7.OTP.v3.x86_64.iso 
443f4fa3f0862e5712af16bf3f245ced06e09a957800a641e35f74d225f29d14 128T-5.1.3-1.el7.OTP.v3.x86_64.iso
```
To verify the checksum, run the following command to compare it against the checksum provided in the download.
- Linux:
```
sha256sum -c sha256sum.txt 2>&1 | grep 128T-5.1.3-1.el7.OTP.v3.x86_64.iso
128T-5.1.3-1.el7.OTP.v3.x86_64.iso: OK
```
- OSX:
```
shasum -a 256 -c sha256sum.txt 2>&1 | grep 128T-5.1.3-1.el7.OTP.v3.x86_64.iso
128T-5.1.3-1.el7.OTP.v3.x86_64.iso: OK
```
:::note
Ommitting the `grep` will generate validation errors for missing ISO's (ones that were not downloaded), and obscure the valid ISO. 
:::

If the checksum validation fails, re-attempt the download. If the error message persists, please contact technical support immediately.

### Downloading from a Web Browser Using a Certificate

In order for the certificate to be imported into a browser, it must first be transformed into the PFX format. Use openssl from a Linux, Macintosh, or Windows 10 Subsystem for Linux shell.

:::note
This procedure is not necessary if you have a username and token.
:::

With your client certificate (i.e. 128T-0000XXX.pem) in the current directory, run the following command:

```
openssl pkcs12 -inkey 128T-0000XXX.pem -in 128T-0000XXX.pem -export -out 128T-0000XXX.pfx
```

Import the transformed client certificate into your browser. The imported client certificate allows you to browse and download from the folder located at `https://yum.128technology.com/isos`.

![ISO Listing](/img/intro_downloading_iso_8.png)

### Importing PFX File to Firefox

1. Open Firefox and select **Preferences** from the menu in the upper right corner.

![Firefox Preferences](/img/intro_downloading_iso_1.png)

2. Select **Privacy and Security**:

![Firefox Security Settings](/img/intro_downloading_iso_2.png)

3. Select **View Certificates**:

![Firefox Certificate Settings](/img/intro_downloading_iso_3.png)

4. Select the **Your Certificates** tab:

![Firefox Certificate Manager](/img/intro_downloading_iso_4.png)

5. Select the **Import** button:

![Import Certificate Finder](/img/intro_downloading_iso_5.png)

6. Click [OPEN] to select the PFX form of the certificate. The password prompt is displayed:

![Password Prompt](/img/intro_downloading_iso_6.png)

7. No password is necessary to import the certificate, so click **OK**:

![Firefox Certificate Manager 2](/img/intro_downloading_iso_7.png)

### Downloading an ISO in Windows using Microsoft Edge, Explorer, and Chrome Browsers:

1. Open the browser and open the Settings page. 
2. Search for Manage user certificates.
3. Select **Manage user certificates** to open the certmgr.msi utility. Another option is to open a command line window and enter the command: certmgr
4. Open the Personal folder and then the Certificates folder.

![Manage User Certificates](/img/intro_downloading_iso_9.png)

5. From the **Action** menu at the top of the window select **All Tasks**.  
6. Choose **Import…** from the drop down. This opens the Certificate Import Wizard.
7. Click **Next** button in the wizard.
8. Browse to the .PFX certificate file, select the file and click **Next**.
9. On the next screen verify that the **Place all certificate in the following store** radio button is selected, and the chosen certificate store is **Personal**:

![Certificate Import Wizard](/img/intro_downloading_iso_10.png)

10. Select **Next** again.
11. Click **Finish**

The certificate is provisioned in Windows. Use Edge, Explorer, or Chrome to navigate to the `https://yum.128technology.com/isos` web page and download the desired ISO.

## Deployment using QCOW2

The SSR software can now be downloaded as a qcow2 image. Qcow2 is a storage format for virtual disks. The SSR qcow2 is a virtual hard disk image pre-installed with the SSR ISO. It includes cloud-init packages for linux network provisioning and for disk volume dynamic expansion on first boot to support OpenStack VM deployments. Any operations beyond bootstrapping the OS layer are not supported. 

For successful SSR qcow2 deployment, a cloud-init configuration **must** provide persistent network interface bindings and be run on first boot of the VM; otherwise the SSR will not correlate virtual machine NICs to router interfaces, and they may change across VM reboots. Operation of SSR qcow2 without cloud-init is not supported at this time.

Download the qcow2 image using the link below:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-images-release-local

Use the OpenStack management tool to load the image into your virtual environment, or deploy it directly from the hypervisor. The VM then boots using the pre-installed software.

The steps used for deployment vary depending on the hypervisor used for the environment and the management tool. For example, qcow2 can be deployed directly to a KVM hypervisor, or it can be deployed via KVM that is being managed as part of an OpenStack cluster. It is recommended that you refer to your hypervisor’s documentation for supporting information.

Supported Hypervisors

- KVM

Supported Management Environments

- OpenStack
