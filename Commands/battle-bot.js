	const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { Colours } = require('../config/colours')
const sql = require("../config/Database");
const { profileMenu, battleBotHelp } = require('../functions/warpathFunctions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle-bot')
		.setDescription('Build your Mini Warpath Empire!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('balance')
				.setDescription('Shows current War-Coins Balance!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('deposit')
				.setDescription('Deposit War-Coins safetly in the War-Chest!')
				.addIntegerOption(option =>
					option
						.setName('dep_amount')
						.setDescription('Amount to be Deposited!')
						.setRequired(true)
					)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('withdraw')
				.setDescription('Withdraw War-Coins from the War-Chest!')
				.addIntegerOption(option =>
					option
						.setName('wdw_amount')
						.setDescription('Amount to be Withdrawn!')
						.setRequired(true)
					)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('help')
				.setDescription('How to Play!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('profile')
				.setDescription('Upgrade your Empire!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('alliance')
				.setDescription('Alliances Coming Soon!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('shop')
				.setDescription('Shop Coming Soon!')
			),
				
	async execute(interaction) {
		await interaction.deferReply({
			content: 'Prepare for Battle!',
			fetchReply: true,
			ephemeral: true,
		})
		const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		let Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		if (Economy.length === 0) {
			console.log(`New Player Registered`)
			const registerEmbed = new EmbedBuilder()
				registerEmbed
				.setDescription(`Welcome **${interaction.member.displayName}** you are now registered for **Battle-Bot**\nYou have $3,000,000 War-Coins to get you started.\nPlease use **/Battle-Bot Profile** to get started.\nMention ${interaction.member.client.user} for Help!`)
				const warcoins = 3000000
				const newRegistration = await sql.Execute(`INSERT INTO levels (discord_id, war_coins) VALUES ('${interaction.member.id}', '${warcoins}');`)

			interaction.followUp({
				embeds: [registerEmbed]
			})
		} 
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Economy[0].unit_camp}' AND Unit_type = '${Economy[0].unit_type}' AND Unit_Level = '${Economy[0].unit_level}'`)
        const image = Economy[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)

		const link = `http://battle-bot.com/img/${image}` 

		CampColour = Colours.Black
		if (Economy[0].unit_camp === 'Vanguard') {
			CampColour = Colours.Vanguard
		}
		if (Economy[0].unit_camp === 'Liberty') {
			CampColour = Colours.Liberty
		}
		if (Economy[0].unit_camp === 'MartyrsW') {
			CampColour = Colours.MartyrsW
		}
		const embed = new EmbedBuilder();
			embed
				.setColor(CampColour)
				.setThumbnail(link)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})

		if (interaction.options.getSubcommand() === 'balance')
		{
			const balance = Economy[0].war_coins
			const bank = Economy[0].war_chest
			embed			
				.setColor(Colours.Blue)
				.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`})
				.addFields(
					{ name: `War-Coins:`, value: `$${balance.toLocaleString()}`, inline: true }, 
					{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
				);
		}
		else if (interaction.options.getSubcommand() === 'deposit')
		{
			const amount = interaction.options.getInteger('dep_amount');
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const bankLevel = Economy[0].chest_level
			if (Economy[0].officer_level === 0) {
				officerLevel = 1
			} else officerLevel = Economy[0].officer_level
			const bankMax = bankLevel * 10000 * officerLevel

			if (amount <= 0) {
			embed
				.setColor(Colours.Yellow)
				.setDescription(`${interaction.member} are you **Broke**? Try adding some **War-Coins** to the **War-Chest**!`)
				.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});
			return interaction.editReply({ embeds: [embed], files: [playerImage] })
			}
			
			if (amount + bank > bankMax) {
			difference = bankMax - bank
			embed
				.setDescription(`${interaction.member} your **War-Chest** can't hold that many **War-Coins**, try upgrading your **War-Chest** to hold more!\nYou have space for **$${difference.toLocaleString()}** **War-Coins** in your **War-Chest**!`)
				.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});
			return interaction.editReply({ embeds: [embed], files: [playerImage] })
			}

			try {
				if (amount > wallet) {
				embed
					.setColor(Colours.Red)

					.setDescription(`${interaction.member} You do not have enough **War-Coins** for that Deposit!\nYou have **$${wallet.toLocaleString()} War-Coins** available!`)
					.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});
				return interaction.editReply({ embeds: [embed], files: [playerImage] });
				} 

				const newWallet = wallet - amount
				const newBank = bank + amount

				embed
					.setColor(Colours.Green)
					.addFields(
						{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
						{ name: `War-Chest:`, value: `$${newBank.toLocaleString()}`, inline: true },
					)
					.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});

				depositUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}', war_chest = '${newBank}' WHERE discord_id = ${interaction.member.id}`)

			} catch (err) {
				console.log(err);
			}
			embed
				.setDescription(`**Deposit Sucessful**!`)
			}

		else if (interaction.options.getSubcommand() === 'withdraw')
		{
			const amount = interaction.options.getInteger('wdw_amount');
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			try {
				if (amount > bank) return interaction.editReply(`You do not have enough **War-Coins** in the **War-Chest** for that withdrawal!\nYou have **$${bank.toLocaleString()}** **War-Coins** in the **War-Chest**!`);
				const newWallet = wallet + amount
				const newBank = bank - amount
				embed
					.setColor(Colours.Red)
					.setDescription(`**Withdrawal Sucessful**!`)
					.addFields(
						{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
						{ name: `War-Chest:`, value: `$${newBank.toLocaleString()}`, inline: true },
					)
					.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});

				withdrawUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}', war_chest = '${newBank}' WHERE discord_id = ${interaction.member.id}`)

			} catch (err) {
				console.log(err);
			}
		}

		else if (interaction.options.getSubcommand() === 'shop')
		{
			embed
				.setDescription(`**Coming Soon**!`)
				.setFooter({ text: `${guildName} - ${interaction.options.getSubcommand()}`, iconURL: `${guildIcon}`});
		}

		else if (interaction.options.getSubcommand() === 'help')
		{
			embed			
				.setColor(Colours.Black)
				.setTitle(`Battle Bot™ Help Menu`)
				.setDescription(`**Battle Bot™** has an integrated **AI help system**.\nMention ${interaction.client.user} with any **Battle Bot™** related questions.\nBelow are the **Basic Commands & Options** in **Battle Bot™**!`)
				.setFooter({ text: `${guildName} - Battle-Bot Help`, iconURL: `${guildIcon}`})
				.addFields(
					{ name: `Battle-Bot Profile:`, value: `**/Battle-Bot Profile** is the **Main Menu** of the game. From here you can switch between **Officers** & **Units** as well as **Challenge Yourself** against the **Campaigns** every **12 Hours**. You can also upgrade your **War-Chest** & **War-Base**. Recruit and power up your **Officers** as well as train and skill your **Units**.`, inline: true },
					{ name: `War-Coins:`, value: `**War-Coins** are the **Currency** of the **Battle Bot™**.\nNeeded for upgrading your **War-Chest** & **War_Base** to gain access to **Officers, Units & Skills**`, inline: true },
					{ name: `War-Chest:`, value: `Your **War-Chest** is your secure storage for the **War-Coins** earned on your adventures.\nHigher level **War-Chest** allows you to safely store even more **War-Coins**.\n**Start** by upgrading your **War-Base** to **Level 3!** This will allow you to pick your **First Unit**`, inline: true },
					{ name: `Battle:`, value: `**/Battle** allows to to compare your best **Officer & Unit** combinations on fellow battlers in your server. All **Winnings** are system generated and not taken from the player.\nEach victory goes towards your **Weekly Battle Score** and this command has a **Cooldown** of **15 minutes**.\n**Top 3 Warriors** in each server will receive a reward of **War-Coins** each week. Use **/Battle-LB** for more information.`, inline: true },
					{ name: `Daily Reward:`, value: `Active Warriors can claim their **Daily Reward** once every **12 Hours** using **/daily**.\nBetter rewards are offered to high level **Officers**.`, inline: true },
					{ name: `Work:`, value: `To help with supplies, you can carry out random **Work Orders** every **4 Hours**. The rewards increase with a higher appointed **Officer**. Use **/work**.`, inline: true },
					{ name: `Steal:`, value: `Use the **/Steal** command every **15 Minutes** to take **War-Coins** from any player who has not secured them into their **War-Chest**.`, inline: true },
					{ name: `Battle Bot™ AI:`, value: `**Battle Bot™** has a comprehensive **AI help function**.\nSimply mention ${interaction.client.user} with your queries!`, inline: true },
				);
		}

		else if (interaction.options.getSubcommand() === 'profile')
		try {
		profileMenu(interaction)
		return
		} catch (err) {console.log(err)}

		await interaction.editReply({embeds: [embed], files: [playerImage] })
		return;
	},

};