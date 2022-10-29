require("dotenv").config();
const Sequelize = require("sequelize");
const HOST = process.env.MYSQL_HOST || "localhost";
const USER = process.env.MYSQL_USER || "root";
const PASS = process.env.MYSQL_PASS || "";
const DATABASE = process.env.MYSQL_DB || "scats2";
const sequelize = new Sequelize(
    DATABASE,
    USER,
    PASS,
    {
        host: HOST,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
sequelize.sync({ alter: true });

module.exports = sequelize;