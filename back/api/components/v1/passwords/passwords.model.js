const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

// Password schema
const PasswordSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() }
}, { timestamps: true })

// Password pre-hooks
PasswordSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(this.password, salt)
  this.password = passwordHash
  return next()
})

// Password model
const Password = model('password', PasswordSchema)

// Export the model
module.exports = { Password }
