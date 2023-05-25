import {
    helpText,
    priceList,
    firstStepAnswerTitlesMap,
    firstStepPicturesMap,
    firstStepFilesMap
} from '../config/consts.js';
import { Markup } from 'telegraf';

const start = async ctx => {
    try {
        if (ctx.message) {
            await ctx.replyWithHTML(
                `Добрый день, рады Вас видеть ${ctx.message?.from?.first_name || 'в нашем боте'}!\n\n` +
                '<b>Выберите подходящий вид услуг:</b>\n<i>Все цены указаны в рублях</i>',
                Markup.inlineKeyboard(priceList.map(item => {
                    return [Markup.button.callback(item.title, item.id)]
                }))
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
        await console.log('`При выполнении операции /start озникла ошибка -', error);
        await ctx.reply(`При выполнении операции /start озникла ошибка - ${error.message}`)
    }

};
const help = async ctx => {
    await ctx.reply(helpText);
};

const appliances_repair_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>${firstStepAnswerTitlesMap['appliances_repair']}</b>`);
        await ctx.replyWithPhoto({ source: firstStepPicturesMap['appliances_repair']});
        await ctx.replyWithHTML(`<a href="${firstStepFilesMap['appliances_repair']}" >Ссылка на скачивание прайса</a>`);
        await ctx.replyWithHTML('Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 1_appliances_repair processing - ', error.message);
    }
};

const plumber_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>${firstStepAnswerTitlesMap['plumber']}</b>`);
        await ctx.replyWithPhoto({ source: firstStepPicturesMap['plumber']});
        await ctx.replyWithHTML(`<a href="${firstStepFilesMap['plumber']}" >Ссылка на скачивание прайса</a>`);
        await ctx.replyWithHTML('Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 2_plumber processing - ', error.message);
    }
};
const finishing_works_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>${firstStepAnswerTitlesMap['finishing_works']}</b>`);
        await ctx.replyWithPhoto({ source: (firstStepPicturesMap['finishing_works'])});
        await ctx.replyWithHTML(`<a href="${firstStepFilesMap['finishing_works']}" >Ссылка на скачивание прайса</a>`);
        await ctx.replyWithHTML('Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 3_finishing_works processing - ', error.message);
    }
};
const construction_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>${firstStepAnswerTitlesMap['construction']}</b>`);
        await ctx.replyWithPhoto({ source: firstStepPicturesMap['construction']});
        await ctx.replyWithHTML(`<a href="${firstStepFilesMap['construction']}" >Ссылка на скачивание прайса</a>`);
        await ctx.replyWithHTML('Вы можете вернуться и скачать информацию о других работах:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while 4_construction processing - ', error.message);
    }
};
const send_contacts_command = async ctx => {
    try {
        await ctx.replyWithHTML(
            `<b>Павел</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>\n
            \n<b>Виталий</b>\nТелефон: <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>`
        );
        await ctx.replyWithHTML('Добавьте наши контакты к себе в записную книгу :',
            Markup.inlineKeyboard([Markup.button.callback('Получить контакты', 'btn_get_contacts')])
        );
        await ctx.replyWithHTML('К списку работ:',
            Markup.inlineKeyboard([Markup.button.callback('Назад', 'btn_back')])
        );
    } catch (error) {
        console.error('Error while send_contacts_command processing - ', error.message);
    }
};
const add_contacts_command = async ctx => {
    try {
        await ctx.answerCbQuery();
        await ctx.sendContact('+7(999)999-99-99', 'Павел');
        await ctx.sendContact('+7(999)999-99-99', 'Виталий');
    } catch (error) {
        console.error('Error while add_contacts_command processing - ', error.message);
    }
};

const not_understand_command = async ctx => {
    try {
        await ctx.reply('Я не понимаю текст, пожалуйста используйте команды.');
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