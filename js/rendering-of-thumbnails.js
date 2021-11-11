const templateFragment = document.querySelector('#picture').content;
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

export {showthumbnail};
