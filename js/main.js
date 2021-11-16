import './form.js';
import {loadData} from './server-load.js';
import {getImageWrapper} from './rendering-of-thumbnails.js';
import {showErrorLoadWrapper} from './notice.js';
import {setActiveFilter, sortingImages} from './image-sorting.js';
import {debounce} from './util.js';

const imgFiltersBlock = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

loadData()
  .then((posts) => {
    if (posts) {
      getImageWrapper(posts);
      imgFiltersBlock.classList.remove('img-filters--inactive');

      imgFiltersForm.addEventListener('click', debounce((evt) => {
        const activeFilter = setActiveFilter(evt);
        if(!activeFilter) {
          return;
        }
        const sortedImage = sortingImages(activeFilter, posts).filter((item) => !!item);

        const postElement = document.querySelectorAll('.picture');
        postElement.forEach((item) => {
          item.remove();
        });

        getImageWrapper(sortedImage);
      }));
    }
  })
  .catch((err) => {
    showErrorLoadWrapper(`Ошибка получения данных с сервера. ${err}`);
  });
