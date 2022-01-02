const { Model } = require('sequelize');

class User extends Model {
    static associate(_models) {
    }
    static init(sequelize, DataTypes) {
        super.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(36),
                required: true,
                trim: true,
            },
            password: {
                type: DataTypes.STRING(36),
                required: true,
                trim: true,
                minlength: 8,
                validate(value) {
                    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                        throw new Error('Password must contain at least one letter and one number');
                    }
                },
                private: true, // used by the toJSON plugin
            },
        }, {
            sequelize,
            timestamps: true,
            collate: 'utf8mb4_unicode_ci',
        });
        return this;
    }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
