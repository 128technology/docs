---
title: 128T Installer 2.2 Release Notes
sidebar_label: 2.2
---

## Release 2.2.0

### New Features and Improvements
- **IN-55** Installer supports and installs CentOS 7.5 for 128T Software 

### Caveats
- **IN-106** - Installer fails due to presense of .repodata
  _**Symptom:**_ Installer fails with
  ```
Failed creating repo database in directory /var/lib/install128t/repos/saved: 
    Temporary repodata directory /var/lib/install128t/repos/saved/.repodata/ already exists!
  ```
  _**Corrective Action:**_ On the system with the error, remove the directory `/var/lib/install128t/repos/saved/.repodata/` and restart the installation


