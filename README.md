#Discord Bot for Tracking Thargoid Kills

*Note: This bot is not affiliated with or endorsed by Frontier Developments PLC*

## Technologies Required to Run
- [Heroku](https://heroku.com) Deployment (I used JawsDB as my data store)
- A [Discord Application](https://discordapp.com/developers/applications/)
- [npm](https://www.npmjs.com/)

## Usage
To get started with the application, ensure you have the following:
  - A forked or cloned version of this repo to link to. Clone it locally as well, so you can edit it!
  - A Discord Application through the Developer portal linked above. You'll want to attach it to a Discord server for testing and use!
  - A shell Heroku app, preferably with your datastore (like JawsDB) already attached. Make sure you link your Github repo to the app.

The first order of business is to get the dependencies installed. Use `npm install` to install all of the necessary dependencies into the project.

Next up is to get all of your configurations initialized. Using both your Discord app and the Heroku DB configurations they provide, edit the `config.json`, `main.js`, and `package.json` files to reflect those values.

Also be sure to take note of the accepted arguments used by the Bot (found in `main.js`), most namely the methods for adding systems, kills, and mission tabulations to the counts. Be sure to test out these commands prior to releasing the bot onto a server, you wouldn't want all chaos breaking out!
