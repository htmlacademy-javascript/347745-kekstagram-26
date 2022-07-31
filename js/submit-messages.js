import {isEscapeKey} from './util.js';
import {closeUploadForm} from './upload-form.js';

const body = document.querySelector('body');
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
