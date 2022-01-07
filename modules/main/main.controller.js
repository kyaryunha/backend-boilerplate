const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const urlService = require('../url/url.service');

const getHello = catchAsync(async (req, res) => {
  res.json({
    description: 'Backend Boilerplate',
  });
});

const getMe = catchAsync(async (req, res) => {
  res.json({
    user: req.user,
  });
});

const getLongURL = catchAsync(async (req, res) => {
  const url = await urlService.getLongUrl(req.params.url); /// short
  console.log('!!', url);
  if (!url) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Url not found');
  }
  res.redirect(url.longUrl);
});

module.exports = {
  getHello,
  getMe,
  getLongURL,
};
