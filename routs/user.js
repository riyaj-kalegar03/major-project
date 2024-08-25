const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Register Form
router
  .route("/signup")
  .get(userController.creatSignup)

  //storing user in db
  .post(wrapAsync(userController.storeSignup));

//login
router
  .route("/login")
  .get(userController.login)

  .post(
    saveRedirectUrl, //for redirect to absolute path where it asked for login (/new or /edit) - middleware.js
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.storeLogin
  );

router.get("/logout", userController.logout);

module.exports = router;
