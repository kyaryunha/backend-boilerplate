const httpStatus = require('http-status');
const db = require('../../models');

const { Url, sequelize } = db;
const ApiError = require('../../utils/ApiError');

const getRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random()
            * charactersLength));
  }
  return result;
};

const getUrlByShortUrl = async (shortUrl) => Url.findOne({
  where: {
    shortUrl,
  },
});
const getUrlByLongUrl = async (longUrl) => Url.findOne({
  where: {
    longUrl,
  },
});

const createShortUrl = async (longUrl) => {
  const shortUrl = getRandomString(6);
  const exShortUrl = await getUrlByShortUrl(shortUrl);
  const exLongUrl = await getUrlByLongUrl(longUrl);
  await Url.create({
    shortUrl,
    longUrl,
  });
  while(exLongUrl) {
    // exLongUrl = exLongUrl + getRandomString(1),
    // if(exLongUrl) 또 돌림...
    break;
  };
  return `http://127.0.0.1:3001/${shortUrl}`;
};

const getLongUrl = async (shortUrl) => {
  const url = await getUrlByShortUrl(shortUrl);
  return url;
};

const getShortUrlCallCount = (shortUrl) => {

};

module.exports = {
  getUrlByShortUrl,
  getUrlByLongUrl,
  createShortUrl,
  getLongUrl,
  getShortUrlCallCount,
};
