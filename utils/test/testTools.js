const userService = require('../../modules/user/user.service');
const tokenService = require('../../modules/token/token.service');

function getRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random()
            * charactersLength));
  }
  return result;
}

const createUser = async ({ id, name, password }) => await userService.createUser({
  id: id || `userid${getRandomString(4)}`,
  name: name || `name${getRandomString(4)}`,
  password: password || `pass${getRandomString(4)}`,
});

const getLoginTokens = async (user) => await tokenService.generateAuthTokens(user);

module.exports = {
  createUser,
  getLoginTokens,
};
