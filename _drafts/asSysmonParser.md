---
layout: post
title: "Developing custom ArcSight parser for the Sysmon logs "
description: "Developing custom ArcSight parser for the sysmon logs"
headline: "Sysmon logs parsing done right"
categories: 
- SIEM
- Endpoint Analytics
- ArcSight ESM
tags: "Endpoint SIEM Sysmon"
comments: true
featured: false
imagefeature: teaching.jpg
published: true 
language: en
---


We have followed the suite and started collecting the logs from the Windows endpoints via the Windows Event Forwarding. In particular I was interested to improve threat hunting with the help of the [sysmon utility](https://blogs.technet.microsoft.com/motiba/2016/10/18/sysinternals-sysmon-unleashed/). There are number of great blog posts about using sysmon:

* [Threat hunting via sysmon](https://www.sans.org/cyber-security-summit/archives/file/summit-archive-1554993664.pdf)
* [Splunking the Endpoint: Threat Hunting with Sysmon](https://medium.com/@haggis_m/splunking-the-endpoint-threat-hunting-with-sysmon-9dd956e3e1bd)
* [Sysmon-config that started it all, thanks to TayTay](https://github.com/SwiftOnSecurity/sysmon-config)
* [Another great sysmon-config example](https://github.com/ion-storm/sysmon-config)

Making the whole Windows Event Forwarding infrastructure is a bit tricky, but our friends from NSA have got us [covered](https://apps.nsa.gov/iaarchive/library/reports/spotting-the-adversary-with-windows-event-log-monitoring.cfm) and so [did ArcSight](https://community.softwaregrp.com/dcvta86296/attachments/dcvta86296/BestPractices/57/1/Micro_Focus_ArcSight_Collecting_Windows_Event_Logs.pdf).

> **Note:** Make sure to read and understand the above configuration documents. We have suffered a lot because of minor mistakes during the whole integration process. Make sure to select the sysmon-config that you will use for your environment, because your parser shall be tailored for the events that will be generated using it. 

After whole intergation we started getting logs into our ArcSight ESM, but nothing is easy in SIEM world and especially with ArcSight. What I have noticed is that standard Windows Event Log - Native connector does not correctly parse sysmon events, and not only sysmon events. 

This issues required correction and that is the main target of this blog post. 

### Sysmon events parser

To correctly create the parser we need to:

1. Enable *Preserve raw Events* for the connector that processes the WEF logs.
2. Generate Sysmon events and ensure that we collect raw events. 

Our custom parser will be placed in the $ARCSIGHT_HOME\user\agent\fcp\winc folder. $ARCSIGHT_HOME is the name of the folder where connector is installed including *current* folder. 

Raw events should help us identify:
* Channel name (for example Security, Application etc). In our case System
* Provider name. For sysmon it is Microsoft-Windows-Sysmon
* Section names (for example EventData, UserData). In our case we will need to work on EventData

Parser file should be name and placed in correct structure: 

`\{Normalized Channel}\{Normalized ProviderName}.sdkkeyvaluefilereader.properties`

Now the Channel name will become the folder name under *winc* and Provider name along with SectionName will become name of the parser file.

In our case the whole structure will become:

`$ARCSIGHT_HOME\user\agent\fcp\winc\microsoft_windows_sysmon_operational\microsoft_windows_sysmon.sdkkeyvaluefilereader.properties`

Now we shall proceed to actually create the parser file. 

The standard header for the log we will use as per connector manual will be:

```
key.delimiter=""
key.value.delimiter=:
key.regexp=([^&,]+)

trim.values=true
trim.tokens=true
```

Next we define static names of the vendor as *Microsoft* and product as *Sysmon*:

```
event.deviceVendor=__getVendor("Microsoft")
event.deviceProduct=__stringConstant("Sysmon")
```

I recommend creating some generic mappings that will always be placed in the same fields, despite event ID you are trying to parse and map. Sysmon provides timing in UTC format, so I prefer to map Sysmon event timing to the *deviceCustomDate1* field and timing of the file operations to the *fileCreateTime* and *oldFileCreateTime* fields. 

```
event.deviceCustomDate1=__parseMultipleTimeStamp(UtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")
event.deviceCustomDate1Label=__stringConstant("Event TimeStamp (UTC)")
event.fileCreateTime=__parseMultipleTimeStamp(CreationUtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")
event.oldFileCreateTime=__parseMultipleTimeStamp(PreviousCreationUtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")
```

Next generic mappings will be done for file hashes, so that MD5 is mapped to the *fileHash* and SHA256 to the *oldFileHash* fields.

```
event.fileHash=__regexToken(Hashes,"MD5=(\\S+)\\,")
event.oldFileHash=__regexToken(Hashes,"SHA256=(\\S+)")
```
Finally we proceed to start actual mapping of the data fields. For the EventData section of the logged event the fields are being processed automatically, so we do not need to create tokens in advance, therefore we can use field names that appear in the log directly. 

In our case we will create mapping for the one event # 1. As a personal exercise, I would recommend taking it further and develop mappings for the rest of the events. 

```
conditionalmap.count=1
conditionalmap[0].field=event.externalId
conditionalmap[0].mappings.count=1
```

> **Note:** `conditionalmap[0].mappings.count=1` equals to the number of the events that you wold like to process and the token numbering starts with 0.  

Sample of the actual Sysmon and its logs structure can be checked on this [brilliant resource](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=90001)

For the Sysmon event #1 the EventData section it looks like this:

```
<EventData>
        <Data Name="UtcTime">2017-04-28 22:08:22.025</Data>
        <Data Name="ProcessGuid">{A23EAE89-BD56-5903-0000-0010E9D95E00}</Data>
        <Data Name="ProcessId">6228</Data>
        <Data Name="Image">C:\Program Files (x86)\Google\Chrome\Application\chrome.exe</Data>
        <Data Name="CommandLine">"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --type=utility --lang=en-US --no-sandbox --service-request-channel-token=F47498BBA884E523FA93E623C4569B94 --mojo-platform-channel-handle=3432 /prefetch:8</Data>
        <Data Name="CurrentDirectory">C:\Program Files (x86)\Google\Chrome\Application\58.0.3029.81\</Data>
        <Data Name="User">LAB\rsmith</Data>
        <Data Name="LogonGuid">{A23EAE89-B357-5903-0000-002005EB0700}</Data>
        <Data Name="LogonId">0x7eb05</Data>
        <Data Name="TerminalSessionId">1</Data>
        <Data Name="IntegrityLevel">Medium</Data>
        <Data Name="Hashes">SHA256=6055A20CF7EC81843310AD37700FF67B2CF8CDE3DCE68D54BA42934177C10B57</Data>
        <Data Name="ParentProcessGuid">{A23EAE89-BD28-5903-0000-00102F345D00}</Data>
        <Data Name="ParentProcessId">13220</Data>
        <Data Name="ParentImage">C:\Program Files (x86)\Google\Chrome\Application\chrome.exe</Data>
        <Data Name="ParentCommandLine">"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" </Data>
</EventData>

```

My mapping of this event looks like this:

```
#Sysmon Event #1 Mappings
conditionalmap[0].mappings[0].values=1
conditionalmap[0].mappings[0].event.name=__stringConstant("Process Create")
conditionalmap[0].mappings[0].event.message=__concatenate("Process Created: ",Image)
conditionalmap[0].mappings[0].event.deviceEventClassId=__stringConstant("Sysmon Event - Process Event")
conditionalmap[0].mappings[0].event.sourceUserName=__regexToken(User,"\\w+\\\\(\\S+)")
conditionalmap[0].mappings[0].event.sourceProcessId=__safeToInteger(SourceProcessId)
conditionalmap[0].mappings[0].event.sourceProcessName=ParentImage
conditionalmap[0].mappings[0].event.destinationProcessId=__safeToInteger(ProcessId)
conditionalmap[0].mappings[0].event.destinationProcessName=Image
conditionalmap[0].mappings[0].event.fileName=__regexToken(Image,".+(?=\\\\(.+))")
conditionalmap[0].mappings[0].event.fileId=FileVersion
conditionalmap[0].mappings[0].event.deviceCustomString1=Description
conditionalmap[0].mappings[0].event.deviceCustomString1Label=__stringConstant("Process Description")
conditionalmap[0].mappings[0].event.deviceCustomString2=Product
conditionalmap[0].mappings[0].event.deviceCustomString2Label=__stringConstant("Product Name")
conditionalmap[0].mappings[0].event.deviceCustomString3=CommandLine
conditionalmap[0].mappings[0].event.deviceCustomString3Label=__stringConstant("Process Command Line")
conditionalmap[0].mappings[0].event.deviceCustomString4=ParentCommandLine
conditionalmap[0].mappings[0].event.deviceCustomString4Label=__stringConstant("Parent Process Command Line")
conditionalmap[0].mappings[0].event.deviceCustomString5=CurrentDirectory
conditionalmap[0].mappings[0].event.deviceCustomString5Label=__stringConstant("Current Directory")
conditionalmap[0].mappings[0].event.deviceCustomNumber1=TerminalSessionId
conditionalmap[0].mappings[0].event.deviceCustomNumber1Label=__stringConstant("Terminal Session ID")
```

You can see that mapping is somewhat straight forward except for the couple of the regex statements. In general **Data Name** valye from the log is used to map it to the specific field in the SIEM. 

`conditionalmap[0].mappings[0].event.sourceUserName=__regexToken(User,"\\w+\\\\(\\S+)") ` takes the format `LAB\rsmith` from the `<Data Name="User">LAB\rsmith</Data>`, extracts a substring after the **\\** symbol to map the actual name *rsmith* to the *sourceUserName* field.

> **Note:** Remember that in the parsers and the properties files you should double every **\\** symbol to properly escape it. 

Other regex: `conditionalmap[0].mappings[0].event.fileName=__regexToken(Image,".+(?=\\\\(.+))")` is somewhat more interesting. It takes `<Data Name="ParentImage">C:\Program Files (x86)\Google\Chrome\Application\chrome.exe</Data>` string **C:\Program Files (x86)\Google\Chrome\Application\chrome.exe**, utilized look forward feature of the regex and extracts the name of the file after the last **\\** symbol, so in our example *chrome.exe* is mapped to the *fileName* field.


Save the parser that we have created as the **microsoft_windows_sysmon.sdkkeyvaluefilereader.properties** file, place it to the required folder **$ARCSIGHT_HOME\user\agent\fcp\winc\microsoft_windows_sysmon_operational** and restart the connector for the changes to take effect. 

IN our case the full parser would look something like this

```
key.delimiter=&&
key.value.delimiter==
key.regexp=([^&=]+)

trim.values=true
trim.tokens=true

#################################################################################################
#################################################################################################
#Generic mappings for all the events

#Setting the common vendor and product for all the events

event.deviceVendor=__getVendor("Microsoft")
event.deviceProduct=__stringConstant("Sysmon")

#Mapping UTC Timing to generic fields
event.deviceCustomDate1=__parseMultipleTimeStamp(UtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")
event.deviceCustomDate1Label=__stringConstant("Event TimeStamp (UTC)")
event.fileCreateTime=__parseMultipleTimeStamp(CreationUtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")
event.oldFileCreateTime=__parseMultipleTimeStamp(PreviousCreationUtcTime,"dd/MM/yyyy HH\:mm\:ss.SSS","yyyy-MM-dd HH\:mm\:ss.SSS")

#Mapping file hashes to generic fields
event.fileHash=__regexToken(Hashes,"MD5=(\\S+)\\,")
event.oldFileHash=__regexToken(Hashes,"SHA256=(\\S+)")

#################################################################################################
#################################################################################################
#Starting the mappings 
conditionalmap.count=1
conditionalmap[0].field=event.externalId
conditionalmap[0].mappings.count=1

#################################################################################################
#################################################################################################
#Actual mappings per events

#Sysmon Event #1 Mappings
conditionalmap[0].mappings[0].values=1
conditionalmap[0].mappings[0].event.name=__stringConstant("Process Create")
conditionalmap[0].mappings[0].event.message=__concatenate("Process Created: ",Image)
conditionalmap[0].mappings[0].event.deviceEventClassId=__stringConstant("Sysmon-Process_Created")
conditionalmap[0].mappings[0].event.sourceUserName=__regexToken(User,"\\w+\\\\(\\S+)")
conditionalmap[0].mappings[0].event.sourceProcessId=__safeToInteger(SourceProcessId)
conditionalmap[0].mappings[0].event.sourceProcessName=ParentImage
conditionalmap[0].mappings[0].event.destinationProcessId=__safeToInteger(ProcessId)
conditionalmap[0].mappings[0].event.destinationProcessName=Image
conditionalmap[0].mappings[0].event.fileName=__regexToken(Image,".+(?=\\\\(.+))")
conditionalmap[0].mappings[0].event.fileId=FileVersion
conditionalmap[0].mappings[0].event.deviceCustomString1=Description
conditionalmap[0].mappings[0].event.deviceCustomString1Label=__stringConstant("Process Description")
conditionalmap[0].mappings[0].event.deviceCustomString2=Product
conditionalmap[0].mappings[0].event.deviceCustomString2Label=__stringConstant("Product Name")
conditionalmap[0].mappings[0].event.deviceCustomString3=CommandLine
conditionalmap[0].mappings[0].event.deviceCustomString3Label=__stringConstant("Process Command Line")
conditionalmap[0].mappings[0].event.deviceCustomString4=ParentCommandLine
conditionalmap[0].mappings[0].event.deviceCustomString4Label=__stringConstant("Parent Process Command Line")
conditionalmap[0].mappings[0].event.deviceCustomString5=CurrentDirectory
conditionalmap[0].mappings[0].event.deviceCustomString5Label=__stringConstant("Current Directory")
conditionalmap[0].mappings[0].event.deviceCustomNumber1=TerminalSessionId
conditionalmap[0].mappings[0].event.deviceCustomNumber1Label=__stringConstant("Terminal Session ID")

```

> **Note:** Make sure that you are properly planning the *deviceEventClassId*, because you will use it now to create categorizer.


### Categorization mapping

ESM content heavily relies on categorization. Therefore, it is only natural to create custom categorizer for our custom parser. Categorizer map file should be placed in the **$ARCSIGHT_HOME\user\agent\acp\categorizer\current folder**. Create another folder there that matches deviceVendor field and place in this folder a **csv** file that matches deviceProduct field. Make sure that names of the folder and file are normalized, that is all capital letters become small and any characters that are not letters or digits become underscore character. In our case it will be

`**$ARCSIGHT_HOME\user\agent\aup\acp\categorizer\current\microsoft\sysmon.csv`

This file should have in general just one getter (a fancy ArcSight's way to call an conditional pointer or an anchor) and set of category fields like *categoryObject*, *categoryBehavior*, or *categoryOutcome*

So the header of our categorizer map file will look like this.
```
event.deviceEventClassId,set.event.categoryObject,set.event.categoryBehavior,set.event.categoryOutcome,set.event.categorySignificance,set.event.categoryDeviceGroup,set.event.categoryDeviceType,set.event.categoryTechnique
```

The categorizer for our mapped event shall be:

```
Sysmon-Process_Created,/Host/Resource/Process,/Execute/Start,,/Success,/Informational,/Operating System,/Operating System,/Attack Lifecycle/Install,Source
SysmonTask-SYSMON_FILE_TIME,/Host/Resource/File,/Modify/Configuration,/Success,/Suspicious,/Operating System,/Operating System,,
```
It should be right after the header line without any trailing spaces.

Save the file in the required directory and restart the connector.


### Some final words. 

In this post we have went over just one event as an example. I challenge you to go over rest of the events and create a proper mapping for them in your parser and afterwards categorizer. 

I have got most valuable ideas for my parser and categorizer from [this content](https://marketplace.microfocus.com/arcsight/content/microsoft-sysmon-flexconnector).

> **Note:** When mapping out Event #3 I have encountered an interesting bug where parsing certain data fields of the log and mapping them to specific ArcSight fields breaks the connector. However, using the same Data Fields to create *message* ArcSight Field goes without any problems. Wierd bug, but unfortunatelly I could not find any solution for that and support refused to help me out with it. 


If you have any comments or questions please reach out via coments section. 