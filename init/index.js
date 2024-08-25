const mongoose = require("mongoose");
const Listing = require("../models/listing");
const userData = require("../init/data");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("coulden't connet");
  });

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function insert() {
  await Listing.deleteMany({});
  userData.data = userData.data.map((obj) => ({
    ...obj,
    owner: "66c1d6cf7be21227ee346973",
  }));
  await Listing.insertMany(userData.data);
}

insert();
