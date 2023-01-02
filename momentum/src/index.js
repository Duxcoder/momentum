import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';
import Greetings from './modules/greetings/greetings';
import InputName from './modules/greetings/inputName';
import BackgroundSlider from './modules/backgroundSlider/backgroundSlider';

const locale =  {
    en: 'en',
    ru: 'ru'
}

const optionSlider = {
    classWrapper: '.main',
    classArrowNext: '.slide-next',
    classArrowPrev: '.slide-prev'
}

Greetings('.greeting', locale.ru);
InputName('.name', locale.ru);
Time('.time');
Calendar('.date', locale.ru);
BackgroundSlider(optionSlider)