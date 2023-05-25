import { Telegraf } from 'telegraf' ;
import dotenv from 'dotenv';
dotenv.config();


// Подключение функций комманд
import {
    start,
    help,
    appliances_repair_command,
    plumber_command,
    finishing_works_command,
    construction_command,
    send_contacts_command,
    add_contacts_command,
    not_understand_command
} from './contrllers/command.js';


const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = ()=> {
    bot.start(start);
    bot.help(help);

    // Обработка команд для отгрузки pdf документов
    bot.action('btn_back',  async ctx => {
       try {
           await start(ctx);
       } catch (error) {
           console.log('btn_back ERROR - ', error.message);
       }
    });
    bot.command('contacts',  send_contacts_command);
    bot.command('save_contacts',  add_contacts_command);
    bot.action('1_appliances_repair', appliances_repair_command);
    bot.action('2_plumber', plumber_command);
    bot.action('3_finishing_works', finishing_works_command);
    bot.action('4_construction', construction_command);
    bot.action('btn_get_contacts', add_contacts_command);

    // Обработка текстовых сообщений
    bot.on('message', not_understand_command);

    return bot;
};

export {
    setupBot
};