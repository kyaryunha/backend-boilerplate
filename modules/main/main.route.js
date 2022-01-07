const express = require('express');
const auth = require('../../middlewares/auth');
const mainController = require('./main.controller');

const router = express.Router();

router.route('/').get(mainController.getHello);
router.route('/me').get(auth(), mainController.getMe);
// router.route('/:url').get(mainController.getLongURL);

module.exports = router;
