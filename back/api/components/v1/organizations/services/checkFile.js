const { existsSync } = require('fs')
const { unlink } = require('fs/promises')
const { dirname, join } = require('path')
const { appConfig } = require('@api-config')
const elastic = require('@api-databases/elastic')

// Define the statis assets folder
const staticAssetsPath = join(dirname(require.main.filename), ...appConfig.publicFolder.split(/\//g))

const checkFile = async (file) => {
  // If the file is stored, then return id
  if (file.id) return file.id
  const { path } = file
  // Check if the file is stored
  let destination = join(staticAssetsPath, path)
  const fileExists = existsSync(destination)
  if (!fileExists) return false  
  // Check metadata
  const fileResponse = await elastic.get({
    index: 'files',
    filters: { path },
    size: 1
  })
  // Remove the file if there are no metadata
  if (!fileResponse.hits?.total?.value) {
    unlink(destination)
    return false
  }
  // Update the metadata
  const updatedFile = await elastic.updateById({
    index: 'files',
    id: fileResponse.hits.hits[0]._id,
    body: { orphaned: false }
  })
  return updatedFile._id
}
 
module.exports = checkFile
