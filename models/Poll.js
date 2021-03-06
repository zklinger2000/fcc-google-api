const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  options: [],
  createdById: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdByName: {
    type: String,
    required: true
  },
  createdByImageUrl: {
    type: String
  },
  createdByEmail: {
    type: String
  },
  modifiedAt: {
    type: Date
  }
});

// Create the model class
const ModelClass = mongoose.model('poll', pollSchema);

// Export the model
module.exports = ModelClass;
