const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  nickname: {type: String,required: true},
  email: {type: String,required: true},
  password: {type: String,required: true},
  date: Date
})

UserSchema.plugin(mongoosePaginate)

const User = mongoose.model('Users', UserSchema)

module.exports = User;