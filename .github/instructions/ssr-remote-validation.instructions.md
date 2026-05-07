---
applyTo: ".github/agents/ssr-doc-validator.agent.md"
description: "SSR remote SSH validation patterns — applies when running the ssr-doc-validator agent. Covers safe SSH command construction, PCLI invocation, installer automation, and report output conventions."
---

# SSR Remote Validation — SSH Patterns and Conventions

## SSH Command Safety Rules

- Always include `-o BatchMode=yes` on non-interactive SSH calls to prevent accidental password prompts.
- Always include `-o ConnectTimeout=10` to avoid hanging on unreachable hosts.
- Always include `-o StrictHostKeyChecking=no` only for test/validation environments. Never carry this into production guidance in documentation.
- Key permissions must be `600` before any SSH call or the connection will be refused.

## PCLI Invocation Pattern

The SSR PCLI can be invoked non-interactively over SSH using:

```bash
sudo PCLI_INTERACTIVE=false /usr/bin/pcli run '<command>' 2>&1
```

For multi-line PCLI sessions (e.g., entering config mode and applying settings):

```bash
ssh -i "$SSH_KEY" "$SSH_USER@$HOST" sudo /usr/bin/pcli << 'EOF'
configure
  authority
    name MyAuthority
  exit
exit
commit
validate
EOF
```

PCLI exits with code `0` on success and non-zero on error. Always check `$?` after each call.

## Installer Log Location

The SSR installer writes to:
- `/var/log/128T-installer.log` — full install/upgrade log
- `/var/log/128T-initializer.log` — node initialization log

When an install fails, always capture both logs:

```bash
ssh -i "$SSH_KEY" "$SSH_USER@$HOST" "sudo tail -100 /var/log/128T-installer.log"
```

## Version Detection

```bash
# After installation, check the installed version:
ssh -i "$SSH_KEY" "$SSH_USER@$HOST" "rpm -q 128T --queryformat '%{VERSION}-%{RELEASE}\n' 2>/dev/null || echo NOT_INSTALLED"
```

## Service Health Check

```bash
ssh -i "$SSH_KEY" "$SSH_USER@$HOST" "sudo systemctl is-active 128T"
# Returns "active" if running, "failed" or "inactive" otherwise.
```

## Report Output Convention

- Save validation reports to `tools/validation-reports/` using the filename pattern `YYYYMMDD-ssr-<version>-validation.md`.
- Use ISO 8601 dates (e.g., `2026-04-09`).
- Always include the SSR version, target host(s), and the list of validated doc files as the report header.

## Credential Handling

- Reference PEM certificate files by **path only**. Never read or print file contents containing `-----BEGIN CERTIFICATE-----` blocks.
- For `username:token` credentials, accept them as an environment variable (`JUNIPER_TOKEN`) rather than CLI arguments to avoid exposure in `ps` output.
