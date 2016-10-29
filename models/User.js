const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: define from react-google-login response and use lodash extend or some Object.assign() method for creating Users in Mongo
// Define our model
const userSchema = new Schema({
  google: {}
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
