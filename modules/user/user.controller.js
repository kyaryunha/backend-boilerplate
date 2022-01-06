const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const userService = require('./user.service');

const getUsers = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'offset']);
  const users = await userService.getUsers(options);
  res.json({
    users: userService.filterUsersData(users),
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.json({
    user: userService.filterUserData(user),
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user, req.params.userId, req.body);
  res.json({
    user: userService.filterUserData(user),
  });
});

module.exports = {
  getUsers,
  getUser,
  updateUser,
};
