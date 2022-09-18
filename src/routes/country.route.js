const express = require("express");
const router = express.Router();
const CountryController = require("../controllers/country.controller");
const { verifyToken } = require('../middlewares');

router.get("/", CountryController.getAll);
router.post("/", verifyToken(2), CountryController.createOne);
router.put("/:id", verifyToken(2), CountryController.updateOne);
router.delete("/:id", verifyToken(1), CountryController.deleteOne);
router.get("/:id", CountryController.getInformation);

module.exports = router;
