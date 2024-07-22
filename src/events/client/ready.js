const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[INSTANCIA]: ${client.user.tag} online!`);

        const status = [
            {
                name: '📌 /help saiba mais',
                type: ActivityType.Custom,
            },
            {
                name: 'a gameplay criminosa do wells',
                type: ActivityType.Watching,
            },

            {
                name: 'Ronphi está online.',
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/ronphi',
            },
        ];

        setInterval(() => {
            const random = Math.floor(Math.random() * status.length);

            client.user.setActivity(status[random]);
        }, 10000);
    },
};
