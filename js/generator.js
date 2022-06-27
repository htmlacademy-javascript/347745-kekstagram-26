import {
  getRandomPositiveInteger,
  getNoRepeatRandomNumbers,
  descriptionsPhoto,
} from './utils';
import { messageUser, nameUser } from './data';
const objectCount = 25;

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
      { length: getRandomPositiveInteger(1, 3) },
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
