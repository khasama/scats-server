const LibraryModel = require("../models/library.model");
const MovieModel = require("../models/movie.model");
const UserModel = require("../models/user.model");
const CountryModel = require("../models/country.model");
const YearModel = require("../models/year.model");
const StatusModel = require("../models/status.model");
const TypeModel = require("../models/type.model");
const GenreModel = require("../models/genre.model");

const LibraryService = {};

LibraryService.getLibrary = async (idUser) => {
    try {
        const movies = await UserModel.findOne({
            where: {
                id: idUser
            },
            attributes: ['id'],
            include: [
                {
                    model: LibraryModel,
                    attributes: ['id', 'user_id', 'movie_id', 'created_at'],
                    include: [
                        {
                            model: MovieModel,
                            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked', 'rating'],
                            include: [
                                {
                                    model: GenreModel,
                                    attributes: ['id', 'name', 'slug']
                                },
                                {
                                    model: CountryModel,
                                    attributes: ['id', 'name', 'slug']
                                },
                                {
                                    model: TypeModel,
                                    attributes: ['id', 'name', 'slug']
                                },
                                {
                                    model: StatusModel,
                                    attributes: ['id', 'name', 'slug']
                                },
                                {
                                    model: YearModel,
                                    attributes: ['id', 'name', 'slug']
                                },
                            ]
                        },
                    ]
                },
            ]
        });
        return { status: "success", data: movies };
    } catch (error) {
        throw error;
    }
};

LibraryService.addLibrary = async ({ idUser, idMovie }) => {
    try {
        await LibraryModel.create({
            user_id: idUser,
            movie_id: idMovie
        });
        const movie = await LibraryModel.findOne({
            where: { movie_id: idMovie, user_id: idUser }
        });
        return { status: "success", data: movie };
    } catch (error) {
        throw error;
    }
};

LibraryService.deleteLibrary = async (id) => {
    try {
        await LibraryModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = LibraryService;
