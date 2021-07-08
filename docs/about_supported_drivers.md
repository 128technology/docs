---
title: Supported Drivers
sidebar_label: Supported Drivers
---

The following list represents the drivers supported for use with the SSR software. 

The names below are linked to sections providing a list of the supported drivers.

- [Advanced Micro Devices](#advanced-micro-devices)
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
- [Netronome Systems](#netronome)
- [QLogic Corp](#qlogic)
- [Red Hat](#red-hat)
- [Solarflare Communications](#solarflare)
- [VMWare](#vmware)
- [Other](#other)

## Advanced Micro Devices

### Driver: net_axgbe
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Advanced Micro Devices, Inc. (AMD 1022) | Unknown Device (1458) | | All | |
| | Unknown Device (1459) | All |

## Amazon

### Driver: net_ena
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Amazon.com, Inc. (1d0f) | Elastic Network Adapter (ENA) (ec20) | All |
| | Unknown Device (ec21) | All |

## Aquantia Corp

### Driver: net_atlantic
#### Dependencies: 
- igb_uio 
- uio_pci_generic

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Aquantia Corp. (1d6a) | Unknown Device (1) | All |
| | Unknown Device (d100) | All |
| | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d107) | All |
| | AQC108 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d108) | All |
| | Unknown Device (d109) | All |
| | Unknown Device (b1) | All |
| | Unknown Device (7b1) | All |
| | Unknown Device (8b1) | All |
| | Unknown Device (9b1) | All |
| | AQC111 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (11b1) | All |
| | AQC112 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (12b1) | All |
| | Unknown Device (80b1) | All |
| | AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (87b1) | All |
| | Unknown Device (88b1) | All |
| | Unknown Device (89b1) | All |
| | Unknown Device (91b1) | All |
| | Unknown Device (92b1) | All |
| | Unknown Device (51b1) | All |
| | Unknown Device (52b1) | All |

## Atomic Rules

### Driver: net_ark
#### Parameters: `Pkt_gen=<filename> Pkt_chkr=<filename> Pkt_dir=<bitmap>`
#### Dependencies: 
- igb_uio 
- io_pci_generic 

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
|Atomic Rules LLC (1d6c) | AR-ARKA-FX0 Arkville 32B DPDK Data Mover (100d) | All |
| | AR-ARKA-FX1 Arkville 64B DPDK Data Mover (100e) | All |

## Broadcom

### Driver: net_bnxt
#### Dependencies: 
- igb_uio 
- uio_pci_generic 
- vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Broadcom Limited (14e4) | BCM5745X NetXtreme-E RDMA Virtual Function (1606) | All |
| | BCM5745X NetXtreme-E Ethernet Virtual Function (1609) | All |
| | BCM57454 NetXtreme-E 10Gb/25Gb/40Gb/50Gb/100Gb Ethernet (1614) | All |
| | NetXtreme-E RDMA Virtual Function (16c1) | All |
| | BCM57301 NetXtreme-C 10Gb Ethernet Controller (16c8) | All |
| | BCM57302 NetXtreme-C 10Gb/25Gb Ethernet Controller (16c9) | All |
| | BCM57304 NetXtreme-C 10Gb/25Gb/40Gb/50Gb Ethernet Controller (16ca) | All |
| | NetXtreme-C Ethernet Virtual Function (16cb) | All |
| | Unknown Device (16cd) | All |
| | BCM57402 NetXtreme-E 10Gb Ethernet Controller (16d0) | All |
| | BCM57404 NetXtreme-E 10Gb/25Gb Ethernet Controller (16d1) | All |
| | BCM57406 NetXtreme-E 10GBASE-T Ethernet Controller (16d2) | All |
| | NetXtreme-E Ethernet Virtual Function (16d3) | All |
| | BCM57402 NetXtreme-E Ethernet Partition (16d4) | All |
| | BCM57407 NetXtreme-E 10GBase-T Ethernet Controller (16d5) | All |
| | BCM57404 NetXtreme-E Ethernet Partition (16e7) | All |
| | BCM57406 NetXtreme-E Ethernet Partition (16e8) | All |
| | BCM57407 NetXtreme-E 25Gb Ethernet Controller (16e9) | All |
| | Unknown Device (16ea) | All |
| | NetXtreme-E Ethernet Virtual Function (16dc) | All |
| | NetXtreme-C Ethernet Virtual Function (16e1) | All |
| | BCM57314 NetXtreme-C 10Gb/25Gb/40Gb/50Gb RDMA Ethernet Controller (16df) | All |
| | BCM57417 NetXtreme-E Ethernet Partition (16cc) | All |
| | BCM57311 NetXtreme-C 10Gb RDMA Ethernet Controller (16ce) | All |
| | BCM57312 NetXtreme-C 10Gb/25Gb RDMA Ethernet Controller (16cf) | All |
| | BCM57412 NetXtreme-E 10Gb RDMA Ethernet Controller (16d6) | All |
| | BCM57414 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16d7) | All |
| | BCM57416 NetXtreme-E Dual-Media 10G RDMA Ethernet Controller (16d8) | All |
| | BCM57417 NetXtreme-E 10GBASE-T RDMA Ethernet Controller (16d9) | All |
| | BCM57412 NetXtreme-E Ethernet Partition (16de) | All |
| | Unknown Device (16e0) | All |
| | BCM57417 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16e2) | All |
| | BCM57416 NetXtreme-E 10Gb RDMA Ethernet Controller (16e3) | All |
| | Unknown Device (16e4) | All |
| | BCM57414 NetXtreme-E Ethernet Partition (16ec) | All |
| | BCM57416 NetXtreme-E Ethernet Partition (16ee) | All |
| | Unknown Device (d802) | All |
| | Unknown Device (d804) | All |
| | Unknown Device (16f0) | All |
| | Unknown Device (d800) | All |

### Driver: net_bnx2xvf
#### Dependencies: 
- igb_uio 
- vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Broadcom Limited (14e4) | NetXtreme II BCM57800 1/10 Gigabit Ethernet Virtual Function (16a9) | All |
| | NetXtreme II BCM57810 10 Gigabit Ethernet Virtual Function (16af) | All |
| | NetXtreme II BCM57811 10-Gigabit Ethernet Virtual Function (163f) | All |
| | NetXtreme II BCM57840 10/20 Gigabit Ethernet Virtual Function (16ad) | All |

### Driver: net_bnx2x
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Broadcom Limited (14e4) | NetXtreme II BCM57800 1/10 Gigabit Ethernet (168a) | All |
| | NetXtreme II BCM57711 10-Gigabit PCIe (164f) | All |
| | NetXtreme II BCM57810 10 Gigabit Ethernet (168e) | All |
| | NetXtreme II BCM57811 10-Gigabit Ethernet (163d) | All |
| | NetXtreme II BCM57840 10/20 Gigabit Ethernet (168d) | All |
| | BCM57840 NetXtreme II 10 Gigabit Ethernet (16a1) | All |
| | BCM57840 NetXtreme II 10/20-Gigabit Ethernet (16a2) | All |

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
| Cavium, Inc. (177d) | Unknown Device (11) (Unknown Subdevice)
| | THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)
| | THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)
| | THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)

### Driver: compress_octeonx

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cavium, Inc. (177d) | THUNDERX ZIP virtual function (a037) | All |

### Driver: event_skeleton_pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Cavium, Inc. (177d) | Unknown Device (1) | All |

## Chelsio Communications

### Driver: net_cxgbe
#### Parameters: keep_ovlan=<0|1> force_link_up=<0|1> 
#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Chelsio Communications Inc (1425) | Unknown Device (5400) | All |
| | T520-CR Unified Wire Ethernet Controller (5401) | All |
| | T522-CR Unified Wire Ethernet Controller (5402) | All |
| | T540-CR Unified Wire Ethernet Controller (5403) | All |
| | T520-BCH Unified Wire Ethernet Controller (5404) | All |
| | T540-BCH Unified Wire Ethernet Controller (5405) | All |
| | T540-CH Unified Wire Ethernet Controller (5406) | All |
| | T520-SO Unified Wire Ethernet Controller (5407) | All |
| | T520-CX Unified Wire Ethernet Controller (5408) | All |
| | T520-BT Unified Wire Ethernet Controller (5409) | All |
| | T504-BT Unified Wire Ethernet Controller (540a) | All |
| | T580-CR Unified Wire Ethernet Controller (540d) | All |
| | T540-LP-CR Unified Wire Ethernet Controller (540e) | All |
| | T580-LP-CR Unified Wire Ethernet Controller (5410) | All |
| | T520-LL-CR Unified Wire Ethernet Controller (5411) | All |
| | T560-CR Unified Wire Ethernet Controller (5412) | All |
| | T580-CHR Unified Wire Ethernet Controller (5413) | All |
| | T580-SO-CR Unified Wire Ethernet Controller (5414) | All |
| | T502-BT Unified Wire Ethernet Controller (5415) | All |
| | T580-OCP-SO Unified Wire Ethernet Controller (5416) | All |
| | T520-OCP-SO Unified Wire Ethernet Controller (5417) | All |
| | T540-BT Unified Wire Ethernet Controller (5418) | All |
| | Unknown Device (5419) | All |
| | Unknown Device (541a) | All |
| | Unknown Device (541b) | All |
| | T540-5080 Unified Wire Ethernet Controller (5480) | All |
| | T540-5081 Unified Wire Ethernet Controller (5481) | All |
| | T504-5082 Unified Wire Ethernet Controller (5482) | All |
| | T540-5083 Unified Wire Ethernet Controller (5483) | All |
| | T540-5084 Unified Wire Ethernet Controller (5484) | All |
| | T580-5085 Unified Wire Ethernet Controller (5485) | All |
| | T580-5086 Unified Wire Ethernet Controller (5486) | All |
| | T580-5087 Unified Wire Ethernet Controller (5487) | All |
| | T570-5088 Unified Wire Ethernet Controller (5488) | All |
| | T520-5089 Unified Wire Ethernet Controller (5489) | All |
| | T540-5090 Unified Wire Ethernet Controller (5490) | All |
| | T522-5091 Unified Wire Ethernet Controller (5491) | All |
| | T520-5092 Unified Wire Ethernet Controller (5492) | All |
| | T580-5093 Unified Wire Ethernet Controller (5493) | All |
| | T540-5094 Unified Wire Ethernet Controller (5494) | All |
| | T540-5095 Unified Wire Ethernet Controller (5495) | All |
| | T580-5096 Unified Wire Ethernet Controller (5496) | All |
| | T520-5097 Unified Wire Ethernet Controller (5497) | All |
| | T580-5098 Unified Wire Ethernet Controller (5498) | All |
| | T580-5099 Unified Wire Ethernet Controller (5499) | All |
| | T520-509A Unified Wire Ethernet Controller (549a) | All |
| | T540-509B Unified Wire Ethernet Controller (549b) | All |
| | T520-509C Unified Wire Ethernet Controller (549c) | All |
| | T540-509D Unified Wire Ethernet Controller (549d) | All |
| | T520-509E Unified Wire Ethernet Controller (549e) | All |
| | T540-509F Unified Wire Ethernet Controller (549f) | All |
| | T540-50A0 Unified Wire Ethernet Controller (54a0) | All |
| | T540-50A1 Unified Wire Ethernet Controller (54a1) | All |
| | T580-50A2 Unified Wire Ethernet Controller (54a2) | All |
| | T580-50A3 Unified Wire Ethernet Controller (54a3) | All |
| | T540-50A4 Unified Wire Ethernet Controller (54a4) | All |
| | T522-50A5 Unified Wire Ethernet Controller (54a5) | All |
| | T522-50A6 Unified Wire Ethernet Controller (54a6) | All |
| | T580-50A7 Unified Wire Ethernet Controller (54a7) | All |
| | T580-50A8 Unified Wire Ethernet Controller (54a8) | All |
| | T580-50A9 Unified Wire Ethernet Controller (54a9) | All |
| | T580-50AA Unified Wire Ethernet Controller (54aa) | All |
| | T520-50AB Unified Wire Ethernet Controller (54ab) | All |
| | T540-50AC Unified Wire Ethernet Controller (54ac) | All |
| | Unknown Device (54ad) | All |
| | Unknown Device (54ae) | All |
| | Unknown Device (54af) | All |
| | Unknown Device (54b0) | All |
| | T6225-CR Unified Wire Ethernet Controller (6401) | All |
| | T6225-SO-CR Unified Wire Ethernet Controller (6402) | All |
| | T6425-CR Unified Wire Ethernet Controller (6403) | All |
| | T6425-SO-CR Unified Wire Ethernet Controller (6404) | All |
| | T6225-OCP-SO Unified Wire Ethernet Controller (6405) | All |
| | T62100-OCP-SO Unified Wire Ethernet Controller (6406) | All |
| | T62100-LP-CR Unified Wire Ethernet Controller (6407) | All |
| | T62100-SO-CR Unified Wire Ethernet Controller (6408) | All |
| | T6210-BT Unified Wire Ethernet Controller (6409) | All |
| | T62100-CR Unified Wire Ethernet Controller (640d) | All |
| | T6225-LL-CR Unified Wire Ethernet Controller (6411) | All |
| | T61100-OCP-SO Unified Wire Ethernet Controller (6414) | All |
| | T6201-BT Unified Wire Ethernet Controller (6415) | All |
| | T6225-6080 Unified Wire Ethernet Controller (6480) | All |
| | T62100-6081 Unified Wire Ethernet Controller (6481) | All |
| | T6225-6082 Unified Wire Ethernet Controller (6482) | All |
| | T62100-6083 Unified Wire Ethernet Controller (6483) | All |
| | T64100-6084 Unified Wire Ethernet Controller (6484) | All |
| | T6240-6085 Unified Wire Ethernet Controller (6485) | All |
| | T6225-6086 Unified Wire Ethernet Controller (6486) | All |
| | T6225-6087 Unified Wire Ethernet Controller (6487) | All |
| | Unknown Device (6488) | All |
| | Unknown Device (6489) | All |
| | Unknown Device (648a) | All |
| | Unknown Device (648b) | All |

### Driver: net_cxgbevf
#### Dependencies: * igb_uio | vfio-pci

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Chelsio Communications Inc (1425) | Unknown Device (5800) | All |
| | T520-CR Unified Wire Ethernet Controller [VF] (5801) | All |
| | T522-CR Unified Wire Ethernet Controller [VF] (5802) | All |
| | T540-CR Unified Wire Ethernet Controller [VF] (5803) | All |
| | T520-BCH Unified Wire Ethernet Controller [VF] (5804) | All |
| | T540-BCH Unified Wire Ethernet Controller [VF] (5805) | All |
| | T540-CH Unified Wire Ethernet Controller [VF] (5806) | All |
| | T520-SO Unified Wire Ethernet Controller [VF] (5807) | All |
| | T520-CX Unified Wire Ethernet Controller [VF] (5808) | All |
| | T520-BT Unified Wire Ethernet Controller [VF] (5809) | All |
| | T504-BT Unified Wire Ethernet Controller [VF] (580a) | All |
| | T580-CR Unified Wire Ethernet Controller [VF] (580d) | All |
| | T540-LP-CR Unified Wire Ethernet Controller [VF] (580e) | All |
| | T580-LP-CR Unified Wire Ethernet Controller [VF] (5810) | All |
| | T520-LL-CR Unified Wire Ethernet Controller [VF] (5811) | All |
| | T560-CR Unified Wire Ethernet Controller [VF] (5812) | All |
| | T580-CHR Unified Wire Ethernet Controller [VF] (5813) | All |
| | T580-SO-CR Unified Wire Ethernet Controller [VF] (5814) | All |
| | T502-BT Unified Wire Ethernet Controller [VF] (5815) | All |
| | T580-OCP-SO Unified Wire Ethernet Controller [VF] (5816) | All |
| | T520-OCP-SO Unified Wire Ethernet Controller [VF] (5817) | All |
| | T540-BT Unified Wire Ethernet Controller [VF] (5818) | All |
| | Unknown Device (5819) | All |
| | Unknown Device (581a) | All |
| | Unknown Device (581b) | All |
| | T540-5080 Unified Wire Ethernet Controller [VF] (5880) | All |
| | T540-5081 Unified Wire Ethernet Controller [VF] (5881) | All |
| | T504-5082 Unified Wire Ethernet Controller [VF] (5882) | All |
| | T540-5083 Unified Wire Ethernet Controller [VF] (5883) | All |
| | T540-5084 Unified Wire Ethernet Controller [VF] (5884) | All |
| | T580-5085 Unified Wire Ethernet Controller [VF] (5885) | All |
| | T580-5086 Unified Wire Ethernet Controller [VF] (5886) | All |
| | T580-5087 Unified Wire Ethernet Controller [VF] (5887) | All |
| | T570-5088 Unified Wire Ethernet Controller [VF] (5888) | All |
| | T520-5089 Unified Wire Ethernet Controller [VF] (5889) | All |
| | T540-5090 Unified Wire Ethernet Controller [VF] (5890) | All |
| | T522-5091 Unified Wire Ethernet Controller [VF] (5891) | All |
| | T520-5092 Unified Wire Ethernet Controller [VF] (5892) | All |
| | T580-5093 Unified Wire Ethernet Controller [VF] (5893) | All |
| | T540-5094 Unified Wire Ethernet Controller [VF] (5894) | All |
| | T540-5095 Unified Wire Ethernet Controller [VF] (5895) | All |
| | T580-5096 Unified Wire Ethernet Controller [VF] (5896) | All |
| | T520-5097 Unified Wire Ethernet Controller [VF] (5897) | All |
| | T580-5098 Unified Wire Ethernet Controller [VF] (5898) | All |
| | T580-5099 Unified Wire Ethernet Controller [VF] (5899) | All |
| | T520-509A Unified Wire Ethernet Controller [VF] (589a) | All |
| | T540-509B Unified Wire Ethernet Controller [VF] (589b) | All |
| | T520-509C Unified Wire Ethernet Controller [VF] (589c) | All |
| | T540-509D Unified Wire Ethernet Controller [VF] (589d) | All |
| | T520-509E Unified Wire Ethernet Controller [VF] (589e) | All |
| | T540-509F Unified Wire Ethernet Controller [VF] (589f) | All |
| | T540-50A0 Unified Wire Ethernet Controller [VF] (58a0) | All |
| | T540-50A1 Unified Wire Ethernet Controller [VF] (58a1) | All |
| | T580-50A2 Unified Wire Ethernet Controller [VF] (58a2) | All |
| | T580-50A3 Unified Wire Ethernet Controller [VF] (58a3) | All |
| | T540-50A4 Unified Wire Ethernet Controller [VF] (58a4) | All |
| | T522-50A5 Unified Wire Ethernet Controller [VF] (58a5) | All |
| | T522-50A6 Unified Wire Ethernet Controller [VF] (58a6) | All |
| | T580-50A7 Unified Wire Ethernet Controller [VF] (58a7) | All |
| | T580-50A8 Unified Wire Ethernet Controller [VF] (58a8) | All |
| | T580-50A9 Unified Wire Ethernet Controller [VF] (58a9) | All |
| | T580-50AA Unified Wire Ethernet Controller [VF] (58aa) | All |
| | T520-50AB Unified Wire Ethernet Controller [VF] (58ab) | All |
| | T540-50AC Unified Wire Ethernet Controller [VF] (58ac) | All |
| | Unknown Device (58ad) | All |
| | Unknown Device (58ae) | All |
| | Unknown Device (58af) | All |
| | Unknown Device (58b0) | All |
| | T6225-CR Unified Wire Ethernet Controller [VF] (6801) | All |
| | T6225-SO-CR Unified Wire Ethernet Controller [VF] (6802) | All |
| | T6425-CR Unified Wire Ethernet Controller [VF] (6803) | All |
| | T6425-SO-CR Unified Wire Ethernet Controller [VF] (6804) | All |
| | T6225-OCP-SO Unified Wire Ethernet Controller [VF] (6805) | All |
| | T62100-OCP-SO Unified Wire Ethernet Controller [VF] (6806) | All |
| | T62100-LP-CR Unified Wire Ethernet Controller [VF] (6807) | All |
| | T62100-SO-CR Unified Wire Ethernet Controller [VF] (6808) | All |
| | T6210-BT Unified Wire Ethernet Controller [VF] (6809) | All |
| | T62100-CR Unified Wire Ethernet Controller [VF] (680d) | All |
| | T6225-LL-CR Unified Wire Ethernet Controller [VF] (6811) | All |
| | T61100-OCP-SO Unified Wire Ethernet Controller [VF] (6814) | All |
| | T6201-BT Unified Wire Ethernet Controller [VF] (6815) | All |
| | T6225-6080 Unified Wire Ethernet Controller [VF] (6880) | All |
| | T62100-6081 Unified Wire Ethernet Controller [VF] (6881) | All |
| | T6225-6082 Unified Wire Ethernet Controller [VF] (6882) | All |
| | T62100-6083 Unified Wire Ethernet Controller [VF] (6883) | All |
| | T64100-6084 Unified Wire Ethernet Controller [VF] (6884) | All |
| | T6240-6085 Unified Wire Ethernet Controller [VF] (6885) | All |
| | T6225-6086 Unified Wire Ethernet Controller [VF] (6886) | All |
| | T6225-6087 Unified Wire Ethernet Controller [VF] (6887) | All |
| | Unknown Device (6888) | All |
| | Unknown Device (6889) | All |
| | Unknown Device (688a) | All |
| | Unknown Device (688b) | All |

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

## Netronome

### Driver: net_nfp_vf
#### Dependencies: * igb_uio | uio_pci_generic | vfio

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Netronome Systems, Inc. (19ee) | Unknown Device (6003) | All |

### Driver: net_nfp_pf
#### Dependencies: * igb_uio | uio_pci_generic | vfio

| Vendor ID | Device | Subdevice |
| --- | --- | --- |
| Netronome Systems, Inc. (19ee) | Unknown Device (4000) | All |
| | Unknown Device (6000) | All |

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
| | Unknown Device (8071) | All |
| | Unknown Device (8072) | All |
| | Unknown Device (8073) | All |

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

## Other

### Driver: dpaa2_dpci

### Driver: net_pcap

Parameters: `rx_pcap=<string> tx_pcap=<string> rx_iface=<ifc> rx_iface_in=<ifc> tx_iface=<ifc> iface=<ifc> phy_mac=<int>`


### Driver: event_sw

Parameters:  `numa_node=<int> sched_quanta=<int>credit_quanta=<int>`


### Driver: crypto_virtio


### Driver: net_dpaa2

Parameters:  `drv_loopback=<int>`


### Driver: dpdmux


### Driver: net_tun

Parameters:  `iface=<string>` 


### Driver: net_tap

Parameters:  `iface=<string> mac=fixed|xx:xx:xx:xx:xx:xx remote=<string>`


### Driver: net_bonding

Parameters:  `slave=<ifc> primary=<ifc> mode=[0-6] xmit_policy=[l2 | l23 | l34] agg_mode=[count | stable | bandwidth] socket_id=<int> mac=<mac addr> lsc_poll_period_ms=<int> up_delay=<int> down_delay=<int>`


### Driver: ipn3ke_cfg

Parameters:  `afu=<string> fpga_acc=<string>i40e_pf=<string>`


### Driver: net_ipn3ke_afu


### Driver: net_failsafe

Parameters:  `dev(<ifc>),exec(<shell command>),fd(<fd number>),mac=mac_addr,hotplug_poll=u64`


### Driver: net_kni

Parameters:  `no_request_thread=<int>`


### Driver: net_ring

Parameters:  nodeaction=name:node:action(ATTACH|CREATE)


### Driver: crypto_caam_jr

Parameters:  `max_nb_queue_pairs=<int>socket_id=<int>`


### Driver: net_softnic

Parameters:  `firmware=<string> conn_port=<uint16> cpu_id=<uint32> tm_n_queues=<uint32> tm_qsize0=<uint32> tm_qsize1=<uint32> tm_qsize2=<uint32> tm_qsize3=<uint32>`


### Driver: net_dpaa


### Driver: crypto_null

Parameters:  `max_nb_queue_pairs=<int> socket_id=<int>`


### Driver: event_dsw


### Driver: dpcon


### Driver: event_dpaa2


### Driver: event_dpaa1

Parameters:  `disable_intr=<int>`


### Driver: net_null

Parameters:  `size=<int> copy=<int>`


### Driver: net_virtio_user

Parameters:  `path=<path> mac=<mac addr> cq=<int> queue_size=<int> queues=<int> iface=<string> server=<0|1> mrg_rxbuf=<0|1> in_order=<0|1> packed_vq=<0|1>`


### Driver: net_af_packet

Parameters:  `iface=<string> qpairs=<int> blocksz=<int> framesz=<int> framecnt=<int> qdisc_bypass=<0|1>`


### Driver: crypto_dpaa_sec


### Driver: event_opdl

Parameters:  `numa_node=<int>do_validation=<int>self_test=<int>`


### Driver: dpaa2_qdma

Parameters:  `no_prefetch=<int>` 


### Driver: ifpga_rawdev_cfg

Parameters:  `ifpga=<string> port=<int> afu_bts=<path>`


### Driver: ifpga_rawdev_pci_driver

#### Dependencies: * igb_uio | uio_pci_generic | vfio-pci


### Driver: event_skeleton


### Driver: net_netvsc

#### Dependencies: * uio_hv_generic


### Driver: event_octeontx


### Driver: octeontx_ssovf


### Driver: octeontx_ssowvf


### Driver: octeontx_timvf


### Driver: net_vhost

Parameters:  `iface=<ifc> queues=<int> client=<0|1> dequeue-zero-copy=<0|1> iommu-support=<0|1> postcopy-support=<0|1>`


### Driver: octeontx_pkovf


### Driver: octeontx_pkivf


### Driver: net_octeontx

Parameters:  `nr_port=<int>`


### Driver: rawdev_skeleton


### Driver: net_vdev_netvsc

Parameters:  `iface=<string> mac=<string> force=<int> ignore=<int>`


### Driver: crypto_dpaa2_sec


### Driver: baseband_null

Parameters:  `max_nb_queues=<int> socket_id=<int>`
