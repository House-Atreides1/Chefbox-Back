const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      res.json({ success: false, message: "Username already taken" });
    } else {
      let newUser = new User(req.body);

      newUser.username = req.body.username;
      newUser.password = newUser.hashPassword(req.body.password);

      newUser
        .save()
        .then(() => {
          res.status(200).json({ message: "User successfully created" });
        })
        .catch((err) => res.json(`Error: ${err}`));
    }
  });
});

module.exports = router;
