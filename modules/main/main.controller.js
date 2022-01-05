const catchAsync = require('../../utils/catchAsync');

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

module.exports = {
  getHello,
  getMe,
};
