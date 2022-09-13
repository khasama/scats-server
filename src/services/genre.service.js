const GenreModel = require("../models/genre.model");

const GenreService = {};

GenreService.getAll = async () => {
    try {
        const [rows] = await GenreModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

GenreService.getInformation = async (id) => {
    try {
        const [rows] = await GenreModel.getInformation(id);
        if (rows.length > 0) return { status: "success", data: rows[0] };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

GenreService.createOne = async (data) => {
    try {
        const [rows] = await GenreModel.createOne(
            new GenreModel({ genre: data.genre })
        );
        if (rows.insertId != 0) {
            const [genre] = await GenreModel.getInformation(rows.insertId);
            return { status: "success", data: genre };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

GenreService.deleteOne = async (id) => {
    try {
        const [movies] = await GenreModel.getAMOG(id);
        if (movies.length == 0) {
            const [rows] = await GenreModel.deleteOne(id);
            if (rows.affectedRows != 0) {
                return { status: "success" };
            }
        }
        return { status: "failed", message: "Genre is being used" };
    } catch (error) {
        throw error;
    }
};

// All movies of genre
GenreService.getAMOG = async (id) => {
    try {
        const [movies] = await GenreModel.getAMOG(id);
        if (rows.length > 0) return { status: "success", data: movies };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

// All genres of movie
GenreService.getAGOM = async (idMovie) => {
    try {
        const [genres] = await GenreModel.getAGOM(idMovie);
        return { status: "success", data: genres };
    } catch (error) {
        throw error;
    }
};

// add genre of movie
GenreService.addGenreMovie = async (idGenre, idMovie) => {
    try {
        const [rows] = await GenreModel.getGenreMovie(idGenre, idMovie);
        if (rows.length === 0) {
            const [add] = await GenreModel.addGenreMovie(idGenre, idMovie);
            if (add.insertId !== 0) {
                const [genres] = await GenreModel.getAGOM(idMovie);
                return { status: "success", data: genres };
            }
        } else {
            return { status: "failed", message: "Đã có" };
        }
    } catch (error) {
        throw error;
    }
};

GenreService.removeGenreMovie = async (idGenreMovie) => {
    try {
        const [rows] = await GenreModel.removeGenreMovie(idGenreMovie);
        if (rows.affectedRows === 1) {
            return { status: "success" };
        } else {
            return { status: "failed", message: "Đã có lỗi xảy ra" };
        }
    } catch (error) {
        throw error;
    }
};

GenreService.updateOne = async (data) => {
    try {
        const [rows] = await GenreModel.updateOne(data);
        if (rows.affectedRows > 0) {
            const [genre] = await GenreModel.getInformation(data.id);
            return { status: "success", data: genre[0] };
        }
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

module.exports = GenreService;
