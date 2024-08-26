if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
console.log(process.env.CLOUD_NAME);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");

const listings = require("./routs/listing.js");
const reviews = require("./routs/review.js");
const user = require("./routs/user.js");
const Listing = require("./models/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

let atlas_url = process.env.ATLAS_URL;
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("coulden't connet");
  });

async function main() {
  mongoose.connect(atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const store = MongoStore.create({
  mongoUrl: atlas_url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, //for lazy update
});

app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); //flash.ejs
  res.locals.error = req.flash("error"); //flash.ejs
  res.locals.currUser = req.user; //navbar
  next();
});

app.use("/listings", listings);
app.use("/listings", reviews);
app.use("/", user);

// app.get("/demouser", async (req, res) => {
//   const fakeUser = new User({
//     email: "student@gamil.com",
//     username: "student",
//   });

//   let newuser = await User.register(fakeUser, "helloworld");
//   res.send(newuser);
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
