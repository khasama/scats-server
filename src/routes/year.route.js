const express = require("express");
const router = express.Router();
const YearController = require("../controllers/year.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", YearController.getAll);
router.post("/", verifyTokenManager(2), YearController.createOne);
router.put("/:id", verifyTokenManager(2), YearController.updateOne);
router.delete("/:id", verifyTokenManager(1), YearController.deleteOne);
router.get("/:id", YearController.getInformation);

module.exports = router;
