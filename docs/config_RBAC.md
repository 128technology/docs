---
title: Configuring Role-Based Access Control
sidebar_label: Configuring Role-Based Access Control
---

RBAC provides a mechanism for an Administrator to associate any user with one or more roles that provide access to 128T resources, such as routers, tenants, and services. Users are assigned to a group of configuration resources. Within the resource group read/write access can be configured per user, on some or all of those resources.

Additionally, resources that the user does not have access to can be hidden from their view. 

Top-level configuration items, such as routers, tenants, services, can be grouped together into a “resource group”. This allows roles to be created that reference an existing group of resources without having to redefine the direct association between a role and many resources.

RBAC provides flexibility where each user of the system can be granted 1-or-more roles that provide access to one or more resource groups. The Resource groups can be composed of one or more resources.

## Configuring Role_Based Access Control

The default Admin role has access to all configuration options, and cannot be removed. From this user account, all roles and access is assigned. 

At a high level, the process for creating access control is as follows. Each of the procedures are broken into deeper detail in individual sections. 

- Create Resource Groups.
- Populate Resource Groups with top-level items such as routers, tenants, and services. 
- Create Roles.
- Assign Roles to Groups.
- Assign Users to Roles and Groups. Users can be assigned to one or more groups, and have different roles in each group. 