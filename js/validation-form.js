import {imageZoomReset, controlByClick} from './slider.js';

const uploadFileElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('#upload-cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const textHashtags = imgUploadFormElement.querySelector('.text__hashtags');
const textDescription = imgUploadFormElement.querySelector('.text__description');

imageZoomReset();
controlByClick();

const closeModal = () => {
  imageOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  uploadFileElement.reset();
};

const onModalEscapeKeydown = (evt) => {

  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    uploadCancelElement.removeEventListener('keydown', onModalEscapeKeydown);
  }
};

const onUploadButtonClickClose = (evt) => {
  evt.preventDefault();
  closeModal();
  uploadCancelElement.removeEventListener('click', onUploadButtonClickClose);
  document.removeEventListener('click', onModalEscapeKeydown);
};

const openModal = () => {
  imageOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  uploadCancelElement.addEventListener('click', onUploadButtonClickClose);
  document.addEventListener('click', onModalEscapeKeydown);
};

const onUploadButtonClickOpen = (evt) => {
  evt.preventDefault();
  openModal();
  document.removeEventListener('click', onModalEscapeKeydown);
};

uploadFileElement.addEventListener('change', onUploadButtonClickOpen);
uploadCancelElement.addEventListener('click', onUploadButtonClickClose);
document.addEventListener('keydown', onModalEscapeKeydown);

const pristine = new Pristine (imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtags = (value) => value.trim().split(' ').every((element) => element[0] === '#');

pristine.addValidator(textHashtags, validateHashtags, 'Название должно начинаться с "#"');

const validateLength = (value) => value.trim().split(' ').every((element) => element.length >= 2 && element.length <= 20);

pristine.addValidator(textHashtags, validateLength, 'Название должно быть не меньше 2 и не больше 20 символов');

const validateSymbol = (value) => {
  const re = /[A-Za-zА-Яа-яЁё0-9]+$/;
  return value.trim().split(' ').every((element) => element.match(re));
};

pristine.addValidator(textHashtags, validateSymbol, 'Название не должно содержать спец символы');

const validateRepeat = (value) => new Set(value.split(' ')).size === value.split(' ').length;

pristine.addValidator(textHashtags, validateRepeat, 'Хэш-теги не должны повторяться');

imgUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadFormElement.submit();
  }
});

textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
