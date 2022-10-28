const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genre.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", GenreController.getAll);
router.post("/", GenreController.createOne);
router.put("/:id", GenreController.updateOne);
router.delete("/:id", GenreController.deleteOne);
// router.get("/movie-genre/:id", GenreController.getAMOG);
// router.get("/genre-movie/:id", GenreController.getAGOM);
// router.post("/genre-movie/", GenreController.addGenreMovie);
// router.delete("/genre-movie/:id", GenreController.removeGenreMovie);
router.get("/:id", GenreController.getInformation);

module.exports = router;
