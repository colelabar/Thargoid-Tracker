# Discord Bot for Tracking Thargoid Kills

*Note: This bot is not affiliated with or endorsed by Frontier Developments PLC*

## Technologies Required to Run
- [Heroku](https://heroku.com) Deployment (I used JawsDB as my data store)
- A [Discord Application](https://discordapp.com/developers/applications/)
- [npm](https://www.npmjs.com/)

## Usage
To get started with the application, ensure you have the following:
  - A forked or cloned version of this repo to link to. Clone it locally as well, so you can edit it.
  - A Discord Application through the Developer portal linked above. You'll also want to attach it to a Discord server for testing and use!
  - A shell Heroku app, preferably with your datastore (like JawsDB) already attached. Make sure you link your Github repo to the app so you can update and deploy the app with ease. The included Procfile should contain the necessary requirements for the initial Heroku deployment to succeed.

The first order of business is to get the dependencies installed. Use `npm install` to install all of the necessary dependencies into the project.

Next up is to get all of your configurations initialized. Using both your Discord app and the Heroku DB configurations they provide, edit the `config.json`, `main.js`, and `package.json` files to reflect those values.

## Available Commands
The following commands are available for users to access the bot:
- `!kills`
  - This is the main command used for adding information to the bot. Available arguments are as follows: Note that the `< >` are placeholder delimiters and are not to be used in the command. You must use underscores for system names with spaces in them.
    - `!kills < system_name > scout < integer >` Adds scout kills to the DB. Also accepts `scouts`.
    - `!kills < system_name > cyclops < integer >` Adds cyclops kills to the DB.
    - `!kills < system_name > basilisk < integer >` Adds basilisk kills to the DB.
    - `!kills < system_name > medusa < integer >` Adds medusa kills to the DB.
    - `!kills < system_name > hydra < integer >` Adds hydra kills to the DB.
  - While not directly kill related, the following commands are still listed under the `!kills` command.
    - `!kills < system_name > cz < integer >` Adds Combat Zone completions to the DB. Also accepts `CZ`.
    - `!kills < system_name > bond < integer >` Adds Pilot Federation bonds handed-in to the DB. Also accepts `bonds`.
    - `!kills < system_name > mission < integer >` Adds AX mission completions to the DB. Also accepts `missions`.

- `!status < system_name >`
  - This is the syntax for checking the status of a system. Returns a complete output of the information added to the system. You must use underscores for system names that have spaces in them.

- `!clear < system_name >`
  - This is the syntax for clearing a system in the DB. This removes the system and all of its information from the DB, and is currently not blocked by user permissions. You may wish to add user restrictions on this command if your user-base is not to be trusted lightly.

### Note
If you have multiple bots present on your Discord server, the potential for conflicting commands exists. If this happens, you can always adjust the `!` prefix in `config.json` to something else. Just be sure to update your documentation and the codebase in `main.js` to match!
