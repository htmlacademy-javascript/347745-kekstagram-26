

// Генератор случайных чисел
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// создание массива из случайных чисел

// не повторяющиеся значения

function getNoRepeatRandomNumbers() {
  const res = [];

  for (let i = 0; i < 25; i) {
    const random = getRandomPositiveInteger(1, 25);
    if (!res.includes(random)) {
      res.push(random);
      i++;
    }
  }
  return res;
}

// Проверка длинны строки
function checkStringLength(string, length) {
  return string.length <= length;
}

export {getRandomPositiveInteger, getNoRepeatRandomNumbers, checkStringLength};
