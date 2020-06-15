---
title: Extending Web UI Navigation Bar
sidebar_label: Extending GUI Nav
---

The 128T Networking Platform has been designed to be extended beyond its base set of capabilities. One way in which this can be realized is in extending the navigation pane within the GUI to links external to the 128T platform. This is useful when integrating third party packages into the 128T ecosystem, such as utilizing [Squid Proxy](http://www.squid-cache.org) to perform URL filtering. Extending the navigation bar provides a seemless integration between the application so the user does not need to leave the 128T experience.

The example below shows the "Apple" and "Hello" added as external resources.

![Example](/img/howto_extend_gui_nav.png)

For applications that are running on the same platform as the 128T, the authentication token can be utilized to guarantee access to the requested resource.

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

Each external link requires a unqiue file per resource.