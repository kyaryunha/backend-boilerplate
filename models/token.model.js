const { Model } = require('sequelize');
const { tokenTypes } = require('../config/tokens');

class Token extends Model {
    static associate(_models) {
    }
    static init(sequelize, DataTypes) {
        super.init({
            token: {
                type: DataTypes.STRING(256),
                required: true,
                index: true,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                required: true,
            },
            type: {
                type: DataTypes.STRING(32),
                enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
                required: true,
            },
            expires: {
                type: DataTypes.DATE,
                required: true,
            },
        }, {
            sequelize,
            timestamps: true,
            collate: 'utf8mb4_unicode_ci',
        });
        return this;
    }
}

module.exports = (sequelize, DataTypes) => Token.init(sequelize, DataTypes);
