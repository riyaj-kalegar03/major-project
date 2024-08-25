const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//store review in dbs

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  list.Review.push(newReview);
  await newReview.save();
  await list.save();
  req.flash("success", "Review is created successfully!");
  res.redirect(`/listings/${id}`);
};

//review delete

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { Review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};
