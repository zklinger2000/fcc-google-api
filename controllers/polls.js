const Poll = require('../models/Poll');

exports.createPoll = function(req, res, next) {
  Poll.findOne({ 'title': req.body.title }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    // If poll title already exists, send an error
    if (poll) {
      res.status(409).end();
    } else {
      const newPoll = new Poll({
        title: req.body.title,
        options: req.body.options
      });
      newPoll.save();
      res.send(newPoll);
    }
  });
};
