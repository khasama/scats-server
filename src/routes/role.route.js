const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", RoleController.getAll);
router.post("/", verifyTokenManager(1), RoleController.createOne);
router.put("/:id", verifyTokenManager(1), RoleController.updateOne);
router.delete("/:id", verifyTokenManager(1), RoleController.deleteOne);
router.get("/:id", RoleController.getInformation);

module.exports = router;
