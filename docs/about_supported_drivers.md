---
title: Supported Drivers
sidebar_label: Supported Drivers
---

The following list represents the drivers supported for use with the SSR software. 

The names below are linked to sections providing a list of the supported drivers.

- Advanced Micro Devices
- Amazon
- Aquantia Corp.
- Atomic Rules
- Broadcom
- Cavium
- Chelsio Communications
- Cisco Systems
- Freescale Semiconductor
- [Intel Corporation](#intel-corporation)
- Mellanox Technologies
- Netronome Systems
- QLogic Corp
- Red Hat
- Solarflare Communications
- VMWare
- Other

## Advanced Micro Devices

PMD NAME: net_axgbe
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Advanced Micro Devices, Inc. [AMD] (1022) : Unknown Device (1458) (All Subdevices)
 Advanced Micro Devices, Inc. [AMD] (1022) : Unknown Device (1459) (All Subdevices)

## Amazon

PMD NAME: net_ena
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Amazon.com, Inc. (1d0f) : Elastic Network Adapter (ENA) (ec20) (All Subdevices)
 Amazon.com, Inc. (1d0f) : Unknown Device (ec21) (All Subdevices)

## Aquantia Corp

PMD NAME: net_atlantic
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic
PMD HW SUPPORT:
 Aquantia Corp. (1d6a) : Unknown Device (1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (d100) (All Subdevices)
 Aquantia Corp. (1d6a) : AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d107) (All Subdevices)
 Aquantia Corp. (1d6a) : AQC108 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (d108) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (d109) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (7b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (8b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (9b1) (All Subdevices)
 Aquantia Corp. (1d6a) : AQC111 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (11b1) (All Subdevices)
 Aquantia Corp. (1d6a) : AQC112 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (12b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (80b1) (All Subdevices)
 Aquantia Corp. (1d6a) : AQC107 NBase-T/IEEE 802.3bz Ethernet Controller [AQtion] (87b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (88b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (89b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (91b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (92b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (51b1) (All Subdevices)
 Aquantia Corp. (1d6a) : Unknown Device (52b1) (All Subdevices)

## Atomic Rules

PMD NAME: net_ark
PMD PARAMETERS: `Pkt_gen=<filename> Pkt_chkr=<filename> Pkt_dir=<bitmap>`
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic 
PMD HW SUPPORT:
 Atomic Rules LLC (1d6c) : AR-ARKA-FX0 Arkville 32B DPDK Data Mover (100d) (All Subdevices)
 Atomic Rules LLC (1d6c) : AR-ARKA-FX1 Arkville 64B DPDK Data Mover (100e) (All Subdevices)

## Broadcom

PMD NAME: net_bnxt
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Broadcom Limited (14e4) : BCM5745X NetXtreme-E RDMA Virtual Function (1606) (All Subdevices)
 Broadcom Limited (14e4) : BCM5745X NetXtreme-E Ethernet Virtual Function (1609) (All Subdevices)
 Broadcom Limited (14e4) : BCM57454 NetXtreme-E 10Gb/25Gb/40Gb/50Gb/100Gb Ethernet (1614) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme-E RDMA Virtual Function (16c1) (All Subdevices)
 Broadcom Limited (14e4) : BCM57301 NetXtreme-C 10Gb Ethernet Controller (16c8) (All Subdevices)
 Broadcom Limited (14e4) : BCM57302 NetXtreme-C 10Gb/25Gb Ethernet Controller (16c9) (All Subdevices)
 Broadcom Limited (14e4) : BCM57304 NetXtreme-C 10Gb/25Gb/40Gb/50Gb Ethernet Controller (16ca) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme-C Ethernet Virtual Function (16cb) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (16cd) (All Subdevices)
 Broadcom Limited (14e4) : BCM57402 NetXtreme-E 10Gb Ethernet Controller (16d0) (All Subdevices)
 Broadcom Limited (14e4) : BCM57404 NetXtreme-E 10Gb/25Gb Ethernet Controller (16d1) (All Subdevices)
 Broadcom Limited (14e4) : BCM57406 NetXtreme-E 10GBASE-T Ethernet Controller (16d2) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme-E Ethernet Virtual Function (16d3) (All Subdevices)
 Broadcom Limited (14e4) : BCM57402 NetXtreme-E Ethernet Partition (16d4) (All Subdevices)
 Broadcom Limited (14e4) : BCM57407 NetXtreme-E 10GBase-T Ethernet Controller (16d5) (All Subdevices)
 Broadcom Limited (14e4) : BCM57404 NetXtreme-E Ethernet Partition (16e7) (All Subdevices)
 Broadcom Limited (14e4) : BCM57406 NetXtreme-E Ethernet Partition (16e8) (All Subdevices)
 Broadcom Limited (14e4) : BCM57407 NetXtreme-E 25Gb Ethernet Controller (16e9) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (16ea) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme-E Ethernet Virtual Function (16dc) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme-C Ethernet Virtual Function (16e1) (All Subdevices)
 Broadcom Limited (14e4) : BCM57314 NetXtreme-C 10Gb/25Gb/40Gb/50Gb RDMA Ethernet Controller (16df) (All Subdevices)
 Broadcom Limited (14e4) : BCM57417 NetXtreme-E Ethernet Partition (16cc) (All Subdevices)
 Broadcom Limited (14e4) : BCM57311 NetXtreme-C 10Gb RDMA Ethernet Controller (16ce) (All Subdevices)
 Broadcom Limited (14e4) : BCM57312 NetXtreme-C 10Gb/25Gb RDMA Ethernet Controller (16cf) (All Subdevices)
 Broadcom Limited (14e4) : BCM57412 NetXtreme-E 10Gb RDMA Ethernet Controller (16d6) (All Subdevices)
 Broadcom Limited (14e4) : BCM57414 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16d7) (All Subdevices)
 Broadcom Limited (14e4) : BCM57416 NetXtreme-E Dual-Media 10G RDMA Ethernet Controller (16d8) (All Subdevices)
 Broadcom Limited (14e4) : BCM57417 NetXtreme-E 10GBASE-T RDMA Ethernet Controller (16d9) (All Subdevices)
 Broadcom Limited (14e4) : BCM57412 NetXtreme-E Ethernet Partition (16de) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (16e0) (All Subdevices)
 Broadcom Limited (14e4) : BCM57417 NetXtreme-E 10Gb/25Gb RDMA Ethernet Controller (16e2) (All Subdevices)
 Broadcom Limited (14e4) : BCM57416 NetXtreme-E 10Gb RDMA Ethernet Controller (16e3) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (16e4) (All Subdevices)
 Broadcom Limited (14e4) : BCM57414 NetXtreme-E Ethernet Partition (16ec) (All Subdevices)
 Broadcom Limited (14e4) : BCM57416 NetXtreme-E Ethernet Partition (16ee) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (d802) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (d804) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (16f0) (All Subdevices)
 Broadcom Limited (14e4) : Unknown Device (d800) (All Subdevices)

 PMD NAME: net_bnx2xvf
PMD KMOD DEPENDENCIES: * igb_uio | vfio-pci
PMD HW SUPPORT:
 Broadcom Limited (14e4) : NetXtreme II BCM57800 1/10 Gigabit Ethernet Virtual Function (16a9) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57810 10 Gigabit Ethernet Virtual Function (16af) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57811 10-Gigabit Ethernet Virtual Function (163f) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57840 10/20 Gigabit Ethernet Virtual Function (16ad) (All Subdevices)

PMD NAME: net_bnx2x
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Broadcom Limited (14e4) : NetXtreme II BCM57800 1/10 Gigabit Ethernet (168a) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57711 10-Gigabit PCIe (164f) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57810 10 Gigabit Ethernet (168e) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57811 10-Gigabit Ethernet (163d) (All Subdevices)
 Broadcom Limited (14e4) : NetXtreme II BCM57840 10/20 Gigabit Ethernet (168d) (All Subdevices)
 Broadcom Limited (14e4) : BCM57840 NetXtreme II 10 Gigabit Ethernet (16a1) (All Subdevices)
 Broadcom Limited (14e4) : BCM57840 NetXtreme II 10/20-Gigabit Ethernet (16a2) (All Subdevices)

## Cavium

PMD NAME: net_liovf
PMD KMOD DEPENDENCIES: * igb_uio | vfio-pci
PMD HW SUPPORT:
 Cavium, Inc. (177d) : CN23XX [LiquidIO II] SRIOV Virtual Function (9712) (All Subdevices)

PMD NAME: net_thunderx
PMD PARAMETERS: `skip_data_bytes=<int>`
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Cavium, Inc. (177d) : Unknown Device (11) (Unknown Subdevice)
 Cavium, Inc. (177d) : THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)
 Cavium, Inc. (177d) : THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)
 Cavium, Inc. (177d) : THUNDERX Network Interface Controller virtual function (a034) (Unknown Subdevice)

PMD NAME: compress_octeonx
PMD HW SUPPORT:
 Cavium, Inc. (177d) : THUNDERX ZIP virtual function (a037) (All Subdevices)

PMD NAME: event_skeleton_pci
PMD HW SUPPORT:
 Cavium, Inc. (177d) : Unknown Device (1) (All Subdevices)

## Chelsio Communications

PMD NAME: net_cxgbe
PMD PARAMETERS: keep_ovlan=<0|1> force_link_up=<0|1> 
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Chelsio Communications Inc (1425) : Unknown Device (5400) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-CR Unified Wire Ethernet Controller (5401) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-CR Unified Wire Ethernet Controller (5402) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-CR Unified Wire Ethernet Controller (5403) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-BCH Unified Wire Ethernet Controller (5404) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-BCH Unified Wire Ethernet Controller (5405) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-CH Unified Wire Ethernet Controller (5406) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-SO Unified Wire Ethernet Controller (5407) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-CX Unified Wire Ethernet Controller (5408) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-BT Unified Wire Ethernet Controller (5409) (All Subdevices)
 Chelsio Communications Inc (1425) : T504-BT Unified Wire Ethernet Controller (540a) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-CR Unified Wire Ethernet Controller (540d) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-LP-CR Unified Wire Ethernet Controller (540e) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-LP-CR Unified Wire Ethernet Controller (5410) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-LL-CR Unified Wire Ethernet Controller (5411) (All Subdevices)
 Chelsio Communications Inc (1425) : T560-CR Unified Wire Ethernet Controller (5412) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-CHR Unified Wire Ethernet Controller (5413) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-SO-CR Unified Wire Ethernet Controller (5414) (All Subdevices)
 Chelsio Communications Inc (1425) : T502-BT Unified Wire Ethernet Controller (5415) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-OCP-SO Unified Wire Ethernet Controller (5416) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-OCP-SO Unified Wire Ethernet Controller (5417) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-BT Unified Wire Ethernet Controller (5418) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (5419) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (541a) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (541b) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5080 Unified Wire Ethernet Controller (5480) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5081 Unified Wire Ethernet Controller (5481) (All Subdevices)
 Chelsio Communications Inc (1425) : T504-5082 Unified Wire Ethernet Controller (5482) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5083 Unified Wire Ethernet Controller (5483) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5084 Unified Wire Ethernet Controller (5484) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5085 Unified Wire Ethernet Controller (5485) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5086 Unified Wire Ethernet Controller (5486) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5087 Unified Wire Ethernet Controller (5487) (All Subdevices)
 Chelsio Communications Inc (1425) : T570-5088 Unified Wire Ethernet Controller (5488) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5089 Unified Wire Ethernet Controller (5489) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5090 Unified Wire Ethernet Controller (5490) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-5091 Unified Wire Ethernet Controller (5491) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5092 Unified Wire Ethernet Controller (5492) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5093 Unified Wire Ethernet Controller (5493) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5094 Unified Wire Ethernet Controller (5494) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5095 Unified Wire Ethernet Controller (5495) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5096 Unified Wire Ethernet Controller (5496) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5097 Unified Wire Ethernet Controller (5497) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5098 Unified Wire Ethernet Controller (5498) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5099 Unified Wire Ethernet Controller (5499) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509A Unified Wire Ethernet Controller (549a) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509B Unified Wire Ethernet Controller (549b) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509C Unified Wire Ethernet Controller (549c) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509D Unified Wire Ethernet Controller (549d) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509E Unified Wire Ethernet Controller (549e) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509F Unified Wire Ethernet Controller (549f) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A0 Unified Wire Ethernet Controller (54a0) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A1 Unified Wire Ethernet Controller (54a1) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A2 Unified Wire Ethernet Controller (54a2) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A3 Unified Wire Ethernet Controller (54a3) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A4 Unified Wire Ethernet Controller (54a4) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-50A5 Unified Wire Ethernet Controller (54a5) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-50A6 Unified Wire Ethernet Controller (54a6) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A7 Unified Wire Ethernet Controller (54a7) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A8 Unified Wire Ethernet Controller (54a8) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A9 Unified Wire Ethernet Controller (54a9) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50AA Unified Wire Ethernet Controller (54aa) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-50AB Unified Wire Ethernet Controller (54ab) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50AC Unified Wire Ethernet Controller (54ac) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (54ad) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (54ae) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (54af) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (54b0) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-CR Unified Wire Ethernet Controller (6401) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-SO-CR Unified Wire Ethernet Controller (6402) (All Subdevices)
 Chelsio Communications Inc (1425) : T6425-CR Unified Wire Ethernet Controller (6403) (All Subdevices)
 Chelsio Communications Inc (1425) : T6425-SO-CR Unified Wire Ethernet Controller (6404) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-OCP-SO Unified Wire Ethernet Controller (6405) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-OCP-SO Unified Wire Ethernet Controller (6406) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-LP-CR Unified Wire Ethernet Controller (6407) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-SO-CR Unified Wire Ethernet Controller (6408) (All Subdevices)
 Chelsio Communications Inc (1425) : T6210-BT Unified Wire Ethernet Controller (6409) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-CR Unified Wire Ethernet Controller (640d) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-LL-CR Unified Wire Ethernet Controller (6411) (All Subdevices)
 Chelsio Communications Inc (1425) : T61100-OCP-SO Unified Wire Ethernet Controller (6414) (All Subdevices)
 Chelsio Communications Inc (1425) : T6201-BT Unified Wire Ethernet Controller (6415) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6080 Unified Wire Ethernet Controller (6480) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-6081 Unified Wire Ethernet Controller (6481) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6082 Unified Wire Ethernet Controller (6482) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-6083 Unified Wire Ethernet Controller (6483) (All Subdevices)
 Chelsio Communications Inc (1425) : T64100-6084 Unified Wire Ethernet Controller (6484) (All Subdevices)
 Chelsio Communications Inc (1425) : T6240-6085 Unified Wire Ethernet Controller (6485) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6086 Unified Wire Ethernet Controller (6486) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6087 Unified Wire Ethernet Controller (6487) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (6488) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (6489) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (648a) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (648b) (All Subdevices)

PMD NAME: net_cxgbevf
PMD KMOD DEPENDENCIES: * igb_uio | vfio-pci
PMD HW SUPPORT:
 Chelsio Communications Inc (1425) : Unknown Device (5800) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-CR Unified Wire Ethernet Controller [VF] (5801) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-CR Unified Wire Ethernet Controller [VF] (5802) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-CR Unified Wire Ethernet Controller [VF] (5803) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-BCH Unified Wire Ethernet Controller [VF] (5804) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-BCH Unified Wire Ethernet Controller [VF] (5805) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-CH Unified Wire Ethernet Controller [VF] (5806) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-SO Unified Wire Ethernet Controller [VF] (5807) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-CX Unified Wire Ethernet Controller [VF] (5808) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-BT Unified Wire Ethernet Controller [VF] (5809) (All Subdevices)
 Chelsio Communications Inc (1425) : T504-BT Unified Wire Ethernet Controller [VF] (580a) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-CR Unified Wire Ethernet Controller [VF] (580d) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-LP-CR Unified Wire Ethernet Controller [VF] (580e) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-LP-CR Unified Wire Ethernet Controller [VF] (5810) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-LL-CR Unified Wire Ethernet Controller [VF] (5811) (All Subdevices)
 Chelsio Communications Inc (1425) : T560-CR Unified Wire Ethernet Controller [VF] (5812) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-CHR Unified Wire Ethernet Controller [VF] (5813) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-SO-CR Unified Wire Ethernet Controller [VF] (5814) (All Subdevices)
 Chelsio Communications Inc (1425) : T502-BT Unified Wire Ethernet Controller [VF] (5815) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-OCP-SO Unified Wire Ethernet Controller [VF] (5816) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-OCP-SO Unified Wire Ethernet Controller [VF] (5817) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-BT Unified Wire Ethernet Controller [VF] (5818) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (5819) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (581a) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (581b) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5080 Unified Wire Ethernet Controller [VF] (5880) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5081 Unified Wire Ethernet Controller [VF] (5881) (All Subdevices)
 Chelsio Communications Inc (1425) : T504-5082 Unified Wire Ethernet Controller [VF] (5882) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5083 Unified Wire Ethernet Controller [VF] (5883) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5084 Unified Wire Ethernet Controller [VF] (5884) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5085 Unified Wire Ethernet Controller [VF] (5885) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5086 Unified Wire Ethernet Controller [VF] (5886) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5087 Unified Wire Ethernet Controller [VF] (5887) (All Subdevices)
 Chelsio Communications Inc (1425) : T570-5088 Unified Wire Ethernet Controller [VF] (5888) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5089 Unified Wire Ethernet Controller [VF] (5889) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5090 Unified Wire Ethernet Controller [VF] (5890) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-5091 Unified Wire Ethernet Controller [VF] (5891) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5092 Unified Wire Ethernet Controller [VF] (5892) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5093 Unified Wire Ethernet Controller [VF] (5893) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5094 Unified Wire Ethernet Controller [VF] (5894) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-5095 Unified Wire Ethernet Controller [VF] (5895) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5096 Unified Wire Ethernet Controller [VF] (5896) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-5097 Unified Wire Ethernet Controller [VF] (5897) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5098 Unified Wire Ethernet Controller [VF] (5898) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-5099 Unified Wire Ethernet Controller [VF] (5899) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509A Unified Wire Ethernet Controller [VF] (589a) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509B Unified Wire Ethernet Controller [VF] (589b) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509C Unified Wire Ethernet Controller [VF] (589c) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509D Unified Wire Ethernet Controller [VF] (589d) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-509E Unified Wire Ethernet Controller [VF] (589e) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-509F Unified Wire Ethernet Controller [VF] (589f) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A0 Unified Wire Ethernet Controller [VF] (58a0) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A1 Unified Wire Ethernet Controller [VF] (58a1) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A2 Unified Wire Ethernet Controller [VF] (58a2) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A3 Unified Wire Ethernet Controller [VF] (58a3) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50A4 Unified Wire Ethernet Controller [VF] (58a4) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-50A5 Unified Wire Ethernet Controller [VF] (58a5) (All Subdevices)
 Chelsio Communications Inc (1425) : T522-50A6 Unified Wire Ethernet Controller [VF] (58a6) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A7 Unified Wire Ethernet Controller [VF] (58a7) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A8 Unified Wire Ethernet Controller [VF] (58a8) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50A9 Unified Wire Ethernet Controller [VF] (58a9) (All Subdevices)
 Chelsio Communications Inc (1425) : T580-50AA Unified Wire Ethernet Controller [VF] (58aa) (All Subdevices)
 Chelsio Communications Inc (1425) : T520-50AB Unified Wire Ethernet Controller [VF] (58ab) (All Subdevices)
 Chelsio Communications Inc (1425) : T540-50AC Unified Wire Ethernet Controller [VF] (58ac) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (58ad) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (58ae) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (58af) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (58b0) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-CR Unified Wire Ethernet Controller [VF] (6801) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-SO-CR Unified Wire Ethernet Controller [VF] (6802) (All Subdevices)
 Chelsio Communications Inc (1425) : T6425-CR Unified Wire Ethernet Controller [VF] (6803) (All Subdevices)
 Chelsio Communications Inc (1425) : T6425-SO-CR Unified Wire Ethernet Controller [VF] (6804) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-OCP-SO Unified Wire Ethernet Controller [VF] (6805) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-OCP-SO Unified Wire Ethernet Controller [VF] (6806) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-LP-CR Unified Wire Ethernet Controller [VF] (6807) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-SO-CR Unified Wire Ethernet Controller [VF] (6808) (All Subdevices)
 Chelsio Communications Inc (1425) : T6210-BT Unified Wire Ethernet Controller [VF] (6809) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-CR Unified Wire Ethernet Controller [VF] (680d) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-LL-CR Unified Wire Ethernet Controller [VF] (6811) (All Subdevices)
 Chelsio Communications Inc (1425) : T61100-OCP-SO Unified Wire Ethernet Controller [VF] (6814) (All Subdevices)
 Chelsio Communications Inc (1425) : T6201-BT Unified Wire Ethernet Controller [VF] (6815) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6080 Unified Wire Ethernet Controller [VF] (6880) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-6081 Unified Wire Ethernet Controller [VF] (6881) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6082 Unified Wire Ethernet Controller [VF] (6882) (All Subdevices)
 Chelsio Communications Inc (1425) : T62100-6083 Unified Wire Ethernet Controller [VF] (6883) (All Subdevices)
 Chelsio Communications Inc (1425) : T64100-6084 Unified Wire Ethernet Controller [VF] (6884) (All Subdevices)
 Chelsio Communications Inc (1425) : T6240-6085 Unified Wire Ethernet Controller [VF] (6885) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6086 Unified Wire Ethernet Controller [VF] (6886) (All Subdevices)
 Chelsio Communications Inc (1425) : T6225-6087 Unified Wire Ethernet Controller [VF] (6887) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (6888) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (6889) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (688a) (All Subdevices)
 Chelsio Communications Inc (1425) : Unknown Device (688b) (All Subdevices)

## Cisco

PMD NAME: net_enic
PMD PARAMETERS: disable-overlay=0|1 enable-avx2-rx=0|1 ig-vlan-rewrite=trunk|untag|priority|pass
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Cisco Systems Inc (1137) : Unknown Device (43) (All Subdevices)
 Cisco Systems Inc (1137) : Unknown Device (71) (All Subdevices)

## Freescale Semiconductor

PMD NAME: net_enetc
PMD KMOD DEPENDENCIES: * vfio-pci
PMD HW SUPPORT:
 Freescale Semiconductor Inc (1957) : Unknown Device (e100) (All Subdevices)
 Freescale Semiconductor Inc (1957) : Unknown Device (ef00) (All Subdevices)


## Intel Corporation

### Driver: net_ixgbe_vf

#### Dependencies:  
- igb_uio
- vfio-pci

| Device | Subdevice |
| --- | --- |
| 82599 Ethernet Controller Virtual Function (10ed) | All |
| 82599 Virtual Function (152e) | All |
| X540 Ethernet Controller Virtual Function (1515)) | All |
| X540 Virtual Function (1530)) | All |
| X550 Virtual Function (1564)) | All |
| X550 Virtual Function (1565)) | All |
| X553 Virtual Function (15c5) ) | All |
| X553 Virtual Function (15b4) ) | All |
| Ethernet Connection X552 Virtual Function (15a8) ) | All |
| X552 Virtual Function (15a9) ) | All |


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

PMD NAME: net_mlx5
PMD KMOD DEPENDENCIES: * ib_uverbs & mlx5_core & mlx5_ib
PMD HW SUPPORT:
 Mellanox Technologies (15b3) : MT27700 Family [ConnectX-4] (1013) (All Subdevices)
 Mellanox Technologies (15b3) : MT27700 Family [ConnectX-4 Virtual Function] (1014) (All Subdevices)
 Mellanox Technologies (15b3) : MT27710 Family [ConnectX-4 Lx] (1015) (All Subdevices)
 Mellanox Technologies (15b3) : MT27710 Family [ConnectX-4 Lx Virtual Function] (1016) (All Subdevices)
 Mellanox Technologies (15b3) : MT27800 Family [ConnectX-5] (1017) (All Subdevices)
 Mellanox Technologies (15b3) : MT27800 Family [ConnectX-5 Virtual Function] (1018) (All Subdevices)
 Mellanox Technologies (15b3) : MT28800 Family [ConnectX-5 Ex] (1019) (All Subdevices)
 Mellanox Technologies (15b3) : MT28800 Family [ConnectX-5 Ex Virtual Function] (101a) (All Subdevices)
 Mellanox Technologies (15b3) : MT416842 BlueField integrated ConnectX-5 network controller (a2d2) (All Subdevices)
 Mellanox Technologies (15b3) : MT416842 BlueField multicore SoC family VF (a2d3) (All Subdevices)
 Mellanox Technologies (15b3) : MT28908 Family [ConnectX-6] (101b) (All Subdevices)
 Mellanox Technologies (15b3) : MT28908 Family [ConnectX-6 Virtual Function] (101c) (All Subdevices)

PMD NAME: net_mlx4
PMD KMOD DEPENDENCIES: * ib_uverbs & mlx4_en & mlx4_core & mlx4_ib
PMD HW SUPPORT:
 Mellanox Technologies (15b3) : MT27500 Family [ConnectX-3] (1003) (All Subdevices)
 Mellanox Technologies (15b3) : MT27520 Family [ConnectX-3 Pro] (1007) (All Subdevices)
 Mellanox Technologies (15b3) : MT27500/MT27520 Family [ConnectX-3/ConnectX-3 Pro Virtual Function] (1004) (All Subdevices)

## Netronome

PMD NAME: net_nfp_vf
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio
PMD HW SUPPORT:
 Netronome Systems, Inc. (19ee) : Unknown Device (6003) (All Subdevices)

PMD NAME: net_nfp_pf
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio
PMD HW SUPPORT:
 Netronome Systems, Inc. (19ee) : Unknown Device (4000) (All Subdevices)
 Netronome Systems, Inc. (19ee) : Unknown Device (6000) (All Subdevices)

##QLogic

PMD NAME: net_qede_vf
PMD KMOD DEPENDENCIES: * igb_uio | vfio-pci
PMD HW SUPPORT:
 QLogic Corp. (1077) : Unknown Device (1630) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL45000 Series Gigabit Ethernet Controller (SR-IOV VF) (1664) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL41000 Series Gigabit Ethernet Controller (SR-IOV VF) (8090) (All Subdevices)

PMD NAME: net_qede
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 QLogic Corp. (1077) : FastLinQ QL45000 Series 40GbE Controller (1634) (All Subdevices)
 QLogic Corp. (1077) : Unknown Device (1629) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL45000 Series 40GbE Controller (1634) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL45000 Series 25GbE Controller (1656) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL45000 Series 100GbE Controller (1644) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL45000 Series 50GbE Controller (1654) (All Subdevices)
 QLogic Corp. (1077) : FastLinQ QL41000 Series 10/25/40/50GbE Controller (8070) (All Subdevices)
 QLogic Corp. (1077) : Unknown Device (8071) (All Subdevices)
 QLogic Corp. (1077) : Unknown Device (8072) (All Subdevices)
 QLogic Corp. (1077) : Unknown Device (8073) (All Subdevices)

## Red Hat

PMD NAME: net_ifcvf
PMD KMOD DEPENDENCIES: * vfio-pci
PMD HW SUPPORT:
 Red Hat, Inc. (1af4) : Virtio network device (1041) (Unknown Subdevice)

PMD NAME: net_virtio
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Red Hat, Inc. (1af4) : Virtio network device (1000) (All Subdevices)
 Red Hat, Inc. (1af4) : Virtio network device (1041) (All Subdevices)

PMD NAME: net_avp
PMD HW SUPPORT:
 Red Hat, Inc. (1af4) : Inter-VM shared memory (1110) (Unknown Subdevice)

## Solarflare

PMD NAME: net_sfc_efx
#### Parameters: `rx_datapath=[efx|ef10|ef10_essb] tx_datapath=[efx|ef10|ef10_simple] perf_profile=[auto|throughput|low-latency] fw_variant=[dont-care|full-feature|ultra-low-latency|capture-packed-stream|dpdk] rxd_wait_timeout_ns=<long> stats_update_period_ms=<long>`
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 Solarflare Communications (1924) : Unknown Device (903) (All Subdevices)
 Solarflare Communications (1924) : SFC9120 10G Ethernet Controller (Virtual Function) (1903) (All Subdevices)
 Solarflare Communications (1924) : Unknown Device (923) (All Subdevices)
 Solarflare Communications (1924) : SFC9140 10/40G Ethernet Controller (Virtual Function) (1923) (All Subdevices)
 Solarflare Communications (1924) : Unknown Device (a03) (All Subdevices)
 Solarflare Communications (1924) : SFC9220 10/40G Ethernet Controller (Virtual Function) (1a03) (All Subdevices)
 Solarflare Communications (1924) : Unknown Device (b03) (All Subdevices)
 Solarflare Communications (1924) : SFC9250 10/25/40/50/100G Ethernet Controller (Virtual Function) (1b03) (All Subdevices)

## VMWare

PMD NAME: net_vmxnet3
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
PMD HW SUPPORT:
 VMware (15ad) : Unknown Device (7b0) (All Subdevices)

## Other

PMD NAME: dpaa2_dpci
--
PMD NAME: net_pcap
#### Parameters: `rx_pcap=<string> tx_pcap=<string> rx_iface=<ifc> rx_iface_in=<ifc> tx_iface=<ifc> iface=<ifc> phy_mac=<int>`
--
PMD NAME: event_sw
PMD PARAMETERS: `numa_node=<int> sched_quanta=<int>credit_quanta=<int>`
--
PMD NAME: crypto_virtio
--
PMD NAME: net_dpaa2
PMD PARAMETERS: `drv_loopback=<int>`
--
PMD NAME: dpdmux
--
PMD NAME: net_tun
PMD PARAMETERS: `iface=<string>` 
--
PMD NAME: net_tap
PMD PARAMETERS: `iface=<string> mac=fixed|xx:xx:xx:xx:xx:xx remote=<string>`
--
PMD NAME: net_bonding
PMD PARAMETERS: `slave=<ifc> primary=<ifc> mode=[0-6] xmit_policy=[l2 | l23 | l34] agg_mode=[count | stable | bandwidth] socket_id=<int> mac=<mac addr> lsc_poll_period_ms=<int> up_delay=<int> down_delay=<int>`
--
PMD NAME: ipn3ke_cfg
PMD PARAMETERS: `afu=<string> fpga_acc=<string>i40e_pf=<string>`
--
PMD NAME: net_ipn3ke_afu
--
PMD NAME: net_failsafe
PMD PARAMETERS: `dev(<ifc>),exec(<shell command>),fd(<fd number>),mac=mac_addr,hotplug_poll=u64`
--
PMD NAME: net_kni
PMD PARAMETERS: `no_request_thread=<int>`
--
PMD NAME: net_ring
PMD PARAMETERS: nodeaction=name:node:action(ATTACH|CREATE)
--
PMD NAME: crypto_caam_jr
PMD PARAMETERS: `max_nb_queue_pairs=<int>socket_id=<int>`
--
PMD NAME: net_softnic
PMD PARAMETERS: `firmware=<string> conn_port=<uint16> cpu_id=<uint32> tm_n_queues=<uint32> tm_qsize0=<uint32> tm_qsize1=<uint32> tm_qsize2=<uint32> tm_qsize3=<uint32>`
--
PMD NAME: net_dpaa
--
PMD NAME: crypto_null
PMD PARAMETERS: `max_nb_queue_pairs=<int> socket_id=<int>`
--
PMD NAME: event_dsw
--
PMD NAME: dpcon
--
PMD NAME: event_dpaa2
--
PMD NAME: event_dpaa1
PMD PARAMETERS: `disable_intr=<int>`
--
PMD NAME: net_null
PMD PARAMETERS: `size=<int> copy=<int>`
--
PMD NAME: net_virtio_user
PMD PARAMETERS: `path=<path> mac=<mac addr> cq=<int> queue_size=<int> queues=<int> iface=<string> server=<0|1> mrg_rxbuf=<0|1> in_order=<0|1> packed_vq=<0|1>`
--
PMD NAME: net_af_packet
PMD PARAMETERS: `iface=<string> qpairs=<int> blocksz=<int> framesz=<int> framecnt=<int> qdisc_bypass=<0|1>`
--
PMD NAME: crypto_dpaa_sec
--
PMD NAME: event_opdl
PMD PARAMETERS: `numa_node=<int>do_validation=<int>self_test=<int>`
--
PMD NAME: dpaa2_qdma
PMD PARAMETERS: `no_prefetch=<int>` 
--
PMD NAME: ifpga_rawdev_cfg
PMD PARAMETERS: `ifpga=<string> port=<int> afu_bts=<path>`
--
PMD NAME: ifpga_rawdev_pci_driver
PMD KMOD DEPENDENCIES: * igb_uio | uio_pci_generic | vfio-pci
--
PMD NAME: event_skeleton
--
PMD NAME: net_netvsc
PMD KMOD DEPENDENCIES: * uio_hv_generic
--
PMD NAME: event_octeontx
--
PMD NAME: octeontx_ssovf
--
PMD NAME: octeontx_ssowvf
--
PMD NAME: octeontx_timvf
--
PMD NAME: net_vhost
PMD PARAMETERS: `iface=<ifc> queues=<int> client=<0|1> dequeue-zero-copy=<0|1> iommu-support=<0|1> postcopy-support=<0|1>`
--
PMD NAME: octeontx_pkovf
--
PMD NAME: octeontx_pkivf
--
PMD NAME: net_octeontx
PMD PARAMETERS: `nr_port=<int>`
--
PMD NAME: rawdev_skeleton
--
PMD NAME: net_vdev_netvsc
PMD PARAMETERS: `iface=<string> mac=<string> force=<int> ignore=<int>`
--
PMD NAME: crypto_dpaa2_sec
--
PMD NAME: baseband_null
PMD PARAMETERS: `max_nb_queues=<int> socket_id=<int>`
