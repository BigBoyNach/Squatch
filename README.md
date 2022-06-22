# Welcome to the GitHub page of the Squatch
#### This discord bot is designed to attempt to replace all of those bots in your Discord server.


# Pre-Warning
* The bot is very buggy sometimes, if you would like to see what the known issues are, please go to the [issue](https://github.com/BigBoyNachash/Squatch/issues) or scroll down


# People who helped in the creation or testing of the bot
* Nachash#9180 (988068903152394301)


[Support server] - currently none

# Main features of the bot
* A ticket system
* Button based reaction role system (althought you have to set up the roles)
* Moderation commands
* Role based system instead of permission based
* Utility commands
* Has a slash command handler
* server and user info
* Management commands
* Join to create voice channels
* Leveling
* Antiswear feature




# Add the needed information
You can customize all of the related channel ids at the [channel.json file](https://github.com/BigBoyNachash/Squatch/blob/main/config/constants/channel.json).
You can customize all of the related role ids at the [role.json file](https://github.com/BigBoyNachash/Squatch/blob/main/config/constants/roles.json).

If you would like to use the ticket system in the bot then you also have to add a ticket support role id and a category id in [/config/ticket/ticket.json](https://github.com/BigBoyNachash/Squatch/tree/main/config/ticket/ticket.json)

If you decide to keep the pcbuildhelp.js file at [/events/pcbuildhelp.js](https://github.com/BigBoyNachash/Squatch/tree/main/events/pcbuildhelp.js) then you will need to add an API key at [/config/constants/api.json](https://github.com/BigBoyNachash/Squatch/blob/main/config/constants/api.json). You must enter in the correct id's for everything at [/config/constants/](https://github.com/BigBoyNachash/Squatch/tree/main/config/constants) And you must also add a few ID's at [/config/ticket/ticket.json](https://github.com/BigBoyNachash/Squatch/tree/main/config/ticket/ticket.json).


To be able to get access to an api key, you could get one from [this website](https://docs.japi.rest/#pc-part-picker=)


To add your bots token, you can add the token at [/config/credentials.env](https://github.com/BigBoyNachash/Squatch/blob/main/config/credentials.env). To change some other things about the bot you can change it at [/config/main.json](https://github.com/BigBoyNachash/Squatch/blob/main/config/main.json). To change the bots presence you can edit it at [/events/ready.js](https://github.com/BigBoyNachash/Squatch/blob/main/events/ready.js).


All of the commonly used embed titles and descriptions are in a [file](https://github.com/BigBoyNachash/Squatch/tree/main/config/embed/embedMSG.json) - you can change the colors of specific embed colors and change what the text would be in the embed




# [Pull requests](https://github.com/BigBoyNachash/Squatch/pulls)
If you decided to help out with the bot and you found a few lines of code that could cause a problem or think you have a better way of doing something then you're more then welcome to create a pull request and show the code you would like to change and explain the difference.



# To-Do

* Add a ghost ping detecter to the bot 



# [Issues](https://github.com/BigBoyNachash/Squatch/issues)

If you found any issues that are related to the bot, then you can create an [issue](https://github.com/BigBoyNachash/Squatch/issues).


# Currently Known Issues

* Its hard to tell the difference between capitalized and none capitalized letters 

* deletemsg not working

* Once you close the ticket - the Message sent to the user doesnt look nice (Not an issue but im going to work on it)



# Where to install the bot

* The bot seems to break when its hosted locally on a windows machine so i suggest you use linux 


# How to install the bot

* If you don't have [**Node.js**](https://nodejs.org/en/) then install the latest node version first.

* Download the bot's code from here [GitHub page](https://github.com/BigBoyNachash/Squatch/archive/refs/heads/main.zip).

* Extract the zip file.

* After extraction, open the folder and then open command promp in the codes directory.

* Once you're in the command prompt run the command `npm install`

* **Add all of the necessary information in the config folder**



# If you use git then run these following commands.

```
git clone https://github.com/MrXez/Squatch

cd Squatch

npm i

node .
```



# How to invite the bot to your discord server

* https://discord.com/oauth2/authorize?client_id=clientid&permissions=permissionlevel&scope=applications.commands%20bot

* use [this website](https://discordapi.com/permissions.html) to caculate the permission needed - i suggest you use 8 (administrator perms)

* please make sure you put your bots client id in the correct place





# What you need to use the bot

* A valid bot token along with its client id

* invite the bot to a server and you will need the server id (please note that the bot will only work in one server)

* you will require to put the [multiple channels ids] (https://github.com/BigBoyNachash/Squatch/blob/main/config/constants/channel.json) at the channel file and you will require to do the same with the roles at the [role json file](https://github.com/BigBoyNachash/Squatch/blob/main/config/constants/roles.json) 

* You also need a valid [mongodb database link](https://www.mongodb.com/) for the giveaway command

* the "appeallink" section in [main.json](https://github.com/BigBoyNachash/Squatch/blob/main/config/main.json) is there so people that were banned have a chance to apply for an unban - this can either be a discord invite link to another server or a link to a forum

* To use the reation roles system you need to go to [interactionCreate.js](https://github.com/BigBoyNachash/Squatch/blob/main/functions/interactionCreate.js) and add the role ids that are related to the roles you want to give. 
