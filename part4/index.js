//const express = require('express')
//const app = express()
const app = require('./app')
//const app = require('./app') // the actual Express application
//const http = require('http')

const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
//app.use(express.json())

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})