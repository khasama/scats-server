const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/type.controller");
const { verifyToken } = require('../middlewares');

router.get("/", TypeController.getAll);
router.post("/", verifyToken(2), TypeController.createOne);
router.put("/:id", verifyToken(2), TypeController.updateOne);
router.delete("/:id", verifyToken(1), TypeController.deleteOne);
router.get("/:id", TypeController.getInformation);

module.exports = router;
