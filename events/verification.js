const Discord = require('discord.js');
const Captcha = require('@haileybot/captcha-generator');
const { roleID } = require('../config/constants/roles.json');
const { verificationChannel, channelLog, captchaLogChannel } = require('../config/constants/channel.json');
const configuration = require('../config/embed/verifyMsg.json')
const verifyMsg = configuration.messages

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  execute: (client, member) => {
    const userCaptchaData = {};
    const captchachannel = client.channels.cache.get(captchaLogChannel);
    async function verification() {
      const roleObj = member.guild.roles.cache.get(roleID);
      if (member.user.bot) {
        return member.roles.add(roleObj)
      }
      const captcha = new Captcha(); // send it to a discord channel so it doesnt get deleted
      if (!captchachannel) {
        console.log("Check if you entered everything correct, Did you enter in the correct channel/role id's");
        return member.send(verifyMsg.systemFailed);
      }
      const captchaImage = new Discord.MessageAttachment(captcha.JPEGStream, 'captcha.jpeg');
      await captchachannel.send({ files: [captchaImage] });
      const Server = member.guild.name;
      const e0 = new Discord.MessageEmbed().setTitle(verifyMsg.verifyTitle).setFooter({ text: `Made by Nach#9180 - https://github.com/BigBoyNach` });
      const e1 = new Discord.MessageEmbed(e0).setDescription(`Welcome to **${Server}**\nTo gain access, please enter the captcha code from the image below - you must enter the captcha code correctly to get verified in the server`).addField('**Why did you recieve this?**', verifyMsg.WhyDidYouRecieveIt).addField('Possible Issues', verifyMsg.possibleIssues);
      const e2 = new Discord.MessageEmbed(e0).setDescription(verifyMsg.incorrectCaptcha);
      const e3 = new Discord.MessageEmbed(e0).setDescription(`You have verified yourself in **${Server}**! and you successfully recieved a role! You now have access to the server`);
      try {
        userCaptchaData[member.id] = {};
        userCaptchaData[member.id].captchaValue = captcha.value;
        const channel = await member.user.createDM();
        try {
          const embedImage = new Discord.MessageAttachment(captcha.JPEGStream, 'captcha.jpeg');
          channel.send({ embeds: [e1.setImage("attachment://captcha.jpeg")], files: [embedImage] }
          ).catch(async () => {
            const vchannel = client.channels.cache.get(verificationChannel);
            const enableDMEmb = new Discord.MessageEmbed()
              .setTitle('Enable DM\'s')
              .setDescription(`please enable DMs then run the command /verify`)
              .addField("Look at the image to learn how to enable your dm's", "Not doing so will disable your access to the server")
              .setImage('https://i.imgur.com/sEkQOCf.png');
            ;
            await vchannel.send({ content: `<@!${member.user.id}>`, embeds: [enableDMEmb] })
          });
        } catch (err) {
          console.log(err);
        }
        const filter = (m) => {
          if (m.author.bot) return;
          // FOR ME, PLEASE DONT REMOVE THIS COMMENT
          if (String(m.content).toUpperCase() === String(userCaptchaData[member.id].captchaValue).toUpperCase()) {
            console.log(`correct captcha: ${userCaptchaData[member.id].captchaValue} // got : ${String(m.content).toUpperCase()}`);
            return true;
          }
          console.log(`incorrect captcha: ${userCaptchaData[member.id].captchaValue} // got : ${String(m.content).toUpperCase()}`);
          m.channel.send({ embeds: [e2] }); // captcha is incorrect and messages the user it is incorrect
          return false;
        };
        channel.awaitMessages(
          {
            filter: filter,
            max: 1,
            time: 600000,
            errors: ['time'],
          }).then(async (response) => {
            // get the role, and cache it if it isn't already cached
            // User entered a captcha code then bot checks if its correct or not and if it is, the bot gives the selected role set by the administrator
            try {
              if (response && captcha.value == userCaptchaData[member.id].captchaValue) {
                console.log(captcha.value);
                await channel.send({ embeds: [e3] });
                await member.roles.add(roleID);
              }
              // if the new member joins and enters captcha code correctly, the log will go to the specific channel set by the server owner
              member.guild.members.fetch(member).then(m => {
                const CaptchaLog = new Discord.MessageEmbed()
                  .setTitle('New member')
                  .addField('**User:**', `${member.user.tag}`)
                  .addField('**Joined Server at:**', `${m.joinedAt.toDateString()}`)
                  .addField('**Account Creation:**', `${m.user.createdAt.toDateString()}`)
                  .addField('**Captcha Code:**', `${userCaptchaData[member.id].captchaValue}`)
                  .addField('**Role Given:**', `${roleObj}`)
                  .setColor("PURPLE");
                if (channelLog) member.guild.channels.cache.get(channelLog).send({ embeds: [CaptchaLog] });
              })
            } catch (err) {
              console.log(err);
            }
          })
          .then(() => {
            // return verification();
          })
          .catch(async () => {
            /*
                         *  Check for new Captcha
                         */
            if (userCaptchaData[member.id].captchaValue !== captcha.value) {
              channel.send(`Operation timed out, please run /verify to try again.`);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
    verification();
  },
};
