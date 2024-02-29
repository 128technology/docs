---
title: Identifying Secure Product Delivery
sidebar_label: Identifying Secure Product Delivery
---

There are several mechanisms provided in the delivery process to ensure that a customer receives a product that has not been tampered with. The customer should perform the following checks upon receipt of a device to verify the integrity of the platform.

- Shipping label: Ensure that the shipping label correctly identifies the correct customer name and address as well as the device.
- Outside packaging: Inspect the outside shipping box and tape. Ensure that the shipping tape has not been cut or otherwise compromised. Ensure that the box has not been cut or damaged to allow access to the device.
- Inside packaging: Inspect the plastic bag and seal. Ensure that the bag is not cut or removed. Ensure that the seal remains intact.
If you identify a problem during the inspection,  immediately contact the supplier. Provide the order number, tracking number, and a description of the identified problem to the supplier.

Additionally, there are several checks that can be performed to ensure that the customer has received a box sent by Juniper Networks. Perform the following checks upon receipt of the device to verify the authenticity of the device:

- Verify that the device was ordered using a purchase order. Juniper Networks devices are never shipped without a purchase order.
- When a device is shipped, a shipment notification is sent to the e-mail address provided by the customer when the order is taken. Verify that this e-mail notification was received. Verify that the e-mail contains the following information:
	- Purchase order number
	- Juniper Networks order number used to track the shipment
	- Carrier tracking number used to track the shipment
	- List of items shipped including serial numbers
	- Address and contacts of both the supplier and the customer

- Verify that the shipment was initiated by Juniper Networks. To verify that a shipment was initiated by Juniper Networks, you should perform the following tasks:
- Compare the carrier tracking number of the Juniper Networks order number listed in the Juniper Networks shipping notification with the tracking number on the package received.
- Log on to the Juniper Networks online customer support portal at https://support.juniper.net/support to view the order status. 
- Compare the carrier tracking number or the Juniper Networks order number listed in the Juniper Networks shipment notification with the tracking number on the package received.

### Software Verification

Post-software image installation integrity scanning of all installed binaries has been implemented per Common Criteria requirements. After the installation has completed, run the `systemctl start 128T-rpm-verify` as `root` from the linux shell. 

The self-test scan is intiated and takes approximately two minutes to complete. Upon completion, run: 

`systemctl status 128T-rpm-verify` 

Successful completion displays the following message:

`PASS: All RPM file digests verified`

**Use the `show system version detail` command to view the associated verification details.**

If the result displays the following:

`FAIL: RPM file digest mismatch detected`

The failure must be resolved before continuing to ensure compliance. 

### How?


After the self-test scan test has succeed, enable the automatic self-test by executing the `enable` command in the linux shell:

`systemctl enable 128T-rpm-verify`

This enables the self-test on every subsequent reboot. If the self-test fails, the 128T service will not start.
