const Joi = require('joi');
const { customValidation } = require('../../utils');

const createShortUrl = {
  body: Joi.object().keys({
    url: Joi.string().uri({
      scheme: [
        /https?/,
        /http?/,
      ],
    }),
  }),
};
module.exports = {
  createShortUrl,
};
