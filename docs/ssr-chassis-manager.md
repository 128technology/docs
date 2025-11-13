---
title: SSR Chassis Manager
sidebar_label: SSR Chassis Manager
---

The SSR400 and SSR440 support an integrated Chassis Manager to help identify operations, connectivity, temperature, and provide insight into other vital operating data. 

## Chassis Manager

The Chassis Manager requires administrator privileges to use. Components include the LED Manager and Temperature Manager. 

### LED Manager

The LED Manager translates status updates from internal SSR components and provides a high level indicator of System Status via the System LED. 

The System LED displays the following colors to report system state:

- Steady Green: Operating normally
- Amber: Device is starting up
- Purple: Operation is degraded
- Red: Error detected in the device

The presence of any major or critical alarms will cause degraded service, resulting in the system LED showing purple. If a Purple or Red LED is seen, use `show alarms` to view the details of the error or alarm. 

Port LEDs have the following behavior to identify port status.

#### Left LED - Link Activity

- Blinking Green: The port and the link are active, and there is link activity.
- Green On Steadily: The port and the link are active, but there is no link activity.
- Off: The port is not active.

#### Right LED - Port Speed

Port speed is dependent on the type of port, SFP, or RJ-45.

**SFP Ports**
- Blinking Green: 1000 Mbps (1 blink per second)
- Green On Steadily: 10 Mbps

**RJ-45 Ports**
- Unlit—10 Mbps
- Blinking Green: 100 Mbps
- Green On Steadily: 1000 Mbps

### Temperature Manager

There are three temperature thresholds specified for each sensor:

- **Yellow**: A MAJOR alarm is generated, warning of high temperatures, but no action is taken.
- **Red**: A CRITICAL alarm is generated, warning of impending `critical temperature reached` shutdown The CPU is slowed and monitored to reduce heat generation.
- **Shutdown**: When the critical temperature threshold is reached, the system generates a fatal error and immediately shuts down the SSR to prevent any damage to the device. 

Use `show chassis temperature-thresholds` to see the default thresholds for each alarm level.

```
admin@node.router# show chassis temperature-thresholds 
Thu 2025-07-17 23:56:07 UTC 
Retrieving chassis status... 
  
=========== ============== =========== ========== 
 Sensor      Yellow Alarm   Red Alarm   Shutdown 
=========== ============== =========== ========== 
 cpu         97.0 C         99.0 C      101.0 C 
 mac         104.0 C        107.0 C     110.0 C 
 mainboard   86.0 C         89.0 C      92.0 C 
  
Completed in 0.01 seconds 
```

### CLI Commands

The following `show` commands allow you to see the chassis status from the CLI.

| CLI Command | Function |
| --- | --- |
| `show chassis led` | Shows the current LED states on the chassis. This will include the color, pattern, and description. |
| `show chassis led system` | Status of the system LED |
| `show chassis led port <number>` | Status of a specific port number |
| `show chassis environment` | Shows the current temperatures, fan speeds, and temperature thresholds. |
| `show chassis environment fans`	| Shows the current fan speeds, along with their settings. |
| `show chassis environment temperature` | Shows all current ambient and CPU temperatures using lm_sensors and sysfs, respectively. |
| `show chassis environment temperature sensor <id>` | Shows current temperatures for the specified sensor. |
| `show chassis environment temperature-threshold` | Lists the thresholds to trigger the Yellow alarm, Red alarm, and Fire Shutdown. |
| `show chassis environment temperature-threshold sensor <id>` | Lists the thresholds to trigger the Yellow alarm, Red alarm, and Fire Shutdown for the specified sensor. |
| `show chassis power` | Shows current PSU voltages and amperage levels. |
| `show chassis power component <id>`	| Shows current PSU voltages and amperage levels for the specified PSU id. |
| `show chassis hardware`	| Reports the hardware SKU, CLEI, revision (rev), and serial numbers from `/sys/kernel/leopard_idprom`. |
| `show chassis firmware`	| Shows CPLD and boot firmware versions from `/sys/kernel/leopard_cpld/version` and `/sys/devices/virtual/dmi/id/bios_version`, respectively. |


## Chassis Monitor

The Chassis Monitor will gather the temperature readings, temperature thresholds, fan speed, LED pattern, etc available through the software and provide this information in the SSR Web Interface (?) 

How is this information made visible to the user?




