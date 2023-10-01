export const addingZero = (num) => (num < 10 ? `0${num}` : num);

export const randomNumber = (max) => Math.ceil(Math.random() * max);

export const looperRangeNumber = (from, to, number) => {
  if (number > to) return from;
  if (number < from) return to;
  return number;
};

export const createNode = (node, className, content = '') => {
  const domNode = document.createElement(node);
  domNode.textContent = content;
  domNode.classList.add(className);
  return domNode;
};
