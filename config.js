// Environment setup
require('dotenv').config({ silent: true });
// Hold application secrets and config
module.exports = {
  appSecret: process.env.APP_SECRET,
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET
  }
};
