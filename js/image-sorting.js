import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

const AMOUNT_RANDOM_POSTS = 10;

const imageFiltersButtonsElements = document.querySelectorAll('.img-filters__button');

const hasDuplicate = (array) => {
  (new Set(array)).size !== array.length;
};

const chooseImages = (sortName, data) => {
  if(sortName === 'filter-default') {
    return(data);
  }

  if(sortName === 'filter-discussed') {
    const discussedImages = JSON.parse(JSON.stringify(data)).sort((item1, item2) => item2.comments.length - item1.comments.length);
    return discussedImages;
  }

  if(sortName === 'filter-random') {
    const randomImages = [];

    for(let i = 0; i < AMOUNT_RANDOM_POSTS; i++) {
      randomImages.push(data[getRandomPositiveInteger(0, data.length - 1)]);
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
  imageFiltersButtonsElements.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  if(evt.target.closest('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
    const sortName = evt.target.id;

    return sortName;
  }
};

export {chooseImages, setActiveFilter};
