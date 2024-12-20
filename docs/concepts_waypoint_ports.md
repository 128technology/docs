---
title: Waypoints and Waypoint Ports
sidebar_label: Waypoints
---

*Secure Vector Routing*, the patented technique used by an SSR to send directional, encrypted, tunnel-free traffic to its peers, creates engineered pathways between *waypoints* – IP addresses assigned to SSR interfaces.

Much like an airplane pilot creates a flight plan between the source airport and destination airport, charting a series of air traffic control towers with which they will check in en route, an SSR also creates a sort of "flight plan" for each session it forwards using SVR. Rather than using tunnels between software instances, the SSR uses a novel NATting technique to create distinct "[tuples](https://en.wikipedia.org/wiki/Tuple)" between one another, where the tuple includes a unique combination of source IP, destination IP, source port, destination port, and transport protocol.

On any given SSR, each [forwarding interface's](concepts_interface_types.md) IP address is referred to as a "waypoint." This represents the source IP address it will use with sending SVR traffic to a peer, or the destination IP address it will use when receiving SVR traffic initiated by a peer. The ports that are used to construct unique tuples are referred to as "waypoint ports" (or sometimes, "wayports").

When forwarding traffic for a new session, the transmitting SSR *selects its own local waypoint port as well as the destination SSR's waypoint port*. This is a bit unusual (and part of our "secret sauce"), in that the router maintains a free port list for each of its peers.

:::note
When learning about SVR and waypoint allocation, a frequently asked question about SVR is "how can you send more than 65,535 concurrent sessions (the limits of UDP and TCP port allocations) if you base it on port?" The answer is: because the transmitting SSR can vary its source port and send multiple sessions to the same destination port, the upper limit is much, much, much higher than 65,535. We'll show the math behind it shortly.
:::

By default, each SSR will allocate waypoint ports for each of its interfaces using the default range of 16,384 through 65,534, for a total of 49,151 ports. When sending traffic to a peer, the SSR will allocate an **even numbered** waypoint for itself and an **odd numbered** waypoint for its peer. (We did this to avoid "glare conditions," the exceedingly unlikely chance that two devices would pick the exact same values in two directions simultaneously).

:::warning
Here's the math.
:::

Thus, each wayport on an SSR can initiate 24,576 (even local ports) sessions to each of 24,575 (odd remote ports) unique wayports on its peer. That's a theoretical maximum of 603,955,200 unique concurrent sessions between a pair of waypoints *in each direction*, disregarding the fact that most peering relationships have multiple transports – and thus more waypoints – between them.

## Limiting the Options

Sometimes, 603 million concurrent sessions is simply too many to handle – particularly for security-minded folks who want to limit the exposure of public-facing ports they let into their network. For example, when deploying an SSR behind a firewall and telling the owner of that firewall that you need to open up ports 16,385 through 65,533, you generally get an "oh really?" response.

For those that want to limit the range of waypoint ports, we allow you to configure your own range rather than adopt the default. This is configured within the [port-range](config_reference_guide.md#port-range) and [max-way-points](config_reference_guide.md#max-way-points) elements within a [neighborhood](config_reference_guide.md#neighborhood). As mentioned earlier, waypoint ports are allocated by the ingress router for its peer. The port range for the session originating router does not have a configurable range, only the port-range for the destination SSR router.

:::note
A quick reminder on how neighborhoods work: when setting values in a neighborhood on a router, it will affect how each router that peers with it builds their [adjacency](config_reference_guide.md#adjacency) to it. So when you restrict the set of ports in a router's neighborhood, each peer's adjacency will reflect that restriction; thus, when that router goes to build an SVR session to that peer over that adjacency, it will know the valid range of ports to choose from.
:::

Limiting this range will make your firewall team happy without putting too much of a crimp in your ability to SVR sessions. In fact, we have some customers that have limited their waypoint port allocation to only 10 ports on their head end routers! At face value this seems like it would severely restrict the number of unique, concurrent sessions that could be established by a peer, but in practice it doesn't. If a branch keeps its range to the default value of ports (49,151 ports), which can be sent to each of ten ports, you still wind up with a theoretical maximum of over 491,510 concurrent sessions *in each direction* to that branch over that adjacency.

:::note
When specifying [port-range](config_reference_guide.md#port-range), the even/odd rule for port selection no longer applies. Both local and remote ports selection will be continuous (round-robin).
:::

It is important to note that despite the configured [port-range](config_reference_guide.md#port-range), the SSR will at most use 50,000 of those ports by default. The configuration [max-way-points](config_reference_guide.md#max-way-points) allows the SSR software to scale respective to the platform and the administrator's needs. A `max-way-points` setting that is smaller than the number of sessions traversing a peer path will result in port exhaustion. A `max-way-points` setting that is too large will result in wasted system resources. Best practice is to tune both the `port-range` and `max-way-points` to a factor of 1.5x of the max number of sessions traversing a peer path.
