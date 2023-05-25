import { setupBot } from './bot.js';

(async function () {
    try {
        await setupBot().launch();

    } catch (error) {
        console.log('Starting ERROR - ', error);
    }
}());

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));