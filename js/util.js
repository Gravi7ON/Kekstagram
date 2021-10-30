function getRandomIntInclusive (from, to) {
  if (from < to && to !== 0 && from >= 0) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Аргументы не должны быть отрицательными, а также from не может быть больше или равно to';
}
getRandomIntInclusive();

const getRandomNotRepeat = (amount) => {
  const items = [...Array(amount)].map((it, index) => index + 1);
  items.sort(() => Math.random() - 0.5);
  return () => items.pop();
};
getRandomNotRepeat();

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomIntInclusive, getRandomNotRepeat, isEscapeKey};
