# Swivy - A quick travel card creator 
## Concordia Web Development Bootcamp Final Project

When you are traveling, where do you keep track of the places you have visited? In a small notebook that you bought at the beginning of the trip? Or in a notes folder on your phone with scattered titles and timelines? Well Swivy has got you covered.

---
## Goal

*Swivy*'s goal is to compile all of your information into the same place, while providing you with the necessary tools to track details that *you* want to remember years down the line. The goal of this website is to allow you to keep tabs on the most crucial information of your travels in a swift, logical and  easy to use manner.
## Features
Log in, click on the **+** button, and you will be on your way to creating your first *Travel Card*! Each travel card will require the minimum: a destination and a timeline. These two pieces of information will help you sort your cards once you visit your homepage.



Do you want to add more information? The basic travel card creation page also allows you to log an activity, upload a photo and even add your own notes! 

Finally, you will also be able to keep an eye out on the forecast trends of your travel date with the simple addition of a city name. Here is a sample of a travel card:

![sample of travel card, created in the latest MVP version of the site on 2022-09-06](client/src/images/SwivyEXAMPLEcard.png)

---
## Swivy is a website that uses the MERN stack:
- MongoDB - A document databsase that stores each unique user and their travel cards
- Express.js - A webframework for Node.js, used in back-end
- React.js - A client-side JavaScript framework that allows smooth webpage transitions and an easy user experience
- Node.js - A JavaScript based, open source server environment that adds, deletes and modifies data in the MongoDB

## APIs involved
Swivy uses the power of **Auth0** - (https://auth0.com/) to verify users via their google accounts. In a day and age where your information is valuable, Swivy only requires your google email for verification and use of the website.

The weather data is powered by Weather API - (https://www.weatherapi.com/) and renders accurate historical weather, as well as the current forecast of a specified city. 

Images uploaded to Swivy are saved in a cloud database, Cloudinary - (https://cloudinary.com/) and returns shows off your media in each travel card.

---
## Created by:
Bernard Li - https://github.com/Bernard-Li 

*Swivy* - A website soon to be hosted on GitPages for all to use. 


