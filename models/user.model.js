const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static associate(_models) {
    this.hasMany(_models.Token, {
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
      onUpdate: 'CASCADE',
      sourceKey: 'id',
    });
  }

  isPasswordMatch(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }

  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(32),
        required: true,
        trim: true,
      },
      password: {
        type: DataTypes.STRING(256),
        required: true,
        trim: true,
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
