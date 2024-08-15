const Joi = require('joi')

const schema = Joi.object({
  identifier: Joi.string()
    .required()
    .description('Номер загального порядку або будь-який інший унікальний ідентифікатор.'),

  prefLabel: Joi.string()
    .required()
    .description('Найменування посади (професії) в організаційній структурі розпорядника. Наприклад: Головний спеціаліст.'),

  postIn: Joi.string()
    .required()
    .description('Повна назва структурного підрозділу, до якого належить посада (професія). Наприклад: Департамент стратегічного розвитку та інтеграції.'),

  value: Joi.number()
    .integer()
    .required()
    .description('Загальна кількість штатних одиниць. Наприклад: 4.')
})

module.exports = schema