/* eslint-disable prefer-const */
import {isEscapeKey} from './util.js';

const DISPLAYED_CURRENT_COMMENT_COUNT = 5;

const bodyPageElement = document.querySelector('body');
const imageBigElement = bodyPageElement.querySelector('.big-picture');
const buttonCloseBigImageElement = imageBigElement.querySelector('.big-picture__cancel');
const blockCommentCountElement = imageBigElement.querySelector('.social__comment-count');
const buttonCommentsLoadElement = imageBigElement.querySelector('.comments-loader');
const urlDataElement = imageBigElement.querySelector('.big-picture__img');
const likeDataElement = imageBigElement.querySelector('.likes-count');
const commentDataElement = imageBigElement.querySelector('.comments-count');
const descriptionDataElement = imageBigElement.querySelector('.social__caption');
const commentListDataElement = imageBigElement.querySelector('.social__comments');
const commentListDataTemplateElement = imageBigElement.querySelector('.social__comment');
const commentCurrentElement = blockCommentCountElement.querySelector('.comments-current');
const imageFragmentElement = document.createDocumentFragment();

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
    const commentsFragmentElement = document.createDocumentFragment();
    displayedComments = [...displayedComments, ...commentsList.slice(displayedComments.length, displayedComments.length + DISPLAYED_CURRENT_COMMENT_COUNT)];

    displayedComments.forEach((commentItem) => {
      commentsFragmentElement.appendChild(commentItem);
    });
    commentListDataElement.innerHTML = '';
    commentListDataElement.appendChild(commentsFragmentElement);
    commentCurrentElement.textContent = displayedComments.length;

    if (displayedComments.length === commentsList.length) {
      buttonCommentsLoadElement.classList.add('hidden');
    }
  }
};

function showBigImage () {
  imageBigElement.classList.remove('hidden');
  bodyPageElement.classList.add('modal-open');

  document.addEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImageElement.addEventListener('click', onButtonCloseClick);
  document.body.addEventListener('click', onButtonLoadClick);

  commentListDataElement.innerHTML = '';
}

function closeBigImage () {
  imageBigElement.classList.add('hidden');
  buttonCommentsLoadElement.classList.remove('hidden');
  bodyPageElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImageElement.removeEventListener('click', onButtonCloseClick);
  document.body.removeEventListener('click', onButtonLoadClick);
}

const createCurrentComments = (comments) => {
  const results = [];

  comments.forEach(({avatar, name, message}) => {
    const imageElement = commentListDataTemplateElement.cloneNode(true);
    imageElement.querySelector('.social__picture').setAttribute('src', avatar);
    imageElement.querySelector('.social__picture').setAttribute('alt', name);
    imageElement.querySelector('.social__text').textContent = message;

    results.push(imageElement);
  });
  return results;
};

const showPostPreview = ({url, likes, comments, description}) => {
  urlDataElement.querySelector('img').setAttribute('src', url);
  likeDataElement.textContent = likes;
  commentDataElement.textContent = comments.length;
  descriptionDataElement.textContent = description;

  commentsList = createCurrentComments(comments);

  if (commentsList.length <= DISPLAYED_CURRENT_COMMENT_COUNT) {
    commentsList.forEach((commentItem) => {
      imageFragmentElement.appendChild(commentItem);
    });
    commentListDataElement.appendChild(imageFragmentElement);
    commentCurrentElement.textContent = commentsList.length;
    buttonCommentsLoadElement.classList.add('hidden');
  }

  displayedComments = commentsList.slice(0, DISPLAYED_CURRENT_COMMENT_COUNT);
  displayedComments.forEach((commentItem) => {
    imageFragmentElement.appendChild(commentItem);
  });
  commentListDataElement.appendChild(imageFragmentElement);
  commentCurrentElement.textContent = displayedComments.length;
};

export {showBigImage, showPostPreview};
