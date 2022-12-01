declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            DATABASE_URL: string;
            GUILD_DEV: string;
            ENV: 'prod' | 'dev';
        }
    }
}

export { };