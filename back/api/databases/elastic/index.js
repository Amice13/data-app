const client = require('./client')
const count = require('./count')
const create = require('./create')
const createMany = require('./createMany')
const createModel = require('./createModel')
const deleteModel = require('./deleteModel')
const get = require('./get')
const getById = require('./getById')
const getTags = require('./getTags')
const patch = require('./patch')
const remove = require('./remove')
const removeById = require ('./removeById')
const search = require('./search')
const update = require('./update')
const updateById = require('./updateById')
const updateByIdNested = require('./updateByIdNested')
const upsert = require('./upsert')

module.exports = {
  client,
  count,
  create,
  createMany,
  createModel,
  deleteModel,
  get,
  getById,
  getTags,
  patch,
  remove,
  removeById,
  search,
  update,
  updateById,
  updateByIdNested,
  upsert
}
