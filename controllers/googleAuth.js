const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/User');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.appSecret);
}

exports.login = function(req, res, next) {
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
          'name': user.google.profileObj.name,
          'roles': {
            'fcc-voting-app': user.roles['fcc-voting-app']
          },
          'email': user.google.profileObj.email
        }
      });
    } else {
      // Else, create new user and return token
      const newUser = new User({
        google: req.body,
        roles: {
          'fcc-voting-app': (req.body.profileObj.email === 'zack@zklinger.com' ? 'admin' : 'user')
        }
      });
      newUser.save();
      res.send({
        token: tokenForUser(newUser),
        user: {
          'name': newUser.google.profileObj.name,
          'roles': {
            'fcc-voting-app': newUser.roles['fcc-voting-app']
          },
          'email': newUser.google.profileObj.email
        }
      });
    }
  });
};
