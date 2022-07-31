const UPLOAD_ENDPOINT = 'https://26.javascript.pages.academy/kekstagram';
const DOWNLOAD_ENDPOINT = 'https://26.javascript.pages.academy/kekstagram/data';

const ERROR_UPLOAD_MESSAGE = 'Failed to send data. Please, try again';
const ERROR_DOWNLOAD_MESSAGE = 'Failed to receive data. Please, try again';

export const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      UPLOAD_ENDPOINT,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error (ERROR_UPLOAD_MESSAGE);
    }

    onSuccess();
  } catch (error) {
    onFail(ERROR_UPLOAD_MESSAGE);
  }
};

export const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      DOWNLOAD_ENDPOINT
    );

    if (!response.ok) {
      throw new Error (ERROR_DOWNLOAD_MESSAGE);
    }

    const photosData = await response.json();
    onSuccess(photosData);
  } catch (error) {
    onFail(ERROR_DOWNLOAD_MESSAGE);
  }
};
