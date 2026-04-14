<!--- AWS Security Groups for SSR --->

#### Create the Conductor Security Group

The Conductor security group controls inbound access to the Conductor instance.

1. In the AWS Console, navigate to **EC2**.
2. In the left navigation pane, under **Network & Security**, click **Security Groups**.
3. Click **Create security group**.
4. Enter the following:

   | Field | Value |
   | ----- | ----- |
   | Security group name | `ssr-conductor-sg` |
   | Description | `Security group for SSR Conductor` |
   | VPC | Select your `ssr-vpc` |

5. Under **Inbound rules**, click **Add rule** and add the following rules:

   | Type | Protocol | Port range | Source | Description |
   | ---- | -------- | ---------- | ------ | ----------- |
   | SSH | TCP | 22 | Your admin CIDR (e.g. `203.0.113.0/24`) | Admin SSH access |
   | HTTPS | TCP | 443 | Your admin CIDR | Conductor GUI access |
   | Custom TCP | TCP | 930 | `10.0.0.0/16` (VPC CIDR) | SSR to Conductor control |
   | Custom TCP | TCP | 4505 | `10.0.0.0/16` | Salt master (router mgmt) |
   | Custom TCP | TCP | 4506 | `10.0.0.0/16` | Salt master (router mgmt) |

6. Leave **Outbound rules** as the default (all traffic allowed).
7. Click **Create security group**.

:::note
Replace `Your admin CIDR` with the specific IP range of your management workstations. Using `0.0.0.0/0` is not recommended for production deployments.
:::

#### Create the Router Security Group

The Router security group controls inbound access to the SSR Router instance.

1. Click **Create security group** again.
2. Enter the following:

   | Field | Value |
   | ----- | ----- |
   | Security group name | `ssr-router-sg` |
   | Description | `Security group for SSR Router` |
   | VPC | Select your `ssr-vpc` |

3. Under **Inbound rules**, add the following:

   | Type | Protocol | Port range | Source | Description |
   | ---- | -------- | ---------- | ------ | ----------- |
   | SSH | TCP | 22 | Your admin CIDR | Admin SSH access |
   | HTTPS | TCP | 443 | Your admin CIDR | Router GUI access |
   | Custom UDP | UDP | 1280 | `0.0.0.0/0` | SVR peer communication |
   | Custom TCP | TCP | 1280 | `0.0.0.0/0` | SVR peer communication |
   | Custom TCP | TCP | 1283 | `0.0.0.0/0` | SVR peer communication |
   | Custom TCP | TCP | 16385-65533 | `0.0.0.0/0` | SVR dynamic ports |
   | Custom UDP | UDP | 16385-65533 | `0.0.0.0/0` | SVR dynamic ports |

4. Click **Create security group**.

:::note
For a detailed reference of all ports required for SSR operation, see [Enable Ports on the Firewall](config_firewall_ports.md).
:::

:::important
Do **not** enable the CloudFormation templates' default security group if you have created custom security groups as described above. You will specify your custom security groups during template deployment.
:::
