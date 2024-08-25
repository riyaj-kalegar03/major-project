const Listing = require("./models/listing");

const Review = require("./models/review.js");

function isLoggedin(req, res, next) {
  //chect if user loged in or not
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "you must be logged in!");
    return res.redirect("/login");
  }
  next();
}

function saveRedirectUrl(req, res, next) {
  //for redirect to the page after log in
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

async function isOwner(req, res, next) {
  //check if user is owner of the listing or not
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (res.locals.currUser && !list.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not authorized to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

async function isReviewAuthor(req, res, next) {
  //check if user is owner of the listing or not
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not author to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports = { isLoggedin, saveRedirectUrl, isOwner, isReviewAuthor };
