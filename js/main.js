import {showthumbnail} from './rendering-of-thumbnails.js';
import {showBigImage, showPostPreview} from './rendering-of-big-image.js';
import {loadData} from './server-load.js';
import './form.js';

const thumbnail = document.querySelector('.pictures');

const showUserPost = (optionImage) => {
  showBigImage();
  showPostPreview(optionImage);
};

loadData()
  .then((image) => {
    image.forEach((item) => {
      const thumbnailElement = showthumbnail(item);
      thumbnail.append(thumbnailElement);
    });
    thumbnail.addEventListener('click', (evt) => {
      const optionImage = image.find((element) => element.id === +evt.target.dataset.id);
      if(!optionImage) {
        return;
      }
      showUserPost(optionImage);
    });
  });
