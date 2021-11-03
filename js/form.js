import {isEscapeKey, checkStringLength} from './util.js';

const LIMIT_COMMENT_LENGTH = 140;

const userImageForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const userImageLoad = document.querySelector('#upload-file');
const buttonCloseImageForm = userImageForm.querySelector('#upload-cancel');
//const hashtagInput = userImageForm.querySelector('.text__hashtags');
const textDescriptionInput = userImageForm.querySelector('.text__description');
//const hashtagExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const userImage = userImageForm.querySelector('.img-upload__user');

const checkTextDescription = () => {
  if (!checkStringLength(textDescriptionInput.value, LIMIT_COMMENT_LENGTH)) {
    textDescriptionInput.setCustomValidity('Не более 140 символов');
  } else {
    textDescriptionInput.setCustomValidity('');
  }
  textDescriptionInput.reportValidity();
};

const onformEditEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeFormEditImage();
  }
};

const onButtonCloseClick = () => {
  closeFormEditImage();
};

function showFormEditImage () {
  userImageForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.addEventListener('click', onButtonCloseClick);
  textDescriptionInput.addEventListener('input', checkTextDescription);
}

function closeFormEditImage () {
  userImageForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.removeEventListener('click', onButtonCloseClick);
  userImageLoad.value = '';
}

userImageLoad.addEventListener('change', () => {
  showFormEditImage();
  userImage.src = URL.createObjectURL(userImageLoad.files[0]);
});

