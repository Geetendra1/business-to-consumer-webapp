const { CLIENT_ORIGIN } = require('../config')

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {
  registerConfirm: id => ({
    subject: 'Email Verification',
    html: `<p>Please verify your account by clicking the link:
      <a href='${CLIENT_ORIGIN}/register/confirm/${id}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  }),

    forgotConfirm: id => ({
    subject: 'Reset Password Link',
    html: `
      <a href='${CLIENT_ORIGIN}/signin/reset/${id}'>
        click to confirm email
      </a>\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/signin/reset/${id}`
  })
}