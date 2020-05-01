---
title: Security Vulnerability Policy
sidebar_label: Security Policy
description: 'This document defines the expections for 128 Technology in delivering communication and resolutions to security related vulenerabilities.'
---

## Introduction

The 128 Technology Security Incident Response Team (SIRT) is responsible for responding to security vulnerabilities in 128 Technology products. The SIRT is a dedicated team within the 128 Technology Engineering organization, and is responsible for monitoring, investigating and reporting information on security vulnerabilities related to 128 Technology products. 128 Technology defines a security vulnerability as an unintended weakness in the 128 Technology product that allows an attacker to compromise the functionality and confidentiality of the product or its users.

## Reporting Suspected Security Vulnerability

Individuals and Enterprises that are experiencing 128 Technology product security issues are strongly encouraged to contact 128 SIRT through email at 128sirtreport@128technology.com or open a case on the 128 Technology customer portal at https://community.128technology.com/support.

## Receiving Suspected Security Vulnerability

Individuals and Organizations can subscribe to 128sirtannounce@128technology.com by sending an email to 128sirtannounce-subscribe@128technology.com to receive security vulnerabily reports from 128 Technology.

You can unsubscribe from the mailing list by sending an email to 128sirtannounce-unsubscribe@128technology.com

## 128 Technology Security Incident Response Process

The 128 Technology SIRT investigates all reported vulnerabilities regardless of the supported software code version. Issues will be prioritized based on the potential severity of the security vulnerability and other deployment factors. Ultimately, the resolution of a reported vulnerability may require upgrades to products that are under active support from 128 Technology.

Throughout the investigation process, the SIRT will work collaboratively with the reporter of the vulnerability to confirm the nature of the vulnerability, gather the required information, and work towards an appropriate remedial action. When the initial investigation is complete, results will be delivered to the vulnerability reporter along with a plan for resolution and any required public disclosure.

During the investigation, the 128 Technology SIRT will manage all sensitive information on a highly confidential basis.

128 Technology SIRT will optionally publish this vulnerability along with the information on the remedy to CERT.

## Assessing the Security Risk

128 Technology makes use of the Common Vulnerability Scoring System (CVSS) as part of its process for evaluating reported potential vulnerabilities in 128 Technology products. The CVSS model uses three distinct measurements or scores that include Base, Temporal, and Environmental calculations. 128 Technology will provide the Base vulnerability score and sometimes will also use the Temporal vulnerability score. Customers are advised to calculate
the Environmental score based on their deployment and their network parameters. The combination of all three scores should be considered as the final score. Organizations are advised to use this final score to prioritize responses in their own environments.

| Severity      | CVSS       | Information on the Solution              |
| ------------- | ---------- | ---------------------------------------- |
| Critical      | 9.0 - 10.0 | Fix information in the security advisory |
| High          | 7.0 - 8.9  | Fix information in the security advisory |
| Medium        | 5.0 - 6.9  | Fix information in the release notes     |
| Informational | 1.0 - 4.9  | Fix information in the release notes     |

For vulnerabilities classified as Critical or High severity by 128 Technology, a security advisory will be issued within 72 working hours. A High priority defect will be created by 128 Technology for these vulnerabilities and a software fix will be delivered as soon as the fix is available to the next scheduled release.

For vulnerabilities classified as Medium or Informational, a Medium priority defect will be created by 128 Technology and will be fixed in a timely fashion.

## Thid-Party and Open-source Software Vulnerabilities

If there is a vulnerability in a third-party or an open-source software that is used within 128 Technology products, 128 Technology will typically use the CVSS score provided by the third-party/open-source provider. 128 Technology may adjust the CVSS score to match with the CVSS scoring system of 128 Technology products.

A third-party or an open-source software vulnerability will be considered High severity by 128 Technology if the following criteria are met:
* The vulnerability has gathered significant public attention
* The vulnerability has exploits available and/or is actively exploited
* The CVSS score is 7.0 or above

For High severity third-party or open-source vulnerabilities, 128 Technology will publish a security advisory within 72 working hours after 128 Technology classifies this vulnerability as High severity. 128 Technology will track and treat this vulnerability as a High-priority defect and will deliver a fix in the next release or as soon as a fix is available.