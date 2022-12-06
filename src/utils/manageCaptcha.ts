import { ButtonInteraction, EmbedBuilder, Role } from 'discord.js';
import { BotClient } from '../Client';
import { constants } from './constants';
import { randomBytes } from 'node:crypto';
import { prisma } from '../lib/prisma';

export async function manageCaptcha(interaction: ButtonInteraction, client: BotClient) {
    if (interaction.customId === 'botao-verificar') {

        const getVerificationTimeoutCount = () => new Date(Date.now() + (60_000 * 5));

        const guild = await prisma.guild.findUnique({
            where: { id: interaction.guild?.id }
        });

        if (!guild) {
            await interaction.reply({ content: constants.guildNotRegistered, ephemeral: true });
            return;
        }

        let memberInfoOnDatabase = await prisma.member.findUnique({
            where: { id: interaction.user.id }
        });

        if (memberInfoOnDatabase && memberInfoOnDatabase.try >= 3) {
            if (memberInfoOnDatabase.timestampTry >= new Date()) {
                await interaction.reply({ content: constants.getLeftTimeoutVerification(memberInfoOnDatabase.timestampTry.getTime()), ephemeral: true });
                return;
            }

            await prisma.member.update({
                where: { id: interaction.user.id },
                data: { try: 1, timestampTry: getVerificationTimeoutCount() }
            });
        }

        const roleVerification = interaction.guild?.roles.cache.get(guild.verifiedRoleId as string) as Role;
        const mainDivRole = interaction.guild?.roles.cache.get(guild.mainPartitionRoleId as string) as Role;
        const statusPartitionRole = interaction.guild?.roles.cache.get(guild.statusPartitionRoleId as string) as Role;
        const comunityPartitionRole = interaction.guild?.roles.cache.get(guild.comunityPartitionRoleId as string) as Role;
        const profilePartitionRole = interaction.guild?.roles.cache.get(guild.profilePartitionRoleId as string) as Role;
        const permissionPartitionRole = interaction.guild?.roles.cache.get(guild.permissionPartitionRoleId as string) as Role;
        const rolesPartitionRole = interaction.guild?.roles.cache.get(guild.rolesPartitionRoleId as string) as Role;
        const pingPartitionRole = interaction.guild?.roles.cache.get(guild.pingPartitionRoleId as string) as Role;

        const member = await interaction.guild?.members.fetch(interaction.user.id);

        if (member?.roles.cache.has(roleVerification.id)) {
            await interaction.reply({ content: constants.alreadyVerified, ephemeral: true });
            return;
        }

        const captchaCode = randomBytes(5).toString('hex').toUpperCase();

        const captchaSendedEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user?.username as string, iconURL: client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.captchaSended)
            .setColor('Green');

        const captchaResolveEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user?.username as string, iconURL: client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.resolveCaptcha.replace('{code}', captchaCode))
            .setColor('Green');

        const resolveCaptchaEmbedSended = await interaction.user.send({ embeds: [captchaResolveEmbed] }).catch(() => null);

        if (!resolveCaptchaEmbedSended) {
            await interaction.reply({ content: constants.closedDmError, ephemeral: true });
            return;
        }

        await interaction.reply({ embeds: [captchaSendedEmbed], ephemeral: true });

        const dmUserChannel = await interaction.user.createDM();
        const collector = dmUserChannel.createMessageCollector({ filter: m => m.author.id === interaction.user.id, max: 1 });

        collector.on('collect', async message => {

            memberInfoOnDatabase = await prisma.member.findUnique({
                where: { id: interaction.user.id }
            });

            if (!memberInfoOnDatabase) {
                await prisma.member.create({
                    data: {
                        id: interaction.user.id,
                        try: 1,
                        timestampTry: getVerificationTimeoutCount()
                    }
                });
            }

            if (message.content.toUpperCase() !== captchaCode) {
                await prisma.member.update({
                    where: { id: interaction.user.id },
                    data: { try: memberInfoOnDatabase?.try as number + 1, timestampTry: getVerificationTimeoutCount() }
                });

                await message.reply({ content: constants.wrongCaptchaReceived });
                return;
            }

            try {
                await member?.roles.add(roleVerification);
                await member?.roles.add(mainDivRole);
                await member?.roles.add(statusPartitionRole);
                await member?.roles.add(comunityPartitionRole);
                await member?.roles.add(profilePartitionRole);
                await member?.roles.add(permissionPartitionRole);
                await member?.roles.add(rolesPartitionRole);
                await member?.roles.add(pingPartitionRole);

                await prisma.member.update({
                    where: { id: interaction.user.id },
                    data: { try: 0, timestampTry: getVerificationTimeoutCount() }
                });

                await message.channel.send(constants.successCaptchaResolve);

            } catch (err) {
                await message.reply({ content: constants.addRoleError });
                client.logger.showError((err as Error).message, (err as Error).message);
            }
        });
    }
}