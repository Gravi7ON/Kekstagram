import {getRandomNotRepeat} from './util.js';

const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const hasDuplicate = (array) => (new Set(array)).size !== array.length;

const sortingImages = (sortName, data) => {
  if(sortName === 'filter-default') {
    return(data);
  }

  if(sortName === 'filter-discussed') {
    const discussedImages = JSON.parse(JSON.stringify(data)).sort((item1, item2) => item2.comments.length - item1.comments.length);
    return discussedImages;
  }

  if(sortName === 'filter-random') {
    const uniqIds = getRandomNotRepeat(data.length);
    const randomImages = [];

    for(let i = 0; i < 10; i++) {
      randomImages.push(data[uniqIds()]);
      if(hasDuplicate(randomImages)) {
        randomImages.pop();
        i--;
      }
    }
    return randomImages;
  }
  return data;
};

const setActiveFilter = (evt) => {
  imageFiltersButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  if(evt.target.closest('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
    const sortName = evt.target.id;
    sortingImages(sortName);
  }
};

export {sortingImages, setActiveFilter};
