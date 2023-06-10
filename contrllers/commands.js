import {
    BOT_COMMANDS_TEXT,
    PRICE_LIST,
    PRICE_ANSWER_TITLE_LIST_MAP,
    FIRST_STEP_PICTURES_MAP,
    PRICE_FILES_LIST_MAP,
    DIFFERENT_ACTIONS_BUTTONS,
    OTHER_TEXT_ANSWER,
    MASTERS_ARRAY,
} from '../config/consts.js';
import { Markup } from 'telegraf';
import { fmt, link, bold } from "telegraf/format";

const start = async ctx => {
    try {
        await ctx.replyWithHTML(
            `Добрый день, рады Вас видеть ${ctx.message?.from?.first_name || 'в нашем боте'}!\n\n` +
            '<b>Для работы с ботом, воспользутесь командами из меню:</b>' +
            BOT_COMMANDS_TEXT +
            '\n\nНаши мастера оказывают одни из самых качественных услуг в городе Краснодаре, ' +
            'предлагаю ознакомиться по подробнее с видами проводимых ими работ и предоставляемых услуг!\n\n' +
            '<b>Выберите подходящий вид услуг:</b>',
            Markup.inlineKeyboard(PRICE_LIST.map(item => {
                return [Markup.button.callback(item.title, item.id)]
            }))
        );
        await ctx.replyWithHTML(
            '<b>Так же Вы можете посмотреть список котнактов наших мастеров:</b>\n\n',
            Markup.inlineKeyboard([[
                Markup.button.callback(
                    DIFFERENT_ACTIONS_BUTTONS.sendContacts.title,
                    DIFFERENT_ACTIONS_BUTTONS.sendContacts.id
                )]])
        );
        await ctx.replyWithHTML(
            '<b>Сохранить контакты наших мастеров в пару кликов:</b>\n\n',
            Markup.inlineKeyboard([[
                Markup.button.callback(
                    DIFFERENT_ACTIONS_BUTTONS.addContacts.title,
                    DIFFERENT_ACTIONS_BUTTONS.addContacts.id
                )]])
        );

    } catch (error) {
        await console.log('`При выполнении операции /start возникла ошибка -', error);
        await ctx.reply(`При выполнении операции /start возникла ошибка - ${error.message}`)
    }

};
const help = async ctx => {
    await ctx.reply(BOT_COMMANDS_TEXT);
};

const servicesList =  async ctx => {
    await ctx.replyWithHTML(
        '<b>Выберите подходящий вид услуг:</b>',
        Markup.inlineKeyboard(PRICE_LIST.map(item => {
            return [Markup.button.callback(item.title, item.id)]
        }))
    );
}

const createReplyFunction = (type) => {
    return async ctx => {
        try {
            await ctx.answerCbQuery();
            await ctx.replyWithPhoto(
                { source: FIRST_STEP_PICTURES_MAP[type]},
                { caption: fmt
                        `${bold`${PRICE_ANSWER_TITLE_LIST_MAP[type]}`}
            \n${link(
                            '🔗📋Скачайте его, нажав на этот текст👈',
                            `${PRICE_FILES_LIST_MAP[type]}`
                        )}\n\nДля получения других ссылок, воспользуйтесь командой  /list
            `
                }
            );
        } catch (error) {
            console.error(`Error while ${type} processing - `, error.message);
        }
    }
};

const appliances_repair_command = createReplyFunction('appliances_repair');
const plumber_command = createReplyFunction('plumber');
const finishing_works_command = createReplyFunction('finishing_works');
const construction_command = createReplyFunction('construction');
const send_contacts_command = async (ctx, hideAddContacts) => {
    try {
        await ctx.replyWithHTML(
            `${
                MASTERS_ARRAY.map(
                    master => {
                        return (`<b>${master.name}</b>\nТелефон: <a href="tel:${master.phone}">${master.phone}</a>\n\n`)}
                ).join('')
            }`
        );
        if (!hideAddContacts) {
            await ctx.replyWithHTML('Добавьте наши контакты к себе в записную книгу:',
                Markup.inlineKeyboard(
                    [Markup.button.callback(
                        'Получить контакты',
                        'btn_get_contacts'
                    )])
            );
        }
        await ctx.replyWithHTML('Вернуться к списку стоимости услуг:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while send_contacts_command processing - ', error.message);
    }
};
const add_contacts_command = async ctx => {
    try {
        if (ctx && !ctx.message) {
            await ctx.answerCbQuery();
        }
        MASTERS_ARRAY.map(
            async master => {
                await ctx.replyWithContact(`${master.phone}`, `${master.name}`);
            }
        );

    } catch (error) {
        await ctx.reply(
            'Вы слишком часто запрашивали контакты наших мастеров и телеграм перестал их отправлять' +
            ', пожалуйста, добавьте уже контакты в ручном режиме :)'
        );
        await send_contacts_command(ctx, true);
        console.error('Error while add_contacts_command processing - ', error.message);
    }
};

const not_understand_command = async ctx => {
    try {
        await ctx.replyWithHTML(OTHER_TEXT_ANSWER);
    } catch (error) {
        console.error('Hearing Error - ', error.message);
    }
};

export {
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
}