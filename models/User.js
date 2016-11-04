const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  google: {},
  roles: {
    'fcc-voting-app': {
      type: String,
      default: 'user'
    }
  }
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
