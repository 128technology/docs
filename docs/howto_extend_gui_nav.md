---
title: Extending the GUI Navigation Bar
sidebar_label: Extending the GUI Navigation Bar
---

The SSR Networking Platform has been designed to be extended beyond its base set of capabilities. One way in which this can be realized is in extending the navigation pane within the GUI to links external to the SSR platform. This is useful when integrating third party packages into the SSR ecosystem, such as using [Squid Proxy](http://www.squid-cache.org) to perform URL filtering. Extending the navigation bar provides a seamless integration between the application so the user does not need to leave the SSR experience.

The example below shows the "Apple" and "Hello" added as external resources.

![Example](/img/howto_extend_gui_nav.png)

For applications that are running on the same platform as the SSR, the authentication token can be used to guarantee access to the requested resource.

In order to access the user token, the following code snippet can be leveraged:
```js
export function getUserToken(): string | undefined {
  const userRaw = window.sessionStorage.getItem('user') || '{}';
  const user = JSON.parse(userRaw);
  return user.token;
}
```
If the function `getUserToken()` returns a non-emtpy string, then the token is valid and the user is considered to be logged in. Any other return value indicates an invalid token or set of credentials.

In order to extend the web UI's sidebar, create a JSON file in the directory `/etc/128technology/thirdparty/ui-links`.  The contents of the file *must* follow the format:

`example_link.json`
```json
{ "name": "Title Of My Link", "url": "http://link.destination" }
```

Links added in this fashion are opened in a new browser tab.

Each external link requires a unique file per resource.