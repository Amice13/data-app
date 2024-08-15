/*
*
* This function checks if the file with the same name exists and adds an additional
* version if it is necessary
*
*/

const fs = require('fs')

const checkFile = (destination) => {
  // Check if the file is new
  const destinationExists = fs.existsSync(destination)
  if (!destinationExists) return destination
  let [name, extension] = destination.split(/\.(?=[^.]{1,4}$)/gi)
  // Get the file version
  let version = name.match(/\((\d+\))$/)
  let isVersioned = !!version
  version = version ? version[1] : 0
  version = parseInt(version) + 1
  // Add a new version to the file
  destination = isVersioned ? name.replace(/\(\d+\)$/g, `(${version})`) : `${name} (${version})`
  if (extension) destination = `${destination}.${extension}`
  return checkFile(destination)
}

module.exports = checkFile
