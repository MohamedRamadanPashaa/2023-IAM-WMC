const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/user");

router.route("/login-admin").post(loginAdmin);

module.exports = router;
