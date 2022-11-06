const express = require("express");
const router = express.Router();
const CountryController = require("../controllers/country.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", CountryController.getAll);
router.post("/", verifyTokenManager(2), CountryController.createOne);
router.put("/:id", verifyTokenManager(2), CountryController.updateOne);
router.delete("/:id", verifyTokenManager(1), CountryController.deleteOne);
router.get("/:id", CountryController.getInformation);

module.exports = router;
