const Joi = require("joi");
const Listing = require("./models/listing");

module.exports = listingSchema = Joi.object({
  Listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

module.exports = reviewSchema = Joi.object({
  Review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
