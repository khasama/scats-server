const express = require("express");
const router = express.Router();
const EpisodeController = require("../controllers/episode.controller");
const { verifyToken } = require('../middlewares');

router.get("/all-episode/:idMovie-:idServer", EpisodeController.getAllEpisode);
router.get("/full-link/:idMovie-:episode", EpisodeController.getFullLink);
router.post("/", verifyToken(2), EpisodeController.addEP);
router.put("/:id", verifyToken(2), EpisodeController.updateOne);
router.delete("/:id", verifyToken(1), EpisodeController.deleteEp);
router.get("/:id", EpisodeController.getLink);
// router.post('/add-multi', EpisodeController.addMultiEP);

module.exports = router;
