const express = require('express');
const { appController } = require("../controllers");

const router = express.Router();

router.route('/').get(appController.getHello);

module.exports = router;
