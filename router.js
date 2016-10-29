const GoogleAuth = require('./controllers/googleAuth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/api', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.get('/api/noauth', function(req, res) {
    res.send({ message: 'no authorization required' });
  });

  app.post('/api/auth/google/login', GoogleAuth.login);
};
