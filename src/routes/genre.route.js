const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genre.controller");
// const {verifyToken} = require('../middlewares');

router.get("/", GenreController.getAll);
router.post("/", GenreController.createOne);
router.put("/:id", GenreController.updateOne);
router.delete("/:id", GenreController.deleteOne);
router.get("/movie-genre/:id", GenreController.getAMOG);
router.get("/:id", GenreController.getInformation);

module.exports = router;
