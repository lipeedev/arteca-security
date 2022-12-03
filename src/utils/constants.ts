import { User } from 'discord.js';

export interface IBotInfoDescription {
    userMention: User;
    botName: string;
    guildsCount: number;
    ping: number;
    devUserMention: User;
    version: string;
    status: string;
    changelog: string;
    botAvatar: string;
}

export const constants = {
    successVerificationSetup: '✅ Canal de verificação configurado com sucesso!',
    verificationInfo: 'Clique no botão e resolva o Captcha enviado no privado para liberar a verificação.',
    guildAlreadyRegistred: 'Este servidor já possui um canal configurado para verificações.',
    captchaSended: 'Responda o Captcha que foi enviado na sua DM corretamente para se verificar.',
    resolveCaptcha: 'Digite este código para ser liberado: {code}',
    wrongCaptchaReceived: 'Você digitou o Código Captcha errado!\nVolte ao servidor para tentar novamente.',
    genericError: '❌ Um erro ocorreu durante a execução desta operação.',
    addRoleError: '❌ Um erro ocorreu, verifique a hierarquia de cargos e permissões.',
    successCaptchaResolve: '✅ Você digitou o código corretamente! agora já está verificado.',
    closedDmError: '❌ Você bloqueou mensagens diretas, não consigo enviar mensagens na sua DM. Permita o envio e tente novamente!',
    alreadyVerified: '❌ Você já está verificado.',
    getLeftTimeoutVerification: (time: number) => `Você excedeu o máximo de tentativas, aguarde alguns instantes. <t:${Math.floor(time / 1000)}:R>`,
    guildNotRegistered: '❌ Este servidor não está configurado para verificação.',
    getBotInfoDescription: ({ userMention, botName, guildsCount, ping, devUserMention, version, status, changelog }: IBotInfoDescription) => `Olá ${userMention}, veja minhas informações abaixo:\n\n> 🤖 Nome: \`${botName}\`.\n>\n> ⚙ Servidores: \`${guildsCount}\`.\n> ⚙ Ping: \`${ping}\`.\n> 🤖 Desenvolvedor: ${devUserMention} \n> ⚙ Versão: \`${version}\`.\n>  ⚙ Estado: \`${status}\`.\n> ⚙ Changelog: \`${changelog}\`.`
};