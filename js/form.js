import {isEscapeKey} from './util.js';
import {checkStringLength} from './utils/check-string-length.js';
import {postData} from './server-load.js';
import {showLoadBlock, hideLoadBlock, showSuccessBlock, showErrorBlock} from './notice.js';

const LIMIT_HASHTAG_LENGTH = 20;
const LIMIT_HASHTAGS_LENGTH = 5;
const LIMIT_COMMENT_LENGTH = 140;

const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;
const STEP_IMAGE_SCALE = 25;

const bodyElement = document.querySelector('body');
const imageFormElement = bodyElement.querySelector('.img-upload__form');
const userImageFormElement = imageFormElement.querySelector('.img-upload__overlay');
const userImageLoadElement = imageFormElement.querySelector('#upload-file');
const buttonCloseImageFormElement = userImageFormElement.querySelector('#upload-cancel');
const textDescriptionInputElement = userImageFormElement.querySelector('.text__description');
const userImageElement = userImageFormElement.querySelector('.img-upload__user');
const hashTagExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashTagInputElement = userImageFormElement.querySelector('.text__hashtags');
const imageEffectElement = userImageFormElement.querySelector('.img-upload__effects');

const markInvalid = (element) => {
  element.style.borderColor = 'red';
};

const markValid = (element) => {
  element.style.borderColor = 'initial';
};

const onHashTagInput = () => {
  const valueHashTag = hashTagInputElement.value.trim().toLowerCase();
  const valueHashTags = valueHashTag.split(' ');
  const hashTagsUniqs = [...new Set(valueHashTags)];

  if (valueHashTags.length > LIMIT_HASHTAGS_LENGTH) {
    hashTagInputElement.setCustomValidity('Не более 5 хеш-тегов');
    markInvalid(hashTagInputElement);
    hashTagInputElement.reportValidity();
    return;
  } else if (valueHashTags.length > hashTagsUniqs.length) {
    hashTagInputElement.setCustomValidity('Хеш-теги не должны повторяться');
    markInvalid(hashTagInputElement);
    hashTagInputElement.reportValidity();
    return;
  } else {
    hashTagInputElement.setCustomValidity('');
    markValid(hashTagInputElement);
  }

  for (let i = 0; i < valueHashTags.length; i++) {
    if (valueHashTags[i] === '#') {
      hashTagInputElement.setCustomValidity('Хеш-тег не может состоять только из одного символа #');
      markInvalid(hashTagInputElement);
      break;
    } else if (!valueHashTags[i].startsWith('#')) {
      hashTagInputElement.setCustomValidity('Хеш-тег начинается с символа #');
      markInvalid(hashTagInputElement);
      break;
    } else if (valueHashTags[i].length > LIMIT_HASHTAG_LENGTH) {
      hashTagInputElement.setCustomValidity(`Удалите лишние ${valueHashTags[i].length - LIMIT_HASHTAG_LENGTH} симв.`);
      markInvalid(hashTagInputElement);
      break;
    } else if (!hashTagExpression.test(valueHashTags[i])) {
      hashTagInputElement.setCustomValidity('Хеш-тег не содержит пробелы, спецсимволы (@, $...), тире, дефис, запятая, эмодзи ...');
      markInvalid(hashTagInputElement);
      break;
    } else {
      markValid(hashTagInputElement);
    }
  }

  hashTagInputElement.reportValidity();
};

const onTextDescriptionInput = () => {
  if (!checkStringLength(textDescriptionInputElement.value, LIMIT_COMMENT_LENGTH)) {
    textDescriptionInputElement.setCustomValidity('Не более 140 символов');
    markInvalid(textDescriptionInputElement);
  } else {
    textDescriptionInputElement.setCustomValidity('');
    markValid(textDescriptionInputElement);
  }
  textDescriptionInputElement.reportValidity();
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

const buttonSmallerElement = userImageFormElement.querySelector('.scale__control--smaller');
const buttonBiggerElement = userImageFormElement.querySelector('.scale__control--bigger');
const scaleValueElement = userImageFormElement.querySelector('.scale__control--value');
const imagePreviewElement = userImageFormElement.querySelector('.img-upload__user');
const userImageScaleHiddenElement = bodyElement.querySelector('.scale__value');

let imageScale = 100;

const changeScaleImage = () => {
  imagePreviewElement.style.transform = `scale(${imageScale/100})`;
};

const changeNumberValue = () => {
  scaleValueElement.value = `${imageScale}%`;
};

const onButtonSmallerClick = () => {
  if (imageScale === MIN_IMAGE_SCALE) {
    buttonSmallerElement.disabled = true;
  } else if (imageScale > MIN_IMAGE_SCALE) {
    imageScale -= STEP_IMAGE_SCALE;
    changeScaleImage();
    changeNumberValue();
  }
  buttonSmallerElement.disabled = false;
  userImageScaleHiddenElement.textContent = imageScale;
};

const onButtonBiggerClick = () => {
  if (imageScale === MAX_IMAGE_SCALE) {
    buttonBiggerElement.disabled = true;
  } else if (imageScale < MAX_IMAGE_SCALE) {
    imageScale += STEP_IMAGE_SCALE;
    changeScaleImage();
    changeNumberValue();
  }
  buttonBiggerElement.disabled = false;
  userImageScaleHiddenElement.textContent = imageScale;
};

const imageElement = userImageFormElement.querySelector('.img-upload__preview img');
const sliderElement = userImageFormElement.querySelector('.effect-level__slider');
const effectLevelValueElement = userImageFormElement.querySelector('.effect-level__value');
const imageEffectsPreviewElements = userImageFormElement.querySelectorAll('.effects__preview');
const userImageFilteHiddenElement = bodyElement.querySelector('.effect__value');
const sliderSubstrateElement = userImageFormElement.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      userImageFilteHiddenElement.textContent = value;
      return (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderElement.style.display = 'none';


const checkSlider = (effect, symbol = '') => {
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValueElement.value = values[handle];
    imageElement.style.filter = `${effect}(${values[handle]}${symbol})`;
  });
};

const onImgEffectsClick = (evt) => {

  if(evt.target.closest('.effects__preview--none')) {
    imageElement.className = '';
    imageElement.style.filter = '';
    sliderElement.style.display = 'none';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'none';
  } else if(evt.target.closest('.effects__preview--chrome')) {
    imageElement.className = 'effects__preview--chrome';
    sliderElement.style.display = 'block';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'initial';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('grayscale');
  } else if(evt.target.closest('.effects__preview--sepia')) {
    imageElement.className = 'effects__preview--sepia';
    sliderElement.style.display = 'block';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'initial';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('sepia');
  } else if(evt.target.closest('.effects__preview--marvin')) {
    imageElement.className = 'effects__preview--marvin';
    sliderElement.style.display = 'block';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'initial';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    checkSlider('invert', '%');
  } else if(evt.target.closest('.effects__preview--phobos')) {
    imageElement.className = 'effects__preview--phobos';
    sliderElement.style.display = 'block';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'initial';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('blur', 'px');
  } else if(evt.target.closest('.effects__preview--heat')) {
    imageElement.className = 'effects__preview--heat';
    sliderElement.style.display = 'block';
    sliderElement.noUiSlider.off();
    sliderSubstrateElement.style.display = 'initial';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('brightness');
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  showLoadBlock();
  postData(formData)
    .then((response) => {
      if (response.ok) {
        setTimeout(() => {
          closeFormEditImage();
          hideLoadBlock();
          showSuccessBlock();
        }, 500);
      }
    })
    .catch (() => {
      setTimeout(() => {
        closeFormEditImage();
        hideLoadBlock();
        showErrorBlock();
      }, 500);
    });
};

const resetUserImageForm = () => {
  userImageLoadElement.value = '';
  imageFormElement.reset();
  userImageElement.style.filter = '';
  sliderElement.style.display = 'none';
  userImageElement.style.transform = 'scale(1.0)';
  scaleValueElement.value = '100%';
  userImageElement.className = '';
  imagePreviewElement.style.transform = 'scale(1.0)';
  document.querySelector('.scale__value').textContent = '';
  userImageFilteHiddenElement.textContent = '';
  userImageScaleHiddenElement.textContent = '';
};

function showFormEditImage() {
  userImageFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  sliderSubstrateElement.style.display = 'none';

  document.addEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageFormElement.addEventListener('click', onButtonCloseClick);
  textDescriptionInputElement.addEventListener('input', onTextDescriptionInput);
  hashTagInputElement.addEventListener('input', onHashTagInput);
  buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
  buttonBiggerElement.addEventListener('click', onButtonBiggerClick);
  imageEffectElement.addEventListener('click', onImgEffectsClick);
  imageFormElement.addEventListener('submit', onFormSubmit);
}

function closeFormEditImage() {
  userImageFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageFormElement.removeEventListener('click', onButtonCloseClick);
  textDescriptionInputElement.removeEventListener('input', onTextDescriptionInput);
  hashTagInputElement.removeEventListener('input', onHashTagInput);
  buttonSmallerElement.removeEventListener('click', onButtonSmallerClick);
  buttonBiggerElement.removeEventListener('click', onButtonBiggerClick);
  imageEffectElement.removeEventListener('click', onImgEffectsClick);
  imageFormElement.removeEventListener('submit', onFormSubmit);
  resetUserImageForm();
}

userImageLoadElement.addEventListener('change', () => {
  showFormEditImage();
  const imageUser = URL.createObjectURL(userImageLoadElement.files[0]);
  userImageElement.src = imageUser;
  imageEffectsPreviewElements.forEach((item) => {
    item.style.backgroundImage = `url(${imageUser})`;
  });
});
