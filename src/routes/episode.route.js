const express = require("express");
const router = express.Router();
const EpisodeController = require("../controllers/episode.controller");
const { verifyTokenManager } = require('../middlewares');

// router.get("/", EpisodeController.getAll);
router.post("/", EpisodeController.createOne);
router.post("/add-multi", verifyTokenManager(2), EpisodeController.addMultiEpisode);
router.put("/:id", verifyTokenManager(2), EpisodeController.updateOne);
router.delete("/:id", verifyTokenManager(1), EpisodeController.deleteOne);
router.get("/:id", EpisodeController.getInformation);

module.exports = router;
