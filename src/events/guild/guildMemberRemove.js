const { EmbedBuilder } = require('discord.js');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const data = await UserGuild.findOne({
            attributes: ['Guild'],
            where: { Guild: member.guild.id },
        });
        if (!data) return;
        if (member.user.bot) return;

        const { user, guild } = member;

        const leaveChannel = await guild.channels.cache.get(
            '1170612058841157670',
        );

        const leaveEmbed = new EmbedBuilder()
            .setDescription(`:mega: O ${user.username} saiu da guilda...`)
            .setColor(0xff001a)
            .setTimestamp();

        leaveChannel.send({ embeds: [leaveEmbed] });
    },
};
