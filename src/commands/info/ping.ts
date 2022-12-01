import { Command, OptionsExecute } from '../../structures';
import type { BotClient } from '../../Client';
import { ApplicationCommandType } from 'discord.js';

export default class PingCommand extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'ping',
            description: 'shows bot ping.',
            type: ApplicationCommandType.ChatInput,
        });
    }

    async execute({ interaction }: OptionsExecute) {
        interaction.reply(`meu ping é de \`${this.client.ws.ping}\` ms`);
    }

}