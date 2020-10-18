const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const PORT = process.env.PORT || config.port

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const admin = require('./routes/admin/setting')

app.use('/api', admin)

app.listen(PORT, () => {
  console.log(`Server started on port :${PORT}`)
})