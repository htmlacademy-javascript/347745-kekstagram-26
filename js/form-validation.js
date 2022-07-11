const uploadFileElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('#upload-cancel');

const openModal = () => {
  imageOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeModal = () => {
  imageOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const onUploadButtonClickClose = (evt) => {
  evt.preventDefault();
  closeModal();
  uploadCancelElement.removeEventListener('click', onUploadButtonClickClose);
};

const onModalEscapeKeydown = (evt) => {

  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    uploadCancelElement.removeEventListener('keydown', onModalEscapeKeydown);
  }
};

const onUploadButtonClickOpen = (evt) => {
  evt.preventDefault();
  openModal();
  document.removeEventListener('click', onUploadButtonClickOpen);
};

uploadFileElement.addEventListener('change', onUploadButtonClickOpen);
uploadCancelElement.addEventListener('click', onUploadButtonClickClose);
document.addEventListener('keydown', onModalEscapeKeydown);

openModal();
