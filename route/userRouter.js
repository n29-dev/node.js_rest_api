const express = require("express");
const router = express.Router();
const {
  getUsersController,
  addUserController,
  userLoginController
} = require("../controllers/userController");
const { check } = require("express-validator");

//get
router.get("/", getUsersController);

//post
router.post(
  "/",
  [
    check("firstname", "First name is required").notEmpty(),
    check("lastname", "Last name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Password must be minimum 6 characters").isLength({min: 6}),
    check("confirmpassword", "Confirm password is required").notEmpty(),
    check("confirmpassword").custom((input, { req }) => {
      if (input === req.body.password) {
        return true;
      } else {
        throw new Error("Password did not match");
      }
    }),
  ],
  addUserController
);

router.post('/login', userLoginController)

module.exports = router;
