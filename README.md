# OPEN-AI
This project demo is here: http://18.224.51.178/

https://platform.openai.com/docs/api-reference/chat/create?lang=node.js

[June 7th Update]
* App may not be working today. Will update tomorrow.
* Still need to test on different browser and devices
* Having CORS policy issues with downloading images from Image chat.

------------

This project is made to test OPEN AI's API. I just wanted to build something cool, and learn a little more about AI development. This web app has 3 pages: Text Chat, Image Chat, and Translation Chat (best names I could come up with lol).

## Text Chat
Ask Alfred, this Apps AI, anything. Just don't say anything funny because he has absolutely no humor at all. Unless you ask to make a joke, and that's a whole other rabbit hole to deal with.

## Image Chat
Generate an image based off a prompt. Want to see what a Dog with specifically 4 oranges on their head looks like? For whatever reason? Search it up.

Also gives the user the ability to Download each image.

## Translation Chat
This chat simply takes an audio file and translates the audio to English.
Formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.

## A lil' about the Tech Stack ~
[OpenAI 3.2]\
Angular 14.2.7 (I love Angular's modularity, scalibility, TypeScript integration, and dependency injection <3)\
Ionic 7\
NodeJS 18.12\
AWS EC2 T2.MIRCO Instance w/ Amazon Linux 2023\
NGINX (Web Server)

## Upcoming Additions
[No Capacitor for Native iOS & Android Apps .. yet]\
[No application server .. yet]\
[No database .. yet]

------------

## Setting Up with Angular

If you want to clone this project and run it locally on your machine, please follow these instructions.

1) Make sure you have NodeJS (18.12.0) & NPM (8.19.2) installed on your machine. These were at least the versions I had creating this project.

2) Make sure you download the Angular CLI.
* This will enable you to run & build Angular projects Locally on your machine.
* https://angular.io/cli
* This project uses Angular 14.3.0, but Angular CLI 14.2.11

3) Make sure you run `npm install` to install all of the packages in package.json FIRST before you run the app.

4) Run `ng serve` for a dev server. 
    * Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

5) Run `ng serve --host [ip address]` for a dev server that runs over your network. This way, you can test it on different devices on the same network.
    * ng serve --host 192.0.123.444 (example)
    * If you dont know your IP addres, use `ifconfig [MAC]` to check your network settings.


