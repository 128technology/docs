---
title: Configuring Role-Based Access Control
sidebar_label: Configuring Role-Based Access Control
---

Role-Based Access Control (RBAC) provides a mechanism for an Administrator to create Access Management Roles that allow specific access to 128T resources such as routers, tenants, and services, as well as other Authority-level configuration objects. 

## Configuring Role-Based Access Control

The default Administrator role (`admin`) has access to all configuration options, and cannot be removed. From this built-in access role, all roles and access are assigned. 

- Create Resource Groups

	A Resource Group identifies a set of associated resources. One or more Resource Groups are assigned to an Access Management Role.

- Assign Resource Groups to Authority-level Resources

	Resource groups can be assigned to a top-level resource (Authority level) such as a router, a tenant, or a service. The process for assigning a resource group to a service or a service-policy is slightly different than assigning a resource group to a router or a tenant. 

- Create Access Management Roles

	An Access Management Role identifies capabilities or actions a user can perform; config-read, config-write, and provision. Provisioning allows users to perform software lifecycle management duties, such as download software, upgrade existing installations, etc.

	After the Access Management Role is created, the process is as follows:
	- Assign Cababilities to the Access Management Role. 
	- Assign Resource Groups to the Access Management Role. You can specify more than one group for a role.
	- Identify/assign the specific resources within the Resource Group the user can access (Advanced Feature).
	- Additionally, you can specify resources within the Resource Group the user DOES NOT have access to, and these resources will be hidden from the user's view.
	- Create users and select one or more Access Management Roles for the user. 

### Create a Resource Group

1. Under Administration, select Configuration.
2. Under Configuration Home, select the Authority tile.

	![Authority Tile](/img/config_RBAC_NewResGrpstep2.png)

3. In the Authority Settings window, scroll down to Resource Groups, and click ADD.

	![Resource Groups](/img/config_RBAC_NewResGrpstep3.png)

4. Enter a name for the Resource Group, and click SAVE.

	![Resource Group Name](/img/config_RBAC_NewResGrpstep4.png)

5. Repeat this for as many Resource Groups as are required. 

### Assign Resource Groups to Authority-level Resources

1. Under Administration, select Configuration.
2. Select an Authority-level resource; for example, a router or a tenant.

	![Resources](/img/config_RBAC_ARGtoResS2.png)

3. Scroll down to Resource Groups.
4. Click ADD.
5. In the New Resource Group window, click the down arrow and select the Resource Group name for the Resource.

	![New Resource Group](/img/config_RBAC_ARGtoResS5.png)

6. Click Save.
7. Repeat this process to associate each resource with a resource group. 

### Assign a Resource Group to a Service:

1. From the Configuration Home, scroll down to the **Services** panel.
2. Select the Service.
	![Select Service](/img/config_RBAC_ARGSstep2.png)

3. Scroll to the **Service Applies To** panel and click ADD. 
	![Service Applies To](/img/config_RBAC_ARGSstep3.png)

4. Select **resource-group** from the **Service Group Type** drop down.
	![Group Type](/img/config_RBAC_ARGSstep4.png)

5. Click SAVE.
6. On the **Service Applies To Settings:** screen click ADD next to Resource Groups.
	![Add to Group](/img/config_RBAC_ARGSstep6.png)

7. Select the appropriate resource group from the drop down and click SAVE.
	![Resource Group Selection](/img/config_RBAC_ARGSstep7.png)

### Assign a Resource Group to a Service-Policy:

1. In the **Configuration Home** panel, scroll down to **Service Policies**.
2. Click ADD.
3. Select a service policy. 
	![Service Policies](/img/config_RBAC_2ServPol.png)
4. In the **Service Policy** panel, scroll to the **Service-Policy Applies To** panel and click ADD.
	![Service Policy Applies To](/img/config_RBAC_4ServPol.png)
5. In the **New Applies To** pane, use the drop down to select **resource-group**.
	![Select Resource Group](/img/config_RBAC_Step5ServPol.png)
6. Click SAVE.
7. In the **Service Policy Applies To Settings**, select ADD next to Resource Group.
	![Service Policy Applies To](/img/config_RBAC_7ServPol.png)
8. Select the the appropriate resource group from the drop down, and click SAVE. 
	![Select Resource Group](/img/config_RBAC_6ServPol.png)

### Create an Access Management Role

1. Under Administration, select **Configuration**.
2. Under Configuration Home, select the **Authority** tile.
3. Scroll down to Access Management Roles.
	![Access Management Roles](/img/config_RBAC_AMRstep2.2.png)

4. Click ADD.
5. Create a name for the new role. Use a name that identifies the role in some way. 
	![Name the Role](/img/config_RBAC_AMRstep3.png)

6. Assign the capabilities for each Access Management Role. In the **Capabilities** panel, click ADD and select the capability from the drop down. For example, user roles may only have read access to the resource, where an admin might have read and write access. Options are config-read, config-write, provisioning. 
	![Assign to a Group](/img/config_RBAC_AMRstep5.png)

7. Assign a Resource Group or groups to an Access Management Role. In the **Resource Groups** panel, click ADD and select the Resource Group from the drop down. 
	![Resource Group](/img/config_RBAC_ARGSstep7.png)

8. In some cases you may choose to make specific resources accessible to an Access Management Role. This is an optional setting. In the **Resources** panel, click ADD and select resources from the drop down. 
	![Assign Role to Resources](/img/config_RBAC_AMRstep6.png)

9. Additionally, you can specify resources within the Resource Group the user DOES NOT have access to from the Exclude Resources panel, and these resources will be hidden from the user's view.

Repeat this process for additional roles.

### Create Users and Assign Roles

1. From the **Administration** menu, select **Users**.
2. On the Users screeen, select **NEW USER** in the top right corner. 

	![New User](/img/config_RBAC_CUARstep2.png)

3. On the **New Users** panel, enter the following: 
	- Username: Minimum 9 characters, initial lowercase, and must be alphanumeric.
	- Password: Minimum 9 characters, may not be a dictionary word, must contain alphanumeric and uppercase characters.
	- Users full name.
	- Users can have multiple roles; select the Role or Roles of the user from the drop down. 
	- Click SAVE.

	![New User Pane](/img/config_RBAC_CUARstep3.png)


