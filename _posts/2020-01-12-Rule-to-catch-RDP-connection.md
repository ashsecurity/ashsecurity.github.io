---
layout: post
title: "Catching successful RDP connections with ArcSight ESM"
description: "The ArcSight rule to record the successful remote desktop connections"
headline: "Successful RDP connections monitoring is easy"
categories: 
- SIEM
- Windows
- ArcSight ESM
- Operations
- RDP
tags: "SIEM ArcSight RDP Monitoring"
comments: true
featured: false
imagefeature: calculation.jpg
published: true 
language: en
---

### Intro

Hi, in this post we will try to deal with the basic monitoring of successfully established RDP connections to your endpoints. I will use ArcSight, however, general ideas are applicable to other SIEM out there. 

#### Events that matter

When I started thinking about creating the rule I naturally googled for the events that I needed to track successful RDP connection. 
First and probably most interesting info I came across was in this [post](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/) by a guy called Jonathon Poling. Second resource is well known and excellent paper developed by the Japan CERT to [detect lateral movement](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)

To detect the successful RDP connection I have decided to concentrate on catching Event IDs 21, 22 and 25. These events show successful logon after the successful authentication to the OS.

* Event 21 shows successful logon
* Event 22 shows successful logon and start of the shell (Win GUI). This and previous events register upon a new connection.
* Event 25 shows successful logon and session reconnection. This event appear in case user did not formally log off the previous session, but rather simply disconnected from it by closing the window or choosing **Disconnect** from the menu.  

>**Note:** This works for Windows Server 2008 R2 or later.

Digging google results further, I have found that it is recommended to correlate above mentioned events with [Event ID 4624](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4624) with Type Logons 7 or 10. I will not cover it in this post, rather concentrating on the servers that are configured for Network Layer Authentication. If your servers are [configured](https://www.darkoperator.com/blog/2012/3/17/configuring-network-level-authentication-for-rdp.html) for the Network Layer Authentication, Event ID 4624 will have Type Logon 3 and those are too common to keep track of, making it useless to correlate for our purpose.

#### Updating the SmartConnector configuration with custom parser and categorizer.

In order to pull the events that we require, we need to ensure that connector pulls them from the source. Events can be found on the server in the Event Viewer under the `Application and Services Logs\Microsoft\Windows\TerminalServices-LocalSessionManager\Operational` hive, so to pull those logs we shall do the following:
* Create a parser for the logs
* Create categorization map for the logs
* Update the SmartConnector configuration

>Before starting the configuration I am assuming that you already have SmartConnector for Microsoft Windows Event Log - Native installed and configured with standard configuration to pull events from at least 1 Windows server of 2008 R2 or later edition.

To create a custom parser navigate to the `$ARCSIGHT_HOME\user\agent\fcp` folder and ensure that there is a folder **winc** there, if not, create it. 

>$ARCSIGHT_HOME is the name of the folder where connector is installed including *current* folder. 


Under the **winc** folder we need to create another one for our parser. The rule for the parser containing folder and parser file names is `\{Normalized Channel}\{Normalized ProviderName}.{Normalized SectionName}.jsonparser.properties`. I am using jsonparser because we need to parse UserData section of the event. 

> **Normalized** means that we need to change all letters to lower case and replace each character that is not letter or digit (meaning special characters and spaces) with an underscore character "_"

You can find the _channel_ and _provider_ names by opening the event and switching to the XML View in the **Details** tab. In our case it is `Microsoft-Windows-TerminalServices-LocalSessionManager\Operational` for the _channel_ and `Microsoft-Windows-TerminalServices-LocalSessionManager` for the _provider_. _Section name_ in our case is **UserData**

![RDP Event XML](/images/rdpmon/asRDPEvent.PNG "RDP Event XML")

So the final path and parser file name shall be: 
`$ARCSIGHT_HOME\user\agent\fcp\winc\microsoft_windows_terminalservices_localsessionmanager_operational\microsoft_windows_terminalservices_localsessionmanager.userdata.jsonparser.properties`

The parser itself looks like this:

```
trigger.node.location=/UserData
event.deviceVendor=__getVendor("Microsoft")
event.deviceProduct=__stringConstant("TerminalServices-LocalSessionManager")

token.count=5

token[0].name=User
token[0].location=EventXML/User
token[0].type=String

token[1].name=SessionID
token[1].location=EventXML/SessionID
token[1].type=String

token[2].name=Address
token[2].location=EventXML/Address
token[2].type=String

token[3].name=Reason
token[3].location=EventXML/Reason
token[3].type=String

token[4].name=Session
token[4].location=EventXML/Session
token[4].type=String

conditionalmap.count=1
conditionalmap[0].field=event.externalId
conditionalmap[0].mappings.count=8

conditionalmap[0].mappings[0].values=21
conditionalmap[0].mappings[0].event.name=__stringConstant("Remote Desktop Services: Session logon succeeded:")
conditionalmap[0].mappings[0].event.sourceUserName=User
conditionalmap[0].mappings[0].event.sourceAddress=__regexTokenAsAddress(Address,"(.*)")
conditionalmap[0].mappings[0].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[0].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[1].values=22
conditionalmap[0].mappings[1].event.name=__stringConstant("Remote Desktop Services: Shell start notification received:")
conditionalmap[0].mappings[1].event.sourceUserName=User
conditionalmap[0].mappings[1].event.sourceAddress=__regexTokenAsAddress(Address,"(.*)")
conditionalmap[0].mappings[1].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[1].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[2].values=23
conditionalmap[0].mappings[2].event.name=__stringConstant("Remote Desktop Services: Session logoff succeeded:")
conditionalmap[0].mappings[2].event.sourceUserName=User
conditionalmap[0].mappings[2].event.sourceAddress=__regexTokenAsAddress(Address,"(.*)")
conditionalmap[0].mappings[2].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[2].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[3].values=24
conditionalmap[0].mappings[3].event.name=__stringConstant("Remote Desktop Services: Session has been disconnected:")
conditionalmap[0].mappings[3].event.sourceUserName=User
conditionalmap[0].mappings[3].event.sourceAddress=__regexTokenAsAddress(Address,"(.*)")
conditionalmap[0].mappings[3].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[3].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[4].values=25
conditionalmap[0].mappings[4].event.name=__stringConstant("Remote Desktop Services: Session reconnection succeeded:")
conditionalmap[0].mappings[4].event.sourceUserName=User
conditionalmap[0].mappings[4].event.sourceAddress=__regexTokenAsAddress(Address,"(.*)")
conditionalmap[0].mappings[4].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[4].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[5].values=40
conditionalmap[0].mappings[5].event.name=__stringConstant("Session has been disconnected with the reason code:")
conditionalmap[0].mappings[5].event.deviceCustomNumber1=__safeToLong(Session)
conditionalmap[0].mappings[5].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")
conditionalmap[0].mappings[5].event.reason=Reason

conditionalmap[0].mappings[6].values=41
conditionalmap[0].mappings[6].event.name=__stringConstant("Begin session arbitration:")
conditionalmap[0].mappings[6].event.sourceUserName=User
conditionalmap[0].mappings[6].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[6].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")

conditionalmap[0].mappings[7].values=42
conditionalmap[0].mappings[7].event.name=__stringConstant("End session arbitration:")
conditionalmap[0].mappings[7].event.sourceUserName=User
conditionalmap[0].mappings[7].event.deviceCustomNumber1=__safeToLong(SessionID)
conditionalmap[0].mappings[7].event.deviceCustomNumber1Label=__stringConstant("Remote Session ID")
```

Links to the supplementing files can be found further down the post. 

You can see from the parser content that I am processing the events 21-25 and 40-42.

Once our parser is done, we need to create a custom categorizer as a good practice. As you may know categorizer files help connector to properly categorize events by adding additional meta-data when sending events to SIEM, essentially categorizer files are simple map files. 

Categorizer files should be put into the `$ARCSIGHT_HOME\user\agent\aup\acp\categorizer\current` directory. In this directory, create another called similar to the deviceVendor field of the event. In our custom parser earlier we have defined that deviceVendor will be **Microsoft** and in the new directory create a csv file with the name, that matches deviceProduct field of the event, which custom parser defines as **TerminalServices-LocalSessionManager**. Directory and categorizer file names should be normalized. Final result will look like `$ARCSIGHT_HOME\user\agent\acp\categorizer\current\microsoft\terminalservices_localsessionmanager.csv`.

The categorizer file content is as follows:

```
event.externalId,set.event.categoryObject,set.event.categoryBehavior,set.event.categoryDeviceGroup,set.event.categorySignificance,set.event.categoryOutcome
21,/Host/Application/Service/Remote Control,/Access,/Application,/Informational/Warning,/Success
22,/Host/Application/Service/Remote Control,/Access/Start,/Application,/Informational,/Attempt
23,/Host/Application/Service/Remote Control,/Access/Stop,/Application,/Informational,/Success
24,/Host/Application/Service/Remote Control,/Access/Stop,/Application,/Informational,/Success
25,/Host/Application/Service/Remote Control,/Access,/Application,/Informational/Warning,/Success
40,/Host/Application/Service/Remote Control,/Access/Stop,/Application,/Informational,/Success
41,/Host/Application/Service/Remote Control,/Access/Start,/Application,/Informational,/Attempt
42,/Host/Application/Service/Remote Control,/Access/Stop,/Application,/Informational,/Attempt
```

If you are interested in more details on how to create custom parser and the categorizer you need to read the SmartConnector for Microsoft Windows Event Log Configuration Guide (pages 47-52) and FlexConnector Developer's Guide (pages 169-170). Guides can be found [here](https://community.microfocus.com/t5/ArcSight-Connectors/ct-p/ConnectorsDocs).

Finally after creating the parser and categorizer we should update the SmartConnector configuration. Run **cmd.exe** as administrator and navigate to the `$ARCSIGHT_HOME\bin` folder. 

Run the **runagentsetup.bat** file. This will start the SmartConnector configuration process. Select _Modify Connector_ and click _Next_. Proceed to _Modify connector parameters_ by choosing this option and clicking _Next_. Un-check _Use Active Directory_ and click _Next_. Ensure that your _Domain Name_, _Domain User Name_ and its password are correct and click _Next_. You should finally arrive to the _Modify Table Parameters_ view, where you can provide Custom Event Logs configuration. For every server input `Microsoft-Windows-TerminalServices-LocalSessionManager/Operational`. This will enable connector to pick up RDP connection events from the correct location. After finishing the configuration click _Next_ and proceed with the rest of the setup as standard. 

After finishing the configuration, run the connector and ensure that your events are getting into the ESM with proper parsing and categorization.

#### Rule authoring 

Now that we have events being uploaded to our ESM with correct parsing, it is time to work on the rules that will pick the events and correlate them. As I mentioned earlier, I have concentrated on the event IDs 21, 22, 25. So I have created the **Windows Events - RDP Successful Logon** filter to serve as basis for the correlation rule. The filter conditions define _deviceVendor_ as Microsoft, _type_ not equal to Correlation, _deviceProduct_ equal of TerminalServices-LocalSessionManager and externalId as one of the 21, 22, 25.

Summary of the conditions are:
```
event1 :  ( 
Device Vendor = Microsoft
AND
Type != Correlation
AND
Device Product = TerminalServices-LocalSessionManager
AND ( 
External ID = 21
OR
External ID = 25
OR
External ID = 22
) )   
```

![RDP Connection Filter Conditions](/images/rdpmon/asRDPFilter1Conditions.PNG "RDP Connection Filter Conditions")

Next we create the standard [rule]((https://community.softwaregrp.com/t5/ArcSight-Tips-Information/Practical-Guide-to-ESM-Rules/ta-p/1644898)) called **RDP Successful Connection**. Its condition simply matches the **Windows Events - RDP Successful Logon** filter we have created earlier. I have decided to set an alias to the Event conditions as **Logon** just for fun. 

![RDP Connection Rule Conditions](/images/rdpmon/asRDPRule1Conditions.PNG "RDP Connection Rule Conditions")

The summary of the filter looks like this:
```
Logon :  
MatchesFilter("Windows Events - RDP Successful Logon")
```

When you analyze the details of the events that our filter picks, I have noticed that user name was in the format of DOMAIN\User Name. In order to extract the User Name and trow away the Domain part, I have learned quite an elegant solution from the [MicroFocus Community](https://community.microfocus.com/t5/ArcSight/ct-p/arcsight). It is possible to use local variable in the form of a string function _Evaluate Velocity Template_ and employ replaceAll to extract substring with the help of the regex. According to the FlexConnector Developer's Guide replaceAll function is:
 
>The three parameters are all strings. The first is the starting string, the second is the regular expression, and the third is the replacement string. Each place the regular expression is found in the starting string is replaced by the replacement string, and the result is returned. Note that the replacement string can contain references to capturing groups in the regular expression, in the form '$n', where n is 0 to 9.

So what I have tried to achieve is take the _Attacker User Name_ field of the event, run it through the regex and pick up a group out of the result of the regex. The regex is : `.*\(.*)`. Meaning that regex takes the string and puts the result after the "\" character into the group.
  
So, create a local variable of the String/_EvaluteVelocityTemplate_ function, give it a name (I have called mine _attackerUN) and put the following expression into the Arguments as Velocity Template:

`$attackerUserName.replaceAll('.*\\(.*)','$1')`

>**Note:** Remember that you need to provide escape character "\" additionally to the "\" special character. You also need to use "'" for the regex expression and group captured by the regex.

![RDP Connection Rule Local Variable](/images/rdpmon/asRDPRule1LocalVariable.PNG "RDP Connection Rule Local Variable")

Next we proceed to the Aggregation. Now, this depends on your environment, so I recommend to monitor the connections with the Active Channel based on the **Windows Events - RDP Successful Logon** filter configured for continuous monitoring. After creating the active channel, initiate number of connections and note down periods that it takes for different events to appear. In my case I have set aggregation of at least 1 match per 15 seconds. Aggregation is set to aggregate events with the following identical fields _deviceHostName_, _attackerAddress_, _deviceCustomNumber1_, _deviceAddress_, _\_attackerUN_, _attackerHostname_, _attackerUserName_, _attackerZoneResource_, _deviceZoneResource_. 

Summary is:

Aggregate if at least 1 matching conditions are found within 15 Seconds AND these event fields are the same (Logon.Device Host Name, Logon.Attacker Address, Logon.Device Custom Number1, Logon.Device Address, Logon.Attacker Zone Resource, Logon.Device Zone Resource, Logon._attackerUN, Logon.Attacker Host Name, Logon.Attacker User Name)

![RDP Connection Rule Aggregation](/images/rdpmon/asRDPRule1Aggregation.PNG "RDP Connection Rule Aggregation")

>Here is the trick, usually **Event ID 21** - _"Remote Desktop Services: Session logon succeeded:"_ is followed by the **Event ID 22** - _"Remote Desktop Services: Shell start notification received:"_ . These two events are produced after a **"new"** logon on the monitored server. This means that user previously did not login or properly logged out and/or disconnected from the session. So, we need to ensure that our rule correlates both of those events. **Event ID 25** - _"Remote Desktop Services: Session reconnection succeeded:"_ means that user logged on to the previously established session. This happens when user did not properly logged out or disconnected from the session, but rather simply closed the RDP window. This event goes by itself and is not preceded or followed by other events that we need to correlate _for our purpose_. Obviously **Event ID 25** is linked with **Event IDs 40, 41, 42 and 24**, but as mentioned they do not bring any new info for our specific goal of monitoring successful connections.

Above poses an interesting challenge for the correlation process in the ArcSight ESM: "how to create a single correlation event with a single correlation rule, that would aggregate either 2 events (21 and 22) or 1 event (25)? The answer was in setting correct action for the rule. I have used _On Time Window Expiration_ with _Cumulative Rule Chain_ set to **On**. This option allows me to aggregate all the events matching the threshold conditions and continue matching them until Time Frame (in my case 15 seconds) runs out. During this process I set event fields as follows:

<center>
<table>
		<th>Event Field</th>
		<th>Value</th>
	<tr>
		<td>Attacker User Id</td>
		<td>$_attackerUN</td>
	</tr>
	<tr>
		<td>categoryObject</td>
		<td>/Host/Application/Service/Remote Control</td>
	</tr>
	<tr>
		<td>categorySignificance</td>
		<td>/Informational/Warning</td>
	</tr>
	<tr>
		<td>Device Custom Number1 Label</td>
		<td>Remote Session ID</td>
	</tr>
</table>
</center>

![RDP Connection Rule Action](/images/rdpmon/asRDPRule1Action.PNG "RDP Connection Rule Action")

That is it. What is left is to test the rule and if everything works as expected deploy it as real-time.

#### Reporting

After verifying that the rule works fine, lets consider the reporting. I have made only 1, but you obviously can expand as per your requirements. So lets start with the **RDP Successful Connections** query. For general settings define _Start Time_ as **$Today - 1d** and _End Time_ as **$Today**, use **End Time** as _Use as Timestamp_, rest is default. 

![RDP Connection Query General](/images/rdpmon/asRDPQuery1General.PNG "RDP Connection Query General")

Query conditions specify that **Generator Name** equals name of the correlation rule we have created earlier, which is in our example was _RDP Successful Connection_. Conditions summary:

```
Event :  
Generator Name = RDP Successful Connection
```

![RDP Connection Query Conditions](/images/rdpmon/asRDPQuery1Conditions.PNG "RDP Connection Query Conditions")

As for the query fields, I have selected _Start Time_, Attacker Address, Attacker Host Name, Attacker Zone Name, Attacker User ID, Device Address, Device Host Name, Device Custom Number1, Device Zone Name. Also I have applied COUNT function to the _Device Address_ field. Same fields go to the Group By. 

![RDP Connection Query Fields](/images/rdpmon/asRDPQuery1Fields.PNG "RDP Connection Query Fields")

After testing the query, I have created a report with a Simple Table Landscape template and data source as the  **RDP Successful Connections** query. I did rename several columns to more understandable names, especially _deviceCustomNumber1_ to "Remote Session ID", _Attacker User ID_ to "Attacker User Name", _deviceAddress_ to "Target Address", _deviceHostName_ to "Target Host Name", _deviceZoneName_ to "Target Zone Name", and _startTime_ to "Event Time

![RDP Connection Report Data](/images/rdpmon/asRDPReport1Data.PNG "RDP Connection Report Data")

Finally what left is providing standard parameters, such as Report Format, email addresses and start and end times. Create a job with the schedule that you prefer. 

#### Final thoughts

I did not do any dashboard, cause I could not find any useful dashboard that would help me, however, I think it may be interesting for you to try and build dashboard with Event Graph type of data monitor, that would show connections with origin and destination Zone Name. Just remember that Event Graphs consume memory. 

#### Links

* [Nice post about Windows RDP-related events](https://ponderthebits.com/2018/02/windows-rdp-related-event-logs-identification-tracking-and-investigation/)<br>
* [Detecting lateral movement through tracking event logs by JPCERT](https://www.jpcert.or.jp/english/pub/sr/20170612ac-ir_research_en.pdf)
* [RDP Session disconnect reason codes](https://docs.microsoft.com/en-us/windows/desktop/TermServ/extendeddisconnectreasoncode)
* [Github repository of the supplemting files](https://github.com/ashsecurity/ArcSight-RDP-Monitoring-Supporting-Files)

###### Mentions
<small>Feature photo is by the Spanish photographer Jorge Pérez Higuera. </small>