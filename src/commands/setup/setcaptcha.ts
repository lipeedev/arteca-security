import { Command, OptionsExecute } from '../../structures';
import type { BotClient } from '../../Client';
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, TextChannel, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } from 'discord.js';
import { constants } from '../../utils/constants';
import { prisma } from '../../lib/prisma';


export default class SetCaptchaCommand extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'setcaptcha',
            description: 'setup channel and role to verification.',
            type: ApplicationCommandType.ChatInput,
            dmPermission: false,
            defaultMemberPermissions: PermissionFlagsBits.Administrator,

            options: [{
                name: 'channel',
                required: true,
                description: 'channel to verifiation.',
                type: ApplicationCommandOptionType.Channel
            },

            {
                name: 'role',
                required: true,
                description: 'role to verification.',
                type: ApplicationCommandOptionType.Role
            }]
        });
    }

    async execute({ interaction }: OptionsExecute) {
        const channelTargetOption = interaction.options.getChannel('channel');
        const roleTargetOption = interaction.options.getRole('role');

        if (!channelTargetOption || !roleTargetOption) return;

        const successEmbed = new EmbedBuilder()
            .setAuthor({ name: this.client.user?.username as string, iconURL: this.client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.successVerificationSetup)
            .setColor('Green');

        const verificationEmbed = new EmbedBuilder()
            .setAuthor({ name: this.client.user?.username as string, iconURL: this.client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.verificationInfo);

        const verificationButton = new ButtonBuilder()
            .setCustomId('botao-verificar')
            .setStyle(ButtonStyle.Success)
            .setLabel('Verificar');

        const rowComponent = new ActionRowBuilder<ButtonBuilder>().addComponents(verificationButton);

        const channelTargetVerification = interaction.guild?.channels.cache.get(channelTargetOption.id) as TextChannel;
        const roleTargetVerification = interaction.guild?.roles.cache.get(roleTargetOption.id);

        const guild = await prisma.guild.findUnique({
            where: { id: interaction.guild?.id }
        });

        if (guild) {
            await interaction.reply({ content: constants.guildAlreadyRegistred, ephemeral: true });
            return;
        }

        await prisma.guild.create({
            data: {
                id: interaction.guild?.id as string,
                captchaChannelId: channelTargetVerification.id,
                verifiedRoleId: roleTargetVerification?.id as string
            }
        });

        channelTargetVerification.send({ embeds: [verificationEmbed], components: [rowComponent] });
        await interaction.reply({ embeds: [successEmbed], ephemeral: true });

    }
}