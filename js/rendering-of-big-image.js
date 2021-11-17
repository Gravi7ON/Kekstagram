/* eslint-disable prefer-const */
import {isEscapeKey} from './util.js';

const DISPLAYED_CURRENT_COMMENT_COUNT = 5;

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

let commentsList;
let displayedComments;

const onBigImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};

const onButtonCloseClick = () => {
  closeBigImage();
};

const onButtonLoadClick = (evt) => {
  if (evt.target.closest('.comments-loader')) {
    const commentsFragment = document.createDocumentFragment();
    displayedComments = [...displayedComments, ...commentsList.slice(displayedComments.length, displayedComments.length + DISPLAYED_CURRENT_COMMENT_COUNT)];

    displayedComments.forEach((commentItem) => {
      commentsFragment.appendChild(commentItem);
    });
    commentListData.innerHTML = '';
    commentListData.appendChild(commentsFragment);
    commentCurrent.textContent = displayedComments.length;

    if (displayedComments.length === commentsList.length) {
      buttonCommentsLoad.classList.add('hidden');
    }
  }
};

function showBigImage () {
  imageBig.classList.remove('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImage.addEventListener('click', onButtonCloseClick);
  document.body.addEventListener('click', onButtonLoadClick);

  commentListData.innerHTML = '';
}

function closeBigImage () {
  imageBig.classList.add('hidden');
  buttonCommentsLoad.classList.remove('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImage.removeEventListener('click', onButtonCloseClick);
  document.body.removeEventListener('click', onButtonLoadClick);
}

const createCurrentComments = (comments) => {
  const results = [];

  comments.forEach(({avatar, name, message}) => {
    const imageElement = commentListDataTemplate.cloneNode(true);
    imageElement.querySelector('.social__picture').setAttribute('src', avatar);
    imageElement.querySelector('.social__picture').setAttribute('alt', name);
    imageElement.querySelector('.social__text').textContent = message;

    results.push(imageElement);
  });
  return results;
};

const showPostPreview = (({url, likes, comments, description}) => {
  urlData.querySelector('img').setAttribute('src', url);
  likeData.textContent = likes;
  commentData.textContent = comments.length;
  descriptionData.textContent = description;

  commentsList = createCurrentComments(comments);

  if (commentsList.length <= DISPLAYED_CURRENT_COMMENT_COUNT) {
    commentsList.forEach((commentItem) => {
      imageFragment.appendChild(commentItem);
    });
    commentListData.appendChild(imageFragment);
    commentCurrent.textContent = commentsList.length;
    buttonCommentsLoad.classList.add('hidden');
  }

  displayedComments = commentsList.slice(0, DISPLAYED_CURRENT_COMMENT_COUNT);
  displayedComments.forEach((commentItem) => {
    imageFragment.appendChild(commentItem);
  });
  commentListData.appendChild(imageFragment);
  commentCurrent.textContent = displayedComments.length;
});

export {showBigImage, showPostPreview};
