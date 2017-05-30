const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const riderSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates'
    }],
    address: {
      type: String,
      required: 'You must supply address'
    }
  }
});

riderSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Rider', riderSchema);