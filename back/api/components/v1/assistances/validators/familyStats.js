const Joi = require('joi')

const schema = Joi.object({
  all: Joi.number()
    .integer()
    .min(0)
    .max(50)
    .label('Total family members')
    .description('Total number of family members'),
  boys: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Boys')
    .description('Number of boys in the family'),
  girls: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Girls')
    .description('Number of girls in the family'),
  men: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Men')
    .description('Number of men in the family'),
  women: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Women')
    .description('Number of women in the family'),
  seniorMen: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Old Men')
    .description('Number of elderly men in the family'),
  seniorWomen: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .label('Old Women')
    .description('Number of elderly women in the family'),
  disabled: Joi.number()
    .integer()
    .min(0)
    .max(50)
    .label('Disabled')
    .description('Number of disabled members in the family'),
  vulnerable: Joi.number()
    .integer()
    .min(0)
    .max(50)
    .label('Vulnerable')
    .description('Number of vulnerable members in the family')
}).label('Family Statistics')
  .description('Statistics about family members categorized by different groups')

module.exports = schema
