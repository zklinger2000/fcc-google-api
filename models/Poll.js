const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  options: []
});

// Create the model class
const ModelClass = mongoose.model('poll', pollSchema);

// Export the model
module.exports = ModelClass;
