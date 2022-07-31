import {createRandomPhoto} from './preview-photos.js';
import './upload-form.js';
import {applyPhotoEffects} from './photo-effects.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {uploadFormSuccessSubmit, uploadFormErrorSubmit} from './submit-messages.js';
import {photoUploadFormSubmit} from './upload-form.js';
import {getPhotoFilters} from './sort-photos.js';
import {loadUserPhoto} from './user-photo-load.js';

applyPhotoEffects();

getData((photos) => {
  getData(createRandomPhoto);
  getPhotoFilters(photos);
}, showAlert);

photoUploadFormSubmit(uploadFormSuccessSubmit, uploadFormErrorSubmit);

loadUserPhoto();
