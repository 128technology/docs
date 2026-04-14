<!--- AWS EC2 Key Pair Setup --->

#### Create an EC2 Key Pair

An EC2 key pair is required to authenticate SSH access to your SSR instances.

1. In the AWS Console, navigate to **EC2**.
2. In the left navigation pane, under **Network & Security**, click **Key Pairs**.
3. Click **Create key pair**.
4. Enter the following values:

   | Field | Value |
   | ----- | ----- |
   | Name | A descriptive name, for example `ssr-keypair` |
   | Key pair type | RSA |
   | Private key file format | `.pem` (for Linux/macOS/AWS CLI) or `.ppk` (for PuTTY on Windows) |

5. Click **Create key pair**. The private key file downloads automatically.
6. Move the downloaded key file to a secure location, for example `~/.ssh/`, and set restrictive permissions:

```bash
chmod 400 ~/.ssh/ssr-keypair.pem
```

:::important
This is the only time you can download the private key. If you lose it, you must create a new key pair. Store your key file securely and do not share it.
:::

To connect to an instance using this key pair:

```bash
ssh -i ~/.ssh/ssr-keypair.pem t128@<instance-public-ip>
```
