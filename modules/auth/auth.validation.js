const Joi = require('joi');
const { customValidation } = require('../../utils');

const register = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required().custom(customValidation.password),
        name: Joi.string().required(),
    }),
};

const login = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
};
