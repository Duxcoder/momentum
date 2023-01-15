
const Options = (lang) => {
    let returnData = {
    }
    const wrapper = document.querySelector('.options-wrapper');
    const btn = document.querySelector('.btn-options')
    btn.addEventListener('click', () => {
        wrapper.classList.toggle('active');
    });

    const selectLanguage = document.querySelector('.select-language')

    selectLanguage.addEventListener('change', () => {
       returnData.language = selectLanguage.value;
      
    })
    return returnData
}

export default Options