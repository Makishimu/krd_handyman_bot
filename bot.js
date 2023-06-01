import {Telegraf, Scenes, session, Composer} from 'telegraf' ;
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

import {
    SEND_CONTACTS_TRIGGER_WORDS_LIST,
    ADD_CONTACTS_TRIGGER_WORDS_LIST,
    HELP_TRIGGER_WORDS_LIST,
    PRICES_LIST_TRIGGER_WORDS_LIST,
    DIFFERENT_ACTIONS_BUTTONS
} from './config/consts.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = ()=> {

    // Создание и работа со сценой отправки данных для связи, не стал выносить в файл в этом комите
    const startWizardStep = new Composer();
    const requestTextStep = new Composer();
    const contactsStep = new Composer();
    const sendContactsStep = new Composer();

    startWizardStep.on('text', async ctx => {
        ctx.wizard.state.data = {};
        await ctx.replyWithHTML(
            '<b>Вы запросили обратную связь/консуьтацию мастера:</b>\n\n' +
            '<i>Отсылая свои контактные данные, Вы даёте своё согласие на их хранение и обработку.</i>\n\n' +
            'Отправка запроса будет проходить в несколько шагов, <b>сейчас Вы на первом шаге</b>' +
            ' <b>опиште проблему или вопрос</b>, чтобы наши специалиты смогли как можно более точно ответить Вам.'
        );
        return ctx.wizard.next();
    });
    requestTextStep.on('text', async ctx => {
        ctx.wizard.state.data.request = ctx.message.text;
        await ctx.replyWithHTML(
            '<b>Это второй шаг:</b>\n\n' +
            'Укажите <b>Ваше имя</b>, чтобы мастеру было понтяно как к Вам обращаться при ответе.'
        );
        return ctx.wizard.next();
    });
    contactsStep.on('text', async ctx => {
        ctx.wizard.state.data.name = ctx.message.text;
        await ctx.replyWithHTML(
            '<b>Это третий шаг:</b>\n\n' +
            'Укажите <b>Ваш номер телефона</b>, вида <i>+7(999)999-99-99</i>, чтобы мастеру смог связаться с Вами, дуступным для него способом.'
        );
        return ctx.wizard.next();
    });
    sendContactsStep.on('text', async ctx => {
        ctx.wizard.state.data.number = ctx.message.text;
        ctx.wizard.state.data.username = ctx.message.from.username || false;
        await ctx.replyWithHTML(
            '<b>Благодарю за обращение, мастер обязательно свяжется в Вами.</b>'
        );
        await ctx.replyWithHTML(
            '<i>Такое сообщение будет прихожить в телеграм мастеру, сразу как кто-либо отправит запрос:</i>\n\n' +
            '<b>Внмание, поступило новое обращение!</b>\n\n' +
            `<b>Текст обращения:</b>\n${ctx.wizard.state.data.request}.\n\n` +
            '<u>Контакстные данные:</u>\n' +
            `Как обращаться - ${ctx.wizard.state.data.name}.\n` +
            `Телефон - ${ctx.wizard.state.data.number}.\n` +
            `${ctx.wizard.state.data.username ?
                `Позьлователя можно найти в телегарме по нику @${ctx.wizard.state.data.username}` :
                ''
            }`
        );
        return ctx.scene.leave();
    });

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
    bot.on('message', not_understand_command);

    return bot;
};

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export {
    setupBot
};