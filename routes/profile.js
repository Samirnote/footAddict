const express = require("express");
const router = express.Router();
const protectRoute = require("../middlewares/protectRoute");

/* GET home page. */
router.get("/profile", protectRoute, function (req, res, next) {
  res.render("profile");
});

module.exports = router;
