const Time = (classWrapper) => {
    const wrapper = document.querySelector(classWrapper);
    const addingZeroFirst = (num) => num < 10 ? `0${num}` : num;
    const timeOn = () => {
        const date = new Date();
        const hours = date.getHours(),
              min = date.getMinutes(),
              sec = date.getSeconds();
        wrapper.textContent = `${addingZeroFirst(hours)}:${addingZeroFirst(min)}:${addingZeroFirst(sec)}`;
    }
    timeOn();
    setInterval(timeOn, 1000);
}

export default Time

