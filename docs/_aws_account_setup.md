<!--- AWS Account Setup --->

### Create an AWS Account

If you already have an AWS account, skip to [Set Up IAM Access](#set-up-iam-access).

1. Open a web browser and navigate to [https://aws.amazon.com/](https://aws.amazon.com/).
2. Click **Create an AWS Account**.
3. Enter your email address and choose an AWS account name, then click **Verify email address**. Check your inbox for the verification code and enter it when prompted.
4. Set a strong password for the root user and click **Continue**.
5. On the **Contact Information** page, select **Personal** or **Business** as appropriate, fill in all required fields, and click **Continue**.
6. On the **Billing Information** page, enter a valid payment method. AWS requires a credit or debit card to verify identity. Click **Verify and Continue**.
7. On the **Identity Verification** page, choose your verification method (SMS or voice call), enter your phone number, and complete the verification.
8. Select a **Support Plan**. The **Basic** plan is free and suitable for evaluation. Click **Complete sign up**.
9. Click **Go to the AWS Management Console** and sign in with your root account credentials.

:::important
AWS best practice is to avoid using the root account for day-to-day operations. Perform the IAM setup in the next section before proceeding.
:::

### Set Up IAM Access

Create a dedicated IAM user with the permissions required to deploy SSR infrastructure.

1. In the AWS Console, search for **IAM** in the top search bar and select it.
2. In the left navigation, select **Users**, then click **Create user**.
3. Enter a username (for example, `ssr-deploy-admin`) and click **Next**.
4. On the **Set permissions** page, select **Attach policies directly**.
5. Attach the following AWS managed policies:
   - `AmazonEC2FullAccess`
   - `AmazonVPCFullAccess`
   - `AWSCloudFormationFullAccess`
   - `IAMReadOnlyAccess`
6. Click **Next**, review the summary, then click **Create user**.
7. Select the newly created user and navigate to the **Security credentials** tab.
8. Under **Access keys**, click **Create access key**. Choose **Command Line Interface (CLI)** as the use case, acknowledge the recommendation, and click **Next**.
9. Click **Create access key**, then **Download .csv file** to save your credentials securely. Click **Done**.

:::note
Store your access keys in a secure location. They cannot be retrieved after the initial creation. If lost, deactivate the old key and create a new one.
:::

10. To use the AWS CLI, configure it with your new credentials:

```bash
aws configure
```

When prompted, enter:
- **AWS Access Key ID**: from the downloaded CSV
- **AWS Secret Access Key**: from the downloaded CSV
- **Default region name**: your target deployment region (for example, `us-east-1`)
- **Default output format**: `json`
