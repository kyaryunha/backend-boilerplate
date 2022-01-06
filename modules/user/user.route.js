const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('./user.validation');
const userController = require('./user.controller');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)

module.exports = router;
