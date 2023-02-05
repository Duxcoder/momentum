
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
        language: 'ru',
    };
    // let hideList = [];
    lang === 'ru' ? textHideView = ['Скрыть', 'Показать'] : textHideView = ['Hide', 'View']
    let returnData = {
        language: lang,
    };
    const wrapper = document.querySelector('.options-wrapper');
    const btn = document.querySelector('.btn-options');
    let hideModules = [];
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
    }
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
            setTimeout(() => existHideBlock.remove(), 300);
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
                console.log(hideModules);
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
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        console.dir(audioContext)
    });

    const selectLanguage = document.querySelector('.select-language')

    selectLanguage.addEventListener('change', () => {
        options.language = selectLanguage.value;
        language = selectLanguage.value;
        changeOptionsToReload(['greeting', 'calendar', 'weather', 'quotes'])
        updateFunction(options)
    })

    const selectBackground = document.querySelector('.select-background');
    selectBackground.addEventListener('change', () => {
        options.backgroundSlider = selectBackground.value.toLowerCase();
        changeOptionsToReload(['backgroundSlider'])
        updateFunction(options)
    })
    return returnData
}

export default Options