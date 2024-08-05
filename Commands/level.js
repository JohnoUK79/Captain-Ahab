const sql = require("../config/Database");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Check your current Levels Rank!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		level = await sql.Execute(`select * from levels where discord_id = '${interaction.user.id}';`);
		player = level[0].player_id
		discord = interaction.member.username
		points = level[0].points
		oldlevel = level[0].level
		seen = level[0].last_seen
		wins = level[0].battle_wins
		losses = level[0].battle_losses
		seenDiscord = level[0].last_seen_server

		const unknownLevel = new EmbedBuilder()
		.setColor('#2e8f37')
		.setTitle(`${guildName} - XP Rank Card`)
		.setURL('http://www.battle-bot.com/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `XP:`, value: `${points}` },
			{ name: 'Level.', value: `${oldlevel}`, inline: false },
			)
		.setImage(interaction.member.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Rank - ${interaction.member.displayName}.`, iconURL: `${guildIcon}` });

		const playerLevel = new EmbedBuilder()
		.setColor('#2e8f37')
		.setTitle(`${guildName} - XP Rank Card`)
		.setURL('http://www.battle-bot.com/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `XP:`, value: `${points.toLocaleString()}` },
			{ name: 'Level.', value: `${oldlevel}`, inline: false },
			{ name: 'Battle Wins.', value: `${wins}`, inline: false },
			{ name: 'Battle Losses.', value: `${losses}`, inline: false },
			{ name: 'Last Seen.', value: `${seen}`, inline: false },
			{ name: 'Last Seen Discord Server.', value: `${seenDiscord}`, inline: false },
			)
		.setImage(interaction.member.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Rank - ${interaction.member.displayName}.`, iconURL: `${guildIcon}` });
		if(!oldlevel) {oldlevel = 0}
		
        if (playerLevel > 9) {
			playerLevel.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			playerLevel.setColor('#2e8f37') //forest green
        }
		if (oldlevel > 29) {
			playerLevel.setColor('#00ff80') //spring green
		}
		if (oldlevel > 39) {
			playerLevel.setColor('#00ffff') //cyan
		}	
		if (oldlevel > 49) {
			playerLevel.setColor('#0080ff') //dodger blue
		}	
		if (oldlevel > 59) {
			playerLevel.setColor('#0000ff') //blue
		}	
		if (oldlevel > 69) {
			playerLevel.setColor('#8000ff') //purple
		} 
		if (oldlevel > 79) {
			playerLevel.setColor('#ff0080') //magenta
		} 
		if (oldlevel > 89) {
			playerLevel.setColor('#ff0000') //red
		} 
		if (oldlevel > 99) {
			playerLevel.setColor('#ffff00') //yellow
		} 
		if (oldlevel > 249) {
			playerLevel.setColor('#ffbd00') //Deep Yellow
		} 
		if (oldlevel > 499) {
			playerLevel.setColor('#d81159') //Deep Red
		} 
		if (oldlevel > 999) {
			playerLevel.setColor('#72ddf7') //Light Blue
		} 
		if (!player) {
			return interaction.reply({ embeds: [unknownLevel]});
		} else return interaction.reply({ embeds: [playerLevel]});
		
	},
};
