---
layout: post
title: "ArcSight - AnyConnect VPN Correlation Rules Pack - Pt. 1"
description: "VPN Correlation Rules Pack Part 1"
headline: "Successful RDP connections are easy"
categories: 
- SIEM
- VPN Analytics
- ArcSight ESM
tags: "SIEM,ArcSight,ESM,VPN Correlation"
comments: true
featured: false
imagefeature: teaching.jpg
published: true 
language: en
---

### AnyConnect VPN Correlation Rule Pack - Part 1.

I have been away from this blog for some time now, which I was spending learning ArcSight besides other stuff. So I decided to kick off this year with the post that I hope will create series of ArcSight related write ups. Below is the part 1 of my effort in creation content for ArcSight ESM to track VPN activity. Please note this correlation pack based on the events collected from the Cisco ASA and Cisco ACS. Couple of points:
*In my example Cisco ASA autheticates user via ACS. 
*All the events from Cisco ASA and Cisco ACS are being sent via syslog to one connector for simplicity of the example and this particular connector does not receive other syslog events not related to the VPN infrastructure.

### Lets start


I prefer to work with the filters because IMO they provide easier ways to control the data input. 


Create a filter **VPN Events - All VPN Events** that would capture absolutely all the events from the connector and it is simple _agentId_ field value.

![All VPN Events Configuration](/images/Filter1.PNG "VPN All Events Filter")

Now since our session is being authenticated and verified by the ACS serving as RADIUS server we should know that according to [RFC2866](https://tools.ietf.org/html/rfc2866):
>Each service provided by the NAS to a dial-in user constitutes a session, with the beginning of the session defined as the point where 
>service is first provided and the end of the session defined as the point where service is ended.  A user may have multiple sessions
>in parallel or series if the NAS supports that, with each session generating a separate start and stop accounting record with
>its own Acct-Session-Id.

Based on the explanation above we should look for the events that would indicate to us the beginning and the end of the sessions.
Create a filter **VPN Events - ACS Session Start** that would capture event with the _name_ = "RADIUS Accounting start request" and matches the filter created for all the events sent to the connector and _deviceAddress_ = IP address of the ACS server.

![ACS Session Start](/images/Filter2.PNG "ACS Session Start")

Create another filter **VPN Events - ACS Session Stop** similar to the previous one but capturing events with the _name_ = "RADIUS Accounting start request".

![ACS Session Stop](/images/Filter3.PNG "ACS Session Stop")

Next step will be creation of two [lightweight rules](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898). Those will update an active list to keep track of the active VPN sessions. We need 3 attributes from those session start events to be written to the **VPN Active Session** active list:

<center>
ESM Event Field | Active List Field Name | Field Type | Key-Field
----------- | ----------------- | ---------- | ---------
_deviceCustomString2_ | NAS Port | String | Y
_sourceAddress | Source IP Address | IP Address | N
_destinationUserName | User Name | String | N
</center>

NAS Port is somewhat unique value, so it can be used as a key field.

![Active VPN Session List](/images/ActiveList1.PNG "Active VPN Session List Settings")

Time To Live can be defined based on your needs, but it should be aligned with your VPN connection length policy.

The first rule **VPN Events - ASC Session Start** simply matches filter **VPN Events - ACS Session Start** and has action to write the above fields to the Active List **VPN Active Session**

![Rule Session Start](/images/Rule1Filter.PNG "Rule Session Start")
![Rule Session Start Action](/images/Rule1Action1.PNG "Rule Session Start Action") 

The second rule **VPN Events - ASC Session Stop** obviously matches filter **VPN Events - ACS Session Stop** and has action to delete the above fields from the Active List **VPN Active Session**

![Rule Session Stop](/images/Rule2Filter.PNG "Rule Session Stop")
![Rule Session Stop Action](/images/Rule2Action1.PNG "Rule Session Stop Action") 

The above creates the basis for us to proceed further with our pack. 

### Some thoughts

I have noticed that sometimes events from ACS would miss _destinationUserName_ for similar type of events. I am not a Cisco expert, so I could not find reasonable explanation as to why that happens. What I have noticed as well is that such events usually have _sourceUserName_ field and in my setup soure and destination user names are equal. I did a little workaround and created a [pre-persitence rule](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898). 

First create a **VPN Events - ACS Successful Authentication** filter that would catch ACS events with _name_= "Authentication succeeded".

![ACS Successful Authentication](/images/Filter4.PNG "ACS Successful authentication")

Next create the **VPN Events - ACS Authentication Enrichment** pre-persistence rule that would enrich such events. It would match the filter created earlier. I also create the variable _User_ to create alias from _sourceUserName_ event field and finally assign action on every event to set event field _targetUserName_ with _$User_ variable.

![Rule ACS Authentication Filter](/images/Rule3Filter.PNG "Rule ACS Authentication Filter")

![Rule ACS Authentication local variable](/images/Rule3Variable1.PNG "Rule ACS Authentication local variable")

![Rule ACS Authentication Action](/images/Rule3Action1.PNG "Rule ACS Authentication Action")

###### Mentions
<small>Feature photo is by the Spanish photographer Jorge Pérez Higuera. </small>
