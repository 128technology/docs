---
title: Configuring Service and Topology Exchange Protocol (STEP)
sidebar_label: Configuring Service and Topology Exchange Protocol (STEP)
---

The STEP repository is built upon a highly efficient and scalable in-memory database that follows a publish-subscribe model, named the Path Tree database. There is no business logic in the STEP repository itself; all of the routing decisions (both client publishing routing data and client using the data to perform SPF) are performed on each router.

Routers participating in a STEP-enabled network publish information about service and link state in a JSON encoded document called the STEP document. This information is used by all routers to intelligently route traffic to services and react to network changes. The STEP repository can also be used by service providers to advertise service information from their networks/authority. 

The path tree database is used to store and distribute data in the STEP repository. As the name suggests, each data set gets its own path.  The following path will be used to receive and publish STEP related information from each router.
