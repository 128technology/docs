---
title: Supported NICs and Drivers
sidebar_label: Supported NICs and Drivers
---

The Session Smart Router / 128T supports a number of NICs and Drivers. If you know the Device Name and Device ID you can search the Vendor lists here. To identify the NIC information, use the linux command `lspci -nn` to obtain the PCI device name, device ID, vendor name, and vendor ID. 

From the linux shell run:
```
lspci-nn

00:03.0 Ethernet controller [0200]: Intel Corporation 82540EM Gigabit Ethernet Controller [8086:100e] (rev 03)
```
The Vendor ID and Device ID are represented in the example above as [8086:100e]. To make searching the list easier, use the device name and ID. In this example:

- Device name: 82540EM Gigabit Ethernet Controller
- Device ID: 100e

Additionally, the vendor name and ID is helpful to identify the NIC. 
- Vendor name: Intel Corp.
- Vendor ID: 8086

Searching for the device ID 100e will return two results from different vendors. Searching for the device name `82540EM Gigabit Ethernet Controller` returns the following: 

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Intel Corporation (8086) | 82540EM Gigabit Ethernet Controller (100e) | net_e1000_em | 4.5.0 |

Use the links below to browse the list of a specific vendor.

- [Amazon](#amazon)
- [Aquantia Corp.](#aquantia-corp)
- [Atomic Rules](#atomic-rules)
- [Broadcom](#broadcom)
- [Cavium](#cavium)
- [Chelsio Communications](#chelsio-communications)
- [Intel Corporation](#intel-corporation)
- [Mellanox Technologies](#mellanox)
- [QLogic Corp](#qlogic)
- [Red Hat](#red-hat)
- [Solarflare Communications](#solarflare)

## Amazon

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Amazon.com, Inc. (1d0f) | Elastic Network Adapter (ENA) (ec20) | net_ena | 4.5.0 | 

## Aquantia Corp

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Aquantia Corp. (1d6a) | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d107) | net_atlantic | 4.5.0 |
| | AQC108 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d108) | net_atlantic | 4.5.0 |
| | AQC111 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (11b1) | net_atlantic | 4.5.0 |
| | AQC112 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (12b1) | net_atlantic | 4.5.0 |
| | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (87b1) | net_atlantic | 4.5.0 |

## Atomic Rules

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
|Atomic Rules LLC (1d6c) | AR-ARKA-FX0 Arkville 32B DPDK Data Mover (100d) | net_ark | 4.5.0 |
| | AR-ARKA-FX1 Arkville 64B DPDK Data Mover (100e) | net_ark | 4.5.0 |

## Broadcom	

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Broadcom Limited (14e4) | BCM57301 NetXtreme-C 10Gb Ethernet Controller (16c8) | net_bnxt	| 4.5.0 |
| | BCM57302 NetXtreme-C 10Gb/25Gb Ethernet Controller (16c9) | net_bnxt | 4.5.0 |
| | BCM57304 NetXtreme-C 10Gb/25Gb/40Gb/50Gb Ethernet Controller (16ca) | net_bnxt | 4.5.0 |
| | BCM57311 NetXtreme-C 10Gb RDMA Ethernet Controller (16ce) | net_bnxt | 4.5.0 |
| | BCM57312 NetXtreme-C 10Gb/25Gb RDMA Ethernet Controller (16cf) | net_bnxt | 4.5.0 |
| | BCM57314 NetXtreme-C 10Gb/25Gb/40Gb/50Gb RDMA Ethernet Controller (16df) | net_bnxt | 4.5.0 |
| | BCM57402 NetXtreme-E 10Gb Ethernet Controller (16d0) | net_bnxt | 4.5.0 |
| | BCM57402 NetXtreme-E Ethernet Partition (16d4) | net_bnxt | 4.5.0 |
| | BCM57404 NetXtreme-E 10Gb/25Gb Ethernet Controller (16d1) | net_bnxt | 4.5.0 |
| | BCM57404 NetXtreme-E Ethernet Partition (16e7) | net_bnxt | 4.5.0 |
| | BCM57406 NetXtreme-E 10GBASE-T Ethernet Controller (16d2) | net_bnxt | 4.5.0 |
| | BCM57406 NetXtreme-E Ethernet Partition (16e8) | net_bnxt | 4.5.0 |
| | BCM57407 NetXtreme-E 10GBase-T Ethernet Controller (16d5) | net_bnxt | 4.5.0 |
| | BCM57407 NetXtreme-E 25Gb Ethernet Controller (16e9) | net_bnxt | 4.5.0 |
| | BCM57412 NetXtreme-E 10Gb RDMA Ethernet Controller (16d6) | net_bnxt | 4.5.0 |
| | BCM57412 NetXtreme-E Ethernet Partition (16de) | net_bnxt | 4.5.0 |
| | BCM57414 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16d7) | net_bnxt | 4.5.0 |
| | BCM57414 NetXtreme-E Ethernet Partition (16ec) | net_bnxt | 4.5.0 |
| | BCM57416 NetXtreme-E 10Gb RDMA Ethernet Controller (16e3) | net_bnxt | 4.5.0 |
| | BCM57416 NetXtreme-E Dual-Media 10G RDMA Ethernet Controller (16d8) | net_bnxt | 4.5.0 |
| | BCM57416 NetXtreme-E Ethernet Partition (16ee) | net_bnxt | 4.5.0 |
| | BCM57417 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16e2) | net_bnxt | 4.5.0 |
| | BCM57417 NetXtreme-E 10GBASE-T RDMA Ethernet Controller (16d9) | net_bnxt | 4.5.0 |
| | BCM57417 NetXtreme-E Ethernet Partition (16cc) | net_bnxt | 4.5.0 |
| | BCM57454 NetXtreme-E 10Gb/25Gb/40Gb/50Gb/100Gb Ethernet (1614) | net_bnxt | 4.5.0 |
| | BCM5745X NetXtreme-E Ethernet Virtual Function (1609) | net_bnxt | 4.5.0 |
| | BCM5745X NetXtreme-E RDMA Virtual Function (1606) | net_bnxt | 4.5.0 |
| | BCM57711 NetXtreme II 10-Gigabit PCIe (164f) | net_bnx2x | 4.5.0 |
| | BCM57800 NetXtreme II 1/10 Gigabit Ethernet (168a) | net_bnx2x | 4.5.0 |
| | BCM57800 NetXtreme II 1/10 Gigabit Ethernet Virtual Function (16a9) | net_bnx2xvf | 4.5.0 |
| | BCM57810 NetXtreme II 10 Gigabit Ethernet (168e) | net_bnx2x | 4.5.0
| | BCM57810 NetXtreme II 10 Gigabit Ethernet Virtual Function (16af) | net_bnx2xvf | 4.5.0 |
| | BCM57811 NetXtreme II 10-Gigabit Ethernet (163d) | net_bnx2x | 4.5.0
| | BCM57811 NetXtreme II 10-Gigabit Ethernet Virtual Function (163f) | net_bnx2xvf | 4.5.0 |
| | BCM57840 NetXtreme II 10 Gigabit Ethernet (16a1) | net_bnx2x | 4.5.0 |
| | BCM57840 NetXtreme II 10/20 Gigabit Ethernet (168d) | net_bnx2x | 4.5.0 |
| | BCM57840 NetXtreme II 10/20 Gigabit Ethernet Virtual Function (16ad) | net_bnx2xvf | 4.5.0 |
| | BCM57840 NetXtreme II 10/20-Gigabit Ethernet (16a2) | net_bnx2x | 4.5.0 |
| | NetXtreme-C Ethernet Virtual Function (16cb) | net_bnxt | 4.5.0 |
| | NetXtreme-C Ethernet Virtual Function (16e1) | net_bnxt | 4.5.0 |
| | NetXtreme-E Ethernet Virtual Function (16d3) | net_bnxt | 4.5.0 |
| | NetXtreme-E Ethernet Virtual Function (16dc) | net_bnxt | 4.5.0 |
| | NetXtreme-E RDMA Virtual Function (16c1) | net_bnxt | 4.5.0 |

## Cavium

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Cavium, Inc. (177d) |	CN23XX [LiquidIO II] SRIOV Virtual Function (9712) | net_liovf | 4.5.0 |
| | THUNDERX Network Interface Controller virtual function (a034) |	net_thunderx | 4.5.0
| | THUNDERX Network Interface Controller virtual function (a034) |	net_thunderx | 4.5.0 |
| | THUNDERX Network Interface Controller virtual function (a034) | net_thunderx | 4.5.0 |
| | THUNDERX ZIP virtual function (a037) | compress_octeonx	| 4.5.0 |

## Chelsio Communications

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Chelsio Communications Inc (1425) | T502-BT Unified Wire Ethernet Controller (5415) | net_cxgbe | 4.5.0 |
| | T502-BT Unified Wire Ethernet Controller [VF] (5815) | net_cxgbevf | 4.5.0 |
| | T504-5082 Unified Wire Ethernet Controller (5482) | net_cxgbe | 4.5.0 |
| | T504-5082 Unified Wire Ethernet Controller [VF] (5882) | net_cxgbevf | 4.5.0 |
| | T504-BT Unified Wire Ethernet Controller (540a) | net_cxgbe | 4.5.0 |
| | T504-BT Unified Wire Ethernet Controller [VF] (580a) | net_cxgbevf | 4.5.0 |
| | T520-5089 Unified Wire Ethernet Controller (5489) | net_cxgbe | 4.5.0 |
| | T520-5089 Unified Wire Ethernet Controller [VF] (5889) | net_cxgbevf | 4.5.0 |
| | T520-5092 Unified Wire Ethernet Controller (5492) | net_cxgbe | 4.5.0 |
| | T520-5092 Unified Wire Ethernet Controller [VF] (5892) | net_cxgbevf | 4.5.0 |
| | T520-5097 Unified Wire Ethernet Controller (5497) | net_cxgbe | 4.5.0 |
| | T520-5097 Unified Wire Ethernet Controller [VF] (5897) | net_cxgbevf | 4.5.0 |
| | T520-509A Unified Wire Ethernet Controller (549a) | net_cxgbe | 4.5.0 |
| | T520-509A Unified Wire Ethernet Controller [VF] (589a) | net_cxgbevf | 4.5.0 |
| | T520-509C Unified Wire Ethernet Controller (549c) | net_cxgbe | 4.5.0 |
| | T520-509C Unified Wire Ethernet Controller [VF] (589c) | net_cxgbevf | 4.5.0 |
| | T520-509E Unified Wire Ethernet Controller (549e) | net_cxgbe | 4.5.0 |
| | T520-509E Unified Wire Ethernet Controller [VF] (589e) | net_cxgbevf | 4.5.0 |
| | T520-50AB Unified Wire Ethernet Controller (54ab) | net_cxgbe | 4.5.0 |
| | T520-50AB Unified Wire Ethernet Controller [VF] (58ab) | net_cxgbevf | 4.5.0 |
| | T520-BCH Unified Wire Ethernet Controller (5404) | net_cxgbe | 4.5.0 |
| | T520-BCH Unified Wire Ethernet Controller [VF] (5804) | net_cxgbevf | 4.5.0 |
| | T520-BT Unified Wire Ethernet Controller (5409) | net_cxgbe | 4.5.0 |
| | T520-BT Unified Wire Ethernet Controller [VF] (5809) | net_cxgbevf | 4.5.0 |
| | T520-CR Unified Wire Ethernet Controller (5401) | net_cxgbe | 4.5.0 |
| | T520-CR Unified Wire Ethernet Controller [VF] (5801) | net_cxgbevf | 4.5.0 |
| | T520-CX Unified Wire Ethernet Controller (5408) | net_cxgbe | 4.5.0 |
| | T520-CX Unified Wire Ethernet Controller [VF] (5808) | net_cxgbevf | 4.5.0 |
| | T520-LL-CR Unified Wire Ethernet Controller (5411) | net_cxgbe | 4.5.0 |
| | T520-LL-CR Unified Wire Ethernet Controller [VF] (5811) | net_cxgbevf | 4.5.0 |
| | T520-OCP-SO Unified Wire Ethernet Controller (5417) | net_cxgbe | 4.5.0 |
| | T520-OCP-SO Unified Wire Ethernet Controller [VF] (5817) | net_cxgbevf | 4.5.0 |
| | T520-SO Unified Wire Ethernet Controller (5407) | net_cxgbe | 4.5.0 |
| | T520-SO Unified Wire Ethernet Controller [VF] (5807) | net_cxgbevf | 4.5.0 |
| | T522-5091 Unified Wire Ethernet Controller (5491) | net_cxgbe | 4.5.0 |
| | T522-5091 Unified Wire Ethernet Controller [VF] (5891) | net_cxgbevf | 4.5.0 |
| | T522-50A5 Unified Wire Ethernet Controller (54a5) | net_cxgbe | 4.5.0 |
| | T522-50A5 Unified Wire Ethernet Controller [VF] (58a5) | net_cxgbevf | 4.5.0 |
| | T522-50A6 Unified Wire Ethernet Controller (54a6) | net_cxgbe | 4.5.0 |
| | T522-50A6 Unified Wire Ethernet Controller [VF] (58a6) | net_cxgbevf | 4.5.0 |
| | T522-CR Unified Wire Ethernet Controller (5402) | net_cxgbe | 4.5.0 |
| | T522-CR Unified Wire Ethernet Controller [VF] (5802) | net_cxgbevf | 4.5.0 |
| | T540-5080 Unified Wire Ethernet Controller (5480) | net_cxgbe | 4.5.0 |
| | T540-5080 Unified Wire Ethernet Controller [VF] (5880) | net_cxgbevf | 4.5.0 |
| | T540-5081 Unified Wire Ethernet Controller (5481) | net_cxgbe | 4.5.0 |
| | T540-5081 Unified Wire Ethernet Controller [VF] (5881) | net_cxgbevf | 4.5.0 |
| | T540-5083 Unified Wire Ethernet Controller (5483) | net_cxgbe | 4.5.0 |
| | T540-5083 Unified Wire Ethernet Controller [VF] (5883) | net_cxgbevf | 4.5.0 |
| | T540-5084 Unified Wire Ethernet Controller (5484) | net_cxgbe | 4.5.0 |
| | T540-5084 Unified Wire Ethernet Controller [VF] (5884) | net_cxgbevf | 4.5.0 |
| | T540-5090 Unified Wire Ethernet Controller (5490) | net_cxgbe | 4.5.0 |
| | T540-5090 Unified Wire Ethernet Controller [VF] (5890) | net_cxgbevf | 4.5.0 |
| | T540-5094 Unified Wire Ethernet Controller (5494) | net_cxgbe | 4.5.0 |
| | T540-5094 Unified Wire Ethernet Controller [VF] (5894) | net_cxgbevf | 4.5.0 |
| | T540-5095 Unified Wire Ethernet Controller (5495) | net_cxgbe | 4.5.0 |
| | T540-5095 Unified Wire Ethernet Controller [VF] (5895) | net_cxgbevf | 4.5.0 |
| | T540-509B Unified Wire Ethernet Controller (549b) | net_cxgbe | 4.5.0 |
| | T540-509B Unified Wire Ethernet Controller [VF] (589b) | net_cxgbevf | 4.5.0 |
| | T540-509D Unified Wire Ethernet Controller (549d) | net_cxgbe | 4.5.0 |
| | T540-509D Unified Wire Ethernet Controller [VF] (589d) | net_cxgbevf | 4.5.0 |
| | T540-509F Unified Wire Ethernet Controller (549f) | net_cxgbe | 4.5.0 |
| | T540-509F Unified Wire Ethernet Controller [VF] (589f) | net_cxgbevf | 4.5.0 |
| | T540-50A0 Unified Wire Ethernet Controller (54a0) | net_cxgbe | 4.5.0 |
| | T540-50A0 Unified Wire Ethernet Controller [VF] (58a0) | net_cxgbevf | 4.5.0 |
| | T540-50A1 Unified Wire Ethernet Controller (54a1) | net_cxgbe | 4.5.0 |
| | T540-50A1 Unified Wire Ethernet Controller [VF] (58a1) | net_cxgbevf | 4.5.0 |
| | T540-50A4 Unified Wire Ethernet Controller (54a4) | net_cxgbe | 4.5.0 |
| | T540-50A4 Unified Wire Ethernet Controller [VF] (58a4) | net_cxgbevf | 4.5.0 |
| | T540-50AC Unified Wire Ethernet Controller (54ac) | net_cxgbe | 4.5.0 |
| | T540-50AC Unified Wire Ethernet Controller [VF] (58ac) | net_cxgbevf | 4.5.0 |
| | T540-BCH Unified Wire Ethernet Controller (5405) | net_cxgbe | 4.5.0 |
| | T540-BCH Unified Wire Ethernet Controller [VF] (5805) | net_cxgbevf | 4.5.0 |
| | T540-BT Unified Wire Ethernet Controller (5418) | net_cxgbe | 4.5.0 |
| | T540-BT Unified Wire Ethernet Controller [VF] (5818) | net_cxgbevf | 4.5.0 |
| | T540-CH Unified Wire Ethernet Controller (5406) | net_cxgbe | 4.5.0 |
| | T540-CH Unified Wire Ethernet Controller [VF] (5806) | net_cxgbevf | 4.5.0 |
| | T540-CR Unified Wire Ethernet Controller (5403) | net_cxgbe | 4.5.0 |
| | T540-CR Unified Wire Ethernet Controller [VF] (5803) | net_cxgbevf | 4.5.0 |
| | T540-LP-CR Unified Wire Ethernet Controller (540e) | net_cxgbe | 4.5.0 |
| | T540-LP-CR Unified Wire Ethernet Controller [VF] (580e) | net_cxgbevf | 4.5.0 |
| | T560-CR Unified Wire Ethernet Controller (5412) | net_cxgbe | 4.5.0 |
| | T560-CR Unified Wire Ethernet Controller [VF] (5812) | net_cxgbevf	
| | T570-5088 Unified Wire Ethernet Controller (5488) | net_cxgbe | 4.5.0 |
| | T570-5088 Unified Wire Ethernet Controller [VF] (5888) | net_cxgbevf | 4.5.0 |
| | T580-5085 Unified Wire Ethernet Controller (5485) | net_cxgbe | 4.5.0 |
| | T580-5085 Unified Wire Ethernet Controller [VF] (5885) | net_cxgbevf | 4.5.0 |
| | T580-5086 Unified Wire Ethernet Controller (5486) | net_cxgbe | 4.5.0 |
| | T580-5086 Unified Wire Ethernet Controller [VF] (5886) | net_cxgbevf | 4.5.0 |
| | T580-5087 Unified Wire Ethernet Controller (5487) | net_cxgbe | 4.5.0 |
| | T580-5087 Unified Wire Ethernet Controller [VF] (5887) | net_cxgbevf | 4.5.0 |
| | T580-5093 Unified Wire Ethernet Controller (5493) | net_cxgbe | 4.5.0 |
| | T580-5093 Unified Wire Ethernet Controller [VF] (5893) | net_cxgbevf | 4.5.0 |
| | T580-5096 Unified Wire Ethernet Controller (5496) | net_cxgbe | 4.5.0 |
| | T580-5096 Unified Wire Ethernet Controller [VF] (5896) | net_cxgbevf | 4.5.0 |
| | T580-5098 Unified Wire Ethernet Controller (5498) | net_cxgbe | 4.5.0 |
| | T580-5098 Unified Wire Ethernet Controller [VF] (5898) | net_cxgbevf | 4.5.0 |
| | T580-5099 Unified Wire Ethernet Controller (5499) | net_cxgbe | 4.5.0 |
| | T580-5099 Unified Wire Ethernet Controller [VF] (5899) | net_cxgbevf | 4.5.0 |
| | T580-50A2 Unified Wire Ethernet Controller (54a2) | net_cxgbe | 4.5.0 |
| | T580-50A2 Unified Wire Ethernet Controller [VF] (58a2) | net_cxgbevf | 4.5.0 |
| | T580-50A3 Unified Wire Ethernet Controller (54a3) | net_cxgbe | 4.5.0 |
| | T580-50A3 Unified Wire Ethernet Controller [VF] (58a3) | net_cxgbevf | 4.5.0 |
| | T580-50A7 Unified Wire Ethernet Controller (54a7) | net_cxgbe | 4.5.0 |
| | T580-50A7 Unified Wire Ethernet Controller [VF] (58a7) | net_cxgbevf | 4.5.0 |
| | T580-50A8 Unified Wire Ethernet Controller (54a8) | net_cxgbe | 4.5.0 |
| | T580-50A8 Unified Wire Ethernet Controller [VF] (58a8) | net_cxgbevf | 4.5.0 |
| | T580-50A9 Unified Wire Ethernet Controller (54a9) | net_cxgbe | 4.5.0 |
| | T580-50A9 Unified Wire Ethernet Controller [VF] (58a9) | net_cxgbevf | 4.5.0 |
| | T580-50AA Unified Wire Ethernet Controller (54aa) | net_cxgbe | 4.5.0 |
| | T580-50AA Unified Wire Ethernet Controller [VF] (58aa) | net_cxgbevf | 4.5.0 |
| | T580-CHR Unified Wire Ethernet Controller (5413) | net_cxgbe | 4.5.0 |
| | T580-CHR Unified Wire Ethernet Controller [VF] (5813) | net_cxgbevf | 4.5.0 |
| | T580-CR Unified Wire Ethernet Controller (540d) | net_cxgbe | 4.5.0 |
| | T580-CR Unified Wire Ethernet Controller [VF] (580d) | net_cxgbevf | 4.5.0 |
| | T580-LP-CR Unified Wire Ethernet Controller (5410) | net_cxgbe | 4.5.0 |
| | T580-LP-CR Unified Wire Ethernet Controller [VF] (5810) | net_cxgbevf | 4.5.0 |
| | T580-OCP-SO Unified Wire Ethernet Controller (5416) | net_cxgbe | 4.5.0 |
| | T580-OCP-SO Unified Wire Ethernet Controller [VF] (5816) | net_cxgbevf | 4.5.0 |
| | T580-SO-CR Unified Wire Ethernet Controller (5414) | net_cxgbe | 4.5.0 |
| | T580-SO-CR Unified Wire Ethernet Controller [VF] (5814) | net_cxgbevf | 4.5.0 |
| | T61100-OCP-SO Unified Wire Ethernet Controller (6414) | net_cxgbe | 4.5.0 |
| | T61100-OCP-SO Unified Wire Ethernet Controller [VF] (6814) | net_cxgbevf | 4.5.0 |
| | T6201-BT Unified Wire Ethernet Controller (6415) | net_cxgbe | 4.5.0 |
| | T6201-BT Unified Wire Ethernet Controller [VF] (6815) | net_cxgbevf | 4.5.0 |
| | T6210-BT Unified Wire Ethernet Controller (6409) | net_cxgbe | 4.5.0 |
| | T6210-BT Unified Wire Ethernet Controller [VF] (6809) | net_cxgbevf | 4.5.0 |
| | T62100-6081 Unified Wire Ethernet Controller (6481) | net_cxgbe | 4.5.0 |
| | T62100-6081 Unified Wire Ethernet Controller [VF] (6881) | net_cxgbevf | 4.5.0 |
| | T62100-6083 Unified Wire Ethernet Controller (6483) | net_cxgbe | 4.5.0 |
| | T62100-6083 Unified Wire Ethernet Controller [VF] (6883) | net_cxgbevf | 4.5.0 |
| | T62100-CR Unified Wire Ethernet Controller (640d) | net_cxgbe | 4.5.0 |
| | T62100-CR Unified Wire Ethernet Controller [VF] (680d) | net_cxgbevf | 4.5.0 |
| | T62100-LP-CR Unified Wire Ethernet Controller (6407) | net_cxgbe | 4.5.0 |
| | T62100-LP-CR Unified Wire Ethernet Controller [VF] (6807) | net_cxgbevf | 4.5.0 |
| | T62100-OCP-SO Unified Wire Ethernet Controller (6406) | net_cxgbe | 4.5.0 |
| | T62100-OCP-SO Unified Wire Ethernet Controller [VF] (6806) | net_cxgbevf | 4.5.0 |
| | T62100-SO-CR Unified Wire Ethernet Controller (6408) | net_cxgbe | 4.5.0 |
| | T62100-SO-CR Unified Wire Ethernet Controller [VF] (6808) | net_cxgbevf | 4.5.0 |
| | T6225-6080 Unified Wire Ethernet Controller (6480) | net_cxgbe | 4.5.0 |
| | T6225-6080 Unified Wire Ethernet Controller [VF] (6880) | net_cxgbevf | 4.5.0 |
| | T6225-6082 Unified Wire Ethernet Controller (6482) | net_cxgbe | 4.5.0 |
| | T6225-6082 Unified Wire Ethernet Controller [VF] (6882) | net_cxgbevf | 4.5.0 |
| | T6225-6086 Unified Wire Ethernet Controller (6486) | net_cxgbe | 4.5.0 |
| | T6225-6086 Unified Wire Ethernet Controller [VF] (6886) | net_cxgbevf | 4.5.0 |
| | T6225-6087 Unified Wire Ethernet Controller (6487) | net_cxgbe | 4.5.0 |
| | T6225-6087 Unified Wire Ethernet Controller [VF] (6887) | net_cxgbevf | 4.5.0 |
| | T6225-CR Unified Wire Ethernet Controller (6401) | net_cxgbe | 4.5.0 |
| | T6225-CR Unified Wire Ethernet Controller [VF] (6801) | net_cxgbevf | 4.5.0 |
| | T6225-LL-CR Unified Wire Ethernet Controller (6411) | net_cxgbe | 4.5.0 |
| | T6225-LL-CR Unified Wire Ethernet Controller [VF] (6811) | net_cxgbevf | 4.5.0 |
| | T6225-OCP-SO Unified Wire Ethernet Controller (6405) | net_cxgbe | 4.5.0 |
| | T6225-OCP-SO Unified Wire Ethernet Controller [VF] (6805) | net_cxgbevf | 4.5.0 |
| | T6225-SO-CR Unified Wire Ethernet Controller (6402) | net_cxgbe | 4.5.0 |
| | T6225-SO-CR Unified Wire Ethernet Controller [VF] (6802) | net_cxgbevf | 4.5.0 |
| | T6240-6085 Unified Wire Ethernet Controller (6485) | net_cxgbe | 4.5.0 |
| | T6240-6085 Unified Wire Ethernet Controller [VF] (6885) | net_cxgbevf | 4.5.0 |
| | T64100-6084 Unified Wire Ethernet Controller (6484) | net_cxgbe | 4.5.0 |
| | T64100-6084 Unified Wire Ethernet Controller [VF] (6884) | net_cxgbevf | 4.5.0 |
| | T6425-CR Unified Wire Ethernet Controller (6403) | net_cxgbe | 4.5.0 |
| | T6425-CR Unified Wire Ethernet Controller [VF] (6803) | net_cxgbevf | 4.5.0 |
| | T6425-SO-CR Unified Wire Ethernet Controller (6404) | net_cxgbe | 4.5.0 |
| | T6425-SO-CR Unified Wire Ethernet Controller [VF] (6804) | net_cxgbevf | 4.5.0 |

## Intel Corporation

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Intel Corporation (8086) | 10 Gigabit BR KX4 Dual Port Network Connection (10f7) | net_ixgbe | 4.5.0 |
| | 82540EM Gigabit Ethernet Controller (100e) | net_e1000_em | 4.5.0 |
| | 82545EM Gigabit Ethernet Controller (Copper) (100f) | net_e1000_em | 4.5.0 |
| | 82545EM Gigabit Ethernet Controller (Fiber) (1011) | net_e1000_em | 4.5.0 |
| | 82546EB Gigabit Ethernet Controller (101d) | net_e1000_em | 4.5.0 |
| | 82546EB Gigabit Ethernet Controller (Copper) (1010) | net_e1000_em | 4.5.0 |
| | 82546EB Gigabit Ethernet Controller (Fiber) (1012) | net_e1000_em | 4.5.0 |
| | 82571EB Dual Port Gigabit Mezzanine Adapter (10d9) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (105e) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (105f) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (1060) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (10a4) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (Copper) (10bc) | net_e1000_em | 4.5.0 |
| | 82571EB Gigabit Ethernet Controller (Fiber) (10a5) | net_e1000_em | 4.5.0 |
| | 82571EB Quad Port Gigabit Mezzanine Adapter (10da) | net_e1000_em | 4.5.0 |
| | 82571PT Gigabit PT Quad Port Server ExpressModule (10d5) | net_e1000_em | 4.5.0 |
| | 82572EI Gigabit Ethernet Controller (107f) | net_e1000_em | 4.5.0 |
| | 82572EI Gigabit Ethernet Controller (Copper) (107d) | net_e1000_em | 4.5.0 |
| | 82572EI Gigabit Ethernet Controller (Copper) (10b9) | net_e1000_em | 4.5.0 |
| | 82572EI Gigabit Ethernet Controller (Fiber) (107e) | net_e1000_em | 4.5.0 |
| | 82573L Gigabit Ethernet Controller (109a) | net_e1000_em | 4.5.0 |
| | 82574L Gigabit Network Connection (10d3) | net_e1000_em | 4.5.0 |
| | 82574L Gigabit Network Connection (10f6) | net_e1000_em | 4.5.0 |
| | 82575EB Gigabit Backplane Connection (10a9) | net_e1000_igb	| 4.5.0
| | 82575EB Gigabit Network Connection (10a7) | net_e1000_igb | 4.5.0 |
| | 82575GB Gigabit Network Connection (10d6) | net_e1000_igb | 4.5.0 |
| | 82576 Gigabit Backplane Connection (150d) | net_e1000_igb | 4.5.0 |
| | 82576 Gigabit Network Connection (10c9) | net_e1000_igb	| 4.5.0 |
| | 82576 Gigabit Network Connection (10e6) | net_e1000_igb	| 4.5.0 |
| | 82576 Gigabit Network Connection (10e7) | net_e1000_igb	| 4.5.0 |
| | 82576 Gigabit Network Connection (10e8) | net_e1000_igb	| 4.5.0 |
| | 82576 Gigabit Network Connection (1526) | net_e1000_igb	| 4.5.0 |
| | 82576 Virtual Function (10ca) | net_e1000_igb_vf | 4.5.0 |
| | 82576NS Gigabit Network Connection (150a) | net_e1000_igb | 4.5.0 |
| | 82576NS SerDes Gigabit Network Connection (1518) | net_e1000_igb | 4.5.0 |
| | 82579LM Gigabit Network Connection (Lewisville) (1502) | net_e1000_em | 4.5.0 |
| | 82580 Gigabit Backplane Connection (1510) | net_e1000_igb | 4.5.0 |
| | 82580 Gigabit Fiber Network Connection (150f) | net_e1000_igb | 4.5.0 |
| | 82580 Gigabit Fiber Network Connection (1527) | net_e1000_igb | 4.5.0 |
| | 82580 Gigabit Network Connection (150e) | net_e1000_igb	| 4.5.0
| | 82580 Gigabit Network Connection (1516) | net_e1000_igb	| 4.5.0
| | 82580 Gigabit SFP Connection (1511) | net_e1000_igb	| 4.5.0
| | 82583V Gigabit Network Connection (150c) | net_e1000_em | 4.5.0 |
| | 82598 10GbE PCI-Express Ethernet Controller (10b6) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AF Dual Port Network Connection (10c6) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AF Dual Port Network Connection (10e1) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AF Dual Port Network Connection (10f1) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AF Network Connection (10c7) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AF Network Connection (10f4) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AT CX4 Network Connection (10dd) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AT CX4 Network Connection (10ec) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AT Network Connection (10c8) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit AT2 Server Adapter (150b) | net_ixgbe | 4.5.0 |
| | 82598EB 10-Gigabit Dual Port Network Connection (10db) | net_ixgbe | 4.5.0 |
| | 82598EB Gigabit BX Network Connection (1508) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Dual Port Backplane Connection (10f8) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Dual Port Backplane Connection with FCoE (152a) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Dual Port Network Connection (10f9) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Dual Port Network Connection (10fc) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Dual Port Network Connection with FCoE (1529) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit Network Connection (1557) | net_ixgbe | 4.5.0 |
| | 82599 10 Gigabit TN Network Connection (151c) | net_ixgbe | 4.5.0 |
| | 82599 Ethernet Controller Virtual Function (10ed) | net_ixgbe_vf | 4.5.0 |
| | 82599 Virtual Function (152e) | net_ixgbe_vf | 4.5.0 |
| | 82599ES 10 Gigabit Network Connection (1517) | net_ixgbe | 4.5.0 |
| | 82599ES 10-Gigabit SFI/SFP+ Network Connection (10fb) | net_ixgbe | 4.5.0 |
| | Ethernet 10G 2P X520 Adapter (154d) | net_ixgbe | 4.5.0 |
| | Ethernet Adaptive Virtual Function (1889) | net_iavf | 4.5.0 |
| | Ethernet Connection (2) I218-LM (15a0) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (2) I218-V (15a1) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (2) I219-LM (15b7) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (2) I219-V (15b8) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (3) I218-LM (15a2) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (3) I218-V (15a3) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (3) I219-LM (15b9) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (4) I219-LM (15d7) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (4) I219-V (15d8) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (5) I219-LM (15e3) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (5) I219-V (15d6) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (6) I219-LM (15bd) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (6) I219-V (15be) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (7) I219-LM (15bb) | net_e1000_em | 4.5.0 |
| | Ethernet Connection (7) I219-V (15bc) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I217-LM (153a) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I217-V (153b) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I218-LM (155a) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I218-V (1559) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I219-LM (156f) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I219-V (1570) | net_e1000_em | 4.5.0 |
| | Ethernet Connection I354 (1f41) | net_e1000_igb	| 4.5.0
| | Ethernet Connection I354 1.0 GbE Backplane (1f40) | net_e1000_igb | 4.5.0 |
| | Ethernet Connection I354 2.5 GbE Backplane (1f45) | net_e1000_igb | 4.5.0 |
| | Ethernet Connection X552 10 GbE Backplane (15aa) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X552 10 GbE Backplane (15ab) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X552 10 GbE SFP+ (15ac) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X552 1000BASE-T (15ae) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X552 Virtual Function (15a8) | net_ixgbe_vf | 4.5.0 |
| | Ethernet Connection X552/X557-AT 10GBASE-T (15ad) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 10 GbE SFP+ (15c4) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 10 GbE SFP+ (15ce) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 1GbE (15c6) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 1GbE (15c7) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 1GbE (15e4) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 1GbE (15e5) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 Backplane (15c2) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553 Backplane (15c3) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X553/X557-AT 10GBASE-T (15c8) | net_ixgbe | 4.5.0 |
| | Ethernet Connection X722 for 10GBASE-T (37d2) | net_i40e | 4.5.0 |
| | Ethernet Connection X722 for 10GbE backplane (37ce) | net_i40e | 4.5.0 |
| | Ethernet Connection X722 for 10GbE QSFP+ (37cf) | net_i40e | 4.5.0 |
| | Ethernet Connection X722 for 10GbE SFP+ (37d0) | net_i40e | 4.5.0 |
| | Ethernet Connection X722 for 10GbE SFP+ (37d3) | net_i40e | 4.5.0 |
| | Ethernet Connection X722 for 1GbE (37d1) | net_i40e | 4.5.0 |
| | Ethernet Controller 10-Gigabit X540-AT2 (1528) | net_ixgbe | 4.5.0 |
| | Ethernet Controller 10G X550T (1563) | net_ixgbe | 4.5.0 |
| | Ethernet Controller 10G X550T (15d1) | net_ixgbe | 4.5.0 |
| | Ethernet Controller X540 (1560) | net_ixgbe | 4.5.0 |
| | Ethernet Controller X710 for 10GBASE-T (1586) | net_i40e | 4.5.0 |
| | Ethernet Controller X710 for 10GbE backplane (1581) | net_i40e | 4.5.0 |
| | Ethernet Controller X710 for 10GbE QSFP+ (1585) | net_i40e | 4.5.0 |
| | Ethernet Controller X710 for 10GbE SFP+ (1572) | net_i40e | 4.5.0 |
| | Ethernet Controller X710/X557-AT 10GBASE-T (1589) | net_i40e | 4.5.0 |
| | Ethernet Controller XL710 for 20GbE backplane (1587) | net_i40e | 4.5.0 |
| | Ethernet Controller XL710 for 20GbE backplane (1588) | net_i40e | 4.5.0 |
| | Ethernet Controller XL710 for 40GbE backplane (1580) | net_i40e | 4.5.0 |
| | Ethernet Controller XL710 for 40GbE QSFP+ (1583) | net_i40e | 4.5.0 |
| | Ethernet Controller XL710 for 40GbE QSFP+ (1584) | net_i40e | 4.5.0 |
| | Ethernet Controller XXV710 for 25GbE backplane (158a) | net_i40e | 4.5.0 |
| | Ethernet Controller XXV710 for 25GbE SFP28 (158b) | net_i40e | 4.5.0 |
| | Ethernet Converged Network Adapter X520-Q1 (1558) | net_ixgbe | 4.5.0 |
| | Ethernet Express Module X520-P2 (1507) | net_ixgbe | 4.5.0 |
| | Ethernet SDI Adapter (15d0) | net_fm10k	| 4.5.0 |
| | Ethernet Server Adapter X520-4 (154a) | net_ixgbe | 4.5.0 |
| | Ethernet Switch FM10000 Host Interface (15a4) | net_fm10k | 4.5.0 |
| | Ethernet Switch FM10000 Host Virtual Interface (15a5) | net_fm10k | 4.5.0 |
| | Ethernet Virtual Function 700 Series (154c) | net_i40e_vf | 4.5.0 |
| | Ethernet Virtual Function 700 Series (1571) | net_i40e_vf | 4.5.0 |
| | Ethernet Virtual Function 700 Series (37cd) | net_i40e_vf | 4.5.0 |
| | Ethernet X520 10GbE Dual Port KX4 Mezz (1514) | net_ixgbe | 4.5.0 |
| | I210 Gigabit Backplane Connection (1537) | net_e1000_igb | 4.5.0 |
| | I210 Gigabit Backplane Connection (157c) | net_e1000_igb	| 4.5.0
| | I210 Gigabit Fiber Network Connection (1536) | net_e1000_igb	| 4.5.0
| | I210 Gigabit Network Connection (1533) | net_e1000_igb | 4.5.0 |
| | I210 Gigabit Network Connection (1538) | net_e1000_igb | 4.5.0 |
| | I210 Gigabit Network Connection (157b) | net_e1000_igb | 4.5.0 |
| | I211 Gigabit Network Connection (1539) | net_e1000_igb | 4.5.0 |
| | I350 Ethernet Controller Virtual Function (1520) | net_e1000_igb_vf | 4.5.0 |
| | I350 Gigabit Backplane Connection (1523) | net_e1000_igb | 4.5.0 |
| | I350 Gigabit Connection (1524) | net_e1000_igb | 4.5.0 |
| | I350 Gigabit Fiber Network Connection (1522) | net_e1000_igb | 4.5.0 |
| | I350 Gigabit Network Connection (1521) | net_e1000_igb | 4.5.0 |
| | I350 Virtual Function (152f) | net_e1000_igb_vf | 4.5.0 |
| | X540 Ethernet Controller Virtual Function (1515) | net_ixgbe_vf | 4.5.0 |
| | X540 Virtual Function (1530) | net_ixgbe_vf | 4.5.0 |
| | X550 Virtual Function (1564) | net_ixgbe_vf | 4.5.0 |
| | X550 Virtual Function (1565) | net_ixgbe_vf | 4.5.0 |
| | X552 Virtual Function (15a9) | net_ixgbe_vf | 4.5.0 |
| | X553 Virtual Function (15b4) | net_ixgbe_vf | 4.5.0 |
| | X553 Virtual Function (15c5) | net_ixgbe_vf | 4.5.0 |

## Mellanox

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Mellanox Technologies (15b3) | MT27500 Family [ConnectX-3] (1003) | net_mlx4 | 4.5.0 |
| | MT27500/MT27520 Family [ConnectX-3/ConnectX-3 Pro Virtual Function] (1004) | net_mlx4 | 4.5.0 |
| | MT27520 Family [ConnectX-3 Pro] (1007) | net_mlx4 | 4.5.0 |
| | MT27700 Family [ConnectX-4 Virtual Function] (1014) | net_mlx5	| 4.5.0 |
| | MT27700 Family [ConnectX-4] (1013) | net_mlx5 | 4.5.0 |
| | MT27710 Family [ConnectX-4 Lx Virtual Function] (1016) | net_mlx5 | 4.5.0 |
| | MT27710 Family [ConnectX-4 Lx] (1015) | net_mlx5 | 4.5.0 |
| | MT27800 Family [ConnectX-5 Virtual Function] (1018) | net_mlx5	| 4.5.0 |
| | MT27800 Family [ConnectX-5] (1017) | net_mlx5	| 4.5.0 |
| | MT28800 Family [ConnectX-5 Ex Virtual Function] (101a) | net_mlx5 | 4.5.0 |
| | MT28800 Family [ConnectX-5 Ex] (1019) | net_mlx5 | 4.5.0 |
| | MT28908 Family [ConnectX-6 Virtual Function] (101c) | net_mlx5	| 4.5.0 |
| | MT28908 Family [ConnectX-6] (101b) | net_mlx5	| 4.5.0 |
| | MT416842 BlueField integrated ConnectX-5 network controller (a2d2) | net_mlx5	| 4.5.0 |
| | MT416842 BlueField multicore SoC family VF (a2d3) | net_mlx5 | 4.5.0 | |

## QLogic

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| QLogic Corp. (1077) | FastLinQ QL41000 Series 10/25/40/50GbE Controller (8070) | net_qede	| 4.5.0 |
| | FastLinQ QL41000 Series Gigabit Ethernet Controller (SR-IOV VF) (8090) | net_qede_vf	| 4.5.0 |
| | FastLinQ QL45000 Series 100GbE Controller (1644) | net_qede	| 4.5.0 |
| | FastLinQ QL45000 Series 25GbE Controller (1656) | net_qede	| 4.5.0 |
| | FastLinQ QL45000 Series 40GbE Controller (1634) | net_qede	| 4.5.0 |
| | FastLinQ QL45000 Series 40GbE Controller (1634) | net_qede	| 4.5.0 |
| | FastLinQ QL45000 Series 50GbE Controller (1654) | net_qede	| 4.5.0 |
| | FastLinQ QL45000 Series Gigabit Ethernet Controller (SR-IOV VF) (1664) | net_qede_vf	| 4.5.0 |

## Red Hat

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Red Hat, Inc. (1af4) |Inter-VM shared memory (1110) | net_avp	| 4.5.0 |
| | Virtio network device (1000) | net_virtio | 4.5.0 |
| | Virtio network device (1041) | net_ifcvf | 4.5.0 |
| | Virtio network device (1041) | net_virtio | 4.5.0 |

## Solarflare

| Vendor ID | Device ID | Driver | SSR/128T Version Introduced |
| --- | --- | --- | --- |
| Solarflare CommuVendor IDations (1924) | SFC9120 10G Ethernet Controller (Virtual Function) (1903) | net_sfc_efx | 4.5.0 |
| | SFC9140 10/40G Ethernet Controller (Virtual Function) (1923) | net_sfc_efx | 4.5.0 |
| | SFC9220 10/40G Ethernet Controller (Virtual Function) (1a03) | net_sfc_efx | 4.5.0 |
| | SFC9250 10/25/40/50/100G Ethernet Controller (Virtual Function) (1b03) | net_sfc_efx | 4.5.0 |

