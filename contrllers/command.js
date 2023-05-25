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

const start = async ctx => {
    try {
        if (ctx.message) {
            await ctx.replyWithHTML(
                `Добрый день, рады Вас видеть ${ctx.message?.from?.first_name || 'в нашем боте'}!\n\n` +
                'Наши мастера оказывают одни из самых качественных услуг в городе Краснодаре, ' +
                'предлагаю ознакомиться по подробнее с видами проводимых ими работ и предоставляемых услуг!\n\n' +
                '<b>Выберите подходящий вид услуг:</b>\n<i>Все цены указаны в рублях</i>',
                Markup.inlineKeyboard(priceList.map(item => {
                    return [Markup.button.callback(item.title, item.id)]
                }))
            );
            await ctx.replyWithHTML(
                '<b>Так же вы сожете посмотреть список котнактов наших мастеров:</b>\n\n',
                Markup.inlineKeyboard([[
                    Markup.button.callback(
                        differentActionsButtons.sendContacts.title,
                        differentActionsButtons.sendContacts.id
                    )]])
            );
            await ctx.replyWithHTML(
                '<b>Сохранить контакты наших мастеров:</b>\n\n',
                Markup.inlineKeyboard([[
                    Markup.button.callback(
                        differentActionsButtons.addContacts.title,
                        differentActionsButtons.addContacts.id
                    )]])
            );
        } else {
            await ctx.replyWithHTML(
                '<b>Выберите подходящий вид услуг:</b>\n<i>Все цены указаны в рублях</i>',
                Markup.inlineKeyboard(priceList.map(item => {
                    return [Markup.button.callback(item.title, item.id)]
                }))
            );
        }

    } catch (error) {
        await console.log('`При выполнении операции /start возникла ошибка -', error);
        await ctx.reply(`При выполнении операции /start возникла ошибка - ${error.message}`)
    }

};
const help = async ctx => {
    await ctx.reply(helpText);
};

const appliances_repair_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithPhoto(
            { source: firstStepPicturesMap['appliances_repair']},
            { caption: firstStepAnswerTitlesMap['appliances_repair']}
        );
        await ctx.replyWithHTML(
            `<a href="${firstStepFilesMap['appliances_repair']}" >Ссылка на скачивание прайса</a>\n\n` +
            'Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 1_appliances_repair processing - ', error.message);
    }
};

const plumber_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithPhoto(
            { source: firstStepPicturesMap['plumber']},
            { caption: firstStepAnswerTitlesMap['plumber']}
        );
        await ctx.replyWithHTML(
            `<a href="${firstStepFilesMap['plumber']}" >Ссылка на скачивание прайса</a>\n\n` +
            'Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 2_plumber processing - ', error.message);
    }
};
const finishing_works_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithPhoto(
            { source: firstStepPicturesMap['finishing_works']},
            { caption: firstStepAnswerTitlesMap['finishing_works']}
        );
        await ctx.replyWithHTML(
            `<a href="${firstStepFilesMap['finishing_works']}" >Ссылка на скачивание прайса</a>\n\n` +
            'Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 3_finishing_works processing - ', error.message);
    }
};
const construction_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithPhoto(
            { source: firstStepPicturesMap['construction']},
            { caption: firstStepAnswerTitlesMap['construction']}
        );
        await ctx.replyWithHTML(
            `<a href="${firstStepFilesMap['construction']}" >Ссылка на скачивание прайса</a>\n\n` +
            'Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 4_construction processing - ', error.message);
    }
};
const send_contacts_command = async (ctx, hideAddContacts) => {
    try {
        await ctx.replyWithHTML(
            `<b>Павел</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>\n
            \n<b>Виталий</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>`
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
        await ctx.replyWithHTML('К списку работ:',
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
    appliances_repair_command,
    plumber_command,
    finishing_works_command,
    construction_command,
    send_contacts_command,
    add_contacts_command,
    not_understand_command
}