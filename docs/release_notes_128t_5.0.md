---
title: 128T 5.0 Release Notes
sidebar_label: '5.0'
---

## Release 5.0.0

### New Features and Improvements

- **I95-9152** PCLI configuration help text now indicates which fields are required
------
- **I95-9242** Service and Topology Exchange Protocol (STEP)
------
- **I95-15618** Auto completion now available on `clear arp` PCLI command
------
- **I95-20757** Displaying alarm history within the PCLI via `show events alarm` now supports relative timestamps
------
- **I95-21776** Ethernet over Secure Vector Routing (EoSVR)
------
- **I95-22350** Hierarchical Services
------
- **I95-22789** Dual LTE Support
------
- **I95-24412** Dual PPPoE Support
------
- **I95-27886** Packet Duplication for inter-node HA
------
- **I95-28531** Application Categorization
------
- **I95-32558** In-line Flow Performance Monitoring
------
- **I95-33376** Address Latest Vulnerabilities
------
- **I95-33395** Improved PCLI startup time by 60%
------
- **I95-34217** GraphiQL API explorer and request builder within GUI
------
- **I95-34788** Support for bulk configuration edits via REST
------
- **I95-34823** About page includes link to online documentation
------
- **I95-35150** PCLI Clone Configuration
------
- **I95-35190** [PCLI bulk paste configuration](concepts_pcli.md#paste-config)
------
- **I95-35741** [PCLI plugin service commands](cli_reference.md#manage-plugin-install)

### Issues Fixed

- **I95-29643** Changing the name of an existing configuration object to one that already exists merges the two objects
------
- **I95-30670** Version mismatch alarm in HA pair is not generated when the salt minion is disconnected on one of the nodes in the pair
------
- **I95-32016** Output from `show config out-of-sync` displays `49 years` for disconnected routers
------
- **I95-34065** Leading and trailing whitespace is now correctly trimmed from configuration input fields
------
- **I95-34078** Conductor asset status is empty
------
- **I95-34448** Viewing "Event History" in GUI can result in an error dialog with the following content:
  ```
  Error: TypeError: expected dynamic type `int/double/bool/string', but had type `null'
    at t.f [as project] (https://1.2.3.4/21.chunk.4855571a0034f587fb2f.js:1:28085)
    at t._next (https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:29:145514)
    at t.next (https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:16:68940)
    at https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:41:211792
  ```
------
- **I95-34775** Linux save-tech-support does not output the archive location information
------
- **I95-34908** GraphiQL produces an error when collapsing the sidebar
------
- **I95-35020** PCLI command history was previously unbounded
------
- **I95-35238** PCLI prompt shows incorrect location on when the object key has changed
------
- **I95-35722** PCLI warning message formatting is now consistent with error messages
------
- **I95-36645** UI: Bytes converter does not handle values larger than Terabyte (TB)
------
- **I95-36828** Unable to acquire logs through GUI when `remote-login` is disabled

## Special Considerations

- **I95-12833** Provisioning deprecated configuration fields now prompts for confirmation
------
- **I95-20718** PCLI now produces a warning when creating configuration objects with the keywords ("delete", "force", "move", "clone", "all") as their name
------
- **I95-34624** Remove Automated Provisioner driven install from 128T
------
- **I95-34983, I95-35892** Remove unused PCLI Commands
------
- **I95-36096** PCLI sessions are now captured in their own respective log file
------
- **I95-36102** `compare config` now defaults to `compare config running candidate` when no additional arguments are supplied
------
- **I95-36525** TLS 1.0 is no longer supported

## Caveats
