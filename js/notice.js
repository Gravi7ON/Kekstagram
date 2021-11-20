import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const imgUploadMessageElement = bodyElement.querySelector('#messages');
const imgSuccessMessageElement = bodyElement.querySelector('#success');
const imgErrorMessageElement = bodyElement.querySelector('#error');

const showErrorLoadWrapper = (message) => {
  const errorBlockElement = document.createElement('div');
  errorBlockElement.style.zIndex = 100;
  errorBlockElement.style.position = 'absolute';
  errorBlockElement.style.left = 0;
  errorBlockElement.style.top = 0;
  errorBlockElement.style.right = 0;
  errorBlockElement.style.padding = '20px 3px';
  errorBlockElement.style.fontSize = '17px';
  errorBlockElement.style.fontFamily = 'Verdana, sans-serif';
  errorBlockElement.style.textAlign = 'center';
  errorBlockElement.style.backgroundColor = '#000000';

  errorBlockElement.textContent = message;

  document.body.append(errorBlockElement);

  setTimeout(() => {
    errorBlockElement.remove();
  }, 4000);
};

const showLoadBlock = () => {
  const templateItem = imgUploadMessageElement.content.cloneNode(true);
  bodyElement.append(templateItem);
};

const hideLoadBlock = () => {
  const blockLoadElement = bodyElement.querySelector('.img-upload__message');
  if (!blockLoadElement) {
    return;
  }
  blockLoadElement.remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    hideSuccessBlock();
  }
};

const onSuccessClick = (evt) => {
  const successBlockElement = bodyElement.querySelector('.success__inner');
  const element = evt.target;
  if (successBlockElement.contains(element)) {
    if (element.classList.contains('success__button')) {
      hideSuccessBlock();
    }
  } else {
    hideSuccessBlock();
  }
};

const showSuccessBlock = () => {
  const templateItem = imgSuccessMessageElement.content.cloneNode(true);

  document.body.addEventListener('click', onSuccessClick);
  document.body.addEventListener('keydown', onSuccessEscKeydown);

  bodyElement.append(templateItem);
};

function hideSuccessBlock () {
  const successBlockHideElement = bodyElement.querySelector('.success');
  if (!successBlockHideElement) {
    return;
  }
  successBlockHideElement.remove();

  document.body.removeEventListener('keydown', onSuccessEscKeydown);
  document.body.removeEventListener('click', onSuccessClick);
}

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    hideErrorBlock();
  }
};

const onErrorClick = (evt) => {
  const errorBlockElement = bodyElement.querySelector('.error__inner');
  const element = evt.target;
  if (errorBlockElement.contains(element)) {
    if (element.classList.contains('error__button')) {
      hideErrorBlock();
    }
  } else {
    hideErrorBlock();
  }
};

const showErrorBlock = () => {
  const templateItem = imgErrorMessageElement.content.cloneNode(true);

  document.body.addEventListener('click', onErrorClick);
  document.body.addEventListener('keydown', onErrorEscKeydown);

  bodyElement.append(templateItem);
};

function hideErrorBlock () {
  const errorBlockHideElement = bodyElement.querySelector('.error');
  if (!errorBlockHideElement) {
    return;
  }
  errorBlockHideElement.remove();

  document.body.removeEventListener('keydown', onErrorEscKeydown);
  document.body.removeEventListener('click', onErrorClick);
}

export {showLoadBlock, showErrorLoadWrapper, hideLoadBlock, showSuccessBlock, showErrorBlock};
