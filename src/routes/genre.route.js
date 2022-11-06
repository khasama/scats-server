const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genre.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", GenreController.getAll);
router.post("/", verifyTokenManager(2), GenreController.createOne);
router.put("/:id", verifyTokenManager(2), GenreController.updateOne);
router.delete("/:id", verifyTokenManager(1), GenreController.deleteOne);
router.get("/genre-movie/:id", GenreController.getGenresOfMovie);
router.get("/:id", GenreController.getInformation);

module.exports = router;
