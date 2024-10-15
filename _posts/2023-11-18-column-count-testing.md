---
title: "Lessons in cross-browser testing, column-count, display, and more"
date: 2023-11-18
---

I recently came across unexpected behaviour of columns I had created using the [column-count CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count).  
&nbsp;  
&nbsp;
The short version is that I had used the map() Javascript method to map images*, which would be arranged into two columns. I set "column-count: 2" on the parent container of the images. This is an easy way to create the masonry effect that is common on websites like Pinterest, with the downside being that someone tabbing through the images with a keyboard will have to look through them top to bottom, left to right, instead of left to right, top to bottom.  
&nbsp;  
&nbsp;
This looked fine on my computer, until I started testing the website on other devices. I noticed that on an iPad mini with an older version of Chrome (117.0.5938.117), the top of the second column was not aligned with the top of the first column. It had shifted down by about 10 pixels. At first I thought it must be because of the older Chrome version and I added the -webkit- prefix to my CSS, assuming that would fix the problem. But after making that adjustment and redeploying the website, the problem persisted, and on checking, I found that [column-count should be supported for Chrome 117](https://caniuse.com/?search=column-count). Checking the website on Safari on the same device, the same problem was there.  
&nbsp;  
&nbsp;
I didn't want to have to redeploy my website every time I was testing a potential solution. So I discovered that I could run a local development server on my PC and access it from another device. I was using Gatsby, and all I had to do was specify the host to be my IP address when I ran gatsby develop; for example: "gatsby develop --host=192.168.1.2". Then I could open the development website on the iPad I was seeing the issue on and start troubleshooting.  
&nbsp;  
&nbsp;
Although this was helpful for testing on the specific device I had at hand, the iPad mini, I wanted to see what other devices had the same problem. I found [BrowserStack](https://www.browserstack.com/) and, unfortunately, due to their limited free trial, only had 1 minute to test the site on various devices and would also need to set up a way to view the development site. This was starting to feel unneccessarily complicated, so I ultimately created [this webpage](https://emoore29.github.io/Column-Count-Tester/) to let me quickly view the page on various devices/browsers and see if the columns looked different. I've explained what I found there.  
&nbsp;  
&nbsp;
In summary, this was a useful lesson in being precise with my CSS styles, a valuable refresher on the behaviour CSS of "display" property types, and a reminder that just because it looks right on my screen, it might not look right on another.  
&nbsp;  
&nbsp;
*Importantly, img elements have a display of inline-block by default. So I really shouldn't have stumbled on this problem at all. I had been using Gatsby Images, and I had applied "display: flex" to my images because I had been having trouble getting them to display the same way an img element would. After a certain point I had forgotten I ever did that, and despite it being unnecessary, it stayed in my CSS until I came back to it to uncover this "bug".
