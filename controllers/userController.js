const User = require("../models/userSchema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

//get
module.exports.getUsersController = async (req, res, next) => {
try{
  const users = await User.find();
  if (users.length === 0) {
    res.send("there is no user to show").status(401);
  } else {
    res.send(users);
  }
}catch(error){
  next(error)
}

};

module.exports.getUserController = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error);
  } else {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      next(error)
    }
  }
};
//post

module.exports.addUserController = async (req, res, next) => {
  try{
    const user = new User(
      _.pick(req.body, [
        "firstname",
        "lastname",
        "email",
        "password",
        "confirmpassword",
      ])
    );
    await user.save();
    res.send(_.pick(user, ["firstname", "lastname", "email"]));
  }catch(error){
    next(error)
  }
 
};

module.exports.userLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.send("Invalid email").status(400);
  } else {
    try{
      const confirmPassword = await bcrypt.compare(password, user.password);

      if (!confirmPassword) {
        return res.send("Invaild password").status(401);
      } else {
        const token = await user.generateAuthToken();
        res.cookie("auth", token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 4 * 60 * 60 * 1000,
          signed: true,
        });
  
        res.send("Login sucessful");
      }
    }catch(error){
      next(error)
    }

  }
};

module.exports.userLogoutController = (req, res, next) => {
  res.clearCookie("auth");
  res.send("Logout sucessful");
};

module.exports.myAccountController = (req, res, next) => {
  const user = req.user;
  res.send(_.pick(user, ["firstname", "lastname", "email"]));
};
