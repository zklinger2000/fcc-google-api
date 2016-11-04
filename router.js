const GoogleAuth = require('./controllers/googleAuth');
const Polls = require('./controllers/polls');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
// To make an authenticated request, inside the header of the POST
// create a key/value of 'authorization' set to the user's JWT token
// from localStorage.get('user_token')
module.exports = function(app) {
  app.get('/api', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.get('/api/noauth', function(req, res) {
    res.send({ message: 'no authorization required' });
  });

  app.post('/api/auth/google/login', GoogleAuth.login);

  app.post('/api/polls', requireAuth, Polls.createPoll);

  app.get('/api/polls', Polls.readPolls);

  app.get('/api/poll/id/:id', Polls.readPollById);

  app.delete('/api/poll/id/:id', requireAuth, Polls.deletePollById);
};
