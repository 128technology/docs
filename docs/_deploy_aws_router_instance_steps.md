<!--- AWS Router EC2 Instance — shared post-deployment steps --->
<!--- Imported by deploy_aws_hub_router_instance.mdx and deploy_aws_spoke_router_instance.mdx --->

## Disable Source / Destination Check

AWS enables source/destination checking on all ENIs by default. This check drops packets where the EC2 instance is not the packet source or destination, which prevents the SSR from forwarding transit traffic. You must disable this check on the **WAN and LAN ENIs**.

1. In the EC2 console, navigate to **Instances** and select the router instance.
2. Select the **Networking** tab.
3. Under **Network Interfaces**, click on the WAN ENI (second interface, `eth1`).
4. Select **Actions → Change Source/Destination Check**.
5. Select **Stop** and click **Save**.

   ![Source/Destination Check](/img/AWS-bootstrap2.png)

6. Repeat steps 3–5 for the LAN ENI (`eth2`).

:::important
Failing to disable source/destination checking prevents the SSR from forwarding any transit traffic. Complete this step before committing the router configuration.
:::

## Associate the Elastic IP with the WAN Interface

1. In the EC2 console, navigate to **Elastic IPs**.
2. If you have not already done so, allocate a new Elastic IP.
3. Select the address and click **Actions → Associate Elastic IP Address**.
4. Select the router instance's WAN ENI (`eth1`) and click **Associate**.

Record this Elastic IP. You will reference it as the `external-nat-address` when configuring the WAN interface neighborhood in the router configuration step.
