import {userImages} from './data.js';

const thumbnail = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const templateImage = templateFragment.querySelector('a');
const fragment = document.createDocumentFragment();

userImages.forEach (({url, likes, comments}) => {
  const image = templateImage.cloneNode(true);
  image.querySelector('img').setAttribute('src', url);
  image.querySelector('.picture__likes').textContent = likes;
  image.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(image);
});

thumbnail.append(fragment);
