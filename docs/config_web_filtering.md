---
title: Web Filtering 
sidebar: Web Filtering
---

## Overview

Web filtering provides technology within SSR that allows administrators to prevent clients within a network access to dangerous, malicious, or inappropriate internet content. While Domain-based routing provides a broad method of filtering content, web filtering extracts the full URL as http traffic traverses the router. This allows a more targeted approach to filtering. Additionally, Web filtering provides domain classification using third party data sources to generate the most comprehensive, real time, and up-to-date worldwide database for categorizing domains and URLs. 

### How it Works

The SSR Application Director (AD) maintains a local cache of URLs known to contain threatening content, or that have been configured to be blocked. As clients request various URLs over HTTP, the SSR compares the request to the local cache. If a requested URL is matched to one in the cache, then the information configured for the Category is used - allow or block. If the requested URL does not exist in the cache, the AD makes a secure, authenticated, and asynchronous query to the Websense ThreatSeeker Cloud service. 
- The initial request is dropped while the query takes place, and a configurable number of retransmissions takes place to maintain the connection.
- If no threat is identified, the local cache is updated, and the session continues normally.
- If the URL is considered threatening/dangerous, the service policy is applied and the connection to the URL is terminated. 

### Basic Configuration

- Configure `application-identification` and `web-filtering`
- Configure or edit a child service to block the content

#### Example Config

Configure `application-identification` mode `all` and enable `web-filtering`:

```
config
	authority
    	      router  office
        	    name      office
        	    application-identification
            	  mode  all
            	  web-filtering
           		      enabled true           		 
        	    exit
    	      exit
	exit
exit
```

Create a child service and an `access-policy` to restrict traffic:

```
config
	authority
    	service      internet
        	name              	internet
        	description       	"The INTERNET"
        	address           	0.0.0.0/0
        	access-policy     	lan
            	source  lan
            	permission allow
        	exit
    	exit
    	service  block.internet
        	name              	block.internet
        	description       	"Block certain content"
        	domain-name-category    Sports
        	access-policy    	lan
            	source  	lan
            	permission  deny
        	exit
    	exit
exit

```

## Using Web Filtering


