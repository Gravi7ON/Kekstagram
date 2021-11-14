/* eslint-disable prefer-const */
import {isEscapeKey} from './util.js';

const bodyPage = document.querySelector('body');
const imageBig = bodyPage.querySelector('.big-picture');
const buttonCloseBigImage = imageBig.querySelector('.big-picture__cancel');
const blockCommentCount = imageBig.querySelector('.social__comment-count');
const buttonCommentsLoad = imageBig.querySelector('.comments-loader');
const urlData = imageBig.querySelector('.big-picture__img');
const likeData = imageBig.querySelector('.likes-count');
const commentData = imageBig.querySelector('.comments-count');
const descriptionData = imageBig.querySelector('.social__caption');
const commentListData = imageBig.querySelector('.social__comments');
const commentListDataTemplate = imageBig.querySelector('.social__comment');
const commentCurrent = blockCommentCount.querySelector('.comments-current');
const imageFragment = document.createDocumentFragment();

const onBigImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};

const onButtonCloseClick = () => {
  closeBigImage();
};

function showBigImage () {
  imageBig.classList.remove('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImage.addEventListener('click', onButtonCloseClick);

  commentListData.innerHTML = '';
  commentCurrent.textContent = '';
}

function closeBigImage () {
  imageBig.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImage.removeEventListener('click', onButtonCloseClick);
}

// let commentCountShow = 0;
// let commentsBlock = [];

// function getCurrentComments () {
//   if (commentsBlock.length <= 5) {
//     buttonCommentsLoad.classList.add('hidden');
//   }

//   const currentComments = commentsBlock.splice(0, 5);
//   commentCountShow += currentComments.length;
//   commentCurrent.textContent = commentCountShow;

//   return currentComments;
// }

const createCurrentComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const imageElement = commentListDataTemplate.cloneNode(true);
    imageElement.querySelector('.social__picture').setAttribute('src', avatar);
    imageElement.querySelector('.social__picture').setAttribute('alt', name);
    imageElement.querySelector('.social__text').textContent = message;


    imageFragment.appendChild(imageElement);
  });
};

const showPostPreview = (({url, likes, comments, description}) => {
  urlData.querySelector('img').setAttribute('src', url);
  likeData.textContent = likes;
  commentData.textContent = comments.length;
  descriptionData.textContent = description;

  const countCurrent = commentCurrent.textContent = comments.length;
  if (countCurrent >= comments.length) {
    buttonCommentsLoad.classList.add('hidden');
  } else {
    buttonCommentsLoad.classList.remove('hidden');
  }

  createCurrentComments(comments);
  commentListData.appendChild(imageFragment);

});
//buttonCloseBigImage.addEventListener('click', createCurrentComments(comments));

export {showBigImage, showPostPreview};
