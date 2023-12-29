const express = require("express");
let router = express.Router();
const {Users} =require("../../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  try {
    let existingUserEmail = await Users.findOne({ Email: req.body.Email });
    let existingUserName = await Users.findOne({ UserName: req.body.UserName });

    if (existingUserEmail) {
      return res.status(400).send("User with this email already registered");
    }

    if (existingUserName) {
      return res.status(400).send("User with this username already registered");
    }

    let newUser = new Users({
      Name: req.body.Name,
      Email: req.body.Email,
      UserName: req.body.UserName,
      Password: req.body.Password,
      DateofBirth: req.body.DateofBirth,
    });

    await newUser.generateHashedPassword();
    await newUser.save();

    return res.send(_.pick(newUser, ["Name", "Email", "UserName", "DateofBirth"]));
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ UserName: req.body.UserName });
    
    if (!user) {
      return res.status(400).send("User with this username not registered");
    }

    let isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    let token = jwt.sign({ _id: user._id, Name: user.Name }, config.get('jwtPrivateKey'));
    
    res.send(token);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
