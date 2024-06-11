const time = require('../config/timestamp')
const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
const { top10, top20, top30, top40, top50 } = require('../functions/discordFunctions');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.guild.name
		console.log(`${setDate} - ${interaction.member.displayName} in #${interaction.channel.name} in ${guildName} triggered the ${interaction.commandName} command or ${interaction.customId} interaction.`);
		//Leaderboard Buttons
        if (interaction.customId === 'Top10') {
            try {
            top10(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'Top20') {
            try {
            top20(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'Top30') {
            try {
            top30(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'Top40') {
            try {
            top40(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'Top50') {
            try {
            top50(interaction)
            } catch (err) {console.log(err)}
            }
    

        if (!interaction.isChatInputCommand()) return;
    try {
        const command = interaction.client.commands.get(interaction.commandName)		
        await command.execute(interaction);
        
    } catch (error) {
        console.error(setDate, error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
    },
};