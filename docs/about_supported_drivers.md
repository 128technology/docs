---
title: Supported NICs and Drivers
sidebar_label: Supported NICs and Drivers
---

Use the linux command `lspci -nn` to obtain the PCI device label, and the vendor:device combo. For example:
```
00:03.0 Ethernet controller [0200]: Intel Corporation 82540EM Gigabit Ethernet Controller [8086:100e] (rev 03)
```


Use the links below to identify supported NICs and drivers for use with the SSR software.

- [Amazon](#amazon)
- [Aquantia Corp.](#aquantia-corp)
- [Atomic Rules](#atomic-rules)
- [Broadcom](#broadcom)
- [Cavium](#cavium)
- [Chelsio Communications](#chelsio-communications)
- [Cisco](#cisco)
- [Freescale Semiconductor](#freescale-semiconductor)
- [Intel Corporation](#intel-corporation)
- [Mellanox Technologies](#mellanox)
- [QLogic Corp](#qlogic)
- [Red Hat](#red-hat)
- [Solarflare Communications](#solarflare)
- [VMWare](#vmware)

## Amazon

| NIC | Device ID | Driver | Supported SSR/128T Version |
| --- | --- | --- | --- |
| Amazon.com, Inc. (1d0f) | Elastic Network Adapter (ENA) (ec20) | net_ena | 4.5.0 - 5.3.0 | 

## Aquantia Corp

| NIC | Device ID | Driver | Supported SSR/128T Version |
| --- | --- | --- | --- |
| Aquantia Corp. (1d6a) | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d107) | net_atlantic | 4.5.0 - 5.3.0 |
| | AQC108 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d108) | net_atlantic | 4.5.0 - 5.3.0 |
| | AQC111 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (11b1) | net_atlantic | 4.5.0 - 5.3.0 |
| | AQC112 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (12b1) | net_atlantic | 4.5.0 - 5.3.0 |
| | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (87b1) | net_atlantic | 4.5.0 - 5.3.0 |

## Atomic Rules

| NIC | Device ID | Driver | Supported SSR/128T Version |
| --- | --- | --- | --- |
|Atomic Rules LLC (1d6c) | AR-ARKA-FX0 Arkville 32B DPDK Data Mover (100d) | net_ark | 4.5.0 - 5.3.0 |
| | AR-ARKA-FX1 Arkville 64B DPDK Data Mover (100e) | net_ark | 4.5.0 - 5.3.0 |

## Broadcom	

| Vendor ID | Device ID | Driver | Supported SSR/128T Version |
| --- | --- | --- | --- |
| Broadcom Limited (14e4) | BCM57301 NetXtreme-C 10Gb Ethernet Controller (16c8) | net_bnxt	| 4.5.0 - 5.3.0 |
| | BCM57302 NetXtreme-C 10Gb/25Gb Ethernet Controller (16c9) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57304 NetXtreme-C 10Gb/25Gb/40Gb/50Gb Ethernet Controller (16ca) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57311 NetXtreme-C 10Gb RDMA Ethernet Controller (16ce) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57312 NetXtreme-C 10Gb/25Gb RDMA Ethernet Controller (16cf) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57314 NetXtreme-C 10Gb/25Gb/40Gb/50Gb RDMA Ethernet Controller (16df) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57402 NetXtreme-E 10Gb Ethernet Controller (16d0) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57402 NetXtreme-E Ethernet Partition (16d4) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57404 NetXtreme-E 10Gb/25Gb Ethernet Controller (16d1) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57404 NetXtreme-E Ethernet Partition (16e7) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57406 NetXtreme-E 10GBASE-T Ethernet Controller (16d2) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57406 NetXtreme-E Ethernet Partition (16e8) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57407 NetXtreme-E 10GBase-T Ethernet Controller (16d5) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57407 NetXtreme-E 25Gb Ethernet Controller (16e9) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57412 NetXtreme-E 10Gb RDMA Ethernet Controller (16d6) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57412 NetXtreme-E Ethernet Partition (16de) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57414 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16d7) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57414 NetXtreme-E Ethernet Partition (16ec) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57416 NetXtreme-E 10Gb RDMA Ethernet Controller (16e3) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57416 NetXtreme-E Dual-Media 10G RDMA Ethernet Controller (16d8) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57416 NetXtreme-E Ethernet Partition (16ee) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57417 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16e2) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57417 NetXtreme-E 10GBASE-T RDMA Ethernet Controller (16d9) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57417 NetXtreme-E Ethernet Partition (16cc) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57454 NetXtreme-E 10Gb/25Gb/40Gb/50Gb/100Gb Ethernet (1614) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM5745X NetXtreme-E Ethernet Virtual Function (1609) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM5745X NetXtreme-E RDMA Virtual Function (1606) | net_bnxt | 4.5.0 - 5.3.0 |
| | BCM57711 NetXtreme II 10-Gigabit PCIe (164f) | net_bnx2x | 4.5.0 - 5.3.0 |
| | BCM57800 NetXtreme II 1/10 Gigabit Ethernet (168a) | net_bnx2x | 4.5.0 - 5.3.0 |
| | BCM57800 NetXtreme II 1/10 Gigabit Ethernet Virtual Function (16a9) | net_bnx2xvf | 4.5.0 - 5.3.0 |
| | BCM57810 NetXtreme II 10 Gigabit Ethernet (168e) | net_bnx2x | 4.5.0 - 5.3.0
| | BCM57810 NetXtreme II 10 Gigabit Ethernet Virtual Function (16af) | net_bnx2xvf | 4.5.0 - 5.3.0 |
| | BCM57811 NetXtreme II 10-Gigabit Ethernet (163d) | net_bnx2x | 4.5.0 - 5.3.0
| | BCM57811 NetXtreme II 10-Gigabit Ethernet Virtual Function (163f) | net_bnx2xvf | 4.5.0 - 5.3.0 |
| | BCM57840 NetXtreme II 10 Gigabit Ethernet (16a1) | net_bnx2x | 4.5.0 - 5.3.0 |
| | BCM57840 NetXtreme II 10/20 Gigabit Ethernet (168d) | net_bnx2x | 4.5.0 - 5.3.0 |
| | BCM57840 NetXtreme II 10/20 Gigabit Ethernet Virtual Function (16ad) | net_bnx2xvf | 4.5.0 - 5.3.0 |
| | BCM57840 NetXtreme II 10/20-Gigabit Ethernet (16a2) | net_bnx2x | 4.5.0 - 5.3.0 |
| | NetXtreme-C Ethernet Virtual Function (16cb) | net_bnxt | 4.5.0 - 5.3.0 |
| | NetXtreme-C Ethernet Virtual Function (16e1) | net_bnxt | 4.5.0 - 5.3.0 |
| | NetXtreme-E Ethernet Virtual Function (16d3) | net_bnxt | 4.5.0 - 5.3.0 |
| | NetXtreme-E Ethernet Virtual Function (16dc) | net_bnxt | 4.5.0 - 5.3.0 |
| | NetXtreme-E RDMA Virtual Function (16c1) | net_bnxt | 4.5.0 - 5.3.0 |

## Cavium

### Driver: net_liovf
#### Dependencies: * igb_uio | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cavium, Inc. (177d) | CN23XX [LiquidIO II] SRIOV Virtual Function (9712) | All |

### Driver: net_thunderx
Parameters:  `skip_data_bytes=<int>`
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cavium, Inc. (177d) | THUNDERX Network Interface Controller virtual function (a034) | (Unknown Subdevice) |
| | THUNDERX Network Interface Controller virtual function (a034) | (Unknown Subdevice) |
| | THUNDERX Network Interface Controller virtual function (a034) | (Unknown Subdevice) |

### Driver: compress_octeonx

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cavium, Inc. (177d) | THUNDERX ZIP virtual function (a037) | All |

## Chelsio Communications

| Vendor ID | Device ID | Driver | Supported SSR/128T Version |
| --- | --- | --- | --- |
| Chelsio Communications Inc (1425) | T502-BT Unified Wire Ethernet Controller (5415) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T502-BT Unified Wire Ethernet Controller [VF] (5815) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T504-5082 Unified Wire Ethernet Controller (5482) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T504-5082 Unified Wire Ethernet Controller [VF] (5882) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T504-BT Unified Wire Ethernet Controller (540a) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T504-BT Unified Wire Ethernet Controller [VF] (580a) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-5089 Unified Wire Ethernet Controller (5489) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-5089 Unified Wire Ethernet Controller [VF] (5889) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-5092 Unified Wire Ethernet Controller (5492) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-5092 Unified Wire Ethernet Controller [VF] (5892) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-5097 Unified Wire Ethernet Controller (5497) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-5097 Unified Wire Ethernet Controller [VF] (5897) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-509A Unified Wire Ethernet Controller (549a) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-509A Unified Wire Ethernet Controller [VF] (589a) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-509C Unified Wire Ethernet Controller (549c) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-509C Unified Wire Ethernet Controller [VF] (589c) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-509E Unified Wire Ethernet Controller (549e) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-509E Unified Wire Ethernet Controller [VF] (589e) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-50AB Unified Wire Ethernet Controller (54ab) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-50AB Unified Wire Ethernet Controller [VF] (58ab) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-BCH Unified Wire Ethernet Controller (5404) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-BCH Unified Wire Ethernet Controller [VF] (5804) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-BT Unified Wire Ethernet Controller (5409) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-BT Unified Wire Ethernet Controller [VF] (5809) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-CR Unified Wire Ethernet Controller (5401) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-CR Unified Wire Ethernet Controller [VF] (5801) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-CX Unified Wire Ethernet Controller (5408) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-CX Unified Wire Ethernet Controller [VF] (5808) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-LL-CR Unified Wire Ethernet Controller (5411) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-LL-CR Unified Wire Ethernet Controller [VF] (5811) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-OCP-SO Unified Wire Ethernet Controller (5417) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-OCP-SO Unified Wire Ethernet Controller [VF] (5817) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T520-SO Unified Wire Ethernet Controller (5407) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T520-SO Unified Wire Ethernet Controller [VF] (5807) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T522-5091 Unified Wire Ethernet Controller (5491) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T522-5091 Unified Wire Ethernet Controller [VF] (5891) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T522-50A5 Unified Wire Ethernet Controller (54a5) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T522-50A5 Unified Wire Ethernet Controller [VF] (58a5) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T522-50A6 Unified Wire Ethernet Controller (54a6) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T522-50A6 Unified Wire Ethernet Controller [VF] (58a6) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T522-CR Unified Wire Ethernet Controller (5402) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T522-CR Unified Wire Ethernet Controller [VF] (5802) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5080 Unified Wire Ethernet Controller (5480) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5080 Unified Wire Ethernet Controller [VF] (5880) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5081 Unified Wire Ethernet Controller (5481) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5081 Unified Wire Ethernet Controller [VF] (5881) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5083 Unified Wire Ethernet Controller (5483) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5083 Unified Wire Ethernet Controller [VF] (5883) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5084 Unified Wire Ethernet Controller (5484) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5084 Unified Wire Ethernet Controller [VF] (5884) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5090 Unified Wire Ethernet Controller (5490) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5090 Unified Wire Ethernet Controller [VF] (5890) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5094 Unified Wire Ethernet Controller (5494) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5094 Unified Wire Ethernet Controller [VF] (5894) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-5095 Unified Wire Ethernet Controller (5495) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-5095 Unified Wire Ethernet Controller [VF] (5895) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-509B Unified Wire Ethernet Controller (549b) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-509B Unified Wire Ethernet Controller [VF] (589b) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-509D Unified Wire Ethernet Controller (549d) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-509D Unified Wire Ethernet Controller [VF] (589d) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-509F Unified Wire Ethernet Controller (549f) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-509F Unified Wire Ethernet Controller [VF] (589f) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-50A0 Unified Wire Ethernet Controller (54a0) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-50A0 Unified Wire Ethernet Controller [VF] (58a0) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-50A1 Unified Wire Ethernet Controller (54a1) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-50A1 Unified Wire Ethernet Controller [VF] (58a1) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-50A4 Unified Wire Ethernet Controller (54a4) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-50A4 Unified Wire Ethernet Controller [VF] (58a4) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-50AC Unified Wire Ethernet Controller (54ac) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-50AC Unified Wire Ethernet Controller [VF] (58ac) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-BCH Unified Wire Ethernet Controller (5405) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-BCH Unified Wire Ethernet Controller [VF] (5805) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-BT Unified Wire Ethernet Controller (5418) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-BT Unified Wire Ethernet Controller [VF] (5818) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-CH Unified Wire Ethernet Controller (5406) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-CH Unified Wire Ethernet Controller [VF] (5806) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-CR Unified Wire Ethernet Controller (5403) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-CR Unified Wire Ethernet Controller [VF] (5803) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T540-LP-CR Unified Wire Ethernet Controller (540e) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T540-LP-CR Unified Wire Ethernet Controller [VF] (580e) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T560-CR Unified Wire Ethernet Controller (5412) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T560-CR Unified Wire Ethernet Controller [VF] (5812) | net_cxgbevf	
| | T570-5088 Unified Wire Ethernet Controller (5488) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T570-5088 Unified Wire Ethernet Controller [VF] (5888) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5085 Unified Wire Ethernet Controller (5485) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5085 Unified Wire Ethernet Controller [VF] (5885) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5086 Unified Wire Ethernet Controller (5486) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5086 Unified Wire Ethernet Controller [VF] (5886) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5087 Unified Wire Ethernet Controller (5487) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5087 Unified Wire Ethernet Controller [VF] (5887) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5093 Unified Wire Ethernet Controller (5493) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5093 Unified Wire Ethernet Controller [VF] (5893) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5096 Unified Wire Ethernet Controller (5496) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5096 Unified Wire Ethernet Controller [VF] (5896) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5098 Unified Wire Ethernet Controller (5498) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5098 Unified Wire Ethernet Controller [VF] (5898) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-5099 Unified Wire Ethernet Controller (5499) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-5099 Unified Wire Ethernet Controller [VF] (5899) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50A2 Unified Wire Ethernet Controller (54a2) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50A2 Unified Wire Ethernet Controller [VF] (58a2) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50A3 Unified Wire Ethernet Controller (54a3) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50A3 Unified Wire Ethernet Controller [VF] (58a3) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50A7 Unified Wire Ethernet Controller (54a7) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50A7 Unified Wire Ethernet Controller [VF] (58a7) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50A8 Unified Wire Ethernet Controller (54a8) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50A8 Unified Wire Ethernet Controller [VF] (58a8) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50A9 Unified Wire Ethernet Controller (54a9) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50A9 Unified Wire Ethernet Controller [VF] (58a9) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-50AA Unified Wire Ethernet Controller (54aa) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-50AA Unified Wire Ethernet Controller [VF] (58aa) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-CHR Unified Wire Ethernet Controller (5413) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-CHR Unified Wire Ethernet Controller [VF] (5813) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-CR Unified Wire Ethernet Controller (540d) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-CR Unified Wire Ethernet Controller [VF] (580d) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-LP-CR Unified Wire Ethernet Controller (5410) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-LP-CR Unified Wire Ethernet Controller [VF] (5810) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-OCP-SO Unified Wire Ethernet Controller (5416) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-OCP-SO Unified Wire Ethernet Controller [VF] (5816) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T580-SO-CR Unified Wire Ethernet Controller (5414) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T580-SO-CR Unified Wire Ethernet Controller [VF] (5814) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T61100-OCP-SO Unified Wire Ethernet Controller (6414) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T61100-OCP-SO Unified Wire Ethernet Controller [VF] (6814) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6201-BT Unified Wire Ethernet Controller (6415) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6201-BT Unified Wire Ethernet Controller [VF] (6815) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6210-BT Unified Wire Ethernet Controller (6409) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6210-BT Unified Wire Ethernet Controller [VF] (6809) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-6081 Unified Wire Ethernet Controller (6481) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-6081 Unified Wire Ethernet Controller [VF] (6881) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-6083 Unified Wire Ethernet Controller (6483) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-6083 Unified Wire Ethernet Controller [VF] (6883) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-CR Unified Wire Ethernet Controller (640d) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-CR Unified Wire Ethernet Controller [VF] (680d) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-LP-CR Unified Wire Ethernet Controller (6407) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-LP-CR Unified Wire Ethernet Controller [VF] (6807) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-OCP-SO Unified Wire Ethernet Controller (6406) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-OCP-SO Unified Wire Ethernet Controller [VF] (6806) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T62100-SO-CR Unified Wire Ethernet Controller (6408) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T62100-SO-CR Unified Wire Ethernet Controller [VF] (6808) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-6080 Unified Wire Ethernet Controller (6480) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-6080 Unified Wire Ethernet Controller [VF] (6880) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-6082 Unified Wire Ethernet Controller (6482) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-6082 Unified Wire Ethernet Controller [VF] (6882) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-6086 Unified Wire Ethernet Controller (6486) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-6086 Unified Wire Ethernet Controller [VF] (6886) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-6087 Unified Wire Ethernet Controller (6487) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-6087 Unified Wire Ethernet Controller [VF] (6887) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-CR Unified Wire Ethernet Controller (6401) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-CR Unified Wire Ethernet Controller [VF] (6801) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-LL-CR Unified Wire Ethernet Controller (6411) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-LL-CR Unified Wire Ethernet Controller [VF] (6811) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-OCP-SO Unified Wire Ethernet Controller (6405) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-OCP-SO Unified Wire Ethernet Controller [VF] (6805) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6225-SO-CR Unified Wire Ethernet Controller (6402) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6225-SO-CR Unified Wire Ethernet Controller [VF] (6802) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6240-6085 Unified Wire Ethernet Controller (6485) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6240-6085 Unified Wire Ethernet Controller [VF] (6885) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T64100-6084 Unified Wire Ethernet Controller (6484) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T64100-6084 Unified Wire Ethernet Controller [VF] (6884) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6425-CR Unified Wire Ethernet Controller (6403) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6425-CR Unified Wire Ethernet Controller [VF] (6803) | net_cxgbevf | 4.5.0 - 5.3.0 |
| | T6425-SO-CR Unified Wire Ethernet Controller (6404) | net_cxgbe | 4.5.0 - 5.3.0 |
| | T6425-SO-CR Unified Wire Ethernet Controller [VF] (6804) | net_cxgbevf | 4.5.0 - 5.3.0 |

## Cisco

### Driver: net_enic
#### Parameters: disable-overlay=0|1 enable-avx2-rx=0|1 ig-vlan-rewrite=trunk|untag|priority|pass
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cisco Systems Inc (1137) | Unknown Device (43) | All |
|  | Unknown Device (71) | All |

## Freescale Semiconductor

### Driver: net_enetc
#### Dependencies: * vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Freescale Semiconductor Inc (1957) | Unknown Device (e100) | All |
|  | Unknown Device (ef00) | All |

## Intel Corporation

### Driver: net_ixgbe_vf
#### Dependencies:  
- igb_uio
- vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Intel Corporation (8086) | 82599 Ethernet Controller Virtual Function (10ed) | All |
| | 82599 Virtual Function (152e) | All |
| | X540 Ethernet Controller Virtual Function (1515) | All |
| | X540 Virtual Function (1530) | All |
| | X550 Virtual Function (1564) | All |
| | X550 Virtual Function (1565) | All |
| | X553 Virtual Function (15c5) | All |
| | X553 Virtual Function (15b4) | All |
| | Ethernet Connection X552 Virtual Function (15a8) | All |
| | X552 Virtual Function (15a9) | All |

### Driver: net_ixgbe
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- | 
| 82598 10GbE PCI-Express Ethernet Controller (10b6) | All |
| 82598EB Gigabit BX Network Connection (1508) | All |
| 82598EB 10-Gigabit AF Dual Port Network Connection (10c6) | All |
| 82598EB 10-Gigabit AF Network Connection (10c7) | All |
| 82598EB 10-Gigabit AT Network Connection (10c8) | All |
| 82598EB 10-Gigabit AT2 Server Adapter (150b) | All |
| 82598EB 10-Gigabit Dual Port Network Connection (10db) | All |
| 82598EB 10-Gigabit AT CX4 Network Connection (10dd) | All |
| 82598EB 10-Gigabit AT CX4 Network Connection (10ec) | All |
| 82598EB 10-Gigabit AF Dual Port Network Connection (10f1) | All |
| 82598EB 10-Gigabit AF Dual Port Network Connection (10e1) | All |
| 82598EB 10-Gigabit AF Network Connection (10f4) | All |
| 10 Gigabit BR KX4 Dual Port Network Connection (10f7) | All |
| Ethernet X520 10GbE Dual Port KX4 Mezz (1514) | All |
| 82599ES 10 Gigabit Network Connection (1517) | All |
| 82599 10 Gigabit Dual Port Backplane Connection (10f8) | All |
| 82599 10 Gigabit Dual Port Network Connection (10f9) | All |
| 82599ES 10-Gigabit SFI/SFP+ Network Connection (10fb) | All |
| 82599 10 Gigabit Dual Port Backplane Connection with FCoE (152a) | All |
| 82599 10 Gigabit Dual Port Network Connection with FCoE (1529) | All |
| Ethernet Express Module X520-P2 (1507) | All |
| Ethernet 10G 2P X520 Adapter (154d) | All |
| Ethernet Server Adapter X520-4 (154a) | All |
| Ethernet Converged Network Adapter X520-Q1 (1558) | All |
| 82599 10 Gigabit Network Connection (1557) | All |
| 82599 10 Gigabit Dual Port Network Connection (10fc) | All |
| 82599 10 Gigabit TN Network Connection (151c) | All |
| Ethernet Controller 10-Gigabit X540-AT2 (1528) | All |
| Ethernet Controller X540 (1560) | All |
| Ethernet Connection X552 10 GbE SFP+ (15ac) | All |
| Ethernet Connection X552/X557-AT 10GBASE-T (15ad) | All |
| Ethernet Connection X552 1000BASE-T (15ae) | All |
| Ethernet Controller 10G X550T (1563) | All |
| Ethernet Controller 10G X550T (15d1) | All |
| Ethernet Connection X553 Backplane (15c2) | All |
| Ethernet Connection X553 Backplane (15c3) | All |
| Ethernet Connection X553 10 GbE SFP+ (15c4) | All |
| Ethernet Connection X553 1GbE (15c6) | All |
| Ethernet Connection X553 1GbE (15c7) | All |
| Ethernet Connection X553/X557-AT 10GBASE-T (15c8) | All |
| Unknown Device (15ca) | All |
| Unknown Device (15cc) | All |
| Ethernet Connection X553 10 GbE SFP+ (15ce) | All |
| Ethernet Connection X553 1GbE (15e4) | All |
| Ethernet Connection X553 1GbE (15e5) | All |
| Ethernet Connection X552 10 GbE Backplane (15aa) | All |
| Ethernet Connection X552 10 GbE Backplane (15ab) | All |

### Driver: qat

| Device | Subdevice |
| --- | --- |
| Unknown Device (443) | All |
| Unknown Device (37c9) | All |
| Unknown Device (19e3) | All |
| Unknown Device (6f55) | All |
| Unknown Device (18a1) | All |

### Driver: net_e1000_igb_vf
#### Dependencies: 
- igb_uio 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| 82576 Virtual Function (10ca) | All |
| Unknown Device (152d) | All |
| I350 Ethernet Controller Virtual Function (1520) | All |
| I350 Virtual Function (152f) | All |

### Driver: net_e1000_igb
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| 82576 Gigabit Network Connection (10c9) | All |
| 82576 Gigabit Network Connection (10e6) | All |
| 82576 Gigabit Network Connection (10e7) | All |
| 82576 Gigabit Network Connection (10e8) | All |
| 82576 Gigabit Network Connection (1526) | All |
| 82576NS Gigabit Network Connection (150a) | All |
| 82576NS SerDes Gigabit Network Connection (1518) | All |
| 82576 Gigabit Backplane Connection (150d) | All |
| 82575EB Gigabit Network Connection (10a7) | All |
| 82575EB Gigabit Backplane Connection (10a9) | All |
| 82575GB Gigabit Network Connection (10d6) | All |
| 82580 Gigabit Network Connection (150e) | All |
| 82580 Gigabit Fiber Network Connection (150f) | All |
| 82580 Gigabit Backplane Connection (1510) | All |
| 82580 Gigabit SFP Connection (1511) | All |
| 82580 Gigabit Network Connection (1516) | All |
| 82580 Gigabit Fiber Network Connection (1527) | All |
| I350 Gigabit Network Connection (1521) | All |
| I350 Gigabit Fiber Network Connection (1522) | All |
| I350 Gigabit Backplane Connection (1523) | All |
| I350 Gigabit Connection (1524) | All |
| Unknown Device (1546) | All |
| I210 Gigabit Network Connection (1533) | All |
| Unknown Device (1534) | All |
| Unknown Device (1535) | All |
| I210 Gigabit Fiber Network Connection (1536) | All |
| I210 Gigabit Backplane Connection (1537) | All |
| I210 Gigabit Network Connection (1538) | All |
| I210 Gigabit Network Connection (157b) | All |
| I210 Gigabit Backplane Connection (157c) | All |
| I211 Gigabit Network Connection (1539) | All |
| Ethernet Connection I354 1.0 GbE Backplane (1f40) | All |
| Ethernet Connection I354 (1f41) | All |
| Ethernet Connection I354 2.5 GbE Backplane (1f45) | All |
| Unknown Device (438) | All |
| Unknown Device (43a) | All |
| Unknown Device (43c) | All |
| Unknown Device (440) | All |

### Driver: net_e1000_em
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| 82540EM Gigabit Ethernet Controller (100e) | All |
| 82545EM Gigabit Ethernet Controller (Copper) (100f) | All |
| 82545EM Gigabit Ethernet Controller (Fiber) (1011) | All |
| 82546EB Gigabit Ethernet Controller (Copper) (1010) | All |
| 82546EB Gigabit Ethernet Controller (Fiber) (1012) | All |
| 82546EB Gigabit Ethernet Controller (101d) | All |
| 82571EB Gigabit Ethernet Controller (105e) | All |
| 82571EB Gigabit Ethernet Controller (105f) | All |
| 82571EB Gigabit Ethernet Controller (1060) | All |
| 82571EB Dual Port Gigabit Mezzanine Adapter (10d9) | All |
| 82571EB Quad Port Gigabit Mezzanine Adapter (10da) | All |
| 82571EB Gigabit Ethernet Controller (10a4) | All |
| 82571PT Gigabit PT Quad Port Server ExpressModule (10d5) | All |
| 82571EB Gigabit Ethernet Controller (Fiber) (10a5) | All |
| 82571EB Gigabit Ethernet Controller (Copper) (10bc) | All |
| 82572EI Gigabit Ethernet Controller (Copper) (107d) | All |
| 82572EI Gigabit Ethernet Controller (Fiber) (107e) | All |
| 82572EI Gigabit Ethernet Controller (107f) | All |
| 82572EI Gigabit Ethernet Controller (Copper) (10b9) | All |
| 82573L Gigabit Ethernet Controller (109a) | All |
| 82574L Gigabit Network Connection (10d3) | All |
| 82574L Gigabit Network Connection (10f6) | All |
| 82583V Gigabit Network Connection (150c) | All |
| 82579LM Gigabit Network Connection (Lewisville) (1502) | All |
| Ethernet Connection I217-LM (153a) | All |
| Ethernet Connection I217-V (153b) | All |
| Ethernet Connection I218-LM (155a) | All |
| Ethernet Connection I218-V (1559) | All |
| Ethernet Connection (2) I218-LM (15a0) | All |
| Ethernet Connection (2) I218-V (15a1) | All |
| Ethernet Connection (3) I218-LM (15a2) | All |
| Ethernet Connection (3) I218-V (15a3) | All |
| Ethernet Connection I219-LM (156f) | All |
| Ethernet Connection I219-V (1570) | All |
| Ethernet Connection (2) I219-LM (15b7) | All |
| Ethernet Connection (2) I219-V (15b8) | All |
| Ethernet Connection (3) I219-LM (15b9) | All |
| Ethernet Connection (4) I219-LM (15d7) | All |
| Ethernet Connection (4) I219-V (15d8) | All |
| Ethernet Connection (5) I219-LM (15e3) | All |
| Ethernet Connection (5) I219-V (15d6) | All |
| Ethernet Connection (6) I219-LM (15bd) | All |
| Ethernet Connection (6) I219-V (15be) | All |
| Ethernet Connection (7) I219-LM (15bb) | All |
| Ethernet Connection (7) I219-V (15bc) | All |

### Driver: net_ice
#### Parameters: `max_queue_pair_num=<int>`
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| Unknown Device (1591) | All |
| Unknown Device (1592) | All |
| Unknown Device (1593) | All |

### Driver: net_i40e
#### Parameters: `enable_floating_veb=1floating_veb_list=<string>queue-num-per-vf=1|2|4|8|16support-multi-driver=1use-latest-supported-vec=0|1`
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| Ethernet Controller X710 for 10GbE SFP+ (1572) | All |
| Unknown Device (1574) | All |
| Ethernet Controller XL710 for 40GbE backplane (1580) | All |
| Ethernet Controller X710 for 10GbE backplane (1581) | All |
| Ethernet Controller XL710 for 40GbE QSFP+ (1583) | All |
| Ethernet Controller XL710 for 40GbE QSFP+ (1584) | All |
| Ethernet Controller X710 for 10GbE QSFP+ (1585) | All |
| Ethernet Controller X710 for 10GBASE-T (1586) | All |
| Ethernet Controller XL710 for 20GbE backplane (1587) | All |
| Ethernet Controller XL710 for 20GbE backplane (1588) | All |
| Ethernet Controller X710/X557-AT 10GBASE-T (1589) | All |
| Ethernet Controller XXV710 for 25GbE backplane (158a) | All |
| Ethernet Controller XXV710 for 25GbE SFP28 (158b) | All |
| Unknown Device (374c) | All |
| Ethernet Connection X722 for 10GbE backplane (37ce) | All |
| Ethernet Connection X722 for 10GbE QSFP+ (37cf) | All |
| Ethernet Connection X722 for 10GbE SFP+ (37d0) | All |
| Ethernet Connection X722 for 1GbE (37d1) | All |
| Ethernet Connection X722 for 10GBASE-T (37d2) | All |
| Ethernet Connection X722 for 10GbE SFP+ (37d3) | All |
| Unknown Device (cf8) | All |
| Unknown Device (d58) | All |

### Driver: net_i40e_vf
#### Dependencies: 
- igb_uio 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| Ethernet Virtual Function 700 Series (154c) | All |
| Ethernet Virtual Function 700 Series (1571) | All |
| Unknown Device (374d) | All |
| Ethernet Virtual Function 700 Series (37cd) | All |

### Driver: net_iavf
#### Dependencies: 
- igb_uio 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| Ethernet Adaptive Virtual Function (1889) | All |

### Driver: net_fm10k
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Device | Subdevice |
| --- | --- |
| Ethernet Switch FM10000 Host Interface (15a4) | All |
| Ethernet SDI Adapter (15d0) | All |
| Ethernet Switch FM10000 Host Virtual Interface (15a5) | All |

## Mellanox

### Driver: net_mlx5
#### Dependencies: * ib_uverbs & mlx5_core & mlx5_ib

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Mellanox Technologies (15b3) | MT27700 Family [ConnectX-4] (1013) | All |
| | MT27700 Family [ConnectX-4 Virtual Function] (1014) | All |
| | MT27710 Family [ConnectX-4 Lx] (1015) | All |
| | MT27710 Family [ConnectX-4 Lx Virtual Function] (1016) | All |
| | MT27800 Family [ConnectX-5] (1017) | All |
| | MT27800 Family [ConnectX-5 Virtual Function] (1018) | All |
| | MT28800 Family [ConnectX-5 Ex] (1019) | All |
| | MT28800 Family [ConnectX-5 Ex Virtual Function] (101a) | All |
| | MT416842 BlueField integrated ConnectX-5 network controller (a2d2) | All |
| | MT416842 BlueField multicore SoC family VF (a2d3) | All |
| | MT28908 Family [ConnectX-6] (101b) | All |
| | MT28908 Family [ConnectX-6 Virtual Function] (101c) | All |

### Driver: net_mlx4
#### Dependencies: * ib_uverbs & mlx4_en & mlx4_core & mlx4_ib

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Mellanox Technologies (15b3) | MT27500 Family [ConnectX-3] (1003) | All |
| | MT27520 Family [ConnectX-3 Pro] (1007) | All |
| | MT27500/MT27520 Family [ConnectX-3/ConnectX-3 Pro Virtual Function] (1004) | All |

## QLogic

### Driver: net_qede_vf
#### Dependencies: * igb_uio | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| QLogic Corp. (1077) | Unknown Device (1630) | All |
| | FastLinQ QL45000 Series Gigabit Ethernet Controller (SR-IOV VF) (1664) | All |
| | FastLinQ QL41000 Series Gigabit Ethernet Controller (SR-IOV VF) (8090) | All |

### Driver: net_qede
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| QLogic Corp. (1077) | FastLinQ QL45000 Series 40GbE Controller (1634) | All |
| | Unknown Device (1629) | All |
| | FastLinQ QL45000 Series 40GbE Controller (1634) | All |
| | FastLinQ QL45000 Series 25GbE Controller (1656) | All |
| | FastLinQ QL45000 Series 100GbE Controller (1644) | All |
| | FastLinQ QL45000 Series 50GbE Controller (1654) | All |
| | FastLinQ QL41000 Series 10/25/40/50GbE Controller (8070) | All |

## Red Hat

### Driver: net_ifcvf
#### Dependencies: * vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Red Hat, Inc. (1af4) | Virtio network device (1041) (Unknown Subdevice)

### Driver: net_virtio
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Red Hat, Inc. (1af4) | Virtio network device (1000) | All |
| | Virtio network device (1041) | All |

### Driver: net_avp

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Red Hat, Inc. (1af4) | Inter-VM shared memory (1110) (Unknown Subdevice)

## Solarflare

### Driver: net_sfc_efx
#### Parameters: `rx_datapath=[efx|ef10|ef10_essb] tx_datapath=[efx|ef10|ef10_simple] perf_profile=[auto|throughput|low-latency] fw_variant=[dont-care|full-feature|ultra-low-latency|capture-packed-stream|dpdk] rxd_wait_timeout_ns=<long> stats_update_period_ms=<long>`
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Solarflare Communications (1924) | Unknown Device (903) | All |
| | SFC9120 10G Ethernet Controller (Virtual Function) (1903) | All |
| | Unknown Device (923) | All |
| | SFC9140 10/40G Ethernet Controller (Virtual Function) (1923) | All |
| | Unknown Device (a03) | All |
| | SFC9220 10/40G Ethernet Controller (Virtual Function) (1a03) | All |
| | Unknown Device (b03) | All |
| | SFC9250 10/25/40/50/100G Ethernet Controller (Virtual Function) (1b03) | All |

## VMWare

### Driver: net_vmxnet3
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| VMware (15ad) | Unknown Device (7b0) | All |

