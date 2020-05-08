---
title: Using Saltstack at Scale With 128T
sidebar_label: Saltstack at Scale With 128T
---

## Abstract

This guide is intended to provide methods for users to implement custom Saltstack functionality in a performant way that will not affect their ability to provision new systems at scale.

This guide is not intended to teach the users how to use Saltstack. This document will reference the Salt top file and Salt pillars. Some good resources for these topics are:

[Salt Top File](https://docs.saltstack.com/en/latest/ref/states/top.html)

[Salt Pillars](https://docs.saltstack.com/en/latest/topics/tutorials/pillar.html)

## Using Salt with 128T

The 128T Conductor uses different Salt environments to logically separate the 128T specific Salt state and modules from any custom Salt modules implemented by the user. The locations for each environment are defined in the Salt Master configuration file on the Conductor located at `/etc/128technology/salt/master`:
```
file_roots:
  128T:
    - /usr/lib/128technology/python/salt/file_roots
  base:
    - /srv/salt
  plugins:
    - /var/lib/128technology/plugins/salt

pillar_roots:
  128T:
    - /usr/lib/128technology/python/salt/pillar
  base:
    - /srv/pillar
  plugins:
    - /var/lib/128technology/plugins/pillar
```


The `128T` and `plugins` environments are managed by the Conductor and should not be touched. The `base` environment is left for the user to implement any custom Salt logic for their specific deployment. When a Salt Minion connects to the 128T Conductor the Salt Master will execute the Salt highstate for each Salt environment automatically. The highstate consists of the states listed in the `top.sls` for each environment. By default the `top.sls` for the `base` environment performs a dummy state meant to serve as an example to users:
```
[root@t101-dut1 ~]# cat /srv/salt/top.sls
base:
  '*':
    - dummy
[root@t101-dut1 ~]# cat /srv/salt/dummy.sls
/dev/null:
  file.touch:
    - name: /dev/null
```

## Using Salt Pillars

Pillars are tree-like structures of data defined on the Salt Master and passed through to Salt Minions. They allow confidential, targeted data to be securely sent only to the relevant Salt Minion. Pillars are commonly used to store variable information for each Salt Minion, which are used when the Salt Minion renders a Salt state before executing it. Here is an example of a common approach for using Salt pillars:

The pillar top file defines which pillars apply to which Salt Minions (Note: The ellipsis is not part of the syntax, it serves to illustrate there are a large number of Salt Minions):

`/srv/pillar/top.sls`:
```
base:
  '*':
    - common
  'Router1NodeA':
    - router1A
  'Router1NodeB':
    - router1B

   ...

  'Router999NodeA':
    - router999A
  'Router999NodeB':
    - router999B
```

Each pillar file defined above contains the variables for a specific Salt Minion:

`/srv/pillar/router1A.sls`:
```
configured_interfaces:
  - name: eth0
    address: '192.168.1.1'
    netmask: '255.255.255.254'
    gateway: '192.168.1.2
  - name: eth1
    address: '172.16.0.1'
    netmask: '255.255.255.0'
    gateway: '172.16.0.100'

```

`/srv/pillar/router1B.sls`:
```
configured_interfaces:
  - name: eth0
    address: '192.168.1.2'
    netmask: '255.255.255.254'
    gateway: '192.168.1.1'
  - name: eth1
    address: '172.16.0.2'
    netmask: '255.255.255.0'
    gateway: '172.16.0.100'
```

The pillar data can be accessed as variables in Salt states and the Salt Minion will automatically render the state with the correct pillar information when the state is executed:
```
{%- set configured_interfaces = pillar.get('configured_interfaces') %}
{%- for interface in configured_interfaces %}

Interface {{ interface.name }}:
  network.managed:
    - enabled: True
    - type: eth
    - ipaddr: {{ interface.address }}
    - netmask: {{ interface.address }}
    - gateway: {{ interface.gateway }}
    - dns:
      - 8.8.8.8
      - 8.8.4.4
```

This approach quickly breaks down at scale. Each time a highstate is run the Salt Master needs to parse the pillar top file and decide which pillar files apply to each Salt Minion. The top file supports glob matching and is not always a simple 1:1 matching from Salt Minion ID to pillar file, therefore the entire file needs to be parsed each time a highstate is performed. Next the Salt Master encrypts the pillar data and sends it to each Salt Minion. These operations become extremely costly and bring the Salt Master to a halt if the pillar top file contains 1000s of individual pillar files.

## A Better Approach: Map Files

Pillar files are best used only for sensitive data like passwords or SSH keys. Any other data should be converted to use map files instead. The swap from pillar files to map files is very simple.

Move all pillar files from the pillar directory `/srv/pillar/` to a new data directory within the Salt file roots `/srv/salt/data` and rename the pillar files to have the extension matching their data type instead of the `.sls` extension:
```
[root@t101-dut1 ~]# ll /srv/salt/data/
-rw-r--r-- 1 root root 473 May  6 23:06 common.yaml
-rw-r--r-- 1 root root  74 May  6 23:06 router1A.yaml
-rw-r--r-- 1 root root  74 May  6 23:06 router1B.yaml
-rw-r--r-- 1 root root  74 May  6 23:06 router2A.yaml
-rw-r--r-- 1 root root  74 May  6 23:06 router2B.yaml
...
-rw-r--r-- 1 root root  74 May  6 23:06 router999A.yaml
-rw-r--r-- 1 root root  74 May  6 23:06 router999B.yaml
```

Now convert all Salt states to access the information from the map file instead of the pillar file.

Before:
```
{%- set configured_interfaces = pillar.get('configured_interfaces') %}
```

After:

*Note*: In this example the map files for each Salt Minion are named after the Salt Minion ID. The first line uses the Salt Minion ID to form the file name.
```
{%- set data_file = 'data/%s.yaml' % opts.id %}
{%- import_yaml data_file as data %}
{%- set configured_interfaces = data.get('configured_interfaces') %}
```

There is no need to manually sync the map file from the data directory on the Salt Master to the Salt Minions. Since the data files located at `/srv/salt/data` are placed within the Salt file roots `/srv/salt/` the Salt Minion can fetch them from the Salt Master automatically. Within the states the data file path is referenced as `data/` as seen in the first line of the example above because the Salt state's root directory is the Salt file roots.


## Conclusion

With the Salt pillar approach the Salt Master renders the entire pillar top file and encrypts the pillar data each time it needs to perform highstate. With the map file approach the Salt Master simply executes the highstate and the Salt Minion will fetch the correct map file automatically and render the information locally, saving lots of CPU cycles on the Salt Master. The only downside with the map approach is that the data is not encrypted on the Salt Minion when the map file retrieved and cached locally, which is why the map approach should not be used for sensitive data.

Pillars can still be used at scale provided that the pillar top file is small. One example would be using Salt pillars to set the same root password on all managed 128T Routers:
```
base:
  '*':
    - password
```