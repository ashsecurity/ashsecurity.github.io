---
layout: post
title: "Unsolicited background checks suck"
description: "Getting a job is hard especially if you are not looking"
headline: "How to authorize background check"
categories: 
- career 
tags: "career"
comments: true
featured: false
imagefeature: jobhunt.jpg
published: true 
---

### Intro 

About two months ago couple of my ex-colleagues contacted me to inform that some recruiter was calling them to verify my credentials and work history. I did not authorize any recruiter to do so, in fact I was not even looking for a new workplace.

### Why all the fuss?

Simple, an infosec guy naturally assumes the worst. So I did, hence the post :) 

### Sometimes old school is the best...

I hate the "call-to-action" posts on social media, especially those on LinkedIn. They have all the attributes of SPAM and it is never a good thing. However, when I found out about the unsolicited background checks I had to send a warning to my connections and the unknown recruiter, because with such calls there is some chance of social engineering threat. Anyone working in the security industry knows that one can get all sorts of intel about the company if question is formulated properly. 

The question was how to do it in the right way and not to offend those who genuinely wanted to help and I figured it would be the best to do it the way Certificate Authority works. 

Just as a client asking the trusted CA server to verify if the presented certificate is trustworthy, I would appoint myself as the certificate authority to act as the trusted third party for the recruiters and my colleagues. Therefore, in one post I asked my LinkeIn connections to direct the recruiter to contact me first prior to disclosing any information. I could verify, by sending the separate message, that:

<ul> 
    <li>Background check is valid and I know of it; </li>
    <li>Recruiter may ask any questions. </li>
    <li>...Profit</li>
</ul>

That way the recruiter's request would be authorized and my colleague would know that it is safe to provide the information. 

### Post template

Template I have used is quite simple:

>Hi Folks, 
>
>I Would like to put a little update and request. Recently I have been notified about some recruiter trying to do background check on me. Just to let you know I did NOT authorize any recruiter to do so and at this moment NOT looking to move away from my position.
> 
>In case you receive such calls, please ask the recruiter to contact me first so I could directly send you request to provide the information. Certainly do not give out any personal or confidential details about yourself or the company you are working with. Examples would be questions about tech your company has or uses, mobile phones or emails of your superiors and such, places of your origin. 
>
>I might sound paranoid and it could be "legit" recruiter, but I would still rather over think when it comes to such activity than chill and let you be compromised. 
>
>Also, I would like to ask the recruiters that I have as my connections. Please reach out to me before doing any background check.

### What not to give out during background check. Never.

Even if the background check has been verified, it is important to draw a fine line between disclosure of helpful information and leaking sensitive data. 
Below is some info that you should never disclose to anyone during the phone call with any recruiter. 

<ul> 
    <li>Details about tech and solutions your company uses, other than generic terms like IPS, firewall, AV solution, etc; </li>
    <li>Details of organizational chart, specific names of employees, their titles or contact details;</li>
    <li>Project details, other than performance;</li>
    <li>Contact details, even if recruiter promises you to find a job as well;</li>
    <li>Detailed descriptions of the business processes, products or services;</li>
    <li>Exact locations of sensitive sites;</li>
</ul>

The rule of thumb is to try and generalize your answers, to avoid being specific about what your company uses. In fact I would give same advice to someone preparing for the interview. There is nothing wrong with protecting the data entrusted to you by the company.

###### Mentions

<small>I do not know the author of the feature photo. <a href="http://www.thepaperwall.com/wallpaper.php?view=f17a39991bff257ddc67e48d0b75032de8c4736c&fol=humor"> This </a> and <a href="https://www.howtogeek.com/115155/stormtrooper-is-looking-for-a-new-job-wallpaper/">this</a> links have led me to it.</small>