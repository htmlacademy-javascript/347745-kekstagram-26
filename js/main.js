// Генератор случайных чисел
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// создание массива из случайных чисел


// не повторяющиеся значения
function getNoRepeatRandomNumbers () {
  const arrayList = Array.from({length: 25}, () => getRandomPositiveInteger (1, 25));
  new Set(arrayList);
}


// Проверка длинны строки
function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength ('Тестируемый текст', 100);

// Список имен
const nameUser = [
  'Ирина',
  'Юрий',
  'Александр',
  'Вера',
  'Николай',
  'Юля',
  'Алексей',
  'Виктор',
  'Светлана',
  'Вероника'
];

// Список комментариев
const messageUser = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Список описаний
const descriptionsPhoto = [
  'Отдыхаем!',
  '#withLove',
  'Хороший, солнечный день',
  'Наконец-то выбрались на отдых',
  'Мы с моим котом',
  'Ну и рожа!))'
];

const objectCount = 25;

// Создание случайного элемента массива
const getRandomArrayElement = (element) => element [getRandomPositiveInteger(0, element.length - 1)];

// Создание комментарий пользователей
function createCommentsUsers() {
  return ({
    id: getNoRepeatRandomNumbers (),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messageUser),
    name: getRandomArrayElement(nameUser),
  });
}

// Создание фотографий пользователей
function createUsersPhotos() {
  return ({
    id: getNoRepeatRandomNumbers (),
    url: `photos/${getRandomPositiveInteger (1, 25)}.jpg`,
    description: getRandomArrayElement (descriptionsPhoto),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger (1, 3)}, createCommentsUsers),
  });
}

Array.from({length: objectCount}, createUsersPhotos);
// console.log(Array.from({length: objectCount}, createUsersPhotos));

