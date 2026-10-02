---
title: Bring Your Own License (BYOL)
sidebar_label: '5.2'
---
## Release 5.2.0

**Release Date:** Oct 7, 2026

### New Features and Improvements

- **I95-66517 Updated sizing guidelines for AWS, GCP**
Updated sizing guidelines to be in-line with SSR Hardware Platforms. Legacy sizes are still available, but new reccomended sizes are added.

#### AWS
```
c5n.xlarge
c5n.2xlarge
r8in.2xlarge
r8in.4xlarge
r8in.8xlarge
r8in.16xlarge
```
#### GCP
```
c2-standard-4
c2-standard-8
n2-highmem-8
n2-highmem-16
n2-highmem-32
n2-highmem-64
```

### Resolved Issues

 - **I95-66255 Disabling console does not work on cloud instances**

    _**Resolution:**_ Updated the console grub arguments to be supported by SSR

