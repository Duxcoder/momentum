
const Options = (updateFunction, lang) => {
    let textHideView
    let language = lang
    let options = {
        greeting: false,
        time: false,
        calendar: false,
        backgroundSlider: false,
        weather: false,
        quotes: false,
        music: false,
        language: lang,
    };
    let l = (block) => {
        let l = options.language === 'ru' ? 0 : 1
        switch (block) {
            case 'option': return ["НАСТРОЙКИ", "OPTIONS"][l]; break;
            case 'language': return ['Выбор языка','Language'][l]; break;
            case 'background': return ['Источник изображений', 'Background images from'][l]; break;
            case 'tags': return ['Выборка изображений по тегу', 'Select image by tag'][l]; break;
            case 'rus': return ['Русский', 'Russian'][l]; break;
            case 'eng': return ['Английский', 'English'][l]; break;
        }
    };
    
    let returnData = {
        language: lang,
    };
    const wrapper = document.querySelector('.options-wrapper');
    const btn = document.querySelector('.btn-options');
    let hideModules = [];
    const $textOption = btn.querySelector('span');
    const $textOptionItems = wrapper.querySelectorAll('.select-title');
    const $languageBlock = wrapper.querySelector('.language-block');
    const $optionLanguages = $languageBlock.querySelectorAll('option');
   
    const modules = {
        music: document.querySelector('.player_wrapper'),
        weather: document.querySelector('.weather'),
        time: document.querySelector('.time_wrapper'),
        calendar: document.querySelector('.date_wrapper'),
        greeting: document.querySelector('.greeting-container'),
        quotes: document.querySelector('.quote_wrapper')
    };

    const changeOptionsToReload = (arrReloadModules) => {
        for (let key in options) {
            options[key] = arrReloadModules.includes(key);
            key === 'language' ? options[key] = language : null
        }
    };
    const toggleDeleteElements = () => {
        for (let key in modules) {
            const hideElement = hideModules.find(item => item === modules[key]);
            hideElement ? hideElement.firstElementChild.classList.toggle('hide-module') : null
        }
    }
    toggleDeleteElements();
    const toggleHideTarget = (domElement, position = {left: '0px', top: '0px', bottom: '0px', right: '0px'} ) => {
        const existHideBlock = domElement.querySelector('.hover-module');
        if (existHideBlock) {
            existHideBlock.classList.remove('active');
            setTimeout(() => existHideBlock.remove(), 40);
        } else {
            const div = document.createElement('div');
            const span = document.createElement('span');
            div.classList.add('hover-module');
            div.style.left = position.left;
            div.style.top = position.top;
            div.style.bottom = position.bottom;
            div.style.right = position.right;
            const hideBlock = () => {
                span.classList.remove('eye-off');
                span.classList.add('eye');
                div.textContent = textHideView[1];
                div.append(span);
                domElement.firstElementChild.classList.add('hide');
            }
            const viewBlock = () => {
                span.classList.remove('eye');
                span.classList.add('eye-off');
                div.textContent = textHideView[0];
                div.append(span);
                domElement.firstElementChild.classList.remove('hide');
            }
            hideModules.includes(domElement) ? hideBlock() : viewBlock();
            domElement.style.position = 'relative';
            domElement.firstElementChild.style.transition = '0.3s';
            domElement.append(div);
            div.classList.add('active');
            div.addEventListener('click', e => {
                if (hideModules.includes(domElement)) {
                    hideModules = hideModules.filter(mod => mod != domElement);
                    viewBlock();
                }
                else {
                    hideModules.push(domElement);
                    hideBlock();
                }
            })
        }
    }
    btn.addEventListener('click', () => {
        wrapper.classList.toggle('active');
        toggleDeleteElements();
        toggleHideTarget(modules.weather, {left: '-100px', top: '40%'});
        toggleHideTarget(modules.greeting, {right: '-60px', top: '29%'});
        toggleHideTarget(modules.calendar, {right: '-100px', top: '0'});
        toggleHideTarget(modules.time, {right: '-100px', top: '35%'});
        toggleHideTarget(modules.music, {right: '-70px', top: '50%'});
        toggleHideTarget(modules.quotes, {right: '-70px', top: '5%'});
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.dir(audioContext);
    });

    const selectLanguage = document.querySelector('.select-language')

    selectLanguage.addEventListener('change', () => {
        options.language = selectLanguage.value;
        language = selectLanguage.value;
        changeOptionsLanguage();
        changeOptionsToReload(['greeting', 'calendar', 'weather', 'quotes']);
        updateFunction(options);
        for (let key in modules) {
            const textHide = modules[key].querySelector('.hover-module');
            hideModules.includes(modules[key]) ? textHide.childNodes[0].textContent = textHideView[1] : textHide.childNodes[0].textContent = textHideView[0];
        }

    })

    const selectBackground = document.querySelector('.select-background');
    selectBackground.addEventListener('change', () => {
        options.backgroundSlider = selectBackground.value.toLowerCase();
        changeOptionsToReload(['backgroundSlider'])
        updateFunction(options)
    })

    const changeOptionsLanguage = () => {
        language === 'ru' ? textHideView = ['Скрыть', 'Показать'] : textHideView = ['Hide', 'View']
        $textOption.textContent = l('option');
        $textOptionItems[0].textContent = l('language');
        $textOptionItems[1].textContent = l('background');
        $textOptionItems[2].textContent = l('tags');
        $optionLanguages[0].textContent = l('rus');
        $optionLanguages[1].textContent = l('eng');
    
    }
    changeOptionsLanguage();

    return returnData
}

export default Options