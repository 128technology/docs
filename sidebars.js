module.exports = {
  "docs": {
    "About": [
      "about_128t",
      "CONTRIBUTING",
      {
      	"type": "category",
      	"label": "Release Notes",
      	"items": [
          "release_notes/release_notes_4.2.0",
          "release_notes/release_notes_4.2.1",
        ],
      },
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
          "config_snmp",
          "config_snmp_metrics",
          "config_tenants",
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
    "APIs": [
      "apis_rest",
      "apis_netconf",
    ],
  }
};
