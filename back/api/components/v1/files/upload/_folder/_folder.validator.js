const Joi = require('joi')

const params = Joi.object({
  folder: Joi.string()
    .valid('images', 'documents')  
    .label('Folder')
    .description('Folder where the file should be put'),
})

module.exports = {
  params
}
