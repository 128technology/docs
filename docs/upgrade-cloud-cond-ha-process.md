---
title: High Availability Cloud Conductor Upgrade Process
sidebar_label: High Availability Cloud Conductor Upgrade
---

This procedure deploys a two-node highly available Session Smart conductor (node0 and node1) in Azure from the BYOL marketplace image, using an ARM template, a parameters file per node and a cloud-init file per node. Allow 60-90 minutesto complete the process.

## Environment

| Item | Value |
|---|---|
| Resource group | `ssr-conductor-rg` |
| Region | `eastus` |
| VNet / subnet | `ssr-vnet` / `conductor-subnet` |
| Managed identity | `ssr-conductor-identity` |
| node0 | SSR node `node0` (hostname and asset ID `Conductor-node0`), VM `conductor-node0`, IP `10.0.1.10`, zone 1 |
| node1 | SSR node `node1` (hostname and asset ID `Conductor-node1`), VM `conductor-node1`, IP `10.0.1.11`, zone 2 |
| Public IPs | no |
| Conductor name | `Conductor` |
| SSR version | `7.2.3` |

## Network topology

Each SSR conductor node is one Azure VM with a **single NIC** in the same existing subnet. Inside the VM, SSR sees that NIC as `ge-0-0`, and it carries both the conductor (control) traffic from managed routers and the HA sync between the two nodes. No separate HA sync or fabric NIC is deployed.

```text
Resource group ssr-conductor-rg (eastus) - created per node: VM, NIC, NSG

┌─ Azure VM conductor-node0 ────────┐              ┌─ Azure VM conductor-node1 ────────┐
│ zone 1                            │              │ zone 2                            │
│ SSR router Conductor, node node0  │              │ SSR router Conductor, node node1  │
│ hostname Conductor-node0          │              │ hostname Conductor-node1          │
│                                   │    HA sync   │                                   │
│ ge-0-0  10.0.1.10                 │<────────────>│ ge-0-0  10.0.1.11                 │
│   conductor address + HA sync     │              │   conductor address + HA sync     │
└───┬───────────────────────────────┘              └───┬───────────────────────────────┘
    │ NIC appears in the VM as ge-0-0                  │ NIC appears in the VM as ge-0-0
┌───┴───────────────────────────────┐              ┌───┴───────────────────────────────┐
│ NIC conductor-node0-control       │              │ NIC conductor-node1-control       │
│   static IP 10.0.1.10             │              │   static IP 10.0.1.11             │
│   tag SSR-ROLE=MGMT               │              │   tag SSR-ROLE=MGMT               │
│ NSG conductor-node0-control       │              │ NSG conductor-node1-control       │
│ no public IP                      │              │ no public IP                      │
└───┬───────────────────────────────┘              └───┬───────────────────────────────┘
════╧══════════════════════════════════════════════════╧════════════════════════════════
 Subnet conductor-subnet in VNet ssr-vnet (existing)
 Inbound, allowed by each node's NSG:
   routers  TCP 930, 933, 4505-4506  from 0.0.0.0/0
   admins   TCP 22, 443              from 0.0.0.0/0
   HA peer  all ports                from the other node's IP only (/32)
 Outbound: HTTPS to the SSR software repository (install and upgrades)
```

| SSR term (inside the VM) | Azure resource (outside the VM) | Details |
|---|---|---|
| Conductor router `Conductor`, nodes `node0` / `node1` | VMs `conductor-node0` / `conductor-node1` (zone 1 / zone 2) | One VM per node from the BYOL marketplace image, deployed from the same ARM template. Hostnames (also the asset IDs) `Conductor-node0` / `Conductor-node1`. The MOP calls the nodes node0 and node1 whatever their SSR node names are. |
| Interface `ge-0-0` | NICs `conductor-node0-control` / `conductor-node1-control` | The only NIC on each VM, so SSR names it `ge-0-0` (NICs become `ge-0-0`, `ge-0-1`, ... in attach order). Tagged `SSR-ROLE=MGMT`; accelerated networking and IP forwarding enabled. |
| Node IP (`node-ip`), the conductor address | Static private IPs `10.0.1.10` / `10.0.1.11` | The NIC IP (template `controlPrivateIp`) and the cloud-init `node-ip` are the same value. Managed routers connect to both addresses. |
| HA sync interface (node1 `ha-peer-ip` = `10.0.1.10`) | Same NIC and IP; no HA sync NIC | Conductor-to-conductor sync runs over `ge-0-0` through the subnet. Hardware conductors use a dedicated HA sync NIC on `169.254.253.x` (`clustered`), which an Azure VNet cannot carry. |
| HA fabric interface | None | Conductors do not forward session traffic, so there is no fabric link. |
| - | NSGs `conductor-node0-control` / `conductor-node1-control`, one per NIC | Inbound allow: TCP 22, 443 from `0.0.0.0/0`; TCP 930 (router control), 933 (secure onboarding), 4505-4506 (salt) from `0.0.0.0/0`; all traffic from the HA peer's IP. |
| - | No public IP | Routers and administrators reach the nodes on their private IPs (VNet peering, VPN or ExpressRoute). |
| - | VNet `ssr-vnet`, subnet `conductor-subnet` | Existing, not created by the template. Needs outbound HTTPS for the SSR download and must allow traffic between the two nodes. |

## Prerequisites

- The resource group, VNet, subnet and managed identity listed above exist. The two node IPs are free in the subnet.
- The subnet has outbound HTTPS access to download the SSR software, and allows traffic between the two nodes.
- Azure Cloud Shell (PowerShell) with permission to deploy to the resource group.
- The five deployment files below, uploaded to one Cloud Shell directory (Manage files > Upload). Run every Cloud Shell command from that directory.
- A terminal with an SSH client and the private key that matches the SSH public key in the parameters files. It must reach the nodes on TCP 22 at their private IPs (`10.0.1.10`, `10.0.1.11`), from an address inside the admin allowed range `0.0.0.0/0`.

## Files

| File | Purpose |
|---|---|
| `conductor_template.json` | ARM template for one conductor node (deployed once per node) |
| `conductor-node0-params.json` / `conductor-node1-params.json` | Template parameters for node0 / node1 |
| `conductor-node0-cloud-init.txt` / `conductor-node1-cloud-init.txt` | cloud-init with the SSR onboarding configuration for node0 / node1 |

> The cloud-init files contain the repository token and a temporary password. Keep them private and delete them from Cloud Shell when the procedure is complete.

## Process Overview - How It Works

### Where Each Command Runs

Azure Cloud Shell is only used for Azure operations: deploying the two VMs and, if needed, rolling them back. Everything that happens on a node runs in an SSH session on that node, as root, or in the SSR command line (PCLI) opened from that session. Each step says where it runs:

| Run in | What it is |
|---|---|
| Azure Cloud Shell (PowerShell) | `az` commands, one per line. Copy the whole block. |
| Your terminal (SSH client) | Opens the SSH session to a node and becomes root with `sudo -i`. |
| node0 root shell / node1 root shell | The root session on that node. Multi-line blocks are pasted as a whole. Keep both sessions open until the end. |
| node0 PCLI (admin) | The SSR command line on node0, used to accept the conductor assets and add node1 to the configuration. Each PCLI step starts with `su admin` in the node0 root shell, which opens the PCLI (the prompt becomes `admin@node0.Conductor#`), and ends with `quit`, which returns to the root shell. Enter PCLI commands one at a time, pressing Enter after each one. |

### Timing and What to Expect

Allow about 60 minutes in total. Each deployment command takes up to about 2 minutes. The node then downloads, installs and initializes SSR by itself and **reboots twice**: once into the newly installed SSR software, and once after the conductor is initialized. This typically takes 5-15 minutes per node, and longer if the software download is slow. Each reboot closes your SSH session with a message such as `Connection to ... closed by remote host`. That is normal and not a failure. To watch the reboot cycle, attach to the VM's serial console (Azure portal: the VM > Help > Serial console); the template enables the boot diagnostics it needs.

The status command prints one line per minute with the time, the uptime (it drops back to a few minutes after each reboot) and the phase:

| Phase | What the node is doing | Typical duration |
|---|---|---|
| `INSTALLING` | Downloading and installing the SSR software. Ends with the first reboot. | Most of the 5-15 minutes; longer on a slow download |
| `STARTING` | Booting, or waiting for the bootstrapper or SSR to start. | 1-3 minutes after each reboot |
| `INITIALIZING` | Setting up the conductor (on node1: copying the setup from node0). Ends with the second reboot. | A few minutes |
| `READY` | Done. The status command stops and lists the conductors. | - |
| `FAILED` | The bootstrapper stopped with an error. See Troubleshooting. | - |

While a node is `INSTALLING`, `STARTING` or `INITIALIZING`:

- **Let it work.** When your session closes, wait 2-3 minutes, reconnect, run `sudo -i`, and paste the status command again.
- **Do not** restart, stop or redeploy the VM.
- **Do not** use `az vm run-command`. Azure runs only one run-command per VM at a time, and a command sent while the VM is rebooting can stay pending for a long time and block every command after it.
- Only act when the status shows `FAILED`, or when the node has not reached `READY` after 60 minutes.

## Rebuilding the Azure Cloud Conductors 

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

### Step 3: Deploy `node0`

**Run in:** Azure Cloud Shell (PowerShell)

Creates conductor-node0 from the template. The cloud-init file is passed as the template's `customData` parameter. The deployment takes up to about 2 minutes. The node then installs and initializes SSR on its own and reboots twice, which typically takes 5-15 minutes (longer if the software download is slow). To watch the reboot cycle, attach to the VM's serial console: in the Azure portal open conductor-node0 and select Help > Serial console, or run `az serial-console connect --resource-group 'ssr-conductor-rg' --name 'conductor-node0'` in Cloud Shell (boot diagnostics, which the serial console needs, is enabled by the template).

```powershell
az deployment group create --resource-group 'ssr-conductor-rg' --name 'ssr-conductor-node0' --template-file 'conductor_template.json' --parameters '@conductor-node0-params.json' 'customData=@conductor-node0-cloud-init.txt' --query '[properties.provisioningState, properties.outputs.SSHLogin.value]' --output 'tsv'
```

Expected: `Succeeded` and the SSH command for node0, after up to about 2 minutes.

### Step 4: Connect to `node0`

**Run in:** Your terminal (SSH client)

Open an SSH session to conductor-node0 and become root. Keep this session for every "node0 root shell" step. SSH usually answers 2-5 minutes after step 3; if it refuses or times out, wait a minute and retry. Your terminal must reach the private IP 10.0.1.10 (VNet peering, VPN, ExpressRoute or a jump host in the VNet). If the private key that matches the SSH public key in the parameters files is not your SSH client's default key or loaded in ssh-agent, add `-i <private key file>`.

```bash
ssh t128@10.0.1.10
sudo -i
```

Expected: A root prompt on conductor-node0. The hostname is still `conductor-node0` until the conductor is initialized.

### Step 5: Wait Until `node0` is Initialized

**Run in:** node0 root shell

Paste once and leave it running: it prints the phase every minute (see "Timing and what to expect"). The VM reboots by itself at least twice, which closes your SSH session. That is expected: wait 2-3 minutes, reconnect with step 4, and paste this command again. Do not restart or redeploy the VM, and do not use `az vm run-command`, while it is INSTALLING, STARTING or INITIALIZING.

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

Expected: `READY`, then `conductors in global.init: node0=10.0.1.10` and the pending assets: `Conductor-node0` (node0's own asset, accepted in the next step; it can take a few minutes after `READY` to appear). `FAILED` means the bootstrapper stopped with an error (see Troubleshooting).

### Step 6: Accept `node0`'s Asset

**Run in:** node0 PCLI (as `admin`)

In the node0 root shell, enter these commands one at a time, pressing Enter after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Setting node0's asset ID in the configuration accepts node0's pending asset: its salt minion key is accepted automatically as soon as the asset ID is configured. The status command in step 5 listed the pending asset; if its ID differs from `Conductor-node0`, use that ID. `commit force` skips the confirmation prompt; validation still runs.

```pcli
su admin
config authority router Conductor node node0 asset-id Conductor-node0
commit force
show assets
quit
```

Expected: `Configuration committed`. In `show assets`, node0 with asset ID `Conductor-node0` moves through `Synchronizing` to `Running` within a few minutes; run `show assets` again before `quit` to follow it.

### Step 7: Add node1 to the conductor configuration

**Run in:** node0 PCLI (as `admin`)

In the node0 root shell, enter these commands one at a time, pressing Enter after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Adds node1 (SSR node `node1`) as the second conductor node of the conductor router, so that node1 finds its own node in the configuration it receives from node0 when it joins. node1 is reported as not connected until then, which is expected.

```pcli
su admin
config authority router Conductor node node1 role conductor
commit force
quit
```

Expected: `Configuration committed`, then the `node0` root shell prompt.

### Step 8: Open Temporary HA Peer Access on `node0`

**Run in:** node0 root shell

This allows `node1` (10.0.1.11) log in to `node0` as t128 with the temporary HA peer password, which node1's initializer needs to copy the conductor setup from `node0`. It sets the temporary password, makes sudo ask t128 for it, allows SSH password login for t128 only from node1, and then tests both. This automates "Configure Node A" in the Conductor HA for Cloud Deployments documentation. Paste the whole block. Keep this root shell open: from now on `sudo -i` on `node0` asks for the temporary password. Step 12 reverts it.

```bash
bash -euo pipefail <<'HA_PEER_OPEN'
printf '%s\n' 't128:<input-temporary-ha-peer-password>' | chpasswd
printf '%s\n' 't128 ALL=(ALL) ALL' > /etc/sudoers.d/zz-ha-peer
chmod 440 /etc/sudoers.d/zz-ha-peer
visudo -cq
sed -i --follow-symlinks '/^# BEGIN ha-peer$/,/^# END ha-peer$/d' /etc/ssh/sshd_config
printf '%s\n' '# BEGIN ha-peer' 'Match User t128 Address 10.0.1.11/32' '    PasswordAuthentication yes' '# END ha-peer' >> /etc/ssh/sshd_config
sshd -t
systemctl reload sshd
if su - t128 -c 'sudo -k; sudo -n true' >/dev/null 2>&1; then echo 'ERROR: sudo still lets t128 run commands without a password'; exit 1; fi
sshd -T -C user=t128,host=node1,addr=10.0.1.11 | grep -x 'passwordauthentication yes' >/dev/null || { echo 'ERROR: sshd does not accept a password for t128 from node1'; exit 1; }
echo HA_PEER_ACCESS_OPEN
HA_PEER_OPEN
```

Expected: `HA_PEER_ACCESS_OPEN`. If it prints `ERROR: ...` instead, fix that first (see Troubleshooting); do not deploy node1 yet.

### Step 9: Deploy `node1`

**Run in:** Azure Cloud Shell (PowerShell)

Creates `conductor-node1`. Only run this after step 8 printed `HA_PEER_ACCESS_OPEN`: node1's initializer logs in to node0 once, and a failed login stops it. The deployment takes up to about 2 minutes. The node then installs and initializes SSR on its own and reboots twice, which typically takes 5-15 minutes (longer if the software download is slow). To watch the reboot cycle, attach to the VM's serial console: in the Azure portal open conductor-node1 and select Help > Serial console, or run `az serial-console connect --resource-group 'ssr-conductor-rg' --name 'conductor-node1'` in Cloud Shell (boot diagnostics, which the serial console needs, is enabled by the template).

```powershell
az deployment group create --resource-group 'ssr-conductor-rg' --name 'ssr-conductor-node1' --template-file 'conductor_template.json' --parameters '@conductor-node1-params.json' 'customData=@conductor-node1-cloud-init.txt' --query '[properties.provisioningState, properties.outputs.SSHLogin.value]' --output 'tsv'
```

Expected: `Succeeded` and the SSH command for node1, after up to about 2 minutes.

### Step 10: Connect to `node1`

**Run in:** Your terminal (SSH client)

Open an SSH session to `conductor-node1` and become root. Keep this session for every "node1 root shell" step. SSH usually answers 2-5 minutes after step 9; if it refuses or times out, wait a minute and retry. Your terminal must reach the private IP 10.0.1.11 (VNet peering, VPN, ExpressRoute or a jump host in the VNet). If the private key that matches the SSH public key in the parameters files is not your SSH client's default key or loaded in ssh-agent, add `-i <private key file>`. Keep the node0 session open too.

```bash
ssh t128@10.0.1.11
sudo -i
```

Expected: A root prompt on conductor-node1. The hostname is still `conductor-node1` until the conductor is initialized.

### Step 11: Wait Until `node1` has Joined

**Run in:** node1 root shell

The same status command as step 5, with the same reboots and reconnects. node1 also logs in to node0 to copy the conductor setup.

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

Expected: `READY`, then `conductors in global.init: node0=10.0.1.10, node1=10.0.1.11`.

### Step 12: Close HA Peer Access on `node0`

**Run in:** node0 root shell

Removes the SSH password exception and the `sudo` rule, and resets t128 to the password from the onboarding configuration. The temporary password stops working. Paste the whole block. If your `node0` session was closed since step 8 (for example while node1 was joining), reconnect with step 4: `sudo -i` now asks for t128's password, which at this point is the temporary HA peer password (the `unsafe-ha-peer-password` in node1's cloud-init file).

```bash
bash -euo pipefail <<'HA_PEER_CLOSE'
sed -i --follow-symlinks '/^# BEGIN ha-peer$/,/^# END ha-peer$/d' /etc/ssh/sshd_config
sshd -t
systemctl reload sshd
rm -f /etc/sudoers.d/zz-ha-peer
visudo -cq
usermod -p '$6$tKPUQTblgtx4bGBK$sQ2hRcHeBlcuww8cu0NxHeOvpWKwxcqkTlGrgRY9ZtOk7dJBXzLnsldkyOZD.tWHv/MCdF/larhQEPQG.KWXd/' t128
if sshd -T -C user=t128,host=node1,addr=10.0.1.11 | grep -x 'passwordauthentication yes' >/dev/null; then echo 'WARNING: another sshd setting still accepts passwords for t128, see Troubleshooting'; fi
echo HA_PEER_ACCESS_CLOSED
HA_PEER_CLOSE
```

Expected: `HA_PEER_ACCESS_CLOSED`

### Step 13: Restart `node0`

**Run in:** node0 root shell

`node0` must restart to recognize `node1`. Your SSH session closes.

```bash
systemctl reboot
```

Expected: The session closes.

### Step 14: Wait Until `node0` is Back

**Run in:** node0 root shell

Wait 2-3 minutes, reconnect to node0 with step 4, and run the status command.

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

Expected: `READY`, `conductors in global.init: node0=10.0.1.10, node1=10.0.1.11`, and `Conductor-node1` among the pending assets (it can take a few minutes to appear; it is accepted in the next step either way).

### Step 15: Accept `node1`'s Asset

**Run in:** node0 PCLI (admin)

In the `node0` root shell, enter these commands one at a time, pressing Enter after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Setting node1's asset ID accepts node1's pending asset. If the pending asset listed in step 14 has a different ID than `Conductor-node1`, use that ID.

```pcli
su admin
config authority router Conductor node node1 asset-id Conductor-node1
commit force
show assets
quit
```

Expected: `Configuration committed`. In `show assets`, node1 with asset ID `Conductor-node1` moves through `Synchronizing` to `Running` within a few minutes.

### Step 16: Verify the HA Pair

**Run in:** node0 PCLI (admin)

In the `node0` root shell, enter these commands one at a time, pressing Enter after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Wait until both assets are `Running` (repeat `show assets`), then check that the conductor nodes see each other.

```pcli
su admin
show system connectivity
show assets
quit
```

Expected: `show system connectivity` lists node0 and node1 as connected, and `show assets` shows `Conductor-node0` and `Conductor-node1` as `Running`.

### Optional: Conductor Addresses for Managed Routers

The HA conductor is complete after step 16. The following steps tell managed routers to use both conductor nodes. They are optional at this point because the addresses routers use (for example public IPs) may only be known after deployment.

### Step 17 (optional): Set the Conductor Addresses for Managed Routers

**Run in:** node0 PCLI (admin)

In the `node0` root shell, enter these commands one at a time, pressing Enter after each one. `su admin` opens the PCLI (the prompt becomes `admin@node0.Conductor#`; if it shows a different router name, use that name in the commands), and `quit` returns to the root shell. Adds both conductor nodes to `authority conductor-address`. Managed routers receive this list in their configuration and connect to both conductor nodes, so a router keeps its conductor connection when one node is down. The commands use the private IPs, which routers reach through VNet peering, VPN or ExpressRoute; use other addresses (for example a NAT or DNS name) if that is how routers reach the nodes. Do this before onboarding routers; it can also be done later. It changes the configuration of every managed router, and a conductor address can be an IP address or a DNS name.

```pcli
su admin
config authority conductor-address 10.0.1.10
config authority conductor-address 10.0.1.11
commit force
quit
```

Expected: `Configuration committed`, then the `node0` root shell prompt.

## Rollback

To remove a node (for example to retry it), delete its resources. Re-run the procedure from that node's deploy step. If node1 is removed after it joined, also remove it from `node0` before redeploying.

```powershell
az vm delete --resource-group 'ssr-conductor-rg' --name 'conductor-node1' --yes; az network nic delete --resource-group 'ssr-conductor-rg' --name 'conductor-node1-control'; az network nsg delete --resource-group 'ssr-conductor-rg' --name 'conductor-node1-control'; az disk delete --resource-group 'ssr-conductor-rg' --name 'conductor-node1' --yes
az vm delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0' --yes; az network nic delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0-control'; az network nsg delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0-control'; az disk delete --resource-group 'ssr-conductor-rg' --name 'conductor-node0' --yes
```

## Troubleshooting

Run these in the root shell of the affected node.

```bash
# Which bootstrapper task failed
cat /var/log/128T-hardware-bootstrapper/128T-hardware-bootstrapper.txt
# Download, install and onboarding errors
grep -nE "ERROR|Exiting with|stderr" /var/log/128T-hardware-bootstrapper/128T-hardware-bootstrapper.log | tail -n 30
# Conductor and HA setup errors
grep -iE "error|fail|invalid" /var/log/128technology/initializer.log | tail -n 30
# SSR download progress
journalctl -u ember --no-pager | tail -n 40
# Onboarding configuration not written by cloud-init
tail -n 30 /var/log/cloud-init-output.log
```

- **`INSTALLING` for more than 60 minutes:** Check the SSR download progress. Usual causes are a wrong repository user or token, or no outbound HTTPS from the subnet.
- **`FAILED`:** The task table shows which task failed. When the initializer fails, the bootstrapper log reports it as `Error enabling release repo`; the real cause is in the `stderr` part of that line and in the initializer log. On failure, a tech-support bundle is saved at `/var/log/128T-hardware-bootstrapper/hardware-bootstrapper-tech-support.zip`.
- **node1 `FAILED` with `Error initializing SFTP client: EOF during negotiation` or `Invalid credentials for user 't128@10.0.1.10'`:** `node1` could not use the temporary HA peer access on node0 (sudo on node0 did not ask t128 for the password, or access was not open). On node0, run the open HA peer access step again until it prints `HA_PEER_ACCESS_OPEN`. Then retry on `node1` without redeploying it: run `systemctl start --no-block 128T-hardware-bootstrapper` and the status command.
- **`ERROR: sudo still lets t128 run commands without a password`:** A sudoers rule that sorts after `zz-ha-peer` grants t128 passwordless sudo. Find it with `grep -rn NOPASSWD /etc/sudoers /etc/sudoers.d/`, move it aside, and run the step again. Put it back after HA peer access is closed.
- **`ERROR: sshd does not accept a password for t128 from node1`:** Another sshd setting overrides the exception. Check `sshd -T -C user=t128,host=node1,addr=10.0.1.11 | grep -i authentication`.
- **`WARNING: another sshd setting still accepts passwords for t128`:** Use the command `grep -rni passwordauthentication /etc/ssh/sshd_config /etc/ssh/sshd_config.d/ /etc/128technology/ssh/sshd_config.d/` to find and remove it.
- **An asset stays `Pending`, or `show assets` shows a configured asset that never connects:** The asset ID in the configuration must equal the node's salt minion ID, which is its hostname (`Conductor-node0` / `Conductor-node1`). In the node0 root shell, `t128-salt-key -L` lists the IDs that are waiting (`Unaccepted Keys`) and accepted. Set the asset ID in the PCLI to the listed ID and commit again. A pending key that is not accepted within 10 minutes is dropped and sent again by the node, so it can briefly disappear from the list.
- **SSH refused or timing out:** The node is booting or rebooting; wait 2-3 minutes. If it persists, check that your terminal's address is inside the admin allowed range and that nothing else (a subnet NSG, a firewall) blocks TCP 22.
- **No SSH access at all:** As a last resort, read a log from Cloud Shell with `az vm run-command invoke --resource-group '<resource group>' --name '<vm>' --command-id RunShellScript --scripts 'tail -n 50 <log file>' --query 'value[0].message' --output tsv`. Send one command at a time, wait for it to return, and never send one while the node is rebooting.
