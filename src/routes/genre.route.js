const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genre.controller");
const { verifyToken } = require('../middlewares');

router.get("/", GenreController.getAll);
router.post("/", verifyToken(2), GenreController.createOne);
router.put("/:id", verifyToken(2), GenreController.updateOne);
router.delete("/:id", verifyToken(1), GenreController.deleteOne);
router.get("/movie-genre/:id", GenreController.getAMOG);
router.get("/genre-movie/:id", GenreController.getAGOM);
router.post("/genre-movie/", verifyToken(2), GenreController.addGenreMovie);
router.delete("/genre-movie/:id", verifyToken(2), GenreController.removeGenreMovie);
router.get("/:id", GenreController.getInformation);

module.exports = router;
