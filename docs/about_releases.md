---
title: List of Releases
sidebar_label: SSR Releases
---

The SSR software follows a semantic versioning scheme. Semantic versioning is a simple scheme built around the `name-X.Y.Z-build-milestone` concept. `X` is incremented for every major release. A major release can be the introduction of major features or when backwards compatibility _may_ be broken. `Y` is a minor release with solely non-breaking feature additions. `Z` is designated for bug fixes in previous releases. `-build` is used to denote the incremental process of development until the culmination in the final release. `-milestone` can be one of `r1`, `r2`, `sts` or `lts`.

Starting with version `5.4.0` the `-build` will reflect the number of iterations the release candidate went through prior to release. The build number will never increment once the software has been released. The build number will be included in the release notes for the respective version.

Version `6.1.0` introduces the milestone suffix to the SSR software release model. Every six months, a new SSR software stream (i.e., bump in Major or Minor) will be released. Each software stream (major.minor) will have three phases of release - R1, followed by R2, followed by a final release. Initial feature content for a stream will be known as R1 (Release candidate 1). R1 will be followed by additional feature content three months later in an R2 (Release candidate 2). Between R1 and R2, there may be patch releases. Once R2 is released, a customer must upgrade to R2 to remain on the same stream and address any defects identified in R1. Three months following R2, the release will be designated as either Standard Term Support (STS) or Long Term Support (LTS). Every other release stream will be designated as LTS (Long Term Support). The EoE dates for STS or LTS start once the software is labeled with the `sts` or `lts` suffix, respectively; not based on the FRS date.

:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically. 

For example, issues resolved in `4.3.12`, which was released on 3/12/2021, are resolved in `4.5.6`, which was released on 3/26/2021 and also resolved in `5.1.0`, which was released on 3/15/2021, and so on.

However, issues resolved in `4.3.12`, which was released on 3/12/2021 are not addressed in `4.5.5` because `4.5.5` was released on 2/10/2021. Even though `4.5.5` is lexicographically higher than `4.3.12`, it is chronologically older than 4.3.12.
:::

| Term   | Definition |
| ------ | ---------- |
| EoE    | End of Engineering support. Patches will no longer be produced after this date. |
| EoS    | End of Support. 6 months following EoE date. Release is EoL and TAC is unable to support unless software is upgraded. |
| Major  | Introduction of signficant features or backwards incompatibility. |
| Minor  | New feature content. |
| Patch  | Bug fixes only. |
| -build | Final build version released. |
| R1     | Release Candidate 1. Introduction of new features. First version of every release stream (major.minor). |
| R2     | Release Candidate 2. Introduction of new features. Second version of every release stream (major.minor). |
| sts    | Standard Term Support. 9 months until EoE from sts date. |
| lts    | Long Term Support. 24 months until EoE from lts date. |


## General Availability 

| Version | Initial GA Version | First Release Shipping Date | Latest GA Version | End of Engineering support | End of Support |
| -- | -- | -- | -- | -- | -- |
| Release 7.0 | [7.0.0](release_notes_128t_7.0.md#release-700-55r1) | September 19, 2025 | [7.0.0](release_notes_128t_7.0.md#release-700-48r1) | June 19, 2026 | December 19, 2026 |
| Release 6.3 | [6.3.0](release_notes_128t_6.3.md#release-630-107r1) | September 30, 2024 | [6.3.6-6-sts](release_notes_128t_6.3.md#release-636-6-sts) | May 6, 2026 | November 6, 2026 |
| Release 6.2 | [6.2.0](release_notes_128t_6.2.md#release-620-39r1) | November 16, 2023 | [6.2.9-lts](release_notes_128t_6.2.md#release-629-5-lts) | September 6, 2026 | March 6, 2027 |
| Release 6.1 | [6.1.0](release_notes_128t_6.1.md#release-610-55r1) | April 14, 2023 | [6.1.13-lts](release_notes_128t_6.1.md#release-6113-7-lts) | July 14, 2025 | January 14, 2026 |

## Out of Support

| Version     | FRS Date          | End of Engineering support | End of Support     |
| ----------- | ----------------- | -------------------------- | ------------------ |
| Release 6.0 | July 18, 2022     | November 30, 2023          | November 30, 2023  |
| Release 5.6 | March 16, 2023    | June 16, 2024              | December 16, 2024  |
| Release 5.5 | August 11, 2022   | November 19, 2023          | May 19, 2024       |
| Release 5.4 | February 18, 2022 | December 18, 2022          | June 18, 2023      |
| Release 5.3 | August 6, 2021    | February 6, 2022           | August 6, 2022     |
| Release 5.2 | May 10, 2021      | November 10, 2021          | May 10, 2022       |
| Release 5.1 | May 17, 2021      | August 24, 2022            | February 24, 2023  |
| Release 5.0 | December 18, 2020 | June 18, 2021              | December 18, 2021  |
| Release 4.5 | July 23, 2020     | April 15, 2021             | October 15, 2021   |
| Release 4.4 | May 19, 2020      | April 19, 2021             | September 19, 2021 |
| Release 4.3 | February 8, 2020  | December 24, 2020          | September 26, 2021 |
| Release 4.2 | November 21, 2019 | October 8, 2020            | April 8, 2021      |
| Release 4.1 | February 7, 2019  | July 8, 2020               | January 8, 2021    |
| Release 4.0 | December 18, 2018 | September 18, 2019         | March 18, 2020     |
| Release 3.2 | March 15, 2018    | December 15, 2018          | June 15, 2019      |


Please refer to the [Software Support Policy](about_support_policy.md) page to understand the lifecycle of SSR releases.
