const Joi = require('joi')
const taxIdValidator = require('@api-components/people/validators/taxIdValidator')
const vulnerability = require('@api-components/people/validators/vulnerabilities')

const schema = Joi.object({
  taxId: Joi.string()
    .min(10)
    .max(10)
    .custom(taxIdValidator)
    .label('Tax ID')
    .description('Tax identification number'),
  noTaxId: Joi.boolean()
    .label('No Tax ID')
    .description('Indicator if the person has no tax ID'),
  passport: Joi.string()
    .label('Passport')
    .description('Passport number'),
  birthday: Joi.date().iso()
    .less('now')
    .label('Birthday')
    .description('Birthday of the family member'),
  age: Joi.number()
    .integer()
    .min(0)
    .max(150)
    .label('Age')
    .description('Age of the person at the day of the assistance provision'),
  gender: Joi.string()
    .valid('Male', 'Female')
    .label('Gender')
    .description('Gender of the person'),
  vulnerability
}).label('Family member')
  .description('Short information about the Family member')

module.exports = schema
