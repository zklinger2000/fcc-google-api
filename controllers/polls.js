const Poll = require('../models/Poll');

exports.createPoll = function(req, res, next) {
  Poll.findOne({ 'title': req.body.title }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    // If poll title already exists, send an error
    if (poll) {
      res.status(409).end();
    } else {
      const options = req.body.options.map(function(option) {
          return option.createdById ? option : {
            text: option.text,
            votes: option.votes,
            createdById: req.user._id
          };
        });
      const newPoll = new Poll({
        title: req.body.title,
        options: options,
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

exports.updatePoll = function(req, res, next) {
  Poll.findOne({ '_id': req.params.id }, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    poll.title = req.body.title;
    poll.options = req.body.options;
    poll.save();
    res.send(poll);
  });
};

exports.voteByIdAndOptionIndex = function(req, res, next) {
  const update = {$inc: {}}; update.$inc['options.' + req.params.optionIndex + ".votes"] = 1;
  Poll.findOneAndUpdate({ '_id': req.params.id }, update, {upsert: true, new: true}, function(err, poll) {
    if (err) return res.status(500).send({ error: err });
    // console.log(++poll.options[req.params.optionIndex].votes);
    res.send(poll);
  });
};

exports.getPollsByUserId = function(req, res, next) {
  Poll.find({ 'createdById': req.params.id }, function(err, polls) {
    if (err) return res.status(500).send({ error: err });
    res.send(polls);
  });
};
