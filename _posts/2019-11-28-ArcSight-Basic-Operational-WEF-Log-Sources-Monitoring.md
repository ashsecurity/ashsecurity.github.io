---
layout: post
title: "Operational monitoring of WEF Log sources in ArcSight"
description: "How to monitor and sources sending logs over WEF in ArcSight ESM"
headline: "Basic Operational WEF Monitoring"
categories: 
- SIEM
- Windows
- ArcSight ESM
- Operations
- WEF
tags: "SIEM ArcSight WEF Monitoring"
comments: true
featured: false
imagefeature: calculation.jpg
published: true 
language: en
---

### Intro

We know that monitoring user endpoints is a big deal and sort of problematic. I think most would agree that the easiest and **cheapest** way right now to monitor Windows endpoints is via [Windows Event Forwarding or (WEF)](https://github.com/nsacyber/Event-Forwarding-Guidance) . 

If you are unfamiliar with the technology, I recommend reading the following:

* [Windows event forwarding for network defense](https://medium.com/palantir/windows-event-forwarding-for-network-defense-cb208d5ff86f)
* [Spotting the adversary with Windows Event Logging](https://apps.nsa.gov/iaarchive/library/reports/spotting-the-adversary-with-windows-event-log-monitoring.cfm)
* [ArcSight Collecting Widnows Events Logs](https://community.softwaregrp.com/dcvta86296/attachments/dcvta86296/BestPractices/57/1/Micro_Focus_ArcSight_Collecting_Windows_Event_Logs.pdf)

Setting up the technology is sort of straight forward process. Yet, after using it for some time, you will try to find a way to monitor your whole setup more closely. It is always useful to know, how many endpoints are sending events, are there active endpoints, that do not send events and etc. Unfortunatelly ArcSight's Management Center to monitor WEF sources is not enough. That is why I have decided to build my own basic operational dashboard to enable WEF monitoring. 

This dashboard shows me information about endpoints that do not send events for several days, number of WEF log sources sending events per hour, total number of events per hour and event throughput. 

Below are the steps to build the same in your ArcSight Environment. 

#### Counting WEF log sources per hour

We begin with the interesting task - counting the number of log sources per hour, something ArcSight, as far as I know, cannot do with a standard data monitor. 

As usual, I like to start with the common filter. I called it **Windows Events - WEF Log sources count** and its conditions specify **deviceVendor**=_Microsoft_ and **agentId**=_Name of the Connector_. This filter will play important role for our dashboard.

![WEF Log Sources Filter Conditions](/images/wefmon/asWEFFilterConditions1.png "WEF Log Sources Filter Conditions")

Next we should create a query that extracts and calculates count of event sources, based on their IP address (although you may also use hostname as the count basis), for one hour. Let's call it **Windows Events - WEF Log Sources**, it should work on events with **startTime** set to _"$Now-1h"_ and **endTime** to _"$Now"_. 

![WEF Log Sources Query General](/images/wefmon/asWEFQuery1General.png "WEF Log Sources Query General")

Its conditions match our **Windows Events - WEF Log sources count** filter. 

![WEF Log Sources Query Conditions](/images/wefmon/asWEFQuery1Conditions.png "WEF Log Sources Query Conditions")

We extract **deviceAddress** from the event and apply _Count_ function with _Unique_ to it. 

![WEF Log Sources Query Fields](/images/wefmon/asWEFQuery1Fields.png "WEF Log Sources Query Fields")

After creating the query we procced to creation of the [trend](https://community.microfocus.com/t5/ESM-and-ESM-Express/Micro-Focus-Security-ArcSight-ESM-Best-Practices-Trends/ta-p/1660994). This trend will help us track changes in number of the endpoints sending events every hour. I called it **Windows Events - WEF Log Soures Count**, its **Trend Interval** equals 1 hour and rest is left as default.

![WEF Log Sources Count Trend Attributes](/images/wefmon/asWEFTrend1Attrib.png "WEF Log Sources Count Trend Attributes")

Trend is scheduled to run every 1 hour with no End Date.

I have changed trend's parameters **startTime** to _"$Now-1h"_ and left the rest as default settings.

![WEF Log Sources Count Trend Parameters](/images/wefmon/asWEFTrend1Parameters.png "WEF Log Sources Count Trend Parameters")

In order to extract data from the trend we create another query, which I have called **Windows Events - Hourly WEF Log Sources trend**. We need data for the last 12 hours, so **startTime** equals to _"$Now-13h"_ and **endTime** to _"$Now"_, **row limit** set to 15. 

![WEF Log Sources Count Query General](/images/wefmon/asWEFQuery2General.png "WEF Log Sources Count Query General")

We need both **Count(Distinct Device Address)** and **TimeStamp** fields from the trend. 

![WEF Log Sources Count Query Fields](/images/wefmon/asWEFQuery2Fields.png "WEF Log Sources Count Query Fields")

To visualize the results let's create a query viewer, that shows us data based on the last query results. I called the Query Viewer - **Windows Events - Hourly WEF Log Sources Trend**, it refreshes every hour (cause it does not make sense to refresh it at quicker periods) and the parameters are left as default. 

![Windows Events - Hourly WEF Log Sources Trend Attributes](/images/wefmon/asWEFQueryViewer1Attrib.png "Windows Events - Hourly WEF Log Sources Trend Attributes")

I renamed **Count(Distinct Device Address)** column to **Log Sources Count** and left **TimeStamp** as it is.

![Windows Events - Hourly WEF Log Sources Trend Fields](/images/wefmon/asWEFQueryViewer1Fields.png "Windows Events - Hourly WEF Log Sources Trend Fields")

This Query Viewer will be used in our dashboard to show how many endpoints are sending events per hour. 

#### Calculating WEF Event throughput and total hourly count of WEF events

To monitor WEF events and its trends I find it neccessary to know how many events are being collected at every hour as well as its average throughput. This can be achieved with standard ArcSight data monitors.

The first data monitor called **WEF Events Hourly**. It is _Hourly Counts_ type. Simply define our base **Windows Events - WEF Log sources count** filter in the **Restrict by Filter** field, set **Availability Interval** to _300 seconds_, and enable it. 

![WEF Events hourly Data Monitor Attributes](/images/wefmon/asWEFDataMonitor1Attributes.png "WEF Events hourly Data Monitor Attributes")

Next, create another data monitor, call it **WEF Event Throughput** as _Moving Average_ type. Set **Restricted by Filter** to the **Windows Events - WEF Log sources count** filter, **Value Calculation** to _Average value per minute_. **Group By** field should be empty and **Sort By** set to _Field Values_. Leave **Alarm Change Threashold(%)** as default _50%_. **Number of Samples** I have set to _144_, **Number of Visible Groups** to _15_, **Sampling Interval** to _600_,and **Group Discard Threshold** as well as **Maximum Alarm Frequency** are left as default _10_ and _300_ respectively.

![WEF Event Throughput Data Monitor Attributes](/images/wefmon/asWEFDataMonitor2Attributes.png "WEF Event Throughput Data Monitor Attributes")

Do not forget to enable the monitor and it will collect all events restricted by our base filter over 144 samples with 600 seconds (10 minutes) interval and calculate moving average.

These two monitors along with our count of endpoints per hour metric, should be sufficient enough to monitor the stability performance and efficiency of our event collection. It also helps observe how many endpoints communicate and send events to our SIEM. 

#### Finding stale endpoints, that do not send events for 1, 7 and 30 days.

Afer using WEF for some time, I needed to track endpoints that have not sending events for long periods of time. 

To achieve this task you will need several rules and several Active Lists.

At first we need to create 4 fields-based active lists **WEF Active Hosts**, **WEF Hosts - Dead 1 day**, **WEF Hosts - Dead 7 days**, **WEF Hosts - Dead 30 days**. All are with the same structure:

<center>
<table>
		<th>Active List Field Name</th>
		<th>Field Type</th>
		<th>Key-Field</th>
	<tr>
		<td>Host Name</td>
		<td>String</td>
		<td>N</td>
	</tr>
</table>
</center>

For each list we need to change _TTL Days_: 

<center>
<table>
		<th>Active List Name</th>
		<th>TTL Days</th>
	<tr>
		<td>WEF Active Hosts</td>
		<td>1</td>
	</tr>
	<tr>
		<td>WEF Hosts - Dead 1 day</td>
		<td>6</td>
	</tr>
	<tr>
		<td>WEF Hosts - Dead 7 days</td>
		<td>23</td>
	</tr>
	<tr>
		<td>WEF Hosts - Dead 30 days</td>
		<td>0</td>
	</tr>
</table>
</center>

That means that entries to the fisrt three Active Lists will expire after 1, 6, and 7 days respectively tracking the dead hosts up to 30 days in total. Entries in the **WEF Hosts - Dead 30 days** list will remain until host starts sending events or unril you decide to delete the entry manually.

Config examples below:

![WEF Active Hosts Active List Attributes](/images/wefmon/asWEFActiveList1Attributes.png "WEF Active Hosts Active List Attributes") | ![WEF Hosts - Dead 1 day Active List Attributes](/images/wefmon/asWEFActiveList2Attributes.png "WEF Hosts - Dead 1 day Active List Attributes")
![WEF Hosts - Dead 7 days Active List Attributes](/images/wefmon/asWEFActiveList3Attributes.png "WEF Hosts - Dead 7 days Active List Attributes") | ![WEF Hosts - Dead 30 days Active List Attributes](/images/wefmon/asWEFActiveList4Attributes.png "WEF Hosts - Dead 30 days Active List Attributes")

Now, after the tracking backbone is created we move onto the actual muscles that input and move data from one list to another. 

The first should be [lightweight rule](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898) that would catch any event coming from the active host and record that fact to the **WEF Active Hosts** Active List. 

![Windows Events - WEF sources tracking Rule Conditions](/images/wefmon/asWEFRule1Conditions.png "Windows Events - WEF sources tracking Rule Conditions")

In certain cases I prefer to bring string values to lower case, so there is a Local Variable for the rule that lowers **deviceHostName** event field.

![Windows Events - WEF sources tracking Rule Local Variable](/images/wefmon/asWEFRule1LocalVariables.png "Windows Events - WEF sources tracking Rule Local Variable")

Finally the actions for this rule will be to add entry to the **WEF Active Hosts** Active List in case of receiving event from live host and remove the hostname from other active lists in case it is found there.

![Windows Events - WEF sources tracking Rule Action](/images/wefmon/asWEFRule1Actions.png "Windows Events - WEF sources tracking Rule Action")

As you can see the logic is simple. Every event received from the host means that host is alive and sending events, so it is recorded in the list controling the active hosts and simultaneously deleted from any list keeping track of the dead hosts. Entries to this list expire after 24 hours since the last detected event, meaning that in case host does not send an event in 24 hours, its entry would be removed from the **WEF Active Hosts** active list.

When entry expires from the active list, ArcSight ESM generates the internal event under the name "ActiveList entry expired". To detect a dead host among WEF sources we need to catch such event for the specific list. So we create a standard rule **Windows Events - 1 day stale WEF host detected** and its conditions are: **name**=_ActiveList entry expired_ AND **fileName**=_WEF Active Hosts_ AND **fileType**=_ActiveList_. Obviously if you have named your active list recording live hosts differently you should set **fileName** to the name you have chosen.

![Windows Events - 1 day stale WEF host detected Rule Conditions](/images/wefmon/asWEFRule2Conditions.png "Windows Events - 1 day stale WEF host detected Rule Conditions")

Rule's action should record value of the **deviceCustomString4** to the **Host Name** column of the **WEF Hosts - Dead 1 day** Active List. 

![Windows Events - 1 day stale WEF host detected Rule Action](/images/wefmon/asWEFRule2Action.png "Windows Events - 1 day stale WEF host detected Rule Action")

Do not forget that in order to correctly process this field, events should have aggregation setup, so in our example we aggregate events with identical **deviceCustomString4** fields with _# of Matches_ = 1 and _Time Frame_ = 1 Minute. 

![Windows Events - 1 day stale WEF host detected Rule Aggregation](/images/wefmon/asWEFRule2Aggregation.png "Windows Events - 1 day stale WEF host detected Rule Aggregation")

If you followed the logic you understand that our rule catches event indicating that entry expired from the **WEF Active Hosts** Active List, meaning that host did not send a single event for 24 hours and therefore is considered dead. Details of the entry expired are recorded to the **deviceCustomString4** value of the "ActiveList entry expired" event. Rule picks up value of the **deviceCustomString4** field and updates **WEF Hosts - Dead 1 day** Active List with its value. That way we start tracking those endpoints that do not send events for more than 24 hours. 

Recall that TTL for our first three active lists are set to 1, 6 and 23 days, meaning that we will track endpoints not sending events for more than 1, 7 and 30 days in its respective lists. So we need to create two more rules to catch events of entries expiring from the **WEF Hosts - Dead 1 day**, **WEF Hosts - Dead 7 days** active lists. These two new rules should be identical to the **Windows Events - 1 day stale WEF host detected**, changing only rule name and active list name value in the conditions and actions.

Create **Windows Events - 7 day stale WEF host detected** with conditions equal to **name**=_ActiveList entry expired_ AND **fileName**=_WEF Hosts - Dead 1 day_ AND **fileType**=_ActiveList_ and **Windows Events - 30 day stale WEF host detected** with conditions equal to **name**=_ActiveList entry expired_ AND **fileName**=_WEF Hosts - Dead 7 day_ AND **fileType**=_ActiveList_. 

![Windows Events - 7 day stale WEF host detected Rule Conditions](/images/wefmon/asWEFRule3Conditions.png "Windows Events - 7 day stale WEF host detected Rule Conditions") ![Windows Events - 30 day stale WEF host detected Rule Conditions](/images/wefmon/asWEFRule4Conditions.png "Windows Events - 30 day stale WEF host detected Rule Conditions")

Aggregation for both rules is set to aggregate events with identical **deviceCustomString4** fields with _# of Matches_ = 1 and _Time Frame_ = 1 Minute.

![Windows Events - 7  and 30 day stale WEF host detected Rule Aggregation](/images/wefmon/asWEFRule2Aggregation.png "Windows Events - 7 and 30 day stale WEF host detected Rule Aggregation")

Both rules' action tab should record value of the **deviceCustomString4** to the _Host Name_ column of the **WEF Hosts - Dead 7 days** and **WEF Hosts - Dead 30 days** Active Lists. 

![Windows Events - 7 day stale WEF host detected Rule Action](/images/wefmon/asWEFRule3Action.png "Windows Events - 7 day stale WEF host detected Rule Action") ![Windows Events - 30 day stale WEF host detected Rule Action](/images/wefmon/asWEFRule4Action.png "Windows Events - 30 day stale WEF host detected Rule Action")

These 4 rules in total create the logic of detecting stale hosts. Move them to the Real-time Rules folder and enable. That concludes the first part of our configuration.

Now that we have backbone logic configured, let's proceed to the visualization of our results. 

The main data we need is stored within 3 Active Lists, so we need to create 3 queries -  **Windows Events - 1 day stale host**, **Windows Events - 7 day stale host** and **Windows Events - 30 day stale host**, each quering **WEF Hosts - Dead 1 day**, **WEF Hosts - Dead 7 days**, **WEF Hosts - Dead 30 days** Active Lists respectively, extracting _Host Name_ and _Last Modified Time_ column values from each. 

Below is the example for the **Windows Events - 1 day stale host** Query. 

![Windows Events - 1 day stale host Query General](/images/wefmon/asWEFQuery3General.png "Windows Events - 1 day stale host Query General") ![Windows Events - 1 day stale host Query Fields](/images/wefmon/asWEFQuery3Fields.png "Windows Events - 1 day stale host Query Fields")

After queries configuration is done we need to create 3 Query Viewers - **Windows Events - WEF source stale more than 1 day**,**Windows Events - WEF source stale more than 7 days**,**Windows Events - WEF source stale more than 30 days**. These viewers extract data from our **Windows Events - 1 day stale host**, **Windows Events - 7 day stale host** and **Windows Events - 30 day stale host** queries. For each of them I have set refresh data to 5 minutes and Default View to _Table_ . I have also changed Display Name for the **Last Modified Time** column to **Last Detected** .

You can see the example for the **Windows Events - WEF source stale more than 1 day** Query Viewer below:

![Windows Events - WEF source stale more than 1 day Query Viewer Attributes](/images/wefmon/asWEFQueryViewer2Attrib.png "Windows Events - WEF source stale more than 1 day Query Viewer Attributes") 
![Windows Events - WEF source stale more than 1 day Query Viewer Fields](/images/wefmon/asWEFQueryViewer2Fields.png "Windows Events - WEF source stale more than 1 day Query Viewer Fields")

#### Final steps

OK. Finally we need to combine everything into a single dashboard, so add:

* _Windows Events - Hourly WEF Log Sources Trend_ Query Viewer as Bar Chart
* _WEF Events Hourly_ Data Monitor as Bar Chart
* _WEF Event Throughput_ Data Monitor as Tile
* _Windows Events - WEF source stale more than 1 day_, _Windows Events - WEF source stale more than 7 days_, _Windows Events - WEF source stale more than 30 days_ Query Viewers as tables. 

Mine looks like this (clickable to zoom):

[![](/images/wefmon/asWEFDashboard.png)](/images/wefmon/asWEFDashboard.png)

###### Mentions
<small>Feature photo is by the Spanish photograper Jorge Pérez Higuera. </small>