function getRandomIntInclusive (from = 'передаваемое ПЕРВОЕ число', to = 'не должно быть <= СЛЕДУЮЩЕГО' ) {
  if (from < to) {
    const min = Math.floor(Math.min(from, to));
    const max = Math.floor(Math.max(from, to));
    return Math.floor(Math.random() * (max - min + 1)) + min; // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
  return `${from  }, ${  to  }!`;
}
getRandomIntInclusive();

function checkLengthString (stringName, maxLength) {
  return stringName.length <= maxLength;
}
checkLengthString();
