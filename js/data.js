import {getRandomIntInclusive, getRandomNotRepeat} from './util.js';

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

const AMOUNT_OF_GENERATE_USER_COMMENTS = 3;
const AMOUNT_OF_GENERATE_OBJECTS = 25;

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const getItemForId = getRandomNotRepeat(AMOUNT_OF_GENERATE_OBJECTS);
const getItemForUrl = getRandomNotRepeat(AMOUNT_OF_GENERATE_OBJECTS);

const createObjectForComments = () => ({
  id: getRandomIntInclusive(1, 1000),
  avatar: `img/avatar-${  getRandomIntInclusive(1, 6)  }.svg`,
  message: getRandomArrayElement(userListComments),
  name: getRandomArrayElement(userNames),
});

const userComments = Array.from({length: AMOUNT_OF_GENERATE_USER_COMMENTS}, createObjectForComments);

const getObjectForArray = () => ({
  id: getItemForId(),
  url: `photos/${  getItemForUrl() }.jpg`,
  description: 'Cool photo',
  likes: getRandomIntInclusive (15, 200),
  comments: userComments,
});

const userCommentsForMainArray = Array.from({length: AMOUNT_OF_GENERATE_OBJECTS}, getObjectForArray);
userCommentsForMainArray;
