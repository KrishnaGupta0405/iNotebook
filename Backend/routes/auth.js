const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "helloWorldThisIsSecretJWTSecret";
// res.status(500).send({ error: error.message }); in this eror.message replace all these "Internal server occured" to not tell the user about what error occured,....

// post is also used when large data is sent, if get request is used then the link you send through get might contain the password.

// ROUTE:1 , Create a user using: POST "/api/auth/createUser". Does not require authentication,
router.post(
  "/createUser",
  [
    // these are the validators of ecpress-validators, to validate input at the time of taking input
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Check for validation errors of express-validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      // To check if user with the email exists in the database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success= false;
        return res.status(400).json({success, error: "User with this email already exists" });
      }

      // Generating the password with hashing and salt
      const salt = await bcrypt.genSalt(10);
      // generating salt of 010 digits
      const secPass = await bcrypt.hash(req.body.password, salt);
      // combining the password with the has and the salt

      // Creating a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // this is the unique data that is given by administrator in the JWT, which later helps to indentiy the user
      const data = {
        user: {
          id: user.id,
        },
      };
      // JWT consists of 3 parts,
      // 1st. Algorithmn of itslf, 2nd unique data for that particular user, 3rd the JWT secret key which is same for all the user
      const authToken = jwt.sign(data, JWT_SECRET);
      success= true;
      res.json({success, authToken });

      console.log("User created successfully!!!", req.body);
    } catch (error) {
      // Catch all other errors like user already exists...
        success= false;
      res.status(500).send({ success, error: error.message });
    }
  }
);

//ROUTE:2 , Authenticate a user using POST:"/API/AUTH/Login", no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // Check for validation errors of express-validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // till here if any error are encounted in the input, then it will return the error there is no need to touch the databse.
    
    //Obtaining the email and password of the user from its response using de-structuring
    const { email, password } = req.body;
    try {
      // Now check is the user exits in our database or not? and if no, then lets catch that user in the variable
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
      // now lets check if the user has entered the correct password or not by comparing its password and the password stored in the database as the hash...
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      // here, the authToken will consist of unique data i.e. user id, which will later help to indentify that particular user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
      // atlast sending the authtoken back to the user
    } catch (error) {
      // Catch all other errors like user already exists...
      res.status(500).send({ error: error.message });
    }
  }
);

//ROUTE:3 ,Get logged-in user details using: POST "/api/auth/getuser", login required
router.post(
  "/getuser", fetchuser, async (req, res) => {
  try {
    const userId=req.user.id;
    const user = await User.findById(userId).select("-password")//select all except the password
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  } 
  }
)


module.exports = router;
