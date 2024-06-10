const time = require('../config/timestamp')
const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.guild.name
		console.log(`${setDate} - ${interaction.member.displayName} in #${interaction.channel.name} in ${guildName} triggered the ${interaction.commandName} command or ${interaction.customId} interaction.`);


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