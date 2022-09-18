const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");
const { verifyToken } = require('../middlewares');

router.get("/", MovieController.getAll);
router.post("/", verifyToken(2), MovieController.createOne);
router.put("/:id", verifyToken(2), MovieController.updateOne);
// router.delete("/:id", MovieController.deleteSoft);
// router.put("/activate/:id", MovieController.activateOne);
router.get("/:id", MovieController.getInformation);

module.exports = router;
