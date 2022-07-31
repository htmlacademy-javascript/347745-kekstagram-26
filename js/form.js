import { sendData } from './api.js';
import { resetPhotoEffects, getStartZoomValue, addClickZoomButton } from './photos.js';
import { isEscapeKey } from './utils.js';

const bodyElement = document.body;

const uploadFileInputElement = document.querySelector('#upload-file');
const photoEditOverlayElement = document.querySelector('.img-upload__overlay');
const photoUploadFormElement = document.querySelector('.img-upload__form');
const closeFormButtonElement = photoEditOverlayElement.querySelector('#upload-cancel');
const textHashtagsElement = photoUploadFormElement.querySelector('.text__hashtags');
const textCommentElement = photoUploadFormElement.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const errorMessageTamplateElement = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTamplateElement.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');

const successMessageTamplateElement = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTamplateElement.cloneNode(true);
const successButtonElement = successMessageElement.querySelector('.success__button');

const MAX_HASHTAGS_AMOUNT = 5;
const CORRECT_HASHTAG_MESSAGE = 'Invalid hashtag';
const ORIGINAL_HASHTAG_MESSAGE = 'All hashtags should be unique';
const AMOUNT_HASHTAG_MESSAGE = 'Not more than 5 hashtags is allowed';

export const closeUploadForm = () => {
  photoEditOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  photoUploadFormElement.reset();
};

function onFormEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  photoEditOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  getStartZoomValue();
  addClickZoomButton();
  resetPhotoEffects();
};

uploadFileInputElement.addEventListener('change', openUploadForm);

closeFormButtonElement.addEventListener('click', closeUploadForm);

const onNotEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

textHashtagsElement.addEventListener('keydown', onNotEscKeydown);
textCommentElement.addEventListener('keydown', onNotEscKeydown);

const pristine = new Pristine (photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const hashtagCheckCorrect = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| hashtags.every((hashtag) => re.test(hashtag));
};

pristine.addValidator(textHashtagsElement, hashtagCheckCorrect, CORRECT_HASHTAG_MESSAGE);

const hashtagCheckAmount = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  return hashtags.length <= MAX_HASHTAGS_AMOUNT;
};

pristine.addValidator(textHashtagsElement, hashtagCheckAmount, AMOUNT_HASHTAG_MESSAGE);

const hashtagCheckOriginal = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(textHashtagsElement, hashtagCheckOriginal, ORIGINAL_HASHTAG_MESSAGE);

const submitButtonBlock = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const submitButtonUnblock = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

export const photoUploadFormSubmit = (onSuccess, onFail) => {
  photoUploadFormElement.addEventListener('submit', (evt) => {
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

const errorMessageShow = () => {
  bodyElement.classList.add('modal-open');
  bodyElement.append(errorMessageElement);
  errorMessageElement.style.zIndex = '100';
  document.addEventListener('keydown', onErrorMessageEscClose);
  document.addEventListener('click', onErrorMessageAnyClickClose);
};

const errorMessageClose = () => {
  bodyElement.classList.remove('modal-open');
  errorMessageElement.remove();
  document.removeEventListener('keydown', onErrorMessageEscClose);
  document.removeEventListener('click', onErrorMessageAnyClickClose);
};

errorButtonElement.addEventListener('click', () => errorMessageClose());

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
  bodyElement.classList.add('modal-open');
  bodyElement.append(successMessageElement);
  document.addEventListener('keydown', onSuccessMessageEscClose);
  document.addEventListener('click', onSuccessMessageAnyClickClose);
};

const successMessageClose = () => {
  bodyElement.classList.remove('modal-open');
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessMessageEscClose);
  document.removeEventListener('click', onSuccessMessageAnyClickClose);
};

successButtonElement.addEventListener('click', () => successMessageClose());

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

export const uploadFormSuccessSubmit = () => {
  closeUploadForm();
  successMessageShow();
};

export const uploadFormErrorSubmit = () => {
  errorMessageShow();
};
