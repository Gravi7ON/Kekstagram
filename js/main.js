import {showthumbnail} from './rendering-of-thumbnails.js';
import {showBigImage, showPostPreview} from './rendering-of-big-image.js';
import {userImages} from './data.js';
import './form.js';

const thumbnail = document.querySelector('.pictures');

const showUserPost = (optionImage) => {
  showBigImage();
  showPostPreview(optionImage);
};

thumbnail.addEventListener('click', (evt) => {
  const optionImage = userImages.find((element) => element.id === +evt.target.dataset.id);
  if(!optionImage) {
    return;
  }
  showUserPost(optionImage);
});

userImages.forEach((item) => {
  const thumbnailElement = showthumbnail(item);
  thumbnail.append(thumbnailElement);
});
