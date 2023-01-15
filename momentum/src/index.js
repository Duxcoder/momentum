import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';
import Greetings from './modules/greetings/greetings';
import InputName from './modules/greetings/inputName';
import BackgroundSlider from './modules/backgroundSlider/backgroundSlider';
import Options from './modules/options/options';
import Weather from './modules/weather/weather';
import Quotes from './modules/quotes/quotes';
import Music from './modules/music/Music';

const locale = 'ru'
const optionSlider = {
    classWrapper: '.main',
    classArrowNext: '.slide-next',
    classArrowPrev: '.slide-prev',
    sourceImages: 'unsplash'
}
const defCity = (locale) => {
    return locale === 'ru' ? 'Минск' : 'Minsk'
}

Options(locale)

Greetings('.greeting', locale);
InputName('.name', locale);
Time('.time');
Calendar('.date', locale);
BackgroundSlider(optionSlider);
Weather(defCity(locale), locale);
Quotes();
Music();