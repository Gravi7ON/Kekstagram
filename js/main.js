import './form.js';
import {loadData} from './server-load.js';
import {getImageWrapper} from './rendering-of-thumbnails.js';
import {showErrorLoadWrapper} from './notice.js';
import {sortImages} from './image-sorting.js';

loadData()
  .then((image) => {
    if (image) {
      getImageWrapper(image);
      sortImages(image);
    }
  }).catch((err) => {
    showErrorLoadWrapper(`Ошибка получения данных с сервера. ${err}`);
  });
