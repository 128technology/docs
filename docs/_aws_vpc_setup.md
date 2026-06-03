<!--- AWS VPC and Subnet Setup --->

#### Create the VPC

A dedicated VPC isolates your SSR deployment and gives you full control over routing and network segmentation.

1. In the AWS Console, search for **VPC** and select it.
2. Click **Create VPC**, and select **VPC only**.
3. Enter the following values:

   | Field | Value |
   | ----- | ----- |
   | Name tag | A descriptive name, for example `ssr-vpc` |
   | IPv4 CIDR block | A private address range, for example `10.0.0.0/16` |
   | IPv6 CIDR block | No IPv6 CIDR block |
   | Tenancy | Default |

4. Click **Create VPC**.

### Create Subnets

SSR requires three subnets for a conductor-managed router deployment. Create each subnet within the VPC you just created.

:::note
Subnet CIDR examples below are based on the `10.0.0.0/16` VPC range. Adjust to fit your environment.
:::

#### Management Subnet

Used by the Conductor and for out-of-band administration of the Router.

1. In the VPC Dashboard, click **Subnets**, then **Create subnet**.
2. Select your VPC from the **VPC ID** dropdown.
3. Enter the following:

   | Field | Value |
   | ----- | ----- |
   | Subnet name | `ssr-mgmt-subnet` |
   | Availability Zone | Choose your preferred AZ |
   | IPv4 CIDR block | `10.0.1.0/24` |

4. Click **Create subnet**.
5. Select the new subnet, click **Actions**, and choose **Edit subnet settings**.
6. Enable **Auto-assign public IPv4 address** and save.

#### Public (WAN) Subnet

Used for external connectivity and peer SSR communication.

1. Click **Create subnet**, select your VPC, and enter:

   | Field | Value |
   | ----- | ----- |
   | Subnet name | `ssr-public-subnet` |
   | Availability Zone | Same AZ as the management subnet |
   | IPv4 CIDR block | `10.0.2.0/24` |

2. Click **Create subnet**.
3. Enable **Auto-assign public IPv4 address** on this subnet.

#### Private (LAN) Subnet

Used for internal workloads and application traffic.

1. Click **Create subnet**, select your VPC, and enter:

   | Field | Value |
   | ----- | ----- |
   | Subnet name | `ssr-private-subnet` |
   | Availability Zone | Same AZ as the other subnets |
   | IPv4 CIDR block | `10.0.3.0/24` |

2. Click **Create subnet**.
3. Do **not** enable Auto-assign public IPv4 for this subnet.

### Create and Attach an Internet Gateway

The Internet Gateway provides outbound internet connectivity to the management and public subnets.

1. In the VPC Dashboard, click **Internet gateways**, then **Create internet gateway**.
2. Enter a name (for example, `ssr-igw`) and click **Create internet gateway**.
3. Select the new Internet Gateway, click **Actions**, then **Attach to VPC**.
4. Select your `ssr-vpc` and click **Attach internet gateway**.

### Configure Route Tables

Create a route table for the public-facing subnets and associate the management and public subnets with it.

1. In the VPC Dashboard, click **Route tables**, then **Create route table**.
2. Enter a name (for example, `ssr-public-rt`) and select your `ssr-vpc`.
3. Click **Create route table**.
4. Select the new route table, click the **Routes** tab, then **Edit routes**.
5. Click **Add route**, enter `0.0.0.0/0` for the destination, and set the target to your `ssr-igw` Internet Gateway. Click **Save changes**.
6. Click the **Subnet associations** tab, then **Edit subnet associations**.
7. Select `ssr-mgmt-subnet` and `ssr-public-subnet`, then click **Save associations**.

:::note
The private subnet intentionally uses the **main (default) route table** which has no internet gateway route, ensuring internal traffic does not have a direct path to the internet.
:::
