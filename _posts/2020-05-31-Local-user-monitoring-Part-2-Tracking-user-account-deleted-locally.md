---
layout: post
title: "Monitoring local Windows users - Pt. 2 - Tracking deleted user accounts"
description: "Tracking user accounts deleted locally"
headline: "Local user management"
categories: 
- SIEM
- Windows
- ArcSight ESM
- Operations
- Local users
tags: "SIEM ArcSight User_Management Monitoring"
featured: false
imagefeature: puzzle.jpg
published: true 
language: en
---

#### Intro

So now that have means to [track creation of the new user accounts](http://www.ashsecurity.com/siem/windows/arcsight%20esm/operations/local%20users/Local-user-monitoring-Part-1-Tracking-user-account-created-locally) on our endpoints we are going to create use case tracking deletion of the local user accounts. 

This use case is quite similar to the tracking of the user accounts creation, so much of the activities should be familiar to you after going through the first case. 

#### ISO 27001 Controls Supported

<center>

<table>

	<th colspan="2">A.9.2 User Access Management</th>

	<tr>

		<td>A.9.2.1</td>

		<td>User registration and de-registration</td>

	</tr>

</table>

</center>



#### Base Filters



We need to create two base filters. 

> Make sure that you add correct names of your Domain Controllers in the filter as fields _targetHostName_ != domain controller host name. 

The first one is called **Windows Events - Local user account deleted**, to catch Event ID [#4726](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4726), showing account deletion.  This Event ID will give us reference of the user name. 



Summary of the filter below:

```
event1 :  ( 
Agent Type = winc
AND
Type != Correlation
AND
Category Behavior = /Authentication/Delete
AND
Category Object StartsWith /Host
AND
Category Outcome = /Success
AND
Device Product = Microsoft Windows
AND
Target Host Name != [domain controller Host Name]
AND
External ID = 4726
AND
Attacker User Name Is NOT NULL
AND
Attacker User Name NOT EndsWith $
AND
Attacker User Name != SYSTEM
AND
Attacker User Name NOT StartsWith NT AUTHORITY
AND
Attacker User Name != ANONYMOUS LOGON
AND
Attacker User Name != NETWORK SERVICE
AND
Target User Name NOT EndsWith $
AND
Target User Name Is NOT NULL
AND
Target User Name != SYSTEM
AND
Target User Name NOT StartsWith NT AUTHORITY
AND
Target User Name != ANONYMOUS LOGON
AND
Target User Name != NETWORK SERVICE
)      

```

![Local User Deleted Filter 1 Conditions](/images/lclusrdel/asLUDeleteFilter1Conditions.PNG "Local User Deleted Filter 1 Conditions")


The second base filter, called **Windows Events - Local user account removed from local group**, catches is [#4733](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4733), dealing with removal of the users from the local security groups. This Event ID will give us reference of the user SID.


Summary of the filter below:

```

event1 :  ( 
Agent Type = winc
AND
Type != Correlation
AND
Category Behavior = /Authorization/Delete
AND
Category Object StartsWith /Host
AND
Category Outcome = /Success
AND
Device Product = Microsoft Windows
AND
Target Host Name != [Domain Contoller Host Name]
AND
External ID = 4733
AND
Attacker User Name Is NOT NULL
AND
Attacker User Name NOT EndsWith $
AND
Attacker User Name != SYSTEM
AND
Attacker User Name NOT StartsWith NT AUTHORITY
AND
Attacker User Name != ANONYMOUS LOGON
AND
Attacker User Name != NETWORK SERVICE
AND
Target User Name NOT EndsWith $
AND
Target User Name Is NOT NULL
AND
Target User Name != SYSTEM
AND
Target User Name NOT StartsWith NT AUTHORITY
AND
Target User Name != ANONYMOUS LOGON
AND
Target User Name != NETWORK SERVICE
)   
```

![Local User Removed from the Group Filter 1 Conditions](/images/lclusrdel/asLUGroupRemovedFilter1Conditions.PNG "Local User Removed from the Group Filter 1 Conditions")

#### Correlation rule authoring

With our two base filters ready, let's start authoring the correlation rule based on the events caught by them. The rule is called **Windows Events - Local User Account Deleted Manually**. This is again a [standard rule](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898). 

This time I have created two named Event Definitions, called: **account_deleted** and **removed_from_group**. These event definitions have condition to match the filter respectively: **Windows Events - Local user account deleted** and **Windows Events - Local user account removed from local group**. 

Next we create Matching Event that matches all (_AND_ operator) of the following Joint Conditions within 5 second (remeber that this time frame should be based on your environment performance):

<center>

<table>

		<th>Left Field</th>

		<th>Operator</th>

		<th>Right Field</th>

	<tr>

		<td>removed_from_group.Attacker User Name</td>

		<td>=</td>

		<td>account_deleted.Attacker User Name</td>

	</tr>

	<tr>

		<td>removed_from_group.Device Address</td>

		<td>=</td>

		<td>account_deleted.Device Address</td>


	</tr>

</table>

</center>



Summary of the rule conditions looks like this:



```
Matching Event (Matching within 5s):  ( 
removed_from_group.Attacker User Name = account_deleted.Attacker User Name
AND
removed_from_group.Device Address = account_deleted.Device Address
)   account_deleted :  
MatchesFilter("Windows Events - Local user account deleted")
  removed_from_group :  
MatchesFilter("Windows Events - Local user account removed from local group")
```

![Local User Deleted from the Group Rule 1 Conditions](/images/lclusrdel/asLUDeleteRule1Conditions.PNG "Local User Deleted from the Group Rule 1 Conditions")

We should also define local variables. The first one is the alias to the _Target User Name_, called **sid**, the second is the string function ToLower for the _Target User Name_, called **usertolower**, the final one is the alias to the _Target Address_, called **hostaddress**.

We will user these local variables to send the notifications over email and specific local user accounts based on their SIDs from the list, that we created earlier in the first part. 

![Local User Deleted from the Group Rule 1 Local Variables](/images/lclusrdel/asLUDeleteRule1LocalVariables.PNG "Local User Deleted from the Group Rule 1 Local Variables")

Proceed to the Aggregation tab and define aggregation conditions as follows:

```
Aggregate if at least 1 matching conditions are found within 5 Seconds AND 
these event fields are the same (removed_from_group.Target Zone Resource, 
removed_from_group.Target User Name, removed_from_group.Attacker Zone Resource, 
removed_from_group.sid, account_deleted.Target Nt Domain, account_deleted.Attacker User Name, 
removed_from_group.Attacker Host Name, removed_from_group.Target Host Name, 
account_deleted.Device Address, removed_from_group.Device Address, account_deleted.Device Zone Resource, 
account_deleted.usertolower, removed_from_group.Target Address, account_deleted.Target Zone Resource, 
removed_from_group.Device Zone Resource, account_deleted.Target User Name, account_deleted.Target Address, 
account_deleted.Target Host Name, removed_from_group.hostaddress)
```

Finally we can move on to the rule Actions tab. I use **On every event** to set the fields as **fileId**=*$sid* and **flexString1**=*localuserdeleted*, as well as send notification with required acknowledgment to the group we have defined in the Notifications menu. In my case the group is related to the SOC and its first level destination is the email address. So we define rule action as **Send Notification**, select proper group we want this notification to be sent to and set the _Notification Message_ as `Local user [$usertolower] has been deleted on the [$hostaddress]`, make sure to uncheck _Ack Required_ tickbox. 

I also define **Remove From Active List** action on every event as follows:

<center>

<table>

	<th>ESM Event Field / Local Variable</th>

	<th>Active List Field Name</th>


	<tr>

		<td>SID</td>

		<td>sid</td>

	</tr>

	<tr>

		<td>User Name</td>

		<td>usertolower</td>
	</tr>

</table>

</center>

This helps cleaning up the active list that we have created in the part 1 of these use cases scenarios.

![Local User Removed From the Group Rule 1 Actions](/images/lclusrdel/asLUDeleteRule1Actions.PNG "Local User Removed From the Group Rule 1 Actions")


After finishing with the rule actions we can save the changes. If you receive warning about adding additional fields to the Aggregation conditions, press No and proceed with the saving. 

![Local User Removed From the Group Rule 1 Saving Warning](/images/lclusrdel/asLUDeleteRuleSaveWarning.PNG "Local User Removed From the Group Rule 1 Saving Warning")

Test the rule and deploy it for the real-time processing. We are done with the second use case.

###### Mentions
<small>Photo by Gabriel Crismariu on Unsplash</small>
