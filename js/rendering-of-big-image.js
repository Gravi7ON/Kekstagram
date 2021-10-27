import {isEscapeKey} from './util.js';
import {userCommentsForMainArray} from './data.js';

//Переменные для показа и скрытия полноэкранного режима
const bodyPage = document.querySelector('body');
const renderingBigImage = bodyPage.querySelector('.big-picture');
const buttonCloseBigImage = renderingBigImage.querySelector('.big-picture__cancel');
const blockCommentCount = renderingBigImage.querySelector('.social__comment-count');
const blockCommentsLoad = renderingBigImage.querySelector('.comments-loader');

//Переменные для работы с данными
const urlData = renderingBigImage.querySelector('.big-picture__img');
const likeData = renderingBigImage.querySelector('.likes-count');
const commentData = renderingBigImage.querySelector('.comments-count');
const descriptionData = renderingBigImage.querySelector('.social__caption');
const commentListData = renderingBigImage.querySelector('.social__comments');
const commentListDataTemplate = renderingBigImage.querySelector('.social__comment');
const bigImageFragment = document.createDocumentFragment();

const onBigImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};

function showBigImage () {
  renderingBigImage.classList.remove('hidden');
  blockCommentCount.classList.add('hidden');
  blockCommentsLoad.classList.add('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', onBigImageEscKeydown);
}

function closeBigImage () {
  renderingBigImage.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
}

buttonCloseBigImage.addEventListener('click', () => {
  closeBigImage();
});

showBigImage();

const showBigImageData = userCommentsForMainArray;

showBigImageData.forEach(({url, likes, comments, description}) => {
  urlData.querySelector('img').setAttribute('src', url);
  likeData.textContent = likes;
  commentData.textContent = comments.length;
  descriptionData.textContent = description;

  showBigImageData.comments.forEach(({avatar, name, message}) => {
    const bigImageElement = commentListDataTemplate.cloneNode(true);
    bigImageElement.querySelector('.social__picture').setAttribute('src', avatar);
    bigImageElement.querySelector('social__picture').setAttribute('alt', name);
    bigImageElement.querySelector('.social__text').textContent = message;

    bigImageFragment.appendChild(bigImageElement);
  });
});

commentListData.appendChild(bigImageFragment);
