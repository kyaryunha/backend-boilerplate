const express = require('express');
const validate = require('../../middlewares/validate');
const urlValidation = require('./url.validation');
const urlController = require('./url.controller');

const router = express.Router();

router.route('/').post(validate(urlValidation.createShortUrl), urlController.createShortUrl);
router.route('/:url').get(urlController.getShortUrlCallCount);

module.exports = router;
