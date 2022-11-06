const express = require("express");
const router = express.Router();
const movieRoute = require("./movie.route");
const genreRoute = require("./genre.route");
const yearRoute = require("./year.route");
const serverRoute = require("./server.route");
const countryRoute = require("./country.route");
const typeRoute = require("./type.route");
const statusRoute = require("./status.route");
const episodeRoute = require("./episode.route");
const userRoute = require("./user.route");
const roleRoute = require("./role.route");
const linkRoute = require("./link.route");

router.use("/movie", movieRoute);
router.use("/genre", genreRoute);
router.use("/year", yearRoute);
router.use("/server", serverRoute);
router.use("/country", countryRoute);
router.use("/type", typeRoute);
router.use("/status", statusRoute);
router.use("/episode", episodeRoute);
router.use("/user", userRoute);
router.use("/role", roleRoute);
router.use("/link", linkRoute);

module.exports = router;
