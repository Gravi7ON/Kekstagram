import {isEscapeKey, checkStringLength} from './util.js';

const LIMIT_HASHTAG_LENGTH = 20;
const LIMIT_HASHTAGS_LENGTH = 5;
const LIMIT_COMMENT_LENGTH = 140;

const body = document.querySelector('body');
const userImageForm = document.querySelector('.img-upload__overlay');
const userImageLoad = document.querySelector('#upload-file');
const buttonCloseImageForm = userImageForm.querySelector('#upload-cancel');
const textDescriptionInput = userImageForm.querySelector('.text__description');
const userImage = userImageForm.querySelector('.img-upload__user');
const hashTagExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashTagInput = userImageForm.querySelector('.text__hashtags');

const checkHashTag = () => {
  const valueHashTag = hashTagInput.value.trim().toLowerCase();
  const valueHashTags = valueHashTag.split(' ');
  const hashTagsUniq = [...new Set(valueHashTags)];

  if (valueHashTags.length > LIMIT_HASHTAGS_LENGTH) {
    hashTagInput.setCustomValidity('Не более 5 хеш-тегов');
  } else if (valueHashTags.length > hashTagsUniq.length) {
    hashTagInput.setCustomValidity('Хеш-теги не должны повторяться');
  } else {
    hashTagInput.setCustomValidity('');
  }

  valueHashTags.forEach((tag) => {
    if (tag === '#') {
      hashTagInput.setCustomValidity('Хеш-тег не может состоять только из одного символа #');
    } else if (!tag.startsWith('#')) {
      hashTagInput.setCustomValidity('Хеш-тег начинается с символа #');
    } else if (tag.length > LIMIT_HASHTAG_LENGTH) {
      hashTagInput.setCustomValidity(`Удалите лишние ${ valueHashTag.length - LIMIT_HASHTAG_LENGTH} симв.`);
    } else if (!hashTagExpression.test(tag)) {
      hashTagInput.setCustomValidity('Хеш-тег не содержит пробелы, спецсимволы (@, $...), тире, дефис, запятая, эмодзи ...');
    }
  });

  hashTagInput.reportValidity();
};

const checkTextDescription = () => {
  if (!checkStringLength(textDescriptionInput.value, LIMIT_COMMENT_LENGTH)) {
    textDescriptionInput.setCustomValidity('Не более 140 символов');
  } else {
    textDescriptionInput.setCustomValidity('');
  }
  textDescriptionInput.reportValidity();
};

const onformEditEscKeydown = (evt) => {
  if (isEscapeKey (evt) && !evt.target.closest('.img-upload__text')) {
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
  hashTagInput.addEventListener('input', checkHashTag);
}

function closeFormEditImage () {
  userImageForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.removeEventListener('click', onButtonCloseClick);
  textDescriptionInput.removeEventListener('input', checkTextDescription);
  hashTagInput.removeEventListener('input', checkHashTag);
  userImageLoad.value = '';
}

userImageLoad.addEventListener('change', () => {
  showFormEditImage();
  userImage.src = URL.createObjectURL(userImageLoad.files[0]);
});
