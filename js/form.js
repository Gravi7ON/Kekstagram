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

const body = document.querySelector('body');
const imageForm = body.querySelector('.img-upload__form');
const userImageForm = imageForm.querySelector('.img-upload__overlay');
const userImageLoad = imageForm.querySelector('#upload-file');
const buttonCloseImageForm = userImageForm.querySelector('#upload-cancel');
const textDescriptionInput = userImageForm.querySelector('.text__description');
const userImage = userImageForm.querySelector('.img-upload__user');
const hashTagExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashTagInput = userImageForm.querySelector('.text__hashtags');
const imageEffect = userImageForm.querySelector('.img-upload__effects');

const markInvalid = function (element) {
  element.style.borderColor = 'red';
};

const markValid = function (element) {
  element.style.borderColor = 'initial';
};

const onHashTagInput = function () {
  const valueHashTag = hashTagInput.value.trim().toLowerCase();
  const valueHashTags = valueHashTag.split(' ');
  const hashTagsUniqs = [...new Set(valueHashTags)];

  if (valueHashTags.length > LIMIT_HASHTAGS_LENGTH) {
    hashTagInput.setCustomValidity('Не более 5 хеш-тегов');
    markInvalid(hashTagInput);
    hashTagInput.reportValidity();
    return;
  } else if (valueHashTags.length > hashTagsUniqs.length) {
    hashTagInput.setCustomValidity('Хеш-теги не должны повторяться');
    markInvalid(hashTagInput);
    hashTagInput.reportValidity();
    return;
  } else {
    hashTagInput.setCustomValidity('');
    markValid(hashTagInput);
  }

  for (let i = 0; i < valueHashTags.length; i++) {
    if (valueHashTags[i] === '#') {
      hashTagInput.setCustomValidity('Хеш-тег не может состоять только из одного символа #');
      markInvalid(hashTagInput);
      break;
    } else if (!valueHashTags[i].startsWith('#')) {
      hashTagInput.setCustomValidity('Хеш-тег начинается с символа #');
      markInvalid(hashTagInput);
      break;
    } else if (valueHashTags[i].length > LIMIT_HASHTAG_LENGTH) {
      hashTagInput.setCustomValidity(`Удалите лишние ${valueHashTags[i].length - LIMIT_HASHTAG_LENGTH} симв.`);
      markInvalid(hashTagInput);
      break;
    } else if (!hashTagExpression.test(valueHashTags[i])) {
      hashTagInput.setCustomValidity('Хеш-тег не содержит пробелы, спецсимволы (@, $...), тире, дефис, запятая, эмодзи ...');
      markInvalid(hashTagInput);
      break;
    } else {
      markValid(hashTagInput);
    }
  }

  hashTagInput.reportValidity();
};

const onTextDescriptionInput = function () {
  if (!checkStringLength(textDescriptionInput.value, LIMIT_COMMENT_LENGTH)) {
    textDescriptionInput.setCustomValidity('Не более 140 символов');
    markInvalid(textDescriptionInput);
  } else {
    textDescriptionInput.setCustomValidity('');
    markValid(textDescriptionInput);
  }
  textDescriptionInput.reportValidity();
};

const onformEditEscKeydown = function (evt) {
  if (isEscapeKey (evt) && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault();
    closeFormEditImage();
  }
};

const onButtonCloseClick = function () {
  closeFormEditImage();
};

const buttonSmaller = userImageForm.querySelector('.scale__control--smaller');
const buttonBigger = userImageForm.querySelector('.scale__control--bigger');
const scaleValue = userImageForm.querySelector('.scale__control--value');
const imagePreview = userImageForm.querySelector('.img-upload__user');
const userImageScaleHidden = body.querySelector('.scale__value');

let imageScale = 100;

const changeScaleImage = function () {
  imagePreview.style.transform = `scale(${imageScale/100})`;
};

const changeNumberValue = function () {
  scaleValue.value = `${imageScale}%`;
};

const onButtonSmallerClick = function () {
  if (imageScale === MIN_IMAGE_SCALE) {
    buttonSmaller.disabled = true;
  } else if (imageScale > MIN_IMAGE_SCALE) {
    imageScale -= STEP_IMAGE_SCALE;
    changeScaleImage();
    changeNumberValue();
  }
  buttonSmaller.disabled = false;
  userImageScaleHidden.textContent = imageScale;
};

const onButtonBiggerClick = function () {
  if (imageScale === MAX_IMAGE_SCALE) {
    buttonBigger.disabled = true;
  } else if (imageScale < MAX_IMAGE_SCALE) {
    imageScale += STEP_IMAGE_SCALE;
    changeScaleImage();
    changeNumberValue();
  }
  buttonBigger.disabled = false;
  userImageScaleHidden.textContent = imageScale;
};

const image = userImageForm.querySelector('.img-upload__preview img');
const slider = userImageForm.querySelector('.effect-level__slider');
const effectLevelValue = userImageForm.querySelector('.effect-level__value');
const imageEffectsPreview = userImageForm.querySelectorAll('.effects__preview');
const userImageFilteHidden = body.querySelector('.effect__value');
const sliderSubstrate = userImageForm.querySelector('.img-upload__effect-level');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      userImageFilteHidden.textContent = value;
      return (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
slider.style.display = 'none';


const checkSlider = function (effect, symbol = '') {
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    image.style.filter = `${effect}(${values[handle]}${symbol})`;
  });
};

const onImgEffectsClick = function (evt) {

  if(evt.target.closest('.effects__preview--none')) {
    image.className = '';
    image.style.filter = '';
    slider.style.display = 'none';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'none';
  } else if(evt.target.closest('.effects__preview--chrome')) {
    image.className = 'effects__preview--chrome';
    slider.style.display = 'block';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'initial';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('grayscale');
  } else if(evt.target.closest('.effects__preview--sepia')) {
    image.className = 'effects__preview--sepia';
    slider.style.display = 'block';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'initial';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    checkSlider('sepia');
  } else if(evt.target.closest('.effects__preview--marvin')) {
    image.className = 'effects__preview--marvin';
    slider.style.display = 'block';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'initial';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    checkSlider('invert', '%');
  } else if(evt.target.closest('.effects__preview--phobos')) {
    image.className = 'effects__preview--phobos';
    slider.style.display = 'block';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'initial';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    checkSlider('blur', 'px');
  } else if(evt.target.closest('.effects__preview--heat')) {
    image.className = 'effects__preview--heat';
    slider.style.display = 'block';
    slider.noUiSlider.off();
    sliderSubstrate.style.display = 'initial';
    slider.noUiSlider.updateOptions({
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

const onFormSubmit = function (evt) {
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

const resetUserImageForm = function () {
  userImageLoad.value = '';
  imageForm.reset();
  userImage.style.filter = '';
  slider.style.display = 'none';
  userImage.style.transform = 'scale(1.0)';
  scaleValue.value = '100%';
  userImage.className = '';
  imagePreview.style.transform = 'scale(1.0)';
  document.querySelector('.scale__value').textContent = '';
  userImageFilteHidden.textContent = '';
  userImageScaleHidden.textContent = '';
};

function showFormEditImage () {
  userImageForm.classList.remove('hidden');
  body.classList.add('modal-open');
  sliderSubstrate.style.display = 'none';

  document.addEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.addEventListener('click', onButtonCloseClick);
  textDescriptionInput.addEventListener('input', onTextDescriptionInput);
  hashTagInput.addEventListener('input', onHashTagInput);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
  imageEffect.addEventListener('click', onImgEffectsClick);
  imageForm.addEventListener('submit', onFormSubmit);
}

function closeFormEditImage () {
  userImageForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.removeEventListener('click', onButtonCloseClick);
  textDescriptionInput.removeEventListener('input', onTextDescriptionInput);
  hashTagInput.removeEventListener('input', onHashTagInput);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  imageEffect.removeEventListener('click', onImgEffectsClick);
  imageForm.removeEventListener('submit', onFormSubmit);
  resetUserImageForm();
}

userImageLoad.addEventListener('change', () => {
  showFormEditImage();
  const imageUser = URL.createObjectURL(userImageLoad.files[0]);
  userImage.src = imageUser;
  imageEffectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${imageUser})`;
  });
});
