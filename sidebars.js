module.exports = {
  "docs": {
    "Docusaurus": ['doc1', 'doc2', 'doc3'],
    "Features": ['mdx'],
    "About": [
      {
      	"type": "category",
      	"label": "Release Notes",
      	"items": [ "release_notes/4.2.0", "release_notes/4.2.1" ],
      },
      {
      	"type": "doc",
      	"id": "about/contributing"
      },
    ],
    "Introduction": [
      "introduction/downloading",
      "introduction/installation",
      "introduction/getting_started",
    ],
    "Concepts": [
      "concepts/key_concepts",
      "concepts/glossary",
    ],
    "Plugins": [
      {
      	"type": "doc",
      	"id": "plugins/monitoring/monitoring"
      }
    ],
    "Administration": [
      {
      	"type": "category",
      	"label": "Configuration",
      	"items": [
      	  "administration/configuring/host_service"
      	],
      },
      {
      	"type": "category",
      	"label": "Troubleshooting",
      	"items": [
      	  "administration/troubleshooting/services"
      	],
      },
    ],
    "APIs": [
      "apis/rest",
      "apis/netconf",
    ],
    "Events": [ "events/events" ],
    "Best Practics": [
      "best_practice/service"
    ],
    "CLI Reference": [
      "cli_reference/cli_reference"
    ],
  }
};
