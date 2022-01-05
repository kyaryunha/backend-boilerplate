const chalk = require('chalk');
const app = require('../../app');
const db = require("../../models");
const { User } = db;
const userService = require('../../modules/user/user.service');
const tokenService = require('../../modules/token/token.service');

function getRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const createUser = async ({values}) => {
    return await userService.createUser({
        id: 'userid'+getRandomString(4),
        name: 'name'+getRandomString(4),
        password: 'pass'+getRandomString(4),
    })
}

const getLoginTokens = async (user) => {
    return await tokenService.generateAuthTokens(user);
}

module.exports = {
    createUser,
    getLoginTokens,
}
