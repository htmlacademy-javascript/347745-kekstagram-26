const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('.scale__control--value');
const imgPeviewElement = document.querySelector('.img-upload__preview');

let inputValue = 100;

const zoomImage = () => {
  if(inputValue < 100) {
    inputValue += 25;
    controlValueElement.value = `${inputValue}%`;
    imgPeviewElement.style.transform = `scale(${inputValue / 100})`;
  }

};

const imageReduction = () => {
  if(inputValue > 25) {
    inputValue -= 25;
    controlValueElement.value = `${inputValue}%`;
    imgPeviewElement.style.transform = `scale(${inputValue / 100})`;
  }

};

const imageZoomReset = () => {
  controlValueElement.value = `${inputValue}%`;
  imgPeviewElement.style.transform = `scale(${inputValue / 100})`;
};

const controlByClick = () => {
  controlSmallerElement.addEventListener('click', imageReduction);
  controlBiggerElement.addEventListener('click', zoomImage);
};

export {imageZoomReset, controlByClick};
