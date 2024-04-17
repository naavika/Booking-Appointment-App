const { Sequelize } = require('sequelize');
const colors = require('colors');

const connectDB = async () => {
    try {
        const sequelize = new Sequelize(process.env.MYSQL_URL, {
            dialect: 'mysql' // Specify the MySQL dialect explicitly
        });
        await sequelize.authenticate();
        console.log(`MySQL database connected to host: ${sequelize.options.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MySQL database connection error: ${error}`.bgRed.white);
    }
};

module.exports = connectDB;

