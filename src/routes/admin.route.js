const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");

router.get("/", AdminController.home);
router.get("/movies", AdminController.getAllMovie);
router.get("/genres", AdminController.getAllGenre);
router.get("/years", AdminController.getAllYear);
router.get("/countries", AdminController.getAllCountry);
router.get("/servers", AdminController.getAllServer);
router.get("/types", AdminController.getAllType);

module.exports = router;
