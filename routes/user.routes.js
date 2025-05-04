const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// auth middleware all routing
router.use(authMiddleware);

router.post("/", user.createUser);
router.get("/", user.getUsers);
router.get("/:id", user.getUserById);
router.put("/:id", user.updateUser);
router.delete("/:id", user.deleteUser);

module.exports = router;
