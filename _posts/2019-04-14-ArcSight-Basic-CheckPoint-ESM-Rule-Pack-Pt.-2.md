---
layout: post
title: "ArcSight - Basic CheckPoint Rule Pack Pt.2"
description: "Basic rulepack for CheckPoint events Part 2"
headline: "Control your CheckPoint"
categories: 
- SIEM
- Firewall Analytics
- ArcSight ESM
tags: "SIEM ArcSight ESM Correlation"
comments: true
featured: false
imagefeature: teaching.jpg
published: true 
language: en
---

### CheckPoint Firewall Correlation Rule Pack - Part 1.

So in the [previous post](http://www.ashsecurity.com/siem/firewall%20analytics/arcsight%20esm/ArcSight-Basic-CheckPoint-ESM-Rule-Pack-Pt.-1) we have covered the first part of our basic firewall monitoring dashboard showing us overall **Firewall Events Trend**.

This time we will proceed and add two more dashboards monitoring admin activities and a report sent daily to our mailboxes. 

#### Firewall Events - Active Logins

We will start with creation of the Active List, *Firewall Events - CheckPoint Active Logins* with one column **UserId** to keep track of the active logins. 

![Active Logins Active List General](/images/fwmon/asFW2ActiveList1General.PNG "Active List General")

This active list will be updated by two [lightweight rules](https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898). But before creating those rules will need a common filter *Checkpoint Events - Admin Activities Events* to catch events related to the admin actions. Its conditions will look like this:

![Admin activities events filter](/images/fwmon/asFW2Filter1Filter.PNG "Admin activities events filter")

The first lightweight rule *Firewall Events - CheckPoint Login Event* will update *Firewall Events - CheckPoint Active Logins* active list and add the entry of the username upon detection of the login.

In its conditions we apply our common filter and additionally look for the events were *name*="Log In"

![Log in rule conditions](/images/fwmon/asFW2Rule1Conditions.PNG "Log in rule conditions")

And the action is simple add the *destinationUserName* value to the active list

![Log in rule actions](/images/fwmon/asFW2Rule1Action.PNG "Log in rule actions")

The second lightweight rule will delete the entry from the active list based on the common filter and event with the *name*="Log out".

![Log out rule conditions](/images/fwmon/asFW2Rule2Conditions.PNG "Log in rule conditions")

![Log out rule actions](/images/fwmon/asFW2Rule2Action.PNG "Log out rule actions")

All of the above should be enough to start planning the first dashboard, based on query that looks into the active list and picks up the entries, thus picking up currently logged in users. 

Lets create the **Firewall Events - CheckPoint Active Logins** query on the active list *Firewall Events - CheckPoint Active Logins*.

![Active List Query General](/images/fwmon/asFW2Query1General.PNG "Active List Query General")

It should pick up UserId and Creation Time fields. 

![Active List Query Fields](/images/fwmon/asFW2Query1Fields.PNG "Active List Query Fields")

On this query we create **Firewall Events - CheckPoint Active Logins** Query Viewer, that presents data as the table. Set the *refresh data* parameter to 1 minute.

![Active Logins Query Viewer General](/images/fwmon/asFW2QueryViewer1General.PNG "Active Logins Query Viewer General")

And it picks up same fields from the query on the Active List, but I have changed display names of the fields to make them more explanatory.

![Active Logins Query Viewer Fields](/images/fwmon/asFW2QueryViewer1Fields.PNG "Active Logins Query Viewer Fields")

Finally add this Query Viewer to the dashboard, that we have created in the [previous post](http://www.ashsecurity.com/siem/firewall%20analytics/arcsight%20esm/ArcSight-Basic-CheckPoint-ESM-Rule-Pack-Pt.-1). 

The logic behind this part is simple:
1. A rule updates the active list upon catching the event of administrator's account login. 
2. This active list entry is valid, until another rule catches an event of the same administrator's account logout.
3. Query viewer looks every minute to the active list and shows the active logins that are still in the active list.

#### Firewall Events - Admin activities

To enhance our dashboard, not only we need to know who is logged in to our firewall, but also last actions that were done by our admins.

Lets create *Last N Events* [Data Monitor](https://community.softwaregrp.com/dcvta86296/attachments/dcvta86296/Past-Protect-Event-Resources/102/1/SN06_Pearson.pdf), called Checkpoint Firewall - Last 10 Admin Events. It should be restricted by the *Checkpoint Events - Admin Activities Events* filter that we have created earlier, use _End Time_, _Destination User Name_, _name_, _message_ and _Device Product_ as its fields. Judging by its name you know that _# of Events_ parameter should be set to 10. 

![Last 10 Admin Events Data Monitor](/images/fwmon/asFW2DataMonitor1General.PNG "Last 10 Admin Events Data Monitor")

Add this data monitor to the same dashboard that we already have. 

So by now you have two more dashboards showing you active logins and last 10 admin events along with the previous one showing you overall events trend.

We proceed with the scheduled report **Firewall Event - CheckPoint Daily Admin Events** that will show us daily admin activities. 

Lets create query that will use our common *Checkpoint Events - Admin Activities Events* filter and query events for the period *Today - 1d*. Call it **Firewall Events - CheckPoint Daily Admin Events**.

![Admin Actions Query General](/images/fwmon/asFW2Query2General.PNG "Admin Actions Query General")
![Admin Actions Query Conditions](/images/fwmon/asFW2Query2Conditions.PNG "Admin Actions Query Conditions")

We will need the following fields: *End Time*, *Device Product*, *Target User Name*, *name*, *message*, *Device Custom String 2*, *Device Custom String 5*, *Device Custom String 6*, *Attacker Address*, *Target Address*. *Group By* and *Order By* are not required. 

![Admin Actions Query Fields](/images/fwmon/asFW2Query2Fields.PNG "Admin Actions Query Fields")

Based on **Firewall Events - CheckPoint Daily Admin Events** query we create a simple scheduled csv report that will be sent to the defined emails daily. Use *Simple Table Portrait*, rename the Columns under the *Data* tab to something more understandable.

![Admin Actions Report Data](/images/fwmon/asFW2Report1Data.PNG "Admin Actions Report Data")

Finally create a schedule to run the report daily. 

