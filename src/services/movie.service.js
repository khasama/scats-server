const MovieModel = require("../models/movie.model");
const CountryModel = require("../models/country.model");
const YearModel = require("../models/year.model");
const StatusModel = require("../models/status.model");
const TypeModel = require("../models/type.model");
const GenreModel = require("../models/genre.model");
const EpisodeModel = require("../models/episode.model");
const GenreMovie = require("../models/genre.movie.model");
const LinkModel = require("../models/link.model");
const ServerModel = require("../models/server.model");
const drive = require("../utils/drive");
const image = require("../utils/image");
const slug = require("slug");

const MovieService = {};

MovieService.getAll = async () => {
    try {
        const movies = await MovieModel.findAll({
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked'],
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
        });
        return { status: "success", data: movies };
    } catch (error) {
        throw error;
    }
};

MovieService.createOne = async (data) => {
    try {
        let movie = {
            name: data.name,
            slug: slug(data.name),
            aka: data.aka,
            content: data.content,
            year_id: data.year,
            type_id: data.type,
            country_id: data.country
        }
        if (data.thumb) {
            const thumb = data.thumb;
            const thumbBuffer = await image.resize(thumb.data, "thumb");
            const thumbID = await drive.uploadFile({ name: `${slug(data.name)}.webp`, buffer: thumbBuffer, type: "webp" }, true);
            movie = { ...movie, ...{ thumb: `https://drive.google.com/uc?id=${thumbID}` } };
        }
        if (data.background) {
            const background = data.background;
            const backgroundBuffer = await image.resize(background.data, "background");
            const backgroundID = await drive.uploadFile({ name: `${slug(data.name)}-bg.webp`, buffer: backgroundBuffer, type: "webp" }, true);
            movie = { ...movie, ...{ background: `https://drive.google.com/uc?id=${backgroundID}` } };
        }
        const newMovie = await MovieModel.create(movie);
        return { status: "success", data: newMovie };
    } catch (error) {
        throw error;
    }
};

MovieService.updateOne = async (data) => {
    try {
        let movie = {
            name: data.name,
            slug: slug(data.name),
            aka: data.aka,
            content: data.content,
            viewed: data.viewed,
            liked: data.liked,
            year_id: data.year,
            type_id: data.type,
            country_id: data.country,
            status_id: data.status,
        }
        const m = await MovieModel.findOne({ where: { id: data.id } });
        if (data.thumb) {
            if (m.thumb) drive.deleteFile(m.thumb.split("=")[1]);
            const thumb = data.thumb;
            const thumbBuffer = await image.resize(thumb.data, "thumb");
            const thumbID = await drive.uploadFile({ name: `${slug(data.name)}.webp`, buffer: thumbBuffer, type: "webp" }, true);
            movie = { ...movie, ...{ thumb: `https://drive.google.com/uc?id=${thumbID}` } };
        }
        if (data.background) {
            if (m.background) drive.deleteFile(m.background.split("=")[1]);
            const background = data.background;
            const backgroundBuffer = await image.resize(background.data, "background");
            const backgroundID = await drive.uploadFile({ name: `${slug(data.name)}-bg.webp`, buffer: backgroundBuffer, type: "webp" }, true);
            movie = { ...movie, ...{ background: `https://drive.google.com/uc?id=${backgroundID}` } };
        }
        await MovieModel.update(
            movie,
            {
                where: {
                    id: data.id
                }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MovieService.delete = async (id) => {
    try {
        await MovieModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MovieService.getInformation = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked'],
            where: {
                id
            },
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
                {
                    model: EpisodeModel,
                    attributes: ['id', 'episode', 'hls'],
                    include: [{
                        model: LinkModel,
                        attributes: ['id', 'link'],
                        include: [{
                            model: ServerModel,
                            attributes: ['id', 'name']
                        }]
                    }]
                },
            ]
        });
        return { status: "success", data: movie };
    } catch (error) {
        throw error;
    }
};

MovieService.addGenre = async (id, idGenre) => {
    try {
        const hasGenre = await GenreMovie.findOne(
            {
                where: {
                    MovieId: id,
                    GenreId: idGenre
                }
            }
        );
        if (hasGenre) return { status: "failed", message: "Genre already exists" };
        await GenreMovie.create({
            MovieId: id,
            GenreId: idGenre
        });
        const genres = await GenreMovie.findAll(
            {
                where: {
                    MovieId: id
                },
                include: [
                    {
                        model: GenreModel,
                        attributes: ['id', 'name']
                    }
                ]
            }
        );
        return { status: "success", data: genres };
    } catch (error) {
        throw error;
    }
};

MovieService.deleteGenre = async (id, idGenre) => {
    try {
        await GenreMovie.destroy(
            {
                where: {
                    MovieId: id,
                    GenreId: idGenre
                }
            }
        );
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MovieService.getBanner = async () => {
    try {
        const banners = await MovieModel.findAll(
            {
                where: {
                    slide: true
                },
                limit: 6,
                attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked'],
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

            });
        return { status: "success", data: banners };
    } catch (error) {
        throw error;
    }
};

MovieService.addBanner = async (id) => {
    try {
        const isBanner = await MovieModel.findOne(
            {
                where: {
                    id,
                    slide: true
                }
            });
        if (isBanner) return { status: "failed", message: "Movie already exists" };
        await MovieModel.update(
            {
                slide: true
            },
            {
                where: { id }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};
MovieService.deleteBanner = async (id) => {
    try {
        await MovieModel.update(
            {
                slide: false
            },
            {
                where: { id }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = MovieService;
