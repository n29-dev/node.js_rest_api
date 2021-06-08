const User = require("../models/userSchema");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const _ = require('lodash')

//get
module.exports.getUsersController = async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) {
    res.send("there is no user to show").status(401);
  } else {
    res.send(users);
  }
};

//post
module.exports.addUserController = async (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.send(error).status(401);

  }else{

    try{

      const user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
      await user.save();
      res.send(user);

    }catch(err){

      res.send(err).status(500);
    }
  }
};
///working here
module.exports.userLoginController = async (req, res, next ) => {

  const {email, password } = req.body;
  const user = await  User.findOne({"email": email})

  if(!user){
    return res.send('Invaild email').status('401')

  }else{

    const hashedPs = await bcrypt.compare(password, user.password)

    if(!hashedPs){
      return res.send('Password did not match')

    }else{

      const token = user.generateAuthToken()

      res.cookie('auth', token, {
        httpOnly: true,
        sameSite: true,
        signed: true,
        maxAge: 4 * 60 * 60 * 1000
      })
      res.send('Login sucessful')
    }
  }
}
///working here 