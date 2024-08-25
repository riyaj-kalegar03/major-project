const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedin, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// const { listingSchema, reviewSchema } = require("./schema.js");
// let validateReviewSchema = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errors = error.details.map((el) => el.message);
//     throw new ExpressError(400, errors);
//   } else {
//     next();
//   }
// };

router.post(
  "/:id/review",
  isLoggedin,
  wrapAsync(reviewController.createReview)
);

//review delete
router.delete(
  "/:id/reviews/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
