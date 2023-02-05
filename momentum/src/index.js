import './css/owfont-regular.css'
import './css/style.css'
import Time from './modules/time/time'
import Calendar from './modules/calendar/calendar';
import Greetings from './modules/greetings/greetings';
import BackgroundSlider from './modules/backgroundSlider/backgroundSlider';
import Options from './modules/options/options';
import Weather from './modules/weather/weather';
import Quotes from './modules/quotes/quotes';
import Music from './modules/music/Music';
import ToDo from './modules/toDo/toDo';

let locale = 'ru'
let optionSlider = {
    classWrapper: '.main',
    classArrowNext: '.slide-next',
    classArrowPrev: '.slide-prev',
    sourceImages: 'unsplash'
}
const defCity = (locale) => {
    return locale === 'ru' ? 'Минск' : 'Minsk'
}
const options = {
    greeting: true,
    time: true,
    calendar: true,
    backgroundSlider: 'unsplash',
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
}

const update = (options) => {
    let {greeting, time, calendar, backgroundSlider, weather, quotes, music, toDo, language} = options

    language ? changeLocal(options.language) : null
    backgroundSlider ? changeSourceBackground(backgroundSlider) : null

    
    if (greeting) { Greetings('.greeting', locale, '.name')} else {}
    if (time) { Time('.time')} else {}
    if (calendar) { Calendar('.date', locale)} else {}
    if (backgroundSlider) { BackgroundSlider(optionSlider)} else {}
    if (weather) { Weather(defCity(locale), locale)} else {}
    if (quotes) {  Quotes()} else {}
    if (music) { Music()} else {}
    if (toDo) { ToDo()} else {}
}

Options(update, locale)

update(options);


