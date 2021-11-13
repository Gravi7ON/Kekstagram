import './form.js';
import {loadData} from './server-load.js';
import {getImageWrapper} from './rendering-of-thumbnails.js';
import {showErrorLoadWrapper} from './notice.js';
import {setActiveFilter, sortingImages} from './image-sorting.js';

const imgFiltersBlock = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

loadData()
  .then((image) => {
    if (image) {
      getImageWrapper(image);
      imgFiltersBlock.classList.remove('img-filters--inactive');

      imgFiltersForm.addEventListener('click', (evt) => {
        const activeFilter = setActiveFilter(evt);

        const sortedImage = sortingImages(activeFilter, image).filter((item) => !!item);

        const pictures = document.querySelectorAll('.picture');
        pictures.forEach((item) => {
          item.remove();
        });

        getImageWrapper(sortedImage);
      });
    }
  })
  .catch((err) => {
    showErrorLoadWrapper(`Ошибка получения данных с сервера. ${err}`);
  });
