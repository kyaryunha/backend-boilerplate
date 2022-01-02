const express = require('express');
const auth = require("../../middlewares/auth");
const { appController } = require("../controllers");

const router = express.Router();

router.route('/').get(appController.getHello);
router.route('/me').get(auth(),  appController.getMe);

module.exports = router;
