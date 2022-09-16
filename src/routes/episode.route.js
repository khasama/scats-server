const express = require("express");
const router = express.Router();
const EpisodeController = require("../controllers/episode.controller");
// const {verifyToken} = require('../middlewares');

router.get("/all-episode/:idMovie-:idServer", EpisodeController.getAllEpisode);
router.get("/full-link/:idMovie-:episode", EpisodeController.getFullLink);
router.post("/", EpisodeController.addEP);
router.put("/:id", EpisodeController.updateOne);
router.delete("/:id", EpisodeController.deleteEp);
router.get("/:id", EpisodeController.getLink);
// router.post('/add-multi', EpisodeController.addMultiEP);

module.exports = router;
