function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;

  if (result < 0) {
    console.log('Значение меньше 0');
  }

  if (max < result) {
    console.log('Значение больше максимального');
  }

  return result;
}

getRandomIntInclusive(0, 20);

function lengthStr(verifiableStr, maxSymbols) {
  return (verifiableStr.length < maxSymbols);
}

lengthStr('Тестируемая длина строки', 100);
