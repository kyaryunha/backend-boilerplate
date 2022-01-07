const { Model } = require('sequelize');

class Url extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      shortUrl: {
        type: DataTypes.STRING(256),
        required: true,
        primaryKey: true,
      },
      longUrl: {
        type: DataTypes.STRING(256),
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

module.exports = (sequelize, DataTypes) => Url.init(sequelize, DataTypes);
