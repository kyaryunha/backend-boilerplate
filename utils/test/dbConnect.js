const chalk = require('chalk');
const { sequelize } = require("../../models");

const dbConnect = async (force=false) => {
    await sequelize.sync({ force })
        .then(() => {
            console.log(chalk.blue("Success: DB Connected"));
        })
        .catch((err) => {
            console.error(err);
        });
}

const dbClose = async () => {
    await sequelize.close()
}

module.exports = {
    dbConnect,
    dbClose,
}
