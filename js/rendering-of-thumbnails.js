import {showBigImage, showPostPreview} from './rendering-of-big-image.js';

const templateFragmentElement = document.querySelector('#picture').content;
const imagesWrapperElement = document.querySelector('.pictures');
const templateImageElement = templateFragmentElement.querySelector('a');
const fragmentElement = document.createDocumentFragment();

const showthumbnail = ({url, likes, comments, id}) => {
  const image = templateImageElement.cloneNode(true);
  image.querySelector('img').setAttribute('src', url);
  image.querySelector('img').setAttribute('data-id', id);
  image.querySelector('.picture__likes').textContent = likes;
  image.querySelector('.picture__comments').textContent = comments.length;
  fragmentElement.appendChild(image);

  return fragmentElement;
};

const showUserPost = (optionImage) => {
  showBigImage();
  showPostPreview(optionImage);
};

const getImageWrapper = (images) => {
  images.forEach((item) => {
    const thumbnailElement = showthumbnail(item);
    imagesWrapperElement.append(thumbnailElement);
  });
  imagesWrapperElement.addEventListener('click', (evt) => {
    const optionImage = images.find((element) => element.id === +evt.target.dataset.id);
    if(!optionImage) {
      return;
    }
    showUserPost(optionImage);
  });
};

export {getImageWrapper};
