---
layout: post
title: "Catching successful RDP conncetions"
description: "A rule to record the successful remote desktop connections"
headline: "Successful RDP connections are easy"
categories: 
- SIEM
- Windows
- Analytics
tags: "SIEM,ArcSight"
comments: true
featured: false
imagefeature: calculation.jpg
published: true 
language: en
---

### Intro
This post will kcik off the series about use cases that one might want to develop for their SIEM. I am not intending to write it for the big SOC teams, but rather for teams with limited resources who I hope will benefit from those.
My abosolute goto professional for answers and ideas about SIEM is Anton Chuvakin. That is why before starting any use case development I propose to fil in a simple table from [Detailed SIEM Use Case Example post done by him](https://blogs.gartner.com/anton-chuvakin/2013/09/24/detailed-siem-use-case-example/)

### What to track

We are going to develop the use case to catch successful RDP connections. I will use ArcSight, however, general ideas are applicable to any SIEM that is out there. 

### Events that matter

When I started thinking about creating a rule I naturally googled for the events that I need to track successful connections RDP. 
First and probably most interesting post I came across was this [post](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/) by a guy called Jonathon Poling. Second resource is very well known and excellent paper developed by the Japan CERT to [detect lateral movement](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)

To detect the successful connection I have decided to concetrate on catching Event IDs 21, 22 and 25 that are recorded under the "Microsoft\Windows\TerminalServices-LocalSessionManager\Operational". These events show successful logon after the successful authentication to the OS.

* Event 21 shows successful logon
* Event 22 shows sussessful logon and start of the shell (Win GUI). This and previous event register upon a new connection.
* Event 25 shows successful logon and session reconnection. This event appear in case user did not formally log off previous session, but rather simply disconnected from it by closig the window or choosing Disconnect.  

It is recommended to correlate those events with [Event ID 4624](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4624) and type logons 7 or 10. However I have chosen not to do this for the simple reason. If your servers are [configured](https://www.darkoperator.com/blog/2012/3/17/configuring-network-level-authentication-for-rdp.html) for the Network Layer Authentication, Event ID 4626 will have type logon 3, which are too common to keep track of.

### Rule authoring 



### Links

* [Nice post about Windows RDP-related events](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/)<br>
* [Detecting lateral movement through tranking event logs by JPCERT](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)
* [RDP Session disconnect reason codes](https://docs.microsoft.com/en-us/windows/desktop/TermServ/extendeddisconnectreasoncode)<br>
* [Detailed SIEM Use Case Example](https://blogs.gartner.com/anton-chuvakin/2013/09/24/detailed-siem-use-case-example/)
* [Configuring Network Level Authentication for RDP](https://www.darkoperator.com/blog/2012/3/17/configuring-network-level-authentication-for-rdp.html)

###### Mentions
<small>Feature photo is by the Spanish photograper Jorge Pérez Higuera. </small>
