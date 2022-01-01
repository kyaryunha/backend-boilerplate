const catchAsync = require('../../utils/catchAsync');

const getHello = catchAsync(async (req, res) => {
    res.send('Hello World');
});

module.exports = {
    getHello,
};
