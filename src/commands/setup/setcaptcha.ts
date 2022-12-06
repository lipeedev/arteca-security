import { Command, OptionsExecute } from '../../structures';
import type { BotClient } from '../../Client';
import { ApplicationCommandType, EmbedBuilder, TextChannel, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } from 'discord.js';
import { constants } from '../../utils/constants';
import { prisma } from '../../lib/prisma';
import { captchaCommandOptions } from '../../utils/captchaCommandOptions';


export default class SetCaptchaCommand extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'setcaptcha',
            description: 'setup channel and role to verification.',
            type: ApplicationCommandType.ChatInput,
            dmPermission: false,
            defaultMemberPermissions: PermissionFlagsBits.Administrator,

            options: captchaCommandOptions
        });
    }

    async execute({ interaction }: OptionsExecute) {
        const channelTargetOption = interaction.options.getChannel('channel') as TextChannel;
        const roleTargetOption = interaction.options.getRole('role');
        const mainDivTargetOption = interaction.options.getRole('main-div');
        const statusDivTargetOption = interaction.options.getRole('status-div');
        const comunityDivTargetOption = interaction.options.getRole('comunity-div');
        const profileDivTargetOption = interaction.options.getRole('profile-div');
        const permissionDivTargetOption = interaction.options.getRole('permission-div');
        const roleDivTargetOption = interaction.options.getRole('role-div');
        const pingDivTargetOption = interaction.options.getRole('ping-div');
 

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
                captchaChannelId: channelTargetOption?.id,
                verifiedRoleId: roleTargetOption?.id,
                mainPartitionRoleId: mainDivTargetOption?.id,
                comunityPartitionRoleId: comunityDivTargetOption?.id,
                permissionPartitionRoleId: permissionDivTargetOption?.id,
                pingPartitionRoleId: pingDivTargetOption?.id,
                rolesPartitionRoleId: roleDivTargetOption?.id,
                profilePartitionRoleId: profileDivTargetOption?.id,
                statusPartitionRoleId: statusDivTargetOption?.id
            }
        });

        channelTargetOption.send({ embeds: [verificationEmbed], components: [rowComponent] });
        await interaction.reply({ embeds: [successEmbed], ephemeral: true });

    }
}