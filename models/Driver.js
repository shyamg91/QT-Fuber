const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const driverSchema = new mongoose.Schema({
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
  },
  model: {
    name: String,
    colour: String
  },
  status: String
});

driverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);