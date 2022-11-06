const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/type.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", TypeController.getAll);
router.post("/", verifyTokenManager(2), TypeController.createOne);
router.put("/:id", verifyTokenManager(2), TypeController.updateOne);
router.delete("/:id", verifyTokenManager(1), TypeController.deleteOne);
router.get("/:id", TypeController.getInformation);

module.exports = router;
