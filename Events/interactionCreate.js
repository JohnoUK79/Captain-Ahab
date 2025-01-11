const time = require('../config/timestamp')
const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
const ms = require('ms-prettify').default
const { battleBotHelp, buyBank, buyBase, chestUpgrade, baseUpgrade, cancel, buyOfficer, buyOfficer10, officerUpgrade, officerSelect, unitUpgrade, unitSelect, buyUnit, profile, newUnit, selectunit, selectofficer, selectgroundofficer, selectairofficer, skillupgrade, campaign, challenge, selectunitmenu, selectofficermenu, newOfficer} = require('../functions/warpathFunctions');
const { campaignMode } = require('../functions/campaignMode');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.guild.name
		console.log(`${setDate} - ${interaction.member.displayName} in #${interaction.channel.name} in ${guildName} triggered the ${interaction.commandName} command or ${interaction.customId} interaction.`);
		// WarPath Functions
		if (interaction.customId === 'bank') {
            try {
            chestUpgrade(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'buybank') {
            try {
            buyBank(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'base') {
            try {
            baseUpgrade(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'buybase') {
            try {
            buyBase(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'officer') {
            try {
            officerUpgrade(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'officerselect') {
            try {
            officerSelect(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'buyofficer') {
            try {
            buyOfficer(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'buyofficer10') {
            try {
            buyOfficer10(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'troop') {
            try {
            unitUpgrade(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'buyunit') {
            try {
            buyUnit(interaction)
            } catch (err) {console.log(err)}
            }	
            if (interaction.customId === 'unitselect') {
            try {
            unitSelect(interaction)
            } catch (err) {console.log(err)}
            }			
            if (interaction.customId === 'cancel') {
            try {
            cancel(interaction)
            } catch (err) {console.log(err)}
            }	
            if (interaction.customId === 'profile') {
            try {
            profile(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'newUnit') {
            try {
            newUnit(interaction)
            } catch (err) {console.log(err)}
            }	
            if (interaction.customId === 'newofficer') {
            try {
            newOfficer(interaction)
            } catch (err) {console.log(err)}
            }	
            if (interaction.customId === 'selectunit') {
            try {
            selectunit(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'selectunitmenu') { //Select Menu
            try {
            selectunitmenu(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'selectofficermenu') { //Select Menu
            try {
            selectofficermenu(interaction)
            } catch (err) {console.log(err)}
            }		
            if (interaction.customId === 'selectofficer') {
            try {
            selectofficer(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'selectgroundofficer') {
            try {
            selectgroundofficer(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'selectairofficer') {
            try {
            selectairofficer(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'skillupgrade') {
            try {
            skillupgrade(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'campaign') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'easy') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'normal') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'hard') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'extreme') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'ultra') {
            try {
            campaign(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp1') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp2') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp3') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp4') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp5') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp6') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp7') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp8') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp9') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp10') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp11') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp12') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp13') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp14') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp15') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp16') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp17') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp18') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp19') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp20') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp21') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp22') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp23') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp24') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'camp25') {
            try {
            campaignMode(interaction)
            } catch (err) {console.log(err)}
            }
            if (interaction.customId === 'challenge') {
            try {
            challenge(interaction)
            } catch (err) {console.log(err)}
            }	
            if (interaction.customId === 'help') {
            try {
            battleBotHelp(interaction)
            } catch (err) {console.log(err)}
            }			
    
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
            const { commandCooldowns } = require('../bot');
            const t = commandCooldowns.get(`${interaction.user.id}_${interaction.commandName}`) || 0
            if (Date.now() - t < 0) {
            guildName = interaction.guild.name
            const cooldownEmbed = new EmbedBuilder()
            cooldownEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${guildName} - ${interaction.commandName}`, iconURL: `${guildIcon}`})
                .setDescription(`${interaction.user} you have already used the **${interaction.commandName}** command recently, you can use the **${interaction.commandName}** command again in **${ms(t - Date.now())}**`);
            return interaction.reply({ embeds: [cooldownEmbed] })
            }
            commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, Date.now() + command.cooldown || 0)
            // if (interaction.guild.id === '964496256057630720') {
            // 	commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, 0)
            // }
            console.log(t)
            await command.execute(interaction);
            
    } catch (error) {
        console.error(setDate, error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
    },
};