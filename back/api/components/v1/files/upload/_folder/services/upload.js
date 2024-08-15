const { dirname, join } = require('path')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')
const checkFile = require('./checkFile')
const getFileCategory = require('./getFileCategory')

// Define the statis assets folder
const staticAssetsPath = join(dirname(require.main.filename), ...appConfig.publicFolder.split(/\//g))

const upload = async ({ files, folder, user }) => {

  // Check if request is empty
  if (!files) throw CustomException(403, 'You have not uploaded any file')

  // Upload files and prepare response
  let uploadedFiles = []

  for (let [key, file] of Object.entries(files)) {

    // Skip malware
    if (file.name.match(/(css|php|sass|sh|exe|bat|js|html|htm|xml)$/gi)) continue

    // Remove dangerous path
    file.name = file.name.replace(/^[\/.]+/, '').replace(/\//g, '')
    // Check if file with the same title
    let destination = join(staticAssetsPath, folder, file.name)
    destination = checkFile(destination)

    // Move the file from the temporary folder to its destination
    const result = await file.mv(destination).catch(error => { console.log(error); return false })
    if (result === false) continue
    const body = {
      name: file.name,
      path: destination.replace(staticAssetsPath, ''),
      mimeType: file.mimetype,
      size: file.size,
      category: getFileCategory({ name: file.name, mimetype: file.mimetype }),
      createdAt: new Date(),
      createdBy: user.sub,
    }
    uploadedFiles.push(body)
    body.orphaned = true

    // Save the file metadata to the respective table
    await elastic.create({ index: 'files', body })

  }
  return uploadedFiles
}
 
module.exports = upload
