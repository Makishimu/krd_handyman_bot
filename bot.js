import { Telegraf, Scenes, session } from 'telegraf' ;
import dotenv from 'dotenv';
dotenv.config();

// Подключение функций комманд
import {
    start,
    help,
    servicesList,
    appliances_repair_command,
    plumber_command,
    finishing_works_command,
    construction_command,
    send_contacts_command,
    add_contacts_command,
    not_understand_command
} from './contrllers/command.js';

// Подключение констант
import {
    SEND_CONTACTS_TRIGGER_WORDS_LIST,
    ADD_CONTACTS_TRIGGER_WORDS_LIST,
    HELP_TRIGGER_WORDS_LIST,
    PRICES_LIST_TRIGGER_WORDS_LIST,
    SEND_QUESTION_TRIGGER_WORDS_LIST,
    DIFFERENT_ACTIONS_BUTTONS
} from './config/consts.js';
// Подключение шагов для сцены

import {
    startWizardStep,
    requestTextStep,
    contactsStep,
    sendContactsStep
} from "./contrllers/scenes.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = ()=> {

    // Создание и работа со сценой отправки данных для связи
    const requestConnectionScene = new Scenes.WizardScene(
        'requestConnectionWizard',
        startWizardStep,
        requestTextStep,
        contactsStep,
        sendContactsStep
    );

    const stage = new Scenes.Stage([requestConnectionScene]);
    bot.use(session());
    bot.use(stage.middleware());

    // Обработка команд
    bot.start(start);
    bot.help(help);
    bot.command('contacts',  send_contacts_command);
    bot.command('save_contacts',  add_contacts_command);
    bot.command('list',  servicesList);
    bot.command('send_request',  async ctx => {
        await ctx.scene.enter('requestConnectionWizard');
    });

    // Обработка нажатия кнопок
    bot.action('btn_back',  async ctx => {
       try {
           await ctx.answerCbQuery();
           await servicesList(ctx);
       } catch (error) {
           console.log('btn_back ERROR - ', error.message);
       }
    });
    bot.action(DIFFERENT_ACTIONS_BUTTONS.sendContacts.id,  async ctx => {
        try {
            await ctx.answerCbQuery();
            await send_contacts_command(ctx);
        } catch (error) {
            console.log(`${DIFFERENT_ACTIONS_BUTTONS.sendContacts.id} ERROR - `, error.message);
        }
    });
    bot.action(DIFFERENT_ACTIONS_BUTTONS.addContacts.id,  async ctx => {
        try {
            await ctx.answerCbQuery();
            await add_contacts_command(ctx);
        } catch (error) {
            console.log(`${DIFFERENT_ACTIONS_BUTTONS.addContacts.id} ERROR - `, error.message);
        }
    });
    // По хорошему, надо тригеры брать из массива PRICE_LIST
    bot.action('1_appliances_repair', appliances_repair_command);
    bot.action('2_plumber', plumber_command);
    bot.action('3_finishing_works', finishing_works_command);
    bot.action('4_construction', construction_command);
    bot.action('btn_get_contacts', add_contacts_command);

    // Обработка текстовых сообщений
    bot.hears(SEND_CONTACTS_TRIGGER_WORDS_LIST, send_contacts_command);
    bot.hears(ADD_CONTACTS_TRIGGER_WORDS_LIST, add_contacts_command);
    bot.hears(HELP_TRIGGER_WORDS_LIST, help);
    bot.hears(PRICES_LIST_TRIGGER_WORDS_LIST, servicesList);
    bot.hears(SEND_QUESTION_TRIGGER_WORDS_LIST, async ctx => {
        await ctx.scene.enter('requestConnectionWizard');
    });
    bot.on('message', not_understand_command);

    return bot;
};

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export {
    setupBot
};