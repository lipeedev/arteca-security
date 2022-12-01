import type { Interaction } from 'discord.js';
import { OptionsExecute, Event } from '../structures';
import type { BotClient } from '../Client';
import { manageCaptcha } from '../utils/manageCaptcha';

export default class InteractionCreate extends Event {
    name: string;

    constructor() {
        super();
        this.name = 'interactionCreate';
    }

    async execute(client: BotClient, interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.getCommand(interaction.commandName);
            await command?.execute({ interaction } as OptionsExecute);
        }

        if (interaction.isButton()) {
            await manageCaptcha(interaction, client);
        }

    }
}