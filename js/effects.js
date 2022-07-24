const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelValueElement = document.querySelector('.effect-level__value');
// const effectsRadio = document.querySelector('.effects__radio');
const imgUploadElement = document.querySelector('.img-upload__preview img');

const effects = {
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

const resetPhotoEffects = () => {
  effectLevelValueElement.value = '';
  imgUploadElement.className = '';
  imgUploadElement.style.filter = '';
  effectSliderElement.setAttribute('disabled', true);
};

resetPhotoEffects();

effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const currentValue = evt.target.value;

    if(currentValue === 'none') {
      resetPhotoEffects();
    }
    imgUploadElement.classList.add(`effects__preview--${currentValue}`);

    effectSliderElement.removeAttribute('disabled', true);

    effectSliderElement.noUiSlider.updateOptions(effects[currentValue].options);

    effectSliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = effectSliderElement.noUiSlider.get();


      const {filter, unit} = effects[currentValue];
      imgUploadElement.style.filter = `${filter}(${effectLevelValueElement.value}${unit}`;
    });
  }
});

