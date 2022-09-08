const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");
// const {verifyToken} = require('../middlewares');

router.get("/", MovieController.getAll);
router.post("/", MovieController.createOne);
// router.put("/:id", MovieController.updateOne);
// router.delete("/:id", MovieController.deleteSoft);
// router.put("/activate/:id", MovieController.activateOne);
// router.post("/add-genre", MovieController.addGenre);
// router.delete("/delete-genre", MovieController.deleteGenre);
router.get("/:id", MovieController.getInformation);

module.exports = router;
