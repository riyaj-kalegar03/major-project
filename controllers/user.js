const User = require("../models/user.js");

// Register Form
module.exports.creatSignup = (req, res) => {
  res.render("users/signup.ejs");
};

//storing user in db

module.exports.storeSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.logIn(registeredUser, (err) => {
      // using for immediate login  after signup
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//login
module.exports.login = (req, res) => {
  res.render("users/login.ejs");
};

//store login

module.exports.storeLogin = async (req, res) => {
  req.flash("success", "welcome back!");
  let url = res.locals.redirectUrl || "/listings"; //saveRedirectUrl
  res.redirect(url);
};

//logout
module.exports.logout = (req, res) => {
  req.logOut((err) => {
    //used to logout the current user
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
