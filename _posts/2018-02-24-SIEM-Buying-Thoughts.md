---
layout: post
title: "What to consider before buying SIEM"
description: "Pre-buying thoughts"
headline: "SIEM considerations before getting one"
categories: 
- SIEM
tags: "SIEM"
comments: true
featured: false
imagefeature: calculation.jpg
published: true 
language: en
---

### SIEM or Log Management?

<center>
<br>
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">SIEM or Log Management? <a href="https://t.co/lVM407rrml">https://t.co/lVM407rrml</a></p>&mdash; Dr. Anton Chuvakin (@anton_chuvakin) <a href="https://twitter.com/anton_chuvakin/status/890183943093342208?ref_src=twsrc%5Etfw">July 26, 2017</a></blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<br>
</center>

Seriously, you have to decide whether you need SIEM or Log Management. This will save you a lot of effort in the future and money in the short and long run. There are few people who can give you better advice than the author of the tweet above. So before going on with this post consider reading the thoughts of Anton Chuvakin. 

### The pre-buying thoughts 

Currently there are two major licensing approaches, total Gbs per day or total Events per second. Both require same pre-planning info:
* Number of sources
* Type of sources (Windows, *nix, network devices syslog, etc.)
* Count of sources
* Forecast on increase of the sources' count

You absolutely must know and collect as much information about log events and log sources in your environment as possible. One of the main challenges you will encounter after SIEM implementation is integration of different log sources and their later normalization. Remember that sometimes normalization is a challenge even for something as trivial as Windows logs. (Normalization is the process of bringing log fields from different sources to common event fields). That is why the more you know about your infrastructure and logs it sends the better. 

When properly executed, this exercise will help you estimate number of days that will be required to plan the implementations. In general SIEM implementation is a long journey. You should plan at least 6 months project with about 200-250 mixed log sources. No matter what, do not try to cover all your sources within same project. It is better to implement it in phased approach. Your primary, most important and non-standard log sources should be implemented with the help of professional services, and standard and secondary sources can integrated by your team. It also helps your team to get more confidence and skills growth, so they will become more effective in the long run. 

Before committing to the purchase, you should have clear understanding of:
* How licensing works for all the SIEM components and how it affects you future plans of expansion. 
* What happens if your incoming logs stream exceeds licensing threshold. 
* What SIEM components will be installed, Hardware or Virtual appliances, their logical network placement and performance requirements
* How and where the collected logs will be stored. Do you actually have enough space. That also depends on your compliance requirements. If you are unsure about log retention period, as a rule of thumb, apply PCI DSS requirement of 3 months on-site and 9 months off-site, totaling to 12 months of log storage. Ask the vendor to provide their pessimistic estimation of log storage requirements for each of the components. 
* How logs will be collected. Make sure you have clear understanding of what hardware or software components you will have to provide for log collectors and how and where they will be installed.
* How standard and more importantly non-standard logs are collected and processed by the SIEM. 
* How easy it is to maintain, that is to say administer, each component of SIEM infrastructure.

### PoC thoughts
Any PoC (Proof of Concept) for SIEM solution is very difficult to run. Generally because any SIEM implementation should be tailored to your environment and include various log sources. Once again I have to stress that process of logs integration and normalization is usually very painful and depends on the different logs' types you feed into the SIEM. Unfortunately you will fully understand challenges with logs' integration only after you will get familiar with the solution.Normalization is the process of mapping the different log sources to common event fields.  
At the same time, no one likes buying without test driving. I would recommend asking integrator or distributor to provide access to demo stand. This will help you get more confidence in the capabilities of the integrator or distributor and get more familiar with the product. 

### Links

* [Understanding and Selecting SIEM/Log Management](https://securosis.com/assets/library/reports/Securosis_Understanding_Selecting_SIEM_LM_FINAL.pdf)<br>
* [Understanding and Selecting SIEM/LM: Aggregation, Normalization, and Enrichment](https://securosis.com/blog/understanding-and-selecting-siem-lm-aggregation-normalization-and-enrichmen)<br>
* [Successful SIEM and Log Management Strategies for Audit and Compliance](https://www.sans.org/reading-room/whitepapers/auditing/successful-siem-log-management-strategies-audit-compliance-33528)<br>
* [Log Management SIMetry: A Step by Step Guide to Selecting the Correct Solution](https://www.sans.org/reading-room/whitepapers/logging/log-management-simetry-step-step-guide-selecting-correct-solution-1936) 

###### Mentions
<small>Feature photo is by the Spanish photograper Jorge Pérez Higuera. </small>