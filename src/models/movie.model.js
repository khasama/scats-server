const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Country = require("./country.model");
const Status = require("./status.model");
const Year = require("./year.model");
const Type = require("./type.model");
const Genre = require("./genre.model");
const Episode = require("./episode.model");
const Link = require("./link.model");
const Server = require("./server.model");
const GenreMovie = require("./genre.movie.model");
const User = require("./user.model");
const Comment = require("./comment.model");
const Reply = require("./comment.reply.model");

const Movie = sequelize.define(
    'Movie',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        aka: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(5000),
            allowNull: false
        },
        thumb: {
            type: Sequelize.STRING,
        },
        background: {
            type: Sequelize.STRING,
        },
        viewed: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        liked: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        searched: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        year_id: {
            type: Sequelize.INTEGER,
        },
        status_id: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        type_id: {
            type: Sequelize.INTEGER,
        },
        country_id: {
            type: Sequelize.INTEGER,
        },
        new: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        slide: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        imdb: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.DOUBLE,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_movie'
    }
);
Movie.belongsTo(Country, {
    foreignKey: {
        name: 'country_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Year, {
    foreignKey: {
        name: 'year_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Status, {
    foreignKey: {
        name: 'status_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Type, {
    foreignKey: {
        name: 'type_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Episode.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.hasMany(Episode, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.hasMany(Comment, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsToMany(Genre, { through: GenreMovie });
Genre.belongsToMany(Movie, { through: GenreMovie });
Movie.hasMany(GenreMovie);
GenreMovie.belongsTo(Movie, {
    foreignKey: {
        name: 'MovieId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Genre.hasMany(GenreMovie);
GenreMovie.belongsTo(Genre, {
    foreignKey: {
        name: 'GenreId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Episode.hasMany(Link, {
    foreignKey: {
        name: 'episode_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Link.belongsTo(Episode, {
    foreignKey: {
        name: 'episode_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Link.belongsTo(Server, {
    foreignKey: {
        name: 'server_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Comment.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Comment.belongsTo(User, {
    foreignKey: {
        name: 'user_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Comment.hasMany(Reply, {
    foreignKey: {
        name: 'comment_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Reply.belongsTo(Comment, {
    foreignKey: {
        name: 'comment_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Reply.belongsTo(User, {
    foreignKey: {
        name: 'user_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});


module.exports = Movie;