import TimesOfDay from "./timesOfDay";
import InputName from "./inputName";
const Greetings = (classWrapper, lang = 'en', classWrapperInput) => {
    const wrapper = document.querySelector(classWrapper);
    wrapper.textContent = TimesOfDay(lang)
    InputName(classWrapperInput, lang);
}
export default Greetings