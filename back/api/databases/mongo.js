const mongoose = require('mongoose')
const { mongo } = require('@api-config')

mongoose.Promise = global.Promise
mongoose.connect(mongo.mongoConnect).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})

module.exports = mongoose
