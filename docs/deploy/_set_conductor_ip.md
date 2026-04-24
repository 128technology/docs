<!----Set the Conductor IP Address---->

1. Under Conductor Addresses, select ADD.
2. In the **New Conductor Address** window, enter the conductor public IP address.

![Conductor Address](/img/conductor_address.png)

3. Click Validate and Commit. Warnings will appear, advising you of the change.  

The steps during initialization setup the management IP. The conductor IP address is the public IP address to which the managed routers connect. It is not necessary to manually associate this IP address with a network interface; the interactions between the SSR software and Linux will identify and assign the IP address to the network interface. 