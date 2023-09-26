import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';
import Greetings from './modules/greetings/greetings';
import BackgroundSlider from './modules/backgroundSlider/backgroundSlider';
import Options from './modules/options/options';
import Weather from './modules/weather/weather';
import Quotes from './modules/quotes/quotes';
import Music from './modules/music/music';
import { ToDo, translateTodo } from './modules/toDo/toDo';

let locale = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru'
let optionSlider = {
    classWrapper: '.main',
    classArrowNext: '.slide-next',
    classArrowPrev: '.slide-prev',
    sourceImages: localStorage.getItem('bgSource') ? localStorage.getItem('bgSource').toLowerCase() : 'github',
    update: false
}
const defCity = (locale) => {
    return locale === 'ru' ? 'Минск' : 'Minsk'
}
const options = {
    greeting: true,
    time: true,
    calendar: true,
    backgroundSlider: true,
    weather: true,
    quotes: true,
    music: true,
    toDo: true,
    language: false
}

const changeLocal = (value) => {
    locale = value
}
const changeSourceBackground = (source) => {
    optionSlider.sourceImages = source
    optionSlider.update = true
}

const update = (options, updateToDo = false) => {
    let { greeting, time, calendar, backgroundSlider, weather, quotes, music, toDo, language } = options

    language ? changeLocal(options.language) : null
    backgroundSlider.update ? changeSourceBackground(backgroundSlider.source) : null


    if (greeting) { Greetings('.greeting', locale, '.name') } else { }
    if (time) { Time('.time') } else { }
    if (calendar) { Calendar('.date', locale) } else { }
    if (backgroundSlider) { BackgroundSlider(optionSlider); console.log(optionSlider) } else { }
    if (weather) { Weather(defCity(locale), locale) } else { }
    if (quotes) { Quotes(locale) } else { }
    if (toDo) { updateToDo ? translateTodo(locale) : ToDo(locale) } else { }
}

Options(update, locale)
Music()
update(options);


