// const effectSliderElement = document.querySelector('.effect-level__slider');
// const effectsListElement = document.querySelector('.effects__list');
// const effectLevelValueElement = document.querySelector('.effect-level__value');
// // const effectsRadio = document.querySelector('.effects__radio');
// const imgUploadElement = document.querySelector('.img-upload__preview img');

// const effects = {
//   chrome: {
//     filter: 'grayscale',
//     unit: '',
//     options: {
//       range: {
//         min: 0,
//         max: 1,
//       },
//       start: 1,
//       step: 0.1,
//     },
//   },
//   sepia: {
//     filter: 'sepia',
//     unit: '',
//     options: {
//       range: {
//         min: 0,
//         max: 1,
//       },
//       start: 1,
//       step: 0.1,
//     },
//   },
//   marvin: {
//     filter: 'invert',
//     unit: '%',
//     options: {
//       range: {
//         min: 0,
//         max: 100,
//       },
//       start: 100,
//       step: 1,
//     },
//   },
//   phobos: {
//     filter: 'blur',
//     unit: 'px',
//     options: {
//       range: {
//         min: 0,
//         max: 3,
//       },
//       start: 3,
//       step: 0.1,
//     },
//   },
//   heat: {
//     filter: 'brightness',
//     unit: '',
//     options: {
//       range: {
//         min: 1,
//         max: 3,
//       },
//       start: 3,
//       step: 0.1,
//     },
//   },
// };

// noUiSlider.create(effectSliderElement, {
//   range: {
//     min: 0,
//     max: 1,
//   },
//   start: 1,
//   step: 0.1,
//   connect: 'lower',
// });

// effectSliderElement.setAttribute('disabled', true);

// effectSliderElement.noUiSlider.on('update', () => {
//   effectLevelValueElement.value = effectSliderElement.noUiSlider.get();
// });

// effectsListElement.addEventListener('change', (evt) => {
//   const currentValue = evt.target.value;
//   if (evt.target.checked) {
//     imgUploadElement.classList.add(`effects__preview--${currentValue}`);
//     if(currentValue === 'none') {
//       effectSliderElement.setAttribute('disabled', true);
//     } else {
//       effectSliderElement.removeAttribute('disabled', true);
//     }
//   }
// });


