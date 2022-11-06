const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", MovieController.getAll);
router.post("/", verifyTokenManager(2), MovieController.createOne);
router.put("/:id", verifyTokenManager(2), MovieController.updateOne);
router.post("/add-genre", verifyTokenManager(2), MovieController.addGenre);
router.delete("/delete-genre/:idMovie-:idGenre", verifyTokenManager(2), MovieController.deleteGenre);
// router.delete("/:id", MovieController.deleteSoft);
// router.put("/activate/:id", MovieController.activateOne);
router.get("/:id", MovieController.getInformation);

module.exports = router;
