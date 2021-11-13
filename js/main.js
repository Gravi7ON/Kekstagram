import './form.js';
import {loadData} from './server-load.js';
import {getImageWrapper} from './rendering-of-thumbnails.js';
import {showErrorLoadWrapper} from './util.js';

const imageFilters = document.querySelector('.img-filters');

loadData()
  .then((image) => {
    if (image) {
      getImageWrapper(image);
    }
  }).catch((err) => {
    showErrorLoadWrapper(`Ошибка получения данных с сервера. ${err}`);
  });

imageFilters.classList.remove('img-filters--inactive');
