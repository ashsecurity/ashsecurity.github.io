---
layout: post
title: "Information security risk assessments and security mindset"
description: "How important is the security mindset in risk assessments"
headline: "Security Mindset FTW"
categories: 
- Risk-Management 
tags: 
- Risk-Management
comments: false
mathjax: null
featured: false
imagefeature: "DC.jpg"
published: true
comments: true
---
One of the core activities of information security (infosec) governance is risk assessment. Unfortunately, it is often conducted as just another "compliance requirement" and is not expected to bring real value to organization. 

In ideal world we would have companies with mature business processes and management fully understanding the role of technology, its importance for organization's future as well as difference between information technology and information security. Realistically not many companies can afford or, due to various reasons, want to have independent security department or function. This often means that information security becomes part of IT responsibilities so information security risk assessments are conducted by IT professionals. The problem is that despite many publications and discussions the line between IT risks and security risks remains blurred. For business management it is almost always non-existent because from business perspective information security looks like part of technology domain. Management assumes that since IT manages technology, it should, therefore be capable to identify and solve all technology-related problems, including information security issues. 

In real world IT professionals are not always well trained or experienced to identify information security risks. You can feel that someting is wrong with your health or body, you may identify some of the symptoms but making the correct diagnosis requires proper skill set. Same applies to IT and infosec domains. IT professional may feel that someting is wrong with the set-up or infrastructure and even identify certain and obvious issues such as missing or not configured firewall, unpatched server, etc. However, without proper skill set and experience it would be not possible to achieve comprehensive and valid results of infosec risk assessment. 

While both IT and infosec risks may, although not necessarily, originate from technology domain, IT risk has different characteristics to information security risks. To identify infosec risks one should apply different mindset. The concept is discussed in the article ["The security mindset"](https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html) written by Bruce Schneier. The following quote explains the premise: "Security requires a particular mindset. Security professionals -- at least the good ones -- see the world differently. They can't walk into a store without noticing how they might shoplift. They can't use a computer without wondering about the security vulnerabilities. They can't vote without trying to figure out how to vote twice. They just can't help it." 

Consider typical design of placing user home directories on file servers. Assume that systems administrator placed files in different folders on the file server. Each of those folders is shared with corresponding individual users, so every user can see only his/hers shared folder in the explorer. Shared folders access rights would be inherited from parent folder. For system administrator busy with multiple tasks, there would be no risk in this setup. The fact that someone can try to guess the folder name structure and map folders of other users to check out their files may not cross admin's mind. If the same admin would be tasked to conduct risk assessment, that particular risk would go unnoticed. 

The **"security mindset"** plays a big role in infosec risk assessments, but often it is one of those "weakest links". Risk assessments are complex exercises, just like jigsaw puzzles. It is important to plan them, have well defined approach, but more importantly right people with proper experience and skill set. Assessor should be prepared to see bigger picture and apply scenarios that are usually not considered because of their abnormality to planned operations. One should be willing to challenge people's responses to dig out potential weaknesses. Otherwise your risk assessments will remain just "compliance requirement".
