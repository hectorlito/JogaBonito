const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  title: {type: String, require: true},
  type: { type: String, require: true},
  time: { type: Number, require: true},
  location: { type: String, require: true},
  latlong: { type: Array, require: true},
  username: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Game', gameSchema);
