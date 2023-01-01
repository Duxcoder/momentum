const inputName = (classInput, lang = 'en') => {
    const textPlaceholder = {
        'ru': '[Ваше имя]',
        'en': '[Enter name]'
    }

    const input = document.querySelector(classInput);
    input.placeholder = textPlaceholder[lang];

    const setupName = (key) => {
        input.addEventListener('input', (e) => {
            localStorage.setItem(key, e.target.value)
        })
    }
    
    const findNameInStorage = (key) => {
      if (localStorage.getItem(key)) input.value = localStorage.getItem(key)
    }

    setupName('name');
    findNameInStorage('name');
}

export default inputName