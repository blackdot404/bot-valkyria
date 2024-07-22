const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const UserGuild = require('../../models/UserGuild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recruit')
        .setDescription('Recrutamento de novos players.')
        .addStringOption((option) =>
            option
                .setName('nome')
                .setDescription('Como deseja ser chamado no Discord ?')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('char')
                .setDescription('Nome do seu personagem principal.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('classe')
                .setDescription('Classe do seu personagem principal.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('estagio')
                .setDescription('Em qual estagio você está no jogo')
                .setRequired(true)
                .addChoices(
                    { name: 'Early Game', value: 'Early-Game' },
                    { name: 'Mid Game', value: 'Mid-Game' },
                    { name: 'End Game', value: 'End-Game' },
                    { name: 'High Game', value: 'High-Game' },
                ),
        )
        .addStringOption((option) =>
            option
                .setName('guild')
                .setDescription('O que você busca na guilda.')
                .setRequired(true),
        ),
    async execute(interaction, client) {
        const { options } = interaction;
        const Name = options.getString('nome');
        const Char = options.getString('char');
        const Class = options.getString('classe');
        const Stage = options.getString('estagio');
        const Guilda = options.getString('guild');

        const data = await UserGuild.findOne({
            attributes: ['Guild', 'RecruitChannel'],
            where: { Guild: interaction.guild.id },
        });

        if (!data) return;

        const channel = client.channels.cache.get(data.RecruitChannel);
        const nickname = `${Name} (${Char})`;

        const recruitEmbed = new EmbedBuilder()
            .setTitle(':man_detective: Novo pedido de recrutamento!')
            .setDescription(
                `O usuario <@${interaction.user.id}> deseja ingressar na Guilda o mesmo precisa de um aprovação do recrutador.`,
            )
            .addFields(
                {
                    name: ':busts_in_silhouette: Nome:',
                    value: `${Name}`,
                    inline: true,
                },
                {
                    name: ':man_in_lotus_position: Personagem:',
                    value: `${Char}`,
                    inline: true,
                },
                {
                    name: ':bow_and_arrow: Classe:',
                    value: `${Class}`,
                    inline: true,
                },
                {
                    name: ':military_medal: Estagio Atual:',
                    value: `${Stage}`,
                    inline: true,
                },
                {
                    name: ':pencil: O que ele espera da Guild:',
                    value: `${Guilda}`,
                },
            )
            .setColor(0x0099ff)
            .setFooter({
                text: `user: ${interaction.user.tag} | id: ${interaction.user.id}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL());

        const embedSucess = new EmbedBuilder()
            .setDescription(
                `🌌 Formulario de recrutamento enviado!!
                \nNão esqueça de acessar a sala de voz do recrutamento para que possamos falar com você!`,
            )
            .setColor(0x0099ff);

        channel.send({ embeds: [recruitEmbed] });

        interaction.reply({
            embeds: [embedSucess],
            ephemeral: true,
        });

        await interaction.member.setNickname(nickname);

        // console.log(reChannel.id);
    },
};
