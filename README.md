# Squatch; an all-in-one, open-souce Discord bot 
## Developed by
* Nach#9180 (988068903152394301)
* Zitta#3759 (488912326179946497)
* Charles Bob-Omb#4695 (997653299824168980)
___
## Main features
* A support ticket system
* Self-assignable role system
* Moderation commands (banning, kicking, timing-out, and more)
* Informational commands that let you see information about a user or a server
* Join-to-create voice channels
* A leveling system
___
## How to use the bot
1. Make sure you have the latest version of Node.js installed. If you don't have Node.js, download it [here](https://nodejs.org/)
2. Download the bot's code from [here](https://github.com/BigBoyNach/Squatch/archive/refs/heads/main.zip)
3. Extract the ZIP file
4. Open a terminal in the extracted folder
5. Run `npm i` to install dependencies
6. [Configure the bot](#-configure-the-bot)
7. Finally, run `node .`
___
## Configure the bot
Add your client's token into [/config/credentials.env](https://github.com/BigBoyNach/Squatch/blob/main/config/credentials.env).

The general configuration file is located at [/config/main.json](https://github.com/BigBoyNach/Squatch/blob/main/config/main.json).

You can edit the bot's rotating status in [/events/ready.js](https://github.com/BigBoyNach/Squatch/blob/main/events/ready.js) (will be moved to a configuration file).
#
The below configuration files are located in [/config/constants](https://github.com/BigBoyNach/Squatch/blob/main/config/constants) unless otherwise mentioned.
### Required information
* Put channel IDs (like for the announcement channel) in [channel.json](https://github.com/BigBoyNach/Squatch/blob/main/config/constants/channel.json).
* Put role IDs (like for the staff and announcement roles) in [roles.json](https://github.com/BigBoyNach/Squatch/blob/main/config/constants/roles.json).
### *Optional information*
* To use the ticket system, you have to add a support role ID and a category ID in [/config/ticket/ticket.json](https://github.com/BigBoyNach/Squatch/tree/main/config/ticket/ticket.json)
* To use the the PCPartPicker command [/events/pcbuildhelp.js](https://github.com/BigBoyNach/Squatch/tree/main/events/pcbuildhelp.js), you'll need to add an API key at [/config/constants/api.json](https://github.com/BigBoyNach/Squatch/blob/main/config/constants/api.json).
	* You can get an API key from [here](https://key.japi.rest).
* All embed titles, descriptions, and colors can be modified [here](https://github.com/BigBoyNach/Squatch/tree/main/config/embed/embedMSG.json).
* To use giveaways, you must add a MongoDB database link [here](https://github.com/BigBoyNach/Squatch/tree/main/config/embed/embedMSG.json).
	* You can get a link from [here](https://www.mongodb.com/cloud/atlas/register).
*  To use the self-role system, you need to add the IDs of the roles that can be given to [interactionCreate.js](https://github.com/BigBoyNach/Squatch/blob/main/functions/interactionCreate.js) (will also be moved to a configuration file).
___
## Issues
If you have any issues with the bot, then let us know [here](https://github.com/BigBoyNach/Squatch/issues/new).
___
## Pull requests
If you find any problematic code that you can fix, or you have an enhancement you would like to make, you're more than welcome to create a [pull request](https://github.com/BigBoyNach/Squatch/pulls) and explain what you want to be changed.
___
## TODO
* Add a ghost ping detector
* Change the layout of the ticket-closing embed
* Move some configurations to files (rotating status,self-roles, giveaway DB link)
* ~~Explain to Charles why he should live his life instead of spending an hour on this README update~~