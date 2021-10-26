import './rendering-of-big-image.js';
import {userCommentsForMainArray} from './data.js';

const renderingThumbnails = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const templateImage = templateFragment.querySelector('a');

const imageData = userCommentsForMainArray;

const fragment = document.createDocumentFragment();

imageData.forEach (({url, likes, comments}) => {
  const image = templateImage.cloneNode(true);
  image.querySelector('img').setAttribute('src', url);
  image.querySelector('.picture__likes').textContent = likes;
  image.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(image);
});

renderingThumbnails.append(fragment);
