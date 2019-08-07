const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../model/User");

router.get("/users", (req, res) => {
  res.send("this is users");
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      console.log("here");
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ msg: "user not found" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 4000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ msg: "pasword incorrect" });
        }
      });
    }
  });
});
module.exports = router;
