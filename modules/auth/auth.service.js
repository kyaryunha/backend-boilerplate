const httpStatus = require('http-status');
const { Token } = require('../../models');
const ApiError = require('../../utils/ApiError');
// const { tokenService } = require("../services");
// const { userService } = require("../services");
const tokenService = require('../token/token.service');
const userService = require('../user/user.service');
const { tokenTypes } = require('../../config/tokens');

/**
 * Login with id and password
 * @param {string} id
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithIdAndPassword = async (id, password) => {
  const user = await userService.getUserById(id);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect id or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginUserWithIdAndPassword,
  logout,
  refreshAuth,
};
