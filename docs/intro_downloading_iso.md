---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

128 Technology provides two workflows for the installation process:

- **Interactive:** Installation is done via a serial console or VGA. An interactive session is started to configure network interfaces, passwords, node name and type, and conductor IP (if applicable) before the 128T software is started.

- **One Touch Provisioning (OTP):** This is the preferred method of installation. Sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP bootstrap process will install and configure the router.

Prior to versions 4.5.6-1 and 5.0.0-1 v2 there were two separate ISO’s available:

- 128T-4.5.5-1.el7.OTP.v1.x86_64.iso – OTP ISO
- 128T-4.5.5-1.el7.v1.x86_64.iso - Interactive (Refer to [Installing Using the Pre-5.0 Interactive ISO](legacy_OTP_install.md) for additional information)

With releases 4.5.6-1 and 5.0.0-1 v2 (and greater), we now provide a single ISO that supports both  the OTP and Interactive Installation workflows.

- 128T-4.5.6-1.el7.OTP.v1.x86_64.iso
- 128T-5.0.0-1.el7.OTP.v2.x86_64.iso

The 128T Software package is available from our public servers located at: `https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/` using the username and token provided to you. The username/token simplifies access and does not require the conversion process used for the certificate. With the latest release of the 128T Installer, both a certificate or username/token can be used for installation. However, to use a username/token for software access, Installer 3.0.0 is required. 

Juniper highly recommends upgrading your Conductor to 4.5.7, 5.0.1, or 5.1.1. These versions contain updates for using a username/token for software access. If a username/token is used and the 128T software is not upgraded, a manual process must be followed each time the username/token is changed. See [Manual Token Process](intro_installation_installer.md#manual-token-process) for more information.

## Downloading an ISO

128 Technology ISOs are available from our public servers located at: `https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/` to users with an active account.

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page. If your client certificate or token is currently installed on your 128 Technology routers and conductors, you can download software updates from our yum servers or the web page. 

### Downloading from the Command Line

The ISO installation media is hosted at the same location as the 128T software packages, in the `isos` directory. To acquire the ISO, use the `curl` command. Specify the certificate or username and token obtained from 128 Technology with a valid software license.

#### Username and Token
```
curl -O -u <username>:<token> https://software.128technology.com/artifactory/list/generic-128t-legacy-isos-remote/128T-<VERSION>.el7.x86_64.iso
```

#### Certificate
```bash
curl -O --cert /etc/pki/128technology/release.pem https://yum.128technology.com/isos/128T-<VERSION>.el7.x86_64.iso
```

Where `<VERSION>` is replaced with the 128T version you are interested in.

### Listing Available ISOs from the Command Line
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

The successful output of the command produces the result:

```
128T-OTP-4.5.7-1.el7.x86_64.iso: OK
```

If the checksum validation fails, re-attempt the download. If the error message persists, please contact technical support immediately.

### Downloading from a Web Browser Using a Certificate

In order for the 128T certificate to be imported into a browser, it must first be transformed into the PFX format. Use openssl from a Linux, Macintosh, or Windows 10 Subsystem for Linux shell.

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
