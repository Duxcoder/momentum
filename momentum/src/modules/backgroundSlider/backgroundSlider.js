import timesOfDay from "../greetings/timesOfDay"
import addingZeroFirst from "../time/addingZeroFirst"

const BackgroundSlider = ({classWrapper, classArrowNext, classArrowPrev, sourceImages, update = false}) => {
    const path = "https://raw.githubusercontent.com/Duxcoder/stage1-tasks/assets/images"
    let slideNumberNow = 0;
    const randomNumber = (maxNumber) => {
        return Math.ceil((Math.random() * maxNumber)) 
    }
    const time = timesOfDay('en').replace('Good ', '');
    const firstNumber = addingZeroFirst(randomNumber(19.9));
    let images = [];

    const createUrl = (source, number, arr) => {
        switch (source) {
            case 'github': return `${path}/${time}/${number}.jpg`
            case 'unsplash': return `${arr[number - 1][0]}`
            case 'flickr': return `${arr[number - 1][0]}`
            case 'unsplashThumb': return `${arr[number - 1][1]}`
            case 'flickrThumb': return `${arr[number - 1][1]}`
            default: return `${path}/${time}/${number}.jpg`
        }
    }

    const Render = (source, number, arr) => {
        console.log(source)
        const url = `url(${createUrl(source, number, arr)})`
        const img = document.createElement('img');
        img.onload = () => { 
            document.body.style.backdropFilter = 'blur(0px)'
            document.body.style.backgroundImage = url; // по загрузке img отобразится фон
            console.log(source, url)
        }
        img.src = createUrl(source, number, arr);
        slideNumberNow = number;
    }

    const wrapper = document.querySelector(classWrapper),
          arrowNext = document.querySelector(classArrowNext),
          arrowPrev = document.querySelector(classArrowPrev);

    const clickNext = () => {
        console.log(images)
        if (sourceImages === 'github') {
            const number = +slideNumberNow + 1;
            if (number > 20) return Render(sourceImages, addingZeroFirst(1), images)
            return Render(sourceImages, addingZeroFirst(number), images)
        }
        return Render(sourceImages, addingZeroFirst(randomNumber(20)), images)
    }

    const clickPrev = () => {
        if (sourceImages === 'github') {
            const number = +slideNumberNow - 1;
            if (number < 1) return Render(sourceImages, 20, images)
            return Render(sourceImages, addingZeroFirst(number), images)
        }
        return Render(sourceImages, addingZeroFirst(randomNumber(20)), images)
    }

    !update && wrapper.addEventListener('click', (e) => {
        if (e.target === arrowNext) clickNext()
        if (e.target === arrowPrev) clickPrev()
    })


    let url = `https://api.unsplash.com/search/photos?page=${randomNumber(20)}&orientation=landscape&query=${time},cat&per_page=20`
    fetch(url, {
        headers: {
            Authorization: 'Client-ID GDoYYGQvzZ1r_y22PViJEMUeWI3i6aqIRxMkQT9aGm8'
        }
    })
    .then(response => response.json())
    .then(data => {
        data.results.forEach(item => {
            images.push([item.urls.regular, item.urls.thumb])
        })
    })
    .then(() => {
        console.log(sourceImages)
        Render(sourceImages, firstNumber, images);
    })

    
}
export default BackgroundSlider