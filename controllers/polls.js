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
        createdByImageUrl: req.user.google.profileObj.imageUrl,
        createdByEmail: req.user.google.profileObj.email
      });
      newPoll.save();
      res.send(newPoll);
    }
  });
};

exports.readPolls = function(req, res, next) {
  Poll.find({}, function(err, polls) {
    if (err) return res.status(500).send({ error: err });

    if (polls) {
      res.status(200).send(polls);
    } else {
      res.status(200).send([]);
    }
  });
};

exports.readPollById = function(req, res, next) {
  Poll.findOne({ "_id": req.params.id }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    res.send(poll);
  });
};

exports.deletePollById = function(req, res, next) {
  Poll.findOne({ '_id': req.params.id }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    if (poll.createdById.toString().trim() === req.user._id.toString().trim()) {
      poll.remove(function(err) {
        if (err) return res.status(500).send({ error: err });
        res.send(poll);
      });
    } else {
      res.status(403).send({ message: 'User is not the owner' });
    }
  });
};
