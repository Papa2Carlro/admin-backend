const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet');

mongoose.Promise = require('bluebird');

// Url
const api = require('./routes/api')

// Config Files
const DBConfig = require('./config/db')
const config = require('./config/config')

// PORT
const PORT = process.env.PORT || config.port

// App
const app = express()

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

// Plugins
app.use(cors())
app.use(helmet());
app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));

// Disable
app.disable('x-powered-by');

// Connect MongoDB
mongoose.connect(DBConfig.db, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => console.log('С БД связь установленно!'))
mongoose.connection.on('error', (err) => console.log(`БД очень плохо, Вот что говорит врач: ${err}`))

// Routes
app.use('/api', api)

// Listener port
app.listen(PORT, () => console.log(`Server started on port :${PORT}`))