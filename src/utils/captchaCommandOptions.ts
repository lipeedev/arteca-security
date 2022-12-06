import { ApplicationCommandOptionData, ApplicationCommandOptionType } from 'discord.js';

export const captchaCommandOptions: ApplicationCommandOptionData[] = [{
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
},

{
    name: 'main-div',
    required: true,
    description: 'main div (Arteca Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'status-div',
    required: true,
    description: 'status div (Status Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'comunity-div',
    required: true,
    description: 'comunity div (Comunity Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'profile-div',
    required: true,
    description: 'profile div (Profile Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'permission-div',
    required: true,
    description: 'permission div (Permissions Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'role-div',
    required: true,
    description: 'role div (Roles Role div).',
    type: ApplicationCommandOptionType.Role
},

{
    name: 'ping-div',
    required: true,
    description: 'ping div (Ping Role div).',
    type: ApplicationCommandOptionType.Role
}];