const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");
// const {verifyToken} = require('../middlewares');

router.get("/", MovieController.getAll);
// router.post("/", MovieController.createOne);
// router.post("/add-genre", MovieController.addGenre);
// router.delete("/delete-genre", MovieController.deleteGenre);
// router.put("/update/:id", MovieController.updateOne);
// router.put("/activate/:id", MovieController.activateOne);
// router.delete("/delete/:id", MovieController.deleteSoft);
// router.get("/:id", MovieController.getInformation);

module.exports = router;
