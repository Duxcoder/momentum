import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';
import Greetings from './modules/greetings/greetings';
import inputName from './modules/greetings/inputName';

const locale =  {
    en: 'en',
    ru: 'ru'
}

Greetings('.greeting', locale.ru);
inputName('.name', locale.ru);
Time('.time');
Calendar('.date', locale.ru);