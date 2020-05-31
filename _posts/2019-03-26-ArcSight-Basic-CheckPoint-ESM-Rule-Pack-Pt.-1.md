---
layout: post
title: "ArcSight - Basic CheckPoint Rule Pack Pt.1"
description: "Basic rulepack for CheckPoint events Part 1"
headline: "Control your CheckPoint"
categories: 
- SIEM
- Firewall Analytics
- ArcSight ESM
tags: "SIEM ArcSight ESM Correlation"
comments: true
featured: false
imagefeature: puzzle.jpg
published: true 
language: en
---

### CheckPoint Firewall Correlation Rule Pack - Part 1.

Ok, so I am not sure if folks really liked my previous attempt to do a write up about VPN correlation rule pack, but I am going to continue nonetheless. My next series are going to be about utilizing CheckPoint events. I will not use events from next-gen features like app control, AV and others. I think it is better to address the core needs and later develop something more suitable to your licensing. My dashboard and reports will provide basic information that I find useful for the core monitoring. You can take this further and expand based on your needs. 

My setup will again be quite simple. Firewall serve events to the single OPSEC connector, but same principles apply for the events served over syslog. Once again I will use ArcSight ESM, though same logic may apply to other SIEMs.

So in the next couple of posts we will cover creation of the following:

* Dashboard
 * Firewall Events Trend
 * Top Drop Events by Target
 * Top Drop Events by Source to Destination
 * Active Logins
 * Last 10 Admin Actions
* Reports
 * Firewall Daily Admin Activities

I hope this will be enough for your baseline CheckPoint monitoring activities in the ArcSight ESM.

Let us change strategy for this exercise and define filter conditions directly in the newly created objects. We shall start with the basic trend, showing the total number of events per hour for the last 24 hours from the firewalls to the connector. I have created this dashboard because OPSEC connector tends to be not reliable, so the flow of events shows that its health quite easy. In addition sudden increase of the events in the unusual hour can be an indicator of suspicious activity that deserves a more closer look.

#### Firewall Events - Overall Events Trend

Create a query **Firewall Events - All Checkpoint Events**, that queries events for the dynamic period from current time to the past 12 hours. 

![Query All Events General](/images/fwmon/asFW1Query1General.PNG "Query All Events General")

The query will select _deviceVendor_ and will summarize _Aggregated Event Count_ field. You can group by _deviceVendor_ and order by the sum of _Aggregated Event Count_, but it does not bring any benefit to us. 

![Query All Events Fields](/images/fwmon/asFW1Query1Fields.PNG "Query All Events Fields")

Conditions define that events should be from CheckPoint connector only and should not be internal ArcSight events

![Query All Events Conditions](/images/fwmon/asFW1Query1Conditions.PNG "Query All Events Conditions")

Next we create a new [trend](https://community.softwaregrp.com/t5/ESM-and-ESM-Express-Previous/ESM-Best-Practices-Trends/ta-p/1584002) **Firewall Events - CheckPoint Events Count**. This trend will use the **Firewall Events - All Checkpoint Events** query. Data fields of the query are:

* _Time Stamp_
* _Device Vendor_
* _Sum of the Aggregated Event Count_

![Trend All Events Count](/images/fwmon/asFW1Trend1General.PNG "Trend All Events Count")

It should run every hour and will use events from current time for the last hour.

![Trend All Events Count Parameter](/images/fwmon/asFW1Trend1Parameter.PNG "Trend All Events Count Parameter")

After couple of hours passed you can test the trend to check if it works as expected. 

Ok. Now we should create another query **Firewall Events - Checkpoint Events Trend** that would query the **Firewall Events - CheckPoint Events Count** trend for the saved data for the 1 day period and select _TimeStamp_ field as well as summarize the sum of the _Aggregated Event Count_ from the trend. 

![Query Events Trend General](/images/fwmon/asFW1Query2General.PNG "Query Events Trend General")

Query is grouped and ordered  by the _TimeStamp_ field. Notice that I leave _deviceVendor_ field out of the query fields, because it is no use for us at this moment. 

![Query Events Trend Fields](/images/fwmon/asFW1Query2Fields.PNG "Query Events Trend Fields")

Now we need to create the **Firewall Events - CheckPoint Events Trend** query viewer that will work based on the **Firewall Events - Checkpoint Events Trend** query and actually will serve as the first piece of the dashboard. It will query data for the last 13 hours from the current moment. If you would like to see larger period, just increase the number of hours to whatever you would like.

![Query View Events Trend General](/images/fwmon/asFW1QueryViewer1General.PNG "Query View Events Trend General")

It will use all the fields from the query. 

![Query View Events Trend Fields](/images/fwmon/asFW1QueryViewer1Fields.PNG "Query View Events Trend Fields")

Finally add the **Firewall Events - CheckPoint Events Trend** query viewer to the dashboard as **Bar Chart** with _Time Stamp_ used for the **X Axis** and other field for the **Y Axis**. 

By now I think you have got the logic behind building the Hourly Events trend dashboard:
1. Create a query that counts all the events for specific device vendor
2. Create a trend that will store data from this query on an hourly basis
3. Create another query that will pull data from the trend
4. Finally create query viewer that will present this data in the format you would like. 

That should be enough for the first part of the series. 

###### Mentions
<small>Photo by Gabriel Crismariu on Unsplash</small>