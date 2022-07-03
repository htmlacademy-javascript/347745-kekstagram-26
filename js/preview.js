import {creatArrayUser, createUsersPhotos} from './generator.js';

const pictureListUsers = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureOfOthersUsers = creatArrayUser();

const pictureFragment = document.createDocumentFragment();

pictureOfOthersUsers .forEach(() => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = createUsersPhotos.url;
  pictureElement.querySelector('.picture__comments').textContent = createUsersPhotos.comments;
  pictureElement.querySelector('.picture__likes').textContent = createUsersPhotos.likes;
  pictureFragment.append(pictureElement);
});

const addsPicturesOfUsers = () =>
  pictureListUsers.append(pictureFragment);

export {addsPicturesOfUsers};
