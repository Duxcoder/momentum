import timesOfDay from '../greetings/timesOfDay';
import { addingZero, looperRangeNumber, randomNumber } from '../../utils/utils';

const UNSPLASH = 'unsplash';
const GITHUB = 'github';
const FLICKR = 'flickr';

const BackgroundSlider = ({
  classWrapper,
  classArrowNext,
  classArrowPrev,
  sourceImages,
  update = false,
}) => {
  const wrapper = document.querySelector(classWrapper);
  const arrowNext = document.querySelector(classArrowNext);
  const arrowPrev = document.querySelector(classArrowPrev);
  const selectTags = document.querySelector('.select-tags');
  const select = document.querySelector('.select-background');
  let tags = localStorage.getItem('tags');
  selectTags.value = tags;

  const github = { path: 'https://raw.githubusercontent.com/Duxcoder/stage1-tasks/assets/images' };
  let slideNumberNow = 0;
  const time = timesOfDay('en').replace('Good ', '');
  const firstNumber = addingZero(randomNumber(19.9));
  let images = [];

  const getImgUrl = (source, number, arr) => {
    switch (source) {
      case GITHUB:
        return `${github.path}/${time}/${number}.jpg`;
      case UNSPLASH:
        return `${arr[number - 1][0]}`;
      case FLICKR:
        return `${arr[number - 1][0]}`;
      case 'thumb':
        return `${arr[number - 1][1]}`;
      default:
        return `${github.path}/${time}/${number}.jpg`;
    }
  };

  const disabledButtons = function (e) {
    if (e.target === this) {
      arrowPrev.disabled = true;
      arrowNext.disabled = true;
      document.body.removeEventListener('transitionstart', disabledButtons);
    }
  };

  const enabledButtons = function (e) {
    if (e.target === this) {
      arrowPrev.disabled = false;
      arrowNext.disabled = false;
      document.body.removeEventListener('transitionend', enabledButtons);
    }
  };

  const render = (source, number, arr) => {
    const url = `url(${getImgUrl(source, number, arr)})`;
    const img = new Image();
    img.src = getImgUrl(source, number, arr);
    document.body.addEventListener('transitionstart', disabledButtons);
    document.body.addEventListener('transitionend', enabledButtons);
    img.onload = () => (document.body.style.backgroundImage = url);
    slideNumberNow = number;
  };

  const clickNext = () => {
    const countImages = sourceImages === GITHUB ? 20 : images.length - 1;
    const number = looperRangeNumber(1, countImages, +slideNumberNow + 1);
    if (sourceImages === GITHUB) return render(sourceImages, addingZero(number), images);
    return render(sourceImages, randomNumber(countImages), images);
  };

  const clickPrev = () => {
    const countImages = sourceImages === GITHUB ? 20 : images.length - 1;
    const number = looperRangeNumber(1, countImages, +slideNumberNow - 1);
    if (sourceImages === GITHUB) return render(sourceImages, addingZero(number), images);
    return render(sourceImages, randomNumber(countImages), images);
  };

  const clickHandle = (e) => {
    if (e.target === arrowNext) clickNext();
    if (e.target === arrowPrev) clickPrev();
  };

  if (!update) wrapper.addEventListener('click', clickHandle);

  const unsplash = {
    getUrl() {
      const result = this.url;
      this.url = 'https://api.unsplash.com';
      return this.url + result;
    },
    search() {
      this.url += '/search';
      return this;
    },
    page(num = 20) {
      this.url += `/photos?page=${randomNumber(num)}`;
      return this;
    },
    orientation() {
      this.url += '&orientation=landscape';
      return this;
    },
    query(tags) {
      this.url += `&query=${tags}`;
      return this;
    },
    perPage(num) {
      this.url += `&per_page=${num}`;
      return this;
    },
    getOptions() {
      return {
        headers: {
          Authorization: 'Client-ID GDoYYGQvzZ1r_y22PViJEMUeWI3i6aqIRxMkQT9aGm8',
        },
      };
    },
  };

  const flickr = {
    getUrl() {
      const result = this.url;
      this.url = 'https://www.flickr.com/services/rest/?';
      return this.url + result;
    },
    method(method = 'flickr.photos.search') {
      this.url += `method=${method}`;
      return this;
    },

    apiKey(apiKey = '5abab1b2fe7a0a280edbfb247662293e') {
      this.url += `&api_key=${apiKey}`;
      return this;
    },

    tags(tags) {
      this.url += `&tags=${tags}`;
      return this;
    },

    extras() {
      this.url += `&extras=url_l&format=json&nojsoncallback=1`;
      return this;
    },
  };

  const createUrlApi = (tags = '') => {
    switch (sourceImages) {
      case UNSPLASH:
        unsplash.url = '';
        return unsplash
          .search()
          .page()
          .orientation()
          .query(tags || time)
          .perPage(20)
          .getUrl();
      case FLICKR:
        flickr.url = '';
        return flickr
          .method()
          .apiKey()
          .tags(tags || time)
          .extras()
          .getUrl();
    }
  };

  let url = createUrlApi(tags);
  select.addEventListener('change', () => {
    if (sourceImages) sourceImages = localStorage.getItem('bgSource');
    images = [];
    if (tags) {
      selectTags.value = tags;
      url = createUrlApi(tags);
    } else {
      url = createUrlApi();
    }
    switcher();
  });
  selectTags.addEventListener('change', (e) => {
    localStorage.setItem('tags', e.target.value);
    tags = e.target.value;
    images = [];
    url = createUrlApi(tags);
    switcher();
  });

  const getImageUnsplash = (data) => {
    if (data.results.length < 2) alert('Для данного тега не нашлось изображений...');
    data.results.forEach((item) => images.push([item.urls.regular, item.urls.thumb]));
  };
  const getImageFlickr = (data) => {
    if (data.photos.photo.length < 2) alert('Для данного тега не нашлось изображений...');
    data.photos.photo.forEach((item) => images.push([item.url_l, item.url_l]));
  };

  const switcher = () => {
    switch (sourceImages) {
      case GITHUB:
        return render(sourceImages, firstNumber, images);
      case UNSPLASH:
        return req(unsplash.getOptions())
          .then(getImageUnsplash)
          .then(() => render(sourceImages, firstNumber, images))
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
      case FLICKR:
        return req()
          .then(getImageFlickr)
          .then(() => render(sourceImages, firstNumber, images))
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }
  };

  const req = async (options = {}) => {
    arrowPrev.disabled = true;
    arrowNext.disabled = true;
    return fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      arrowPrev.disabled = false;
      arrowNext.disabled = false;
      return response.json();
    });
  };

  switcher();
};
export default BackgroundSlider;
