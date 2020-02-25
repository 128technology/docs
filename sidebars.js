module.exports = {
  "docs": {
    "Docusaurus": ['doc1', 'doc2', 'doc3'],
    "Features": ['mdx'],
    "About": [
      {
      	"type": "category",
      	"label": "Release Notes",
      	"items": [
          "release_notes/release_notes_4.2.0",
          "release_notes/release_notes_4.2.1"
        ],
      },
      {
      	"type": "doc",
      	"id": "about_contributing"
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
    "Plugins": [
      {
      	"type": "doc",
      	"id": "monitoring"
      }
    ],
    "Administration": [
      {
      	"type": "category",
      	"label": "Configuration",
      	"items": [
      	  "config_host_service"
      	],
      },
      {
      	"type": "category",
      	"label": "Troubleshooting",
      	"items": [
      	  "ts_services"
      	],
      },
    ],
    "APIs": [
      "apis_rest",
      "apis_netconf",
    ],
    "Events": [ "events" ],
    "Best Practics": [
      "bcp_service"
    ],
    "CLI Reference": [
      "cli_reference"
    ],
  }
};
