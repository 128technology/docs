---
title: PCLI Packet Capture
---

In troubleshooting issues in a network, time is of the utmost importance.  With that, PCAPs are one of the most useful tools to debug traffic issues on a 128T Router(s) as well as wider networking issues.  Given those two factors, there’s often a need to quickly add or remove a capture filter without a need to make it persistent.

Without this feature's functionality the only way to enable capture filters is through configuration.  The `capture-filter` list must be added to the configuration of the device interface and then configuration must be applied for capture filters to take effect, which in turn, makes them persistent across reboots.  While straight forward and easily configured, when configuration grow in scale and size this process can become time consuming to perform and gather the necessary information in time available.  Additionally, there may be configuration that has been staged that is not ready to commit.  This staged configuration would need to be rolled back in order to enable pcaps - a most undesirable workflow.

There are some caveats to note when using this functionality:

- Creating or removing a capture filter in this way does not persist and will not survive a reboot or restart of the 128T software
- There is an interaction with configured capture filters when creating and removing capture filters manually
  - If capture filters exist within the configuration and a configuration change happens that does not impact static capture-filters, the configuration change will not affect dynamic capture-filters.
  - If static capture-filters exist within the configuration, and if a configuration change modifies the static capture-filters, all dynamic capture-filters will be removed.

Three CLI Commands have been added to perform these functions:

- [create capture-filter](cli_reference.md#create-capture-filter)
- [delete capture-filter](cli_reference.md#delete-capture-filter)
- [show capture-filter](cli_reference.md#show-capture-filters)

### create capture-filter

The capture-filter uses BPF (Berkeley Packet Filter) syntax, exactly the same as the configured capture filters. If the syntax is not correct, the filter will be rejected. Please refer to online BPF documentation for syntax help. If a capture filter already exists, the create will simply be ignored.

An example of creating a capture filter is below:

```
>> create capture-filter
  usage: capture-filter [force] [router <router>] [node <node>]
                         device-interface <device-interface> <capture-filter>
  Creates capture-filter from highway at the specified node
  keyword arguments:
  device-interface    The device interface on which to create the capture
                      filter
  force               Skip confirmation prompt
  node                The node on which to create the capture filter
  router              The router on which to create the capture filter
  positional arguments:
  capture-filter      The capture-filter to create (Uses BPF syntax)
```

### delete capture-filter

This command can be used to remove the temporarily added capture filters as well as temporarily removing any added through configuration.  The command will return an error if the capture filter is not present.

An example of removing a capture filter is below:

```
>> delete capture-filter
  usage: capture-filter [force] [router <router>] [node <node>]
                        device-interface <device-interface> <capture-filter>
  Deletes capture-filter from highway at the specified node
  keyword arguments:
  device-interface    The device interface on which to delete the capture
                      filter
  force               Skip confirmation prompt
  node                The node on which to remove the capture filter
  router              The router on which to remove the capture filter

  positional arguments:
  capture-filter    The capture-filter to remove (Uses BPF syntax)
```

`device-interface all` can be used to remove all capture filters on a particular node/router.  Omitting `capture-filter` from the command will remove all capture filters for a specified device interface.

### show capture-filter

Since the configuration of the system may no longer represent what's been manually added or removed, a corresponding show command is being added, which will display all temporary capture filters as well as the ones added through configuration

An example of showing a capture filter is below:

```
>> show capture-filters
  usage: capture-filters [device-interface <device-interface>]
                         [force] [router <router>] [node <node>]
  Show active capture-filters
  keyword arguments:
  device-interface    Device interface on which to show capture-filters
  force               Skip confirmation prompt
  node                The node on which to show capture-filters
  router              The router on which to show capture-filters
```
