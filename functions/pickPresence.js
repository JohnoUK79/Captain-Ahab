const { ActivityType } = require('discord.js')
module.exports = {
    updatePresence: async function (client) {
    const myMembers = client.users.cache.size
    const options = [
        {
            type: ActivityType.Watching,
            text: `over ${myMembers.toLocaleString()} gang members, as they sail the Seven Seas!`,
            status: 'Online'
        },
        {
            type: ActivityType.Watching,
            text: `over the Seven Seas with ${myMembers.toLocaleString()} Pirates!`,
            status: 'Online'
        },
        {
            type: ActivityType.Listening,
            text: `${myMembers.toLocaleString()} Pirates in need with Captain Ahab`,
            status: 'Online'
        },
        {
            type: ActivityType.Competing,
            text: `Battles with ${myMembers.toLocaleString()} Pirates across the Seven Seas!`,
            status: 'idle'
        }
    ]
    const option = options[Math.floor(Math.random() * options.length)];
    console.log(option)
    client.user
        .setPresence({
            activities: [
                {
                    name: option.text,
                    type: option.type,
                    status: option.status    
                },
            ],
            status: option.status
        })
    }
}