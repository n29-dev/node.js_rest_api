const express = require("express");
const router = express.Router();
const {
  getUsersController,
  getUserController,
  addUserController,
  userLoginController,
  userLogoutController,
  myAccountController,
} = require("../controllers/userController");
const { check } = require("express-validator");
const { auth } = require("../middleware/auth");
const { admin } = require('../middleware/admin')
const { error } = require('../middleware/error')

//get
router.get("/", auth, admin, getUsersController, error);

router.get("/me", auth, myAccountController, error);

router.get(
  "/:id",
  [check("id", "Invalid user id").isMongoId()],
  auth,
  getUserController,
  error
);

//post
router.post(
  "/",
  [
    check("firstname", "First name is required").notEmpty(),
    check("lastname", "Last name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Password must be minimum 6 characters").isLength({
      min: 6,
    }),
    check("confirmpassword", "Confirm password is required").notEmpty(),
    check("confirmpassword").custom((input, { req }) => {
      if (input === req.body.password) {
        return true;
      } else {
        throw new Error("Password did not match");
      }
    }),
  ],
  addUserController, error
);

router.post("/login", userLoginController, error);

router.post("/logout", userLogoutController, error);

module.exports = router;
