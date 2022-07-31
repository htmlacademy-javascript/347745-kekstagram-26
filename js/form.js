import {isEscapeKey} from './utils.js';
import {resetPhotoEffects, getStartZoomValue, addClickZoomButton} from './photos.js';
import {sendData} from './api.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const photoEdit = document.querySelector('.img-upload__overlay');
const photoUploadForm = document.querySelector('.img-upload__form');
const closeFormButton = photoEdit.querySelector('#upload-cancel');
const textHashtags = photoUploadForm.querySelector('.text__hashtags');
const textComment = photoUploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const MAX_HASHTAGS_AMOUNT = 5;
const CORRECT_HASHTAG_MESSAGE = 'Не корректный хэштег';
const ORIGINAL_HASHTAG_MESSAGE = 'Хэштеги не должны повторяться';
const AMOUNT_HASHTAG_MESSAGE = 'Можно добавить не более пяти хэштегов';

const closeUploadForm = () => {
  photoEdit.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  photoUploadForm.reset();
};

function onFormEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  photoEdit.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  getStartZoomValue();
  addClickZoomButton();
  resetPhotoEffects();
};

uploadFile.addEventListener('change', openUploadForm);

closeFormButton.addEventListener('click', closeUploadForm);

const onNotEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', onNotEscKeydown);
textComment.addEventListener('keydown', onNotEscKeydown);

const pristine = new Pristine (photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const hashtagCheckCorrect = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| hashtags.every((hashtag) => re.test(hashtag));
};

pristine.addValidator(textHashtags, hashtagCheckCorrect, CORRECT_HASHTAG_MESSAGE);

const hashtagCheckAmount = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  return hashtags.length <= MAX_HASHTAGS_AMOUNT;
};

pristine.addValidator(textHashtags, hashtagCheckAmount, AMOUNT_HASHTAG_MESSAGE);

const hashtagCheckOriginal = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(textHashtags, hashtagCheckOriginal, ORIGINAL_HASHTAG_MESSAGE);

const submitButtonBlock = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const submitButtonUnblock = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const photoUploadFormSubmit = (onSuccess, onFail) => {
  photoUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      submitButtonBlock();
      sendData(
        () => {
          onSuccess();
          submitButtonUnblock();
        },
        () => {
          onFail();
          submitButtonUnblock();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {photoUploadFormSubmit, closeUploadForm};


const errorMessageTamplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTamplate.cloneNode(true);
const errorButton = errorMessageElement.querySelector('.error__button');
const successMessageTamplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTamplate.cloneNode(true);
const successButton = successMessageElement.querySelector('.success__button');

const errorMessageShow = () => {
  body.classList.add('modal-open');
  body.append(errorMessageElement);
  errorMessageElement.style.zIndex = '100';
  document.addEventListener('keydown', onErrorMessageEscClose);
  document.addEventListener('click', onErrorMessageAnyClickClose);
};

const errorMessageClose = () => {
  body.classList.remove('modal-open');
  errorMessageElement.remove();
  document.removeEventListener('keydown', onErrorMessageEscClose);
  document.removeEventListener('click', onErrorMessageAnyClickClose);
};

errorButton.addEventListener('click', () => errorMessageClose());

function onErrorMessageEscClose (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessageClose();
  }
}

function onErrorMessageAnyClickClose (evt) {
  if (evt.target === errorMessageElement) {
    errorMessageClose();
  }
}

const successMessageShow = () => {
  body.classList.add('modal-open');
  body.append(successMessageElement);
  document.addEventListener('keydown', onSuccessMessageEscClose);
  document.addEventListener('click', onSuccessMessageAnyClickClose);
};

const successMessageClose = () => {
  body.classList.remove('modal-open');
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessMessageEscClose);
  document.removeEventListener('click', onSuccessMessageAnyClickClose);
};

successButton.addEventListener('click', () => successMessageClose());

function onSuccessMessageEscClose (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessageClose();
  }
}

function onSuccessMessageAnyClickClose (evt) {
  if (evt.target === successMessageElement) {
    successMessageClose();
  }
}

const uploadFormSuccessSubmit = () => {
  closeUploadForm();
  successMessageShow();
};

const uploadFormErrorSubmit = () => {
  errorMessageShow();
};

export {uploadFormSuccessSubmit, uploadFormErrorSubmit};
