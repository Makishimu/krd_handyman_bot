import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const botCommandsTextForHelp = `
/start - Начать общение
/contacts - Спосок контактов
/help - Список команд
`;
const pictureListMap = {
    plumber: resolve(__dirname, '../pictures/plumber.jpg'),
    appliances_repair: resolve(__dirname, '../pictures/appliances_repair.jpg'),
    finishing_works: resolve(__dirname, '../pictures/finishing_works.jpg'),
    construction: resolve(__dirname, '../pictures/construction.jpg'),

};

const priceFilesListMap = {
    plumber: resolve(__dirname, '../documents/plumber_price_list.pdf'),
    appliances_repair: resolve(__dirname, '../documents/appliances_repair_price_list.pdf'),
    finishing_works: resolve(__dirname, '../documents/finishing_works_price_list.pdf'),
    construction: resolve(__dirname, '../documents/construction_price_list.pdf'),

};

const priceAnswerTitleListMap = {
    plumber: 'Вы выбрали прайсл лист по сантехническим работам:',
    appliances_repair: 'Вы выбрали прайсл лист по ремонту бытовой техники:',
    finishing_works: 'Вы выбрали прайсл лист по отделочным работам:',
    construction: 'Вы выбрали прайсл лист по строительным работам:',

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

export {
    botCommandsTextForHelp  as helpText,
    priceListArrayLight as priceList,
    pictureListMap as firstStepPicturesMap,
    priceFilesListMap as firstStepFilesMap,
    priceAnswerTitleListMap as firstStepAnswerTitlesMap,
}

