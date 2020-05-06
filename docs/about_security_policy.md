---
title: Security Vulnerability Policy
sidebar_label: Security Policy
description: 'This document defines the expections for 128 Technology in delivering communication and resolutions to security related vulenerabilities.'
---

## Introduction

This document describes the process for remediating and reporting identified vulnerabilities in 128 Technology products and services. The process covers investigation, triage, and remediation of internally or externally reported vulnerabilities. A companion document, Security Vulnerability Disclosure, deals with the interface between 128 Technology and those who find and report potential vulnerabilities.

The following flowchart illustrates the relationship between vulnerability disclosure and vulnerability handling.

![Security Handling Workflow](/img/about_security_policy_figure1.png)

## Reporting Suspected Security Vulnerability

Individuals and Enterprises that are experiencing 128 Technology product security issues are strongly encouraged to contact 128 SIRT through email at 128sirtreport@128technology.com or open a case on the 128 Technology customer portal at https://community.128technology.com.

## Organizational Roles and Responsibilities

The Security Incident Response Team (SIRT), is as the name implies - a team.  It is a limited set of individuals who are able to understand the nature of reported potential vulnerabilities and can coordinate with appropriate parties.

It is important that these parties understand the confidentiality of vulnerability related information and be well-versed in handling such information in order not to leak the vulnerability details before remediation development.  It is their responsibility to notify the appropriate product business members to take necessary actions for vulnerability handling when appropriate.

At the center of the SIRT is the Product SIRT, or PSIRT.  The PSIRT acts as a single point of contact for all stakeholders, such as vulnerability reporters, coordinators and other vendors.

Handling vulnerabilities extends beyond product, as customer engagement and public relations involvement may be necessary in major incidents.

### Engineering

The engineering department provides customers with products or services that have been developed by 128 Technology or implemented and/or commercialized with other vendor’s products or services. Engineering is the entity responsible for a core part of handling the process of vulnerabilities that affect their products or services as they are the ones validating and resolving any reported or identified vulnerabilities.

When potential vulnerabilities are reported to engineering by the PSIRT, the engineering team will work directly with the PSIRT to develop remediations. Anyone with the organization can escalate an issue to the PSIRT, if an issue is determined to be a vulnerability.

### Customer Success

Customer Success has the responsibility of handling and responding to security vulnerabilities reported by customers so that all customers are treated equally. Customer Success should partner closely with the PSIRT by following the process outlined below to ensure that the vulnerability is appropriately handled and responded to.

In the final stages of vulnerability handling, advisories are often released with remediations. When the advisory is sent via direct communications, this dissemination is conducted by the customer support division. Dissemination of information via mailing lists will be handled by the PSIRT. Customer support should choose the appropriate means to inform all necessary customers and maintain confidentiality until the coordinated date of disclosure.

Some users may ask questions or request vendor support after reading the advisories. Customer Support should be prepared to respond to or escalate questions and requests concerning advisories.

### Marketing

Since customers and members of the media can contact 128 Technology with questions or requests for additional information after a vulnerability is disclosed, divisions responsible for customer and public relations should be prepared so that they can respond.

## Communication with Other Stakeholders

When appropriate, the PSIRT should make arrangements for sharing vulnerability reports with coordinators or other vendors. They should be conscious of the vulnerability handling policy of the other party.

128 Technology utilizes third-party software in its codebase and should notify those organizations according to their software vulnerability disclosure policy should an issue be identified in third-party code.

128 Technology partners with hardware vendors to provide end-to-end solutions for the 128T Networking Platform.  Should a hardware or hardware-related software vulnerability be identified with the vendors solution, 128 Technology will follow the vendors vulnerability disclosure policy.

The PSIRT will track all vulnerabilities found in all components used in the development of the 128 Technology’s products and services, including components from third-parties or external suppliers. Vulnerabilities in third-party and shared components can affect the vendor’s products and services.

128 Technology will track all upstream dependencies and vulnerabilities to determine the extent of all products and services affected. 128 Technology will obtain vulnerability information, including remediation advice, from their upstream vendors. 128 Technology will provide vulnerability information, including remediation advice, to their downstream customers and users.

### Timing of public disclosure

The PSIRT should choose an appropriate date for the public vulnerability disclosure and prepare the advisory with the assistance of the product business division and other major stakeholders, such as legal, public relations, and external coordinators if applicable. The vulnerability disclosure should align to when the remediation is available so that users can take the necessary action.

#### Public Disclosure of third-party software vulnerabilities

In the event a third-party software organization, on which the 128 Technology Networking Platform depends, has publicly disclosed a vulnerability without prior disclosure to 128 Technology directly, 128 Technology will report to its customers any workarounds or remediation contained within the third-party advisory in advance of providing a resolution within the product.  Once a fix is provided within the product, an updated advisory will be reported to communicate the availability of a solution.

## Vulnerability Handling Process

![Vulnerability Handling Process](/img/about_security_policy_figure2.png)

### Receipt

The handling process for each vulnerability begins when receiving a new vulnerability report. Vulnerabilities reported to a vendor include:

1. Internally found vulnerabilities and potential vulnerabilities: A vulnerability was discovered by 128 Technology during the development lifecycle or after product release.
2. Externally found vulnerabilities and potential vulnerabilities: A vulnerability was discovered by a person or organization outside of 128 Technology.
3. Publicly disclosed vulnerabilities: A vulnerability was publicly disclosed without knowledge of and prior coordination with 128 Technology.

Records of all vulnerabilities and potential vulnerabilities received and processed by the vendor from any source will be maintained in the vulnerability tracking database.

#### Assessing the Security Risk

128 Technology makes use of the Common Vulnerability Scoring System (CVSS) as part of its process for evaluating reported potential vulnerabilities in 128 Technology products. The CVSS model uses three distinct measurements or scores that include Base, Temporal, and Environmental calculations. The PSIRT will provide the Base vulnerability score and sometimes will also use the Temporal vulnerability score. Customers are advised to calculate the Environmental score based on their deployment and their network parameters. The combination of all three scores should be considered as the final score. Organizations are advised to use this final score to prioritize responses in their own environments.

| Severity      | CVSS       | Information on the Solution              |
| ------------- | ---------- | ---------------------------------------- |
| Critical      | 9.0 - 10.0 | Fix information in the security advisory |
| High          | 7.0 - 8.9  | Fix information in the security advisory |
| Medium        | 5.0 - 6.9  | Fix information in the release notes     |
| Informational | 1.0 - 4.9  | Fix information in the release notes     |

#### Third-Party and Open-source Software Vulnerabilities

If there is a vulnerability in a third-party or an open-source software that is used within 128 Technology products, 128 Technology will typically use the CVSS score provided by the third-party/open-source provider. 128 Technology may adjust the CVSS score to match with the CVSS scoring system of 128 Technology products.

A third-party or an open-source software vulnerability will be considered High severity by 128 Technology if the following criteria are met:

* The vulnerability has gathered significant public attention
* The vulnerability has exploits available and/or is actively exploited
* The CVSS score is 7.0 or above

For High severity third-party or open-source vulnerabilities, 128 Technology will publish a security advisory within 72 working hours after 128 Technology classifies this vulnerability as High severity. 128 Technology will track and treat this vulnerability as a High-priority defect and will deliver a fix in the next release or as soon as a fix is available.

### Verification

128 Technology will verify reported vulnerabilities.

1. Initial investigation: 128 Technology will attempt to confirm the potential vulnerability, if the issue is found in a product or service that is supported by 128 Technology. Even if the potential vulnerability is reported in software or a service that is not currently supported, the investigation should continue until 128 Technology can determine whether the issue also affects supported products or services. 128 Technology will determine the severity of the reported vulnerability.
2. Possible process end: If the potential vulnerability cannot be verified or reproduced, then 128 Technology will ask the reporter for more information in order to attempt to successfully reproduce the issue. If more information is supplied, the investigation will resume. Otherwise 128 Technology will end the vulnerability handling process. Other circumstances can also cause 128 Technology to end the vulnerability handling process without remediation, for example:
    1. Duplicate: The issue is a duplicate vulnerability and has already been addressed by this process.
    2. Obsolete product: The vulnerability is in a product that is no longer supported by 128 Technology.
    3. Non-security: The report either has no security implications or is not exploitable with currently known techniques. 128 Technology will take record of the vulnerability, noting that exploitability can change when new techniques or attack vectors are discovered.  128 Technology will maintain awareness of current exploitation techniques, and revisit unconfirmed reports when new techniques are introduced.
    4. Other vendor: The vulnerability is due to a product or service for which 128 Technology is not responsible. The vulnerability report should be passed to the responsible parties.
3. Root cause analysis: 128 Technology attempts to determine the underlying causes of the vulnerability and attempts to identify the affected products including all possible methods of exploitation as it relates to the instance of the vulnerability.
4. Prioritization: 128 Technology considers the threat posed by the vulnerability to affected users of the product or service. For each affected product or service, there can be different severities of the same underlying issue. 128 Technology will determine the severity of a vulnerability in the most commonly deployed conditions of affected products or services when possible to assist the prioritization. Factors affecting relative urgency of producing a remediation are potential impact, likelihood of exploitation, and the scope of affected users.
5. Inform the reporter of results of verification.

#### Post-verification Internal Coordination

Once a vulnerability with a CVSS score of 7 or greater has been confirmed, the PSIRT will contact the members of the SIRT and formulate a communication plan.
Vulnerabilities with a score of 6.9 or below do not require communication with the SIRT team.  These issues will be remediated as standard defects and will be included as part of the product release notes.

The SIRT will review the security announcement in preparation for distribution.  The SIRT will determine if communication is necessary beyond the team based on risk exposure. If communication is needed beyond the SIRT, a meeting will be held with members of Customer Success, the Field Engineering and any other necessary parties to brief them on the announcement.

For a vulnerability scoring 9 - 10, it is recommended to take a proactive approach to customer communication.  Customer success will assess an accurate communication plan.

### Release

Service vulnerability remediation: For vulnerabilities in services, 128 Technology will update their deployment or configuration change processes for production systems as soon as possible.

Product vulnerability remediation: For vulnerabilities in products, once 128 Technology is satisfied that the vulnerability remediation is effective, 128 Technology will release the remediation and notice to its customers.

Upon release of the remediation, the security advisory will be published on a publicly accessible website.

#### Mailing List

Advisories will be published on 128 Technology’s 128sirtannounce mailing list and should be easily accessible by its users. If a disclosed vulnerability is a serious or widespread issue, public relations divisions should prepare for contact from mass news media.

The mailing list will be maintained by the PSIRT and will be accessible by members of the SIRT.  Contact information is subject to GDPR and customers and/or users of 128 Technology products and services have a right to be forgotten. When users are no longer active customers, their information will be purged.

In order to subscribe to the mailing list, send an email to 128sirtannounce-subscribe@128technology.com.

In order to unsubscribe from the mailing list, send an email to 128sirtaccounce-unsubscribe@128technology.com.

All announcements will be sent from 128sirtannounce@128technology.com.

### Post-Release

128 Technology will take the following actions in parallel after releasing the vulnerability remediation:

1. Case maintenance: After the remediation has been released, further updates to the remediation might continue. 128 Technology will update remediations as appropriate, generally until further updates are no longer relevant, iterating on earlier phases in the vulnerability handling process, such as the Verification or Remediation development phases.
2. Security development lifecycle feedback: 128 Technology will update elements of its development lifecycle using information gained during the root cause analysis to prevent similar vulnerabilities in new or updated products or services.
3. Monitoring: In the case of remediating service vulnerabilities, after 128 Technology applies the remediation, 128 Technology will monitor the stability of the product or service.
4. Retrospective analysis: Determine if the procedure is meeting the needs of 128 Technology and its customers.  Make refinements and improvements as necessary with an objective of continuous improvement.

## Confidentiality of Vulnerability Information

Vendors should take care to maintain the confidentiality of sensitive vulnerability information. There are two significant classes of information to protect. The first is personal or organizational identity information, such as the name of a reporter who wishes to remain anonymous, or the IP addresses of a customer that has been compromised due to exploitation of a vulnerability. The second class is vulnerability information that is not yet published or widely known, such as a vulnerability that is still under investigation or technical details that can benefit attackers.

128 Technology will follow reasonable operational security practices to protect sensitive vulnerability reports. These practices may include restricting access by organizational units and personnel on a “need-to-know” basis and encrypting data in transit over untrusted channels.

Premature disclosure of sensitive vulnerability information can increase the costs and risks associated with disclosure for vendors and users. The level of confidentiality should be based on how likely the information is to contribute to the development of exploit code and what information is already available publicly.

### Safeguards

128 Technology will make every effort to safeguard the premature disclosure of information about potential vulnerabilities before they are fixed.  This is managed by limiting all security risks to the SIRT team and others on a need-to-know basis.
