function getRandomIntInclusive (from, to) {
  if (from < to && to !== 0 && from >= 0) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Аргументы не должны быть отрицательными, а также from не может быть больше или равно to';
}
getRandomIntInclusive();

function checkLengthString (stringName, maxLength) {
  return stringName.length <= maxLength;
}
checkLengthString();

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

const generateData = [];

function getCommentForArray (id, avatar, message, name) {
  this.id = id;
  this.avatar = avatar;
  this.message = message;
  this.name = name;
}

function getComment () {
  const listOfUsersComments = [];
  for (let index = 1; index <= getRandomIntInclusive(1, 5); index++) {
    const usersComments = new getCommentForArray (getRandomIntInclusive(1, 1000), `img/avatar-${  getRandomIntInclusive(1, 6)  }.svg`, userListComments[getRandomIntInclusive(0, userListComments.length - 1)], userNames[getRandomIntInclusive(0, userNames.length - 1)]);
    listOfUsersComments.push(usersComments);
  }
  return listOfUsersComments;
}

function getObjectForArray (id, url, description, likes, comments) {
  this.id = id;
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comments;
}

for (let index = 1; index <= 25; index++) {
  const generatedNewObject = new getObjectForArray (index, `photos/${  index  }.jpg`, `Cool photo ${  index}`, getRandomIntInclusive(15, 200), getComment());
  generateData.push(generatedNewObject);
}

