const UserService = require('../services/user.services');

exports.createUser = async function (req, res) {
  let errField = {}

  // Req.Body contains the form submit values.
  const User = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password
  }
  try {
    await UserService.getUserByEmail(User.email, (err, user) => {
      if (user) errField.email = 'Такой email уже зарегистрирован!'
    })
    await UserService.getUserByNickname(User.nickname, (err, user) => {
      if (user) errField.nickname = 'Такой nickname уже существует!'
    })

    if (Object.keys(errField).length) throw errField

    // Calling the Service function with the new object from the Request Body
    await UserService.createUser(User)
    return res.status(201).json({ok: true, msg: "Пользователь успешно зарегистрирован"})
  } catch (err) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ok: false, msg: "Что то не так", fields: err})
  }
}

// exports.removeUser = async function (req, res, next) {
//   var id = req.params.id;
//   try {
//     var deleted = await UserService.deleteUser(id);
//     res.status(200).send("Succesfully User Deleted");
//   } catch (e) {
//     return res.status(400).json({status: 400, message: e.message})
//   }
// }


// exports.loginUser = async function (req, res, next) {
//   // Req.Body contains the form submit values.
//   var User = {
//     email: req.body.email,
//     password: req.body.password
//   }
//   try {
//     // Calling the Service function with the new object from the Request Body
//     var loginUser = await UserService.loginUser(User);
//     return res.status(201).json({data: loginUser, message: "Succesfully login"})
//   } catch (e) {
//     //Return an Error Response Message with Code and the Error Message.
//     return res.status(400).json({status: 400, message: "Invalid username or password"})
//   }
// }


// exports.getUsers = async function (req, res, next) {
// // Check the existence of the query parameters, If doesn't exists assign a default value
//   var page = req.query.page ? req.query.page : 1
//   var limit = req.query.limit ? req.query.limit : 10;
//   try {
//     var Users = await UserService.getUsers({}, page, limit)
//     // Return the Users list with the appropriate HTTP password Code and Message.
//     return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
//   } catch (e) {
//     //Return an Error Response Message with Code and the Error Message.
//     return res.status(400).json({status: 400, message: e.message});
//   }
// }