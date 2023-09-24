import addingZeroFirst from './addingZeroFirst'

const Time = (classWrapper) => {
    const wrapper = document.querySelector(classWrapper);

    const timeOn = () => {
        const date = new Date();
        const hours = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds();
        wrapper.textContent = `${addingZeroFirst(hours)}:${addingZeroFirst(min)}:${addingZeroFirst(sec)}`;
        setTimeout(timeOn, 1000);
    }
    setTimeout(timeOn);

}

export default Time

