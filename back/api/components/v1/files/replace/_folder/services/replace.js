const elastic = require('@api-databases/elastic')
const getFileCategory = require('./getFileCategory')

const { dirname, join } = require('path')
const { appConfig } = require('@api-config')
const { CustomExceptionn } = require('@api-helpers/customException')
const { existsSync } = require('fs')
const { unlink } = require('fs/promises')

// Define the statis assets folder
const staticAssetsPath = join(dirname(require.main.filename), ...appConfig.publicFolder.split(/\//g))

const replace = async ({ files, folder, user }) => {

  // Check if request is empty
  if (!files) throw CustomException(403, 'You have not uploaded any file')

  // Upload files and prepare response
  let uploadedFiles = []

  for (let [key, file] of Object.entries(files)) {

    // Skip malware
    if (file.name.match(/(css|php|sass|sh|exe|bat|js|html|htm|xml)$/gi)) continue

    // Remove dangerous path
    file.name = file.name.replace(/^[\/.]+/, '').replace(/\//g, '')

    let destination = join(staticAssetsPath, folder, file.name)

    // Check if the file exists
    const fileExists = existsSync(destination)
    if (!fileExists) throw CustomException(404, 'The file you want to replace is not found')

    // Get the file metadata
    const fileResponse = await elastic.get({
      index: 'files',
      filters: { path: destination.replace(staticAssetsPath, '') },
      size: 1
    })

    if (fileResponse.hits?.total?.value !== 1) throw CustomException(404, 'File metadata does not exist')

    const metadata = fileResponse.hits.hits[0]._source
    const fileId = fileResponse.hits.hits[0]._id

    if (!user.role.includes('Admin') && metadata.createdBy !== user.sub) {
      throw CustomException(403, 'You can\'t replace files uploaded by other users')
    }

    await unlink(destination)

    await file.mv(destination)

    const body = {
      name: file.name,
      path: destination.replace(staticAssetsPath, ''),
      mimeType: file.mimetype,
      size: file.size,
      category: getFileCategory({ name: file.name, mimetype: file.mimetype }),
      updatedAt: new Date(),
      updatedBy: user.sub,
    }

    const fileMetadata = await elastic.updateById({ index: 'files', id: fileId, body })
    return body
  }
  return uploadedFiles
}
 
module.exports = replace
