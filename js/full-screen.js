import { pictureOfOthersUsers } from './preview.js';

const sectionBigPictureElements = document.querySelector('.big-picture');
const commentsListElements = sectionBigPictureElements.querySelector('.social__comments');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentsItemElements = commentsListElements.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

// Добавляет коментарии
const addComments = (comments) => {
  commentsListElements.innerHTML = '';

  comments.map((comment) => {
    const { avatar, name, message } = comment;
    const commentsItemClone = commentsItemElements.cloneNode(true);
    commentsItemClone.querySelector('.social__picture').src = avatar;
    commentsItemClone.querySelector('.social__picture').alt = name;
    commentsItemClone.querySelector('.social__text').textContent = message;

    commentsFragment.append(commentsItemClone);
  });

  commentsListElements.append(commentsFragment);

  const rr = commentsListElements.children;
  const ff = Array.from(rr);
  const aa = ff.slice(0, 5);
  commentsListElements.replaceChildren(aa);
  // console.log(aa);

};

const hidePigPicture = () => {
  sectionBigPictureElements.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Добавляет и удаляет событие при клике
const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  hidePigPicture();

  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
};

// Добавляет и удаляет событие при нажатии Escape
const onDocumentEscapeKeydown = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();

    hidePigPicture();

    document.removeEventListener('keydown', onDocumentEscapeKeydown);
  }
};

// const currentPicture = pictureOfOthersUsers[2];

const displayBigPicture = (picture) => {
  const {
    url,
    likes,
    comments,
    description,
  } = picture;

  sectionBigPictureElements.querySelector('.big-picture img').src = url;
  sectionBigPictureElements.querySelector('.likes-count').textContent = likes;
  sectionBigPictureElements.querySelector('.comments-count').textContent = comments.length;
  sectionBigPictureElements.querySelector('.social__caption').textContent = description;
  addComments(comments);

};

// displayBigPicture (currentPicture);

//как сделать открытие фото по клику?

document.addEventListener('keydown', onDocumentEscapeKeydown);
cancelButtonElement.addEventListener('click', onCancelButtonClick);

export {sectionBigPictureElements};
