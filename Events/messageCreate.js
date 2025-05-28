const { ChannelType } = require('discord.js');
const sql = require("../config/Database");
const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const { levelUp } = require('../functions/levelUp');
const { dmReceived } = require('../functions/messageFunctions');
const { chatResponse } = require('../functions/chatBot')
time = require('../config/timestamp')
setDate = time.UTCdefault()

module.exports = {
	class: 'extends',
	name: 'messageCreate',
	async execute(message) {	
		if (message.author.bot === true) {
			return;}
		// Match "🎁 Gift Code: `CODE123`"
		const match = message.content.match(/🎁 Gift Code:\s*`(.+?)`/);
		if (!match) return;

		const giftCode = match[1].trim();
		await message.reply(`🎁 Redeeming code **${giftCode}** for all registered players...`);

		// Start automation
		const logFile = 'log.txt';
		fs.writeFileSync(logFile, 'Gift Code Redemption Log\n\n', 'utf8');
		const logPrint = (msg) => fs.appendFileSync(logFile, msg + '\n', 'utf8');

		let playerData;
		try {
		playerData = await sql.Execute(`SELECT game_id, nickname FROM giftcodes`);
		if (!playerData.length) {
			return await message.reply('⚠️ No registered players found in the database.');
		}
		} catch (err) {
		console.error('❌ DB Query Error:', err);
		return await message.reply('❌ Failed to retrieve player data from the database.');
		}

		const driver = await new Builder().forBrowser('chrome').build();
		const waitTimeout = 10000;
		const startTime = Date.now();
		let count = 0;

		for (const { game_id: pid, nickname: username } of playerData) {
		count++;
		let success = false;

		try {
			await driver.get('https://ks-giftcode.centurygame.com/');

			const playerInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Player ID"]')), waitTimeout);
			await playerInput.clear();
			await playerInput.sendKeys(pid);
			logPrint(`Entered Player ID: ${pid} (${username})`);

			const codeInput = await driver.findElement(By.xpath('//input[@placeholder="Enter Gift Code"]'));
			await codeInput.clear();
			await codeInput.sendKeys(giftCode);
			logPrint("Entered Gift Code.");

			const loginButton = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "login_btn") and contains(@class, "btn")]')), waitTimeout);
			await loginButton.click();
			logPrint(`Clicked Login for: ${pid} (${username})`);

			try {
			const overlay = await driver.findElement(By.css('.loading-overlay-class'));
			await driver.wait(until.elementIsNotVisible(overlay), waitTimeout);
			} catch {
			logPrint("No loading overlay found.");
			}

			await driver.sleep(1000);
			const confirmButton = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "exchange_btn") and contains(text(), "Confirm")]')), waitTimeout);
			await driver.executeScript("arguments[0].click();", confirmButton);
			success = true;

		} catch (err) {
			logPrint(`[!] Failed for Player ID: ${pid} (${username}) — ${err.message}`);
		}

		logPrint(success
			? `[✓] Code redeemed for Player ID: ${pid} (${username})\n`
			: `[✗] Redemption failed for Player ID: ${pid} (${username})\n`
		);

		await driver.sleep(1000);
		}

		await driver.quit();
		const duration = ((Date.now() - startTime) / 1000).toFixed(2);
		logPrint(`\nProcessed ${count} players in ${duration} seconds.`);

		await message.channel.send({
		content: `✅ Gift code redemption complete: **${count}** players processed in **${duration} seconds**.`,
		files: [logFile]
		});
	
  
		//DM Replies
		if (message.channel.type == ChannelType.DM) {
		try {
		dmReceived(message)
		} catch (err) {console.log(err)}
		}
		//Chat Bot Message
		const { client } = require('../bot')
		if (message.mentions.users.has(client.user.id)){
		try {
		chatResponse(message)
		} catch (err) {console.log(err)}
		} 
		//Set Guild Branding
		guildIcon = message.member.guild.iconURL();
		guildName = message.member.guild.name
		//Level Up
		try {
			levelUp(message)
			} catch (err) {console.log(err)}
	}}