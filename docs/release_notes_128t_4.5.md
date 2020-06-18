---
title: 128T 4.5 Release Notes
sidebar_label: 4.5
---

## Release 4.5.0

### New Features and Improvements

- **I95-9955** Stronger security encryption for secure fields in configuration
------
- **I95-1212, I95-34108** [Configuration Templates](config_templates.md)
------
- **I95-16104** Management traffic over forwarding interface
------
- **I95-22304** Add support for re-running commands in PCLI history with "!"
------
- **I95-23898** Improved feedback on PCLI when invalid arguments are provided to command
------
- **I95-28366** Greatly reduced memory consumption of PCLI, allowing many more concurrently users
------
- **I95-29043** [Asset Connection Resiliency](config_asset_connection_resiliency.md)
------
- **I95-30332** [Extensibility of GUI Navigation pane for 3rd party links](howto_extend_gui_nav.md)
------
- **I95-31405** [SVR Savings Proof Points](about_svr_savings.md)
------
- **I95-32783** [`show assets summary` enhancements](cli_reference.md#show-assets-summary)
------
- **I95-33174** LTE Band Management
------
- **I95-33215** Audiocodes M800 watchdog integration
------
- **I95-33351** Optimize FIB port-range storage
------
- **I95-33358** Create static host name mappings at router level
------
- **I95-33375** Address Latest Vulnerabilities 4.5
------
- **I95-33427** Per-Service Rate Limiting
------
- **I95-33484** Silicom new platform testing
------
- **I95-33776** [`show config events`](cli_reference.md#show-events-config-commit) tracks configuration changes

### Issues Fixed

- **I95-33313** Add units to 'show device-interface' output
------
- **I95-34112** rename "show config events" -> "show events config"

## Special Considerations

- **I95-33004** RoadRunner Removed
  The RoadRunner process collected anonymous information from the router and sent it to 128 Technology for storage and analysis. This helped inform and allows 128 Technology to support and improve the 128 Networking Platform. The anonymous data collection tool, RoadRunner has been removed from the product.

## Caveats
