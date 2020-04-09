---
title: Installing in AWS
sidebar_label: Installing in AWS
---

## Install from AWS Marketplace

Partnering with Amazon, you can install 128T conductors and routers using Amazon Web Services (AWS). AWS is a secure cloud platform that offers computing power, data storage, content delivery, flexibility, scalability, and reliability for software products. 
:::note
For more information on Amazon Web Services, refer to the [AWS website](https://aws.amazon.com/what-is-aws/).
:::

#### To Manually Install a Conductor or Router Using AWS:

1. Launch a web browser and navigate to https://aws.amazon.com/
2. Login to AWS with your account. 
   :::note
   If you do not have an account, click **Create an AWS Account** to register.
   :::
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter 128 Technology in the search bar.
6. Locate the 128 Technology image and click **Select**. 
7. On the _Step 2: Choose and Instance Type_ page, choose an instance type.
8. On the _Step 3: Configure Instance Details_ page, click **Subnet** and select the desired subnet and retain the default values for the other fields.
   :::note
   If the desired subnet is not listed, click **Create New Subnet** to create one.
   :::
9. Click **Next: Add Storage**.
   :::note
   The _You have changed your network setting_ window may appear.
   :::
   Select **Yes, I want to continue with this change** and click **Next**.
10. On the _Step 4: Add Storage_ page, ensure the size is 128 GB (default value).
11. Click **Next: Add Tags**.
12. On the the _Step 5: Add Tags_ page, click **Add Tags**. 
13. Click inside the Key column and select **Name**. Under the Value column enter the name for your instance.
14. Click **Next: Configure Security Group**.
15. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
    :::note
    If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
    :::
16. Select **Review and Launch**.
17. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
18. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
19. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
    :::note
    If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
    :::
20. Check the acknowledgment check box and then click **Launch Instances**.
21. On the _Launch Status_ page, click **View Instances**.
22. Record the instances IP address.
23. Launch a command window prompt.
24. Enter the IP address of the instance. **Result:** The interactive 128T Installer application launches.
25. When prompted by the installer, press the **Enter** key to select Begin.

Follow the instructions as outlined in [Install the 128T Routing Software](#install-using-128t-installer)

## Install 128T From Amazon Web Services Using ZTP

After installing a 128T conductor, you can use ZTP to install your 128 routers from Amazon Web Services.

### To install 128T from AWS using ZTP:

1. Launch a web browser and navigate to [https://aws.amazon.com/](https://aws.amazon.com/).
2. Login to AWS with your account. 
  > If you do not have an account, click **Create an AWS Account** to register.
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter 128 Technology in the search bar.
6. Locate the 128 Technology image and click **Select**. 
7. On the _Step 2: Choose and Instance Type_ page, choose an instance type.
8. On the _Step 3: Configure Instance Details_ page click **Subnet** and select the desired subnet and retain the default values for the other fields.
  > If the desired subnet is not listed, click **Create New Subnet** to create one.
9. In the IAM role field, select **128T\_ZTP**.
10. Click **Next: Add Storage**.
  > The _You have changed your network setting_ window may appear. Select **Yes, I want to continue with this change** and click **Next**.
11. On the _Step 4: Add Storage_ page, ensure the size is 128 GB (default value).
12. Click **Next: Add Tags**.
13. On the the _Step 5: Add Tags_ page, click **Add Tags**.
14. Click inside the Key column, select the following tags, and enter the tag definition in the Value column.
- conductor-ip-primary: populate this with the IP address of your 128T conductor
15. Click **Next: Configure Security Group**.
16. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
  > If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
17. Select **Review and Launch**.
18. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
19. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
20. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
  > If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
21. Check the acknowledgment check box and then click **Launch Instances**.
22. On the _Launch Status_ page, click **View Instances**.
23. Connect and assign this router/instance to your 128T conductor either using the GUI or PCLI. **Result**: The router installs automatically.

### Configure 128T Using AWS

After  installing 128T using Amazon Web Services, you must then create and apply configuration elements. During the configuration process you'll set up the following:

- Route Tables
- Internet Gateways

#### To configure a conductor or router on AWS:

1. Using AWS, navigate to the EC2 Dashboard pane and **Select Instances**. 
2. On the _Description_ tab and next to the Security field, click **Launch Wizard**.
3. On the _Inbound_ tab, click **Edit** and adjust your settings for HTTPS access to your conductor.
4. From the _Edit Inbound Rules_ section, click **Add Rule** to add HTTPS specific rules using the drop down menu.
5. After all rules are added, click **Save**.
6. From the main toolbar, click **Services** to expand the Services list and select **VPC**.
7. From the VPC Dashboard pane, click **Your VPCs**.
8. From the VPC Dashboard pane, click **Route Tables** and then **Create Route Table**.
9. In the _Create Route Table_ dialog box, enter the following information and click **Yes, Create**.
- Name Tag: Enter a name for your route table
- VPC: Using the dropdown list, select the VPC to associate with the route table
10. From the VPC Dashboard pane, select **Internet Gateways** and click **Create Internet Gateway**.
11. In the _Create Internet Gateway_ dialog box, enter an Internet Gateway name in the Name Tag field and click **Yes, Create**.
12. On the _Internet Gateways_ page, click **Attach to VPC** and assign the Internet Gateway to your VPC.
13. From the VPC Dashboard pane, select **Route Tables** and click **Edit**.
14. Click **Add Another Route**.
15. In the 0.0.0.0/0 row, click the empty cell under the Target column and the local name automatically appears as a selectable option. Select it and click **Save**.