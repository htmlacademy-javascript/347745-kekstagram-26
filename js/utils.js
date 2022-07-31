const ERROR_TIME = 5000;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = () => {
  const error = document.createElement('div');
  error.style.zIndex = '100';
  error.style.position = 'absolute';
  error.style.left = '0';
  error.style.top = '0';
  error.style.right = '0';
  error.style.padding = '10px 3px';
  error.style.fontSize = '24px';
  error.style.textAlign = 'center';
  error.style.color = 'red';
  error.style.backgroundColor = 'black';

  error.textContent = 'Fail to load data. Please, try again';

  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, ERROR_TIME);
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
