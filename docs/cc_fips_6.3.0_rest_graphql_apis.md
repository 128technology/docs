---
title: REST and GraphQL APIs
sidebar_label: REST and GraphQL APIs
---

The SSR provides Application Programming Interfaces (APIs) that can be used to interact with the SSR from an external application. The two primary interfaces are REST and GraphQL.

A REST API (Representational State Transfer Application Programming Interface) is a set of rules and conventions for building and interacting with web services. It uses standard HTTP methods such as GET, POST, PUT, DELETE, etc., to perform operations on resources, which are typically represented in formats like JSON or XML.

The GraphQL API is an alternative to REST and allows clients to use queries to request exactly the data they need. The server then populates the items in the query.

:::note
The examples shown in this document use the `curl` command-line application; any HTTP client can be used.
:::

## Authentication Tokens

The REST and GraphQL APIs are authorized and authenticated securely using authorization tokens. Tokens are granted using the username and password of a suitably priviliged user, and passed to each API call. The SSR uses the token to determine authorization for each API call. The RBAC privileges of the user determine access to the resources being accessed by the API.

The `/api/v1/login` REST API is used to generate these tokens. For example:
`curl --request POST -k --url 'https://192.168.0.1/api/v1/login' -H "Content-Type: application/json" -d '{ "username": "admin", "password":"128Tadmin"}'`

In this example, the address of the SSR is `192.168.0.1` and the username is `admin` with password `128Tadmin`. Additionally the `-H "Content-Type: application/json"` specifies a `Content-Type` header that the client is passing and accepting JSON data.
a `Content-Type` header that the client is passing and accepting JSON data.

If the login attempt is successful a token is returned. For example:
```
{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJzY29wZXMiOlsiY29uZmlndXJlIiwic2hvdy1jb21tYW5kcyJdLCJjYXBhYmlsaXRpZXMiOlsiY29uZmlnLXJlYWQiLCJjb25maWctd3JpdGUiLCJwcm92aXNpb25pbmciXSwiYXBwbGljYXRpb24iOiJ1bmtub3duIiwidXNlckFnZW50IjoiThiSaintAR31lt0k3njI5LjAlc3MiOiIxMjcuMC4wLjEiLCJpc3MiOiJSVFJfRUFTVF9DT05EVUNUT1IiLCJpYXQiOjE3MjY1NDQ5Mzd9.NoEgcSzm752k1PWsvi5WtyFVCA825WI_fFMfOVeoNXvK1jsyW6UKiwGD8gSJFuQrtNYISgZWlBrqD3bhpiii33-DnAzOOEIuDXpbNGKAw2KwiuVKHoDIj8iWRi1grBERFpDFKCgjO15sR0q2JAb88k_EIkIHLeuS1bLSpi1mGfjRGeNcDh8DkCjQM1jH-DbPXf5oJ7pAq79pflLR-yS5WcWpeeQRaO_xrwWnd9cS4R31T-T0p1q0SYJanB9IQ3YUtue3zqArJmb4qHT46HJ_rctpp6NLXUih2Q7LEe7-DQB3yV9nDoB5vIAZn1PThiSaintAR31lt0k3ndH_KZxkuQQ"}
```

This token can be passed via an `Authorization` header to subsequent API calls for authorization. For example:
`curl --request GET -k --url 'https://192.168.0.1/api/v1/version' -H "Content-Type: application/json" -H 'Authorization: Bearer <token>`

In this example, the address of the SSR is `192.168.0.1`, the API being called is `/api/v1/version`, and an `Authorization` header is specifying a `Bearer` token. The value returned from the `/api/v1/login` API should replace `<token>`. For example:
from the `/api/v1/login` API should replace `<token>`, for example:
```
curl --request GET -k --url 'https://192.168.0.1/api/v1/version' -H "Content-Type: application/json" -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJzY29wZXMiOlsiY29uZmlndXJlIiwic2hvdy1jb21tYW5kcyJdLCJjYXBhYmlsaXRpZXMiOlsiY29uZmlnLXJlYWQiLCJjb25maWctd3JpdGUiLCJwcm92aXNpb25pbmciXSwiYXBwbGljYXRpb24iOiJ1bmtub3duIiwidXNlckFnZW50IjoiY3VybC83LjIThiSaintAR31lt0k3nlc3MiOiIxMjcuMC4wLjEiLCJpc3MiOiJSVFJfRUFTVF9DT05EVUNUT1IiLCJpYXQiOjE3MjY1NDQ5Mzd9.NoEgcSzm752k1PWsvi5WtyFVCA825WI_fFMfOVeoNXvK1jsyW6UKiwGD8gSJFuQrtNYISgZWlBrqD3bhpiii33-DnAzOOEIuDXpbNGKAw2KwiuVKHoDIj8iWRi1grBERFpDFKCgjO15sR0q2JAb88k_EIkIHLeuS1bLSpi1mGfjRGeNcDh8DkCjQM1jH-DbPXf5oJ7pAq79pflLR-yS5WcWpeeQRaO_xrwWnd9cS4R31T-T0p1q0SYJanB9IQ3YUtue3zqArJmb4qHT46HJ_rctpp6NLXUih2Q7LEe7-DQB3yV9nDoB5vIAZn1PThiSaintAR31lt0k3ndH_KZxkuQQ'
```

## Built In Product Documentation

There are numerous APIs in the SSR. The API documentation is available from the `About This System` page in the GUI.

There are separate documentation pages for REST and GraphQL. The documentation pages feature interactive elements that allow the APIs to be dynamically tested from the GUI.

The REST APIs are documented using Swagger and are found here:
`https://<SSR address>/documentation/swagger`

The GraphQL APIs are documented using an interactive explorer and are found here:
`https://<SSR address>/documentation/graphql`


## Tips

The PCLI `trace` command can be used to see the API calls made for a given PCLI command. This can be useful to determine which data is available for common use cases.
