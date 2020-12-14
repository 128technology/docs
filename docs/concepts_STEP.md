---
title: Service and Topology Exchange Protocol (STEP)
sidebar_label: Service and Topology Exchange Protocol (STEP)
---

Because networks are constantly changing, services and service reachability information needs to be dynamically exchanged between routers. Services are defined to represent the capabilities that the network is designed to deliver to consumers. These services, along with their requisite policies and characteristics, dictate how the traffic patterns traverse the network. 

Service and Topology Exchange Protocol (STEP) provides a way to achieve service availability through a central repository. STEP helps network administrators easily design and scale existing or new networks and provide insight into the service availability across the whole network.

- **Make Configuration Managable (again):** With STEP, the network admin focuses on services/applications that need to be made available to the network, and how the network is connected/segmented. There is no longer a need to define the connectivity or the routes between the peers.

- **Multi-hop SVR:** With STEP, manual configuration can be avoided and the state of these routers will be conveyed to the source router so that dynamic routing decisions can be made. Configuration generation code creates service routes only for an adjacent pair of 128T routers. For multi-hop SVR routers, the service route to the intermediate routers no longer needs to be manually configured.

- **Interaction with multiple routing protocols:** Native support for OSPF and BGP protocols are available to interact with legacy routers, and provisioning is required to configure BGP over SVR between two 128T peers to exchange BGP routes. STEP provides an easy way to map the route information from these legacy routing protocols into the 128T world of services and service-routes, and provides an extensible way to interact with any future legacy protocols.  

- **Multicast:** Receiver endpoints are advertised and the optimal replication point will be determined to send multicast packets to all receivers.

- **Endpoint Availability:** Service routes can be configured for any service, but the availability of these service routes is not propagated across the network. STEP propagates the service availability information across the whole network so that each router can make intelligent decisions and minimize outages.

- **Pinpoint Service Outages:** STEP stores the service and network information in the STEP Repository, providing a whole view of the network at any given moment. Service outages or heat-map views of the whole network can easily be generated from the repository.

- **Scalability:** STEP allows the network to easily scale and provides insights into the whole network.
 
### How it Works

The **STEP Repository** is built upon a highly efficient and scalable in-memory database that follows a publish-subscribe model, known as the Path Tree database. Routers participating in a STEP-enabled network publish information about service and link state in a JSON encoded document. This information is used by all routers to intelligently route traffic to services and also react to network changes. The STEP repository can also be used by service providers to advertise service information and tune service policies. 

The **Path Tree Database** is a lightweight, scalable, in-memory subscription datastore. The data set is stored as paths, and clients can create paths and subscribe for notifications on any path. For example, a client can add a watch on the path /p1/p2 and get notifications when anything gets created/changed/removed under the /p1/p2 path. 

Path tree clients store the dataset and are updated with patch documents as changes are made. Path tree servers notify subscribers of any changes to the paths to which they are subscribed. 

For detailed information about configuring STEP, the repository, database, and other features, please see [Configuring STEP](config_STEP.md). 
