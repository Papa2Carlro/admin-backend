const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Model
const User = require('../models/User.model');

// Config
const config = require('../config/db');

exports.getUserByEmail = async function (email, callback) {
  const query = {email: email}
  await User.findOne(query, callback)
}
exports.getUserByNickname = async function (nickname, callback) {
  const query = {nickname: nickname}
  await User.findOne(query, callback)
}
exports.getUserById = async function (id, callback) {
  await User.findById(id, callback)
}

exports.createUser = async function (user) {

  // Creating a new Mongoose Object by using the new keyword

  // Hash password
  const hashedPassword = bcrypt.hashSync(user.password, 8);

  const newUser = new User({
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    avatar: user.avatar,
    email: user.email,
    password: hashedPassword,
    required: false,
    language: user.language,
    displayName: user.displayName,
    role: user.role,
    registration: new Date()
  })

  try {
    // Saving the User
    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return token;
  } catch (err) {
    // return a Error
    throw err
  }
}

exports.loginUser = async function (user, typeLogin) {
  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    const query = typeLogin === 'email' ? {email: user.login} : {nickname: user.login}

    const _details = await User.findOne(query);
    if (!_details) throw "Пользователя не существует"

    const passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) throw "Неправильный пароль"

    const token = jwt.sign({id: _details._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return token;
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// exports.deleteUser = async function (id) {
//   // Delete the User
//   try {
//     var deleted = await User.remove({_id: id})
//     if (deleted.n === 0 && deleted.ok === 1) {
//       throw Error("User Could not be deleted")
//     }
//     return deleted;
//   } catch (e) {
//     throw Error("Error Occured while Deleting the User")
//   }
// }

// Async function to get the User List
// exports.getUsers = async function (query, page, limit) {
//   // Options setup for the mongoose paginate
//   var options = {
//     page,
//     limit
//   }
//   // Try Catch the awaited promise to handle the error
//   try {
//     var Users = await User.paginate(query, options)
//     // Return the Userd list that was retured by the mongoose promise
//     return Users;
//   } catch (e) {
//     // return a Error message describing the reason
//     throw Error('Error while Paginating Users');
//   }
// }