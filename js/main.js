import './form.js';
import {loadData} from './server-load.js';
import {getImageWrapper} from './rendering-of-thumbnails.js';
import {showErrorLoadWrapper} from './notice.js';
import {setActiveFilter, chooseImages} from './image-sorting.js';
import {debounce} from './utils/debounce.js';

const imgFiltersBlockElement = document.querySelector('.img-filters');
const imgFiltersFormElement = imgFiltersBlockElement.querySelector('.img-filters__form');

loadData()
  .then((posts) => {
    if (posts) {
      getImageWrapper(posts);
      imgFiltersBlockElement.classList.remove('img-filters--inactive');

      imgFiltersFormElement.addEventListener('click', (evt) => {
        setActiveFilter(evt);
      });

      imgFiltersFormElement.addEventListener('click', debounce((evt) => {
        const activeFilter = setActiveFilter(evt);
        if(!activeFilter) {
          return;
        }
        const sortedImage = chooseImages(activeFilter, posts).filter((item) => !!item);

        const postsElements = document.body.querySelectorAll('.picture');
        postsElements.forEach((item) => {
          item.remove();
        });

        getImageWrapper(sortedImage);
      }));
    }
  })
  .catch((err) => {
    showErrorLoadWrapper(`Ошибка получения данных с сервера. ${err}`);
  });
