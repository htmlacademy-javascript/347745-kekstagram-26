import { pictureOfOthersUsers } from './preview.js';

const sectionBigPicture = document.querySelector('.big-picture');
const commentsList = sectionBigPicture.querySelector('.social__comments');
const commentsItem = commentsList.querySelectorAll('.social__comment');
const commentsFragment = document.createDocumentFragment();

const addComments = () => {
  commentsList.innerHTML = '';
  let i = 0;
  while (i < 5) {
    const commentsItemClone = commentsItem.cloneNode(true);
    const photoOtherUsers = commentsItemClone.querySelector('.social__picture');
    const commentsOtherUsers = commentsItemClone.querySelector('.social__text');
    photoOtherUsers.src = pictureOfOthersUsers.comments.avatar;
    photoOtherUsers.alt = pictureOfOthersUsers.comments.name;
    commentsOtherUsers.textContent = pictureOfOthersUsers.comments.message;
    commentsFragment.append(commentsItemClone);
    i++;
  }
  commentsList.append(commentsFragment);
};

const removeHidden = () => {
  sectionBigPicture.classList.remove('hidden');
};

const displayBigPicture = () => {
  removeHidden();

  if (removeHidden) {
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
      addComments();
    });
  }
};

displayBigPicture ();
