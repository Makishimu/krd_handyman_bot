# krd_handyman_bot
My first Telegram-chat-bot hamdymans from Krasnodar. Use NodeJs, Telegraf and nodemon while development.

You need to have Telegram bot token, go to the `*` if you don't have that one.

How to start:

1. Clone the repository.
2. You need to have `.env` file with BOT_TOKEN, PORT, NODE_ENV, WEBHOOK_DOMAIN and ADMIN_ID variables.
3. `npm install`.
4.  Use `npm run dev` while local development, 'nodemon' will refresh your bot. Or Use `npm run start` for external server.

`*`How to get Telegram-bot token:
  - Go to the Telegram and find `@BotFather`;
  - `/newbot`;
  - Choose a name for your bot;
  - Choose a username for your bot. It must end in bot. Like this, for example: Tetris Bot or tetris_bot;
  - Congrats, after those steps you have a token (after "Use this token to access the HTTP API:").

