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
        options: req.body.options,
        createdById: req.user._id,
        createdByName: req.user.google.profileObj.givenName,
        createdByImageUrl: req.user.google.profileObj.imageUrl
      });
      newPoll.save();
      res.send(newPoll);
    }
  });
};

exports.getPolls = function(req, res, next) {
  Poll.find({}, function(err, polls) {
    if (err) return res.status(500).send({ error: err });

    if (polls) {
      res.status(200).send(polls);
    } else {
      res.status(200).send([]);
    }
  });
};

exports.getPollById = function(req, res, next) {
  Poll.findOne({ "_id": req.params.id }, { createdById: false }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    console.log('poll', poll);
    res.send(poll);
  });
};
