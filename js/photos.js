import { debounce, isEscapeKey } from './utils.js';

const body = document.body;

const fullPhotoElement = document.querySelector('.big-picture');
const photoImageElement = fullPhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = fullPhotoElement.querySelector('.likes-count');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');
const commentItemElement = commentsListElement.querySelector('.social__comment');
const photoDescriptionElement = fullPhotoElement.querySelector('.social__caption');
const commentCounterElement = fullPhotoElement.querySelector('.social__comment-count');
const commentLoaderElement = fullPhotoElement.querySelector('.comments-loader');
const closeButtonElement = fullPhotoElement.querySelector('.big-picture__cancel');

const effectSliderContainerElement = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const uploadPhotoElement = document.querySelector('.img-upload__preview img');
const effectsContainerElement = document.querySelector('.effects__list');

const photoFiltersElement = document.querySelector('.img-filters');
const sortDefaultButtonElement = photoFiltersElement.querySelector('#filter-default');
const sortRandomButtonElement = photoFiltersElement.querySelector('#filter-random');
const sortPopulartButtonElement = photoFiltersElement.querySelector('#filter-discussed');

const fileChooserElement = document.querySelector('#upload-file');
const userPhotoElement = document.querySelector('.img-upload__preview img');

const previewUsersPhotosElement = document.querySelector('.pictures');
const randomPhotoTempleteElement = document.querySelector('#picture').content.querySelector('.picture');

const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueInputElement = document.querySelector('.scale__control--value');
const previewPhotoElement = document.querySelector('.img-upload__preview');

const commentListFragment = document.createDocumentFragment();
const previewUsersPhotosFragment = document.createDocumentFragment();

const TIME_OUT_DELAY = 500;
const RANDOM_PHOTO_AMOUNT = 10;
const MAX_COMMENTS_AMOUNT = 5;
const START_ZOOM_VALUE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let currentZoomValue = START_ZOOM_VALUE;

const closeFullPhoto = () => {
  fullPhotoElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
};

function onFullPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto ();
  }
}

closeButtonElement.addEventListener ('click', closeFullPhoto);

const createRandomFullPhoto = ({url, likes, description, comments}) => {
  fullPhotoElement.classList.remove('hidden');
  body.classList.add('modal-open');

  photoImageElement.src = url;
  likesCountElement.textContent = likes;
  photoDescriptionElement.textContent = description;

  let commentCount = 0;

  const commentsAdd = () => {
    const commentLenght = commentCount += MAX_COMMENTS_AMOUNT;
    comments.slice(0, commentLenght ).forEach((comment) => {
      const commentElementCopy = commentItemElement.cloneNode(true);
      const commentAvatarElement = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssageElement = commentElementCopy.querySelector('.social__comment .social__text');
      commentAvatarElement.src = comment.avatar;
      commentAvatarElement.alt = comment.name;
      commentMesssageElement.textContent = comment.message;
      commentListFragment.append(commentElementCopy);
    });

    commentsListElement.innerHTML = '';
    commentsListElement.append(commentListFragment);

    if (commentCount >= comments.length) {
      commentLoaderElement.classList.add('hidden');
      commentCounterElement.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      commentLoaderElement.classList.remove('hidden');
      commentCounterElement.textContent = `${commentCount} из ${comments.length} комментариев`;
    }
  };

  commentsAdd();

  commentLoaderElement.addEventListener ('click', () => {
    commentsAdd();
  });

  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

export { createRandomFullPhoto };

const photoEffects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

export const resetPhotoEffects = () => {
  effectLevelValueElement.value = '';
  uploadPhotoElement.className = '';
  uploadPhotoElement.style.filter = '';
  effectSliderContainerElement.classList.add('hidden');
  effectSliderElement.setAttribute('disabled', true);
};

const getPhotoEffects = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const currentValue = evt.target.value;
    if (currentValue === 'none') {
      resetPhotoEffects();
      return;
    }

    effectSliderContainerElement.classList.remove('hidden');
    effectSliderElement.removeAttribute('disabled', true);
    uploadPhotoElement.classList.add(`effects__preview--${currentValue}`);

    effectSliderElement.noUiSlider.updateOptions(photoEffects[currentValue].options);

    effectSliderElement.noUiSlider.on('update',  () => {
      effectLevelValueElement.value = effectSliderElement.noUiSlider.get();

      const {filter, unit} = photoEffects[currentValue];
      uploadPhotoElement.style.filter = `${filter}(${effectLevelValueElement.value}${unit})`;
    });
  }
};

export const applyPhotoEffects = () => {
  effectsContainerElement.addEventListener('change', getPhotoEffects);
};

export const createRandomPhoto = (photos) => {
  photos.forEach((photo) => {
    const {url, likes, comments} = photo;
    const previewPhotoElement = randomPhotoTempleteElement.cloneNode(true);
    previewPhotoElement.querySelector('img').src = url;
    previewPhotoElement.querySelector('.picture__likes').textContent = likes;
    previewPhotoElement.querySelector('.picture__comments').textContent = comments.length;
    previewPhotoElement.addEventListener('click', () => createRandomFullPhoto(photo));
    previewUsersPhotosFragment.append(previewPhotoElement);
  });

  previewUsersPhotosElement.append(previewUsersPhotosFragment);
};

const changeClassButtons = (activeButton) => {
  photoFiltersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
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

export const getPhotoFilters = (photos) => {
  photoFiltersElement.classList.remove('img-filters--inactive');

  sortDefaultButtonElement.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(defaultSorting(photos));
  });

  sortRandomButtonElement.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(randomSorting(photos));
  });

  sortPopulartButtonElement.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(popularSorting(photos));
  });
};

export const getStartZoomValue = () => {
  previewPhotoElement.style.transform = '';
  scaleValueInputElement.value = `${START_ZOOM_VALUE}%`;
};

const getZoomOutClick = () => {
  if (currentZoomValue > 25) {
    currentZoomValue -= 25;
    scaleValueInputElement.value = `${currentZoomValue}%`;
    previewPhotoElement.style.transform = `scale(${currentZoomValue / 100})`;
  }
};

const getZoomInClick = () => {
  if (currentZoomValue < 100) {
    currentZoomValue += 25;
    scaleValueInputElement.value = `${currentZoomValue}%`;
    previewPhotoElement.style.transform = `scale(${currentZoomValue / 100})`;
  }
};

export const addClickZoomButton = () => {
  scaleSmallerButtonElement.addEventListener('click', getZoomOutClick);
  scaleBiggerButtonElement.addEventListener('click', getZoomInClick);
};

export const loadUserPhoto = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const userPhotoName =  file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => userPhotoName.endsWith(it));

    if (matches) {
      userPhotoElement.src = URL.createObjectURL(file);
    }
  });
};
