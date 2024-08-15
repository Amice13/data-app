require('dotenv').config()
require('./aliases')
const { promisify } = require('util')
const sleep = promisify(setTimeout)


const models = require('@api-elastic')
const { deleteModel } = require('@api-databases/elastic')

const start = async () => {
  await sleep(2000)
  // for (let index of Object.keys(models)) {
  for (let index of ['assistances']) {
    await deleteModel({ index })
  }
}

start()
