import {isEscapeKey} from './util.js';

//Переменные для показа и скрытия полноэкранного режима
const bodyPage = document.querySelector('body');
const imageBig = bodyPage.querySelector('.big-picture');
const buttonCloseBigImage = imageBig.querySelector('.big-picture__cancel');
//const blockCommentCount = imageBig.querySelector('.social__comment-count');
//const blockCommentsLoad = imageBig.querySelector('.comments-loader');

//Переменные для работы с данными
const urlData = imageBig.querySelector('.big-picture__img');
const likeData = imageBig.querySelector('.likes-count');
const commentData = imageBig.querySelector('.comments-count');
const descriptionData = imageBig.querySelector('.social__caption');
const commentListData = imageBig.querySelector('.social__comments');
const commentListDataTemplate = imageBig.querySelector('.social__comment');
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
}

function closeBigImage () {
  imageBig.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigImageEscKeydown);
  buttonCloseBigImage.removeEventListener('click', onButtonCloseClick);
}

const showPostPreview = (({url, likes, comments, description}) => {
  urlData.querySelector('img').setAttribute('src', url);
  likeData.textContent = likes;
  commentData.textContent = comments.length;
  descriptionData.textContent = description;

  comments.forEach(({avatar, name, message}) => {
    const imageElement = commentListDataTemplate.cloneNode(true);
    imageElement.querySelector('.social__picture').setAttribute('src', avatar);
    imageElement.querySelector('.social__picture').setAttribute('alt', name);
    imageElement.querySelector('.social__text').textContent = message;

    imageFragment.appendChild(imageElement);
  });
  commentListData.appendChild(imageFragment);
});

export {showBigImage, showPostPreview};
