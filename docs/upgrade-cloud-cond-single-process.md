---
title: Standalone Cloud Conductor Upgrade Process
sidebar_label: Standalone Cloud Conductor Upgrade
---

This procedure deploys a single-node (standalone) Session Smart conductor in Azure from the BYOL marketplace image, using an ARM template, a parameters file, and a `cloud-init `file. Allow about 30 minutes to complete the process.

## Environment

| Item | Value |
|---|---|
| Resource group | `ssr-conductor-rg` |
| Region | `eastus` |
| VNet / subnet | `ssr-vnet` / `conductor-subnet` |
| Managed identity | `ssr-conductor-identity` |
| Conductor | SSR node `node0` (hostname and asset ID `Conductor-node0`), VM `conductor-node0`, IP `10.0.1.10`, zone 1 |
| Public IP | no |
| Conductor name | `Conductor` |
| SSR version | `7.2.3` |

## Network Topology

The standalone SSR conductor is one Azure VM with a **single NIC** in an existing subnet. Inside the VM, SSR sees that NIC as `ge-0-0`, and it carries the conductor (control) traffic from managed routers. There is no second node, so there is no HA sync or fabric interface.

```text
Resource group ssr-conductor-rg (eastus) - created: VM, NIC, NSG

┌─ Azure VM conductor-node0 ────────┐
│ zone 1                            │
│ SSR router Conductor, node node0  │
│ hostname Conductor-node0          │
│                                   │
│ ge-0-0  10.0.1.10                 │
│   conductor address               │
└───┬───────────────────────────────┘
    │ NIC appears in the VM as ge-0-0
┌───┴───────────────────────────────┐
│ NIC conductor-node0-control       │
│   static IP 10.0.1.10             │
│   tag SSR-ROLE=MGMT               │
│ NSG conductor-node0-control       │
│ no public IP                      │
└───┬───────────────────────────────┘
════╧════════════════════════════════
 Subnet conductor-subnet in VNet ssr-vnet (existing)
 Inbound, allowed by the NSG:
   routers  TCP 930, 933, 4505-4506  from 0.0.0.0/0
   admins   TCP 22, 443              from 0.0.0.0/0
 Outbound: HTTPS to the SSR software repository (install and upgrades)
```

| SSR term (inside the VM) | Azure resource (outside the VM) | Details |
|---|---|---|
| Conductor router `Conductor`, node `node0` | VM `conductor-node0` (zone 1) | One VM from the BYOL marketplace image, deployed from the ARM template. Hostname (also the asset ID) `Conductor-node0`. |
| Interface `ge-0-0` | NIC `conductor-node0-control` | The only NIC on the VM, so SSR names it `ge-0-0`. Tagged `SSR-ROLE=MGMT`; accelerated networking and IP forwarding enabled. |
| Node IP (`node-ip`), the conductor address | Static private IP `10.0.1.10` | The NIC IP (template `controlPrivateIp`) and the cloud-init `node-ip` are the same value. Managed routers connect to this address (or to the public IP). |
| - | NSG `conductor-node0-control` | Inbound allow: TCP 22, 443 from `0.0.0.0/0`; TCP 930 (router control), 933 (secure onboarding), 4505-4506 (salt) from `0.0.0.0/0`. |
| - | No public IP | Routers and administrators reach the conductor on its private IP (VNet peering, VPN or ExpressRoute). |
| - | VNet `ssr-vnet`, subnet `conductor-subnet` | Existing, not created by the template. Needs outbound HTTPS for the SSR download. |

## Prerequisites

- The resource group, VNet, subnet and managed identity listed above exist. The conductor's IP is free in the subnet.
- The subnet has outbound HTTPS access to download the SSR software.
- Azure Cloud Shell (PowerShell) with permission to deploy to the resource group.
- The three deployment files below, uploaded to one Cloud Shell directory (Manage files > Upload). Run every Cloud Shell command from that directory.
- A terminal with an SSH client and the private key that matches the SSH public key in the parameters file. It must reach the conductor on TCP 22 at its private IP (`10.0.1.10`), from an address inside the admin allowed range `0.0.0.0/0`.

## Files

| File | Purpose |
|---|---|
| `conductor_template.json` | ARM template for the conductor node |
| `conductor-node0-params.json` | Template parameters for the conductor |
| `conductor-node0-cloud-init.txt` | cloud-init with the SSR onboarding configuration |

:::important
The cloud-init file contains the repository token. Keep it private and delete it from Cloud Shell when the procedure is complete.
:::

## Process Overview - How It Works

### Where Each Command Runs

Azure Cloud Shell is only used for Azure operations: deploying the VM and, if needed, rolling it back. Everything that happens on the conductor runs in an SSH session on it, as root, or in the SSR command line (PCLI) opened from that session. Each step says where it runs:

| Run in | What it is |
|---|---|
| Azure Cloud Shell (PowerShell) | `az` commands, one per line. Copy the whole block. |
| Your terminal (SSH client) | Opens the SSH session to the conductor and becomes root with `sudo -i`. |
| conductor root shell | The root session on the conductor. Multi-line blocks are pasted as a whole. Keep it open until the end. |
| conductor PCLI (admin) | The SSR command line on the conductor, used to accept the conductor's own asset. Each PCLI step starts with `su admin` in the conductor root shell, which opens the PCLI (the prompt becomes `admin@node0.Conductor#`), and ends with `quit`, which returns to the root shell. Enter PCLI commands one at a time, pressing Enter after each one. |

### Timing and What to Expect

Allow about 30 minutes in total. The deployment command takes up to about 2 minutes. The conductor then downloads, installs and initializes SSR by itself and **reboots twice**: once into the newly installed SSR software, and once after the conductor is initialized. This typically takes 5-15 minutes, and longer if the software download is slow. Each reboot closes your SSH session with a message such as `Connection to ... closed by remote host`. That is normal and not a failure. To watch the reboot cycle, attach to the VM's serial console (Azure portal: the VM > Help > Serial console); the template enables the boot diagnostics it needs.

The status command prints one line per minute with the time, the uptime (it drops back to a few minutes after each reboot) and the phase:

| Phase | What the conductor is doing | Typical duration |
|---|---|---|
| `INSTALLING` | Downloading and installing the SSR software. Ends with the first reboot. | Most of the 5-15 minutes; longer on a slow download |
| `STARTING` | Booting, or waiting for the bootstrapper or SSR to start. | 1-3 minutes after each reboot |
| `INITIALIZING` | Setting up the conductor. Ends with the second reboot. | A few minutes |
| `READY` | Done. The status command stops and lists the conductors. | - |
| `FAILED` | The bootstrapper stopped with an error. See Troubleshooting. | - |

While the conductor is `INSTALLING`, `STARTING` or `INITIALIZING`:

- **Let it work.** When your session closes, wait 2-3 minutes, reconnect, run `sudo -i`, and paste the status command again.
- **Do not** restart, stop or redeploy the VM.
- **Do not** use `az vm run-command`. Azure runs only one run-command per VM at a time, and a command sent while the VM is rebooting can stay pending for a long time and block every command after it.
- Only act when the status shows `FAILED`, or when the conductor has not reached `READY` after 60 minutes.

## Rebuilding the Azure Cloud Conductor 

### Step 1: Confirm the Azure Subscription

**Run in:** Azure Cloud Shell (PowerShell)

Make sure Cloud Shell targets the subscription that contains the resource group. If not, run `az account set --subscription <name-or-id>`.

```powershell
az account show --query '[name, id]' --output 'tsv'
```

Expected: The target subscription name and ID.

### Step 2: Accept the Marketplace Image Terms

**Run in:** Azure Cloud Shell (PowerShell)

Required once per subscription for the BYOL image. Safe to repeat.

```powershell
az vm image terms accept --publisher 'juniper-networks' --offer 'session-smart-networking-payg' --plan 'session-smart-networking-public-gen2-byol' --query 'accepted' --output 'tsv'
```

Expected: `true`

### Step 3: Deploy the Conductor

**Run in:** Azure Cloud Shell (PowerShell)

Creates conductor-node0 from the template. The cloud-init file is passed as the template's `customData` parameter. The deployment takes up to about 2 minutes. The conductor then installs and initializes SSR on its own and reboots twice, which typically takes 5-15 minutes (longer if the software download is slow). To watch the reboot cycle, attach to the VM's serial console: in the Azure portal open conductor-node0 and select Help > Serial console, or run `az serial-console connect --resource-group 'ssr-conductor-rg' --name 'conductor-node0'` in Cloud Shell (boot diagnostics, which the serial console needs, is enabled by the template).

```powershell
az deployment group create --resource-group 'ssr-conductor-rg' --name 'ssr-conductor-node0' --template-file 'conductor_template.json' --parameters '@conductor-node0-params.json' 'customData=@conductor-node0-cloud-init.txt' --query '[properties.provisioningState, properties.outputs.SSHLogin.value]' --output 'tsv'
```

Expected: `Succeeded` and the SSH command for the conductor, after up to about 2 minutes.

### Step 4: Connect to the Conductor

**Run in:** Your terminal (SSH client)

Open an SSH session to conductor-node0 and become root. Keep this session for every "conductor root shell" step. SSH usually answers 2-5 minutes after step 3; if it refuses or times out, wait a minute and retry. Your terminal must reach the private IP 10.0.1.10 (VNet peering, VPN, ExpressRoute or a jump host in the VNet). If the private key that matches the SSH public key in the parameters file is not your SSH client's default key or loaded in ssh-agent, add `-i <private key file>`.

```bash
ssh t128@10.0.1.10
sudo -i
```

Expected: A root prompt on conductor-node0. The hostname is still `conductor-node0` until the conductor is initialized.

### Step 5: Wait Until the Conductor is Initialized

**Run in:** Conductor `root` shell

Paste once and leave it running: It prints the phase every minute (see [Timing and What to Expect](#timing-and-what-to-expect)). The VM reboots by itself at least twice, which closes your SSH session. That is expected: Wait 2-3 minutes, reconnect with step 4, and paste this command again. **Do not restart or redeploy the VM, and do not use `az vm run-command`, while it is INSTALLING, STARTING or INITIALIZING.**

```bash
while :; do
  if systemctl is-failed --quiet 128T-hardware-bootstrapper; then phase='FAILED: the bootstrapper stopped with an error, see Troubleshooting'
  elif ! rpm -q --quiet 128T; then phase='INSTALLING: downloading and installing SSR, the VM reboots when done'
  elif systemctl is-active --quiet 128T-hardware-bootstrapper; then phase='INITIALIZING: setting up the conductor, the VM reboots when done'
  elif [ -f /etc/128technology/global.init ] && systemctl is-active --quiet 128T; then phase='READY'
  else phase='STARTING: waiting for the bootstrapper or SSR to start'; fi
  echo "$(date +%H:%M:%S)  $(uptime -p)  ${phase}"
  case "$phase" in READY|FAILED*) break ;; esac
  sleep 60
done
python3 -c 'import json; c = json.load(open("/etc/128technology/global.init"))["init"].get("conductor", {}); print("conductors in global.init:", ", ".join("%s=%s" % (n, v["host"]) for n, v in sorted(c.items())))' 2>/dev/null
pending=$(t128-salt-key --no-color -l unaccepted 2>/dev/null | sed 1d | paste -sd ' ' -)
echo "pending assets (not yet accepted): ${pending:-none}"
```

Expected: `READY`, then `conductors in global.init: node0=10.0.1.10` and the pending assets: `Conductor-node0` (the conductor's own asset, accepted in the next step; it can take a few minutes after `READY` to appear). `FAILED` means the bootstrapper stopped with an error (see [Troubleshooting](#troubleshooting)).

### Step 6: Accept the Conductor's Asset

**Run in:** Conductor PCLI (as `admin`)

In the conductor root shell, enter these commands one at a time, pressing `Enter` after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Setting the conductor's asset ID in the configuration accepts the conductor's pending asset; its salt-minion key is accepted automatically as soon as the asset ID is configured. The status command in step 5 listed the pending asset; if its ID differs from `Conductor-node0`, use that ID. `commit force` skips the confirmation prompt; validation still runs.

```pcli
su admin
config authority router Conductor node node0 asset-id Conductor-node0
commit force
show assets
quit
```

Expected: `Configuration committed`. In `show assets`, the conductor with asset ID `Conductor-node0` moves through `Synchronizing` to `Running` within a few minutes; run `show assets` again before `quit` to follow it.

### Step 7: Verify the Conductor

**Run in:** Conductor PCLI (as `admin`)

In the conductor root shell, enter these commands one at a time, pressing `Enter` after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Wait until the conductor's asset is `Running` (repeat `show assets`), then check the conductor's system state.

```pcli
su admin
show assets
show system
quit
```

Expected: `show assets` shows `Conductor-node0` as `Running`, and `show system` lists node `node0` as running, with role conductor and software version 7.2.3.

### Optional: Conductor Address for Managed Routers

**The standalone conductor is complete after step 7.** The following step tells managed routers how to reach the conductor. It is optional at this point because the address routers use (for example, a public IP) may only be known after deployment.

### Step 8 (Optional): Set the Conductor address for managed routers

**Run in:** Conductor PCLI (as `admin`)

In the conductor root shell, enter these commands one at a time, pressing `Enter` after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Sets `authority conductor-address`, the address managed routers receive in their configuration and use to reach the conductor. The command uses the private IP, which routers reach through VNet peering, VPN or ExpressRoute; use another address (for example a NAT or DNS name) if that is how routers reach the conductor. Do this before onboarding routers; it can also be done later. It changes the configuration of every managed router, and a conductor address can be an IP address or a DNS name.

```pcli
su admin
config authority conductor-address 10.0.1.10
commit force
quit
```

Expected: `Configuration committed`, then the conductor root shell prompt.

## Rollback

To remove the conductor (for example to retry the deployment), delete its resources, then re-run the procedure from the deploy step.

```powershell
az vm delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0' --yes; az network nic delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0-control'; az network nsg delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0-control'; az disk delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0' --yes
```

## Troubleshooting

Run these in the conductor root shell.

```bash
# Which bootstrapper task failed
cat /var/log/128T-hardware-bootstrapper/128T-hardware-bootstrapper.txt
# Download, install and onboarding errors
grep -nE "ERROR|Exiting with|stderr" /var/log/128T-hardware-bootstrapper/128T-hardware-bootstrapper.log | tail -n 30
# Conductor setup errors
grep -iE "error|fail|invalid" /var/log/128technology/initializer.log | tail -n 30
# SSR download progress
journalctl -u ember --no-pager | tail -n 40
# Onboarding configuration not written by cloud-init
tail -n 30 /var/log/cloud-init-output.log
```

- **`INSTALLING` for more than 60 minutes:** Check the SSR download progress. Usual causes are a wrong repository user or token, or no outbound HTTPS from the subnet.

- **`FAILED`:** The task table shows which task failed. When the initializer fails, the bootstrapper log reports it as `Error enabling release repo`; the real cause is in the `stderr` part of that line and in the initializer log. On failure, a tech-support bundle is saved at `/var/log/128T-hardware-bootstrapper/hardware-bootstrapper-tech-support.zip`.

- **An asset stays `Pending`, or `show assets` shows a configured asset that never connects:** The asset ID in the configuration must equal the node's salt minion ID, which is its hostname (`Conductor-node0`). In the conductor root shell, `t128-salt-key -L` lists the IDs that are waiting (`Unaccepted Keys`) and accepted. Set the asset ID in the PCLI to the listed ID and commit again. A pending key that is not accepted within 10 minutes is dropped and sent again by the node, so it can briefly disappear from the list.

- **SSH refused or timing out:** The conductor is booting or rebooting; wait 2-3 minutes. If it persists, check that your terminal's address is inside the admin allowed range and that nothing else (a subnet NSG, a firewall) blocks TCP 22.

- **No SSH access at all:** As a last resort, read a log from Cloud Shell with `az vm run-command invoke --resource-group '<resource group>' --name '<vm>' --command-id RunShellScript --scripts 'tail -n 50 <log file>' --query 'value[0].message' --output tsv`. Send one command at a time, wait for it to return, and never send one while the conductor is rebooting.
