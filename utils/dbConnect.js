const chalk = require('chalk');
const db = require('../models');

const { sequelize } = db;

const dbConnectForTest = async (force = false) => {
  await sequelize.sync({ force })
    .then(() => {
      console.log(chalk.blue('Success: DB Connected'));
    })
    .catch((err) => {
      console.error(err);
    });
};

const dbConnect = async (force = false) => {
  await sequelize.sync({ force })
    .then(() => {
      console.log(chalk.blue('Success: DB Connected'));
    })
    .catch((err) => {
      console.error(err);
    });
};

const dbClose = async () => {
  await sequelize.close();
};

module.exports = {
  dbConnectForTest,
  dbConnect,
  dbClose,
};
