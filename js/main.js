import { showAlert } from './utils.js';
import { getData } from './api.js';
import { applyPhotoEffects, createRandomPhoto, getPhotoFilters, loadUserPhoto } from './photos.js';
import { uploadFormSuccessSubmit, uploadFormErrorSubmit, photoUploadFormSubmit } from './form.js';

applyPhotoEffects();

getData((photos) => {
  getData(createRandomPhoto);
  getPhotoFilters(photos);
}, showAlert);

photoUploadFormSubmit(uploadFormSuccessSubmit, uploadFormErrorSubmit);

loadUserPhoto();
