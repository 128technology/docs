module.exports = {
  "docs": {
    "About": [
      "about_128t",
      "CONTRIBUTING",
    ],
    "Introduction": [
      "intro_getting_started",
      "intro_downloading_iso",
      "intro_installation",
      "intro_installation_installer",
      "intro_installation_bootable_media",
      "intro_installation_aws",
      "intro_ztp",
      "intro_creating_bootable_usb",
      "intro_upgrading",
      "intro_rollback",
    ],
    "Concepts": [
      "concepts_application_discovery",
      "concepts_ha_theoryofoperation",
      "concepts_interface_types",
      "concepts_linux_host_networking",
      "concepts_network_planes",
      "concepts_metrics",
      "concepts_machine_communication",
      "concepts_session_timer",
      "concepts_glossary",
    ],
    "Administration": [
      {
        "type": "category",
        "label": "Configuration",
        "items": [
          "config_basics",
          "config_audit_log",
          "config_dns_proxy",
          "config_ldap",
          "config_ha",
          "config_non_forwarding_ha_interfaces",
          "config_adding_interfaces_to_ha_team",
          "config_transition_standalone_to_ha",
          "config_nat",
          "config_ospf",
          "config_snmp",
          "config_snmp_metrics",
          "config_tenants",
          "config_templates",
        ],
      },
      {
        "type": "category",
        "label": "How To",
        "items": [
          "howto_bgp",
          "howto_conductor_migration",
          "howto_maintenance_mode",
          "howto_trusted_ca_certificate",
          "howto_tune_bfd",
        ],
      },
      {
        "type": "category",
        "label": "Troubleshooting",
        "items": [
          "ts_applications",
          "ts_ap_salt_minion",
          "ts_cpu_spikes",
          "ts_connecting_to_routers",
          "ts_forwarding_resource_pools",
          "ts_logs",
          "ts_mac_uniqueness",
        ],
      },
    ],
    "Events": [
      "events_overview",
      "events_alarms",
      "events_events",
    ],
    "Best Practices": [
      "bcp_conductor_deployment",
      "bcp_lte_peering",
      "bcp_service_and_service_policy_design",
      "bcp_tenants",
    ],
    "CLI Reference": [
      "cli_reference",
    ],
    "Plugins": [
      "plugin_monitoring_agent",
      "plugin_gre"
    ],
    "REST APIs": [
      "api_rest_4.2.0",
    ],
    "Release Notes": [
      {
        "type": "category",
        "label": "128T",
        "items": [
          "release_notes/128t_release_notes_4.1",
          {
            "type": "category",
            "label": "4.0",
            "items": [
              "release_notes/128t_release_notes_4.0.1",
            ],
          },
          {
            "type": "category",
            "label": "4.1",
            "items": [
              "release_notes/128t_release_notes_4.1.0",
              "release_notes/128t_release_notes_4.1.1",
              "release_notes/128t_release_notes_4.1.2",
              "release_notes/128t_release_notes_4.1.3",
              "release_notes/128t_release_notes_4.1.4",
              "release_notes/128t_release_notes_4.1.5",
              "release_notes/128t_release_notes_4.1.6",
              "release_notes/128t_release_notes_4.1.7",
              "release_notes/128t_release_notes_4.1.8",
            ],
          },
          {
            "type": "category",
            "label": "4.2",
            "items": [
              "release_notes/128t_release_notes_4.2.0",
              "release_notes/128t_release_notes_4.2.1",
              "release_notes/128t_release_notes_4.2.2",
              "release_notes/128t_release_notes_4.2.3",
              "release_notes/128t_release_notes_4.2.4",
              "release_notes/128t_release_notes_4.2.5",
              "release_notes/128t_release_notes_4.2.6",
            ],
          },
          {
            "type": "category",
            "label": "4.3",
            "items": [
              "release_notes/128t_release_notes_4.3.0",
              "release_notes/128t_release_notes_4.3.1",
            ],
          },
        ],
      },
      {
        "type": "category",
        "label": "128T Installer",
        "items": [
          "release_notes/128t_installer_release_notes_2.1.0",
          "release_notes/128t_installer_release_notes_2.2.0",
          "release_notes/128t_installer_release_notes_2.3.0",
          "release_notes/128t_installer_release_notes_2.3.1",
          "release_notes/128t_installer_release_notes_2.3.2",
          "release_notes/128t_installer_release_notes_2.4.0",
          "release_notes/128t_installer_release_notes_2.4.1",
        ],
      },
      {
        "type": "category",
        "label": "128T IPSEC Client",
        "items": [
          "release_notes/128t_ipsec_client_release_notes_1.0.1",
          "release_notes/128t_ipsec_client_release_notes_2.0.1",
        ],
      },
      {
        "type": "category",
        "label": "128T SIP ALG",
        "items": [
          "release_notes/128t_sip_alg_release_notes_2.1.0",
        ],
      },
      {
        "type": "category",
        "label": "128T ZScaler",
        "items": [
          "release_notes/128t_zscaler_release_notes_1.1.2",
        ],
      },
    ],
  },
};
