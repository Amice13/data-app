const path = require('node:path')
const authServices = [__dirname, '..', 'components', 'v1', 'auth', 'login', 'services']

const checkBruteforce = require(path.join(...authServices, 'checkBruteforceElastic'))
const checkPasswordAgeAndAuthor = require(path.join(...authServices, 'checkPasswordAgeAndAuthorElastic'))
const getUser = require(path.join(...authServices, 'getUserElastic'))
const grantAccess = require(path.join(...authServices, 'grantAccessElastic'))
const logActivity = require(path.join(...authServices, 'logActivityElastic'))
const resetPassword = require(path.join(...authServices, 'resetPasswordElastic'))

module.exports = {
  checkBruteforce,
  checkPasswordAgeAndAuthor,
  getUser,
  grantAccess,
  logActivity,
  resetPassword
}
