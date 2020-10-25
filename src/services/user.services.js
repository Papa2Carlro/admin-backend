const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// Model
const User = require('../models/User.model');

// Config
const config = require('../config/db');

// Mailer
const mailer = require('../utils/nodemail')

// Getters
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
exports.getByHash = async function (hash) {
  try {
    const user = await User.findOne({modify: hash})
    if (!user) throw 'Пользователя не найденно'

    return user
  } catch (err) {
    throw err
  }
}

// Create User
exports.createUser = async function (user) {
  // Hash password
  const hashedPassword = bcrypt.hashSync(user.password, 8);

  // Creating a new Mongoose Object by using the new keyword
  const newUser = new User({
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    avatar: user.avatar,
    email: user.email,
    password: hashedPassword,
    language: user.language,
    biography: user.biography,
    role: user.role,
    registration: new Date()
  })

  try {
    // Saving the User
    const savedUser = await newUser.save();
    const _token = jwt.sign({id: savedUser._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return _token;
  } catch (err) {
    // return a Error
    throw err
  }
}

// Login
exports.loginUser = async function (user, typeLogin) {
  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    const query = typeLogin === 'email' ? {email: user.login} : {nickname: user.login}

    const _details = await User.findOne(query);
    if (!_details) throw "Пользователя не существует"

    const passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) throw "Пароль неверный"

    const _token = jwt.sign({id: _details._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    // Token for Client
    return {
      token: `JWT ${_token}`,
      user: {
        id: _details._id,
        name: _details.name,
        nickname: _details.nickname,
        email: _details.email,
      }
    };
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.sendPassword = async function (email) {
  try {
    // Find the User
    const _details = await User.findOne({email: email});
    if (!_details) throw "Пользователя не существует"

    // Hash link
    const hashedStr = await crypto.randomBytes(18).toString('hex');
    const link = `http://localhost:8080/admin64x/reset-password?hash=${hashedStr}`

    const messages = {
      to: email,
      subject: 'Запрос на смену пароля',
      html: `<h3>Вы сделали запрос на смену пароля</h3>
      <h5>Перейдите по ссылке что бы сменить пароль</h5>
      <a target="_blank" href="${link}">${link}</a> 

      <p>Данное письмо не требует ответа.</p>`
    }
    mailer(messages)

    await User.findOneAndUpdate({email: email}, {modify: hashedStr}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.changePassword = async function (password, hash) {
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const _detail = await User.findOne({modify: hash})
    if (!_detail) throw 'Пользователь не найден'

    const messages = {
      to: _detail.email,
      subject: 'Смена пароля',
      html: `<h3>Вы успешно сменили пароль</h3>
      
      <p style="margin: 10px 0 5px 0"><b>Ваши новые данные:</b></p> 
      <p style="margin: 0 0 5px 0">Nickname: <b>${_detail.nickname}</b> </p>
      <p style="margin-top: 0;">Password: <b>${password}</b></p>
      
      <br>
      <p>Данное письмо не требует ответа.</p>`
    }

    await User.findOneAndUpdate({modify: hash}, {password: hashedPassword, modify: ''}, {returnOriginal: false})
    await mailer(messages)
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.getUser = async function (nickname) {
  try {
    const _detail = await User.findOne({nickname: nickname})
    if (!_detail) throw 'Пользователь не найден'

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.saveUser = async function (nickname, newUser) {
  try {
    const _detail = await User.findOne({nickname: nickname})
    if (!_detail) throw 'Пользователь не найден'

    await User.findOneAndUpdate({nickname: nickname}, newUser, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    // throw err
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