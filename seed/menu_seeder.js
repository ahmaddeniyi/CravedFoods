const express = require("express");
const app = express();
const passport = require("passport");
var Menu = require("../models/menu");
var User = require("../models/user");

var mongoose = require("mongoose");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/craved_meals");

var menus = [
  new Menu({
    imagePath:
      "https://media.istockphoto.com/photos/korean-hot-pot-meal-hands-taking-food-with-chopsticks-picture-id697932394?k=6&m=697932394&s=612x612&w=0&h=s3xFWh14Kqz6Dkx-flXQBG6tIyQIa5L4GswgVKh_PPM=",
    title: "Hot Pot",
    description: "This steamed dish brings out the aroma of everything it has!",
    price: 240,
    category: "Superb Cuisine",
  }),
  new Menu({
    imagePath:
      "https://shewearsmanyhats.com/wp-content/uploads/2015/10/garlic-shrimp-recipe-1b-480x270.jpg",
    title: "Shrimp with Vermicelli Garlic",
    description:
      "is a dish not only favored by foreigners but also the Chinese younger generation!",
    price: 210,
    category: "BestSeller",
  }),
  new Menu({
    imagePath:
      "https://static8.depositphotos.com/1029554/813/i/600/depositphotos_8136904-stock-photo-fried-pot-stickers-dumplings-traditional.jpg",
    title: "Dumplings",
    description:
      "With a long history, dumplings are a traditional food widely popular!",
    price: 120,
    category: "Local Meal",
  }),
  new Menu({
    imagePath: "https://i.ytimg.com/vi/6lTV0CoclK4/maxresdefault.jpg",
    title: "Fried Rice",
    description:
      "Fried rice is a very simple yet delicious recipe. This version relies on a ton of fresh vegetables!",
    price: 120,
    category: "International Cuisine",
  }),
];

// Remove all Menus
Menu.remove({}, (req, res, err) => {
  if (err) {
    console.log(err);
  }
  console.log("removed menus");

  var done = 0;
  for (var i = 0; i < menus.length; i++) {
    menus[i].save(function (err, result) {
      done++;
      if (done === menus.length) {
        // Add a admin account too!
        var newAdmin = new User({
          username: "admin",
          email: "admin@cravedfoods.com",
          phoneNo:'07066402941',
          state: 'Oyo',
          city: 'Ibadan',
          isAdmin: true,
        });
        User.register(newAdmin, "admin123", (err, newlyCreated) => {
          if (err) {
            console.log(err);
          }
          passport.authenticate("local")(req, res, () => {
            console.log(newlyCreated);
            exit();
          });
        });
      }
      console.log("Added a menu");
    });
  }
});

User.remove({}, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("admins removed");
});

function exit() {
  mongoose.disconnect();
}
