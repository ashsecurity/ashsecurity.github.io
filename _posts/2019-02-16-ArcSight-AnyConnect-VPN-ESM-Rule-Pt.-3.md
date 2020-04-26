---
layout: post
title: "ArcSight - AnyConnect VPN Correlation Rules Pack - Pt.3"
description: "VPN Correlation Rules Pack Part 3"
headline: "Successful VPN tracking is easy"
categories: 
- SIEM
- VPN Analytics
- ArcSight ESM
tags: "SIEM ArcSight ESM Correlation"
comments: true
featured: false
imagefeature: teaching.jpg
published: true 
language: en
---

### AnyConnect VPN Correlation Rule Pack - Part 3.

OK. So far we were trying to set rules and correlate proper evetns. This final part of the VPN rule pack will deal with the dashboard and some reporting.

One of the most important steps in content development reserved for presenting the information that makes sense to your evironment. My dashboard will be quite simple, it will show active VPN sessions and count of the successful VPN connections per hour for the last 24 hours. 

Additionally I will configure two reports showing daily successful connections from public IPs and IPs accessed internally from the VPN addresses.

Lets begin with the dashboard. 

#### Connections over the last 24 hours.

To calculate number of connections I have decided to use [Session lists](https://community.softwaregrp.com/t5/ArcSight-User-Discussions/Active-list-and-Session-List/td-p/1523954). So lets create the **VPN Events - VPN Session** list. The session list is _key and case-insensitive_ and has 3 fields defined:

<center>

<table>
		<th>Field Name</th>
		<th>Field Type</th>
		<th>Key-Field</th>
	<tr>
		<td>NAS Port</td>
		<td>String</td>
		<td>Y</td>
	</tr>
	<tr>
		<td>Source IP Address</td>
		<td>IP Address</td>
		<td>N</td>
	</tr>
	<tr>
		<td>User Name</td>
		<td>String</td>
		<td>N</td>
	</tr>
</table>

</center>

![Session List](/images/vpnmon/VPN3SessionList1.PNG "VPN Session")

Ok. This session list will give us a view of the session start and end time as well as a chance to calculate session length, which I think is a useful thing to see, especially if your policy specifies this length.

Now, we will reuse some rules that [were created earlier](http://www.ashsecurity.com/siem/vpn%20analytics/arcsight%20esm/ArcSight-AnyConnect-VPN-ESM-Rule): **VPN Events - ASC Session Start** and **VPN Events - ASC Session Stop**. The first one will add to the session list and the former will terminate the session.

![Rule Session Start Action](/images/vpnmon/VPN3Rule1Action1.PNG "Rule Session Start Action")

![Rule Session Stop Action](/images/vpnmon/VPN3Rule2Action2.PNG "Rule Session Stop Action") 

Next, we are going to create a query **VPN Events - Connection Counts Last Hour**. It will work on the session list that we have create and look for the count of records for 1 hour without any specific conditions.

![Query 1 General](/images/vpnmon/VPN3Query1_1.PNG "Query 1 General")

![Query 1 Fields](/images/vpnmon/VPN3Query1_2.PNG "Query 1 Fields")

As you can see, I make simple count of the NAS Port field of the session list. The reason is because I am sure that it is unique.

Based on the above query we define [trend](https://community.softwaregrp.com/t5/ESM-and-ESM-Express-Previous/ESM-Best-Practices-Trends/ta-p/1584002) **VPN Events - Hourly Connection Count**. This trend will collect data from the query every hour.

![Trend 1 General](/images/vpnmon/VPN3Trend1_1.PNG "Trend 1 General")

![Trend 1 Parameters](/images/vpnmon/VPN3Trend1_2.PNG "Trend 1 Parameters")

This trend will allow us collect number of connections for each hour and we will be able to create another query **VPN Events - Hourly Connection Trend** that is simply extracting this data from the trend. 

![Query 2 General](/images/vpnmon/VPN3Query2_1.PNG "Query 2 General")

![Query 2 Fields](/images/vpnmon/VPN3Query2_2.PNG "Query 2 Fields")

Next, create the query viewer called **VPN Events - Connections Last 24 Hours by Hour** that uses the **VPN Events - Hourly Connection Trend** query and starts with _Now - 26 hours_ and ends with _Now_ parameters.

![Query Viewer 1 General](/images/vpnmon/VPN3QueryView1_1.PNG "Query View 1 General")

![Query Viewer 1 Fields](/images/vpnmon/VPN3QueryView1_2.PNG "Query View 1 Fields")

Finally we right click the query viewer that was created, select _Add to Dashboard As_, and _Bar Chart_. Choose _TimeStamp_ as the **X Axis**, _Count(Nas Port)_ as the **Y Axis** and you are done. Do not forget to save the newly created dashboard. 

#### Active VPN Connections 

The second piece of the dashboard is less complex and will reuse the same session list. 

Let's create the **VPN Events - Active Sessions Length** query that again works on the session list **VPN Events - VPN Session**, but this time it will extract _Source IP Address_, _Start Time_, _End Time_, and two variables _sessionLength_ and _userNametoLower_. Because we want to see only active session, we must specify in the conditions that _End Time_ should be NULL.

![Query 3 General](/images/vpnmon/VPN3Query3_1.PNG "Query 3 General")

![Query 3 Fields](/images/vpnmon/VPN3Query3_2.PNG "Query 3 Fields")

![Query 3 Conditions](/images/vpnmon/VPN3Query3_3.PNG "Query 3 Conditions")

_sessionLength_ variable works like this. We create _currentTime_ variable that uses **GetCurrentTime** function under the _Timestamp_ section. Next _sessionLength_ variable is **TimeDifference** function under the same _Timestamp_ section and it compares _currentTime_ variable with _startTime_ list field.

![Query 3 Variable 1](/images/vpnmon/VPN3Query3Variable1.PNG "Query 3 Variable 1")


_userNametoLower_ variable is a string **ToLower** function that works on the _User Name_ list field.

![Query 3 Variables](/images/vpnmon/VPN3Query3_4.PNG "Query 3 Variables")

Next, create the query viewer called **VPN Events - Active VPN Sessions** that uses **VPN Events - Active Sessions Length**. I defined refresh rate at 1 minute, because I would like to get updates on this piece of the dashboard as quickly as possible. 

![Query Viewer 2 General](/images/vpnmon/VPN3QueryView2_1.PNG "Query View 2 General")

![Query Viewer 2 Fields](/images/vpnmon/VPN3QueryView2_2.PNG "Query View 2 Fields")

This query viewer we add to the dashboard created earlier as the table and save the dashboard. This concludes work with the VPN dashboard. 

Next we move onto the reports. 

#### Report of the daily successful connections.

This report will show us the successful connections from the public IPs and map them to the internally assigned VPN address.

Lets begin with creation of the **VPN Events - AnyConnect Session Established** filter. This filter shows correlation events generated by the rule that we have created earlier **VPN Events - AnyConnect Session Established** with _deviceEventClassId_=[rule:101](https://community.softwaregrp.com/dcvta86296/attachments/dcvta86296/arcsight-discussions/29098/2/ArcSight%20Specific%20Device%20Event%20Class%20IDs.pdf). I prefer to specify events generated by the rule with the _generatorId_ field where value is the Resource ID of the rule (find it in the Attributes tab of the rule)

![Filter 1 Conditions](/images/vpnmon/VPN3Filter1.PNG "Filter 1 Conditions")

We continue by creating the query called **VPN Events - AnyConnect Daily Successful Connections** that queries the events generated 1 day before based on the filter we did create for the fields:

* _End Time_
* _Target User Name_
* _Target Translated Address_
* _Attacker Address_
* _Device Custom String 3_
* _Device Custom String 4_
* _Attacker Geo Country Code_

![Query 4 General](/images/vpnmon/VPN3Query4_1.PNG "Query 4 General")

![Query 4 Fields](/images/vpnmon/VPN3Query4_2.PNG "Query 4 Fields")

![Query 4 Conditions](/images/vpnmon/VPN3Query4_3.PNG "Query 4 Conditions")

We have everything to create our first report **VPN Events - AnyConnect Daily Successful Connections**. I use _Chart and Table Portrait_ template. For the table I use **VPN Events - AnyConnect Daily Successful Connections** query that we was created earlier. 

![Report 1 Table Fields](/images/vpnmon/VPN3Report1_1.PNG "Report 1 Table Fields")

For the chart I reuse the **VPN Events - Hourly Connection Trend** query. _Timestamp_ is used for the **X Axis** and _Count(NAS Port)_ for the **Y Axis**. I also uncheck **Show Legend** check box under the Display Options tab.

Define report format (I suggest XLS or PDF) and email addresses. Create the Job to run the report on the daily basis. Done, the first report is ready. Use Preview option to test it. 


#### Report of the internally accessed addresses.

This report will show internally accessed addresses and map them to the internally assigned VPN addresses. This report shall be more complex than the previous one.
Create a filter called **VPN Events - Addresses Accessed Internally** that would match **VPN Events - All VPN Events** [created earlier](http://www.ashsecurity.com/siem/vpn%20analytics/arcsight%20esm/ArcSight-AnyConnect-VPN-ESM-Rule) and has _sourceAddress_ is NOT NULL, _categoryOutcome_ =/Success, _categoryBehavior_ containing /Access and other conditions. 

![Filter 2 Conditions](/images/vpnmon/VPN3Filter2.PNG "Filter 2 Conditions")

Create Active List **VPN Accessed Addresses** with the following fields:

<center>

<table>
		<th>Active List Field Name</th>
		<th>Field Type</th>
		<th>Key-Field</th>
	<tr>
		<td>Access Time</td>
		<td>Date</td>
		<td>Y</td>
	</tr>
	<tr>
		<td>Source IP Address</td>
		<td>IP Address</td>
		<td>N</td>
	</tr>
	<tr>
		<td>Source Port</td>
		<td>Integer</td>
		<td>N</td>
	</tr>
	<tr>
		<td>Destination IP Address</td>
		<td>IP Address</td>
		<td>N</td>
	</tr>
	<tr>
		<td>Destination Port</td>
		<td>Integer</td>
		<td>N</td>
	</tr>
</table>

</center>

![Active List](/images/vpnmon/VPN3ActiveList1.PNG "Active List")

I have TTL Days limited to 1, because I do not want to track information longer than 1 day and prefer to save memory. 
This active list will feed information to our report via two different queries. 

This active list will be updated by the [lightweight rule](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898) **VPN Events - Addresses Accessed Internally**. Its conditions will match filter that we created. 

![Rule Accessed Addresses Conditions](/images/vpnmon/VPN3Rule4Condition.PNG "Rule Accessed Addresses Conditions")

Rule action will update active list **VPN Accessed Addresses**.

<center>

<table>
		<th>ESM Event Field</th>
		<th>Active List Field Name</th>
	<tr>
		<td>_endTime_ </td>
		<td>Access Time</td>
	</tr>
	<tr>
		<td>_sourceAddress_</td>
		<td>Source Address</td>
	</tr>
	<tr>
		<td>_sourcePort_</td>
		<td>Source Port</td>
	</tr>
	<tr>
		<td>_destinationAddress_</td>
		<td>Destination Address</td>
	</tr>
	<tr>
		<td>_destinationPort_</td>
		<td>destination Port</td>
	</tr>

</table>

</center>

![Rule Accessed Addresses Action](/images/vpnmon/VPN3Rule4Action1.PNG "Rule Accessed Addresses Action")

We proceed by creating a query called **VPN Events - Daily top 10 internally accessed addresses**. This query will collect data from the active list that we just created and show us top 10 addresses that are accessed for the previous day. Query is very simple it collects Destination Address from the list and sum of each Count field. I have grouped it by the Destination Address and ordered by the sum of the counts. 

![Query 5 General](/images/vpnmon/VPN3Query5_1.PNG "Query 5 General")

![Query 5 Fields](/images/vpnmon/VPN3Query5_2.PNG "Query 6 Fields")

For the second report we need another query **VPN Events -  Internally Accessed Addresses**  from the same active list that will actually present all the internal addresses and ports accessed, so we need to select _destinationAddress_, _destinationPort_, _sourceAddress_ fields and make count of the _sourceAddress_ fields. This time I group data by the _sourceAddress_, _destinationAddress_, _destinationPort_.

![Query 6 General](/images/vpnmon/VPN3Query6_1.PNG "Query 6 General")

![Query 6 Fields](/images/vpnmon/VPN3Query6_2.PNG "Query 6 Fields")

Now both queries are ready for the report **VPN Events - Daily Internally Accessed Addresses**, I will again use _Chart and Table Portrait_ template. For the table I use **VPN Events -  Internally Accessed Addresses** query that we was created earlier and for the chart **VPN Events - Daily top 10 internally accessed addresses** query.

Table definition is pretty straight forward. I group data by _sourceAddress_ and sort from the highest to the lowest by Count(_sourceAddress_)

![Report 2 Table Fields](/images/vpnmon/VPN3Report2_1.PNG "Report 2 Table Fields")

Chart will use _destinationAddress_ for the **X Axis** and _Sum(Count)_ for the **Y Axis**

Again define report format (I suggest XLS) and email addresses.Yo need to create again the Job to run the report on the daily basis. Do not forget to use preview to test it before defining the Job.

That is. The VPN monitoring content pack is done. That shold be enough to kickstart your VPN monitoring efforts and provide basis to work out further content. 

Here is the overall graph view of all the components developed in these three parts.

[![](/images/vpnmon/VPN3ContentGraph.PNG)](/images/vpnmon/VPN3ContentGraph.PNG)



