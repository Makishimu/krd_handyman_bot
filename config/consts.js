import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const botCommandsTextForHelp = `
/start - Начать общение
/list - Список услуг и работ
/contacts - Список контактов
/save_contacts - Получить контакты для сохранения в телефон
/help - Список команд
`;

const pictureListMap = {
    plumber: resolve(__dirname, '../pictures/plumber.jpg'),
    appliances_repair: resolve(__dirname, '../pictures/appliances_repair.jpg'),
    finishing_works: resolve(__dirname, '../pictures/finishing_works.jpg'),
    construction: resolve(__dirname, '../pictures/construction.jpg'),

};

const priceFilesListMap = {
    plumber: 'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    appliances_repair:  'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    finishing_works: 'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    construction:  'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',

};

const priceAnswerTitleListMap = {
    plumber: 'Вы выбрали прайс лист по сантехническим работам',
    appliances_repair: 'Вы выбрали прайс лист по ремонту бытовой техники',
    finishing_works: 'Вы выбрали прайс лист по отделочным работам',
    construction: 'Вы выбрали прайс лист по строительным работам',

};

const priceListArrayLight = [
    {
        id: '1_appliances_repair',
        title: 'Ремонт бытовой техники',
    },
    {
        id: '2_plumber',
        title: 'Услуги сантехника',
    },
    {
        id: '3_finishing_works',
        title: 'Отделочные работы',

    },
    {
        id: '4_construction',
        title: 'Строительные работы',
    }
];

const differentActionsButtons = {
    sendContacts: {
        id: '5_send_contacts',
        title: 'Контакты'
    },
    addContacts: {
        id: '6_add_contacts',
        title: 'Сохранить контакты'
    }
};

const sendContactsTriggerWorldsList = [
    'Контакты',
    'контакты',
    'Список контактов',
    'список контактов'
];
const addContactsTriggerWorldsList = [
    'Контакты на телефон',
    'контакты на телефон',
    'Сохранить контакты',
    'сохранить контакты'
];
const helpTriggerWorldsList = [
    'Список команд',
    'список команд',
    'Помощь',
    'помощь'
];
const pricesListTriggerWorldsList = [
    'Список услуг и работ',
    'список услуг и работ',
    'Список услуг',
    'список услуг',
    'Список работ',
    'список работ',
    'Список',
    'список',
    'Прайс лист',
    'прайс лист',
    'Прайс',
    'прайс',
    'Услуги',
    'услуги'
];

const otherTextAnswer =
    'Что-что? Не понял. Видимо, это не совсем тот текст, что я ожидаю получить от Вас.\n\n' +
    '<b>Я понимаю только этот текст, для отравки списка контактов:</b>\n\n' +
    `<i>${sendContactsTriggerWorldsList.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для сохранения контактов в телефон:</b>\n\n' +
    `<i>${addContactsTriggerWorldsList.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для получения списка команд:</b>\n\n' +
    `<i>${helpTriggerWorldsList.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для получения списка работ:</b>\n\n' +
    `<i>${pricesListTriggerWorldsList.join(', ')}</i>.\n\n\n` +
    '<b>А так же, команды:</b>\n' +
    botCommandsTextForHelp;

export {
    botCommandsTextForHelp  as helpText,
    priceListArrayLight as priceList,
    pictureListMap as firstStepPicturesMap,
    priceFilesListMap as firstStepFilesMap,
    priceAnswerTitleListMap as firstStepAnswerTitlesMap,
    differentActionsButtons,
    sendContactsTriggerWorldsList,
    addContactsTriggerWorldsList,
    helpTriggerWorldsList,
    pricesListTriggerWorldsList,
    otherTextAnswer
}

