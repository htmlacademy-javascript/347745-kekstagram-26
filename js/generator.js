import {
  getRandomPositiveInteger,
  getNoRepeatRandomNumbers,
  checkStringLength,
} from './utils.js';
import { descriptionsPhoto, messageUser, nameUser } from './data.js';

const objectCount = 25;

checkStringLength('Тестируемый текст', 100);

// Создание случайного элемента массива
const getRandomArrayElement = (element) =>
  element[getRandomPositiveInteger(0, element.length - 1)];

// Создание комментарий пользователей
function createCommentsUsers() {
  return {
    id: getNoRepeatRandomNumbers(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messageUser),
    name: getRandomArrayElement(nameUser),
  };
}

// Создание фотографий пользователей
function createUsersPhotos() {
  return {
    id: getNoRepeatRandomNumbers(),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(descriptionsPhoto),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from(
      { length: getRandomPositiveInteger(5, 20) },
      createCommentsUsers
    ),
  };
}

const creatArrayUser = () =>
  Array.from({ length: objectCount }, createUsersPhotos);

export {
  objectCount,
  getRandomArrayElement,
  createCommentsUsers,
  createUsersPhotos,
  creatArrayUser,
};
