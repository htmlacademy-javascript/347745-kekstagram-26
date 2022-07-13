import {creatArrayUser} from './generator.js';

const pictureListUsers = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureOfOthersUsers = creatArrayUser();

const pictureFragment = document.createDocumentFragment();

pictureOfOthersUsers .forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.lenght;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureFragment.append(pictureElement);
});

const addsPicturesOfUsers = () =>
  pictureListUsers.append(pictureFragment);

export {addsPicturesOfUsers};
