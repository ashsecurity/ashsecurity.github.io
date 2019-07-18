---
layout: post
title: "Getting MS Exchange Admin Logs details with the custom PS script"
description: "Using custom script to get the details of the admin logs"
headline: "Making exchange admin logs more useful"
categories: 
- SIEM
- Exchange
- ArcSight ESM
tags: "Exchange SIEM Search-AdminAuditLog"
comments: true
featured: false
imagefeature: studydesk.jpg
published: true 
language: en
---

### Intro


So here is the story, MS Exchange is one of the most popular platforms for corporate email messaging. However it is not easy to get audit logs out of it. 

Now as you may know Exchange has several logs that may be valuable, but I was particularly interested in the one called Administrator Audit Log. As Microsoft [states](https://docs.microsoft.com/en-us/Exchange/policy-and-compliance/admin-audit-logging/admin-audit-logging?view=exchserver-2019):

> You can use administrator audit logging in Exchange Server to log when a user or administrator makes a change in your organization. By keeping a log of the changes, you can trace changes to the person who made the change, augment your change logs with detailed records of the change as it was implemented, comply with regulatory requirements and requests for discovery, and more.

Before we proceed further let's see how the standard ArcSight PowerShell SmartConnector works with the Exchange audit logs. It uses 2 PowerShell scrips, one periodically extracts mailboxes and another extracts audit logs and processes them as admin and mailbox audit logs. This particular connector is notoriously badly written. It stops processing logs for no visible reason. It does not understand some encodings, so in case your users use Cyrillic characters, you are out of luck. It does not extract the full info of the administrative actions. Looking at the standard event entry ESM shows you something like this:

![Standard cmdlet Details](/images/exchStandardDetails.PNG "Standard cmdlet Details")

Obviously, the log that shows that someone did something at sometime, without exact details, is sort of useless. This happens because the standard output of the `Search-AdminAuditLog` **cmdlet** does not reveal by default the full command that was run for the **cmdlet**. So the ESM event presents **CmdletParameters** and **ModifiedProperties** as the truncated output.

For example running `Search-AdminAuditLog -StartDate MM/dd/yyyy -EndDate MM/dd/yyyy -UserIds [admin username]` in PowerShell shows you the following output:

![Standard cmdlet PowerShell Output](/images/exchStandardDetailsPS.PNG "Standard cmdlet PowerShell Output")

You can see where the ArcSight PowerShell Connector problems start from.

Fortunately, thanks to the [Microsoft Exchange Team Blog](https://techcommunity.microsoft.com/t5/Exchange-Team-Blog/Parsing-the-Admin-Audit-Logs-with-PowerShell/ba-p/603911), there is a way to get the full command details. You will need to read the blog post to understand how the whole thing works, but for our purpose lets appreciate the fact, that they came up with a [nice PowerShell script](https://gallery.technet.microsoft.com/scriptcenter/Get-SimpleAuditLogReport-19e9e51a) that ingests the output of the `Search-AdminAuditLog` and recreates the full command used. Save the script from the gallery to the `C:\PSScripts\` under the **simplelog.ps1** name on the server where you plan/have Action Connector installation.

### Getting Exchange audit logs into your ArcSight SIEM

But let us get back to the problem at hand. How to take the standard log output and process it through the above PowerShell script?
To me the easiest answer was simple fusion of the ArcSight's standard PowerShell connector with ArcSight's Action connector. 

> **Note:** I assume that you already have ArcSight Action Connector installed. If not, please read [this](https://community.microfocus.com/dcvta86296/attachments/dcvta86296/ArchiveDiscussionBoard/39380/1/ArcSight%20Action%20Connector%202016.pdf) to get familiar with the installation or [this](https://basec.co.uk/2018/03/counteract-action-connector) to understand how to make some parser changes. To process PowerShell scripts or perform other Windows commands, my recommendation is to install Action Connector on the Windows platform.
> **Full Disclosure:** I am NOT a good programmer, so my code is obviously flawed. At times I cannot even explain why it works ¯\\_(ツ)_/¯

Initially I have started by looking up the ideas in the original powershell script, called `retrieveMailboxAuditLog.ps1`. It is used by the standard ArcSight PowerShell connector and located in the `$ARCSIGHT_HOME\current\bin\agent\microsoft\exchange` folder. As days progressed I have cannibalized it a bit to create a basis for my script. 

The final version of my first PowerShell script, that suppose to be called by the Action Connector looks like this:

```
###############################################################################
#Version 3.1
#Author: ASh
#Modifier: ASh
#
#Purpose: To extract the details of the event from Exchange audit log. 
#
#Prerequisites: Access to the exchange server, account name that performed changes, time of the event, cmdlet used
#
#Parameteres Order: [exchange server name] [audit account name] [password] [audited admin account] [event exact time] [cmdlet used]
#
#Example: 
#C:\Windows\System32\WindowsPowerShell\v1.0>powershell script1.ps1 'XXX.local.domain' 'username' 'Password' 'admin username' 'XX Jun 2019 14:00:00 GMT'
#
#Known Bugs: 
#1. For some reason during multiple script calls do not produce output for the action connector. Although log shows that script runs. Suspect Action Connector bug.
#
#
#Changes:
#
#Version 3.1: added new entries to make log file more informative.
################################################################################

#Process input parameters

$NUM_ARGS=6 # Define number of necessary parameters


$strFQDN="" # name of the Exchange server
$strUSER="" # name of the account for connecting to the Exchange server
$strPASSWORD="" # Password that is user for the $strUSER account, pass it from the ArcSight
$strUSERID="" # name of the admin account that is audited
$strSTART_DATE="" # date and time of the audit in the dd MMM yyyy hh:mm:ss GMT format, like "24 Jun 2019 11:05:03 GMT"
$strCmdlet="" #name of the cmdlet

$count=$args.count

# write-Host "input number of parameters is $count" # uncomment when run as standalode for debugging

#Checking if the number of the parameters is correct

if( $args.count -eq $NUM_ARGS )
{
$strFQDN=$args[0]	 
$strUSER=$args[1]
$strPASSWORD=$args[2]
$strUSERID=$args[3]
$strSTART_DATE=$args[4]
$strCmdlet=$args[5]

#below is for debugging the script and running standalone
	 
#write-Host "input FQDN is $strFQDN"
#write-Host "input The location of mailboxes file is $strFILE_PATH"
#write-Host "input User is $strUSER"
#write-Host "input Password is xxxxxxxx"
#write-Host "input start date is $strSTART_DATE"
#write-Host "input name of the cmdlet is $strCmdlet"

}
else
{
write-Host "MSG: wrong number of input parameters for the script - script1.ps1, should be [$NUM_ARGS] but [$args.Length] !"
}

$secToWait= Get-Random -Minimum 8 -Maximum 30 # getting a random number of seconds from the 8 to 30 secs. Adjust it to your liking.

#Create a log file to show that script run with what parameters in the C:\Temp folder

$LogFileName = "C:\Temp\$strUserid-$strCmdlet-$(Get-Date -Format 'yyMMdd-HHmmss').log"
"Starting Log $(get-date)" | Out-File -FilePath $LogFileName -Append
"$(get-date) : endTime: $strSTART_DATE, sourceUserName: $strUSERID, Cmdlet: $strCmdlet, Delay Time: $secToWait" | Out-File -FilePath $LogFileName -Append


#Construct URL based on the FQDN of exchange server
$strURL="http://"+$strFQDN+"/PowerShell/"

##
#Create a new remote session against the exchange server and import it to local. 
#Example: $Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri http://XXXX.local.domain/PowerShell/ -Authentication Kerberos

$secureStringPassword = convertto-securestring $strPASSWORD -asplaintext -force
$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $strUSER, $secureStringPassword



# Setting to handle situation of too many opened sessions. It puts script to sleep for random time up to 30 secs.
# This should (in theory) prevent error of too many simultaneous sessions created at the influx of the audit events.
# Once sleep time runs out session is created.
Start-Sleep -Seconds $secToWait
 

#Write-Host "waiting for the: $secToWait" # Uncomment to debug

#Create New Session.
$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri $strURL -Authentication Kerberos -Credential $cred -AllowRedirection

Import-PSSession $Session -AllowClobber -DisableNameChecking | out-file -filepath $LogFileName -Append # to redirect message to the log file. 

#Updating the log file name with the session ID:
"$(get-date) : PS Session ID: $Session" | Out-File -FilePath $LogFileName -Append # writing to the log file ID of the powershell session created


# Below is the unholy piece of code junk to handle the string with the date input
# and  make it look like something we can pass as an argument to the 
# Search-AdminAuditLog cmdlet and later to filter for the specific event

# This part transforms "dd Mon yyyy HH:mm:ss UZT" to the "MM/dd/yyyy HH:mm:ss"
$stDateIn= $strSTART_DATE -replace '(\d+\s\w+\s\d+\s\d+:\d+:\d+).+','$1'
$startDateMod=[datetime]$stDateIn
$endDateMod=$startDateMod.AddMinutes(1)
$StartDate=[datetime]::ParseExact($startDateMod, "MM/dd/yyyy HH:mm:ss",$null)
$EndDate=[datetime]::ParseExact($endDateMod, "MM/dd/yyyy HH:mm:ss",$null)


# Uncomment below  to view the output of the variables for some debugging
# $strFQDN
# $strUSER
# $strPASSWORD
# $strUSERID
# $strSTART_DATE
# $stDateIn
# $startDateMod
# $endDateMod
# $StartSate
# $EndDate
# $strCmdlet

#Here we actually extract the logs from the exchange audit logs 
#and pass it to another script (simplelogs.ps1). Filter output by 
#the specific timing. Make sure that you put correct paths to the simplelogs.ps1 script.

$output=Search-AdminAuditLog -StartDate $startdate -EndDate $enddate -UserIds $strUSERID -Cmdlets $strCmdlet| C:\PSScripts\simplelog.ps1 -agree | where RunDate -eq $startdate 

$output | out-file -filepath $LogFileName -Append # writing the output to the log.

$output # sending the output to the console

Remove-PSSession $Session #This will clear the created session, otherwise there may be trouble of opening to many connections to the server.
 
"Closing Log $(get-date)" | Out-File -FilePath $LogFileName -Append # closing the log.
```

> **Note:** A strange thing. I have noticed that running the `Search-AdminAuditLog` is not as easy as it seems. It seems to me very dependable on the time specified for the Search-AdminAuditLog. So calling it with the same date and time as `-StartDate` and `-EndDate` parameters causes issues and does not produce the results you need. That is why I had to add at least 1 minute to the `-EndDate`.

I have tried to comment the script as much as I could to explain what it does in various steps. Open any text processor you prefer. Copy the script content above and save it as the sadmexch.ps1 to the `$ARCSIGHT_HOME` folder where you have installed the action connector. 

> **NOTE:** Save it in the root of the connector folder, not in the `current` folder.

Run the PowerShell ISE, load this script into the editing area, navigate to the folder where you have saved the script and try to run it with the required parameters. `C:\Windows\System32\WindowsPowerShell\v1.0>powershell sadmexch.ps1 '[server name]' '[account name]' '[password]' '[admin account]' 'date in the format similar to: 14 Jun 2019 14:39:00 GMT'`

Parameters are described below:
<center>
<table>
	<th>#</th>
	<th>Parameter Name</th>
	<th>Description</th>
	<tr>
		<td>1</td>
		<td>strFDQN</td>
		<td>Enter Exchange Server FDQN</td>	
	</tr>
	<tr>
		<td>2</td>
		<td>strUSER</td>
		<td>Enter User Account that can login to read audit logs</td>	
	</tr>
	<tr>
		<td>3</td>
		<td>strPASSWORD</td>
		<td>Enter password for above User Account</td>	
	</tr>
	<tr>
		<td>4</td>
		<td>strUSERID</td>
		<td>Enter admin account that perfomed the action to be audited</td>	
	</tr>
	<tr>
		<td>5</td>
		<td>strSTART_DATE</td>
		<td>Enter Date and Time in the format dd MM yyy hh:mm:ss GMT(or the time zone you are in)</td>	
	</tr>
	<tr>
		<td>6</td>
		<td>strCmdlet</td>
		<td>Enter name of the Cmdlet</td>	
	</tr>
</table>
</center>

The logic behind my approach is pretty simple: 
1. Standard ArcSight PowerShell SmartConnector extracts admin audit log from the MS Exchange in truncated format
2. A rule in ESM intercepts this event and executes PowerShell script via the Action Connector
3. It allows extraction of the same event from the MS Exchange and pass it to another PowerShell Script, that we have downloaded from the gallery
4. It will in turn reconstruct details of the full command used
5. Action Connector parses the output to the correct fields 

> A little note about password for the account I use to access the audit logs on the Exchange server. I had a choice of storing it inside the script or somewhere else. I think that better solution is storing the password in ESM rule as a concatenate string function variable (You will see it a little further down the post). This way I have adequate control over who can see the password and still use it relatively safely.

Next we should make sure that our sadmexch.ps1 script appears under the action commands menu in the ArcSight ESM. 

### Action Connector configuration

First check the agent.properties file of the Action Connector. Look for the value of the `agents[0].configfile` line. It will show the name of the file that defines the commands for the connector and path to the scripts. You can find this file in the `$ARCSIGHT_HOME\current\user\agent\flexagent` folder. Its name is something like: `<file_name>.counteract.properties` .

To execute our PowerShell script from the Action Connector you need to add it as a new command. Assuming that running our script is your first command in the `<file_name>.counteract.properties` file we need to insert the following:

```
command.count=1

command[0].name=powershell_exchange_admin_action
command[0].displayname=powershell_exchange_admin_action
command[0].parameter.count=6
command[0].parameter[0].name=strFDQN
command[0].parameter[0].displayname=strFDQN
command[0].parameter[1].name=strUSER
command[0].parameter[1].displayname=strUSER
command[0].parameter[2].name=strPASSWORD
command[0].parameter[2].displayname=strPASSWORD
command[0].parameter[3].name=strUSERID
command[0].parameter[3].displayname=strUSERID
command[0].parameter[4].name=strSTART_DATE
command[0].parameter[4].displayname=strSTART_DATE
command[0].parameter[5].name=strCmdlet
command[0].parameter[5].displayname=strCmdlet
command[0].action=powershell.exe -File "$ARCSIGHT_HOME\\sadmexch.ps1" "${strFDQN}" "${strUSER}" "${strPASSWORD}" "${strUSERID}" "${strSTART_DATE}" "${strCmdlet}"
```

> **NOTE:** change the `$ARCSIGHT_HOME` to the path where your action connector is installed. Just remember that in the properties file you need to repeat **"\\"** twice.

In case this is not your first command change the `command[0].` to the number that represents count of this command. Command count always starts from 0, so if it is your 6th command, it should be `command[5].` Also change the `command.count=1` to reflect correct count of the commands.

Save the properties file and restart the connector.

To test our new command, login to the ArcSight ESM Console, navigate to the _Connectors_ tab, right click the _Action Connector Name_ **->** _Send Command_ **->** _CounterACT_ **->** _[name of the command]_. Name of the script/command is defined in the properties file as `command[0].displayname=` value, so in our case it will be **powershell_exchange_admin_action**. 

It should present you with the screen to input the parameters, that looks something like this:

![Action Connector Parameters Window](/images/exchActionConnectorParameters.PNG "Action Connector Parameters Window")

Fill in your parameters and run the script. If everything works the output should look like the following:

![Action Connector Test Output](/images/exchActionConnectorTestOutput.PNG "Action Connector Test Output")

After testing that script is running fine from the ESM console, time is right to write a parser of the output. The parser should be placed in the `$ARCSIGHT_HOME\current\user\agent\fcp\additionalregexparsing\ngflexcounteract` folder under the name `regex.N.sdkrfilereader.properties`, where N stands for the number that is sequential to other parsers you may have. So if you alread have, say, _regex.**0**.sdkrfilereader.properties_, then your new parser should become _regex.**1**.sdkrfilereader.properties_

My final version of the parser looks like this.

```
source.field=event.message

regex=(?s).*Caller\\s+\\:\\s+(\\S+)\\s+Cmdlet\\s+\\:\\s+(\\S+)\\s+FullCommand\\s+\\:\\s+(.+)\\s+RunDate\\s+\\:\\s+(\\S+\\s+\\S+\\s+\\S+)\\s+ObjectModified\\s+\\:\\s+(.+)\\s+

token.count=5
token[0].name=caller
token[0].type=String
token[1].name=cmdlet
token[1].type=String
token[2].name=fullCommand
token[2].type=String
token[3].name=runDate
token[3].type=String
token[4].name=objectModified
token[4].type=String

event.sourceUserName=caller
event.destinationUserName=objectModified
event.deviceCustomString1=cmdlet
event.deviceCustomString1Label=__stringConstant("cmdlet")
event.deviceCustomString2=fullCommand
event.deviceCustomString2Label=__stringConstant("Full Command")
event.deviceCustomString3=runDate
event.deviceCustomString3Label=__stringConstant("Run Date")
```

What happens in this parser is pretty straightforward. The regex picks up 5 groups based on the output. Those groups are assigned to 5 tokens, that are called accordingly. Each token than is assigned to specific field in ESM. As you can see we use the following mapping:
<center>
<table>
	<th>ESM Field</th>
	<th>Script Output Field</th>
	<th>Description</th>
	<tr>
		<td>sourceUserName</td>
		<td>Caller</td>
		<td>Admin account that made a change</td>
	</tr>
	<tr>
		<td>destinationUserName</td>
		<td>ObjectModified</td>
		<td>Object that was changed</td>
	</tr>
	<tr>
		<td>deviceCustomString1</td>
		<td>Cmdlet</td>
		<td>What Cmdlet was used</td>
	</tr>
	<tr>
		<td>deviceCustomString2</td>
		<td>FullCommand</td>
		<td>The full command that was used to make the change</td>
	</tr>
	<tr>
		<td>deviceCustomString3</td>
		<td>RunDate</td>
		<td>Change timing, timing than command was actually run</td>
	</tr>
</table>
</center>

Once parser is done and saved, run the test again. If everything is correct it should fill in required ESM fields. Otherwise dig into the connector's `agent.log` to see what can be the problem. Usually it is the parsing or script runtime errors.

If everything works and script extracts the audit log and parses the data, we are ready to automate it with the help of the rule. 

Let's create standard rule *Exchange Events - Admin Actions*. Next we define several variables that we shall pass to the action connector as parameters:

![Admin Action Rule Variable](/images/exchRule1Variables.PNG "Admin Action Rule Variable")

Define them as follows:

<center>
<table>
	<th>#</th>
	<th>Variable Name</th>
	<th>Description</th>
	<tr>
		<td>1</td>
		<td>usertoLower</td>
		<td>Function: ToLower. Arguments: Attacker User Name</td>	
	</tr>
	<tr>
		<td>2</td>
		<td>strDate</td>
		<td>Function: AliasField. Arguments: End Time</td>	
	</tr>
	<tr>
		<td>3</td>
		<td>strFDQN</td>
		<td>Function: Concatenate. One string defines hostname with "." and other string defines domain or is empty</td>	
	</tr>
	<tr>
		<td>4</td>
		<td>strUSER</td>
		<td>Function: Concatenate. One string defines username and other is empty</td>	
	</tr>
	<tr>
		<td>5</td>
		<td>strPASSWORD</td>
		<td>Function: Concatenate. One string defines password and other is empty</td>	
	</tr>
	<tr>
		<td>6</td>
		<td>strCmdlet</td>
		<td>Function: AliasField. Arguments: Name</td>	
	</tr>
</table>
</center>

Next we add this variables into the Aggregation, otherwise we will not be able to pass them as parameters to the rule action. 

![Admin Action Rule Aggregation](/images/exchRule1Aggregation.PNG "Admin Action Rule Aggregation")

The conditions for the rule are defined as events from your ArcSight Exchange PowerShell connector, not of correlation type and falling under the Admin Audit Log category of the events. 

![Admin Action Rule Conditions](/images/exchRule1Conditions.PNG "Admin Action Rule Conditions")

> **Note:** A piece of advice. Create this conditions as the separate filter and observe for a day or two what sort of events it catches. Restrict it further to eliminate automated or regular maintenance works.

Finally we add action be done *On Every Event* to execute connector command. Select the Action Connector you have installed and configured, select the PowerShell script and supply the parameters with the variable names that you have created in the rule with the **$** in front of every variable.

![Admin Action Rule Variables](/images/exchRule1ActionsVariables.PNG "Admin Action Rule Variables")

It should look close to something like this

![Admin Action Rule Actions](/images/exchRule1Actions.PNG "Admin Action Rule Actions")

Finally save the rule, deploy to the real-time processing and run some tests to see if it works. 

### Final Thoughts

For the time being this approach is more of a PoC rather than completely reliable way to extract the audit log from the exchange. I am not sure if this is the ArcSight's ESM or Connectors fault, but output of the script may not be picked up in the ESM, despite successful script run. I can verify succeful run by the logs, but any call to the support usually ends up in total frustration once Action Connector is mentioned. It seems like an automatic "Call our professional services team" response. That is why more digging is required. 

To continue with the review and tinkering I went on to create two reports:

1. Count of admin events of the standard ArcSight PowerShell exchange connector and the Action Connector.
2. Details of the admin events of the standard ArcSight PowerShell exchange connector and Action Connector. 


My next project is to start slowly replacing the standard powershell connector with the customized flex connector.

