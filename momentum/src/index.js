import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';

const locale =  {
    en: 'en-us',
    ru: 'ru-ru'
}


Time('.time');
Calendar('.date', locale.ru);
