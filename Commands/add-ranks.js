const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
		.setName('add-ranks')
		.setDescription('Add Level Up Rank Roles to Server!'),
	async execute(interaction) {
		await interaction.deferReply({ 
			empheral: true,
			fetchReply: true,
		});
		//Captain
		let roleCaptain = interaction.guild.roles.cache.find(role => role.name === "Captain");
		if (!roleCaptain) {
			console.log(`No Role Found`)
			let roleCaptain = await interaction.guild.roles.create({ 
				name: 'Captain',
				color: '#72ddf7', //Light Blue
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleCaptain.edit({
			color: '#72ddf7', //Light Blue
			mentionable: true,
			hoist: true,
		})
		}
		//First Mate
		let roleFirstMate = interaction.guild.roles.cache.find(role => role.name === "First Mate");
		if (!roleFirstMate) {
			console.log(`No Role Found`)
			let roleFirstMate = await interaction.guild.roles.create({ 
				name: 'First Mate',
				color: '#d81159', //Deep Red
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleFirstMate.edit({
			color: '#d81159', //Deep Red
			mentionable: true,
			hoist: true,
		})
		}	
		//Quartermaster
		let roleQuartermaster = interaction.guild.roles.cache.find(role => role.name === "Quartermaster");
		if (!roleQuartermaster) {
			console.log(`No Role Found`)
			let roleQuartermaster = await interaction.guild.roles.create({ 
				name: 'Quartermaster',
				color: '#ffbd00', //Deep yellow
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleQuartermaster.edit({
			color: '#ffbd00', //Deep yellow
			mentionable: true,
			hoist: true,
		})
		}	
		//Boatswain
		let roleBoatswain = interaction.guild.roles.cache.find(role => role.name === "Boatswain");
		if (!roleBoatswain) {
			console.log(`No Role Found`)
			let roleBoatswain = await interaction.guild.roles.create({ 
				name: 'Boatswain',
				color: '#ffff00', //yellow
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleBoatswain.edit({
			color: '#ffff00', //yellow
			mentionable: true,
			hoist: true,
		})
		}		
		//Navigator
		let roleNavigator = interaction.guild.roles.cache.find(role => role.name === "Navigator");
		if (!roleNavigator) {
			console.log(`No Role Found`)
			let roleNavigator = await interaction.guild.roles.create({ 
				name: 'Navigator',
				color: '#ff0000', //red
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleNavigator.edit({
			color: '#ff0000', //red
			mentionable: true,
			hoist: true,
		})
		}	
		//Gunner
		let roleGunner = interaction.guild.roles.cache.find(role => role.name === "Gunner");
		if (!roleGunner) {
			console.log(`No Role Found`)
			let roleGunner = await interaction.guild.roles.create({ 
				name: 'Gunner',
				color: '#ff0080', //magenta
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleGunner.edit({
			color: '#ff0080', //magenta
			mentionable: true,
			hoist: true,
		})
		}		
		//Sailmaster
		let roleSailmaster = interaction.guild.roles.cache.find(role => role.name === "Sailmaster");
		if (!roleSailmaster) {
			console.log(`No Role Found`)
			let roleSailmaster = await interaction.guild.roles.create({ 
				name: 'Sailmaster',
				color: '#8000ff', //purple
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleSailmaster.edit({
			color: '#8000ff', //purple
			mentionable: true,
			hoist: true,
		})
		}
		//Lookout
		let roleLookout = interaction.guild.roles.cache.find(role => role.name === "Lookout");
		if (!roleLookout) {
			console.log(`No Role Found`)
			let roleLookout = await interaction.guild.roles.create({ 
				name: 'Lookout',
				color: '#0000ff', //blue
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleLookout.edit({
			color: '#0000ff', //blue
			mentionable: true,
			hoist: true,
		})
		}
		//Powder Monkey
		let rolePowderMonkey = interaction.guild.roles.cache.find(role => role.name === "Powder Monkey");
		if (!rolePowderMonkey) {
			console.log(`No Role Found`)
			let rolePowderMonkey = await interaction.guild.roles.create({ 
				name: 'Powder Monkey',
				color: '#0080ff', //dodger blue
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		rolePowderMonkey.edit({
			color: '#0080ff', //dodger blue
			mentionable: true,
			hoist: true,
		})
		}
		//Swab
		let roleSwab = interaction.guild.roles.cache.find(role => role.name === "Swab");
		if (!roleSwab) {
			console.log(`No Role Found`)
			let roleSwab = await interaction.guild.roles.create({ 
				name: 'Swab',
				color: '#00ffff', //cyan
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleSwab.edit({
			color: '#00ffff', //cyan
			mentionable: true,
			hoist: true,
		})
		}
		//Buccanerr
		let roleBuccaneer = interaction.guild.roles.cache.find(role => role.name === "Buccanerr");
		if (!roleBuccaneer) {
			console.log(`No Role Found`)
			let roleBuccaneer = await interaction.guild.roles.create({ 
				name: 'Buccanerr',
				color: '#00ff80', //spring green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleBuccaneer.edit({
			color: '#00ff80', //spring green
			mentionable: true,
			hoist: true,
		})
		}
		//Privateer
		let rolePrivateer = interaction.guild.roles.cache.find(role => role.name === "Privateer");
		if (!rolePrivateer) {
			console.log(`No Role Found`)
			let rolePrivateer = await interaction.guild.roles.create({ 
				name: 'Privateer',
				color: '#2e8f37', //forest green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		rolePrivateer.edit({
			color: '#2e8f37', //forest green
			mentionable: true,
			hoist: true,
		})
		}
		//Freebooter
		let roleFreebooter = interaction.guild.roles.cache.find(role => role.name === "Freebooter");
		if (!roleFreebooter) {
			console.log(`No Role Found`)
			let roleFreebooter = await interaction.guild.roles.create({ 
				name: 'Freebooter',
				color: '#1b4332', //dark green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleFreebooter.edit({
			color: '#1b4332', //dark green
			mentionable: true,
			hoist: true,
		})
		}
		addRanks = await sql.Execute(`INSERT INTO settings (guild_id, Rank_10, Rank_20, Rank_30, Rank_40, Rank_50, Rank_60, Rank_70, Rank_80, Rank_90, Rank_100, Rank_250, Rank_500, Rank_1000) 
		VALUES ('${interaction.guildId}', '${roleFreebooter.id}', '${rolePrivateer.id}', '${roleBuccaneer.id}', '${roleSwab.id}', '${rolePowderMonkey.id}', '${roleLookout.id}', '${roleSailmaster.id}', '${roleGunner.id}', '${roleNavigator.id}', '${roleBoatswain.id}', '${roleQuartermaster.id}', '${roleFirstMate.id}', '${roleCaptain.id}') 
		ON DUPLICATE KEY UPDATE Rank_10 = '${roleFreebooter.id}', Rank_20 = '${rolePrivateer.id}', Rank_30 = '${roleBuccaneer.id}', Rank_40 = '${roleSwab.id}', Rank_50 = '${rolePowderMonkey.id}', Rank_60 = '${roleLookout.id}', Rank_70 = '${roleSailmaster.id}', Rank_80 = '${roleGunner.id}', Rank_90 = '${roleNavigator.id}', Rank_100 = '${roleBoatswain.id}', Rank_250 = '${roleQuartermaster.id}', Rank_500 = '${roleFirstMate.id}', Rank_1000 = '${roleCaptain.id}', last_updated = '${setDate}';`)
        console.log(addRanks)
		await interaction.editReply({ content: `Congratulations <@${interaction.user.id}>, Rank Roles Added!` })
	},
};