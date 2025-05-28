const sql = require('../config/Database');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giftcode')
    .setDescription('Register or update your game ID for gift code redemptions.')
    .addStringOption(option =>
      option.setName('game_id')
        .setDescription('Your in-game Player ID (numbers only)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const rawGameId = interaction.options.getString('game_id');
    const rawNickname = interaction.member?.nickname || interaction.user.username;
    const discordId = interaction.user.id;

    // ✅ Validate game_id is numeric and 5–20 digits long
    if (!/^\d{5,20}$/.test(rawGameId)) {
      return await interaction.reply({
        content: '❌ Invalid Game ID format. It must be **numbers only** and 5 to 20 digits long.',
        ephemeral: true
      });
    }

    // ✅ Escape single quotes in nickname to prevent SQL injection
    const gameId = rawGameId;
    const nickname = rawNickname.replace(/'/g, "\\'");

    const query = `
      INSERT INTO giftcodes (discord_id, game_id, nickname)
      VALUES ('${discordId}', '${gameId}', '${nickname}')
      ON DUPLICATE KEY UPDATE
        game_id = '${gameId}',
        nickname = '${nickname}'
    `;

    try {
      await sql.Execute(query);
      await interaction.reply({
        content: `✅ Your Game ID \`${gameId}\` has been registered or updated, ${nickname}.`,
        ephemeral: true
      });
    } catch (error) {
      console.error('❌ Error in /giftcode:', error);
      await interaction.reply({
        content: '❌ An error occurred while saving your Game ID.',
        ephemeral: true
      });
    }
  },
};
