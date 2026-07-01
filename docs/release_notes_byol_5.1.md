---
title: Bring Your Own License (BYOL)
sidebar_label: '5.1'
---
## Release 5.1.0

**Release Date:** June 30, 2026

#### New Features and Improvements

- **I95-64995 Increase BYOL install timeouts and make configurable**
Increased the default install timeout to 6 hours and allow for unlimited retries.

These values can be configured via cloud-init by setting the following options in the onboarding configuration.

```
{
    "download-timeout": "10h",
    "download-retries": 5
}
```


### Resolved Issues

 - **I95-65092 Packer leaves stale authorized key in the BYOL partition (AWS Only)**

    _**Resolution:**_ Explicitly remove all keys in the BYOL partition

