const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Url
const api = require('./routes/api')

// Config Files
const DBConfig = require('./config/db')
const config = require('./config/config')

// PORT
const PORT = process.env.PORT || config.port

// App
const app = express()

// Plugins
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))

// Connect MongoDB
mongoose.connect(DBConfig.db, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => console.log('С БД связь установленно!'))
mongoose.connection.on('error', (err) => console.log(`БД очень плохо, Вот что говорит врач: ${err}`))

// Routes
app.use('/api', api)

// Listener port
app.listen(PORT, () => console.log(`Server started on port :${PORT}`))