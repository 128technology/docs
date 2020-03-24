module.exports = {
  "docs": {
    "About": [
      {
      	"type": "category",
      	"label": "Release Notes",
      	"items": [
          "release_notes/release_notes_4.2.0",
          "release_notes/release_notes_4.2.1",
        ],
      },
      {
      	"type": "doc",
      	"id": "CONTRIBUTING"
      },
    ],
    "Introduction": [
      "intro_downloading",
      "intro_installation",
      "intro_getting_started",
    ],
    "Concepts": [
      "concepts_glossary",
      "concepts_application_discovery",
      "concepts_ha_theoryofoperation",
      "concepts_interface_types",
      "concepts_linux_host_networking",
      "concepts_network_planes",
      "concepts_management_connections",
      "concepts_session_timer",
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
        "label": "Troubleshooting",
        "items": [
          "ts_applications",
          "ts_ap_salt_minion",
          "ts_cpu_spikes",
          "ts_connecting_to_routers",
          "ts_forwarding_resource_pools",
          "ts_mac_uniqueness",
        ],
      },
    ],
    "Events": [ "events" ],
    "Best Practics": [
      "bcp_conductor_deployment",
      "bcp_lte_peering",
      "bcp_service_and_service_policy_design",
      "bcp_tenants",
      "bcp_trusted_ca_certificate",
    ],
    "CLI Reference": [
      "cli_reference",
    ],
    "Plugins": [
      {
      	"type": "doc",
      	"id": "monitoring_agent",
      }
    ],
    "APIs": [
      "apis_rest",
      "apis_netconf",
    ],
  }
};
