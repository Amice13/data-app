const { Schema, model } = require('mongoose')

// User schema
const UserSchema = new Schema({
  isSuperUser: { type: Boolean },
  email: { type: String, required: true, lowercase: true, index: { unique: true } },
  phone: { type: String },

  // Email verification
  verified: { type: Boolean, default: false },

  // External 2FA
  mfa: { type: String },

  // Secret for one-time-passwod
  secret: { type: String },

  // Data management features
  privacyConsent: { type: Boolean },

  // User personal data
  name: { type: String, index: true },
  familyName: String,
  givenName: String,
  additionalName: String,

  role: [{ type: String, required: true, index: true }],
  scopes: [{ type: String, required: true, index: true }],
  permissions: [{ type: String, index: true }],

  status: { type: String },

  // User metadata
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Date },
  createdAt: { type: Date, default: new Date(), index: true },
  updatedAt: { type: Date, default: new Date() }
}, { timestamps: true })

// User posthooks
UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.isSuperUser
    delete ret.__v
    return ret    
  }
}

// User model
const User = model('user', UserSchema)

module.exports = { User }
