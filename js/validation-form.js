const uploadFileElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('#upload-cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const textHashtags = imgUploadFormElement.querySelector('.text__hashtags');

const openModal = () => {
  imageOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  uploadCancelElement.addEventListener('click', onUploadButtonClickClose);
  document.addEventListener('click', onModalEscapeKeydown);
};

const closeModal = () => {
  imageOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadCancelElement.removeEventListener('click', onUploadButtonClickClose);
  document.removeEventListener('click', onModalEscapeKeydown);
  uploadFileElement.reset();
};

const onUploadButtonClickClose = (evt) => {
  evt.preventDefault();
  closeModal();

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

const hashtagsCount = (value) => value.trim().split(' ').every((element) => element('#') > 5);

pristine.addValidator(textHashtags, hashtagsCount, 'Название не должно содержать больше пяти "#"');

