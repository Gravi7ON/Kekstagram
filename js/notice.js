import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const imgUploadMessage = document.querySelector('#messages');
const imgSuccessMessage = document.querySelector('#success');
const imgErrorMessage = document.querySelector('#error');

const showErrorLoadWrapper = (message) => {
  const errorBlock = document.createElement('div');
  errorBlock.style.zIndex = 100;
  errorBlock.style.position = 'absolute';
  errorBlock.style.left = 0;
  errorBlock.style.top = 0;
  errorBlock.style.right = 0;
  errorBlock.style.padding = '20px 3px';
  errorBlock.style.fontSize = '17px';
  errorBlock.style.fontFamily = 'Verdana, sans-serif';
  errorBlock.style.textAlign = 'center';
  errorBlock.style.backgroundColor = '#000000';

  errorBlock.textContent = message;

  document.body.append(errorBlock);

  setTimeout(() => {
    errorBlock.remove();
  }, 4000);
};

const showLoadBlock = () => {
  const templateItem = imgUploadMessage.content.cloneNode(true);
  body.append(templateItem);
};

const hideLoadBlock = () => {
  const blockLoad = body.querySelector('.img-upload__message');
  if (!blockLoad) {
    return;
  }
  blockLoad.remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    hideSuccessBlock();
  }
};

const showSuccessBlock = () => {
  const templateItem = imgSuccessMessage.content.cloneNode(true);

  document.body.addEventListener('click', (evt) => {
    const successBlock = document.querySelector('.success__inner');
    const element = evt.target;
    if (successBlock.contains(element)) {
      if (element.classList.contains('success__button')) {
        hideSuccessBlock();
      }
    } else {
      hideSuccessBlock();
    }
  });

  document.body.addEventListener('keydown', onSuccessEscKeydown);

  body.append(templateItem);
};

function hideSuccessBlock () {
  const successBlock = body.querySelector('.success');
  if (!successBlock) {
    return;
  }
  successBlock.remove();
  document.body.removeEventListener('keydown', onSuccessEscKeydown);
}

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    hideErrorBlock();
  }
};

const showErrorBlock = () => {
  const templateItem = imgErrorMessage.content.cloneNode(true);

  document.body.addEventListener('click', (evt) => {
    const successBlock = document.querySelector('.error__inner');
    const element = evt.target;
    if (successBlock.contains(element)) {
      if (element.classList.contains('error__button')) {
        hideErrorBlock();
      }
    } else {
      hideErrorBlock();
    }
  });

  document.body.addEventListener('keydown', onErrorEscKeydown);

  body.append(templateItem);
};

function hideErrorBlock () {
  const errorBlock = body.querySelector('.error');
  if (!errorBlock) {
    return;
  }
  errorBlock.remove();
  document.body.removeEventListener('keydown', onErrorEscKeydown);
}

export {showLoadBlock, showErrorLoadWrapper, hideLoadBlock, showSuccessBlock, showErrorBlock};
