const Joi = require('joi');
const { customValidation } = require('../../utils');

const createUser = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required().custom(customValidation.password),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        id: Joi.string().required(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(customValidation.objectId),
    }),
    body: Joi.object()
        .keys({
            password: Joi.string().custom(customValidation.password),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(customValidation.objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
