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
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            dateStrings: true,
            typeCast: function (field, next) { // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                    // return field.string()
                }
                return next()
            },
        },
        timezone: '+07:00',
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
sequelize.sync({ alter: true });

module.exports = sequelize;