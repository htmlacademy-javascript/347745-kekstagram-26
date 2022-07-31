import {createRandomFullPhoto} from './full-photos.js';

const previewUsersPhotos = document.querySelector('.pictures');
const randomPhotoTemplete = document.querySelector('#picture').content.querySelector('.picture');
const previewUsersPhotosFragment = document.createDocumentFragment();

const createRandomPhoto = (photos) => {
  photos.forEach((photo) => {
    const {url, likes, comments} = photo;
    const previewPhotoElement = randomPhotoTemplete.cloneNode(true);
    previewPhotoElement.querySelector('img').src = url;
    previewPhotoElement.querySelector('.picture__likes').textContent = likes;
    previewPhotoElement.querySelector('.picture__comments').textContent = comments.length;
    previewPhotoElement.addEventListener('click', () => createRandomFullPhoto(photo));
    previewUsersPhotosFragment.append(previewPhotoElement);
  });

  previewUsersPhotos.append(previewUsersPhotosFragment);
};

export { createRandomPhoto };
