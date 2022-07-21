import {creatArrayUser} from './generator.js';
import {sectionBigPictureElements} from './full-screen.js';

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

const addsPicturesOfUsers = () => {
  pictureListUsersElements.append(pictureFragment);
};
const ss = pictureListUsersElements.querySelectorAll('.picture');

debugger;

const openBigPicture = () => {
  sectionBigPictureElements.classList.remove('hidden');
  document.body.classList.add('modal-open');

};

const onOpenBigPicture = () => {
  openBigPicture();
  ss.removeEventListener('click', onOpenBigPicture);
};

ss.addEventListener('click',  onOpenBigPicture);

export {addsPicturesOfUsers, pictureOfOthersUsers};
