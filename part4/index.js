const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})