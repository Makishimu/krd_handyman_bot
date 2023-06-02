import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BOT_COMMANDS_TEXT = `
/start - Начать общение
/list - Список услуг и работ
/contacts - Список контактов
/save_contacts - Получить контакты для сохранения в телефон
/send_request - Задать вопрос мастеру
/help - Список команд
`;

const FIRST_STEP_PICTURES_MAP = {
    plumber: resolve(__dirname, '../pictures/plumber.jpg'),
    appliances_repair: resolve(__dirname, '../pictures/appliances_repair.jpg'),
    finishing_works: resolve(__dirname, '../pictures/finishing_works.jpg'),
    construction: resolve(__dirname, '../pictures/construction.jpg'),

};

const PRICE_FILES_LIST_MAP = {
    plumber: 'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    appliances_repair:  'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    finishing_works: 'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',
    construction:  'https://disk.yandex.ru/i/40MTqqg9LUb7Jw',

};

const PRICE_ANSWER_TITLE_LIST_MAP = {
    plumber: 'Вы выбрали прайс лист по сантехническим работам:',
    appliances_repair: 'Вы выбрали прайс лист по ремонту бытовой техники:',
    finishing_works: 'Вы выбрали прайс лист по отделочным работам:',
    construction: 'Вы выбрали прайс лист по строительным работам:',

};

const PRICE_LIST = [
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

const DIFFERENT_ACTIONS_BUTTONS = {
    sendContacts: {
        id: '5_send_contacts',
        title: 'Контакты'
    },
    addContacts: {
        id: '6_add_contacts',
        title: 'Сохранить контакты'
    }
};

const SEND_CONTACTS_TRIGGER_WORDS_LIST = [
    'Контакты',
    'контакты',
    'Список контактов',
    'список контактов'
];
const ADD_CONTACTS_TRIGGER_WORDS_LIST = [
    'Контакты на телефон',
    'контакты на телефон',
    'Сохранить контакты',
    'сохранить контакты'
];
const HELP_TRIGGER_WORDS_LIST = [
    'Список команд',
    'список команд',
    'Помощь',
    'помощь'
];
const PRICES_LIST_TRIGGER_WORDS_LIST = [
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

const SEND_QUESTION_TRIGGER_WORDS_LIST = [
    'Обратная связь',
    'обратная связь',
    'Написать мастеру',
    'написать мастеру',
    'Задать вопрос',
    'задать вопрос',
    'услуги'
];

const OTHER_TEXT_ANSWER =
    'Что-что? Не понял. Видимо, это не совсем тот текст, что я ожидаю получить от Вас.\n\n' +
    '<b>Я понимаю только этот текст, для отравки списка контактов:</b>\n\n' +
    `<i>${SEND_CONTACTS_TRIGGER_WORDS_LIST.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для сохранения контактов в телефон:</b>\n\n' +
    `<i>${ADD_CONTACTS_TRIGGER_WORDS_LIST.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для получения списка команд:</b>\n\n' +
    `<i>${HELP_TRIGGER_WORDS_LIST.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, для получения списка работ:</b>\n\n' +
    `<i>${PRICES_LIST_TRIGGER_WORDS_LIST.join(', ')}</i>.\n\n\n` +
    '<b>Я понимаю только этот текст, чтобы задать вопрос мастеру:</b>\n\n' +
    `<i>${SEND_QUESTION_TRIGGER_WORDS_LIST.join(', ')}</i>.\n\n\n` +
    '<b>А так же, команды:</b>\n' +
    BOT_COMMANDS_TEXT;

const MASTERS_ARRAY = [
    {
        id: 1,
        name: 'Мастер ремонта Павел',
        phone: '+7(999)999-99-99'
    },
    {
        id: 2,
        name: 'Мастер ремонта Виталий',
        phone: '+7(999)999-99-99'
    }
];

export {
    BOT_COMMANDS_TEXT,
    PRICE_LIST,
    FIRST_STEP_PICTURES_MAP,
    PRICE_FILES_LIST_MAP,
    PRICE_ANSWER_TITLE_LIST_MAP,
    DIFFERENT_ACTIONS_BUTTONS,
    SEND_CONTACTS_TRIGGER_WORDS_LIST,
    ADD_CONTACTS_TRIGGER_WORDS_LIST,
    HELP_TRIGGER_WORDS_LIST,
    PRICES_LIST_TRIGGER_WORDS_LIST,
    SEND_QUESTION_TRIGGER_WORDS_LIST,
    OTHER_TEXT_ANSWER,
    MASTERS_ARRAY
}

