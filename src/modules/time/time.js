import { addingZero } from '../../utils/utils';

const Time = (classWrapper) => {
  const wrapper = document.querySelector(classWrapper);

  const timeOn = () => {
    const date = new Date();
    const hours = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    wrapper.textContent = `${addingZero(hours)}:${addingZero(min)}:${addingZero(sec)}`;
    setTimeout(timeOn, 1000);
  };
  setTimeout(timeOn);
};

export default Time;
