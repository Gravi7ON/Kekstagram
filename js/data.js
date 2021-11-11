import {getRandomIntInclusive, getRandomNotRepeat} from './util.js';

const AMOUNT_OF_GENERATE_USER_COMMENTS = 7;
const AMOUNT_OF_GENERATE_USER_IMAGE = 25;

const userNames = [
  'Павел',
  'Михаил',
  'Евгений',
  'Василий',
  'Степан',
  'Николай',
  'Игорь',
  'Пётр',
  'Максим',
];

const userListComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createRandomElement = (element) => element[getRandomIntInclusive(0, element.length - 1)];

const itemId = getRandomNotRepeat(AMOUNT_OF_GENERATE_USER_IMAGE);
const itemUrl = getRandomNotRepeat(AMOUNT_OF_GENERATE_USER_IMAGE);
const itemDescription = getRandomNotRepeat(AMOUNT_OF_GENERATE_USER_IMAGE);

const createUserComment = () => ({
  id: getRandomIntInclusive(1, 1000),
  avatar: `img/avatar-${  getRandomIntInclusive(1, 6)  }.svg`,
  message: createRandomElement(userListComments),
  name: createRandomElement(userNames),
});

const userComments = Array.from({length: AMOUNT_OF_GENERATE_USER_COMMENTS}, createUserComment);

const getUniqUserComment = () => {
  const userLists = Array.from({length: getRandomIntInclusive(1, AMOUNT_OF_GENERATE_USER_COMMENTS)});
  const uniqUserComments = userLists.map((element) => {
    element = userComments[getRandomIntInclusive(0, userComments.length - 1)];
    return element;
  });
  return uniqUserComments;
};

const createUserImage = () => ({
  id: itemId(),
  url: `photos/${  itemUrl() }.jpg`,
  description: `Cool photo №${ itemDescription() }!!!`,
  likes: getRandomIntInclusive (15, 200),
  comments: getUniqUserComment(),
});

const userImages = Array.from({length: AMOUNT_OF_GENERATE_USER_IMAGE}, createUserImage);

export {userImages};
