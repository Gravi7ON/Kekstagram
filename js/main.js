function getRandomIntInclusive (min, max) {
  if (min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
  return 'Аргумент max не может быть меньше или равен min!';
}
getRandomIntInclusive();

function checkLengthString (stringName, maxLength) {
  if (stringName.length <= maxLength) {
    return true;
  }
  return false;
}
checkLengthString();
