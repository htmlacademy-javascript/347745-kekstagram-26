import { pictureOfOthersUsers } from './preview.js';

const sectionBigPictureElements = document.querySelector('.big-picture');
const commentsListElements = sectionBigPictureElements.querySelector('.social__comments');
const cancelButtonElement = document.querySelector('.big-picturecancel');
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

// Скрывает счетчик комментариев
const commentsCountHidden = () => {
  const commentsCount = document.querySelector('.social__comment-count, .comments-count');
  commentsCount.classList.add('hidden');
};

// Открывает модальное окно
const removeHidden = () => {
  sectionBigPictureElements.classList.remove('hidden');
};

const currentPicture = pictureOfOthersUsers[0];

const displayBigPicture = (picture) => {
  const {
    url,
    likes,
    comments,
    description,
  } = picture;

  commentsCountHidden();

  sectionBigPictureElements.querySelector('.big-pictureimg img').src = url;
  sectionBigPictureElements.querySelector('.likes-count').textContent = likes;
  sectionBigPictureElements.querySelector('.comments-count').textContent = comments.length;
  sectionBigPictureElements.querySelector('.social__caption').textContent = description;

  removeHidden();
  document.body.classList.add('modal-open');
  addComments(comments);
};

displayBigPicture (currentPicture);

document.addEventListener('keydown', onDocumentEscapeKeydown);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
