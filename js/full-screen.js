const sectionBigPictureElement = document.querySelector('.big-picture');
const commentsListElement = sectionBigPictureElement.querySelector('.social__comments');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentsItemElement = commentsListElement.querySelector('.social__comment');
const commentsFragment = [];
const socialCommentsLoader = document.querySelector('.social__comments-loader');

// Добавляет коментарии
const addComments = (comments) => {
  commentsListElement.innerHTML = '';

  comments.map((comment) => {
    const { avatar, name, message } = comment;
    const commentsItemClone = commentsItemElement.cloneNode(true);
    commentsItemClone.querySelector('.social__picture').src = avatar;
    commentsItemClone.querySelector('.social__picture').alt = name;
    commentsItemClone.querySelector('.social__text').textContent = message;

    commentsFragment.push(commentsItemClone);
  });

  commentsFragment.splice(0, 5).forEach((commentElement) => {
    commentsListElement.append(commentElement);
  });
  socialCommentsLoader.addEventListener('click', () => {
    commentsFragment.splice(0, 5).forEach((commentElement) => {
      commentsListElement.append(commentElement);
    });
  });
};

const hidePigPicture = () => {
  sectionBigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Добавляет и удаляет событие при клике
const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  hidePigPicture();
};

// Добавляет событие при нажатии Escape
const onDocumentEscapeKeydown = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();

    hidePigPicture();
  }
};

const displayBigPicture = (picture) => {
  const {
    url,
    likes,
    comments,
    description,
  } = picture;

  sectionBigPictureElement.querySelector('.big-picture img').src = url;
  sectionBigPictureElement.querySelector('.likes-count').textContent = likes;
  sectionBigPictureElement.querySelector('.comments-count').textContent = comments.length;
  sectionBigPictureElement.querySelector('.social__caption').textContent = description;
  addComments(comments);

  sectionBigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

document.addEventListener('keydown', onDocumentEscapeKeydown);
cancelButtonElement.addEventListener('click', onCancelButtonClick);

export {displayBigPicture};
