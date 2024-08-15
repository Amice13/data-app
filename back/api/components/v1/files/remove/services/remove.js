const fs = require('fs')
const { unlink } = require('fs/promises')
const { dirname, join } = require('path')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')

// Define the statis assets folder
const staticAssetsPath = join(dirname(require.main.filename), ...appConfig.publicFolder.split(/\//g))

const remove = async ({ path, user }) => {

  let destination = join(staticAssetsPath, path)

  // Check if the file exists
  const fileExists = fs.existsSync(destination)
  if (!fileExists) throw CustomException(404, 'The file you want to delete is not found')

  // Get the file metadata
  const fileResponse = await elastic.get({
    index: 'files',
    filters: { path },
    size: 1
  })

  if (fileResponse.hits?.total?.value !== 1) throw CustomException(404, 'File metadata does not exist')

  const metadata = fileResponse.hits.hits[0]._source
  const fileId = fileResponse.hits.hits[0]._id

  if (!user.role.includes('Admin') && metadata.createdBy !== user.sub) {
    throw CustomException(403, 'You can\'t delete files uploaded by other users')
  }

  await unlink(destination)

  await elastic.removeById({ index: 'files', id: fileId })

  return { message: 'File is deleted' }
}
 
module.exports = remove
