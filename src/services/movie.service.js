const { Op } = require("sequelize")
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
const { getDataIMDB } = require("../utils/")
const slug = require("slug");

const MovieService = {};

MovieService.updateAll = async () => {
    try {
        let movies = await MovieModel.findAll({});
        movies = JSON.parse(JSON.stringify(movies));
        for (const movie of movies) {
            try {
                if (movie.rating == null) {
                    const imdb = movie.imdb;
                    const rs = await getDataIMDB(imdb);
                    const rating = rs.rating.star;
                    console.log({ rating });
                    await MovieModel.update({ rating }, { where: { id: movie.id } });
                }
            } catch (error) {
                console.log({ id: movie.id });
            }
        }
        return { status: "success" };
    } catch (error) {
        throw error;
    }
}

MovieService.getAll = async () => {
    try {
        const movies = await MovieModel.findAll({
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
        if (data.imdb) movie = { ...movie, ...{ imdb: data.imdb } };
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
        if (data.imdb) movie = { ...movie, ...{ imdb: data.imdb } };
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
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked', 'rating', 'imdb'],
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
        updateRating(movie);
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

            }
        );
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

MovieService.search = async (key, l, page) => {
    try {
        let limit = 20;
        if (l) limit = parseInt(l);
        const skip = (page - 1) * limit;
        const movies = await MovieModel.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${key}%`
                        }
                    },
                    {
                        aka: {
                            [Op.like]: `%${key}%`
                        }
                    }
                ]
            },
            limit,
            offset: skip,
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
        });
        const count = await MovieModel.count({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${key}%`
                        }
                    },
                    {
                        aka: {
                            [Op.like]: `%${key}%`
                        }
                    }
                ]
            },
        });
        return { status: "success", data: { movies, count } };
    } catch (error) {
        throw error;
    }
};

MovieService.getNew = async (l) => {
    try {
        let limit = 20;
        if (l) limit = parseInt(l);
        const movies = await MovieModel.findAll({
            order: [
                ['new', 'DESC'],
            ],
            limit,
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked', 'rating', 'new'],
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

MovieService.getFilter = async ({ genre, year, country, type, limit, page }) => {
    try {
        let filter = {};
        let l = 20;
        let p = 1;
        if (page >= 1) p = page;
        if (limit) l = parseInt(limit);
        if (year) filter = { ...filter, ...{ year_id: parseInt(year) } };
        if (country) filter = { ...filter, ...{ country_id: parseInt(country) } };
        if (type) filter = { ...filter, ...{ type_id: parseInt(type) } };
        const skip = (p - 1) * l;
        const movies = await MovieModel.findAll({
            where: filter,
            limit: l,
            offset: skip,
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked', 'rating', 'new', 'year_id', 'type_id', 'country_id'],
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
        const count = await MovieModel.count({ where: filter, });
        return { status: "success", data: { movies, count } };
    } catch (error) {
        throw error;
    }
};

MovieService.getTopView = async () => {
    try {
        const movies = await MovieModel.findAll({
            order: [
                ['viewed', 'DESC'],
            ],
            limit: 10,
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
        });
        return { status: "success", data: movies };
    } catch (error) {
        throw error;
    }
};

MovieService.getTopLike = async () => {
    try {
        const movies = await MovieModel.findAll({
            order: [
                ['liked', 'DESC'],
            ],
            limit: 10,
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
        });
        return { status: "success", data: movies };
    } catch (error) {
        throw error;
    }
};

MovieService.getTopSearch = async () => {
    try {
        const movies = await MovieModel.findAll({
            order: [
                ['searched', 'DESC'],
            ],
            limit: 10,
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked', 'searched', 'rating'],
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


async function updateRating(movie) {
    const m = JSON.parse(JSON.stringify(movie));
    const imdb = m.imdb;
    const rs = await getDataIMDB(imdb);
    const rating = rs.rating.star;
    await MovieModel.update({ rating }, { where: { id: m.id } });
}

module.exports = MovieService;
