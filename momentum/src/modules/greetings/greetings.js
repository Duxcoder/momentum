import TimesOfDay from "./timesOfDay";
const Greetings = (classWrapper, lang = 'en') => {
    const wrapper = document.querySelector(classWrapper);
    wrapper.textContent = TimesOfDay(lang)
}
export default Greetings