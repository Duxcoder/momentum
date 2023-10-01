const InputName = (classInput, lang = 'en') => {
  const textPlaceholder = {
    ru: '[Ваше имя]',
    en: '[Enter name]',
  };

  const input = document.querySelector(classInput);
  input.placeholder = textPlaceholder[lang];
  const setupName = (key) => {
    input.addEventListener('input', (e) => {
      localStorage.setItem(key, e.target.value);
      input.value.length
        ? (input.size = input.value.length + 2)
        : (input.size = input.placeholder.length + 2);
    });
  };

  const findNameInStorage = (key) => {
    if (localStorage.getItem(key)) input.value = localStorage.getItem(key);
  };

  setupName('name');
  findNameInStorage('name');
  input.value.length
    ? (input.size = input.value.length + 2)
    : (input.size = input.placeholder.length + 2);
};

export default InputName;
