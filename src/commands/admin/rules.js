const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    ButtonBuilder,
} = require('discord.js');
const Canvas = require('@napi-rs/canvas');
// const path = require('path');

const UserGuild = require('../../models/UserGuild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Integra o sistema de regras ao servidor.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const data = await UserGuild.findOne({
            attributes: ['Guild', 'RoleChannel'],
            where: { Guild: interaction.guild.id },
        });

        if (!data) {
            const embedFailed = new EmbedBuilder()
                .setDescription(
                    '🤖 Você ainda não configurou o bot, use o comando ```/config```',
                )
                .setColor(10944512);

            interaction.reply({
                embeds: [embedFailed],
            });
        }

        const embedSucess = new EmbedBuilder()
            .setDescription('🥰 Sistema de Regras implementado com sucesso!!')
            .setColor(0x0099ff);

        const channel = client.channels.cache.get(data.RoleChannel);
        const pathImage =
            'https://raw.githubusercontent.com/blackdot404/bot-valkyria/refs/heads/main/src/img/rules.png';
        const canvas = Canvas.createCanvas(692, 317);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage(pathImage);

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), {
            name: 'rules.png',
        });

        const button = new ButtonBuilder()
            .setCustomId('acceptRules')
            .setLabel('✔️Concordo')
            .setStyle(ButtonStyle.Success);

        const rulesEmbed = new EmbedBuilder()
            .setTitle('📌 Regras da Comunidade')
            .setColor(0x0099ff)
            .setDescription(`### Reveja e compreenda completamente as regras da comunidade listadas abaixo. O não cumprimento dessas diretrizes poderá resultar em uma ação da equipe de moderação.
                            \n- **Termos de Serviço e Diretrizes Comunitárias do Discord**
                            \nOs termos do Discord são aplicados neste servidor a todo momento, portanto, se familiarize com eles: https://dis.gd/terms & https://dis.gd/guidelines.
                            \n- **Comportamento dos Usuários**
                            \nMantenha o respeito com todos os usuários e com as singularidades do Servidor. Brincadeira permitidas até onde o outro usuário permitir. SENDO ASSIM, o mínimo exigido é que ajam de acordo com a idade. A zueira pode e deve reinar neste servidor, mas ela para de ser zueira e se torna desrespeito assim que a pessoa que está na outra ponta se demonstrar desagradada com tal — e isso não será tolerado.
                            \n- **Conteúdo NSFW**
                            \nConteúdo NSFW ou NSFL  é proibido, qualquer propagação deste conteúdo será banido permanentemente.
                            \n- **Spam**
                            \nSpam de qualquer tipo não é permitido em nenhum canal. Nosso objetivo é manter todos os canais limpos e organizados, sem ter um monte de spam presente.
                            \n- **RMT ou Trocas**
                            \nNão mediamos nem ajudamos em disputas relacionadas a trocas. Todas devem ser feitas de maneira responsável e dentro das regras propostas pelo servidor do jogo. Portanto, mesmo que tenhamos canais de anúncios para venda e compra, pedimos que as negociações sejam feitas por voz ou texto privado.
                            \n- **Administração do Servidor**
                            \nO servidor é composto pelo <@&1262715370066804787> e <@&1336505822431285320> os maiores cargos. Cada um tem sua jurisdição no servidor, portanto, respeite.
                            \nSe você concorda com todas as regras listadas clique no botão abaixo, para que o servidor seja liberado.
                            `);

        channel.send({
            files: [attachment],
            embeds: [rulesEmbed],
            components: [new ActionRowBuilder().addComponents(button)],
        });

        interaction.reply({
            embeds: [embedSucess],
            ephemeral: true,
        });
    },
};
