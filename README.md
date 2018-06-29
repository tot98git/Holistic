# Holistic
An accessibility checker tool developed with node and react during Balkan Hackathon 2018.<br>
## 📝Description
This tool uses <a href="https://github.com/GoogleChrome/puppeteer">Puppeteer</a> to scrape the web, extract elements of interest (in this context form elements), and evaluate them for the attributes they (don't) have.
In the back end there is a calculation of number of occurences the missing attributes don't appear.
There is also a script generated to "fix" the webpage and add accessibility functions to the given webpage. The script's primary function is to traverse to the previous sibling of the form element to get the inner textual content and then add it to the initial element, under the attribute, aria-label.

## ⌨️Technologies
This project uses Node & Express for back-end functions and React for front end, 

## 💻Usage
The project is not deployed anywhere yet, so in order to use it, users are welcomed to clone this project in their local systems and run it from there. As such, users are welcomed to customize the scraping based on their needs and ideas.
