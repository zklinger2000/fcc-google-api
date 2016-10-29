const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/User');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.appSecret);
}

exports.login = function(req, res, next) {
  // console.log(req.body.El);
  // See if a user with the given Google id exists
  User.findOne({ 'google.El': req.body.El }, function(err, user) {
    if (err) return res.status(500).send({ error: err });
    // If a user DOES exist, update info and return token
    if (user) {
      user.google = req.body;
      user.save();
      res.send({
        token: tokenForUser(user),
        user: {
          name: user.google.profileObj.name
        }
      });
    } else {
      // Else, create new user and return token
      // TODO: use lodash extend here to just grab the keys we want from google response
      const newUser = new User({
        google: req.body
      });
      newUser.save();
      res.send({
        token: tokenForUser(newUser),
        // TODO: and update to just return newUser (and user above!)
        user: {
          name: newUser.google.profileObj.name
        }
      });
    }
  });
};
