function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let allList = await Listing.find();
  res.render("./listings/listing.ejs", { allList });
};

//create new list
module.exports.createList = (req, res) => {
  res.render("./listings/new.ejs");
};

//add new list to database

module.exports.newListToDb = async (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "please provide valid data for listing");
  }
  let country = capitalizeFirstLetter(req.body.listing.country); //capitalize first letter of country name
  let owner = req.user._id;
  let newlist = new Listing({
    ...req.body.listing,
    owner: owner,
    country: country,
  });
  let url = req.file.path;
  let filename = req.file.filename;
  newlist.image = { url, filename };

  await newlist.save();
  req.flash("success", "New list created successfully!");
  res.redirect("/listings");
};

//detailed list (show)
module.exports.showList = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id)
    .populate({ path: "Review", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "List your requesting for does not exist!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { list });
};

//edit rout
module.exports.editList = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "List your requesting for does not exist!");
    res.redirect("/listings");
  }
  let originalUrl = list.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/w_250"); //changing quality of image and showing in edit page for original image

  res.render("./listings/edit.ejs", { list, originalUrl });
};

//update edited rout
module.exports.updateEditList = async (req, res) => {
  let { id } = req.params;
  let country = capitalizeFirstLetter(req.body.listing.country); //capitalize first letter of country name
  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
    country: country,
  });

  if (typeof req.file !== "undefined") {
    //updating image if only image changed otherwise the image feild become empty only if req.file empty
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Updated successfully!");
  res.redirect(`/listings/${id}`);
};

//delete rout
module.exports.destroyList = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "List is deleted successfully!");
  res.redirect("/listings");
};

//search
module.exports.searchList = async (req, res) => {
  let { search } = req.query;
  let searchCountry = capitalizeFirstLetter(search);
  let allList = await Listing.find({ country: searchCountry });
  if (!allList.length) {
    req.flash("error", "No listing found for this country ");
    return res.redirect("/listings");
  }
  res.render("./listings/listing.ejs", { allList });
};
