const express = require("express");
const router = express.Router();
const YearController = require("../controllers/year.controller");
const { verifyToken } = require('../middlewares');

router.get("/", YearController.getAll);
router.post("/", verifyToken(2), YearController.createOne);
router.put("/:id", verifyToken(2), YearController.updateOne);
router.delete("/:id", verifyToken(1), YearController.deleteOne);
router.get("/:id", YearController.getInformation);

module.exports = router;
