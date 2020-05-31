---
layout: post
title: "ArcSight - AnyConnect VPN Correlation Rules Pack - Pt. 2"
description: "VPN Correlation Rules Pack Part 2"
headline: "Successful VPN tracking is easy"
categories: 
- SIEM
- VPN Analytics
- ArcSight ESM
tags: "SIEM ArcSight ESM Correlation"
comments: true
featured: false
imagefeature: puzzle.jpg
published: true 
language: en
---

### AnyConnect VPN Correlation Rule Pack - Part 2.

OK. Lets proceed further. The part 2 of the write up will dig into the correlating more information. In my setup ASA is giving out the internal IP addresses to the successfully authenticated user based on the profile assigned to the username. 

What I will try to do is correlate three events to record source public IP, internal DMZ IP, NAS Port, user policy and user name.


Lets create filter **VPN Events - VPN AnyConnect parent session started** that would catch events with the _name_ = "AnyConnect parent session started" and match the filter **VPN Events - All VPN Event**.

![VPN AnyConnect parent session started](/images/vpnmon/Filter1Pt2.PNG "AnyConnect parent session started")

Another one will be **VPN Events - ACS Successful Authentication** and it would catch events with the _name_ = "Authentication succeeded" and _deviceAddress_ = IP Address of the ACS and match the filter **VPN Events - All VPN Event**.

![ACS Successful Authentication](/images/vpnmon/Filter2Pt2.PNG "Successful Authentication")

Inspect the events to understand how to correlate. 
* "AnyConnect parent session started" event has _destinationUserName_ as the user name and _destinationAddress_ as the public IP address.
* "RADIUS Accounting start request" event has _desitnationUserName_ as the user name, _sourceAddress_ as the internally assigned IP address and the _deviceCustomString2_ as the NAS port.
* "Authentication succeeded" event gives has _destinationUserName_ as the user name and the _deviceCustomString3_ as the policy name. 

With these filters set we are ready to start creating the correlation [standard rule](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898) **VPN Events - AnyConnect Session Established**.
For the conditions create three events called **ACSSession**, **AnyConnect** and **ACSAuth** matching filters as per table 

<center>
<table>
		<th>Event Name</th>
		<th>Filter Name</th>
	<tr>
		<td>ACSSession</td>
		<td>VPN Events - ACS Session Start</td>
	</tr>
	<tr>
		<td>AnyConnect</td>
		<td>VPN Events - VPN AnyConnect parent session started</td>
	</tr>
	<tr>
		<td>ACSAuth</td>
		<td>VPN Events - ACS Successful Authentication</td>
	</tr>
</table>
</center>

I set _Consume after match_ flag for all the events, because it prevents the rule from generating identical correlation events. 

Create Matching Event with matching time equal to 30 seconds where _ACSSession.Target User Name_ = _AnyConnect.Target User Name_ and _AnyConnect.Target User Name_ = _ACSAuth.Target User Name_.


![AnyConnect Session Established](/images/vpnmon/Rule1Filter1Pt2.PNG "AnyConnect Session Established")

Next we will create four local variables that would alias event fields.

<center>

<table>
			<th>Variable Name</th>
			<th>Eventr Field</th>
		<tr>
			<td>extAddress</td>
			<td>targetAddress</td>
		</tr>
		<tr>
			<td>intAddress</td>
			<td>attackerAddress</td>
		</tr>
		<tr>
			<td>profileName</td>
			<td>deviceCustomString3</td>
		</tr>
		<tr>
			<td>nasPort</td>
			<td>deviceCustomString2</td>
		</tr>
</table>

</center>

![AnyConnect Session Established Local Variables](/images/vpnmon/Rule1Variable1Pt2.PNG "AnyConnect Session Established Local Variables")

After variables creation we shall proceed to the aggregation and it should match 1 event per 30 seconds with identical fields _ACSSession.nasPort_, _ACSAuth.profileName_, _ACSSession.intAddress_, _ACSAuth.Target User Name_, AnyConnect.extAddress_

![AnyConnect Session Established Aggregation](/images/vpnmon/Rule1AggregationPt2.PNG "AnyConnect Session Established Aggregation")

Finally we need to assign some actions. I do it On Every Event and set the event fields as follows:

* _message_ = "AnyConnect Session Established"
* _categoryDeviceType_ = "VPN"
* _categoryBehaviour_ = "/Access/Start"
* _categoryDeviceGroup_ = "/VPN"
* _categoryObject_ = "/Host/Application/Service"
* _categoryOutcome_ = "/Success"
* _categorySignificance_ = "/Informational/Warning"
* _attackerAddress_ = $extAddress
* _deviceCustomString3_ = $profileName
* _deviceCustomString4_ = $nasPort
* destinationTranslatedAddress = $intAddress


Thats it. If everything goes well, after deploying the rule to the Real-Time processing it should start generating the event that would collect 3 base events and set the fields as configured above. 

###### Mentions
<small>Photo by Gabriel Crismariu on Unsplash</small>