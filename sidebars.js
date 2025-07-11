module.exports = {
  "docs": {
    "About": [
      "intro_getting_started",
      "about_128t",
      "about_svr_savings",
      "about_releases",
      "about_support_policy",
      "about_security_policy",
    ],
    "Release Notes": [
      {
        "type": "category",
        "label": "SSR",
        "items": [
          "release_notes_128t_6.3",
          "release_notes_128t_6.2",
          "release_notes_128t_6.1",
          "release_notes_128t_6.0",
          "release_notes_128t_5.6",
          "release_notes_128t_5.5",
          "release_notes_128t_5.4",
          "release_notes_128t_5.3",
          "release_notes_128t_5.2",
          "release_notes_128t_5.1",
          "release_notes_128t_5.0",
          "release_notes_128t_4.5",
          "release_notes_128t_4.4",
          "release_notes_128t_4.3",
          "release_notes_128t_4.2",
          "release_notes_128t_4.1",
          "release_notes_128t_4.0",
        ],
      },
      {
        "type": "category",
        "label": "SSR Installer",
        "items": [
          "release_notes_128t_installer_3.2",
          "release_notes_128t_installer_3.1",
          "release_notes_128t_installer_3.0",
          "release_notes_128t_installer_2.7",
          "release_notes_128t_installer_2.6",
          "release_notes_128t_installer_2.5",
          "release_notes_128t_installer_2.4",
          "release_notes_128t_installer_2.3",
          "release_notes_128t_installer_2.2",
          "release_notes_128t_installer_2.1",
        ],
      },
      {
        "type": "category",
        "label": "WAN Assurance Plugin",
        "items": [
          "release_notes_wan_assurance_plugin_3.12",
          "release_notes_wan_assurance_plugin_3.11",
          "release_notes_wan_assurance_plugin_3.10",
          "release_notes_wan_assurance_plugin_3.9",
          "release_notes_wan_assurance_plugin_3.8",
          "release_notes_wan_assurance_plugin_3.7",
          "release_notes_wan_assurance_plugin_3.6",
          "release_notes_wan_assurance_plugin_3.5",
          "release_notes_wan_assurance_plugin_3.4",
          "release_notes_wan_assurance_plugin_3.3"
        ],
      },
      {
        "type": "category",
        "label": "BYOL Cloud Images",
        "items": [
          "release_notes_byol_3.0",
          "release_notes_byol_2.0",
          "release_notes_byol"
        ]
      },
    ],
    "Supported Hardware Platforms":[
      "supported-devices-overview",
      "intro_system_reqs",
      "config_firewall_ports",
      "about_supported_platforms",
      "about_certified_platforms",
      "rma_wan_assurance",
    ],
    "Concepts": [
      "concepts-overview",
      "concepts_application_discovery",
      "concepts_EthOverSVR",
      "concepts_ha_theoryofoperation",
      "concepts_interface_types",
      "concepts_kni",
      "concepts_linux_host_networking",
      "concepts_learning_VRF_routes",
      "concepts_network_planes",
      "concepts_metadata",
      "concepts_metrics",
      "concepts_machine_communication",
      "concepts_pcli",
      "concepts_session_timer",
      "concepts_waypoint_ports",
      "concepts_monitoring",
      "concepts_glossary",
      {
        "type": "category",
        "label": "Understanding the Forwarding Information Base",
        "items": [
          "concepts_fib",
          "concepts_fib_construction",
          "concepts_fib_design",
          "bcp_fib_design",
          "ts_fib",
        ],
      },
    ],
    "Installing Software Version 6.3.0 and Later": [
      "intro_installation",
      "intro_installation_univ-iso",
      "install_univ_iso",
      "initialize_u-iso_device",
      "initialize_u-iso_adv_workflow",
      "intro_installation_image",
    ],
    "Cloud / Hypervisor Installations": [
      "supported_cloud_platforms",
      "hypervisor-support",
      "install_vmware_config",
      "intro_initialize_HA_conductor",
      {
       "type": "category",
          "label": "Installing In AWS",
          "items": [
            "intro_installation_quickstart_aws",
            "intro_installation_quickstart_mist_aws",
            "intro_installation_quickstart_byol_conductor_aws",
            "intro_installation_quickstart_byol_mist_aws",
            ],
      },
      {
       "type": "category",
          "label": "Installing In Azure",
          "items": [
            "intro_installation_azure",
            "intro_installation_azure_mist",
            "intro_installation_byol_azure_conductor",
            "intro_installation_byol_azure_mist",
          ],
      },
    ],
    "Installing Software Versions Earlier than 6.3.0": [
      "intro_installation_legacy",
      "intro_downloading_iso",
      "intro_creating_bootable_usb",
      {
       "type": "category",
          "label": "Conductor Installation",
          "items": [
            "install_conductor_overview",
            "bcp_conductor_deployment",
            "single_conductor_install",
            "ha_conductor_install",
            "single_conductor_config",
            "conductor_upgrade",
            "howto_conductor_migration",
          ],
      },
      {
       "type": "category",
          "label": "Router Installation",
          "items": [
            "intro_installation_bootable_media",
           "intro_basic_router_config",
            "intro_otp_iso_install",
            "intro_install_quickstart_otpiso",
            "onboard_ssr_to_conductor",
            "onboard_ssr_device_otp",
            "howto_router_migration",
          ],
      },
      {
       "type": "category",
          "label": "Installer/Initializer Reference",
          "items": [
            "installer_cli_reference",
            "installer_preferences",
            "initializer_cli_reference",
            "initializer_preferences",
          ],
      },
      {
       "type": "category",
          "label": "Appendix",
          "items": [
            "intro_installation_installer",
            "install_qcow2_deployment",
            "legacy_OTP_install",
          ],
      },
    ],
    "Upgrading the SSR": [
      "intro_upgrade_considerations",
      "intro_upgrading",
      "upgrade_ibu_conductor",
      "upgrade_router",
      "upgrade_restricted_access",
      "upgrade_legacy",
      "intro_rollback",
    ],
    "Best Practices": [
      "bcp_sdwan_design_guide",
      "bcp_per-adjacency_traffic_engineering",
      "bcp_att_avpn_configuration",
      "bcp_using_128T_as_ntp_server",
      "bcp_dhcp_relay_overview",
      "bcp_qos_msft_expressroute",
      "bcp_monitoring_headends",
      "bcp_service_and_service_policy_design",
      "bcp_service-policy_defaults",
    ],
    "Administration Guide": [
      {
        "type": "category",
        "label": "Administration",
        "items": [
          "config_basics",
          "config_templates",
          "how_to_local_config_override",
          "config_RBAC",
          "config_audit_event",
          "config_dns_proxy",
          "config_in-memory_metrics",
          "howto_ms365",
          "howto_extend_gui_nav",
          ],
        },
        {
        "type": "category",
        "label": "Application Identification",
        "items": [
          "concepts_appid",
          "config_app_ident",
          "how_to_use_app_summary",
          ],
        },
        {
        "type": "category",
        "label": "Events and Alarms",
        "items": [
          "events_overview",
          "events_alarms",
          "events_events",
          "config_alarm_suppression",
          "howto_maintenance_mode",
          ],
        },
        {
        "type": "category",
        "label": "Network Address Translation (NAT)",
        "items": [
          "config_source-dest_nat",
          "config_static_nat",
          "config_dnat",
          "config_nat_pools",
          "ts_nat_troubleshooting",
          ],
        },
        {
        "type": "category",
        "label": "Network Features",
        "items": [
          "config_dhcp",
          "config_session_recovery",
          "config_forward_error_correction",
          "config_management_over_forwarding",
          "config_domain-based_web_filter",
          "config_EthoSVR",
          "config_EthoSVR_activestandby",
          "config_flow_perf_mon",
          "config_gre_tunnel",
          "config_service_health",
          "config_static_hostname_mapping",
          "config_transport_encryption",
          "config_asset_connection_resiliency",
          ],
        },
        {
        "type": "category",
        "label": "Routing and Network Protocols",
        "items": [
          "config_dscp_steering",
          "config_dscp_preservation",
          "config_vrf_learning",
          "config_session_optimization",
          "config_bgp",
          "config_vrf_route_leaking",
          "config_ospf",
          "config_bfd",
          "config_bfd_tunnel",
          "howto_tune_bfd",
          "howto_config_PPPoE",
          "howto_pppoe_vlan",
          "config_multicast",
          "config_lacp",
          "howto_update_bios",
          "howto_lte",
          "bcp_lte_peering",
          ],
        },
        {
        "type": "category",
        "label": "SNMP",
        "items": [
          "config_snmp",
          "howto_config_snmp",
          "config_snmp_metrics",
          ],
        },
        {
        "type": "category",
        "label": "Tenants",
        "items": [
          "config_tenants",
          "bcp_tenants",
          ],
        },
        {
        "type": "category",
        "label": "Traffic Engineering",
        "items": [
          "concepts_traf_eng",
          "bcp_per-adjacency_traffic_engineering",
          "config_te_net_intf",
          "config_dev_intf_traf_eng",
          "config_application_steering",
          "config_rate_limiting",
          ],
        },
    ],
    "Security":[
      "security-overview",
      {
        "type": "category",
        "label": "Access Management and Authentication",
        "items": [
          "config_access_mgmt",
          "config_ldap",
          "config_radius",
          "config_radsec",
          "config_syslog_tls",
          "config_webserver_certs",
          "howto_trusted_ca_certificate",
          "config_password_policies",
          "howto_reset_user_password",
          "config_ntp_auth",
        ],
      },
      {
        "type": "category",
        "label": "Security",
        "items": [
          "sec_adaptive_encrypt",
          "sec_firewall_filtering",
          "sec_security_policy",
          "sec_hardening_guidelines",
          "sec-usb-security",
          "sec-disable-console-output",
        ],
      },
      {
        "type": "category",
        "label": "Intrusion Detection and Prevention",
        "items": [
          "concepts_ssr_idp",
          "config_idp",
          "ts_idp",
          "sec-config-antivirus",
        ],
      },
      {
        "type": "category",
        "label": "SSR Common Criteria Install and Configuration - SSR V6.2.5",
        "items": [
          "cc_fips_titlepage",
          "cc_fips_intro",
          "cc_fips_compliance_guidelines",
          "cc_fips_ssr_security_scope",
          "cc_fips_secure_deliver",
          "cc_fips_intro_installation",
          "cc_fips_downloading_iso",
          "cc_fips_conductor_install",
          "cc_fips_otp_router_install",
          "cc_fips_install_quickstart_otpiso",
          "cc_fips_router_install",
          "cc_fips_access_mgmt",
          "cc_fips_config_ntp_auth",
          "cc_fips_config_password_policies",
          "cc_fips_config_audit_event",
          "cc_fips_sec_firewall_filtering",
          "cc_fips_banners",
          "cc_fips_software_upgrades",
          "cc_fips_appendix",
        ],
      },
    ],
    "High Availability": [
      "config_ha",
      "config_dual_router_ha",
      "config_ha_vrrp",
      "config_non_forwarding_ha_interfaces",
      "config_adding_interfaces_to_ha_team",
      "config_transition_standalone_to_ha",
    ],
    "CLI and Element Reference": [
      "cli_reference",
      "config_command_guide",
      "config_reference_guide",
      "cli_stats_reference",
      "intro_rest_graphql_apis",
      "bcp_salt_pillars",
    ],
    "WAN Assurance": [
      "wan_overview",
      "hdwr_ssr_device_port_layout",
      {
        "type": "category",
        "label": "WAN Assurance Quick Start",
        "items": [
          "wan_assurance_ssr120_quickstart",
          "wan_assurance_ssr130_quickstart",
          "wan_assurance_ssr1200_quickstart",
          "wan_assurance_ssr1300_quickstart",
          "wan_assurance_ssr1400_quickstart",
          "wan_assurance_ssr1500_quickstart",
          "intro_wa_quickstart_3_templates",
          "intro_wa_quickstart_4_siteassign",
          ],
      },
      {
        "type": "category",
        "label": "Cloud Telemetry for a Conductor-Managed SSR",
        "items": [
          "config_wan_assurance",
          "wan_telemetry_features",
          "wan_telemetry_troubleshooting",
          ],
      },
      {
        "type": "category",
        "label": "Whitebox Adoption",
        "items": [
          "wan_staging",
          "hdwr_whitebox_port_layout",
          "wan_onboarding_whitebox",
          "wan_telemetry_site_assign",
          ]
      },
    ],
    "Plugins": [
      "plugin_intro",
      "plugin_bgp_community_services",
      "plugin_cloud_ha",
      "plugin_dns_app_id",
      "plugin_dns_cache",
      "plugin_gre",
      "plugin_ha_sync_redundancy",
      "plugin_http_probe",
      "plugin_icmp_reachability_detection",
      "plugin_ipsec_client",
      "plugin_loopback_static_routes",
      "plugin_m800_watchdog",
      "plugin_monitoring_agent",
      "plugin_mosh",
      "plugin_set_hostname",
      "plugin_sip_alg",
      "plugin_wireguard",
      "plugin_kni_namespace_scripts",
    ],
    "Troubleshooting": [
        "ts_applications",
        "ts_ap_duplicate_assets",
        "ts_ap_salt_minion",
        "ts_cpu_spikes",
        "ts_connecting_to_routers",
        "ts_forwarding_resource_pools",
        "ts_logs",
        "ts_mac_uniqueness",
        "ts_packet_capture",
        "ts_serial_console_tsing",
        "ts_session_processing",
        "ts_t1_troubleshooting",
        "ts_traceroute",
        "ts_troubleshooting_vrf",
    ],
  },
};
