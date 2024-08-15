const Joi = require('joi')

const schema = Joi.object({
  clusterObjective: Joi.string()
    .label('Cluster objective'),
  sectoralObjective: Joi.string()
    .label('Sectoral objective'),
}).label('Objectives')
  .description('Gloval objectives')

module.exports = schema
