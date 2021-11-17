import {showBigImage, showPostPreview} from './rendering-of-big-image.js';

const templateFragment = document.querySelector('#picture').content;
const imagesWrapper = document.querySelector('.pictures');
const templateImage = templateFragment.querySelector('a');
const fragment = document.createDocumentFragment();

const showthumbnail = (({url, likes, comments, id}) => {
  const image = templateImage.cloneNode(true);
  image.querySelector('img').setAttribute('src', url);
  image.querySelector('img').setAttribute('data-id', id);
  image.querySelector('.picture__likes').textContent = likes;
  image.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(image);

  return fragment;
});

const showUserPost = (optionImage) => {
  showBigImage();
  showPostPreview(optionImage);
};

const getImageWrapper = (images) => {
  images.forEach((item) => {
    const thumbnailElement = showthumbnail(item);
    imagesWrapper.append(thumbnailElement);
  });
  imagesWrapper.addEventListener('click', (evt) => {
    const optionImage = images.find((element) => element.id === +evt.target.dataset.id);
    if(!optionImage) {
      return;
    }
    showUserPost(optionImage);
  });
};

export {getImageWrapper};
