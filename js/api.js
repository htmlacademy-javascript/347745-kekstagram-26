const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram/data'
    );

    if (!response.ok) {
      throw new Error ('Не получилось загрузить информацию');
    }

    const photosData = await response.json();
    onSuccess(photosData);
  } catch (error) {
    onFail('Не получилось загрузить информацию');
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error ('Не получилось отвправить форму. Попробуйте еще раз');
    }

    onSuccess();
  } catch (error) {
    onFail('Не получилось отвправить форму. Попробуйте еще раз');
  }
};

export {getData, sendData};
