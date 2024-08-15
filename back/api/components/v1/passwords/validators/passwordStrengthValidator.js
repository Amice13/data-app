// Validation of the password strength according to
// UNHCR/AI/2018/4/Rev.1 "Administrative Instruction on Access Controls Management for ICT Systems, Applications, and Services"
// See Appendix B – Mandatory Password Requirements

// These rules do not include external validation -
// password change frequency and password has not been used in the previous five passwords 

// Special and national characters
const specialPattern = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~ \-]/g

const passwordStrengthValidator = (value, helper) => {
  let errors = []
  // English uppercase characters
  if (!value.match(/[A-Z]/)) errors.push('Your password is not strong enough. Add English uppercase characters (A-Z)')
  // English lowercase characters
  if (!value.match(/[a-z]/)) errors.push('Your password is not strong enough. Add English lowercase characters (a-z)')
  // Numerals
  if (!value.match(/\d/)) errors.push('Your password is not strong enough. Add numerals (0-9)')
  // Special characters (we intentionally do not propose to users adding the special characters)
  if (!value.match(specialPattern)) errors.push('Your password is not strong enough. Add numerals (0-9)')
  if (errors.length > 1) throw new Error(errors[0])
}

module.exports = passwordStrengthValidator
