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
    let url;
    const createUrlApi = (tags) => {
        if (sourceImages === 'unsplash') {
            url = `https://api.unsplash.com/search/photos?page=${randomNumber(20)}&orientation=landscape&query=${tags ? tags : time }&per_page=20`
         } else {
            url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5abab1b2fe7a0a280edbfb247662293e&tags=${tags ? tags : time }&extras=url_l&format=json&nojsoncallback=1`
         }
    }
   createUrlApi();
   let tags 
    const selectTags = document.querySelector('.select-tags');
    const select = document.querySelector('.select-background');
    select.addEventListener('change', () => {
        sourceImages = localStorage.getItem('bgSource');
        images = []
    const selectTags = document.querySelector('.select-tags');
        if (selectTags.value !== '') {
            tags = selectTags.value;
            createUrlApi(tags)
        } else {
            createUrlApi()
        }
        req()
        // Render(sourceImages, firstNumber, images);
    })
    selectTags.addEventListener('change', (e) => {
        console.log(e.target.value)
        tags = e.target.value
        images = [];
        createUrlApi(tags);
        req();
        
    })
    const req = () => {
        let options = {
            headers: {
                Authorization: 'Client-ID GDoYYGQvzZ1r_y22PViJEMUeWI3i6aqIRxMkQT9aGm8'
            }
        }
        fetch(url, sourceImages === 'unsplash' ? options : {})
        .then(response => response.json())
        .then(data => {
            if (sourceImages === 'unsplash' ){
                if (data.results.length < 2) alert('Для данного тега не нашлось изображений...')
                data.results.forEach(item => {
                    images.push([item.urls.regular, item.urls.thumb])
                    console.log(data)
                })
            } else {
                if (data.photos.photo.length < 2) alert('Для данного тега не нашлось изображений...')
                data.photos.photo.forEach(item => {
                    images.push([item.url_l, item.url_l])
                })
            }   
        })
        .then(() => {
            console.log(sourceImages)
            Render(sourceImages, firstNumber, images);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
   req()
    
    
    
}
export default BackgroundSlider