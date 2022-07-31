import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const photoImage = fullPhoto.querySelector('.big-picture__img').querySelector('img');
const likesCount = fullPhoto.querySelector('.likes-count');
const commentsList = fullPhoto.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const photoDescription = fullPhoto.querySelector('.social__caption');
const commentCounter = fullPhoto.querySelector('.social__comment-count');
const commentLoader = fullPhoto.querySelector('.comments-loader');
const closeButton = fullPhoto.querySelector('.big-picture__cancel');

const commentListFragment = document.createDocumentFragment();

const MAX_COMMENTS_AMOUNT = 5;

const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
};

function onFullPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto ();
  }
}

closeButton.addEventListener ('click', closeFullPhoto);

const createRandomFullPhoto = ({url, likes, description, comments}) => {
  fullPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  photoImage.src = url;
  likesCount.textContent = likes;
  photoDescription.textContent = description;

  let commentCount = 0;

  const commentsAdd = () => {
    const commentLenght = commentCount += MAX_COMMENTS_AMOUNT;
    comments.slice(0, commentLenght ).forEach((comment) => {
      const commentElementCopy = commentItem.cloneNode(true);
      const commentAvatarElement = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssageElement = commentElementCopy.querySelector('.social__comment .social__text');
      commentAvatarElement.src = comment.avatar;
      commentAvatarElement.alt = comment.name;
      commentMesssageElement.textContent = comment.message;
      commentListFragment.append(commentElementCopy);
    });

    commentsList.innerHTML = '';
    commentsList.append(commentListFragment);

    if (commentCount >= comments.length) {
      commentLoader.classList.add('hidden');
      commentCounter.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      commentLoader.classList.remove('hidden');
      commentCounter.textContent = `${commentCount} из ${comments.length} комментариев`;
    }
  };

  commentsAdd();

  commentLoader.addEventListener ('click', () => {
    commentsAdd();
  });

  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

export { createRandomFullPhoto };
