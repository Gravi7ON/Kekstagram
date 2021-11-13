import {getImageWrapper} from './rendering-of-thumbnails.js';
import {getRandomNotRepeat, debounce} from './util.js';

function sortImages (data) {

  const imgFiltersBlock = document.querySelector('.img-filters');
  const imgFiltersForm = document.querySelector('.img-filters__form');
  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  imgFiltersBlock.classList.remove('img-filters--inactive');

  const checkSame = (array) => (new Set(array)).size !== array.length;

  const sortingImages = (sortName) => {
    if(sortName === 'filter-default') {
      getImageWrapper(data);
    }

    if(sortName === 'filter-discussed') {
      const discussedImages = JSON.parse(JSON.stringify(data)).sort((item1, item2) => item2.comments.length - item1.comments.length);
      getImageWrapper(discussedImages);
    }

    if(sortName === 'filter-random') {
      const randomImages = [];
      for(let i = 0; i < 10; i++) {
        randomImages.push(data[getRandomNotRepeat(0, data.length - 1)]);
        if(checkSame(randomImages)) {
          randomImages.pop();
          i--;
        }
      }
      getImageWrapper(randomImages);
    }
  };

  const onFiltersClick = (evt) => {
    imgFiltersButtons.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });

    if(evt.target.closest('.img-filters__button')) {
      evt.target.classList.add('img-filters__button--active');
      const sortName = evt.target.id;
      sortingImages(sortName);
    }
  };

  imgFiltersForm.addEventListener('click', debounce(onFiltersClick));
}

export {sortImages};
