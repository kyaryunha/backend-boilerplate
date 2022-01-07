const catchAsync = require('../../utils/catchAsync');
const urlService = require('../url/url.service');

const createShortUrl = catchAsync(async (req, res) => {
  const shortUrl = await urlService.createShortUrl(req.body.url);
  res.json({
    shortUrl,
  });
});

const getShortUrlCallCount = catchAsync(async (req, res) => {
  res.json({
  });
});

module.exports = {
  createShortUrl,
  getShortUrlCallCount,
};
