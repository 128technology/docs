# AWS Code

## Why

Mist will not allow us to directly query the marvis endpoint from a non-origin domain. Thus, we need a proxy.

## Architecture

We'll use AWS Lambda + API Gateway

### Lambda

Create a new lambda function and drop the "lamba.js" code in it. It should be a NodeJS
environment with the default specs (memory/cpu/etc...)

Make sure you fill in 2 environment variables: TOKEN & ORG that the lambda uses to communicate back to Mist.

### API Gateway

1) Create a new HTTP API Gateway
2) Create an Resource. Can just be "/"
3) Click "Actions" > "Enable CORS" and make sure its enabled.
4) On your resource, create a new Method called "POST"
5) Edit that method to invoke your Lambda.


