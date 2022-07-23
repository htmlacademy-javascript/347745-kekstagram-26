import {creatArrayUser} from './generator.js';
import {displayBigPicture} from './full-screen.js';

const pictureListUsersElements = document.querySelector('.pictures');
const pictureTemplateElements = document.querySelector('#picture').content.querySelector('.picture');


const pictureOfOthersUsers = creatArrayUser();

const pictureFragment = document.createDocumentFragment();

pictureOfOthersUsers .forEach((picture) => {
  const {url, comments, likes} = picture;
  const pictureElement = pictureTemplateElements.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.addEventListener('click', () => {
    displayBigPicture(picture);
  });
  pictureFragment.append(pictureElement);
});

pictureListUsersElements.append(pictureFragment);
