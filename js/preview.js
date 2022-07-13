import {creatArrayUser} from './generator.js';

const pictureListUsersElements = document.querySelector('.pictures');
const pictureTemplateElements = document.querySelector('#picture').content.querySelector('.picture');

const pictureOfOthersUsers = creatArrayUser();

const pictureFragment = document.createDocumentFragment();

pictureOfOthersUsers .forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplateElements.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureFragment.append(pictureElement);
});

const addsPicturesOfUsers = () =>
  pictureListUsersElements.append(pictureFragment);

export {addsPicturesOfUsers, pictureOfOthersUsers};
