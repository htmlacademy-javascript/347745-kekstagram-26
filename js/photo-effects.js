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
