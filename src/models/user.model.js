const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  nickname: String,
  avatar: {type: String, default: 'default image'},
  email: String,
  password: String,
  language: {type: String, default: 'en-En'},
  displayName: {type: String, default: 'nickname'},
  role: {type: String, default: 'user'},
  registration: Date
})

UserSchema.plugin(mongoosePaginate)

const User = mongoose.model('Users', UserSchema)

module.exports = User;