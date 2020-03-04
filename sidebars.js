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
    ],
    "Administration": [
      {
        "type": "category",
        "label": "Configuration",
        "items": [
          "config_basics",
          "config_audit_log",
          "config_tenants",
        ],
      },
      {
        "type": "category",
        "label": "Troubleshooting",
        "items": [
          "ts_connecting_to_routers",
        ],
      },
    ],
    "Events": [ "events" ],
    "Best Practics": [
      "bcp_conductor_deployment",
      "bcp_lte_peering",
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
