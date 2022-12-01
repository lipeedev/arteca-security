import { Command, OptionsExecute } from '../../structures';
import type { BotClient } from '../../Client';
import { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { constants, IBotInfoDescription } from '../../utils/constants';

export default class BotInfoCommand extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'botinfo',
            description: 'shows Bot information.',
            type: ApplicationCommandType.ChatInput,
        });
    }

    async execute({ interaction }: OptionsExecute) {
        const botInfoData: IBotInfoDescription = {
            userMention: interaction.user,
            botName: this.client.user?.tag as string,
            changelog: 'Não disponivel em Alpha',
            devUserMention: await this.client.users.fetch('590980167590084631'),
            guildsCount: this.client.guilds.cache.size,
            ping: this.client.ws.ping,
            version: '1.0.0',
            status: 'Em Alpha',
            botAvatar: this.client.user?.displayAvatarURL({ forceStatic: false }) as string
        };


        const embed = new EmbedBuilder()
            .setColor('#0066ff')
            .setAuthor({ name: botInfoData.botName, iconURL: botInfoData.botAvatar })
            .setFooter({ text: botInfoData.botName, iconURL: botInfoData.botAvatar })
            .setTimestamp()
            .setThumbnail(botInfoData.botAvatar)
            .setDescription(constants.getBotInfoDescription(botInfoData));

        await interaction.reply({ embeds: [embed] });
    }

}