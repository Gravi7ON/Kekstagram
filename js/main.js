function getRandomIntInclusive (from, to) {
  if (from < to && to !== 0 && from >= 0) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Аргументы не должны быть отрицательными, а также from не может быть больше или равно to';
}
getRandomIntInclusive();

function checkLengthString (stringName, maxLength) {
  return stringName.length <= maxLength;
}
checkLengthString();
