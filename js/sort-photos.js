import {createRandomPhoto} from './preview-photos.js';
import {debounce} from './util.js';

const TIME_OUT_DELAY = 500;
const RANDOM_PHOTO_AMOUNT = 10;
const photoFilters = document.querySelector('.img-filters');
const sortDefaultButton = photoFilters.querySelector('#filter-default');
const sortRandomButton = photoFilters.querySelector('#filter-random');
const sortPopulartButton = photoFilters.querySelector('#filter-discussed');

const changeClassButtons = (activeButton) => {
  photoFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
};

const defaultSorting = (photos) => photos.slice();

const randomSorting = (photos) => photos.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTO_AMOUNT);


const popularSorting = (photos) => photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const deleteUsersPhotos = () => {
  const usersPhotos = document.querySelectorAll('.picture');
  usersPhotos.forEach((userPhoto) => userPhoto.remove());
};

const loadUsersPhotos = (photos) => {
  deleteUsersPhotos();
  createRandomPhoto(photos);
};

const getFilterDebounce  = debounce(loadUsersPhotos, TIME_OUT_DELAY);

const getPhotoFilters = (photos) => {
  photoFilters.classList.remove('img-filters--inactive');

  sortDefaultButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(defaultSorting(photos));
  });

  sortRandomButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(randomSorting(photos));
  });

  sortPopulartButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(popularSorting(photos));
  });
};

export {getPhotoFilters};
