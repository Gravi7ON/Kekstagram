const body = document.querySelector('body');
const imgUploadMessage = document.querySelector('#messages');

const checkStringLength = function (string, length) {
  return string.length <= length;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showLoadBlock = () => {
  const templateItem = imgUploadMessage.content.cloneNode(true);
  body.append(templateItem);
};

const showErrorLoad = (message) => {
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

export {isEscapeKey, checkStringLength, showLoadBlock, showErrorLoad};
