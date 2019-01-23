---
layout: post
title: "Catching successful RDP connections"
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
This post will kick off the series about use cases that one might want to develop in HP ArcSight SIEM. I am not intending to write it for the big SOC teams, but rather for teams with limited resources who I hope will benefit from this write up.

My absolute goto professional for answers and ideas about SIEM is Anton Chuvakin, so before starting any use case development I start with the simple table from [Detailed SIEM Use Case Example blog post](https://blogs.gartner.com/anton-chuvakin/2013/09/24/detailed-siem-use-case-example/)

### What to track
We are going to develop the use case to catch successful RDP connections. I will use ArcSight, however, general ideas are applicable to any SIEM that is out there. 

### Events that matter

When I started thinking about creating a rule I naturally googled for the events that I need in order to track the successful connections RDP. 
First and probably most interesting info I came across was in this [post](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/) by a guy called Jonathon Poling. Second resource is well known and excellent paper developed by the Japan CERT to [detect lateral movement](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)

To detect the successful RDP connection I have decided to concentrate on catching Event IDs 21, 22 and 25 that are recorded under the "Microsoft\Windows\TerminalServices-LocalSessionManager\Operational". These events show successful logon after the successful authentication to the OS.

* Event 21 shows successful logon
* Event 22 shows successful logon and start of the shell (Win GUI). This and previous event register upon a new connection.
* Event 25 shows successful logon and session reconnection. This event appear in case user did not formally log off previous session, but rather simply disconnected from it by closing the window or choosing Disconnect.  

It is recommended to correlate those events with [Event ID 4624](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4624) and Type Logons 7 or 10. However I have chosen not to do this for one simple reason. If your servers are [configured](https://www.darkoperator.com/blog/2012/3/17/configuring-network-level-authentication-for-rdp.html) for the Network Layer Authentication, Event ID 4624 will have Type Logon 3 and those are too common to keep track of.

### Rule authoring 



### Operational Process Thoughts

After verifying that my rule works fine and report provides correct information I had to decide on the operation


### Links

* [Nice post about Windows RDP-related events](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/)<br>
* [Detecting lateral movement through tracking event logs by JPCERT](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)
* [RDP Session disconnect reason codes](https://docs.microsoft.com/en-us/windows/desktop/TermServ/extendeddisconnectreasoncode)<br>
* [RDP Session disconnect reason codes](https://docs.microsoft.com/en-us/windows/desktop/TermServ/extendeddisconnectreasoncode)
* [Detailed SIEM Use Case Example](https://blogs.gartner.com/anton-chuvakin/2013/09/24/detailed-siem-use-case-example/)

###### Mentions
<small>Feature photo is by the Spanish photographer Jorge Pérez Higuera. </small>
