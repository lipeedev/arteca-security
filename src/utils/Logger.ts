import { BotClient } from '../Client';

export class Logger {
    client: BotClient;

    constructor(client: BotClient) {
        this.client = client;
    }

    loadEvents(events: string[]): void {
        const mappedEvents = events.map(ev => ({ event: ev.replace('.js', '') }));

        console.table(mappedEvents);
        console.log(`\x1b[33m[${events.length} EVENTOS CARREGADOS]\x1b[0m\n\n`);
    }

    loadCommands(commands: string[]): void {
        const mappedCommands = commands.map(cmd => ({ command: cmd.replace('.js', '') }));

        console.table(mappedCommands);
        console.log(`\x1b[33m[${commands.length} COMANDOS CARREGADOS]\x1b[0m\n\n`);
    }

    registerCommands() {
        console.log(`\x1b[34m[${this.client.commands.manager.size} COMANDOS REGISTRADOS NO DISCORD]\x1b[0m\n\n`);
    }

    loadClient(): void {
        console.log(`\x1b[34m[CLIENTE CONECTADO]\x1b[0m RODANDO EM ${this.client.guilds.cache.size} SERVIDORES.`);
    }

    showError(messageError: string, stackError: string): void {
        console.log(`\x1b[35m[ERRO]\x1b[0m MENSAGEM: ${messageError}.`);
        console.log(`\x1b[35m[ERRO]\x1b[0m CAMINHO: ${stackError}.`);
    }
}