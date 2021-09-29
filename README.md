# Fetch Posts from Facebook using Graph Api in Node JS

# How to use

## 1- Make a facebook developer account
Go to `https://developers.facebook.com/` and login<br />
Create app for your project<br /><br />

## 2- Get your Fcebook App info 
Go to Settings > basic. Copy 'App ID' & 'App Secret' of your app<br /><br />


## 3- Clone this github-repository
Open code in editor and go to config/env.js<br />
Paste your 'App ID' and 'App Secret'<br /><br />


## 4- Edit the .env file
Paste your databse and facebook app credentials in .env file  

## 5- Run the migrations
Run this code in terminal <br /><br />

```
npx sequelize-cli db:migrate
```

## 6- Run the code
Now run this command in terminal <br /><br />

```
node app.js
```

## 7- Open into browser
Open a browser and go to `http://localhost:5000/`.<br />
Login page will be displayed.<br />
Click on login button.<br />
It will redirect you to facebook login screen. Enter your authenicated credentials.<br />
You will be logged in. Yayyyyyy<br />