const express = require("express");
const router = express.Router();
const User = require("../modals/User");

// login user form
router.get("/login", (req, res) => {
  res.render("user/login");
});

// login post request
router.post("/login", (req, res) => {
  res.json("login user ....");
});

// signup form
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

// sign up post request
router.post("/signup", (req, res) => {
  res.json("signup user ....");
});

// profile
router.get("/profile", (req, res) => {
  res.render("user/profile");
});

// logout
router.get("/logout", (req, res) => {
  res.json("user logged out");
});

module.exports = router;
