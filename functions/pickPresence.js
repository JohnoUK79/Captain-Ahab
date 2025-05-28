const { ActivityType } = require('discord.js')
module.exports = {
    updatePresence: async function (client) {
    const myMembers = client.users.cache.size
    const options = [
        {
            type: ActivityType.Watching,
            text: `over ${myMembers.toLocaleString()} alliance members, as they Battle for Supremecy!`,
            status: 'Online'
        },
        {
            type: ActivityType.Watching,
            text: `over the Battlefield with ${myMembers.toLocaleString()} Warriors!`,
            status: 'Online'
        },
        {
            type: ActivityType.Listening,
            text: `${myMembers.toLocaleString()} Warriors in need with Battle-Bot`,
            status: 'Online'
        },
        {
            type: ActivityType.Competing,
            text: `Battles with ${myMembers.toLocaleString()} Warriors in the Battle Zone!`,
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