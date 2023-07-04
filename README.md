# krd_handyman_bot
My first Telegram-chat-bot hamdymans from Krasnodar. Use NodeJs, Telegraf and nodemon while development.

You need to have Telegram bot token, go to the `*` if you don't have that one.

`ATTENTION`

Before you will start, you need to have `.env` file with next variables:
- NODE_ENV (as `DEV` in development mode and other in external server);
- BOT_TOKEN (your telegram-bot token);
- PORT (for external server starting, not necessarily for local development/using);
- WEBHOOK_DOMAIN (for external server starting, not necessarily for local development/using);

How to start:

1. Clone the repository.
2. `npm install`.
3.  Use `npm run dev` while local development, 'nodemon' will refresh your bot. Or Use `npm run start` for external server.

`*`How to get Telegram-bot token:
  - Go to the Telegram and find `@BotFather`;
  - `/newbot`;
  - Choose a name for your bot;
  - Choose a username for your bot. It must end in bot. Like this, for example: Tetris Bot or tetris_bot;
  - Congrats, after those steps you have a token (after "Use this token to access the HTTP API:").
