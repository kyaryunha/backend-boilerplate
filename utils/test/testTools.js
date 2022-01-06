const userService = require('../../modules/user/user.service');
const tokenService = require('../../modules/token/token.service');

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

const getPath = (path, params) => {
  let path2 = path;
  Object.keys(params).forEach((key) => {
    path2 = path2.replace(`:${key}`, params[key]);
  });
  return path2;
};

const createUser = async ({ id, name, password }) => {
  const userBody = {
    id: id || `userid${getRandomString(10)}`,
    name: name || `name${getRandomString(10)}`,
    password: password || `pass${getRandomString(10)}`,
  };
  await userService.createUser(userBody);
  return userBody;
};

const getLoginTokens = async (user) => await tokenService.generateAuthTokens(user);

module.exports = {
  getPath,
  createUser,
  getLoginTokens,
};
