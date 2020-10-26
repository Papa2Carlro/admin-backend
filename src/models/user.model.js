const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  nickname: String,
  avatar: {type: String, default: '/img/man.6f2bab19.png'},
  email: String,
  password: String,
  biography: String,
  modify: {type: String, default: ''},
  language: {type: String, default: 'en-En'},
  role: {type: String, default: 'user'},
  registration: Date
})

UserSchema.plugin(mongoosePaginate)

const User = mongoose.model('Users', UserSchema)

module.exports = User;