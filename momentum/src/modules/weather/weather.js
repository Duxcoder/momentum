
const Weather = (defaultCity, lang) => {

    const inputCity = document.querySelector('.city');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherError = document.querySelector('.weather-error');
    const weatherContainer = document.querySelector('.description-container');
    const temperature = weatherContainer.querySelector('.temperature');
    const descr = weatherContainer.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');

    const textDependLang = (lang) => {
        switch (lang) {
            case 'ru': 
                return { windStart: 'Скорость ветра:', 
                         windEnd: 'км/ч',
                         humidity: 'Влажность:',
                         placeholderCity: 'Введите город',
                         error: 'Ошибка. Данный населённый пункт не найден.'
                        }
            case 'en': 
                return { windStart: 'Wind speed:',
                         windEnd: 'km/h',
                         humidity: 'Humidity:',
                         placeholderCity: 'Enter city',
                         error: 'Error. This city was not found.'
                        }
        }
    }
    let city
    const setCity = (installCity = localStorage.getItem('city')) => {
        inputCity.placeholder = textDependLang(lang).placeholderCity
        if (localStorage.getItem('city')) {
            inputCity.value = installCity
            city = installCity
            localStorage.setItem('city', city)
        } else {
            city = defaultCity;
            inputCity.value = city
        }
    }
    setCity();
   
    const updateData = (city, lang) => {
        const url = `http://api.weatherapi.com/v1/current.json?key=303c4d552e824ae29a3140107230801&q=${city}&aqi=no&lang=${lang}`
        const options = {
            headers: {
                "Transfer-Encoding": "chunked",
                "Connection": "keep-alive",
                "Vary": "Accept-Encoding",
                "CDN-PullZone": "93447",
                "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
                "CDN-RequestCountryCode": "GB",
                "CDN-ProxyVer": "1.03",
                "CDN-RequestPullSuccess": "True",
                "CDN-RequestPullCode": "200",
                "CDN-CachedAt": "01/08/2023 14:03:27",
                "CDN-EdgeStorageId": "947",
                "CDN-Status": "200",
                "CDN-RequestId": "fe29c0f909daa7007165e9616e2b3cb0",
                "CDN-Cache": "MISS",
                "Cache-Control": "public, max-age=180",
                "Content-Type": "application/json",
                "Date": "Sun, 08 Jan 2023 14:03:27 GMT",
                "Server": "BunnyCDN-FR1-951"
            }
        }
        const response = fetch(url, options)
        const setIcon = (url) => {
            weatherIcon.style.background= `url(${url}) center`
            weatherIcon.style.width = '64px'
            weatherIcon.style.height = '64px'
        }
        const weatherHidden = (hidden, arr) => {
            arr.map(item => item.style.display = hidden ? 'none' : 'block')
        }
        const setWeatherContainer = (temp, text, windSpeed, humidityValue) => {
            temperature.textContent = `${Math.round(temp)}°C`
            descr.textContent = text
            wind.textContent = textDependLang(lang).windStart + ` ${Math.round(windSpeed)} ` + textDependLang(lang).windEnd
            humidity.textContent = textDependLang(lang).humidity + ` ${Math.round(humidityValue)} ` + '%'
        }    
        response.then(respo => {
            if (respo.status != 200) console.log('error')
            return respo.json()
        })
        .then(data => {
            setCity(data.location.name); //fix autocomplete api weather
            weatherError.textContent = ''
            weatherHidden(false, [weatherIcon, temperature, descr, wind, humidity]);
            console.log(data.location.name);
            setIcon(data.current.condition.icon);
            setWeatherContainer(
                data.current.temp_c,
                data.current.condition.text,
                data.current.wind_kph,
                data.current.humidity
                )
        })
        .catch(() => {
        weatherHidden(true, [weatherIcon, temperature, descr, wind, humidity])
        weatherError.textContent = textDependLang(lang).error;
    })
    }
    updateData(city, lang);
    inputCity.onchange = (e) => {
        updateData(e.target.value, lang); 
        localStorage.setItem('city', e.target.value)
    }
    


}
export default Weather