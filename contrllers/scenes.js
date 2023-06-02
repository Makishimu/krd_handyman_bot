import { Composer } from 'telegraf' ;

export const startWizardStep = new Composer();
export const requestTextStep = new Composer();
export const contactsStep = new Composer();
export const sendContactsStep = new Composer();

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