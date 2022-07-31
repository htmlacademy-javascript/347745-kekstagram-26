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
