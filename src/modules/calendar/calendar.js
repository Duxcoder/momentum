const Calendar = (classWrapper, locale = 'en') => {
  const wrapper = document.querySelector(classWrapper);
  const date = new Date();
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const weekdayDayMonth = date.toLocaleString(locale, optionsDate);
  const capitalWord = (string) => string[0].toUpperCase() + string.slice(1);
  wrapper.textContent = capitalWord(weekdayDayMonth);
};

export default Calendar;
