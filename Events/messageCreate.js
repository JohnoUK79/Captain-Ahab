const { ChannelType } = require('discord.js');
const sql = require("../config/Database");
const { dmReceived, translate } = require('../functions/messageFunctions');
time = require('../config/timestamp')
setDate = time.UTCdefault()

module.exports = {
	class: 'extends',
	name: 'messageCreate',
	async execute(message) {		
		if (message.author.bot === true) {
			return;}
		//DM Replies
		// if (message.channel.type == ChannelType.DM) {
		// try {
		// dmReceived(message)
		// } catch (err) {console.log(err)}
		// }
		//Chat Bot Message
		// const { client } = require('../bot')
		// if (message.mentions.users.has(client.user.id)){
		// try {
		// chatResponse(message)
		// } catch (err) {console.log(err)}
		// } 
		//Set Guild Branding
		guildIcon = message.member.guild.iconURL();
		guildName = message.member.guild.name
	}}