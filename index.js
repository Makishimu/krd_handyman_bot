import { setupBot } from './bot.js';

(async function () {
    try {
        await setupBot().launch();

    } catch (error) {
        console.log('Starting ERROR - ', error);
    }
}());