const { REST, Routes, Collection, EmbedBuilder, time } = require('discord.js');
const { token, CLIENT_ID, OWNER } = require('../config.json');
const nodeCron = require("node-cron");
const timestamp = require('../config/timestamp');
const sql = require("../config/Database");
const { updatePresence } = require('../functions/pickPresence');
const inviteCache = new Collection();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {  
        const supportMail = client.users.fetch(OWNER)
        setDate = timestamp.UTCdefault()
        console.log(`${setDate} - Logged in as - ${client.user.tag}`);
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }) //Global Commands
            .then(() => {
                console.log(`Successfully registered Global Commands!`);
            })
            .catch(console.error);
        console.log(`================ Captain Ahab is Ready! ================`);  
        //Presence Updates
        updatePresence(client)
        const mymMemberRefresh = nodeCron.schedule("7,22,37,52 * * * *", () => {
            updatePresence(client)
        })
        //Create Invite Cache
        const invites = new Collection();
        // Loop over all the guilds
        try {
        client.guilds.cache.forEach(async (guild) => {
            // Fetch all Guild Invites
            const firstInvites = await guild.invites.fetch();
            // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
            invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
            module.exports.invites = invites
        });
    } catch {(err => {
        console.log("Invite Cache Error:", err)
    })}
        // Add Invites to Database
        const InvitesDB = new Map();
        client.guilds.cache.forEach(guild => {
            guild.invites.fetch()
                .then(invites => {
                    console.log(`Invites Saved: ${guild.name}`);
                    const codeUses = new Map();
                    invites.each(inv => {
                        const code = inv.code
                        const temporary = inv.temporary
                        const maxAge = inv.maxAge
                        const uses = inv.uses
                        const maxUses = inv.maxUses
                        const inviter = inv.inviter
                        const channel = inv.channel 
                        const id = guild.id
                        const name = guild.name
                        invitesUpdate = sql.Execute(`INSERT INTO invites (code, guildId, guildName, invitedBy, uses, maxUses, maxAge, temporary, channel, lastupdated) VALUES ('${code}', '${id}', '${name}', '${inviter}', '${uses}', '${maxUses}', '${maxAge}', '${temporary}', '${channel}', '${setDate}') ON DUPLICATE KEY UPDATE uses = '${uses}', maxUses = '${maxUses}', maxAge = '${maxAge}', temporary = '${temporary}', channel = '${channel}', lastupdated = '${setDate}'`)
                        codeUses.set(inv.code, inv.uses)
                    });
                })
                .catch(err => {
                    console.log("Invite Cache Error:", err)
                })
        })  

        const invitesRefresh = nodeCron.schedule("0,15,30,45 * * * *", () => {
        console.log("Invite Leaderboard Update")
        const InvitesDB = new Map();
        client.guilds.cache.forEach(guild => {
            guild.invites.fetch()
                .then(invites => {
                    const codeUses = new Map();
                    invites.each(inv => {
                        const code = inv.code
                        const temporary = inv.temporary
                        const maxAge = inv.maxAge
                        const uses = inv.uses
                        const maxUses = inv.maxUses
                        const inviter = inv.inviter
                        const channel = inv.channel 
                        const id = guild.id
                        const name = guild.name
                        invitesUpdate = sql.Execute(`INSERT INTO invites (code, guildId, guildName, invitedBy, uses, maxUses, maxAge, temporary, channel, lastupdated) VALUES ('${code}', '${id}', '${name}', '${inviter}', '${uses}', '${maxUses}', '${maxAge}', '${temporary}', '${channel}', '${setDate}') ON DUPLICATE KEY UPDATE uses = '${uses}', maxUses = '${maxUses}', maxAge = '${maxAge}', temporary = '${temporary}', channel = '${channel}', lastupdated = '${setDate}'`)
                        codeUses.set(inv.code, inv.uses)
                    });
                })
                .catch(err => {
                    supportMail.send({
                        content: `${err}`
                    })
                    console.log("Invite Cache Error:", err)
                })
                })   
               
        })

        const battleBoardRewards = nodeCron.schedule("0 0 * * MONDAY", async () => {
            try {
                console.log("Battle Board Rewards");
        
                // Fetch board data
                const Board = await sql.Execute(`SELECT * FROM levels WHERE battle_wins > 0 ORDER BY battle_wins DESC, battle_losses ASC`);
                
                // Check if the board is empty
                if (!Board || Board.length === 0) {
                    console.log("No matches fought this week. Posting update to level-up channels.");
        
                    // Notify level-up channels about no matches
                    const noMatchesEmbed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle("Battle Rewards")
                        .setDescription("No battles were fought this week. The leaderboard remains empty. Who will lead the charge next week?")
                        .setFooter({ text: "Battle Bot", iconURL: 'http://battle-bot.com/images/GeneralDeath.png' })
                        .setTimestamp();
        
                    const levelUpChannels = await sql.Execute(`SELECT * FROM settings WHERE 1`);
                    for (let channel of levelUpChannels) {
                        try {
                            const sendChannel = client.channels.cache.get(channel.level_up_channel_id) || await client.channels.fetch(channel.level_up_channel_id);
                            await sendChannel.send({ embeds: [noMatchesEmbed] });
                        } catch (e) {
                            console.error(`Error sending 'no matches' message to channel (ID: ${channel.level_up_channel_id}):`, e);
                        }
                    }
                    return; // Exit early since no matches were fought
                }
        
                // Process top players
                for (let i = 0; i < 2 && Board[i]; i++) {
                    try {
                        const rewards = 50000 / (i + 1) * Board[i].officer_level;
                        const winnings = Board[i].war_chest + rewards;
        
                        const sendDM = await client.users.fetch(`${Board[i].discord_id}`);
                        const weeklyRewardsEmbed = new EmbedBuilder()
                            .setColor('#00FF80')
                            .setTitle(`You have placed ${i + 1} in this Week's Battle Rewards`)
                            .setDescription(`Congratulations <@${Board[i].discord_id}>, your **$${rewards.toLocaleString()} Rewards** have been added to your **War-Chest**!`)
                            .setFooter({ text: `Battle Rewards - Wins ${Board[i].battle_wins} Losses ${Board[i].battle_losses}`, iconURL: 'http://battle-bot.com/images/GeneralDeath.png' })
                            .setTimestamp();
        
                        await sql.Execute(`UPDATE levels SET war_chest = '${winnings}' WHERE discord_id = ${Board[i].discord_id}`);
                        await sendDM.send({ embeds: [weeklyRewardsEmbed] });
                    } catch (e) {
                        console.error(`Error processing player (Rank ${i + 1}):`, e);
                    }
                }
        
                // Clear battle board
                await sql.Execute(`UPDATE levels SET battle_wins = '0', battle_losses = '0' WHERE 1`);
                console.log("Battle board cleared successfully.");
        
                // Notify channels with winners
                const winnersEmbed = new EmbedBuilder()
                    .setColor('#00FF80')
                    .setTitle(`Battle Rewards`)
                    .setDescription(`This Week's **Battle Reward Winners** Are:`)
                    .setFooter({ text: `Battle Rewards.`, iconURL: 'http://battle-bot.com/images/GeneralDeath.png' })
                    .setTimestamp();
        
                // Dynamically add fields based on the number of players
                if (Board[0]) {
                    winnersEmbed.addFields(
                        { name: `Rank 1:`, value: `<@${Board[0].discord_id}> **Wins:** ${Board[0].battle_wins}`, inline: true }
                    );
                }
                if (Board[1]) {
                    winnersEmbed.addFields(
                        { name: `Rank 2:`, value: `<@${Board[1].discord_id}> **Wins:** ${Board[1].battle_wins}`, inline: true }
                    );
                }
                if (Board[2]) {
                    winnersEmbed.addFields(
                        { name: `Rank 3:`, value: `<@${Board[2].discord_id}> **Wins:** ${Board[2].battle_wins}`, inline: true }
                    );
                }
        
                // Add a closing message field
                winnersEmbed.addFields(
                    { name: `All Rewards have been sent to the Winners via DM`, value: `The **Leaderboard** has been **Reset**, who will **Lead** this week?`, inline: false }
                );
        
                const levelUpChannels = await sql.Execute(`SELECT * FROM settings WHERE 1`);
                for (let channel of levelUpChannels) {
                    try {
                        const sendChannel = client.channels.cache.get(channel.level_up_channel_id) || await client.channels.fetch(channel.level_up_channel_id);
                        await sendChannel.send({ content: '**Congratulations**', embeds: [winnersEmbed] });
                    } catch (e) {
                        console.error(`Error sending winners' message to channel (ID: ${channel.level_up_channel_id}):`, e);
                    }
                }
            } catch (e) {
                console.error(`Error in scheduled task:`, e);
            }
        });        

        const guildSettingsUpdate = nodeCron.schedule("0,15,30,45 * * * *", () => {
                console.log("Guild Settings Update")

                client.guilds.cache.map(r => {
                    const id = r.id
                    const name = r.name
                    const icon = r.iconURL()
                    const owner = r.ownerId
                    const description = r.description
                    const system = r.systemChannelId
                    const rules = r.rulesChannelId
                    const updates = r.publicUpdatesChannelId
                    //const fetch = await client.guilds.fetch(r.i);
                    guildUpdate = sql.Execute(`INSERT INTO settings (guild_id, guild_name, owner_id, guild_description, updates_channel, system_channel, rules_channel, guild_icon) VALUES ('${id}', '${name}', '${owner}', '${description}', '${updates}', '${system}', '${rules}', '${icon}') ON DUPLICATE KEY UPDATE guild_name = '${name}', owner_id = '${owner}', guild_description = '${description}', updates_channel = '${updates}', system_channel = '${system}', rules_channel = '${rules}', last_updated = '${setDate}', guild_icon = '${icon}'`)
                })       
                console.log(`Guild Settings Updated`)      
            })  
            const job = nodeCron.schedule("0 0,4,8,12,16,20 * * *", () => {
                const jurisdictions = require('../data/jurisdictions');
                const jurisdictionsChannelIDs = require(`../data/jurisdictionsChannelIDs`).jurisdictionsChannelIDs
                console.log(jurisdictionsChannelIDs)
                const hourUTC = (new Date()).getUTCHours();
                const dayOfWeeek = (new Date()).getDay();

            console.log(new Date().toLocaleString(), "Jurisdiction Event Starting");
            const { EmbedBuilder } = require('discord.js');
                    
                    if( (hourUTC % 4) !== 0) return console.log('Jurisdiction Already Running!');

                    const padHour = (hour) => (hour.length === 1) ? '0'+hour : hour;
                    const startHour = padHour(hourUTC+'');
                    const endHour = padHour((hourUTC === 20) ? '00' : (hourUTC+4)+'');

                    const jurisdiction = jurisdictions[dayOfWeeek+'-'+startHour];

                    if(!jurisdiction) {
                    console.log(`ERROR: ${dayOfWeeek+'-'+startHour} not found`);
                    return;
                    }

                    const jurisdictionEmbed = new EmbedBuilder()
                        .setColor('#00FF80')
                        .setTitle(jurisdiction.title)
                        .setURL('http://www.battle-bot.com')
                        .setDescription(`Start: ${startHour}H00 UTC    -    End: ${endHour}H00 UTC`)
                        .addFields(
                            { name: `Missions:`, value: jurisdiction.missions.join('\n'), inline: false },
                            { name: `Rank 1`, value: `${jurisdiction.rank1} Points`, inline: true },
                            { name: `Rank 2`, value: `${jurisdiction.rank2} Points`, inline: true },
                            { name: `Rank 3`, value: `${jurisdiction.rank3} Points`, inline: true },

                        )
                        .setTimestamp()
                        .setFooter({ text: `${jurisdiction.title}.`, iconURL: 'http://battle-bot.com/images/GeneralDeath.png' });


                    for (let i = 0; i < jurisdictionsChannelIDs.length; i++) {
                    let jurisdictionsChannelID = jurisdictionsChannelIDs[i];
                    
                    try {  
                        let sendChannel = client.channels.cache.get(jurisdictionsChannelID)                
                        console.log(jurisdictionsChannelID);
                        sendChannel.send({ content: '**New Jurisdiction**', embeds: [jurisdictionEmbed] })

                    }
                    catch (e) {
                        console.log(e);
                        console.log(jurisdictionsChannelID);
                    }
                    }
                  });
    },
}
