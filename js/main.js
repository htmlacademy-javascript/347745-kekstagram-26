function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  if (result < 0) {
    return 0;
  }

  if (max < result) {
    return max;
  }

  return result;
}

getRandomIntInclusive(0, 20);

function lengthStr(verifiableStr, maxSymbols) {
  return (verifiableStr.length < maxSymbols);
}

lengthStr('Тестируемая длина строки', 100);
