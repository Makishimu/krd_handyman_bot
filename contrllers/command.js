import {
    helpText,
    priceList,
    firstStepAnswerTitlesMap,
    firstStepPicturesMap,
    firstStepFilesMap,
    differentActionsButtons,
    otherTextAnswer,
} from '../config/consts.js';
import { Markup } from 'telegraf';
import { fmt, link, bold } from "telegraf/format";

const start = async ctx => {
    try {
        await ctx.replyWithHTML(
            `Добрый день, рады Вас видеть ${ctx.message?.from?.first_name || 'в нашем боте'}!\n\n` +
            '<b>Для работы с ботом, воспользутесь командами из меню:</b>' +
            helpText +
            '\n\nНаши мастера оказывают одни из самых качественных услуг в городе Краснодаре, ' +
            'предлагаю ознакомиться по подробнее с видами проводимых ими работ и предоставляемых услуг!\n\n' +
            '<b>Выберите подходящий вид услуг:</b>',
            Markup.inlineKeyboard(priceList.map(item => {
                return [Markup.button.callback(item.title, item.id)]
            }))
        );
        await ctx.replyWithHTML(
            '<b>Так же Вы можете посмотреть список котнактов наших мастеров:</b>\n\n',
            Markup.inlineKeyboard([[
                Markup.button.callback(
                    differentActionsButtons.sendContacts.title,
                    differentActionsButtons.sendContacts.id
                )]])
        );
        await ctx.replyWithHTML(
            '<b>Сохранить контакты наших мастеров в пару кликов:</b>\n\n',
            Markup.inlineKeyboard([[
                Markup.button.callback(
                    differentActionsButtons.addContacts.title,
                    differentActionsButtons.addContacts.id
                )]])
        );

    } catch (error) {
        await console.log('`При выполнении операции /start возникла ошибка -', error);
        await ctx.reply(`При выполнении операции /start возникла ошибка - ${error.message}`)
    }

};
const help = async ctx => {
    await ctx.reply(helpText);
};

const servicesList =  async ctx => {
    await ctx.replyWithHTML(
        '<b>Выберите подходящий вид услуг:</b>',
        Markup.inlineKeyboard(priceList.map(item => {
            return [Markup.button.callback(item.title, item.id)]
        }))
    );
}

const createReplyFunction = (type) => {
    return async ctx => {
        try {
            await ctx.answerCbQuery();
            await ctx.replyWithPhoto(
                { source: firstStepPicturesMap[type]},
                { caption: fmt
                        `${bold`${firstStepAnswerTitlesMap[type]}.`}
            \n${link(
                            '🔗📋Скачайте его, нажав на этот текст👈',
                            `${firstStepFilesMap[type]}`
                        )}\n\nДля получения других ссылок, восползуйтесь командой  /list
            `
                }
            );
        } catch (error) {
            console.error('Error while 1_appliances_repair processing - ', error.message);
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
            `<b>Мастер ремонта Павел</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>\n
            \n<b>Мастер ремонта Виталий</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>`
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
        await ctx.sendContact('+7(999)999-99-99', 'Мастер ремонта Павел');
        await ctx.sendContact('+7(999)999-99-99', 'Мастер ремонта Виталий');
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
        await ctx.replyWithHTML(otherTextAnswer);
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