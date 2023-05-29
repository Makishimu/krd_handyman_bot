import { setupBot } from './bot.js';

(async function () {
    try {
        if (process.env.NODE_ENV === 'DEV') {
            await setupBot().launch();
            console.log('Starting in DEV mode!');
        } else {
            setupBot()
                .launch({ webhook: { domain: process.env.WEBHOOK_DOMAIN, port: process.env.PORT } })
                .then(() => console.log(
                    "Starting in PROD mode! Webhook bot listening on port", process.env.PORT
                ));
        }

    } catch (error) {
        console.log('Starting ERROR - ', error);
    }
}());