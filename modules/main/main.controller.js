const catchAsync = require('../../utils/catchAsync');

const getHello = catchAsync(async (req, res) => {
    res.json({
        description: 'Backend Boilerplate',
    });
});

const getMe = catchAsync(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    getHello,
    getMe
};
