const express = require("express");
const router = express.Router();
const EpisodeController = require("../controllers/episode.controller");
// const {verifyToken} = require('../middlewares');

router.get("/all-episode/:idAnime-:idServer", EpisodeController.getAllEpisode);
router.get("/link/:id", EpisodeController.getLink);
router.get("/full-link/:idAnime-:episode", EpisodeController.getFullLink);
router.post("/", EpisodeController.addEP);
router.put("/:id", EpisodeController.updateOne);
router.delete("/:id", EpisodeController.deleteEp);
// router.post('/add-multi', EpisodeController.addMultiEP);

module.exports = router;
