const { EmbedBuilder } = require('discord.js');
const UserGuild = require('../../models/UserGuild');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        /*
            'user' representa o usuario acessando a servidor discord
            'guild' representa o servidor discord
            'client' representa o bot discord
        */

        const data = await UserGuild.findOne({
            where: { Guild: member.guild.id },
        });
        if (!data) return;
        if (member.user.bot) return;
        const channel = data.Channel;
        const roleChannel = data.RoleChannel;
        const msg = data.Msg;
        // const recruitChannel = data.RecruitChannel;
        const classChannel = data.ClassChannel;

        const { user, guild } = member;

        const welcomeChannel = await guild.channels.cache.get(channel);

        // ativar quando for para a last warning
        const rule = guild.roles.cache.get('1170630426868584508');
        member.roles.add(rule);

        const welcomeEmbed = new EmbedBuilder()
            .setTitle(':mega: Bem vindo(a) :mega:')
            .setDescription(
                `**${member}**, bem-vindo(a) ao servidor **${guild.name}**!
                \nUma palavra rápida do chefe da guilda: 
                \n**${msg}**
                \nAtualmente estamos com **${guild.memberCount} membros**.
                \nVeja também :point_down:
                \n`,
            )
            .addFields(
                {
                    name: ':scroll:Leia as Regras:',
                    value: `<#${roleChannel}>`,
                    inline: true,
                },
                {
                    name: ':handshake:Se apresente:',
                    value: '<#1208259361013633064>',
                    inline: true,
                },
                {
                    name: ':bow_and_arrow:Qual sua Classe?',
                    value: `<#${classChannel}>`,
                    inline: true,
                },
            )
            .setColor(0x0099ff)
            .setFooter({
                text: `user: ${user.tag} | id: ${user.id}`,
                iconURL: user.displayAvatarURL(),
            })
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL());

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    },
};
