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
