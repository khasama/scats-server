const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");
const { verifyTokenManager } = require('../middlewares');


router.get("/", MovieController.getAll);
router.get("/banner", MovieController.getBanner);
router.post("/", verifyTokenManager(2), MovieController.createOne);
router.put("/:id", verifyTokenManager(2), MovieController.updateOne);
router.post("/add-genre", verifyTokenManager(2), MovieController.addGenre);
router.post("/add-banner", verifyTokenManager(2), MovieController.addBanner);
router.delete("/delete-banner/:id", verifyTokenManager(2), MovieController.deleteBanner);
router.delete("/delete-genre/:idMovie-:idGenre", verifyTokenManager(2), MovieController.deleteGenre);
// router.delete("/:id", MovieController.deleteSoft);
// router.put("/activate/:id", MovieController.activateOne);
router.get("/test", MovieController.test);
router.get("/search", MovieController.search);
router.get("/search-live", MovieController.searchLive);
router.get("/new", MovieController.getNew);
router.get("/anime-new", MovieController.getAnimeNew);
router.get("/filter", MovieController.getFilter);
router.get("/top/view", MovieController.getTopView);
router.get("/top/like", MovieController.getTopLike);
router.get("/top/search", MovieController.getTopSearch);
router.get("/update-all", MovieController.updateAll);
router.get("/:id", MovieController.getInformation);

module.exports = router;
