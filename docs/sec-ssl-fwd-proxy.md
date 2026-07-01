---
title: Configure SSL Forward Proxy
sidebar_label: Configure SSL Forward Proxy
---

SSL Forward Proxy uses signed, trusted certificates to allow the SSR to perform a man-in-the-middle (MitM) function that decrypts and re-encrypts HTTPS traffic. This allows IDP and AV scans of the traffic to be performed at that time. By installing CA signed certificates into the Trusted Root Certification Authorities store of all client end-users' browsers and devices, malicious servers are prevented from performing MITM impersonation attacks against the client endpoints. 

SSL Forward Proxy is used in conjuction with the IDP and Anti-Virus features available with the SSR, and can be applied on the same access policy and service. Configuring an SSL forward proxy security profile (Strong, Medium, or Weak) indicates which security cipher suite is used. For more information about the available security cipher suites, see the [Supported SSL Ciper List](https://www.juniper.net/documentation/us/en/software/junos/application-identification/topics/topic-map/security-ssl-cipher-suites-for-ssl-proxy.html#id-digital-certificates-and-certificate-authorities__supported_ciphers).

The following are the high level steps necessary to configure SSL Forward Proxy:

- Acquire a CA-Signed Certificate: For use with SSL Forward Proxy, a self-signed certificate will not work. It must be signed by a public, trusted CA. 
- Distribute Certificates: Install the proxy's CA certificate into the Trusted Root Certification Authorities store of all client end-users' browsers and devices. If this step is missed, users will receive severe certificate trust warnings.
- Configure Security Policies: Create an SSL Proxy profile and attach it to your WAN edge. The device will begin intercepting designated HTTPS traffic.

:::note
Conductor-managed deplpoyments using SSL Forward Proxy are currently only supported on SSR1200, SSR1300, SSR1400, and SSR1500.
:::

## Configuration Using the Conductor GUI

Use the following steps to configure SSL Forward Proxy using the SSR Conductor GUI.

1. From the Configuration menu, select Authority, and then click on the Authority tile. 

![Authority Level](/img/fwd-proxy-authority1.png)

2. Scroll down to the Trusted CA Certificate, and click **ADD**.

![Add Trusted Certificate](/img/fwd-proxy-trustedca-cert2.png)

3. Enter a name for the certificate and click **SAVE**.

![Name the Certificate](/img/fwd-proxy-catest3.png)

4. In the **Trusted CA Certificate** details, under Validation Mode select `warn` from the drop down.

5. Select **Content** from the drop down under **Certificate Details**

6. In the Certififcate Content field, paste the contents of the certificate, including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

![Certificate Content](/img/fwd-proxy-add-cert-content.png)

7. Click Validate and Commit.

8. Scroll down to the **Client Certificate** field below Trusted CA Certificate, and click **ADD**.

9. Enter a Name for the client certificate.

![Client Certificate](/img/fwd-proxy-add-client1.png)

10. In the Client Certificate details, under Validation Mode select `warn` from the drop down.

11. Select **Content** from the drop down under **Certificate Details**

12. In the Certififcate Content field, paste the contents of the certificate, including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

![Client Certificate Details](/img/fwd-proxy-add-client2.png)

### Create the Profile

Create SSL-Proxy Profile using the uploaded certificates and other details.

1. Scroll down to SSL Profiles and click **ADD**.

![SSL profile creation](/img/fwd-proxy-ssl-profiles.png)

2. Enter the profile name.

![Profile Name](/img/fwd-proxy-ssl-profilename.png)

3. In the SSL Proxy Profile screen, select the policy level for the profile, and add the Root CA and Intermediate Certificates. These are available under the drop down for each field.

![Profile settings](/img/fwd-proxy-ssl-profile-settings.png)

### Add the SSL Profile to the Access Policy

Add the SSL Profile to the Access Policy of the service.

1. Return to the Authority level.

![Return to Authority](/img/fwd-proxy-return-authority.png)

2. Scroll down to **Services**. Select or create the Service that will use the SSL forward proxy. 

3. Under the Service, scroll down to **Access Policies** and click **ADD**. 

4. In the New Access Policy window, enter the Source name.

![New Access Policy](/img/fwd-proxy-access-policy-name.png)

5. Define the Access policy to suit your needs, and under **SSL Proxy Profile** select the proxy profile defined earlier.

![Access Policy Defined](/img/fwd-proxy-define-access-policy.png)

6. If the Access policy you want to associate with the SSL proxy profile already exists, select it, and under **SSL Proxy Profile** select the proxy profile defined earlier.

7. Click **Validate**, and **Commit**.

## CLI Configuration Example

The following is the above configuration shown in the CLI.

```
config 
    authority 
        trusted-ca-certificate      ssl-proxy-cert
            name                    ssl-proxy-cert
            content          			
                (text/plain)
            validation-mode         warn
		exit

        client-certificate          ssl-client-proxy-cert
            name                    ssl-client-proxy-cert
            content          
                (text/plain)
            validation-mode         warn
        exit

        ssl-proxy-profile           ssl-fwdproxy-profile1
            name                    ssl-fwdproxy-profile1
            policy                  medium
            client-certificate      ssl-client-proxy-cert
            root-ca-certificate     ssl-proxy-cert
            ignore-server-authentication    false
        exit
		
        service                     idp-service
            name                    idp-service
            enabled                 true
            scope                   private

            access-policy           Branch-idp
                ssl-proxy-profile   ssl-fwdproxy-profile1
                source              Branch-idp
                permission          allow
            exit
        exit

```





