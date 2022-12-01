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
            where: {
                id_guildId: {
                    guildId: interaction.guild?.id as string,
                    id: interaction.user.id
                }
            }
        });

        if (memberInfoOnDatabase && memberInfoOnDatabase.try >= 3) {
            if (memberInfoOnDatabase.timestampTry >= new Date()) {
                await interaction.reply({ content: constants.leftTimeoutVerification, ephemeral: true });
                return;
            }

            await prisma.member.update({
                where: {
                    id_guildId: {
                        guildId: interaction.guild?.id as string,
                        id: interaction.user.id
                    }
                },
                data: { try: 1, timestampTry: getVerificationTimeoutCount() }
            });
        }

        const roleVerification = interaction.guild?.roles.cache.get(guild.verifiedRoleId) as Role;
        const member = await interaction.guild?.members.fetch(interaction.user.id);

        if (member?.roles.cache.has(roleVerification.id)) {
            await interaction.reply({ content: constants.alreadyVerified, ephemeral: true });
            return;
        }

        const captchaCode = randomBytes(6).toString('hex').toUpperCase();

        const captchaSendedEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user?.username as string, iconURL: client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.captchaSended)
            .setColor('Green');

        const resolveCaptchaEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user?.username as string, iconURL: client.user?.displayAvatarURL({ forceStatic: false }) })
            .setDescription(constants.resolveCaptcha.replace('{code}', captchaCode))
            .setColor('Green');

        const resolveCaptchaEmbedSended = await interaction.user.send({ embeds: [resolveCaptchaEmbed] }).catch(() => null);

        if (!resolveCaptchaEmbedSended) {
            await interaction.reply({ content: constants.closedDmError, ephemeral: true });
            return;
        }

        await interaction.reply({ embeds: [captchaSendedEmbed], ephemeral: true });

        const dmUserChannel = await interaction.user.createDM();
        const collector = dmUserChannel.createMessageCollector({ filter: m => m.author.id === interaction.user.id, max: 1 });

        collector.on('collect', async message => {

            memberInfoOnDatabase = await prisma.member.findUnique({
                where: {
                    id_guildId: {
                        guildId: interaction.guild?.id as string,
                        id: interaction.user.id
                    }
                }
            });

            if (message.content !== captchaCode) {
                if (!memberInfoOnDatabase) {
                    await prisma.member.create({
                        data: {
                            guildId: interaction.guild?.id as string,
                            id: interaction.user.id,
                            try: 1,
                            timestampTry: getVerificationTimeoutCount()
                        }
                    });
                } else {
                    await prisma.member.update({
                        where: {
                            id_guildId: {
                                guildId: interaction.guild?.id as string,
                                id: interaction.user.id
                            }
                        },
                        data: { try: memberInfoOnDatabase.try + 1, timestampTry: getVerificationTimeoutCount() }
                    });
                }

                await message.reply({ content: constants.wrongCaptchaReceived });
                return;
            }

            const roleAdded = await member?.roles.add(roleVerification).catch(() => null);

            await prisma.member.update({
                where: {
                    id_guildId: {
                        guildId: interaction.guild?.id as string,
                        id: interaction.user.id
                    }
                },
                data: { try: 0, timestampTry: getVerificationTimeoutCount() }
            }).catch(() => null);

            if (!roleAdded) {
                await message.reply({ content: constants.addRoleError });
                return;
            }

            await message.channel.send(constants.successCaptchaResolve);
        });
    }
}