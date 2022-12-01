import { Client, GatewayIntentBits, ActivityType, Partials } from 'discord.js';
import { EventManager, CommandManager } from './managers';
import { Logger } from './utils/Logger';

export class BotClient extends Client {
    events: EventManager;
    commands: CommandManager;
    logger: Logger;

    constructor() {
        super({
            allowedMentions: { repliedUser: false },
            failIfNotExists: false,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.DirectMessages
            ],
            ws: { properties: { browser: 'Discord iOS' } },
            presence: {
                status: process.env.ENV === 'dev' ? 'idle' : 'online',
                activities: [{
                    name: process.env.ENV === 'dev' ? 'in development...' : 'Arteca BOT',
                    type: process.env.ENV === 'dev' ? ActivityType.Watching : ActivityType.Playing
                }]
            },
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User
            ]
        });

        this.logger = new Logger(this);
        this.events = new EventManager(this);
        this.commands = new CommandManager(this);
    }

    async start() {
        await super.login(process.env.BOT_TOKEN);
        await this.events.loadEvents();
        await this.commands.loadCommands(this);
        if (process.env.ENV === 'dev') await this.commands.registerLocalCommands();

        process.on('uncaughtException', (err: Error) => this.logger.showError(err.message, err.stack as string));
        process.on('unhandledRejection', (err: Error) => this.logger.showError(err.message, err.stack as string));
    }

}