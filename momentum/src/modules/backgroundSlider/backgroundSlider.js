import timesOfDay from "../greetings/timesOfDay"
import addingZeroFirst from "../time/addingZeroFirst"

const BackgroundSlider = ({classWrapper, classArrowNext, classArrowPrev}) => {
     
    const path = "https://raw.githubusercontent.com/Duxcoder/stage1-tasks/assets/images"
    let slideNumberNow = 0;
    const randomNumber = () => {
        return Math.ceil((Math.random() * 19.9)) 
    }
    const time = timesOfDay('en').replace('Good ', '');
    const firstNumber = addingZeroFirst(randomNumber());

    const Render = (number) => {
        const url = `url("${path}/${time}/${number}.jpg")`
        const img = document.createElement('img');
        img.onload = () => document.body.style.backgroundImage = url; // по загрузке img отобразится фон
        img.src = `${path}/${time}/${number}.jpg`;
        slideNumberNow = number;
    }

    const wrapper = document.querySelector(classWrapper),
          arrowNext = document.querySelector(classArrowNext),
          arrowPrev = document.querySelector(classArrowPrev);

    const clickNext = () => {
        const number = +slideNumberNow + 1;
        if (number > 20) return Render(addingZeroFirst(1))
        return Render(addingZeroFirst(number))
    }
    const clickPrev = () => {
        const number = +slideNumberNow - 1;
        if (number < 1) return Render(addingZeroFirst(20))
        return Render(addingZeroFirst(number))
    }

    wrapper.addEventListener('click', (e) => {
        if (e.target === arrowNext) clickNext()
        if (e.target === arrowPrev) clickPrev()
    })

    Render(firstNumber);

}
export default BackgroundSlider