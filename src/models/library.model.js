const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
// const Movie = require("./movie.model");
// const User = require("./user.model");

const Library = sequelize.define(
    'Library',
    {
        movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_library'
    }
);

// Library.belongsTo(Movie, {
//     foreignKey: {
//         name: 'movie_id'
//     },
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT'
// });

// Library.belongsTo(User, {
//     foreignKey: {
//         name: 'user_id'
//     },
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT'
// });

module.exports = Library;