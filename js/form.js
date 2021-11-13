import {isEscapeKey, checkStringLength} from './util.js';
import {postData} from './server-load.js';
import {showLoadBlock, hideLoadBlock, showSuccessBlock, showErrorBlock} from './messages.js';

const LIMIT_HASHTAG_LENGTH = 20;
const LIMIT_HASHTAGS_LENGTH = 5;
const LIMIT_COMMENT_LENGTH = 140;

const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;
const STEP_IMAGE_SCALE = 25;

const body = document.querySelector('body');
const userImageForm = document.querySelector('.img-upload__overlay');
const userImageLoad = document.querySelector('#upload-file');
const imageForm = document.querySelector('.img-upload__form');
const buttonCloseImageForm = userImageForm.querySelector('#upload-cancel');
const textDescriptionInput = userImageForm.querySelector('.text__description');
const userImage = userImageForm.querySelector('.img-upload__user');
const hashTagExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashTagInput = userImageForm.querySelector('.text__hashtags');
const imageEffect = document.querySelector('.img-upload__effects');

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

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const userImageScaleHidden = document.querySelector('.scale__value');
let imageScale = 100;

function changeScaleImage () {
  imagePreview.style.transform = `scale(${imageScale/100})`;
}

function changeNumberValue () {
  scaleValue.value = `${imageScale}%`;
}

const onButtonSmallerClick = () => {
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

const onButtonBiggerClick = () => {
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

const image = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imageEffectsPreview = document.querySelectorAll('.effects__preview');
const userImageFilteHidden = document.querySelector('.effect__value');

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
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
slider.style.display = 'none';


const checkSlider = (effect, symbol = '') => {
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    image.style.filter = `${effect}(${values[handle]}${symbol})`;
  });
};

const onImgEffectsClick = (evt) => {

  if(evt.target.closest('.effects__preview--none')) {
    image.className = '';
    image.style.filter = '';
    slider.style.display = 'none';
    slider.noUiSlider.off();
  } else if(evt.target.closest('.effects__preview--chrome')) {
    image.className = 'effects__preview--chrome';
    slider.style.display = 'block';
    slider.noUiSlider.off();

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

  document.addEventListener('keydown', onformEditEscKeydown);
  buttonCloseImageForm.addEventListener('click', onButtonCloseClick);
  textDescriptionInput.addEventListener('input', checkTextDescription);
  hashTagInput.addEventListener('input', checkHashTag);
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
  textDescriptionInput.removeEventListener('input', checkTextDescription);
  hashTagInput.removeEventListener('input', checkHashTag);
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
