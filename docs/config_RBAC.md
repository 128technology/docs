---
title: Configuring Role-Based Access Control
sidebar_label: Configuring Role-Based Access Control
---

Role-Based Access Control provides a mechanism for an Administrator to create Access Management Roles and associate any user with one or more roles that provide access to 128T resources, such as routers, tenants, and services. Users are assigned to a group of configuration resources. Within the resource group read/write access can be configured per user, on some or all of those resources.

Additionally, resources that the user does not have access to can be hidden from their view. 

Top-level configuration items, such as routers, tenants, services, can be grouped together into a “resource group”. This allows roles to be created that reference an existing group of resources without having to redefine the direct association between a role and many resources.

Role-Based Access Control provides flexibility where each user of the system can be granted 1-or-more roles that provide access to one or more resource groups. The Resource groups can be composed of one or more resources.

## Configuring Role-Based Access Control

The default Admin role has access to all configuration options, and cannot be removed. From this user account, all roles and access are assigned. 

- Create Resource Groups

	A Resource Group identifies a set of resources. One or more Resource Groups are assigned to an Access Management Role.

- Assign Resource Groups to Authority-level Resources

	Resource groups can be assigned to a top-level resource (Authority level) such as a router, a tenant, or a service. The process for assigning a resource group to a service is slightly different than assigning to a router or a tenant. 

- Create Access Management Roles

	An Access Management Role identifies the type of user - administrator or user. Roles are assigned capabilities or actions they can perform; read, write, and provision. Provisioning allows users to perform software lifecycle management duties, such as download software, upgrade existing installations, etc.

	After the Access Management Role is created, the process is as follows:
	- Assign Cababilities to the Access Management Role. 
	- Assign Resource Groups to the Access Management Role. You can specify more than one group for a role.
	- Identify/assign the specific resources within the Resource Group the user can access (Advanced Feature).
	- Additionally, you can specify resources within the Resource Group the user DOES NOT have access to, and these resources will be hidden from the user's view.
	- Create users and select one or more Access Management Roles for the user. 

### Create a Resource Group

1. Under Administration, select Configuration.
2. Under Configuration Home, select the Authority tile.
3. In the Authority Settings window, scroll down to Resource Groups, and click ADD.
4. Enter a name for the Resource Group, and click SAVE.
5. Repeat this for as many Resource Groups as are required. 

### Assign Resource Groups to Authority-level Resources

1. Under Administration, select Configuration.
2. Select a resource; a router, service, or tenant.
3. Scroll down to Resource Groups.
4. Click ADD.
5. In the New Resource Group window, click the down arrow and select the Resource Group name for the Resource.
6. Click Save.
7. Repeat this process to associate each resource with a resource group. 

#### To associate a Service with a Resource Group:

1. From the Configuration Home, scroll down to the Services panel.
2. Select the Service.
3. On the next screen, scroll to the Service Applies To panel and click ADD. 
4. Select resource-group from the Service Group Type drop down.
5. Click SAVE.
6. On the Service Applies To: screen click ADD next to Resource Groups.
7. Select the appropriate resource group from the drop down and click SAVE.

### Create an Access Management Role

1. In the same Authority Settings window, scroll down to Access Management Roles.
2. Click ADD.
3. Create a name for the new role. Use a name that identifies the role in some way, for example, EastCoast-Admin. 
4. Assign the capabilities for each role. For example, user roles may only have read access to the resource, where an admin might have read and write access. Options are config-read, config-write, provisioning. 
5. Assign the Access Management Role to a Resource Group or groups.
6. Select the specific resources accessible by the Access Management Role. 
7. Additionally, you can specify resources within the Resource Group the user DOES NOT have access to, and these resources will be hidden from the user's view.

Repeat this process for additional roles.

### Create Users and Assign Roles

1. From the Administration menu, select Users.
2. On the Users screeen, select NEW USER in the top right corner. 
3. On the New Users pane, enter the following: 
- Username: Minimum 9 characters, initial lowercase, and must be alphanumeric
- Password: Minimum 9 characters, may not be a dictionary word, must contain alphanumeric and uppercase characters.
- Users full name
- Select the Role or Roles of the user from the drop down.
- Click SAVE.


