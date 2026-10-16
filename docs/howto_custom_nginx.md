---
title: Add Custom NGINX Configuration
sidebar_label: Add Custom NGINX Configuration
---

Custom NGINX directives may be needed to support deployment-specific requirements or integrations without modifying the SSR-managed `nginx.conf` file. For example, custom directives can be used to integrate external authentication services such as CAC/PIV, add request handling behavior, or apply other supported NGINX settings.

Use `/etc/nginx/default.d/` to add persistent custom NGINX directives to an SSR Conductor.

Do not modify `/etc/nginx/nginx.conf` directly. SSR manages this file and may regenerate it during system startup or other operations.

## Add the Configuration

1. Create a `.conf` file in `/etc/nginx/default.d/` containing only the required NGINX directives. Do not add a `server` block. For example:

```
	sudo tee /etc/nginx/default.d/zz-custom.conf >/dev/null <<'EOF'
	# Custom NGINX directives
	auth_request /oauth2/auth;
	error_page 401 = /oauth2/sign_in;
	auth_request_set $auth_user $upstream_http_x_auth_request_user;
	EOF
```
2. To preserve your custom NGINX file across image-based upgrades, create a data-transfer configuration file in `/etc/ssr-upgrade/data-transfer.d/`. For example:

```
	sudo tee /etc/ssr-upgrade/data-transfer.d/90-custom-nginx.yml >/dev/null <<'EOF'
	version: "2.1"
	data:
	  - dataset: Custom NGINX configuration
	    operations:
	      - upgrade
	      - reinstall
	    files:
	      - /etc/nginx/default.d/zz-custom.conf
	EOF
```
3. Validate the configuration:

	```
	sudo nginx -t
	```

4. If validation succeeds, reload NGINX:

	```
	sudo systemctl reload nginx
	```

5. Confirm that the custom file is included:

	```
	sudo nginx -T 2>&1 | grep -n "zz-custom.conf"
	```

## Remove the Configuration

1. Remove the custom file:

	```
	sudo rm -f /etc/nginx/default.d/zz-custom.conf
	```

2. Validate and reload NGINX:

	```
	sudo nginx -t
	sudo systemctl reload nginx
	```

:::note
If `nginx -t` reports an error, review the custom directives for invalid syntax, unsupported directives, or an incorrect configuration context.
:::
