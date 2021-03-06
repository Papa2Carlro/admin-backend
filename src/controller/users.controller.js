// Services
const UserService = require('../services/user.services');

// Registration Controller
exports.createUser = async function (req, res) {
  let errField = {}

  // Req.Body contains the form submit values.
  const User = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    avatar: req.body.avatar,
    email: req.body.email,
    password: req.body.password,
    biography: req.body.biography,
    language: req.body.language,
    role: req.body.role
  }

  try {
    // Error Event
    await UserService.getUserByEmail(User.email, (err, user) => {
      if (user) errField.email = 'Такой email уже зарегистрирован!'
    })
    await UserService.getUserByNickname(User.nickname, (err, user) => {
      if (user) errField.nickname = 'Такой nickname уже существует!'
    })
    // Empty Field
    if (!User.email) errField.email = 'Поле обезательно для заполнения'
    if (!User.nickname) errField.nickname = 'Поле обезательно для заполнения'
    if (!User.password) errField.password = 'Поле обезательно для заполнения'

    // Throw out the error
    if (Object.keys(errField).length) throw errField

    // Calling the Service function with the new object from the Request Body
    await UserService.createUser(User)
    return res.status(201).json({ok: true, msg: "Пользователь успешно зарегистрирован"})
  } catch (err) {
    //Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Login Controller
exports.loginUser = async function (req, res, next) {
  // Req.Body contains the form submit values.
  const User = {
    login: req.body.login,
    password: req.body.password,
  }

  try {
    // Calling the Service function with the new object from the Request Body
    const typeLogin = User.login.indexOf('@') < 0 ? 'nickname' : 'email'

    const user = await UserService.loginUser(User, typeLogin);
    return res.status(200).json({ok: true, msg: "Succesfully login", token: user.token, user: user.user})
  } catch (err) {
    //Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Send Mail Controller
exports.sendPassword = async function (req, res, next) {
  const email = req.body.email

  try {
    await UserService.sendPassword(email)
    return res.status(200).json({ok: true, msg: 'Письмо отправленно'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Check Hash Empty Controller
exports.changeHash = async function (req, res, next) {
  const hash = req.body.hash

  try {
    await UserService.getByHash(hash)
    return res.status(200).json({ok: true, msg: 'Пользователь найден'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Change User Password Controller
exports.changePassword = async function (req, res, next) {
  const hash = req.body.hash
  const password = req.body.password
  const nickname = req.body.nickname

  try {
    await UserService.changePassword(password, hash, nickname)
    return res.status(201).json({ok: true, msg: 'Пароль успешно изменен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Getters User Setting Controller
exports.getUser = async function (req, res, next) {
  const nickname = req.params.name

  try {
    const user = await UserService.getUser(nickname)
    return res.status(200).json({ok: true, body: user})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Users
exports.getUsers = async function (req, res, next) {
  try {
    const user = await UserService.getUsers()
    return res.status(200).json({ok: true, body: user})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Save User Setting Controller
exports.saveUser = async function (req, res, next) {
  const nickname = req.params.name
  let errField = {}

  // Req.Body contains the form submit values.
  const User = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    biography: req.body.biography,
    language: req.body.language,
    role: req.body.role
  }
  try {
    // Error Event
    await UserService.getUserByEmail(User.email, (err, user) => {
      if (user) {
        if (User.email !== user.email) errField.email = 'Такой email уже зарегистрирован!'
      }
    })
    // Empty Field
    if (!User.email) errField.email = 'Поле обезательно для заполнения'

    // Throw out the error
    if (Object.keys(errField).length) throw errField

    await UserService.saveUser(nickname, User)
    return res.status(200).json({ok: true, msg: 'Настройки пременены'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Remove User Controller
exports.removeUser = async function (req, res, next) {
  const nickname = req.params.name;

  try {
    await UserService.deleteUser(nickname);
    return res.status(200).json({ok: true, msg: "Пользователь удален"});
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}