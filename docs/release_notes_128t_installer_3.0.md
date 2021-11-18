---
title: 128T Installer 3.0 Release Notes
sidebar_label: '3.0'
---

## Release 3.0.0

### New Features and Improvements

- **Support for token-based software access**

### Caveats

- **IN-418 Installer 3.0 first download attempt from conductor fails on router:** 

_Workaround:_ Initiate the download again. The Installer will download.

------
- **I95-39793 Conductor fails to self-upgrade:** This issue affects only 4.5.6-1 systems performing Conductor self-upgrade with Installer version 2.7.0 (or later). Released versions of 128T prior or after 4.5.6-1 are not affected.

The following error is displayed:
```
/usr/bin/nice: /usr/lib/128T-installer/install128t.par: No such file or directory
Failed to upgrade 128T!
```
The recommended course of action is to perform a manual interactive upgrade of the conductor. Please refer to [Upgrading Using the Interactive Installer](intro_upgrading.md/#upgrading-using-the-interactive-installer) for that process. 