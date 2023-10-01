const timesOfDay = (lang) => {
  const date = new Date();
  const hours = date.getHours();

  const greetingsText = {
    ru: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
    en: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
  };
  const choiceText = () => {
    for (let i = 1; i < 5; i++) {
      if (hours / 6 < i) {
        return greetingsText[lang][i - 1];
      }
    }
  };
  return choiceText();
};

export default timesOfDay;
