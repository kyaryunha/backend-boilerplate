const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const db = require('../../models');

const { User, sequelize } = db;
const ApiError = require('../../utils/ApiError');

/**
 * Get user by id
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => User.findByPk(userId);

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const user = await getUserById(userBody.id);
  if (user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Already Exists');
  }
  const userBody2 = { ...userBody };
  userBody2.password = await bcrypt.hash(userBody2.password, 8);
  return User.create(userBody2);
};

/**
 * List for users
 * @param {string} [sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [limit] - Maximum number of results per page (default = 100)
 *  @param {number} [offset] - Offset of results per page (default = 0)
 * @returns {Promise<User[]>}
 */
const getUsers = async ({ sortBy, limit, offset }) => {
  const options = {};
  if (sortBy) options.order = [[sortBy, 'ASC']];
  options.limit = limit || 100;
  options.offset = offset || 0;
  return await User.findAll(options);
};

/**
 * Update user by id
 * @param {Object} requestUser
 * @param {string} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (requestUser, userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (requestUser.id !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const filterUserData = (user) => ({
  id: user.id,
  name: user.name,
  createdAt: user.createdAt,
});

const filterUsersData = (users) => users.map((user) => filterUserData(user));

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  filterUserData,
  filterUsersData,
};
