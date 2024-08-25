const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedin, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// const { listingSchema, reviewSchema } = require("./schema.js");

// let validateListingSchema = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errors = error.details.map((el) => el.message);
//     throw new ExpressError(400, errors);
//   } else {
//     next();
//   }
// };

router
  .route("/") // all listing rout
  .get(listingController.index)
  //add new list to database
  .post(
    upload.single("listing[image]"),
    wrapAsync(listingController.newListToDb)
  );
// .post(upload.single("listing[image]"), (req, res) => {
//   res.send(req.file);
// });

//create new list
router.get("/filter", listingController.searchList);

router.get("/new", isLoggedin, listingController.createList);

//edit rout
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner, //user is owner for access this button -middleware.js
  wrapAsync(listingController.editList)
);

router
  .route("/:id")
  .get(
    //detailed list (show)

    wrapAsync(listingController.showList)
  )
  .put(
    //update edited rout
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateEditList)
  )
  .delete(
    //delete rout
    isLoggedin,
    //user logedin or not -middleware.js
    isOwner,

    wrapAsync(listingController.destroyList)
  );

module.exports = router;
