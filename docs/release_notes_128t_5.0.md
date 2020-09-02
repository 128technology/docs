---
title: 128T 5.0 Release Notes
sidebar_label: '5.0'
---

## Release 5.0.0

### New Features and Improvements

- **I95-9152** PCLI configuration help text now indicates which fields are required
------
- **I95-9242** STEP
------
- **I95-15618** Auto completion now available on `clear arp` PCLI command
------
- **I95-21776** Ethernet over SVR
------
- **I95-20757** Displaying alarm history within the PLCI via `show events alarm` now supports relative timestamps
------
- **I95-22350** Hierarchical Services
------
- **I95-22789** Dual LTE Support
------
- **I95-24412** Dual PPPoE Support
------
- **I95-25513, I95-36876, I95-33193** "About This System" within GUI now displays additional information specific to installation type (e.g., ISO vs. RPM)
------
- **I95-26076** Filtering server-sent events [questionable to include in release notes]
------
- **I95-27886** Packet Duplication for inter-node HA
------
- **I95-28531** Application Categorization
------
- **I95-32558** In-line Flow Performance Monitoring
------
- **I95-32043** `show sessions` updates
------
- **I95-33376** Address Latest Vulnerabilities
------
- **I95-33395** Lazy PCLI
------
- **I95-34217** GraphiQL API explorer and request builder within GUI
------
- **I95-34788** Add multiple config objects via REST
------
- **I95-34823** Add link to Docs on about page
------
- **I95-35150** PCLI Clone Config
------
- **I95-35190** PCLI Paste Config (bulk edit)
------
- **I95-35722** Deprecation warning improvements
------
- **I95-35741** Plugin Service Commands

### Issues Fixed

- **I95-18807** Innocuous error produced in journal due to imudp module loaded by rsyslog daemon

   _**Symptoms:**_ The following message can be seen in the journal
   ```
   rsyslogd[1337]: imudp: module loaded, but no listeners defined - no input will be gathered [v8.24.0 try http://www.rsyslog.com/e/2212 ]
   ```
------
- **I95-29643** Changing the name of an existing configuration object to one that already exists merges the two objects
------
- **I95-30670** Version mismatch alarm in HA pair is not generated when the salt minion is disconnected on one of the nodes in the pair
------
- **I95-32016** Output from `show config out-of-sync` displays `49 years` for disconnected routers
------
- **I95-33989** Incorrect error message reported within PCLI when trying to execute `validate` after a previous _validate_ was terminated with `CTRL+c`

  _**Symptom:**_ The following can be seen in the PCLI output:
  ```
  ✖ Validating...
  % Error: Candidate configuration is invalid:
  1. A request of type validate is already in progress. The first request was started 13 seconds ago
  ```
  Until the system is upgraded to 5.0.0, this issue will resolve itself after the background tasks have completed
------
- **I95-34065** Leading and trailing whitespace is now correctly trimmed from configuration input fields
------
- **I95-34078** Conductor Asset Status not correctly provided and should be like the routers asset status
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
- **I95-34775** linux save-tech-suport does not output the archive location information and saved to current dir
------
- **I95-34908** GraphiQL: New sidebar throws 'getClientHeight' error
------
- **I95-35238** PCLI prompt shows incorrect location on key change
------
- **I95-35544** Integrated LTE device-interface output missing SIM number
------
- **I95-36212** Highstate after config not applied because previous highstate in progress
------
- **I95-36351** User without admin privileges cannot change its password
------
- **I95-36358** Software download hung for a long time after the installer update was performed.
------
- **I95-36404** sysctl: cannot stat /proc/sys/net/ipv6/conf/default/optimistic_dad: No such file or directory
------
- **I95-36416** GUI error when configuring dns-config
------
- **I95-36536** highway crash on session-capture delete
------
- **I95-36537** Selective Session Capture default should not be unlimited sesssions
------
- **I95-36554** In memory rate metrics reporting total rather than delta
------
- **I95-36591** Connected BGP route redistribution causes route cycling
------
- **I95-36608** Fix when statement for management
------
- **I95-36628** Bad checksum calculation when doing q-in-q
------
- **I95-36645** UI: Bytes converter does not handle values larger than Terabyte (TB)
------
- **I95-36646** SVR Savings: Page continues to refresh on its own, resets router selector on refresh

## Special Considerations

- **I95-12833** Provisioning deprecated configuration fields now prompts for confirmation
------
- **I95-20718** CLI now produces a warning creating configuration object with keywords ("delete", "force", "move", "clone", "all") as their name
------
- **I95-34624** Remove AP driven install from 128T
------
- **I95-34983, I95-35892** Remove unused PCLI Commands
------
- **I95-35609** Enhanced software delivery mechanism (Artifactory and changes to file naming)
------
- **I95-35761** remove regex from PCLI search/replace
------
- **I95-36096** "Safer" PCLI Logging
------
- **I95-36102** make `compare config` default to `compare config running candidate`
------
- **I95-36525** TLS 1.0 is no longer supported

## Caveats
