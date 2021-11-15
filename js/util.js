const checkStringLength = function (string, length) {
  return string.length <= length;
};

const getRandomNotRepeat = (amount) => {
  const items = [...Array(amount)].map((it, index) => index + 1);
  items.sort(() => Math.random() - 0.5);
  return () => items.pop();
};

const getRandomIntInclusive = (from, to) => {
  if (from < to && to !== 0 && from >= 0) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Аргументы не должны быть отрицательными, а также from не может быть больше или равно to';
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey, checkStringLength, getRandomNotRepeat, getRandomIntInclusive, debounce};
