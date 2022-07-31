import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const photoImage = fullPhoto.querySelector('.big-picture__img').querySelector('img');
const likesCount = fullPhoto.querySelector('.likes-count');
const commentsList = fullPhoto.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const photoDescription = fullPhoto.querySelector('.social__caption');
const commentCounter = fullPhoto.querySelector('.social__comment-count');
const commentLoader = fullPhoto.querySelector('.comments-loader');
const closeButton = fullPhoto.querySelector('.big-picture__cancel');

const commentListFragment = document.createDocumentFragment();

const MAX_COMMENTS_AMOUNT = 5;

const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
};

function onFullPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto ();
  }
}

closeButton.addEventListener ('click', closeFullPhoto);

const createRandomFullPhoto = ({url, likes, description, comments}) => {
  fullPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  photoImage.src = url;
  likesCount.textContent = likes;
  photoDescription.textContent = description;

  let commentCount = 0;

  const commentsAdd = () => {
    const commentLenght = commentCount += MAX_COMMENTS_AMOUNT;
    comments.slice(0, commentLenght ).forEach((comment) => {
      const commentElementCopy = commentItem.cloneNode(true);
      const commentAvatarElement = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssageElement = commentElementCopy.querySelector('.social__comment .social__text');
      commentAvatarElement.src = comment.avatar;
      commentAvatarElement.alt = comment.name;
      commentMesssageElement.textContent = comment.message;
      commentListFragment.append(commentElementCopy);
    });

    commentsList.innerHTML = '';
    commentsList.append(commentListFragment);

    if (commentCount >= comments.length) {
      commentLoader.classList.add('hidden');
      commentCounter.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      commentLoader.classList.remove('hidden');
      commentCounter.textContent = `${commentCount} из ${comments.length} комментариев`;
    }
  };

  commentsAdd();

  commentLoader.addEventListener ('click', () => {
    commentsAdd();
  });

  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

export { createRandomFullPhoto };


const effectSliderConteiner = document.querySelector('.effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const upLoadPhoto = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects__list');

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

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const resetPhotoEffects = () => {
  effectLevelValue.value = '';
  upLoadPhoto.className = '';
  upLoadPhoto.style.filter = '';
  effectSliderConteiner.classList.add('hidden');
  effectSlider.setAttribute('disabled', true);
};

const getPhotoEffects = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const currentValue = evt.target.value;
    if (currentValue === 'none') {
      resetPhotoEffects();
      return;
    }

    effectSliderConteiner.classList.remove('hidden');
    effectSlider.removeAttribute('disabled', true);
    upLoadPhoto.classList.add(`effects__preview--${currentValue}`);

    effectSlider.noUiSlider.updateOptions(photoEffects[currentValue].options);

    effectSlider.noUiSlider.on('update',  () => {
      effectLevelValue.value = effectSlider.noUiSlider.get();

      const {filter, unit} = photoEffects[currentValue];
      upLoadPhoto.style.filter = `${filter}(${effectLevelValue.value}${unit})`;
    });
  }
};

const applyPhotoEffects = () => {
  effectsContainer.addEventListener('change', getPhotoEffects);
};

export { resetPhotoEffects, applyPhotoEffects };


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


import {debounce} from './utils.js';

const TIME_OUT_DELAY = 500;
const RANDOM_PHOTO_AMOUNT = 10;
const photoFilters = document.querySelector('.img-filters');
const sortDefaultButton = photoFilters.querySelector('#filter-default');
const sortRandomButton = photoFilters.querySelector('#filter-random');
const sortPopulartButton = photoFilters.querySelector('#filter-discussed');

const changeClassButtons = (activeButton) => {
  photoFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
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

const getPhotoFilters = (photos) => {
  photoFilters.classList.remove('img-filters--inactive');

  sortDefaultButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(defaultSorting(photos));
  });

  sortRandomButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(randomSorting(photos));
  });

  sortPopulartButton.addEventListener('click', (evt) => {
    changeClassButtons(evt.target);
    getFilterDebounce(popularSorting(photos));
  });
};

export {getPhotoFilters};

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewPhoto = document.querySelector('.img-upload__preview');

const START_ZOOM_VALUE = 100;

let currentZoomValue = START_ZOOM_VALUE;

const getStartZoomValue = () => {
  previewPhoto.style.transform = '';
  scaleValueInput.value = `${START_ZOOM_VALUE}%`;
};

const getZoomOutClick = () => {
  if (currentZoomValue > 25) {
    currentZoomValue -= 25;
    scaleValueInput.value = `${currentZoomValue}%`;
    previewPhoto.style.transform = `scale(${currentZoomValue / 100})`;
  }
};

const getZoomInClick = () => {
  if (currentZoomValue < 100) {
    currentZoomValue += 25;
    scaleValueInput.value = `${currentZoomValue}%`;
    previewPhoto.style.transform = `scale(${currentZoomValue / 100})`;
  }
};

const addClickZoomButton = () => {
  scaleSmallerButton.addEventListener('click', getZoomOutClick);
  scaleBiggerButton.addEventListener('click', getZoomInClick);
};

export { getStartZoomValue, addClickZoomButton };


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const userPhoto = document.querySelector('.img-upload__preview img');

const loadUserPhoto = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const userPhotoName =  file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => userPhotoName.endsWith(it));

    if (matches) {
      userPhoto.src = URL.createObjectURL(file);
    }
  });
};

export {loadUserPhoto};
