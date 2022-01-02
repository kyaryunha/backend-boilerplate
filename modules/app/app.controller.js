const catchAsync = require('../../utils/catchAsync');

const getHello = catchAsync(async (req, res) => {
    res.send('Hello World');
});

const getMe = catchAsync(async (req, res) => {
    res.send(req.user);
});

module.exports = {
    getHello,
    getMe
};
