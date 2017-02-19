---
layout: post
title: "Antimalware Strategy and cleaning up the act in the midst of plague"
description: "Antimalware strategy"
headline: "Control the malware infections with proper process"
categories: 
- strategy 
- Malware
- infosec management
tags: "antivirus malware strategy"
comments: true
featured: false
imagefeature: laundry.jpg
published: true 
---

#### Funny joke, that is partially a joke 

<center>
<br>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Antivirus isn&#39;t a condom, it&#39;s a sex offender registry.</p>&mdash; SwiftOnSecurity (@SwiftOnSecurity) <a href="https://twitter.com/SwiftOnSecurity/status/766464627987259392">August 19, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<br>
</center>

### Intro
So lets assume business environment in your company is quite liberal and user-friendly. Now that you took over security operations you realize just how bad the whole situation is with malware infections. You have AntiVirus (AV) solution installed, but something is still missing, infections still happen and users complain about slow performance and lost files.

### Reasoning 
The questions you are going to ask your team is what to do with the infected machine. Sure you can play a bit and try to pull off investigative process on every infection, but if you are in the middle of viral outbreak your immediate actions should be concentrated on bringing it under control. Any organization  suffers from multiple cases of successful malware infections. AV effectiveness depends on strategy, and your strategy should fit your business requirements. 



### Prerequisites
<ol>
<li>Identify tools at your disposal</li>
<p>List out those tools that you may use to control malware infections: AV solution used, Active Directory GPO to enforce policies, Excel to analyze data, command tools, etc.</p>
<li>Decide the roles</li>
<p>I would obviously suggest Security team to investigate and confirm the infection, IT team to perform the cleaning activities and Security team to verify if all is well afterwards. Classic segregation of duties. You need to see who will participate in all process.</p>
<li>Decide the reporting channels</li>
<p>Here you might want to rely on IT ticketing system or utilize your own Incident Response System. If you decide to go for the latter you need to consider how IT will calculate their KPIs. </p>
<li>Review implemented controls</li>
<p>Make sure that you identify what has already been done and why it is not working. Take a sit with participants of the process and review policies that are implemented in AV solution, review security configuration of the endpoints, identify trends in infections, etc</p>
<li>Keep track of those requests</li>
<p>Whether you decide to use IT service desk ticketing system, simple email or special security incident response control system, just know that you need to keep track of requests with suspected infections. </p>
</ol>


### Process

Process layout will depend on your organization chart. My assumption is that your security operations team is separated from IT department and has the established agreement that IT support team  deals with endpoints and user's side, while your team report, advice and verify. 

1. Every day I would generate a 24 hour infections report. This report would filter out cleaning events on removable media and keep events related to infections only on local drives. 
2. Based on this report, PCs with suspected infections will be reported to IT service desk for checking and cleaning. Each PC would be reported separately.
3. IT service desk would update request to include user and get access to the PC. 
4. It is important that user cooperates and is involved in whole process from the beginning. Should user fail to cooperate consider escalation channels.
5. IT should follow established check and clean procedure. If machine is infected it should be scanned and cleaned. [This reddit post](https://www.reddit.com/r/techsupport/comments/33evdi/suggested_reading_official_malware_removal_guide/) is a good example of procedure to clean up the infected machine. Any comments or results of check and clean procedure should be updated in the raised request.
6. If event is false positive or infection was cleaned at the time of AV alert, support team would simply acknowledge it in the raised request. 
6. Any artifacts should be collected and preserved for Security operations team to verify. I normally ask for scan log, list of files on local drives, list of processes, list of services, installed programs, and information about user, his access privileges. 
7. Security team should verify if clean up is done and machine is malware-free. Perhaps more information should be provided, more checks to be done, etc. All this should also be reflected in the request.
8. For further improvement of the process make sure to keep appropriate metrics. For some ideas see section **Metrics** below. 

<center>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1" viewBox="138 50 595 652" width="595pt" height="652pt" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <metadata> Produced by OmniGraffle 7.0.3 
    <dc:date>2017-02-18 17:29:01 +0000</dc:date>
  </metadata>
  <defs>
    <font-face font-family="Helvetica Neue" font-size="14" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500">
      <font-face-src>
        <font-face-name name="HelveticaNeue"/>
      </font-face-src>
    </font-face>
    <font-face font-family="Helvetica" font-size="10" units-per-em="1000" underline-position="-75.68359" underline-thickness="49.316406" slope="0" x-height="522.9492" cap-height="717.28516" ascent="770.0195" descent="-229.98047" font-weight="500">
      <font-face-src>
        <font-face-name name="Helvetica"/>
      </font-face-src>
    </font-face>
    <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="black">
      <g>
        <path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/>
      </g>
    </marker>
    <font-face font-family="Helvetica Neue" font-size="8" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500">
      <font-face-src>
        <font-face-name name="HelveticaNeue"/>
      </font-face-src>
    </font-face>
    <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2" viewBox="-9 -4 10 8" markerWidth="10" markerHeight="8" color="black">
      <g>
        <path d="M -8 0 L 0 3 L 0 -3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/>
      </g>
    </marker>
  </defs>
  <g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1">
    <title>Canvas 1</title>
    <g>
      <title>Layer 1</title>
      <rect x="156" y="68.32" width="144" height="632.18" fill="white"/>
      <rect x="156" y="68.32" width="144" height="632.18" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="156" y="51" width="144" height="17.32" fill="#4c87bd"/>
      <rect x="156" y="51" width="144" height="17.32" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(161 51.464)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="0" y="13" textLength="50.008">Initialize</tspan>
      </text>
      <rect x="300" y="68.32" width="160" height="632.18" fill="white"/>
      <rect x="300" y="68.32" width="160" height="632.18" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="300" y="51" width="160" height="17.32" fill="#4c87bd"/>
      <rect x="300" y="51" width="160" height="17.32" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(305 51.464)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="0" y="13" textLength="67.424">Remediate</tspan>
      </text>
      <rect x="460.5" y="68.32" width="127.5" height="632.18" fill="white"/>
      <rect x="460.5" y="68.32" width="127.5" height="632.18" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="460.5" y="51" width="127.5" height="17.32" fill="#4c87bd"/>
      <rect x="460.5" y="51" width="127.5" height="17.32" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(465.5 51.464)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="0" y="13" textLength="8.554">V</tspan>
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="7.784" y="13" textLength="26.432">erify</tspan>
      </text>
      <rect x="588" y="68.32" width="144" height="632.18" fill="white"/>
      <rect x="588" y="68.32" width="144" height="632.18" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="588" y="51" width="144" height="17.32" fill="#4c87bd"/>
      <rect x="588" y="51" width="144" height="17.32" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(593 51.464)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="0" y="13" textLength="28.532">Impr</tspan>
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="28.28" y="13" textLength="22.554">ove</tspan>
      </text>
    </g>
    <g>
      <title>Layer 2</title>
      <rect x="154.81333" y="69.2" width="577.1867" height="188.3" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="139" y="69.2" width="15.813333" height="188.3" fill="#4c87bd"/>
      <rect x="139" y="69.2" width="15.813333" height="188.3" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(155.10267 74.2) rotate(90)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="27.179" y="13" textLength="123.942">Security Operations</tspan>
      </text>
      <rect x="154.81333" y="257.5" width="577.1867" height="251.17187" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="139" y="257.5" width="15.813333" height="251.17187" fill="#4c87bd"/>
      <rect x="139" y="257.5" width="15.813333" height="251.17187" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(155.10267 262.5) rotate(90)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="51.08994" y="13" textLength="138.992">IT Support Operations</tspan>
      </text>
      <rect x="154.81333" y="508.5" width="577.1867" height="192" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="139" y="508.5" width="15.813333" height="192" fill="#4c87bd"/>
      <rect x="139" y="508.5" width="15.813333" height="192" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(155.10267 513.5) rotate(90)" fill="white">
        <tspan font-family="Helvetica Neue" font-size="14" font-weight="500" fill="white" x="39.921" y="13" textLength="102.158">User Operations</tspan>
      </text>
      <path d="M 233.85822 102 L 233.79384 100.96986 C 233.69726 99.39247 233.31096 96.1089 232.95685 94.59589 C 232.57055 92.92192 232.05548 91.76301 230.4459 90.86164 L 229.86644 90.53973 C 228.73973 89.89589 228.25685 89.60616 227.613 89.60616 C 227.2589 89.60616 226.96918 89.67055 226.64726 89.83151 L 226.16438 90.08904 L 226.55068 89.76712 C 227.87055 88.60822 228.70753 86.83767 228.70753 84.84178 C 228.73973 81.33288 226.1322 78.5 222.9452 78.5 L 222.91301 78.5 C 219.72603 78.5 217.1185 81.33288 217.1185 84.84178 C 217.1185 86.83767 217.95548 88.60822 219.27534 89.76712 L 219.66164 90.08904 L 219.14658 89.83151 C 218.85685 89.67055 218.53493 89.60616 218.18082 89.60616 C 217.53699 89.60616 217.02192 89.89589 215.9274 90.53973 L 215.34795 90.86164 C 213.77055 91.76301 213.2233 92.92192 212.83699 94.59589 C 212.48288 96.1089 212.12877 99.39247 212 100.96986 L 212 102 L 233.85822 102 L 233.85822 102 Z" fill="white"/>
      <path d="M 231.9911 94.82123 C 231.6048 93.17945 231.1863 92.40685 229.963 91.73082 C 228.73973 91.0226 228.0637 90.60411 227.61301 90.60411 C 227.41986 90.60411 227.2589 90.6363 227.13014 90.73288 C 226.8404 90.99041 226.5185 91.24795 226.16438 91.4411 L 226.16438 91.4411 C 226.1 91.47329 226.03562 91.50548 226.00342 91.53767 C 225.64932 91.76301 225.2952 91.89178 224.9733 92.02055 C 224.32945 92.24589 223.65342 92.37466 222.9452 92.37466 C 222.237 92.37466 221.56096 92.24589 220.91712 92.02055 C 220.56301 91.92397 220.2411 91.76301 219.88699 91.53767 C 219.4685 91.31233 219.0822 91.0226 218.76027 90.70068 C 218.6315 90.6363 218.47055 90.57192 218.2774 90.57192 C 217.8267 90.57192 217.34384 90.89384 215.9274 91.69863 C 214.7041 92.40685 214.25342 93.17945 213.89932 94.78904 C 213.5774 96.20548 213.1911 99.45685 213.09452 101.00205 L 232.89247 101.00205 C 232.69931 99.48904 232.31301 96.23767 231.9911 94.82123 L 231.9911 94.82123 Z" fill="#2072b8"/>
      <path d="M 222.91301 90.18562 C 220.2411 90.18562 218.08425 87.77123 218.08425 84.80959 C 218.08425 81.847945 220.2411 79.46575 222.91301 79.46575 C 225.58493 79.46575 227.74178 81.88014 227.74178 84.84178 C 227.74178 87.80342 225.58493 90.18562 222.91301 90.18562 L 222.91301 90.18562 Z" fill="#2072b8"/>
      <path d="M 232.73004 344.50748 L 232.67202 343.5791 C 232.58498 342.15748 232.23684 339.1982 231.9177 337.83464 C 231.56955 336.326 231.10535 335.28155 229.65474 334.4692 L 229.1325 334.1791 C 228.11708 333.59883 227.6819 333.33772 227.10165 333.33772 C 226.7825 333.33772 226.5214 333.39575 226.23128 333.5408 L 225.7961 333.7729 L 226.14424 333.4828 C 227.33375 332.43834 228.08807 330.84266 228.08807 329.0439 C 228.11708 325.88155 225.76708 323.32846 222.89486 323.32846 L 222.86585 323.32846 C 219.99362 323.32846 217.64362 325.88155 217.64362 329.0439 C 217.64362 330.84266 218.39795 332.43834 219.58745 333.4828 L 219.9356 333.7729 L 219.4714 333.5408 C 219.2103 333.39575 218.92017 333.33772 218.60103 333.33772 C 218.02079 333.33772 217.5566 333.59883 216.57017 334.1791 L 216.04795 334.4692 C 214.65535 335.31056 214.19116 336.326 213.843 337.83464 C 213.52387 339.1982 213.20474 342.15748 213.08869 343.5791 L 213.03066 344.50748 L 232.73004 344.50748 L 232.73004 344.50748 Z" fill="white"/>
      <path d="M 231.07634 338.03772 C 230.7282 336.5581 230.35103 335.8618 229.24856 335.25254 C 228.1461 334.61427 227.53683 334.2371 227.13066 334.2371 C 226.9566 334.2371 226.81153 334.2661 226.69548 334.35315 C 226.43437 334.58525 226.14424 334.81735 225.8251 334.99143 C 225.8251 334.99143 225.8251 334.99143 225.8251 334.99143 C 225.76708 335.02044 225.70906 335.04945 225.68004 335.07846 C 225.3609 335.28155 225.04177 335.3976 224.75165 335.51365 C 224.1714 335.71673 223.56214 335.8328 222.92387 335.8328 C 222.2856 335.8328 221.67634 335.71673 221.0961 335.51365 C 220.77696 335.4266 220.48684 335.28155 220.1677 335.07846 C 219.79054 334.87538 219.4424 334.61427 219.15227 334.32414 C 219.03622 334.2661 218.89116 334.2081 218.71708 334.2081 C 218.3109 334.2081 217.87572 334.4982 216.59918 335.22352 C 215.4967 335.8618 215.09054 336.5581 214.7714 338.0087 C 214.48128 339.28525 214.13313 342.2155 214.0461 343.6081 L 231.8887 343.6081 C 231.6856 342.2445 231.36646 339.31427 231.07634 338.03772 L 231.07634 338.03772 Z" fill="#515150"/>
      <path d="M 222.86585 333.85994 C 220.45782 333.85994 218.514 331.684 218.514 329.0149 C 218.514 326.34575 220.48683 324.19883 222.86585 324.19883 C 225.27387 324.19883 227.2177 326.37476 227.2177 329.0439 C 227.2177 331.71303 225.27387 333.85994 222.86585 333.85994 L 222.86585 333.85994 Z" fill="#515150"/>
      <path d="M 235.77634 334.12106 L 235.10906 333.7729 L 234.93498 333.7729 L 234.4998 333.7729 L 234.20967 333.7729 L 233.60041 333.7729 L 231.7146 333.7729 L 231.01832 333.7729 L 229.13251 333.7729 L 229.13251 336.0649 L 229.24856 337.0223 L 229.24856 340.3007 C 228.90042 340.50377 228.66832 340.88093 228.66832 341.3161 L 228.66832 345.66797 C 228.66832 346.30624 229.19054 346.82846 229.8288 346.82846 L 230.9893 346.82846 C 230.9893 346.82846 230.9893 346.82846 230.9893 346.82846 L 230.9893 346.82846 L 234.32572 346.82846 C 235.37017 346.82846 236.21153 345.9871 236.21153 344.94266 L 236.21153 339.1982 C 236.93683 338.61797 237.37202 337.7476 237.37202 336.8192 C 237.40103 335.68772 236.79177 334.64328 235.77634 334.12106 L 235.77634 334.12106 Z" fill="white"/>
      <path d="M 231.01832 345.9581 C 231.1924 345.9581 231.30844 345.84204 231.30844 345.66797 L 231.30844 341.3161 C 231.30844 341.14204 231.1924 341.026 231.01832 341.026 L 230.7282 341.026 L 230.7282 336.96427 L 230.84424 336.00686 L 230.84424 334.64328 L 230.0319 334.64328 L 230.0319 336.00686 L 230.14795 336.96427 L 230.14795 341.026 L 229.85782 341.026 C 229.68375 341.026 229.5677 341.17106 229.5677 341.3161 L 229.5677 345.66797 C 229.5677 345.84204 229.71276 345.9581 229.85782 345.9581 L 231.01832 345.9581 L 231.01832 345.9581 Z" fill="#515150"/>
      <path d="M 235.37017 334.9044 L 235.37017 336.67414 L 234.35474 337.2544 L 233.3393 336.67414 L 233.3393 334.9044 C 232.643 335.28155 232.1788 336.00686 232.1788 336.8192 C 232.1788 337.63155 232.643 338.38587 233.3393 338.734 L 233.3393 344.94266 C 233.3393 345.4939 233.8035 345.9581 234.35474 345.9581 C 234.90597 345.9581 235.37017 345.4939 235.37017 344.94266 L 235.37017 338.734 C 236.06646 338.35686 236.53066 337.63155 236.53066 336.8192 C 236.53066 336.00686 236.06646 335.25254 235.37017 334.9044 L 235.37017 334.9044 Z M 234.35474 345.37785 C 234.12264 345.37785 233.91955 345.17476 233.91955 344.94266 C 233.91955 344.71056 234.12264 344.50748 234.35474 344.50748 C 234.58683 344.50748 234.78992 344.71056 234.78992 344.94266 C 234.78992 345.17476 234.58683 345.37785 234.35474 345.37785 L 234.35474 345.37785 Z" fill="#515150"/>
      <path d="M 213.03066 301.82846 L 213.03066 279 L 226.66157 279 L 232.55064 284.8891 L 232.55064 301.82846 L 213.03066 301.82846 Z" fill="white"/>
      <path d="M 231.5581 300.8359 L 231.5581 285.2861 L 226.26455 279.99255 L 214.0232 279.99255 L 214.0232 300.8359 L 231.5581 300.8359 L 231.5581 300.8359 Z M 215.01574 299.84338 L 215.01574 280.9851 L 225.60285 280.9851 L 225.60285 286.27864 L 230.56556 286.27864 L 230.56556 299.84338 L 215.01574 299.84338 L 215.01574 299.84338 Z" fill="#515150"/>
      <rect x="218.32422" y="288.92542" width="8.932873" height=".9925415" fill="#515150"/>
      <rect x="218.32422" y="291.5722" width="8.932873" height=".9925415" fill="#515150"/>
      <rect x="218.32422" y="295.8732" width="4.301013" height=".9925415" fill="#515150"/>
      <path d="M 236.7855 283.5657 C 236.42156 283.20176 235.8922 282.97017 235.36285 282.97017 C 235.06508 282.97017 234.76732 283.03634 234.50264 283.16868 C 234.27105 283.00325 234.00637 282.904 233.7086 282.904 C 233.37776 282.904 233.04691 283.03634 232.81532 283.26793 L 228.5143 287.56895 L 229.24217 288.2968 L 229.01058 288.5284 L 229.14292 288.66074 L 223.88245 293.98738 L 224.0148 294.11972 L 223.65086 294.48365 C 223.38618 294.74833 223.22075 295.14535 223.18767 295.50928 L 222.923 296.07172 C 222.75757 296.43565 222.75757 296.79958 222.95608 297.13043 C 223.15459 297.4282 223.48543 297.5936 223.81628 297.5936 C 223.9817 297.5936 224.14713 297.56053 224.31255 297.49436 L 224.875 297.2297 C 225.272 297.1966 225.63594 297.03117 225.90062 296.7665 L 226.26455 296.40257 L 226.3969 296.5349 L 231.65736 291.24135 L 231.7566 291.3406 L 236.81857 286.27864 C 237.57952 285.55078 237.54644 284.32664 236.7855 283.5657 L 236.7855 283.5657 Z" fill="white"/>
      <path d="M 236.0907 284.26047 C 235.6937 283.89654 235.13125 283.86346 234.76732 284.1943 L 234.46956 284.49207 L 233.9402 283.9627 C 233.84095 283.86346 233.64244 283.86346 233.5432 283.9627 L 229.90387 287.56895 L 230.23471 287.8998 L 230.2678 287.8998 C 230.30088 287.8998 230.30088 287.8998 230.33397 287.8998 C 230.4994 287.8998 230.6979 287.80054 230.86332 287.6682 C 231.02875 287.50278 231.09492 287.33735 231.09492 287.17193 L 233.7417 284.52515 L 234.10563 284.8891 L 230.40014 288.5615 L 231.7897 289.95105 L 236.1238 285.61695 C 236.48773 285.253 236.45464 284.6575 236.0907 284.26047 L 236.0907 284.26047 Z" fill="#515150"/>
      <path d="M 225.272 293.9543 L 225.40435 294.08663 L 225.40435 294.08663 L 225.13967 294.3513 L 224.31255 295.17843 C 224.1802 295.31077 224.11404 295.54236 224.14713 295.7078 L 223.7832 296.46873 C 223.7501 296.568 223.7832 296.60107 223.88245 296.568 L 224.6434 296.20406 C 224.8419 296.23714 225.04041 296.17097 225.17275 296.03863 L 225.99987 295.2115 L 226.26455 294.94684 L 226.3969 295.07918 L 231.26034 290.21572 L 230.13546 289.09084 L 225.272 293.9543 L 225.272 293.9543 Z" fill="#515150"/>
      <rect x="177.9291" y="187.00482" width="90" height="36" fill="white"/>
      <rect x="177.9291" y="187.00482" width="90" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(182.9291 187.00482)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="4.980469" y="10" textLength="72.81738">Create Request </tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="1.0961914" y="22" textLength="80.58594">to check malware </tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="21.376953" y="34" textLength="37.246094">infection</tspan>
      </text>
      <rect x="177.9291" y="122.60482" width="90" height="36" fill="white"/>
      <rect x="177.9291" y="122.60482" width="90" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(182.9291 122.60482)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x=".25390625" y="10" textLength="82.27051">Generate periodic </tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="1.09375" y="22" textLength="80.59082">malware infection </tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="26.938477" y="34" textLength="26.123047">report</tspan>
      </text>
      <line x1="222.9291" y1="102" x2="222.9291" y2="112.70482" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="222.9291" y1="158.60482" x2="222.9291" y2="177.10482" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(240.85822 81.276)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="1.408" y="8" textLength="29.184">Security</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".296" y="18.224" textLength="31.408">Engineer</tspan>
      </text>
      <line x1="222.75497" y1="301.82846" x2="222.7187" y2="313.4318" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(183.27273 324.85446)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="11.168" y="8" textLength="6.664">IT</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".052" y="18.224" textLength="28.896">Support</tspan>
      </text>
      <path d="M 358.46623 354.21483 C 357.4978 354.21483 356.76414 353.83332 356.50003 353.15836 C 356.2946 352.65947 356.412 352.1019 356.7935 351.7204 C 357.14565 351.36823 357.73257 350.7813 358.1434 350.3411 L 358.1434 341.009 C 358.1434 339.86448 359.05316 338.95474 360.19766 338.95474 L 376.92506 338.95474 C 378.06957 338.95474 378.9793 339.86448 378.9793 341.009 L 378.9793 350.3411 C 379.4195 350.7813 380.00643 351.36823 380.32924 351.7204 C 380.7401 352.13124 380.85747 352.65947 380.6227 353.15836 C 380.38793 353.83332 379.65427 354.21483 378.7152 354.21483 L 358.46623 354.21483 L 358.46623 354.21483 Z" fill="white"/>
      <path d="M 379.7423 352.33666 C 379.33146 351.9258 378.5391 351.13346 378.12826 350.69327 C 378.12826 350.69327 378.12826 350.69327 378.12826 350.69327 L 378.12826 341.009 C 378.12826 340.36337 377.60003 339.83513 376.9544 339.83513 L 360.227 339.83513 C 359.5814 339.83513 359.05316 340.36337 359.05316 341.009 L 359.05316 350.69327 C 359.05316 350.69327 359.05316 350.69327 359.05316 350.69327 C 358.6423 351.13346 357.84996 351.9258 357.4391 352.33666 C 357.0576 352.7475 357.4391 353.33444 358.46623 353.33444 L 378.7152 353.33444 C 379.7423 353.33444 380.15316 352.7475 379.7423 352.33666 L 379.7423 352.33666 Z M 360.227 341.009 L 376.9544 341.009 L 376.9544 350.3998 L 360.227 350.3998 L 360.227 341.009 L 360.227 341.009 Z M 370.3515 352.4834 C 366.85928 352.4834 366.85928 352.4834 366.85928 352.4834 C 366.6832 352.4834 366.5071 352.4247 366.5071 352.33666 C 366.91797 351.69104 366.91797 351.69104 366.91797 351.69104 C 366.91797 351.63235 367.0647 351.57366 367.21143 351.57366 C 369.9113 351.57366 369.99933 351.57366 369.99933 351.57366 C 370.14606 351.57366 370.26345 351.63235 370.26345 351.69104 C 370.70364 352.33666 370.70364 352.33666 370.70364 352.33666 C 370.6743 352.4247 370.52757 352.4834 370.3515 352.4834 L 370.3515 352.4834 Z" fill="#515050"/>
      <path d="M 375.71985 274.08006 L 373.8275 274.08006 C 373.3469 273.53938 372.626 273.17893 371.815 273.17893 L 371.6648 273.17893 C 371.30434 272.12762 370.28307 271.3767 369.1116 271.3767 L 368.51086 271.3767 C 367.3394 271.3767 366.34817 272.12762 365.9577 273.17893 L 365.8075 273.17893 C 364.9965 273.17893 364.3056 273.53938 363.795 274.08006 L 361.90263 274.08006 C 360.73117 274.08006 359.8 275.0112 359.8 276.18268 L 359.8 292.10252 C 359.8 293.27398 360.73117 294.20514 361.90263 294.20514 L 375.71985 294.20514 C 376.8913 294.20514 377.82247 293.27398 377.82247 292.10252 L 377.82247 276.18268 C 377.82247 275.0112 376.8913 274.08006 375.71985 274.08006 L 375.71985 274.08006 Z" fill="white"/>
      <path d="M 375.71985 274.98118 L 374.51835 274.98118 L 374.51835 290.60065 L 363.10412 290.60065 L 363.10412 274.98118 L 361.90263 274.98118 C 361.2418 274.98118 360.70113 275.52185 360.70113 276.18268 L 360.70113 292.10252 C 360.70113 292.76334 361.2418 293.304 361.90263 293.304 L 375.71985 293.304 C 376.38067 293.304 376.92135 292.76334 376.92135 292.10252 L 376.92135 276.18268 C 376.92135 275.52185 376.38067 274.98118 375.71985 274.98118 L 375.71985 274.98118 Z" fill="#515150"/>
      <path d="M 371.815 274.08006 L 370.91386 274.08006 C 370.91386 273.08882 370.10285 272.2778 369.1116 272.2778 L 368.51086 272.2778 C 367.51963 272.2778 366.7086 273.08882 366.7086 274.08006 L 365.8075 274.08006 C 364.81626 274.08006 364.00525 274.89107 364.00525 275.8823 L 364.00525 277.38417 L 373.61723 277.38417 L 373.61723 275.8823 C 373.61723 274.89107 372.8062 274.08006 371.815 274.08006 L 371.815 274.08006 Z M 369.412 274.6808 L 368.2105 274.6808 L 368.2105 273.4793 L 369.412 273.4793 L 369.412 274.6808 L 369.412 274.6808 Z" fill="#515150"/>
      <path d="M 373.5872 280.89855 L 372.5659 280.08754 C 372.44577 279.99743 372.26554 280.02747 372.17543 280.14762 L 367.7299 286.03496 L 365.44704 283.54185 C 365.35693 283.4217 365.1767 283.4217 365.0866 283.5118 L 364.1254 284.3829 C 364.0353 284.473 364.00525 284.65323 364.1254 284.74335 L 367.75993 288.85848 L 373.61723 281.28904 C 373.73738 281.1689 373.70734 280.98867 373.5872 280.89855 L 373.5872 280.89855 Z" fill="#515050"/>
      <text transform="translate(384.43754 272.4549)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="3.392" y="8" textLength="26.064">Malwar</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="29.312" y="8" textLength="6.52">e </tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="2.796" y="18.224" textLength="33.632">Cleaning </tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".052" y="28.447998" textLength="7.848">Pr</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="7.756" y="28.447998" textLength="25.04">ocedur</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="32.652" y="28.447998" textLength="4.296">e</tspan>
      </text>
      <line x1="368.77602" y1="293.304" x2="368.6386" y2="329.0548" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(380.45455 336.3608)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="1.332" y="8" textLength="35.56">Reported </tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="12.52" y="18.224" textLength="10.96">PC</tspan>
      </text>
      <path d="M 368.53985 379.4258 L 406.89787 402.6129 L 368.53985 425.8 L 330.18182 402.6129 Z" fill="white"/>
      <path d="M 368.53985 379.4258 L 406.89787 402.6129 L 368.53985 425.8 L 330.18182 402.6129 Z" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(345.5385 390.14916)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="4.86715" y="10" textLength="37.802734">Infection</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x=".7045525" y="22" textLength="23.344727">Confi</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="24.04928" y="22" textLength="22.783203">rmed</tspan>
      </text>
      <line x1="368.58503" y1="353.33444" x2="368.55733" y2="369.0258" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 514.5 376.3739 L 514.5 353.54545 L 528.1309 353.54545 L 534.02 359.43453 L 534.02 376.3739 L 514.5 376.3739 Z" fill="white"/>
      <path d="M 533.02744 375.38137 L 533.02744 359.83155 L 527.7339 354.538 L 515.49254 354.538 L 515.49254 375.38137 L 533.02744 375.38137 L 533.02744 375.38137 Z M 516.4851 374.38883 L 516.4851 355.53054 L 527.0722 355.53054 L 527.0722 360.8241 L 532.0349 360.8241 L 532.0349 374.38883 L 516.4851 374.38883 L 516.4851 374.38883 Z" fill="#515150"/>
      <rect x="519.79355" y="363.47087" width="8.932873" height=".9925415" fill="#515150"/>
      <rect x="519.79355" y="366.11765" width="8.932873" height=".9925415" fill="#515150"/>
      <rect x="519.79355" y="370.41866" width="4.301013" height=".9925415" fill="#515150"/>
      <path d="M 538.2548 358.11115 C 537.8909 357.7472 537.36154 357.5156 536.8322 357.5156 C 536.5344 357.5156 536.23666 357.5818 535.972 357.71413 C 535.7404 357.5487 535.4757 357.44945 535.17795 357.44945 C 534.8471 357.44945 534.51625 357.5818 534.28466 357.8134 L 529.98365 362.1144 L 530.7115 362.84226 L 530.4799 363.07385 L 530.61226 363.2062 L 525.3518 368.53283 L 525.4841 368.66517 L 525.1202 369.0291 C 524.8555 369.2938 524.6901 369.6908 524.657 370.05473 L 524.3923 370.61717 C 524.2269 370.9811 524.2269 371.34503 524.4254 371.6759 C 524.6239 371.97364 524.9548 372.13907 525.2856 372.13907 C 525.45104 372.13907 525.61646 372.106 525.7819 372.0398 L 526.3443 371.77513 C 526.74135 371.74205 527.1053 371.57663 527.36995 371.31195 L 527.7339 370.948 L 527.8662 371.08035 L 533.1267 365.7868 L 533.22595 365.88605 L 538.2879 360.8241 C 539.04886 360.09623 539.0158 358.8721 538.2548 358.11115 L 538.2548 358.11115 Z" fill="white"/>
      <path d="M 537.56005 358.80592 C 537.163 358.442 536.6006 358.4089 536.23666 358.73976 L 535.9389 359.0375 L 535.40954 358.50816 C 535.3103 358.4089 535.1118 358.4089 535.0125 358.50816 L 531.3732 362.1144 L 531.70405 362.44524 L 531.73714 362.44524 C 531.7702 362.44524 531.7702 362.44524 531.8033 362.44524 C 531.9687 362.44524 532.16724 362.346 532.33266 362.21365 C 532.4981 362.04823 532.56426 361.8828 532.56426 361.7174 L 535.21103 359.0706 L 535.57496 359.43453 L 531.8695 363.10694 L 533.25903 364.4965 L 537.59313 360.1624 C 537.95706 359.79847 537.924 359.20294 537.56005 358.80592 L 537.56005 358.80592 Z" fill="#515150"/>
      <path d="M 526.74135 368.49975 L 526.8737 368.6321 L 526.8737 368.6321 L 526.609 368.89676 L 525.7819 369.7239 C 525.64955 369.8562 525.5834 370.0878 525.61646 370.25324 L 525.25253 371.0142 C 525.21945 371.11344 525.25253 371.14652 525.3518 371.11344 L 526.11274 370.7495 C 526.31124 370.7826 526.50975 370.71642 526.6421 370.5841 L 527.4692 369.75697 L 527.7339 369.4923 L 527.8662 369.62463 L 532.7297 364.76117 L 531.6048 363.6363 L 526.74135 368.49975 L 526.74135 368.49975 Z" fill="#515150"/>
      <rect x="499.7727" y="470.9608" width="48.3222" height="23.5" fill="white"/>
      <rect x="499.7727" y="470.9608" width="48.3222" height="23.5" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(504.7727 470.7108)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="3.038054" y="10" textLength="32.246094">Update</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x=".5380542" y="22" textLength="37.246094">Request</tspan>
      </text>
      <rect x="339.2" y="471.12846" width="51.342344" height="23.5" fill="white"/>
      <rect x="339.2" y="471.12846" width="51.342344" height="23.5" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(344.2 470.87846)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="7.607207" y="10" textLength="26.12793">Clean</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="1.769805" y="22" textLength="37.802734">Infection</tspan>
      </text>
      <text transform="translate(435.0722 437.3033)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" fill="black" x="3.7438186" y="8" textLength="10.368">No</tspan>
      </text>
      <path d="M 330.18182 402.6129 L 318.28182 402.6129 L 314.81534 402.6129 L 314.81534 448.2205 L 314.81534 482.87846 L 327.3 482.87846 L 329.3 482.87846" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 406.89787 402.6129 L 418.79787 402.6129 L 453.3353 402.6129 L 453.3353 442.66184 L 453.3353 482.7108 L 487.8727 482.7108 L 489.8727 482.7108" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(315.7608 437.3033)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".8751749" y="8" textLength="5.184">Y</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="5.171175" y="8" textLength="8.296">es</tspan>
      </text>
      <line x1="222.9291" y1="223.00482" x2="222.83443" y2="269.10003" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 228.67455 333.91797 L 234.78035 333.91797 L 295.8458 333.91797 L 295.8458 309.0303 L 295.8458 284.1426 L 353.20412 284.1426" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <rect x="203.4" y="409.6909" width="39" height="23.5" fill="white"/>
      <rect x="203.4" y="409.6909" width="39" height="23.5" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(208.4 409.4409)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x=".33007812" y="10" textLength="28.339844">Inform</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="3.9433594" y="22" textLength="21.11328">User</tspan>
      </text>
      <line x1="222.96292" y1="343.6081" x2="222.90943" y2="399.7909" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 233.2336 672.32845 L 233.17105 671.32776 C 233.07723 669.7954 232.70197 666.6057 232.35798 665.1359 C 231.98272 663.5098 231.48237 662.384 229.91877 661.5084 L 229.35588 661.1957 C 228.26136 660.5702 227.7923 660.2888 227.16685 660.2888 C 226.82286 660.2888 226.5414 660.3513 226.2287 660.5077 L 225.75962 660.7579 L 226.13488 660.44515 C 227.41702 659.3194 228.2301 657.5994 228.2301 655.66056 C 228.26136 652.2519 225.72834 649.5 222.63243 649.5 L 222.60116 649.5 C 219.50525 649.5 216.97223 652.2519 216.97222 655.66056 C 216.97223 657.5994 217.7853 659.3194 219.06744 660.44515 L 219.4427 660.7579 L 218.94235 660.5077 C 218.6609 660.3513 218.34819 660.2888 218.0042 660.2888 C 217.37876 660.2888 216.8784 660.5702 215.81517 661.1957 L 215.25227 661.5084 C 213.71995 662.384 213.18833 663.5098 212.81307 665.1359 C 212.46908 666.6057 212.1251 669.7954 212 671.32776 L 212 672.32845 L 233.2336 672.32845 L 233.2336 672.32845 Z" fill="white"/>
      <path d="M 231.41982 665.3548 C 231.04456 663.76 230.63803 663.00944 229.4497 662.3527 C 228.26137 661.66475 227.60466 661.2582 227.16685 661.2582 C 226.97922 661.2582 226.82286 661.2895 226.69777 661.3833 C 226.41633 661.6335 226.1036 661.88365 225.75962 662.0713 L 225.75962 662.0713 C 225.69707 662.10256 225.63453 662.1338 225.60326 662.1651 C 225.25927 662.384 224.91528 662.5091 224.60256 662.6342 C 223.97712 662.8531 223.3204 662.9782 222.63243 662.9782 C 221.94445 662.9782 221.28774 662.8531 220.6623 662.6342 C 220.31831 662.5404 220.0056 662.384 219.6616 662.1651 C 219.25507 661.9462 218.8798 661.66475 218.5671 661.352 C 218.442 661.2895 218.28564 661.22695 218.098 661.22695 C 217.6602 661.22695 217.19113 661.5397 215.81517 662.3215 C 214.62684 663.00944 214.18903 663.76 213.84504 665.32356 C 213.53232 666.6995 213.15706 669.858 213.06324 671.359 L 232.29543 671.359 C 232.1078 669.88925 231.73254 666.7308 231.41982 665.3548 L 231.41982 665.3548 Z" fill="#7fba42"/>
      <path d="M 222.60116 660.8517 C 220.0056 660.8517 217.91038 658.5063 217.91038 655.6293 C 217.91038 652.7523 220.0056 650.43816 222.60116 650.43816 C 225.19672 650.43816 227.29194 652.78354 227.29194 655.66056 C 227.29194 658.5376 225.19672 660.8517 222.60116 660.8517 L 222.60116 660.8517 Z" fill="#7fba42"/>
      <rect x="195.23265" y="584.5" width="56.0168" height="36" fill="white"/>
      <rect x="195.23265" y="584.5" width="56.0168" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(200.23265 590.5)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="6.055274" y="10" textLength="33.90625">Provide</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="6.892676" y="22" textLength="32.231445">Access</tspan>
      </text>
      <line x1="222.69594" y1="650.4392" x2="223.06083" y2="630.39836" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 251.24945 602.5 L 263.14945 602.5 L 290.06925 602.5 L 290.06925 367.44993 L 290.06925 346.5848 L 348.2434 346.5848" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 379.1033 102 L 379.03893 100.96986 C 378.94236 99.39247 378.55606 96.1089 378.20195 94.59589 C 377.81565 92.92192 377.30058 91.76301 375.691 90.86164 L 375.11154 90.53973 C 373.98482 89.89589 373.50195 89.60616 372.8581 89.60616 C 372.504 89.60616 372.21428 89.67055 371.89236 89.83151 L 371.4095 90.08904 L 371.7958 89.76712 C 373.11565 88.60822 373.95263 86.83767 373.95263 84.84178 C 373.98482 81.33288 371.3773 78.5 368.1903 78.5 L 368.1581 78.5 C 364.97113 78.5 362.3636 81.33288 362.3636 84.84178 C 362.3636 86.83767 363.20058 88.60822 364.52044 89.76712 L 364.90674 90.08904 L 364.39167 89.83151 C 364.10195 89.67055 363.78003 89.60616 363.4259 89.60616 C 362.7821 89.60616 362.267 89.89589 361.1725 90.53973 L 360.59304 90.86164 C 359.01565 91.76301 358.4684 92.92192 358.0821 94.59589 C 357.72797 96.1089 357.37387 99.39247 357.2451 100.96986 L 357.2451 102 L 379.1033 102 L 379.1033 102 Z" fill="white"/>
      <path d="M 377.2362 94.82123 C 376.8499 93.17945 376.4314 92.40685 375.2081 91.73082 C 373.98482 91.0226 373.3088 90.60411 372.8581 90.60411 C 372.66496 90.60411 372.504 90.6363 372.37524 90.73288 C 372.0855 90.99041 371.7636 91.24795 371.4095 91.4411 L 371.4095 91.4411 C 371.3451 91.47329 371.2807 91.50548 371.24852 91.53767 C 370.8944 91.76301 370.5403 91.89178 370.2184 92.02055 C 369.57455 92.24589 368.89852 92.37466 368.1903 92.37466 C 367.4821 92.37466 366.80606 92.24589 366.1622 92.02055 C 365.8081 91.92397 365.4862 91.76301 365.1321 91.53767 C 364.7136 91.31233 364.3273 91.0226 364.00537 90.70068 C 363.8766 90.6363 363.71565 90.57192 363.5225 90.57192 C 363.0718 90.57192 362.58893 90.89384 361.1725 91.69863 C 359.9492 92.40685 359.49852 93.17945 359.1444 94.78904 C 358.8225 96.20548 358.4362 99.45685 358.3396 101.00205 L 378.13756 101.00205 C 377.9444 99.48904 377.5581 96.23767 377.2362 94.82123 L 377.2362 94.82123 Z" fill="#2072b8"/>
      <path d="M 368.1581 90.18562 C 365.4862 90.18562 363.32934 87.77123 363.32934 84.80959 C 363.32934 81.847945 365.4862 79.46575 368.1581 79.46575 C 370.83003 79.46575 372.9869 81.88014 372.9869 84.84178 C 372.9869 87.80342 370.83003 90.18562 368.1581 90.18562 L 368.1581 90.18562 Z" fill="#2072b8"/>
      <text transform="translate(386.1033 81.276)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="1.408" y="8" textLength="29.184">Security</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".296" y="18.224" textLength="31.408">Engineer</tspan>
      </text>
      <rect x="323.7606" y="132.90196" width="90" height="36" fill="white"/>
      <rect x="323.7606" y="132.90196" width="90" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(328.7606 138.90196)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="23.046875" y="10" textLength="33.90625">Provide</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="22.487793" y="22" textLength="35.024414">Support</tspan>
      </text>
      <line x1="368.6214" y1="123.00294" x2="368.31194" y2="101.00205" marker-start="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="368.76535" y1="178.80196" x2="368.8053" y2="262.3778" marker-end="url(#FilledArrow_Marker)" marker-start="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 222.9 433.1909 L 222.9 445.0909 L 222.9 531.84314 L 172.54902 531.84314 L 172.54902 666.293 L 203.75975 666.293" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(238.2353 656.71645)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".132" y="8" textLength="16.736">User</tspan>
      </text>
      <path d="M 376.13555 672.32845 L 376.073 671.32776 C 375.9792 669.7954 375.60393 666.6057 375.25994 665.1359 C 374.88468 663.5098 374.38433 662.384 372.82073 661.5084 L 372.25784 661.1957 C 371.16333 660.5702 370.69425 660.2888 370.0688 660.2888 C 369.7248 660.2888 369.44337 660.3513 369.13065 660.5077 L 368.66158 660.7579 L 369.03684 660.44515 C 370.319 659.3194 371.13205 657.5994 371.13205 655.66056 C 371.16333 652.2519 368.6303 649.5 365.5344 649.5 L 365.5031 649.5 C 362.4072 649.5 359.8742 652.2519 359.8742 655.66056 C 359.8742 657.5994 360.68725 659.3194 361.9694 660.44515 L 362.34466 660.7579 L 361.8443 660.5077 C 361.56287 660.3513 361.25015 660.2888 360.90616 660.2888 C 360.2807 660.2888 359.78037 660.5702 358.71713 661.1957 L 358.15423 661.5084 C 356.6219 662.384 356.0903 663.5098 355.71503 665.1359 C 355.37104 666.6057 355.02705 669.7954 354.90196 671.32776 L 354.90196 672.32845 L 376.13555 672.32845 L 376.13555 672.32845 Z" fill="white"/>
      <path d="M 374.3218 665.3548 C 373.9465 663.76 373.54 663.00944 372.35166 662.3527 C 371.16333 661.66475 370.5066 661.2582 370.0688 661.2582 C 369.8812 661.2582 369.7248 661.2895 369.59973 661.3833 C 369.3183 661.6335 369.00557 661.88365 368.66158 662.0713 L 368.66158 662.0713 C 368.59903 662.10256 368.5365 662.1338 368.5052 662.1651 C 368.16123 662.384 367.81724 662.5091 367.5045 662.6342 C 366.8791 662.8531 366.22237 662.9782 365.5344 662.9782 C 364.8464 662.9782 364.1897 662.8531 363.56426 662.6342 C 363.22027 662.5404 362.90756 662.384 362.56357 662.1651 C 362.15703 661.9462 361.78177 661.66475 361.46905 661.352 C 361.34396 661.2895 361.1876 661.22695 360.99997 661.22695 C 360.56217 661.22695 360.0931 661.5397 358.71713 662.3215 C 357.5288 663.00944 357.091 663.76 356.747 665.32356 C 356.4343 666.6995 356.059 669.858 355.9652 671.359 L 375.1974 671.359 C 375.00976 669.88925 374.6345 666.7308 374.3218 665.3548 L 374.3218 665.3548 Z" fill="#7fba42"/>
      <path d="M 365.5031 660.8517 C 362.90756 660.8517 360.81234 658.5063 360.81234 655.6293 C 360.81234 652.7523 362.90756 650.43816 365.5031 650.43816 C 368.0987 650.43816 370.1939 652.78354 370.1939 655.66056 C 370.1939 658.5376 368.0987 660.8517 365.5031 660.8517 L 365.5031 660.8517 Z" fill="#7fba42"/>
      <text transform="translate(381.13725 656.71645)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".132" y="8" textLength="16.736">User</tspan>
      </text>
      <rect x="331.628" y="584.5" width="65.6269" height="36" fill="white"/>
      <rect x="331.628" y="584.5" width="65.6269" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(336.628 596.5)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="4.46384" y="10" textLength="46.69922">Cooperate</tspan>
      </text>
      <line x1="365.3459" y1="650.441" x2="364.7404" y2="630.3955" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="523.9338" y1="470.9608" x2="524.1944" y2="386.27386" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="364.4888" y1="574.6001" x2="364.82384" y2="504.52835" marker-end="url(#FilledArrow_Marker)" marker-start="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="390.54235" y1="482.87846" x2="453.8602" y2="482.7108" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 524 161 L 569 189.9347 L 524 218.8694 L 479 189.9347 Z" fill="white"/>
      <path d="M 524 161 L 569 189.9347 L 524 218.8694 L 479 189.9347 Z" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(496.15 177.356)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x=".6884766" y="10" textLength="58.90137">More activity </tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="10.405273" y="22" textLength="36.689453">required</tspan>
      </text>
      <path d="M 479 189.9347 L 467.1 189.9347 L 465.915 189.9347 L 465.915 271.70064 L 465.915 287.7909 L 436.33754 287.7909" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(467.5 228.26085)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".8751749" y="8" textLength="5.184">Y</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="5.171175" y="8" textLength="8.296">es</tspan>
      </text>
      <line x1="524.24304" y1="353.54545" x2="524.05765" y2="228.74177" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 677.9916 102 L 677.9272 100.96986 C 677.8306 99.39247 677.4443 96.1089 677.0902 94.59589 C 676.7039 92.92192 676.1888 91.76301 674.57924 90.86164 L 673.9998 90.53973 C 672.8731 89.89589 672.3902 89.60616 671.7464 89.60616 C 671.39226 89.60616 671.1025 89.67055 670.7806 89.83151 L 670.2977 90.08904 L 670.684 89.76712 C 672.0039 88.60822 672.8409 86.83767 672.8409 84.84178 C 672.8731 81.33288 670.26555 78.5 667.07856 78.5 L 667.0464 78.5 C 663.8594 78.5 661.25185 81.33288 661.25185 84.84178 C 661.25185 86.83767 662.0888 88.60822 663.4087 89.76712 L 663.795 90.08904 L 663.2799 89.83151 C 662.9902 89.67055 662.6683 89.60616 662.3142 89.60616 C 661.67034 89.60616 661.1553 89.89589 660.06075 90.53973 L 659.4813 90.86164 C 657.9039 91.76301 657.35664 92.92192 656.97034 94.59589 C 656.6162 96.1089 656.2621 99.39247 656.13335 100.96986 L 656.13335 102 L 677.9916 102 L 677.9916 102 Z" fill="white"/>
      <path d="M 676.12445 94.82123 C 675.73815 93.17945 675.31966 92.40685 674.0964 91.73082 C 672.8731 91.0226 672.19705 90.60411 671.7464 90.60411 C 671.5532 90.60411 671.39226 90.6363 671.2635 90.73288 C 670.9738 90.99041 670.65185 91.24795 670.2977 91.4411 L 670.2977 91.4411 C 670.23335 91.47329 670.169 91.50548 670.1368 91.53767 C 669.7827 91.76301 669.4286 91.89178 669.10664 92.02055 C 668.4628 92.24589 667.7868 92.37466 667.07856 92.37466 C 666.37034 92.37466 665.6943 92.24589 665.0505 92.02055 C 664.6964 91.92397 664.37445 91.76301 664.02034 91.53767 C 663.60185 91.31233 663.21555 91.0226 662.8936 90.70068 C 662.7649 90.6363 662.6039 90.57192 662.41075 90.57192 C 661.9601 90.57192 661.4772 90.89384 660.06075 91.69863 C 658.8375 92.40685 658.3868 93.17945 658.0327 94.78904 C 657.71075 96.20548 657.32445 99.45685 657.2279 101.00205 L 677.0258 101.00205 C 676.8327 99.48904 676.4464 96.23767 676.12445 94.82123 L 676.12445 94.82123 Z" fill="#2072b8"/>
      <path d="M 667.0464 90.18562 C 664.37445 90.18562 662.2176 87.77123 662.2176 84.80959 C 662.2176 81.847945 664.37445 79.46575 667.0464 79.46575 C 669.7183 79.46575 671.8751 81.88014 671.8751 84.84178 C 671.8751 87.80342 669.7183 90.18562 667.0464 90.18562 L 667.0464 90.18562 Z" fill="#2072b8"/>
      <text transform="translate(684.9916 81.276)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="1.408" y="8" textLength="29.184">Security</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".296" y="18.224" textLength="31.408">Engineer</tspan>
      </text>
      <path d="M 674.4225 229.2401 L 659.3606 226.13456 L 659.3606 206.5696 L 674.3449 203.69697 Z" fill="white"/>
      <path d="M 669.3372 224.46532 C 669.3372 224.9799 669.7543 225.397 670.2689 225.397 L 682.1476 225.41655 C 683.351 225.41655 683.7392 224.5237 683.7004 223.82496 L 683.7004 208.60777 C 683.7004 207.6761 682.924 207.055 682.1088 207.055 L 670.2689 207.07425 C 669.7543 207.07425 669.3372 207.49133 669.3372 208.00592 L 669.3372 224.46532 L 669.3372 224.46532 Z" fill="white"/>
      <path d="M 669.89496 224.829 C 669.2291 224.829 668.68566 224.2495 668.68566 223.53863 L 668.7142 208.99752 C 668.7142 208.2879 669.2577 207.70934 669.9254 207.70934 L 681.9271 207.71586 C 682.61715 207.71586 683.11745 208.2174 683.11745 208.90466 L 683.11745 223.6439 C 683.11745 224.3318 682.61715 224.8321 681.9271 224.8321 L 669.89496 224.829 Z" fill="#008641"/>
      <path d="M 669.9257 208.6612 L 681.9274 208.66678 C 682.0712 208.66678 682.16685 208.71585 682.16685 208.90435 L 682.16685 223.6439 C 682.16685 223.83024 682.06964 223.88148 681.9274 223.88148 L 669.89496 223.87745 C 669.753 223.87745 669.6378 223.72652 669.6378 223.5377 L 669.6658 208.9997 C 669.6658 208.81367 669.7838 208.6612 669.9257 208.6612 L 669.9257 208.6612 Z" fill="white"/>
      <path d="M 672.6558 222.93088 L 672.6558 221.0306 L 676.4607 221.0306 L 676.4607 222.93088 L 672.6558 222.93088 L 672.6558 222.93088 Z M 677.40946 222.93088 L 677.40946 221.0306 L 681.2156 221.0306 L 681.2156 222.93088 L 677.40946 222.93088 L 677.40946 222.93088 Z M 672.6558 220.07905 L 672.6558 218.17628 L 676.4607 218.17628 L 676.4607 220.07905 L 672.6558 220.07905 L 672.6558 220.07905 Z M 677.40946 220.07905 L 677.40946 218.17628 L 681.2156 218.17628 L 681.2156 220.07905 L 677.40946 220.07905 L 677.40946 220.07905 Z M 672.6558 217.22474 L 672.6558 215.3226 L 676.4607 215.3226 L 676.4607 217.22474 L 672.6558 217.22474 L 672.6558 217.22474 Z M 677.40946 217.22474 L 677.40946 215.3226 L 681.2156 215.3226 L 681.2156 217.22474 L 677.40946 217.22474 L 677.40946 217.22474 Z M 672.6558 214.37323 L 672.6558 212.47015 L 676.4607 212.47015 L 676.4607 214.37291 L 672.6558 214.37323 L 672.6558 214.37323 L 672.6558 214.37323 Z M 677.40946 214.37323 L 677.40946 212.47015 L 681.2156 212.47015 L 681.2156 214.37291 L 677.40946 214.37323 L 677.40946 214.37323 L 677.40946 214.37323 Z M 672.6558 211.51923 L 672.6558 209.61615 L 676.4607 209.61615 L 676.4607 211.51923 L 672.6558 211.51923 L 672.6558 211.51923 Z M 677.40946 211.51923 L 677.40946 209.61615 L 681.2156 209.61615 L 681.2156 211.51923 L 677.40946 211.51923 L 677.40946 211.51923 Z" fill="#008641"/>
      <path d="M 673.6064 204.86155 L 660.2923 207.23916 L 660.2923 225.30818 L 673.6064 227.68765 Z" fill="#008641"/>
      <path d="M 670.2164 211.377 L 668.0869 211.49966 L 666.7919 214.36236 C 666.7602 214.45304 666.7326 214.5372 666.7074 214.6164 C 666.6804 214.6965 666.6562 214.7726 666.6369 214.84154 C 666.61736 214.90738 666.5969 214.97135 666.581 215.02725 C 666.5655 215.08502 666.55214 215.13595 666.541 215.18315 L 666.5186 215.18315 C 666.5012 215.10676 666.4835 215.03657 666.4658 214.96576 C 666.4484 214.89713 666.4276 214.8282 666.40836 214.7636 C 666.3888 214.6965 666.3683 214.63533 666.3459 214.57198 C 666.32575 214.51266 666.3034 214.4552 666.2792 214.3993 L 665.1646 211.66798 L 663.1081 211.78786 L 665.3003 216.2645 L 662.9115 220.7334 L 664.914 220.84923 L 666.2571 217.9182 C 666.2813 217.84554 666.3018 217.77815 666.322 217.71386 C 666.3416 217.65206 666.3574 217.5912 666.3723 217.5387 C 666.3891 217.48592 666.40214 217.43499 666.413 217.38996 C 666.4242 217.34617 666.4326 217.3058 666.441 217.271 L 666.463 217.271 C 666.477 217.34803 666.4928 217.4207 666.5059 217.48499 C 666.5208 217.55238 666.53475 217.6089 666.5487 217.662 C 666.5618 217.71324 666.5745 217.75952 666.58755 217.79927 C 666.5987 217.83964 666.6118 217.87038 666.62295 217.89647 L 668.0226 221.0247 L 670.28936 221.15574 L 667.6835 216.22537 L 670.2164 211.377 Z" fill="white"/>
      <rect x="622.0625" y="125.75758" width="90" height="36" fill="white"/>
      <rect x="622.0625" y="125.75758" width="90" height="36" stroke="#3e709e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(627.0625 131.75758)" fill="#3e709e">
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="23.876953" y="10" textLength="32.246094">Update</tspan>
        <tspan font-family="Helvetica" font-size="10" font-weight="500" fill="#3e709e" x="23.88916" y="22" textLength="32.22168">Metrics</tspan>
      </text>
      <line x1="667.11564" y1="101.00205" x2="667.0837" y2="115.8576" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <line x1="667.0625" y1="161.75758" x2="666.9911" y2="196.1466" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <path d="M 569 189.9347 L 580.9 189.9347 L 599.8165 189.9347 L 599.8165 168.60523 L 599.8165 143.75758 L 610.1625 143.75758 L 612.1625 143.75758" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
      <text transform="translate(569.5 179.76085)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="3.7438186" y="8" textLength="10.368">No</tspan>
      </text>
      <text transform="translate(620 206.24454)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".24" y="8" textLength="26.52">Metrics</tspan>
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x="1.352" y="18.224" textLength="24.296">Report</tspan>
      </text>
      <text transform="translate(176 285.60526)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".108" y="8" textLength="29.784">Request</tspan>
      </text>
      <text transform="translate(475.5 359.8477)" fill="black">
        <tspan font-family="Helvetica Neue" font-size="8" font-weight="500" x=".108" y="8" textLength="29.784">Request</tspan>
      </text>
    </g>
  </g>
</svg>
</center>
<br>

### Reporting

Reports are important part of your process. Especially when your tool-set is limited to standard protection and detection controls, such as Proxy, AV and IPS. Reports I consider in my daily operations include:
<p>
    <ul>
        <li>Report showing details of threats per host for the last 24 hours. This report is used to aggregate events, conduct investigation and report host to IT for cleaning. Reported hosts are counted later on as part of metrics</li>
        <li>Trend report showing number of infections per week. This report shows effectiveness of your actions.</li>
        <li>Report showing agent communications for the last 30 days. This one is to identify those hosts that may have communication problems with central console.</li>
        <li>Another useful report that shows canceled scheduled tasks. It helps to tune up those scans.</li>
    </ul>
</p>

### Metrics

To measure your performance you will need metrics, since nothing brings more clarity into whole process as the ability to measure its effectiveness. The metrics I keep in my operations are loosely based on [CIS information security metrics](https://benchmarks.cisecurity.org/downloads/metrics/). For malware control process I keep track of the following:
<p>
    <center>
        <table border="1">
            <tr>
                <th colspan="3">Period</th>
                <th rowspan="2">Metric</th>
            </tr>
             <tr>
                <td><b>Daily</b></td>
                <td><b>Weekly</b></td>
                <td><b>Monthly</b></td>
            </tr>
            <tr>
                <td>&#x2713;</td>
                <td>&#x2713;</td>
                <td>&#x2713;</td>
                <td>Number of reports of suspected infection</td>
            </tr>
            <tr>
                <td></td>
                <td>&#x2713;</td>
                <td></td>
                <td>Number of confirmed infections</td>
            </tr>
            <tr>
                <td></td>
                <td>&#x2713;</td>
                <td>&#x2713;</td>
                <td>Mean response time to take action</td>
            </tr>
        </table>    
    </center>
</p>

To do it more efficiently I have a separate excel file with some macros that automate the best part of calculations. 

**Number of reported suspected infections** helps me measure effectiveness of changes that are done to control malware infections. For instance turning on the scheduled scans may increase number of requests with suspected infections. 

**Number of confirmed infections** obviously shows effectiveness of the overall process. The less confirmed infection the better. 

**Finally mean time to respond** helps you measure average time spent on investigation and cleaning process. Ideally your mean time should be measure in hours, practically I measure it days.


### What to look for
1. If your policy is configured to delete infected file, users might and probably will complain one day about missing files that are legitimate. Probably quarantine is the best option in the beginning. 
2. If your investigation process is split between IT and Security teams, make sure to force both teams to communicate every action to user prior to the actual action.
3. Is IT service desk concerned about their KPI? If may be a blessing in disguise if used correctly, or one of the pitfalls. KPI for IT support means the need to respond quicker. What you need to make sure is that they do not miss necessary steps while scanning or cleaning the infected PC, otherwise IT support team will try to shorten their response at the cost of quality clean up.  
4. Is your scan covering enough "ground" in reasonable time period? If scan takes too long & coupled with performance hit, users will try to cancel it.  


### Conclusion 
Yes, I get it, AV struggles to keep up. According to various resources anti-virus vendors estimate that up to a million new variants of malware appear every day. It is logical to assume that time it takes for new malware to appear and hit your environment may probably be shorter than your AV update period. Nowadays, malware breaks in by the zerg rush tactics. Nothing can stop infection from happening, not even that fancy heuristic algorithm your AV solution vendor was so upbeat about. But AV solutions are not yet dead. Coupled with the proper process of cleaning up the house in the controlled manner they become useful control and protection mechanism. Every environment is different, so will be your approach. As long as it is logical and measured, I am pretty sure results will come.  

###### Mentions
<small>Feature photo is by the Spanish photograper Jorge Pérez Higuera. </small>