import { pictureOfOthersUsers } from './preview.js';

const sectionBigPicture = document.querySelector('.big-picture');
const commentsList = sectionBigPicture.querySelector('.social__comments');
const cancel = document.querySelector('.big-picture__cancel');
const commentsItem = commentsList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

// Добавляет коментарии
const addComments = () => {
  commentsList.innerHTML = '';
  pictureOfOthersUsers.map(({comments}) => {
    const commentsItemClone = commentsItem.cloneNode(true);
    commentsItemClone.querySelector('.social__picture').src = comments.avatar;
    commentsItemClone.querySelector('.social__picture').alt = comments.name;
    commentsItemClone.querySelector('.social__text').textContent = comments.message;
    commentsFragment.append(commentsItemClone);
  });
  commentsList.append(commentsFragment);
};

// Добавляет и удаляет событие при клике
const addListener = (evt) => {
  evt.preventDefault();
  sectionBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancel.removeEventListener('click', addListener);
};

cancel.addEventListener('click', addListener);

// Добавляет и удаляет событие при нажатии Escape
const addEscapeListener = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    sectionBigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', addEscapeListener);
  }
};

document.addEventListener('keydown', addEscapeListener);

// Скрывает счетчик комментариев
const commentsCountHidden = () => {
  const commentsCount = document.querySelector('.social__comment-count, .comments-count');
  commentsCount.classList.add('hidden');
};

// Открывает модальное окно
const removeHidden = () => {
  sectionBigPicture.classList.remove('hidden');
};

const displayBigPicture = () => {
  removeHidden();
  commentsCountHidden();
  document.body.classList.add('modal-open');
  pictureOfOthersUsers.forEach((picture) => {
    const {
      url,
      likes,
      comments,
      description,
    } = picture;
    sectionBigPicture.querySelector('.big-picture__img img').src = url;
    sectionBigPicture.querySelector('.likes-count').textContent = likes;
    sectionBigPicture.querySelector('.comments-count').textContent = comments.length;
    sectionBigPicture.querySelector('.social__caption').textContent = description;
  });
  addComments();
};

displayBigPicture ();
