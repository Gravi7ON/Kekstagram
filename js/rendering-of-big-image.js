import {isEscapeKey} from './util.js';

const conteiner = document.querySelector('.pictures');
const renderingBigImage = document.querySelector('.big-picture');
const bigPhoto = renderingBigImage.querySelector('.big-picture__img');
const buttonCloseBigImage = renderingBigImage.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const newCommentsCount = document.querySelector('.comments-loader');
const bodyPage = document.querySelector('body');

const onBigImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};

/*conteiner.addEventListener('click', () => {
  renderingBigImage.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  newCommentsCount.classList.add('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey (evt)) {
      evt.preventDefault();
      renderingBigImage.classList.add('hidden');
      bodyPage.classList.remove('modal-open');
    }
  });
});

buttonCloseBigImage.addEventListener('click', () => {
  renderingBigImage.classList.add('hidden');
  bodyPage.classList.remove('modal-open');
});*/

function showBigImage () {
  renderingBigImage.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  newCommentsCount.classList.add('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', onBigImageEscKeydown);
}

function closeBigImage () {
  renderingBigImage.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
}

conteiner.addEventListener('click', () => {
  showBigImage();
});

buttonCloseBigImage.addEventListener('click', () => {
  closeBigImage();
});
